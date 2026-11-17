import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Reveal from "@/components/Reveal/Reveal";
import Parallax from "@/components/Parallax/Parallax";
import PointerDrift from "@/components/PointerDrift/PointerDrift";
import styles from "./RoomsTeaser.module.scss";

type RoomsTeaserProps = {
  lang: Locale;
  t: Dictionary["roomsTeaser"];
  id?: string;
};

export default function RoomsTeaser({ lang, t, id = "habitaciones" }: RoomsTeaserProps) {
  return (
    <Reveal className={styles.section} threshold={0.15}>
      <section id={id} className={styles.inner} aria-labelledby={`${id}-title`}>
        <PointerDrift className={styles.media}>
          <Parallax className={styles.layer}>
            <Image
              src="/images/hab-home.png"
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={styles.image}
            />
          </Parallax>
        </PointerDrift>

        <Reveal className={styles.panel}>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id={`${id}-title`} className={styles.title}>
            <span className={styles.line}>
              <span>{t.title}</span>
            </span>
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
