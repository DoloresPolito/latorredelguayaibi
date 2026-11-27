import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { photoAlt, type EntornoPhoto } from "@/config/entorno";
import { emphasis } from "@/lib/emphasis";
import Parallax from "@/components/Parallax/Parallax";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./EnvironmentColumns.module.scss";

type EnvironmentColumnsProps = {
  t: Dictionary["entorno"]["columns"];
  images: Record<string, string>;
  fallbackAlt: string;
  photos: EntornoPhoto[];
  id?: string;
};

/**
 * Cuánto sube de más cada columna en todo el recorrido (% de su alto). Todas
 * arrancan a la misma altura y cada una va a su propio ritmo.
 */
const SHIFTS = [4, 12, 7, 15];

/** Reparte las fotos en n columnas en orden: de izquierda a derecha, fila por fila. */
function split(photos: EntornoPhoto[], n: number) {
  const columns: EntornoPhoto[][] = Array.from({ length: n }, () => []);
  photos.forEach((photo, i) => columns[i % n].push(photo));
  return columns;
}

/** Recorte según la forma de la foto, sin estirar de más las muy anchas o altas. */
const ratioOf = (p: EntornoPhoto) => Math.min(1.6, Math.max(0.6, p.width / p.height)).toFixed(3);

/**
 * Galería del entorno: columnas de fotos que arrancan alineadas y se
 * deslizan con el scroll a distintas velocidades,
 * con el título fijo arriba mientras pasan. Cuatro columnas en desktop y
 * dos en mobile: se arman las dos versiones y el CSS muestra la que va.
 */
export default function EnvironmentColumns({ t, images, fallbackAlt, photos, id = "paisajes" }: EnvironmentColumnsProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.header} threshold={0.4}>
        <p className={styles.eyebrow}>
          <span className={styles.rule} aria-hidden="true" />
          {t.eyebrow}
        </p>
        <h2 id={`${id}-title`} className={styles.title}>
          {emphasis(t.title)}
        </h2>
      </Reveal>

      {([4, 2] as const).map((n) => (
        <Parallax key={n} className={`${styles.grid} ${n === 4 ? styles.desktop : styles.mobile}`} cssFallback>
          {split(photos, n).map((items, c) => (
            <ul key={c} className={styles.column} style={{ "--shift": `${SHIFTS[c]}%` } as CSSProperties}>
              {items.map((image) => (
                <li key={image.src} className={styles.item} style={{ "--ratio": ratioOf(image) } as CSSProperties}>
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={photoAlt(images, fallbackAlt, image)}
                    sizes={n === 4 ? "25vw" : "50vw"}
                    className={styles.image}
                  />
                </li>
              ))}
            </ul>
          ))}
        </Parallax>
      ))}
    </section>
  );
}
