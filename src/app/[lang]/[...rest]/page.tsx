import { notFound } from "next/navigation";

// Esta ruta siempre termina en 404 a propósito: sin esto, en desarrollo Next
// avisa que no puede validar la navegación instantánea ("Could not validate
// `instant`…") porque el segmento nunca llega a renderizarse.
export const instant = false;

/**
 * Cualquier dirección dentro de /es o /en que no sea una página del sitio
 * (ej. /es/nuestra-historia) cae acá y muestra la página de error 404
 * (../not-found.tsx), con la navbar, el footer y los estilos de la web.
 */
export default function CatchAll() {
  notFound();
}
