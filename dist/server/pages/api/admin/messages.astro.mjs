import { query } from '../../../chunks/db_DC8ZIcEa.mjs';
import { i as isAuthenticated } from '../../../chunks/auth_TeUwq8T5.mjs';
export { renderers } from '../../../renderers.mjs';

function unauthorized() {
  return new Response(JSON.stringify({ error: "No autorizado." }), {
    status: 401,
    headers: { "Content-Type": "application/json" }
  });
}
const GET = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const messages = await query(
    "SELECT * FROM contact_messages ORDER BY created_at DESC"
  );
  return new Response(JSON.stringify({ data: messages }), {
    headers: { "Content-Type": "application/json" }
  });
};
const PUT = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const { id } = await request.json();
  if (!id) return new Response(JSON.stringify({ error: "ID requerido." }), {
    status: 400,
    headers: { "Content-Type": "application/json" }
  });
  await query("UPDATE contact_messages SET read_at = NOW() WHERE id = ?", [id]);
  return new Response(JSON.stringify({ message: "Mensaje marcado como leído." }), {
    headers: { "Content-Type": "application/json" }
  });
};
const DELETE = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const { id } = await request.json();
  if (!id) return new Response(JSON.stringify({ error: "ID requerido." }), {
    status: 400,
    headers: { "Content-Type": "application/json" }
  });
  await query("DELETE FROM contact_messages WHERE id = ?", [id]);
  return new Response(JSON.stringify({ message: "Mensaje eliminado." }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
