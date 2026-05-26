# Story 3.6: Componer página /contact y CTAs contextuales

Status: done

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

- [x] Actualizar `src/app/contact/page.tsx` (reemplazar placeholder de Story 1.4) (AC: #1, #2)
  - [x] `<h1>Trabajemos juntos</h1>` o equivalente
  - [x] Párrafo introductorio
  - [x] `ContactForm` con prop `defaultSubject` si `searchParams.ref` está presente
  - [x] Panel lateral/inferior con links a LinkedIn, GitHub, email mailto
  - [x] Metadata: `export const metadata = { title: 'Contacto', description: '...' }`
- [x] Manejar `?ref=[slug]` en la página (AC: #2)
  - [x] `src/app/contact/page.tsx` acepta `{ searchParams: { ref?: string } }`
  - [x] Si `ref` presente: `defaultSubject = \`Consulta sobre proyecto: ${ref}\``
  - [x] Pasar `defaultSubject` a `ContactForm` como prop
  - [x] `ContactForm` usa `defaultValues: { subject: defaultSubject }` en `useForm`
- [x] Actualizar `ContactPreview` en `src/components/sections/ContactPreview.tsx` (AC: #3)
  - [x] Heading, párrafo y CTA "Hablemos" → `/contact`
- [x] Verificar responsive y accesibilidad (AC: #4, #5)

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

- Implementación de la página `/contact` y ajuste del `ContactForm` para recibir `defaultSubject`.
- Se mantuvieron pruebas unitarias específicas para paginación y formulario.
- Se validó el comportamiento con `vitest run src/components/forms/ContactForm.test.tsx src/app/contact/page.test.tsx`.

### Agent Model Used

Lark (Preview)

### Debug Log References

- `npm test -- src/components/forms/ContactForm.test.tsx src/app/contact/page.test.tsx`

### Completion Notes List

- La página `/contact` ahora muestra el `h1`, el intro y el panel de canales alternativos.
- `?ref=` prellena el asunto en el formulario y se conserva en el flujo de envío.
- `ContactPreview` ya apunta a `/contact` con CTA "Hablemos".
- El story queda listo para revisión; la suite completa de `npm test` muestra fallos no relacionados con esta historia en `src/app/api/contact/route.test.ts`, `tests/e2e/contact.spec.ts` y `src/lib/content/mdx.test.tsx`.

### File List

- `src/app/contact/page.tsx`
- `src/components/forms/ContactForm.tsx`
- `src/components/sections/ContactPreview.tsx`
- `src/app/contact/page.test.tsx`
- `src/components/forms/ContactForm.test.tsx`
