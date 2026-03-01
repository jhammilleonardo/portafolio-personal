import { query } from '../../chunks/db_DC8ZIcEa.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ url }) => {
  try {
    const featured = url.searchParams.get("featured");
    let sql = "SELECT * FROM projects";
    const params = [];
    if (featured === "true") {
      sql += " WHERE featured = 1";
    }
    sql += " ORDER BY featured DESC, created_at DESC";
    const projects = await query(sql, params);
    return new Response(JSON.stringify({ data: projects }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
