import { ViewTransition, type ReactNode } from "react";

/**
 * Envuelve cada página para la transición al navegar (View Transitions): la
 * que se va sale con "page-exit" y la que llega entra con "page-enter" (ver
 * styles/base/_page-transitions.scss). Va en cada página y no en el layout:
 * el layout no se desmonta al cambiar de página, así que no animaría.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {/* Un elemento con caja propia: el navegador no puede "fotografiar"
          uno con display: contents */}
      <div>{children}</div>
    </ViewTransition>
  );
}
