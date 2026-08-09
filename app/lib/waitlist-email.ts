import { getRuntimeEnv } from "./runtime-env";

type WaitlistEmailInput = { email: string; language: "ar" | "en"; entryId: number };

async function sendEmail(payload: Record<string, unknown>, idempotencyKey: string): Promise<boolean> {
  const apiKey = getRuntimeEnv("RESEND_API_KEY");
  if (!apiKey) return false;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "User-Agent": "smartbill-site/1.0", "Idempotency-Key": idempotencyKey },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch { return false; }
}

export async function sendWaitlistConfirmation({ email, language, entryId }: WaitlistEmailInput): Promise<boolean> {
  const from = getRuntimeEnv("WAITLIST_FROM_EMAIL") ?? "SmartBill <noreply@update.smartbill.dev>";
  const replyTo = getRuntimeEnv("WAITLIST_REPLY_TO");
  const arabic = language === "ar";
  const subject = arabic ? "تم استلام طلبك للانضمام إلى SmartBill" : "We received your SmartBill waitlist request";
  const text = arabic ? "شكرًا لاهتمامك بـ SmartBill. استلمنا طلبك وسنخبرك عند بدء الوصول المبكر." : "Thanks for your interest in SmartBill. We received your request and will let you know when early access opens.";
  const html = arabic
    ? `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.8"><h2>تم استلام طلبك</h2><p>شكرًا لاهتمامك بـ <strong>SmartBill</strong>.</p><p>استلمنا بريدك الإلكتروني وسنخبرك عند بدء الوصول المبكر.</p></div>`
    : `<div style="font-family:Arial,sans-serif;line-height:1.8"><h2>We received your request</h2><p>Thanks for your interest in <strong>SmartBill</strong>.</p><p>We received your email and will let you know when early access opens.</p></div>`;
  return sendEmail({ from, to: [email], subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }, `smartbill-waitlist-${entryId}`);
}

export async function sendWaitlistAdminMagicLink(email: string, link: string): Promise<boolean> {
  const from = getRuntimeEnv("WAITLIST_FROM_EMAIL") ?? "SmartBill <noreply@update.smartbill.dev>";
  return sendEmail({
    from, to: [email], subject: "رابط دخول لوحة SmartBill", text: `افتح هذا الرابط للدخول إلى قائمة المسجلين: ${link}\nينتهي الرابط خلال 15 دقيقة.`,
    html: `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.8"><h2>دخول لوحة SmartBill</h2><p>افتح الرابط التالي للدخول إلى قائمة المسجلين. ينتهي خلال 15 دقيقة.</p><p><a href="${link}">فتح لوحة المسجلين</a></p></div>`,
  }, `smartbill-admin-login-${crypto.randomUUID()}`);
}
