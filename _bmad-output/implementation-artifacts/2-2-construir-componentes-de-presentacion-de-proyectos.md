# Story 2.2: Construir componentes de presentación de proyectos

Status: ready-for-dev

## Story

As a desarrollador del portfolio,
I want `ProjectCard`, `TechStackBadges`, `MetricCard` y `ArchitectureDiagram` en `src/components/content/`,
so that Home, listado y detalle se compongan de forma consistente.

## Acceptance Criteria

1. **Given** las primitivas de Story 1.3 y el schema de Story 2.1, **When** se implementan los componentes (UX-DR4), **Then** `ProjectCard` recibe `Project` y renderiza cover (`next/image`), título, summary, badges de stack resumido y un link accesible único hacia `/projects/[slug]`.
2. La card revela stack completo y "tipo de problema" en hover y focus (info accesible por teclado, no solo en hover).
3. `TechStackBadges` soporta variantes `compact | detailed | grouped` reutilizando `Badge`.
4. `MetricCard` muestra número/label/contexto sin depender solo del color (UX-DR9).
5. `ArchitectureDiagram` expone descripción textual equivalente vía `aria-describedby`.
6. Todos son Server Components excepto cuando requieran interactividad (AR-07).

## Tasks / Subtasks

- [ ] Crear `src/components/content/ProjectCard.tsx` (AC: #1, #2)
  - [ ] Recibe prop `project: Project`
  - [ ] `next/image` con `width`, `height`, `alt` y `sizes` responsive
  - [ ] Link único accesible: `<Link href={/projects/${project.slug}}>` envolviendo la card
  - [ ] Stack resumido (primeras 3 tecnologías) con `Badge` compact
  - [ ] Hover/focus: revelar stack completo y descripción del tipo de problema
- [ ] Crear `src/components/content/TechStackBadges.tsx` (AC: #3)
  - [ ] Props: `stack: string[]`, `variant: 'compact' | 'detailed' | 'grouped'`
  - [ ] Reutiliza `Badge` de `src/components/ui/`
- [ ] Crear `src/components/content/MetricCard.tsx` (AC: #4)
  - [ ] Props: `value: string`, `label: string`, `context?: string`
  - [ ] No usar color como único diferenciador semántico
- [ ] Crear `src/components/content/ArchitectureDiagram.tsx` (AC: #5)
  - [ ] Wraps imagen/SVG con `role="img"`, `aria-label` y `aria-describedby`
  - [ ] Descripción textual accesible siempre presente
- [ ] Verificar que todos son Server Components salvo necesidad real de interactividad (AC: #6)

## Dev Notes

- **Server Components** por defecto (AR-07). `ProjectCard` no necesita estado propio — puede ser Server Component. El hover se maneja con CSS puro o con Framer Motion wrapper en Epic 5.
- **`next/image` en `ProjectCard`:** Siempre declarar `width` y `height`. Para cards usar tamaños como `width={640} height={360}`. Agregar `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"` para responsive.
- **Link accesible:** El `<Link>` debe envolver toda la card O la card debe tener un único `<Link>` con texto significativo. Evitar múltiples links anidados dentro de la misma card (problema de accesibilidad).
- **Hover reveal (AC #2):** Implementar con CSS `group` de Tailwind: `group-hover:opacity-100`. El focus también debe revelar la info (usar `group-focus-within:opacity-100`).
- **`MetricCard` sin depender del color:** Incluir icono o texto semántico adicional al color, ej. "↑ 40% mejora" en lugar de solo poner el número en verde.
- **`ArchitectureDiagram`:** Puede ser un componente simple que wraps `next/image` con los atributos ARIA correctos.

### Project Structure Notes

```
src/components/content/
  ProjectCard.tsx
  TechStackBadges.tsx
  MetricCard.tsx
  ArchitectureDiagram.tsx
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.2]
- [Source: _bmad-output/planning-artifacts/epics.md#UX-DR4, UX-DR9]
- [Source: _bmad-output/project-context.md#Server vs Client Components]
- [Source: _bmad-output/project-context.md#Reglas de Accesibilidad]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
