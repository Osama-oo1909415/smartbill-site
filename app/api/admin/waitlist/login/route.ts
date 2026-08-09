import { authenticateWaitlistAdmin, createWaitlistAdminSession, waitlistAdminCookieName } from "../../../../lib/waitlist-admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as { username?: unknown; password?: unknown } | null;
  const username = typeof payload?.username === "string" ? payload.username : "";
  const password = typeof payload?.password === "string" ? payload.password : "";
  if (!(await authenticateWaitlistAdmin(username, password))) return Response.json({ error: "invalid_credentials" }, { status: 401 });
  const session = await createWaitlistAdminSession(username.trim());
  if (!session) return Response.json({ error: "admin_login_unavailable" }, { status: 503 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(waitlistAdminCookieName, session, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 12 * 60 * 60, path: "/" });
  return response;
}
