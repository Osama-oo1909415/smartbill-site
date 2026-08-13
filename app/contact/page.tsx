"use client";

import { ContactForm } from "../contact-form";
import { SitePage } from "../site-chrome";
import { useSitePreferences } from "../site-preferences";

export default function ContactPage() {
  const { lang } = useSitePreferences();
  const t = lang === "ar" ? { kicker: "تواصل معنا", title: "سؤالك المالي أو التقني يستحق جوابًا واضحًا.", intro: "استخدم النموذج للاستفسار عن الوصول المبكر، الخصوصية، البيانات، أو مشكلة تقنية. لا تكتب أرقام بطاقات أو كلمات مرور أو تفاصيل مالية حساسة.", noteTitle: "قبل الإرسال", notes: ["لا ترسل بيانات مالية حساسة.", "اذكر نوع الجهاز عند الإبلاغ عن مشكلة تقنية.", "لطلبات الخصوصية اختر موضوع الخصوصية والبيانات."], notice: "نحفظ الرسالة في صندوق SmartBill الداخلي للرد والمتابعة، ولا نستخدمها للإعلانات." } : { kicker: "Contact", title: "Your financial or technical question deserves a clear answer.", intro: "Use the form for early access, privacy, data, or technical questions. Do not include card numbers, passwords, or sensitive financial details.", noteTitle: "Before you send", notes: ["Do not submit sensitive financial data.", "Include your device type for technical issues.", "Choose Privacy & data for data-subject requests."], notice: "We keep your message in SmartBill’s internal inbox to reply and follow up; it is not used for advertising." };
  return <SitePage className="content-page"><section className="page-hero shell"><span className="section-kicker">{t.kicker}</span><h1>{t.title}</h1><p>{t.intro}</p></section><section className="contact-layout shell"><div className="contact-panel"><ContactForm /><p className="form-data-notice">{t.notice}</p></div><aside className="contact-note"><h2>{t.noteTitle}</h2>{t.notes.map((note, index) => <p key={note}><b>0{index + 1}</b>{note}</p>)}</aside></section></SitePage>;
}
