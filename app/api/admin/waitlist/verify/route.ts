import { createWaitlistAdminToken, verifyWaitlistAdminToken, waitlistAdminCookieName } from "../../../../lib/waitlist-admin";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const loginToken = url.searchParams.get("token");
  const login = loginToken ? await verifyWaitlistAdminToken(loginToken, "login") : null;
  if (!login) return Response.redirect(new URL("/admin/waitlist/login?invalid=1", url), 302);
  const session = await createWaitlistAdminToken(login.email, "session", 12 * 60 * 60);
  if (!session) return Response.redirect(new URL("/admin/waitlist/login?invalid=1", url), 302);
  const response = Response.redirect(new URL("/admin/waitlist", url), 302);
  response.headers.append("Set-Cookie", `${waitlistAdminCookieName}=${session}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${12 * 60 * 60}`);
  return response;
}
