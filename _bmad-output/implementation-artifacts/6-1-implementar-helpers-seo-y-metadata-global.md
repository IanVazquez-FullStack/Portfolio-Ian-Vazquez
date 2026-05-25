# Story 6.1: Implementar helpers SEO y metadata global

Status: ready-for-dev

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

- [ ] Crear `src/lib/seo/site.ts` (AC: #1)
  - [ ] `SITE_NAME = 'Ian Vázquez'`
  - [ ] `SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio-ian.vercel.app'`
  - [ ] `DEFAULT_DESCRIPTION = 'Desarrollador Full Stack...'`
  - [ ] `AUTHOR = 'Ian Vázquez'`
  - [ ] `DEFAULT_OG_IMAGE = '/og/default-og.webp'`
- [ ] Crear `src/lib/seo/metadata.ts` (AC: #2)
  - [ ] `buildMetadata({ title, description, ogImage?, canonical? }): Metadata`
  - [ ] `title: { default: SITE_NAME, template: \`%s — ${SITE_NAME}\` }`
  - [ ] `openGraph`: `title`, `description`, `images: [ogImage ?? DEFAULT_OG_IMAGE]`, `url`, `siteName`, `type: 'website'`
  - [ ] `twitter`: `card: 'summary_large_image'`, `title`, `description`, `images`
- [ ] Actualizar `src/app/layout.tsx` con `export const metadata = buildMetadata(...)` (AC: #3)
- [ ] Actualizar `src/app/about/page.tsx` con metadata propia (AC: #4)
- [ ] Actualizar `src/app/contact/page.tsx` con metadata propia (AC: #4)
- [ ] Crear/colocar `public/og/default-og.webp` (1200x630) (AC: #5)

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

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
