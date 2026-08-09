import { and, eq, gt, sql } from "drizzle-orm";

import { getDb } from "../../../db";
import { inviteCodes } from "../../../db/schema";

const CODE_RE = /^[a-f0-9]{12}$/;

export async function GET(
  request: Request,
  context: { params: Promise<{ code: string }> },
) {
  const { code } = await context.params;
  const requestUrl = new URL(request.url);
  const fallback = new URL("/", requestUrl.origin);
  if (!CODE_RE.test(code)) return Response.redirect(fallback, 302);

  try {
    const [invite] = await getDb()
      .select({ language: inviteCodes.language, campaign: inviteCodes.campaign })
      .from(inviteCodes)
      .where(and(eq(inviteCodes.code, code), gt(inviteCodes.expiresAt, new Date())))
      .limit(1);
    if (!invite) return Response.redirect(fallback, 302);

    await getDb()
      .update(inviteCodes)
      .set({ clickCount: sql`${inviteCodes.clickCount} + 1` })
      .where(eq(inviteCodes.code, code));

    const destination = new URL("/", requestUrl.origin);
    destination.searchParams.set("ref", code);
    destination.searchParams.set("campaign", invite.campaign);
    const headers = new Headers({
      location: destination.toString(),
      "cache-control": "no-store",
    });
    headers.append("set-cookie", `smartbill_referral=${code}; Path=/; Max-Age=2592000; SameSite=Lax; Secure; HttpOnly`);
    headers.append("set-cookie", `smartbill_language=${invite.language}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`);
    return new Response(null, { status: 302, headers });
  } catch {
    return Response.redirect(fallback, 302);
  }
}
