"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollShiftProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Escribe en su elemento --sy: cuánto se scrolleó la página (en px, sin
 * unidad). El CSS lo usa para desplazarlo a otra velocidad que el resto,
 * arrancando alineado (en 0) arriba de todo.
 */
export default function ScrollShift({ children, className }: ScrollShiftProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      el.style.setProperty("--sy", String(Math.round(window.scrollY)));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    return () => {
      window.removeEventListener("scroll", request);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
