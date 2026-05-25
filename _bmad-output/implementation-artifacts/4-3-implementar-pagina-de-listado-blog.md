# Story 4.3: Implementar página de listado /blog

Status: ready-for-dev

## Story

As a visitante del portfolio,
I want ver los artículos ordenados por fecha con excerpt, fecha y tiempo de lectura,
so that pueda elegir qué leer según tiempo e interés.

## Acceptance Criteria

1. **Given** el loader de Story 4.1, **When** se implementan `src/app/blog/page.tsx` y `src/components/content/BlogPostCard.tsx`, **Then** la página renderiza posts no-draft ordenados por `publishedAt` desc (FR-11).
2. Cada `BlogPostCard` muestra título, excerpt (summary), fecha formateada, tiempo de lectura y tags como `Badge`s pequeños.
3. Click navega a `/blog/[slug]`.
4. Layout responsive: 1 col mobile, 1-2 col tablet+ (UX-DR10).
5. Sin posts publicados, muestra empty state ("Próximamente artículos técnicos") (UX-DR12).

## Tasks / Subtasks

- [ ] Crear `src/components/content/BlogPostCard.tsx` (AC: #2, #3)
  - [ ] Props: `post: BlogPost`
  - [ ] Mostrar: título, summary, `formatDate(publishedAt)`, `readingTime` min, tags como `Badge` pequeños
  - [ ] Link accesible a `/blog/${post.slug}`
  - [ ] Server Component (no requiere estado)
- [ ] Crear `src/app/blog/page.tsx` como Server Component (AC: #1, #4, #5)
  - [ ] Llamar `getBlogPosts()` directamente
  - [ ] Grid/list responsive: `grid-cols-1 md:grid-cols-2 gap-6`
  - [ ] `<h1>Blog</h1>` como heading único
  - [ ] Empty state si `posts.length === 0`
  - [ ] Metadata estática: `export const metadata = { title: 'Blog', description: '...' }`

## Dev Notes

- **Server Component:** `page.tsx` y `BlogPostCard` son Server Components. No necesitan `"use client"`.
- **`getBlogPosts()`** excluye drafts en producción automáticamente (Story 4.1). En desarrollo se ven todos.
- **`readingTime` en `BlogPost`:** El campo ya viene calculado del loader (Story 4.1). Mostrar como `"${post.readingTime} min de lectura"`.
- **Tags como `Badge`:** Usar `Badge` de `src/components/ui/` con tamaño pequeño. Máximo mostrar 3-4 tags para no saturar la card.
- **Layout:** Preferir una lista vertical en lugar de grid para artículos — mejora la legibilidad de excerpts. O grid de 1-2 cols como dice el AC. Decidir según gusto visual.
- **Empty state (UX-DR12):** `"Próximamente artículos técnicos sobre el desarrollo de este portfolio y más."` — honesto y sin dejar la página en blanco.
- **Link único accesible:** Envolver el título con `<Link>` o usar `stretched-link` pattern de Tailwind para hacer toda la card clickeable con un solo elemento de foco.

### Project Structure Notes

```
src/app/blog/
  page.tsx              ← Server Component
src/components/content/
  BlogPostCard.tsx      ← Server Component
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 4.3]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-11, UX-DR10, UX-DR12]
- [Source: _bmad-output/project-context.md#Server vs Client Components]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
