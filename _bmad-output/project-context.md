---
project_name: 'portfolio-ian'
user_name: 'Ian'
date: '2026-05-25'
status: 'complete'
sections_completed:
  - technology_stack
  - language_rules
  - framework_rules
  - testing_rules
  - code_quality
  - workflow_rules
  - anti_patterns
rule_count: 47
optimized_for_llm: true
---

# Contexto del Proyecto para Agentes IA

_Este archivo contiene reglas críticas y patrones que los agentes IA deben seguir al implementar código en este proyecto. Se enfoca en detalles no obvios que los agentes podrían pasar por alto._

---

## Stack Tecnológico y Versiones

- **Next.js 14+** — App Router (no Pages Router)
- **TypeScript** — modo estricto obligatorio
- **Tailwind CSS** — sistema custom de tokens en `src/styles/tokens.css` y `tailwind.config.ts`
- **Framer Motion** — animaciones y transiciones (no GSAP salvo decisión explícita)
- **React Hook Form + Zod** — formularios y validación compartida cliente/servidor
- **Resend** — proveedor de email para el endpoint de contacto
- **MDX** — contenido local de proyectos y blog (NO usar `next-mdx-remote`, archivado en 2026)
- **shadcn/ui** — uso selectivo: solo `Sheet` y `Dialog`
- **Vercel** — hosting, CI/CD y Analytics
- **Playwright** — E2E tests para flujos críticos
- **npm** — gestor de paquetes (lockfile presente)

---

## Reglas Críticas de Implementación

### Reglas de Lenguaje (TypeScript)

- TypeScript estricto en todo el proyecto — no desactivar `strict`, `noUncheckedIndexedAccess` ni flags equivalentes.
- Alias de imports: usar siempre `@/*` — nunca rutas relativas con `../../`.
- Schemas Zod se nombran `thingSchema` (ej. `contactSchema`, `projectSchema`, `postSchema`).
- Types/interfaces en `PascalCase`. Colocarlos en el módulo donde se usan; solo en `src/types/` si son genuinamente compartidos entre múltiples módulos.
- No usar `any`; preferir `unknown` con narrowing explícito.
- Fechas: siempre ISO 8601 string en frontmatter y JSON de API.
- Campos opcionales en JSON pueden omitirse; evitar `null` salvo que tenga significado explícito.

### Reglas de Framework (Next.js / React)

#### Server vs Client Components — la regla más crítica

- **Server Components son el default.** Agregar `"use client"` únicamente cuando el componente use: hooks de estado/efecto, eventos de navegador, Framer Motion, o `localStorage`.
- NO agregar `"use client"` a una página completa porque un hijo necesite estado — extraer el subcomponente interactivo.
- NO importar lógica server-only (`src/lib/email/`, `src/lib/content/`) desde Client Components.
- La lectura de contenido MDX siempre ocurre en server-side helpers (`src/lib/content/`).
- Separar wrappers animados client-side del contenido server-rendered cuando sea posible.

#### Estructura de Componentes

```text
src/components/ui/        → primitivas visuales sin lógica de dominio
src/components/layout/   → Header, Footer, Navigation, MobileNav, ThemeToggle
src/components/sections/ → secciones de páginas (Hero, FeaturedProjects, ContactPreview…)
src/components/content/  → ProjectCard, BlogPostCard, CaseStudyLayout, MDXComponents
src/components/forms/    → ContactForm y derivados
src/components/motion/   → wrappers client-side (AnimatedSection, StaggeredGrid)
```

#### Estado

- No usar Redux, Zustand ni Jotai en MVP.
- Estado local con `useState`, `useReducer` o React Hook Form.
- Tema: `localStorage` + script anti-flash en `layout.tsx`. Sin librería de estado global.
- Estado de formulario debe usar exactamente estos nombres:

```ts
type FormStatus = "idle" | "validating" | "loading" | "success" | "error"
```

#### API Route Handler (contacto)

- Único endpoint público: `POST /api/contact` en `src/app/api/contact/route.ts`.
- Wrapper de respuesta estándar — no mezclar `success` / `status` / `ok` entre endpoints:

```ts
type ApiResponse<T = unknown> =
  | { ok: true; data?: T; message?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }
```

- Status codes: `200` éxito · `400` validación · `429` rate limit · `500` error inesperado.
- No devolver errores internos al cliente (mensajes de Resend, stack traces, API keys).
- Campo `company` funciona como honeypot anti-spam.
- API routes no importan componentes UI.

#### MDX y Contenido

- Proyectos: `src/content/projects/*.mdx` con frontmatter Zod-validado.
- Posts: `src/content/blog/*.mdx` con frontmatter Zod-validado.
- Slug = nombre del archivo en `kebab-case`.
- Frontmatter de proyectos:

```yaml
title: string
slug: string          # kebab-case
summary: string
publishedAt: string   # ISO 8601
featured: boolean
stack: string[]
demoUrl: string
repoUrl: string
coverImage: string    # /projects/[slug]/cover.webp
```

- Frontmatter de posts:

```yaml
title: string
slug: string          # kebab-case
summary: string
publishedAt: string   # ISO 8601
tags: string[]
```

- NO usar `next-mdx-remote` (archivado en 2026). Toda lógica MDX vive en `src/lib/content/mdx.ts`.
- Imágenes de proyectos en `public/projects/[slug]/`. Siempre `next/image` para imágenes de contenido.
- CV estático en `public/cv/ian-vazquez-cv.pdf` — sin API route.

#### SEO y Metadata

- Cada ruta pública debe definir metadata usando helpers de `src/lib/seo/`.
- Proyectos y posts generan metadata dinámicamente desde su frontmatter.
- `NEXT_PUBLIC_SITE_URL` para URLs absolutas (Open Graph, canonical).
- `robots.ts` y `sitemap.ts` en `src/app/`.
- No duplicar metadata manualmente si existe helper central.

### Reglas de Motion / Animaciones

- Centralizar variants en `src/lib/motion/variants.ts` — no definir variants inline ad-hoc.
- **Siempre** respetar `prefers-reduced-motion` en todos los componentes de motion.
- Animar solo `transform` y `opacity` por defecto — no propiedades que disparen layout (width, height, top).
- Stagger recomendado: `80ms–120ms`.
- No usar GSAP salvo decisión arquitectónica explícita por necesidad real.
- No bloquear contenido crítico detrás de animaciones.

### Reglas de Accesibilidad

- WCAG 2.1 AA como baseline — no como polish post-implementación.
- Focus states visibles en todos los elementos interactivos.
- Labels explícitos en todos los campos de formulario.
- Alternativas textuales para diagramas de arquitectura.
- Navegación por teclado funcional en menú mobile.

### Reglas de Testing

- E2E con Playwright en `tests/e2e/`.
- Flujos críticos obligatorios:
  - `tests/e2e/contact.spec.ts` — éxito y error del formulario
  - `tests/e2e/navigation.spec.ts` — navegación principal
  - `tests/e2e/project-detail.spec.ts` — página de detalle de proyecto
- Tests unitarios co-localizados junto al módulo como `*.test.ts` / `*.test.tsx`.
- No agregar framework de unit testing sin decisión explícita (no incluido en el starter por defecto).

### Convenciones de Naming

| Elemento | Convención | Ejemplo correcto | Anti-patrón |
|---|---|---|---|
| Componentes React | PascalCase | `ProjectCard` | `projectCard`, `project_card` |
| Archivos de componentes | PascalCase.tsx | `Button.tsx` | `button.tsx`, `Button.jsx` |
| Hooks | useSomething.ts | `useTheme.ts` | `theme-hook.ts` |
| Helpers / utils | camelCase.ts | `formatDate.ts` | `format_date.ts` |
| Schemas Zod | thingSchema | `contactSchema` | `ContactSchema`, `contact_schema` |
| Types / interfaces | PascalCase | `ProjectFrontmatter` | `projectFrontmatter` |
| Variables / funciones | camelCase | `getProjects` | `get_projects` |
| Constantes globales | UPPER_SNAKE_CASE | `SITE_URL` | `siteUrl` |
| Slugs de contenido | kebab-case | `ecommerce-dashboard` | `EcommerceDashboard` |
| Campos JSON (API) | camelCase | `fieldErrors` | `field_errors` |
| Endpoints REST | lowercase | `/api/contact` | `/api/sendEmail`, `/api/ContactForm` |

### Reglas de Calidad y Estilo

- `npm run lint` antes de cerrar cualquier historia.
- `npm run build` + typecheck obligatorios antes de considerar una historia completa.
- No crear carpetas genéricas: `helpers/`, `misc/`, `common/` — usar la categoría específica que corresponda.
- No introducir dependencias nuevas sin evaluar impacto en bundle size.
- Loading states siempre locales por componente, no globales.
- Botones de submit muestran estado loading y se deshabilitan durante envío.
- Para contenido estático, preferir server/static render en vez de loaders client-side.

### Variables de Entorno Requeridas

```text
RESEND_API_KEY          # clave de API de Resend
CONTACT_TO_EMAIL        # email destino del formulario de contacto
CONTACT_FROM_EMAIL      # email remitente
NEXT_PUBLIC_SITE_URL    # URL pública del sitio (para OG y canonical)
```

- Todas declaradas en `.env.example`. Nunca hardcodear en código fuente.
- `.env.local` nunca se commitea al repositorio.

### Workflow de Desarrollo

- `main` → producción en Vercel (deploy automático).
- Pull Requests → preview deployments automáticos en Vercel.
- Validaciones mínimas antes de merge: lint + typecheck + build.
- Cambios de contenido en `src/content/` no requieren modificar lógica central.
- CI config en `.github/workflows/ci.yml`.

---

## Anti-Patrones Críticos — NO Hacer

- ❌ `"use client"` en páginas completas — extraer el subcomponente interactivo.
- ❌ Importar `src/lib/email/` o `src/lib/content/` desde Client Components.
- ❌ Endpoints distintos a `/api/contact` para el formulario (`/api/sendEmail`, `/api/contact-form-submit`).
- ❌ Respuestas API con formato no estándar: `{ success: false, msg: error.message }`.
- ❌ Variants de motion definidos inline — siempre centralizar en `lib/motion/variants.ts`.
- ❌ Usar `next-mdx-remote` (archivado en 2026).
- ❌ Introducir DB, ORM, auth, CMS, estado global o event bus sin nueva decisión arquitectónica explícita.
- ❌ Campos JSON en `snake_case` — siempre `camelCase`.
- ❌ Archivos de componentes en minúscula: `button.tsx` → debe ser `Button.tsx`.
- ❌ Exponer errores internos al cliente desde API routes (stack traces, mensajes de Resend).
- ❌ Animar propiedades que disparen layout (width, height, top) — solo `transform` / `opacity`.
- ❌ Ignorar `prefers-reduced-motion` en cualquier componente de animación.
- ❌ Usar `null` en JSON de API sin significado explícito — omitir campos opcionales.
- ❌ Crear Prisma, Drizzle, Supabase, SQLite o cualquier capa de base de datos en MVP.

---

## Guía de Uso

**Para Agentes IA:**

- Leer este archivo antes de implementar cualquier código en el proyecto.
- Seguir TODAS las reglas exactamente como están documentadas.
- En caso de duda, preferir la opción más restrictiva.
- Si un patrón nuevo se establece en múltiples lugares, añadirlo a este archivo antes de continuar.

**Para Humanos:**

- Mantener este archivo lean y enfocado en las necesidades de los agentes.
- Actualizar cuando cambie el stack tecnológico o surjan nuevos patrones.
- Revisar periódicamente para eliminar reglas que se vuelvan obvias.
- No documentar aquí lo que los agentes ya saben — solo lo no obvio.

_Última actualización: 2026-05-25_
