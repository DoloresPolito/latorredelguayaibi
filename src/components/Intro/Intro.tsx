import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./Intro.module.scss";

type IntroProps = {
  lang: Locale;
  t: Dictionary["intro"];
  id?: string;
};

export default function Intro({ lang, t, id = "experiencia" }: IntroProps) {
  return (
    <section id={id} className={styles.intro} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.text}>
        <span className={styles.rule} aria-hidden="true" />
        <h2 id={`${id}-title`} className={styles.title}>
          {t.titleLine1} <br />
          {t.titleLine2}
        </h2>
        <p className={styles.body}>{t.text}</p>
        <Link href={localizePath(lang, "/la-torre")} className={styles.cta}>
          {t.cta}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </Reveal>

      <Reveal className={styles.gallery}>
        <div className={`${styles.photo} ${styles.tall}`}>
          <div className={styles.inner}>
            <Image
              src="/images/libros.png"
              alt={t.images.libros}
              fill
              sizes="(min-width: 1024px) 30vw, 50vw"
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.photo}>
          <div className={styles.inner}>
            <Image
              src="/images/piedra.png"
              alt={t.images.piedra}
              fill
              sizes="(min-width: 1024px) 28vw, 50vw"
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.photo}>
          <div className={styles.inner}>
            <Image
              src="/images/hotel.png"
              alt={t.images.hotel}
              fill
              sizes="(min-width: 1024px) 28vw, 50vw"
              className={styles.image}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
