# Story 6.4: Auditoría de imágenes y Core Web Vitals

Status: ready-for-dev

## Story

As a visitante del portfolio,
I want que las páginas carguen rápido y sin layout shift,
so that la experiencia se sienta profesional desde el primer momento (NFR-01, FR-23, FR-24).

## Acceptance Criteria

1. **Given** el portfolio funcional con contenido seed, **When** se audita el uso de imágenes y se ejecuta Lighthouse contra build de producción local, **Then** todas las imágenes usan `next/image` con `width`/`height` declarados, `alt` significativo y `sizes` responsive (FR-23).
2. Las imágenes se sirven en WebP (con fallback automático de Next.js).
3. Lighthouse Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90 en Home, `/projects/[slug]` ejemplo y `/blog/[slug]` ejemplo (NFR-01).
4. Core Web Vitals (Lab): LCP < 2.5s, INP < 200ms, CLS < 0.1 (FR-24).
5. Queda documentado en `docs/lighthouse-baseline.md` el resultado obtenido y mejoras pendientes.

## Tasks / Subtasks

- [ ] Auditar todas las imágenes del proyecto (AC: #1, #2)
  - [ ] Buscar cualquier `<img>` nativo → reemplazar con `next/image`
  - [ ] Verificar que todos los `next/image` tienen `width`, `height`, `alt` y `sizes`
  - [ ] Cover images de proyectos: `sizes="(max-width: 768px) 100vw, 50vw"`
- [ ] Ejecutar `npm run build && npx serve .next` y Lighthouse (AC: #3, #4)
  - [ ] Home: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90
  - [ ] `/projects/portfolio-ian`: mismos objetivos
  - [ ] `/blog/endpoint-contacto-seguro`: mismos objetivos
- [ ] Corregir issues encontrados en Lighthouse (AC: #3, #4)
  - [ ] LCP: optimizar imagen hero o first contentful paint
  - [ ] CLS: verificar que no hay elementos que se desplacen al cargar
  - [ ] INP: verificar que no hay JS pesado bloqueando interactividad
- [ ] Crear `docs/lighthouse-baseline.md` con resultados (AC: #5)

## Dev Notes

- **`next/image` automáticamente sirve WebP** cuando el browser lo soporta — no se necesita conversión manual. Solo proveer la imagen original (JPEG/PNG/WebP) y Next.js genera los formatos optimizados.
- **`priority` prop:** Agregar `priority` al `next/image` de la primera imagen visible (hero, cover principal) para mejorar LCP.
- **`sizes` prop:** Crítico para responsive. Sin `sizes`, Next.js descarga la imagen full-size. Ejemplos:
  - Hero: `sizes="100vw"`
  - Card en grid de 3 cols: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
- **CLS por fonts:** `next/font` ya previene layout shift de fuentes. Si hay CLS, verificar imágenes sin dimensiones declaradas.
- **Build de producción para Lighthouse:** Lighthouse en dev da métricas incorrectas. Hacer `npm run build` y servir la carpeta `.next` con `next start` o `npx serve out` (si hay export estático).
- **Documentar en `docs/lighthouse-baseline.md`:** Anotar las puntuaciones exactas, fecha, URL testeada y cualquier issue pendiente. Esto sirve como baseline para futuras comparaciones.

### Project Structure Notes

- No se crean componentes nuevos — se auditan y corrigen los existentes.
- Nuevo archivo: `docs/lighthouse-baseline.md`.

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.4]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-23, FR-24, NFR-01]
- [Source: _bmad-output/project-context.md#Reglas de Calidad]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
