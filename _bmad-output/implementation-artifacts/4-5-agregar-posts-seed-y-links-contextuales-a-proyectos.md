# Story 4.5: Agregar posts seed y links contextuales a proyectos

Status: review

## Story

As a visitante del portfolio,
I want al menos un artículo real demostrando el formato del blog,
so that pueda evaluar la profundidad técnica desde el primer deploy.

## Acceptance Criteria

1. **Given** la infraestructura completa de blog, **When** se crea `src/content/blog/endpoint-contacto-seguro.mdx` basado en lo construido en Epic 3 (FR-13a), **Then** el post tiene contenido real ≥ 800 palabras, ≥ 2 bloques de código TS, 1 link interno a `/projects/portfolio-ian` y 1 link externo.
2. La fecha de publicación es coherente con el desarrollo del portfolio.
3. Pasa la validación del schema y se renderiza sin errores ni warnings en `/blog/endpoint-contacto-seguro`.
4. Existe un patrón documentado (en el post o `docs/`) sobre cómo enlazar posts ↔ proyectos relacionados.

## Tasks / Subtasks

- [x] Crear `src/content/blog/endpoint-contacto-seguro.mdx` (AC: #1, #2, #3)
  - [x] Frontmatter válido: `title`, `slug: "endpoint-contacto-seguro"`, `summary`, `publishedAt: "2026-05-25"`, `tags: ["Next.js", "API", "Seguridad", "TypeScript"]`, `draft: false`
  - [x] Contenido ≥ 800 palabras sobre el endpoint `POST /api/contact`
  - [x] ≥ 2 bloques de código TypeScript (ej. schema Zod + Route Handler)
  - [x] Link interno: `[portfolio-ian](/projects/portfolio-ian)`
  - [x] Link externo: ej. a docs de Resend o Zod
- [x] Verificar que renderiza en `/blog/endpoint-contacto-seguro` sin errores (AC: #3)
- [x] Crear `docs/blog-project-linking.md` con patrón documentado (AC: #4)

## Dev Notes

- **Contenido del post:** Artículo "behind the scenes" sobre cómo se construyó el endpoint de contacto seguro. Estructura sugerida:
  1. Introducción: el problema de formularios de contacto inseguros
  2. Diseño del schema Zod compartido (bloque de código TS)
  3. El Route Handler: validación + honeypot (bloque de código TS)
  4. Integración con Resend
  5. Lecciones aprendidas
  6. Link a `/projects/portfolio-ian` para ver el proyecto completo
- **Slug = nombre de archivo:** `endpoint-contacto-seguro.mdx` → slug `endpoint-contacto-seguro`.
- **`draft: false`:** Este post debe estar publicado en producción.
- **Patrón blog↔proyecto:** En `docs/blog-project-linking.md` documentar: "Para enlazar un post a un proyecto, usar link relativo `[texto](/projects/[slug])` dentro del MDX. Para el CTA inverso (proyecto → post relacionado), agregar campo `relatedPost?: string` al frontmatter del proyecto en una futura iteración."
- **Verificación:** `npm run build` debe generar `/blog/endpoint-contacto-seguro` como ruta estática sin errores.

### Project Structure Notes

```
src/content/blog/
  endpoint-contacto-seguro.mdx   ← post seed real
docs/
  blog-project-linking.md        ← patrón documentado
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 4.5]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-13a]
- [Source: _bmad-output/project-context.md#MDX y Contenido]

## Dev Agent Record

### Agent Model Used

Cascade (Claude)

### Debug Log References

- `npm run build`: exitoso, `/blog/endpoint-contacto-seguro` pre-renderizado estáticamente
- `tsc --noEmit`: pasó sin errores

### Completion Notes List

- Creado `src/content/blog/endpoint-contacto-seguro.mdx` con frontmatter válido y contenido técnico real de 1033 palabras (≥ 800 requeridas)
- Incluye 2 bloques de código TypeScript (schema Zod + Route Handler)
- Incluye link interno a `/projects/portfolio-ian` y link externo a docs de Resend
- `npm run build` genera `/blog/endpoint-contacto-seguro` como ruta estática sin errores ni warnings
- Creado `docs/blog-project-linking.md` documentando el patrón de enlaces blog↔proyectos

### File List

- `src/content/blog/endpoint-contacto-seguro.mdx`
- `docs/blog-project-linking.md`

### Change Log

- 2026-05-26: Implementada historia 4.5 completa — post seed real + patrón de links documentado
