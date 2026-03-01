import type { APIRoute } from 'astro';
import { query, queryOne } from '../../../lib/db';
import { isAuthenticated } from '../../../lib/auth';

export const PUT: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const { newPassword } = body;

    if (!newPassword || newPassword.length < 6) {
      return new Response(JSON.stringify({ error: 'La contraseña debe tener al menos 6 caracteres.' }), { status: 400 });
    }

    const existing = await queryOne<any>('SELECT id FROM profile LIMIT 1');

    if (existing) {
      await query('UPDATE profile SET admin_password = ? WHERE id = ?', [newPassword, existing.id]);
    } else {
      await query('INSERT INTO profile (name, title, admin_password) VALUES (?, ?, ?)', ['Tu Nombre', 'Full Stack Developer', newPassword]);
    }

    return new Response(JSON.stringify({ message: 'Contraseña actualizada exitosamente.' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al actualizar la contraseña.' }), { status: 500 });
  }
};
