import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import {
  NEXT_LOCALE,
  monthInSeconds,
  RU_AVAILABLE_COOKIE,
} from "./config/cookies";
import { DEFAULT_LOCALE, LOCALES, routing } from "./i18n/routing";
import { isRuAvailable } from "./lib/isRuAvailable";

const intlMiddleware = createMiddleware(routing);

function withLocaleCookie(
  response: NextResponse,
  locale: string,
  shouldSet: boolean
) {
  try {
    if (shouldSet) {
      response.cookies.set(NEXT_LOCALE, locale, {
        path: "/",
        maxAge: monthInSeconds,
        sameSite: "lax",
      });
    }
  } catch {
    /* ignore */
  }
  return response;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathParts = pathname.split("/");
  const firstSegment = pathParts[1] || "";
  const hasLocale = LOCALES.includes(firstSegment);

  const cookieLocale = request.cookies.get(NEXT_LOCALE)?.value;
  const resolvedLocale = hasLocale
    ? firstSegment
    : cookieLocale && LOCALES.includes(cookieLocale)
      ? cookieLocale
      : DEFAULT_LOCALE;

  const cfCountry =
    request.headers.get("cf-ipcountry") || request.headers.get("CF-IPCountry");
  const acceptLang = request.headers.get("accept-language") || "";
  const currentRuCookie = request.cookies.get(RU_AVAILABLE_COOKIE)?.value;

  const ruShouldBeAvailable = isRuAvailable(
    cfCountry,
    acceptLang,
    currentRuCookie || "",
    firstSegment
  );

  const shouldSetRuCookie =
    (ruShouldBeAvailable ? "1" : "0") !== currentRuCookie;

  const response = intlMiddleware(request);
  if (shouldSetRuCookie) {
    response.cookies.set(RU_AVAILABLE_COOKIE, ruShouldBeAvailable ? "1" : "0", {
      path: "/",
      maxAge: monthInSeconds,
      sameSite: "lax",
    });
  }
  return withLocaleCookie(response, resolvedLocale, hasLocale);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
