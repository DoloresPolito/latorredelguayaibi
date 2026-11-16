import type { Locale } from "@/i18n/config";

export type Country = { code: string; dial: string };

// Lista acotada: países más probables primero. "OT" = Otro.
// Los nombres se generan en el idioma de la página con Intl.DisplayNames.
export const COUNTRIES: Country[] = [
  { code: "AR", dial: "+54" },
  { code: "UY", dial: "+598" },
  { code: "BR", dial: "+55" },
  { code: "CL", dial: "+56" },
  { code: "PY", dial: "+595" },
  { code: "BO", dial: "+591" },
  { code: "PE", dial: "+51" },
  { code: "CO", dial: "+57" },
  { code: "MX", dial: "+52" },
  { code: "US", dial: "+1" },
  { code: "CA", dial: "+1" },
  { code: "ES", dial: "+34" },
  { code: "IT", dial: "+39" },
  { code: "FR", dial: "+33" },
  { code: "DE", dial: "+49" },
  { code: "GB", dial: "+44" },
  { code: "NL", dial: "+31" },
  { code: "CH", dial: "+41" },
  { code: "OT", dial: "" },
];

// Códigos de área únicos para el selector de teléfono
export const DIAL_CODES = Array.from(new Set(COUNTRIES.map((c) => c.dial).filter(Boolean)));

/** Nombre del país en el idioma indicado ("AR" → "Argentina") */
export function countryName(code: string, lang: Locale, otherLabel: string) {
  if (code === "OT") return otherLabel;
  return new Intl.DisplayNames([lang], { type: "region" }).of(code) ?? code;
}
