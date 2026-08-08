import { getDb } from "../../../db";
import { waitlistEntries } from "../../../db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: unknown; language?: unknown; website?: unknown };
    if (typeof payload.website === "string" && payload.website.trim()) return Response.json({ ok: true }, { status: 201 });
    const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    const language = payload.language === "en" ? "en" : "ar";
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) return Response.json({ error: "invalid_email" }, { status: 400 });
    const rows = await getDb().insert(waitlistEntries).values({ email, language }).onConflictDoNothing().returning({ id: waitlistEntries.id });
    return Response.json({ ok: true, existing: rows.length === 0 }, { status: rows.length ? 201 : 200 });
  } catch {
    return Response.json({ error: "waitlist_unavailable" }, { status: 500 });
  }
}
