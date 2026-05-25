# Story 1.6: Añadir descarga de CV desde Header, About y Footer

Status: done

## Story

As a reclutador,
I want descargar el CV en PDF con un click desde el portfolio,
so that pueda revisar la trayectoria fuera del navegador y compartirla internamente.

## Acceptance Criteria

1. **Given** el layout shell de Story 1.4, **When** se coloca `public/cv/ian-vazquez-cv.pdf` y se agregan CTAs de descarga, **Then** Header (desktop/mobile), `/about` y Footer exponen un CTA visible "Descargar CV" con variante `secondary` o `ghost` (UX-DR15).
2. El link usa atributo `download` y `aria-label="Descargar CV de Ian Vázquez (PDF)"`.
3. El archivo existe en `public/cv/` y se descarga correctamente en Chrome/Firefox/Safari/Edge (NFR-06).
4. El botón cumple touch target ≥ 44x44px (UX-DR7) y `focus-visible` accesible (UX-DR9).
5. `npm run build` pasa y `/cv/ian-vazquez-cv.pdf` responde 200 OK en dev.

## Tasks / Subtasks

- [x] Colocar `public/cv/ian-vazquez-cv.pdf` — PDF real o placeholder (AC: #3)
- [x] Crear componente reutilizable `CVDownloadButton` o agregar CTA directo (AC: #1, #2)
  - [x] Link `<a href="/cv/ian-vazquez-cv.pdf" download aria-label="Descargar CV de Ian Vázquez (PDF)">`
  - [x] Variante `secondary` o `ghost` del componente `Button`
  - [x] Touch target ≥ 44x44px
- [x] Integrar CTA en `Header.tsx` (desktop nav + MobileNav) (AC: #1)
- [x] Actualizar `src/app/about/page.tsx` con CTA de descarga de CV (AC: #1)
- [x] Actualizar `Footer.tsx` con CTA de descarga de CV (AC: #1)
- [x] Verificar descarga en diferentes navegadores y `npm run build` (AC: #3, #5)

### Review Findings

- [ ] [Review][Patch] Falta CTA de descarga en `/about` [`src/app/about/page.tsx`:11]
- [ ] [Review][Patch] Footer muestra "Descargar CV" deshabilitado en vez de un link descargable [`src/components/layout/Footer.tsx`:40]
- [ ] [Review][Patch] MobileNav no expone el CTA de descarga requerido [`src/components/layout/MobileNav.tsx`:47]

## Dev Notes

- **Ruta del archivo:** `/cv/ian-vazquez-cv.pdf` → `public/cv/ian-vazquez-cv.pdf`. Next.js sirve archivos en `public/` directamente en la raíz.
- **Sin API route:** El CV es un archivo estático — NO crear un endpoint para servirlo (AR-09 simplifica esto).
- **Atributo `download`:** Fuerza la descarga en lugar de abrir en el navegador. En Safari puede comportarse diferente, pero el atributo es correcto.
- **Si no hay PDF real aún:** Crear un placeholder PDF mínimo válido. El AC #3 requiere que el archivo exista y responda 200.
- **`Button` variante `secondary`:** Definida en Story 1.3. Reutilizar ese componente.
- **Icono:** Opcional, pero un ícono de descarga (Lucide `Download`) mejora la UX.

### Project Structure Notes

```
public/cv/
  ian-vazquez-cv.pdf    ← archivo real o placeholder
src/components/layout/
  Header.tsx            ← actualizar con CTA CV
  Footer.tsx            ← actualizar con CTA CV
src/app/
  about/page.tsx        ← actualizar con CTA CV
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.6]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-25, FR-26, UX-DR7, UX-DR15]
- [Source: _bmad-output/project-context.md#MDX y Contenido (CV estático)]

## Dev Agent Record

### Agent Model Used

Cascade

### Debug Log References

- `npm run lint && npm run build` — passed.
- `test -s public/cv/ian-vazquez-cv.pdf && file public/cv/ian-vazquez-cv.pdf` — confirmed PDF 1.4, 1 page.
- Manual dev-server verification by user — `/cv/ian-vazquez-cv.pdf` returned 200 OK.

### Completion Notes List

- Implemented reusable `CVDownloadButton` using the existing `Button` anchor variant.
- Added visible "Descargar CV" CTAs in desktop header, mobile navigation, `/about`, and footer.
- Added a valid placeholder PDF at `public/cv/ian-vazquez-cv.pdf`.
- Kept the CV as a static public asset; no API route was added.
- Manual dev-server verification confirmed `/cv/ian-vazquez-cv.pdf` returns 200 OK.

### Change Log

- 2026-05-25: Added static CV PDF placeholder and reusable download CTA across Header, MobileNav, About, and Footer.

### File List

- `public/cv/ian-vazquez-cv.pdf`
- `src/app/about/page.tsx`
- `src/components/content/CVDownloadButton.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/MobileNav.tsx`
