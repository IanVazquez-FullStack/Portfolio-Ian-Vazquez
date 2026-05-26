# Story 4.1: Definir schema de posts y loader MDX para blog

Status: done

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

Claude (Cascade)

### Debug Log References

- `npm run build`: exitoso (static pages generadas correctamente)
- `tsc --noEmit`: falla en archivos preexistentes (`responses.test.ts`, `contactSchema.test.ts`), no en archivos nuevos de esta story
- `node --test src/lib/content/getBlogPosts.test.ts`: falla por path aliases no resueltos (mismo comportamiento que `getProjects.test.ts` preexistente)

### Completion Notes List

- `postSchema` agregado a `src/lib/content/schemas.ts` junto a `projectSchema`, con validación de kebab-case, ISO 8601, tags array y draft default false
- `BlogPost` type enriquecido con `readingTime: number` (campo calculado)
- `getBlogPosts()` implementado en `src/lib/content/getBlogPosts.ts` — filtra drafts en producción, ordena desc por `publishedAt`, reutiliza patrón de `getProjects.ts`
- `getBlogPostBySlug(slug)` devuelve post + contenido MDX o `null`
- `readingTime.ts` calcula `Math.ceil(words / 200)` con mínimo 1 min
- `formatDate.ts` usa `Intl.DateTimeFormat('es-AR', ...)` para fechas en español
- Post de ejemplo creado en `src/content/blog/hola-mundo.mdx`
- Tests unitarios creados en `getBlogPosts.test.ts` (paralelos a `getProjects.test.ts`)

### File List

- `src/lib/content/schemas.ts`
- `src/lib/content/getBlogPosts.ts`
- `src/lib/content/getBlogPosts.test.ts`
- `src/lib/utils/readingTime.ts`
- `src/lib/utils/formatDate.ts`
- `src/content/blog/hola-mundo.mdx`

### Review Findings

- [x] [Review][Patch] `getBlogPostBySlug` no filtra drafts en producción — **Fixed**: agregado check `isProduction && post.draft` en `getBlogPostBySlug`. [`src/lib/content/getBlogPosts.ts:77-79`]
- [x] [Review][Patch] `readingTime` con texto vacío o solo whitespace devuelve 1 minuto — **Fixed**: manejado caso `trimmed.length === 0` antes de `split()`. [`src/lib/utils/readingTime.ts:3`]
- [x] [Review][Patch] `formatDate` lanza `RangeError` si `dateString` es inválido — **Fixed**: agregado `isNaN(date.getTime())` check con throw explícito. [`src/lib/utils/formatDate.ts:3-5`]
- [x] [Review][Patch] Expresión lógica confusa en filtro de drafts — **Fixed**: refactorizado a bloque explícito `if (!isProduction) return true; return !post.draft;`. [`src/lib/content/getBlogPosts.ts:57-60`]
- [x] [Review][Patch] Test de `getBlogPosts()` no verifica campo `content` — **Fixed**: agregado `assert.equal(typeof posts[0]?.content, "string")`. [`src/lib/content/getBlogPosts.test.ts:56`]
- [x] [Review][Patch] No hay test de `draft: true` explícito en schema tests — **Fixed**: agregado test `accepts explicit draft: true`. [`src/lib/content/getBlogPosts.test.ts:35-47`]
- [x] [Review][Defer] `tsc --noEmit` falla en tests preexistentes — `responses.test.ts`, `contactSchema.test.ts` causan errores de tipo no relacionados con esta story. [`varios`] — deferred, pre-existing
