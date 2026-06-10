import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

function pickLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value as Locale | undefined;
  if (cookie && locales.includes(cookie)) return cookie;

  const accept = req.headers.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const code = part.split(";")[0].trim().toLowerCase().slice(0, 2);
    if (locales.includes(code as Locale)) return code as Locale;
  }
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );

  if (hasLocale) {
    const seg = pathname.split("/")[1] as Locale;
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, seg, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|print|favicon.ico|.*\\..*).*)"],
};
