"use client";

import { SitePage } from "../site-chrome";
import { useSitePreferences } from "../site-preferences";

export const faq = {
  ar: [
    ["هل التطبيق متاح الآن؟", "ليس بعد. SmartBill في مرحلة الوصول المبكر، ويمكنك تسجيل اهتمامك لتصلك دعوة عندما تبدأ التجربة."],
    ["هل يحتاج المسح إلى حساب؟", "يمكن تنفيذ القراءة المحلية الأساسية على الجهاز. تسجيل الدخول مطلوب فقط للميزات المرتبطة بالحساب مثل المزامنة الاختيارية بين الأجهزة."],
    ["هل تُرفع صور الفواتير إلى السحابة؟", "لا تُرفع الصور من أجل OCR؛ القراءة تتم على الجهاز. النسخ الاحتياطي لصور الإيصالات إعداد مستقل ومختار من المستخدم."],
    ["هل يرسل المساعد بياناتي إلى روبوت محادثة عام؟", "لا. الأرقام تُحسب محلياً من سجلاتك، والنموذج المحلي يعيد صياغة حقائق محسوبة ومحدودة."],
    ["هل يحفظ SmartBill المعاملة تلقائياً؟", "لا. كل نتيجة استخراج تظهر كمسودة لتراجع المتجر والمبلغ والتاريخ والبنود قبل الحفظ."],
    ["ماذا يحدث عند تفعيل المزامنة؟", "تُخزن نسخة مشفّرة في حسابك الخاص لدعم أكثر من جهاز والاستعادة. يمكنك تعطيل المزامنة أو حذف الحساب من التطبيق."],
    ["هل يدعم العربية والإنجليزية؟", "نعم. الموقع والتطبيق مصممان للعربية RTL والإنجليزية، مع أرقام وتخطيطات تتكيف مع اتجاه اللغة."],
    ["هل يقدم SmartBill استشارة مالية؟", "لا. التقارير والتوقعات لأغراض معلوماتية وقد تتأثر بنقص السجلات؛ وهي ليست استشارة استثمارية أو ضريبية أو قانونية."],
  ],
  en: [
    ["Is the app available now?", "Not yet. SmartBill is in early access. Join the waitlist to be notified when testing opens."],
    ["Does scanning require an account?", "Basic local reading can run on device. Sign-in is only required for account features such as optional multi-device sync."],
    ["Are receipt images uploaded to the cloud?", "Images are not uploaded for OCR; recognition runs on device. Receipt-image backup is a separate, user-controlled setting."],
    ["Does the assistant send my data to a general chatbot?", "No. Figures are computed locally from your records, and the local model only rephrases bounded, computed facts."],
    ["Does SmartBill save transactions automatically?", "No. Every extraction result appears as a draft so you can review the merchant, amount, date, and items before saving."],
    ["What happens when sync is enabled?", "An encrypted copy is stored in your private account to support multiple devices and recovery. You can disable sync or delete the account in the app."],
    ["Does it support Arabic and English?", "Yes. The site and app are designed for Arabic RTL and English, including direction-aware numbers and layouts."],
    ["Is SmartBill financial advice?", "No. Reports and forecasts are informational, may be affected by incomplete records, and are not investment, tax, or legal advice."],
  ],
} as const;

export default function FaqPage() {
  const { lang } = useSitePreferences();
  return <SitePage className="content-page"><section className="page-hero shell"><span className="section-kicker">FAQ</span><h1>{lang === "ar" ? "أسئلة مباشرة. إجابات بلا غموض." : "Direct questions. Clear answers."}</h1><p>{lang === "ar" ? "تفاصيل عملية عن التوفر، الخصوصية، المسح، المزامنة، والمساعد." : "Practical details about availability, privacy, scanning, sync, and the assistant."}</p></section><section className="faq-list shell">{faq[lang].map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i>+</i></summary><p>{answer}</p></details>)}</section></SitePage>;
}
