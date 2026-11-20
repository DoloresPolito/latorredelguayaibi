import type { Dictionary } from "@/i18n/dictionaries/es";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./QuietText.module.scss";

type QuietTextProps = {
  t: Dictionary["quietText"];
  /** Clase extra para el texto (p. ej. Italiana, como las reseñas) */
  textClassName?: string;
};

/**
 * Texto centrado sobre fondo claro, con mucho aire (como en vesuvio.it):
 * una primera frase en su propio renglón y el resto debajo. Aparece suave
 * al entrar en pantalla.
 */
export default function QuietText({ t, textClassName }: QuietTextProps) {
  return (
    <section className={styles.section}>
      <Reveal className={styles.inner}>
        <p className={[styles.text, textClassName].filter(Boolean).join(" ")}>
          <span className={styles.lead}>{t.lead}</span> {t.text}
        </p>
      </Reveal>
    </section>
  );
}
