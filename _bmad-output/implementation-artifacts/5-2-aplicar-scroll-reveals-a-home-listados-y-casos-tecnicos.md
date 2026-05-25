# Story 5.2: Aplicar scroll reveals a Home, listados y casos técnicos

Status: ready-for-dev

## Story

As a visitante del portfolio,
I want descubrir contenido progresivamente al scrollear,
so that la experiencia se sienta cuidada sin distraer del contenido.

## Acceptance Criteria

1. **Given** los wrappers de Story 5.1, **When** se envuelven secciones existentes de Home, `/projects`, `/blog` y `/projects/[slug]`, **Then** Hero, FeaturedProjects (con `StaggeredGrid`), AboutPreview y ContactPreview hacen fade-in/slide-up al entrar en viewport (FR-14).
2. Listados `/projects` y `/blog` aplican `StaggeredGrid` a las cards.
3. Las secciones del `CaseStudyLayout` revelan progresivamente sin ocultar contenido crítico.
4. Con `prefers-reduced-motion: reduce` todas las secciones se ven instantáneas (verificado en DevTools).
5. No hay regresiones de CLS.

## Tasks / Subtasks

- [ ] Envolver secciones de Home con `AnimatedSection` (AC: #1)
  - [ ] `Hero` → `AnimatedSection` con `slideUp`
  - [ ] `FeaturedProjects` → `StaggeredGrid` para las cards
  - [ ] `AboutPreview` → `AnimatedSection` con `fadeIn`
  - [ ] `ContactPreview` → `AnimatedSection` con `fadeIn` + delay
- [ ] Aplicar `StaggeredGrid` en `/projects` (AC: #2)
  - [ ] Envolver el grid de `ProjectCard` con `StaggeredGrid`
- [ ] Aplicar `StaggeredGrid` en `/blog` (AC: #2)
  - [ ] Envolver el grid/lista de `BlogPostCard` con `StaggeredGrid`
- [ ] Aplicar reveals en `CaseStudyLayout` (AC: #3)
  - [ ] Cada sección (Contexto, Problema, Decisiones, etc.) → `AnimatedSection`
  - [ ] Asegurar que el contenido es legible sin JS (no ocultar con opacity 0 en SSR)
- [ ] Verificar `prefers-reduced-motion` en DevTools (AC: #4)
- [ ] Verificar CLS en Lighthouse/DevTools (AC: #5)

## Dev Notes

- **SSR y `initial={{ opacity: 0 }}`:** Framer Motion puede causar CLS si el contenido se hidrata con `opacity: 0`. Usar `initial="hidden"` junto con `whileInView="visible"` — Framer Motion maneja esto correctamente con `viewport={{ once: true }}`.
- **No ocultar contenido crítico:** El `Hero` y el título del proyecto NO deben empezar en `opacity: 0` en SSR (causa flash). Aplicar `AnimatedSection` a contenedores, no a headings críticos.
- **Separación server/client:** Las páginas (`page.tsx`) son Server Components. Para envolver con `AnimatedSection` (Client Component), hay dos opciones:
  1. Envolver directamente en el Server Component (Next.js lo permite — el boundary client está en el wrapper)
  2. Crear secciones animadas separadas como Client Components
- **`viewport={{ once: true }}`:** Las animaciones solo se ejecutan una vez al entrar en viewport, no se repiten al scrollear hacia arriba. Esto es el comportamiento correcto.
- **CLS:** Evitar animar `height`, `width`, `top`, `left`. Solo `opacity` y `transform: translateY`. Reservar espacio con dimensiones fijas si es necesario.

### Project Structure Notes

- No se crean archivos nuevos — se modifican los existentes de Épicas 1-4.
- Los cambios son de composición: envolver elementos con `AnimatedSection` o `StaggeredGrid`.

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.2]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-14, UX-DR8]
- [Source: _bmad-output/project-context.md#Reglas de Motion / Animaciones]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
