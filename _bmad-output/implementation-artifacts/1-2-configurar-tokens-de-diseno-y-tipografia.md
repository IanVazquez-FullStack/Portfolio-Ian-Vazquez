# Story 1.2: Configurar tokens de diseño y tipografía

Status: review

## Story

As a desarrollador del portfolio,
I want configurar tokens custom de Tailwind y cargar Inter + JetBrains Mono vía `next/font`,
so that todos los componentes futuros usen un sistema visual consistente (Technical Minimal + Vercel-inspired).

## Acceptance Criteria

1. **Given** el proyecto inicializado de Story 1.1, **When** se configuran `tailwind.config.ts` y `src/styles/tokens.css`, **Then** existen tokens semánticos `background`, `foreground`, `accent`, `accent-hover`, `muted`, `muted-foreground`, `border`, `border-hover`, `success`, `error` con valores dark/light (slate-900/50, cyan-500/400).
2. Inter y JetBrains Mono cargan vía `next/font` sin layout shift y con CSS variables expuestas.
3. La escala tipográfica (Display, H1-H3, Body, Body Large, Caption, Code) está definida con reducciones fluidas para viewport < 768px (UX-DR2).
4. La página inicial renderiza un ejemplo que verifica visualmente la aplicación de tokens.
5. `npm run build` pasa sin errores.

## Tasks / Subtasks

- [x] Configurar `tailwind.config.ts` con tokens semánticos dark/light (AC: #1)
  - [x] Extender `colors` con `background`, `foreground`, `accent` (cyan-500), `accent-hover` (cyan-400), `muted`, `muted-foreground`, `border`, `border-hover`, `success`, `error`
  - [x] Configurar `darkMode: 'class'`
- [x] Crear `src/styles/tokens.css` con variables CSS para los tokens (AC: #1)
- [x] Cargar Inter y JetBrains Mono en `src/app/layout.tsx` vía `next/font/google` (AC: #2)
  - [x] Exponer como variables CSS (`--font-inter`, `--font-mono`)
- [x] Definir escala tipográfica en `tailwind.config.ts` o `tokens.css` (AC: #3)
  - [x] Clases: `text-display`, `text-h1`…`text-h3`, `text-body`, `text-body-lg`, `text-caption`, `text-code`
  - [x] Reducciones fluidas para < 768px
- [x] Actualizar `src/app/page.tsx` con demo visual de tokens y tipografía (AC: #4)
- [x] Verificar `npm run build` (AC: #5)

## Dev Notes

- **Paleta de referencia (UX-DR1):**
  - `accent`: `cyan-500` (#06b6d4) / `accent-hover`: `cyan-400` (#22d3ee)
  - `background` dark: `slate-900` / light: `slate-50`
  - `foreground` dark: `slate-50` / light: `slate-900`
  - `muted` dark: `slate-800` / light: `slate-100`
- **`next/font`:** Importar de `next/font/google`. Exponer como variables CSS en `<html>` para que Tailwind las pueda usar via `fontFamily`.
- **Dark mode:** `darkMode: 'class'` en `tailwind.config.ts`. La clase `dark` se aplica en `<html>` (implementado en Story 1.5). Esta historia solo define los tokens.
- **Anti-patrón a evitar:** No hardcodear colores hex en clases Tailwind — siempre usar los tokens semánticos.
- **`tokens.css`** se importa en `src/app/globals.css` o `layout.tsx`.

### Project Structure Notes

- `tailwind.config.ts` — en raíz del proyecto.
- `src/styles/tokens.css` — variables CSS globales.
- `src/app/layout.tsx` — aquí cargan las fuentes con `next/font`.
- `src/app/globals.css` — importar `tokens.css` aquí.

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2]
- [Source: _bmad-output/planning-artifacts/epics.md#UX-DR1, UX-DR2]
- [Source: _bmad-output/project-context.md#Stack Tecnológico]

## Dev Agent Record

### Agent Model Used

Cascade

### Debug Log References

- `npm run build` — pass
- `npm run lint` — pass

### Completion Notes List

- Configurados tokens semánticos light/dark en `src/styles/tokens.css` y expuestos a Tailwind desde `tailwind.config.ts`.
- Cargadas las fuentes Inter y JetBrains Mono con `next/font/google` usando CSS variables en `<html>`.
- Definida escala tipográfica fluida para Display, H1-H3, Body, Body Large, Caption y Code.
- Reemplazada la página inicial por una demo visual de tokens y tipografía.
- Instalado y usado Node.js `v24.16.0` con npm `11.13.0` mediante `nvm` para validar build/lint.

### File List

- `tailwind.config.ts`
- `src/styles/tokens.css`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-05-25: Implementada Story 1.2 y marcada lista para review.
