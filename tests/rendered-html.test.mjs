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

test("legacy public paths redirect to the default locale", async () => {
  const response = await render("/");
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "/ar");
});

test("server-renders the English localized landing page", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<html lang="en" dir="ltr"/i);
  assert.match(html, /Clearer spending/);
  assert.match(html, /Join the waitlist/);
  assert.match(html, /smartbill-app-screen-nav-v2-en\.png/);
  assert.match(html, /href="\/en"/);
  assert.match(html, /href="https:\/\/smartbill\.dev\/ar"/);
  assert.match(html, /href="https:\/\/smartbill\.dev\/en"/);
  assert.match(html, /Privacy choices/);
  assert.doesNotMatch(html, /98% accuracy/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("server-renders the Arabic localized landing page and keeps route metadata aligned", async () => {
  const response = await render("/ar");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<html lang="ar" dir="rtl"/i);
  assert.match(html, /مصروفاتك أوضح/);
  assert.match(html, /انضم لقائمة الانتظار/);
  assert.match(html, /smartbill-app-screen-nav-v2\.png/);
  assert.match(html, /property="og:locale" content="ar_SA"/i);
  assert.match(html, /href="https:\/\/smartbill\.dev\/ar"/);
  assert.match(html, /href="https:\/\/smartbill\.dev\/en"/);
});

test("locale-prefixed secondary pages and legacy locale selection work", async () => {
  const englishPage = await render("/en/about");
  assert.equal(englishPage.status, 200);
  const englishHtml = await englishPage.text();
  assert.match(englishHtml, /<html lang="en" dir="ltr"/i);
  assert.match(englishHtml, /About SmartBill/);
  assert.match(englishHtml, /canonical/);

  const legacyPage = await render("/about", "NEXT_LOCALE=en");
  assert.equal(legacyPage.status, 308);
  assert.equal(legacyPage.headers.get("location"), "/en/about");
});

test("waitlist, unsubscribe, privacy, and analytics contracts are present", async () => {
  const [schema, waitlistRoute, unsubscribeRoute, email, privacy, consent, analytics, preferences] = await Promise.all([
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/waitlist/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/unsubscribe/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/waitlist-email.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy-policy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/analytics-consent.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/analytics.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/site-preferences.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(schema, /unsubscribeToken/);
  assert.match(schema, /unsubscribedAt/);
  assert.match(waitlistRoute, /crypto\.randomUUID/);
  assert.match(waitlistRoute, /isNull\(waitlistEntries\.unsubscribedAt\)/);
  assert.match(unsubscribeRoute, /waitlistEntries\.unsubscribeToken/);
  assert.match(email, /unsubscribeUrl/);
  assert.match(email, /copy\.unsubscribe/);
  assert.match(privacy, /only after you grant analytics consent/);
  assert.match(consent, /G-BQFVFK5N91/);
  assert.match(analytics, /ANALYTICS_CONSENT_KEY/);
  assert.match(preferences, /window\.addEventListener\("storage"/);
});

test("contact data handling and site metadata surfaces remain bilingual", async () => {
  const [contact, layout, sitemap, robots] = await Promise.all([
    readFile(new URL("../app/contact/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
  ]);

  assert.match(contact, /internal inbox/);
  assert.match(contact, /صندوق SmartBill الداخلي/);
  assert.match(layout, /<AnalyticsConsent \/>/);
  assert.match(sitemap, /localizedPath/);
  assert.match(robots, /sitemap\.xml/);
});
