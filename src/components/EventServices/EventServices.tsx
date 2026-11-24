import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Parallax from "@/components/Parallax/Parallax";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./EventServices.module.scss";

type EventServicesProps = {
  t: Dictionary["eventos"]["services"];
  id?: string;
  /** Clase extra para los títulos (p. ej. Italiana) */
  titleClassName?: string;
};

// Fotos apaisadas (774 × 338)
const ITEMS = [
  { key: "gastronomia", src: "/images/eventos/evento1.png" },
  { key: "reuniones", src: "/images/eventos/evento3.png" },
  { key: "exclusiva", src: "/images/eventos/evento2.png" },
  { key: "chamame", src: "/images/eventos/evento4.png" },
] as const;

/**
 * Propuestas para eventos en zigzag: foto apaisada y, debajo, número,
 * título, bajada y texto. Alternan a la derecha y a la izquierda, un poco
 * escalonadas.
 * - Al entrar, la foto aparece con un fundido subiendo apenas y la imagen
 *   se acomoda desde un zoom suave.
 * - Parallax: la imagen se mueve apenas dentro de su marco (como en el home).
 * - Los textos llegan en cascada.
 */
export default function EventServices({ t, id = "propuestas", titleClassName }: EventServicesProps) {
  return (
    <section id={id} className={styles.section} aria-label={t.ariaLabel}>
      <ol className={styles.list}>
        {ITEMS.map((item, i) => {
          const copy = t.items[item.key];
          const number = String(i + 1).padStart(2, "0");
          return (
            <li key={item.key} className={`${styles.item} ${i % 2 ? styles.left : styles.right}`}>
              <Parallax className={styles.row}>
                <Reveal className={styles.media} threshold={0.2}>
                  <div className={styles.photo}>
                    <div className={styles.layer}>
                      <Image
                        src={item.src}
                        alt={copy.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className={styles.image}
                      />
                    </div>
                  </div>
                </Reveal>

                <Reveal className={styles.copy} threshold={0.2}>
                  <p className={styles.number} aria-hidden="true">
                    {number}
                  </p>
                  <h2 className={[styles.title, titleClassName].filter(Boolean).join(" ")}>
                    {copy.titleLine1} {copy.titleLine2}
                  </h2>
                  <p className={styles.subtitle}>{copy.subtitle}</p>
                  {copy.paragraphs.map((p) => (
                    <p key={p} className={styles.body}>
                      {p}
                    </p>
                  ))}
                </Reveal>
              </Parallax>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
