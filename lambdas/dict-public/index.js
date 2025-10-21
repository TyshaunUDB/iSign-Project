import { Client } from "pg";

const cf = process.env.CLOUDFRONT_DOMAIN;

function normPath(event) {
  const p = event?.rawPath || event?.path || "/";
  const stage = event?.requestContext?.stage;
  if (stage && p.startsWith(`/${stage}/`)) return p.slice(stage.length + 1); // remove "/prod"
  if (stage && p === `/${stage}`) return "/";
  return p;
}

function cors() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization"
  };
}

function ok(body, code = 200) {
  return { statusCode: code, headers: cors(), body: JSON.stringify(body) };
}
function fail(err, code = 500) {
  const msg = typeof err === "string" ? err : (err?.message || "Internal Error");
  return { statusCode: code, headers: cors(), body: JSON.stringify({ error: msg }) };
}

async function query(sql, params = []) {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    const res = await client.query(sql, params);
    return res.rows;
  } finally {
    await client.end();
  }
}

export const handler = async (event) => {
  try {
    const method = event?.requestContext?.http?.method || event?.httpMethod || "GET";
    const path = normPath(event);

    console.log("REQ", { method, path, stage: event?.requestContext?.stage });

    if (method === "OPTIONS") return ok("", 204);

    // Health check
    if (path === "/dict/ping" && method === "GET") {
      return ok({ ok: true });
    }

    // /dict/categories
    if (path === "/dict/categories" && method === "GET") {
  const rows = await query(`
    SELECT 
      slug, 
      name, 
      description,
      CASE 
        WHEN banner_key IS NOT NULL THEN CONCAT('https://${cf}/', banner_key)
        ELSE NULL
      END AS banner_url
    FROM categories
    ORDER BY name ASC
  `);
  return ok(rows);
}

    // /dict/signs
    if (path === "/dict/signs" && method === "GET") {
  try {
    const category = event?.queryStringParameters?.category || null;
    const params = [];
    let sql = `
      SELECT s.slug, s.name, s.gloss,
             (SELECT CONCAT('https://${cf}/', ma.s3_key)
                FROM media_assets ma
               WHERE ma.sign_id = s.id AND ma.type='image'
               ORDER BY ma.order_index ASC
               LIMIT 1) AS thumbnail_url
      FROM signs s
    `;
    if (category) {
      sql += ` JOIN categories c ON c.id = s.category_id WHERE c.slug = $1 `;
      params.push(category);
    }
    sql += " ORDER BY s.name ASC";
    const rows = await query(sql, params);
    return ok(rows);
  } catch (e) {
    console.error("SIGNS ERR", e);
    const msg = e instanceof Error ? e.message : String(e);
    return fail(msg, 500);         // <— temporary: show DB error
  }
}

    // /dict/signs/{slug}
    const m = path.match(/^\/dict\/signs\/([a-z0-9\-]+)$/i);
    if (m && method === "GET") {
      const slug = decodeURIComponent(m[1]);
      const [sign] = await query(
        "SELECT id, slug, name, gloss FROM signs WHERE slug=$1 LIMIT 1",
        [slug]
      );
      if (!sign) return fail("Not Found", 404);

      const media = await query(
        `SELECT type, s3_key, width, height, duration_ms, order_index
           FROM media_assets
          WHERE sign_id=$1
          ORDER BY order_index ASC`,
        [sign.id]
      );
      const withUrls = media.map((v) => ({ ...v, url: `https://${cf}/${v.s3_key}` }));
      return ok({ slug: sign.slug, name: sign.name, gloss: sign.gloss, media: withUrls });
    }

    return fail("Not Found", 404);
  } catch (e) {
  console.error("ERR", e);
  return fail("Internal Server Error", 500);
}
};
