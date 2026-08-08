"use client";

import Link from "next/link";
import { SitePage } from "../site-chrome";
import { useSitePreferences } from "../site-preferences";

export default function AboutPage() {
  const { lang } = useSitePreferences();
  const t = lang === "ar" ? {
    kicker: "عن SmartBill", title: "منتج مالي يضع الوضوح والتحكّم قبل الاستعراض.", intro: "SmartBill تطبيق جوال قيد التطوير لإدارة المالية الشخصية. بُني حول فكرة بسيطة: يجب أن تساعدك التقنية على فهم أموالك من دون أن تطلب نقل كل تفاصيلك إلى خدمة ذكاء اصطناعي خارجية.",
    statusTitle: "حالة المنتج", status: "SmartBill حالياً في مرحلة الوصول المبكر ولم يُطرح بعد على Google Play أو App Store. لهذا لا ننشر أرقام مستخدمين أو آراء عملاء غير موجودة، ونستخدم قائمة انتظار واضحة بدلاً من زر تحميل وهمي.",
    principles: "مبادئنا", cards: [["الجهاز أولاً", "OCR والمساعد يعملان محلياً ضمن الحدود التي يوضحها المنتج."], ["المستخدم يقرر", "البيانات المستخرجة تبقى مسودة حتى تراجعها وتحفظها."], ["اللغة جزء من المنتج", "تجربة عربية RTL وإنجليزية من نفس نظام التصميم."], ["الشفافية قبل الادعاء", "نوضح ما هو متاح الآن، وما يزال في مرحلة الوصول المبكر."]],
    companyTitle: "من يقف خلفه؟", company: "يُطوّر SmartBill كمشروع برمجي مستقل ضمن مستودع SmartBill. لا ننشر أسماء فريق أو كيانات قانونية لم تُعتمد بعد. للاستفسارات، استخدم نموذج التواصل؛ وسيتم تحديث هذه الصفحة بمعلومات الجهة المطوّرة قبل الإطلاق العام.", contact: "تواصل معنا",
  } : {
    kicker: "About SmartBill", title: "A finance product that puts clarity and control before spectacle.", intro: "SmartBill is a mobile personal-finance app in development. It is built around a simple belief: technology should help you understand your money without asking you to move every financial detail to an external AI service.",
    statusTitle: "Product status", status: "SmartBill is currently in early access and is not yet on Google Play or the App Store. We do not publish invented user counts or testimonials, and we use a transparent waitlist instead of a fake download button.",
    principles: "Our principles", cards: [["Device first", "OCR and the assistant run locally within the boundaries the product explains."], ["The user decides", "Extracted data stays a draft until you review and save it."], ["Language is product", "Arabic RTL and English share one design system."], ["Transparency before claims", "We state what is available now and what remains in early access."]],
    companyTitle: "Who is behind it?", company: "SmartBill is being developed as an independent software project in the SmartBill repository. We do not publish team names or legal entities that have not been formally established. Use the contact form for questions; this page will be updated with the operating entity before public launch.", contact: "Contact us",
  };
  return <SitePage className="content-page"><section className="page-hero shell"><span className="section-kicker">{t.kicker}</span><h1>{t.title}</h1><p>{t.intro}</p></section><section className="content-section shell"><article className="status-card"><span>EARLY ACCESS</span><h2>{t.statusTitle}</h2><p>{t.status}</p></article><div className="content-heading"><h2>{t.principles}</h2></div><div className="principles-grid">{t.cards.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>)}</div><article className="company-card"><h2>{t.companyTitle}</h2><p>{t.company}</p><Link className="button primary-button" href="/contact">{t.contact} →</Link></article></section></SitePage>;
}
