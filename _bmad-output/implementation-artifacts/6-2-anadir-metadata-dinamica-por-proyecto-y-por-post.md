# Story 6.2: Añadir metadata dinámica por proyecto y por post

Status: review

## Story

As a visitante que comparte un proyecto o post,
I want que el preview muestre datos específicos de ese contenido,
so that el contenido individual sea atractivo al compartirse.

## Acceptance Criteria

1. **Given** el helper `buildMetadata` de Story 6.1, **When** se implementan `generateMetadata()` en `src/app/projects/[slug]/page.tsx` y `src/app/blog/[slug]/page.tsx`, **Then** `/projects/[slug]` genera metadata con `title = project.title`, `description = project.summary`, `ogImage = project.coverImage` (FR-21).
2. `/blog/[slug]` genera metadata con `title = post.title`, `description = post.summary`, `openGraph.type = "article"`, `publishedTime`, `tags`.
3. Las páginas `/projects` y `/blog` definen metadata estática propia.
4. Slugs inexistentes en `generateMetadata` no rompen el build (manejo seguro de `null`).

## Tasks / Subtasks

- [x] Implementar `generateMetadata` en `src/app/projects/[slug]/page.tsx` (AC: #1, #4)
  - [x] `const project = await getProjectBySlug(params.slug)`
  - [x] Si `null` → retornar metadata mínima fallback (no lanzar error)
  - [x] `buildMetadata({ title: project.title, description: project.summary, ogImage: project.coverImage })`
- [x] Implementar `generateMetadata` en `src/app/blog/[slug]/page.tsx` (AC: #2, #4)
  - [x] `const post = await getBlogPostBySlug(params.slug)`
  - [x] Si `null` → retornar metadata mínima fallback
  - [x] `buildMetadata(...)` con `openGraph.type = 'article'`, `publishedTime: post.publishedAt`, `tags: post.tags`
- [x] Agregar/actualizar metadata estática en `src/app/projects/page.tsx` (AC: #3)
  - [x] `export const metadata = buildMetadata({ title: 'Proyectos', description: '...' })`
- [x] Agregar/actualizar metadata estática en `src/app/blog/page.tsx` (AC: #3)
  - [x] `export const metadata = buildMetadata({ title: 'Blog', description: '...' })`

## Dev Notes

- **`generateMetadata` en Next.js App Router:**
  ```ts
  export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const project = await getProjectBySlug(params.slug);
    if (!project) return { title: 'Proyecto no encontrado' };
    return buildMetadata({ title: project.title, description: project.summary, ogImage: project.coverImage });
  }
  ```
- **Slug null seguro (AC #4):** El `generateMetadata` se llama ANTES del render. Si el slug no existe, retornar metadata mínima sin lanzar `notFound()` (ese se llama en el componente). Un error en `generateMetadata` rompería el build.
- **`openGraph.type = 'article'` para posts:** Esto le dice a LinkedIn/Facebook que es un artículo, mostrando fecha de publicación.
- **`coverImage` como OG image:** La ruta en el frontmatter es `/projects/portfolio-ian/cover.webp`. Para OG, debe ser URL absoluta. En `buildMetadata` convertir: `\`${SITE_URL}${ogImage}\``.
- **Paralelo con `generateStaticParams`:** Ambas funciones (`generateStaticParams` y `generateMetadata`) se ejecutan en build time para generar las páginas estáticas con metadata correcta.

### Project Structure Notes

- No se crean archivos nuevos — se modifican los existentes de Épicas 2 y 4.
- Archivos a modificar: `projects/[slug]/page.tsx`, `blog/[slug]/page.tsx`, `projects/page.tsx`, `blog/page.tsx`.

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.2]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-21, FR-22]
- [Source: _bmad-output/project-context.md#SEO y Metadata]

## Dev Agent Record

### Agent Model Used

Raptor mini (Preview)

### Debug Log References
- `src/app/projects/[slug]/page.tsx`: `generateMetadata` con fallback seguro y OG image absoluta.
- `src/app/blog/[slug]/page.tsx`: `generateMetadata` con `openGraph.type = "article"`, `publishedTime` y `tags`.
- `src/app/projects/page.tsx`: metadata estática de listados con `buildMetadata`.
- `src/app/blog/page.tsx`: metadata estática de listados con `buildMetadata`.
- `src/app/projects/[slug]/page.test.tsx` y `src/app/blog/[slug]/page.test.tsx`: pruebas de metadata dinámica y fallback.

### Completion Notes List
- Implementé `generateMetadata` en `src/app/projects/[slug]/page.tsx` con fallback seguro y OG image absoluta.
- Implementé `generateMetadata` en `src/app/blog/[slug]/page.tsx` con `openGraph.type = "article"`, `publishedTime` y `tags`.
- Actualicé metadata estática en `src/app/projects/page.tsx` y `src/app/blog/page.tsx` usando `buildMetadata`.
- Añadí pruebas para metadata dinámica y fallback en `src/app/projects/[slug]/page.test.tsx` y `src/app/blog/[slug]/page.test.tsx`.

### File List
- src/app/blog/[slug]/page.tsx
- src/app/blog/page.tsx
- src/app/projects/[slug]/page.tsx
- src/app/projects/page.tsx
- src/app/blog/[slug]/page.test.tsx
- src/app/projects/[slug]/page.test.tsx

### Change Log
- Implementada metadata dinámica por proyecto y por post, y se actualizó metadata estática de listados. (Date: 2026-05-26)

### Status
review
