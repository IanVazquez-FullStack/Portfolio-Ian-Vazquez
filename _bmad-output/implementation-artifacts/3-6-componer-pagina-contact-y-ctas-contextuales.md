# Story 3.6: Componer página /contact y CTAs contextuales

Status: ready-for-dev

## Story

As a visitante del portfolio,
I want una página `/contact` que presente el formulario con alternativas (LinkedIn, GitHub, email),
so that pueda elegir el canal que prefiera sin presión.

## Acceptance Criteria

1. **Given** el `ContactForm` operativo, **When** se implementan `src/app/contact/page.tsx` y `src/components/sections/ContactPreview.tsx`, **Then** `/contact` renderiza `h1` "Trabajemos juntos" (o equivalente), párrafo introductorio breve, el `ContactForm` y un panel con LinkedIn/GitHub/email mailto.
2. La página soporta `?ref=[slug]` y prellena `subject` con "Consulta sobre proyecto: [slug]" cuando viene desde Story 2.5.
3. `ContactPreview` en Home muestra heading + párrafo + CTA "Hablemos" hacia `/contact`.
4. Ambas son responsive (UX-DR10) y operables por teclado.
5. Pasan Lighthouse Accessibility ≥ 90 en preview local.

## Tasks / Subtasks

- [ ] Actualizar `src/app/contact/page.tsx` (reemplazar placeholder de Story 1.4) (AC: #1, #2)
  - [ ] `<h1>Trabajemos juntos</h1>` o equivalente
  - [ ] Párrafo introductorio
  - [ ] `ContactForm` con prop `defaultSubject` si `searchParams.ref` está presente
  - [ ] Panel lateral/inferior con links a LinkedIn, GitHub, email mailto
  - [ ] Metadata: `export const metadata = { title: 'Contacto', description: '...' }`
- [ ] Manejar `?ref=[slug]` en la página (AC: #2)
  - [ ] `src/app/contact/page.tsx` acepta `{ searchParams: { ref?: string } }`
  - [ ] Si `ref` presente: `defaultSubject = \`Consulta sobre proyecto: ${ref}\``
  - [ ] Pasar `defaultSubject` a `ContactForm` como prop
  - [ ] `ContactForm` usa `defaultValues: { subject: defaultSubject }` en `useForm`
- [ ] Actualizar `ContactPreview` en `src/components/sections/ContactPreview.tsx` (AC: #3)
  - [ ] Heading, párrafo y CTA "Hablemos" → `/contact`
- [ ] Verificar responsive y accesibilidad (AC: #4, #5)

## Dev Notes

- **`page.tsx` vs `ContactForm`:** La página `/contact` puede ser un **Server Component** que recibe `searchParams` y pasa el `defaultSubject` como prop al `ContactForm` (Client Component). Esta es la separación correcta server/client.
- **`searchParams` en App Router (Next.js 14):**
  ```ts
  export default function ContactPage({ searchParams }: { searchParams: { ref?: string } }) {
    const defaultSubject = searchParams.ref ? `Consulta sobre proyecto: ${searchParams.ref}` : '';
    return <ContactForm defaultSubject={defaultSubject} />;
  }
  ```
- **`ContactForm` actualización:** Agregar prop `defaultSubject?: string` y usarla en `defaultValues` de `useForm`.
- **Panel de alternativas:** Links con iconos (GitHub, LinkedIn — Lucide icons), `target="_blank" rel="noopener noreferrer"`.
- **`ContactPreview`:** El componente creado en Story 2.3 era un placeholder — actualizar con el diseño real.
- **Lighthouse Accessibility ≥ 90:** Verificar etiquetas, contraste, navegación por teclado antes de marcar como done.

### Project Structure Notes

```
src/app/contact/
  page.tsx              ← actualizar placeholder, Server Component con searchParams
src/components/forms/
  ContactForm.tsx       ← agregar prop defaultSubject
src/components/sections/
  ContactPreview.tsx    ← actualizar con diseño real
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.6]
- [Source: _bmad-output/planning-artifacts/epics.md#UX-DR10]
- [Source: _bmad-output/project-context.md#Server vs Client Components]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
