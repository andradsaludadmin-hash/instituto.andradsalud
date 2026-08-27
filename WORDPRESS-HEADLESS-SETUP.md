# Configuración WordPress Headless para Instituto Andrad Salud

## 1. Instalación de WordPress

### Opción DonWeb

1. Contratar plan WordPress en DonWeb.
2. Instalar WordPress desde el panel de DonWeb.
3. Configurar el dominio principal para el backend: `https://institutoandradsalud.com`.
4. Crear usuario administrador para Ariel y entregarle credenciales.

### Opción Local WP (para pruebas)

1. Instalar Local WP: https://localwp.com/
2. Crear un nuevo sitio WordPress local.
3. Usar la URL local (por ejemplo `https://institutoandradsalud.local`) para pruebas.

## 2. Plugins necesarios

Instalar y activar estos plugins en WordPress:

- Custom Post Type UI
- Advanced Custom Fields
- Contact Form 7
- Flamingo
- CF7 to Excel (o "Export to Excel" compatible con Contact Form 7)

## 3. Crear el Custom Post Type `curso`

### Opción con Custom Post Type UI

1. Ir a **CPT UI > Add/Edit Post Types**.
2. En **Post Type Slug** usar `curso`.
3. En **Plural Label** escribir `Cursos`.
4. En **Singular Label** escribir `Curso`.
5. En la sección REST API marcar `show_in_rest`.
6. Guardar el post type.

### Opción con código en el tema (si se usa un child theme)

Agregar en `functions.php`:

```php
function andrad_salud_register_curso_cpt() {
  register_post_type('curso', array(
    'labels' => array(
      'name' => 'Cursos',
      'singular_name' => 'Curso',
    ),
    'public' => true,
    'has_archive' => true,
    'show_in_rest' => true,
    'supports' => array('title', 'editor', 'excerpt', 'thumbnail'),
    'menu_icon' => 'dashicons-welcome-learn-more',
  ));
}
add_action('init', 'andrad_salud_register_curso_cpt');
```

## 4. Configurar campos ACF para el CPT `curso`

Crear un grupo de campos ACF asociado a `Curso` con estos campos:

- Categoría: campo Select con opciones:
  - Salud
  - Educación
- Duración: campo Texto.
- Precio: campo Texto.
- Fecha de inicio: campo Fecha.
- Estado: campo Select con opciones:
  - Cupos disponibles
  - Próximamente
  - Ya no se dicta
- Modalidad: campo Texto. Ejemplo: `Presencial · Consultá horarios`.
- Matrícula: campo Texto (`Nacional` o `Privada`).
- Destacado: campo Verdadero/Falso.
- Temario: campo Área de texto. Cargar un punto por línea.
- Salida laboral: campo Área de texto.

### Importante

- En la configuración del grupo, habilitar `Show in REST API`.
- Cada campo debe marcarse también como visible en REST si ACF lo permite.
- Usar estos nombres de campo ACF para que coincidan con el frontend:
  - `categoria`
  - `duracion`
  - `precio`
  - `fecha_inicio`
  - `estado`
  - `modalidad`
  - `matricula`
  - `destacado`
  - `temario`
  - `salida_laboral`

## 5. Publicar cursos

Para cada curso:

1. Crear nuevo `Curso`.
2. Usar el título como nombre del curso.
3. Completar la descripción (`editor`) o el extracto.
4. Subir imagen destacada.
5. Completar los campos ACF, especialmente categoría, duración, precio, fecha de inicio, estado, modalidad, temario y salida laboral.
6. Publicar.

## 6. Configurar Contact Form 7 para inscripciones

### Formulario

Crear un formulario en Contact Form 7 con estas etiquetas:

```text
[text* your-name placeholder "Nombre completo"]
[email* your-email placeholder "Email"]
[tel* your-phone placeholder "Teléfono"]
[text* your-course readonly "Curso"]
[textarea your-message placeholder "Mensaje (opcional)"]
```

### Configuración de correo (Mail)

- **To:** `institutoandradsalud@gmail.com`
- **From:** `Ariel <no-reply@institutoandradsalud.com>`
- **Subject:** `Nueva inscripción: [your-course]`
- **Additional headers:** `Reply-To: [your-email]`
- **Message body:**

```text
Nombre: [your-name]
Email: [your-email]
Teléfono: [your-phone]
Curso: [your-course]
Mensaje: [your-message]
```

### Configuración de confirmación al alumno (Mail 2)

1. Activar `Mail (2)`.
2. **To:** `[your-email]`
3. **From:** `Instituto Andrad Salud <no-reply@institutoandradsalud.com>`
4. **Subject:** `Confirmación de inscripción a [your-course]`
5. **Message body:**

```text
Hola [your-name],

Gracias por solicitar información sobre el curso [your-course]. Un asesor de Instituto Andrad Salud se pondrá en contacto en breve.

Saludos,
Instituto Andrad Salud
```

## 7. Guardar inscriptos con Flamingo

1. Activar Flamingo.
2. En Contact Form 7, habilitar el guardado de mensajes en Flamingo.
3. Revisar la lista de mensajes en **Flamingo > Inbound Messages**.

## 8. Exportar inscripciones a Excel

1. Instalar el plugin `CF7 to Excel` o similar.
2. Usar la opción de exportar para descargar los envíos en Excel.
3. Alternativa: Flamingo también puede exportar a CSV si el plugin lo permite.

## 9. Configurar la API REST en el frontend

En el frontend React/Vite usar:

- Endpoint de cursos: `https://institutoandradsalud.com/wp-json/wp/v2/curso?_embed`
- Endpoint de Contact Form 7: `https://institutoandradsalud.com/wp-json/contact-form-7/v1/contact-forms/[ID]/feedback`

### Variables de entorno

Crear un archivo `.env` en la raíz del frontend con:

```env
VITE_WP_API_BASE=https://institutoandradsalud.com
VITE_CF7_FORM_ID=123
```

Reemplazar `123` por el ID real del formulario de Contact Form 7.

## 10. Dominio y hosting

### Dominio en DonWeb

1. Registrar `institutoandradsalud.com`.
2. Configurar el dominio para apuntar al sitio WordPress en DonWeb.
3. Activar SSL si DonWeb lo ofrece.

### Frontend en Vercel

1. Subir el repositorio a GitHub.
2. Conectar el repo a Vercel.
3. Configurar las variables de entorno en Vercel:
   - `VITE_WP_API_BASE`
   - `VITE_CF7_FORM_ID`
4. Desplegar.

### Conexión dominio frontend

- En Vercel, agregar el dominio personalizado que se quiera usar para el frontend.
- Si se quiere usar un subdominio, por ejemplo `app.institutoandradsalud.com`, configurarlo en Vercel.

## 11. Qué debe hacer Ariel en el panel de WordPress

- Entrar a **Cursos > Todos los cursos** para agregar/editar/eliminar cursos.
- Completar la **imagen destacada**, **descripción**, **duración**, **precio**, **fecha de inicio**, **estado** y **matrícula**.
- Revisar inscripciones en **Flamingo > Inbound Messages**.
- Exportar inscripciones a Excel desde el plugin instalado.

## 12. Probar localmente

1. Ejecutar el frontend con `npm install` y `npm run dev`.
2. Crear `.env` con los valores de la API de WordPress.
3. Probar que la sección de cursos carga datos y que el formulario envía correctamente.
