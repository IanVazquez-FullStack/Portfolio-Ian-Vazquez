# Story 5.4: Añadir micro-interacciones en botones, cards y links

Status: ready-for-dev

## Story

As a visitante del portfolio,
I want feedback visual sutil al interactuar,
so that la interfaz se sienta viva sin ruido.

## Acceptance Criteria

1. **Given** las primitivas UI y componentes de contenido implementados, **When** se afinan hover/focus/active states en `Button`, `Card`, `ProjectCard`, `BlogPostCard` y links de navegación, **Then** cada clickable tiene micro-animación de `scale`, `translateY` o cambio de color/border en hover (200-300ms, easing suave) (FR-16).
2. `focus-visible` siempre es visible y no se solapa con hover (UX-DR9).
3. Las micro-interacciones respetan `prefers-reduced-motion` (solo cambio de color sin transformación) (FR-17).
4. En mobile el `:active` da feedback inmediato ≤ 100ms.
5. Ninguna micro-interacción dispara reflows ni afecta CLS.

## Tasks / Subtasks

- [ ] Refinar `Button.tsx` con micro-animaciones (AC: #1, #3)
  - [ ] Hover: `scale(1.02)` o `translateY(-1px)` via `whileHover` de Framer Motion o CSS `transition`
  - [ ] Active: `scale(0.98)` via `whileTap`
  - [ ] Respetar `useReducedMotion()`: solo cambio de color en hover sin transform
- [ ] Refinar `ProjectCard.tsx` con micro-animaciones (AC: #1, #3)
  - [ ] Hover: elevación sutil `translateY(-4px)` + sombra
  - [ ] `whileHover` con `useReducedMotion()` fallback
- [ ] Refinar `BlogPostCard.tsx` con micro-animaciones (AC: #1, #3)
  - [ ] Similar a `ProjectCard` — elevación sutil en hover
- [ ] Refinar links de navegación en `Navigation.tsx` (AC: #1)
  - [ ] Underline animado en hover (CSS `scaleX` transform en pseudo-elemento)
- [ ] Verificar `focus-visible` en todos los elementos (AC: #2)
  - [ ] Ring accent visible, no solapado con hover state
- [ ] Verificar `:active` en mobile ≤ 100ms (AC: #4)
- [ ] Verificar sin reflows con DevTools Performance (AC: #5)

## Dev Notes

- **CSS vs Framer Motion para micro-interacciones:** Para hover/active simples en `Button` y cards, **preferir CSS Tailwind** (`hover:scale-105 transition-transform duration-200`) — es más performante que Framer Motion para estas interacciones. Usar Framer Motion (`whileHover`, `whileTap`) solo cuando se necesite más control.
- **`prefers-reduced-motion` con Tailwind:** Usar `motion-reduce:transform-none motion-reduce:transition-none` para desactivar transforms con CSS nativo sin JS.
- **`focus-visible` no solapado:** Agregar `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2` en los elementos. El ring-offset asegura que sea visible sobre cualquier fondo.
- **`:active` en mobile:** `active:scale-95` en Tailwind da feedback táctil inmediato. CSS activo es más rápido que JS para esto.
- **Sin reflows:** Solo animar `transform` y `opacity`. NUNCA `margin`, `padding`, `width`, `height`, `top`, `left` en animaciones.
- **`translateY(-4px)` en cards:** Para elevación sutil. Pair con `shadow-lg` en hover para efecto "levitación".
- **Underline animado en nav:** `after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200` — todo CSS, sin JS.

### Project Structure Notes

- No se crean archivos nuevos — se modifican los componentes existentes.
- Archivos a modificar: `Button.tsx`, `ProjectCard.tsx`, `BlogPostCard.tsx`, `Navigation.tsx`.

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.4]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-16, FR-17, UX-DR9]
- [Source: _bmad-output/project-context.md#Reglas de Motion / Animaciones]
- [Source: _bmad-output/project-context.md#Anti-Patrones (animar propiedades layout)]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
