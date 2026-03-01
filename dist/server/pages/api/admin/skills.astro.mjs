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
  const skills = await query("SELECT * FROM skills ORDER BY category, level DESC");
  return new Response(JSON.stringify({ data: skills }), {
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const { name, category, level, icon, color } = await request.json();
  if (!name || !category) {
    return new Response(JSON.stringify({ error: "Nombre y categoría requeridos." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  await query(
    "INSERT INTO skills (name, category, level, icon, color) VALUES (?, ?, ?, ?, ?)",
    [name, category, level ?? 50, icon ?? null, color ?? null]
  );
  return new Response(JSON.stringify({ message: "Skill creada." }), {
    status: 201,
    headers: { "Content-Type": "application/json" }
  });
};
const PUT = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const { id, name, category, level, icon, color } = await request.json();
  if (!id || !name || !category) {
    return new Response(JSON.stringify({ error: "ID, nombre y categoría requeridos." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  await query(
    "UPDATE skills SET name=?, category=?, level=?, icon=?, color=? WHERE id=?",
    [name, category, level ?? 50, icon ?? null, color ?? null, id]
  );
  return new Response(JSON.stringify({ message: "Skill actualizada." }), {
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
  await query("DELETE FROM skills WHERE id = ?", [id]);
  return new Response(JSON.stringify({ message: "Skill eliminada." }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
