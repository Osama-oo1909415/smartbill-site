"use client";

import Link from "../internal-link";
import { SitePage } from "../site-chrome";
import { useSitePreferences } from "../site-preferences";

const terms = {
  ar: [
    ["استخدام SmartBill", [
      "يساعدك SmartBill على تسجيل مصروفاتك وفهمها. أنت مسؤول عن دقة ما تُدخله وعن حماية بيانات دخولك.",
      "لا يجوز استخدام التطبيق لمعالجة سجلات مالية لأشخاص آخرين دون إذنهم أو لمخالفة القوانين المعمول بها في بلدك.",
      "باستخدامك للتطبيق فإنك توافق على سياسة الاستخدام والخصوصية هذه، بما في ذلك التخزين الآمن المشفّر لبياناتك محلياً وسحابياً عند تفعيل المزامنة.",
    ]],
    ["ليست استشارة مالية", [
      "التوقعات ومستويات مخاطر الميزانية وفحوص القدرة على الشراء وإجابات المساعد كلها عمليات حسابية على السجلات التي تُدخلها. هي لأغراض معلوماتية فقط وقد تكون غير دقيقة عند نقص السجلات، وليست استشارة استثمارية أو ضريبية أو قانونية.",
    ]],
    ["الاستخراج الآلي", [
      "قراءة الإيصالات وتحليل كشوف الحساب واستيراد البريد كلها بأفضل جهد ممكن. يُعرض كل مبلغ مستخرج للمراجعة قبل الحفظ، وتبقى مسؤولية تصحيحه عليك.",
    ]],
    ["التوفر", [
      "يعمل التطبيق دون اتصال، أما المزامنة وتسجيل الدخول وتنزيل النماذج فتحتاج اتصالاً وقد تنقطع. وتتطلب الميزات المعتمدة على النموذج المحلي مساحة تخزين كافية وجهازاً مدعوماً.",
      "يُقدَّم SmartBill كما هو دون ضمانات، ولا نتحمل — في حدود ما يسمح به القانون — أي خسائر ناتجة عن قرارات اتُّخذت بالاعتماد على التطبيق.",
    ]],
    ["إنهاء الاستخدام", [
      "يمكنك تصدير بياناتك وحذف حسابك في أي وقت من صفحة الحساب. حذف الحساب يزيل النسخة السحابية ونسخة الجهاز.",
    ]],
  ],
  en: [
    ["Using SmartBill", [
      "SmartBill helps you record and understand your own spending. You are responsible for the accuracy of what you enter and for keeping your sign-in credentials safe.",
      "You may not use the app to process other people’s financial records without their permission, or to break the law where you live.",
      "By using the app, you agree to these Terms of Use & Privacy Policy, including the secure encrypted storage of your data locally and in the cloud when sync is enabled.",
    ]],
    ["Not financial advice", [
      "Forecasts, budget risk levels, affordability checks, and assistant answers are arithmetic on the records you provide. They are informational only, they can be wrong when your records are incomplete, and they are not investment, tax, or legal advice.",
    ]],
    ["Automatic extraction", [
      "Receipt recognition, statement parsing, and email import are best-effort. Every extracted amount is shown for review before it is saved, and you remain responsible for correcting it.",
    ]],
    ["Availability", [
      "The app works offline; sync, sign-in, and model downloads need a connection and can be interrupted. Features that depend on an on-device model require enough free storage and a supported device.",
      "SmartBill is provided as is, without warranty. To the extent the law allows, we are not liable for losses arising from decisions made using the app.",
    ]],
    ["Ending use", [
      "You can export your data and delete your account at any time from the Account tab. Deleting the account removes the cloud copy and the device copy.",
    ]],
  ],
} as const;

export default function TermsPage() {
  const { lang } = useSitePreferences();
  return <SitePage className="content-page legal-page"><section className="page-hero shell"><span className="section-kicker">{lang === "ar" ? "آخر تحديث: 1 أغسطس 2026" : "Last updated: August 1, 2026"}</span><h1>{lang === "ar" ? "شروط الاستخدام" : "Terms of use"}</h1><p>{lang === "ar" ? "هذه الصفحة تنقل شروط الاستخدام الموجودة داخل تطبيق SmartBill وتصف النسخة الحالية. تحتاج إلى مراجعة قانونية نهائية قبل الإطلاق التجاري." : "This page mirrors the Terms of Use shipped inside SmartBill and describes the current implementation. Final legal review is still required before commercial launch."}</p></section><section className="legal-content shell">{terms[lang].map(([heading, paragraphs], index) => <article key={heading}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{heading}</h2>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}<div className="legal-contact"><p>{lang === "ar" ? "راجع أيضاً سياسة الخصوصية أو تواصل معنا لأي سؤال." : "Review the Privacy Policy too, or contact us with any question."}</p><div className="legal-actions"><Link className="button primary-button" href="/privacy-policy">{lang === "ar" ? "سياسة الخصوصية" : "Privacy policy"} →</Link><Link className="button secondary-button" href="/contact">{lang === "ar" ? "تواصل معنا" : "Contact us"} →</Link></div></div></section></SitePage>;
}
