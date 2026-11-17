"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Scroll suave (Lenis) para mouse y trackpad. En celulares se mantiene el
 * scroll nativo, y se desactiva si el usuario pidió reducir animaciones.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      // "lerp": el scroll sigue a la rueda/trackpad con inercia, de forma
      // continua. (Con "duration", cada movimiento reiniciaba una animación
      // de 1,3s y se sentía pegajoso.) Más bajo = más suave/lento.
      lerp: 0.1,
      anchors: true, // links "#seccion" (ej. la flecha del hero) también se deslizan
    });

    // Cuando algo bloquea el scroll en <html> (el menú mobile), Lenis se frena
    const html = document.documentElement;
    const sync = () => (html.style.overflow === "hidden" ? lenis.stop() : lenis.start());
    const observer = new MutationObserver(sync);
    observer.observe(html, { attributes: true, attributeFilter: ["style"] });

    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
