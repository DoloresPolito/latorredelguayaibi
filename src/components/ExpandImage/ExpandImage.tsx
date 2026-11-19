import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import ScrollStage from "./ScrollStage";
import styles from "./ExpandImage.module.scss";

type ExpandImageProps = {
  lang: Locale;
  t: Dictionary["expandImage"];
  id?: string;
};

/**
 * Foto que entra chica (con márgenes y esquinas redondeadas) y se agranda
 * hasta ocupar toda la pantalla. Ahí queda fija un tramo del scroll y
 * aparecen encima, en orden: la línea y el título chico, el párrafo (se
 * enciende palabra por palabra) y el botón. Todo atado al scroll
 * (ver ScrollStage).
 */
export default function ExpandImage({ lang, t, id = "la-torre-foto" }: ExpandImageProps) {
  const words = t.text.split(/\s+/);

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`} data-nav-theme="dark">
      <ScrollStage className={styles.track}>
        <div className={styles.sticky}>
          <div className={styles.frame}>
            <Image
              src="/images/agrandar.png"
              alt={t.imageAlt}
              fill
              sizes="100vw"
              className={styles.image}
            />
            <span className={styles.shade} aria-hidden="true" />

            <div className={styles.content}>
              <div className={styles.heading}>
                <span className={styles.rule} aria-hidden="true" />
                <h2 id={`${id}-title`} className={styles.title}>
                  {t.title}
                </h2>
              </div>

              <p className={styles.text} style={{ "--n": words.length } as CSSProperties}>
                <span className={styles.srOnly}>{t.text}</span>
                <span aria-hidden="true">
                  {words.map((word, i) => (
                    <span key={i} className={styles.word} style={{ "--i": i } as CSSProperties}>
                      {word}{" "}
                    </span>
                  ))}
                </span>
              </p>

              <Link href={localizePath(lang, "/la-torre")} className={styles.cta}>
                {t.cta}
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollStage>
    </section>
  );
}
