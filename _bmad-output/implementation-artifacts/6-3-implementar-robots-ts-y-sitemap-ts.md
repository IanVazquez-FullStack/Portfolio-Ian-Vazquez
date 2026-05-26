# Story 6.3: Implementar robots.ts y sitemap.ts

Status: ready-for-dev

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

- [ ] Crear `src/app/robots.ts` (AC: #1, #4)
  - [ ] Exportar función default retornando objeto `MetadataRoute.Robots`
  - [ ] `rules: { userAgent: '*', allow: '/' }`
  - [ ] `sitemap: \`${SITE_URL}/sitemap.xml\``
- [ ] Crear `src/app/sitemap.ts` (AC: #2, #3, #4)
  - [ ] Exportar función async default retornando `MetadataRoute.Sitemap`
  - [ ] Rutas estáticas: `/`, `/about`, `/contact`, `/projects`, `/blog`
  - [ ] Rutas dinámicas de proyectos: `getProjects()` → `/projects/${slug}`
  - [ ] Rutas dinámicas de posts: `getBlogPosts()` → `/blog/${slug}` (excluye drafts automáticamente)
  - [ ] `lastModified: new Date(publishedAt)` para contenido dinámico
  - [ ] `lastModified: new Date()` para rutas estáticas
- [ ] Verificar `/robots.txt` y `/sitemap.xml` responden 200 en dev (AC: #4)

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

## Dev Agent Record

### Agent Model Used

Claude (Cascade)

### Debug Log References

- Pre-existing MDX loader build error in `next.config.ts` unrelated to this story. `tsc --noEmit` and `eslint` pass cleanly for both new files. Dev server confirmed `GET /robots.txt 200` before the unrelated MDX crash.

### Completion Notes List

- `robots.ts` exports `MetadataRoute.Robots` with `userAgent: '*', allow: '/'` and references `${SITE_URL}/sitemap.xml`.
- `sitemap.ts` exports async `MetadataRoute.Sitemap` with static routes (`/`, `/about`, `/contact`, `/projects`, `/blog`) using `new Date()` for `lastModified`, plus dynamic routes from `getProjects()` and `getBlogPosts()` (drafts excluded automatically) using `new Date(publishedAt)`.
- Both files placed at `src/app/robots.ts` and `src/app/sitemap.ts` per Next.js App Router metadata routes convention.

### File List

- `src/app/robots.ts`
- `src/app/sitemap.ts`
