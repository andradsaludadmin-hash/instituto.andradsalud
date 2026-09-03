import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Toaster } from "../components/ui/sonner";
import { SITE_URL, SITE_NAME } from "../lib/site-config";
import { institucion, cursos } from "../data/site-content";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Instituto Andrad Salud — Capacitación en Educación y Salud" },
      {
        name: "description",
        content:
          "Cursos presenciales de capacitación en áreas de educación y salud. Certificación profesional, docentes especializados y prácticas en instituciones de referencia.",
      },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Instituto Andrad Salud" },
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
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "es_AR" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Instituto Andrad Salud — Capacitación en Educación y Salud",
      },
      {
        name: "twitter:description",
        content:
          "Cursos presenciales de capacitación en áreas de educación y salud. Certificación profesional, docentes especializados y prácticas en instituciones de referencia.",
      },
      // TODO: reemplazar por una imagen OG real (1200x630) alojada en el propio
      // proyecto (/public) o en el WordPress del cliente. La URL actual es un
      // asset temporal generado por la herramienta de diseño original.
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/8513113a-576e-4483-98bd-907caf82a281",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/8513113a-576e-4483-98bd-907caf82a281",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "canonical", href: SITE_URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: SITE_NAME,
          description:
            "Instituto de formación y capacitación en salud. Cuerpo docente conformado por médicos y licenciados especialistas. Cursos presenciales orientados a la actualización de profesionales y personal de salud con certificación reconocida.",
          url: SITE_URL,
          telephone: institucion.contacto.telefonoHref.replace("tel:", ""),
          email: institucion.contacto.email,
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: institucion.contacto.direccion,
              addressLocality: "Buenos Aires",
              addressCountry: "AR",
            },
            {
              "@type": "PostalAddress",
              streetAddress: institucion.contacto.direccionSecundaria,
              addressLocality: "Buenos Aires",
              addressCountry: "AR",
            },
          ],
          hasCourse: cursos.map((curso) => ({
            "@type": "Course",
            name: curso.titulo,
            description: curso.descripcion,
            provider: {
              "@type": "EducationalOrganization",
              name: SITE_NAME,
            },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          inLanguage: "es-AR",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster position="bottom-center" richColors />
    </QueryClientProvider>
  );
}
