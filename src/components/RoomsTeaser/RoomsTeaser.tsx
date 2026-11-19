import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
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
  /**
   * "default": título, párrafo y botón (versión original).
   * "quote": una frase centrada en varias líneas y un link subrayado (home nuevo).
   */
  variant?: "default" | "quote";
};

export default function RoomsTeaser({
  lang,
  t,
  id = "habitaciones",
  variant = "default",
}: RoomsTeaserProps) {
  const isQuote = variant === "quote";
  const lines = isQuote ? t.quoteLines : [t.title];

  return (
    <Reveal className={styles.section} threshold={0.15}>
      <section
        id={id}
        className={[styles.inner, isQuote && styles.quote].filter(Boolean).join(" ")}
        aria-labelledby={`${id}-title`}
      >
        {/* Parallax afuera: --parallax llega al recorte del marco y a la capa */}
        <Parallax className={styles.media}>
          <PointerDrift className={styles.drift}>
            <div className={styles.layer}>
              <Image
                src="/images/hab-home.png"
                alt={t.imageAlt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={styles.image}
              />
            </div>
          </PointerDrift>
        </Parallax>

        <Reveal className={styles.panel}>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id={`${id}-title`} className={styles.title}>
            {lines.map((line, i) => (
              <span key={line} className={styles.line} style={{ "--i": i } as CSSProperties}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
          {!isQuote && <p className={styles.body}>{t.text}</p>}
          <Link href={localizePath(lang, "/habitaciones")} className={styles.cta}>
            {isQuote ? t.quoteCta : t.cta}
            <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </Reveal>
  );
}
