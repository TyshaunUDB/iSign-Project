// index.js (Node.js 20.x, ESM)
import { Client } from "pg";

const cf = process.env.CLOUDFRONT_DOMAIN;

async function query(sql, params = []) {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
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
    const { rawPath, queryStringParameters, requestContext } = event;

    // Basic CORS preflight
    if (event.requestContext?.http?.method === "OPTIONS") {
      return {
        statusCode: 204,
        headers: cors(),
        body: ""
      };
    }

    // === /dict/categories (UPDATED to include banner_url) ===
    if (rawPath === "/dict/categories") {
      const rows = await query(
        `
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
        `
      );
      return ok(rows);
    }

    // === /dict/signs (unchanged) ===
    if (rawPath === "/dict/signs") {
      const category = queryStringParameters?.category || null;
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
        sql += `
          JOIN categories c ON c.id = s.category_id
          WHERE c.slug = $1
        `;
        params.push(category);
      }
      sql += " ORDER BY s.name ASC";
      const rows = await query(sql, params);
      return ok(rows);
    }

    // === /dict/signs/{slug} (unchanged) ===
    const signMatch = rawPath.match(/^\/dict\/signs\/([a-z0-9\-]+)$/i);
    if (signMatch) {
      const slug = decodeURIComponent(signMatch[1]);
      const [sign] = await query(
        "SELECT id, slug, name, gloss FROM signs WHERE slug=$1 LIMIT 1",
        [slug]
      );
      if (!sign) return notFound();

      const media = await query(
        `
        SELECT type, s3_key, width, height, duration_ms, order_index
        FROM media_assets
        WHERE sign_id=$1
        ORDER BY order_index ASC
        `,
        [sign.id]
      );

      const withUrls = media.map((m) => ({
        ...m,
        url: `https://${cf}/${m.s3_key}`
      }));

      return ok({
        slug: sign.slug,
        name: sign.name,
        gloss: sign.gloss,
        media: withUrls
      });
    }

    return notFound();
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: cors(),
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};

function ok(body) {
  return { statusCode: 200, headers: cors(), body: JSON.stringify(body) };
}
function notFound() {
  return { statusCode: 404, headers: cors(), body: JSON.stringify({ error: "Not Found" }) };
}
function cors() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization"
  };
}
