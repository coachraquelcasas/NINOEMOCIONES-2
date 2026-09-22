# Alberto Einstein y el Laboratorio de las Emociones

App para niños (React + TypeScript + Vite + React Router), con progreso guardado
en el dispositivo (localStorage) y contenido editable por la administradora
mediante Supabase.

---

## Qué necesitas hacer (resumen rápido)

1. Crear un proyecto en https://supabase.com (gratis).
2. Pegar el script `supabase/schema.sql` en el SQL Editor de Supabase y ejecutarlo. Esto crea las tablas y las llena con el contenido actual.
3. Crear tu usuaria administradora en Supabase (Authentication → Users → Add user), con tu correo y la contraseña que elijas.
4. Copiar dos datos de tu proyecto de Supabase (Project Settings → API): la "Project URL" y la "anon public key".
5. Pegar esos dos datos en el archivo `.env` del proyecto (ver abajo).
6. Publicar el proyecto en Netlify.

No necesitas usar la CLI de Supabase, ni Edge Functions, ni el Table Editor manualmente. Solo el script SQL, los dos datos de conexión, y crear tu usuaria desde la pantalla de Supabase.

---

## Paso a paso detallado

### 1. Crear el proyecto en Supabase
Entra a supabase.com, crea una cuenta si no tienes, y crea un nuevo proyecto (elige cualquier nombre y contraseña de base de datos, esa contraseña es solo interna y no la volverás a usar).

### 2. Ejecutar el script SQL
Dentro de tu proyecto de Supabase, ve a "SQL Editor" → "New query". Abre el archivo `supabase/schema.sql` de esta carpeta, copia todo su contenido, pégalo ahí y presiona "Run". Esto crea las tablas de emociones, guardianes/misiones y la aventura, y las llena con el contenido que ya tiene la app.

### 3. Crear tu usuaria administradora
Ve a "Authentication" → "Users" → "Add user". Pon tu correo y una contraseña. Con eso ya puedes entrar al panel de edición de la app en `/admin/login`. No hace falta crear más usuarios: en este proyecto solo tú (Raquel) editas el contenido.

### 4. Copiar los dos datos de conexión
Ve a "Project Settings" → "API". Copia:
- **Project URL**
- **anon public key** (a veces aparece como "Publishable key")

### 5. Configurar el archivo `.env`
En la carpeta del proyecto hay un archivo `.env.example`. Haz una copia y llámala `.env`, y pega ahí tus dos datos:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-publica-anon
```

Si usas Netlify, estas mismas dos variables también se configuran en Netlify: "Site settings" → "Environment variables", con los mismos nombres y valores.

### 6. Instalar y probar
```
npm install
npm run dev
```

### 7. Publicar en Netlify
- Comando de build: `npm run build`
- Carpeta de publicación: `dist`
- Agrega las dos variables de entorno (paso 5) en Netlify antes de publicar.
- El archivo `netlify.toml` ya incluye la redirección necesaria para que las rutas internas funcionen al recargar la página.

---

## Cómo editar el contenido después de publicado

Entra a `tu-sitio.netlify.app/admin/login`, ingresa con el correo y contraseña que creaste en el paso 3, y podrás editar el texto de las emociones, las misiones de los guardianes y las escenas de la aventura. Los cambios se ven al instante para cualquier niño que use la app (no hace falta volver a publicar nada).

## ¿Necesito un "bucket" de almacenamiento?

No. En esta versión no se suben imágenes ni archivos desde la app, así que no hace falta crear ningún bucket en Supabase. Las ilustraciones (Alberto, guardianes, etc.) siguen siendo archivos estáticos dentro de `public/assets`.

## Si no configuras Supabase todavía

La app sigue funcionando igual, usando el contenido que trae por defecto (los mismos textos del script SQL). Simplemente no podrás editarlo desde `/admin` hasta que conectes tu proyecto de Supabase.

---

## Estructura del proyecto

- `supabase/schema.sql` — el único script que necesitas ejecutar en Supabase.
- `src/lib/supabaseClient.ts` — conexión a Supabase usando las dos variables de entorno.
- `src/lib/content.ts` / `src/hooks/useContent.tsx` — traen el contenido desde Supabase (con respaldo local si algo falla).
- `src/hooks/useAdminAuth.tsx` — sesión de la administradora.
- `src/pages/admin/` — pantalla de acceso y panel de edición.
- `src/hooks/useProgress.ts` — progreso del niño explorador, guardado en localStorage (esto nunca pasa por Supabase, por privacidad).
