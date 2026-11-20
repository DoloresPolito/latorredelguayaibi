import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Reveal from "@/components/Reveal/Reveal";
import Parallax from "@/components/Parallax/Parallax";
import styles from "./Dining.module.scss";

// 1 y 3: desayuno. 2 y 4: provisorias (de eventos).
// El texto alternativo de cada una está en el diccionario (dining.images).
const IMAGES = [
  "/images/desayuno1.png",
  "/images/eventos/exclusiva.png",
  "/images/desayuno2.png",
  "/images/eventos/reuniones.png",
];

type DiningProps = {
  t: Dictionary["dining"];
  id?: string;
  /** Clase extra para el título (p. ej. Italiana) */
  titleClassName?: string;
};

/**
 * Gastronomía: texto centrado (desayuno incluido; almuerzos y cenas con
 * aviso previo) y abajo cuatro fotos verticales en fila. Como en
 * vesuvio.it, las columnas entran escalonadas (cada una a su ritmo, con
 * --parallax de <Parallax>), se alinean al centro de la pantalla y, por
 * dentro, cada foto se desliza apenas.
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
        <dl className={styles.details}>
          {t.details.map((item) => (
            <div key={item.label} className={styles.detail}>
              <dt className={styles.detailLabel}>{item.label}</dt>
              <dd className={styles.detailValue}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Parallax className={styles.columns}>
        {IMAGES.map((src, i) => (
          <div key={src} className={styles.column} style={{ "--i": i, "--col": i % 2 } as CSSProperties}>
            <div className={styles.layer}>
              <Image
                src={src}
                alt={t.images[i]}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className={styles.image}
              />
            </div>
          </div>
        ))}
      </Parallax>
    </section>
  );
}
