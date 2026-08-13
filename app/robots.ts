import type { MetadataRoute } from "next";
import { SITE_URL } from "./locale";

export default function robots(): MetadataRoute.Robots {
  const agents = ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "GPTBot", "ClaudeBot", "Google-Extended"];
  return {
    rules: [
      { userAgent: "*", allow: ["/"], disallow: ["/api/", "/admin/"] },
      ...agents.map((userAgent) => ({ userAgent, allow: ["/"], disallow: ["/api/", "/admin/"] })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
