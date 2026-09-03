# Contexto del proyecto Andrad Salud

## Objetivo

Sitio institucional para Instituto Andrad Salud, orientado a promocionar cursos presenciales de salud y educacion, recibir solicitudes de inscripcion y quedar preparado para consumir contenido desde un WordPress headless.

El frontend vive como app React/TanStack Start y se despliega en Vercel. WordPress se usa aparte como panel de administracion para que el cliente edite cursos, imagenes, precios, fechas, cupos y contenido relacionado.

## Repositorio destino

- GitHub: `https://github.com/andradsaludadmin-hash/instituto.andradsalud` (privado)
- Remoto local: por configurar (ver PRODUCTION-SETUP.md)
- Rama principal: `main`

## Stack

- React 19
- TypeScript
- TanStack Router
- TanStack Start
- Vite
- Tailwind CSS 4
- Radix UI
- Lucide React
- Sonner
- WordPress REST API
- Contact Form 7 para inscripciones
- Advanced Custom Fields para datos editables de cursos

## Comandos

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Variables de entorno

Archivo de ejemplo: `.env.example`

```env
VITE_WP_API_BASE=https://institutoandradsalud.com
VITE_CF7_FORM_ID=123
```

Para Local WP, `VITE_WP_API_BASE` debe apuntar a la URL local del sitio WordPress, sin `/wp-json` al final.

## Integracion WordPress headless

El frontend intenta cargar cursos desde:

```text
{VITE_WP_API_BASE}/wp-json/wp/v2/curso?_embed
```

Si `VITE_WP_API_BASE` no esta configurada o falla la API, el sitio usa los cursos locales de respaldo definidos en `src/data/site-content.ts`.

El formulario de inscripcion envia a Contact Form 7:

```text
{VITE_WP_API_BASE}/wp-json/contact-form-7/v1/contact-forms/{VITE_CF7_FORM_ID}/feedback
```

## Custom Post Type requerido en WordPress

Slug:

```text
curso
```

Debe estar publicado en REST API con `show_in_rest`.

## Campos ACF requeridos para `curso`

Nombres exactos recomendados:

- `categoria`: select, valores `Salud` o `Educacion`
- `duracion`: texto
- `precio`: texto
- `fecha_inicio`: texto o fecha
- `estado`: select, por ejemplo `Cupos disponibles`, `Proximamente`, `Ya no se dicta`
- `modalidad`: texto, por ejemplo `Presencial - Consulta horarios`
- `matricula`: texto
- `destacado`: verdadero/falso
- `temario`: area de texto, un item por linea
- `salida_laboral`: area de texto

Tambien se usa:

- Titulo del post como nombre del curso.
- Extracto o contenido como descripcion.
- Imagen destacada como imagen del curso.

## Contact Form 7

El formulario en WordPress debe usar estos nombres de campo:

```text
[text* your-name placeholder "Nombre completo"]
[email* your-email placeholder "Email"]
[tel* your-phone placeholder "Telefono"]
[text* your-course readonly "Curso"]
[textarea your-message placeholder "Mensaje (opcional)"]
```

El frontend tiene los inputs alineados con esos nombres y agrega `your-course` con el nombre del curso seleccionado.

## Archivos principales

- `package.json`: dependencias y scripts.
- `vite.config.ts`: configuracion Vite/TanStack Start.
- `tsconfig.json`: configuracion TypeScript.
- `eslint.config.js`: reglas ESLint.
- `src/start.ts`: middlewares de servidor (CSRF, manejo de errores).
- `src/router.tsx`: configuracion router.
- `src/routeTree.gen.ts`: arbol generado por TanStack Router.
- `src/routes/__root.tsx`: layout raiz, error boundary y estilos globales.
- `src/routes/index.tsx`: pagina principal completa, carga de cursos desde WordPress, formulario CF7, secciones del sitio.
- `src/data/site-content.ts`: contenido local de respaldo para cursos, testimonios, pasos e institucion.
- `src/styles.css`: estilos globales, tokens de color y utilidades.
- `WORDPRESS-HEADLESS-SETUP.md`: guia paso a paso para configurar WordPress.
- `README.md`: documentacion general.

## Componentes propios

- `src/components/site/CountUp.tsx`: contador animado.
- `src/components/site/CourseSheet.tsx`: panel lateral con detalle de curso.
- `src/components/site/FloatingWhatsapp.tsx`: boton flotante de WhatsApp.
- `src/components/site/Reveal.tsx`: animacion de entrada por interseccion.
- `src/components/site/ScrollProgress.tsx`: indicador de progreso de scroll.
- `src/components/site/Testimonials.tsx`: carrusel/manual de testimonios.

## Componentes UI

La carpeta `src/components/ui/` contiene componentes base tipo shadcn/Radix:

- accordion
- alert
- alert-dialog
- aspect-ratio
- avatar
- badge
- breadcrumb
- button
- calendar
- card
- carousel
- chart
- checkbox
- collapsible
- command
- context-menu
- dialog
- drawer
- dropdown-menu
- form
- hover-card
- input
- input-otp
- label
- menubar
- navigation-menu
- pagination
- popover
- progress
- radio-group
- resizable
- scroll-area
- select
- separator
- sheet
- sidebar
- skeleton
- slider
- sonner
- switch
- table
- tabs
- textarea
- toggle
- toggle-group
- tooltip

## Assets

Imagenes del sitio:

- `src/assets/img/logo-andrad-salud.png`
- `src/assets/img/favicon.png`
- `src/assets/img/blog-noticia-1.jpg`
- `src/assets/img/carrusel-img-1.jpeg`
- `src/assets/img/carrusel-img-2.jpeg`
- `src/assets/img/carrusel-img-3.jpeg`
- `src/assets/img/curso-1-asistente-gerontologico.jpeg`
- `src/assets/img/curso-2-enfermeria-clinica-domiciliaria.jpeg`
- `src/assets/img/curso-3-acompaniante-terapeutico.jpeg`
- `src/assets/img/curso-4-extraccionista-laboratorio-clinico.jpeg`
- `src/assets/img/curso-5-kinesionologia-automotriz.jpeg`
- `src/assets/img/curso-6-masajista-profesional.jpeg`
- `src/assets/img/curso-7-camillero-profesional.jpeg`
- `src/assets/img/curso-8-auxiliar-en-farmacia.jpeg`
- `src/assets/img/curso-9-auxiliar-terapia-ocupacional.jpeg`
- `src/assets/img/curso-10-estimulacion-temprana.jpeg`

Public:

- `public/favicon.png`
- `public/robots.txt`

## Estado actual

- El proyecto compila con `npm run build` (verificado).
- `npx tsc --noEmit` sin errores (verificado).
- Target de despliegue: Vercel, vía preset `vercel` de Nitro (ya no usa el
  wrapper `@lovable.dev/vite-tanstack-config`, que apuntaba a Cloudflare por
  defecto).
- Pendiente: crear el repo en `andradsaludadmin-hash/instituto.andradsalud` y
  hacer el primer push (ver PRODUCTION-SETUP.md).

## Siguiente paso recomendado

Ver `PRODUCTION-SETUP.md` para el procedimiento completo de GitHub → Vercel → dominio.
