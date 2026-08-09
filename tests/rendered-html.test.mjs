import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/", cookie) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html", ...(cookie ? { cookie } : {}) } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the bilingual SmartBill landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ar" dir="rtl"/i);
  assert.match(html, /SmartBill/);
  assert.match(html, /من الفاتورة إلى فهم إنفاقك/);
  assert.match(html, /<title>SmartBill \| مصروفاتك تحت control<\/title>/i);
  assert.match(html, /<meta[^>]*name="description"[^>]*content="مصروفاتك تحت control، وفواتيرك مشفرة على جهازك بذكاء وخصوصية\. SmartBill: Private, on-device expense tracking and instant receipt scanning\."/i);
  assert.match(html, /<link rel="icon" href="\/favicon\.ico"[^>]*>/i);
  assert.match(html, /<link rel="icon"[^>]*href="\/icon-32\.png"[^>]*sizes="32x32"/i);
  assert.match(html, /<link rel="icon"[^>]*href="\/icon\.png"[^>]*sizes="192x192"/i);
  assert.match(html, /<link rel="apple-touch-icon"[^>]*href="\/apple-touch-icon\.png"/i);
  assert.match(html, /<meta[^>]*property="og:title"[^>]*content="SmartBill \| مصروفاتك تحت control"/i);
  assert.match(html, /<meta[^>]*property="og:description"[^>]*content="مصروفاتك تحت control، وفواتيرك مشفرة على جهازك بذكاء وخصوصية\. SmartBill: Private, on-device expense tracking and instant receipt scanning\."/i);
  assert.match(html, /<meta[^>]*property="og:image"[^>]*content="https:\/\/smartbill\.dev\/og-image\.png"/i);
  assert.match(html, /property="og:image:width" content="1200"/i);
  assert.match(html, /property="og:image:height" content="630"/i);
  assert.match(html, /<meta[^>]*name="twitter:card"[^>]*content="summary_large_image"/i);
  assert.match(html, /<meta[^>]*name="twitter:title"[^>]*content="SmartBill \| مصروفاتك تحت control"/i);
  assert.match(html, /<meta[^>]*name="twitter:description"[^>]*content="مصروفاتك تحت control، وفواتيرك مشفرة على جهازك بذكاء وخصوصية\. SmartBill: Private, on-device expense tracking and instant receipt scanning\."/i);
  assert.match(html, /<meta[^>]*name="twitter:image"[^>]*content="https:\/\/smartbill\.dev\/og-image\.png"/i);
  assert.match(html, /property="og:image:secure_url"[^>]*content="https:\/\/smartbill\.dev\/og-image\.png"/i);
  assert.match(html, /<link rel="manifest" href="\/manifest\.webmanifest"/i);
  assert.match(html, /class="nav-page-link"/);
  assert.match(html, /id="waitlist"/);
  assert.match(html, /smartbill-app-screen-nav-v2\.png/);
  assert.match(html, /type="email"/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("uses NEXT_LOCALE to render the document language on the server", async () => {
  const response = await render("/about", "NEXT_LOCALE=en");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<html lang="en" dir="ltr"/i);
});

test("keeps trust, responsive, and real-count behavior in source", async () => {
  const [page, chrome, about, waitlistRoute, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-chrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/waitlist/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<WaitlistForm \/>/);
  assert.match(page, /smartbill-app-screen-nav-v2\.png/);
  assert.match(page, /smartbill-app-screen-nav-v2-en\.png/);
  assert.match(page, /id="features"/);
  assert.match(page, /id="privacy"/);
  assert.match(chrome, /nav-page-link/);
  assert.match(about, /github\.com\/Osama-oo1909415/);
  assert.match(about, /linkedin\.com\/in\/osama-osman-950aa3194\//);
  assert.doesNotMatch(about, /linkedin\.com\/in\/osama-yousif-eisa-osman/);
  assert.match(waitlistRoute, /export async function GET/);
  assert.match(waitlistRoute, /count\(\)/);
  assert.match(css, /@media\(max-width:360px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(layout, /og-image\.png/);
  assert.match(layout, /googletagmanager\.com\/gtag\/js\?id=/);
  assert.match(layout, /G-BQFVFK5N91/);
  assert.match(layout, /gtag\('config'/);
  assert.match(layout, /localStorage\.getItem\('lang'\)/);
  assert.match(layout, /cookies\(\)\)\.get\("NEXT_LOCALE"\)/);
  assert.match(layout, /<html lang=\{locale\} dir=\{locale === "ar" \? "rtl" : "ltr"\}/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("persists and synchronizes the selected site language", async () => {
  const preferences = await readFile(new URL("../app/site-preferences.tsx", import.meta.url), "utf8");

  assert.match(preferences, /const LANGUAGE_STORAGE_KEY = "lang"/);
  assert.match(preferences, /localStorage\.setItem\(LANGUAGE_STORAGE_KEY, nextLanguage\)/);
  assert.match(preferences, /document\.cookie = `\$\{LANGUAGE_COOKIE_NAME\}=\$\{nextLanguage\}; path=\/; max-age=31536000/);
  assert.match(preferences, /function languageFromCookie\(\)/);
  assert.match(preferences, /localStorage\.getItem\(LANGUAGE_STORAGE_KEY\)/);
  assert.match(preferences, /window\.addEventListener\("storage", syncLanguageAcrossTabs\)/);
  assert.match(preferences, /document\.documentElement\.dir = lang === "ar" \? "rtl" : "ltr"/);
  assert.match(preferences, /document\.documentElement\.lang = lang/);
});

test("uses an Arabic or English app screen to match the website and email locale", async () => {
  const [page, waitlistEmail] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/waitlist-email.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /lang === "ar" \? "\/smartbill-app-screen-nav-v2\.png" : "\/smartbill-app-screen-nav-v2-en\.png"/);
  assert.match(waitlistEmail, /const APP_SCREEN_URLS = \{/);
  assert.match(waitlistEmail, /en: `\$\{SITE_URL\}\/smartbill-app-screen-nav-v2-en\.png`/);
  assert.match(waitlistEmail, /const appScreenUrl = APP_SCREEN_URLS\[language\]/);
});
