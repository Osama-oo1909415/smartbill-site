import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AnalyticsConsent } from "./analytics-consent";
import { PreferencesProvider, type SiteLanguage } from "./site-preferences";
import "./globals.css";

const siteUrl = "https://smartbill.dev";
const siteTitle = "SmartBill | Clearer spending, privacy that stays yours";
const siteDescription = "Capture receipts, review the details, and understand your spending with privacy that stays yours. صوّر فواتيرك، راجع البيانات، وافهم إنفاقك بخصوصية تبقى لك.";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: { default: siteTitle, template: "%s | SmartBill" },
    description: siteDescription,
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
        { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
        { url: "/icon.png", type: "image/png", sizes: "192x192" },
      ],
      shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
      apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      type: "website",
      url: siteUrl,
      locale: "en_US",
      alternateLocale: ["ar_SA"],
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, type: "image/png", alt: siteTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [{ url: `${siteUrl}/og-image.png`, alt: siteTitle }],
    },
};

const preferenceScript = `(function(){try{var c=document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);var l=c?decodeURIComponent(c[1]):(localStorage.getItem('lang')||localStorage.getItem('smartbill-language')||'ar');if(l!=='ar'&&l!=='en')l='ar';var t=localStorage.getItem('smartbill-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';document.documentElement.dataset.theme=t}catch(e){}})();`;
function localeFromCookie(value: string | undefined): SiteLanguage {
  return value === "en" || value === "ar" ? value : "ar";
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = localeFromCookie((await cookies()).get("NEXT_LOCALE")?.value);
  return <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} data-theme="light" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: preferenceScript }} /><meta property="og:image:secure_url" content={`${siteUrl}/og-image.png`} /><meta property="og:image:type" content="image/png" /><link rel="image_src" href={`${siteUrl}/og-image.png`} /></head><body><PreferencesProvider initialLanguage={locale}><AnalyticsConsent />{children}</PreferencesProvider></body></html>;
}
