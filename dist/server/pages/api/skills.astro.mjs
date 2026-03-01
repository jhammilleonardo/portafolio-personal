import { query } from '../../chunks/db_DC8ZIcEa.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const skills = await query(
      "SELECT * FROM skills ORDER BY category, level DESC"
    );
    return new Response(JSON.stringify({ data: skills }), {
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
