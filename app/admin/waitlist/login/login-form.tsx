"use client";

import { FormEvent, useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    const response = await fetch("/api/admin/waitlist/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) });
    setStatus(response.ok ? "sent" : "error");
  }
  return <form onSubmit={submit} className="admin-login-form"><label htmlFor="admin-email">البريد الإلكتروني للإدارة</label><input id="admin-email" type="email" dir="ltr" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /><button className="hero-button primary" disabled={status === "sending"}>{status === "sending" ? "جارٍ الإرسال…" : "أرسل رابط الدخول"}</button>{status === "sent" && <p role="status">إذا كان البريد مصرحاً له، أرسلنا إليه رابط دخول صالحاً لمدة 15 دقيقة.</p>}{status === "error" && <p role="alert">تعذر إرسال الرابط الآن. حاول مرة أخرى.</p>}</form>;
}
