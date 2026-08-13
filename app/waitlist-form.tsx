"use client";

import { FormEvent, useEffect, useState } from "react";
import { trackEvent } from "./analytics";
import Link from "./internal-link";
import { useSitePreferences } from "./site-preferences";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const { lang } = useSitePreferences();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  const t = lang === "ar" ? {
    label: "بريدك الإلكتروني",
    placeholder: "name@example.com",
    submit: "سجّل اهتمامي",
    loading: "جارٍ التسجيل…",
    success: "تم تسجيل اهتمامك. سنخبرك عندما يصبح SmartBill جاهزاً للتجربة.",
    error: "تعذّر التسجيل الآن. حاول مرة أخرى.",
    consent: "بالتسجيل، توافق على استخدام بريدك لإشعارات الإطلاق فقط وفق",
    privacy: "سياسة الخصوصية",
    formHelp: "تحديثات الإطلاق فقط — يمكنك إلغاء الاشتراك في أي وقت.",
    count: (value: number) => value > 0 ? `${value.toLocaleString("ar")} مهتماً سجّلوا حتى الآن — رقم حقيقي من قائمة الانتظار.` : "فُتحت القائمة حديثاً — كن من أوائل المنضمين.",
  } : {
    label: "Your email address",
    placeholder: "name@example.com",
    submit: "Join the waitlist",
    loading: "Joining…",
    success: "You’re on the list. We’ll let you know when SmartBill is ready to try.",
    error: "We couldn’t save your email right now. Please try again.",
    consent: "By joining, you agree to receive launch-only updates under our",
    privacy: "privacy policy",
    formHelp: "Launch updates only — you can unsubscribe at any time.",
    count: (value: number) => value > 0 ? `${value.toLocaleString("en")} people have joined so far — a live waitlist count.` : "The list has just opened — be among the first to join.",
  };

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/waitlist", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { count?: unknown }) => {
        if (typeof payload.count === "number" && Number.isFinite(payload.count)) setWaitlistCount(payload.count);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, language: lang, website }),
      });
      if (!response.ok) throw new Error("waitlist_failed");
      const result = await response.json() as { existing?: boolean };
      if (!result.existing) setWaitlistCount((value) => value === null ? value : value + 1);
      setStatus("success");
      setEmail("");
      trackEvent("waitlist_submit_success", { locale: lang, existing: Boolean(result.existing) });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={`waitlist-form-wrap ${compact ? "compact" : ""}`}>
      <form className="waitlist-form" onSubmit={submit}>
        <label className="sr-only" htmlFor={compact ? "waitlist-email-compact" : "waitlist-email"}>{t.label}</label>
        <input id={compact ? "waitlist-email-compact" : "waitlist-email"} type="email" inputMode="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} onFocus={() => trackEvent("waitlist_form_start", { locale: lang })} placeholder={t.placeholder} aria-describedby={compact ? undefined : "waitlist-email-help"} aria-invalid={status === "error"} />
        <input className="honeypot" tabIndex={-1} aria-hidden="true" autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        <button type="submit" disabled={status === "loading"} aria-busy={status === "loading"}>{status === "loading" ? t.loading : t.submit}</button>
      </form>
      {status === "success" ? <p className="form-message success-message" role="status">✓ {t.success}</p> : null}
      {status === "error" ? <p className="form-message error-message" role="alert">{t.error}</p> : null}
      {waitlistCount !== null ? <p className="waitlist-count" aria-live="polite"><span aria-hidden="true">●</span>{t.count(waitlistCount)}</p> : null}
      <small id={compact ? undefined : "waitlist-email-help"} className="form-consent">{t.formHelp} {t.consent} <Link href="/privacy-policy">{t.privacy}</Link>.</small>
    </div>
  );
}
