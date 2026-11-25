import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { whatsappUrl } from "@/config/site";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./EventsCta.module.scss";

type EventsCtaProps = {
  t: Dictionary["eventos"]["cta"];
  id?: string;
};

/**
 * Cierre de la página de eventos: antetítulo, frase, texto corto y botón
 * que abre WhatsApp con un mensaje para reservar un evento. Los textos
 * llegan en cascada al entrar.
 */
export default function EventsCta({ t, id = "reservar-evento" }: EventsCtaProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.inner} threshold={0.3}>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h2 id={`${id}-title`} className={styles.title}>
          {t.title}
        </h2>
        <p className={styles.text}>{t.text}</p>
        <a
          href={whatsappUrl(t.whatsapp)}
          className={styles.cta}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.button}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
