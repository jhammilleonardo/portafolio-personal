import type { APIRoute } from 'astro';
import { query } from '../../../lib/db';
import { isAuthenticated } from '../../../lib/auth';
import type { ContactMessage } from '../../../types';

function unauthorized() {
  return new Response(JSON.stringify({ error: 'No autorizado.' }), {
    status: 401, headers: { 'Content-Type': 'application/json' },
  });
}

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const messages = await query<ContactMessage>(
    'SELECT * FROM contact_messages ORDER BY created_at DESC'
  );
  return new Response(JSON.stringify({ data: messages }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const PUT: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const { id } = await request.json();
  if (!id) return new Response(JSON.stringify({ error: 'ID requerido.' }), {
    status: 400, headers: { 'Content-Type': 'application/json' },
  });
  await query('UPDATE contact_messages SET read_at = NOW() WHERE id = ?', [id]);
  return new Response(JSON.stringify({ message: 'Mensaje marcado como leído.' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const { id } = await request.json();
  if (!id) return new Response(JSON.stringify({ error: 'ID requerido.' }), {
    status: 400, headers: { 'Content-Type': 'application/json' },
  });
  await query('DELETE FROM contact_messages WHERE id = ?', [id]);
  return new Response(JSON.stringify({ message: 'Mensaje eliminado.' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
