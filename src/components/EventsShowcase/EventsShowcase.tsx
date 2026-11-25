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
  id?: string;
};

/**
 * Eventos en el home: espejo del resumen de habitaciones sobre fondo verde.
 * A la izquierda el título, un texto corto y el botón a /eventos; a la
 * derecha la foto de la picada, que se descubre de abajo hacia arriba al
 * entrar y se mueve con el scroll.
 */
export default function EventsShowcase({
  lang,
  t,
  id = "eventos-home",
}: EventsShowcaseProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.inner} threshold={0.15}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h2 id={`${id}-title`} className={styles.title}>
            {t.title}
          </h2>
          <p className={styles.text}>{t.text}</p>
          <Link href={localizePath(lang, "/eventos")} className={styles.cta}>
            {t.cta}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>

        <Parallax cssFallback className={styles.photo}>
          <div className={styles.layer}>
            <Image
              src="/images/eventoshome1.png"
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={styles.image}
            />
          </div>
        </Parallax>
      </Reveal>
    </section>
  );
}
