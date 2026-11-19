import { Fragment, type ReactNode } from "react";

/**
 * Convierte los tramos entre *asteriscos* de un texto del diccionario en
 * <em> (itálica). "Una estadía con *todo lo esencial.*" → texto + <em>.
 */
export function emphasis(text: string): ReactNode {
  return text.split(/(\*[^*]+\*)/).map((chunk, i) =>
    chunk.startsWith("*") && chunk.endsWith("*") ? (
      <em key={i}>{chunk.slice(1, -1)}</em>
    ) : (
      <Fragment key={i}>{chunk}</Fragment>
    ),
  );
}
