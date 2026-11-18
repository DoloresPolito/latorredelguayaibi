import type { Dictionary } from "@/i18n/dictionaries/es";
import ScrollText from "@/components/ScrollText/ScrollText";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./EventIntro.module.scss";

type EventIntroProps = {
  t: Dictionary["eventos"]["intro"];
  id?: string;
};

/**
 * Sección oscura de eventos: título chico arriba y un texto mediano que se
 * enciende letra por letra al scrollear (como la frase del home).
 */
export default function EventIntro({ t, id = "eventos-intro" }: EventIntroProps) {
  return (
    <section id={id} className={styles.section} data-nav-theme="dark" aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        <Reveal className={styles.heading} threshold={0.5}>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id={`${id}-title`} className={styles.title}>
            {t.title}
          </h2>
        </Reveal>

        <ScrollText text={t.text} className={styles.text} />
      </div>
    </section>
  );
}
