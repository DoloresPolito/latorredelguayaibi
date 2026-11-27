import type { Dictionary } from "@/i18n/dictionaries/es";

export type HistoriaImageKey = keyof Dictionary["historia"]["images"];

/**
 * Fotos de la página Nuestra historia (public/images/historia/). El texto
 * alternativo está en historia.images del diccionario.
 * Las de provisorias/ son fotos actuales de la casa que ocupan el lugar
 * hasta tener las de cada capítulo (hotel, hoy y cierre).
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
  telescopio: { src: "/images/historia/torre-1-telescopio.jpg", width: 1083, height: 720 },
  anteojos: { src: "/images/historia/torre-3-anteojos.jpg", width: 1396, height: 1800 },
  // Provisorias
  habitacion: { src: "/images/historia/provisorias/habitacion.jpg", width: 2560, height: 1440 },
  desayuno: { src: "/images/historia/provisorias/desayuno.jpg", width: 1440, height: 1800 },
  cierre: { src: "/images/historia/provisorias/cierre.jpg", width: 2560, height: 1920 },
  // Foto de la próxima página (Habitaciones)
  suite: { src: "/images/habitaciones/1.png", width: 1536, height: 1024 },
};
