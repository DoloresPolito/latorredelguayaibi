import { Inter_Tight, Italiana } from "next/font/google";

// Tipografías de la web. Las carga layout.tsx en <html> como variables CSS
// (--font-sans, --font-italiana); en Sass se usan con $font-ui / $font-title.

// Textos, botones, menú y títulos sans
export const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

// Títulos (solo tiene peso 400; ver el mixin title-italiana)
export const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});
