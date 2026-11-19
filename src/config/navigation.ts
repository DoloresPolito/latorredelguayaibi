// Secciones principales del sitio (las usan la barra de navegación y el footer).
// El texto de cada una está en los diccionarios, en nav.links[key].
export const NAV_LINKS = [
  { key: "laTorre", href: "/" }, // lleva al home
  { key: "habitaciones", href: "/habitaciones" },
  { key: "eventos", href: "/eventos" },
  { key: "entorno", href: "/entorno" },
  { key: "historia", href: "/nuestra-historia" },
] as const;

export const CTA_HREF = "/reservas";
