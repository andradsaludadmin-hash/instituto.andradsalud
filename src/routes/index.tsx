import { createFileRoute } from "@tanstack/react-router";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  GraduationCap,
  Stethoscope,
  BookOpen,
  ArrowRight,
  Users,
  Award,
  Building2,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Heart,
  Target,
  Eye,
} from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import carruselImg1 from "../assets/img/carrusel-img-1.jpeg";
import carruselImg2 from "../assets/img/carrusel-img-2.jpeg";
import carruselImg3 from "../assets/img/carrusel-img-3.jpeg";
import logoAndradSalud from "../assets/img/logo-andrad-salud.png";
import { CountUp } from "@/components/site/CountUp";
import { CourseSheet } from "@/components/site/CourseSheet";
import { FloatingWhatsapp } from "@/components/site/FloatingWhatsapp";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Testimonials } from "@/components/site/Testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  cursos as cursosLocales,
  institucion,
  pasos,
  testimonios as testimoniosLocales,
  type Curso,
} from "@/data/site-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Instituto Andrad Salud — Capacitación en Educación y Salud" },
      {
        name: "description",
        content:
          "Cursos presenciales de capacitación en áreas de educación y salud. Certificación profesional, docentes especializados y prácticas en instituciones de referencia.",
      },
      {
        property: "og:title",
        content: "Instituto Andrad Salud — Capacitación en Educación y Salud",
      },
      {
        property: "og:description",
        content:
          "Cursos presenciales de capacitación en áreas de educación y salud. Certificación profesional, docentes especializados y prácticas en instituciones de referencia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const navLinks = [
  { label: "Inicio", href: "#inicio", id: "inicio" },
  { label: "Nosotros", href: "#nosotros", id: "nosotros" },
  { label: "Cursos", href: "#cursos", id: "cursos" },
  { label: "Talleres", href: "#talleres", id: "talleres" },
  { label: "Cómo funciona", href: "#proceso", id: "proceso" },
  { label: "Inscripción", href: "#inscripcion", id: "inscripcion" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
];

type Taller = {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_inscripcion: string;
  imagen: string | null;
};

type WordPressTaller = {
  id: number;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  acf?: {
    fecha_inicio?: string;
    fecha_inscripcion?: string;
  };
  _embedded?: {
    [key: string]: Array<{ source_url?: string }>;
  };
};

type Testimonio = {
  id: number;
  nombre: string;
  curso: string;
  texto: string;
  iniciales: string;
};

type WordPressTestimonio = {
  id: number;
  title?: { rendered?: string };
  acf?: {
    curso?: string;
    texto?: string;
    iniciales?: string;
  };
};

const filtros = ["Todos", "Salud", "Educación"] as const;
const WP_API_BASE = String(import.meta.env["VITE_WP_API_BASE"] ?? "").trim();
const CF7_FORM_ID = String(import.meta.env["VITE_CF7_FORM_ID"] ?? "").trim();

const heroSlides = [
  {
    src: carruselImg1,
    alt: "Grupo de estudiantes de salud en práctica profesional",
  },
  {
    src: carruselImg2,
    alt: "Clase práctica con instructor en sala de salud",
  },
  {
    src: carruselImg3,
    alt: "Aulas modernas con equipo de capacitación en salud",
  },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mb-12", align === "center" ? "text-center" : "text-left")}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");
  const [cursoActivo, setCursoActivo] = useState<Curso | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<string>("");
  const [enviando, setEnviando] = useState(false);
  const [cursos, setCursos] = useState<Curso[]>(cursosLocales);
  const [cursosLoading, setCursosLoading] = useState(false);
  const [cursosError, setCursosError] = useState<string | null>(null);
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [talleresLoading, setTalleresLoading] = useState(false);
  const [talleresError, setTalleresError] = useState<string | null>(null);

  const [testimoniosState, setTestimoniosState] = useState<Testimonio[]>(testimoniosLocales);
  const [testimoniosError, setTestimoniosError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const sectionIds = useMemo(() => navLinks.map((l) => l.id), []);
  const active = useActiveSection(sectionIds);

  const cursosFiltrados = useMemo(
    () => (filtro === "Todos" ? cursos : cursos.filter((c) => c.categoria === filtro)),
    [filtro, cursos],
  );

  // Funciones auxiliares
  const stripHtml = (value: string) =>
    value
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const decodeHtmlEntities = (text: string) => {
    if (!text) return "";
    return text.replace(/&#([0-9]+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
  };

  const parseList = (value?: string[] | string) => {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (!value) return [];
    return value
      .split(/\r?\n|;/)
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const normalizeCategoria = (value?: string): Curso["categoria"] =>
    value?.toLowerCase().includes("educ") ? "Educación" : "Salud";

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!WP_API_BASE) {
      setCursosError(
        "No está configurada la URL de WordPress en VITE_WP_API_BASE. Usando cursos locales de respaldo.",
      );
      return;
    }

    let cancelled = false;

    const fetchCursos = async () => {
      setCursosLoading(true);
      setCursosError(null);

      try {
        const response = await fetch(
          `${WP_API_BASE.replace(/\/$/, "")}/wp-json/wp/v2/curso?_embed`,
        );
        if (!response.ok) throw new Error("Error al obtener cursos desde WordPress.");

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("La respuesta de cursos no es válida.");

        type WordPressCurso = {
          id: number;
          title?: { rendered?: string };
          excerpt?: { rendered?: string };
          content?: { rendered?: string };
          acf?: {
            categoria?: string;
            duracion?: string;
            precio?: string;
            fecha_inicio?: string;
            estado?: string;
            modalidad?: string;
            matricula?: string;
            destacado?: boolean | number | string;
            temario?: string[] | string;
            salida_laboral?: string;
          };
          _embedded?: {
            [key: string]: Array<{ source_url?: string }>;
          };
          featured_image_url?: string;
        };

        const mappedCursos: Curso[] = data.map((curso: WordPressCurso) => ({
          id: curso.id,
          titulo: stripHtml(curso.title?.rendered ?? "") || `Curso ${curso.id}`,
          categoria: normalizeCategoria(curso.acf?.categoria),
          descripcion:
            stripHtml(curso.excerpt?.rendered ?? curso.content?.rendered ?? "") ||
            "Descripción no disponible.",
          duracion: curso.acf?.duracion || "Consultar duración",
          inicio: curso.acf?.fecha_inicio || "Consultar fecha de inicio",
          precio: curso.acf?.precio || "Consultar precio",
          modalidad:
            curso.acf?.modalidad ||
            (curso.acf?.matricula ? `Matrícula: ${curso.acf.matricula}` : "Presencial"),
          cupos: curso.acf?.estado || "Consultar cupos",
          imagen:
            curso._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            curso.featured_image_url ||
            carruselImg1,
          destacado:
            curso.acf?.destacado === true ||
            curso.acf?.destacado === 1 ||
            curso.acf?.destacado === "1" ||
            curso.acf?.destacado === "true",
          temario: parseList(curso.acf?.temario),
          salidaLaboral: curso.acf?.salida_laboral ?? "",
        }));

        if (!cancelled) setCursos(mappedCursos);
      } catch (error) {
        if (!cancelled) {
          setCursosError(
            error instanceof Error ? error.message : "Error al cargar cursos desde WordPress.",
          );
        }
      } finally {
        if (!cancelled) setCursosLoading(false);
      }
    };

    fetchCursos();
    return () => {
      cancelled = true;
    };
  }, []);

  // Cargar talleres desde WordPress
  useEffect(() => {
    if (!WP_API_BASE) return;
    let cancelled = false;
    setTalleresLoading(true);

    fetch(`${WP_API_BASE.replace(/\/$/, "")}/wp-json/wp/v2/taller?_embed`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener talleres.");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          const mapped = (data as WordPressTaller[]).map((taller) => ({
            id: taller.id,
            titulo: decodeHtmlEntities(stripHtml(taller.title?.rendered || "Taller sin título")),
            descripcion: decodeHtmlEntities(stripHtml(taller.excerpt?.rendered || "")),
            fecha_inicio: taller.acf?.fecha_inicio || "A programar",
            fecha_inscripcion: taller.acf?.fecha_inscripcion || "A programar",
            imagen: taller._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
          }));
          setTalleres(mapped);
          setTalleresLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setTalleresError(err.message);
          setTalleresLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Cargar testimonios desde WordPress (CPT "testimonio").
  // Si WP no está configurado o falla, se conserva el listado local
  // (testimoniosLocales) ya confirmado como contenido real del cliente.
  useEffect(() => {
    if (!WP_API_BASE) return;
    let cancelled = false;

    fetch(`${WP_API_BASE.replace(/\/$/, "")}/wp-json/wp/v2/testimonio`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener testimonios.");
        return res.json();
      })
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          const mapped = (data as WordPressTestimonio[]).map((testimonio) => {
            const nombre = decodeHtmlEntities(stripHtml(testimonio.title?.rendered || "Alumno/a"));
            return {
              id: testimonio.id,
              nombre,
              curso: testimonio.acf?.curso || "",
              texto: testimonio.acf?.texto || "",
              iniciales:
                testimonio.acf?.iniciales ||
                nombre
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase(),
            };
          });
          setTestimoniosState(mapped);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(err);
          setTestimoniosError(err instanceof Error ? err.message : "Error al cargar testimonios.");
          // Se conserva testimoniosLocales, ya cargado como estado inicial.
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const abrirDetalle = (curso: Curso) => {
    setCursoActivo(curso);
    setSheetOpen(true);
  };

  const irAInscripcion = (curso?: Curso) => {
    if (curso) setCursoSeleccionado(String(curso.id));
    setSheetOpen(false);
    setMobileMenuOpen(false);
    requestAnimationFrame(() => {
      document
        .getElementById("inscripcion")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // ============================================================
  // 🔥 CORRECCIÓN DEFINITIVA: FormData + campos obligatorios
  // ============================================================
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEnviando(true);
    setFormError(null);
    setFormSuccess(null);

    const nombre = (document.getElementById("nombre") as HTMLInputElement)?.value || "";
    const email = (document.getElementById("email") as HTMLInputElement)?.value || "";
    const telefono = (document.getElementById("telefono") as HTMLInputElement)?.value || "";
    const mensaje = (document.getElementById("mensaje") as HTMLTextAreaElement)?.value || "";
    const selectedCourse =
      cursos.find((curso) => String(curso.id) === cursoSeleccionado)?.titulo ?? "";

    try {
      // Usar FormData (multipart/form-data) - el formato que CF7 espera
      const formData = new FormData();
      formData.append("your-name", nombre);
      formData.append("your-email", email);
      formData.append("your-phone", telefono);
      formData.append("your-course", selectedCourse);
      formData.append("your-message", mensaje);

      // Campos obligatorios para que CF7 valide la petición
      formData.append("_wpcf7", CF7_FORM_ID);
      formData.append("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);
      formData.append("_wpcf7_version", "6.1.6"); // versión de tu CF7 (la que tienes instalada)

      const response = await fetch(
        `${WP_API_BASE.replace(/\/$/, "")}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
        {
          method: "POST",
          // NO incluir 'Content-Type' - el navegador lo establece con el boundary correcto
          body: formData,
        },
      );

      const data = await response.json();

      if (data.status === "mail_sent") {
        // ✅ Usamos formRef en lugar de event.currentTarget
        formRef.current?.reset();
        setCursoSeleccionado("");
        setFormSuccess(
          "Inscripción enviada. Ariel recibirá el aviso y el alumno recibirá la confirmación por email.",
        );
        toast.success("¡Formulario enviado!");
      } else {
        throw new Error(data.message || "Error al enviar el formulario.");
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Error al enviar el formulario.");
      toast.error("No se pudo enviar el formulario.");
    } finally {
      setEnviando(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10";

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <FloatingWhatsapp />

      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>

      {/* Barra superior */}
      <div className="hidden bg-navy text-primary-foreground md:block">
        <div className="container-tight flex h-9 items-center justify-between text-xs">
          <span className="flex items-center gap-2 text-primary-foreground/80">
            <Sparkles className="h-3.5 w-3.5" />
            Inscripciones abiertas ciclo 2027 — becas y pago anticipado
          </span>
          <div className="flex items-center gap-5 text-primary-foreground/80">
            <a
              href={institucion.contacto.telefonoHref}
              className="flex items-center gap-1.5 hover:text-primary-foreground"
            >
              <Phone className="h-3.5 w-3.5" /> {institucion.contacto.telefono}
            </a>
            <a
              href={institucion.contacto.emailHref}
              className="flex items-center gap-1.5 hover:text-primary-foreground"
            >
              <Mail className="h-3.5 w-3.5" /> {institucion.contacto.email}
            </a>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="container-tight flex h-16 items-center justify-between gap-4">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="flex items-center">
              <img
                src={logoAndradSalud}
                alt="Andrad Salud — Medicina Domiciliaria"
                className="h-12 w-auto object-contain sm:h-14"
              />
            </div>
            <span className="hidden text-xs font-medium uppercase tracking-wider text-muted-foreground lg:inline">
              Instituto de capacitación
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active === link.id
                    ? "text-primary"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-primary transition-transform duration-300",
                    active === link.id ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => irAInscripcion()}
              className="hidden items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md sm:inline-flex"
            >
              Inscribirme
            </button>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="container-tight flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    active === link.id
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-muted",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => irAInscripcion()}
                className="mt-3 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Inscribirme
              </button>
              <a
                href={institucion.contacto.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-pale/60 via-background to-background" />
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-sky/20 blur-3xl"
        />
        <div className="container-tight grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <Reveal className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-1.5 backdrop-blur">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Certificación reconocida
              </span>
            </div>
            <h1 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Formamos a quienes cuidan en <span className="text-primary">salud</span> y{" "}
              <span className="text-primary">educación</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate">
              Nace de la práctica diaria de Andrad Salud S.R.L. en internación domiciliaria. A
              través del Programa de Asistencia y Educación (P.A.E.) capacitamos al personal de
              salud con cursos presenciales, contenidos actualizados y docentes que son médicos y
              especialistas.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => irAInscripcion()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              >
                Quiero inscribirme
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#cursos"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-all hover:bg-muted"
              >
                Ver los {cursos.length} cursos
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {[
                { to: 2, suffix: "", label: "Pilares integrados" },
                { to: 4, suffix: "", label: "Cursos presenciales" },
                { to: 2, suffix: "", label: "Áreas de formación" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <CountUp
                    to={stat.to}
                    suffix={stat.suffix}
                    className="font-heading text-2xl font-bold text-foreground sm:text-3xl"
                  />
                  <span className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative overflow-visible rounded-3xl shadow-2xl shadow-primary/15">
              <Carousel opts={{ loop: true, align: "center", containScroll: "trimSnaps" }}>
                <CarouselContent className="flex gap-4 px-4 py-4">
                  {heroSlides.map((slide) => (
                    <CarouselItem
                      key={slide.alt}
                      className="min-w-[85%] shrink-0 overflow-hidden rounded-3xl"
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        width={1200}
                        height={912}
                        className="h-full w-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 right-auto z-20 bg-white/95 border border-border text-slate-900 shadow-lg shadow-slate-900/10" />
                <CarouselNext className="right-4 left-auto z-20 bg-white/95 border border-border text-slate-900 shadow-lg shadow-slate-900/10" />
              </Carousel>
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/45 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Clases presenciales</p>
                  <p className="text-xs text-muted-foreground">Prácticas en instituciones</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 -top-5 hidden rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Certificado oficial</p>
                  <p className="text-xs text-muted-foreground">Al finalizar cada curso</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Áreas */}
      <section className="border-y border-border bg-background">
        <div className="container-tight grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Stethoscope,
              titulo: "Área Salud",
              texto: "Enfermería, primeros auxilios, RCP y gestión de servicios de salud.",
            },
            {
              icon: GraduationCap,
              titulo: "Área Educación",
              texto: "Formación docente, pedagogía aplicada y diseño de programas educativos.",
            },
            {
              icon: Building2,
              titulo: "Prácticas profesionales",
              texto: "Convenios con instituciones de referencia para vivir la realidad laboral.",
            },
          ].map((item, i) => (
            <Reveal key={item.titulo} delay={i * 100}>
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-transparent p-4 transition-all hover:border-border hover:bg-muted/40">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {item.titulo}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.texto}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="section-padding bg-sky-pale/30">
        <div className="container-tight">
          <Reveal>
            <SectionHeading
              eyebrow="Quiénes somos"
              title="Historia, misión y visión"
              description="Conocé por qué nació el Instituto Andrad Salud y hacia dónde apuntamos."
            />
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Nuestra historia
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  {institucion.historia.map((parrafo) => (
                    <p key={parrafo.slice(0, 24)}>{parrafo}</p>
                  ))}
                </div>
                <p className="mt-6 text-sm font-semibold italic text-primary">
                  {institucion.cierre}
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col gap-8">
              <Reveal delay={100}>
                <div className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">Misión</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {institucion.mision}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">Visión</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {institucion.vision}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Heart className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-foreground">
                        Valores que nos guían
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Ética, respeto, responsabilidad, compromiso y calidad humana. Formamos
                        profesionales que cuidan personas, no solo pacientes.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section id="cursos" className="section-padding bg-background">
        <div className="container-tight">
          <Reveal>
            <SectionHeading
              eyebrow="Oferta académica"
              title="Cursos presenciales destacados"
              description="Capacitaciones con salida laboral, certificación y acompañamiento durante todo el proceso. Tocá un curso para ver el temario completo."
            />
          </Reveal>

          <Reveal className="mb-8 flex justify-center">
            <div
              role="tablist"
              aria-label="Filtrar cursos por área"
              className="inline-flex rounded-full border border-border bg-muted/50 p-1"
            >
              {filtros.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filtro === f}
                  onClick={() => setFiltro(f)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-semibold transition-all",
                    filtro === f
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          {cursosLoading && (
            <div className="rounded-3xl border border-border bg-muted/50 p-8 text-center text-sm text-muted-foreground">
              Cargando cursos desde WordPress...
            </div>
          )}

          {cursosError && (
            <div className="rounded-3xl border border-destructive bg-destructive/10 p-6 text-sm text-destructive">
              {cursosError}
            </div>
          )}

          {cursosFiltrados.length === 0 && !cursosLoading && (
            <div className="rounded-3xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
              No hay cursos disponibles en este momento. Revisá la configuración de WordPress o
              agregá cursos en el panel de administración.
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cursosFiltrados.map((curso, i) => (
              <Reveal key={curso.id} delay={i * 80} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                  <button
                    type="button"
                    onClick={() => abrirDetalle(curso)}
                    className="relative aspect-[4/3] overflow-hidden text-left"
                    aria-label={`Ver detalle de ${curso.titulo}`}
                  >
                    <img
                      src={curso.imagen}
                      alt={curso.titulo}
                      width={944}
                      height={704}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                      {curso.categoria}
                    </span>
                    {curso.destacado && (
                      <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Más elegido
                      </span>
                    )}
                  </button>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-lg font-bold leading-snug text-foreground">
                      {curso.titulo}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {curso.descripcion}
                    </p>
                    <div className="mt-4 space-y-2 border-t border-border pt-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <span>Duración: {curso.duracion}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        <span>Inicio: {curso.inicio}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="font-heading text-base font-bold text-primary">
                        {curso.precio}
                      </span>
                      <button
                        type="button"
                        onClick={() => abrirDetalle(curso)}
                        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                      >
                        Ver detalle
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Talleres */}
      <section id="talleres" className="section-padding bg-sky-pale/30">
        <div className="container-tight">
          <Reveal>
            <SectionHeading
              eyebrow="Capacitación intensiva"
              title="Talleres prácticos"
              description="Jornadas de formación de 1 día, ideales para actualizar conocimientos y adquirir nuevas habilidades en áreas clave de la salud."
            />
          </Reveal>

          {talleresLoading && (
            <div className="rounded-3xl border border-border bg-muted/50 p-8 text-center text-sm text-muted-foreground">
              Cargando talleres...
            </div>
          )}

          {talleresError && (
            <div className="rounded-3xl border border-destructive bg-destructive/10 p-6 text-sm text-destructive">
              {talleresError}
            </div>
          )}

          {talleres.length === 0 && !talleresLoading && (
            <div className="rounded-3xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
              No hay talleres disponibles en este momento.
            </div>
          )}

          {talleres.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {talleres.map((taller, i) => (
                <Reveal key={taller.id} delay={i * 60} className="h-full">
                  <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                    {taller.imagen && (
                      <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
                        <img
                          src={taller.imagen}
                          alt={taller.titulo}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {taller.titulo}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {taller.descripcion}
                    </p>
                    <div className="mt-4 space-y-1 border-t border-border pt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        <span>Inicio: {taller.fecha_inicio}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <span>Inscripción: {taller.fecha_inscripcion}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => irAInscripcion()}
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Inscribirme al taller
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="section-padding bg-navy text-primary-foreground">
        <div className="container-tight">
          <Reveal className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">
              Cómo funciona
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              De la consulta al aula en 4 pasos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/70">
              Sin trámites eternos ni vueltas: te acompañamos desde la primera consulta hasta el
              primer día de clase.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pasos.map((paso, i) => (
              <Reveal key={paso.numero} delay={i * 100}>
                <div className="relative h-full rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 transition-colors hover:border-primary-foreground/25">
                  <span className="font-heading text-4xl font-extrabold text-primary-foreground/20">
                    {paso.numero}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-semibold">{paso.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                    {paso.detalle}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <Reveal>
            <SectionHeading
              eyebrow="Egresados"
              title="Lo que dicen nuestros alumnos"
              description="Historias reales de personas que se capacitaron con nosotros y hoy trabajan en el sector."
            />
          </Reveal>
          <Reveal delay={100}>
            <Testimonials testimonios={testimoniosState} />
          </Reveal>
        </div>
      </section>

      {/* Inscripción */}
      <section id="inscripcion" className="section-padding bg-sky-pale/30">
        <div className="container-tight">
          <Reveal>
            <div className="mx-auto grid max-w-5xl gap-10 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-10 lg:grid-cols-2 lg:p-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                  Reservá tu lugar
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  Inscripción
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Completá el formulario y un asesor se pone en contacto para confirmar tu vacante,
                  resolver dudas y facilitarte el proceso de pago.
                </p>

                <ul className="mt-8 space-y-4">
                  {[
                    "Respuesta dentro de las 24 hs hábiles.",
                    "Asesoramiento personalizado por WhatsApp o teléfono.",
                    "Planes de pago y becas disponibles.",
                  ].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <span className="text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={institucion.contacto.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Prefiero escribir por WhatsApp
                </a>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="text-sm font-semibold text-foreground">
                      Nombre completo <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="nombre"
                      name="your-name"
                      type="text"
                      required
                      placeholder="Ej: María López"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="your-email"
                      type="email"
                      required
                      placeholder="maria@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="telefono" className="text-sm font-semibold text-foreground">
                      Teléfono <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="telefono"
                      name="your-phone"
                      type="tel"
                      required
                      placeholder="+54 11 1234 5678"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="curso" className="text-sm font-semibold text-foreground">
                      Curso de interés <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="curso"
                      name="course-id"
                      required
                      value={cursoSeleccionado}
                      onChange={(e) => setCursoSeleccionado(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Seleccioná un curso</option>
                      {cursos.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.titulo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="mensaje" className="text-sm font-semibold text-foreground">
                    Mensaje <span className="font-normal text-muted-foreground">(opcional)</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="your-message"
                    rows={4}
                    placeholder="Contanos si tenés alguna duda o consulta particular..."
                    className={cn(inputClass, "resize-y")}
                  />
                </div>

                {(formError || formSuccess) && (
                  <div
                    className={cn(
                      "rounded-3xl border px-4 py-3 text-sm shadow-sm sm:px-5",
                      formError
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700",
                    )}
                  >
                    {formError ? formError : formSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={enviando}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {enviando ? "Enviando..." : "Enviar solicitud"}
                  {!enviando && <ArrowRight className="h-4 w-4" />}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Tus datos se envían al equipo de admisiones del Instituto Andrad Salud.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="section-padding bg-background">
        <div className="container-tight">
          <Reveal>
            <SectionHeading
              eyebrow="Estamos para ayudarte"
              title="Contacto"
              description="Escribinos por el canal que prefieras y te respondemos a la brevedad."
            />
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MessageCircle,
                titulo: "WhatsApp",
                texto: "Respuesta rápida de lunes a viernes de 9 a 18 hs.",
                valor: `+54 9 ${institucion.contacto.telefono}`,
                href: institucion.contacto.whatsappHref,
                externo: true,
              },
              {
                icon: Phone,
                titulo: "Teléfono",
                texto: "Llamadas directas para consultas e inscripciones.",
                valor: institucion.contacto.telefono,
                href: institucion.contacto.telefonoHref,
                externo: false,
              },
              {
                icon: MapPin,
                titulo: "Sede central",
                texto: `${institucion.contacto.direccion}.`,
                valor: "Cómo llegar",
                href: institucion.contacto.mapHref,
                externo: true,
              },
              {
                icon: MapPin,
                titulo: "Segunda sede",
                texto: `${institucion.contacto.direccionSecundaria}.`,
                valor: "Cómo llegar",
                href: institucion.contacto.mapHrefSecundaria,
                externo: true,
              },
            ].map((item, i) => (
              <Reveal key={item.titulo} delay={i * 100} className="h-full">
                <a
                  href={item.href}
                  {...(item.externo ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                    {item.titulo}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.texto}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-base font-semibold text-primary">
                    {item.valor}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-background">
        <div className="container-tight pb-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-navy px-8 py-14 text-center text-primary-foreground sm:px-14">
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/10 blur-2xl"
              />
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                ¿Listo para dar el próximo paso?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/80">
                Los cupos del ciclo 2027 son limitados. Dejanos tus datos y te asesoramos sin cargo.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => irAInscripcion()}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-3.5 text-base font-semibold text-primary transition-transform hover:scale-[1.02]"
                >
                  Inscribirme ahora
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={institucion.contacto.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hablar con un asesor
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-navy text-primary-foreground">
        <div className="container-tight py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <img
                src={logoAndradSalud}
                alt="Andrad Salud"
                className="h-12 w-auto object-contain sm:h-14"
              />
              <p className="text-sm leading-relaxed text-primary-foreground/70">
                Formación profesional en salud y educación. Cursos presenciales con certificación.
              </p>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">
                Secciones
              </h4>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">
                Cursos
              </h4>
              <ul className="mt-4 space-y-2">
                {cursos.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => abrirDetalle(c)}
                      className="text-left text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {c.titulo}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">
                Contacto
              </h4>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <Phone className="h-4 w-4" />
                  {institucion.contacto.telefono}
                </li>
                <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <Mail className="h-4 w-4" />
                  {institucion.contacto.email}
                </li>
                <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {institucion.contacto.direccion}
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Instituto Andrad Salud. Prototipo visual. Todos los
            derechos reservados.
          </div>
        </div>
      </footer>

      <CourseSheet
        curso={cursoActivo}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onInscribirme={irAInscripcion}
      />
    </div>
  );
}
