import { queryOne, query } from '../../../chunks/db_DC8ZIcEa.mjs';
import { i as isAuthenticated } from '../../../chunks/auth_TeUwq8T5.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
  }
  try {
    const profile = await queryOne("SELECT * FROM profile LIMIT 1");
    return new Response(JSON.stringify(profile || {}), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al obtener perfil" }), { status: 500 });
  }
};
const PUT = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
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
      availability
    } = body;
    const existing = await queryOne("SELECT id FROM profile LIMIT 1");
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
          existing.id
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
          availability ?? null
        ]
      );
    }
    return new Response(JSON.stringify({ message: "Perfil actualizado exitosamente" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error al actualizar perfil" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
