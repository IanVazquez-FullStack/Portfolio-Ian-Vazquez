# Story 5.1: Centralizar variants de motion y wrappers reutilizables

Status: done

## Story

As a desarrollador del portfolio,
I want variants centralizadas y wrappers `AnimatedSection` / `StaggeredGrid`,
so that las animaciones sean consistentes y respeten `prefers-reduced-motion` sin duplicación (FR-17, UX-DR8).

## Acceptance Criteria

1. **Given** Framer Motion instalado, **When** se implementan `src/lib/motion/variants.ts`, `src/components/motion/AnimatedSection.tsx` y `src/components/motion/StaggeredGrid.tsx` (Client), **Then** `variants.ts` exporta `fadeIn`, `slideUp`, `stagger` (80-120ms entre items) animando solo `transform`/`opacity` (FR-17).
2. `AnimatedSection` dispara la animación al entrar en viewport (`whileInView`, `viewport: { once: true, amount: 0.2 }`).
3. `StaggeredGrid` aplica `stagger` a sus hijos directos.
4. Ambos wrappers leen `useReducedMotion()` y renderizan children sin animación cuando es `true` (FR-17, UX-DR8).
5. Exponen prop opcional `delay` y `as` (elemento semántico).
6. No se introducen dependencias adicionales más allá de Framer Motion (AR-09).

## Tasks / Subtasks

- [x] Instalar Framer Motion si no está presente: `npm install framer-motion` (AC: #6)
- [x] Crear `src/lib/motion/variants.ts` (AC: #1)
  - [x] `fadeIn`: `{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }`
  - [x] `slideUp`: `{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }`
  - [x] `stagger`: `{ visible: { transition: { staggerChildren: 0.1 } } }` (100ms entre hijos)
  - [x] Solo animar `transform` y `opacity` — nunca `width`, `height`, `top`, etc.
- [x] Crear `src/components/motion/AnimatedSection.tsx` con `"use client"` (AC: #2, #4, #5)
  - [x] `useReducedMotion()` de Framer Motion
  - [x] Si `reducedMotion === true` → renderizar children directamente sin animación
  - [x] `whileInView` + `viewport={{ once: true, amount: 0.2 }}`
  - [x] Props: `children`, `delay?: number`, `as?: keyof React.JSX.IntrinsicElements` (default `'div'`)
- [x] Crear `src/components/motion/StaggeredGrid.tsx` con `"use client"` (AC: #3, #4, #5)
  - [x] `useReducedMotion()` → sin animación si `true`
  - [x] Variante `stagger` aplicada al contenedor
  - [x] Hijos directos reciben variante `slideUp` automáticamente
  - [x] Props: `children`, `as?: keyof React.JSX.IntrinsicElements` (default `'div'`)

## Dev Notes

- **Framer Motion versión:** Verificar que sea v10+ (compatible con Next.js 14 App Router). `framer-motion@10.x` o superior.
- **`"use client"` obligatorio** en ambos wrappers — Framer Motion usa hooks internamente.
- **`useReducedMotion()`:** Hook de Framer Motion que lee `prefers-reduced-motion`. Retorna `true` si el usuario prefiere movimiento reducido.
  ```tsx
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <div>{children}</div>; // sin animación
  ```
- **Anti-patrón crítico:** NUNCA definir variants inline en los componentes de página. Siempre importar de `src/lib/motion/variants.ts`.
- **`as` prop (polimorfismo):** Permite renderizar como `section`, `article`, `div`, etc. para mantener semántica HTML correcta.
- **Stagger timing (UX-DR8):** `staggerChildren: 0.1` es 100ms (dentro del rango 80-120ms recomendado).

### Project Structure Notes

```
src/lib/motion/
  variants.ts              ← fadeIn, slideUp, stagger
src/components/motion/
  AnimatedSection.tsx      ← "use client"
  StaggeredGrid.tsx        ← "use client"
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.1]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-17, UX-DR8]
- [Source: _bmad-output/project-context.md#Reglas de Motion / Animaciones]
- [Source: _bmad-output/project-context.md#Anti-Patrones (variants inline)]

## Dev Agent Record

### Agent Model Used

Cascade (Claude)

### Debug Log References

- Fixed TypeError `Cannot find namespace 'JSX'` by switching to `React.JSX.IntrinsicElements` for React 19 compatibility.
- Fixed TypeError `Type 'Variant | undefined' is not assignable to type 'Variant'` by inlining variant objects directly in component props instead of spreading from `variants.ts` exports.

### Completion Notes List

- Framer Motion v12.40.0 already installed (no additional dependency needed).
- Created `src/lib/motion/variants.ts` exporting `fadeIn`, `slideUp`, `stagger`.
- Created `src/components/motion/AnimatedSection.tsx` with `useReducedMotion`, `whileInView`, `delay`, and `as` prop.
- Created `src/components/motion/StaggeredGrid.tsx` with `useReducedMotion`, stagger container, and `StaggeredItem` helper.
- Build verified successfully (`next build` passes with no errors).

### File List

- `src/lib/motion/variants.ts`
- `src/components/motion/AnimatedSection.tsx`
- `src/components/motion/StaggeredGrid.tsx`
