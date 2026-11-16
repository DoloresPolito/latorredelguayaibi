import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./Hero.module.scss";

type HeroProps = {
  /** Foto principal. Mientras no esté, se muestra un fondo provisorio. */
  image?: { src: string; alt: string };
};

export default function Hero({ image }: HeroProps) {
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
        {/* Marca apilada (decorativa: el título real es el h1) */}
        <div className={styles.brand} aria-hidden="true">
          <span className={styles.mark} />
          <span className={styles.name}>
            La Torre
            <br />
            del Guayaibí
          </span>
          <span className={styles.motto}>Un mundo aparte</span>
          <span className={styles.brandRule} />
        </div>

        <div className={styles.main}>
          <h1 className={styles.title}>
            Un mundo <br />
            aparte.
          </h1>
          <p className={styles.tagline}>
            Un refugio singular en el corazón del campo correntino.
          </p>
          <Link href="/la-torre" className={styles.cta}>
            Descubrir la torre
            <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
