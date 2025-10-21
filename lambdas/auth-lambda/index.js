import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { OAuth2Client } from "google-auth-library";

/* ========= Environment =========
Required:
  DB_SECRET_JSON or DB_* vars (see getDbConfig)
  JWT_ACCESS_SECRET
  JWT_REFRESH_SECRET
  OTP_FROM_EMAIL      (SES verified)
  GOOGLE_CLIENT_ID_ANDROID (optional if only iOS)
  GOOGLE_CLIENT_ID_IOS     (optional if only Android)
Optional:
  OTP_CODE_TTL_MIN=10
  REFRESH_TTL_DAYS=60
  ACCESS_TTL_MIN=15
*/

const REGION = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "ap-southeast-1";
const ses = new SESv2Client({ region: REGION });
const sm = new SecretsManagerClient({ region: REGION });
const googleClient = new OAuth2Client();

const ACCESS_TTL_MIN = parseInt(process.env.ACCESS_TTL_MIN || "15", 10);
const REFRESH_TTL_DAYS = parseInt(process.env.REFRESH_TTL_DAYS || "60", 10);
const OTP_CODE_TTL_MIN = parseInt(process.env.OTP_CODE_TTL_MIN || "10", 10);

let pool;

/* ---------- DB connection (reuse across invocations) ---------- */
async function getDbConfig() {
  if (process.env.DB_SECRET_JSON) return JSON.parse(process.env.DB_SECRET_JSON);

  throw new Error("No DB config found. Set DB_SECRET_JSON or DB_* or DB_SECRET_ID.");
}

async function getPool() {
  if (pool) return pool;
  const { host, port, dbname, username, password } = await getDbConfig();
  pool = new Pool({
    host,
    port,
    database: dbname,
    user: username,
    password,
    max: 4,                 // small to save connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    keepAlive: true
  });
  return pool;
}

/* ---------- Helpers ---------- */
const json = (statusCode, body) => ({
  statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
});
const bad = (msg, code=400) => json(code, { error: msg });

function sha256(s) { return crypto.createHash("sha256").update(s).digest("hex"); }
function randomBase64Url(bytes=32) {
  return Buffer.from(crypto.randomBytes(bytes)).toString("base64url");
}
function minutesFromNow(min) { return new Date(Date.now() + min*60*1000); }
function daysFromNow(days) { return new Date(Date.now() + days*24*60*60*1000); }

function signAccessJwt(user) {
  return jwt.sign(
    { sub: user.user_id, email: user.email, name: user.name },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: `${ACCESS_TTL_MIN}m`, issuer: "isign.api" }
  );
}
function verifyAccessJwt(headerAuth) {
  if (!headerAuth?.startsWith?.("Bearer ")) return null;
  const token = headerAuth.substring(7);
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET, { issuer: "isign.api" });
  } catch { return null; }
}

/* ---------- Email (SES) ---------- */
async function sendOtpEmail(to, code) {
  const from = process.env.OTP_FROM_EMAIL;
  if (!from) throw new Error("OTP_FROM_EMAIL not set");
  const subject = "Your OTP Code";
  const text = `Your OTP code is: ${code}\nIt expires in ${OTP_CODE_TTL_MIN} minutes.\n\nIf you didn't request this, you can ignore this email.`;
  await ses.send(new SendEmailCommand({
    FromEmailAddress: from,
    Destination: { ToAddresses: [to] },
    Content: { Simple: { Subject: { Data: subject }, Body: { Text: { Data: text } } } }
  }));
}

/* ---------- Google ID Token verification ---------- */
async function verifyGoogleIdTokenFlexible(idToken) {
  const cids = [process.env.GOOGLE_CLIENT_ID_ANDROID, process.env.GOOGLE_CLIENT_ID_IOS].filter(Boolean);
  if (cids.length === 0) throw new Error("No Google client IDs set");
  let payload;
  let lastErr;
  for (const aud of cids) {
    try {
      const ticket = await googleClient.verifyIdToken({ idToken, audience: aud });
      payload = ticket.getPayload();
      break;
    } catch (e) { lastErr = e; }
  }
  if (!payload) throw (lastErr || new Error("Invalid Google ID token"));
  return payload; // { sub, email, email_verified, name, picture, ... }
}

/* ---------- Route Handlers ---------- */

async function register(event) {
  const { name, email, phone, password } = JSON.parse(event.body || "{}");
  if (!name || !email || !password) return bad("Missing name/email/password");

  const pool = await getPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const exists = await client.query(`SELECT 1 FROM auth.users WHERE email=$1`, [email]);
    if (exists.rowCount) {
      await client.query("ROLLBACK");
      return json(409, { error: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const ins = await client.query(
      `INSERT INTO auth.users (name, email, phone, password_hash) 
       VALUES ($1,$2,$3,$4)
       RETURNING user_id, name, email`,
      [name, email, phone ?? null, hash]
    );
    const user = ins.rows[0];

    // create refresh session
    const refreshRaw = randomBase64Url(48);
    const refreshHash = sha256(refreshRaw);
    const expiresAt = daysFromNow(REFRESH_TTL_DAYS);

    await client.query(
      `INSERT INTO auth.sessions (user_id, refresh_token, user_agent, ip_address, expires_at)
       VALUES ($1,$2,$3,$4,$5)`,
      [ user.user_id, refreshHash, event.headers["user-agent"] || null, event.requestContext?.http?.sourceIp || null, expiresAt ]
    );

    await client.query("COMMIT");
    return json(201, { user, accessToken: signAccessJwt(user), refreshToken: refreshRaw });
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
    return json(500, { error: "Internal error" });
  } finally { client.release(); }
}

async function login(event) {
  const { email, password } = JSON.parse(event.body || "{}");
  if (!email || !password) return bad("Missing email/password");

  const pool = await getPool();
  const r = await pool.query(`SELECT user_id, name, email, password_hash FROM auth.users WHERE email=$1`, [email]);
  if (r.rowCount === 0) return json(401, { error: "Invalid credentials" });

  const user = r.rows[0];
  if (!user.password_hash) return bad("Use Google Sign-In for this account", 400);

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return json(401, { error: "Invalid credentials" });

  const refreshRaw = randomBase64Url(48);
  const refreshHash = sha256(refreshRaw);
  const expiresAt = daysFromNow(REFRESH_TTL_DAYS);
  await pool.query(
    `INSERT INTO auth.sessions (user_id, refresh_token, user_agent, ip_address, expires_at)
     VALUES ($1,$2,$3,$4,$5)`,
    [ user.user_id, refreshHash, event.headers["user-agent"] || null, event.requestContext?.http?.sourceIp || null, expiresAt ]
  );

  return json(200, { 
    user: { user_id: user.user_id, name: user.name, email: user.email },
    accessToken: signAccessJwt(user),
    refreshToken: refreshRaw
  });
}

async function refresh(event) {
  const { refreshToken } = JSON.parse(event.body || "{}");
  if (!refreshToken) return bad("Missing refreshToken");

  const pool = await getPool();
  const refreshHash = sha256(refreshToken);
  const now = new Date();

  const r = await pool.query(
    `SELECT s.session_id, u.user_id, u.name, u.email, s.expires_at, s.revoked_at
       FROM auth.sessions s
       JOIN auth.users u ON u.user_id = s.user_id
      WHERE s.refresh_token = $1`,
    [refreshHash]
  );
  if (r.rowCount === 0) return json(401, { error: "Invalid refresh" });

  const s = r.rows[0];
  if (s.revoked_at || new Date(s.expires_at) < now) {
    return json(401, { error: "Expired or revoked refresh" });
  }

  // rotate refresh
  const newRaw = randomBase64Url(48);
  const newHash = sha256(newRaw);
  const newExp = daysFromNow(REFRESH_TTL_DAYS);

  await pool.query(
    `UPDATE auth.sessions SET refresh_token=$1, expires_at=$2 WHERE session_id=$3`,
    [newHash, newExp, s.session_id]
  );

  const user = { user_id: s.user_id, name: s.name, email: s.email };
  return json(200, { accessToken: signAccessJwt(user), refreshToken: newRaw });
}

async function logout(event) {
  const { refreshToken } = JSON.parse(event.body || "{}");
  if (!refreshToken) return bad("Missing refreshToken");

  const pool = await getPool();
  await pool.query(
    `UPDATE auth.sessions SET revoked_at=now() WHERE refresh_token=$1 AND revoked_at IS NULL`,
    [sha256(refreshToken)]
  );
  return json(200, { ok: true });
}

async function me(event) {
  const claims = verifyAccessJwt(event.headers?.authorization);
  if (!claims) return json(401, { error: "Unauthorized" });

  const pool = await getPool();
  const r = await pool.query(`SELECT user_id, name, email FROM auth.users WHERE user_id=$1`, [claims.sub]);
  if (!r.rowCount) return json(404, { error: "User not found" });
  return json(200, { user: r.rows[0] });
}

async function forgotPassword(event) {
  const { email } = JSON.parse(event.body || "{}");
  if (!email) return bad("Missing email");

  const pool = await getPool();
  const u = await pool.query(`SELECT user_id FROM auth.users WHERE email=$1`, [email]);

  // Always respond 200 to prevent email enumeration
  if (u.rowCount === 0) return json(200, { ok: true });

  const userId = u.rows[0].user_id;
  const code = (Math.floor(100000 + Math.random()*900000)).toString(); // 6 digits
  const salt = randomBase64Url(16);
  const codeHash = sha256(code + ":" + salt);
  const exp = minutesFromNow(OTP_CODE_TTL_MIN);

  await pool.query(
    `INSERT INTO auth.otps (user_id, channel, target, code_hash, purpose, expires_at, max_tries)
     VALUES ($1,'email',$2,$3,'reset_password',$4,5)`,
    [userId, email, codeHash + ":" + salt, exp]
  );

  await sendOtpEmail(email, code);
  return json(200, { ok: true });
}

async function verifyOtp(event) {
  const { email, code, purpose } = JSON.parse(event.body || "{}");
  if (!email || !code || !purpose) return bad("Missing email/code/purpose");

  const pool = await getPool();
  const r = await pool.query(
    `SELECT otp_id, code_hash, tries, max_tries, expires_at, used_at
       FROM auth.otps
      WHERE target=$1 AND purpose=$2 AND used_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1`,
    [email, purpose]
  );
  if (!r.rowCount) return json(400, { ok: false, reason: "No active OTP" });

  const row = r.rows[0];
  if (row.tries >= row.max_tries) return json(400, { ok: false, reason: "Max tries exceeded" });
  if (new Date(row.expires_at) < new Date()) return json(400, { ok: false, reason: "Expired" });

  const [storedHash, salt] = row.code_hash.split(":");
  const ok = sha256(code + ":" + salt) === storedHash;

  // increment tries
  await pool.query(`UPDATE auth.otps SET tries = tries + 1 WHERE otp_id=$1`, [row.otp_id]);

  if (!ok) return json(400, { ok: false, reason: "Invalid code" });

  await pool.query(`UPDATE auth.otps SET used_at=now() WHERE otp_id=$1`, [row.otp_id]);
  return json(200, { ok: true });
}

async function resetPassword(event) {
  const { email, code, newPassword } = JSON.parse(event.body || "{}");
  if (!email || !code || !newPassword) return bad("Missing email/code/newPassword");

  const pool = await getPool();
  const r = await pool.query(
    `SELECT otp_id, code_hash, tries, max_tries, expires_at, used_at
       FROM auth.otps
      WHERE target=$1 AND purpose='reset_password' AND used_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1`,
    [email]
  );
  if (!r.rowCount) return bad("No active OTP", 400);

  const row = r.rows[0];
  if (row.tries >= row.max_tries) return bad("Max tries exceeded");
  if (new Date(row.expires_at) < new Date()) return bad("OTP expired");

  const [storedHash, salt] = row.code_hash.split(":");
  const ok = sha256(code + ":" + salt) === storedHash;
  await pool.query(`UPDATE auth.otps SET tries = tries + 1 WHERE otp_id=$1`, [row.otp_id]);
  if (!ok) return bad("Invalid code");

  const hash = await bcrypt.hash(newPassword, 10);
  await pool.query(`UPDATE auth.users SET password_hash=$1 WHERE email=$2`, [hash, email]);
  await pool.query(`UPDATE auth.otps SET used_at=now() WHERE otp_id=$1`, [row.otp_id]);

  return json(200, { ok: true });
}

async function googleSignIn(event) {
  const { idToken } = JSON.parse(event.body || "{}");
  if (!idToken) return bad("Missing idToken");

  const payload = await verifyGoogleIdTokenFlexible(idToken);
  const email = payload.email;
  const name  = payload.name || email;
  if (!email) return bad("Google token missing email", 400);

  const pool = await getPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Upsert user (google-only users can have NULL password_hash)
    const res = await client.query(
      `INSERT INTO auth.users (name, email, password_hash, email_verified_at)
       VALUES ($1,$2,NULL, now())
       ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name
       RETURNING user_id, name, email`,
      [name, email]
    );
    const user = res.rows[0];

    // Create refresh session
    const refreshRaw = randomBase64Url(48);
    const refreshHash = sha256(refreshRaw);
    const expiresAt = daysFromNow(REFRESH_TTL_DAYS);

    await client.query(
      `INSERT INTO auth.sessions (user_id, refresh_token, user_agent, ip_address, expires_at)
       VALUES ($1,$2,$3,$4,$5)`,
      [ user.user_id, refreshHash, event.headers["user-agent"] || null, event.requestContext?.http?.sourceIp || null, expiresAt ]
    );

    await client.query("COMMIT");
    return json(200, { user, accessToken: signAccessJwt(user), refreshToken: refreshRaw });
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
    return json(500, { error: "Internal error" });
  } finally { client.release(); }
}

/* ---------- Router (API Gateway Lambda proxy) ---------- */
export const handler = async (event) => {
  try {
    const method = (event.requestContext?.http?.method || event.httpMethod || "GET").toUpperCase();
    const path = (event.rawPath || event.path || "/").toLowerCase();

    if (method === "POST" && path === "/auth/register")        return await register(event);
    if (method === "POST" && path === "/auth/login")           return await login(event);
    if (method === "POST" && path === "/auth/logout")          return await logout(event);
    if (method === "POST" && path === "/auth/refresh")         return await refresh(event);
    if (method === "POST" && path === "/auth/forgot-password") return await forgotPassword(event);
    if (method === "POST" && path === "/auth/verify-otp")      return await verifyOtp(event);
    if (method === "POST" && path === "/auth/reset-password")  return await resetPassword(event);
    if (method === "POST" && path === "/auth/google")          return await googleSignIn(event);
    if (method === "GET"  && path === "/me")                   return await me(event);

    return json(404, { error: "Not found" });
  } catch (e) {
    console.error("Handler error:", e);
    return json(500, { error: "Internal error" });
  }
};
