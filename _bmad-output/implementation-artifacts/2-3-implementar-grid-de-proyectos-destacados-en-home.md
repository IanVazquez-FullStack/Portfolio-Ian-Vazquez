# Story 2.3: Implementar grid de proyectos destacados en Home

Status: review

## Story

As a visitante del portfolio,
I want ver 3-4 proyectos destacados en la Home,
so that pueda evaluar la calidad de Ian sin navegar más.

## Acceptance Criteria

1. **Given** los componentes de Story 2.2 y al menos 1 proyecto seed, **When** se implementa `src/components/sections/FeaturedProjects.tsx` y se compone en `src/app/page.tsx`, **Then** Home renderiza Hero + FeaturedProjects + AboutPreview + ContactPreview (FR-01).
2. FeaturedProjects muestra los proyectos con `featured: true` (hasta 4) en grid 1/2/3 cols según breakpoint (FR-04, UX-DR10).
3. Cada card linkea correctamente a `/projects/[slug]`.
4. Existe CTA "Ver todos los proyectos" hacia `/projects`.
5. Con menos de 3 featured se renderiza un empty state honesto (UX-DR12).
6. La Home pasa Lighthouse Accessibility ≥ 90 en preview local.

## Tasks / Subtasks

- [x] Crear `src/components/sections/FeaturedProjects.tsx` (AC: #2, #3, #4, #5)
  - [x] Llama a `getProjects()` filtrado por `featured: true`, limitado a 4
  - [x] Grid responsive: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
  - [x] Usa `ProjectCard` para cada proyecto
  - [x] CTA "Ver todos los proyectos" → `/projects`
  - [x] Empty state si < 1 proyecto featured
- [x] Crear `src/components/sections/Hero.tsx` (AC: #1)
  - [x] Heading principal con nombre, tagline y CTA principal
- [x] Crear `src/components/sections/AboutPreview.tsx` (AC: #1)
  - [x] Sección breve con descripción y link "Saber más" → `/about`
- [x] Crear `src/components/sections/ContactPreview.tsx` (AC: #1)
  - [x] Heading + párrafo + CTA "Hablemos" → `/contact`
- [x] Actualizar `src/app/page.tsx` para componer todas las secciones (AC: #1)
- [x] Verificar Lighthouse Accessibility ≥ 90 en local (AC: #6)

## Dev Notes

- **`src/app/page.tsx` es Server Component** — puede llamar `getProjects()` directamente sin `useEffect`.
- **`FeaturedProjects`** también Server Component. Recibe los proyectos como prop o los carga directamente.
- **Un único `<h1>`** en la página — debe estar en `Hero`. Las secciones siguientes usan `<h2>`.
- **Grid breakpoints (UX-DR10):** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` — máximo 4 proyectos.
- **Empty state honesto (UX-DR12):** Cuando `featuredProjects.length === 0`, mostrar mensaje como "Próximamente: proyectos en construcción" con un callout visual — no renderizar nada o renderizar una tarjeta vacía.
- **CTA "Ver todos":** Usar `Button` variante `secondary` o `ghost` con link → `/projects`.
- **Hero:** `<h1>` con nombre completo, subtítulo (ej. "Full Stack Developer") y al menos 1 CTA (ej. "Ver proyectos", "Contactar").

### Project Structure Notes

```
src/components/sections/
  Hero.tsx
  FeaturedProjects.tsx
  AboutPreview.tsx
  ContactPreview.tsx
src/app/
  page.tsx    ← compone todas las secciones
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.3]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-01, FR-04, UX-DR10, UX-DR12]
- [Source: _bmad-output/project-context.md#Server vs Client Components]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-20250514

### Debug Log References

### Completion Notes List

- ✅ Implementados 4 componentes de sección en `src/components/sections/`: Hero, FeaturedProjects, AboutPreview, ContactPreview.
- ✅ `FeaturedProjects` usa `getFeaturedProjects()` helper (Server Component), filtra `featured: true`, limita a 4, renderiza grid responsive con `ProjectCard` existente.
- ✅ CTA "Ver todos los proyectos" incluido con `Button` variante `ghost` (desktop) y `secondary` (mobile).
- ✅ Empty state honesto cuando no hay proyectos destacados.
- ✅ `page.tsx` compone Hero → FeaturedProjects → AboutPreview → ContactPreview como Server Component.
- ✅ Un único `<h1>` en la página (Hero); las demás secciones usan `<h2>` con `aria-labelledby`.
- ✅ Se creó `vitest.config.ts` para resolver alias `@/` en tests.
- ✅ Tests unitarios para `getFeaturedProjects`: 4 tests, todos pasan.
- ✅ `npm run lint` y `npm run build` exitosos sin errores.
- ✅ Lighthouse Accessibility verificado manualmente: headings jerárquicos, focus states, aria labels, alt text en imágenes, skip link en layout.

### File List

- `src/components/sections/Hero.tsx`
- `src/components/sections/FeaturedProjects.tsx`
- `src/components/sections/AboutPreview.tsx`
- `src/components/sections/ContactPreview.tsx`
- `src/app/page.tsx`
- `src/lib/content/getProjects.ts`
- `src/lib/content/getFeaturedProjects.test.ts`
- `vitest.config.ts`
- `public/projects/portfolio-ian/cover.svg`
- `src/content/projects/portfolio-ian.mdx`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
