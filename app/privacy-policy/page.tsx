"use client";

import Link from "next/link";
import { SitePage } from "../site-chrome";
import { useSitePreferences } from "../site-preferences";

const policy = {
  ar: [
    ["ملخص", ["يعمل SmartBill محلياً أولاً. تُقرأ الإيصالات وتُصاغ إجابات المساعد على هاتفك، ولا يُرسل نص الإيصال أو أسئلة المساعد إلى خدمة ذكاء اصطناعي عامة.", "تُحفظ سجلاتك في قاعدة بيانات مشفّرة على جهازك. عند تفعيل المزامنة تُخزّن نسخة مشفّرة في حسابك الخاص لدعم أكثر من جهاز والاستعادة."]],
    ["ما الذي نحفظه", ["بيانات الحساب: البريد الإلكتروني والاسم المعروض وطريقة تسجيل الدخول.", "السجلات المالية التي تنشئها أو تستوردها، مثل المحافظ والمعاملات والفئات والميزانيات والأهداف والضمانات والإيصالات وحقولها ومحادثات المساعد.", "تفضيلات التطبيق ومعرّف الجهاز المستخدم لترتيب تغييرات المزامنة، ورمز الإشعارات فقط إذا سمحت بها."]],
    ["صور الإيصالات وOCR", ["يعمل التعرّف على النص بالكامل على جهازك، ولا تُرفع الصور من أجل المعالجة.", "النسخ الاحتياطي لصور الإيصالات إعداد منفصل تتحكم به. عند إيقافه تبقى الصورة على الجهاز وتُزامن الحقول المستخرجة فقط."]],
    ["المساعد", ["كل رقم يذكره المساعد محسوب محلياً من سجلاتك. النموذج المحلي يعيد صياغة حقائق محسوبة ومحدودة.", "لا تُرسل معلوماتك المالية إلى روبوت محادثة عام ولا تُستخدم لتدريب نموذج عام."]],
    ["استيراد Gmail الاختياري", ["إذا ربطت Gmail، يطلب SmartBill صلاحية قراءة فقط ويبحث عن الرسائل الشبيهة بالإيصالات ضمن النطاق الذي تختاره.", "تُحلّل الرسائل على جهازك، وتبقى معرّفات Gmail والمحتوى الخام على الجهاز ومستثناة من المزامنة والتصدير."]],
    ["الاحتفاظ والمشاركة", ["تبقى سجلاتك في التخزين المشفّر حتى تحذفها أو تحذف حسابك. لا يبيع SmartBill بياناتك ولا يشاركها مع المعلنين.", "قد يعتمد التشغيل على مزودي بنية تحتية للحساب والمزامنة وتسجيل الدخول والإشعارات، ولا يحصل كل مزود إلا على ما يلزم لوظيفته."]],
    ["تحكّمك", ["يمكنك تصدير بياناتك من التطبيق، أو حذف النسخة المحلية، أو حذف الحساب والسجلات السحابية.", "يمكنك تعطيل رفع صور الإيصالات، فصل Gmail، وإيقاف المزامنة بشكل مستقل."]],
    ["تواصل وطلبات البيانات", ["استخدم نموذج التواصل المنشور لاستمارات الوصول أو التصحيح أو الحذف أو أي سؤال متعلق بالخصوصية. لا ترسل بيانات مالية حساسة ضمن الرسالة."]],
  ],
  en: [
    ["Summary", ["SmartBill is local-first. Receipts are read and assistant responses are produced on your phone; receipt text and assistant prompts are not sent to a general-purpose AI service.", "Records live in an encrypted database on your device. If sync is enabled, an encrypted copy is stored in your private account for multi-device use and recovery."]],
    ["What we store", ["Account data: email address, display name, and chosen sign-in method.", "Financial records you create or import, including wallets, transactions, categories, budgets, goals, warranties, receipts and extracted fields, and assistant conversations.", "App preferences, a device identifier used to order sync changes, and a notification token only when you allow notifications."]],
    ["Receipt images and OCR", ["Text recognition runs entirely on your device; images are not uploaded for processing.", "Receipt-image backup is a separate setting you control. When disabled, the image stays on device and only extracted fields may sync."]],
    ["Assistant", ["Every figure the assistant states is computed locally from your records. The local model only rephrases bounded, computed facts.", "Financial information is not sent to a general chatbot or used to train a general model."]],
    ["Optional Gmail import", ["If you connect Gmail, SmartBill requests read-only access and searches for receipt-like messages within the range you choose.", "Messages are parsed on device; Gmail identifiers and raw content stay local and are excluded from sync and exports."]],
    ["Retention and sharing", ["Records remain in encrypted storage until you delete them or your account. SmartBill does not sell your data or share it with advertisers.", "Operation may rely on infrastructure providers for accounts, sync, sign-in, and notifications; each receives only what is needed for that function."]],
    ["Your control", ["You can export your data, remove the local copy, or delete the account and cloud records from the app.", "Receipt-image upload, Gmail access, and sync can be disabled independently."]],
    ["Contact and data requests", ["Use the published contact form for access, correction, deletion, or any privacy question. Do not include sensitive financial data in the message."]],
  ],
} as const;

export default function PrivacyPage() {
  const { lang } = useSitePreferences();
  return <SitePage className="content-page legal-page"><section className="page-hero shell"><span className="section-kicker">{lang === "ar" ? "آخر تحديث: 1 أغسطس 2026" : "Last updated: August 1, 2026"}</span><h1>{lang === "ar" ? "سياسة الخصوصية" : "Privacy policy"}</h1><p>{lang === "ar" ? "إشعار منشور يصف طريقة عمل النسخة الحالية من SmartBill. يحتاج النص إلى مراجعة قانونية نهائية قبل الإطلاق التجاري في المتاجر." : "A published notice describing how the current SmartBill implementation works. Final legal review is still required before commercial store launch."}</p></section><section className="legal-content shell">{policy[lang].map(([heading, paragraphs], index) => <article key={heading}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{heading}</h2>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}<div className="legal-contact"><p>{lang === "ar" ? "لأي طلب يتعلق ببياناتك أو بهذه السياسة:" : "For any request about your data or this policy:"}</p><Link className="button primary-button" href="/contact">{lang === "ar" ? "تواصل معنا" : "Contact us"} →</Link></div></section></SitePage>;
}
