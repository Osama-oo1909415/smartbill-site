import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:5173";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "SmartBill | مصروفاتك أوضح. وخصوصيتك لك.",
    description: "تطبيق إدارة مالية Local-first بمسح ذكي للفواتير، مساعد مالي مدمج، وتقارير واضحة — مع خصوصية تبدأ من جهازك.",
    icons: { icon: "/app-icon.png", apple: "/app-icon.png" },
    openGraph: {
      title: "SmartBill | مصروفاتك أوضح. وخصوصيتك لك.",
      description: "مسح ذكي، مساعد مالي مدمج، وبيانات تبدأ من جهازك.",
      type: "website",
      locale: "ar_SA",
      images: [{ url: `${origin}/og.png`, width: 1680, height: 945, alt: "SmartBill — مصروفاتك أوضح وخصوصيتك لك" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "SmartBill | مصروفاتك أوضح. وخصوصيتك لك.",
      description: "مسح ذكي، مساعد مالي مدمج، وبيانات تبدأ من جهازك.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
