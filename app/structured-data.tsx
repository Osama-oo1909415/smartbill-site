export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export const organizationSchema = (siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SmartBill",
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-blue.svg`,
  description: "Privacy-first personal finance software for clearer spending.",
});

export const websiteSchema = (siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SmartBill",
  url: siteUrl,
  publisher: { "@type": "Organization", name: "SmartBill", url: siteUrl },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/en/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});
