import { createWaitlistAdminToken, verifyWaitlistAdminToken, waitlistAdminCookieName } from "../../../../lib/waitlist-admin";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const loginToken = url.searchParams.get("token");
  const login = loginToken ? await verifyWaitlistAdminToken(loginToken, "login") : null;
  if (!login) return redirectTo("/admin/waitlist/login?invalid=1", url);
  const session = await createWaitlistAdminToken(login.email, "session", 12 * 60 * 60);
  if (!session) return redirectTo("/admin/waitlist/login?invalid=1", url);
  return new Response(null, { status: 302, headers: {
    Location: new URL("/admin/waitlist", url).toString(),
    "Set-Cookie": `${waitlistAdminCookieName}=${session}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${12 * 60 * 60}`,
  } });
}

function redirectTo(path: string, base: URL): Response {
  return new Response(null, { status: 302, headers: { Location: new URL(path, base).toString() } });
}
