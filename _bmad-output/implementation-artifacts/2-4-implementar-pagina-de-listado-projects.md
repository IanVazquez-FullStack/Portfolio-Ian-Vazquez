# Story 2.4: Implementar página de listado /projects

Status: ready-for-dev

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

- [ ] Crear `src/app/projects/page.tsx` como Server Component (AC: #1, #2)
  - [ ] Llamar `getProjects()` directamente en el componente (no en `useEffect`)
  - [ ] Renderizar grid con `ProjectCard` para cada proyecto
  - [ ] `<h1>Proyectos</h1>` o equivalente como único heading principal
- [ ] Agregar metadata estática básica (AC: #3)
  - [ ] `export const metadata = { title: 'Proyectos', description: '...' }`
- [ ] Grid responsive 1/2/3 columnas (AC: #4)
  - [ ] `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- [ ] Empty state cuando `projects.length === 0` (AC: #5)
  - [ ] Mensaje honesto: "Próximamente proyectos" o similar

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

_pending_

### Debug Log References

### Completion Notes List

### File List
