import type { APIRoute } from 'astro';
import { query } from '../../../lib/db';
import { isAuthenticated } from '../../../lib/auth';
import type { Skill } from '../../../types';

function unauthorized() {
  return new Response(JSON.stringify({ error: 'No autorizado.' }), {
    status: 401, headers: { 'Content-Type': 'application/json' },
  });
}

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const skills = await query<Skill>('SELECT * FROM skills ORDER BY category, level DESC');
  return new Response(JSON.stringify({ data: skills }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const { name, category, level, icon, color } = await request.json();
  if (!name || !category) {
    return new Response(JSON.stringify({ error: 'Nombre y categoría requeridos.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }
  await query(
    'INSERT INTO skills (name, category, level, icon, color) VALUES (?, ?, ?, ?, ?)',
    [name, category, level ?? 50, icon ?? null, color ?? null]
  );
  return new Response(JSON.stringify({ message: 'Skill creada.' }), {
    status: 201, headers: { 'Content-Type': 'application/json' },
  });
};

export const PUT: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const { id, name, category, level, icon, color } = await request.json();
  if (!id || !name || !category) {
    return new Response(JSON.stringify({ error: 'ID, nombre y categoría requeridos.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }
  await query(
    'UPDATE skills SET name=?, category=?, level=?, icon=?, color=? WHERE id=?',
    [name, category, level ?? 50, icon ?? null, color ?? null, id]
  );
  return new Response(JSON.stringify({ message: 'Skill actualizada.' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const { id } = await request.json();
  if (!id) return new Response(JSON.stringify({ error: 'ID requerido.' }), {
    status: 400, headers: { 'Content-Type': 'application/json' },
  });
  await query('DELETE FROM skills WHERE id = ?', [id]);
  return new Response(JSON.stringify({ message: 'Skill eliminada.' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
