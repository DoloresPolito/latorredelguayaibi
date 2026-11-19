import type { Dictionary } from "@/i18n/dictionaries/es";
import Image from "next/image";
import ScrollText from "@/components/ScrollText/ScrollText";
import Parallax from "@/components/Parallax/Parallax";
import PointerDrift from "@/components/PointerDrift/PointerDrift";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./EventIntro.module.scss";

type EventIntroProps = {
  t: Dictionary["eventos"]["intro"];
  id?: string;
};

/**
 * Primera sección de eventos (fondo crema, letras verdes):
 * - Arriba, como en habitaciones: antetítulo con línea y las propuestas en chips.
 * - A la derecha (abajo del encabezado en mobile), una foto vertical que llega
 *   con un fundido suave y se mueve con el scroll y el mouse.
 * - Más abajo, un texto mediano que se enciende letra por letra al scrollear
 *   (como la frase del home).
 */
export default function EventIntro({ t, id = "eventos-intro" }: EventIntroProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        <h1 id={`${id}-title`} className="visually-hidden">
          {t.pageTitle}
        </h1>

        <Reveal className={styles.header} threshold={0.4}>
          <p className={styles.kicker}>
            <span className={styles.rule} aria-hidden="true" />
            {t.kicker}
          </p>
          <ul className={styles.tags} aria-label={t.tagsLabel}>
            {t.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className={styles.mediaReveal} threshold={0.2}>
          {/* Parallax afuera: --parallax llega a la capa de la foto */}
          <Parallax className={styles.media}>
            <PointerDrift className={styles.drift}>
              <div className={styles.layer}>
                <Image
                  src="/images/eventos/eventos.png"
                  alt={t.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className={styles.image}
                />
              </div>
            </PointerDrift>
          </Parallax>
        </Reveal>

        <div className={styles.statement}>
          <h2 className="visually-hidden">{t.title}</h2>
          <ScrollText text={t.text} className={styles.text} />
        </div>
      </div>
    </section>
  );
}
