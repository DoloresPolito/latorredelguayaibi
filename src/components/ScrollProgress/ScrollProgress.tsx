"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollProgressProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
  /** Altura de la pantalla (0 a 1) que funciona como "lápiz": por defecto, un poco abajo del centro */
  anchor?: number;
};

/**
 * Escribe en su elemento --progress (de 0 a 1): qué parte de la sección ya
 * pasó por encima de la línea `anchor` de la pantalla. Sirve para dibujar
 * líneas que avanzan al ritmo del scroll. Con "reducir animaciones" queda en 1.
 */
export default function ScrollProgress({
  children,
  className,
  id,
  anchor = 0.6,
  "aria-label": ariaLabel,
}: ScrollProgressProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--progress", "1");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight * anchor - rect.top) / rect.height;
      el.style.setProperty("--progress", Math.max(0, Math.min(1, progress)).toFixed(4));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [anchor]);

  return (
    <section ref={ref} id={id} className={className} aria-label={ariaLabel}>
      {children}
    </section>
  );
}
