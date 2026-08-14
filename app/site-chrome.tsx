"use client";

import Link from "./internal-link";
import { openAnalyticsPreferences } from "./analytics-consent";
import { switchLocalePath } from "./locale";
import { useSitePreferences } from "./site-preferences";

const chromeCopy = {
  ar: {
    nav: [
      ["/#how", "كيف يعمل", false],
      ["/#features", "المزايا", false],
      ["/about", "عن SmartBill", true],
      ["/faq", "الأسئلة الشائعة", true],
      ["/privacy-policy", "الخصوصية", true],
    ],
    cta: "سجّل اهتمامك",
    menu: "القائمة",
    language: "Switch to English",
    themeLight: "تفعيل الوضع الفاتح",
    themeDark: "تفعيل الوضع الداكن",
    footerText: "من الفاتورة إلى تقرير مفهوم، بخطوات أقل وتحكّم أكبر.",
    fullPage: "صفحة مستقلة",
    product: "المنتج",
    company: "المعلومات",
    legal: "الثقة والخصوصية",
    privacyChoices: "اختيارات الخصوصية",
    links: {
      how: "كيف يعمل",
      features: "المزايا",
      waitlist: "قائمة الانتظار",
      about: "عن المشروع",
      contact: "تواصل معنا",
      faq: "الأسئلة الشائعة",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
    },
    status: "SmartBill في مرحلة الوصول المبكر — لا توجد ادعاءات استخدام أو آراء مختلقة.",
  },
  en: {
    nav: [
      ["/#how", "How it works", false],
      ["/#features", "Features", false],
      ["/about", "About SmartBill", true],
      ["/faq", "FAQ", true],
      ["/privacy-policy", "Privacy", true],
    ],
    cta: "Join the waitlist",
    menu: "Menu",
    language: "التبديل إلى العربية",
    themeLight: "Use light mode",
    themeDark: "Use dark mode",
    footerText: "From receipt to useful report, with fewer steps and more control.",
    fullPage: "Full page",
    product: "Product",
    company: "Information",
    legal: "Trust & privacy",
    privacyChoices: "Privacy choices",
    links: {
      how: "How it works",
      features: "Features",
      waitlist: "Waitlist",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
      privacy: "Privacy policy",
      terms: "Terms of use",
    },
    status: "SmartBill is in early access — no invented usage claims or testimonials.",
  },
} as const;

export function SiteHeader() {
  const { lang, theme, setLang, toggleTheme } = useSitePreferences();
  const t = chromeCopy[lang];
  const logoSrc = theme === "dark" ? "/brand/logo-blue.svg" : "/brand/logo-white.svg";
  function switchLanguage() {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
    const nextPath = switchLocalePath(window.location.pathname, next);
    window.location.assign(`${nextPath}${window.location.search}${window.location.hash}`);
  }

  return (
    <header className="site-header">
      <nav className="nav shell" aria-label={lang === "ar" ? "التنقل الرئيسي" : "Primary navigation"}>
        <Link className="brand" href="/" aria-label="SmartBill">
          <img src={logoSrc} alt="" width="46" height="46" />
          <span><b>SmartBill</b><small>{lang === "ar" ? "سمارت بِل" : "Private finance"}</small></span>
        </Link>

        <div className="nav-links">
          {t.nav.map(([href, label, isPage]) => <Link key={href} href={href} className={isPage ? "nav-page-link" : undefined}>{label}{isPage ? <span aria-hidden="true" title={t.fullPage}>↗</span> : null}</Link>)}
        </div>

        <div className="nav-actions">
          <button className="preference-button language-button" type="button" onClick={switchLanguage} aria-label={t.language}>
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <button className="preference-button" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? t.themeLight : t.themeDark} aria-pressed={theme === "dark"}>
            <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
          </button>
          <Link className="nav-cta" href="/#waitlist">{t.cta}</Link>
          <details className="mobile-menu">
            <summary aria-label={t.menu}>☰</summary>
            <div>
              {t.nav.map(([href, label, isPage]) => <Link key={href} href={href} className={isPage ? "nav-page-link" : undefined}>{label}{isPage ? <span aria-hidden="true">↗</span> : null}</Link>)}
              <Link className="nav-page-link" href="/contact">{t.links.contact}<span aria-hidden="true">↗</span></Link>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const { lang, theme } = useSitePreferences();
  const t = chromeCopy[lang];
  const logoSrc = theme === "dark" ? "/brand/logo-blue.svg" : "/brand/logo-white.svg";
  return (
    <footer className="site-footer">
      <div className="footer-grid shell">
        <div className="footer-intro">
          <Link className="brand footer-brand" href="/">
            <img src={logoSrc} alt="" width="42" height="42" />
            <span><b>SmartBill</b><small>{lang === "ar" ? "سمارت بِل" : "Private finance"}</small></span>
          </Link>
          <p>{t.footerText}</p>
        </div>
        <div className="footer-column"><b>{t.product}</b><Link href="/#how">{t.links.how}</Link><Link href="/#features">{t.links.features}</Link><Link href="/#waitlist">{t.links.waitlist}</Link></div>
        <div className="footer-column"><b>{t.company}</b><Link href="/about">{t.links.about}</Link><Link href="/contact">{t.links.contact}</Link><Link href="/faq">{t.links.faq}</Link></div>
        <div className="footer-column"><b>{t.legal}</b><Link href="/privacy-policy">{t.links.privacy}</Link><Link href="/terms">{t.links.terms}</Link></div>
      </div>
      <div className="footer-bottom shell"><p>© 2026 SmartBill</p><div className="footer-bottom-actions"><p>{t.status}</p><button type="button" className="privacy-choices-button" onClick={openAnalyticsPreferences}>{t.privacyChoices}</button></div></div>
    </footer>
  );
}

export function SitePage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <><SiteHeader /><main className={className}>{children}</main><SiteFooter /></>;
}
