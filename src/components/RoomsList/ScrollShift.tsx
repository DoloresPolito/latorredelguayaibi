"use client";

import { useRef, type ReactNode } from "react";
import { prefersReducedMotion, useScrollFrame } from "@/lib/useScrollFrame";

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

  useScrollFrame(
    ref,
    (el) => {
      el.style.setProperty("--sy", String(Math.round(window.scrollY)));
    },
    { resize: false, skip: prefersReducedMotion },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
