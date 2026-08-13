export const ANALYTICS_CONSENT_KEY = "smartbill-analytics-consent";
export const OPEN_ANALYTICS_PREFERENCES_EVENT = "smartbill:open-analytics-preferences";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || window.localStorage.getItem(ANALYTICS_CONSENT_KEY) !== "granted" || !window.gtag) return;
  window.gtag("event", name, parameters);
}
