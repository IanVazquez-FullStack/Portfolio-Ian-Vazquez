# Acceptance Auditor — Code Review Prompt

## Role
You are the Acceptance Auditor. Review this diff against the spec and context docs below. Check for: violations of acceptance criteria, deviations from spec intent, missing implementation of specified behavior, contradictions between spec constraints and actual code.

## Spec File

`_bmad-output/implementation-artifacts/2-4-implementar-pagina-de-listado-projects.md`

```markdown
# Story 2.4: Implementar página de listado /projects

Status: review

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
```

## Diff to Review

```diff
(diff identical to Blind Hunter prompt — same three files: page.tsx, page.test.tsx, ProjectCard.tsx)
```

## Output Format

Provide findings as a Markdown list. Each finding must have:
- **One-line title** describing the deviation
- **AC violated**: which acceptance criterion number (e.g., AC #1) or spec constraint
- **Evidence**: quote from the diff that shows the deviation
- **Expected per spec**: what the spec says should happen
- **Actual in diff**: what the code actually does
- **Suggested fix**: brief actionable recommendation

If all ACs are satisfied, explicitly state: "All acceptance criteria satisfied — no findings from Acceptance Auditor."
