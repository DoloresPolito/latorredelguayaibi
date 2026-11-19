import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Reveal from "@/components/Reveal/Reveal";
import Parallax from "@/components/Parallax/Parallax";
import PointerDrift from "@/components/PointerDrift/PointerDrift";
import styles from "./EventsTeaser.module.scss";

type EventsTeaserProps = {
  lang: Locale;
  t: Dictionary["eventsTeaser"];
  id?: string;
};

/**
 * Antesala de /eventos en el home: dos fotos verticales sobre el corte entre
 * el verde oscuro (como el manifiesto) y el verde claro, y el texto a la derecha.
 */
export default function EventsTeaser({ lang, t, id = "eventos-home" }: EventsTeaserProps) {
  const photos = [
    { src: "/images/eventoshome1.png", alt: t.imageAlt1 },
    { src: "/images/eventoshome2.png", alt: t.imageAlt2 },
  ];

  return (
    <Reveal className={styles.section} threshold={0.15}>
      <section
        id={id}
        className={styles.inner}
        aria-labelledby={`${id}-title`}
        data-nav-split="0.48" // corte oscuro | claro (ver EventsTeaser.module.scss)
      >
        <div className={styles.photos}>
          {photos.map((photo) => (
            <PointerDrift key={photo.src} className={styles.media}>
              <Parallax className={styles.layer}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 26vw, 50vw"
                  className={styles.image}
                />
              </Parallax>
            </PointerDrift>
          ))}
        </div>

        <Reveal className={styles.panel}>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id={`${id}-title`} className={styles.title}>
            <span className={styles.line}>
              <span>{t.titleLine1}</span>
            </span>
            <span className={styles.line}>
              <span>{t.titleLine2}</span>
            </span>
          </h2>
          <p className={styles.body}>{t.text}</p>
          <Link href={localizePath(lang, "/eventos")} className={styles.cta}>
            {t.cta}
            <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </Reveal>
  );
}
