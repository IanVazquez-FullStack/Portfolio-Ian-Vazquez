# Story 6.1: Implementar helpers SEO y metadata global

Status: review

## Story

As a visitante que comparte el portfolio en redes,
I want que el preview muestre título, descripción e imagen correctos,
so that el portfolio se vea profesional al ser compartido.

## Acceptance Criteria

1. **Given** la estructura `src/lib/seo/`, **When** se implementan `src/lib/seo/site.ts` y `src/lib/seo/metadata.ts`, **Then** `site.ts` exporta `siteName`, `siteUrl` (desde `NEXT_PUBLIC_SITE_URL`), `defaultDescription`, `author`, `defaultOgImage` (FR-21, FR-22).
2. `metadata.ts` exporta `buildMetadata({ title, description, ogImage?, canonical? })` devolviendo un `Metadata` con `title.template "%s — Ian Vázquez"`, `description`, `openGraph` y `twitter` (summary_large_image).
3. `src/app/layout.tsx` usa `buildMetadata()` para el metadata por defecto.
4. `/about` y `/contact` definen `export const metadata` propios con el helper.
5. Existe `public/og/default-og.webp` (1200x630) como fallback.

## Tasks / Subtasks

- [x] Crear `src/lib/seo/site.ts` (AC: #1)
  - [x] `SITE_NAME = 'Ian Vázquez'`
  - [x] `SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio-ian.vercel.app'`
  - [x] `DEFAULT_DESCRIPTION = 'Desarrollador Full Stack...'`
  - [x] `AUTHOR = 'Ian Vázquez'`
  - [x] `DEFAULT_OG_IMAGE = '/og/default-og.webp'`
- [x] Crear `src/lib/seo/metadata.ts` (AC: #2)
  - [x] `buildMetadata({ title, description, ogImage?, canonical? }): Metadata`
  - [x] `title: { default: SITE_NAME, template: \`%s — ${SITE_NAME}\` }`
  - [x] `openGraph`: `title`, `description`, `images: [ogImage ?? DEFAULT_OG_IMAGE]`, `url`, `siteName`, `type: 'website'`
  - [x] `twitter`: `card: 'summary_large_image'`, `title`, `description`, `images`
- [x] Actualizar `src/app/layout.tsx` con `export const metadata = buildMetadata(...)` (AC: #3)
- [x] Actualizar `src/app/about/page.tsx` con metadata propia (AC: #4)
- [x] Actualizar `src/app/contact/page.tsx` con metadata propia (AC: #4)
- [x] Crear/colocar `public/og/default-og.webp` (1200x630) (AC: #5)

## Dev Notes

- **`NEXT_PUBLIC_SITE_URL`:** Prefijo `NEXT_PUBLIC_` lo hace accesible en el cliente. Para metadata en server, acceder con `process.env.NEXT_PUBLIC_SITE_URL`. Definir en `.env.local` y en Vercel.
- **`Metadata` type de Next.js:** Importar de `'next'`:
  ```ts
  import type { Metadata } from 'next';
  export function buildMetadata({ title, description, ogImage }: BuildMetadataOptions): Metadata { ... }
  ```
- **`title.template`:** Permite que páginas individuales solo definan `title: 'Proyectos'` y automáticamente se vea `"Proyectos — Ian Vázquez"` en el browser tab.
- **OG image fallback:** `public/og/default-og.webp` debe ser 1200x630px. Puede ser una imagen de marca simple con nombre y tagline. Crear con Figma, Canva o generador simple.
- **`twitter.card: 'summary_large_image'`:** Muestra imagen grande al compartir en X/Twitter.
- **Canonical URL:** `canonical: \`${SITE_URL}/${path}\`` — útil para SEO en páginas de contenido.

### Project Structure Notes

```
src/lib/seo/
  site.ts        ← constantes globales del sitio
  metadata.ts    ← buildMetadata() helper
public/og/
  default-og.webp ← 1200x630
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.1]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-21, FR-22]
- [Source: _bmad-output/project-context.md#SEO y Metadata]

### Review Findings

- [x] [Review][Patch] `NEXT_PUBLIC_SITE_URL=""` causa crash en build — `src/lib/seo/site.ts:3`
  Si la variable de entorno está definida como string vacío, `"" ?? fallback` devuelve `""` (falsy pero no nullish). Luego `new URL("")` en `metadataBase` lanza `TypeError: Invalid URL` durante el build. Fix: usar `||` en vez de `??`, o agregar `.trim()` y chequeo de string vacía. **Resuelto:** se usa `?.trim() || fallback`.

- [x] [Review][Patch] `title=""` deja OG/Twitter title vacío — `src/lib/seo/metadata.ts:22`
  Si se pasa `title=""`, `resolvedTitle` es `""` y los campos `openGraph.title` / `twitter.title` quedan vacíos, aunque `title.default` sigue siendo `SITE_NAME`. Esto es inconsistente. Fix: usar `title || SITE_NAME` para el fallback. **Resuelto:** se usa `title?.trim() || SITE_NAME`.

- [x] [Review][Patch] `description=""` deja OG/Twitter description vacía — `src/lib/seo/metadata.ts:23`
  Similar al title — OG/Twitter description queda vacía. Fix: usar `description || DEFAULT_DESCRIPTION`. **Resuelto:** se usa `description?.trim() || DEFAULT_DESCRIPTION`.

- [x] [Review][Patch] Faltan tests unitarios para `buildMetadata()` y constantes SEO — `src/lib/seo/`
  El project-context.md exige tests unitarios co-localizados como `*.test.ts`. No existen tests para validar el output de `buildMetadata()` ni las constantes de `site.ts`. **Resuelto:** se creó `src/lib/seo/metadata.test.ts` con 7 tests pasando.

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-20250514

### Debug Log References

- Build inicial mostró advertencia `metadataBase property in not set`; se agregó `metadataBase: new URL(SITE_URL)` en `buildMetadata()` para resolver URLs de OG/Twitter correctamente y eliminar la advertencia.

### Completion Notes List

- Se implementó `metadataBase` adicional al AC para cumplir con el requerimiento de Next.js 16 de definir base para resolución de imágenes OG/Twitter.
- Las páginas `/about` y `/contact` usan `buildMetadata()` con títulos y descripciones en español coherentes.
- El build de Next.js pasa sin errores de TypeScript ni de compilación.
- Todos los Review Findings fueron verificados y resueltos: fixes de string vacío en `site.ts` y `metadata.ts`, y tests unitarios co-localizados agregados.
- Tests unitarios ejecutados: 7/7 pasando en `src/lib/seo/metadata.test.ts`.

- 2026-05-26: Ejecuté la suite de tests completa con `npm test`.
  - Resultado relevante: los tests de SEO en `src/lib/seo/` pasan (7/7).
  - Estado general: la suite completa muestra fallos en 3 archivos de prueba no relacionados con este story (tests de MDX, algunos renderizados y un E2E de Playwright). Debido a estas regresiones, NO puedo marcar la historia como "review/done" hasta que las fallas de regresión sean resueltas según la política del workflow.
  - Acción recomendada: indicar si debo (a) corregir las regresiones ahora, (b) aislar y re-ejecutar solo los tests relevantes a SEO, o (c) dejar esto para que otro PR/responsable arregle las regresiones y continuar marcando la historia como "review" manualmente.

### File List

- `src/lib/seo/site.ts` — constantes del sitio
- `src/lib/seo/metadata.ts` — helper `buildMetadata()`
- `src/lib/seo/metadata.test.ts` — tests unitarios co-localizados
- `src/app/layout.tsx` — metadata por defecto vía `buildMetadata()`
- `src/app/about/page.tsx` — metadata propia con helper
- `src/app/contact/page.tsx` — metadata propia con helper
- `public/og/default-og.webp` — imagen OG fallback 1200x630
