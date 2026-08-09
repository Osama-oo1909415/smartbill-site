"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type SiteLanguage = "ar" | "en";
export type SiteTheme = "light" | "dark";

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

function savedTheme(): SiteTheme {
  if (typeof window === "undefined") return "light";

  const value = localStorage.getItem("smartbill-theme");
  if (value === "light" || value === "dark") return value;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function PreferencesProvider({ children, initialLanguage = "ar" }: { children: React.ReactNode; initialLanguage?: SiteLanguage }) {
  const [lang, setLang] = useState<SiteLanguage>(() => savedLanguage(initialLanguage));
  const [theme, setTheme] = useState<SiteTheme>(savedTheme);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("smartbill-theme", theme);
  }, [lang, theme]);

  const updateLanguage = useCallback((nextLanguage: SiteLanguage) => {
    // Persist before React renders so SSR, navigation, and new tabs see the selected locale.
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    document.cookie = `${LANGUAGE_COOKIE_NAME}=${nextLanguage}; path=/; max-age=31536000; samesite=lax`;
    setLang(nextLanguage);
  }, []);

  useEffect(() => {
    const syncLanguageAcrossTabs = (event: StorageEvent) => {
      if (event.key !== LANGUAGE_STORAGE_KEY) return;
      if (event.newValue === "ar" || event.newValue === "en") setLang(event.newValue);
    };

    window.addEventListener("storage", syncLanguageAcrossTabs);
    return () => window.removeEventListener("storage", syncLanguageAcrossTabs);
  }, []);

  const value = useMemo(
    () => ({ lang, theme, setLang: updateLanguage, toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light")) }),
    [lang, theme, updateLanguage],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function useSitePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("useSitePreferences must be used inside PreferencesProvider");
  return value;
}
