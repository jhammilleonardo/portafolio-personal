import type { APIRoute } from 'astro';
import { query, queryOne } from '../../../lib/db';
import { isAuthenticated } from '../../../lib/auth';
import type { Profile } from '../../../types';

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const profile = await queryOne<Profile>('SELECT * FROM profile LIMIT 1');
    return new Response(JSON.stringify(profile || {}), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener perfil' }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      name,
      title,
      bio,
      email,
      location,
      avatar_url,
      github_url,
      linkedin_url,
      twitter_url,
      years_experience,
      availability,
    } = body;

    // Check if profile exists
    const existing = await queryOne<Profile>('SELECT id FROM profile LIMIT 1');

    if (existing) {
      await query(
        `UPDATE profile SET
          name = ?,
          title = ?,
          bio = ?,
          email = ?,
          location = ?,
          avatar_url = ?,
          github_url = ?,
          linkedin_url = ?,
          twitter_url = ?,
          years_experience = ?,
          availability = ?
         WHERE id = ?`,
        [
          name,
          title,
          bio,
          email,
          location,
          avatar_url,
          github_url,
          linkedin_url,
          twitter_url,
          years_experience,
          availability ?? null,
          existing.id,
        ]
      );
    } else {
      await query(
        `INSERT INTO profile (
          name, title, bio, email, location, avatar_url,
          github_url, linkedin_url, twitter_url, years_experience, availability
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          title,
          bio,
          email,
          location,
          avatar_url,
          github_url,
          linkedin_url,
          twitter_url,
          years_experience,
          availability ?? null,
        ]
      );
    }

    return new Response(JSON.stringify({ message: 'Perfil actualizado exitosamente' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al actualizar perfil' }), { status: 500 });
  }
};
