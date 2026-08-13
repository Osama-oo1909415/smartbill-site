"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SitePage } from "../../site-chrome";
import { useSitePreferences } from "../../site-preferences";

export default function UnsubscribePage() {
  const { lang } = useSitePreferences();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = lang === "ar"
    ? { kicker: "إدارة الرسائل", title: "هل تريد إيقاف تحديثات SmartBill؟", body: "يمكنك إلغاء الاشتراك من رسائل الوصول المبكر. لن يؤثر ذلك على استخدام الموقع أو طلبات التواصل الأخرى.", action: "إلغاء الاشتراك", loading: "جارٍ الإلغاء…", success: "تم إلغاء اشتراكك من تحديثات SmartBill.", error: "تعذر إلغاء الاشتراك. استخدم الرابط الموجود في آخر رسالة أو تواصل معنا." }
    : { kicker: "Message preferences", title: "Stop SmartBill updates?", body: "You can unsubscribe from early-access messages. This will not affect the site or other contact requests.", action: "Unsubscribe", loading: "Unsubscribing…", success: "You have been unsubscribed from SmartBill updates.", error: "We could not unsubscribe you. Use the link from the latest message or contact us." };

  async function unsubscribe() {
    setStatus("loading");
    try {
      const response = await fetch("/api/unsubscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token }) });
      if (!response.ok) throw new Error("unsubscribe_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return <SitePage className="content-page"><section className="page-hero shell"><span className="section-kicker">{t.kicker}</span><h1>{t.title}</h1><p>{t.body}</p></section><section className="unsubscribe-panel shell"><div className="status-card"><p>{status === "success" ? t.success : status === "error" ? t.error : t.body}</p>{status !== "success" ? <button className="button primary-button" type="button" onClick={unsubscribe} disabled={!token || status === "loading"} aria-busy={status === "loading"}>{status === "loading" ? t.loading : t.action}</button> : null}</div></section></SitePage>;
}
