import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
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
  assert.match(html, /class="nav-page-link"/);
  assert.match(html, /id="waitlist"/);
  assert.match(html, /type="email"/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
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
  assert.match(page, /id="features"/);
  assert.match(page, /id="privacy"/);
  assert.match(chrome, /nav-page-link/);
  assert.match(about, /github\.com\/Osama-oo1909415/);
  assert.match(waitlistRoute, /export async function GET/);
  assert.match(waitlistRoute, /count\(\)/);
  assert.match(css, /@media\(max-width:360px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(layout, /og-bilingual\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
