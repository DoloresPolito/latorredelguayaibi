import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { whatsappUrl } from "@/config/site";
import Parallax from "@/components/Parallax/Parallax";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./EventExperience.module.scss";

type EventExperienceProps = {
  t: Dictionary["eventos"]["experience"];
  id?: string;
};

/**
 * "Sabores y tradiciones": foto nocturna a todo el ancho que se desplaza
 * más lento que la página, con el texto en cascada sobre un velo oscuro.
 * El botón abre WhatsApp con la consulta lista.
 */
export default function EventExperience({ t, id = "tradiciones" }: EventExperienceProps) {
  return (
    <section id={id} className={styles.section} data-nav-theme="dark" aria-labelledby={`${id}-title`}>
      <Parallax className={styles.media}>
        <div className={styles.layer}>
          <Image
            src="/images/eventos/tradiciones.png"
            alt={t.imageAlt}
            fill
            sizes="100vw"
            className={styles.image}
          />
        </div>
        <div className={styles.overlay} aria-hidden="true" />
      </Parallax>

      <Reveal className={styles.content} threshold={0.2}>
        <span className={styles.rule} aria-hidden="true" />
        <h2 id={`${id}-title`} className={styles.title}>
          <span className={styles.line}>
            <span>{t.titleLine1}</span>
          </span>{" "}
          <span className={styles.line}>
            <span>{t.titleLine2}</span>
          </span>
        </h2>
        <p className={styles.subtitle}>{t.subtitle}</p>
        <div className={styles.body}>
          {t.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <a
          href={whatsappUrl(t.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          {t.cta}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
