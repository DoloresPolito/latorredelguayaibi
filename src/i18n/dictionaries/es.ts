// Diccionario base (español). El de inglés tiene que tener exactamente las
// mismas claves: si falta alguna, TypeScript marca el error y el build falla.

export const es = {
  meta: {
    title: "La Torre del Guayaibí",
    description: "Hotel boutique en el corazón del campo correntino, rodeado de naturaleza.",
    reservasTitle: "Reservas — La Torre del Guayaibí",
    reservasDescription:
      "Consultá disponibilidad en La Torre del Guayaibí. Elegí tus fechas y te respondemos personalmente.",
  },

  nav: {
    ariaLabel: "Principal",
    home: "La Torre del Guayaibí — Inicio",
    links: {
      laTorre: "La Torre",
      habitaciones: "Habitaciones",
      gastronomia: "Gastronomía",
      entorno: "Entorno",
      historia: "Nuestra historia",
    },
    cta: "Consultar disponibilidad",
    language: "Idioma",
    menu: "Menú",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },

  hero: {
    kicker: "La Torre del Guayaibí",
    titleLine1: "Un mundo",
    titleLine2: "aparte.",
    tagline: "Un refugio singular en el corazón del campo correntino.",
    cta: "Descubrir la torre",
    scroll: "Scroll",
    next: "Ir a la siguiente sección",
    imageAlt:
      "La Torre del Guayaibí al atardecer, con la casa de piedra y los eucaliptos reflejados en la pileta",
  },

  reservas: {
    eyebrow: "Consultas",
    titleLine1: "Tu próxima",
    titleLine2: "estadía te espera.",
    intro:
      "Completá el formulario y nos pondremos en contacto a la brevedad para ayudarte a organizar tu estadía en La Torre del Guayaibí.",
    imageAlt: "Canoa navegando al atardecer en la laguna",
    benefitsTitle: "Una estadía con todo lo esencial",
    benefits: {
      rooms: {
        title: "Habitaciones amplias y confortables",
        text: "Con vistas al parque y la naturaleza.",
      },
      breakfast: {
        title: "Desayuno incluido",
        text: "Preparado especialmente para cada huésped.",
      },
      meals: {
        title: "Almuerzos y cenas",
        text: "Con reserva previa y costo adicional.",
      },
      nature: {
        title: "Un entorno extraordinario",
        text: "En el corazón del campo correntino, cerca de los Esteros del Iberá.",
      },
    },
    contactText: "También podés escribirnos directamente por WhatsApp o por correo electrónico.",
    whatsappButton: "Escribir por WhatsApp",
    emailButton: "Enviar un mail",
    whatsappGreeting: "Hola! Quisiera hacer una consulta.",
  },

  form: {
    step1: "1. Elegí tus fechas",
    checkIn: "Fecha de llegada",
    checkOut: "Fecha de salida",
    guests: "Cantidad de huéspedes",
    guestOne: "huésped",
    guestMany: "huéspedes",
    rooms: "Cantidad de habitaciones",
    roomOne: "habitación",
    roomMany: "habitaciones",
    step2: "2. Tus datos",
    name: "Nombre y apellido",
    namePlaceholder: "Ej. María González",
    country: "País de residencia",
    otherCountry: "Otro",
    email: "Correo electrónico",
    emailPlaceholder: "Ej. maria@email.com",
    phone: "Teléfono / WhatsApp",
    phonePlaceholder: "Ej. 11 1234-5678",
    dialCode: "Código de país",
    message: "¿Hay algo que te gustaría contarnos sobre tu visita? (opcional)",
    messagePlaceholder: "Ej. Motivo de la visita, preferencias, consultas especiales…",
    submit: "Consultar disponibilidad",
    note: "Tu consulta se enviará por WhatsApp directamente a nuestro equipo.",
    sent: "¡Gracias! Se abrió WhatsApp con tu consulta lista para enviar. Si no se abrió,",
    sentLink: "escribinos acá",
    errors: {
      checkIn: "Elegí la fecha de llegada.",
      checkOut: "Elegí la fecha de salida.",
      name: "Ingresá tu nombre.",
      email: "Ingresá un correo válido.",
      phone: "Ingresá un teléfono válido.",
    },
    // Mensaje que se arma para WhatsApp (en el idioma del huésped)
    whatsapp: {
      intro: "Hola! Quisiera consultar disponibilidad en La Torre del Guayaibí.",
      checkIn: "Llegada",
      checkOut: "Salida",
      night: "noche",
      nights: "noches",
      guests: "Huéspedes",
      rooms: "Habitaciones",
      name: "Nombre",
      country: "País",
      email: "Email",
      phone: "Teléfono",
      comments: "Comentarios",
    },
  },
};

/** Forma que tienen que respetar todos los diccionarios */
export type Dictionary = typeof es;
