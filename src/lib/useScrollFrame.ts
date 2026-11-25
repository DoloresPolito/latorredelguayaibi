"use client";

import { useEffect, useRef, type RefObject } from "react";

/** ¿La persona pidió reducir animaciones? (solo en el navegador) */
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** ¿El navegador soporta animaciones ligadas al scroll (animation-timeline)? */
export const supportsScrollTimeline = () => CSS.supports("animation-timeline: view()");

type ScrollFrameOptions<T extends Element> = {
  /**
   * Solo calcula mientras el elemento está en pantalla (IntersectionObserver).
   * Al entrar, calcula una vez.
   */
  whileVisible?: boolean;
  /** También recalcula al cambiar el tamaño de la ventana (por defecto, sí) */
  resize?: boolean;
  /**
   * Calcula apenas se monta, sin esperar al primer scroll. Por defecto, sí
   * (salvo con whileVisible, que ya calcula al entrar en pantalla).
   */
  immediate?: boolean;
  /**
   * Si devuelve true, no escucha el scroll (p. ej. con "reducir
   * animaciones", o si el movimiento ya lo hace el CSS). Se evalúa al montar.
   */
  skip?: () => boolean;
  /** Se llama en lugar de escuchar, cuando skip devolvió true */
  onSkip?: (el: T) => void;
};

/**
 * Llama a `update(el)` cuando cambia el scroll (y el tamaño de la ventana),
 * como mucho una vez por cuadro (requestAnimationFrame). Es el patrón de
 * todos los efectos atados al scroll: Parallax, Curtain, ToneShift, la
 * navbar, etc. `update` puede cambiar en cada render: siempre se usa la
 * última versión.
 */
export function useScrollFrame<T extends Element>(
  ref: RefObject<T | null>,
  update: (el: T) => void,
  { whileVisible = false, resize = true, immediate = !whileVisible, skip, onSkip }: ScrollFrameOptions<T> = {},
) {
  // Últimas versiones de las funciones, sin volver a suscribirse al scroll
  const latest = useRef({ update, skip, onSkip });
  useEffect(() => {
    latest.current = { update, skip, onSkip };
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (latest.current.skip?.()) {
      latest.current.onSkip?.(el);
      return;
    }

    let frame = 0;
    let active = !whileVisible;
    const run = () => {
      frame = 0;
      latest.current.update(el);
    };
    const request = () => {
      if (active && !frame) frame = requestAnimationFrame(run);
    };

    let observer: IntersectionObserver | undefined;
    if (whileVisible) {
      observer = new IntersectionObserver(([entry]) => {
        active = entry.isIntersecting;
        request();
      });
      observer.observe(el);
    }
    window.addEventListener("scroll", request, { passive: true });
    if (resize) window.addEventListener("resize", request);
    if (immediate) latest.current.update(el);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
    };
  }, [ref, whileVisible, resize, immediate]);
}
