import { NextRequest, NextResponse } from "next/server";
import { isSiteLanguage, type SiteLanguage } from "./app/locale";

const LOCALE_COOKIE = "NEXT_LOCALE";

function cookieHeaderWithLocale(request: NextRequest, locale: SiteLanguage): string {
  const cookies = request.headers.get("cookie")?.split(/;\s*/).filter((cookie) => cookie && !cookie.startsWith(`${LOCALE_COOKIE}=`)) ?? [];
  cookies.push(`${LOCALE_COOKIE}=${locale}`);
  return cookies.join("; ");
}

function setLocaleCookie(response: NextResponse, locale: SiteLanguage): NextResponse {
  response.cookies.set({ name: LOCALE_COOKIE, value: locale, path: "/", maxAge: 31536000, sameSite: "lax" });
  return response;
}

function cookieLocale(request: NextRequest): SiteLanguage {
  return request.cookies.get(LOCALE_COOKIE)?.value === "en" ? "en" : "ar";
}

function bypass(pathname: string): boolean {
  return pathname === "/og" || pathname.startsWith("/api/") || pathname.startsWith("/admin") || pathname.startsWith("/_") || pathname.includes(".");
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (bypass(pathname)) return NextResponse.next();

  const firstSegment = pathname.split("/")[1] ?? "";
  if (isSiteLanguage(firstSegment)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("cookie", cookieHeaderWithLocale(request, firstSegment));
    return setLocaleCookie(NextResponse.next({ request: { headers: requestHeaders } }), firstSegment);
  }

  const locale = cookieLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return setLocaleCookie(NextResponse.rewrite(url), locale);
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
