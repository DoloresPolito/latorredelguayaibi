import type { Dictionary } from "@/i18n/dictionaries/es";

export type EntornoImageKey = keyof Dictionary["entorno"]["images"];

/** Fotos de la página Entorno. El texto alternativo está en entorno.images del diccionario. */
export const ENTORNO_IMAGES: Record<EntornoImageKey, { src: string; width: number; height: number }> = {
  atardecer: { src: "/images/atardecer.png", width: 1078, height: 1086 },
  vacas: { src: "/images/h1.png", width: 2172, height: 724 },
  juncos: { src: "/images/h2.png", width: 2172, height: 724 },
  ovejas: { src: "/images/h3.png", width: 2172, height: 724 },
  espejo: { src: "/images/h4.png", width: 2172, height: 724 },
  casaPileta: { src: "/images/hero.png", width: 1562, height: 1007 },
  torre: { src: "/images/nuevo-hero.png", width: 1672, height: 941 },
  piedra: { src: "/images/piedra.png", width: 1591, height: 989 },
  esteros: { src: "/images/consultas1.jpg", width: 2240, height: 2986 },
  laguna: { src: "/images/laguna.jpg", width: 4032, height: 3024 },
  canoa: { src: "/images/reservas.jpg", width: 3024, height: 4032 },
  nandu: { src: "/images/home/0.png", width: 724, height: 2172 },
  arbol: { src: "/images/home/1.png", width: 724, height: 2172 },
  hereford: { src: "/images/home/4.png", width: 724, height: 2172 },
  reflejo: { src: "/images/home/5.png", width: 724, height: 2172 },
  aves: { src: "/images/home/6.png", width: 724, height: 2172 },
  galeria: { src: "/images/agrandar.png", width: 1899, height: 1197 },
  eucaliptos: { src: "/images/imagen.png", width: 1689, height: 1267 },
  fogon: { src: "/images/eventos/eventos.png", width: 1672, height: 941 },
  noche: { src: "/images/eventos/noche.png", width: 1536, height: 1024 },
};
