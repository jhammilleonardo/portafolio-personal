import type { APIRoute } from 'astro';
import { query } from '../../lib/db';
import type { Certification } from '../../types';

export const GET: APIRoute = async () => {
  try {
    const certs = await query<Certification>(
      'SELECT * FROM certifications ORDER BY issue_date DESC'
    );
    return new Response(JSON.stringify({ data: certs }), {
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
