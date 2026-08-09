import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRuntimeEnv } from "./runtime-env";

const SESSION_COOKIE = "smartbill_waitlist_admin";
const encoder = new TextEncoder();

type AdminToken = { email: string; exp: number; purpose: "login" | "session" };

export function normalizeEmail(value: string): string {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] ?? value).trim().toLowerCase();
}

export function getWaitlistAdminEmail(): string | null {
  const value = getRuntimeEnv("WAITLIST_ADMIN_EMAIL") ?? getRuntimeEnv("WAITLIST_REPLY_TO");
  return value ? normalizeEmail(value) : null;
}

export function isWaitlistAdminEmail(email: string): boolean {
  const adminEmail = getWaitlistAdminEmail();
  return Boolean(adminEmail && normalizeEmail(email) === adminEmail);
}

export async function createWaitlistAdminToken(
  email: string,
  purpose: AdminToken["purpose"],
  lifetimeSeconds: number,
): Promise<string | null> {
  const secret = getRuntimeEnv("WAITLIST_ADMIN_SESSION_SECRET");
  if (!secret) return null;
  const payload = base64urlEncode(JSON.stringify({ email: normalizeEmail(email), exp: Math.floor(Date.now() / 1000) + lifetimeSeconds, purpose }));
  const signature = await sign(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifyWaitlistAdminToken(token: string, purpose: AdminToken["purpose"]): Promise<AdminToken | null> {
  const secret = getRuntimeEnv("WAITLIST_ADMIN_SESSION_SECRET");
  if (!secret) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !(await constantTimeEqual(signature, await sign(payload, secret)))) return null;
  try {
    const decoded = JSON.parse(base64urlDecode(payload)) as AdminToken;
    if (decoded.purpose !== purpose || decoded.exp <= Math.floor(Date.now() / 1000) || !isWaitlistAdminEmail(decoded.email)) return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function getWaitlistAdminSession(): Promise<AdminToken | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return token ? verifyWaitlistAdminToken(token, "session") : null;
}

export async function requireWaitlistAdmin(): Promise<AdminToken> {
  const session = await getWaitlistAdminSession();
  if (session) return session;
  redirect("/admin/waitlist/login");
}

export const waitlistAdminCookieName = SESSION_COOKIE;

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return base64urlEncodeBytes(new Uint8Array(signature));
}

async function constantTimeEqual(a: string, b: string): Promise<boolean> {
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
  const binary = atob(normalized);
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
}
