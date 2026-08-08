import { getDb } from "../../../db";
import { contactMessages } from "../../../db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    if (typeof payload.website === "string" && payload.website.trim()) return Response.json({ ok: true }, { status: 201 });
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    const topic = typeof payload.topic === "string" ? payload.topic.trim() : "";
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    const language = payload.language === "en" ? "en" : "ar";
    if (!name || name.length > 120 || !email || email.length > 254 || !EMAIL_RE.test(email) || !topic || topic.length > 80 || message.length < 10 || message.length > 2000) return Response.json({ error: "invalid_message" }, { status: 400 });
    await getDb().insert(contactMessages).values({ name, email, topic, message, language });
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "contact_unavailable" }, { status: 500 });
  }
}
