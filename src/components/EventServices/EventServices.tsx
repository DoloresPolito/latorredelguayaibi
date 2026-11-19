import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Parallax from "@/components/Parallax/Parallax";
import Reveal from "@/components/Reveal/Reveal";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";
import styles from "./EventServices.module.scss";

type EventServicesProps = {
  t: Dictionary["eventos"]["services"];
  id?: string;
};

const ITEMS = [
  { key: "gastronomia", src: "/images/eventos/gastronomia.png", tone: styles.clay },
  { key: "reuniones", src: "/images/eventos/reuniones.png", tone: styles.sage },
  { key: "exclusiva", src: "/images/eventos/exclusiva.png", tone: styles.forest },
  { key: "chamame", src: "/images/eventos/musica.png", tone: styles.sand },
] as const;

/**
 * Propuestas para eventos, alternadas a cada lado de una línea central.
 * - La línea se dibuja al ritmo del scroll y cada propuesta enciende su punto.
 * - Al entrar, el bloque de color se despliega, la foto se abre como una
 *   cortina desde la línea y los textos suben en cascada.
 * - Después, bloque y foto se mueven a distinta velocidad (profundidad).
 */
export default function EventServices({ t, id = "propuestas" }: EventServicesProps) {
  return (
    <ScrollProgress id={id} className={styles.section} aria-label={t.ariaLabel}>
      <div className={styles.inner}>
        <span className={styles.line} aria-hidden="true" />

        <ol className={styles.list}>
        {ITEMS.map((item, i) => {
          const copy = t.items[item.key];
          const number = String(i + 1).padStart(2, "0");
          return (
            <li key={item.key} className={`${i % 2 ? styles.reverse : ""} ${item.tone}`}>
              <Parallax className={styles.row}>
                <span className={styles.dot} aria-hidden="true" />

                <Reveal className={styles.text} threshold={0.25}>
                  <p className={styles.number} aria-hidden="true">
                    {number}
                  </p>
                  <h2 className={styles.title}>
                    <span className={styles.titleLine}>
                      <span>{copy.titleLine1}</span>
                    </span>{" "}
                    <span className={styles.titleLine}>
                      <span>{copy.titleLine2}</span>
                    </span>
                  </h2>
                  <p className={styles.subtitle}>{copy.subtitle}</p>
                  {copy.paragraphs.map((p) => (
                    <p key={p} className={styles.body}>
                      {p}
                    </p>
                  ))}
                </Reveal>

                <Reveal className={styles.media} threshold={0.3}>
                  <span className={styles.block} aria-hidden="true" />
                  <div className={styles.photo}>
                    <div className={styles.photoInner}>
                      <Image
                        src={item.src}
                        alt={copy.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 34vw, 90vw"
                        className={styles.image}
                      />
                    </div>
                  </div>
                </Reveal>
              </Parallax>
            </li>
          );
        })}
        </ol>
      </div>
    </ScrollProgress>
  );
}
