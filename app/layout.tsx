import type { Metadata } from "next";
import Script from "next/script";
import { PreferencesProvider } from "./site-preferences";
import "./globals.css";

const siteUrl = "https://smartbill.dev";
const siteTitle = "SmartBill | مصروفاتك تحت control";
const siteDescription = "مصروفاتك تحت control، وفواتيرك مشفرة على جهازك بذكاء وخصوصية. SmartBill: Private, on-device expense tracking and instant receipt scanning.";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: { default: siteTitle, template: "%s | SmartBill" },
    description: siteDescription,
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
        { url: "/icon.png", type: "image/png", sizes: "192x192" },
      ],
      apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      type: "website",
      url: siteUrl,
      locale: "ar_SA",
      alternateLocale: ["en_US"],
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: siteTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [`${siteUrl}/og-image.png`],
    },
};

const preferenceScript = `(function(){try{var l=localStorage.getItem('smartbill-language')||'ar';var t=localStorage.getItem('smartbill-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';document.documentElement.dataset.theme=t}catch(e){}})();`;
const googleAnalyticsId = "G-BQFVFK5N91";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl" data-theme="light" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: preferenceScript }} /></head><body><Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${googleAnalyticsId}');`}</Script><PreferencesProvider>{children}</PreferencesProvider></body></html>;
}
