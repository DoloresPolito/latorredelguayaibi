import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Reveal from "@/components/Reveal/Reveal";
import Parallax from "@/components/Parallax/Parallax";
import PointerDrift from "@/components/PointerDrift/PointerDrift";
import styles from "./Intro.module.scss";

type IntroProps = {
  lang: Locale;
  t: Dictionary["intro"];
  id?: string;
};

export default function Intro({ lang, t, id = "experiencia" }: IntroProps) {
  const photos = [
    { key: "libros", src: "/images/libros.png", sizes: "(min-width: 1024px) 30vw, 50vw", className: styles.tall },
    { key: "piedra", src: "/images/piedra.png", sizes: "(min-width: 1024px) 28vw, 50vw", className: styles.second },
    { key: "hotel", src: "/images/hotel.png", sizes: "(min-width: 1024px) 28vw, 50vw", className: styles.third },
  ] as const;

  return (
    <section id={id} className={styles.intro} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.text}>
        <span className={styles.rule} aria-hidden="true" />
        <h2 id={`${id}-title`} className={styles.title}>
          <span className={styles.line}>
            <span>{t.titleLine1}</span>
          </span>{" "}
          <span className={styles.line}>
            <span>{t.titleLine2}</span>
          </span>
        </h2>
        <p className={styles.body}>{t.text}</p>
        <Link href={localizePath(lang, "/la-torre")} className={styles.cta}>
          {t.cta}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </Reveal>

      {/* Las fotos se mueven apenas con el scroll y siguen al mouse */}
      <PointerDrift className={styles.galleryWrap}>
        <Reveal className={styles.gallery} threshold={0.2}>
          {photos.map((photo) => (
            <div key={photo.key} className={`${styles.photo} ${photo.className}`}>
              <Parallax className={styles.inner}>
                <Image
                  src={photo.src}
                  alt={t.images[photo.key]}
                  fill
                  sizes={photo.sizes}
                  className={styles.image}
                />
              </Parallax>
            </div>
          ))}
        </Reveal>
      </PointerDrift>
    </section>
  );
}
