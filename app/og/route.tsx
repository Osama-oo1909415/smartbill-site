import { ImageResponse } from "next/og";
import { isSiteLanguage, metadataForPath, type SiteLanguage } from "../locale";

export const runtime = "edge";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const language: SiteLanguage = isSiteLanguage(url.searchParams.get("locale") ?? "") ? url.searchParams.get("locale") as SiteLanguage : "en";
  const path = url.searchParams.get("path") || "/";
  const copy = metadataForPath(path.replace(/^\/(ar|en)(?=\/|$)/, "") || "/", language);
  const title = copy.title.replace(/^\s*SmartBill\s*\|\s*/i, "").replace(/\s*\|\s*SmartBill\s*$/i, "");
  const direction = language === "ar" ? "rtl" : "ltr";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 76px", background: "linear-gradient(135deg, #0b1220 0%, #12305f 100%)", color: "#ffffff", fontFamily: "Arial, sans-serif", direction }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}>
        <div style={{ width: 62, height: 62, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 18, background: "#2563d9", color: "#7ef0b0", fontSize: 34 }}>S</div>
        <span>SmartBill</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1010 }}>
        <div style={{ display: "flex", color: "#7ef0b0", fontSize: 20, fontWeight: 700 }}>{language === "ar" ? "وضوح أكثر. خصوصية لك." : "Clearer spending. Privacy that stays yours."}</div>
        <div style={{ display: "flex", fontSize: 58, lineHeight: 1.14, fontWeight: 700 }}>{title}</div>
        <div style={{ display: "flex", color: "#b9c7dc", fontSize: 24, lineHeight: 1.35 }}>{copy.description}</div>
      </div>
      <div style={{ display: "flex", color: "#9fb2d0", fontSize: 18 }}>{url.origin}</div>
    </div>,
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400" } },
  );
}
