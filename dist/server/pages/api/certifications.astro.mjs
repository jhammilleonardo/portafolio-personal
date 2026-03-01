import { query } from '../../chunks/db_DC8ZIcEa.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const certs = await query(
      "SELECT * FROM certifications ORDER BY issue_date DESC"
    );
    return new Response(JSON.stringify({ data: certs }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch {
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
