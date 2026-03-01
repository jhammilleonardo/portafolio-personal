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
  const certs = await query("SELECT * FROM certifications ORDER BY issue_date DESC");
  return new Response(JSON.stringify({ data: certs }), {
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const { title, issuer, issue_date, expiry_date, credential_url, image_url, description } = await request.json();
  if (!title || !issuer) {
    return new Response(JSON.stringify({ error: "Título e Emisor requeridos." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  await query(
    "INSERT INTO certifications (title, issuer, issue_date, expiry_date, credential_url, image_url, description) VALUES (?,?,?,?,?,?,?)",
    [title, issuer, issue_date ?? null, expiry_date ?? null, credential_url ?? null, image_url ?? null, description ?? null]
  );
  return new Response(JSON.stringify({ message: "Certificación creada." }), {
    status: 201,
    headers: { "Content-Type": "application/json" }
  });
};
const PUT = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const { id, title, issuer, issue_date, expiry_date, credential_url, image_url, description } = await request.json();
  if (!id || !title || !issuer) {
    return new Response(JSON.stringify({ error: "ID, título e emisor requeridos." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  await query(
    "UPDATE certifications SET title=?, issuer=?, issue_date=?, expiry_date=?, credential_url=?, image_url=?, description=? WHERE id=?",
    [title, issuer, issue_date ?? null, expiry_date ?? null, credential_url ?? null, image_url ?? null, description ?? null, id]
  );
  return new Response(JSON.stringify({ message: "Certificación actualizada." }), {
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
  await query("DELETE FROM certifications WHERE id = ?", [id]);
  return new Response(JSON.stringify({ message: "Certificación eliminada." }), {
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
