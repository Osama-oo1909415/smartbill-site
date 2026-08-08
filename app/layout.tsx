import type { Metadata } from "next";
import { headers } from "next/headers";
import { PreferencesProvider } from "./site-preferences";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    title: { default: "SmartBill | Clearer finances. Privacy that stays yours.", template: "%s | SmartBill" },
    description: "SmartBill is a bilingual, local-first personal finance app with on-device receipt OCR, a built-in assistant, and clear reports.",
    icons: { icon: "/app-icon.png", apple: "/app-icon.png" },
    openGraph: { title: "SmartBill | مصروفاتك أوضح. وخصوصيتك لك.", description: "Arabic and English. Light and dark. On-device receipt OCR and private financial guidance.", type: "website", locale: "ar_SA", alternateLocale: ["en_US"], images: [{ url: `${origin}/og-bilingual.png`, width: 1680, height: 945, alt: "SmartBill — clearer finances with privacy that starts on your device" }] },
    twitter: { card: "summary_large_image", title: "SmartBill | Clearer finances. Privacy that stays yours.", description: "Bilingual, local-first finance with on-device OCR.", images: [`${origin}/og-bilingual.png`] },
  };
}

const preferenceScript = `(function(){try{var l=localStorage.getItem('smartbill-language')||'ar';var t=localStorage.getItem('smartbill-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl" data-theme="light" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: preferenceScript }} /></head><body><PreferencesProvider>{children}</PreferencesProvider></body></html>;
}
