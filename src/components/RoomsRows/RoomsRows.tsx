import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { ROOMS } from "@/config/rooms";
import Reveal from "@/components/Reveal/Reveal";
import Parallax from "@/components/Parallax/Parallax";
import styles from "./RoomsRows.module.scss";

type RoomsRowsProps = {
  lang: Locale;
  t: Dictionary["habitaciones"];
  id?: string;
  /** Clase extra para los títulos (p. ej. Italiana) */
  titleClassName?: string;
};

/**
 * Página de habitaciones con el estilo nuevo del home: fondo crema, títulos
 * en Italiana. Arriba el título y la cantidad de suites; después una fila
 * por suite, alternando el lado de la foto (número, nombre, una frase,
 * camas/huéspedes y el botón para consultar). Las fotos se descubren de
 * abajo hacia arriba al entrar y se mueven con el scroll. Al final, un
 * cierre con el desayuno incluido y el botón de consultar disponibilidad.
 */
export default function RoomsRows({ lang, t, id = "suites", titleClassName }: RoomsRowsProps) {
  const reservas = localizePath(lang, "/reservas");
  const withTitle = (base: string) => [base, titleClassName].filter(Boolean).join(" ");
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.header} threshold={0.3}>
        <p className={styles.eyebrow}>{t.list.title}</p>
        <h1 id={`${id}-title`} className={withTitle(styles.title)}>
          {t.intro.text}
        </h1>
        <p className={styles.count}>
          <span className={withTitle(styles.countNumber)}>{pad(ROOMS.length)}</span>
          <span className={styles.countLabel}>{t.list.countLabel}</span>
        </p>
      </Reveal>

      <ol className={styles.rows}>
        {ROOMS.map((room, i) => {
          const copy = t.rooms[room.key];
          const guests = room.guests + (room.extraBed ? 1 : 0);
          return (
            <li key={room.key}>
              <Reveal className={[styles.row, i % 2 === 1 && styles.reverse].filter(Boolean).join(" ")} threshold={0.2}>
                <Parallax className={styles.photo}>
                  <div className={styles.layer}>
                    <Image
                      src={room.image}
                      alt={copy.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className={styles.image}
                    />
                  </div>
                </Parallax>

                <div className={styles.copy}>
                  <span className={styles.index} aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <h2 className={withTitle(styles.name)}>{copy.name}</h2>
                  {copy.description && <p className={styles.description}>{copy.description}</p>}
                  <ul className={styles.facts}>
                    <li>{t.list.beds[room.beds]}</li>
                    <li>{t.list.guests.replace("{n}", String(guests))}</li>
                    {room.extraBed && <li>{t.list.extraBed}</li>}
                  </ul>
                  <Link href={reservas} className={styles.cta} aria-label={`${t.list.roomCta}: ${copy.name}`}>
                    {t.list.roomCta}
                    <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <Reveal className={styles.closing} threshold={0.3}>
        <h2 className={withTitle(styles.closingTitle)}>{t.closing.title}</h2>
        <p className={styles.closingText}>{t.closing.text}</p>
        <Link href={reservas} className={styles.cta}>
          {t.closing.cta}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  );
}
