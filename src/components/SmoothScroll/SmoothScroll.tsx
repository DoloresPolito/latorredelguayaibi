"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
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
  // useLayoutEffect (y no useEffect): corre antes de que el navegador saque
  // la "foto" de la página nueva para la transición entre páginas. Si no, la
  // página entraba mostrando el principio y recién después saltaba (p. ej. al
  // formulario de /reservas#consulta).
  useLayoutEffect(() => {
    const jump = (y: number) => {
      window.scrollTo(0, y);
      lenisRef.current?.scrollTo(y, { immediate: true, force: true });
    };

    const hash = window.location.hash;
    if (!hash) {
      jump(0);
      return;
    }

    // Links a una sección de otra página (ej. /reservas#consulta): directo
    // ahí. La sección puede tardar unos cuadros en estar en la página y Next
    // a veces scrollea después, así que se reintenta un rato.
    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let tries = 0;
    const go = () => {
      const target = document.getElementById(id);
      if (target) {
        // getBoundingClientRect + scroll-margin-top (lo que usaría scrollIntoView)
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        const y = Math.round(target.getBoundingClientRect().top + window.scrollY - margin);
        if (Math.abs(window.scrollY - y) > 2) jump(y);
      }
      if (++tries < 20) frame = requestAnimationFrame(go);
    };
    go();
    // Si la persona scrollea mientras tanto, no la volvemos a llevar
    const stop = () => cancelAnimationFrame(frame);
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
    return () => {
      stop();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      // "lerp": el scroll sigue a la rueda/trackpad con inercia, de forma
      // continua. (Con "duration", cada movimiento reiniciaba una animación
      // de 1,3s y se sentía pegajoso.) Más bajo = más suave/lento.
      lerp: 0.1,
      // Los links "#seccion" los maneja el efecto de abajo: el "anchors" de
      // Lenis no frena el salto del navegador y los dos se pisaban
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

  // Links a una sección de la misma página (ej. el botón y la flecha del
  // hero): bajan con un deslizamiento suave en vez del salto del navegador.
  // Sin Lenis (celulares o reducir animaciones) usa el scroll del navegador.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;

      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, {
          duration: 1.4,
          easing: (t) => 1 - Math.pow(1 - t, 4), // arranca decidido y frena suave
        });
      } else {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
