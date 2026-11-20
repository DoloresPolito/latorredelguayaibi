"use client";

import { useEffect, useRef, type ReactNode } from "react";
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
 * data-tone="dark": el fondo va de crema a verde y los textos de verde a
 * crema, con una transición (ver --tone-bg / --tone-fg en el SCSS). Si se
 * pasa `untilId`, cuando esa sección llega al mismo punto vuelve a claro.
 * Así no hay una línea de corte entre secciones. En oscuro también avisa a
 * la navbar (data-nav-theme="dark").
 */
export default function ToneShift({ children, targetId, untilId, threshold = 0.55 }: ToneShiftProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const target = document.getElementById(targetId);
    const until = untilId ? document.getElementById(untilId) : null;
    if (!el || !target) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * threshold;
      const dark =
        target.getBoundingClientRect().top < line && (!until || until.getBoundingClientRect().top >= line);
      if ((el.dataset.tone === "dark") === dark) return;
      el.dataset.tone = dark ? "dark" : "light";
      if (dark) el.setAttribute("data-nav-theme", "dark");
      else el.removeAttribute("data-nav-theme");
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
    };
  }, [targetId, untilId, threshold]);

  return (
    <div ref={ref} className={styles.shift} data-tone="light">
      {children}
    </div>
  );
}
