# Story 2.1: Definir schema de contenido de proyectos y loader MDX

Status: ready-for-dev

## Story

As a desarrollador del portfolio,
I want un schema Zod para frontmatter de proyectos y un loader que parsee MDX desde `src/content/projects/`,
so that pueda agregar proyectos como archivos `.mdx` sin modificar lógica (FR-06a, AR-06).

## Acceptance Criteria

1. **Given** el proyecto inicializado de Epic 1, **When** se implementan `src/lib/content/schemas.ts`, `src/lib/content/mdx.ts` y `src/lib/content/getProjects.ts`, **Then** `projectSchema` valida `title`, `slug` (kebab-case), `summary`, `publishedAt` (ISO 8601), `featured` (boolean), `stack` (string[]), `demoUrl?`, `repoUrl?`, `coverImage`.
2. `getProjects()` lee todos los `.mdx`, valida frontmatter, ordena por `publishedAt` desc y devuelve `Project[]` tipado.
3. `getProjectBySlug(slug)` retorna `Project | null` con contenido MDX renderizable.
4. Frontmatter inválido produce error claro en build indicando slug y campo problemático (no falla silencioso).
5. Existe al menos `src/content/projects/portfolio-ian.mdx` con frontmatter válido para uso en stories siguientes.
6. `npm run build` y `tsc --noEmit` pasan.

## Tasks / Subtasks

- [ ] Instalar dependencias MDX necesarias (AC: #2, #3)
  - [ ] `@next/mdx`, `@mdx-js/react`, `remark-frontmatter`, `remark-mdx-frontmatter`, `gray-matter` — evaluar qué combinación no usa `next-mdx-remote`
- [ ] Crear `src/lib/content/schemas.ts` con `projectSchema` Zod (AC: #1)
  - [ ] Campos: `title`, `slug`, `summary`, `publishedAt`, `featured`, `stack`, `demoUrl?`, `repoUrl?`, `coverImage`
  - [ ] Exportar `Project = z.infer<typeof projectSchema>`
- [ ] Crear `src/lib/content/mdx.ts` con helpers de parsing MDX (AC: #2, #3)
- [ ] Crear `src/lib/content/getProjects.ts` (AC: #2, #3)
  - [ ] `getProjects()`: lee directorio, parsea frontmatter, valida con Zod, ordena por `publishedAt` desc
  - [ ] `getProjectBySlug(slug)`: busca por slug, retorna con contenido MDX o `null`
- [ ] Configurar `next.config.js` para soporte MDX si necesario (AC: #2)
- [ ] Crear `src/content/projects/portfolio-ian.mdx` con frontmatter completo válido (AC: #5)
- [ ] Verificar que frontmatter inválido produce error claro (AC: #4)
- [ ] Ejecutar `npm run build` y `tsc --noEmit` (AC: #6)

## Dev Notes

- **CRÍTICO — NO usar `next-mdx-remote`:** Está archivado en 2026. Usar `gray-matter` para parsear frontmatter y `@next/mdx` o `@mdx-js/loader` para el compilado.
- **Estrategia MDX recomendada:** `gray-matter` para parsear el frontmatter + `fs.readFileSync` para leer archivos en server. El contenido MDX se compila usando `@mdx-js/react` en el contexto de Next.js App Router.
- **Error claro en build (AC #4):** Usar `projectSchema.safeParse(frontmatter)` y si falla, hacer `throw new Error(`[portfolio-ian] Invalid frontmatter in ${slug}: ${JSON.stringify(result.error.format())}`)`.
- **Estas funciones son server-only** — nunca importarlas desde Client Components. Solo se usan en Server Components o Route Handlers.
- **`coverImage`:** Ruta relativa a `public/`, ej. `/projects/portfolio-ian/cover.webp`.
- **Slug = nombre del archivo:** `portfolio-ian.mdx` → slug `portfolio-ian`.
- **Frontmatter del portfolio-ian.mdx:**
  ```yaml
  title: "portfolio-ian"
  slug: "portfolio-ian"
  summary: "Portfolio web de desarrollador full stack con Next.js 14, TypeScript y Framer Motion"
  publishedAt: "2026-05-25"
  featured: true
  stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Resend", "MDX", "Vercel"]
  repoUrl: "https://github.com/[usuario]/portfolio-ian"
  coverImage: "/projects/portfolio-ian/cover.webp"
  ```

### Project Structure Notes

```
src/lib/content/
  schemas.ts        ← projectSchema + Project type
  mdx.ts            ← helpers de compilado MDX
  getProjects.ts    ← getProjects(), getProjectBySlug()
src/content/projects/
  portfolio-ian.mdx ← frontmatter válido (seed)
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.1]
- [Source: _bmad-output/planning-artifacts/epics.md#AR-06, FR-06a]
- [Source: _bmad-output/project-context.md#MDX y Contenido]
- [Source: _bmad-output/project-context.md#Anti-Patrones (NO next-mdx-remote)]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
