# Story 4.2: Configurar pipeline MDX con syntax highlighting y MDXComponents

Status: review

## Story

As a lector del blog,
I want código con syntax highlighting y tipografía consistente,
so that pueda leer contenido técnico cómodamente.

## Acceptance Criteria

1. **Given** el pipeline MDX elegido en `src/lib/content/mdx.ts`, **When** se configura el highlighter y se implementan `src/components/content/MDXComponents.tsx` y `src/components/ui/CodeBlock.tsx`, **Then** bloques de código renderizan syntax highlighting consistente con tema dark/light, soportando `ts/tsx/js/json/bash/md` (FR-13).
2. `MDXComponents` define overrides para `h2-h4`, `p`, `ul/ol`, `li`, `a` (con `next/link` para internos), `img` (`next/image`), `blockquote`, `code` inline y `pre`/`code` blocks.
3. Los headings dentro del post son `h2`/`h3` (el `h1` lo aporta la página, jerarquía única).
4. Existe un post de prueba ejercitando todos los tipos (heading, párrafo, listas, link interno/externo, imagen, code inline, code block ts y bash) renderizando sin errores.

## Tasks / Subtasks

- [x] Elegir e instalar highlighter: `rehype-pretty-code` + `shiki` (AC: #1)
  - [x] `npm install rehype-pretty-code shiki`
  - [x] Configurar en `src/lib/content/mdx.ts` como plugin rehype
- [x] Actualizar `next.config.ts` para MDX si no está configurado desde Story 2.1 (AC: #1)
- [x] Crear/actualizar `src/components/content/MDXComponents.tsx` (AC: #2, #3)
  - [x] Override `h1`: renderizar como `h2` (prevenir duplicado de h1)
  - [x] `h2`, `h3`, `h4`: estilos tipográficos consistentes con tokens
  - [x] `a`: si href empieza con `/` → `next/link`; si no → `<a target="_blank" rel="noopener noreferrer">`
  - [x] `img`: `next/image` con `width`, `height`, `alt`
  - [x] `pre`/`code`: integrar con `CodeBlock` o renderizar con clases de shiki
  - [x] `blockquote`: estilo con border-left accent
- [x] Crear post de prueba `src/content/blog/test-mdx-features.mdx` con draft: true (AC: #4)
  - [x] Incluir: heading h2/h3, párrafo, lista, link interno `/projects`, link externo, image, code inline, code block `ts` y `bash`
- [x] Verificar que renderiza sin errores (AC: #4)

## Dev Notes

- **`rehype-pretty-code` + `shiki`:** Solución recomendada para Next.js App Router. No requiere cliente — el highlighting ocurre en build/SSR.
  ```ts
  // src/lib/content/mdx.ts
  import rehypePrettyCode from 'rehype-pretty-code';
  const options = { theme: { dark: 'github-dark', light: 'github-light' } };
  // Pasar como plugin rehype al compilador MDX
  ```
- **NO usar `next-mdx-remote`:** Archivado en 2026. Toda la configuración MDX vive en `src/lib/content/mdx.ts` usando `@next/mdx` o compilado server-side.
- **Override de `h1` en MDXComponents:** El MDX del blog/proyectos NO debe tener `# Heading` (h1) porque ese lo genera la página. Si existe un `h1` en MDX, overridearlo para renderizar como `h2`.
- **Links internos vs externos:**
  ```tsx
  function CustomLink({ href, children, ...props }) {
    if (href?.startsWith('/')) return <Link href={href}>{children}</Link>;
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  }
  ```
- **`img` en MDX:** `next/image` requiere `width` y `height`. Para MDX es común usar un wrapper que acepta `src`, `alt` y dimensiones opcionales con fallback.
- **Tema dark/light en shiki:** Usar `cssVariables` strategy de `rehype-pretty-code` para que el highlighting respete el tema sin JS extra.
- **Post de prueba:** Marcarlo con `draft: true` para que no aparezca en producción pero sirva de verificación en desarrollo.

### Project Structure Notes

```
src/lib/content/
  mdx.ts                  ← pipeline MDX con rehype-pretty-code
src/components/content/
  MDXComponents.tsx       ← crear o actualizar (también existe en Story 2.5)
src/content/blog/
  test-mdx-features.mdx   ← draft: true, para verificación
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 4.2]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-13]
- [Source: _bmad-output/project-context.md#MDX y Contenido]
- [Source: _bmad-output/project-context.md#Anti-Patrones (NO next-mdx-remote)]

## Dev Agent Record

### Agent Model Used

Cascade

### Debug Log References

### Completion Notes List

- Instalado `rehype-pretty-code` y `shiki` como highlighter server-side.
- Implementado `compileMdx()` en `src/lib/content/mdx.ts` usando `@mdx-js/mdx` con `outputFormat: 'function-body'` y `rehype-pretty-code` como plugin rehype.
- Creado `src/components/content/MDXComponents.tsx` con overrides para todos los elementos de contenido (`h1`→`h2`, `h2-h4`, `p`, `ul/ol`, `li`, `a`, `img`, `blockquote`, `code`, `pre`).
- Actualizado `src/components/ui/CodeBlock.tsx` para envolver bloques de código sin duplicar `<code>`.
- Actualizado `src/mdx-components.tsx` para exponer `MDXComponents` a `@next/mdx`.
- Agregado CSS en `globals.css` para alternar colores shiki entre light/dark usando `.dark`.
- Creado post de prueba `src/content/blog/test-mdx-features.mdx` con `draft: true` ejercitando todos los elementos MDX.
- Creado tests en `src/lib/content/mdx.test.tsx` verificando compilación, syntax highlighting y renderizado de elementos.
- Nota: `rehype-pretty-code` no se agregó a `next.config.ts` porque Next.js 16 con Turbopack no soporta plugins rehype con funciones no serializables. El pipeline server-side en `mdx.ts` cubre todo el contenido dinámico.

### File List

- `src/lib/content/mdx.ts`
- `src/components/content/MDXComponents.tsx`
- `src/components/ui/CodeBlock.tsx`
- `src/mdx-components.tsx`
- `src/app/globals.css`
- `src/content/blog/test-mdx-features.mdx`
- `src/lib/content/mdx.test.tsx`
