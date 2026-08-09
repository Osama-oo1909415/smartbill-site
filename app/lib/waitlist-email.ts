import { getRuntimeEnv } from "./runtime-env";

type WaitlistEmailInput = { email: string; language: "ar" | "en"; entryId: number };

export async function sendWaitlistConfirmation({ email, language, entryId }: WaitlistEmailInput): Promise<boolean> {
  const apiKey = getRuntimeEnv("RESEND_API_KEY");
  if (!apiKey) return false;
  const from = getRuntimeEnv("WAITLIST_FROM_EMAIL") ?? "SmartBill <noreply@update.smartbill.dev>";
  const replyTo = getRuntimeEnv("WAITLIST_REPLY_TO");
  const arabic = language === "ar";
  const subject = arabic ? "تم استلام طلبك للانضمام إلى SmartBill" : "We received your SmartBill waitlist request";
  const text = arabic ? "شكرًا لاهتمامك بـ SmartBill. استلمنا طلبك وسنخبرك عند بدء الوصول المبكر." : "Thanks for your interest in SmartBill. We received your request and will let you know when early access opens.";
  const html = arabic
    ? `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.8"><h2>تم استلام طلبك</h2><p>شكرًا لاهتمامك بـ <strong>SmartBill</strong>.</p><p>استلمنا بريدك الإلكتروني وسنخبرك عند بدء الوصول المبكر.</p></div>`
    : `<div style="font-family:Arial,sans-serif;line-height:1.8"><h2>We received your request</h2><p>Thanks for your interest in <strong>SmartBill</strong>.</p><p>We received your email and will let you know when early access opens.</p></div>`;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "User-Agent": "smartbill-site/1.0", "Idempotency-Key": `smartbill-waitlist-${entryId}` },
      body: JSON.stringify({ from, to: [email], subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    return response.ok;
  } catch { return false; }
}
