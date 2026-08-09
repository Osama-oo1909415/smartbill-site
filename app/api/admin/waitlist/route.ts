import { desc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { waitlistEntries } from "../../../../db/schema";
import { getWaitlistAdminSession } from "../../../lib/waitlist-admin";

export async function GET() {
  if (!(await getWaitlistAdminSession())) return Response.json({ error: "unauthorized" }, { status: 401 });
  try {
    const entries = await getDb().select().from(waitlistEntries).orderBy(desc(waitlistEntries.createdAt));
    return Response.json({ entries }, { headers: { "cache-control": "no-store" } });
  } catch {
    return Response.json({ error: "waitlist_unavailable" }, { status: 500 });
  }
}
