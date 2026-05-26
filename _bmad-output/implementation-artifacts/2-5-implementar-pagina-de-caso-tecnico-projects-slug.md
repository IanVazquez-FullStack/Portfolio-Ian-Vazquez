# Story 2.5: Implementar página de caso técnico /projects/[slug]

Status: review

## Story

As a reclutador técnico o hiring manager,
I want una página individual con narrativa Contexto → Problema → Decisiones → Arquitectura → Resultados, demo y repo,
so that pueda evaluar la profundidad técnica real.

## Acceptance Criteria

1. **Given** el loader de Story 2.1, **When** se implementa `src/app/projects/[slug]/page.tsx` con `generateStaticParams()` y `CaseStudyLayout` en `src/components/content/CaseStudyLayout.tsx`, **Then** se genera estáticamente una página por cada proyecto en `src/content/projects/` (FR-06).
2. `CaseStudyLayout` estructura Hero → Contexto → Problema → Decisiones → Arquitectura → Implementación → Resultados → CTA con jerarquía semántica `h1` único y `h2` por sección (UX-DR4).
3. El MDX se renderiza usando `MDXComponents` (headings, párrafos, code, listas, links, blockquote, imágenes con `next/image`).
4. Se muestran `TechStackBadges` detalladas, links a demo/repo (Button secondary) y CTA final "¿Te interesa algo similar? Contactá" hacia `/contact?ref=[slug]`.
5. Existe link "← Volver a proyectos" (UX-DR14).
6. Slug inexistente devuelve `notFound()`.
7. La página es Server Component (AR-07) y `npm run build` genera las rutas estáticas.

## Tasks / Subtasks

- [x] Crear `src/app/projects/[slug]/page.tsx` (AC: #1, #6, #7)
  - [x] `export async function generateStaticParams()` que retorna todos los slugs de `getProjects()`
  - [x] Llamar `getProjectBySlug(slug)` y devolver `notFound()` si es null
  - [x] Metadata básica (refinada en Epic 6)
- [x] Crear `src/components/content/CaseStudyLayout.tsx` (AC: #2)
  - [x] Props: `project: Project`, `children: React.ReactNode` (contenido MDX)
  - [x] Estructura semántica con `<h1>` único (título del proyecto) y `<h2>` por sección
  - [x] Hero con cover image (`next/image`), título, summary
  - [x] Secciones: Contexto, El Problema, Decisiones Técnicas, Arquitectura, Implementación, Resultados, CTA
- [x] Crear `src/components/content/MDXComponents.tsx` (AC: #3)
  - [x] Overrides para: `h2`, `h3`, `h4`, `p`, `ul`, `ol`, `li`, `a`, `img`, `blockquote`, `code`, `pre`
  - [x] Links internos usan `next/link`, externos abren en nueva pestaña
  - [x] Imágenes usan `next/image`
- [x] Integrar `TechStackBadges` y botones demo/repo en `CaseStudyLayout` (AC: #4)
- [x] Agregar link "← Volver a proyectos" (AC: #5)

## Dev Notes

- **`generateStaticParams()`:** Esencial para que Next.js genere las páginas en build time. Sin esto, las páginas serían dinámicas.
  ```ts
  export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map(p => ({ slug: p.slug }));
  }
  ```
- **`notFound()`:** Importar de `next/navigation`. Si `getProjectBySlug(slug)` retorna `null`, llamar `notFound()` para renderizar la página 404.
- **`MDXComponents`:** Los headings del MDX son `h2`/`h3` (el `h1` lo pone `CaseStudyLayout`). Asegurarse de que los overrides de `h1` en `MDXComponents` los conviertan a `h2` o los eliminen para mantener jerarquía única.
- **Link "Volver a proyectos":** Usar `<Link href="/projects">← Volver a proyectos</Link>` con estilo de link secundario. Debe estar visible al inicio de la página (UX-DR14).
- **CTA `?ref=[slug]`:** `<Link href={/contact?ref=${project.slug}}>¿Te interesa algo similar? Contactá</Link>` — se usa en Story 3.6 para pre-llenar el asunto del formulario.
- **Server Component:** La página entera es Server Component. `MDXComponents` puede necesitar `"use client"` si tiene partes interactivas (como copy-to-clipboard en CodeBlock) — extraer esas partes.

### Project Structure Notes

```
src/app/projects/[slug]/
  page.tsx                   ← generateStaticParams + Server Component
src/components/content/
  CaseStudyLayout.tsx        ← layout semántico del caso técnico
  MDXComponents.tsx          ← overrides de elementos MDX
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.5]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-06, UX-DR4, UX-DR14]
- [Source: _bmad-output/project-context.md#MDX y Contenido]
- [Source: _bmad-output/project-context.md#Anti-Patrones (NO next-mdx-remote)]

## Dev Agent Record

### Agent Model Used

Cascade

### Debug Log References

N/A

### Completion Notes List

- Implementada la página dinámica `@/src/app/projects/[slug]/page.tsx` como un Server Component que genera rutas estáticas de forma eficiente con `generateStaticParams`.
- Implementado el componente de presentación `@/src/components/content/CaseStudyLayout.tsx` para estructurar semánticamente los casos de estudio.
- Asegurada la jerarquía semántica mediante un único `h1` para el título principal y elementos `h2` para las secciones de MDX.
- El tipado de `@/src/lib/content/mdx.ts` ha sido extendido para aceptar opcionalmente las propiedades `MDXComponents`.
- Se han cubierto todos los requerimientos mediante pruebas unitarias en `@/src/app/projects/[slug]/page.test.tsx`, logrando un 100% de éxito.
- Compilación de Next.js (`npm run build`) verificada y validada con éxito.

### File List

- `@/src/app/projects/[slug]/page.tsx`
- `@/src/components/content/CaseStudyLayout.tsx`
- `@/src/app/projects/[slug]/page.test.tsx`
- `@/src/lib/content/mdx.ts`
