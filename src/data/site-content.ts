import blog1 from "../assets/img/blog-noticia-1.jpg";
import carruselImg1 from "../assets/img/carrusel-img-1.jpeg";
import carruselImg2 from "../assets/img/carrusel-img-2.jpeg";
import cursoAsistenteGerontologico from "../assets/img/curso-1-asistente-gerontologico.jpeg";
import cursoEnfermeriaClinica from "../assets/img/curso-2-enfermeria-clinica-domiciliaria.jpeg";
import cursoAcompanianteTerapeutico from "../assets/img/curso-3-acompaniante-terapeutico.jpeg";
import cursoExtraccionistaLaboratorio from "../assets/img/curso-4-extraccionista-laboratorio-clinico.jpeg";
import cursoKinesiologiaPsicomotriz from "../assets/img/curso-5-kinesionologia-automotriz.jpeg";
import cursoMasajistaProfesional from "../assets/img/curso-6-masajista-profesional.jpeg";
import cursoCamilleroProfesional from "../assets/img/curso-7-camillero-profesional.jpeg";
import cursoAuxiliarFarmacia from "../assets/img/curso-8-auxiliar-en-farmacia.jpeg";
import cursoAuxiliarTerapiaOcupacional from "../assets/img/curso-9-auxiliar-terapia-ocupacional.jpeg";
import cursoEstimulacionTemprana from "../assets/img/curso-10-estimulacion-temprana.jpeg";

export type Curso = {
  id: number;
  titulo: string;
  categoria: "Salud" | "Educación";
  descripcion: string;
  duracion: string;
  inicio: string;
  precio: string;
  modalidad: string;
  cupos: string;
  imagen: string;
  destacado: boolean;
  temario: string[];
  salidaLaboral: string;
};

export const cursos: Curso[] = [
  {
    id: 1,
    titulo: "Asistente Gerontológico",
    categoria: "Salud",
    descripcion:
      "Formación especializada para cuidado de adultos mayores, con matrícula nacional y registro RUAG.",
    duracion: "8 meses",
    inicio: "Consultá fecha de inicio",
    precio: "Consultar precio",
    modalidad: "Presencial · Consultá horarios",
    cupos: "Cupos disponibles",
    imagen: cursoAsistenteGerontologico,
    destacado: true,
    temario: [
      "Cuidado gerontológico en domicilio",
      "Manejo de medicación y procedimientos básicos",
      "Derechos y marco legal de la persona mayor",
      "Comunicaciones con familias y equipos de salud",
    ],
    salidaLaboral: "Geriátricos, internación domiciliaria y equipos de cuidado de adultos mayores.",
  },
  {
    id: 2,
    titulo: "Enfermería Clínica Domiciliaria",
    categoria: "Salud",
    descripcion: "Curso intensivo con 400 horas cátedra para el cuidado profesional en el hogar.",
    duracion: "400 horas cátedra",
    inicio: "Consultá fecha de inicio",
    precio: "Consultar precio",
    modalidad: "Presencial · Intensivo",
    cupos: "Próximamente",
    imagen: cursoEnfermeriaClinica,
    destacado: true,
    temario: [
      "Técnicas de enfermería en domicilio",
      "Control de signos vitales y administración de medicamentos",
      "Bioseguridad y prevención de infecciones",
      "Atención integral del paciente crónico",
    ],
    salidaLaboral: "Clínicas domiciliarias, obras sociales y servicios de enfermería en el hogar.",
  },
  {
    id: 3,
    titulo: "Acompañante Terapéutico",
    categoria: "Salud",
    descripcion:
      "Formación para acompañar procesos de salud mental y desarrollo personal en entornos asistenciales.",
    duracion: "5 meses",
    inicio: "Consultá fecha de inicio",
    precio: "Consultar precio",
    modalidad: "Presencial · Consultá horarios",
    cupos: "Cupos disponibles",
    imagen: cursoAcompanianteTerapeutico,
    destacado: false,
    temario: [
      "Introducción a la psicopatología",
      "Acompañamiento terapéutico individual y grupal",
      "Técnicas de contención y comunicación",
      "Ética y derechos en salud mental",
    ],
    salidaLaboral: "Centros de salud mental, internación domiciliaria y organizaciones sociales.",
  },
  {
    id: 4,
    titulo: "Extraccionista de Laboratorio Clínico",
    categoria: "Salud",
    descripcion:
      "Curso certificado para realizar extracciones de sangre y manejo de muestras según normas de bioseguridad.",
    duracion: "4 meses",
    inicio: "Consultá fecha de inicio",
    precio: "Consultar precio",
    modalidad: "Presencial · Consultá horarios",
    cupos: "Cupos disponibles",
    imagen: cursoExtraccionistaLaboratorio,
    destacado: false,
    temario: [
      "Toma de muestras sanguíneas y preparación de envases",
      "Normas de bioseguridad y esterilización",
      "Etiquetado y trazabilidad de muestras",
      "Atención al paciente y procedimientos pre y post extracción",
    ],
    salidaLaboral:
      "Laboratorios clínicos, centros de diagnóstico y servicios de extracción domiciliaria.",
  },
  {
    id: 5,
    titulo: "Kinesiología Psicomotriz",
    categoria: "Educación",
    descripcion:
      "Tramo en formación para especializarse en rehabilitación psicomotriz y estimulación funcional.",
    duracion: "6 meses",
    inicio: "Consultá fecha de inicio",
    precio: "Consultar precio",
    modalidad: "Presencial · Consultá horarios",
    cupos: "Próximamente",
    imagen: cursoKinesiologiaPsicomotriz,
    destacado: false,
    temario: [
      "Bases de la psicomotricidad",
      "Evaluación del desarrollo motor",
      "Intervenciones en estimulación cognitiva",
      "Rehabilitación en adultos y niños",
    ],
    salidaLaboral:
      "Centros de rehabilitación, instituciones educativas y equipos de salud interdisciplinarios.",
  },
  {
    id: 6,
    titulo: "Masajista Profesional",
    categoria: "Salud",
    descripcion:
      "Capacitación técnica en masajes terapéuticos y relajantes con contenido práctico y postura profesional.",
    duracion: "4 meses",
    inicio: "Consultá fecha de inicio",
    precio: "Consultar precio",
    modalidad: "Presencial · Consultá horarios",
    cupos: "Cupos disponibles",
    imagen: cursoMasajistaProfesional,
    destacado: false,
    temario: [
      "Anatomía aplicada al masaje",
      "Técnicas manuales terapéuticas",
      "Postura y ergonomía profesional",
      "Atención al cliente y protocolos de higiene",
    ],
    salidaLaboral: "Spas, centros de bienestar y servicios de fisioterapia complementaria.",
  },
  {
    id: 7,
    titulo: "Camillero Profesional",
    categoria: "Salud",
    descripcion:
      "Formación orientada a la asistencia en internación hospitalaria y traslado seguro de pacientes.",
    duracion: "3 meses",
    inicio: "Consultá fecha de inicio",
    precio: "Consultar precio",
    modalidad: "Presencial · Consultá horarios",
    cupos: "Cupos disponibles",
    imagen: cursoCamilleroProfesional,
    destacado: false,
    temario: [
      "Técnicas de movilización y traslado",
      "Bioseguridad en el hospital",
      "Comunicación con pacientes y equipo médico",
      "Procedimientos en emergencias y servicios de internación",
    ],
    salidaLaboral: "Hospitales, clínicas y servicios de traslado y Guardia.",
  },
  {
    id: 8,
    titulo: "Auxiliar en Farmacia",
    categoria: "Educación",
    descripcion:
      "Curso para trabajar en farmacias, manejar stock y dispensar productos con responsabilidad.",
    duracion: "4 meses",
    inicio: "Consultá fecha de inicio",
    precio: "Consultar precio",
    modalidad: "Presencial · Consultá horarios",
    cupos: "Cupos disponibles",
    imagen: cursoAuxiliarFarmacia,
    destacado: false,
    temario: [
      "Principios de farmacología básica",
      "Manejo de stock y documentación farmacéutica",
      "Atención al público y dispensación segura",
      "Normas sanitarias y buenas prácticas",
    ],
    salidaLaboral: "Farmacias comunitarias, droguerías y servicios de distribución farmacéutica.",
  },
  {
    id: 9,
    titulo: "Auxiliar en Terapia Ocupacional",
    categoria: "Educación",
    descripcion:
      "Formación en estimulación cognitiva y apoyo en procesos de rehabilitación ocupacional.",
    duracion: "5 meses",
    inicio: "Consultá fecha de inicio",
    precio: "Consultar precio",
    modalidad: "Presencial · Consultá horarios",
    cupos: "Próximamente",
    imagen: cursoAuxiliarTerapiaOcupacional,
    destacado: false,
    temario: [
      "Estimulación cognitiva y actividades funcionales",
      "Adaptaciones del entorno y apoyo ocupacional",
      "Rehabilitación en el hogar",
      "Trabajo interdisciplinario y registro profesional",
    ],
    salidaLaboral: "Centros de rehabilitación, educación especial y servicios domiciliarios.",
  },
  {
    id: 10,
    titulo: "Estimulacion Temprana",
    categoria: "Educación",
    descripcion:
      "Curso para acompañar el desarrollo integral de niños mediante estimulación temprana.",
    duracion: "4 meses",
    inicio: "Consultá fecha de inicio",
    precio: "Consultar precio",
    modalidad: "Presencial · Consultá horarios",
    cupos: "Cupos disponibles",
    imagen: cursoEstimulacionTemprana,
    destacado: false,
    temario: [
      "Desarrollo motor y sensorial",
      "Estimulación del lenguaje y comunicación",
      "Técnicas lúdicas y actividades adaptadas",
      "Trabajo con familias y entornos educativos",
    ],
    salidaLaboral:
      "Instituciones educativas, centros de primera infancia y servicios de intervención temprana.",
  },
];

export const noticias = [
  {
    id: 1,
    fecha: "12 Ago 2026",
    categoria: "Institucional",
    titulo: "Nueva sede de prácticas profesionales en el Hospital Central",
    resumen:
      "Convenio firmado para que los alumnos realicen sus prácticas en una institución de referencia.",
    imagen: blog1,
  },
  {
    id: 2,
    fecha: "28 Jul 2026",
    categoria: "Inscripciones",
    titulo: "Inscripciones abiertas para el ciclo 2027",
    resumen:
      "Abierto el período de pre-inscripción con beneficios por pago anticipado y becas de estudio.",
    imagen: cursoEstimulacionTemprana,
  },
  {
    id: 3,
    fecha: "10 Jul 2026",
    categoria: "Comunidad",
    titulo: "Jornada de capacitación gratuita en RCP básico",
    resumen: "Actividad abierta a la comunidad con certificación incluida. Cupos limitados.",
    imagen: blog1,
  },
];

export const testimonios = [
  {
    id: 1,
    nombre: "María López",
    curso: "Técnico en Enfermería",
    texto:
      "Las prácticas en institución fueron lo que más me sirvió. A los dos meses de recibirme ya estaba trabajando en una clínica.",
    iniciales: "ML",
  },
  {
    id: 2,
    nombre: "Diego Fernández",
    curso: "Primeros Auxilios y RCP",
    texto:
      "Muy claro y práctico. Los simulacros con maniquíes te dan la seguridad de saber qué hacer en una emergencia real.",
    iniciales: "DF",
  },
  {
    id: 3,
    nombre: "Carla Giménez",
    curso: "Administración de Instituciones de Salud",
    texto:
      "Los docentes trabajan en el rubro, así que todo lo que ves se aplica el lunes en tu trabajo. Recomendable al 100%.",
    iniciales: "CG",
  },
];

export const pasos = [
  {
    numero: "01",
    titulo: "Elegís tu curso",
    detalle: "Mirá la oferta, comparás duración, fechas y precio sin vueltas.",
  },
  {
    numero: "02",
    titulo: "Dejás tus datos",
    detalle: "Completás el formulario o nos escribís directo por WhatsApp.",
  },
  {
    numero: "03",
    titulo: "Hablás con un asesor",
    detalle: "Te contamos plan de pagos, requisitos y horarios disponibles.",
  },
  {
    numero: "04",
    titulo: "Empezás a cursar",
    detalle: "Confirmás la vacante y arrancás con material y seguimiento.",
  },
];

export const institucion = {
  historia: [
    "El Instituto Andrad Salud nace de la práctica diaria de Andrad Salud S.R.L. en internación domiciliaria.",
    "Somos una empresa fundada por médicos y especialistas de la salud en el ámbito hospitalario. Al desarrollar nuestra actividad en domicilios, identificamos una problemática recurrente: la falta de formación específica del personal destinado al cuidado en el hogar. Una modalidad que, por sus características, es sustancialmente diferente a la hospitalaria.",
    "Observamos que cuidadores domiciliarios, asistentes gerontológicos y personal de enfermería cumplían un rol esencial, permaneciendo 24 horas junto al paciente, pero en muchos casos sin las herramientas técnicas, legales y humanas necesarias para esa responsabilidad.",
    "Comprendimos que la calidad del servicio depende directamente de quien cuida. Por eso, decidimos crear nuestro propio espacio de formación.",
    "Así nace el Instituto Andrad Salud, a través de su Programa de Asistencia y Educación (P.A.E.). Un programa integral diseñado desde la experiencia del domicilio, orientado a profesionalizar el cuidado con conocimientos en bioseguridad, manejo de emergencias, marco legal y, fundamentalmente, con una sólida formación en ética, respeto, compromiso y humanización.",
    "Hoy, Andrad Salud S.R.L. integra dos pilares indivisibles: el servicio de internación domiciliaria y el instituto de formación, garantizando que cada persona que ingresa a un hogar esté realmente preparada para cuidar.",
  ],
  cierre:
    "Instituto Andrad Salud. Formamos a quienes cuidan, para garantizar la buena calidad de servicio.",
  mision:
    "Brindar formación y capacitación continua de calidad en el área de la salud. Dictamos cursos de formación inicial y actualización profesional para todo el personal vinculado al cuidado de la salud, con contenidos actualizados y el respaldo de un cuerpo docente conformado por profesionales especializados, médicos y licenciados. Extendemos nuestra labor formativa fuera de nuestra sede a través de jornadas, talleres, capacitaciones y congresos a medida para empresas, hospitales, clínicas, institutos geriátricos, cooperativas e instituciones. Trabajamos con un fuerte compromiso con la educación, promoviendo una formación integral que combina el conocimiento técnico-científico con los valores fundamentales del ejercicio profesional: la ética, el respeto, la responsabilidad, el compromiso y la calidad humana. Nuestra misión es jerarquizar el rol del personal de salud y contribuir a un sistema de salud más profesional, más humano y más eficiente.",
  vision:
    "Consolidarnos como una institución educativa de referencia en el área de la salud, con proyección nacional. Proyectamos nuestro crecimiento a través del desarrollo de un modelo de franquicia educativa que nos permita expandir nuestra propuesta académica a diferentes provincias, y avanzar hacia nuestra constitución como Instituto Superior, ampliando y jerarquizando nuestra oferta de formación. Aspiramos a ser reconocidos por la calidad académica, la seriedad institucional y el compromiso con la formación continua de los recursos humanos en salud, contribuyendo al fortalecimiento del sistema de salud en su conjunto.",
  contacto: {
    telefono: "11 4050-9640",
    telefonoHref: "tel:+541140509640",
    whatsapp: "5491140509640",
    whatsappHref: "https://wa.me/5491140509640",
    email: "institutoandradsalud@gmail.com",
    emailHref: "mailto:institutoandradsalud@gmail.com",
    direccion: "Montevideo 184 piso 3A, sede central",
    mapHref: "https://maps.google.com/?q=Montevideo+184,+CABA",
    direccionSecundaria: "Av. Rivadavia 8143 piso 1, zona Floresta",
    mapHrefSecundaria: "https://maps.google.com/?q=Av.+Rivadavia+8143,+Buenos+Aires",
  },
};
