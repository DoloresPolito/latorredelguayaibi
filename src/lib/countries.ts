export type Country = { code: string; name: string; dial: string };

// Lista acotada: países más probables primero. "Otro" permite cualquier caso.
export const COUNTRIES: Country[] = [
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "UY", name: "Uruguay", dial: "+598" },
  { code: "BR", name: "Brasil", dial: "+55" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "PY", name: "Paraguay", dial: "+595" },
  { code: "BO", name: "Bolivia", dial: "+591" },
  { code: "PE", name: "Perú", dial: "+51" },
  { code: "CO", name: "Colombia", dial: "+57" },
  { code: "MX", name: "México", dial: "+52" },
  { code: "US", name: "Estados Unidos", dial: "+1" },
  { code: "CA", name: "Canadá", dial: "+1" },
  { code: "ES", name: "España", dial: "+34" },
  { code: "IT", name: "Italia", dial: "+39" },
  { code: "FR", name: "Francia", dial: "+33" },
  { code: "DE", name: "Alemania", dial: "+49" },
  { code: "GB", name: "Reino Unido", dial: "+44" },
  { code: "NL", name: "Países Bajos", dial: "+31" },
  { code: "CH", name: "Suiza", dial: "+41" },
  { code: "OT", name: "Otro", dial: "" },
];

// Códigos de área únicos para el selector de teléfono
export const DIAL_CODES = Array.from(
  new Set(COUNTRIES.map((c) => c.dial).filter(Boolean)),
);
