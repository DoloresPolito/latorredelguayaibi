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
      "Una torre de piedra y madera, levantada a mano en medio del campo correntino, por una familia que siempre supo recibir.",
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
      imageAlt: "La torre de piedra con las ventanas encendidas, de noche, entre árboles y bajo un cielo estrellado",
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
    imageAlt: "La biblioteca de la casa: estantes de madera de piso a techo, repletos de libros antiguos",
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
    // Descripción (alt) de cada foto de public/images/entorno/, según el nombre
    // del archivo sin el número. Una foto nueva sin descripción usa imageFallback.
    imageFallback: "Paisaje y rincones de La Torre del Guayaibí",
    images: {
      "pileta-atardecer": "El sol se pone entre los eucaliptos, detrás de la pileta, con el cielo naranja y celeste",
      "torre-caballos": "La torre de piedra y la casa entre árboles, con caballos pastando en el parque",
      "nandu": "Un ñandú en el pasto frente a la casa, bajo un cielo con nubes",
      "muelle-laguna": "El muelle de madera sobre la laguna, con el agua quieta y el cielo celeste",
      "fogon-piedra": "Un fogón en un círculo de piedra, en el campo abierto con una hilera de árboles al fondo",
      "parque-amanecer": "El parque al amanecer, con el sol asomando entre los árboles y sombras largas sobre el pasto",
      "galeria-habitaciones": "La galería de piedra de las habitaciones, rodeada de eucaliptos y pasto verde",
      "arbol-reflejo": "La silueta de un árbol seco reflejada en el agua, con el cielo naranja del atardecer",
      "pileta-torre-reflejo": "La casa y la torre reflejadas en la pileta, con reposeras al borde",
      "arbol-laguna-violeta": "Un árbol en medio de la laguna al atardecer, con el cielo y el agua en tonos violetas",
      "pileta-turquesa": "La pileta turquesa con la torre al fondo, bajo un cielo azul intenso",
      "silueta-atardecer": "Una persona con los brazos abiertos frente a la laguna al atardecer, con aves volando",
      "poste-crepusculo": "Un poste solitario en el agua quieta al anochecer, con el horizonte rosado",
      "muelle-atardecer": "El muelle recortado contra el atardecer rosado, reflejado en la laguna",
      "casa-luz-dorada": "La casa y la torre de piedra iluminadas por la luz dorada del atardecer",
      "galeria-enredadera": "La entrada a la galería de piedra, cubierta de enredaderas",
      "galeria-macetas": "La galería de piedra con techo de madera y macetas con plantas",
      "escalinata-piedra": "Los escalones de piedra que llevan a la galería, con plantas y luz de la tarde",
      "jardin-atardecer": "El jardín al atardecer, con eucaliptos altos y la casa a un costado",
      "galeria-sol-poniente": "El sol poniente entra por la galería, entre las mesas y las columnas",
      "noche-estrellada": "Un árbol caído bajo un cielo de noche lleno de estrellas",
      "torre-noche": "La torre de piedra iluminada de noche, vista desde abajo, con el cielo estrellado",
      "torre-anochecer": "La torre y un árbol iluminados al anochecer",
      "casa-iluminada": "La casa de piedra iluminada de noche, con luces cálidas en las ventanas",
      "fiesta-noche": "Una celebración de noche en el parque, con luces violetas y braseros encendidos",
      "cortinas-muelle": "Cortinas blancas movidas por el viento en el muelle, con el sol bajo sobre el agua",
      "living-biblioteca": "El living con sillones blancos, chimenea y la biblioteca en lo alto",
      "living-chimenea": "El living con la chimenea encendida y grandes ventanales al parque",
      "living-desde-arriba": "El living visto desde arriba, con sillones blancos, mesa de madera y chimenea",
      "living-noche": "El living de noche, con las lámparas encendidas, la chimenea, los sillones blancos y la biblioteca en lo alto",
      "biblioteca-estantes": "Estantes de madera repletos de libros antiguos",
      "biblioteca-lectura": "Libros abiertos sobre una mesa de madera, frente a la biblioteca y una ventana con cortinas",
      "galeria-faroles": "La galería de piedra con mesas, faroles colgantes y el parque de fondo",
      "comedor-mesa-larga": "El comedor con una mesa larga de madera puesta, bajo vigas y una araña de hierro",
      "mesa-desayuno": "La mesa de madera puesta para el desayuno, con tazas e individuales de mimbre",
      "desayuno-ventanales": "El desayuno sobre la mesa, con budines, quesos y masitas, frente a los ventanales",
      "picada-noche": "Una mesa larga de picada con fiambres, quesos y frutas, de noche",
      "habitacion-roja": "Una habitación de paredes rojas con dos camas, mantas tejidas, un espejo dorado y piso de madera",
      "habitacion-petroleo": "Una habitación verde petróleo con cama con dosel blanco, lámparas encendidas y piso de madera",
      "torre-reflejo-dorado": "La torre y la casa con la luz dorada del atardecer, reflejadas en la pileta",
      "canoa-atardecer": "Una canoa con gente sobre la laguna quieta, al atardecer",
      "biblioteca-sol": "Estantes de madera repletos de libros, con el sol de la tarde sobre el piso",
      "almenas-piedra": "Las almenas de piedra de la torre iluminadas por el sol, contra el cielo celeste",
      "habitacion-blanca": "Una habitación con cama con dosel blanco, paredes de piedra y ventanales con cortinas",
      "laguna-pajonales": "Pajonales en la orilla de la laguna, con el cielo rosado del atardecer reflejado en el agua",
      "galeria-atardecer": "La galería de piedra de la casa con la luz del atardecer, el parque y un árbol solo en el campo",
      "muelle-cortinas-sol": "Cortinas blancas en el muelle movidas por el viento, con el sol poniéndose sobre la laguna",
      "carpinchos": "Carpinchos en el pastizal y en el agua de un bañado, con árboles caídos y el cielo nublado",
      "laguna-aves-atardecer": "La laguna al atardecer, con el cielo naranja reflejado en el agua y una hilera de aves",
      "muelle-gente-atardecer": "Gente sobre el muelle de madera al atardecer, con la laguna quieta y el cielo rosado",
      "pileta-chicos-atardecer": "Chicos jugando y saltando a la pileta a contraluz, con el sol poniéndose entre los árboles",
      "cielo-naranja-eucalipto": "Un eucalipto recortado contra el cielo naranja del atardecer, sobre el campo",
      "laguna-camalotes": "La laguna con hojas flotantes en la orilla y el agua azul hasta el horizonte",
      "muelle-luna": "El muelle viejo de madera a contraluz, con el cielo del anochecer y una luna finita",
      "sol-poniente-tranquera": "El sol bajo y rojo detrás de un eucalipto y una tranquera de madera",
      "nubes-atardecer": "Nubes oscuras sobre el horizonte, con el cielo naranja del atardecer y siluetas de árboles",
    } as Record<string, string>,
  },

  // Página Nuestra historia: recorrido horizontal (HistoryScroll).
  historia: {
    hero: {
      title: "Nuestra historia",
      lead: "Una torre de piedra y madera, levantada a mano en medio del campo correntino, por una familia que siempre supo recibir.",
      scroll: "Scroll",
    },
    raices: {
      eyebrow: "Las raíces",
      title: "Puntas del Guayaibí",
      text: "Esta tierra es de la familia Lacour desde mediados del siglo XIX. Idalina Barbosa se casó con Guillermo Lacour, un francés que llegó muy joven a Corrientes, y juntos empezaron a trabajar las cuchillas de “las puntas”. Desde entonces, la estancia pasó de generación en generación.",
    },
    estancia: {
      eyebrow: "La estancia",
      title: "Un campo que sigue vivo",
      text: "Puntas del Guayaibí sigue siendo una estancia ganadera en actividad, entre esteros, montes y pastizales. Por acá pasaron peones, capataces y vecinos que forman parte de la historia del lugar, como Don “Chico” Amarilla y la querida Nené.",
    },
    idea: {
      eyebrow: "La idea",
      title: "Un salón para los amigos",
      text: "Al principio no iba a ser un hotel. Enrique Lacour y Marisa Marroquín querían un salón grande para reunir a los amigos, y una torre donde guardar los libros. La forma la sacaron de un viaje por Inglaterra y Escocia.",
    },
    obra: {
      eyebrow: "La obra",
      title: "Piedra, eucalipto y oficio",
      text: "La obra llevó casi diez años, de 2002 a 2011. La piedra salió de los mismos potreros. Los eucaliptos del campo se derribaron y se trabajaron a hachuela hasta convertirlos en las vigas del salón principal. Un herrero de la zona forjó las arañas y los apliques que diseñó Enrique.",
    },
    torre: {
      eyebrow: "La torre",
      title: "Leer a la altura de los árboles",
      text: "En el tercer piso está la biblioteca: ventanales, paredes cubiertas de libros y una mecedora. Enrique la imaginó para leer a la misma altura que las copas de los eucaliptos.",
    },
    hotel: {
      eyebrow: "De casa a hotel",
      title: "Abrir las puertas",
      text: "En 2012, a partir de la idea de un amigo y del cumpleaños de un tío, la torre empezó a recibir huéspedes. Se sumaron cinco habitaciones, cada una con su color y su carácter, y con una frase célebre grabada en la puerta.",
    },
    hoy: {
      eyebrow: "Hoy",
      title: "Un mundo diferente",
      paragraphs: [
        "Enrique y Marisa siguen atendiendo personalmente. Hay desayunos con chipá recién hecho, té en la galería, un muelle sobre la laguna para ver el atardecer y el canto de los pájaros todo el día.",
        "Es un lugar de otra época, donde el tiempo vuelve a ser tiempo.",
      ],
    },
    closing: {
      quote: "“Habitantes de la torre más abierta y divertida.”",
      author: "Cambá Lacour",
    },
    images: {
      hero: "La torre de piedra y la casa entre árboles, con caballos pastando en el parque",
      tranquera: "La tranquera de madera blanca con el cartel de Puntas del Guayaibí",
      lapachos: "Lapachos en flor junto a los corrales de madera, con el campo abierto detrás",
      paisano: "Retrato de un hombre de campo con gorro de lana y barba canosa",
      pastizal: "Pastizales y montes bajos que se extienden hasta el horizonte",
      idea: "El salón principal con sillones blancos, vigas de madera, araña de hierro y la chimenea encendida",
      obraViga: "Una viga de eucalipto labrada a mano junto a las columnas de piedra, durante la obra",
      obraGaleria: "La galería en construcción: muros de piedra y el techo de vigas todavía sin cubrir",
      obraTorreLejos: "La torre y la casa en obra, vistas desde el campo entre árboles",
      telescopio: "La biblioteca de la torre: estantes de libros, una silla y un telescopio frente a la ventana abierta",
      anteojos: "Unos anteojos sobre un libro abierto, junto a una pila de libros antiguos y la biblioteca de fondo",
      hotel: "Reposeras blancas junto a la pileta, sobre el pasto, con árboles altos y el campo abierto de fondo",
      ellos: "Enrique y Marisa parados en los escalones de piedra, frente a la galería de la casa",
      almenas: "Las almenas de piedra de la torre iluminadas por el sol, contra el cielo celeste",
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
