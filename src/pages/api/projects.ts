import type { APIRoute } from 'astro';
import { query } from '../../lib/db';
import type { Project } from '../../types';

export const GET: APIRoute = async ({ url }) => {
  try {
    const featured = url.searchParams.get('featured');
    let sql = 'SELECT * FROM projects';
    const params: unknown[] = [];

    if (featured === 'true') {
      sql += ' WHERE featured = 1';
    }
    sql += ' ORDER BY featured DESC, created_at DESC';

    const projects = await query<Project>(sql, params);
    return new Response(JSON.stringify({ data: projects }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
