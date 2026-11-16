import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./Hero.module.scss";

type HeroImage = { src: string; width: number; height: number };

type HeroProps = {
  /** Foto principal (horizontal). Mientras no esté, se muestra un fondo provisorio. */
  image?: HeroImage & { alt: string };
  /** Foto opcional para celulares (vertical). Si no está, se usa la principal recortada. */
  mobileImage?: HeroImage;
};

/** Foto distinta para desktop y mobile ("art direction") con <picture> */
function ArtDirectedImage({ image, mobileImage }: Required<HeroProps>) {
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

export default function Hero({ image, mobileImage }: HeroProps) {
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
