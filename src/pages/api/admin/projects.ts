import type { APIRoute } from 'astro';
import { query } from '../../../lib/db';
import { isAuthenticated } from '../../../lib/auth';
import type { Project } from '../../../types';

function unauthorized() {
  return new Response(JSON.stringify({ error: 'No autorizado.' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  try {
    const projects = await query<Project>('SELECT * FROM projects ORDER BY created_at DESC');
    return new Response(JSON.stringify({ data: projects }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return new Response(JSON.stringify({ error: 'Database error: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const body = await request.json();
  const { title, description, long_description, repo_url, demo_url, image_url, tags, featured, status } = body;

  if (!title) {
    return new Response(JSON.stringify({ error: 'El título es requerido.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const tagsJson = tags ? JSON.stringify(Array.isArray(tags) ? tags : JSON.parse(tags)) : null;

  await query(
    `INSERT INTO projects (title, description, long_description, repo_url, demo_url, image_url, tags, featured, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description ?? null, long_description ?? null, repo_url ?? null, demo_url ?? null,
     image_url ?? null, tagsJson, featured ? 1 : 0, status ?? 'active']
  );

  return new Response(JSON.stringify({ message: 'Proyecto creado.' }), {
    status: 201, headers: { 'Content-Type': 'application/json' },
  });
};

export const PUT: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const body = await request.json();
  const { id, title, description, long_description, repo_url, demo_url, image_url, tags, featured, status } = body;

  if (!id || !title) {
    return new Response(JSON.stringify({ error: 'ID y título requeridos.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const tagsJson = tags ? JSON.stringify(Array.isArray(tags) ? tags : JSON.parse(tags)) : null;

  await query(
    `UPDATE projects SET title=?, description=?, long_description=?, repo_url=?, demo_url=?,
     image_url=?, tags=?, featured=?, status=? WHERE id=?`,
    [title, description ?? null, long_description ?? null, repo_url ?? null, demo_url ?? null,
     image_url ?? null, tagsJson, featured ? 1 : 0, status ?? 'active', id]
  );

  return new Response(JSON.stringify({ message: 'Proyecto actualizado.' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized();
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID requerido.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  await query('DELETE FROM projects WHERE id = ?', [id]);
  return new Response(JSON.stringify({ message: 'Proyecto eliminado.' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
