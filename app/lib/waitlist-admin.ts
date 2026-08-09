import { notFound } from "next/navigation";
import { requireChatGPTUser, type ChatGPTUser } from "../chatgpt-auth";
import { getRuntimeEnv } from "./runtime-env";

function normalizeEmail(value: string): string {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] ?? value).trim().toLowerCase();
}

export async function requireWaitlistAdmin(returnTo = "/admin/waitlist"): Promise<ChatGPTUser> {
  const user = await requireChatGPTUser(returnTo);
  const allowedEmail = getRuntimeEnv("WAITLIST_ADMIN_EMAIL") ?? getRuntimeEnv("WAITLIST_REPLY_TO");
  if (!allowedEmail || normalizeEmail(user.email) !== normalizeEmail(allowedEmail)) notFound();
  return user;
}
