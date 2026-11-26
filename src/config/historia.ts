import type { Dictionary } from "@/i18n/dictionaries/es";

export type HistoriaImageKey = keyof Dictionary["historia"]["images"];

/**
 * Fotos de la página Nuestra historia (provisorias: se reemplazan por las
 * fotos de archivo cuando estén). El texto alternativo está en
 * historia.images del diccionario.
 */
export const HISTORIA_IMAGES: Record<HistoriaImageKey, { src: string; width: number; height: number }> = {
  galeria: { src: "/images/hotel.png", width: 1580, height: 996 },
  piedra: { src: "/images/piedra.png", width: 1591, height: 989 },
  atardecer: { src: "/images/atardecer.png", width: 1078, height: 1086 },
  ovejas: { src: "/images/h3.png", width: 2172, height: 724 },
  fogon: { src: "/images/eventos/exclusiva.png", width: 554, height: 413 },
  desayuno: { src: "/images/desayuno1.png", width: 1115, height: 1410 },
  casa: { src: "/images/hero.png", width: 1562, height: 1007 },
  laguna: { src: "/images/laguna.jpg", width: 4032, height: 3024 },
  libros: { src: "/images/libros.png", width: 1746, height: 2079 },
  guitarras: { src: "/images/eventos/tradiciones.png", width: 1672, height: 941 },
  vacas: { src: "/images/h1.png", width: 2172, height: 724 },
  juncos: { src: "/images/h2.png", width: 2172, height: 724 },
  musica: { src: "/images/eventos/musica.png", width: 937, height: 699 },
  muelle: { src: "/images/eventoshome2.png", width: 949, height: 1275 },
  canoa: { src: "/images/reservas.jpg", width: 3024, height: 4032 },
  mesa: { src: "/images/eventoshome1.png", width: 956, height: 1275 },
  suite: { src: "/images/habitaciones/1.png", width: 1536, height: 1024 },
};
