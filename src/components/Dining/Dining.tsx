import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Reveal from "@/components/Reveal/Reveal";
import Parallax from "@/components/Parallax/Parallax";
import styles from "./Dining.module.scss";

// Siete fotos verticales del campo (1:3). El texto alternativo de cada una
// está en el diccionario (dining.images), en el mismo orden.
const IMAGES = [0, 1, 2, 3, 4, 5, 6].map((n) => `/images/home/${n}.png`);

// En celulares, en lugar de las siete columnas: cuatro fotos apaisadas
// (3:1), una debajo de la otra. Textos alternativos en dining.mobileImages.
const MOBILE_IMAGES = [1, 2, 3, 4].map((n) => `/images/h${n}.png`);

type DiningProps = {
  t: Dictionary["dining"];
  id?: string;
  /** Clase extra para el título (p. ej. Italiana) */
  titleClassName?: string;
};

/**
 * Gastronomía: texto centrado y abajo siete fotos finas y largas en fila,
 * a todo el ancho. Como en
 * vesuvio.it, las columnas entran escalonadas (cada una a su ritmo, con
 * --parallax de <Parallax>), se alinean al centro de la pantalla y, por
 * dentro, cada foto se desliza apenas.
 * En celulares, cuatro fotos apaisadas apiladas que aparecen una tras
 * otra al entrar (solo la imagen se desliza apenas por dentro).
 */
export default function Dining({ t, id = "gastronomia", titleClassName }: DiningProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.intro} threshold={0.2}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h2 id={`${id}-title`} className={[styles.title, titleClassName].filter(Boolean).join(" ")}>
          {t.title}
        </h2>
        <p className={styles.text}>{t.text}</p>
      </Reveal>

      <Parallax cssFallback className={styles.columns}>
        {IMAGES.map((src, i) => (
          <div key={src} className={styles.column} style={{ "--i": i } as CSSProperties}>
            <div className={styles.layer}>
              <Image
                src={src}
                alt={t.images[i]}
                fill
                sizes="15vw"
                className={styles.image}
              />
            </div>
          </div>
        ))}
      </Parallax>

      <Reveal className={styles.rows} threshold={0.15}>
        <Parallax cssFallback className={styles.rowsInner}>
          {MOBILE_IMAGES.map((src, i) => (
            <div key={src} className={styles.row}>
              <div className={styles.layer}>
                <Image src={src} alt={t.mobileImages[i]} fill sizes="100vw" className={styles.image} />
              </div>
            </div>
          ))}
        </Parallax>
      </Reveal>
    </section>
  );
}
