import FaqPage from "../../faq/page";
import { localizedMetadata, isSiteLanguage } from "../../locale";
import { JsonLd } from "../../structured-data";

const faqSchema = {
  ar: [
    ["هل التطبيق متاح الآن؟", "ليس بعد. SmartBill في مرحلة الوصول المبكر ويمكنك تسجيل اهتمامك لتصلك دعوة عند بدء التجربة."],
    ["هل يحتاج المسح إلى حساب؟", "يمكن تنفيذ القراءة المحلية الأساسية على الجهاز. تسجيل الدخول مطلوب فقط لميزات الحساب مثل المزامنة الاختيارية بين الأجهزة."],
    ["هل تُرفع صور الفواتير إلى السحابة؟", "لا تُرفع الصور من أجل OCR؛ تتم القراءة على الجهاز. النسخ الاحتياطي للصور إعداد مستقل يختاره المستخدم."],
    ["هل يرسل المساعد بياناتي إلى روبوت محادثة عام؟", "لا. تُحسب الأرقام محلياً من سجلاتك ويعيد النموذج المحلي صياغة حقائق محدودة ومحسوبة."],
    ["هل يحفظ SmartBill المعاملة تلقائياً؟", "لا. تظهر كل نتيجة استخراج كمسودة حتى تراجع المتجر والمبلغ والتاريخ والبنود قبل الحفظ."],
    ["ماذا يحدث عند تفعيل المزامنة؟", "تُحفظ نسخة مشفرة في حسابك الخاص لدعم أكثر من جهاز والاستعادة. يمكنك تعطيل المزامنة أو حذف الحساب من التطبيق."],
    ["هل يدعم العربية والإنجليزية؟", "نعم. الموقع والتطبيق مصممان للعربية RTL والإنجليزية مع أرقام وتخطيطات تراعي اتجاه اللغة."],
    ["هل يقدم SmartBill استشارة مالية؟", "لا. التقارير والتوقعات لأغراض معلوماتية وقد تتأثر بنقص السجلات وليست استشارة استثمارية أو ضريبية أو قانونية."],
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isSiteLanguage(locale) ? localizedMetadata(locale, "/faq") : {};
}

export default async function LocalizedFaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language = isSiteLanguage(locale) ? locale : "en";
  return <><FaqPage /><JsonLd data={{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSchema[language].map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }} /></>;
}
