"use client";

import { FormEvent, useState } from "react";
import { useSitePreferences } from "./site-preferences";

export function ContactForm() {
  const { lang } = useSitePreferences();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = lang === "ar" ? {
    name: "الاسم", email: "البريد الإلكتروني", topic: "الموضوع", message: "كيف يمكننا مساعدتك؟", submit: "إرسال الرسالة", loading: "جارٍ الإرسال…", success: "وصلتنا رسالتك بنجاح.", error: "تعذّر إرسال الرسالة. حاول مرة أخرى.", topics: ["استفسار عام", "الخصوصية والبيانات", "الوصول المبكر", "مشكلة تقنية"],
  } : {
    name: "Name", email: "Email address", topic: "Topic", message: "How can we help?", submit: "Send message", loading: "Sending…", success: "Your message has been received.", error: "We couldn’t send your message. Please try again.", topics: ["General question", "Privacy & data", "Early access", "Technical issue"],
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(event.currentTarget);
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: form.get("name"), email: form.get("email"), topic: form.get("topic"), message: form.get("message"), language: lang, website: form.get("website") }),
      });
      if (!response.ok) throw new Error("contact_failed");
      formElement.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row"><label>{t.name}<input name="name" required maxLength={120} autoComplete="name" /></label><label>{t.email}<input name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" /></label></div>
      <label>{t.topic}<select name="topic" required defaultValue=""><option value="" disabled>—</option>{t.topics.map((topic) => <option key={topic}>{topic}</option>)}</select></label>
      <label>{t.message}<textarea name="message" required minLength={10} maxLength={2000} rows={7} /></label>
      <input className="honeypot" name="website" tabIndex={-1} aria-hidden="true" autoComplete="off" />
      <button type="submit" disabled={status === "loading"}>{status === "loading" ? t.loading : t.submit}</button>
      {status === "success" ? <p className="form-message success-message" role="status">✓ {t.success}</p> : null}
      {status === "error" ? <p className="form-message error-message" role="alert">{t.error}</p> : null}
    </form>
  );
}
