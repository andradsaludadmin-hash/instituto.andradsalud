# Instituto Andrad Salud — Frontend

Sitio web institucional del Instituto Andrad Salud, centro de capacitación y
formación profesional en salud. El frontend consume datos de cursos desde un
WordPress headless y envía inscripciones vía Contact Form 7.

## Stack

- React 19 + TypeScript
- TanStack Router / TanStack Start (SSR)
- Vite 8 + Nitro (preset `vercel`)
- Tailwind CSS 4 + Radix UI + Lucide React
- Sonner (toasts)
- WordPress REST API (contenido de cursos y talleres)
- Contact Form 7 vía REST API (formulario de inscripción)

## Desarrollo local

Requisitos: Node.js 22+.

```sh
npm install
cp .env.example .env   # completar con tus valores locales
npm run dev             # http://localhost:8080
```

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción (target Vercel) |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | ESLint + Prettier |
| `npm run format` | Aplica formato con Prettier |

## Variables de entorno

Ver `.env.example`. Se configuran en Vercel en **Project Settings → Environment
Variables**, no se commitean nunca con valores reales.

```env
VITE_WP_API_BASE=   # URL base del WordPress headless, sin /wp-json al final
VITE_CF7_FORM_ID=   # ID numérico del formulario de Contact Form 7
```

⚠️ Cualquier variable con prefijo `VITE_` queda expuesta en el bundle del
navegador (es pública por diseño de Vite). No poner acá tokens ni credenciales.

## Integración con WordPress

El sitio consume cursos y talleres desde:

```
{VITE_WP_API_BASE}/wp-json/wp/v2/curso?_embed
{VITE_WP_API_BASE}/wp-json/wp/v2/taller?_embed
```

Si `VITE_WP_API_BASE` no está configurada, o si la petición falla, el sitio
muestra un estado de error explícito y cae a una lista local de cursos de
referencia (`src/data/site-content.ts`) para que la página no quede vacía —
ese fallback no debe interpretarse como información en tiempo real.

El formulario de inscripción envía a Contact Form 7:

```
{VITE_WP_API_BASE}/wp-json/contact-form-7/v1/contact-forms/{VITE_CF7_FORM_ID}/feedback
```

Guía completa de configuración del lado de WordPress: `WORDPRESS-HEADLESS-SETUP.md`.

## Despliegue

Ver `PRODUCTION-SETUP.md` para el paso a paso de GitHub, Vercel, variables de
entorno, dominio personalizado y checklist de salida a producción.

## Estructura

```
src/
  routes/          rutas de TanStack Router (index.tsx = página principal)
  components/site/ componentes propios del sitio
  components/ui/   componentes base (shadcn/Radix)
  data/            contenido local de respaldo (cursos, testimonios, institución)
  lib/             utilidades
```
