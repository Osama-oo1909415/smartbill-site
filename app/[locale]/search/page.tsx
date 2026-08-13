import { localizedMetadata, localizedPath, isSiteLanguage, metadataForPath, type SiteLanguage } from "../../locale";

type SearchEntry = { path: string; keywords: string[] };

const searchEntries: SearchEntry[] = [
  { path: "/", keywords: ["smartbill", "receipt", "spending", "privacy", "ocr", "مصاريف", "خصوصية", "فاتورة"] },
  { path: "/about", keywords: ["about", "local first", "control", "وضوح", "تحكم"] },
  { path: "/faq", keywords: ["faq", "questions", "sync", "assistant", "أسئلة", "مزامنة"] },
  { path: "/privacy-policy", keywords: ["privacy", "data", "retention", "حماية", "بيانات"] },
  { path: "/terms", keywords: ["terms", "use", "حدود", "استخدام"] },
  { path: "/contact", keywords: ["contact", "support", "data request", "تواصل", "دعم"] },
];

function entryCopy(entry: SearchEntry, language: SiteLanguage) {
  const copy = metadataForPath(entry.path, language);
  return { ...entry, title: copy.title, description: copy.description };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSiteLanguage(locale)) return {};
  return { ...localizedMetadata(locale, "/search"), robots: { index: false, follow: true } };
}

export default async function SearchPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> }) {
  const { locale: rawLocale } = await params;
  const language: SiteLanguage = isSiteLanguage(rawLocale) ? rawLocale : "en";
  const query = ((await searchParams).q ?? "").trim();
  const normalizedQuery = query.toLocaleLowerCase();
  const results = searchEntries.map((entry) => entryCopy(entry, language)).filter((entry) => {
    if (!normalizedQuery) return true;
    return [entry.title, entry.description, ...entry.keywords].join(" ").toLocaleLowerCase().includes(normalizedQuery);
  });
  const isArabic = language === "ar";

  return <main className="search-page content-page"><div className="shell"><span className="section-kicker">{isArabic ? "بحث الموقع" : "Site search"}</span><h1>{isArabic ? "ابحث في SmartBill" : "Search SmartBill"}</h1><p className="page-intro">{isArabic ? "اعثر على إجابات حول الخصوصية، قراءة الفواتير، المراجعة، والمزامنة." : "Find answers about privacy, receipt reading, review, and sync."}</p><form className="search-form" action={localizedPath("/search", language)} method="get"><label htmlFor="site-search">{isArabic ? "كلمة البحث" : "Search term"}</label><div><input id="site-search" name="q" type="search" defaultValue={query} placeholder={isArabic ? "مثال: الخصوصية" : "Example: privacy"} /><button className="button primary-button" type="submit">{isArabic ? "بحث" : "Search"}</button></div></form><section aria-live="polite" className="search-results"><h2>{query ? (isArabic ? `نتائج البحث عن: ${query}` : `Results for: ${query}`) : (isArabic ? "صفحات SmartBill" : "SmartBill pages")}</h2>{results.length ? <ul>{results.map((entry) => <li key={entry.path}><a href={localizedPath(entry.path, language)}><strong>{entry.title}</strong><span>{entry.description}</span></a></li>)}</ul> : <p>{isArabic ? "لم نعثر على نتائج. جرّب كلمة أخرى." : "No results found. Try another term."}</p>}</section></div></main>;
}
