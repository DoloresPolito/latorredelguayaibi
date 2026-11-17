"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Escribe en su elemento la variable --parallax (de -1 a 1) según dónde está
 * en pantalla: -1 saliendo por arriba, 0 centrado, 1 entrando por abajo.
 * El movimiento lo define el CSS (ver mixin drift-layer). Solo calcula
 * mientras está visible, y no hace nada si se pidió reducir animaciones.
 */
export default function Parallax({ children, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const half = window.innerHeight / 2;
      const progress = (rect.top + rect.height / 2 - half) / (half + rect.height / 2);
      el.style.setProperty("--parallax", Math.max(-1, Math.min(1, progress)).toFixed(4));
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
