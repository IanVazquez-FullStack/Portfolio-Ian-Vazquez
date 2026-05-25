# Story 3.5: Estados de UI loading/success/error con retry y preservación de datos

Status: ready-for-dev

## Story

As a visitante del portfolio,
I want feedback claro al enviar, confirmación tras éxito y opción de reintentar sin perder lo escrito,
so that pueda contactar con confianza incluso con problemas de red.

## Acceptance Criteria

1. **Given** el `ContactForm` de Story 3.2 conectado al endpoint Story 3.3-3.4, **When** el usuario envía el formulario, **Then** durante el envío el botón muestra `loading` y el form pasa a estado `loading` (FR-09, UX-DR13).
2. En éxito el form se reemplaza por panel "Mensaje enviado correctamente. Te respondo pronto." con CTA "Enviar otro mensaje" que vuelve a `idle` limpio.
3. En error de red o `500`, el form pasa a `error` con mensaje accionable y conserva todos los datos del usuario (UX-DR5).
4. En `400`, los `fieldErrors` se aplican a los campos sin perder los demás valores.
5. El flujo (idle → loading → success | error → retry) está cubierto por test E2E en `tests/e2e/contact.spec.ts` con casos success y error usando red mockeada (AR-11).

## Tasks / Subtasks

- [ ] Conectar `ContactForm` con el endpoint `POST /api/contact` (AC: #1)
  - [ ] En `handleSubmit`: `fetch('/api/contact', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })`
  - [ ] `setFormStatus('loading')` antes del fetch
- [ ] Implementar estado `success` (AC: #2)
  - [ ] Si `response.ok` y `data.ok === true` → `setFormStatus('success')`
  - [ ] Renderizar panel de éxito en lugar del formulario
  - [ ] CTA "Enviar otro mensaje": `reset()` + `setFormStatus('idle')`
- [ ] Implementar estado `error` con preservación de datos (AC: #3)
  - [ ] Si error de red (catch) o `data.ok === false` con 500 → `setFormStatus('error')`
  - [ ] Mostrar mensaje: "No pude enviar el mensaje. Revisá tu conexión e intentá de nuevo."
  - [ ] NO llamar `reset()` — el formulario mantiene los valores escritos
  - [ ] Botón "Reintentar" visible
- [ ] Implementar manejo de `400` con fieldErrors (AC: #4)
  - [ ] Si `data.ok === false` con `fieldErrors` → usar `setError` de React Hook Form por campo
  - [ ] Mantener valores de otros campos intactos
- [ ] Crear/completar `tests/e2e/contact.spec.ts` con Playwright (AC: #5)
  - [ ] Test caso success: mockear endpoint con `page.route()`, verificar panel success
  - [ ] Test caso error: mockear endpoint con 500, verificar mensaje error + datos preservados

## Dev Notes

- **`setError` de React Hook Form para `400`:**
  ```ts
  if (result.fieldErrors) {
    Object.entries(result.fieldErrors).forEach(([field, messages]) => {
      setError(field as keyof ContactInput, { message: messages[0] });
    });
  }
  ```
- **Preservar datos en error:** React Hook Form preserva automáticamente los valores si NO se llama `reset()`. Solo llamar `reset()` en el flujo de éxito.
- **Panel de éxito:** Renderizado condicionalmente: `if (formStatus === 'success') return <SuccessPanel />`.
- **Mensaje de error (UX-DR13):** El texto debe ser accionable — no solo "Error" sino "No pude enviar el mensaje. Revisá tu conexión e intentá de nuevo." con botón de retry.
- **Test E2E con Playwright:**
  ```ts
  // Mock success
  await page.route('/api/contact', route => route.fulfill({ status: 200, body: JSON.stringify({ ok: true, message: 'Enviado' }) }));
  // Mock error
  await page.route('/api/contact', route => route.fulfill({ status: 500, body: JSON.stringify({ ok: false, error: 'Server error' }) }));
  ```
- **`aria-live="polite"`:** El contenedor de mensajes de estado debe tener `aria-live="polite"` para que screen readers anuncien los cambios.

### Project Structure Notes

```
src/components/forms/
  ContactForm.tsx    ← actualizar con fetch + todos los estados
tests/e2e/
  contact.spec.ts   ← tests Playwright (crear o completar)
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.5]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-09, UX-DR5, UX-DR13, AR-11]
- [Source: _bmad-output/project-context.md#Estado (FormStatus)]
- [Source: _bmad-output/project-context.md#Reglas de Testing]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
