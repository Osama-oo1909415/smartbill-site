"use client";

import { SitePage } from "../site-chrome";
import { useSitePreferences } from "../site-preferences";

const terms = {
  ar: [["الوصول المبكر", "SmartBill ما يزال في مرحلة الوصول المبكر، وقد تتغير الميزات أو تتوقف أثناء الاختبار."], ["مسؤوليتك عن البيانات", "راجع كل مبلغ وتاريخ وفئة قبل الحفظ. يبقى تصحيح نتائج الاستخراج الآلي مسؤوليتك."], ["ليست استشارة مالية", "التقارير والتوقعات وفحوص القدرة على الشراء معلومات حسابية مبنية على سجلاتك، وليست استشارة استثمارية أو ضريبية أو قانونية."], ["التوفر", "يعمل التطبيق محلياً دون اتصال في عدد من الوظائف، لكن تسجيل الدخول والمزامنة وتنزيل النماذج تحتاج اتصالاً وقد تنقطع."], ["الاستخدام المقبول", "لا تستخدم الخدمة لمحاولة الوصول إلى بيانات الآخرين أو تعطيلها أو إساءة استخدام نماذج التواصل وقائمة الانتظار."], ["إنهاء الاستخدام", "يمكنك تصدير بياناتك وحذف الحساب من التطبيق. حذف الحساب يزيل النسخة السحابية ونسخة الجهاز ضمن حدود التنفيذ الموضحة في المنتج."]],
  en: [["Early access", "SmartBill remains in early access; features may change or be unavailable during testing."], ["Your responsibility for data", "Review every amount, date, and category before saving. You remain responsible for correcting automated extraction results."], ["Not financial advice", "Reports, forecasts, and affordability checks are calculations based on your records, not investment, tax, or legal advice."], ["Availability", "Many functions work locally offline, but sign-in, sync, and model downloads require connectivity and may be interrupted."], ["Acceptable use", "Do not use the service to access or disrupt another person’s data, or to abuse the contact and waitlist forms."], ["Ending use", "You can export data and delete the account from the app. Account deletion removes cloud and device copies within the implementation boundaries described by the product."]],
} as const;

export default function TermsPage() {
  const { lang } = useSitePreferences();
  return <SitePage className="content-page legal-page"><section className="page-hero shell"><span className="section-kicker">{lang === "ar" ? "آخر تحديث: 1 أغسطس 2026" : "Last updated: August 1, 2026"}</span><h1>{lang === "ar" ? "شروط الاستخدام" : "Terms of use"}</h1><p>{lang === "ar" ? "شروط مختصرة وواضحة للاستخدام والوصول المبكر. تحتاج إلى مراجعة قانونية نهائية قبل الإطلاق التجاري." : "Clear, concise terms for use and early access. Final legal review is required before commercial launch."}</p></section><section className="legal-content shell">{terms[lang].map(([heading, body], index) => <article key={heading}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{heading}</h2><p>{body}</p></div></article>)}</section></SitePage>;
}
