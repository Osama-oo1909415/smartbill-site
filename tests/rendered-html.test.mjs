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

function metadata(html, pattern) {
  const match = html.match(pattern);
  return match?.[1] ?? "";
}

function jsonLdTypes(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1])["@type"])
    .flatMap((type) => Array.isArray(type) ? type : [type]);
}

test("public pages are reachable directly without locale redirect chains", async () => {
  for (const path of ["/", "/ar", "/en", "/about", "/en/about", "/faq", "/privacy-policy", "/terms", "/contact", "/unsubscribe", "/en/guides/audience-response-systems"]) {
    const response = await render(path, path === "/about" ? "NEXT_LOCALE=en" : undefined);
    assert.equal(response.status, 200, path);
  }
});

test("raw SSR metadata is unique and route-specific", async () => {
  const pages = ["/en", "/en/faq", "/en/guides/audience-response-systems"];
  const snapshots = [];
  for (const path of pages) {
    const response = await render(path);
    const html = await response.text();
    assert.match(html, /<meta charSet="utf-8"\/>/i);
    assert.match(html, /<meta name="viewport"/i);
    assert.match(html, /<html lang="en" dir="ltr"/i);
    assert.match(html, /<title>[^<]+<\/title>/i);
    assert.match(html, /<meta name="description" content="[^"]+"/i);
    assert.match(html, /<link rel="canonical" href="https:\/\/smartbill\.dev\/en[^" ]*"/i);
    assert.match(html, /property="og:title"/i);
    assert.match(html, /property="og:description"/i);
    assert.match(html, /property="og:url"/i);
    assert.match(html, /property="og:image"/i);
    assert.match(html, /name="twitter:card" content="summary_large_image"/i);
    assert.ok(jsonLdTypes(html).length > 0, `${path} JSON-LD`);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${path} H1 count`);
    snapshots.push([metadata(html, /<title>(.*?)<\/title>/i), metadata(html, /<meta name="description" content="([^"]*)"/i)]);
  }
  assert.equal(new Set(snapshots.map(([title]) => title)).size, pages.length);
  assert.equal(new Set(snapshots.map(([, description]) => description)).size, pages.length);
});

test("home, FAQ, and guide JSON-LD expose the correct Schema.org types", async () => {
  const home = jsonLdTypes(await (await render("/en")).text());
  const faq = jsonLdTypes(await (await render("/en/faq")).text());
  const guide = jsonLdTypes(await (await render("/en/guides/audience-response-systems")).text());
  assert.ok(home.includes("Organization"));
  assert.ok(home.includes("WebSite"));
  assert.ok(home.includes("Service"));
  assert.ok(faq.includes("FAQPage"));
  assert.ok(guide.includes("Article"));
});

test("SEO metadata, AI endpoints, sitemap, robots, and OG image are present", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const locale = await readFile(new URL("../app/locale.ts", import.meta.url), "utf8");
  const guideSource = await readFile(new URL("../app/guides/audience-response-systems-content.ts", import.meta.url), "utf8");
  assert.match(layout, /GOOGLE_SITE_VERIFICATION/);
  assert.match(layout, /metadataBase: new URL\(SITE_URL\)/);
  assert.match(locale, /NEXT_PUBLIC_SITE_URL/);
  assert.doesNotMatch(locale, /https:\/\/smartbill\.dev/);
  assert.ok((guideSource.match(/\b[A-Za-z]+(?:'[A-Za-z]+)?\b/g) ?? []).length > 800);

  const endpointAssertions = [
    ["/sitemap.xml", "application/xml"],
    ["/robots.txt", "text/plain"],
    ["/llms.txt", "text/markdown"],
    ["/llms-full.txt", "text/markdown"],
  ];
  for (const [path, contentType] of endpointAssertions) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", new RegExp(contentType));
  }

  const llms = await (await render("/llms.txt")).text();
  assert.equal((llms.match(/^# /gm) ?? []).length, 1);
  assert.match(llms, /^> /m);
  assert.match(llms, /^## /m);
  assert.match(llms, /audience-response-systems/);

  const full = await (await render("/llms-full.txt")).text();
  assert.match(full, /Privacy model/);
  assert.match(full, /audience-response-systems/);

  const robots = await (await render("/robots.txt")).text();
  for (const agent of ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "GPTBot", "ClaudeBot", "Google-Extended"]) assert.match(robots, new RegExp(agent));
  assert.match(robots, /Disallow: \/api\//);
  assert.match(robots, /Disallow: \/admin\//);

  const sitemap = await (await render("/sitemap.xml")).text();
  assert.match(sitemap, /https:\/\/smartbill\.dev\/en\/guides\/audience-response-systems/);
  assert.match(sitemap, /<lastmod>/);
  assert.match(sitemap, /<changefreq>/);
  assert.match(sitemap, /<priority>/);

  const og = await render("/og?locale=en&path=%2Fen");
  assert.equal(og.status, 200);
  assert.match(og.headers.get("content-type") ?? "", /image\/png/);
});

test("existing waitlist, privacy, analytics, and motion contracts remain intact", async () => {
  const [schema, waitlistRoute, unsubscribeRoute, email, privacy, consent, analytics, preferences, styles] = await Promise.all([
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/waitlist/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/unsubscribe/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/waitlist-email.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy-policy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/analytics-consent.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/analytics.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/site-preferences.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(schema, /unsubscribeToken/);
  assert.match(schema, /unsubscribedAt/);
  assert.match(waitlistRoute, /crypto\.randomUUID/);
  assert.match(waitlistRoute, /isNull\(waitlistEntries\.unsubscribedAt\)/);
  assert.match(unsubscribeRoute, /waitlistEntries\.unsubscribeToken/);
  assert.match(email, /unsubscribeUrl/);
  assert.match(privacy, /only after you grant analytics consent/);
  assert.match(consent, /G-BQFVFK5N91/);
  assert.match(analytics, /ANALYTICS_CONSENT_KEY/);
  assert.match(preferences, /prefers-color-scheme/);
  assert.match(styles, /animation-timeline: view\(\)/);
  assert.match(styles, /offset-path:ellipse/);
  assert.match(styles, /prefers-reduced-motion:reduce/);
});
