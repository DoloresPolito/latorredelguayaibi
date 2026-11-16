import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/es";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("./dictionaries/es").then((m) => m.es),
  en: () => import("./dictionaries/en").then((m) => m.en),
};

/** Idioma de la ruta actual (/es/... o /en/...). Solo en Server Components. */
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}

/** Diccionario del idioma de la ruta actual. Solo en Server Components. */
export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}

export type { Dictionary };
