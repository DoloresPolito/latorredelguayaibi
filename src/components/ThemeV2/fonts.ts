import { Inter_Tight, Italiana } from "next/font/google";
import localFont from "next/font/local";

// Tipografías del diseño nuevo (home y reservas).

// Textos, botones y menú — parecida a Lay Grotesk, con todos los acentos
export const sansTest = Inter_Tight({
  variable: "--font-sans-test",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], // 500: la í del título del hero
  style: ["normal", "italic"],
});

// Prueba: título del hero del home en Italiana (Google Fonts, solo 400).
// (Antes se probó Poiret One.)
export const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

// Lay Grotesk (archivos TRIAL, "Personal Use Only": solo para probar en local;
// para publicar hace falta la licencia web). La versión trial no trae acentos
// ni ñ: esos caracteres salen de Inter Tight, por eso adjustFontFallback: false
// (si no, Next.js los tomaría de Arial).
export const layGrotesk = localFont({
  src: [
    { path: "../../fonts/lay-grotesk/laygrotesk-trial-regular.otf", weight: "400" },
    { path: "../../fonts/lay-grotesk/laygrotesk-trial-medium.otf", weight: "500" },
    { path: "../../fonts/lay-grotesk/laygrotesk-trial-semibold.otf", weight: "600" },
    { path: "../../fonts/lay-grotesk/laygrotesk-trial-bold.otf", weight: "700" },
  ],
  variable: "--font-lay",
  adjustFontFallback: false,
});
