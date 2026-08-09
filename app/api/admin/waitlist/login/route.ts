import { authenticateWaitlistAdmin, createWaitlistAdminSession, waitlistAdminCookieName } from "../../../../lib/waitlist-admin";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as { username?: unknown; password?: unknown } | null;
  const username = typeof payload?.username === "string" ? payload.username : "";
  const password = typeof payload?.password === "string" ? payload.password : "";
  if (!(await authenticateWaitlistAdmin(username, password))) return Response.json({ error: "invalid_credentials" }, { status: 401 });
  const session = await createWaitlistAdminSession(username.trim());
  if (!session) return Response.json({ error: "admin_login_unavailable" }, { status: 503 });
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json", "Set-Cookie": `${waitlistAdminCookieName}=${session}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${12 * 60 * 60}` } });
}
