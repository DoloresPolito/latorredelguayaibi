import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import styles from "./Hero.module.scss";

type HeroProps = {
  /** Textos del hero: la frase, el botón y los indicadores de scroll */
  t: Pick<Dictionary["hero"], "tagline" | "cta" | "scroll" | "next">;
  /**
   * Foto de fondo (horizontal; en mobile se recorta). focusY: qué parte del
   * alto queda a la vista cuando se recorta ("100%" = abajo; por defecto, centro).
   */
  image: { src: string; width: number; height: number; alt: string; focusY?: string };
  /** Título en dos líneas (el nombre del hotel, o el de la sección) */
  name: { line1: string; line2: string };
  /** Ubicación, chica arriba del título (p. ej. "Mercedes, Corrientes") */
  location?: string;
  /** id de la sección siguiente, para la flecha de scroll */
  nextSectionId: string;
  /** Destino del botón: ancla ("#seccion", baja con scroll suave) o link externo */
  ctaHref: string;
};

/**
 * Hero a pantalla completa: la foto oscurecida con un velo parejo y, encima,
 * centrados y en crema, la ubicación, el título en Italiana, la frase y un
 * botón con borde fino. Abajo, "Scroll" y la flecha a la sección siguiente.
 * En el home, el título es el de la animación de bienvenida (<Opening>).
 */
export default function Hero({ t, image, name, location, nextSectionId, ctaHref }: HeroProps) {
  const external = ctaHref.startsWith("http");

  return (
    <section className={styles.hero} data-nav-theme="dark" data-nav-glass>
      <div className={styles.media}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className={styles.image}
          style={image.focusY ? ({ "--focus-y": image.focusY } as CSSProperties) : undefined}
        />
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <div className={styles.heading}>
          {location && <p className={styles.location}>{location}</p>}
          <h1 className={styles.title}>
            {/* El span interno es la máscara de la animación de bienvenida */}
            <span className={styles.line}>
              <span className={styles.lineInner}>{name.line1}</span>
            </span>{" "}
            <span className={styles.line}>
              <span className={styles.lineInner}>{name.line2}</span>
            </span>
          </h1>
        </div>
        <div className={styles.actions}>
          <p className={styles.tagline}>{t.tagline}</p>
          <a
            href={ctaHref}
            className={styles.cta}
            // Baja a una sección de la página: la flecha apunta hacia abajo (SCSS)
            data-scroll={ctaHref.startsWith("#") || undefined}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {t.cta}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className={styles.scroll} aria-hidden="true">
        <span className={styles.scrollLine} />
        {t.scroll}
      </div>

      <a href={`#${nextSectionId}`} className={styles.down} aria-label={t.next}>
        <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </section>
  );
}
