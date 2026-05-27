# Portfolio Ian Vazquez

Portfolio personal construido con Next.js 14+, TypeScript, Tailwind CSS y Framer Motion.

[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)](https://opensource.org/licenses/MIT)

## Stack Tecnológico

- **Next.js 14+** — App Router
- **TypeScript** — modo estricto
- **Tailwind CSS** — sistema custom de tokens
- **Framer Motion** — animaciones
- **React Hook Form + Zod** — formularios y validación
- **Resend** — envío de emails
- **MDX** — contenido de proyectos y blog
- **Playwright** — E2E tests

## Configuración Local

### Prerrequisitos

- Node.js 20.x (LTS)
- npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/oneConnor/Portfolio-Ian-Vazquez
cd portfolio-ian

# Instalar dependencias
npm install
```

### Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_email@example.com
CONTACT_FROM_EMAIL=noreply@yourdomain.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Nota:** `.env.local` nunca se debe commitear al repositorio. Las variables de referencia están en `.env.example`.

### Ejecutar en Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Deploy en Vercel

### Configuración Inicial

1. **Importar proyecto en Vercel:**
   - Ir a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importar desde GitHub
   - Framework preset: Next.js

2. **Configurar variables de entorno en Vercel Dashboard:**
   - Ir a Settings → Environment Variables
   - Agregar las siguientes variables:
     - `RESEND_API_KEY` — clave de API de Resend
     - `CONTACT_TO_EMAIL` — email destino del formulario
     - `CONTACT_FROM_EMAIL` — email remitente
     - `NEXT_PUBLIC_SITE_URL` — URL de producción (ej. `https://portfolio-ian.vercel.app`)

3. **Deploy automático:**
   - Push a `main` → deploy automático a producción
   - Pull Requests → preview deployments automáticos

### Rotar Variables de Entorno

Para cambiar una variable de entorno en producción:

1. Ir a Vercel Dashboard → Settings → Environment Variables
2. Editar la variable deseada
3. Hacer un nuevo deploy (trigger manual o push a main)
4. Vercel aplicará las nuevas variables en el siguiente deploy

## CI/CD con GitHub Actions

El proyecto tiene un workflow de CI en `.github/workflows/ci.yml` que:

- Se ejecuta en cada push a `main` y en pull requests
- Corre `npm ci`, `npm run lint`, `tsc --noEmit` y `npm run build`
- Bloquea merges si alguna validación falla

### Branch Protection (Recomendado)

Para requerir que CI pase antes de merge:

1. Ir a GitHub Settings → Branches
2. Add rule para `main`
3. Habilitar "Require status checks to pass before merging"
4. Seleccionar el job de CI del workflow

## Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar ESLint
npm run type-check   # Verificar tipos con TypeScript
```

## Estructura del Proyecto

```
src/
├── app/              # App Router de Next.js
├── components/       # Componentes React
│   ├── ui/          # Primitivas visuales
│   ├── layout/      # Header, Footer, Navigation
│   ├── sections/    # Secciones de páginas
│   ├── content/     # Componentes de contenido
│   ├── forms/       # Formularios
│   └── motion/      # Wrappers de animación
├── lib/             # Utilidades y helpers
│   ├── content/     # Loaders MDX
│   ├── email/       # Lógica de email
│   ├── motion/      # Variants de Framer Motion
│   └── seo/         # Helpers de metadata
└── styles/          # Estilos globales y tokens
```

## Testing

```bash
# Ejecutar E2E tests con Playwright
npx playwright test

# Ver reporte de tests
npx playwright show-report
```

## Convenciones de Código

- TypeScript estricto obligatorio
- Alias de imports: usar `@/*` en vez de rutas relativas
- Server Components por default, `"use client"` solo cuando sea necesario
- Schemas Zod nombrados como `thingSchema`
- Components en PascalCase
- No usar `any`, preferir `unknown` con narrowing

Ver `_bmad-output/project-context.md` para reglas detalladas del proyecto.
