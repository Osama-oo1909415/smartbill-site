import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRuntimeEnv } from "./runtime-env";

const SESSION_COOKIE = "smartbill_waitlist_admin";
const encoder = new TextEncoder();
type AdminSession = { username: string; exp: number };

export async function authenticateWaitlistAdmin(username: string, password: string): Promise<boolean> {
  const expectedUsername = getRuntimeEnv("WAITLIST_ADMIN_USERNAME");
  const expectedPasswordDigest = getRuntimeEnv("WAITLIST_ADMIN_PASSWORD_DIGEST");
  const secret = getRuntimeEnv("WAITLIST_ADMIN_SESSION_SECRET");
  if (!expectedUsername || !expectedPasswordDigest || !secret) return false;
  return constantTimeEqual(username.trim(), expectedUsername) && constantTimeEqual(await sign(password, secret), expectedPasswordDigest);
}

export async function createWaitlistAdminSession(username: string): Promise<string | null> {
  const secret = getRuntimeEnv("WAITLIST_ADMIN_SESSION_SECRET");
  if (!secret) return null;
  const payload = base64urlEncode(JSON.stringify({ username, exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60 }));
  return `${payload}.${await sign(payload, secret)}`;
}

export async function getWaitlistAdminSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const secret = getRuntimeEnv("WAITLIST_ADMIN_SESSION_SECRET");
  if (!secret) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !constantTimeEqual(signature, await sign(payload, secret))) return null;
  try {
    const session = JSON.parse(base64urlDecode(payload)) as AdminSession;
    return session.exp > Math.floor(Date.now() / 1000) && session.username === getRuntimeEnv("WAITLIST_ADMIN_USERNAME") ? session : null;
  } catch { return null; }
}

export async function requireWaitlistAdmin(): Promise<AdminSession> {
  const session = await getWaitlistAdminSession();
  if (session) return session;
  redirect("/admin/waitlist/login");
}

export const waitlistAdminCookieName = SESSION_COOKIE;

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64urlEncodeBytes(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return difference === 0;
}

function base64urlEncode(value: string): string { return base64urlEncodeBytes(encoder.encode(value)); }
function base64urlEncodeBytes(value: Uint8Array): string {
  let binary = "";
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function base64urlDecode(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return new TextDecoder().decode(Uint8Array.from(atob(normalized), (char) => char.charCodeAt(0)));
}
