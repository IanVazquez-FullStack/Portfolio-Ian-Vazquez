---
title: 'Fix apellido Vazquez sin tilde'
type: 'bugfix'
created: '2026-05-26'
status: 'done'
route: 'one-shot'
---

## Intent

**Problem:** El apellido "Vázquez" aparece con tilde en múltiples archivos del código, pero debe ser "Vazquez" sin tilde según preferencia del usuario.

**Approach:** Reemplazar todas las instancias de "Vázquez" por "Vazquez" en archivos de código, tests y metadata.

## Suggested Review Order

- `src/lib/data/personal.ts:7-8` — Datos personales centralizados (fullName, displayName)
- `src/lib/seo/metadata.test.ts:13,16` — Tests de constantes SEO
- `src/app/contact/page.tsx:10` — Metadata de página contacto
- `src/app/blog/page.tsx:10` — Metadata de página blog
- `src/app/projects/page.tsx:11` — Metadata de página proyectos
- `src/components/content/CVDownloadButton.tsx:23` — Aria-label de botón CV
- `src/components/forms/ContactForm.test.tsx:6,145,172,236` — Tests de formulario contacto
- `tests/e2e/contact.spec.ts:4` — Test e2e de contacto
- `src/lib/validation/contactSchema.test.ts:6` — Test de schema de contacto
- `src/app/projects/page.test.tsx:71` — Test de metadata de proyectos
