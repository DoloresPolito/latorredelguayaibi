// Datos de contacto del hotel.
export const SITE = {
  name: "La Torre del Guayaibí",
  /**
   * Celular (03773) 15-510210 en formato internacional para WhatsApp/llamadas:
   * 54 (Argentina) + 9 (celular) + 3773 + 510210, sin "+", espacios ni guiones.
   */
  whatsapp: "5493773510210",
  /** Teléfono tal como se muestra */
  phone: "(03773) 15-510210",
  email: "torredelguayaibi@gmail.com",
  /**
   * Ubicación: Ruta Nacional 123 km 128, Mercedes, Corrientes.
   * GPS S 29° 16.904' / W 57° 56.614' en grados decimales.
   */
  coordinates: { lat: -29.28173, lng: -57.94357 },
  /**
   * Redes (links completos, con https://). Las que estén vacías no se
   * muestran en el footer ni en el menú.
   */
  socials: {
    instagram: "https://www.instagram.com/torredelguayaibi/",
    facebook: "https://www.facebook.com/torredelguayaibi/",
    tripadvisor:
      "https://www.tripadvisor.com.ar/Hotel_Review-g3356657-d2342493-Reviews-Torre_del_Guayaibi-Mercedes_Province_of_Corrientes_Litoral.html",
    flickr: "https://www.flickr.com/photos/127610971@N07/",
  },
};

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const phoneUrl = `tel:+${SITE.whatsapp}`;

export const mapsUrl = `https://www.google.com/maps?q=${SITE.coordinates.lat},${SITE.coordinates.lng}`;

export type SocialKey = keyof typeof SITE.socials;

/** Redes con link cargado, en el orden de SITE.socials */
export const socialLinks = (Object.keys(SITE.socials) as SocialKey[])
  .filter((key) => SITE.socials[key])
  .map((key) => ({ key, url: SITE.socials[key] }));
