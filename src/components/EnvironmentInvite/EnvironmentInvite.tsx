import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./EnvironmentInvite.module.scss";

type EnvironmentInviteProps = {
  lang: Locale;
  t: Dictionary["environmentInvite"];
  id?: string;
};

/**
 * Invitación al entorno en el home, entre eventos y reseñas: texto
 * centrado con un botón a /entorno. Va dentro de <ToneShift>, así el verde
 * de eventos se estira hasta acá antes de volver al crema en las reseñas.
 */
export default function EnvironmentInvite({
  lang,
  t,
  id = "entorno-home",
}: EnvironmentInviteProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.inner} threshold={0.25}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h2 id={`${id}-title`} className={styles.title}>
          {t.title}
        </h2>
        <p className={styles.text}>{t.text}</p>
        <Link href={localizePath(lang, "/entorno")} className={styles.cta}>
          {t.cta}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  );
}
