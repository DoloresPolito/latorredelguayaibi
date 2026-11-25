import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { ENTORNO_IMAGES, type EntornoImageKey } from "@/config/entorno";
import { emphasis } from "@/lib/emphasis";
import Parallax from "@/components/Parallax/Parallax";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./EnvironmentColumns.module.scss";

type EnvironmentColumnsProps = {
  t: Dictionary["entorno"]["columns"];
  images: Dictionary["entorno"]["images"];
  id?: string;
  /** Clase extra para el título (p. ej. Italiana) */
  titleClassName?: string;
};

/**
 * Columnas de fotos. shift: cuánto se desliza la columna con el scroll
 * (% de su alto; positivo = sube, negativo = baja), así cada una va a su
 * propio ritmo. ratio: proporción de cada recorte.
 * En mobile se ven solo las dos primeras.
 */
const COLUMNS: { shift: number; items: { key: EntornoImageKey; ratio: string }[] }[] = [
  {
    shift: 10,
    items: [
      { key: "aves", ratio: "3 / 4" },
      { key: "torre", ratio: "4 / 5" },
      { key: "espejo", ratio: "1" },
      { key: "galeria", ratio: "3 / 4" },
    ],
  },
  {
    shift: -16,
    items: [
      { key: "eucaliptos", ratio: "4 / 5" },
      { key: "reflejo", ratio: "2 / 3" },
      { key: "vacas", ratio: "1" },
      { key: "noche", ratio: "4 / 5" },
    ],
  },
  {
    shift: 14,
    items: [
      { key: "juncos", ratio: "1" },
      { key: "canoa", ratio: "3 / 4" },
      { key: "piedra", ratio: "4 / 5" },
      { key: "nandu", ratio: "2 / 3" },
    ],
  },
  {
    shift: -8,
    items: [
      { key: "fogon", ratio: "3 / 4" },
      { key: "arbol", ratio: "2 / 3" },
      { key: "ovejas", ratio: "1" },
      { key: "esteros", ratio: "4 / 5" },
    ],
  },
];

/**
 * Galería del entorno: columnas de fotos sobre el verde oscuro que se
 * deslizan con el scroll a distintas velocidades (unas suben, otras bajan),
 * con el título fijo arriba mientras pasan.
 */
export default function EnvironmentColumns({ t, images, id = "paisajes", titleClassName }: EnvironmentColumnsProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`} data-nav-theme="dark">
      <Reveal className={styles.header} threshold={0.4}>
        <p className={styles.eyebrow}>
          <span className={styles.rule} aria-hidden="true" />
          {t.eyebrow}
        </p>
        <h2 id={`${id}-title`} className={[styles.title, titleClassName].filter(Boolean).join(" ")}>
          {emphasis(t.title)}
        </h2>
      </Reveal>

      <Parallax className={styles.grid} cssFallback>
        {COLUMNS.map(({ shift, items }, c) => (
          <ul key={c} className={styles.column} style={{ "--shift": `${shift}%` } as CSSProperties}>
            {items.map(({ key, ratio }) => {
              const image = ENTORNO_IMAGES[key];
              return (
                <li key={key} className={styles.item} style={{ "--ratio": ratio } as CSSProperties}>
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={images[key]}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={styles.image}
                  />
                </li>
              );
            })}
          </ul>
        ))}
      </Parallax>
    </section>
  );
}
