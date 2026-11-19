"use client";

import { useRef, type ReactNode } from "react";

type HoverLabelProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Escribe la posición del mouse dentro del elemento (--cx / --cy, en px)
 * para que una etiqueta lo siga (la posiciona el CSS).
 */
export default function HoverLabel({ children, className }: HoverLabelProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--cx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--cy", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} className={className} onPointerMove={onMove} onPointerEnter={onMove}>
      {children}
    </div>
  );
}
