import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";

// Elige el idioma: 1) el que la persona eligió antes (cookie),
// 2) el del navegador, 3) español.
function getLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const accepted = request.headers.get("accept-language") ?? "";
  for (const part of accepted.split(",")) {
    const code = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if (hasLocale(code)) return code;
  }
  return defaultLocale;
}

// - Rutas sin idioma (/ o /reservas) → redirige a /es/... o /en/...
// - Rutas con idioma → recuerda ese idioma en una cookie para la próxima visita
//   (así, si alguien elige EN con el selector, la próxima vez entra en inglés)
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (hasLocale(first)) {
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      response.cookies.set(LOCALE_COOKIE, first, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
    return response;
  }

  request.nextUrl.pathname = `/${getLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Todo menos archivos internos de Next y archivos con extensión (imágenes, íconos…)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
