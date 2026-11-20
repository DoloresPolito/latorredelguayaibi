"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import styles from "./Reviews.module.scss";

type ReviewsProps = {
  t: Dictionary["reviews"];
  id?: string;
  /** Clase extra para la cita (p. ej. Italiana) */
  quoteClassName?: string;
};

const INTERVAL = 8000; // ms entre reseña y reseña

/**
 * Reseñas de huéspedes: una por vez, grande y centrada, con el nombre y un
 * dato debajo. Pasan solas con un fundido (se frena al pasar el mouse o con
 * el foco adentro, y no avanza sola si se pidió reducir animaciones).
 * Flechas y contador "01 / 03". Todas las reseñas ocupan la misma celda,
 * así la sección no cambia de alto entre una y otra.
 * Toma los colores de <ToneShift> (--tone-fg), o verde sobre crema.
 */
export default function Reviews({ t, id = "resenas", quoteClassName }: ReviewsProps) {
  const total = t.items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback((step: number) => setIndex((i) => (i + step + total) % total), [total]);

  useEffect(() => {
    if (paused || reduced.current || total < 2) return;
    const timer = window.setTimeout(() => go(1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [index, paused, go, total]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      id={id}
      className={styles.section}
      aria-labelledby={`${id}-title`}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.inner}>
        <h2 id={`${id}-title`} className={styles.eyebrow}>
          {t.eyebrow}
        </h2>

        <div className={styles.slides} aria-live={paused ? "polite" : "off"}>
          {t.items.map((item, i) => (
            <figure
              key={i}
              className={styles.slide}
              data-active={i === index}
              aria-hidden={i !== index}
              aria-roledescription="slide"
              aria-label={t.slideLabel.replace("{n}", String(i + 1)).replace("{total}", String(total))}
            >
              <blockquote className={[styles.quote, quoteClassName].filter(Boolean).join(" ")}>
                <p>“{item.quote}”</p>
              </blockquote>
              <figcaption className={styles.author}>
                <span className={styles.name}>{item.name}</span>
                {item.detail && <span className={styles.detail}>{item.detail}</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        {total > 1 && (
          <div className={styles.controls}>
            <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label={t.prev}>
              <ArrowLeft size={18} strokeWidth={1.25} aria-hidden="true" />
            </button>
            <span className={styles.counter} aria-hidden="true">
              {pad(index + 1)} <span className={styles.counterSep}>/</span> {pad(total)}
            </span>
            <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label={t.next}>
              <ArrowRight size={18} strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
