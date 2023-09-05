import { NextRequest, NextResponse } from "next/server";

// TODO: update locales
const locales = [
  "en-US",
  "fr",
  "ja-JP",
  "es-001",
  "de-DE",
  "pt-BR",
  "en-GB",
  "ko",
  "en-SG",
  "en-AU",
  "it",
  "ar",
];

const defaultLocale = "en-US";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const url = new URL(
      `/${defaultLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url
    );

    return NextResponse.redirect(url);
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
