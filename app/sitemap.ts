import type { MetadataRoute } from "next";
import { localizedPath, SITE_URL, type SiteLanguage } from "./locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/faq", "/privacy-policy", "/terms", "/contact"];
  const lastModified = new Date("2026-08-13T00:00:00.000Z");
  return (["ar", "en"] as SiteLanguage[]).flatMap((language) => paths.map((path) => ({
    url: `${SITE_URL}${localizedPath(path, language)}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 1 : 0.6,
  })));
}
