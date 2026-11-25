import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { ENTORNO_IMAGES, type EntornoImageKey } from "@/config/entorno";
import { emphasis } from "@/lib/emphasis";
import ScrollStage from "@/components/ScrollStage/ScrollStage";
import styles from "./EnvironmentDepth.module.scss";

type EnvironmentDepthProps = {
  t: Dictionary["entorno"]["depth"];
  images: Dictionary["entorno"]["images"];
  id?: string;
};

/**
 * Fotos sueltas a distintas profundidades. x / y: corrimiento desde el
 * centro (en vw / vh); w: ancho (vw, en desktop); z: profundidad inicial
 * (más negativo = más lejos); ratio: proporción del recorte.
 * Ordenadas de la más cercana a la más lejana.
 */
/**
 * Ancho con el que se pide cada foto: el doble de su ancho en pantalla
 * (--w vw en desktop, 2.1× en mobile, ver el SCSS), porque al acercarse a la
 * "cámara" llega a verse unas dos veces más grande antes de desvanecerse.
 */
const photoSizes = (w: number) =>
  `(max-width: 768px) ${Math.min(100, Math.round(w * 2.1 * 2))}vw, ${Math.round(w * 2)}vw`;

const PHOTOS: { key: EntornoImageKey; x: number; y: number; w: number; z: number; ratio: string }[] = [
  { key: "atardecer", x: -36, y: -22, w: 14, z: -150, ratio: "1" },
  { key: "piedra", x: 34, y: -26, w: 15, z: -400, ratio: "4 / 3" },
  { key: "vacas", x: 38, y: 26, w: 17, z: -650, ratio: "3 / 2" },
  { key: "nandu", x: -34, y: 44, w: 10, z: -900, ratio: "2 / 3" },
  { key: "hereford", x: 6, y: -46, w: 9, z: -1200, ratio: "2 / 3" },
  { key: "esteros", x: -46, y: 38, w: 12, z: -1500, ratio: "3 / 4" },
  { key: "casaPileta", x: 30, y: 40, w: 16, z: -1800, ratio: "3 / 2" },
  { key: "arbol", x: -34, y: -40, w: 10, z: -2100, ratio: "2 / 3" },
  { key: "ovejas", x: 48, y: -8, w: 14, z: -2400, ratio: "4 / 3" },
  { key: "canoa", x: -16, y: 42, w: 11, z: -2700, ratio: "3 / 4" },
  { key: "juncos", x: 40, y: -36, w: 13, z: -3000, ratio: "1" },
  { key: "eucaliptos", x: -46, y: -12, w: 14, z: -3300, ratio: "4 / 3" },
  { key: "aves", x: 20, y: 46, w: 10, z: -3600, ratio: "2 / 3" },
];

/** Foto del final: se abre desde el centro hasta ocupar toda la pantalla */
const FOCUS: EntornoImageKey = "laguna";

/**
 * Apertura de la página Entorno. La pantalla queda fija mientras se
 * scrollea y la "cámara" avanza entre fotos que flotan a distintas
 * profundidades: pasan de largo, se pierden por los costados y aparecen
 * otras desde el fondo. El título se desvanece al empezar y, al final, una
 * foto se abre desde el centro hasta cubrir la pantalla, con una frase.
 * Todo atado al scroll (--t de ScrollStage, de 0 a 1).
 */
export default function EnvironmentDepth({ t, images, id = "entorno" }: EnvironmentDepthProps) {
  const focus = ENTORNO_IMAGES[FOCUS];

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <ScrollStage className={styles.track}>
        <div className={styles.sticky}>
          <div className={styles.space}>
            {PHOTOS.map(({ key, x, y, w, z, ratio }, i) => {
              const image = ENTORNO_IMAGES[key];
              return (
                <div
                  key={key}
                  className={styles.photo}
                  style={
                    {
                      "--x": x,
                      "--y": y,
                      "--w": w,
                      "--z": z,
                      "--ratio": ratio,
                      "--i": i,
                      zIndex: PHOTOS.length - i + 2,
                    } as CSSProperties
                  }
                >
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={images[key]}
                    sizes={photoSizes(w)}
                    priority={i < 4}
                    className={styles.photoImage}
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.focus}>
            <Image src={focus.src} alt={images[FOCUS]} fill sizes="100vw" className={styles.focusImage} />
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
