import type { Dictionary } from "@/i18n/dictionaries/es";
import ScrollText from "@/components/ScrollText/ScrollText";
import styles from "./QuietText.module.scss";

type QuietTextProps = {
  t: Dictionary["quietText"];
  /** Versión baja (sin ocupar toda la pantalla), p. ej. debajo del hero de eventos */
  compact?: boolean;
  id?: string;
};

/**
 * Texto centrado sobre fondo claro, con mucho aire (como en vesuvio.it):
 * una primera frase en su propio renglón y el resto debajo. Las letras se
 * van "encendiendo" con el scroll (<ScrollText>).
 */
export default function QuietText({ t, compact, id }: QuietTextProps) {
  return (
    <section id={id} className={[styles.section, compact && styles.compact].filter(Boolean).join(" ")}>
      <div className={styles.inner}>
        <ScrollText
          text={`${t.lead}\n${t.text}`}
          className={styles.text}
        />
      </div>
    </section>
  );
}
