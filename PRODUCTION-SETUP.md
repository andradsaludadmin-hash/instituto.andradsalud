# Puesta en producción — Instituto Andrad Salud

Guía paso a paso para llevar este proyecto de repo local a producción en
Vercel con dominio propio. No incluye valores reales de credenciales.

## 1. GitHub

Repositorio destino (privado):
`https://github.com/andradsaludadmin-hash/instituto.andradsalud`

Este proyecto trae un historial de Git heredado de un repo anterior
(`Programing777/andrad-salud-inst-form-cap`, conectado a Lovable). Recomendado:

```sh
# Desde la carpeta del proyecto
git remote remove origin
git remote add origin https://github.com/andradsaludadmin-hash/instituto.andradsalud.git
git push -u origin main
```

Si preferís no arrastrar el historial viejo (por ejemplo, para cortar
definitivamente el vínculo de auto-sync que tenía este proyecto con Lovable),
se puede reiniciar el historial en su lugar:

```sh
rm -rf .git
git init
git add .
git commit -m "Initial commit — Instituto Andrad Salud"
git branch -M main
git remote add origin https://github.com/andradsaludadmin-hash/instituto.andradsalud.git
git push -u origin main
```

## 2. Vercel

1. Importar el repo desde el dashboard de Vercel.
2. Nombre del proyecto: `instituto-andradsalud` (no usar el nombre heredado
   `andrad-salud-inst-form-cap`).
3. Framework preset: Vercel debería detectar Vite automáticamente. Si pide
   confirmar el comando de build, usar `npm run build` (ya deja el output en
   `.vercel/output` vía el preset `vercel` de Nitro).
4. Deploy inicial → obtenés `https://instituto-andradsalud.vercel.app`.

## 3. Environment Variables (Vercel)

En **Project Settings → Environment Variables**, agregar (Production y
Preview):

| Variable | Valor |
|---|---|
| `VITE_WP_API_BASE` | URL pública del WordPress del cliente (sin `/wp-json` al final) |
| `VITE_CF7_FORM_ID` | ID del formulario de Contact Form 7 en WordPress |

Recordar: son variables públicas (van al bundle del navegador). No poner acá
nada que deba mantenerse privado.

## 4. WordPress

Ver `WORDPRESS-HEADLESS-SETUP.md` para: Custom Post Type `curso`, campos ACF,
Contact Form 7 + Flamingo.

## 5. CORS

WordPress debe permitir peticiones desde el dominio del frontend
(`https://instituto-andradsalud.vercel.app` y, luego, el dominio final). Esto
se configura del lado de WordPress (plugin de CORS o headers en el hosting),
no en el frontend.

## 6. Dominio personalizado

Dominio final previsto: `instituto.andradsalud.com.ar`

1. En Vercel: **Project Settings → Domains → Add** → `instituto.andradsalud.com.ar`.
2. Vercel va a mostrar el registro DNS a crear (probablemente un `CNAME` hacia
   `cname.vercel-dns.com`, a confirmar en el momento porque puede variar).
3. Crear ese registro en el proveedor DNS del dominio (NIC Argentina o quien
   administre el DNS).
4. Esperar la validación de Vercel (puede tardar minutos u horas según
   propagación DNS).
5. Vercel emite el certificado SSL automáticamente una vez validado el dominio.

Este paso no se ejecuta hasta que el cliente lo confirme explícitamente.

## 7. Pruebas post-deploy

- [ ] La home carga y muestra cursos (desde WordPress si `VITE_WP_API_BASE`
      está configurada; si no, cae al fallback local con aviso de error visible).
- [ ] El formulario de inscripción envía correctamente y Flamingo lo registra
      en WordPress.
- [ ] El botón flotante de WhatsApp abre el chat con el número correcto.
- [ ] `robots.txt` accesible en `/robots.txt`.
- [ ] Vista previa de Open Graph correcta al compartir el link (Facebook
      Sharing Debugger / Twitter Card Validator).
- [ ] Lighthouse: performance, accesibilidad y SEO en verde.

## 8. Mantenimiento

- Cursos, precios, fechas y estados se editan desde el panel de WordPress —
  no requieren cambios de código ni redeploy.
- Cualquier cambio de código (textos institucionales, diseño, nuevas
  secciones) sí requiere commit + push, que dispara un redeploy automático en
  Vercel.
- Si WordPress cambia de URL o de hosting, solo hace falta actualizar
  `VITE_WP_API_BASE` en Vercel — no se toca el código.
