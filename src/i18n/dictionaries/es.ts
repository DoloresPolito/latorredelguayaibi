// Diccionario base (español). El de inglés tiene que tener exactamente las
// mismas claves: si falta alguna, TypeScript marca el error y el build falla.

export const es = {
  meta: {
    title: "La Torre del Guayaibí",
    description: "Hotel boutique en el corazón del campo correntino, rodeado de naturaleza.",
    reservasTitle: "Reservas — La Torre del Guayaibí",
    reservasDescription:
      "Consultá disponibilidad en La Torre del Guayaibí. Elegí tus fechas y te respondemos personalmente.",
    eventosTitle: "Eventos — La Torre del Guayaibí",
    eventosDescription:
      "Eventos con gastronomía, reuniones de trabajo y La Torre en exclusiva, en el corazón del campo correntino.",
  },

  nav: {
    ariaLabel: "Principal",
    home: "La Torre del Guayaibí — Inicio",
    links: {
      laTorre: "La Torre",
      habitaciones: "Habitaciones",
      gastronomia: "Gastronomía",
      eventos: "Eventos",
      entorno: "Entorno",
      historia: "Nuestra historia",
    },
    cta: "Consultar disponibilidad",
    language: "Idioma",
    menu: "Menú",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },

  opening: {
    titleLine1: "La Torre",
    titleLine2: "del Guayaibí",
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

  intro: {
    titleLine1: "Un lugar con",
    titleLine2: "historia propia.",
    text: "En el corazón de Corrientes, La Torre del Guayaibí combina naturaleza, tradición y una historia familiar única que se respira en cada rincón.",
    cta: "Conocer la torre",
    images: {
      libros: "Biblioteca con estanterías de madera repletas de libros",
      piedra: "Detalle de los muros de piedra de la torre contra el cielo",
      hotel: "Galería de la casa de piedra al atardecer, frente al parque",
    },
  },

  // Sección oscura con el texto que se "enciende" al scrollear.
  // Entre *asteriscos*: palabras en itálica.
  manifesto: {
    text: "Hay lugares que invitan a bajar el ritmo, a *disfrutar* de las pequeñas cosas y a descubrir que, a veces, lo único que necesitamos es quedarnos un poco más.",
    imageAlt: "Atardecer dorado sobre la pileta, con reposeras y eucaliptos recortados contra el cielo",
  },

  eventos: {
    hero: {
      kicker: "Eventos en La Torre",
      titleLine1: "Encuentros",
      titleLine2: "a cielo abierto.",
      tagline: "Celebraciones, reuniones y experiencias a medida en el corazón del campo correntino.",
      cta: "Ver propuestas",
      scroll: "Scroll",
      next: "Ir a la siguiente sección",
      imageAlt: "La torre de piedra iluminada de noche, bajo un cielo estrellado con la Vía Láctea",
    },
    // Sección oscura: título chico y el texto que se "enciende" letra por
    // letra al scrollear. Entre *asteriscos*: palabras en itálica.
    intro: {
      title: "Un lugar para encontrarse",
      text: "Lejos del ritmo de todos los días, *cerca de lo que importa.* Hay reuniones que merecen salir de lo cotidiano. La Torre ofrece un entorno diferente para reunirse, conversar y disfrutar sin apuro.",
    },
    services: {
      ariaLabel: "Propuestas para eventos",
      items: {
        gastronomia: {
          titleLine1: "Eventos con",
          titleLine2: "gastronomía",
          subtitle: "Nosotros nos ocupamos de todo.",
          paragraphs: [
            "Organizamos almuerzos, cenas y encuentros empresariales con servicio completo de gastronomía y bebidas.",
            "Desde una picada informal hasta un almuerzo o una cena especialmente preparados para la ocasión. Nuestro equipo se encarga de la organización para que ustedes solo tengan que disfrutar.",
          ],
          imageAlt: "Mesa larga iluminada con velas, con fiambres, quesos, panes y flores",
        },
        reuniones: {
          titleLine1: "Reuniones y",
          titleLine2: "jornadas de trabajo",
          subtitle: "Un espacio diferente para reunirse.",
          paragraphs: [
            "Ofrecemos nuestros espacios para reuniones de empresas, encuentros de equipos y jornadas de trabajo.",
            "Una alternativa para quienes buscan un entorno tranquilo, fuera de la oficina, con la posibilidad de incorporar servicio de café y opciones gastronómicas sencillas.",
          ],
          imageAlt: "Mesa puesta con servilletas de lino, copas y velas en un salón cálido",
        },
        exclusiva: {
          titleLine1: "La Torre",
          titleLine2: "en exclusiva",
          subtitle: "Un lugar, solo para ustedes.",
          paragraphs: [
            "Para grupos que buscan una experiencia más privada, ofrecemos la posibilidad de reservar todas las habitaciones y disfrutar de los espacios de La Torre.",
            "Una propuesta flexible que permite organizar la estadía a su manera, incluyendo la posibilidad de utilizar la parrilla y coordinar sus propias comidas y bebidas.",
          ],
          imageAlt: "Quincho de piedra con la parrilla encendida y una barra de madera con banquetas",
        },
      },
    },
    experience: {
      titleLine1: "Sabores y",
      titleLine2: "tradiciones",
      subtitle: "Una experiencia bien nuestra.",
      paragraphs: [
        "Hay algo especial en compartir un asado mientras suena una guitarra.",
        "Para quienes buscan darle a su evento un carácter diferente, podemos organizar experiencias que reúnen lo mejor de nuestras tradiciones.",
        "Un asado preparado para la ocasión, músicos locales, el sonido del acordeón y el chamamé como protagonista.",
        "Una manera de descubrir Corrientes a través de su gastronomía, su música y su gente.",
      ],
      cta: "Consultar por esta experiencia",
      whatsapp: "Hola! Quisiera consultar por la experiencia Sabores y Tradiciones para un evento.",
      imageAlt: "Músicos tocando guitarra y acordeón de noche, bajo una guirnalda de luces",
    },
  },

  footer: {
    ariaLabel: "Pie de página",
    menu: "Menú",
    socials: "Redes",
    contact: "Contacto",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
    rights: "Todos los derechos reservados.",
    backToTop: "Volver arriba",
  },

  roomsTeaser: {
    title: "Espacios para quedarse.",
    text: "Cada habitación tiene su propia personalidad. Espacios donde la calidez de una casa de campo se encuentra con la tranquilidad de la naturaleza.",
    cta: "Explorar habitaciones",
    imageAlt:
      "Habitación con camas con dosel y cortinas blancas, paredes de piedra y un ventanal hacia el parque",
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
