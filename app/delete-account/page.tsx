"use client";

import Link from "../internal-link";
import { SitePage } from "../site-chrome";
import { useSitePreferences } from "../site-preferences";

const content = {
  ar: {
    updated: "آخر تحديث: 19 أغسطس 2026",
    title: "حذف حسابك في SmartBill",
    intro:
      "هذه الصفحة توضّح كيف يمكنك، كمستخدم لتطبيق SmartBill من Eagle Tech Labs، طلب حذف حسابك وبياناتك — سواء كان التطبيق مثبتاً على جهازك أو لا.",
    stepsHeading: "الخطوات داخل التطبيق (الطريقة الموصى بها)",
    steps: [
      "افتح تطبيق SmartBill وسجّل الدخول إلى حسابك.",
      "اذهب إلى تبويب الحساب.",
      "اختر \"حذف الحساب\" وأكّد العملية.",
    ],
    withoutAppHeading: "بدون تثبيت التطبيق",
    withoutApp:
      "أرسل رسالة إلى support@smartbill.dev من عنوان البريد الإلكتروني المسجّل في حسابك، مع طلب صريح بحذف الحساب. سنعالج الطلب يدوياً خلال 30 يوماً كحد أقصى ونؤكّد لك عند الانتهاء.",
    deletedHeading: "ما الذي يُحذف",
    deleted: [
      "جميع سجلاتك المالية المتزامنة سحابياً: المحافظ، المعاملات، التصنيفات، الميزانيات، الأهداف، الضمانات، الوسوم، المعاملات المتكررة، والإيصالات وحقولها المستخرجة.",
      "بيانات حسابك: البريد الإلكتروني، الاسم المعروض، ورمز الإشعارات.",
      "النسخة المحلية على هذا الجهاز، إضافة إلى النسخة السحابية.",
    ],
    retainedHeading: "الاحتفاظ",
    retained:
      "لا نحتفظ بنسخة من سجلاتك المالية أو بيانات حسابك بعد إتمام معالجة طلب الحذف. لا تُستخدم بياناتك المحذوفة لأي غرض آخر ولا تُشارَك مع أي طرف ثالث.",
    contact: "لأي استفسار حول هذه العملية، راجع سياسة الخصوصية أو تواصل معنا.",
  },
  en: {
    updated: "Last updated: August 19, 2026",
    title: "Delete your SmartBill account",
    intro:
      "This page explains how you, as a user of the SmartBill app by Eagle Tech Labs, can request deletion of your account and data — whether or not the app is installed on your device.",
    stepsHeading: "In the app (recommended)",
    steps: [
      "Open the SmartBill app and sign in to your account.",
      "Go to the Account tab.",
      "Select \"Delete account\" and confirm.",
    ],
    withoutAppHeading: "Without the app installed",
    withoutApp:
      "Email support@smartbill.dev from the address registered on your account and explicitly request account deletion. We process these requests manually within 30 days and confirm once complete.",
    deletedHeading: "What gets deleted",
    deleted: [
      "All your cloud-synced financial records: wallets, transactions, categories, budgets, goals, warranties, tags, recurring templates, and receipts with their extracted fields.",
      "Your account data: email address, display name, and push notification token.",
      "The local copy on this device, in addition to the cloud copy.",
    ],
    retainedHeading: "Retention",
    retained:
      "We do not retain a copy of your financial records or account data after your deletion request is processed. Deleted data is not used for any other purpose and is not shared with any third party.",
    contact: "For any question about this process, see the Privacy policy or contact us.",
  },
} as const;

export default function DeleteAccountPage() {
  const { lang } = useSitePreferences();
  const t = content[lang];
  return (
    <SitePage className="content-page legal-page">
      <section className="page-hero shell">
        <span className="section-kicker">{t.updated}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </section>
      <section className="legal-content shell">
        <article>
          <span>01</span>
          <div>
            <h2>{t.stepsHeading}</h2>
            <ol>
              {t.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </article>
        <article>
          <span>02</span>
          <div>
            <h2>{t.withoutAppHeading}</h2>
            <p>{t.withoutApp}</p>
          </div>
        </article>
        <article>
          <span>03</span>
          <div>
            <h2>{t.deletedHeading}</h2>
            {t.deleted.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </article>
        <article>
          <span>04</span>
          <div>
            <h2>{t.retainedHeading}</h2>
            <p>{t.retained}</p>
          </div>
        </article>
        <div className="legal-contact">
          <p>{t.contact}</p>
          <div className="legal-actions">
            <Link className="button primary-button" href="/contact">
              {lang === "ar" ? "تواصل معنا" : "Contact us"} →
            </Link>
            <Link className="button secondary-button" href="/privacy-policy">
              {lang === "ar" ? "سياسة الخصوصية" : "Privacy policy"} →
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
