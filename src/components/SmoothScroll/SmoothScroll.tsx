"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Scroll suave (Lenis) para mouse y trackpad. En celulares se mantiene el
 * scroll nativo, y se desactiva si el usuario pidió reducir animaciones.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Al cambiar de página, arriba de todo y sin animación. Lenis guarda su
  // propia posición: si no se la reinicia, sigue desde la de la página anterior.
  useEffect(() => {
    if (window.location.hash) return; // links a una sección: que vayan ahí
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

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
    lenisRef.current = lenis;

    // Cuando algo bloquea el scroll en <html> (el menú mobile), Lenis se frena
    const html = document.documentElement;
    const sync = () => (html.style.overflow === "hidden" ? lenis.stop() : lenis.start());
    const observer = new MutationObserver(sync);
    observer.observe(html, { attributes: true, attributeFilter: ["style"] });

    return () => {
      observer.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
