import type { Dictionary } from "@/i18n/dictionaries/es";

export type HistoriaImageKey = keyof Dictionary["historia"]["images"];

/**
 * Fotos de la página Nuestra historia (public/images/historia/). El texto
 * alternativo está en historia.images del diccionario.
 */
export const HISTORIA_IMAGES: Record<HistoriaImageKey, { src: string; width: number; height: number }> = {
  hero: { src: "/images/historia/hero.jpg", width: 1459, height: 1078 },
  tranquera: { src: "/images/historia/raices-1-tranquera.jpg", width: 1024, height: 682 },
  lapachos: { src: "/images/historia/raices-3-lapachos.jpg", width: 1024, height: 682 },
  paisano: { src: "/images/historia/campo-2-paisano.jpg", width: 1198, height: 1800 },
  pastizal: { src: "/images/historia/campo-3-pastizal.jpg", width: 1024, height: 682 },
  idea: { src: "/images/historia/idea-salon.jpg", width: 1081, height: 1455 },
  obraViga: { src: "/images/historia/obra-1-viga.jpg", width: 960, height: 1280 },
  obraGaleria: { src: "/images/historia/obra-2-galeria.jpg", width: 1280, height: 960 },
  obraTorreLejos: { src: "/images/historia/obra-3-torre-lejos.jpg", width: 1280, height: 960 },
  telescopio: { src: "/images/historia/libros2.png", width: 1046, height: 696 },
  anteojos: { src: "/images/historia/libros1.png", width: 1208, height: 528 },
  hotel: { src: "/images/historia/hotel.png", width: 868, height: 606 },
  ellos: { src: "/images/historia/ellos.png", width: 780, height: 520 },
  // Foto final, que se abre a pantalla completa
  almenas: { src: "/images/historia/almenas.png", width: 1591, height: 989 },
};
