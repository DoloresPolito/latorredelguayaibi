import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Parallax from "@/components/Parallax/Parallax";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./WelcomePanel.module.scss";

type WelcomePanelProps = {
  lang: Locale;
  t: Dictionary["welcomePanel"];
  id?: string;
  /** Clase extra para el título (p. ej. Italiana) */
  titleClassName?: string;
};

/**
 * Panel claro que sube por encima del hero (envuelto en <Curtain>):
 * título grande a la izquierda, párrafo chico y botón a "Nuestra historia"
 * abajo a la derecha. Título y párrafo suben a distinto ritmo que el panel
 * (--parallax de <Parallax>), como en vesuvio.it. Al entrar en pantalla
 * aparecen en cascada (<Reveal>).
 */
export default function WelcomePanel({ lang, t, id = "bienvenida", titleClassName }: WelcomePanelProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Parallax>
        <Reveal className={styles.inner} threshold={0.2}>
          <h2 id={`${id}-title`} className={[styles.title, titleClassName].filter(Boolean).join(" ")}>
            {t.title}
          </h2>
          <div className={styles.aside}>
            <p className={styles.text}>{t.text}</p>
            <Link href={localizePath(lang, "/nuestra-historia")} className={styles.cta}>
              {t.cta}
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Parallax>
    </section>
  );
}
