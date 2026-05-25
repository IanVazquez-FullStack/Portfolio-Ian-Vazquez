# Story 4.1: Definir schema de posts y loader MDX para blog

Status: ready-for-dev

## Story

As a desarrollador del portfolio,
I want un `postSchema` Zod y un loader `getBlogPosts()` para `src/content/blog/`,
so that pueda agregar artículos como `.mdx` sin tocar código (paralelo a Story 2.1).

## Acceptance Criteria

1. **Given** la infraestructura de contenido de Story 2.1, **When** se implementan `postSchema` en `src/lib/content/schemas.ts` y `getBlogPosts()` / `getBlogPostBySlug()` en `src/lib/content/getBlogPosts.ts`, **Then** `postSchema` valida `title`, `slug` (kebab-case), `summary`, `publishedAt` (ISO 8601), `tags` (string[]), `draft?` (boolean default false).
2. `getBlogPosts()` excluye drafts en `NODE_ENV === "production"`, ordena por `publishedAt` desc y devuelve `BlogPost[]`.
3. `getBlogPostBySlug(slug)` devuelve post + contenido MDX o `null`.
4. `src/lib/utils/readingTime.ts` calcula tiempo de lectura (palabras/200) expuesto en `BlogPost`.
5. `src/lib/utils/formatDate.ts` formatea fechas en español (`"24 de mayo de 2026"`).
6. `npm run build` y `tsc --noEmit` pasan.

## Tasks / Subtasks

- [ ] Agregar `postSchema` a `src/lib/content/schemas.ts` (AC: #1)
  - [ ] Campos: `title`, `slug`, `summary`, `publishedAt`, `tags`, `draft` (default `false`)
  - [ ] Exportar `BlogPost = z.infer<typeof postSchema>`
- [ ] Crear `src/lib/content/getBlogPosts.ts` (AC: #2, #3)
  - [ ] `getBlogPosts()`: lee `src/content/blog/`, valida, excluye drafts en prod, ordena desc
  - [ ] `getBlogPostBySlug(slug)`: retorna post + contenido MDX o `null`
  - [ ] Enriquecer cada `BlogPost` con `readingTime` calculado
- [ ] Crear `src/lib/utils/readingTime.ts` (AC: #4)
  - [ ] `readingTime(text: string): number` — `Math.ceil(wordCount / 200)` (mínimo 1 min)
- [ ] Crear `src/lib/utils/formatDate.ts` (AC: #5)
  - [ ] `formatDate(dateString: string): string` usando `Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })`
- [ ] Ejecutar `npm run build` y `tsc --noEmit` (AC: #6)

## Dev Notes

- **Extender `schemas.ts`** de Story 2.1 — no crear un archivo nuevo. Agregar `postSchema` en el mismo archivo junto a `projectSchema`.
- **Excluir drafts:** `NODE_ENV === 'production'` filtra los posts con `draft: true`. En desarrollo, se muestran todos.
- **`readingTime`:** Contar palabras con `text.trim().split(/\s+/).length`. Dividir por 200. `Math.ceil()` para redondear hacia arriba. Mínimo 1 minuto.
- **`formatDate`:** Usar `Intl.DateTimeFormat` con locale `'es-AR'` para fechas en español. Resultado esperado: `"25 de mayo de 2026"`.
  ```ts
  export function formatDate(dateString: string): string {
    return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(dateString));
  }
  ```
- **Naming:** `camelCase` para todos los utils (`readingTime.ts`, `formatDate.ts`). Son funciones helpers, no constantes globales.
- **`BlogPost` type:** Incluir `readingTime: number` como campo calculado (no en el frontmatter).

### Project Structure Notes

```
src/lib/content/
  schemas.ts          ← agregar postSchema (extender existente)
  getBlogPosts.ts     ← getBlogPosts() + getBlogPostBySlug()
src/lib/utils/
  readingTime.ts      ← helper de cálculo
  formatDate.ts       ← helper de formato
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 4.1]
- [Source: _bmad-output/planning-artifacts/epics.md#AR-06, FR-11]
- [Source: _bmad-output/project-context.md#MDX y Contenido (Frontmatter de posts)]
- [Source: _bmad-output/project-context.md#Convenciones de Naming]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
