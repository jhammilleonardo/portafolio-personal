import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../../lib/auth';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No se subió ningún archivo' }), { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;

    // En producción (Docker/Coolify) los estáticos se sirven desde dist/client/
    // En desarrollo se sirven desde public/
    const isProduction = import.meta.env.PROD;
    const uploadDir = isProduction
      ? path.join(process.cwd(), 'dist', 'client', 'uploads')
      : path.join(process.cwd(), 'public', 'uploads');

    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    const url = `/uploads/${filename}`;

    return new Response(JSON.stringify({ url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    return new Response(JSON.stringify({ error: 'Error al procesar la subida' }), { status: 500 });
  }
};
