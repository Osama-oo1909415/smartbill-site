"use client";

import Link from "./internal-link";
import { trackEvent } from "./analytics";
import { SitePage } from "./site-chrome";
import { useSitePreferences } from "./site-preferences";
import { WaitlistForm } from "./waitlist-form";

const copy = {
  ar: {
    eyebrow: "من الفاتورة إلى فهم إنفاقك",
    title: <>مصروفاتك أوضح.<br /><em>وخصوصيتك لك.</em></>,
    lead: "SmartBill يحوّل فواتيرك إلى صورة مالية مفهومة بمسح ذكي، مساعد مدمج، وتقارير تساعدك على القرار.",
    stepsLine: ["صوّر الفاتورة", "راجع البيانات", "افهم إنفاقك"],
    primary: "انضم لقائمة الانتظار",
    secondary: "شاهد كيف يعمل",
    notes: ["قراءة تلقائية بلا إدخال يدوي", "كل معاملة تمر بمراجعتك"],
    bestFor: "لمن يريد فهم إنفاقه اليومي دون تسليم بياناته المالية إلى خدمة ذكاء اصطناعي عامة.",
    accessStatus: { label: "وصول مبكر", title: "التطبيق لم يُطرح في المتاجر بعد", body: "سجّل بريدك لتصلك تحديثات الإطلاق فقط. لا موعد دعوة أو التزام مخفي." },
    privacyNote: "قراءة الفواتير والحسابات المحلية على جهازك. المزامنة وتسجيل الدخول واستيراد Gmail خيارات منفصلة.",
    phone: { greeting: "مساء الخير،", name: "أحمد", balance: "إجمالي الرصيد", currency: "ر.ق", income: "الدخل", spent: "المصروف", overview: "نظرة سريعة", month: "يوليو 2026", shopping: "التسوق", food: "الطعام", bills: "الفواتير", recent: "أحدث المعاملات", all: "عرض الكل", today: "اليوم", yesterday: "أمس", saved: "محفوظ على جهازك", accuracy: "دقة القراءة" },
    ribbon: ["استخراج فوري", "مسودة قابلة للتعديل", "مساعد يفهم أرقامك", "نسخ احتياطي اختياري"],
    howKicker: "كيف يعمل",
    howTitle: <>ثلاث خطوات من الصورة<br />إلى قرار أوضح.</>,
    howIntro: "لا تحتاج إلى بناء جداول أو إدخال كل رقم يدوياً. أنت تحتفظ بالتحكم في كل خطوة.",
    how: [
      { n: "01", title: "صوّر", text: "التقط الفاتورة بالكاميرا، وسيقرأ SmartBill المتجر والمبلغ والتاريخ والبنود تلقائياً." },
      { n: "02", title: "راجع", text: "يعرض SmartBill المتجر والمبلغ والتاريخ والبنود كمسودة قابلة للتعديل قبل الحفظ." },
      { n: "03", title: "افهم", text: "تظهر المعاملة في تقاريرك، ويمكنك سؤال المساعد عن الاتجاهات والميزانيات." },
    ],
    proofSequence: [
      { n: "01", title: "صوّر الفاتورة", text: "رسم توضيحي لمسار الالتقاط — يبدأ الاستخراج من صورة الإيصال.", kind: "receipt" },
      { n: "02", title: "راجع المسودة", text: "تظهر الحقول قابلة للتعديل قبل أن تصبح معاملة محفوظة.", kind: "review" },
      { n: "03", title: "افهم النتيجة", text: "تتحول السجلات المراجعة إلى تقارير وأسئلة مرتبطة بأرقامك.", kind: "insight" },
    ],
    featuresKicker: "أدوات متكاملة، لا شاشات مزدحمة",
    featuresTitle: <>كل ما تحتاجه<br />لفهم أموالك.</>,
    featuresIntro: "صُمّمت الأدوات حول رحلة واحدة واضحة: التقط المعلومة، راجعها، ثم استخدمها بثقة.",
    features: [
      { n: "01", eyebrow: "OCR سريع", title: "فاتورة مصوّرة، معاملة جاهزة", text: "استخراج المتجر والمبلغ والتاريخ والبنود مع إبقاء المسودة قابلة للتعديل.", visual: "scan" },
      { n: "02", eyebrow: "مساعد مالي مدمج", title: "اسأل مصروفاتك بلغة طبيعية", text: "إجابات مرتبطة بسجلاتك الفعلية، ومقترحات لا تغيّر أي رقم من دون موافقتك.", visual: "assistant" },
      { n: "03", eyebrow: "خزنة مشفّرة", title: "بياناتك تبقى أقرب إليك", text: "قاعدة بيانات مشفّرة على جهازك، مع تحكّم واضح في النسخ الاحتياطي والمزامنة.", visual: "privacy" },
      { n: "04", eyebrow: "تقارير واضحة", title: "الصورة الكاملة، من دون ضوضاء", text: "اتجاهات وميزانيات وفئات برسوم واضحة تساعدك على اتخاذ قرار أسرع.", visual: "reports" },
    ],
    privacyKicker: "الخصوصية ليست إعداداً إضافياً",
    privacyTitle: <>ذكاء مالي<br />لا يطلب منك التنازل.</>,
    privacyText: "تُقرأ الفواتير وتُحسب الأرقام وتُصاغ إجابات المساعد على جهازك. أنت تقرر ما يُحفظ، وما يُزامن، وما يُحذف.",
    privacyPoints: [
      ["01", "المعالجة على الجهاز", "صور الفواتير والمحتوى المالي لا تُرسل إلى خدمة ذكاء اصطناعي عامة."],
      ["02", "المراجعة قبل التنفيذ", "كل مبلغ مستخرج يظهر كمسودة قابلة للتصحيح قبل أن يصبح معاملة."],
      ["03", "المزامنة بإذن واضح", "النسخ بين الأجهزة خيار مستقل يمكنك تفعيله أو إيقافه."],
    ],
    proofKicker: "ثقة مبنية على تفاصيل قابلة للتحقق",
    proofTitle: "لا أرقام تسويقية مختلقة.",
    proofText: "SmartBill في مرحلة الوصول المبكر. لذلك نشارك ما يفعله المنتج فعلياً بدلاً من ادعاءات استخدام أو آراء عملاء غير موجودة.",
    proof: [
      ["OCR محلي", "نماذج القراءة تعمل داخل التطبيق."],
      ["خزنة مشفّرة", "السجلات محفوظة في قاعدة بيانات مشفّرة."],
      ["قرارك أولاً", "لا تعديل مالي من دون مراجعتك."],
      ["سياسة منشورة", "تفاصيل البيانات والاحتفاظ والحذف موثقة."],
    ],
    policyLink: "اقرأ سياسة الخصوصية الكاملة",
    waitKicker: "وصول مبكر",
    waitTitle: <>كن أول من يجرّب<br />SmartBill.</>,
    waitText: "التطبيق لم يُطرح في المتاجر بعد. سجّل اهتمامك بوضوح وسنستخدم بريدك فقط لإخبارك عند بدء التجربة.",
  },
  en: {
    eyebrow: "From receipt to spending insight",
    title: <>Clearer spending.<br /><em>Privacy that stays yours.</em></>,
    lead: "SmartBill turns receipts into a financial picture you can understand—with smart scanning, a built-in assistant, and calm, useful reports.",
    stepsLine: ["Capture the receipt", "Review the draft", "Understand your spending"],
    primary: "Join the waitlist",
    secondary: "See how it works",
    notes: ["Automatic reading without manual entry", "Every transaction passes your review"],
    bestFor: "For people who want to understand everyday spending without handing financial records to a general-purpose AI service.",
    accessStatus: { label: "Early access", title: "The app is not in the stores yet", body: "Join for launch updates only. There is no hidden invite date or commitment." },
    privacyNote: "Receipt reading and local calculations stay on your device. Sync, sign-in, and Gmail import are separate choices.",
    phone: { greeting: "Good evening,", name: "Ahmed", balance: "Total balance", currency: "QAR", income: "Income", spent: "Spent", overview: "Quick overview", month: "July 2026", shopping: "Shopping", food: "Food", bills: "Bills", recent: "Recent transactions", all: "View all", today: "Today", yesterday: "Yesterday", saved: "Kept on your device", accuracy: "Reading accuracy" },
    ribbon: ["Instant extraction", "Editable draft", "An assistant that understands your figures", "Optional backup"],
    howKicker: "How it works",
    howTitle: <>Three steps from a photo<br />to a clearer decision.</>,
    howIntro: "No spreadsheets and no line-by-line typing. You keep control at every step.",
    how: [
      { n: "01", title: "Capture", text: "Photograph a receipt and SmartBill automatically reads the merchant, amount, date, and line items." },
      { n: "02", title: "Review", text: "SmartBill shows the merchant, amount, date, and items as an editable draft before anything is saved." },
      { n: "03", title: "Understand", text: "The transaction flows into your reports, and you can ask the assistant about trends and budgets." },
    ],
    proofSequence: [
      { n: "01", title: "Capture the receipt", text: "Illustrative flow — extraction starts from a receipt image.", kind: "receipt" },
      { n: "02", title: "Review the draft", text: "Fields remain editable before anything becomes a saved transaction.", kind: "review" },
      { n: "03", title: "Understand the result", text: "Reviewed records become reports and questions grounded in your figures.", kind: "insight" },
    ],
    featuresKicker: "Connected tools, not crowded screens",
    featuresTitle: <>Everything you need<br />to understand your money.</>,
    featuresIntro: "Each tool supports one clear journey: capture the information, review it, then use it with confidence.",
    features: [
      { n: "01", eyebrow: "Fast OCR", title: "A photo becomes a ready draft", text: "Extract merchant, amount, date, and line items while keeping every field editable.", visual: "scan" },
      { n: "02", eyebrow: "Built-in assistant", title: "Ask your spending in plain language", text: "Answers grounded in your records, with suggestions that never change a number without approval.", visual: "assistant" },
      { n: "03", eyebrow: "Encrypted vault", title: "Your data stays close to you", text: "An encrypted database on your device, with clear control over backup and sync.", visual: "privacy" },
      { n: "04", eyebrow: "Clear reports", title: "The full picture, without noise", text: "Trends, budgets, and categories presented clearly enough to support faster decisions.", visual: "reports" },
    ],
    privacyKicker: "Privacy is not an extra setting",
    privacyTitle: <>Financial intelligence<br />without the surrender.</>,
    privacyText: "Receipts are read, figures are computed, and assistant responses are produced on your device. You decide what is saved, synced, or deleted.",
    privacyPoints: [
      ["01", "Processing stays on device", "Receipt images and financial content are not sent to a general-purpose AI service."],
      ["02", "Review comes before action", "Every extracted amount appears as a correctable draft before it becomes a transaction."],
      ["03", "Sync needs a clear choice", "Multi-device backup is a separate option you can turn on or off."],
    ],
    proofKicker: "Trust built on verifiable details",
    proofTitle: "No invented marketing numbers.",
    proofText: "SmartBill is in early access. We describe what the product actually does instead of publishing made-up usage claims or testimonials.",
    proof: [
      ["Local OCR", "Reading models run inside the app."],
      ["Encrypted vault", "Records live in an encrypted database."],
      ["Approval first", "No financial change happens without review."],
      ["Published policy", "Data, retention, and deletion are documented."],
    ],
    policyLink: "Read the full privacy policy",
    waitKicker: "Early access",
    waitTitle: <>Be among the first<br />to try SmartBill.</>,
    waitText: "The app is not in the stores yet. Join transparently, and we’ll use your email only to let you know when testing opens.",
  },
} as const;

function FeatureVisual({ type, lang }: { type: string; lang: "ar" | "en" }) {
  if (type === "scan") return <div className="feature-visual scan-visual" aria-hidden="true"><div className="receipt-paper"><span className="receipt-head" /><span /><span /><span className="receipt-short" /><b>268.80</b></div><div className="scan-corners"><i /><i /><i /><i /></div><div className="scan-beam" /><div className="accuracy-pill">{lang === "ar" ? "مسودة قابلة للتعديل" : "Editable draft"}</div></div>;
  if (type === "assistant") return <div className="feature-visual assistant-visual" aria-hidden="true"><div className="assistant-orb"><span /><span /><span /></div><div className="chat-line question">{lang === "ar" ? "أين زاد إنفاقي؟" : "Where did I spend more?"}</div><div className="chat-line answer"><i />{lang === "ar" ? "المطاعم أعلى بـ 12%" : "Dining is up 12%"}</div></div>;
  if (type === "privacy") return <div className="feature-visual privacy-visual" aria-hidden="true"><div className="device-vault"><div className="lock-shackle" /><div className="lock-body"><i /></div><span>{lang === "ar" ? "على جهازك" : "On your device"}</span></div><div className="local-dot dot-one" /><div className="local-dot dot-two" /><div className="local-dot dot-three" /></div>;
  return <div className="feature-visual reports-visual" aria-hidden="true"><div className="mini-bars"><i style={{ height: "34%" }} /><i style={{ height: "58%" }} /><i style={{ height: "47%" }} /><i style={{ height: "82%" }} /><i style={{ height: "68%" }} /></div><div className="report-badge"><b>−12%</b><span>{lang === "ar" ? "هذا الشهر" : "this month"}</span></div></div>;
}

function ProofVisual({ kind, lang }: { kind: "receipt" | "review" | "insight"; lang: "ar" | "en" }) {
  if (kind === "receipt") return <div className="proof-visual proof-receipt" aria-hidden="true"><div className="proof-receipt-paper"><b>SMARTBILL</b><span /><span /><span /><i>268.80</i></div><div className="proof-scan-frame"><i /><i /><i /><i /></div><small>{lang === "ar" ? "رسم توضيحي" : "Flow illustration"}</small></div>;
  if (kind === "review") return <div className="proof-visual proof-review" aria-hidden="true"><div className="review-window"><b>{lang === "ar" ? "مراجعة المسودة" : "Review draft"}</b><span><i />{lang === "ar" ? "المتجر" : "Merchant"}<strong>{lang === "ar" ? "مكتبة جرير" : "Jarir Bookstore"}</strong></span><span><i />{lang === "ar" ? "المبلغ" : "Amount"}<strong>268.80</strong></span><em>{lang === "ar" ? "قابل للتعديل" : "Editable"}</em></div><small>{lang === "ar" ? "رسم توضيحي" : "Flow illustration"}</small></div>;
  return <div className="proof-visual proof-insight" aria-hidden="true"><img src={lang === "ar" ? "/smartbill-app-screen-dark-ar.png" : "/smartbill-app-screen-nav-v2-en.png"} alt="" /><div className="insight-label">{lang === "ar" ? "تقارير مرتبطة بسجلاتك" : "Reports grounded in your records"}</div></div>;
}

export default function Home() {
  const { lang } = useSitePreferences();
  const t = copy[lang];

  return (
    <SitePage>
      <section className="hero" id="top">
        <div className="hero-grid shell">
          <div className="hero-copy">
            <div className="eyebrow-pill"><span />{t.eyebrow}</div>
            <h1>{t.title}</h1>
            <p className="hero-lead">{t.lead}</p>
            <p className="hero-best-for">{t.bestFor}</p>
            <div className="quick-steps" aria-label={t.howKicker}>{t.stepsLine.map((step, index) => <span key={step}><b>{index + 1}</b>{step}{index < 2 ? <i aria-hidden="true">→</i> : null}</span>)}</div>
            <div className="hero-actions"><a className="button primary-button" href="#waitlist" onClick={() => trackEvent("hero_cta_click", { locale: lang, target: "waitlist" })}><span>{t.primary}</span><i aria-hidden="true">→</i></a><a className="button secondary-button" href="#how" onClick={() => trackEvent("hero_cta_click", { locale: lang, target: "how" })}>{t.secondary}</a></div>
            <div className="hero-notes">{t.notes.map((note) => <span key={note}><i>✓</i>{note}</span>)}</div>
            <div className="early-access-note"><span>{t.accessStatus.label}</span><strong>{t.accessStatus.title}</strong><p>{t.accessStatus.body}</p><small>{t.privacyNote}</small></div>
          </div>

          <div className="hero-product" aria-label={lang === "ar" ? "معاينة تطبيق SmartBill" : "SmartBill app preview"}>
            <img className="real-app-screen" src={lang === "ar" ? "/smartbill-app-screen-dark-ar.png" : "/smartbill-app-screen-nav-v2-en.png"} alt={lang === "ar" ? "واجهة SmartBill مع زر مسح OCR" : "SmartBill interface with OCR scan action"} width="591" height="1024" />
          </div>
        </div>
        <div className="hero-bottom shell">{t.ribbon.map((item, index) => <span key={item}>{item}{index < 3 ? <i /> : null}</span>)}</div>
      </section>

      <section className="proof-sequence section-space" id="product-proof"><div className="shell"><div className="section-heading"><div><span className="section-kicker">{lang === "ar" ? "شاهد المسار" : "See the flow"}</span><h2>{lang === "ar" ? "من الإيصال إلى نتيجة قابلة للفهم." : "From receipt to a result you can understand."}</h2></div><p>{lang === "ar" ? "هذه الرسومات تشرح المسار. واجهة التطبيق الحقيقية تظهر في خطوة النتيجة، بينما تظل المسودة قابلة للمراجعة قبل الحفظ." : "These illustrations explain the flow. The real app view appears at the result stage, while the draft remains reviewable before saving."}</p></div><div className="proof-sequence-grid">{t.proofSequence.map((step) => <article className="proof-step" key={step.n}><div className="proof-step-meta"><b>{step.n}</b><span>{step.kind === "insight" ? (lang === "ar" ? "واجهة حقيقية" : "Real app view") : (lang === "ar" ? "رسم توضيحي" : "Flow illustration")}</span></div><ProofVisual kind={step.kind} lang={lang} /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>

      <section className="how-section section-space" id="how"><div className="shell"><div className="section-heading"><div><span className="section-kicker">{t.howKicker}</span><h2>{t.howTitle}</h2></div><p>{t.howIntro}</p></div><div className="how-grid">{t.how.map((step) => <article className="how-card" key={step.n}><b>{step.n}</b><div className="how-icon" aria-hidden="true">{step.n === "01" ? "⌗" : step.n === "02" ? "✓" : "↗"}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>

      <section className="features-section section-space" id="features"><div className="shell"><div className="section-heading"><div><span className="section-kicker">{t.featuresKicker}</span><h2>{t.featuresTitle}</h2></div><p>{t.featuresIntro}</p></div><div className="features-grid">{t.features.map((feature) => <article className={`feature-card card-${feature.visual}`} key={feature.n}><div className="feature-meta"><span>{feature.eyebrow}</span><b>{feature.n}</b></div><FeatureVisual type={feature.visual} lang={lang} /><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div></div></section>

      <section className="privacy-section" id="privacy"><div className="privacy-grid shell"><div className="privacy-copy"><span className="section-kicker light-kicker">{t.privacyKicker}</span><h2>{t.privacyTitle}</h2><p>{t.privacyText}</p><div className="privacy-points">{t.privacyPoints.map(([n, title, text]) => <span key={n}><i>{n}</i><b>{title}</b><small>{text}</small></span>)}</div><Link className="text-link light-link" href="/privacy-policy">{t.policyLink} →</Link></div><div className="privacy-art" aria-hidden="true"><div className="vault-ring ring-outer"><span>{lang === "ar" ? "بياناتك" : "Your data"}</span></div><div className="vault-ring ring-middle" /><div className="vault-core"><div className="lock-shackle" /><div className="lock-body"><i /></div><b>{lang === "ar" ? "خاص بتصميمه" : "Private by design"}</b><small>{lang === "ar" ? "خزنة مشفّرة" : "Encrypted vault"}</small></div><span className="orbit-label orbit-ocr">OCR</span><span className="orbit-label orbit-ai">AI</span><span className="orbit-label orbit-sync">SYNC</span></div></div></section>

      <section className="proof-section section-space"><div className="shell proof-grid"><div className="proof-copy"><span className="section-kicker">{t.proofKicker}</span><h2>{t.proofTitle}</h2><p>{t.proofText}</p><Link className="text-link" href="/about">{lang === "ar" ? "تعرف على المشروع" : "Learn about the project"} →</Link></div><div className="proof-cards">{t.proof.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="waitlist-section" id="waitlist"><div className="waitlist-card shell"><div className="waitlist-copy"><span className="section-kicker light-kicker">{t.waitKicker}</span><h2>{t.waitTitle}</h2><p>{t.waitText}</p><WaitlistForm /></div><div className="waitlist-brand" aria-hidden="true"><img src="/app-icon.png" alt="" width="150" height="150" /><span>SmartBill</span><small>{lang === "ar" ? "وضوح أكثر. ضوضاء أقل." : "More clarity. Less noise."}</small></div></div></section>
    </SitePage>
  );
}
