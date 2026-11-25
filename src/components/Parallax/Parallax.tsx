"use client";

import { useRef, type ReactNode } from "react";
import { prefersReducedMotion, supportsScrollTimeline, useScrollFrame } from "@/lib/useScrollFrame";
import styles from "./Parallax.module.scss";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * El CSS del componente ya hace el movimiento con animation-timeline (va
   * sincronizado con el scroll nativo): el JS solo corre como respaldo en
   * navegadores que no lo soportan.
   */
  cssFallback?: boolean;
};

/**
 * Escribe en su elemento la variable --parallax (de -1 a 1) según dónde está
 * en pantalla: -1 saliendo por arriba, 0 centrado, 1 entrando por abajo.
 * El movimiento lo define el CSS (ver mixin drift-layer). Solo calcula
 * mientras está visible, y no hace nada si se pidió reducir animaciones.
 */
export default function Parallax({ children, className, cssFallback = false }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollFrame(
    ref,
    (el) => {
      const rect = el.getBoundingClientRect();
      const half = window.innerHeight / 2;
      const progress = (rect.top + rect.height / 2 - half) / (half + rect.height / 2);
      el.style.setProperty("--parallax", Math.max(-1, Math.min(1, progress)).toFixed(4));
    },
    {
      whileVisible: true,
      skip: () => prefersReducedMotion() || (cssFallback && supportsScrollTimeline()),
    },
  );

  return (
    <div ref={ref} className={[styles.timeline, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
