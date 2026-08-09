"use client";

import Link from "../internal-link";
import { SitePage } from "../site-chrome";
import { useSitePreferences } from "../site-preferences";

const policy = {
  ar: [
    ["ملخص", [
      "يعمل SmartBill محلياً أولاً. تُقرأ إيصالاتك وتُصاغ إجابات المساعد على هاتفك. لا يُرسل نص الإيصال ولا بنوده ولا أسئلة المساعد إلى أي خدمة ذكاء اصطناعي خارجية.",
      "تُحفظ سجلاتك المحلية في قاعدة بيانات SQLCipher مشفّرة على جهازك. عند تفعيل المزامنة، تُنقل الحقول التي اخترت مزامنتها عبر اتصال مشفّر إلى خادم حساب SmartBill مع ضوابط وصول لكل مستخدم؛ النسخة السحابية ليست مشفّرة من طرف إلى طرف بمفتاح لا يملكه الخادم.",
    ]],
    ["ما الذي نحفظه", [
      "الحساب: البريد الإلكتروني والاسم المعروض وطريقة تسجيل الدخول التي اخترتها (بريد وكلمة مرور أو Google).",
      "السجلات المالية التي تنشئها أو تستوردها: المحافظ والمعاملات والتصنيفات والميزانيات والأهداف والضمانات والوسوم والمعاملات المتكررة والإيصالات وحقولها المستخرجة ومحادثات المساعد.",
      "بيانات الجهاز: رمز الإشعارات (فقط إذا سمحت بالإشعارات) وتفضيلاتك ومعرّف جهاز يُستخدم لترتيب تغييرات المزامنة.",
      "التخزين: كلمة \"حفظ\" تعني أولاً التخزين المشفّر على جهازك. عند تفعيل المزامنة تُخزَّن الحقول المتزامنة لدى مزوّد خادم SmartBill داخل حساب محمي بسياسات وصول؛ يستطيع مزوّد البنية وعمليات SmartBill المصرح بها معالجة تلك البيانات عند الحاجة لتشغيل الخدمة.",
    ]],
    ["صور الإيصالات", [
      "يتم التعرّف على النص بالكامل على جهازك عبر نماذج تُنزّل داخل التطبيق، ولا تُرفع الصور لمعالجتها.",
      "رفع صور الإيصالات إلى حسابك كنسخة احتياطية إعداد منفصل تتحكم به من صفحة الحساب. عند إيقافه تبقى الصورة على الجهاز وتُزامَن الحقول المستخرجة فقط.",
    ]],
    ["المساعد", [
      "كل رقم يذكره المساعد محسوب محلياً من سجلاتك. عند تثبيت النموذج المحلي فإنه يعيد صياغة تلك الحقائق فقط، وعند غيابه يجيب التطبيق بالنص الحتمي مع توضيح ذلك في الإجابة.",
      "لا تُرسل أي معلومة مالية إلى روبوت محادثة عام ولا تُستخدم في تدريب أي نموذج.",
    ]],
    ["استيراد Gmail", [
      "عند ربط Gmail يطلب SmartBill صلاحية قراءة فقط ويبحث في الرسائل الشبيهة بالإيصالات ضمن النطاق الزمني الذي تختاره.",
      "تُحلَّل الرسائل على جهازك، وتبقى معرّفات رسائل Gmail وأجزائها وسجلها على الجهاز ومستثناة من المزامنة ومن ملفات التصدير، ويمكنك فصل الربط في أي وقت.",
    ]],
    ["تقارير الأعطال", [
      "تُرسل تقارير الأعطال فقط إذا كان مفتاح المراقبة مُهيّأً في النسخة. يحتوي التقرير على نوع الخطأ ورسالة مُنقّحة ومسار التتبع، وتُحذف هوية المستخدم ومحتوى الطلبات وأي سياق إضافي قبل الإرسال، ولا تُرفق أي بيانات مالية أو محتوى إيصالات.",
    ]],
    ["قياس الاستخدام الاختياري", [
      "قياس استخدام التطبيق متوقف افتراضياً ويمكن تشغيله أو إيقافه من صفحة الحساب. عند تشغيله يرسل التطبيق أسماء أحداث محدودة مثل اكتمال الاستيراد أو فتح نافذة المشاركة، مع لغة التطبيق وإصداره ومعرّف عشوائي خاص بالجهاز.",
      "لا تتضمن أحداث الاستخدام مبالغ أو أسماء متاجر أو نصوص إيصالات أو أسئلة المساعد أو معرّف حساب Supabase. تُحذف الأحداث من الخادم بعد 90 يوماً. روابط الدعوة تحفظ رمزاً عشوائياً ولغة وحملة وعدد النقرات فقط، وتنتهي صلاحيتها بعد 90 يوماً.",
    ]],
    ["تحكّمك ببياناتك", [
      "التصدير: الحساب ← تصدير ينشئ ملف ZIP يحتوي بياناتك وجداولها وملفات الإيصالات المحلية القابلة للقراءة، مع استثناء بيانات الاعتماد ورموز الإشعارات ومفاتيح التشفير ومعرّفات الأجهزة وبيانات المزامنة الداخلية.",
      "الحذف: الحساب ← حذف الحساب يزيل سجلاتك السحابية ونسخة الجهاز. أما إزالة البيانات من هذا الجهاز فهي إجراء منفصل يُبقي الحساب قائماً.",
    ]],
    ["تحليلات الموقع", [
      "يستخدم موقع SmartBill Google Analytics لقياس الزيارات وفهم استخدام الصفحات وتحسين الموقع. قد تعالج Google بيانات التصفح والجهاز وفق سياساتها الخاصة.",
      "لا نرسل إلى Google Analytics سجلاتك المالية أو صور الإيصالات أو محتوى المساعد.",
    ]],
    ["الاحتفاظ والمشاركة", [
      "تبقى سجلاتك في تخزينك المشفّر (على جهازك أو في حسابك السحابي الخاص) حتى تحذفها أنت أو تحذف حسابك. لا يبيع SmartBill بياناتك الشخصية أبداً، ولا يشاركها مع المعلنين أو أي جهة خارجية لأغراض تسويقية.",
      "السجلات المحلية مشفّرة أثناء التخزين، والاتصال بالخادم مشفّر أثناء النقل. بيانات المزامنة السحابية محمية بضوابط وصول وليست تشفيراً من طرف إلى طرف غير قابل للقراءة من الخادم.",
      "تعتمد المعالجة على مزوّدي بنية تحتية — Supabase للمصادقة والمزامنة والتخزين الاختياري، وGoogle لتسجيل الدخول الاختياري واستيراد Gmail وتحليلات الموقع، وExpo لتوصيل الإشعارات، وSentry لتقارير الأعطال المنقّحة عند تهيئته — ويستلم كل منهم ما يلزم لأداء وظيفته.",
    ]],
  ],
  en: [
    ["Summary", [
      "SmartBill is local-first. Your receipts are read and your assistant answers are produced on your phone. Receipt text, item lines, and assistant prompts are never sent to a third-party AI service.",
      "Your local records are stored in a SQLCipher-encrypted database on your device. If you enable sync, the fields you choose to sync travel over an encrypted connection to SmartBill's account backend with per-user access controls; that cloud copy is not end-to-end encrypted with a key unavailable to the server.",
    ]],
    ["What we store", [
      "Account: email address, display name, and the sign-in provider you chose (email/password or Google).",
      "Financial records you create or import: wallets, transactions, categories, budgets, goals, warranties, tags, recurring templates, receipts and their extracted fields, and assistant conversations.",
      "Device data: a push notification token (only if you allow notifications), your app preferences, and a device identifier used to order sync changes.",
      "Storage: \"Save\" first means encrypted storage on your device. If sync is enabled, synced fields are stored by SmartBill's backend provider in an account protected by access policies; the infrastructure provider and authorized SmartBill operations can process that data when needed to run the service.",
    ]],
    ["Receipt images", [
      "Recognition runs entirely on your device using models downloaded to the app. Images are not uploaded for processing.",
      "Uploading receipt images to your account for backup is a separate setting you control in Account. When it is off, the image stays on the device and only the extracted fields sync.",
    ]],
    ["Assistant", [
      "Every figure the assistant states is computed locally from your own records. When the on-device model is installed it only rewords those computed facts; when it is not, the app answers with the deterministic text and labels it as such.",
      "Nothing about your finances is sent to a general-purpose chatbot or used to train any model.",
    ]],
    ["Gmail import", [
      "If you connect Gmail, SmartBill requests read-only access and looks only for receipt-like messages in the date range you pick.",
      "Message bodies are parsed on your device. Gmail message, part, and history identifiers are kept on the device and excluded from sync and from exports; you can disconnect at any time.",
    ]],
    ["Diagnostics", [
      "Crash reports are sent only if a monitoring key is configured for the build. Reports carry the error type, a redacted message, and the stack trace. User identity, request bodies, breadcrumbs, and any extra context are stripped before sending, and receipt or financial content is never attached.",
    ]],
    ["Optional app usage measurement", [
      "App usage measurement is off by default and can be enabled or disabled from Account. If enabled, the app sends a small allowlist of event names such as import completion or opening the share sheet, together with app language, app version, and a random device-scoped identifier.",
      "Usage events never include amounts, merchant names, receipt text, assistant questions, or your Supabase account identifier. Server events are deleted after 90 days. Invite links store only a random code, language, campaign, and click count, and expire after 90 days.",
    ]],
    ["Your control", [
      "Export: Account → Export produces a portable ZIP with your data, spreadsheets, and readable local receipt files. Credentials, push tokens, encryption keys, device identifiers, and sync internals are excluded.",
      "Delete: Account → Delete account removes your cloud records and the device copy. Removing data from this device only is a separate action that leaves the account intact.",
    ]],
    ["Website analytics", [
      "The SmartBill website uses Google Analytics to measure visits, understand page usage, and improve the site. Google may process browsing and device data under its own policies.",
      "We do not send financial records, receipt images, or assistant content to Google Analytics.",
    ]],
    ["Retention and sharing", [
      "Your records remain in your encrypted storage (on your device or in your private cloud account) until you delete them or delete your account. SmartBill never sells your personal data and does not share it with advertisers or any third party for marketing purposes.",
      "Local records are encrypted at rest and connections to the backend are encrypted in transit. Synced cloud data is protected by access controls, not by server-blind end-to-end encryption.",
      "Processing relies on infrastructure providers — Supabase for authentication, sync, and optional storage; Google for optional sign-in, Gmail import, and website analytics; Expo for push delivery; and Sentry for scrubbed crash reports when configured — each of which receives what is needed for that function.",
    ]],
  ],
} as const;

export default function PrivacyPage() {
  const { lang } = useSitePreferences();
  return (
    <SitePage className="content-page legal-page">
      <section className="page-hero shell">
        <span className="section-kicker">
          {lang === "ar" ? "آخر تحديث: 9 أغسطس 2026" : "Last updated: August 9, 2026"}
        </span>
        <h1>{lang === "ar" ? "سياسة الخصوصية" : "Privacy policy"}</h1>
        <p>
          {lang === "ar"
            ? "هذه الصفحة تنقل السياسة الموجودة داخل تطبيق SmartBill وتصف سلوك النسخة الحالية. تحتاج إلى مراجعة قانونية نهائية قبل الإطلاق التجاري في المتاجر."
            : "This page mirrors the policy shipped inside SmartBill and describes the current implementation. Final legal review is still required before commercial store launch."}
        </p>
      </section>
      <section className="legal-content shell">
        {policy[lang].map(([heading, paragraphs], index) => (
          <article key={heading}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{heading}</h2>
              {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        ))}
        <div className="legal-contact">
          <p>{lang === "ar" ? "لأي طلب متعلق ببياناتك أو بهذه السياسة، يمكنك التواصل معنا. راجع أيضاً شروط الاستخدام." : "For any request about your data or this policy, contact us. You can also review the Terms of Use."}</p>
          <div className="legal-actions">
            <Link className="button primary-button" href="/contact">{lang === "ar" ? "تواصل معنا" : "Contact us"} →</Link>
            <Link className="button secondary-button" href="/terms">{lang === "ar" ? "شروط الاستخدام" : "Terms of use"} →</Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
