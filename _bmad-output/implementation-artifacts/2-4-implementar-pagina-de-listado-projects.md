# Story 2.4: Implementar página de listado /projects

Status: done

## Story

As a visitante del portfolio,
I want una página `/projects` con el listado completo,
so that pueda explorar todo el trabajo más allá de los destacados.

## Acceptance Criteria

1. **Given** el loader de Story 2.1 y `ProjectCard` de Story 2.2, **When** se implementa `src/app/projects/page.tsx` (Server Component), **Then** la página renderiza el grid completo ordenado por `publishedAt` desc (FR-05).
2. Llama a `getProjects()` directamente sin hidratación innecesaria (AR-07).
3. Define metadata estática base (refinada en Epic 6).
4. Es responsive 1/2/3 columnas (UX-DR10).
5. Si no hay proyectos, muestra empty state coherente (UX-DR12).

## Tasks / Subtasks

- [x] Crear `src/app/projects/page.tsx` como Server Component (AC: #1, #2)
  - [x] Llamar `getProjects()` directamente en el componente (no en `useEffect`)
  - [x] Renderizar grid con `ProjectCard` para cada proyecto
  - [x] `<h1>Proyectos</h1>` como único heading principal
- [x] Agregar metadata estática básica (AC: #3)
  - [x] `export const metadata = { title: 'Proyectos', description: '...' }`
- [x] Grid responsive 1/2/3 columnas (AC: #4)
  - [x] `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- [x] Empty state cuando `projects.length === 0` (AC: #5)
  - [x] Mensaje honesto: "Próximamente proyectos"

## Dev Notes

- **Server Component puro** — no usar `"use client"`. `getProjects()` se puede llamar directamente como si fuera una función async en el componente.
- **Sin hidratación innecesaria:** La página NO necesita estado cliente. Todos los datos vienen de `getProjects()` en build time.
- **Metadata:** Solo metadata básica aquí — title y description. El Open Graph completo se hace en Epic 6 Story 6.2.
- **Jerarquía de headings:** `<h1>` en la página para "Proyectos", luego dentro de cada `ProjectCard` puede usar `<h2>` para el título del proyecto (verificar que ProjectCard use `<h2>` internamente).
- **Grid:**  Usar el mismo patrón de grid que en `FeaturedProjects` (Story 2.3) para consistencia.

### Project Structure Notes

```
src/app/projects/
  page.tsx    ← Server Component, llama getProjects()
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.4]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-05, AR-07, UX-DR10, UX-DR12]
- [Source: _bmad-output/project-context.md#Server vs Client Components]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-20250514

### Debug Log References

### Completion Notes List

- ✅ Reescrito `src/app/projects/page.tsx` como Server Component puro que llama `getProjects()` directamente sin hidratación cliente.
- ✅ Grid responsive 1/2/3 columnas con `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` y `role="list"` para accesibilidad.
- ✅ Metadata estática exportada: `title: 'Proyectos'` y descripción descriptiva.
- ✅ `<h1>` único en la página; `ProjectCard` actualizado con prop `headingLevel` opcional (`h2` | `h3`) para mantener jerarquía semántica sin saltos.
- ✅ Empty state honesto con mensaje "Próximamente proyectos" cuando no hay contenido.
- ✅ Tests unitarios con vitest + @testing-library/react: 4 tests cubriendo heading h1, empty state, grid con h2, y metadata.
- ✅ `npm run lint` limpio para archivos modificados. Build preexistente falla por configuración MDX ajena a esta historia.

### File List

- `src/app/projects/page.tsx`
- `src/app/projects/page.test.tsx`
- `src/components/content/ProjectCard.tsx`

### Review Findings

- [x] [Review][Applied] Overlay oculta stack completo y enlaces demo/repo a screen readers — **Resuelto:** Se eliminó el overlay `aria-hidden` completamente. Stack completo y enlaces demo/repo ahora son semánticamente accesibles.
- [x] [Review][Applied] Overlay hover-only es inaccesible en dispositivos táctiles — **Resuelto:** Se eliminó el overlay hover. Stack completo y enlaces demo/repo se muestran permanentemente.
- [x] [Review][Applied] Enlaces demo/repo en overlay son texto plano, no navegables — **Resuelto:** Se convirtieron a `<a>` reales con `target="_blank"` y `rel="noopener noreferrer"`.
- [x] [Review][Applied] `next/image` sin `placeholder="blur"` puede causar CLS [src/components/content/ProjectCard.tsx:22-30] — **Resuelto:** Agregado `placeholder="blur"` con `blurDataURL` inline (shimmer SVG).
- [x] [Review][Applied] Mock data en test no incluye campo `content` del tipo `ProjectWithContent` [src/app/projects/page.test.tsx:45-55] — **Resuelto:** Agregado `content: ""` al objeto mock.
- [x] [Review][Applied] `getProjects()` puede lanzar excepción no manejada en build/SSR [src/app/projects/page.tsx:12] — **Resuelto:** Envuelto en `try/catch`; en error la página muestra empty state graceful.
- [x] [Review][Applied] Grid responsive usa `md:grid-cols-2` en vez de `sm:grid-cols-2`, inconsistente con FeaturedProjects [src/app/projects/page.tsx:33] — **Resuelto:** Cambiado a `sm:grid-cols-2` para consistencia.
- [x] [Review][Applied] Empty state usa mensaje diferente a FeaturedProjects, inconsistente [src/app/projects/page.tsx:25] — **Resuelto:** Unificado a "Próximamente: proyectos en construcción".
- [x] [Review][Applied] `Date.parse()` puede ser inconsistente con fechas sin timezone [src/lib/content/getProjects.ts:49] — **Resuelto:** Reemplazado por `new Date().getTime()`.
- [x] [Review][Defer] `toBeTruthy()` en tests debería ser `toBeInTheDocument()` [src/app/projects/page.test.tsx:28-30,38-41,59-64] — **Nota:** Requiere instalar `@testing-library/jest-dom` y configurar en vitest. Agregado TODO comment en test. Deferred hasta que se instale la dependencia.
- [x] [Review][Defer] `getProjects()` carga contenido MDX completo innecesariamente en página de listado [src/lib/content/getProjects.ts:46-50] — deferred, pre-existing
