import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./RoomsTeaser.module.scss";

type RoomsTeaserProps = {
  lang: Locale;
  t: Dictionary["roomsTeaser"];
  id?: string;
};

export default function RoomsTeaser({ lang, t, id = "habitaciones" }: RoomsTeaserProps) {
  return (
    <Reveal className={styles.section}>
      <section id={id} className={styles.inner} aria-labelledby={`${id}-title`}>
        <div className={styles.media}>
          <Image
            src="/images/hab-home.png"
            alt={t.imageAlt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className={styles.image}
          />
        </div>

        <Reveal className={styles.panel}>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id={`${id}-title`} className={styles.title}>
            {t.title}
          </h2>
          <p className={styles.body}>{t.text}</p>
          <Link href={localizePath(lang, "/habitaciones")} className={styles.cta}>
            {t.cta}
            <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </Reveal>
  );
}
