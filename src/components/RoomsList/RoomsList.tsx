import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, BedSingle, Plus, Users } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { ROOMS } from "@/config/rooms";
import Parallax from "@/components/Parallax/Parallax";
import Reveal from "@/components/Reveal/Reveal";
import HoverLabel from "./HoverLabel";
import ScrollShift from "./ScrollShift";
import styles from "./RoomsList.module.scss";

type RoomsListProps = {
  lang: Locale;
  /** Texto de apertura de la página (va arriba de la lista) */
  intro: Dictionary["habitaciones"]["intro"];
  t: Dictionary["habitaciones"]["list"];
  rooms: Dictionary["habitaciones"]["rooms"];
  id?: string;
  /** Clase extra para el nombre de cada suite (p. ej. Italiana) */
  titleClassName?: string;
};

type Room = (typeof ROOMS)[number];

/**
 * Apertura de la página (una frase corta, sin foto) y lista de
 * habitaciones en dos columnas (una en mobile). Las dos columnas arrancan
 * alineadas y la derecha sube más rápido con el scroll; cada foto se
 * mueve dentro de su marco y, al pasar el mouse, una etiqueta lo sigue.
 * Las tarjetas aparecen con un fundido suave, como en el home.
 */
export default function RoomsList({ lang, intro, t, rooms, id = "suites", titleClassName }: RoomsListProps) {
  const left = ROOMS.filter((_, i) => i % 2 === 0);
  const right = ROOMS.filter((_, i) => i % 2 === 1);

  const card = (room: Room, tall: boolean) => {
    const copy = rooms[room.key];
    return (
      <Reveal key={room.key} as="div" className={styles.card} threshold={0.15}>
        <Link href={localizePath(lang, "/reservas")} className={styles.link} aria-label={`${copy.name} — ${t.cardCta}`}>
          <HoverLabel className={`${styles.frame} ${tall ? styles.tall : ""}`}>
            <Parallax className={styles.layer}>
              <Image
                src={room.image}
                alt={copy.imageAlt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className={styles.image}
              />
            </Parallax>
            <span className={styles.label} aria-hidden="true">
              {t.cardCta}
              <ArrowRight size={14} strokeWidth={1.5} />
            </span>
          </HoverLabel>
        </Link>

        <div className={styles.caption}>
          <h3 className={[styles.name, titleClassName].filter(Boolean).join(" ")}>{copy.name}</h3>
          <ul className={styles.pills}>
            <li>
              {room.beds === "twoDoubles" ? (
                <BedDouble size={14} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <BedSingle size={14} strokeWidth={1.5} aria-hidden="true" />
              )}
              {t.beds[room.beds]}
            </li>
            <li>
              <Users size={14} strokeWidth={1.5} aria-hidden="true" />
              {t.guests.replace("{n}", String(room.guests + (room.extraBed ? 1 : 0)))}
            </li>
            {room.extraBed && (
              <li>
                <Plus size={14} strokeWidth={1.5} aria-hidden="true" />
                {t.extraBed}
              </li>
            )}
          </ul>
        </div>
      </Reveal>
    );
  };

  return (
    <section id={id} className={styles.section} data-nav-theme="dark" aria-labelledby={`${id}-title`}>
      <Reveal className={styles.header} threshold={0.4}>
        <div className={styles.intro}>
          <p className={styles.introText}>
            {intro.text}
          </p>
          <p className={styles.count}>
            <span>{ROOMS.length}</span>
            <span>{t.countLabel}</span>
          </p>
        </div>
        <h1 id={`${id}-title`} className="visually-hidden">
          {t.title}
        </h1>
      </Reveal>

      <div className={styles.grid}>
        <div className={styles.column}>{left.map((room) => card(room, true))}</div>
        <ScrollShift className={`${styles.column} ${styles.offset}`}>
          {right.map((room) => card(room, false))}
        </ScrollShift>
      </div>
    </section>
  );
}
