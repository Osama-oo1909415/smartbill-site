import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { waitlistEntries } from "../../../db/schema";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { token?: unknown };
    const token = typeof payload.token === "string" ? payload.token.trim() : "";
    if (!token || token.length > 100) return Response.json({ error: "invalid_token" }, { status: 400 });
    const rows = await getDb().update(waitlistEntries).set({ unsubscribedAt: new Date() }).where(eq(waitlistEntries.unsubscribeToken, token)).returning({ id: waitlistEntries.id });
    if (!rows.length) return Response.json({ error: "token_not_found" }, { status: 404 });
    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ error: "unsubscribe_unavailable" }, { status: 500 });
  }
}
