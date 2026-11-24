// Diccionario base (español). El de inglés tiene que tener exactamente las
// mismas claves: si falta alguna, TypeScript marca el error y el build falla.

export const es = {
  meta: {
    title: "La Torre del Guayaibí",
    description: "Hotel boutique en el corazón del campo correntino, rodeado de naturaleza.",
    reservasTitle: "Reservas — La Torre del Guayaibí",
    reservasDescription:
      "Consultá disponibilidad en La Torre del Guayaibí. Elegí tus fechas y te respondemos personalmente.",
    habitacionesTitle: "Habitaciones — La Torre del Guayaibí",
    habitacionesDescription:
      "Cinco suites en una casa de piedra, en el corazón del campo correntino.",
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
      eventos: "Eventos",
      entorno: "Entorno",
      historia: "Nuestra historia",
    },
    cta: "Consultar disponibilidad",
    language: "Idioma",
    menu: "Menú",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    // Pie del menú mobile (como el footer)
    socials: "Redes",
    contact: "Contacto",
    instagram: "Instagram",
    facebook: "Facebook",
    tripadvisor: "TripAdvisor",
    flickr: "Flickr",
    whatsapp: "WhatsApp",
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

  // Home "telón": panel de color que sube sobre el hero y foto a todo el ancho
  welcomePanel: {
    title: "Es un lugar diferente. Con personalidad propia.",
    text: "Solo se necesita estar allí para darse cuenta. Un lugar de otra época, cuando el hombre sabía cómo vivir. La piedra, basalto del corazón de la Tierra, la madera, en abundancia y de la buena, los libros, de esos que son imprescindibles, a montones, en conjunto dan al lugar una magia muy especial.",
    cta: "Conocer nuestra historia",
    imageAlt: "Atardecer rosado sobre la laguna: una familia rema en canoa mientras otros cenan en el muelle de madera",
  },

  quietText: {
    lead: "Los espacios de La Torre guardan una elegancia serena y cálida.",
    text: "La piedra, la madera y los muebles de familia conviven con la luz del campo y una hospitalidad atenta y sin apuro. Un lujo sencillo, hecho de tiempo, silencio y naturaleza, que invita a quedarse.",
  },

  habitaciones: {
    intro: {
      text: "Espacios amplios y luminosos",
    },
    list: {
      title: "Habitaciones",
      countLabel: "Suites",
      cardCta: "Consultar",
      roomCta: "Consultar esta suite",
      beds: {
        twoDoubles: "2 camas dobles",
        threeSingles: "3 camas simples",
      },
      guests: "Hasta {n} huéspedes",
      extraBed: "Cama extra opcional",
    },
    // description: una frase sobre cada suite (vacía = no se muestra).
    // TODO: completar con lo que hace especial a cada una.
    rooms: {
      piedra: { name: "Suite de piedra", imageAlt: "Suite de piedra", description: "" },
      espejos: { name: "Suite de los espejos", imageAlt: "Suite de los espejos", description: "" },
      triple: { name: "Suite triple", imageAlt: "Suite triple", description: "" },
      azul: { name: "Suite azul petróleo", imageAlt: "Suite azul petróleo", description: "" },
      verde: { name: "Suite verde", imageAlt: "Suite verde", description: "" },
    },
    // Cierre de la página, antes del footer
    closing: {
      title: "El desayuno, incluido en todas las suites.",
      text: "Almuerzos y cenas, con aviso previo. Contanos cuándo querés venir y te ayudamos a organizar tu estadía.",
      cta: "Consultar disponibilidad",
    },
  },

  eventos: {
    hero: {
      kicker: "Eventos en La Torre",
      titleLine1: "Encuentros",
      titleLine2: "a cielo abierto.",
      tagline: "Celebraciones, reuniones y experiencias a medida en el corazón del campo correntino.",
      cta: "Consultá por eventos",
      whatsapp: "Hola! Quisiera consultar por un evento en La Torre.",
      scroll: "Scroll",
      next: "Ir a la siguiente sección",
      imageAlt: "La torre de piedra iluminada de noche, bajo un cielo estrellado con la Vía Láctea",
    },
    // Franja de texto debajo del hero (se "enciende" al scrollear, como en el home)
    quietText: {
      lead: "Hay encuentros que merecen salir de lo cotidiano.",
      text: "Almuerzos largos bajo los árboles, reuniones sin apuro y noches de música en vivo. La Torre ofrece un escenario diferente para celebrar, conversar y compartir, lejos del ritmo de todos los días y cerca de lo que importa.",
    },
    // Cierre de la página: frase y botón a WhatsApp para reservar un evento
    cta: {
      eyebrow: "Reservá tu evento",
      title: "Contanos qué estás imaginando.",
      text: "Escribinos y armamos juntos una propuesta a medida: fecha, cantidad de personas, gastronomía y todo lo que haga falta para que sea un encuentro inolvidable.",
      button: "Reservar por WhatsApp",
      whatsapp: "¡Hola! Quisiera reservar un evento en La Torre. ¿Me pasan disponibilidad y opciones?",
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
        chamame: {
          titleLine1: "Noche de",
          titleLine2: "tradición",
          subtitle: "Corrientes, en cada acorde.",
          paragraphs: [
            "Para quienes buscan darle a su evento un carácter diferente, organizamos noches con músicos locales en vivo, el sonido del acordeón y el chamamé como protagonista.",
            "Una propuesta pensada para vivir de cerca la música que nos identifica y descubrir Corrientes a través de sus tradiciones, su cultura y su gente.",
          ],
          imageAlt: "Dos músicos tocando guitarra y acordeón de noche en el jardín, bajo una guirnalda de luces",
        },
      },
    },
  },

  footer: {
    ariaLabel: "Pie de página",
    menu: "Menú",
    socials: "Redes",
    contact: "Contacto",
    instagram: "Instagram",
    facebook: "Facebook",
    tripadvisor: "TripAdvisor",
    flickr: "Flickr",
    whatsapp: "WhatsApp",
    address: "Ruta Nacional 123, km 128",
    city: "Mercedes, Corrientes",
    mapsLabel: "Ver la ubicación en Google Maps",
    rights: "Todos los derechos reservados.",
    backToTop: "Volver arriba",
  },

  roomsTeaser: {
    title: "Espacios para quedarse.",
    text: "Cada habitación tiene su propia personalidad. Espacios donde la calidez de una casa de campo se encuentra con la tranquilidad de la naturaleza.",
    cta: "Explorar habitaciones",
    // Home nuevo: una frase centrada, sin párrafo (una línea por renglón)
    quoteLines: ["Habitaciones", "donde", "el verdadero lujo", "es la tranquilidad."],
    quoteCta: "Ver más sobre las habitaciones",
    imageAlt:
      "Habitación con camas con dosel y cortinas blancas, paredes de piedra y un ventanal hacia el parque",
  },

  // Home: resumen de habitaciones (RoomsShowcase)
  roomsShowcase: {
    eyebrow: "Habitaciones",
    title: "Donde el verdadero lujo es la tranquilidad.",
    text: "Suites amplias y luminosas, cada una con su propia personalidad: piedra, madera, telas de campo y la luz de la tarde entrando por las ventanas.",
    cta: "Ver habitaciones",
    bigImageAlt: "Suite de piedra con camas con dosel, cortinas blancas y paredes de piedra",
  },

  // Home: gastronomía (Dining). images: texto alternativo de cada foto, en orden
  dining: {
    eyebrow: "Gastronomía",
    title: "El desayuno, siempre incluido.",
    text: "Cada mañana te espera un desayuno casero, incluido en tu estadía. Y si querés quedarte a almorzar o a cenar, lo preparamos para vos con aviso previo.",
    images: [
      "Un ñandú en el pasto frente a la casa, bajo un cielo de atardecer",
      "Un árbol seco recortado contra el cielo naranja, reflejado en una laguna",
      "Ovejas apretadas unas contra otras, vistas de cerca",
      "Una laguna con plantas acuáticas bajo un cielo rosado",
      "Una vaca Hereford mirando a cámara en el campo",
      "El atardecer reflejado en una laguna con hojas flotando",
      "Dos bandurrias caminando por el campo al atardecer",
    ],
    // Solo en celulares: cuatro fotos apaisadas, una debajo de la otra
    mobileImages: [
      "Vacas Hereford en un pastizal dorado al atardecer",
      "Una laguna con juncos y camalotes bajo un cielo naranja y rosado",
      "Un rebaño de ovejas apretadas, iluminadas por el sol de la tarde",
      "El atardecer encendido reflejado en una laguna, con aves en el agua",
    ],
  },

  expandImage: {
    title: "Un lugar con historia propia",
    cta: "Conocer la torre",
    text: "En el corazón de Corrientes, La Torre del Guayaibí combina naturaleza, tradición y una historia familiar única que se respira en cada rincón.",
    imageAlt:
      "Galería de piedra de La Torre al atardecer, con mesas, macetas y un gran árbol sobre el parque",
  },

  eventsTeaser: {
    titleLine1: "Eventos",
    titleLine2: "en La Torre.",
    text: "Celebraciones íntimas, encuentros y experiencias que encuentran en La Torre un escenario único.",
    cta: "Descubrir eventos",
    imageAlt1: "Mesa de banquete con candelabros encendidos, flores, frutas, quesos y fiambres",
    imageAlt2: "Muelle sobre la laguna al atardecer con cortinas de lino blanco movidas por el viento",
  },

  // Home: eventos con el estilo nuevo (EventsShowcase). Las propuestas de
  // la lista salen de eventos.services; las fotos, de eventsTeaser.
  eventsShowcase: {
    eyebrow: "Eventos",
    title: "Encuentros a cielo abierto.",
    text: "Celebraciones íntimas, reuniones de trabajo y encuentros que encuentran en La Torre un escenario único, lejos del ritmo de todos los días.",
    cta: "Descubrir eventos",
  },

  // Home: reseñas del libro de visitas (Reviews), debajo de eventos.
  // Se pueden agregar o quitar items; detail es opcional.
  reviews: {
    eyebrow: "Lo que dicen nuestros huéspedes",
    items: [
      {
        quote: "Me sentí como en casa en este “Casco Guayaibí” con esperanza de encontrar un refugio en el nuevo mundo! Con infinito agradecimiento!",
        name: "Katja Alemann",
        detail: "Libro de visitas",
      },
      {
        quote: "Querida Marisa y Enrique: Quedo eternamente agradecido por vuestra generosa hospitalidad en este lugar tan mágico, lleno de amor, poesía, historias y trabajo, mucho trabajo. Mis mejores deseos para esta linda familia que es la Torre del Guayaibí.",
        name: "Carlos Portaluppi",
        detail: "Libro de visitas",
      },
      {
        quote: "Hubo una vez un sueño, que tras muchos años de trabajo se plasmó en este romántico estar de piedra, linos y madera. Sigan soñando. Guarden un fuego en sus corazones.",
        name: "Francis Mallmann",
        detail: "Libro de visitas",
      },
      {
        quote: "Qué castillo inolvidable!!! Cortos fueron los momentos pero intensos y hermosos. Buena gente, buen gusto, buena madera. Gracias por hacerme sonreír. Lo necesitaba.",
        name: "Fabiana Cantilo",
        detail: "Libro de visitas",
      },
      {
        quote: "¡Qué difícil reseñar la fascinación que despierta la Torre del Guayaibí! Qué mencionar primero: el espectáculo del sol cayendo sobre la piscina, el frescor de las galerías en la tarde, acunado por las cigarras… la belleza y la elegancia de sus habitaciones, los atardeceres largos de rojo… la exquisitez de las comidas… ¡la biblioteca de Alejandría en lo alto!… Tal vez aquello que perdure más tiempo en la memoria de quien pase por aquí es la calidez de sus dueños: Marisa y Enrique y sus hijos, entrañables. Gracias por tanto, hasta muy pronto.",
        name: "Esther Goris",
        detail: "Libro de visitas",
      },
      {
        quote: "No sé por dónde empezar. Al despertar pensaba que todo fue un sueño. No sé decir otra cosa que gracias: por la generosidad, la belleza, el cariño, el tiempo y el espacio del que nos hicisteis partícipes. Sólo me atrevo a añadir nuestra voluntad de poder corresponderos. Jamás olvidaremos vuestra casa ni a vosotros. ¡Gracias!",
        name: "José Sacristán",
        detail: "Libro de visitas",
      },
    ],
    prev: "Reseña anterior",
    next: "Reseña siguiente",
    slideLabel: "Reseña {n} de {total}",
  },

  reservas: {
    // Bloque verde de arriba. Entre *asteriscos*: palabras destacadas (en Italiana van rectas).
    benefitsTitle: "Una estadía con *todo lo esencial.*",
    benefits: {
      rooms: {
        title: "Habitaciones amplias",
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
    contactTitle: "¿Preferís hablar directo?",
    contactText: "Escribinos y te respondemos personalmente.",
    whatsappButton: "WhatsApp",
    emailButton: "Correo",
    whatsappGreeting: "Hola! Quisiera hacer una consulta.",
    // Título chico de arriba (con línea); foto fija y columna del formulario
    eyebrow: "Consultas",
    titleLine1: "Tu próxima",
    titleLine2: "estadía *te espera.*",
    imageAlt: "Atardecer dorado sobre la pileta, con eucaliptos recortados contra el sol, reposeras y el campo abierto",
    formTitle: "Formulario de consulta",
    intro: "Contanos cuándo querés venir y nos pondremos en contacto a la brevedad para ayudarte a *organizar tu estadía.*",
  },

  form: {
    step1: "Elegí tus fechas",
    calendarHint: "Tocá un día para la llegada y otro para la salida.",
    checkIn: "Llegada",
    checkOut: "Salida",
    nights: "Noches",
    step2: "Huéspedes y habitaciones",
    guests: "Huéspedes",
    guestsHint: "Adultos y niños",
    rooms: "Habitaciones",
    roomsHint: "Hasta 6 en La Torre",
    decrease: "Restar",
    increase: "Sumar",
    step3: "Tus datos",
    name: "Nombre y apellido",
    namePlaceholder: "",
    country: "País de residencia",
    otherCountry: "Otro",
    email: "Correo electrónico",
    emailPlaceholder: "",
    phone: "Teléfono / WhatsApp",
    phonePlaceholder: "",
    dialCode: "Código de país",
    message: "¿Algo que quieras contarnos?",
    optional: "(opcional)",
    messagePlaceholder: "Un aniversario, una dieta especial, la hora de llegada…",
    submit: "Consultar disponibilidad",
    note: "Tu consulta se envía por WhatsApp directamente a nuestro equipo.",
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
