export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Cookie donde se recuerda el idioma elegido con el selector ES / EN */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** "/reservas" → "/en/reservas" */
export const localizePath = (lang: Locale, path: string) =>
  `/${lang}${path === "/" ? "" : path}`;

/** "/es/reservas" → "/en/reservas" (mantiene la página actual al cambiar de idioma) */
export const switchLocalePath = (pathname: string, lang: Locale) => {
  const segments = pathname.split("/");
  if (hasLocale(segments[1] ?? "")) segments[1] = lang;
  else segments.splice(1, 0, lang);
  return segments.join("/") || `/${lang}`;
};
