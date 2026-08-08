"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useSitePreferences } from "./site-preferences";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const { lang } = useSitePreferences();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const t = lang === "ar" ? {
    label: "بريدك الإلكتروني",
    placeholder: "name@example.com",
    submit: "سجّل اهتمامي",
    loading: "جارٍ التسجيل…",
    success: "تم تسجيل اهتمامك. سنخبرك عندما يصبح SmartBill جاهزاً للتجربة.",
    error: "تعذّر التسجيل الآن. حاول مرة أخرى.",
    consent: "بالتسجيل، توافق على استخدام بريدك لإشعارات الإطلاق فقط وفق",
    privacy: "سياسة الخصوصية",
  } : {
    label: "Your email address",
    placeholder: "name@example.com",
    submit: "Join the waitlist",
    loading: "Joining…",
    success: "You’re on the list. We’ll let you know when SmartBill is ready to try.",
    error: "We couldn’t save your email right now. Please try again.",
    consent: "By joining, you agree to receive launch-only updates under our",
    privacy: "privacy policy",
  };

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
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={`waitlist-form-wrap ${compact ? "compact" : ""}`}>
      <form className="waitlist-form" onSubmit={submit}>
        <label className="sr-only" htmlFor={compact ? "waitlist-email-compact" : "waitlist-email"}>{t.label}</label>
        <input id={compact ? "waitlist-email-compact" : "waitlist-email"} type="email" inputMode="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t.placeholder} />
        <input className="honeypot" tabIndex={-1} aria-hidden="true" autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        <button type="submit" disabled={status === "loading"}>{status === "loading" ? t.loading : t.submit}</button>
      </form>
      {status === "success" ? <p className="form-message success-message" role="status">✓ {t.success}</p> : null}
      {status === "error" ? <p className="form-message error-message" role="alert">{t.error}</p> : null}
      <small className="form-consent">{t.consent} <Link href="/privacy-policy">{t.privacy}</Link>.</small>
    </div>
  );
}
