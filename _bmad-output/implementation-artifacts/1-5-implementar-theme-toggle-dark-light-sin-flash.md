# Story 1.5: Implementar theme toggle dark/light sin flash

Status: review

## Story

As a visitante del portfolio,
I want alternar entre tema dark y light desde el header, con persistencia y respeto a mi preferencia del sistema,
so that pueda leer en mi apariencia preferida sin parpadeo al cargar.

## Acceptance Criteria

1. **Given** los tokens dark/light de Story 1.2 y el Header de Story 1.4, **When** se implementa `ThemeToggle` (Client Component) y un script inline anti-flash en `layout.tsx`, **Then** al primer render se respeta `prefers-color-scheme` cuando no hay preferencia guardada (FR-19).
2. El toggle alterna `light`/`dark`, persiste en `localStorage` bajo clave estable y aplica `<html class="dark|light">` inmediatamente (FR-18, FR-20).
3. No se observa flash de tema incorrecto en carga inicial en ningún navegador soportado (NFR-06).
4. El botón expone `aria-label` dinámico y es operable por teclado con `focus-visible` (UX-DR6, UX-DR9).
5. Existe un test E2E (o manual documentado) verificando default-por-sistema, persistencia tras reload y ausencia de flash.

## Tasks / Subtasks

- [x] Agregar script anti-flash inline en `src/app/layout.tsx` (AC: #1, #3)
  - [x] El script debe ejecutarse antes del primer paint (antes de `<body>`)
  - [x] Lee `localStorage('theme')` → si existe, aplica; sino lee `prefers-color-scheme`
  - [x] Agrega clase `dark` o `light` a `<html>` sincrónicamente
- [x] Crear `src/components/layout/ThemeToggle.tsx` (AC: #2, #4)
  - [x] `"use client"` — usa `useState` y `useEffect`
  - [x] Al montar, sincroniza con el estado real del DOM (`document.documentElement.classList`)
  - [x] Al toggle: alterna clase en `<html>` + persiste en `localStorage` bajo la clave `theme`
  - [x] `aria-label` dinámico: "Cambiar a tema claro" / "Cambiar a tema oscuro"
  - [x] Icono Sol/Luna (puede ser SVG inline o Lucide)
- [x] Integrar `ThemeToggle` en `Header.tsx` (AC: #2)
- [x] Crear test E2E `tests/e2e/theme.spec.ts` o documentar test manual (AC: #5)

## Dev Notes

- **Script anti-flash:** Debe ser un `<script>` con `dangerouslySetInnerHTML` colocado en `<head>` ANTES de cualquier CSS. Es la única forma confiable de evitar flash. Ejemplo:
  ```js
  (function(){
    var theme = localStorage.getItem('theme');
    if (!theme) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.classList.add(theme);
  })();
  ```
- **Clave `localStorage`:** Usar `'theme'` como clave estable. NO cambiar entre versiones.
- **Hidratación:** `ThemeToggle` debe manejar el mismatch entre SSR (sin clase) y cliente (con clase). Usar `suppressHydrationWarning` en `<html>` en `layout.tsx`.
- **`ThemeToggle` es Client Component** — obligatoriamente `"use client"`.
- **Tailwind dark mode:** `darkMode: 'class'` ya configurado en Story 1.2. Verificar que los tokens `dark:` funcionen correctamente.
- **No usar librería de temas** (next-themes, etc.) — implementar manualmente según AR-09.

### Project Structure Notes

```
src/app/layout.tsx        ← agregar script anti-flash + suppressHydrationWarning en <html>
src/components/layout/
  ThemeToggle.tsx          ← "use client"
  Header.tsx               ← integrar ThemeToggle
tests/e2e/
  theme.spec.ts            ← test E2E Playwright
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.5]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-18, FR-19, FR-20, UX-DR6]
- [Source: _bmad-output/project-context.md#Estado]
- [Source: _bmad-output/project-context.md#Anti-Patrones]

## Dev Agent Record

### Agent Model Used

Cascade

### Debug Log References

- `npm run lint` — passed
- `npm run build` — passed

### Completion Notes List

- Implementado script inline anti-flash en `<head>` con `dangerouslySetInnerHTML`, lectura de `localStorage.theme`, fallback a `prefers-color-scheme`, aplicación síncrona de clase y `suppressHydrationWarning` en `<html>`.
- Creado `ThemeToggle` como Client Component con sincronización inicial desde `document.documentElement.classList`, alternancia inmediata `dark`/`light`, persistencia en `localStorage` y `aria-label` dinámico.
- Integrado `ThemeToggle` en `Header` sin convertir el header completo en Client Component.
- Documentada validación manual en `tests/e2e/theme-manual-test.md` porque Playwright no está instalado/configurado en el proyecto y no se introdujeron dependencias nuevas.

### File List

- `src/app/layout.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/ThemeToggle.tsx`
- `tests/e2e/theme-manual-test.md`

### Change Log

- 2026-05-25: Implementado theme toggle dark/light sin flash y documentación de validación manual.
