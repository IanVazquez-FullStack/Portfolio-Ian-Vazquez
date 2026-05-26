# Story 6.3: Implementar robots.ts y sitemap.ts

Status: review

## Story

As a motor de búsqueda,
I want descubrir todas las páginas públicas y respetar las reglas de indexación,
so that el portfolio aparezca en resultados relevantes.

## Acceptance Criteria

1. **Given** las rutas estables del portfolio, **When** se implementan `src/app/robots.ts` y `src/app/sitemap.ts`, **Then** `robots.ts` permite indexar todo y referencia el sitemap (con `NEXT_PUBLIC_SITE_URL`).
2. `sitemap.ts` genera entradas para `/`, `/about`, `/contact`, `/projects`, todos los `/projects/[slug]`, `/blog` y todos los `/blog/[slug]` (excluyendo drafts).
3. Cada entrada incluye `lastModified` desde `publishedAt`.
4. Ambos archivos son accesibles en dev (`/robots.txt`, `/sitemap.xml`) con respuestas 200 OK.

## Tasks / Subtasks

- [x] Crear `src/app/robots.ts` (AC: #1, #4)
  - [x] Exportar función default retornando objeto `MetadataRoute.Robots`
  - [x] `rules: { userAgent: '*', allow: '/' }`
  - [x] `sitemap: \`${SITE_URL}/sitemap.xml\``
- [x] Crear `src/app/sitemap.ts` (AC: #2, #3, #4)
  - [x] Exportar función async default retornando `MetadataRoute.Sitemap`
  - [x] Rutas estáticas: `/`, `/about`, `/contact`, `/projects`, `/blog`
  - [x] Rutas dinámicas de proyectos: `getProjects()` → `/projects/${slug}`
  - [x] Rutas dinámicas de posts: `getBlogPosts()` → `/blog/${slug}` (excluye drafts automáticamente)
  - [x] `lastModified: new Date(publishedAt)` para contenido dinámico
  - [x] `lastModified: new Date()` para rutas estáticas
- [x] Verificar `/robots.txt` y `/sitemap.xml` responden 200 en dev (AC: #4)

## Dev Notes

- **Next.js App Router metadata routes:** `robots.ts` y `sitemap.ts` son metadata routes de Next.js — se colocan en `src/app/` y Next.js los convierte automáticamente en `/robots.txt` y `/sitemap.xml`.
- **`MetadataRoute` types:**
  ```ts
  import type { MetadataRoute } from 'next';
  export default function robots(): MetadataRoute.Robots { ... }
  export default async function sitemap(): Promise<MetadataRoute.Sitemap> { ... }
  ```
- **`SITE_URL` de `src/lib/seo/site.ts`:** Importar la constante ya definida en Story 6.1.
- **Rutas estáticas con `lastModified`:** Usar `new Date()` para homepage, about, contact — representan "actualizado hoy".
- **Rutas de contenido:** `new Date(project.publishedAt)` o `new Date(post.publishedAt)` para fechas exactas.
- **Verificar en dev:** `npm run dev` → abrir `/robots.txt` y `/sitemap.xml` en el navegador. Ambos deben mostrar contenido correcto.

### Project Structure Notes

```
src/app/
  robots.ts    ← MetadataRoute.Robots
  sitemap.ts   ← MetadataRoute.Sitemap (async)
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.3]
- [Source: _bmad-output/project-context.md#SEO y Metadata]

### Dev Agent Record

### Agent Model Used

Claude (Cascade)

### Debug Log References

- Created/modified files and unit tests locally.
- Ran `vitest` for `src/app/robots.test.ts` and `src/app/sitemap.test.ts`: both test files passed (2 tests total).
- Ran `eslint` on modified files; fixed linter issues in tests (removed `any`, used concrete typed fixtures).
- Started Next.js dev server and verified HTTP 200 responses for `/robots.txt` and `/sitemap.xml` via `curl -I`.

### Completion Notes List

- Implemented `src/app/robots.ts` exporting a `MetadataRoute.Robots` object with:
  - `rules: { userAgent: '*', allow: '/' }`
  - `sitemap: `${SITE_URL}/sitemap.xml`
- Implemented `src/app/sitemap.ts` exporting an async `MetadataRoute.Sitemap` that returns:
  - Static routes: `/`, `/about`, `/contact`, `/projects`, `/blog` with `lastModified: new Date()`
  - Dynamic project routes from `getProjects()` using `new Date(project.publishedAt)`
  - Dynamic blog routes from `getBlogPosts()` using `new Date(post.publishedAt)` and excluding drafts in non-production
  - Applied an explicit `.filter(post => !post.draft)` in the sitemap generation to ensure drafts are not included during tests/dev
- Added unit tests: `src/app/robots.test.ts` and `src/app/sitemap.test.ts` to validate behavior and to prevent regressions.
- Verified in dev that both metadata routes return 200 OK and that tests & lint for modified files pass.

### File List

- `src/app/robots.ts` (added/verified)
- `src/app/sitemap.ts` (modified: added draft exclusion filter)
- `src/app/robots.test.ts` (added unit test)
- `src/app/sitemap.test.ts` (added unit test)

### Change Log

- 2026-05-26: Implemented `robots.ts` and `sitemap.ts`; added unit tests (`robots.test.ts`, `sitemap.test.ts`); updated `sitemap.ts` to exclude drafts; verified endpoints in dev and ensured lint/tests pass.
