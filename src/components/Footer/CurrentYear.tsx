"use client";

import { useEffect, useRef } from "react";

/**
 * Año actual. La página se pre-genera, y Next.js no permite leer la fecha
 * durante el pre-render (quedaría fija): se escribe en el navegador.
 */
export default function CurrentYear() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.textContent = String(new Date().getFullYear());
  }, []);

  return <span ref={ref} />;
}
