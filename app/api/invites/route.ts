import { getDb } from "../../../db";
import { inviteCodes } from "../../../db/schema";

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { language?: unknown; campaign?: unknown };
    const language = payload.language === "en" ? "en" : "ar";
    const campaign = payload.campaign === "beta_invite" ? "beta_invite" : "month_card";
    const code = crypto.randomUUID().replaceAll("-", "").slice(0, 12);
    await getDb().insert(inviteCodes).values({
      code,
      language,
      campaign,
      expiresAt: new Date(Date.now() + NINETY_DAYS_MS),
    });
    return Response.json(
      { code, url: `https://smartbill.dev/i/${code}` },
      { status: 201, headers: { "cache-control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "invite_unavailable" }, { status: 500 });
  }
}
