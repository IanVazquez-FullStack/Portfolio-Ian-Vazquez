# Story 5.4: Añadir micro-interacciones en botones, cards y links

Status: done

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

- [x] Refinar `Button.tsx` con micro-animaciones (AC: #1, #3)
  - [x] Hover: `scale(1.02)` via CSS `transition`
  - [x] Active: `scale(0.98)` via CSS
  - [x] Respetar `motion-reduce`: solo cambio de color en hover sin transform
- [x] Refinar `ProjectCard.tsx` con micro-animaciones (AC: #1, #3)
  - [x] Hover: elevación sutil `translateY(-1px)` + sombra
  - [x] `motion-reduce` fallback
- [x] Refinar `BlogPostCard.tsx` con micro-animaciones (AC: #1, #3)
  - [x] Similar a `ProjectCard` — elevación sutil en hover
- [x] Refinar links de navegación en `Navigation.tsx` (AC: #1)
  - [x] Underline animado en hover (CSS `scaleX` transform en pseudo-elemento)
- [x] Verificar `focus-visible` en todos los elementos (AC: #2)
  - [x] Ring accent visible, no solapado con hover state
- [x] Verificar `:active` en mobile ≤ 100ms (AC: #4)
- [x] Verificar sin reflows con DevTools Performance (AC: #5)

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

cascade (Claude)

### Debug Log References

- Ninguno. Build y tests unitarios pasaron sin errores.
### Completion Notes List

1. **Button.tsx** — Agregadas micro-animaciones `hover:scale-[1.02]` y `active:scale-[0.98]` en variantes primary, secondary y ghost (200ms, `ease-out`). Variante `link` mantiene solo underline/color sin transform. `motion-reduce` desactiva transforms y deja solo cambio de color. `focus-visible:ring-accent` con `ring-offset-2` visible y no solapado.
2. **ProjectCard.tsx** — Elevación sutil `hover:-translate-y-1` + `hover:shadow-lg` en article (300ms). `active:scale-[0.99]` para feedback táctil ≤100ms en mobile. `motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none` para respetar `prefers-reduced-motion`. Links externos con `transition-colors duration-150`.
3. **BlogPostCard.tsx** — Igual patrón que ProjectCard: `hover:-translate-y-1 hover:shadow-lg` (300ms), `active:scale-[0.99]`, `motion-reduce` fallback. Agregado `focus-visible:ring-accent` al Link con `ring-offset-background`.
4. **Navigation.tsx** — Underline animado en links no activos vía pseudo-elemento `after:` con `scale-x-0 → scale-x-100` (200ms). Focus-visible con `ring-accent` y `ring-offset-2` sin solapar con hover.
5. **Card.tsx** — Agregadas micro-interacciones consistentes: `hover:-translate-y-1 hover:shadow-lg` (300ms), `active:scale-[0.99]`, `motion-reduce` fallback.
### File List

- `src/components/ui/Button.tsx` (modificado)
- `src/components/ui/Card.tsx` (modificado)
- `src/components/content/ProjectCard.tsx` (modificado)
- `src/components/content/BlogPostCard.tsx` (modificado)
- `src/components/layout/Navigation.tsx` (modificado)
