"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type SiteLanguage = "ar" | "en";
export type SiteTheme = "light" | "dark";
type SiteThemePreference = SiteTheme | "system";

type Preferences = {
  lang: SiteLanguage;
  theme: SiteTheme;
  setLang: (lang: SiteLanguage) => void;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<Preferences | null>(null);
const LANGUAGE_STORAGE_KEY = "lang";
const LEGACY_LANGUAGE_STORAGE_KEY = "smartbill-language";
const LANGUAGE_COOKIE_NAME = "NEXT_LOCALE";

function languageFrom(value: string | null | undefined): SiteLanguage | null {
  return value === "en" || value === "ar" ? value : null;
}

function languageFromCookie(): SiteLanguage | null {
  if (typeof document === "undefined") return null;

  const value = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${LANGUAGE_COOKIE_NAME}=`))
    ?.slice(`${LANGUAGE_COOKIE_NAME}=`.length);
  return languageFrom(value);
}

function savedLanguage(initialLanguage: SiteLanguage): SiteLanguage {
  if (typeof window === "undefined") return initialLanguage;

  return languageFromCookie()
    ?? languageFrom(localStorage.getItem(LANGUAGE_STORAGE_KEY))
    ?? languageFrom(localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY))
    ?? initialLanguage;
}

function detectedSystemTheme(): SiteTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function savedThemePreference(): SiteThemePreference {
  if (typeof window === "undefined") return "system";

  if (localStorage.getItem("smartbill-theme-mode") !== "manual") return "system";
  const value = localStorage.getItem("smartbill-theme");
  if (value === "light" || value === "dark") return value;
  return "system";
}

export function PreferencesProvider({ children, initialLanguage = "ar" }: { children: React.ReactNode; initialLanguage?: SiteLanguage }) {
  // Keep the first client render identical to SSR. The inline preference script
  // still applies the stored/system theme before paint; these values sync after
  // hydration so localStorage and matchMedia never change SSR markup mid-hydrate.
  const [lang, setLang] = useState<SiteLanguage>(initialLanguage);
  const [themePreference, setThemePreference] = useState<SiteThemePreference>("system");
  const [systemTheme, setSystemTheme] = useState<SiteTheme>("light");
  const [hydrated, setHydrated] = useState(false);
  const theme = themePreference === "system" ? systemTheme : themePreference;

  useEffect(() => {
    setLang(savedLanguage(initialLanguage));
    setThemePreference(savedThemePreference());
    setSystemTheme(detectedSystemTheme());
    setHydrated(true);
  }, [initialLanguage]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [hydrated, lang, theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      if (themePreference === "system") setSystemTheme(event.matches ? "dark" : "light");
    };

    if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", syncSystemTheme);
    else mediaQuery.addListener(syncSystemTheme);
    return () => {
      if (mediaQuery.removeEventListener) mediaQuery.removeEventListener("change", syncSystemTheme);
      else mediaQuery.removeListener(syncSystemTheme);
    };
  }, [themePreference]);

  const updateLanguage = useCallback((nextLanguage: SiteLanguage) => {
    // Persist before React renders so SSR, navigation, and new tabs see the selected locale.
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    document.cookie = `${LANGUAGE_COOKIE_NAME}=${nextLanguage}; path=/; max-age=31536000; samesite=lax`;
    setLang(nextLanguage);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setThemePreference(nextTheme);
    localStorage.setItem("smartbill-theme-mode", "manual");
    localStorage.setItem("smartbill-theme", nextTheme);
  }, [theme]);

  useEffect(() => {
    const syncLanguageAcrossTabs = (event: StorageEvent) => {
      if (event.key !== LANGUAGE_STORAGE_KEY) return;
      if (event.newValue === "ar" || event.newValue === "en") setLang(event.newValue);
    };

    window.addEventListener("storage", syncLanguageAcrossTabs);
    return () => window.removeEventListener("storage", syncLanguageAcrossTabs);
  }, []);

  const value = useMemo(
    () => ({ lang, theme, setLang: updateLanguage, toggleTheme }),
    [lang, theme, toggleTheme, updateLanguage],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function useSitePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("useSitePreferences must be used inside PreferencesProvider");
  return value;
}
