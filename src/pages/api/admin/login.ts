import type { APIRoute } from 'astro';
import { authCookie, clearAuthCookie } from '../../../lib/auth';
import { queryOne } from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { password } = body;
  
  let validPassword = import.meta.env.ADMIN_PASSWORD ?? 'admin123';
  
  try {
    const profile = await queryOne<any>('SELECT admin_password FROM profile LIMIT 1');
    if (profile && profile.admin_password) {
      validPassword = profile.admin_password;
    }
  } catch (error) {
    console.error("Error reading admin_password from DB", error);
  }

  if (password === validPassword) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': authCookie(),
      },
    });
  }

  return new Response(JSON.stringify({ error: 'Contraseña incorrecta.' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async () => {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': clearAuthCookie(),
    },
  });
};
