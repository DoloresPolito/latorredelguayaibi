import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { DEPTH_COUNT, photoAlt, type EntornoPhoto } from "@/config/entorno";
import { emphasis } from "@/lib/emphasis";
import ScrollStage from "@/components/ScrollStage/ScrollStage";
import styles from "./EnvironmentDepth.module.scss";

type EnvironmentDepthProps = {
  t: Dictionary["entorno"]["depth"];
  images: Record<string, string>;
  fallbackAlt: string;
  /** Las primeras DEPTH_COUNT flotan; la siguiente se abre al final */
  photos: EntornoPhoto[];
  id?: string;
};

/**
 * Ancho con el que se pide cada foto: el doble de su ancho en pantalla
 * (--w vw en desktop, 2.1× en mobile, ver el SCSS), porque al acercarse a la
 * "cámara" llega a verse unas dos veces más grande antes de desvanecerse.
 */
const photoSizes = (w: number) =>
  `(max-width: 768px) ${Math.min(100, Math.round(w * 2.1 * 2))}vw, ${Math.round(w * 2)}vw`;

/**
 * Lugares donde flotan las fotos, de la más cercana a la más lejana: la foto
 * 01 va al primero, la 02 al segundo, etc. x / y: corrimiento desde el
 * centro (en vw / vh); s: tamaño (vw); z: profundidad inicial (más negativo =
 * más lejos).
 */
const SLOTS: { x: number; y: number; s: number; z: number }[] = [
  { x: -36, y: -22, s: 12, z: -150 },
  { x: 34, y: -26, s: 12, z: -400 },
  { x: 50, y: 28, s: 15.5, z: -650 },
  { x: -48, y: 46, s: 14.5, z: -900 },
  { x: 6, y: -46, s: 11, z: -1200 },
  { x: 12, y: 58, s: 14.5, z: -1500 }, // abajo al centro: a la izquierda tapaba a la 04
  { x: 30, y: 40, s: 13, z: -1800 },
  { x: -34, y: -40, s: 12, z: -2100 },
  { x: 48, y: -8, s: 12, z: -2400 },
  { x: -16, y: 42, s: 12, z: -2700 },
  { x: 40, y: -36, s: 12, z: -3000 },
  { x: -46, y: -12, s: 12, z: -3300 },
  { x: 20, y: 46, s: 12, z: -3600 },
];

/** Agranda todas las fotos flotantes por igual (1 = el tamaño "s" de cada lugar) */
const PHOTO_SCALE = 2.1;

/**
 * Recorte según la forma de la foto, sin pasar de 3:2 ni de 2:3, y ancho
 * según el tamaño del lugar: así una vertical y una horizontal en el mismo
 * lugar ocupan más o menos la misma superficie.
 */
function fit(photo: EntornoPhoto, s: number) {
  const r = Math.min(3 / 2, Math.max(2 / 3, photo.width / photo.height));
  return { ratio: r.toFixed(3), w: Math.round(s * PHOTO_SCALE * Math.sqrt(r) * 10) / 10 };
}

/**
 * Apertura de la página Entorno. La pantalla queda fija mientras se
 * scrollea y la "cámara" avanza entre fotos que flotan a distintas
 * profundidades: pasan de largo, se pierden por los costados y aparecen
 * otras desde el fondo. El título se desvanece al empezar y, al final, una
 * foto se abre desde el centro hasta cubrir la pantalla, con una frase.
 * Todo atado al scroll (--t de ScrollStage, de 0 a 1).
 */
export default function EnvironmentDepth({ t, images, fallbackAlt, photos, id = "entorno" }: EnvironmentDepthProps) {
  const floating = photos.slice(0, Math.min(DEPTH_COUNT, SLOTS.length));
  const focus = photos[DEPTH_COUNT];

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <ScrollStage className={styles.track}>
        <div className={styles.sticky}>
          <div className={styles.space}>
            {floating.map((image, i) => {
              const { x, y, s, z } = SLOTS[i];
              const { w, ratio } = fit(image, s);
              return (
                <div
                  key={image.src}
                  className={styles.photo}
                  style={
                    {
                      "--x": x,
                      "--y": y,
                      "--w": w,
                      "--z": z,
                      "--ratio": ratio,
                      "--i": i,
                      zIndex: floating.length - i + 2,
                    } as CSSProperties
                  }
                >
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={photoAlt(images, fallbackAlt, image)}
                    sizes={photoSizes(w)}
                    priority={i < 4}
                    className={styles.photoImage}
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.focus}>
            {focus && (
              <Image
                src={focus.src}
                alt={photoAlt(images, fallbackAlt, focus)}
                fill
                sizes="100vw"
                className={styles.focusImage}
              />
            )}
            <span className={styles.shade} aria-hidden="true" />
            <div className={styles.focusContent}>
              <p className={styles.focusEyebrow}>
                <span className={styles.rule} aria-hidden="true" />
                {t.focusEyebrow}
              </p>
              <h2 className={styles.focusTitle}>
                {emphasis(t.focusTitle)}
              </h2>
            </div>
          </div>

          <div className={styles.intro}>
            <p className={styles.eyebrow}>{t.eyebrow}</p>
            <h1 id={`${id}-title`} className={styles.title}>
              <span className={styles.line}>{t.titleLine1}</span>
              <span className={styles.line}>{t.titleLine2}</span>
            </h1>
          </div>

          <p className={styles.hint} aria-hidden="true">
            {t.scroll}
            <span className={styles.hintLine} />
          </p>
        </div>
      </ScrollStage>
    </section>
  );
}
