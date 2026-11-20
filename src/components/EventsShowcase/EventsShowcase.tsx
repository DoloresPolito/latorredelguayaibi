import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Reveal from "@/components/Reveal/Reveal";
import Parallax from "@/components/Parallax/Parallax";
import styles from "./EventsShowcase.module.scss";

type EventsShowcaseProps = {
  lang: Locale;
  t: Dictionary["eventsShowcase"];
  /** Fotos (alt) de la versión anterior del bloque */
  images: Pick<Dictionary["eventsTeaser"], "imageAlt1" | "imageAlt2">;
  /** Propuestas de la página de eventos (se listan con su bajada) */
  services: Dictionary["eventos"]["services"]["items"];
  id?: string;
  /** Clase extra para los títulos (p. ej. Italiana) */
  titleClassName?: string;
};

/**
 * Eventos en el home, con el estilo nuevo: sección verde oscuro, a la
 * izquierda el título, un texto corto, las propuestas en una lista con
 * líneas finas y el botón; a la derecha dos fotos superpuestas que se
 * descubren de abajo hacia arriba y se mueven con el scroll (espejo del
 * resumen de habitaciones).
 */
export default function EventsShowcase({
  lang,
  t,
  images,
  services,
  id = "eventos-home",
  titleClassName,
}: EventsShowcaseProps) {
  const withTitle = (base: string) => [base, titleClassName].filter(Boolean).join(" ");

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.inner} threshold={0.15}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            {t.eyebrow}
          </p>
          <h2 id={`${id}-title`} className={withTitle(styles.title)}>
            {t.title}
          </h2>
          <p className={styles.text}>{t.text}</p>

          <ul className={styles.list}>
            {Object.values(services).map((item) => (
              <li key={item.titleLine2} className={styles.item}>
                <span className={withTitle(styles.itemName)}>
                  {item.titleLine1} {item.titleLine2}
                </span>
                <span className={styles.itemNote}>{item.subtitle}</span>
              </li>
            ))}
          </ul>

          <Link href={localizePath(lang, "/eventos")} className={styles.cta}>
            {t.cta}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>

        <Parallax className={[styles.photo, styles.big].join(" ")}>
          <div className={styles.layer}>
            <Image
              src="/images/eventoshome2.png"
              alt={images.imageAlt2}
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className={styles.image}
            />
          </div>
        </Parallax>

        <Parallax className={[styles.photo, styles.small].join(" ")}>
          <div className={styles.layer}>
            <Image
              src="/images/eventoshome1.png"
              alt={images.imageAlt1}
              fill
              sizes="(min-width: 1024px) 22vw, 55vw"
              className={styles.image}
            />
          </div>
        </Parallax>
      </Reveal>
    </section>
  );
}
