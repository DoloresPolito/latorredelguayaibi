"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Curtain.module.scss";

type CurtainProps = {
  children: ReactNode;
  /** Cuánto se queda atrás el contenido al salir: 0 = scroll normal, 1 = queda fijo */
  lag?: number;
  /** Oscurecimiento máximo mientras la sección siguiente lo tapa (0 a 1) */
  shade?: number;
};

/**
 * Efecto "telón" (como en vesuvio.it): mientras la sección sale por arriba,
 * su contenido baja más lento que el scroll y se oscurece apenas, así la
 * sección siguiente parece deslizarse por encima. El recorte lo hace el
 * propio envoltorio (overflow: clip), sin tocar el componente de adentro.
 *
 * El transform se escribe solo cuando hay desplazamiento: en reposo no crea
 * un contexto de apilamiento (la bienvenida del Hero necesita levantar el
 * título por encima de todo con z-index).
 */
export default function Curtain({ children, lag = 0.5, shade = 0.4 }: CurtainProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    const veil = veilRef.current;
    if (!el || !inner || !veil) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // 0 con el borde de arriba en el tope de la pantalla → 1 cuando ya salió entera
      const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
      inner.style.transform = p > 0 ? `translate3d(0, ${(p * rect.height * lag).toFixed(1)}px, 0)` : "";
      veil.style.opacity = (p * shade).toFixed(3);
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
  }, [lag, shade]);

  return (
    <div ref={ref} className={styles.curtain} data-curtain>
      <div ref={innerRef} className={styles.inner}>
        {children}
      </div>
      <span ref={veilRef} className={styles.veil} aria-hidden="true" />
    </div>
  );
}
