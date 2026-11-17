// Datos de contacto del hotel.
// TODO: reemplazar por los datos reales.
export const SITE = {
  name: "La Torre del Guayaibí",
  /** Número de WhatsApp de la dueña, formato internacional sin "+", espacios ni guiones. Ej: 5493794123456 */
  whatsapp: "549336584076", // TEMPORAL: número de pruebas, reemplazar por el de la dueña
  email: "reservas@latorredelguayaibi.com",
  /** TEMPORAL: reemplazar por la cuenta real de Instagram */
  instagram: "https://www.instagram.com/",
};

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
