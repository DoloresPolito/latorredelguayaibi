import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import styles from "./Hero.module.scss";

type HeroImage = { src: string; width: number; height: number };

type HeroProps = {
  /** Foto principal (horizontal). Mientras no esté, se muestra un fondo provisorio. */
  image?: HeroImage & { alt: string };
  /** Foto opcional para celulares (vertical). Si no está, se usa la principal recortada. */
  mobileImage?: HeroImage;
  /** id de la sección siguiente, para el botón de scroll */
  nextSectionId?: string;
};

/** Foto distinta para desktop y mobile ("art direction") con <picture> */
function ArtDirectedImage({ image, mobileImage }: Required<Pick<HeroProps, "image" | "mobileImage">>) {
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

export default function Hero({ image, mobileImage, nextSectionId = "experiencia" }: HeroProps) {
  return (
    <section className={styles.hero}>
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
          <p className={styles.kicker}>La Torre del Guayaibí</p>
          <h1 className={styles.title}>
            Un mundo <br />
            aparte.
          </h1>
        </div>
        <div className={styles.actions}>
          <p className={styles.tagline}>
            Un refugio singular en el corazón del campo correntino.
          </p>
          <span className={styles.rule} aria-hidden="true" />
          <Link href="/la-torre" className={styles.cta}>
            Descubrir la torre
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
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
