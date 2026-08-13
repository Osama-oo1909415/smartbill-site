import { notFound } from "next/navigation";
import { localizedMetadata, isSiteLanguage } from "../locale";
import { PreferencesProvider } from "../site-preferences";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSiteLanguage(locale)) return {};
  return localizedMetadata(locale, "/");
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSiteLanguage(locale)) notFound();
  return <PreferencesProvider initialLanguage={locale}>{children}</PreferencesProvider>;
}
