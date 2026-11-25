// Secciones principales del sitio (las usan la barra de navegación y el footer).
// El texto de cada una está en los diccionarios, en nav.links[key].
export const NAV_LINKS = [
  { key: "laTorre", href: "/" }, // lleva al home
  { key: "habitaciones", href: "/habitaciones" },
  { key: "eventos", href: "/eventos" },
  { key: "entorno", href: "/entorno" },
  { key: "historia", href: "/nuestra-historia" },
  // Mismo destino que el botón de consultar disponibilidad. No se marca como
  // sección actual: en reservas no se está "en Contacto"
  { key: "contacto", href: "/reservas", markCurrent: false },
] as const;

export const CTA_HREF = "/reservas";

/** id del formulario en /reservas (para llegar directo con "#consulta") */
export const FORM_ANCHOR = "consulta";

/** Parámetro de /reservas con la suite elegida (ej. ?habitacion=azul) */
export const ROOM_PARAM = "habitacion";

/** Ruta a /reservas que baja directo al formulario con la suite ya elegida */
export const roomInquiryPath = (roomKey: string) => `/reservas?${ROOM_PARAM}=${roomKey}#${FORM_ANCHOR}`;
