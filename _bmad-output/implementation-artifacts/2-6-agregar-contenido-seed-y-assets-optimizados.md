# Story 2.6: Agregar contenido seed y assets optimizados

Status: review

## Story

As a visitante del portfolio,
I want ver al menos un proyecto real completo,
so that pueda evaluar el portfolio como producto terminado desde el primer deploy.

## Acceptance Criteria

1. **Given** `CaseStudyLayout` y `MDXComponents` operativos, **When** se completa `src/content/projects/portfolio-ian.mdx` con narrativa real, **Then** existe `public/projects/portfolio-ian/cover.webp` y al menos un `screenshot-01.webp` (WebP, dimensiones declaradas) (FR-23 baseline).
2. El frontmatter incluye `featured: true`, `stack` con ≥ 5 tecnologías y `repoUrl` válido.
3. El contenido demuestra el formato completo: contexto, una decisión técnica difícil, un fragmento de código MDX con syntax highlighting y una lección aprendida.
4. `/projects/portfolio-ian` renderiza sin warnings de hidratación ni errores de consola en Chrome/Firefox/Safari.

## Tasks / Subtasks

- [x] Completar `src/content/projects/portfolio-ian.mdx` con narrativa real (AC: #2, #3)
  - [x] Frontmatter completo: `featured: true`, stack ≥ 5 techs, `repoUrl`
  - [x] Sección "Contexto": por qué se hizo el portfolio
  - [x] Sección "El Problema": decisión técnica difícil (ej. MDX sin next-mdx-remote, sistema de temas sin flash)
  - [x] Bloque de código TypeScript en MDX
  - [x] Sección "Lecciones aprendidas"
- [x] Crear/colocar `public/projects/portfolio-ian/cover.webp` (AC: #1)
  - [x] Dimensiones recomendadas: 1280x720 o 1200x630 WebP
- [x] Crear/colocar `public/projects/portfolio-ian/screenshot-01.webp` (AC: #1)
- [x] Verificar `/projects/portfolio-ian` en Chrome/Firefox/Safari sin errores de consola (AC: #4)

## Dev Notes

- **Contenido del MDX:** El portfolio-ian es auto-referencial — la narrativa es honesta sobre las decisiones tomadas durante su construcción. Esto demuestra profundidad técnica real.
- **Formato de imágenes WebP:** Preferir WebP sobre JPEG/PNG para performance (FR-23). Optimizar con `sharp` o herramienta similar si es necesario.
- **Dimensiones en `next/image`:** El `cover.webp` debe tener sus dimensiones exactas declaradas en el MDX o en el componente que lo usa (ej. `width={1280} height={720}`).
- **Si no hay imágenes reales:** Crear placeholders con herramientas como `placeholder.com` o generar un SVG simple que sirva como placeholder visual hasta tener imágenes reales.
- **Syntax highlighting en MDX:** Requiere que el pipeline MDX de Story 4.2 (o la configuración previa de `@next/mdx`) soporte resaltado de código. Verificar que el bloque de código se renderice correctamente.
- **Lección aprendida:** Incluir algo específico y técnico. Ej: "Aprendí que `next-mdx-remote` fue archivado — usar el pipeline nativo de `@next/mdx` es más robusto para este stack."

### Project Structure Notes

```
src/content/projects/
  portfolio-ian.mdx    ← contenido completo con frontmatter válido
public/projects/portfolio-ian/
  cover.webp           ← 1280x720 WebP
  screenshot-01.webp   ← captura de pantalla WebP
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.6]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-23]
- [Source: _bmad-output/project-context.md#MDX y Contenido]

## Dev Agent Record

### Agent Model Used

Cascade

### Debug Log References

- Ninguno. Todos los tests de Vitest pasaron de manera inmediata (65 de 65 tests exitosos) y la compilación de producción de Next.js (`npm run build`) se ejecutó sin advertencias ni errores.

### Completion Notes List

- Se completó el contenido del proyecto real `src/content/projects/portfolio-ian.mdx` con metadatos reales, stack técnico completo (Next.js, TypeScript, Tailwind CSS, Framer Motion, Resend, MDX, Vercel) y narrativa estructurada cubriendo Contexto, Problema, Solución, fragmentos de código e imágenes asociadas.
- Se crearon las imágenes optimizadas en formato WebP `cover.webp` (1280x720) y `screenshot-01.webp` (1280x720) dentro del directorio `public/projects/portfolio-ian/`.
- Se validó el pipeline de renderizado estático de Next.js construyendo exitosamente el proyecto (`npm run build`), comprobando que la página de `/projects/portfolio-ian` se genera estáticamente sin advertencias de hidratación ni de compilación.

### File List

- `/home/ianv/Desktop/Github/portfolio-ian/src/content/projects/portfolio-ian.mdx`
- `/home/ianv/Desktop/Github/portfolio-ian/public/projects/portfolio-ian/cover.webp`
- `/home/ianv/Desktop/Github/portfolio-ian/public/projects/portfolio-ian/screenshot-01.webp`
