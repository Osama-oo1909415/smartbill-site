import type { Metadata } from "next";

export type SiteLanguage = "ar" | "en";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

const pageMeta = {
  "/": {
    ar: { title: "SmartBill | مصروفاتك أوضح وخصوصيتك لك", description: "صوّر فواتيرك، راجع البيانات، وافهم إنفاقك بخصوصية تبقى لك." },
    en: { title: "SmartBill | Clearer spending, privacy that stays yours", description: "Capture receipts, review the details, and understand your spending with privacy that stays yours." },
  },
  "/about": {
    ar: { title: "عن SmartBill | وضوح وتحكّم قبل الاستعراض", description: "تعرّف على مشروع SmartBill ومبادئه في الوضوح، الخصوصية، والتحكّم." },
    en: { title: "About SmartBill | Clarity before spectacle", description: "Learn about SmartBill and its principles around clarity, privacy, and user control." },
  },
  "/faq": {
    ar: { title: "الأسئلة الشائعة | SmartBill", description: "إجابات واضحة عن المسح المحلي، المراجعة، المزامنة، والخصوصية في SmartBill." },
    en: { title: "FAQ | SmartBill", description: "Clear answers about local scanning, review, sync, and privacy in SmartBill." },
  },
  "/privacy-policy": {
    ar: { title: "سياسة الخصوصية | SmartBill", description: "كيف يعالج SmartBill بياناتك ويخزنها ويمنحك التحكم في حذفها ومزامنتها." },
    en: { title: "Privacy policy | SmartBill", description: "How SmartBill processes, stores, and gives you control over your data." },
  },
  "/terms": {
    ar: { title: "شروط الاستخدام | SmartBill", description: "شروط استخدام SmartBill وحدود الاستخراج الآلي والمعلومات المالية." },
    en: { title: "Terms of use | SmartBill", description: "SmartBill terms of use and the boundaries of automatic extraction and financial information." },
  },
  "/contact": {
    ar: { title: "تواصل معنا | SmartBill", description: "تواصل مع SmartBill بشأن الوصول المبكر، الخصوصية، البيانات، أو الدعم التقني." },
    en: { title: "Contact | SmartBill", description: "Contact SmartBill about early access, privacy, data, or technical support." },
  },
  "/guides/audience-response-systems": {
    ar: { title: "Audience response systems | SmartBill", description: "A practical guide to audience response systems, participation, privacy, and better feedback loops." },
    en: { title: "Audience response systems", description: "A practical guide to audience response systems, participation, privacy, and better feedback loops." },
  },
  "/unsubscribe": {
    ar: { title: "إلغاء الاشتراك | SmartBill", description: "إدارة رسائل SmartBill وإيقاف تحديثات الوصول المبكر." },
    en: { title: "Unsubscribe | SmartBill", description: "Manage SmartBill messages and stop early-access updates." },
  },
} as const;

export function isSiteLanguage(value: string): value is SiteLanguage {
  return value === "ar" || value === "en";
}

export function metadataForPath(path: string, language: SiteLanguage) {
  return pageMeta[path as keyof typeof pageMeta]?.[language] ?? pageMeta["/"][language];
}

export function localizedPath(path: string, language: SiteLanguage): string {
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/api/") || path.startsWith("/admin")) return path;
  if (path === `/${language}` || path.startsWith(`/${language}/`)) return path;
  return `/${language}${path === "/" ? "" : path}`;
}

export function switchLocalePath(path: string, language: SiteLanguage): string {
  const segments = path.split("/");
  if (isSiteLanguage(segments[1] ?? "")) {
    const rest = segments.slice(2).join("/");
    return `/${language}${rest ? `/${rest}` : ""}`;
  }
  return localizedPath(path, language);
}

export function localizedMetadata(language: SiteLanguage, path: string): Metadata {
  const copy = metadataForPath(path, language);
  const title = copy.title.replace(/^\s*SmartBill\s*\|\s*/i, "").replace(/\s*\|\s*SmartBill\s*$/i, "");
  const canonicalPath = localizedPath(path, language);
  const image = language === "ar" ? "/og-image.png" : "/og-bilingual.png";
  const dynamicImage = `${SITE_URL}/og?locale=${language}&path=${encodeURIComponent(canonicalPath)}`;
  return {
    title,
    description: copy.description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        ar: localizedPath(path, "ar"),
        en: localizedPath(path, "en"),
      },
    },
    openGraph: {
      title,
      description: copy.description,
      type: "website",
      url: `${SITE_URL}${canonicalPath}`,
      locale: language === "ar" ? "ar_SA" : "en_US",
      alternateLocale: language === "ar" ? ["en_US"] : ["ar_SA"],
      images: [
        { url: dynamicImage, width: 1200, height: 630, type: "image/png", alt: title },
        { url: `${SITE_URL}${image}`, width: 1200, height: 630, type: "image/png", alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.description,
      images: [dynamicImage, `${SITE_URL}${image}`],
    },
  };
}
