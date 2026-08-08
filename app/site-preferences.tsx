"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SiteLanguage = "ar" | "en";
export type SiteTheme = "light" | "dark";

type Preferences = {
  lang: SiteLanguage;
  theme: SiteTheme;
  setLang: (lang: SiteLanguage) => void;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<Preferences | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<SiteLanguage>("ar");
  const [theme, setTheme] = useState<SiteTheme>("light");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const savedLang = localStorage.getItem("smartbill-language");
      const savedTheme = localStorage.getItem("smartbill-theme");
      if (savedLang === "ar" || savedLang === "en") setLang(savedLang);
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("smartbill-language", lang);
    localStorage.setItem("smartbill-theme", theme);
  }, [lang, theme]);

  const value = useMemo(
    () => ({ lang, theme, setLang, toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light")) }),
    [lang, theme],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function useSitePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("useSitePreferences must be used inside PreferencesProvider");
  return value;
}
