import type { MetadataRoute } from "next";
import { SITE_URL } from "./locale";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: ["/ar", "/en"], disallow: ["/admin", "/api"] }], sitemap: `${SITE_URL}/sitemap.xml` };
}
