"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";

type RevealProps = {
  children: ReactNode;
  /** Etiqueta a renderizar (por defecto div; p. ej. "ul" para una lista) */
  as?: "div" | "ul" | "section";
  className?: string;
  style?: CSSProperties;
  /** Porción del elemento que tiene que estar en pantalla para disparar la animación */
  threshold?: number;
};

/**
 * Marca su contenido con data-visible="true" la primera vez que entra en
 * pantalla. La animación la define cada componente en su CSS.
 */
export default function Reveal({ children, as: Tag = "div", className, style, threshold = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref as RefObject<never>} className={className} style={style} data-visible={visible}>
      {children}
    </Tag>
  );
}
