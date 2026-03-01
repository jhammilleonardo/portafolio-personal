import { i as isAuthenticated } from '../../../chunks/auth_TeUwq8T5.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return new Response(JSON.stringify({ error: "No se subió ningún archivo" }), { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    const url = `/uploads/${filename}`;
    return new Response(JSON.stringify({ url }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    return new Response(JSON.stringify({ error: "Error al procesar la subida" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
