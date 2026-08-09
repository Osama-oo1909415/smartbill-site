"use client";

import Link from "../internal-link";
import { SitePage } from "../site-chrome";
import { useSitePreferences } from "../site-preferences";

export default function AboutPage() {
  const { lang } = useSitePreferences();
  const t = lang === "ar" ? {
    kicker: "عن SmartBill", title: "منتج مالي يضع الوضوح والتحكّم قبل الاستعراض.", intro: "SmartBill تطبيق جوال قيد التطوير لإدارة المالية الشخصية. بُني حول فكرة بسيطة: يجب أن تساعدك التقنية على فهم أموالك من دون أن تطلب نقل كل تفاصيلك إلى خدمة ذكاء اصطناعي خارجية.",
    statusTitle: "حالة المنتج", status: "SmartBill حالياً في مرحلة الوصول المبكر ولم يُطرح بعد على Google Play أو App Store. لهذا لا ننشر أرقام مستخدمين أو آراء عملاء غير موجودة، ونستخدم قائمة انتظار واضحة بدلاً من زر تحميل وهمي.",
    principles: "مبادئنا", cards: [["الجهاز أولاً", "OCR والمساعد يعملان محلياً ضمن الحدود التي يوضحها المنتج."], ["المستخدم يقرر", "البيانات المستخرجة تبقى مسودة حتى تراجعها وتحفظها."], ["اللغة جزء من المنتج", "تجربة عربية RTL وإنجليزية من نفس نظام التصميم."], ["الشفافية قبل الادعاء", "نوضح ما هو متاح الآن، وما يزال في مرحلة الوصول المبكر."]],
    companyTitle: "من يقف خلفه؟", company: "SmartBill مشروع برمجي مستقل في مرحلة الوصول المبكر. الحساب العام المرتبط بتطوير وصيانة مستودعه يعود إلى Osama Yousif Eisa Osman. نعرض هذه المعلومة القابلة للتحقق من دون نسب صفة مؤسس أو جهة قانونية لم يُعلن عنها بعد.", maintainer: "GitHub العام", linkedin: "LinkedIn", contact: "تواصل معنا",
  } : {
    kicker: "About SmartBill", title: "A finance product that puts clarity and control before spectacle.", intro: "SmartBill is a mobile personal-finance app in development. It is built around a simple belief: technology should help you understand your money without asking you to move every financial detail to an external AI service.",
    statusTitle: "Product status", status: "SmartBill is currently in early access and is not yet on Google Play or the App Store. We do not publish invented user counts or testimonials, and we use a transparent waitlist instead of a fake download button.",
    principles: "Our principles", cards: [["Device first", "OCR and the assistant run locally within the boundaries the product explains."], ["The user decides", "Extracted data stays a draft until you review and save it."], ["Language is product", "Arabic RTL and English share one design system."], ["Transparency before claims", "We state what is available now and what remains in early access."]],
    companyTitle: "Who is behind it?", company: "SmartBill is an independent software project in early access. The public account associated with developing and maintaining its repository belongs to Osama Yousif Eisa Osman. We share that verifiable fact without assigning a founder title or legal entity that has not been announced.", maintainer: "Public GitHub", linkedin: "LinkedIn", contact: "Contact us",
  };
  return <SitePage className="content-page"><section className="page-hero shell"><span className="section-kicker">{t.kicker}</span><h1>{t.title}</h1><p>{t.intro}</p></section><section className="content-section shell"><article className="status-card"><span>EARLY ACCESS</span><h2>{t.statusTitle}</h2><p>{t.status}</p></article><div className="content-heading"><h2>{t.principles}</h2></div><div className="principles-grid">{t.cards.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>)}</div><article className="company-card"><div className="maintainer-mark" aria-hidden="true">O</div><div><h2>{t.companyTitle}</h2><p>{t.company}</p><div className="company-actions"><a className="button secondary-button" href="https://github.com/Osama-oo1909415" target="_blank" rel="noreferrer">{t.maintainer} ↗</a><a className="button secondary-button" href="https://www.linkedin.com/in/osama-osman-950aa3194/" target="_blank" rel="noreferrer">{t.linkedin} ↗</a><Link className="button primary-button" href="/contact">{t.contact} →</Link></div></div></article></section></SitePage>;
}
