import Link from "../../../internal-link";
import { guideContent } from "../../../guides/audience-response-systems-content";
import { localizedMetadata, isSiteLanguage, SITE_URL } from "../../../locale";
import { SitePage } from "../../../site-chrome";
import { JsonLd } from "../../../structured-data";

const guidePath = "/guides/audience-response-systems";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isSiteLanguage(locale) ? localizedMetadata(locale, guidePath) : {};
}

export default async function AudienceResponseSystemsGuide({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language = isSiteLanguage(locale) ? locale : "en";
  const isArabic = language === "ar";
  const sections = guideContent[language];
  const title = isArabic ? "أنظمة استجابة الجمهور" : "Audience response systems";
  const description = isArabic
    ? "دليل تمهيدي لفهم أنظمة استجابة الجمهور وتصميم المشاركة والخصوصية وقراءة النتائج."
    : "A practical guide to audience response systems, participation, privacy, and better feedback loops.";
  const articleUrl = `${SITE_URL}/${language}${guidePath}`;

  return <>
    <SitePage className="content-page guide-page">
      <section className="page-hero shell">
        <span className="section-kicker">{isArabic ? "دليل تمهيدي — مسودة قابلة للتحرير" : "Practical guide — editable draft"}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <article className="guide-content shell">
        <p className="guide-note">{isArabic ? "هذه مسودة منظمة للمراجعة والتحرير قبل النشر النهائي." : "This is a structured draft for review and editing before final publication."}</p>
        {sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
        <div className="legal-contact guide-contact"><p>{isArabic ? "هل تريد معرفة كيف يتعامل SmartBill مع الخصوصية والبيانات؟" : "Want to see how SmartBill approaches privacy and data?"}</p><Link className="button primary-button" href="/privacy-policy">{isArabic ? "اقرأ سياسة الخصوصية" : "Read the privacy policy"} →</Link></div>
      </article>
    </SitePage>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      url: articleUrl,
      image: `${SITE_URL}/og?locale=${language}&path=${encodeURIComponent(guidePath)}`,
      datePublished: "2026-08-13",
      dateModified: "2026-08-13",
      author: { "@type": "Organization", name: "SmartBill", url: SITE_URL },
      publisher: { "@type": "Organization", name: "SmartBill", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/app-icon.png` } },
      articleSection: "Guides",
      inLanguage: language,
    }} />
  </>;
}
