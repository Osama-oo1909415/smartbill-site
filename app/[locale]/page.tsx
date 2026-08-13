import Home from "../page";
import { localizedMetadata, isSiteLanguage } from "../locale";
import { SITE_URL } from "../locale";
import { JsonLd } from "../structured-data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isSiteLanguage(locale) ? localizedMetadata(locale, "/") : {};
}

export default function LocalizedHome() {
  return <><Home /><JsonLd data={{
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SmartBill personal finance",
    serviceType: "Personal finance management",
    description: "Capture receipts, review the details, and understand spending with privacy that stays yours.",
    provider: { "@type": "Organization", name: "SmartBill", url: SITE_URL },
    url: SITE_URL,
    availableLanguage: ["ar", "en"],
  }} /></>;
}
