# Story 1.6: Añadir descarga de CV desde Header, About y Footer

Status: ready-for-dev

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

- [ ] Colocar `public/cv/ian-vazquez-cv.pdf` — PDF real o placeholder (AC: #3)
- [ ] Crear componente reutilizable `CVDownloadButton` o agregar CTA directo (AC: #1, #2)
  - [ ] Link `<a href="/cv/ian-vazquez-cv.pdf" download aria-label="Descargar CV de Ian Vázquez (PDF)">`
  - [ ] Variante `secondary` o `ghost` del componente `Button`
  - [ ] Touch target ≥ 44x44px
- [ ] Integrar CTA en `Header.tsx` (desktop nav + MobileNav) (AC: #1)
- [ ] Actualizar `src/app/about/page.tsx` con CTA de descarga de CV (AC: #1)
- [ ] Actualizar `Footer.tsx` con CTA de descarga de CV (AC: #1)
- [ ] Verificar descarga en diferentes navegadores y `npm run build` (AC: #3, #5)

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

_pending_

### Debug Log References

### Completion Notes List

### File List
