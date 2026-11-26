"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/config";
import { HISTORIA_IMAGES, type HistoriaImageKey } from "@/config/historia";
import { prefersReducedMotion, useScrollFrame } from "@/lib/useScrollFrame";
import Logo from "@/components/Logo/Logo";
import styles from "./HistoryScroll.module.scss";

type HistoryScrollProps = {
  lang: Locale;
  t: Dictionary["historia"];
};

type PhotoProps = {
  image: HistoriaImageKey;
  alt: Dictionary["historia"]["images"];
  className?: string;
  sizes: string;
  /** Tono de foto de archivo (sepia) para los primeros capítulos */
  archive?: boolean;
  priority?: boolean;
};

/**
 * Foto enmarcada: la imagen es un poco más ancha que el marco y se corre
 * adentro según dónde esté el marco en la pantalla (data-shift, ver el SCSS).
 */
function Photo({ image, alt, className, sizes, archive, priority }: PhotoProps) {
  return (
    <figure className={[styles.photo, archive && styles.archive, className].filter(Boolean).join(" ")} data-shift>
      {/* next/image con fill pone su tamaño en línea: el corrimiento va en este contenedor */}
      <span className={styles.photoInner}>
        <Image src={HISTORIA_IMAGES[image].src} alt={alt[image]} fill sizes={sizes} priority={priority} loading={priority ? undefined : "eager"} className={styles.photoImage} />
      </span>
    </figure>
  );
}

/** Rombo chico sobre las líneas divisorias */
const Diamond = () => <span className={styles.diamond} aria-hidden="true" />;

/**
 * Nuestra historia: un recorrido horizontal. Se scrollea normal (para abajo)
 * y la pantalla queda fija mientras la tira de paneles se desliza hacia la
 * izquierda. La portada se queda un poco atrás y los paneles le pasan por
 * encima; las fotos se corren dentro de su marco; al final, la foto de la
 * próxima página se abre hasta ocupar toda la pantalla.
 *
 * Variables que escribe el scroll:
 * - en la tira: transform (corrimiento horizontal)
 * - en la sección: --hero (corrimiento de la portada, px)
 * - en cada [data-shift]: --rel (posición del centro respecto del centro de
 *   la pantalla, en anchos de pantalla: 0 = centrado, 1 = una pantalla a la derecha)
 */
export default function HistoryScroll({ lang, t }: HistoryScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Medidas que no cambian con el scroll (se recalculan al cambiar el tamaño)
  const layout = useRef({ distance: 0, shifts: [] as { el: HTMLElement; center: number }[] });

  // El alto de la sección = el recorrido horizontal + una pantalla
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const measure = () => {
      const distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${distance + window.innerHeight}px`;
      const trackLeft = track.getBoundingClientRect().left;
      const shifts = Array.from(track.querySelectorAll<HTMLElement>("[data-shift]")).map((el) => {
        // Sin el corrimiento actual: posición dentro de la tira
        const rect = el.getBoundingClientRect();
        return { el, center: rect.left - trackLeft + rect.width / 2 };
      });
      layout.current = { distance, shifts };
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useScrollFrame(
    sectionRef,
    (section) => {
      const track = trackRef.current;
      if (!track) return;
      const { distance, shifts } = layout.current;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - vh)));
      const x = progress * distance;

      track.style.transform = `translate3d(${(-x).toFixed(1)}px, 0, 0)`;
      // La portada avanza a un 40% de la velocidad (se queda atrás) hasta que la tapan
      section.style.setProperty("--hero", `${(Math.min(x, vw * 1.5) * 0.6).toFixed(1)}px`);

      if (prefersReducedMotion()) return;
      for (const { el, center } of shifts) {
        const rel = (center - x - vw / 2) / vw;
        // Fuera de pantalla no hace falta actualizar
        if (rel > -1.5 && rel < 1.5) el.style.setProperty("--rel", rel.toFixed(4));
      }
    },
    { whileVisible: true, immediate: true },
  );

  const img = t.images;

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="historia-title">
      <div className={styles.sticky}>
        <div ref={trackRef} className={styles.track}>
          {/* 1. Portada */}
          <div className={styles.hero}>
            <Image src={HISTORIA_IMAGES.galeria.src} alt={img.galeria} fill priority sizes="100vw" className={styles.heroImage} />
            <span className={styles.heroShade} aria-hidden="true" />
            <h1 id="historia-title" className={styles.heroTitle}>
              {t.hero.title}
            </h1>
            <p className={styles.hint} aria-hidden="true">
              {t.hero.scroll}
              <span className={styles.hintLine} />
            </p>
          </div>

          {/* 2. El año */}
          <div className={`${styles.panel} ${styles.intro}`}>
            <Logo className={styles.introLogo} />
            <p className={styles.introEyebrow}>{t.intro.eyebrow}</p>
            <p className={styles.year}>{t.intro.year},</p>
            <div className={styles.divider}>
              <Diamond />
            </div>
            <p className={styles.small}>{t.intro.text}</p>
          </div>

          {/* 3. Foto grande de archivo */}
          <div className={`${styles.panel} ${styles.tall}`}>
            <Photo image="piedra" alt={img} archive sizes="(max-width: 768px) 80vw, 40vw" className={styles.tallPhoto} />
          </div>

          {/* 4. Línea de tiempo: fotos y textos alternados arriba y abajo */}
          <div className={`${styles.panel} ${styles.timeline}`}>
            <span className={styles.timelineLine} aria-hidden="true" />
            <ol className={styles.timelineList}>
              {t.timeline.map((text, i) => {
                const image = (["atardecer", "ovejas", "fogon", "desayuno"] as const)[i % 4];
                return (
                  <li key={i} className={`${styles.timelineItem} ${i % 2 ? styles.timelineFlip : ""}`}>
                    <Photo image={image} alt={img} archive sizes="(max-width: 768px) 60vw, 18vw" className={styles.timelinePhoto} />
                    <Diamond />
                    <p className={styles.small}>{text}</p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* 5. Foto, capítulo y otra foto */}
          <div className={`${styles.panel} ${styles.feature}`}>
            <Photo image="casa" alt={img} sizes="(max-width: 768px) 85vw, 34vw" className={styles.featurePhoto} />
            <div className={styles.column}>
              <h2 className={styles.serif}>{t.chapter1.title}</h2>
              <span className={styles.rule} aria-hidden="true" />
              {t.chapter1.paragraphs.map((p, i) => (
                <p key={i} className={styles.small}>
                  {p}
                </p>
              ))}
            </div>
            <Photo image="laguna" alt={img} sizes="(max-width: 768px) 85vw, 30vw" className={styles.featurePhotoAlt} />
          </div>

          {/* 6. Frase grande con foto chica */}
          <div className={`${styles.panel} ${styles.aside}`}>
            <p className={styles.serifLarge}>{t.aside.title}</p>
            <Photo image="libros" alt={img} sizes="(max-width: 768px) 30vw, 9vw" className={styles.asidePhoto} />
            <p className={styles.small}>{t.aside.caption}</p>
          </div>

          {/* 7. Foto y bloque de color */}
          <div className={`${styles.panel} ${styles.split}`}>
            <Photo image="guitarras" alt={img} sizes="(max-width: 768px) 85vw, 32vw" className={styles.splitPhoto} />
            <div className={`${styles.colorBlock} ${styles.clay}`}>
              <h2 className={styles.serif}>{t.quote1.title}</h2>
              <span className={styles.rule} aria-hidden="true" />
              <p className={styles.small}>{t.quote1.text}</p>
            </div>
          </div>

          {/* 8. Dos fotos apiladas y capítulo en columnas */}
          <div className={`${styles.panel} ${styles.stack}`}>
            <div className={styles.stackPhotos}>
              <Photo image="vacas" alt={img} sizes="(max-width: 768px) 85vw, 30vw" className={styles.stackPhoto} />
              <Photo image="juncos" alt={img} sizes="(max-width: 768px) 85vw, 30vw" className={styles.stackPhoto} />
            </div>
            <div className={styles.stackTitle}>
              <h2 className={styles.serif}>{t.chapter2.title}</h2>
              <p className={styles.small}>{t.chapter2.note}</p>
            </div>
            <div className={styles.stackText}>
              {t.chapter2.paragraphs.map((p, i) => (
                <p key={i} className={styles.small}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* 9. Foto y bloque de color oscuro */}
          <div className={`${styles.panel} ${styles.split}`}>
            <Photo image="musica" alt={img} sizes="(max-width: 768px) 85vw, 32vw" className={styles.splitPhoto} />
            <div className={`${styles.colorBlock} ${styles.forest}`}>
              <h2 className={styles.serif}>{t.quote2.title}</h2>
              <span className={styles.rule} aria-hidden="true" />
              {t.quote2.paragraphs.map((p, i) => (
                <p key={i} className={styles.small}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* 10. Capítulo con foto chica y foto vertical */}
          <div className={`${styles.panel} ${styles.chapter}`}>
            <div className={styles.chapterSide}>
              <Photo image="canoa" alt={img} sizes="(max-width: 768px) 40vw, 14vw" className={styles.chapterThumb} />
              <p className={styles.small}>{t.chapter3.note}</p>
            </div>
            <div className={styles.column}>
              <h2 className={styles.serif}>{t.chapter3.title}</h2>
              <span className={styles.rule} aria-hidden="true" />
              {t.chapter3.paragraphs.map((p, i) => (
                <p key={i} className={styles.small}>
                  {p}
                </p>
              ))}
            </div>
            <Photo image="muelle" alt={img} sizes="(max-width: 768px) 80vw, 28vw" className={styles.chapterPhoto} />
          </div>

          {/* 11. Cierre */}
          <div className={`${styles.panel} ${styles.closing}`}>
            <Photo image="mesa" alt={img} sizes="(max-width: 768px) 80vw, 26vw" className={styles.closingPhoto} />
            <div className={styles.closingText}>
              <p className={styles.small}>{t.closing.text}</p>
              <p className={styles.serifLarge}>{t.closing.title}</p>
            </div>
          </div>

          {/* 12. Próxima página: la foto se abre hasta ocupar la pantalla */}
          <Link href={localizePath(lang, "/habitaciones")} className={styles.next} data-shift>
            <span className={styles.nextEyebrow}>{t.next.eyebrow}</span>
            <span className={styles.nextImage} aria-hidden="true">
              <Image src={HISTORIA_IMAGES.suite.src} alt="" fill sizes="100vw" loading="eager" className={styles.photoImage} />
            </span>
            <span className={styles.nextTitle}>{t.next.title}</span>
            <span className={styles.nextHint}>{t.next.hint}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
