import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { ROOMS } from "@/config/rooms";
import Reveal from "@/components/Reveal/Reveal";
import Parallax from "@/components/Parallax/Parallax";
import styles from "./RoomsShowcase.module.scss";

type RoomsShowcaseProps = {
  lang: Locale;
  t: Dictionary["roomsShowcase"];
  id?: string;
  /** Clase extra para los títulos (p. ej. Italiana) */
  titleClassName?: string;
};

// Fotos del resumen: la suite de piedra grande y la azul petróleo chica
const BIG = ROOMS[0];
const SMALL = ROOMS[2];

/**
 * Resumen de habitaciones en el home: dos fotos superpuestas (una grande y
 * una chica que se mueven a distinto ritmo con el scroll y se descubren de
 * abajo hacia arriba al entrar), el título, un texto corto y, debajo y
 * sobre la derecha, el botón a /habitaciones.
 */
export default function RoomsShowcase({ lang, t, id = "habitaciones", titleClassName }: RoomsShowcaseProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.inner} threshold={0.15}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            {t.eyebrow}
          </p>
          <h2 id={`${id}-title`} className={[styles.title, titleClassName].filter(Boolean).join(" ")}>
            {t.title}
          </h2>
          <p className={styles.text}>{t.text}</p>
          <Link href={localizePath(lang, "/habitaciones")} className={styles.cta}>
            {t.cta}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>

        <Parallax className={[styles.photo, styles.big].join(" ")}>
          <div className={styles.layer}>
            <Image
              src={BIG.image}
              alt={t.bigImageAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={styles.image}
            />
          </div>
        </Parallax>

        <Parallax className={[styles.photo, styles.small].join(" ")}>
          <div className={styles.layer}>
            <Image
              src={SMALL.image}
              alt={t.smallImageAlt}
              fill
              sizes="(min-width: 1024px) 24vw, 55vw"
              className={styles.image}
            />
          </div>
        </Parallax>

      </Reveal>
    </section>
  );
}
