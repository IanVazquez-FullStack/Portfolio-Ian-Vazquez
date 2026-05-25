# Story 6.6: Auditoría final de accesibilidad y cross-browser

Status: ready-for-dev

## Story

As a equipo del portfolio,
I want verificar WCAG 2.1 AA y compatibilidad cross-browser antes del launch,
so that el portfolio cumpla la promesa de calidad para toda la audiencia (NFR-02, NFR-06, UX-DR9, UX-DR11).

## Acceptance Criteria

1. **Given** el portfolio completo con todas las épicas previas implementadas, **When** se ejecutan auditorías de accesibilidad y se prueba cross-browser, **Then** Axe DevTools no reporta issues críticas en Home, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/about`.
2. Navegación completa por teclado funciona en todas las rutas, con focus-visible y skip link al `main` (UX-DR9).
3. VoiceOver o NVDA puede leer la estructura semántica de cada página sin saltos extraños.
4. Las pruebas manuales en Chrome, Firefox, Safari y Edge últimas 2 versiones no muestran regresiones visuales ni funcionales (NFR-06).
5. Existe página `not-found.tsx` custom con estética del portfolio, mensaje útil y links a Home/Projects/Contact (UX-DR11).
6. Los 3 flujos críticos de Playwright (`navigation.spec.ts`, `project-detail.spec.ts`, `contact.spec.ts`) pasan localmente (AR-11).
7. Existe un checklist firmado en `docs/launch-readiness.md` cubriendo: accesibilidad, performance, SEO, cross-browser, deploy, env vars, dominio y monitoreo.

## Tasks / Subtasks

- [ ] Crear `src/app/not-found.tsx` custom (AC: #5)
  - [ ] Estética coherente con el portfolio (tokens, fuentes, layout)
  - [ ] Mensaje claro: "404 — Página no encontrada"
  - [ ] Links a Home, `/projects` y `/contact`
  - [ ] `<h1>` semántico
- [ ] Auditar accesibilidad con Axe DevTools en todas las rutas (AC: #1)
  - [ ] Instalar extensión Axe en Chrome
  - [ ] Revisar: Home, /projects, /projects/portfolio-ian, /blog, /blog/endpoint-contacto-seguro, /contact, /about
  - [ ] Corregir todos los issues críticos y serios
- [ ] Verificar navegación por teclado completa (AC: #2)
  - [ ] Tab a través de todos los elementos interactivos en cada página
  - [ ] Skip link funcional (Tab desde cualquier página salta al main content)
  - [ ] MobileNav: focus trap + cierre con Escape
  - [ ] ContactForm: navegación por teclado completa
- [ ] Prueba con VoiceOver/NVDA en páginas principales (AC: #3)
  - [ ] Estructura de headings correcta
  - [ ] Alt texts descriptivos en imágenes
  - [ ] Formulario de contacto anunciado correctamente
- [ ] Pruebas cross-browser (AC: #4)
  - [ ] Chrome, Firefox, Safari, Edge — últimas 2 versiones
  - [ ] Verificar: layout, animaciones, formulario, tema dark/light, navegación mobile
- [ ] Crear/completar `tests/e2e/navigation.spec.ts` y `tests/e2e/project-detail.spec.ts` (AC: #6)
- [ ] Verificar que `tests/e2e/contact.spec.ts` pasa (AC: #6)
- [ ] Crear `docs/launch-readiness.md` con checklist firmado (AC: #7)

## Dev Notes

- **`not-found.tsx` en App Router:** Colocar en `src/app/not-found.tsx`. Se renderiza automáticamente cuando cualquier ruta llama `notFound()` o cuando la ruta no existe.
- **`not-found.tsx` no recibe params:** No puede acceder a la URL que falló. Usar mensaje genérico.
- **Axe DevTools:** Extensión de Chrome gratuita. Correr en modo "Scan all of my page" en cada ruta. Priorizar issues de nivel "Critical" y "Serious".
- **Skip link:** `<a href="#main-content">Saltar al contenido</a>` debe ser el primer elemento focusable. Con Tailwind: `sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4`. El `<main>` debe tener `id="main-content"`.
- **`navigation.spec.ts`:** Verificar que todos los links del Header navegan correctamente y que la página activa está marcada.
- **`project-detail.spec.ts`:** Verificar que `/projects/portfolio-ian` carga el contenido correcto y que el CTA de contacto tiene el `?ref=portfolio-ian` correcto.
- **`docs/launch-readiness.md`:** Checklist con secciones: ✅/❌ Accesibilidad, Performance, SEO, Cross-browser, Vercel deploy activo, Env vars configuradas, Dominio configurado, Monitoreo (Vercel Analytics).

### Project Structure Notes

```
src/app/
  not-found.tsx              ← página 404 custom
tests/e2e/
  navigation.spec.ts         ← crear o completar
  project-detail.spec.ts     ← crear o completar
  contact.spec.ts            ← verificar (creado en Story 3.5)
docs/
  launch-readiness.md        ← checklist de launch
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.6]
- [Source: _bmad-output/planning-artifacts/epics.md#NFR-02, NFR-06, UX-DR9, UX-DR11, AR-11]
- [Source: _bmad-output/project-context.md#Reglas de Testing]
- [Source: _bmad-output/project-context.md#Reglas de Accesibilidad]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
