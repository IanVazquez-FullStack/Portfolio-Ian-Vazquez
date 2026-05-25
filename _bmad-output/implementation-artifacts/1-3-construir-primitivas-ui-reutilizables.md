# Story 1.3: Construir primitivas UI reutilizables

Status: done

## Story

As a desarrollador del portfolio,
I want `Button`, `Card`, `Badge`, `Section`, `Container`, `VisuallyHidden` y `CodeBlock` en `src/components/ui/`,
so that las épicas siguientes compongan páginas sin reimplementar elementos básicos.

## Acceptance Criteria

1. **Given** los tokens de Story 1.2, **When** se implementan las primitivas con TS estricto y `PascalCase.tsx` (AR-08, UX-DR3), **Then** `Button` soporta variantes `primary | secondary | ghost | link`, props `loading`/`disabled`, polimorfismo `button` vs `a` y estados `default/hover/active/focus-visible/disabled/loading`.
2. `Card`, `Badge`, `Section`, `Container`, `VisuallyHidden`, `CodeBlock` exponen API tipada y respetan breakpoints de UX-DR10.
3. `CodeBlock` usa JetBrains Mono, scroll horizontal accesible por teclado y contraste alto.
4. Todos los interactivos cumplen `focus-visible` ring accent y contraste 4.5:1 (UX-DR9).
5. Existe una ruta `/styleguide` (no enlazada) que renderiza todas las variantes para verificación manual.
6. `npm run lint` y `npm run build` pasan.

## Tasks / Subtasks

- [x] Crear `src/components/ui/Button.tsx` (AC: #1)
  - [x] Variantes: `primary`, `secondary`, `ghost`, `link`
  - [x] Props: `loading`, `disabled`, `as` (polimorfismo `button | a`)
  - [x] Estado `loading`: muestra spinner/texto + deshabilita interacción
  - [x] `focus-visible` con ring accent, contraste 4.5:1
- [x] Crear `src/components/ui/Card.tsx` (AC: #2)
- [x] Crear `src/components/ui/Badge.tsx` (AC: #2)
- [x] Crear `src/components/ui/Section.tsx` — wrapper semántico `<section>` con padding estándar (AC: #2)
- [x] Crear `src/components/ui/Container.tsx` — `max-w-7xl` centrado con padding horizontal responsive (AC: #2)
- [x] Crear `src/components/ui/VisuallyHidden.tsx` — elemento accesible, invisible visualmente (AC: #2)
- [x] Crear `src/components/ui/CodeBlock.tsx` con JetBrains Mono, scroll horizontal accesible (AC: #3)
- [x] Crear `src/app/styleguide/page.tsx` con todas las variantes renderizadas (AC: #5)
- [x] Ejecutar `npm run lint` y `npm run build` (AC: #6)

### Review Findings

- [x] [Review][Patch] `Button` filtra la prop discriminante `as` al DOM [src/components/ui/Button.tsx:63]

## Dev Notes

- **Server Components por defecto** (AR-07). `Button` puede ser Server Component si no usa `onClick` con state. Solo agregar `"use client"` si el componente necesita hooks o eventos de navegador.
- **Polimorfismo en `Button`:** Implementar via prop `as` o condicional `href` (si tiene `href`, renderiza `<a>`). Tipar con `React.ComponentPropsWithoutRef<'button'> | React.ComponentPropsWithoutRef<'a'>`.
- **`VisuallyHidden`:** CSS `position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap;` — NO usar `display: none` ni `visibility: hidden` (esos ocultan a screen readers también).
- **`Container`:** `max-w-7xl mx-auto px-6 md:px-8 lg:px-12` (UX-DR10).
- **`Section`:** `py-20 lg:py-32` como padding por defecto.
- **Nomenclatura de archivos:** `PascalCase.tsx` — `Button.tsx`, `Card.tsx` — nunca `button.tsx`.
- **Anti-patrón:** No usar `any`. Tipar props con interfaces explícitas.

### Project Structure Notes

```
src/components/ui/
  Button.tsx
  Card.tsx
  Badge.tsx
  Section.tsx
  Container.tsx
  VisuallyHidden.tsx
  CodeBlock.tsx
  index.ts   ← barrel export opcional
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3]
- [Source: _bmad-output/planning-artifacts/epics.md#UX-DR3, UX-DR9, UX-DR10]
- [Source: _bmad-output/project-context.md#Estructura de Componentes]
- [Source: _bmad-output/project-context.md#Anti-Patrones Críticos]

## Dev Agent Record

### Agent Model Used

Cascade

### Debug Log References

- `npm run lint` — pasa sin errores ni warnings.
- `npm run build` — pasa; Next.js reporta warning no bloqueante sobre `type: module` en `package.json` al leer `tailwind.config.ts`.

### Completion Notes List

- Implementadas primitivas UI tipadas en `src/components/ui/` usando tokens Tailwind existentes y Server Components por defecto.
- `Button` soporta variantes `primary`, `secondary`, `ghost`, `link`, estado `loading`, `disabled` y polimorfismo `button | a`.
- `Container`, `Section`, `Card`, `Badge`, `VisuallyHidden` y `CodeBlock` respetan las APIs y estilos solicitados.
- `CodeBlock` usa `font-mono`, alto contraste y `tabIndex={0}` para scroll horizontal accesible por teclado.
- Agregada ruta no enlazada `/styleguide` con renderizado manual de variantes.
- Validaciones ejecutadas: `npm run lint` y `npm run build`.

### File List

- `src/app/styleguide/page.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/CodeBlock.tsx`
- `src/components/ui/Container.tsx`
- `src/components/ui/Section.tsx`
- `src/components/ui/VisuallyHidden.tsx`
- `src/components/ui/index.ts`
- `_bmad-output/implementation-artifacts/1-3-construir-primitivas-ui-reutilizables.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-05-25 — Implementadas primitivas UI reutilizables, styleguide y validaciones de build/lint.
