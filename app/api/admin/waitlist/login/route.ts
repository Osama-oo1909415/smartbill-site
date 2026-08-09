import { createWaitlistAdminToken, getWaitlistAdminEmail, isWaitlistAdminEmail, normalizeEmail } from "../../../../lib/waitlist-admin";
import { sendWaitlistAdminMagicLink } from "../../../../lib/waitlist-email";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof payload?.email === "string" ? normalizeEmail(payload.email) : "";
  if (!email || !isWaitlistAdminEmail(email)) return Response.json({ ok: true });
  const token = await createWaitlistAdminToken(email, "login", 15 * 60);
  if (!token) return Response.json({ error: "admin_login_unavailable" }, { status: 503 });
  const url = new URL(request.url);
  const sent = await sendWaitlistAdminMagicLink(getWaitlistAdminEmail()!, `${url.origin}/api/admin/waitlist/verify?token=${encodeURIComponent(token)}`);
  return sent ? Response.json({ ok: true }) : Response.json({ error: "email_unavailable" }, { status: 503 });
}
