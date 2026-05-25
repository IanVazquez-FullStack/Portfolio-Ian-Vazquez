# Story 5.3: Implementar transiciones de página con AnimatePresence

Status: ready-for-dev

## Story

As a visitante del portfolio,
I want que las navegaciones se sientan continuas,
so that la experiencia tenga fluidez de aplicación moderna.

## Acceptance Criteria

1. **Given** los wrappers de motion operativos, **When** se implementa un wrapper client en `layout.tsx` (o template) con `AnimatePresence` aplicando fade + ligero translate al cambiar de ruta, **Then** la navegación entre Home → /projects → /projects/[slug] → /blog → /contact muestra transición suave ≤ 300ms (FR-15).
2. La transición no bloquea contenido ni interactividad.
3. Con `prefers-reduced-motion: reduce`, las transiciones se reducen a cambios instantáneos.
4. No hay flash blanco ni cambios bruscos de tema durante la transición.

## Tasks / Subtasks

- [ ] Crear `src/components/motion/PageTransition.tsx` con `"use client"` (AC: #1, #2, #3)
  - [ ] `AnimatePresence mode="wait"` de Framer Motion
  - [ ] `motion.div` con `initial={{ opacity: 0, y: 8 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -8 }}`
  - [ ] `transition={{ duration: 0.25, ease: 'easeInOut' }}`
  - [ ] `useReducedMotion()` → si `true`, renderizar sin animación
  - [ ] Usar `usePathname()` como `key` para que `AnimatePresence` detecte el cambio de ruta
- [ ] Integrar `PageTransition` en el layout (AC: #1)
  - [ ] Opción A: Crear `src/app/template.tsx` (se re-monta en cada navegación) con `PageTransition`
  - [ ] Opción B: Envolver `{children}` en `layout.tsx` con `PageTransition`
  - [ ] **Preferir `template.tsx`** — es el mecanismo correcto de Next.js App Router para transiciones de página
- [ ] Verificar ausencia de flash blanco (AC: #4)
  - [ ] El `background` del tema debe estar definido en `<html>` o `<body>`, no en el contenedor animado

## Dev Notes

- **`template.tsx` vs `layout.tsx` en App Router:** `layout.tsx` persiste entre navegaciones (no se re-monta). `template.tsx` se re-monta en cada navegación, que es lo necesario para que `AnimatePresence` detecte el cambio. Usar `src/app/template.tsx`.
- **`key` para `AnimatePresence`:** El `motion.div` dentro del template ya se re-monta automáticamente porque `template.tsx` se re-renderiza. No es necesario agregar `key` manualmente.
- **Duración ≤ 300ms (AC #1):** `duration: 0.25` (250ms) es el sweet spot — perceptible pero no lento.
- **`mode="wait"`:** Espera a que el exit animation termine antes de iniciar la entrada. Esto previene que dos páginas se vean simultáneamente.
- **Flash blanco (AC #4):** Si el `background` se define en el `motion.div`, al animar `opacity` se verá el fondo del `body` (blanco). Asegurarse de que `background-color` esté en `body` via `globals.css` y que el `motion.div` sea transparente.
- **`prefers-reduced-motion`:** Con `useReducedMotion() === true`, renderizar `children` directamente sin `motion.div`.

### Project Structure Notes

```
src/app/
  template.tsx                    ← nuevo archivo (re-monta en cada nav)
src/components/motion/
  PageTransition.tsx              ← "use client", AnimatePresence
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.3]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-15]
- [Source: _bmad-output/project-context.md#Reglas de Motion / Animaciones]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
