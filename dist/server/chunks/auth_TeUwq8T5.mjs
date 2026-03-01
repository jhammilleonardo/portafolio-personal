const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";
function isAuthenticated(request) {
  const cookie = request.headers.get("cookie") ?? "";
  const cookies = Object.fromEntries(
    cookie.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k, v.join("=")];
    })
  );
  return cookies[SESSION_COOKIE] === SESSION_VALUE;
}
function authCookie(maxAge = 60 * 60 * 8) {
  return `${SESSION_COOKIE}=${SESSION_VALUE}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}`;
}
function clearAuthCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}

export { authCookie as a, clearAuthCookie as c, isAuthenticated as i };
