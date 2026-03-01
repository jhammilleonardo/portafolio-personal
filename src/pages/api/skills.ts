import type { APIRoute } from 'astro';
import { query } from '../../lib/db';
import type { Skill } from '../../types';

export const GET: APIRoute = async () => {
  try {
    const skills = await query<Skill>(
      'SELECT * FROM skills ORDER BY category, level DESC'
    );
    return new Response(JSON.stringify({ data: skills }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
