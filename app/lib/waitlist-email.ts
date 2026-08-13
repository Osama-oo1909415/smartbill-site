import { getRuntimeEnv } from "./runtime-env";

type WaitlistEmailInput = { email: string; language: "ar" | "en"; entryId: number; unsubscribeToken: string };

const SITE_URL = "https://smartbill.dev";
const LOGO_URL = `${SITE_URL}/app-icon.png`;
const APP_SCREEN_URLS = {
  ar: `${SITE_URL}/smartbill-app-screen-nav-v2.png`,
  en: `${SITE_URL}/smartbill-app-screen-nav-v2-en.png`,
} as const;

async function sendEmail(payload: Record<string, unknown>, idempotencyKey: string): Promise<boolean> {
  const apiKey = getRuntimeEnv("RESEND_API_KEY");
  if (!apiKey) return false;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "smartbill-site/1.0",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function sendWaitlistConfirmation({ email, language, entryId, unsubscribeToken }: WaitlistEmailInput): Promise<boolean> {
  const from = getRuntimeEnv("WAITLIST_FROM_EMAIL") ?? "SmartBill <noreply@update.smartbill.dev>";
  const replyTo = getRuntimeEnv("WAITLIST_REPLY_TO");
  const arabic = language === "ar";
  const appScreenUrl = APP_SCREEN_URLS[language];
  const unsubscribeUrl = `${SITE_URL}/${language}/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
  const copy = arabic
    ? {
        subject: "تم استلام طلبك للانضمام إلى SmartBill",
        preheader: "أنت الآن ضمن قائمة الوصول المبكر إلى SmartBill.",
        eyebrow: "الوصول المبكر",
        title: "تم استلام طلبك",
        greeting: "شكراً لاهتمامك بـ SmartBill.",
        body: "أضفنا بريدك إلى قائمة الوصول المبكر. سنرسل لك تحديثات الإطلاق والحالة فقط، دون رسائل غير ضرورية.",
        imageAlt: "واجهة SmartBill التي تحول الفواتير إلى صورة مالية واضحة",
        featureTitle: "من الفاتورة إلى وضوح أكبر",
        featureBody: "صوّر الفاتورة، راجع البيانات، ثم افهم إنفاقك بهدوء وخصوصية.",
        button: "اكتشف SmartBill",
        footer: "تتلقى هذه الرسالة لأنك طلبت الانضمام إلى قائمة SmartBill.",
        privacy: "خصوصيتك أولاً. نستخدم بريدك لإشعارات الإطلاق فقط.",
        unsubscribe: "إلغاء الاشتراك من تحديثات SmartBill",
      }
    : {
        subject: "We received your SmartBill waitlist request",
        preheader: "You’re now on the SmartBill early-access list.",
        eyebrow: "EARLY ACCESS",
        title: "You’re on the list",
        greeting: "Thanks for your interest in SmartBill.",
        body: "We’ve added your email to early access. We’ll send launch and status updates only—no unnecessary messages.",
        imageAlt: "SmartBill interface turning receipts into a clear financial picture",
        featureTitle: "From receipt to clarity",
        featureBody: "Capture a receipt, review the details, then understand your spending with calm, private tools.",
        button: "Explore SmartBill",
        footer: "You’re receiving this because you asked to join the SmartBill waitlist.",
        privacy: "Privacy first. We use your email for launch updates only.",
        unsubscribe: "Unsubscribe from SmartBill updates",
      };
  const direction = arabic ? "rtl" : "ltr";
  const align = arabic ? "right" : "left";
  const font = arabic ? "Cairo, Arial, sans-serif" : "Arial, Helvetica, sans-serif";
  const text = `${copy.title}\n\n${copy.greeting}\n${copy.body}\n\n${copy.featureTitle}: ${copy.featureBody}\n\n${copy.button}: ${SITE_URL}\n\n${copy.privacy}\n${copy.unsubscribe}: ${unsubscribeUrl}`;
  const html = `<!doctype html>
<html lang="${language}" dir="${direction}">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>${copy.subject}</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .email-body { background: #101827 !important; }
      .email-card { background: #172033 !important; border-color: #31415d !important; }
      .email-copy, .email-title, .email-footer { color: #eef4ff !important; }
      .email-muted { color: #b9c6dd !important; }
      .email-feature { background: #1f2b42 !important; border-color: #3a4d70 !important; }
    }
    @media only screen and (max-width: 620px) {
      .email-shell { width: 100% !important; }
      .email-padding { padding: 28px 20px !important; }
      .hero-image { width: 100% !important; height: auto !important; }
    }
  </style>
</head>
<body class="email-body" style="margin:0;padding:0;background:#f3f6fb;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${copy.preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f3f6fb;">
    <tr><td align="center" style="padding:32px 12px;">
      <table role="presentation" class="email-shell" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
        <tr><td class="email-card" style="background:#ffffff;border:1px solid #dce5f2;border-radius:24px;overflow:hidden;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td class="email-padding" style="padding:30px 38px 22px;text-align:${align};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-${arabic ? "left" : "right"}:auto;"><tr>
                <td style="vertical-align:middle;"><img src="${LOGO_URL}" width="44" height="44" alt="SmartBill" style="display:block;width:44px;height:44px;border:0;border-radius:12px;outline:none;text-decoration:none;" /></td>
                <td style="padding-${arabic ? "right" : "left"}:12px;vertical-align:middle;font-family:${font};color:#112243;font-size:22px;font-weight:700;line-height:1;">SmartBill</td>
              </tr></table>
            </td></tr>
            <tr><td style="height:5px;background:#2563d9;font-size:0;line-height:0;">&nbsp;</td></tr>
            <tr><td class="email-padding" style="padding:36px 38px 12px;text-align:${align};font-family:${font};">
              <p style="margin:0 0 12px;color:#2563d9;font-size:12px;font-weight:700;letter-spacing:1.4px;line-height:18px;">${copy.eyebrow}</p>
              <h1 class="email-title" style="margin:0;color:#112243;font-size:32px;font-weight:700;line-height:1.25;">${copy.title}</h1>
              <p class="email-copy" style="margin:22px 0 8px;color:#243b61;font-size:17px;font-weight:700;line-height:1.7;">${copy.greeting}</p>
              <p class="email-muted" style="margin:0;color:#61718e;font-size:16px;line-height:1.8;">${copy.body}</p>
            </td></tr>
            <tr><td class="email-padding" style="padding:26px 38px 10px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="email-feature" style="background:#eef4ff;border:1px solid #d7e4fa;border-radius:18px;">
                <tr><td style="padding:18px 18px 0;text-align:center;"><img class="hero-image" src="${appScreenUrl}" width="390" alt="${copy.imageAlt}" style="display:block;width:390px;max-width:100%;height:auto;margin:0 auto;border:0;border-radius:14px 14px 0 0;outline:none;text-decoration:none;background:#dce9ff;color:#173d86;font-family:${font};font-size:14px;line-height:1.5;" /></td></tr>
                <tr><td style="padding:18px 22px 22px;text-align:${align};font-family:${font};"><strong class="email-title" style="display:block;color:#173d86;font-size:17px;line-height:1.45;">${copy.featureTitle}</strong><span class="email-muted" style="display:block;margin-top:6px;color:#61718e;font-size:14px;line-height:1.7;">${copy.featureBody}</span></td></tr>
              </table>
            </td></tr>
            <tr><td class="email-padding" style="padding:24px 38px 34px;text-align:${align};font-family:${font};"><a href="${SITE_URL}" style="display:inline-block;background:#2563d9;border:1px solid #2563d9;border-radius:12px;color:#ffffff;font-size:16px;font-weight:700;line-height:20px;padding:14px 22px;text-decoration:none;">${copy.button}</a></td></tr>
          </table>
        </td></tr>
        <tr><td class="email-footer" style="padding:0 22px 18px;color:#72809a;font-family:${font};font-size:12px;line-height:1.7;text-align:${align};"><a href="${unsubscribeUrl}" style="color:#2563d9;text-decoration:underline;">${copy.unsubscribe}</a></td></tr>
        <tr><td class="email-footer" style="padding:20px 22px 0;color:#72809a;font-family:${font};font-size:12px;line-height:1.7;text-align:${align};">${copy.footer}<br />${copy.privacy}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  return sendEmail({ from, to: [email], subject: copy.subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }, `smartbill-waitlist-${entryId}`);
}
