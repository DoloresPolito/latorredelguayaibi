import type { Dictionary } from "@/i18n/dictionaries/es";
import ScrollText from "@/components/ScrollText/ScrollText";
import styles from "./QuietText.module.scss";

type QuietTextProps = {
  t: Dictionary["quietText"];
  /** Clase extra para el texto (p. ej. Italiana, como las reseñas) */
  textClassName?: string;
};

/**
 * Texto centrado sobre fondo claro, con mucho aire (como en vesuvio.it):
 * una primera frase en su propio renglón y el resto debajo. Las letras se
 * van "encendiendo" con el scroll (<ScrollText>).
 */
export default function QuietText({ t, textClassName }: QuietTextProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <ScrollText
          text={`${t.lead}\n${t.text}`}
          className={[styles.text, textClassName].filter(Boolean).join(" ")}
        />
      </div>
    </section>
  );
}
