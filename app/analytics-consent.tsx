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

  useEffect(() => {
    const saved = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    const listener = () => setOpen(true);
    window.addEventListener(OPEN_ANALYTICS_PREFERENCES_EVENT, listener);
    const timer = saved === "granted" || saved === "denied" ? window.setTimeout(() => setConsent(saved), 0) : undefined;
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener(OPEN_ANALYTICS_PREFERENCES_EVENT, listener);
    };
  }, []);

  function choose(next: "granted" | "denied") {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, next);
    setConsent(next);
    setOpen(false);
  }

  const copy = lang === "ar"
    ? { title: "اختيارات الخصوصية", body: "نستخدم تحليلات مجهولة لفهم استخدام الموقع وتحسينه. لن نرسل سجلاتك المالية أو صور فواتيرك.", allow: "السماح بالتحليلات", deny: "المتابعة دون تحليلات" }
    : { title: "Privacy choices", body: "We use anonymous analytics to understand and improve the site. We never send your financial records or receipt images.", allow: "Allow analytics", deny: "Continue without analytics" };

  return <>
    {consent === "granted" ? <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${GOOGLE_ANALYTICS_ID}');`}</Script>
    </> : null}
    {consent === "unknown" || open ? <aside className="analytics-consent" aria-label={copy.title}>
      <div><strong>{copy.title}</strong><p>{copy.body}</p></div>
      <div className="analytics-consent-actions"><button type="button" className="button secondary-button" onClick={() => choose("denied")}>{copy.deny}</button><button type="button" className="button primary-button" onClick={() => choose("granted")}>{copy.allow}</button></div>
    </aside> : null}
  </>;
}
