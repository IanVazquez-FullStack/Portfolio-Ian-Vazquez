# Story 1.4: Implementar layout global, Header, Footer y navegación responsive

Status: done

## Story

As a visitante del portfolio,
I want navegación persistente con Header (logo + links Proyectos/Blog/About/Contact) y menú hamburguesa accesible en mobile, más Footer consistente,
so that pueda moverme sin fricción desde cualquier dispositivo.

## Acceptance Criteria

1. **Given** las primitivas UI de Story 1.3, **When** se implementan `src/app/layout.tsx`, `Header`, `Footer`, `Navigation`, `MobileNav` en `src/components/layout/`, **Then** `layout.tsx` define metadata base, fuentes, providers y compone Header sticky con backdrop blur + `main` + Footer (UX-DR14).
2. El Header muestra logo + links en desktop ≥ md y un trigger de hamburguesa en mobile.
3. `MobileNav` implementa focus trap, cierre con Escape y touch targets ≥ 44x44px (UX-DR7).
4. Existen rutas mínimas `src/app/about/page.tsx` y `src/app/contact/page.tsx` con placeholders semánticos para que la navegación no rompa.
5. El Footer incluye links sociales (GitHub, LinkedIn), email mailto, copyright dinámico y placeholder de CV (efectivo en Story 1.6).
6. La navegación es operable solo con teclado y los links activos se indican visualmente (FR-02, NFR-02).
7. Todo es responsive desde 320px sin overflow horizontal (NFR-05).

## Tasks / Subtasks

- [x] Actualizar `src/app/layout.tsx` con metadata base, fuentes y estructura semántica (AC: #1)
  - [x] `<html>`, `<body>`, `<Header>`, `<main>`, `<Footer>`
  - [x] Header sticky: `position: sticky; top: 0; backdrop-filter: blur(...)`
- [x] Crear `src/components/layout/Header.tsx` (AC: #2)
  - [x] Logo (texto o SVG) + links de navegación desktop
  - [x] Trigger hamburguesa en mobile (< md)
- [x] Crear `src/components/layout/Navigation.tsx` — links desktop con indicador activo (AC: #6)
  - [x] Usar `usePathname()` para marcar link activo — este componente necesita `"use client"`
- [x] Crear `src/components/layout/MobileNav.tsx` (AC: #3)
  - [x] Usar `shadcn/ui Sheet` para el drawer (única excepción de uso de shadcn en este proyecto)
  - [x] Focus trap implementado (shadcn Sheet lo maneja nativamente)
  - [x] Cierre con tecla Escape
  - [x] Touch targets ≥ 44x44px en todos los links
- [x] Crear `src/components/layout/Footer.tsx` (AC: #5)
  - [x] Links GitHub, LinkedIn con `target="_blank" rel="noopener noreferrer"`
  - [x] Email mailto
  - [x] Copyright: `© {new Date().getFullYear()} Ian Vázquez`
  - [x] Placeholder "Descargar CV" (se activa en Story 1.6)
- [x] Crear `src/app/about/page.tsx` con placeholder semántico (AC: #4)
- [x] Crear `src/app/contact/page.tsx` con placeholder semántico (AC: #4)
- [x] Verificar navegación por teclado y responsive 320px (AC: #6, #7)

### Review Findings

- [ ] [Review][Decision] Confirmar datos reales de contacto/sociales — El Footer usa `ian@example.com`, `https://github.com/ianvazquez` y `https://www.linkedin.com/in/ianvazquez`. AC #5 exige email mailto y links sociales, pero el código puede publicar placeholders incorrectos si esos datos no son los definitivos.
- [ ] [Review][Patch] Links principales a `/projects` y `/blog` no tienen rutas placeholder [src/components/layout/Navigation.tsx:6]
- [ ] [Review][Patch] Link de CV apunta a una ruta inexistente aunque está marcado como deshabilitado solo con ARIA [src/components/layout/Footer.tsx:42]
- [ ] [Review][Patch] `SheetContent` no recibe descripción accesible para el drawer móvil [src/components/layout/MobileNav.tsx:39]
- [ ] [Review][Patch] `globals.css` reintroduce tokens shadcn neutrales después de importar `src/styles/tokens.css`, arriesgando sobrescribir el sistema de diseño de Story 1.2 [src/app/globals.css:13]

## Dev Notes

- **`MobileNav` es Client Component** — necesita `"use client"` por `useState` (abrir/cerrar drawer).
- **`Navigation` es Client Component** — necesita `usePathname()` para el link activo.
- **`Header` y `Footer`** pueden ser Server Components si delegan la interactividad a sus hijos.
- **shadcn/ui Sheet:** Solo para `MobileNav`. Instalar con `npx shadcn-ui@latest add sheet`. Este es el único componente de shadcn permitido en este proyecto junto con `Dialog`.
- **Skip link:** Agregar `<a href="#main-content" className="sr-only focus:not-sr-only">Saltar al contenido</a>` al inicio del layout para WCAG (UX-DR9).
- **Backdrop blur en Header:** `backdrop-blur-sm bg-background/80` — funciona bien con el sistema de tokens.
- **Logo:** Puede ser texto simple `<span>IV</span>` o SVG — no importar imágenes externas.
- **Links de nav:** `/projects`, `/blog`, `/about`, `/contact`. Verificar que todas las rutas existen antes de merge.

### Project Structure Notes

```
src/components/layout/
  Header.tsx       ← Server Component (delega interactividad)
  Footer.tsx       ← Server Component
  Navigation.tsx   ← "use client" (usePathname)
  MobileNav.tsx    ← "use client" (useState)
src/app/
  layout.tsx       ← actualizar
  about/page.tsx   ← nuevo placeholder
  contact/page.tsx ← nuevo placeholder
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4]
- [Source: _bmad-output/planning-artifacts/epics.md#UX-DR7, UX-DR9, UX-DR14]
- [Source: _bmad-output/project-context.md#Estructura de Componentes]
- [Source: _bmad-output/project-context.md#Server vs Client Components]

## Dev Agent Record

### Agent Model Used

Cascade

### Debug Log References

- `npm run lint` — passed.
- `npm run build` — passed.
- `MobileNav` refactored to use `shadcn/ui Sheet` after user installed it.

### Completion Notes List

- Updated global layout with base metadata, skip link, semantic shell, sticky blurred header, main content region and footer.
- Added desktop navigation with active link state using `usePathname()`.
- Added mobile drawer behavior with `shadcn/ui Sheet`, Radix focus trap, Escape close and 44px minimum touch targets.
- Added semantic placeholder pages for `/about` and `/contact`.
- Resolved shadcn casing conflict by removing duplicate generated `src/components/ui/button.tsx` and keeping the existing project `Button.tsx` convention.

### File List

- `_bmad-output/implementation-artifacts/1-4-implementar-layout-global-header-footer-y-navegacion-responsive.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `components.json`
- `package-lock.json`
- `package.json`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/MobileNav.tsx`
- `src/components/layout/Navigation.tsx`
- `src/components/ui/sheet.tsx`
- `src/lib/utils.ts`
