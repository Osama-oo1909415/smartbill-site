"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { ANALYTICS_CONSENT_KEY, OPEN_ANALYTICS_PREFERENCES_EVENT } from "./analytics";
import { useSitePreferences } from "./site-preferences";

const GOOGLE_ANALYTICS_ID = "G-BQFVFK5N91";

export function openAnalyticsPreferences() {
  window.dispatchEvent(new Event(OPEN_ANALYTICS_PREFERENCES_EVENT));
}

export function AnalyticsConsent() {
  const { lang } = useSitePreferences();
  const [consent, setConsent] = useState<"unknown" | "granted" | "denied">("unknown");
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    const listener = () => setOpen(true);
    window.addEventListener(OPEN_ANALYTICS_PREFERENCES_EVENT, listener);
    if (saved === "granted" || saved === "denied") setConsent(saved);
    setHydrated(true);
    return () => {
      window.removeEventListener(OPEN_ANALYTICS_PREFERENCES_EVENT, listener);
    };
  }, []);

  function choose(next: "granted" | "denied") {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, next);
    setConsent(next);
    setOpen(false);
  }

  const copy = lang === "ar"
    ? { title: "اختيارات الخصوصية", body: "التحليلات اختيارية. لا نفعّل Google Analytics إلا بعد موافقتك. عند السماح، نقيس زيارات الصفحات وتفاعل الأزرار وبدء التسجيل ونجاحه، مع اللغة وبعض بيانات المتصفح، وقد تستخدم Google ملفات تعريف ارتباط للقياس وفق سياستها؛ لا نرسل بريدك الإلكتروني أو سجلاتك المالية أو صور فواتيرك أو محتوى المساعد إلى التحليلات. نحفظ البيانات التي ترسلها فقط عند إرسال نموذج قائمة الانتظار أو التواصل؛ ويُستخدم بريد القائمة لتحديثات الإطلاق.", allow: "السماح بتحليلات الموقع", deny: "المتابعة دون تحليلات" }
    : { title: "Privacy choices", body: "Analytics are optional. Google Analytics loads only after you allow it. If enabled, we measure page visits, button interactions, and waitlist form start/success, along with language and basic browser data. Google may use measurement cookies under its own policy. We do not send your email address, financial records, receipt images, or assistant content to Analytics. We store the information you submit through the waitlist or contact form; waitlist email is used for launch updates.", allow: "Allow website analytics", deny: "Continue without analytics" };

  return <>
    {consent === "granted" ? <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${GOOGLE_ANALYTICS_ID}');`}</Script>
    </> : null}
    {hydrated && (consent === "unknown" || open) ? <aside className="analytics-consent" aria-label={copy.title}>
      <div><strong>{copy.title}</strong><p>{copy.body}</p></div>
      <div className="analytics-consent-actions"><button type="button" className="button secondary-button" onClick={() => choose("denied")}>{copy.deny}</button><button type="button" className="button primary-button" onClick={() => choose("granted")}>{copy.allow}</button></div>
    </aside> : null}
  </>;
}
