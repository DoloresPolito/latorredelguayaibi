"use client";

import { useRef, type ReactNode } from "react";
import { prefersReducedMotion, supportsScrollTimeline, useScrollFrame } from "@/lib/useScrollFrame";

type FooterRevealProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

/**
 * <footer> que escribe --reveal (0 a 1): 0 cuando su borde de arriba recién
 * asoma por abajo de la pantalla, 1 cuando ya se ve entero. El CSS lo usa
 * para que el contenido "emerja" por debajo de la sección anterior y se
 * aclare el velo oscuro. Donde el navegador soporta animation-timeline, lo
 * hace el CSS (sincronizado con el scroll) y este JS no corre.
 */
export default function FooterReveal({ children, className, ...rest }: FooterRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useScrollFrame(
    ref,
    (el) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = Math.min(rect.height, vh);
      const progress = (vh - rect.top) / visible;
      el.style.setProperty("--reveal", Math.max(0, Math.min(1, progress)).toFixed(4));
    },
    {
      whileVisible: true,
      // Con animation-timeline lo hace el CSS
      skip: () => prefersReducedMotion() || supportsScrollTimeline(),
      onSkip: (el) => {
        if (prefersReducedMotion()) el.style.setProperty("--reveal", "1");
      },
    },
  );

  return (
    <footer ref={ref} className={className} data-nav-theme="dark" {...rest}>
      {children}
    </footer>
  );
}
