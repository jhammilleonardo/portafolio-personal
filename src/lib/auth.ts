import type { AstroGlobal } from 'astro';

const SESSION_COOKIE = 'admin_session';
const SESSION_VALUE = 'authenticated';

export function isAuthenticated(request: Request): boolean {
  const cookie = request.headers.get('cookie') ?? '';
  const cookies = Object.fromEntries(
    cookie.split(';').map(c => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    })
  );
  return cookies[SESSION_COOKIE] === SESSION_VALUE;
}

export function authCookie(maxAge = 60 * 60 * 8): string {
  return `${SESSION_COOKIE}=${SESSION_VALUE}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}`;
}

export function clearAuthCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}
