"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { HISTORIA_IMAGES, type HistoriaImageKey } from "@/config/historia";
import { prefersReducedMotion, useScrollFrame } from "@/lib/useScrollFrame";
import Logo from "@/components/Logo/Logo";
import styles from "./HistoryScroll.module.scss";

type HistoryScrollProps = {
  t: Dictionary["historia"];
};

type PhotoProps = {
  image: HistoriaImageKey;
  alt: Dictionary["historia"]["images"];
  className?: string;
  sizes: string;
  priority?: boolean;
  /**
   * Foto con su forma real (clase .free): alto en % del panel y alineación.
   * Sin esto, el marco lo define la clase del lugar donde va.
   */
  free?: { height: number; align?: "start" | "center" | "end" };
};

/**
 * Foto enmarcada: la imagen es un poco más ancha que el marco y se corre
 * adentro según dónde esté el marco en la pantalla (data-shift, ver el SCSS).
 */
function Photo({ image, alt, className, sizes, priority, free }: PhotoProps) {
  const { width, height } = HISTORIA_IMAGES[image];
  const style = free
    ? ({ "--ratio": `${width} / ${height}`, "--h": `${free.height}%`, alignSelf: free.align ?? "center" } as CSSProperties)
    : undefined;
  return (
    <figure
      className={[styles.photo, free && styles.free, className].filter(Boolean).join(" ")}
      style={style}
      data-shift
    >
      {/* next/image con fill pone su tamaño en línea: el corrimiento va en este contenedor */}
      <span className={styles.photoInner}>
        <Image src={HISTORIA_IMAGES[image].src} alt={alt[image]} fill sizes={sizes} priority={priority} loading={priority ? undefined : "eager"} className={styles.photoImage} />
      </span>
    </figure>
  );
}

type ChapterProps = { t: { eyebrow: string; title: string; text: string } };

/** Etiqueta, título, línea y texto de un capítulo */
function ChapterText({ t }: ChapterProps) {
  return (
    <>
      <p className={styles.eyebrow}>{t.eyebrow}</p>
      <h2 className={styles.serif}>{t.title}</h2>
      <span className={styles.rule} aria-hidden="true" />
      <p className={styles.small}>{t.text}</p>
    </>
  );
}

/** Capítulo en columna angosta, centrado en el alto del panel */
const Chapter = ({ t }: ChapterProps) => (
  <div className={styles.column}>
    <ChapterText t={t} />
  </div>
);

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
 * - en cada [data-shift]: data-seen la primera vez que entra bien en pantalla
 *   (dispara el zoom suave de la foto, ver .photo en el SCSS)
 */
export default function HistoryScroll({ t }: HistoryScrollProps) {
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
        // Ya asomó un cuarto de pantalla: se ve una vez y queda
        if (rel < 0.75 && !el.hasAttribute("data-seen")) el.setAttribute("data-seen", "");
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
            <Image src={HISTORIA_IMAGES.hero.src} alt={img.hero} fill priority sizes="100vw" className={styles.heroImage} />
            <span className={styles.heroShade} aria-hidden="true" />
            <div className={styles.heroText}>
              <h1 id="historia-title" className={styles.heroTitle}>
                {t.hero.title}
              </h1>
              <p className={styles.heroLead}>{t.hero.lead}</p>
            </div>
            <p className={styles.hint} aria-hidden="true">
              {t.hero.scroll}
              <span className={styles.hintLine} />
            </p>
          </div>

          {/* 2. Las raíces */}
          <div className={`${styles.panel} ${styles.intro}`}>
            <Logo className={styles.introLogo} />
            <p className={styles.introEyebrow}>{t.raices.eyebrow}</p>
            <h2 className={styles.introTitle}>{t.raices.title}</h2>
            <div className={styles.divider}>
              <Diamond />
            </div>
            <p className={styles.small}>{t.raices.text}</p>
          </div>

          {/* 3. Fotos de las raíces, cada una con su forma */}
          <div className={`${styles.panel} ${styles.gallery}`}>
            <Photo image="tranquera" alt={img} free={{ height: 72, align: "start" }} sizes="(max-width: 768px) 90vw, 45vw" />
            <Photo image="lapachos" alt={img} free={{ height: 50, align: "end" }} sizes="(max-width: 768px) 70vw, 32vw" />
          </div>

          {/* 4. La estancia */}
          <div className={`${styles.panel} ${styles.feature}`}>
            <Chapter t={t.estancia} />
            <Photo image="paisano" alt={img} sizes="(max-width: 768px) 85vw, 34vw" className={styles.featurePhoto} />
          </div>

          {/* 5. Foto del campo */}
          <div className={`${styles.panel} ${styles.gallery}`}>
            <Photo image="pastizal" alt={img} free={{ height: 60 }} sizes="(max-width: 768px) 90vw, 45vw" />
          </div>

          {/* 6. La idea: foto y bloque de color */}
          <div className={`${styles.panel} ${styles.split}`}>
            <Photo image="idea" alt={img} sizes="(max-width: 768px) 85vw, 32vw" className={styles.splitPhoto} />
            <div className={`${styles.colorBlock} ${styles.clay}`}>
              <ChapterText t={t.idea} />
            </div>
          </div>

          {/* 7. La obra */}
          <div className={`${styles.panel} ${styles.feature}`}>
            <Photo image="obraViga" alt={img} sizes="(max-width: 768px) 85vw, 34vw" className={styles.featurePhoto} />
            <Chapter t={t.obra} />
            <Photo image="obraGaleria" alt={img} free={{ height: 50 }} sizes="(max-width: 768px) 85vw, 40vw" />
          </div>

          {/* 8. Otra foto de la obra */}
          <div className={`${styles.panel} ${styles.gallery}`}>
            <Photo image="obraTorreLejos" alt={img} free={{ height: 60 }} sizes="(max-width: 768px) 90vw, 45vw" />
          </div>

          {/* 9. La torre: título grande y foto */}
          <div className={`${styles.panel} ${styles.aside}`}>
            <p className={styles.eyebrow}>{t.torre.eyebrow}</p>
            <h2 className={styles.serifLarge}>{t.torre.title}</h2>
            <p className={styles.small}>{t.torre.text}</p>
            <Photo image="anteojos" alt={img} free={{ height: 26, align: "start" }} sizes="(max-width: 768px) 84vw, 32vw" className={styles.wholePhoto} />
          </div>

          {/* 10. Foto de la biblioteca, al costado del texto */}
          <div className={`${styles.panel} ${styles.gallery}`}>
            <Photo image="telescopio" alt={img} free={{ height: 62 }} sizes="(max-width: 768px) 90vw, 50vw" />
          </div>

          {/* 11. De casa a hotel */}
          <div className={`${styles.panel} ${styles.feature}`}>
            <Chapter t={t.hotel} />
            <Photo image="hotel" alt={img} free={{ height: 64 }} sizes="(max-width: 768px) 90vw, 60vw" />
          </div>

          {/* 12. Hoy: foto y bloque de color oscuro */}
          <div className={`${styles.panel} ${styles.split}`}>
            <Photo image="ellos" alt={img} sizes="(max-width: 768px) 85vw, 32vw" className={`${styles.splitPhoto} ${styles.ellosPhoto}`} />
            <div className={`${styles.colorBlock} ${styles.forest}`}>
              <p className={styles.eyebrow}>{t.hoy.eyebrow}</p>
              <h2 className={styles.serif}>{t.hoy.title}</h2>
              <span className={styles.rule} aria-hidden="true" />
              {t.hoy.paragraphs.map((p, i) => (
                <p key={i} className={styles.small}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* 13. Cierre: la frase de Cambá */}
          <div className={`${styles.panel} ${styles.closing}`}>
            <blockquote className={styles.closingText}>
              <p className={styles.serifLarge}>{t.closing.quote}</p>
              <footer className={styles.small}>— {t.closing.author}</footer>
            </blockquote>
          </div>

          {/* 14. Final: la foto de las almenas se abre hasta ocupar la pantalla */}
          <div className={styles.next} data-shift>
            <span className={styles.nextImage}>
              <Image src={HISTORIA_IMAGES.almenas.src} alt={img.almenas} fill sizes="100vw" loading="eager" className={styles.photoImage} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
