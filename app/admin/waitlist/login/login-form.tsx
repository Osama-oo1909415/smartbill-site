"use client";

import { FormEvent, useState } from "react";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    const response = await fetch("/api/admin/waitlist/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ username, password }) });
    if (response.ok) window.location.assign("/admin/waitlist");
    else setStatus("error");
  }
  return <form onSubmit={submit} className="admin-login-form"><label htmlFor="admin-username">اسم المستخدم</label><input id="admin-username" dir="ltr" value={username} onChange={(event) => setUsername(event.target.value)} required autoComplete="username" /><label htmlFor="admin-password">كلمة المرور</label><input id="admin-password" type="password" dir="ltr" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /><button className="hero-button primary" disabled={status === "sending"}>{status === "sending" ? "جارٍ الدخول…" : "تسجيل الدخول"}</button>{status === "error" && <p role="alert">اسم المستخدم أو كلمة المرور غير صحيحين.</p>}</form>;
}
