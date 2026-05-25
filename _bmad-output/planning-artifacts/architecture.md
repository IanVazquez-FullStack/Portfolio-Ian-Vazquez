---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - "_bmad-output/planning-artifacts/prd-2026-05-24/prd.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
  - "_bmad-output/planning-artifacts/research/technical-portfolio-modern-technologies-research-2025-05-24.md"
workflowType: 'architecture'
project_name: 'portfolio-ian'
user_name: 'Ian'
date: '2026-05-25'
lastStep: 8
status: 'complete'
completedAt: '2026-05-25'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

El proyecto define un portfolio web full stack orientado a convertir visitantes en oportunidades de contacto mediante evidencia técnica tangible. Los requerimientos funcionales se agrupan en ocho áreas principales:

1. Navegación y estructura: home como landing scroll, header persistente responsive y footer consistente.
2. Presentación de proyectos: grid destacado, listado completo y páginas individuales con casos técnicos, arquitectura, lecciones aprendidas, demo y repositorio.
3. Sistema de contacto: formulario validado, endpoint `/api/contact`, envío de email, estados de UI y protección anti-spam.
4. Blog técnico: listado de artículos, páginas individuales y contenido en MDX con syntax highlighting.
5. Animaciones y UX: scroll reveals, transiciones de página, micro-interacciones y respeto por `prefers-reduced-motion`.
6. Tema oscuro: toggle light/dark, persistencia en `localStorage` y prevención de flash de tema incorrecto.
7. SEO y performance: metadata dinámica, Open Graph, optimización de imágenes y Core Web Vitals.
8. Descarga de CV: archivo PDF estático accesible desde header/About.

Arquitectónicamente, esto implica una aplicación web con rutas de contenido estático/dinámico, una API serverless para contacto, un sistema de contenido local basado en MDX, componentes UI reutilizables, soporte de theming y una estrategia clara de performance.

**Non-Functional Requirements:**

Los NFRs que más condicionan la arquitectura son:

- Performance: Lighthouse > 90 y Core Web Vitals dentro de objetivos definidos.
- Accesibilidad: WCAG 2.1 AA, navegación por teclado, focus visible, labels en formularios, alternativas para diagramas y soporte screen reader.
- Seguridad: validación frontend/backend, protección anti-spam y cuidado contra abuso del endpoint de contacto.
- Mantenibilidad: TypeScript estricto, componentes modulares y capacidad de agregar proyectos o posts sin modificar lógica central.
- Responsive: mobile-first con breakpoints estándar de Tailwind.
- SEO: metadata por página, Open Graph e imágenes optimizadas.
- Deploy: CI/CD automático en Vercel.

**Scale & Complexity:**

- Primary domain: Web full-stack / content-driven portfolio application
- Complexity level: Medium
- Estimated architectural components: 8-10

La complejidad no proviene de volumen de datos o multi-tenancy, sino de la combinación de contenido estructurado, UX premium, accesibilidad, animaciones, performance y backend real en una aplicación compacta.

### Technical Constraints & Dependencies

El PRD y la documentación UX ya establecen varias decisiones y dependencias:

- Framework objetivo: Next.js 14+ con App Router.
- Lenguaje: TypeScript estricto.
- Estilos: Tailwind CSS con sistema custom de tokens.
- Animaciones: Framer Motion para transiciones e interacciones UI; GSAP solo si se requiere scroll avanzado.
- Formularios: React Hook Form + Zod.
- Email: Resend como opción preferida.
- Hosting/deploy: Vercel.
- Analytics: Vercel Analytics.
- Contenido: MDX para blog y proyectos.
- Componentes: propios por defecto; shadcn/ui solo de forma selectiva para piezas complejas como `Dialog` o `Sheet`.

### Cross-Cutting Concerns Identified

- Performance y bundle size: controlar coste de animaciones, MDX, imágenes y librerías.
- Accesibilidad: todos los componentes interactivos, navegación mobile, formularios, snippets y diagramas deben ser accesibles desde el diseño inicial.
- SEO y metadata: cada proyecto y post necesita metadata propia.
- Content modeling: proyectos y posts deben tener esquemas consistentes para escalar sin tocar código central.
- Form security: validación, honeypot, rate limiting o protección equivalente, manejo seguro de errores.
- Theming: dark mode por defecto, light mode opcional, persistencia sin flash visual.
- Motion system: animaciones centralizadas, limitadas a `transform`/`opacity` y con soporte `prefers-reduced-motion`.
- Maintainability: separación entre contenido, layout, componentes UI, lógica de formulario y servicios externos.

## Starter Template Evaluation

### Primary Technology Domain

Web full-stack / content-driven portfolio application based on project requirements analysis.

El proyecto necesita una base compatible con:

- Next.js App Router.
- TypeScript estricto.
- Tailwind CSS.
- Serverless API routes para `/api/contact`.
- MDX para blog y proyectos.
- Deploy optimizado en Vercel.
- Animaciones React-friendly.
- SEO y metadata por página.

### Starter Options Considered

**Option 1: Official `create-next-app@latest`**

Starter oficial de Next.js. Provee una base limpia, mantenida directamente por el equipo de Next.js y compatible con App Router, TypeScript, Tailwind CSS, ESLint/Biome, estructura `src/` y alias de imports.

**Pros:**

- Fuente oficial y mantenimiento más confiable.
- Menos decisiones ocultas o dependencias innecesarias.
- Encaja con el enfoque del proyecto: componentes propios, Tailwind custom y arquitectura controlada.
- Compatible naturalmente con Vercel.
- Buena base para añadir MDX, Framer Motion, React Hook Form, Zod, Resend y Vercel Analytics de forma explícita.

**Cons:**

- No trae MDX, formularios, testing ni animaciones preconfigurados.
- Requiere definir estructura de carpetas y convenciones del proyecto en pasos posteriores.

**Option 2: T3 Stack / `create-t3-app`**

Starter full-stack TypeScript orientado a aplicaciones con tRPC, Prisma/Drizzle, autenticación y base de datos.

**Pros:**

- Excelente para apps full-stack complejas y type-safe.
- Buenas convenciones para backend, datos y autenticación.

**Cons:**

- Sobre-ingeniería para este portfolio.
- El proyecto no requiere autenticación, base de datos, tRPC ni ORM.
- Añade complejidad y peso conceptual que no aporta al objetivo principal.

**Option 3: Next.js MDX blog starter**

Starter orientado a blogs o sitios personales con MDX ya configurado.

**Pros:**

- Acelera blog y contenido MDX.
- Puede traer patrones útiles para posts y metadata.

**Cons:**

- Puede imponer estructura visual o de contenido que choque con la UX propia del portfolio.
- Riesgo de “portfolio-template effect”.
- Menos control sobre arquitectura base.
- El proyecto necesita blog + proyectos + API contact + sistema visual custom, no solo blog.

### Selected Starter: Official `create-next-app@latest`

**Rationale for Selection:**

La opción recomendada es usar el starter oficial `create-next-app@latest` con configuración explícita para TypeScript, Tailwind CSS, App Router, `src/` directory y alias `@/*`.

Esta base maximiza control, mantenibilidad y compatibilidad con el objetivo del portfolio: demostrar criterio técnico propio, evitar templates genéricos y construir un sistema visual custom.

El starter oficial hace las decisiones fundamentales sin imponer arquitectura de aplicación innecesaria. Las capacidades específicas del portfolio — MDX, Framer Motion, formulario con Resend, Vercel Analytics, contenido de proyectos y sistema de componentes — deben agregarse de forma intencional como decisiones arquitectónicas del proyecto.

**Initialization Command:**

```bash
npx create-next-app@latest portfolio-ian --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**

- TypeScript como lenguaje principal.
- Configuración inicial de `tsconfig`.
- Runtime y build system estándar de Next.js.

**Styling Solution:**

- Tailwind CSS configurado como base de estilos.
- Soporte para tokens custom y dark mode mediante configuración posterior.

**Build Tooling:**

- Tooling oficial de Next.js.
- App Router.
- Optimización integrada para producción.
- Compatibilidad directa con Vercel.

**Testing Framework:**

- No incluye testing framework por defecto.
- Testing debe definirse posteriormente según alcance: unit/component tests y/o Playwright para flujos críticos.

**Code Organization:**

- Código dentro de `src/`.
- Rutas dentro de `src/app`.
- Alias de imports `@/*`.
- Base limpia para separar `components`, `content`, `lib`, `data`, `styles` y `app`.

**Development Experience:**

- Dev server oficial de Next.js.
- Hot reload / Fast Refresh.
- ESLint inicial.
- Integración natural con TypeScript, Tailwind y Vercel.

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

1. Usar contenido local versionado en Git para proyectos y blog.
2. No usar base de datos en MVP.
3. Usar MDX/Markdown con frontmatter validado para proyectos y posts.
4. Implementar `/api/contact` como Next.js Route Handler.
5. Validar formularios con Zod tanto en cliente como servidor.
6. Usar Resend como proveedor de email.
7. No implementar autenticación en MVP.
8. Usar Vercel como plataforma de deploy.
9. Centralizar componentes UI, tokens, motion y contenido.

**Important Decisions (Shape Architecture):**

1. Usar Server Components por defecto y Client Components solo donde haya interacción.
2. Usar Tailwind CSS custom para sistema visual.
3. Usar Framer Motion para micro-interacciones y transiciones; evitar GSAP salvo necesidad real.
4. Usar `next/image` para screenshots y assets.
5. Usar Vercel Analytics para métricas.
6. Usar testing E2E selectivo para flujos críticos.

**Deferred Decisions (Post-MVP):**

1. CMS headless: diferido porque Git + MDX es suficiente y más simple.
2. Base de datos: diferida porque no hay datos dinámicos persistentes.
3. Autenticación/admin: fuera de scope según PRD.
4. Newsletter/comentarios: fuera de scope.
5. i18n: fuera de scope inicial.

### Data Architecture

**Decision: Local content-first architecture using Git-versioned MDX/Markdown.**

Los proyectos y posts vivirán como archivos locales dentro del repo, separados de la lógica de aplicación.

Propuesta de estructura:

```text
src/content/projects/
src/content/blog/
src/lib/content/
```

Cada entrada tendrá frontmatter estructurado y validado con Zod. El contenido se cargará en build-time o server-side desde archivos locales.

**Rationale:**

- El PRD requiere agregar proyectos sin modificar lógica central.
- No hay necesidad de usuarios, panel admin ni contenido editable en runtime.
- Git ofrece historial, revisión y control de cambios.
- MDX permite mezclar contenido técnico, snippets y componentes visuales.

**Version / current context:**

- Next.js App Router continúa soportando MDX en Server Components.
- `next-mdx-remote` aparece como opción menos ideal para nuevo desarrollo porque su repo fue archivado en 2026.
- Se recomienda evitar depender de starters MDX abandonados o demasiado opinionados.

**Caching Strategy:**

- Contenido estático generado por Next.js.
- Usar SSG/metadata generation donde aplique.
- Imágenes optimizadas con `next/image`.

### Authentication & Security

**Decision: No authentication for MVP.**

No habrá login, usuarios ni panel admin.

**Rationale:**

- El PRD declara fuera de scope dashboard/admin.
- El contenido se gestiona por Git.
- Reducir superficie de ataque y complejidad.

**Decision: Secure contact endpoint with layered validation.**

El endpoint `/api/contact` debe incluir:

- Validación server-side con Zod.
- Honeypot anti-spam.
- Normalización/sanitización básica de inputs.
- Mensajes de error seguros sin filtrar detalles internos.
- Variables de entorno para API keys.
- Rate limiting ligero si se incorpora una solución compatible con Vercel.

**Rationale:**

- Es el principal punto público de entrada al backend.
- El portfolio debe demostrar calidad full-stack sin abrir riesgos innecesarios.

### API & Communication Patterns

**Decision: Use Next.js Route Handler for `/api/contact`.**

Ruta propuesta:

```text
src/app/api/contact/route.ts
```

Contrato de entrada:

```ts
{
  name: string
  email: string
  subject: string
  message: string
  company?: string
}
```

Donde `company` puede funcionar como honeypot.

**Decision: REST-style single-purpose endpoint.**

No usar GraphQL, tRPC ni una capa API compleja.

**Rationale:**

- Solo hay un endpoint público requerido.
- REST simple es suficiente, claro y fácil de auditar.
- Evita sobre-ingeniería.

**Decision: Standardized API response shape.**

Respuesta recomendada:

```ts
type ApiResponse<T = unknown> =
  | { ok: true; data?: T; message?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }
```

**Decision: Resend for email delivery.**

Resend se mantiene como proveedor preferido.

**Version / current context:**

- La documentación actual de Resend indica API REST y límites/rate limits por equipo/API key.
- El endpoint propio debe manejar errores de Resend de forma segura y mostrar mensajes de retry al usuario.

### Frontend Architecture

**Decision: Server-first component architecture.**

Usar React Server Components por defecto en páginas, layouts y lectura de contenido. Usar Client Components solo para:

- Formulario de contacto.
- Theme toggle.
- Mobile navigation.
- Componentes animados con Framer Motion.
- Interacciones de hover/focus avanzadas si requieren estado.

**Rationale:**

- Menor bundle JS.
- Mejor performance y SEO.
- Encaja con App Router.

**Decision: Component structure by responsibility.**

Estructura recomendada:

```text
src/app/
src/components/ui/
src/components/layout/
src/components/sections/
src/components/content/
src/components/forms/
src/lib/
src/content/
src/styles/
```

**Decision: Minimal global state.**

No usar Redux, Zustand ni estado global para MVP.

Estado local suficiente para:

- Formulario.
- Tema.
- Menú mobile.
- Estados de animación/UI.

**Decision: Tailwind custom design system.**

Definir tokens en configuración/global CSS para:

- Colores.
- Tipografía.
- Espaciado.
- Radius.
- Focus rings.
- Dark/light theme.

Usar componentes propios para:

- `Button`
- `Card`
- `Badge`
- `Section`
- `Container`
- `ProjectCard`
- `ContactForm`

Usar shadcn/ui solo selectivamente para piezas complejas como `Sheet` o `Dialog`.

**Decision: Motion system centralized.**

Crear utilidades/variants reutilizables para:

- `fadeIn`
- `slideUp`
- `stagger`
- page transitions si aplica

Reglas:

- Respetar `prefers-reduced-motion`.
- Animar principalmente `transform` y `opacity`.
- Evitar animaciones bloqueantes o decorativas excesivas.

**Decision: SEO and metadata per route.**

Cada página de proyecto y post debe generar:

- `title`
- `description`
- Open Graph image/data
- canonical si aplica

### Infrastructure & Deployment

**Decision: Deploy on Vercel.**

Vercel será plataforma principal.

**Rationale:**

- Integración nativa con Next.js.
- Preview deployments.
- Serverless Route Handlers.
- Analytics integrado.
- CI/CD simple desde Git.

**Decision: Environment variables managed by platform.**

Variables esperadas:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
NEXT_PUBLIC_SITE_URL
```

**Decision: Observability MVP via Vercel Analytics + structured server logs.**

- Vercel Analytics para tráfico y engagement básico.
- Logs del endpoint `/api/contact` sin registrar datos sensibles completos.
- Errores del formulario con mensajes seguros para usuario.

**Decision: CI/CD through Git push and Vercel preview deployments.**

- `main` despliega producción.
- Pull requests generan previews.
- Validaciones mínimas antes de merge: lint, typecheck y build.

### Decision Impact Analysis

**Implementation Sequence:**

1. Inicializar proyecto con `create-next-app@latest`.
2. Configurar Tailwind tokens, fuentes y tema base.
3. Definir estructura de carpetas.
4. Implementar modelos Zod para contenido y contacto.
5. Configurar carga de contenido local MDX/Markdown.
6. Crear layout, navegación, footer y componentes base.
7. Implementar proyectos y blog.
8. Implementar formulario y `/api/contact`.
9. Añadir motion system y `prefers-reduced-motion`.
10. Configurar SEO/metadata, analytics y deploy.

**Cross-Component Dependencies:**

- El content model afecta rutas dinámicas, SEO, cards, case studies y blog.
- El sistema de tokens afecta todos los componentes UI.
- La estrategia server-first condiciona qué componentes deben llevar `"use client"`.
- El endpoint de contacto depende de validación compartida con el formulario.
- La estrategia de motion debe integrarse con accesibilidad y performance desde el inicio.
- Vercel define el modelo de env vars, serverless API y preview deployments.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**

Se identifican 10 áreas donde diferentes agentes podrían tomar decisiones incompatibles:

1. Naming de archivos y componentes.
2. Organización de carpetas.
3. Modelado de contenido MDX/frontmatter.
4. Respuestas API.
5. Errores y validación.
6. Estado de UI.
7. Server vs Client Components.
8. Motion/animaciones.
9. SEO/metadata.
10. Testing y verificación.

### Naming Patterns

**Database Naming Conventions:**

No hay base de datos en MVP.

Reglas:

- No crear tablas, ORMs, migraciones ni modelos persistentes.
- Si una historia futura introduce base de datos, debe requerir nueva decisión arquitectónica.
- No usar Prisma, Drizzle, Supabase ni SQLite salvo cambio formal de arquitectura.

**API Naming Conventions:**

- Endpoints REST en lowercase.
- Usar rutas descriptivas y singulares solo cuando representen una acción única.
- Endpoint de contacto oficial: `/api/contact`.
- Route Handler oficial: `src/app/api/contact/route.ts`.
- Campos JSON en `camelCase`.
- Headers custom, si aparecen, usar formato `X-Portfolio-*`.

Ejemplo correcto:

```ts
POST /api/contact

{
  "name": "Ian",
  "email": "ian@example.com",
  "subject": "Proyecto",
  "message": "Hola",
  "company": ""
}
```

Anti-pattern:

```ts
POST /api/sendEmail
POST /api/contact-form-submit
{
  "user_email": "ian@example.com"
}
```

**Code Naming Conventions:**

- Componentes React: `PascalCase`.
- Archivos de componentes: `PascalCase.tsx`.
- Hooks: `useSomething.ts`.
- Helpers/utilidades: `camelCase.ts`.
- Schemas Zod: `thingSchema`.
- Types/interfaces: `PascalCase`.
- Variables y funciones: `camelCase`.
- Constantes globales: `UPPER_SNAKE_CASE`.
- Slugs de contenido: `kebab-case`.

Ejemplos:

```text
src/components/ui/Button.tsx
src/components/content/ProjectCard.tsx
src/components/forms/ContactForm.tsx
src/lib/content/getProjects.ts
src/lib/validation/contactSchema.ts
src/content/projects/ecommerce-dashboard.mdx
```

Anti-patterns:

```text
button.tsx
project_card.tsx
Contactform.tsx
get_projects.ts
EcommerceDashboard.mdx
```

### Structure Patterns

**Project Organization:**

Usar organización por responsabilidad, no por feature aislada.

Estructura base:

```text
src/app/
src/components/ui/
src/components/layout/
src/components/sections/
src/components/content/
src/components/forms/
src/content/projects/
src/content/blog/
src/lib/content/
src/lib/validation/
src/lib/email/
src/lib/seo/
src/lib/utils/
src/styles/
public/
```

Reglas:

- `src/app/` contiene rutas, layouts, metadata y Route Handlers.
- `src/components/ui/` contiene primitivas reutilizables sin lógica de negocio.
- `src/components/layout/` contiene Header, Footer, Navigation, Container global.
- `src/components/sections/` contiene secciones de páginas como Hero, FeaturedProjects, ContactPreview.
- `src/components/content/` contiene componentes para proyectos/blog/case studies.
- `src/components/forms/` contiene formularios interactivos.
- `src/content/` contiene solo contenido versionado.
- `src/lib/content/` contiene loaders/parsers de contenido.
- `src/lib/validation/` contiene schemas compartidos.
- `src/lib/email/` contiene integración con Resend.
- `src/lib/seo/` contiene helpers de metadata.
- `src/lib/utils/` contiene utilidades genéricas.

**File Structure Patterns:**

- Colocar tests unitarios co-localizados como `*.test.ts` o `*.test.tsx` si se agregan.
- Colocar E2E en `tests/e2e/`.
- Assets públicos en `public/`.
- Imágenes de proyectos en `public/projects/[slug]/`.
- CV en `public/cv/`.
- No crear carpetas genéricas ambiguas como `helpers/`, `misc/`, `common/` si existe una categoría más precisa.

Ejemplo correcto:

```text
public/projects/ecommerce-dashboard/cover.webp
public/cv/ian-vazquez-cv.pdf
tests/e2e/contact.spec.ts
```

### Format Patterns

**API Response Formats:**

Todos los endpoints deben usar el wrapper estándar:

```ts
type ApiResponse<T = unknown> =
  | { ok: true; data?: T; message?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }
```

Ejemplo éxito:

```json
{
  "ok": true,
  "message": "Mensaje enviado correctamente."
}
```

Ejemplo error:

```json
{
  "ok": false,
  "error": "Revisá los campos marcados.",
  "fieldErrors": {
    "email": ["Ingresá un email válido."]
  }
}
```

Reglas:

- No devolver errores internos al cliente.
- No mezclar `success`, `status`, `ok` en distintos endpoints.
- No devolver HTML desde API routes.
- Status codes:
  - `200` para éxito.
  - `400` para validación.
  - `429` para rate limit.
  - `500` para error inesperado.

**Data Exchange Formats:**

- JSON en `camelCase`.
- Fechas en ISO 8601 string.
- Slugs en `kebab-case`.
- Booleanos como `true`/`false`.
- Campos opcionales pueden omitirse; evitar `null` salvo que tenga significado explícito.

**Content Frontmatter Format:**

Proyectos:

```yaml
---
title: "Ecommerce Dashboard"
slug: "ecommerce-dashboard"
summary: "Dashboard full stack para gestión de ventas."
publishedAt: "2026-05-25"
featured: true
stack:
  - "Next.js"
  - "TypeScript"
  - "Tailwind CSS"
demoUrl: "https://example.com"
repoUrl: "https://github.com/user/repo"
coverImage: "/projects/ecommerce-dashboard/cover.webp"
---
```

Posts:

```yaml
---
title: "Cómo diseñé un endpoint de contacto seguro"
slug: "endpoint-contacto-seguro"
summary: "Decisiones detrás de validación, honeypot y Resend."
publishedAt: "2026-05-25"
tags:
  - "Next.js"
  - "Security"
  - "Forms"
---
```

### Communication Patterns

**Event System Patterns:**

No hay event bus ni sistema de eventos en MVP.

Reglas:

- No introducir pub/sub, event emitters o colas.
- Para interacciones UI usar estado local React.
- Para analytics usar eventos directos del proveedor si se agregan explícitamente.

**State Management Patterns:**

- No usar Redux/Zustand/Jotai para MVP.
- Estado local con `useState`, `useReducer` o React Hook Form.
- Tema persistido con `localStorage` y/o script inicial anti-flash.
- El estado de formulario debe usar nombres consistentes:
  - `idle`
  - `validating`
  - `loading`
  - `success`
  - `error`

Ejemplo:

```ts
type FormStatus = "idle" | "validating" | "loading" | "success" | "error"
```

### Process Patterns

**Error Handling Patterns:**

- Validar con Zod en cliente y servidor cuando aplique.
- En servidor, loguear errores técnicos sin exponerlos al cliente.
- En UI, mostrar mensajes accionables y humanos.
- Nunca perder los datos del formulario por un error de envío.
- Usar error boundaries para segmentos de UI complejos si se incorporan.

Mensaje correcto:

```text
No pude enviar el mensaje. Revisá tu conexión e intentá de nuevo.
```

Anti-pattern:

```text
ResendError: API key invalid at sendEmail()
```

**Loading State Patterns:**

- Loading local por componente, no global.
- Botones de submit muestran estado loading y se deshabilitan durante envío.
- Evitar spinners genéricos si un estado inline es suficiente.
- Para contenido estático, preferir render server/static en vez de loaders client-side.

### Server/Client Component Rules

**All AI agents MUST:**

- Usar Server Components por defecto.
- Agregar `"use client"` solo cuando el componente use hooks, eventos de navegador, Framer Motion o `localStorage`.
- Mantener lectura de contenido en server-side helpers.
- No importar módulos server-only en Client Components.
- Separar wrappers animados client-side de contenido server-rendered cuando sea posible.

Ejemplo correcto:

```text
ProjectPage.server reads content
ProjectCard renders static content
AnimatedSection handles motion as client wrapper
```

### Motion Patterns

- Centralizar variants en `src/lib/motion/` o archivo equivalente.
- Respetar `prefers-reduced-motion`.
- Animar solo `transform` y `opacity` por defecto.
- Stagger recomendado: `80ms-120ms`.
- No bloquear contenido crítico detrás de animaciones.
- No introducir GSAP salvo decisión explícita por necesidad real.

### SEO & Metadata Patterns

- Cada ruta pública debe definir metadata.
- Proyectos y posts generan metadata desde frontmatter.
- Open Graph debe usar imagen por página si existe.
- `NEXT_PUBLIC_SITE_URL` se usa para URLs absolutas.
- No duplicar metadata manualmente si existe helper central.

### Enforcement Guidelines

**All AI Agents MUST:**

- Seguir la estructura de carpetas definida.
- Usar `camelCase` en JSON, variables y funciones.
- Usar `PascalCase` para componentes y sus archivos.
- Usar `kebab-case` para slugs.
- Usar el wrapper estándar `ApiResponse`.
- Validar schemas compartidos con Zod.
- Usar Server Components por defecto.
- No introducir base de datos, auth, CMS, estado global o event bus sin nueva decisión arquitectónica.
- Mantener accesibilidad WCAG 2.1 AA como baseline.
- Respetar `prefers-reduced-motion`.

**Pattern Enforcement:**

- Verificar con `npm run lint`.
- Verificar con `npm run build`.
- Typecheck obligatorio antes de considerar una historia completa.
- Revisar rutas, nombres y API shapes contra este documento.
- Cualquier patrón nuevo debe añadirse a este documento antes de usarse en múltiples lugares.

### Pattern Examples

**Good Examples:**

```text
src/components/ui/Button.tsx
src/components/forms/ContactForm.tsx
src/lib/validation/contactSchema.ts
src/app/api/contact/route.ts
src/content/projects/portfolio-ian.mdx
```

```ts
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
  company: z.string().optional(),
})
```

```ts
return Response.json(
  { ok: false, error: "Revisá los campos marcados.", fieldErrors },
  { status: 400 }
)
```

**Anti-Patterns:**

```text
src/helpers/
src/common/
src/components/button.tsx
src/app/api/sendEmail/route.ts
src/content/projects/PortfolioIan.mdx
```

```ts
return Response.json({ success: false, msg: error.message })
```

```ts
"use client"
// added to a full page only because one child needs hover state
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
portfolio-ian/
├── README.md
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── tailwind.config.ts
├── .env.example
├── .env.local
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
│   ├── cv/
│   │   └── ian-vazquez-cv.pdf
│   ├── og/
│   │   └── default-og.webp
│   ├── projects/
│   │   └── portfolio-ian/
│   │       ├── cover.webp
│   │       └── screenshot-01.webp
│   └── icons/
│       └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   └── VisuallyHidden.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── sections/
│   │   │   ├── AboutPreview.tsx
│   │   │   ├── BlogPreview.tsx
│   │   │   ├── ContactPreview.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   └── MetricsSection.tsx
│   │   ├── content/
│   │   │   ├── ArchitectureDiagram.tsx
│   │   │   ├── BlogPostCard.tsx
│   │   │   ├── CaseStudyLayout.tsx
│   │   │   ├── MDXComponents.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── TechStackBadges.tsx
│   │   ├── forms/
│   │   │   └── ContactForm.tsx
│   │   └── motion/
│   │       ├── AnimatedSection.tsx
│   │       └── StaggeredGrid.tsx
│   ├── content/
│   │   ├── projects/
│   │   │   └── portfolio-ian.mdx
│   │   └── blog/
│   │       └── endpoint-contacto-seguro.mdx
│   ├── lib/
│   │   ├── content/
│   │   │   ├── getBlogPosts.ts
│   │   │   ├── getProjects.ts
│   │   │   ├── mdx.ts
│   │   │   └── schemas.ts
│   │   ├── email/
│   │   │   └── sendContactEmail.ts
│   │   ├── motion/
│   │   │   └── variants.ts
│   │   ├── seo/
│   │   │   ├── metadata.ts
│   │   │   └── site.ts
│   │   ├── validation/
│   │   │   └── contactSchema.ts
│   │   ├── api/
│   │   │   └── responses.ts
│   │   └── utils/
│   │       ├── cn.ts
│   │       ├── formatDate.ts
│   │       └── readingTime.ts
│   ├── styles/
│   │   └── tokens.css
│   └── types/
│       ├── api.ts
│       ├── content.ts
│       └── navigation.ts
├── tests/
│   └── e2e/
│       ├── contact.spec.ts
│       ├── navigation.spec.ts
│       └── project-detail.spec.ts
└── _bmad-output/
    └── planning-artifacts/
        └── architecture.md
```

### Architectural Boundaries

**API Boundaries:**

- Public API surface is limited to `POST /api/contact`.
- Route Handler lives only at `src/app/api/contact/route.ts`.
- API response format comes from `src/lib/api/responses.ts`.
- Request validation comes from `src/lib/validation/contactSchema.ts`.
- Email delivery is isolated in `src/lib/email/sendContactEmail.ts`.
- API routes must not import UI components.
- Client components must not import server-only email logic.

**Component Boundaries:**

- `components/ui/` contains visual primitives with no domain knowledge.
- `components/layout/` contains global shell and navigation.
- `components/sections/` contains home/page-level sections.
- `components/content/` contains project, blog and case-study presentation.
- `components/forms/` contains interactive form components.
- `components/motion/` contains client-side motion wrappers.
- Server Components are default; Client Components are isolated to forms, theme, nav and motion.

**Service Boundaries:**

- `lib/content/` owns filesystem/MDX loading and schema validation for content.
- `lib/email/` owns Resend integration.
- `lib/validation/` owns shared Zod schemas.
- `lib/seo/` owns metadata and site config helpers.
- `lib/api/` owns API response shape helpers.
- `lib/utils/` owns generic pure utilities.

**Data Boundaries:**

- Content data lives in `src/content/`.
- Static project assets live in `public/projects/[slug]/`.
- CV lives in `public/cv/`.
- No runtime database, ORM or migration directory exists in MVP.
- Content frontmatter is the boundary between editorial content and typed application data.

### Requirements to Structure Mapping

**Feature/Epic Mapping:**

**CG-01 Navegación & Estructura**

- Routes: `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`
- Layout: `src/app/layout.tsx`
- Components: `src/components/layout/Header.tsx`, `Footer.tsx`, `Navigation.tsx`, `MobileNav.tsx`
- Shared UI: `src/components/ui/Container.tsx`, `Section.tsx`

**CG-02 Presentación de Proyectos**

- Routes: `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx`
- Content: `src/content/projects/*.mdx`
- Loaders: `src/lib/content/getProjects.ts`
- Schemas: `src/lib/content/schemas.ts`
- Components: `ProjectCard.tsx`, `CaseStudyLayout.tsx`, `TechStackBadges.tsx`, `ArchitectureDiagram.tsx`
- Assets: `public/projects/[slug]/`

**CG-03 Sistema de Contacto**

- Page: `src/app/contact/page.tsx`
- API: `src/app/api/contact/route.ts`
- Form: `src/components/forms/ContactForm.tsx`
- Validation: `src/lib/validation/contactSchema.ts`
- Email: `src/lib/email/sendContactEmail.ts`
- Response helpers: `src/lib/api/responses.ts`
- E2E: `tests/e2e/contact.spec.ts`

**CG-04 Blog Técnico**

- Routes: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`
- Content: `src/content/blog/*.mdx`
- Loader: `src/lib/content/getBlogPosts.ts`
- Components: `BlogPostCard.tsx`, `MDXComponents.tsx`, `CodeBlock.tsx`
- Utilities: `readingTime.ts`, `formatDate.ts`

**CG-05 Animaciones & UX**

- Components: `src/components/motion/AnimatedSection.tsx`, `StaggeredGrid.tsx`
- Variants: `src/lib/motion/variants.ts`
- UI integration: sections and cards import motion wrappers only when needed.
- Accessibility rule: all motion components must respect `prefers-reduced-motion`.

**CG-06 Tema Oscuro**

- Component: `src/components/layout/ThemeToggle.tsx`
- Theme initialization: `src/app/layout.tsx`
- Tokens: `src/styles/tokens.css`, `src/app/globals.css`
- State: local/browser only; no global state library.

**CG-07 SEO & Performance**

- Metadata helpers: `src/lib/seo/metadata.ts`, `src/lib/seo/site.ts`
- App metadata: `src/app/layout.tsx`
- Dynamic metadata: project/blog detail pages.
- Robots/sitemap: `src/app/robots.ts`, `src/app/sitemap.ts`
- Images: `next/image` with assets in `public/projects/` and `public/og/`

**CG-08 Descarga de CV**

- Asset: `public/cv/ian-vazquez-cv.pdf`
- Links: Header/About/Contact components.
- No API route needed.

**Cross-Cutting Concerns:**

- Accessibility: all UI components, forms, navigation and MDX components.
- Performance: `next/image`, Server Components, restrained Client Components, motion limits.
- Security: API validation, honeypot, env vars, safe error handling.
- Maintainability: typed schemas, clear folder ownership, no ambiguous shared folders.
- SEO: central helpers and metadata generated from content.

### Integration Points

**Internal Communication:**

- Pages read content through `lib/content/*`.
- Pages pass typed data into presentational components.
- Client forms submit to `/api/contact`.
- API route validates request, calls email service and returns standard `ApiResponse`.
- Components use `lib/utils/cn.ts` for class composition.
- Metadata helpers consume content frontmatter and site config.

**External Integrations:**

- Resend: `src/lib/email/sendContactEmail.ts`
- Vercel Analytics: configured in app layout or provider component if added.
- Vercel platform: env vars, deploy previews, serverless route execution.
- Browser APIs: `localStorage` only in theme-related Client Components.

**Data Flow:**

```text
MDX file
→ lib/content loader
→ Zod/frontmatter validation
→ typed Project/Post object
→ route page
→ presentational components
→ metadata generation
```

```text
ContactForm
→ POST /api/contact
→ contactSchema validation
→ honeypot check
→ sendContactEmail
→ Resend
→ standardized ApiResponse
→ UI success/error state
```

### File Organization Patterns

**Configuration Files:**

- Root config files stay at project root.
- `.env.example` documents required variables.
- `.env.local` is local-only and must not be committed.
- CI config lives in `.github/workflows/ci.yml`.
- Tailwind tokens live in `tailwind.config.ts` plus `src/styles/tokens.css`.

**Source Organization:**

- `src/app/` is routing and composition.
- `src/components/` is reusable UI and presentation.
- `src/lib/` is non-UI logic.
- `src/content/` is editorial source.
- `src/types/` is shared TypeScript types only when not colocated.

**Test Organization:**

- E2E tests live in `tests/e2e/`.
- Unit tests may be colocated near files as `*.test.ts` or `*.test.tsx`.
- Critical E2E flows:
  - navigation
  - project detail page
  - contact form success/error

**Asset Organization:**

- Project images: `public/projects/[slug]/`.
- OG images: `public/og/`.
- CV PDF: `public/cv/`.
- Icons/favicons: `public/icons/`.

### Development Workflow Integration

**Development Server Structure:**

- Next.js dev server uses `src/app`.
- Content changes in `src/content/` should update pages during dev.
- Client-only behavior stays isolated in Client Components.

**Build Process Structure:**

- Build validates TypeScript, routes, MDX loading and metadata generation.
- Static content is read during build/server render.
- No database or migration step required.

**Deployment Structure:**

- Vercel deploys the Next.js app.
- `main` branch maps to production.
- Pull requests map to preview deployments.
- Env vars configured in Vercel:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`
  - `NEXT_PUBLIC_SITE_URL`

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**

Las decisiones arquitectónicas son compatibles entre sí:

- `create-next-app@latest`, Next.js App Router, TypeScript y Tailwind CSS forman una base coherente.
- La arquitectura content-first con MDX/local files encaja con el objetivo de portfolio mantenible sin CMS ni base de datos.
- Resend + Route Handler `/api/contact` cubre el backend real requerido sin introducir infraestructura innecesaria.
- Server Components por defecto + Client Components aislados soportan performance, SEO y UX interactiva.
- Vercel como hosting encaja con Next.js, Route Handlers, env vars, preview deploys y analytics.

No se detectan contradicciones críticas.

**Pattern Consistency:**

Los patrones definidos apoyan las decisiones:

- Naming `PascalCase` para componentes, `camelCase` para código/JSON y `kebab-case` para slugs evita conflictos.
- `ApiResponse` estándar unifica comunicación cliente-servidor.
- Zod compartido para validación mantiene consistencia entre formulario y API.
- Reglas de Server/Client Components reducen bundle JS y evitan imports incompatibles.
- Motion centralizado con `prefers-reduced-motion` alinea UX con performance/accesibilidad.

**Structure Alignment:**

La estructura propuesta soporta la arquitectura:

- `src/app/` contiene rutas y composición.
- `src/content/` separa contenido editorial de lógica.
- `src/lib/content/`, `src/lib/validation/`, `src/lib/email/`, `src/lib/seo/` separan responsabilidades.
- `src/components/*` distingue UI primitiva, layout, secciones, contenido, formularios y motion.
- `tests/e2e/` cubre flujos críticos sin imponer testing excesivo.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**

No se cargaron epics/stories separadas, pero las 8 capability groups del PRD están mapeadas a estructura concreta:

- CG-01 Navegación & Estructura → `src/app`, `components/layout`, `components/ui`.
- CG-02 Presentación de Proyectos → `src/app/projects`, `src/content/projects`, `lib/content`, `components/content`.
- CG-03 Sistema de Contacto → `ContactForm`, `/api/contact`, `contactSchema`, `sendContactEmail`, `ApiResponse`.
- CG-04 Blog Técnico → `src/app/blog`, `src/content/blog`, `getBlogPosts`, `MDXComponents`.
- CG-05 Animaciones & UX → `components/motion`, `lib/motion/variants.ts`.
- CG-06 Tema Oscuro → `ThemeToggle`, `layout.tsx`, `tokens.css`, `globals.css`.
- CG-07 SEO & Performance → `lib/seo`, `robots.ts`, `sitemap.ts`, `next/image`, metadata por ruta.
- CG-08 Descarga de CV → `public/cv/ian-vazquez-cv.pdf` y links desde UI.

**Functional Requirements Coverage:**

Todos los FRs del PRD tienen soporte arquitectónico:

- FR-01 a FR-03: rutas, layout, header/footer y navegación responsive.
- FR-04 a FR-06a: listado/detalle de proyectos y contenido escalable en MDX.
- FR-07 a FR-10: formulario, API, estados UI, validación y honeypot.
- FR-11 a FR-13a: blog MDX, listado, detalle y metadata.
- FR-14 a FR-17: motion system, page/scroll transitions y reduced motion.
- FR-18 a FR-20: theme toggle, localStorage y anti-flash.
- FR-21 a FR-24: metadata, Open Graph, imágenes optimizadas y Core Web Vitals.
- FR-25 a FR-26: CV estático en `public/cv`.

**Non-Functional Requirements Coverage:**

- Performance: Server Components por defecto, `next/image`, contenido local, Client Components mínimos, motion limitada.
- Accesibilidad: WCAG 2.1 AA como baseline, focus states, labels, reduced motion, diagramas con alternativa textual.
- Seguridad: validación Zod server-side, honeypot, env vars, errores seguros, no auth/admin.
- Mantenibilidad: TypeScript, Zod schemas, carpetas con ownership claro, patrones de naming.
- Responsive: mobile-first, Tailwind breakpoints y componentes layout separados.
- Browser support: alineado con Next.js moderno y últimas versiones de navegadores.
- Deploy: Vercel, env vars, previews, build/lint/typecheck.

### Implementation Readiness Validation ✅

**Decision Completeness:**

Las decisiones críticas están documentadas con racionales claros:

- Starter.
- Stack.
- Contenido.
- API.
- Seguridad.
- Frontend architecture.
- Infraestructura.
- Estructura.
- Patrones de consistencia.

Área menor: algunas versiones exactas de paquetes quedan delegadas a `@latest`/instalación actual, lo cual es aceptable para el handoff siempre que implementación verifique lockfile.

**Structure Completeness:**

La estructura es suficientemente completa para guiar implementación:

- Incluye root config files.
- Incluye rutas Next.js.
- Incluye componentes por responsabilidad.
- Incluye contenido MDX.
- Incluye libs por boundary.
- Incluye public assets.
- Incluye E2E tests críticos.
- Excluye correctamente DB/auth/CMS.

**Pattern Completeness:**

Los patrones cubren los conflictos más probables:

- Naming.
- Estructura.
- API format.
- Frontmatter.
- Validación.
- Estado.
- Error/loading states.
- Server/client split.
- Motion.
- SEO.
- Enforcement.

### Gap Analysis Results

**Critical Gaps:**

No se detectan gaps críticos que bloqueen implementación.

**Important Gaps:**

1. **MDX processing exacto no está decidido a nivel de librería.**
   - Rationale: La arquitectura define MDX/local content y evita `next-mdx-remote`, pero la implementación deberá elegir el mecanismo exacto compatible con App Router.
   - Resolución propuesta: tratarlo como decisión de implementación dentro del boundary `src/lib/content/mdx.ts`, manteniendo Zod/frontmatter y sin introducir CMS.

2. **Testing framework exacto no está fijado.**
   - Rationale: Se definió E2E selectivo, pero no se nombró Playwright explícitamente como dependencia obligatoria.
   - Resolución propuesta: usar Playwright cuando se implemente E2E, pero no bloquear la arquitectura.

3. **Rate limiting exacto del endpoint no está fijado.**
   - Rationale: Se definió como “ligero si se incorpora una solución compatible con Vercel”.
   - Resolución propuesta: MVP puede iniciar con honeypot + validación + límites de Resend; rate limiting externo queda como mejora si aparece abuso.

**Nice-to-Have Gaps:**

1. Definir plantilla concreta de contenido para proyectos reales.
2. Definir convención para imágenes OG generadas vs estáticas.
3. Añadir checklist de accesibilidad por componente.
4. Definir estrategia futura si se migra de MDX local a CMS.

### Validation Issues Addressed

No hubo issues críticos que requieran rediseño.

Las brechas identificadas son importantes/menores y pueden resolverse durante implementación sin contradecir la arquitectura:

- MDX loader exacto vive dentro de `src/lib/content/mdx.ts`.
- E2E recomendado con Playwright cuando se agregue suite.
- Rate limiting puede evolucionar sin cambiar API contract.

### Architecture Completeness Checklist

**Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** high

**Key Strengths:**

- Arquitectura simple, explícita y alineada al alcance real del portfolio.
- Evita sobre-ingeniería: no DB, no auth, no CMS, no estado global.
- Mantiene capacidad full-stack real mediante `/api/contact` + Resend.
- Buen balance entre performance, UX premium y mantenibilidad.
- Patrones suficientemente concretos para coordinar múltiples agentes AI.
- Estructura mapea todos los FRs/NFRs a ubicaciones claras.

**Areas for Future Enhancement:**

- CMS headless si el volumen de contenido crece.
- Rate limiting persistente si el endpoint recibe abuso.
- Generación automática de OG images.
- Dashboard/admin si en una fase futura se necesita edición no técnica.
- i18n si cambia la audiencia objetivo.

### Implementation Handoff

**AI Agent Guidelines:**

- Follow all architectural decisions exactly as documented.
- Use implementation patterns consistently across all components.
- Respect project structure and boundaries.
- Refer to this document for all architectural questions.
- Do not introduce DB/auth/CMS/global state/event bus without explicit architecture change.
- Keep Server Components as default.
- Keep accessibility and performance as acceptance criteria, not polish.

**First Implementation Priority:**

```bash
npx create-next-app@latest portfolio-ian --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```
