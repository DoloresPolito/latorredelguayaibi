import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import styles from "./Hero.module.scss";

type HeroProps = {
  /** Foto principal. Mientras no esté, se muestra un fondo provisorio. */
  image?: { src: string; alt: string };
  /** id de la sección siguiente, para el botón de scroll */
  nextSectionId?: string;
};

export default function Hero({ image, nextSectionId = "experiencia" }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} aria-hidden="true" />
        )}
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <p className={styles.kicker}>La Torre del Guayaibí</p>
        <h1 className={styles.title}>
          Un mundo <br />
          aparte.
        </h1>
        <p className={styles.tagline}>
          Un refugio singular en el corazón del campo correntino.
        </p>
        <span className={styles.rule} aria-hidden="true" />
        <Link href="/la-torre" className={styles.cta}>
          Descubrir la torre
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.scroll} aria-hidden="true">
        <span className={styles.scrollLine} />
        Scroll
      </div>

      <a href={`#${nextSectionId}`} className={styles.down} aria-label="Ir a la siguiente sección">
        <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </section>
  );
}
