import { c as clearAuthCookie, a as authCookie } from '../../../chunks/auth_TeUwq8T5.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  const body = await request.json();
  const { password } = body;
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  if (password === adminPassword) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": authCookie()
      }
    });
  }
  return new Response(JSON.stringify({ error: "Contraseña incorrecta." }), {
    status: 401,
    headers: { "Content-Type": "application/json" }
  });
};
const DELETE = async () => {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": clearAuthCookie()
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
