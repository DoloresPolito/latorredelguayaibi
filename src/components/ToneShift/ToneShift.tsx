"use client";

import { useRef, type ReactNode } from "react";
import { useScrollFrame } from "@/lib/useScrollFrame";
import styles from "./ToneShift.module.scss";

type ToneShiftProps = {
  children: ReactNode;
  /** id de la sección que, al llegar a la pantalla, pasa todo a oscuro */
  targetId: string;
  /** id de la sección que, al llegar, vuelve todo a claro (opcional) */
  untilId?: string;
  /** Altura de la pantalla (0 a 1) que tiene que alcanzar su borde de arriba */
  threshold?: number;
};

/**
 * Envuelve varias secciones que comparten el fondo. Cuando el borde de
 * arriba de `targetId` sube más allá de `threshold` de la pantalla, pasa a
 * data-tone="dark": --tone-p va de 0 a 1 con una transición larga y el fondo
 * se funde de crema a verde (y los textos de verde a crema). Si se pasa
 * `untilId`, cuando esa sección llega al mismo punto vuelve a claro. Así no
 * hay una línea de corte entre secciones. En oscuro también avisa a la
 * navbar (data-nav-theme="dark").
 */
export default function ToneShift({ children, targetId, untilId, threshold = 0.6 }: ToneShiftProps) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollFrame(ref, (el) => {
    const target = document.getElementById(targetId);
    const until = untilId ? document.getElementById(untilId) : null;
    if (!target) return;
    const line = window.innerHeight * threshold;
    const dark =
      target.getBoundingClientRect().top < line && (!until || until.getBoundingClientRect().top >= line);
    if ((el.dataset.tone === "dark") === dark) return;
    el.dataset.tone = dark ? "dark" : "light";
    if (dark) el.setAttribute("data-nav-theme", "dark");
    else el.removeAttribute("data-nav-theme");
  });

  return (
    <div ref={ref} className={styles.shift} data-tone="light">
      {children}
    </div>
  );
}
