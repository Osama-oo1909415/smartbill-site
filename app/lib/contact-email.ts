import { getRuntimeEnv } from "./runtime-env";

type ContactNotificationInput = {
  id: number;
  name: string;
  email: string;
  topic: string;
  message: string;
  language: "ar" | "en";
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

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
  } catch {
    return false;
  }
}

export async function sendContactNotification(input: ContactNotificationInput): Promise<boolean> {
  const inbox = getRuntimeEnv("CONTACT_INBOX_EMAIL") ?? getRuntimeEnv("WAITLIST_REPLY_TO");
  if (!inbox) return false;
  const from = getRuntimeEnv("CONTACT_FROM_EMAIL") ?? getRuntimeEnv("WAITLIST_FROM_EMAIL") ?? "SmartBill <noreply@update.smartbill.dev>";
  const subjectTopic = input.topic.replace(/[\r\n]+/g, " ").slice(0, 80);
  const direction = input.language === "ar" ? "rtl" : "ltr";
  const text = `New SmartBill contact message\n\nName: ${input.name}\nEmail: ${input.email}\nTopic: ${subjectTopic}\n\n${input.message}\n\nReply directly to this email to answer ${input.name}.`;
  const html = `<!doctype html><html lang="${input.language}" dir="${direction}"><body style="margin:0;padding:24px;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#112243"><div style="max-width:640px;margin:auto;padding:28px;background:#fff;border:1px solid #dce5f2;border-radius:20px"><p style="margin:0 0 8px;color:#2563d9;font-size:12px;font-weight:700;letter-spacing:1px">SMARTBILL CONTACT</p><h1 style="margin:0 0 24px;font-size:28px">New message from ${escapeHtml(input.name)}</h1><p style="margin:8px 0"><strong>Email:</strong> <a href="mailto:${encodeURIComponent(input.email)}">${escapeHtml(input.email)}</a></p><p style="margin:8px 0"><strong>Topic:</strong> ${escapeHtml(subjectTopic)}</p><div style="margin-top:22px;padding:18px;background:#eef4ff;border-radius:14px;white-space:pre-wrap;line-height:1.7">${escapeHtml(input.message)}</div><p style="margin:24px 0 0;color:#61718e;font-size:13px">Reply directly to this email to answer ${escapeHtml(input.name)}.</p></div></body></html>`;
  return sendEmail({ from, to: [inbox], reply_to: input.email, subject: `[SmartBill contact] ${subjectTopic}`, html, text }, `smartbill-contact-${input.id}`);
}
