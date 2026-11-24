"use client";

import { useEffect, useRef, type ReactNode } from "react";

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--reveal", "1");
      return;
    }
    if (CSS.supports("animation-timeline: view()")) return; // lo hace el CSS

    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = Math.min(rect.height, vh);
      const progress = (vh - rect.top) / visible;
      el.style.setProperty("--reveal", Math.max(0, Math.min(1, progress)).toFixed(4));
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
    <footer ref={ref} className={className} data-nav-theme="dark" {...rest}>
      {children}
    </footer>
  );
}
