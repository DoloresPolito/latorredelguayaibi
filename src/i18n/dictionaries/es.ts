// Diccionario base (español). El de inglés tiene que tener exactamente las
// mismas claves: si falta alguna, TypeScript marca el error y el build falla.

export const es = {
  meta: {
    title: "La Torre del Guayaibí",
    notFoundTitle: "Página no encontrada — La Torre del Guayaibí",
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
    entornoTitle: "Entorno — La Torre del Guayaibí",
    entornoDescription:
      "Campo abierto, agua quieta y cielos enormes: el paisaje que rodea La Torre, cerca de los Esteros del Iberá.",
    historiaTitle: "Nuestra historia — La Torre del Guayaibí",
    historiaDescription:
      "Una casa de piedra en el campo correntino, levantada por una familia y abierta a quienes buscan el ritmo del campo.",
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
      contacto: "Contacto",
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
    // Ubicación, chica arriba del nombre en el hero del home
    location: "Mercedes, Corrientes",
    tagline: "Un refugio singular en el corazón del campo correntino.",
    cta: "Descubrir la torre",
    scroll: "Scroll",
    next: "Ir a la siguiente sección",
    imageAlt:
      "La Torre del Guayaibí al atardecer, con la casa de piedra y los eucaliptos reflejados en la pileta",
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
      cardCta: "Consultar",
      beds: {
        twoDoubles: "2 camas dobles",
        threeSingles: "3 camas simples",
      },
      guests: "Hasta {n} huéspedes",
      extraBed: "Cama extra opcional",
    },
    rooms: {
      piedra: { name: "Suite de piedra", imageAlt: "Suite de piedra" },
      espejos: { name: "Suite de los espejos", imageAlt: "Suite de los espejos" },
      triple: { name: "Suite triple", imageAlt: "Suite triple" },
      azul: { name: "Suite azul petróleo", imageAlt: "Suite azul petróleo" },
      verde: { name: "Suite verde", imageAlt: "Suite verde" },
    },
  },

  eventos: {
    hero: {
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

  // Home: resumen de eventos (EventsShowcase), sobre fondo verde.
  eventsShowcase: {
    eyebrow: "Eventos",
    title: "Encuentros a cielo abierto.",
    text: "Celebraciones íntimas, reuniones de trabajo y encuentros que encuentran en La Torre un escenario único, lejos del ritmo de todos los días.",
    cta: "Descubrir eventos",
    imageAlt: "Mesa de banquete con candelabros encendidos, flores, frutas, quesos y fiambres",
  },

  // Home: invitación al entorno (EnvironmentInvite), entre eventos y reseñas.
  environmentInvite: {
    eyebrow: "Entorno",
    title: "Donde el campo se vuelve horizonte.",
    text: "Cielos enormes, agua quieta y la casa de piedra entre eucaliptos. Recorré en fotos el paisaje que rodea La Torre.",
    cta: "Ver el entorno",
    // Foto a todo el ancho entre esta invitación y las reseñas
    imageAlt: "La galería de piedra de la casa entre eucaliptos, con el parque verde y el cielo celeste",
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

  // Página Entorno: viaje entre fotos (EnvironmentDepth), texto, columnas de
  // fotos que se deslizan (EnvironmentColumns) y cierre con WhatsApp.
  entorno: {
    depth: {
      eyebrow: "Entorno",
      titleLine1: "Donde el campo",
      titleLine2: "se vuelve horizonte.",
      scroll: "Scroll",
      // Texto sobre la foto que se agranda al final del recorrido
      focusEyebrow: "Al caer el sol",
      focusTitle: "El agua guarda *los últimos colores* del día.",
    },
    quietText: {
      lead: "Alrededor de La Torre, el paisaje marca el ritmo.",
      text: "Cielos enormes, agua quieta, el pasto que cambia de color con las horas y animales que andan sin apuro. En el corazón del campo correntino, cerca de los Esteros del Iberá, todo invita a mirar despacio.",
    },
    columns: {
      eyebrow: "Paisajes",
      title: "Cada hora, *otra luz.*",
    },
    cta: {
      eyebrow: "Vení a verlo",
      title: "El paisaje se disfruta mejor en persona.",
      text: "Escribinos y te ayudamos a organizar tu estadía para vivir el campo a tu ritmo: amaneceres, caminatas, atardeceres sobre el agua y noches de cielo abierto.",
      button: "Consultar por WhatsApp",
      whatsapp: "¡Hola! Quisiera consultar disponibilidad en La Torre del Guayaibí.",
    },
    images: {
      atardecer: "Eucaliptos a contraluz al atardecer, con el sol bajo sobre el campo",
      vacas: "Vacas Hereford pastando en el campo dorado al atardecer",
      juncos: "Juncos y camalotes sobre el agua bajo un cielo rosado",
      ovejas: "Un rebaño de ovejas muy juntas, con la lana iluminada por el sol",
      espejo: "Atardecer naranja reflejado en el agua quieta, con aves a lo lejos",
      casaPileta: "La casa de piedra y la torre entre eucaliptos, reflejadas en la pileta",
      torre: "La torre de piedra y la casa entre árboles, vistas desde la pileta",
      piedra: "Muro de piedra de la torre contra el cielo celeste",
      esteros: "Vegetación de los esteros sobre el agua, con el cielo rosado del atardecer",
      laguna: "Atardecer rosado sobre la laguna: una familia rema en canoa junto al muelle de madera",
      canoa: "Una canoa con tres personas sobre el agua quieta, al caer el sol",
      nandu: "Un ñandú en el pasto frente a la casa, bajo un cielo con nubes",
      arbol: "Un árbol sin hojas reflejado en el agua al atardecer",
      hereford: "Una vaca Hereford mirando de frente, en el pasto al atardecer",
      reflejo: "El cielo del atardecer reflejado en el agua, entre camalotes",
      aves: "Dos aves en el campo abierto, con el cielo celeste de fondo",
      galeria: "La galería de piedra de la casa al atardecer, con árboles y el campo de fondo",
      eucaliptos: "Atardecer dorado sobre la pileta, con reposeras y eucaliptos recortados contra el sol",
      fogon: "Un fogón encendido en un círculo de piedra, con el campo abierto detrás",
      noche: "La torre de piedra iluminada de noche, bajo un cielo estrellado con la Vía Láctea",
    },
  },

  // Página Nuestra historia: recorrido horizontal (HistoryScroll).
  // TEXTOS PROVISORIOS: inventados para armar el diseño, se reemplazan después.
  historia: {
    hero: {
      title: "Nuestra historia",
      scroll: "Scroll",
    },
    intro: {
      eyebrow: "Todo empezó en",
      year: "1970",
      text: "Una casa de piedra levantada a mano en medio del campo correntino, con piedras de la zona y madera de los montes cercanos. Primero fue casa de familia; mucho después, un lugar para recibir a otros.",
    },
    timeline: [
      "Los abuelos llegaron a estas tierras buscando un lugar tranquilo para criar a sus hijos, lejos de la ciudad y cerca del agua.",
      "La torre se terminó en 1978. Desde arriba se veía todo el campo, y se volvió el lugar de reunión al caer el sol.",
      "Los fines de semana la casa se llenaba de amigos, guitarras y fogones que duraban hasta la madrugada.",
      "La cocina siempre fue el corazón de la casa: pan casero, dulces de la quinta y mesas largas para todos.",
    ],
    chapter1: {
      title: "La Torre no nació para ser un hotel.",
      paragraphs: [
        "Durante años fue el refugio de la familia: el lugar al que se volvía en vacaciones, donde se festejaban los cumpleaños y se esperaba la lluvia mirando el campo.",
        "Los amigos que venían de visita empezaron a pedir volver, y después a traer a sus propios amigos. La casa se fue agrandando de a poco, siempre con la misma piedra.",
        "Sin buscarlo, La Torre se volvió un lugar del que se hablaba en voz baja: un secreto del campo correntino.",
      ],
    },
    aside: {
      title: "Cada habitación se pensó para mirar hacia afuera: el campo, el agua, el cielo enorme de Corrientes.",
      caption: "Los muebles, los libros y los objetos de la casa llegaron con la familia y se quedaron.",
    },
    quote1: {
      title: "Entendimos que quienes llegaban querían vivir el campo de cerca.",
      text: "No buscaban lujo, sino tiempo: caminar sin apuro, comer bien, quedarse en silencio frente al agua al atardecer.",
    },
    chapter2: {
      title: "Abrir las puertas fue la manera de compartirlo.",
      paragraphs: [
        "Con los años, la casa se transformó en un pequeño hotel de cinco suites, sin perder lo que la hacía especial: el trato de familia y el ritmo del campo.",
        "Huéspedes de todo el mundo llegaron atraídos por los Esteros del Iberá, y volvieron por la casa, las comidas y las charlas de sobremesa.",
      ],
      note: "Algunos de ellos todavía vuelven cada año.",
    },
    quote2: {
      title: "La música y las tradiciones del litoral son parte de la casa.",
      paragraphs: [
        "Chamamé en la galería, asados al fuego lento y noches largas bajo las estrellas: costumbres que se mantienen desde el principio.",
        "Cada visita es también una forma de conocer la cultura correntina desde adentro.",
      ],
    },
    chapter3: {
      note: "Hoy la casa sigue en manos de la misma familia.",
      title: "Cincuenta años después, La Torre sigue siendo, antes que nada, un hogar.",
      paragraphs: [
        "Se renovaron las habitaciones, se sumó la pileta y se abrieron nuevos rincones para descansar, pero la piedra, los árboles y la forma de recibir son las mismas.",
        "Quien llega se encuentra con una casa viva, con historias en cada pared.",
      ],
    },
    closing: {
      text: "Lo que atrae a la gente es la mezcla justa entre lo simple y lo cuidado: una casa de piedra, buena comida, el silencio del campo y la sensación de estar en un lugar que no se parece a ningún otro.",
      title: "La Torre del Guayaibí sigue siendo un secreto bien guardado en el corazón de Corrientes.",
    },
    next: {
      eyebrow: "Próxima página",
      title: "Habitaciones",
      hint: "Seguí scrolleando",
    },
    images: {
      galeria: "La galería de piedra de la casa al atardecer, con el campo de fondo",
      piedra: "Muro de piedra de la torre contra el cielo",
      atardecer: "Eucaliptos a contraluz al atardecer",
      ovejas: "Un rebaño de ovejas iluminado por el sol",
      fogon: "La parrilla encendida junto a la pared de piedra",
      desayuno: "Mesa de desayuno servida en el comedor de piedra",
      casa: "La casa de piedra y la torre entre eucaliptos, reflejadas en la pileta",
      laguna: "Atardecer rosado sobre la laguna, con una canoa junto al muelle",
      libros: "La biblioteca de la casa, con estantes de madera llenos de libros",
      guitarras: "Músicos tocando chamamé de noche bajo una guirnalda de luces",
      vacas: "Vacas Hereford pastando en el campo dorado",
      juncos: "Juncos y camalotes sobre el agua bajo un cielo rosado",
      musica: "Dos músicos con guitarra y acordeón en el jardín",
      muelle: "Cortinas blancas al viento en el muelle, frente al agua al atardecer",
      canoa: "Una canoa sobre el agua quieta al caer el sol",
      mesa: "Una mesa larga servida con velas, frutas y quesos",
      suite: "Una suite con cama con dosel, paredes de piedra y piso de madera",
    },
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
    // Suite elegida al llegar desde una habitación (?habitacion=…)
    selectedRoom: "Consultando por",
    removeRoom: "Quitar la habitación elegida",
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
      room: "Habitación",
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

  // Página de error 404 (src/app/[lang]/not-found.tsx)
  notFound: {
    eyebrow: "Error 404",
    title: "Este camino no lleva a ningún lado.",
    text: "La página que buscás no existe o cambió de lugar. Volvé al inicio o seguí recorriendo La Torre.",
    home: "Volver al inicio",
    rooms: "Ver habitaciones",
  },
};

/** Forma que tienen que respetar todos los diccionarios */
export type Dictionary = typeof es;
