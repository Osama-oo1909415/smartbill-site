import { env } from "cloudflare:workers";

export function getRuntimeEnv(key: string): string | null {
  const value = (env as unknown as Record<string, unknown>)[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
