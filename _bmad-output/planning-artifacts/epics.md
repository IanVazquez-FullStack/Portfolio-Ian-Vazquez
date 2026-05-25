---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - "_bmad-output/planning-artifacts/prd-2026-05-24/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
project_name: "portfolio-ian"
user_name: "Ian"
date: "2026-05-25"
status: "complete"
---

# portfolio-ian - Epic Breakdown

## Overview

Este documento descompone los requerimientos del PRD, la UX Design Specification y la Architecture Decision Document de **portfolio-ian** en épicas e historias implementables. Cada épica es independiente y entrega valor al usuario final sin depender de épicas futuras, respetando la arquitectura definida (Next.js 14+ App Router, TypeScript estricto, Tailwind custom, MDX local, `/api/contact` con Resend, deploy en Vercel) y los patrones de UX (dark mode por defecto, motion centralizado, WCAG 2.1 AA).

## Requirements Inventory

### Functional Requirements

- **FR-01:** Home como landing scroll (Hero + Proyectos destacados + About preview + Contact preview) con navegación suave.
- **FR-02:** Header persistente con logo y links (Proyectos, Blog, About, Contact), responsive con menú hamburguesa en mobile.
- **FR-03:** Footer consistente con links sociales, email, copyright y link a CV.
- **FR-04:** Grid de proyectos en Home (3-4 destacados con imagen, título, tech stack resumido, link a detalle).
- **FR-05:** Página `/projects` con grid completo.
- **FR-06:** Página `/projects/[slug]` con screenshots, descripción, stack, caso técnico (decisiones, arquitectura, lecciones), demo y repo.
- **FR-06a:** Sistema de contenido escalable (MDX + frontmatter validado).
- **FR-07:** Formulario de contacto (nombre, email, asunto, mensaje) con validación en tiempo real.
- **FR-08:** Endpoint `POST /api/contact` que envía email vía Resend.
- **FR-09:** Estados de UI del formulario: loading, success, error con retry.
- **FR-10:** Protección anti-spam (honeypot `company`).
- **FR-11:** `/blog` con listado ordenado por fecha (excerpt, fecha, tiempo de lectura).
- **FR-12:** `/blog/[slug]` con MDX, metadata y navegación prev/next.
- **FR-13:** Posts en MDX con syntax highlighting.
- **FR-13a:** Artículos técnicos 5-10 min (behind-the-scenes, tutoriales).
- **FR-14:** Animaciones de entrada (fade-in/slide-in al viewport, staggered).
- **FR-15:** Transiciones de página con AnimatePresence.
- **FR-16:** Micro-interacciones (hover/touch).
- **FR-17:** Performance de animaciones (`transform`/`opacity`, `prefers-reduced-motion`).
- **FR-18:** Toggle de tema light/dark en header.
- **FR-19:** Persistencia en `localStorage` + `prefers-color-scheme` default.
- **FR-20:** Tailwind dark mode sin flash.
- **FR-21:** Meta tags dinámicos por página (Metadata API).
- **FR-22:** Open Graph para redes/LinkedIn.
- **FR-23:** Optimización de imágenes (`next/image`, WebP, lazy).
- **FR-24:** Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **FR-25:** Botón de descarga CV en header/About.
- **FR-26:** CV PDF estático en `public/cv/`.

### NonFunctional Requirements

- **NFR-01:** Lighthouse > 90 en todas las categorías.
- **NFR-02:** WCAG 2.1 AA, navegación por teclado, screen reader.
- **NFR-03:** Validación frontend/backend, protección XSS/CSRF.
- **NFR-04:** TypeScript estricto, código modular, componentes reutilizables.
- **NFR-05:** Mobile-first responsive.
- **NFR-06:** Chrome/Firefox/Safari/Edge últimas 2 versiones.
- **NFR-07:** CI/CD automático en push a `main` (Vercel).

### Additional Requirements

- **AR-01 (Starter):** Inicializar con `npx create-next-app@latest portfolio-ian --ts --tailwind --eslint --app --src-dir --import-alias "@/*"` (primera historia).
- **AR-02:** Estructura `src/{app,components,content,lib,styles,types}`, `tests/e2e`, `public/{projects,cv,og,icons}`.
- **AR-03:** Endpoint único `POST /api/contact` con respuesta `ApiResponse<T>`.
- **AR-04:** Zod compartido cliente/servidor en `src/lib/validation/contactSchema.ts`.
- **AR-05:** Resend en `src/lib/email/sendContactEmail.ts` con env vars `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
- **AR-06:** Contenido local MDX en `src/content/{projects,blog}/*.mdx` con schemas Zod.
- **AR-07:** Server Components por defecto; Client solo para ContactForm, ThemeToggle, MobileNav, motion wrappers.
- **AR-08:** Naming: `PascalCase` componentes, `camelCase` utils/JSON, `kebab-case` slugs, `UPPER_SNAKE_CASE` constantes.
- **AR-09:** Sin DB, sin auth, sin estado global, sin event bus en MVP.
- **AR-10:** Deploy Vercel + preview deployments + lint/typecheck/build mínimos.
- **AR-11:** E2E con Playwright para flujos críticos (navegación, project detail, contact form) en `tests/e2e/`.
- **AR-12:** Vercel Analytics + logs estructurados sin filtrar datos sensibles.

### UX Design Requirements

- **UX-DR1:** Tokens Tailwind dark/light (background, foreground, accent cyan-500, accent-hover cyan-400, muted, muted-foreground, border, border-hover, success, error) en `tailwind.config.ts` + `tokens.css`.
- **UX-DR2:** Inter (body/headings) + JetBrains Mono (código) vía `next/font` con escala fluida.
- **UX-DR3:** Primitivas UI: `Button` (primary/secondary/ghost/link), `Card`, `Badge`, `Section`, `Container`, `VisuallyHidden`, `CodeBlock`.
- **UX-DR4:** Componentes de contenido: `ProjectCard` (hover reveal stack), `BlogPostCard`, `CaseStudyLayout`, `TechStackBadges`, `ArchitectureDiagram`, `MetricCard`, `MDXComponents`.
- **UX-DR5:** `ContactForm` con estados `idle | validating | loading | success | error`, validación en tiempo real, `aria-invalid`/`aria-describedby`, preservación de datos en error, honeypot invisible.
- **UX-DR6:** `ThemeToggle` con `prefers-color-scheme`, `localStorage`, script anti-flash, `aria-label` dinámico.
- **UX-DR7:** `MobileNav` con focus trap, Escape para cerrar, touch targets ≥ 44x44px.
- **UX-DR8:** Motion centralizado: `variants.ts` (`fadeIn`, `slideUp`, `stagger` 80-120ms), `AnimatedSection`, `StaggeredGrid`, solo `transform`/`opacity`, respeto a `prefers-reduced-motion`.
- **UX-DR9:** WCAG 2.1 AA: contraste 4.5:1, teclado, focus-visible accent, labels visibles, semántica `header/main/section/article/footer`, skip link, no depender solo del color.
- **UX-DR10:** Responsive mobile-first: mobile 1col, tablet 2col, desktop 2-3col, `max-w-7xl`, `py-32`/`py-20`, `px-6`→`px-8`→`px-12`.
- **UX-DR11:** Página 404 (`not-found.tsx`) custom con estética del portfolio y links a Home/Projects/Contact.
- **UX-DR12:** Empty states honestos para proyectos y blog.
- **UX-DR13:** Feedback patterns: success (verde + expectativa), error (rojo + retry sin perder datos), info (cyan sutil), loading (botón loading + skeleton sutil).
- **UX-DR14:** Header sticky con backdrop blur; link "Volver a proyectos/blog" en páginas de detalle.
- **UX-DR15:** Jerarquía de botones consistente: primary (accent), secondary (border), ghost (sin border).

### FR Coverage Map

- FR-01 → Epic 1 (Home compuesto con secciones).
- FR-02 → Epic 1 (Header + MobileNav).
- FR-03 → Epic 1 (Footer).
- FR-04 → Epic 2 (FeaturedProjects en Home).
- FR-05 → Epic 2 (`/projects`).
- FR-06 → Epic 2 (`/projects/[slug]` con CaseStudyLayout).
- FR-06a → Epic 2 (loader MDX + Zod).
- FR-07 → Epic 3 (ContactForm).
- FR-08 → Epic 3 (Route Handler + Resend).
- FR-09 → Epic 3 (estados UI + retry).
- FR-10 → Epic 3 (honeypot).
- FR-11 → Epic 4 (`/blog`).
- FR-12 → Epic 4 (`/blog/[slug]`).
- FR-13 → Epic 4 (pipeline MDX).
- FR-13a → Epic 4 (posts seed).
- FR-14 → Epic 5 (scroll reveals).
- FR-15 → Epic 5 (page transitions).
- FR-16 → Epic 5 (micro-interacciones).
- FR-17 → Epic 5 (performance motion + reduced-motion).
- FR-18 → Epic 1 (ThemeToggle).
- FR-19 → Epic 1 (persistencia + prefers-color-scheme).
- FR-20 → Epic 1 (anti-flash).
- FR-21 → Epic 6 (metadata dinámica).
- FR-22 → Epic 6 (Open Graph).
- FR-23 → Epic 6 (`next/image` audit).
- FR-24 → Epic 6 (Core Web Vitals).
- FR-25 → Epic 1 (CTA descarga CV).
- FR-26 → Epic 1 (PDF en `public/cv/`).
- NFR-01 → Epic 6.
- NFR-02 → Cross-cutting (AC por épica) + auditoría Epic 6.
- NFR-03 → Epic 3.
- NFR-04 → Epic 1 (baseline TS estricto).
- NFR-05 → Cross-cutting con baseline Epic 1.
- NFR-06 → Epic 6.
- NFR-07 → Epic 6.

## Epic List

### Epic 1: Foundation, Sistema de Diseño y Layout Shell
Sentar las bases técnicas y visuales: proyecto inicializado, tokens, primitivas UI, layout responsive, theming dark/light sin flash y CV descargable.
**FRs covered:** FR-01, FR-02, FR-03, FR-18, FR-19, FR-20, FR-25, FR-26.

### Epic 2: Vitrina de Proyectos y Casos Técnicos
Habilitar proyectos como casos técnicos navegables (Contexto → Problema → Decisiones → Arquitectura → Resultados) con sistema escalable MDX.
**FRs covered:** FR-04, FR-05, FR-06, FR-06a.

### Epic 3: Sistema de Contacto Full-Stack
Formulario real con backend funcional, validación cliente/servidor, Resend, honeypot, estados UI claros y preservación de datos.
**FRs covered:** FR-07, FR-08, FR-09, FR-10.

### Epic 4: Blog Técnico
Artículos MDX con syntax highlighting, metadata, tiempo de lectura y navegación prev/next.
**FRs covered:** FR-11, FR-12, FR-13, FR-13a.

### Epic 5: Animaciones y Motion Polish
Sistema de motion centralizado con scroll reveals, transiciones de página, micro-interacciones y `prefers-reduced-motion`.
**FRs covered:** FR-14, FR-15, FR-16, FR-17.

### Epic 6: SEO, Performance y Launch Readiness
Metadata dinámica, Open Graph, optimización de imágenes, Core Web Vitals, auditoría de accesibilidad/cross-browser y CI/CD en Vercel.
**FRs covered:** FR-21, FR-22, FR-23, FR-24 (+ NFR-01, NFR-02, NFR-06, NFR-07).

## Epic 1: Foundation, Sistema de Diseño y Layout Shell

Sentar las bases técnicas y visuales para que todas las épicas siguientes se construyan sobre una base consistente, accesible y responsive.

### Story 1.1: Inicializar proyecto Next.js desde starter oficial

As a desarrollador del portfolio,
I want inicializar el proyecto con `create-next-app@latest` configurado con TypeScript estricto, Tailwind, ESLint, App Router, `src/` y alias `@/*`,
So that el trabajo posterior parta de una base predecible y alineada con la arquitectura.

**Acceptance Criteria:**

**Given** un repo limpio sin proyecto Next.js
**When** se ejecuta `npx create-next-app@latest portfolio-ian --ts --tailwind --eslint --app --src-dir --import-alias "@/*"` (AR-01)
**Then** existe un proyecto Next.js 14+ con App Router, `"strict": true` en `tsconfig.json`, Tailwind configurado, ESLint funcional y alias `@/*` operativo
**And** `npm run dev`, `npm run build` y `npm run lint` se ejecutan sin errores
**And** se crean las carpetas vacías de AR-02 (`src/components/{ui,layout,sections,content,forms,motion}`, `src/content/{projects,blog}`, `src/lib/{content,validation,email,seo,api,motion,utils}`, `src/styles`, `src/types`, `tests/e2e`, `public/{projects,cv,og,icons}`)
**And** existe `.env.example` con `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL` y `.env.local` ignorado en `.gitignore`

### Story 1.2: Configurar tokens de diseño y tipografía

As a desarrollador del portfolio,
I want configurar tokens custom de Tailwind y cargar Inter + JetBrains Mono vía `next/font`,
So that todos los componentes futuros usen un sistema visual consistente (Technical Minimal + Vercel-inspired).

**Acceptance Criteria:**

**Given** el proyecto inicializado de Story 1.1
**When** se configuran `tailwind.config.ts` y `src/styles/tokens.css` (UX-DR1)
**Then** existen tokens semánticos `background`, `foreground`, `accent`, `accent-hover`, `muted`, `muted-foreground`, `border`, `border-hover`, `success`, `error` con valores dark/light (slate-900/50, cyan-500/400)
**And** Inter y JetBrains Mono cargan vía `next/font` sin layout shift y con CSS variables expuestas
**And** la escala tipográfica (Display, H1-H3, Body, Body Large, Caption, Code) está definida con reducciones fluidas para viewport < 768px (UX-DR2)
**And** la página inicial renderiza un ejemplo que verifica visualmente la aplicación de tokens
**And** `npm run build` pasa sin errores

### Story 1.3: Construir primitivas UI reutilizables

As a desarrollador del portfolio,
I want `Button`, `Card`, `Badge`, `Section`, `Container`, `VisuallyHidden` y `CodeBlock` en `src/components/ui/`,
So that las épicas siguientes compongan páginas sin reimplementar elementos básicos.

**Acceptance Criteria:**

**Given** los tokens de Story 1.2
**When** se implementan las primitivas con TS estricto y `PascalCase.tsx` (AR-08, UX-DR3)
**Then** `Button` soporta variantes `primary | secondary | ghost | link`, props `loading`/`disabled`, polimorfismo `button` vs `a` y estados `default/hover/active/focus-visible/disabled/loading`
**And** `Card`, `Badge`, `Section`, `Container`, `VisuallyHidden`, `CodeBlock` exponen API tipada y respetan breakpoints de UX-DR10
**And** `CodeBlock` usa JetBrains Mono, scroll horizontal accesible por teclado y contraste alto
**And** todos los interactivos cumplen `focus-visible` ring accent y contraste 4.5:1 (UX-DR9)
**And** existe una ruta `/styleguide` (no enlazada) que renderiza todas las variantes para verificación manual
**And** `npm run lint` y `npm run build` pasan

### Story 1.4: Implementar layout global, Header, Footer y navegación responsive

As a visitante del portfolio,
I want navegación persistente con Header (logo + links Proyectos/Blog/About/Contact) y menú hamburguesa accesible en mobile, más Footer consistente,
So that pueda moverme sin fricción desde cualquier dispositivo.

**Acceptance Criteria:**

**Given** las primitivas UI de Story 1.3
**When** se implementan `src/app/layout.tsx`, `Header`, `Footer`, `Navigation`, `MobileNav` en `src/components/layout/`
**Then** `layout.tsx` define metadata base, fuentes, providers y compone Header sticky con backdrop blur + `main` + Footer (UX-DR14)
**And** el Header muestra logo + links en desktop ≥ md y un trigger de hamburguesa en mobile
**And** `MobileNav` (propio o shadcn `Sheet`) implementa focus trap, cierre con Escape y touch targets ≥ 44x44px (UX-DR7)
**And** existen rutas mínimas `src/app/about/page.tsx` y `src/app/contact/page.tsx` con placeholders semánticos para que la navegación no rompa
**And** el Footer incluye links sociales (GitHub, LinkedIn), email mailto, copyright dinámico y placeholder de CV (efectivo en Story 1.6)
**And** la navegación es operable solo con teclado y los links activos se indican visualmente (FR-02, NFR-02)
**And** todo es responsive desde 320px sin overflow horizontal (NFR-05)

### Story 1.5: Implementar theme toggle dark/light sin flash

As a visitante del portfolio,
I want alternar entre tema dark y light desde el header, con persistencia y respeto a mi preferencia del sistema,
So that pueda leer en mi apariencia preferida sin parpadeo al cargar.

**Acceptance Criteria:**

**Given** los tokens dark/light de Story 1.2 y el Header de Story 1.4
**When** se implementa `ThemeToggle` (Client Component) y un script inline anti-flash en `layout.tsx`
**Then** al primer render se respeta `prefers-color-scheme` cuando no hay preferencia guardada (FR-19)
**And** el toggle alterna `light`/`dark`, persiste en `localStorage` bajo clave estable y aplica `<html class="dark|light">` inmediatamente (FR-18, FR-20)
**And** no se observa flash de tema incorrecto en carga inicial en ningún navegador soportado (NFR-06)
**And** el botón expone `aria-label` dinámico y es operable por teclado con `focus-visible` (UX-DR6, UX-DR9)
**And** existe un test E2E (o manual documentado) verificando default-por-sistema, persistencia tras reload y ausencia de flash

### Story 1.6: Añadir descarga de CV desde Header, About y Footer

As a reclutador,
I want descargar el CV en PDF con un click desde el portfolio,
So that pueda revisar la trayectoria fuera del navegador y compartirla internamente.

**Acceptance Criteria:**

**Given** el layout shell de Story 1.4
**When** se coloca `public/cv/ian-vazquez-cv.pdf` y se agregan CTAs de descarga
**Then** Header (desktop/mobile), `/about` y Footer exponen un CTA visible "Descargar CV" con variante `secondary` o `ghost` (UX-DR15)
**And** el link usa `download` attribute y `aria-label="Descargar CV de Ian Vázquez (PDF)"`
**And** el archivo existe en `public/cv/` y se descarga correctamente en Chrome/Firefox/Safari/Edge (NFR-06)
**And** el botón cumple touch target ≥ 44x44px (UX-DR7) y `focus-visible` accesible (UX-DR9)
**And** `npm run build` pasa y `/cv/ian-vazquez-cv.pdf` responde 200 OK en dev

## Epic 2: Vitrina de Proyectos y Casos Técnicos

Permitir que reclutadores y clientes escaneen proyectos rápidamente y profundicen en casos técnicos sin requerir cambios de código para agregar proyectos nuevos.

### Story 2.1: Definir schema de contenido de proyectos y loader MDX

As a desarrollador del portfolio,
I want un schema Zod para frontmatter de proyectos y un loader que parsee MDX desde `src/content/projects/`,
So that pueda agregar proyectos como archivos `.mdx` sin modificar lógica (FR-06a, AR-06).

**Acceptance Criteria:**

**Given** el proyecto inicializado de Epic 1
**When** se implementan `src/lib/content/schemas.ts`, `src/lib/content/mdx.ts` y `src/lib/content/getProjects.ts`
**Then** `projectSchema` valida `title`, `slug` (kebab-case), `summary`, `publishedAt` (ISO 8601), `featured` (boolean), `stack` (string[]), `demoUrl?`, `repoUrl?`, `coverImage`
**And** `getProjects()` lee todos los `.mdx`, valida frontmatter, ordena por `publishedAt` desc y devuelve `Project[]` tipado
**And** `getProjectBySlug(slug)` retorna `Project | null` con contenido MDX renderizable
**And** frontmatter inválido produce error claro en build indicando slug y campo problemático (no falla silencioso)
**And** existe al menos `src/content/projects/portfolio-ian.mdx` con frontmatter válido para uso en stories siguientes
**And** `npm run build` y `tsc --noEmit` pasan

### Story 2.2: Construir componentes de presentación de proyectos

As a desarrollador del portfolio,
I want `ProjectCard`, `TechStackBadges`, `MetricCard` y `ArchitectureDiagram` en `src/components/content/`,
So that Home, listado y detalle se compongan de forma consistente.

**Acceptance Criteria:**

**Given** las primitivas de Story 1.3 y el schema de Story 2.1
**When** se implementan los componentes (UX-DR4)
**Then** `ProjectCard` recibe `Project` y renderiza cover (`next/image`), título, summary, badges de stack resumido y un link accesible único hacia `/projects/[slug]`
**And** la card revela stack completo y "tipo de problema" en hover y focus (info accesible por teclado, no solo en hover)
**And** `TechStackBadges` soporta variantes `compact | detailed | grouped` reutilizando `Badge`
**And** `MetricCard` muestra número/label/contexto sin depender solo del color (UX-DR9)
**And** `ArchitectureDiagram` expone descripción textual equivalente vía `aria-describedby`
**And** todos son Server Components excepto cuando requieran interactividad (AR-07)

### Story 2.3: Implementar grid de proyectos destacados en Home

As a visitante del portfolio,
I want ver 3-4 proyectos destacados en la Home,
So that pueda evaluar la calidad de Ian sin navegar más.

**Acceptance Criteria:**

**Given** los componentes de Story 2.2 y al menos 1 proyecto seed
**When** se implementa `src/components/sections/FeaturedProjects.tsx` y se compone en `src/app/page.tsx`
**Then** Home renderiza Hero + FeaturedProjects + AboutPreview + ContactPreview (FR-01)
**And** FeaturedProjects muestra los proyectos con `featured: true` (hasta 4) en grid 1/2/3 cols según breakpoint (FR-04, UX-DR10)
**And** cada card linkea correctamente a `/projects/[slug]`
**And** existe CTA "Ver todos los proyectos" hacia `/projects`
**And** con menos de 3 featured se renderiza un empty state honesto (UX-DR12)
**And** la Home pasa Lighthouse Accessibility ≥ 90 en preview local

### Story 2.4: Implementar página de listado `/projects`

As a visitante del portfolio,
I want una página `/projects` con el listado completo,
So that pueda explorar todo el trabajo más allá de los destacados.

**Acceptance Criteria:**

**Given** el loader de Story 2.1 y `ProjectCard` de Story 2.2
**When** se implementa `src/app/projects/page.tsx` (Server Component)
**Then** la página renderiza el grid completo ordenado por `publishedAt` desc (FR-05)
**And** llama a `getProjects()` directamente sin hidratación innecesaria (AR-07)
**And** define metadata estática base (refinada en Epic 6)
**And** es responsive 1/2/3 columnas (UX-DR10)
**And** si no hay proyectos, muestra empty state coherente (UX-DR12)

### Story 2.5: Implementar página de caso técnico `/projects/[slug]`

As a reclutador técnico o hiring manager,
I want una página individual con narrativa Contexto → Problema → Decisiones → Arquitectura → Resultados, demo y repo,
So that pueda evaluar la profundidad técnica real.

**Acceptance Criteria:**

**Given** el loader de Story 2.1
**When** se implementa `src/app/projects/[slug]/page.tsx` con `generateStaticParams()` y `CaseStudyLayout` en `src/components/content/CaseStudyLayout.tsx`
**Then** se genera estáticamente una página por cada proyecto en `src/content/projects/` (FR-06)
**And** `CaseStudyLayout` estructura Hero → Contexto → Problema → Decisiones → Arquitectura → Implementación → Resultados → CTA con jerarquía semántica `h1` único y `h2` por sección (UX-DR4)
**And** el MDX se renderiza usando `MDXComponents` (headings, párrafos, code, listas, links, blockquote, imágenes con `next/image`)
**And** se muestran `TechStackBadges` detalladas, links a demo/repo (Button secondary) y CTA final "¿Te interesa algo similar? Contactá" hacia `/contact?ref=[slug]`
**And** existe link "← Volver a proyectos" (UX-DR14)
**And** slug inexistente devuelve `notFound()` (la página 404 custom de UX-DR11 se completa en Epic 6, prerequisito mínimo aquí)
**And** la página es Server Component (AR-07) y `npm run build` genera las rutas estáticas

### Story 2.6: Agregar contenido seed y assets optimizados

As a visitante del portfolio,
I want ver al menos un proyecto real completo,
So that pueda evaluar el portfolio como producto terminado desde el primer deploy.

**Acceptance Criteria:**

**Given** `CaseStudyLayout` y `MDXComponents` operativos
**When** se completa `src/content/projects/portfolio-ian.mdx` (auto-referencial) con narrativa real
**Then** existe `public/projects/portfolio-ian/cover.webp` y al menos un `screenshot-01.webp` (WebP, dimensiones declaradas) (FR-23 baseline)
**And** el frontmatter incluye `featured: true`, `stack` con ≥ 5 tecnologías y `repoUrl` válido
**And** el contenido demuestra el formato completo: contexto, una decisión técnica difícil, un fragmento de código MDX con syntax highlighting y una lección aprendida
**And** `/projects/portfolio-ian` renderiza sin warnings de hidratación ni errores de consola en Chrome/Firefox/Safari

## Epic 3: Sistema de Contacto Full-Stack

Demostrar capacidad full-stack real y convertir visitas en oportunidades mediante un formulario con backend funcional, seguro y con UX cuidada.

### Story 3.1: Definir schema Zod compartido y helpers `ApiResponse`

As a desarrollador del portfolio,
I want un `contactSchema` Zod y helpers `ApiResponse` compartidos entre cliente y servidor,
So that el formulario y el endpoint compartan validación y formato de respuesta (AR-03, AR-04).

**Acceptance Criteria:**

**Given** el proyecto inicializado
**When** se crean `src/lib/validation/contactSchema.ts` y `src/lib/api/responses.ts`
**Then** `contactSchema` valida `name` (2-100), `email` (formato), `subject` (3-200), `message` (10-5000), `company` (opcional, honeypot)
**And** se exporta el tipo `ContactInput = z.infer<typeof contactSchema>`
**And** `responses.ts` exporta `ApiResponse<T>` y helpers `ok<T>(data?, message?)` y `fail(error, fieldErrors?, status?)` que devuelven `Response.json(...)` con el shape de AR-03
**And** los status codes por defecto son `200`, `400`, `429`, `500` y nunca se filtran errores internos al cliente
**And** existen tests verificando: input válido, email malformado, message corto, honeypot lleno

### Story 3.2: Construir `ContactForm` con validación en tiempo real

As a visitante del portfolio,
I want completar el formulario con validación en tiempo real y feedback claro,
So that pueda contactar a Ian con confianza sin perder datos.

**Acceptance Criteria:**

**Given** el `contactSchema` de Story 3.1
**When** se implementa `src/components/forms/ContactForm.tsx` (Client Component) con React Hook Form + `@hookform/resolvers/zod`
**Then** se muestran labels visibles sobre cada input (no placeholders sustitutivos) (UX-DR5)
**And** la validación se ejecuta on-blur/on-change con mensajes asociados al campo vía `aria-invalid` y `aria-describedby` (UX-DR9)
**And** incluye honeypot `company` invisible visualmente pero accesible (input con `tabindex={-1}`, `autocomplete="off"`, posicionado fuera de pantalla) (FR-10)
**And** el botón "Enviar" expone estado `loading`, se deshabilita durante envío y muestra texto del estado actual (UX-DR15, UX-DR13)
**And** el estado del formulario es uno de `FormStatus = "idle" | "validating" | "loading" | "success" | "error"` gestionado localmente (AR-09)
**And** todos los inputs cumplen contraste 4.5:1, `focus-visible` ring y touch target ≥ 44x44px

### Story 3.3: Implementar Route Handler `POST /api/contact` con validación y honeypot

As a desarrollador del portfolio,
I want un endpoint que valide la entrada con Zod, descarte requests con honeypot y devuelva respuestas estándar,
So that el backend sea seguro y consistente sin filtrar detalles (NFR-03, FR-08, FR-10).

**Acceptance Criteria:**

**Given** el schema y helpers de Story 3.1
**When** se implementa `src/app/api/contact/route.ts`
**Then** el handler `POST` parsea el body, valida con `contactSchema.safeParse()` y devuelve `400` con `fieldErrors` si falla (AR-03)
**And** si `company` (honeypot) tiene contenido, devuelve `200 ok` simulando éxito sin enviar email (descarte silencioso) (FR-10)
**And** `GET/PUT/DELETE/PATCH` devuelven `405`
**And** errores internos se loguean con `console.error` incluyendo un id de request, pero el mensaje al cliente es genérico ("No pude enviar el mensaje. Revisá tu conexión e intentá de nuevo.") (NFR-03, AR-12)
**And** el handler **no** importa componentes UI ni módulos client-only (AR-07)
**And** existe test (unit o E2E) que verifica: input válido → 200, input inválido → 400 con fieldErrors, honeypot → 200 sin email, GET → 405

### Story 3.4: Integrar Resend para envío de email

As a Ian,
I want recibir un email en mi inbox cuando alguien envía el formulario,
So that pueda responder oportunidades a tiempo (FR-08).

**Acceptance Criteria:**

**Given** el endpoint de Story 3.3 y `RESEND_API_KEY` en `.env.local`
**When** se implementa `src/lib/email/sendContactEmail.ts` y se invoca desde el handler
**Then** la función usa el SDK oficial de Resend con `RESEND_API_KEY`, envía desde `CONTACT_FROM_EMAIL` hacia `CONTACT_TO_EMAIL` con `replyTo: email` (AR-05)
**And** el cuerpo del email incluye los 4 campos formateados (texto plano o HTML simple) con asunto `[portfolio-ian] {subject}`
**And** errores del SDK se capturan, se loguean sin filtrar la API key y se devuelven como `{ ok: false, error }` con `500`
**And** la función está aislada en `src/lib/email/` y **no** se importa desde Client Components (AR-07)
**And** `.env.example` documenta las 4 variables requeridas

### Story 3.5: Estados de UI loading/success/error con retry y preservación de datos

As a visitante del portfolio,
I want feedback claro al enviar, confirmación tras éxito y opción de reintentar sin perder lo escrito,
So that pueda contactar con confianza incluso con problemas de red.

**Acceptance Criteria:**

**Given** el `ContactForm` de Story 3.2 conectado al endpoint Story 3.3-3.4
**When** el usuario envía el formulario
**Then** durante el envío el botón muestra `loading` y el form pasa a estado `loading` (FR-09, UX-DR13)
**And** en éxito el form se reemplaza por panel "Mensaje enviado correctamente. Te respondo pronto." con CTA "Enviar otro mensaje" que vuelve a `idle` limpio
**And** en error de red o `500`, el form pasa a `error` con mensaje accionable y conserva todos los datos del usuario (UX-DR5)
**And** en `400`, los `fieldErrors` se aplican a los campos sin perder los demás valores
**And** el flujo (idle → loading → success | error → retry) está cubierto por test E2E en `tests/e2e/contact.spec.ts` con casos success y error usando red mockeada (AR-11)

### Story 3.6: Componer página `/contact` y CTAs contextuales

As a visitante del portfolio,
I want una página `/contact` que presente el formulario con alternativas (LinkedIn, GitHub, email),
So that pueda elegir el canal que prefiera sin presión.

**Acceptance Criteria:**

**Given** el `ContactForm` operativo
**When** se implementan `src/app/contact/page.tsx` y `src/components/sections/ContactPreview.tsx`
**Then** `/contact` renderiza `h1` "Trabajemos juntos" (o equivalente), párrafo introductorio breve, el `ContactForm` y un panel con LinkedIn/GitHub/email mailto
**And** la página soporta `?ref=[slug]` y prellena `subject` con "Consulta sobre proyecto: [slug]" cuando viene desde Story 2.5
**And** `ContactPreview` en Home muestra heading + párrafo + CTA "Hablemos" hacia `/contact`
**And** ambas son responsive (UX-DR10) y operables por teclado
**And** pasan Lighthouse Accessibility ≥ 90 en preview local

## Epic 4: Blog Técnico

Demostrar profundidad técnica con artículos escalables que refuercen la credibilidad y conecten contenido con proyectos relacionados.

### Story 4.1: Definir schema de posts y loader MDX para blog

As a desarrollador del portfolio,
I want un `postSchema` Zod y un loader `getBlogPosts()` para `src/content/blog/`,
So that pueda agregar artículos como `.mdx` sin tocar código (paralelo a Story 2.1).

**Acceptance Criteria:**

**Given** la infraestructura de contenido de Story 2.1
**When** se implementan `postSchema` en `src/lib/content/schemas.ts` y `getBlogPosts()` / `getBlogPostBySlug()` en `src/lib/content/getBlogPosts.ts`
**Then** `postSchema` valida `title`, `slug` (kebab-case), `summary`, `publishedAt` (ISO 8601), `tags` (string[]), `draft?` (boolean default false)
**And** `getBlogPosts()` excluye drafts en `NODE_ENV === "production"`, ordena por `publishedAt` desc y devuelve `BlogPost[]`
**And** `getBlogPostBySlug(slug)` devuelve post + contenido MDX o `null`
**And** `src/lib/utils/readingTime.ts` calcula tiempo de lectura (palabras/200) expuesto en `BlogPost`
**And** `src/lib/utils/formatDate.ts` formatea fechas en español (`"24 de mayo de 2026"`)
**And** `npm run build` y `tsc --noEmit` pasan

### Story 4.2: Configurar pipeline MDX con syntax highlighting y `MDXComponents`

As a lector del blog,
I want código con syntax highlighting y tipografía consistente,
So that pueda leer contenido técnico cómodamente.

**Acceptance Criteria:**

**Given** el pipeline MDX elegido en `src/lib/content/mdx.ts` (resolviendo el gap importante #1 de architecture)
**When** se configura el highlighter (rehype-pretty-code o shiki) y se implementan `src/components/content/MDXComponents.tsx` y `src/components/ui/CodeBlock.tsx`
**Then** bloques de código renderizan syntax highlighting consistente con tema dark/light alineado a tokens, soportando `ts/tsx/js/json/bash/md` (FR-13)
**And** `MDXComponents` define overrides para `h2-h4`, `p`, `ul/ol`, `li`, `a` (con `next/link` para internos), `img` (`next/image`), `blockquote`, `code` inline y `pre`/`code` blocks
**And** los headings dentro del post son `h2`/`h3` (el `h1` lo aporta la página, jerarquía única)
**And** existe un post de prueba ejercitando todos los tipos (heading, párrafo, listas, link interno/externo, imagen, code inline, code block ts y bash) renderizando sin errores

### Story 4.3: Implementar página de listado `/blog`

As a visitante del portfolio,
I want ver los artículos ordenados por fecha con excerpt, fecha y tiempo de lectura,
So that pueda elegir qué leer según tiempo e interés.

**Acceptance Criteria:**

**Given** el loader de Story 4.1
**When** se implementan `src/app/blog/page.tsx` y `src/components/content/BlogPostCard.tsx`
**Then** la página renderiza posts no-draft ordenados por `publishedAt` desc (FR-11)
**And** cada `BlogPostCard` muestra título, excerpt (summary), fecha formateada, tiempo de lectura y tags como `Badge`s pequeños
**And** click navega a `/blog/[slug]`
**And** layout responsive: 1 col mobile, 1-2 col tablet+ (UX-DR10)
**And** sin posts publicados, muestra empty state ("Próximamente artículos técnicos") (UX-DR12)

### Story 4.4: Implementar página individual `/blog/[slug]` con navegación prev/next

As a lector del blog,
I want leer un artículo con tipografía cuidada y navegar al siguiente sin volver al listado,
So that pueda profundizar y descubrir más.

**Acceptance Criteria:**

**Given** el pipeline MDX de Story 4.2 y el loader de Story 4.1
**When** se implementa `src/app/blog/[slug]/page.tsx` con `generateStaticParams()`
**Then** cada post se pre-renderiza estáticamente (FR-12)
**And** la página muestra `h1` con el título, metadata (fecha, tiempo de lectura, tags), contenido MDX vía `MDXComponents` y al final navegación "← Anterior" / "Siguiente →" hacia posts adyacentes en orden cronológico
**And** existe link "← Volver al blog" arriba (UX-DR14)
**And** slug inexistente devuelve `notFound()`
**And** la página es Server Component (AR-07)

### Story 4.5: Agregar posts seed y links contextuales a proyectos

As a visitante del portfolio,
I want al menos un artículo real demostrando el formato del blog,
So that pueda evaluar la profundidad técnica desde el primer deploy.

**Acceptance Criteria:**

**Given** la infraestructura completa de blog
**When** se crea `src/content/blog/endpoint-contacto-seguro.mdx` basado en lo construido en Epic 3 (FR-13a)
**Then** el post tiene contenido real ≥ 800 palabras, ≥ 2 bloques de código TS, 1 link interno a `/projects/portfolio-ian` y 1 link externo
**And** la fecha de publicación es coherente con el desarrollo del portfolio
**And** pasa la validación del schema y se renderiza sin errores ni warnings en `/blog/endpoint-contacto-seguro`
**And** existe un patrón documentado (en el post o `docs/`) sobre cómo enlazar posts ↔ proyectos relacionados (Blog-to-Contact journey)

## Epic 5: Animaciones y Motion Polish

Refinar la sensación de calidad con un sistema de motion centralizado que respete accesibilidad y performance.

### Story 5.1: Centralizar variants de motion y wrappers reutilizables

As a desarrollador del portfolio,
I want variants centralizadas y wrappers `AnimatedSection` / `StaggeredGrid`,
So that las animaciones sean consistentes y respeten `prefers-reduced-motion` sin duplicación (FR-17, UX-DR8).

**Acceptance Criteria:**

**Given** Framer Motion instalado
**When** se implementan `src/lib/motion/variants.ts`, `src/components/motion/AnimatedSection.tsx` y `src/components/motion/StaggeredGrid.tsx` (Client)
**Then** `variants.ts` exporta `fadeIn`, `slideUp`, `stagger` (80-120ms entre items) animando solo `transform`/`opacity` (FR-17)
**And** `AnimatedSection` dispara la animación al entrar en viewport (`whileInView`, `viewport: { once: true, amount: 0.2 }`)
**And** `StaggeredGrid` aplica `stagger` a sus hijos directos
**And** ambos wrappers leen `useReducedMotion()` y renderizan children sin animación cuando es `true` (FR-17, UX-DR8)
**And** exponen prop opcional `delay` y `as` (elemento semántico)
**And** no se introducen dependencias adicionales más allá de Framer Motion (AR-09)

### Story 5.2: Aplicar scroll reveals a Home, listados y casos técnicos

As a visitante del portfolio,
I want descubrir contenido progresivamente al scrollear,
So that la experiencia se sienta cuidada sin distraer del contenido.

**Acceptance Criteria:**

**Given** los wrappers de Story 5.1
**When** se envuelven secciones existentes de Home, `/projects`, `/blog` y `/projects/[slug]` donde aporte valor
**Then** Hero, FeaturedProjects (con `StaggeredGrid`), AboutPreview y ContactPreview hacen fade-in/slide-up al entrar en viewport (FR-14)
**And** listados `/projects` y `/blog` aplican `StaggeredGrid` a las cards
**And** las secciones del `CaseStudyLayout` revelan progresivamente sin ocultar contenido crítico (el contenido es legible aunque no se ejecuten animaciones) (UX-DR8)
**And** con `prefers-reduced-motion: reduce` todas las secciones se ven instantáneas (verificado en DevTools)
**And** no hay regresiones de CLS

### Story 5.3: Implementar transiciones de página con AnimatePresence

As a visitante del portfolio,
I want que las navegaciones se sientan continuas,
So that la experiencia tenga fluidez de aplicación moderna.

**Acceptance Criteria:**

**Given** los wrappers de motion operativos
**When** se implementa un wrapper client en `layout.tsx` (o template) con `AnimatePresence` aplicando fade + ligero translate al cambiar de ruta
**Then** la navegación entre Home → /projects → /projects/[slug] → /blog → /contact muestra transición suave ≤ 300ms (FR-15)
**And** la transición no bloquea contenido ni interactividad
**And** con `prefers-reduced-motion: reduce`, las transiciones se reducen a cambios instantáneos
**And** no hay flash blanco ni cambios bruscos de tema durante la transición

### Story 5.4: Añadir micro-interacciones en botones, cards y links

As a visitante del portfolio,
I want feedback visual sutil al interactuar,
So that la interfaz se sienta viva sin ruido.

**Acceptance Criteria:**

**Given** las primitivas UI y componentes de contenido implementados
**When** se afinan hover/focus/active states en `Button`, `Card`, `ProjectCard`, `BlogPostCard` y links de navegación
**Then** cada clickable tiene micro-animación de `scale`, `translateY` o cambio de color/border en hover (200-300ms, easing suave) (FR-16)
**And** `focus-visible` siempre es visible y no se solapa con hover (UX-DR9)
**And** las micro-interacciones respetan `prefers-reduced-motion` (solo cambio de color sin transformación) (FR-17)
**And** en mobile el `:active` da feedback inmediato ≤ 100ms
**And** ninguna micro-interacción dispara reflows ni afecta CLS

## Epic 6: SEO, Performance y Launch Readiness

Garantizar que el portfolio sea descubrible, performante, accesible cross-browser y desplegable de forma confiable y automatizada.

### Story 6.1: Implementar helpers SEO y metadata global

As a visitante que comparte el portfolio en redes,
I want que el preview muestre título, descripción e imagen correctos,
So that el portfolio se vea profesional al ser compartido.

**Acceptance Criteria:**

**Given** la estructura `src/lib/seo/`
**When** se implementan `src/lib/seo/site.ts` y `src/lib/seo/metadata.ts`
**Then** `site.ts` exporta `siteName`, `siteUrl` (desde `NEXT_PUBLIC_SITE_URL`), `defaultDescription`, `author`, `defaultOgImage` (FR-21, FR-22)
**And** `metadata.ts` exporta `buildMetadata({ title, description, ogImage?, canonical? })` devolviendo un `Metadata` con `title.template "%s — Ian Vázquez"`, `description`, `openGraph` y `twitter` (summary_large_image)
**And** `src/app/layout.tsx` usa `buildMetadata()` para el metadata por defecto
**And** `/about` y `/contact` definen `export const metadata` propios con el helper
**And** existe `public/og/default-og.webp` (1200x630) como fallback

### Story 6.2: Añadir metadata dinámica por proyecto y por post

As a visitante que comparte un proyecto o post,
I want que el preview muestre datos específicos de ese contenido,
So that el contenido individual sea atractivo al compartirse.

**Acceptance Criteria:**

**Given** el helper `buildMetadata` de Story 6.1
**When** se implementan `generateMetadata()` en `src/app/projects/[slug]/page.tsx` y `src/app/blog/[slug]/page.tsx`
**Then** `/projects/[slug]` genera metadata con `title = project.title`, `description = project.summary`, `ogImage = project.coverImage` (FR-21)
**And** `/blog/[slug]` genera metadata con `title = post.title`, `description = post.summary`, `openGraph.type = "article"`, `publishedTime`, `tags`
**And** las páginas `/projects` y `/blog` definen metadata estática propia
**And** slugs inexistentes en `generateMetadata` no rompen el build (manejo seguro de `null`)

### Story 6.3: Implementar `robots.ts` y `sitemap.ts`

As a motor de búsqueda,
I want descubrir todas las páginas públicas y respetar las reglas de indexación,
So that el portfolio aparezca en resultados relevantes.

**Acceptance Criteria:**

**Given** las rutas estables del portfolio
**When** se implementan `src/app/robots.ts` y `src/app/sitemap.ts`
**Then** `robots.ts` permite indexar todo y referencia el `sitemap` (con `NEXT_PUBLIC_SITE_URL`)
**And** `sitemap.ts` genera entradas para `/`, `/about`, `/contact`, `/projects`, todos los `/projects/[slug]` desde `getProjects()`, `/blog` y todos los `/blog/[slug]` desde `getBlogPosts()` (excluyendo drafts)
**And** cada entrada incluye `lastModified` desde `publishedAt`
**And** ambos archivos son accesibles en dev (`/robots.txt`, `/sitemap.xml`) con respuestas 200 OK

### Story 6.4: Auditoría de imágenes y Core Web Vitals

As a visitante del portfolio,
I want que las páginas carguen rápido y sin layout shift,
So that la experiencia se sienta profesional desde el primer momento (NFR-01, FR-23, FR-24).

**Acceptance Criteria:**

**Given** el portfolio funcional con contenido seed
**When** se audita el uso de imágenes y se ejecuta Lighthouse contra build de producción local
**Then** todas las imágenes usan `next/image` con `width`/`height` declarados, `alt` significativo y `sizes` responsive para screenshots (FR-23)
**And** las imágenes se sirven en WebP (con fallback automático de Next.js cuando aplique)
**And** Lighthouse Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90 en Home, `/projects/[slug]` ejemplo y `/blog/[slug]` ejemplo (NFR-01)
**And** Core Web Vitals (Lab): LCP < 2.5s, INP < 200ms, CLS < 0.1 (FR-24)
**And** queda documentado en `docs/lighthouse-baseline.md` (o equivalente) el resultado obtenido y cualquier mejora pendiente

### Story 6.5: Configurar Vercel deploy, env vars y CI con GitHub Actions

As a equipo del portfolio,
I want push a `main` que despliegue producción y PRs que generen previews, con validaciones automáticas,
So that el flujo sea confiable y demuestre madurez técnica (NFR-07, AR-10).

**Acceptance Criteria:**

**Given** el proyecto integrado con Git y una cuenta Vercel
**When** se conecta el repo a Vercel y se crea `.github/workflows/ci.yml`
**Then** Vercel está configurado con `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL` (AR-05)
**And** push a `main` despliega producción y PRs generan preview deployments accesibles vía URL única (AR-10)
**And** `ci.yml` ejecuta `npm ci`, `npm run lint`, `tsc --noEmit` y `npm run build` en pull_request y push a `main`
**And** un fallo en cualquier paso de CI bloquea el merge (branch protection recomendada)
**And** existe documentación breve en `README.md` describiendo cómo deployar y rotar env vars

### Story 6.6: Auditoría final de accesibilidad y cross-browser

As a equipo del portfolio,
I want verificar WCAG 2.1 AA y compatibilidad cross-browser antes del launch,
So that el portfolio cumpla la promesa de calidad para toda la audiencia (NFR-02, NFR-06, UX-DR9, UX-DR11).

**Acceptance Criteria:**

**Given** el portfolio completo con todas las épicas previas implementadas
**When** se ejecutan auditorías de accesibilidad y se prueba cross-browser
**Then** Axe DevTools no reporta issues críticas en Home, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/about`
**And** navegación completa por teclado funciona en todas las rutas, con focus-visible y skip link al `main` (UX-DR9)
**And** VoiceOver o NVDA puede leer la estructura semántica de cada página sin saltos extraños
**And** las pruebas manuales en Chrome, Firefox, Safari y Edge últimas 2 versiones no muestran regresiones visuales ni funcionales (NFR-06)
**And** existe página `not-found.tsx` custom con estética del portfolio, mensaje útil y links a Home/Projects/Contact (UX-DR11)
**And** los 3 flujos críticos de Playwright (`navigation.spec.ts`, `project-detail.spec.ts`, `contact.spec.ts`) pasan localmente (AR-11)
**And** existe un checklist firmado en `docs/launch-readiness.md` cubriendo: accesibilidad, performance, SEO, cross-browser, deploy, env vars, dominio y monitoreo

---

## Final Validation

### FR Coverage (verificación final)

Cada FR del PRD está cubierto por al menos una historia con acceptance criteria testeables:

- **FR-01** → Story 2.3 (composición Home) y Story 1.4 (layout shell).
- **FR-02** → Story 1.4 (Header + Navigation + MobileNav).
- **FR-03** → Story 1.4 (Footer) y Story 1.6 (link a CV en Footer).
- **FR-04** → Story 2.3 (FeaturedProjects).
- **FR-05** → Story 2.4 (`/projects`).
- **FR-06** → Story 2.5 (`/projects/[slug]` con CaseStudyLayout).
- **FR-06a** → Story 2.1 (loader + schema MDX).
- **FR-07** → Story 3.2 (ContactForm validación tiempo real).
- **FR-08** → Story 3.3 (Route Handler) y Story 3.4 (Resend).
- **FR-09** → Story 3.2 (estados en form) y Story 3.5 (loading/success/error + retry).
- **FR-10** → Story 3.2 (honeypot UI) y Story 3.3 (descarte server-side).
- **FR-11** → Story 4.3 (`/blog`).
- **FR-12** → Story 4.4 (`/blog/[slug]` con prev/next).
- **FR-13** → Story 4.2 (pipeline MDX + syntax highlighting).
- **FR-13a** → Story 4.5 (post seed con formato).
- **FR-14** → Story 5.2 (scroll reveals).
- **FR-15** → Story 5.3 (page transitions AnimatePresence).
- **FR-16** → Story 5.4 (micro-interacciones).
- **FR-17** → Story 5.1 (variants `transform`/`opacity`) y Story 5.2/5.4 (`prefers-reduced-motion`).
- **FR-18** → Story 1.5 (toggle).
- **FR-19** → Story 1.5 (persistencia + prefers-color-scheme).
- **FR-20** → Story 1.5 (anti-flash).
- **FR-21** → Story 6.1 (helpers SEO) y Story 6.2 (metadata dinámica).
- **FR-22** → Story 6.1 (OG en helper) y Story 6.2 (OG por contenido).
- **FR-23** → Story 6.4 (auditoría imágenes `next/image` + WebP).
- **FR-24** → Story 6.4 (Core Web Vitals dentro de objetivos).
- **FR-25** → Story 1.6 (CTA descarga en Header/About/Footer).
- **FR-26** → Story 1.6 (PDF en `public/cv/`).

### NFR Coverage (verificación final)

- **NFR-01 (Lighthouse > 90)** → Story 6.4 (auditoría explícita), reforzada por AC de Lighthouse Accessibility en Stories 2.3 y 3.6.
- **NFR-02 (WCAG 2.1 AA)** → Cross-cutting con AC por épica (1.3, 1.4, 1.5, 1.6, 2.2, 2.5, 3.2, 3.6) + auditoría final en Story 6.6.
- **NFR-03 (Seguridad inputs)** → Stories 3.1, 3.3, 3.4 (validación cliente/servidor, honeypot, manejo seguro de errores y env vars).
- **NFR-04 (TS estricto, modularidad)** → Story 1.1 (TS estricto, estructura) reforzado por AC `tsc --noEmit` / `npm run build` en stories 2.1, 4.1, 6.x.
- **NFR-05 (Responsive mobile-first)** → Cross-cutting con AC explícitas en Stories 1.4, 2.3, 2.4, 3.6, 4.3.
- **NFR-06 (Cross-browser)** → Story 1.5, 1.6, 2.6 (verificación específica) y auditoría final en Story 6.6.
- **NFR-07 (CI/CD Vercel)** → Story 6.5 (Vercel + GitHub Actions).

### UX-DR Coverage (verificación final)

- **UX-DR1, UX-DR2** → Story 1.2.
- **UX-DR3** → Story 1.3.
- **UX-DR4** → Stories 2.2, 2.5, 4.2, 4.3 (componentes de contenido distribuidos por épica de uso).
- **UX-DR5** → Stories 3.2, 3.5.
- **UX-DR6** → Story 1.5.
- **UX-DR7** → Story 1.4, reforzado en 1.6 (CV CTA touch target).
- **UX-DR8** → Stories 5.1, 5.2.
- **UX-DR9** → Cross-cutting (Stories 1.3, 1.4, 1.6, 2.2, 3.2, 5.4) + auditoría final 6.6.
- **UX-DR10** → Stories 1.3, 2.3, 2.4, 3.6, 4.3.
- **UX-DR11** → Story 6.6 (página 404 custom firma como prerequisito de launch).
- **UX-DR12** → Stories 2.3, 2.4, 4.3.
- **UX-DR13** → Stories 3.2, 3.5.
- **UX-DR14** → Stories 1.4 (Header sticky), 2.5 y 4.4 (links "Volver").
- **UX-DR15** → Stories 1.3 (variantes Button), 1.6 (CTA CV) y 3.2 (submit form).

### Architecture Implementation Validation

- **Starter Template (AR-01)** → Story 1.1 es explícitamente "Inicializar proyecto Next.js desde starter oficial" con el comando exacto de la architecture. ✅
- **Database/Entity creation** → No aplica (MVP sin DB confirmado en AR-09). ✅
- **Endpoint único `/api/contact` (AR-03)** → Solo Story 3.3 implementa el handler; ningún otro story crea endpoints. ✅
- **Server-first (AR-07)** → AC explícito en Stories 2.2, 2.4, 2.5, 4.3, 4.4 ("Server Component"); Client solo en Stories 1.5, 3.2, 5.1 (donde aplica). ✅
- **Naming (AR-08)** → AC referencia naming en Stories 1.3, 2.1, 4.1. ✅

### Story Quality Validation

- **Tamaño:** Cada historia es completable por un único agente dev en una sesión (típicamente 1-3 archivos nuevos + composición/integración).
- **AC testeables:** Todas usan Given/When/Then y referencias a archivos/rutas/criterios verificables (`npm run build`, Lighthouse score, response status, presencia de archivos).
- **Sin forward dependencies:** Cada story depende solo de stories previas dentro de su épica (ej. 2.5 depende de 2.1/2.2; 3.5 depende de 3.2/3.3/3.4; ninguna referencia historias futuras como prerequisito).
- **FRs referenciados:** Cada story menciona explícitamente los FR/NFR/UX-DR que implementa.

### Epic Structure Validation

- **Valor de usuario por épica:** Cada épica entrega una capacidad completa al visitante (navegación visual, ver proyectos, contactar, leer blog, percibir polish, encontrar el portfolio en buscadores).
- **Independencia entre épicas:** Epic 2 funciona sin Epic 3/4/5/6 (catálogo navegable estático). Epic 3 funciona sin Epic 4/5/6. Epic 4 sin Epic 5/6. Epic 5 sin Epic 6.
- **File churn:** Header se toca en Stories 1.4 (creación), 1.5 (ThemeToggle como composición), 1.6 (CV CTA como composición). Todo dentro de Epic 1 — sin churn entre épicas. `layout.tsx` se compone en 1.4 y se extiende en 1.5 (script anti-flash) dentro de la misma épica. Justificado.
- **Sin big upfront technical work:** Story 1.1 solo inicializa el starter; no crea esquemas, ni endpoints, ni tablas. Cada épica trae solo lo que necesita.

### Within-Epic Story Dependency Check

- **Epic 1:** 1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 1.6. Cada historia se apoya solo en las previas. ✅
- **Epic 2:** 2.1 → 2.2 → 2.3 → 2.4 → 2.5 → 2.6. ✅
- **Epic 3:** 3.1 → 3.2 → 3.3 → 3.4 → 3.5 → 3.6. ✅
- **Epic 4:** 4.1 → 4.2 → 4.3 → 4.4 → 4.5. ✅
- **Epic 5:** 5.1 → 5.2 → 5.3 → 5.4. ✅
- **Epic 6:** 6.1 → 6.2 → 6.3 → 6.4 → 6.5 → 6.6. ✅

### Gaps and Notes

- El MDX loader exacto (gap importante #1 de architecture) se resuelve dentro de Story 4.2 (pipeline MDX) sin contradecir AR-06.
- Playwright como framework E2E (gap #2) queda comprometido por AC en Stories 3.5, 6.6 y 1.5.
- Rate limiting persistente (gap #3) queda fuera de MVP por decisión arquitectónica; el honeypot + límites de Resend + manejo seguro de errores son la línea base cubierta por Stories 3.3, 3.4.
- No hay FRs ni NFRs sin cobertura. No hay forward dependencies. No hay sobre-ingeniería detectada.

### Overall Assessment

**Status:** ✅ READY FOR IMPLEMENTATION

**Confidence:** alta.

**Total:** 6 épicas, 33 historias.

- Epic 1: 6 stories
- Epic 2: 6 stories
- Epic 3: 6 stories
- Epic 4: 5 stories
- Epic 5: 4 stories
- Epic 6: 6 stories
