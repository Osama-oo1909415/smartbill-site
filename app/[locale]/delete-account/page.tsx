import DeleteAccountPage from "../../delete-account/page";
import { localizedMetadata, isSiteLanguage } from "../../locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isSiteLanguage(locale) ? localizedMetadata(locale, "/delete-account") : {};
}

export default DeleteAccountPage;
