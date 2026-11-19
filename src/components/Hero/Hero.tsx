import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import styles from "./Hero.module.scss";

type HeroImage = { src: string; width: number; height: number };

type HeroProps = {
  lang: Locale;
  t: Dictionary["hero"];
  /** Foto principal (horizontal). Mientras no esté, se muestra un fondo provisorio. */
  image?: HeroImage & { alt: string };
  /** Foto opcional para celulares (vertical). Si no está, se usa la principal recortada. */
  mobileImage?: HeroImage;
  /** id de la sección siguiente, para el botón de scroll */
  nextSectionId?: string;
  /**
   * "name": el título es el nombre del hotel (sin el antetítulo).
   * Por defecto: antetítulo con el nombre + "Un mundo aparte."
   */
  variant?: "tagline" | "name";
  /** Nombre en dos líneas, para la variante "name" */
  name?: { line1: string; line2: string };
  /** Clase extra para el título (p. ej. otra tipografía) */
  titleClassName?: string;
  /** Destino del botón: ruta interna ("/la-torre") o ancla ("#seccion") */
  ctaHref?: string;
  /** "light": textos claros también en desktop (fotos oscuras a la izquierda) */
  tone?: "dark" | "light";
};

/** Foto distinta para desktop y mobile ("art direction") con <picture> */
function ArtDirectedImage({
  image,
  mobileImage,
}: Required<Pick<HeroProps, "image" | "mobileImage">>) {
  const common = { alt: image.alt, sizes: "100vw", priority: true };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, ...image });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, ...mobileImage });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- el alt viene en rest */}
      <img {...rest} className={`${styles.image} ${styles.fill}`} />
    </picture>
  );
}

export default function Hero({
  lang,
  t,
  image,
  mobileImage,
  nextSectionId = "experiencia",
  variant = "tagline",
  name,
  titleClassName,
  ctaHref = "/la-torre",
  tone = "dark",
}: HeroProps) {
  const isName = variant === "name" && name;
  const line1 = isName ? name.line1 : t.titleLine1;
  const line2 = isName ? name.line2 : t.titleLine2;

  return (
    <section
      className={`${styles.hero} ${tone === "light" ? styles.light : ""}`}
      data-nav-theme={tone === "light" ? "dark" : undefined}
    >
      <div className={styles.media}>
        {image && mobileImage ? (
          <ArtDirectedImage image={image} mobileImage={mobileImage} />
        ) : image ? (
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
        {/* En mobile/tablet: título arriba (sobre el cielo) y acciones abajo (sobre la pileta) */}
        <div className={styles.heading}>
          {!isName && <p className={styles.kicker}>{t.kicker}</p>}
          <h1 className={[styles.title, isName && styles.nameTitle, titleClassName].filter(Boolean).join(" ")}>
            <span className={styles.line}>{line1}</span>{" "}
            <span className={styles.line}>{line2}</span>
          </h1>
        </div>
        <div className={styles.actions}>
          <p className={styles.tagline}>{t.tagline}</p>
          <span className={styles.rule} aria-hidden="true" />
          {ctaHref.startsWith("/") ? (
            <Link href={localizePath(lang, ctaHref)} className={styles.cta}>
              {t.cta}
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ) : (
            <a
              href={ctaHref}
              className={styles.cta}
              {...(ctaHref.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {t.cta}
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          )}
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
