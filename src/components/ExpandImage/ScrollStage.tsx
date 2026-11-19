"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollStageProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Escribe en su elemento dos variables según el scroll (el elemento es más
 * alto que la pantalla y adentro tiene un hijo sticky de 100svh):
 * --open: 1 cuando asoma por abajo → 0 cuando su borde superior llega arriba.
 * --t:    0 → 1 mientras queda fijo (el tramo extra de alto).
 * Con "reducir animaciones" queda todo abierto y visible.
 */
export default function ScrollStage({ children, className }: ScrollStageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--open", "0");
      el.style.setProperty("--t", "1");
      return;
    }

    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const open = rect.top / vh;
      const t = -rect.top / Math.max(1, rect.height - vh);
      el.style.setProperty("--open", Math.max(0, Math.min(1, open)).toFixed(4));
      el.style.setProperty("--t", Math.max(0, Math.min(1, t)).toFixed(4));
    };
    const request = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      request();
    });
    observer.observe(el);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
