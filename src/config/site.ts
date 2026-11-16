// Datos de contacto del hotel.
// TODO: reemplazar por los datos reales.
export const SITE = {
  name: "La Torre del Guayaibí",
  /** Número de WhatsApp de la dueña, formato internacional sin "+", espacios ni guiones. Ej: 5493794123456 */
  whatsapp: "5490000000000",
  email: "reservas@latorredelguayaibi.com",
};

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
