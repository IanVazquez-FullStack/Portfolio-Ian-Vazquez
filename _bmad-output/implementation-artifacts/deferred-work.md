# Deferred Work

## Deferred from: code review of story 4.1 (2026-05-25)

- `tsc --noEmit` falla en tests preexistentes — `responses.test.ts`, `contactSchema.test.ts` causan errores de tipo no relacionados con story 4.1. Pre-existing issue.

## Deferred from: code review of story 2.4 (2026-05-25)
- `getProjects()` carga contenido MDX completo innecesariamente en página de listado [src/lib/content/getProjects.ts:46-50] — El loader parsea todo el MDX incluyendo `content` para cada proyecto, pero la página de listado solo usa metadatos. Es un problema de performance preexistente, no causado por este diff. Se resuelve con una función separada `getProjectsMeta()` que omita `content`.

## Deferred from: code review of story 5.3 (2026-05-25)

- Mock de framer-motion en tests es frágil [PageTransition.test.tsx:5] — `vi.importActual` carga el módulo real con dependencias de DOM. Tests pasan actualmente. — pre-existing
- Scroll restoration puede competir con la animación de salida [PageTransition.tsx] — Next.js restaura scroll automáticamente; durante la animación de exit la página anterior puede verse con scroll incorrecto. Requiere investigación adicional.
- SEO / Core Web Vitals: tiempo total de navegación ~500ms [general] — Considerar impacto en INP/LCP. Requiere medición real en producción.
