export type Lang = "es" | "en";

const es = {
  nav: {
    links: [
      { id: "huariques", label: "Restaurantes Auténticos" },
      { id: "como-funciona", label: "Cómo Funciona" },
      { id: "duenos", label: "Para Restaurantes" },
      { id: "historias", label: "Historias Culinarias" },
      { id: "nosotros", label: "Quiénes Somos" }
    ],
    login: "Iniciar sesión",
    signup: "Crear cuenta",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    langGroup: "Idioma",
    main: "Navegación principal",
    home: "Foodly, ir al inicio"
  },
  hero: {
    h1: "El auténtico sabor tradicional de tu ciudad, directo a tu mesa.",
    sub: "Foodly te muestra los huariques de Lima que tienes a pocas cuadras, sin pautas ni cadenas. Cuéntale a Lía qué se te antoja y llega en minutos.",
    craving: "¿Qué antojo criollo tienes hoy?",
    cravingPh: "Ceviche, anticuchos, chaufa…",
    district: "Distrito gastronómico",
    allDistricts: "Todos los distritos",
    search: "Buscar huarique",
    note: "Sin pautas publicitarias: el orden lo marca la cercanía.",
    radarAria: "Mapa interactivo de ejemplo con restaurantes cercanos",
    you: "Tú",
    cell: "A unos {m} m de ti",
    yourCell: "Tu ubicación",
    count: "{n} huariques",
    countOne: "1 huarique",
    countNone: "Sin huariques por aquí",
    hint: "Toca una zona para ver qué hay cerca",
    live: "Mapa de cercanía"
  },
  marquee: ["Ceviche", "Lomo saltado", "Ají de gallina", "Anticuchos", "Arroz chaufa", "Pan con chicharrón", "Tiradito", "Jugo surtido"],
  why: {
    h2: "¿Por qué descubrir comida con Foodly?",
    lead: "Las apps masivas ordenan por presupuesto de marketing. Foodly ordena por cercanía real y deja que los huariques de barrio también se vean.",
    circle: "Búsqueda tradicional",
    hexes: "Búsqueda Foodly",
    toggleLabel: "Comparar cómo buscamos",
    results: "Restaurantes encontrados",
    legendHuarique: "Huarique",
    legendChain: "Cadena",
    youHere: "Tú",
    circleText: "La búsqueda tradicional usa un círculo. Algunos restaurantes que están muy cerca quedan fuera casi por accidente.",
    hexText: "Foodly divide el mapa en zonas iguales alrededor de ti, así todos los restaurantes a la misma distancia tienen las mismas oportunidades de aparecer.",
    illus: "Ilustración con datos de ejemplo.",
    points: [
      { t: "Cercanía real, no publicidad", d: "Lo que ves primero es lo que está más cerca de ti, no lo que más pagó por aparecer." },
      { t: "Lía entiende tu antojo", d: "Escribe «algo picante y barato cerca» y recibe recomendaciones sin tocar un filtro." },
      { t: "Dueños con voz propia", d: "Pensado para negocios que no pueden pagar comisiones del 25 a 30 % que cobran las apps de delivery." }
    ],
    goalsTitle: "Lo que nos exigimos",
    goals: [
      { n: "< 10 s", d: "para encontrar un huarique relevante" },
      { n: "≤ 2 s", d: "de respuesta del radar en el 95 % de búsquedas" },
      { n: "99 %", d: "de disponibilidad mensual" },
      { n: "< 2 min", d: "para que un dueño actualice su menú" }
    ]
  },
  huariques: {
    h2: "Huariques y Platos Icónicos",
    lead: "Una muestra de lo que vas a encontrar en el radar. Todos los datos son de ejemplo.",
    filters: "Filtrar por categoría",
    cats: { all: "Todos", cevicheria: "Cevicherías", criolla: "Criolla", marina: "Marina", chifa: "Chifa", sangucheria: "Sanguchería", jugos: "Jugos" },
    openNow: "Abierto ahora",
    open: "Abierto",
    closed: "Cerrado",
    featured: "Destacado",
    viewMenu: "Ver carta",
    results: "{n} huariques",
    resultsOne: "1 huarique",
    searching: "Buscando",
    in: "en",
    clear: "Limpiar búsqueda",
    emptyT: "No encontramos huariques con ese antojo.",
    emptyD: "Prueba con otro plato, otro distrito o quita el filtro de abierto ahora.",
    from: "Precio",
    away: "a {d}"
  },
  how: {
    h2: "¿Cómo funciona la experiencia Foodly?",
    lead: "Cuatro pasos entre el antojo y la mesa.",
    steps: [
      { t: "Comparte tu ubicación", d: "Foodly detecta dónde estás y encuentra automáticamente los mejores huariques a tu alrededor." },
      { t: "Explora los restaurantes cercanos", d: "Mira huariques con foto, precio, calificación y si están abiertos en este momento." },
      { t: "Cuéntale a Lía qué se te antoja", d: "Escríbele a Lía como si fuera una amiga y ella te recomienda el lugar perfecto sin que tengas que buscar nada." },
      { t: "Reserva y llega", d: "Pide tu mesa desde el chat y el dueño la confirma. Solo te queda ir a disfrutar." }
    ],
    chatTitle: "Lía, tu guía de huariques",
    chatSub: "Prueba una consulta",
    inputAria: "Consultas de ejemplo para Lía",
    typing: "Lía está escribiendo",
    reset: "Empezar de nuevo",
    empty: "Elige una consulta y mira cómo responde Lía.",
    pending: "Pendiente",
    approved: "Aprobada",
    reservation: "Reserva",
    prompts: [
      { chip: "Algo picante y barato cerca", reply: "Encontré 3 huariques con picante a menos de 600 m. El que mejor calza contigo está abierto ahora:", card: "ají" },
      { chip: "Ceviche tradicional para dos", reply: "Tienes uno muy cerca, con ceviche clásico y buena calificación. Está abierto:", card: "ceviche" },
      { chip: "Reserva para dos a las 8 pm", reply: "Listo, envié tu solicitud al huarique. Te aviso apenas la apruebe.", card: "reserva" }
    ],
    approvedMsg: "¡Reserva aprobada! Te esperan a las 8:00 pm."
  },
  owners: {
    h2: "Para Restaurantes",
    lead: "Tu huarique en el radar, sin soporte técnico.",
    bullets: [
      "Visibilidad automática ante quienes están cerca de tu local.",
      "Carta, precios y fotos desde un formulario simple.",
      "Reservas que llegan solas desde el chat de Lía, listas para aprobar."
    ],
    cta: "Registrar mi huarique",
    panel: "Foodly Admin",
    panelSub: "Prueba el panel con datos de ejemplo",
    status: "Estado del local",
    isOpen: "Abierto",
    isClosed: "Cerrado",
    dish: "Plato estrella",
    dishName: "Lomo saltado",
    price: "Precio (S/)",
    save: "Guardar cambios",
    saved: "Cambios publicados. Los comensales ya ven S/ {p}.",
    invalid: "Ingresa un precio válido mayor a 0.",
    reservations: "Reservas",
    tabs: { pending: "Pendientes", approved: "Aprobadas", rejected: "Rechazadas" },
    approve: "Aprobar reserva",
    reject: "Rechazar",
    people: "personas",
    noRes: "No hay reservas en esta lista.",
    list: [
      { who: "Camila R.", when: "8:00 pm", n: 2, dish: "Lomo saltado" },
      { who: "Diego M.", when: "8:30 pm", n: 4, dish: "Anticuchos" },
      { who: "Lucía P.", when: "9:00 pm", n: 3, dish: "Ají de gallina" }
    ],
    note: "Nota de Lía"
  },
  stories: {
    h2: "Historias Culinarias",
    lead: "Dos lados de la misma mesa. Escenarios ilustrativos de cómo se usa Foodly.",
    items: [
      { who: "Exploradora gastronómica, 18 a 35 años", t: "Mediodía en Lince, 40 minutos libres", d: "Tiene antojo de algo picante y no quiere recorrer el mapa filtrando. Le escribe a Lía, ve tres huariques a pocas cuadras y reserva antes de salir." },
      { who: "Dueña de huarique, 25 a 60 años", t: "Veinte años cocinando sin página web", d: "Con un formulario sube su carta, cambia un precio y marca el local como abierto. Esa tarde llegan comensales del barrio que antes no la encontraban." }
    ]
  },
  about: {
    h2: "¿Quiénes Somos?",
    p1: "Somos FoodNode, un equipo apasionado por la gastronomía limeña que conecta a los mejores huariques del barrio con las personas que quieren comer bien cerca de casa.",
    p2: "Creamos Foodly para que descubrir un buen restaurante sea tan fácil como preguntarle a un amigo. Sin publicidad, sin comisiones abusivas, solo buena comida cerca de ti.",
    mission: "Nuestra Misión",
    missionD: "Ayudarte a encontrar el sabor auténtico de Lima en minutos, poniendo a los pequeños negocios de barrio en el mapa para que los descubras antes de que tengas que cruzar la ciudad.",
    vision: "Nuestra Visión",
    visionD: "Convertirnos en el lugar de referencia para descubrir gastronomía local en Lima, donde cada huarique de barrio tenga las mismas oportunidades que los grandes restaurantes.",
    team: "Las personas detrás de Foodly",
    people: [
      { n: "Sebastián Hernández", r: "Conecta todos los servicios para que la app funcione sin interrupciones" },
      { n: "Sergio Julca", r: "Entrena y mejora a Lía, la asistente inteligente de Foodly" },
      { n: "Jasmin Urrutia", r: "Diseña y construye todo lo que ves en pantalla" },
      { n: "Javier Nikaido", r: "Se asegura de que todo funcione perfecto antes de que lo uses" },
      { n: "Fabricio Vega", r: "Desarrolla las páginas web y nuevas funciones de la plataforma" },
      { n: "Ysaac Villanueva", r: "Optimiza los procesos para que la experiencia sea siempre rápida" }
    ]
  },
  cta: {
    h2: "Tu próximo huarique favorito está a pocas cuadras.",
    p: "Crea tu cuenta y abre el radar, o registra tu local y empieza a recibir comensales.",
    a: "Crear mi cuenta",
    b: "Registrar mi huarique"
  },
  footer: {
    tagline: "Huariques, radar gastronómico y reservas.",
    cols: [
      { t: "Categorías", l: ["Cevicherías", "Criolla", "Chifa", "Sanguchería", "Jugos"] },
      { t: "Negocios", l: ["Para restaurantes", "Registrar huarique", "Panel Foodly Admin"] },
      { t: "Comunidad", l: ["Reseñas", "Favoritos", "Historias culinarias"] },
      { t: "Soporte", l: ["Ayuda", "Contacto", "Términos y condiciones", "Privacidad"] }
    ],
    uni: "Proyecto académico de la UPC: Arquitecturas de Software Emergentes (1ASI0728), Lima, 2026."
  },
  auth: {
    close: "Cerrar",
    registerT: "Crea tu cuenta en Foodly",
    registerSub: "Elige cómo vas a usar Foodly.",
    loginT: "Inicia sesión",
    loginSub: "Bienvenido de vuelta.",
    role: "Quiero usar Foodly como",
    explorer: "Explorador gastronómico",
    owner: "Dueño de huarique",
    name: "Nombre completo",
    email: "Correo electrónico",
    password: "Contraseña",
    passHint: "Mínimo 8 caracteres, con una letra y un número.",
    submitReg: "Crear cuenta",
    submitLogin: "Iniciar sesión",
    toLogin: "¿Ya tienes cuenta? Inicia sesión",
    toRegister: "¿Aún no tienes cuenta? Regístrate",
    errTitle: "Corrige estos datos para continuar:",
    errName: "Escribe tu nombre completo.",
    errEmail: "Escribe un correo válido, por ejemplo nombre@correo.com.",
    errPass: "La contraseña necesita al menos 8 caracteres, una letra y un número.",
    okT: "¡Cuenta creada!",
    okD: "Hola, {n}. Ya puedes explorar Foodly.",
    okLogin: "Sesión iniciada. Bienvenido de vuelta.",
    done: "Listo",
    demo: "Demostración: conecta este formulario al servicio de identidad de Foodly."
  },
  skip: "Saltar al contenido"
};

type Dict = typeof es;

const en: Dict = {
  nav: {
    links: [
      { id: "huariques", label: "Authentic Restaurants" },
      { id: "como-funciona", label: "How It Works" },
      { id: "duenos", label: "For Restaurants" },
      { id: "historias", label: "Food Stories" },
      { id: "nosotros", label: "About Us" }
    ],
    login: "Log in",
    signup: "Sign up",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    langGroup: "Language",
    main: "Main navigation",
    home: "Foodly, go to top"
  },
  hero: {
    h1: "The authentic traditional flavor of your city, straight to your table.",
    sub: "Foodly shows you the huariques of Lima just a few blocks away, with no ads and no chains. Tell Lía what you crave and get there in minutes.",
    craving: "What Peruvian craving do you have today?",
    cravingPh: "Ceviche, anticuchos, chaufa…",
    district: "Food district",
    allDistricts: "All districts",
    search: "Find a huarique",
    note: "No paid placements: closeness decides the order.",
    radarAria: "Interactive sample map with nearby restaurants",
    you: "You",
    cell: "About {m} m from you",
    yourCell: "Your location",
    count: "{n} huariques",
    countOne: "1 huarique",
    countNone: "No huariques here",
    hint: "Tap a zone to see what is nearby",
    live: "Nearby map"
  },
  marquee: ["Ceviche", "Lomo saltado", "Ají de gallina", "Anticuchos", "Arroz chaufa", "Pan con chicharrón", "Tiradito", "Mixed juice"],
  why: {
    h2: "Why discover food with Foodly?",
    lead: "Big apps rank by marketing budget. Foodly ranks by real proximity, so neighborhood huariques get seen too.",
    circle: "Traditional search",
    hexes: "Foodly search",
    toggleLabel: "Compare how we search",
    results: "Restaurants found",
    legendHuarique: "Huarique",
    legendChain: "Chain",
    youHere: "You",
    circleText: "Traditional search uses a circle. Some restaurants that are very close can end up outside almost by accident.",
    hexText: "Foodly divides the map into equal zones around you, so every restaurant at the same distance has an equal chance of showing up.",
    illus: "Illustration with sample data.",
    points: [
      { t: "Real proximity, not advertising", d: "What you see first is what is closest to you, not what paid the most to show up." },
      { t: "Lía understands your craving", d: "Type “something spicy and cheap nearby” and get recommendations without touching a filter." },
      { t: "Owners with their own voice", d: "Built for businesses that cannot afford the 25 to 30% commissions delivery apps charge." }
    ],
    goalsTitle: "What we hold ourselves to",
    goals: [
      { n: "< 10 s", d: "to find a relevant huarique" },
      { n: "≤ 2 s", d: "radar response for 95% of searches" },
      { n: "99%", d: "monthly availability" },
      { n: "< 2 min", d: "for an owner to update their menu" }
    ]
  },
  huariques: {
    h2: "Iconic Huariques and Dishes",
    lead: "A sample of what you will find on the radar. All data shown is sample data.",
    filters: "Filter by category",
    cats: { all: "All", cevicheria: "Cevicherías", criolla: "Criolla", marina: "Seafood", chifa: "Chifa", sangucheria: "Sandwiches", jugos: "Juices" },
    openNow: "Open now",
    open: "Open",
    closed: "Closed",
    featured: "Featured",
    viewMenu: "View menu",
    results: "{n} huariques",
    resultsOne: "1 huarique",
    searching: "Searching",
    in: "in",
    clear: "Clear search",
    emptyT: "We found no huariques for that craving.",
    emptyD: "Try another dish, another district, or remove the open now filter.",
    from: "Price",
    away: "{d} away"
  },
  how: {
    h2: "How does the Foodly experience work?",
    lead: "Four steps between craving and table.",
    steps: [
      { t: "Share your location", d: "Foodly detects where you are and automatically finds the best huariques around you." },
      { t: "Explore nearby restaurants", d: "See huariques with photo, price, rating and whether they are open right now." },
      { t: "Tell Lía what you crave", d: "Message Lía like a friend and she will recommend the perfect spot — no filters needed." },
      { t: "Book and arrive", d: "Request your table from the chat and the owner confirms it. All you need to do is show up and enjoy." }
    ],
    chatTitle: "Lía, your huarique guide",
    chatSub: "Try a request",
    inputAria: "Sample requests for Lía",
    typing: "Lía is typing",
    reset: "Start over",
    empty: "Pick a request and see how Lía answers.",
    pending: "Pending",
    approved: "Approved",
    reservation: "Booking",
    prompts: [
      { chip: "Something spicy and cheap nearby", reply: "I found 3 spicy huariques within 600 m. The best match for you is open right now:", card: "ají" },
      { chip: "Traditional ceviche for two", reply: "There is one very close, with classic ceviche and a great rating. It is open:", card: "ceviche" },
      { chip: "Book a table for two at 8 pm", reply: "Done, I sent your request to the huarique. I will tell you as soon as they approve it.", card: "reserva" }
    ],
    approvedMsg: "Booking approved! They expect you at 8:00 pm."
  },
  owners: {
    h2: "For Restaurants",
    lead: "Your huarique on the radar, no tech support needed.",
    bullets: [
      "Automatic visibility to people near your venue.",
      "Menu, prices and photos from a simple form.",
      "Bookings that arrive on their own from Lía's chat, ready to approve."
    ],
    cta: "Register my huarique",
    panel: "Foodly Admin",
    panelSub: "Try the panel with sample data",
    status: "Venue status",
    isOpen: "Open",
    isClosed: "Closed",
    dish: "Star dish",
    dishName: "Lomo saltado",
    price: "Price (S/)",
    save: "Save changes",
    saved: "Changes published. Diners now see S/ {p}.",
    invalid: "Enter a valid price above 0.",
    reservations: "Bookings",
    tabs: { pending: "Pending", approved: "Approved", rejected: "Rejected" },
    approve: "Approve booking",
    reject: "Reject",
    people: "people",
    noRes: "There are no bookings in this list.",
    list: [
      { who: "Camila R.", when: "8:00 pm", n: 2, dish: "Lomo saltado" },
      { who: "Diego M.", when: "8:30 pm", n: 4, dish: "Anticuchos" },
      { who: "Lucía P.", when: "9:00 pm", n: 3, dish: "Ají de gallina" }
    ],
    note: "Note from Lía"
  },
  stories: {
    h2: "Food Stories",
    lead: "Two sides of the same table. Illustrative scenarios of how Foodly is used.",
    items: [
      { who: "Food explorer, ages 18 to 35", t: "Noon in Lince, 40 free minutes", d: "She craves something spicy and does not want to filter a map. She messages Lía, sees three huariques a few blocks away and books before leaving." },
      { who: "Huarique owner, ages 25 to 60", t: "Twenty years cooking without a website", d: "With a simple form she uploads her menu, changes a price and marks the venue open. That afternoon, neighbors who never found her start arriving." }
    ]
  },
  about: {
    h2: "About Us",
    p1: "We are FoodNode, a team passionate about Lima's food scene, connecting the best neighborhood huariques with people who want to eat well close to home.",
    p2: "We built Foodly so discovering a great restaurant is as easy as asking a friend. No ads, no big commissions — just great food near you.",
    mission: "Our Mission",
    missionD: "Help you find Lima's authentic flavors in minutes, putting neighborhood spots on the map so you discover them before having to cross the city.",
    vision: "Our Vision",
    visionD: "Become the go-to place for discovering local gastronomy in Lima, where every neighborhood huarique has the same opportunities as big restaurants.",
    team: "The people behind Foodly",
    people: [
      { n: "Sebastián Hernández", r: "Keeps all services connected so the app runs without interruptions" },
      { n: "Sergio Julca", r: "Trains and improves Lía, Foodly's smart assistant" },
      { n: "Jasmin Urrutia", r: "Designs and builds everything you see on screen" },
      { n: "Javier Nikaido", r: "Makes sure everything works perfectly before you use it" },
      { n: "Fabricio Vega", r: "Develops the web pages and new platform features" },
      { n: "Ysaac Villanueva", r: "Optimizes processes so the experience is always fast" }
    ]
  },
  cta: {
    h2: "Your next favorite huarique is a few blocks away.",
    p: "Create your account and open the radar, or register your venue and start welcoming diners.",
    a: "Create my account",
    b: "Register my huarique"
  },
  footer: {
    tagline: "Huariques, food radar and bookings.",
    cols: [
      { t: "Categories", l: ["Cevicherías", "Criolla", "Chifa", "Sandwiches", "Juices"] },
      { t: "Business", l: ["For restaurants", "Register a huarique", "Foodly Admin panel"] },
      { t: "Community", l: ["Reviews", "Favorites", "Food stories"] },
      { t: "Support", l: ["Help", "Contact", "Terms and conditions", "Privacy"] }
    ],
    uni: "UPC academic project: Emerging Software Architectures (1ASI0728), Lima, 2026."
  },
  auth: {
    close: "Close",
    registerT: "Create your Foodly account",
    registerSub: "Choose how you will use Foodly.",
    loginT: "Log in",
    loginSub: "Welcome back.",
    role: "I want to use Foodly as",
    explorer: "Food explorer",
    owner: "Huarique owner",
    name: "Full name",
    email: "Email",
    password: "Password",
    passHint: "At least 8 characters, with a letter and a number.",
    submitReg: "Create account",
    submitLogin: "Log in",
    toLogin: "Already have an account? Log in",
    toRegister: "No account yet? Sign up",
    errTitle: "Fix these fields to continue:",
    errName: "Enter your full name.",
    errEmail: "Enter a valid email, for example name@mail.com.",
    errPass: "Password needs at least 8 characters, a letter and a number.",
    okT: "Account created!",
    okD: "Hi, {n}. You can now explore Foodly.",
    okLogin: "Logged in. Welcome back.",
    done: "Done",
    demo: "Demo: connect this form to Foodly's identity service."
  },
  skip: "Skip to content"
};

export const dict: Record<Lang, Dict> = { es, en };
export type { Dict };
