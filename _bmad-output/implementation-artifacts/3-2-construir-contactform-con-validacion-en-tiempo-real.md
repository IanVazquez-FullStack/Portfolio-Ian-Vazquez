# Story 3.2: Construir ContactForm con validación en tiempo real

Status: ready-for-dev

## Story

As a visitante del portfolio,
I want completar el formulario con validación en tiempo real y feedback claro,
so that pueda contactar a Ian con confianza sin perder datos.

## Acceptance Criteria

1. **Given** el `contactSchema` de Story 3.1, **When** se implementa `src/components/forms/ContactForm.tsx` (Client Component) con React Hook Form + `@hookform/resolvers/zod`, **Then** se muestran labels visibles sobre cada input (no placeholders sustitutivos) (UX-DR5).
2. La validación se ejecuta on-blur/on-change con mensajes asociados al campo vía `aria-invalid` y `aria-describedby` (UX-DR9).
3. Incluye honeypot `company` invisible visualmente pero accesible (input con `tabindex={-1}`, `autocomplete="off"`, posicionado fuera de pantalla) (FR-10).
4. El botón "Enviar" expone estado `loading`, se deshabilita durante envío y muestra texto del estado actual (UX-DR15, UX-DR13).
5. El estado del formulario es `FormStatus = "idle" | "validating" | "loading" | "success" | "error"` gestionado localmente (AR-09).
6. Todos los inputs cumplen contraste 4.5:1, `focus-visible` ring y touch target ≥ 44x44px.

## Tasks / Subtasks

- [ ] Instalar dependencias si no están: `npm install react-hook-form @hookform/resolvers` (AC: #1)
- [ ] Crear `src/components/forms/ContactForm.tsx` con `"use client"` (AC: #1)
  - [ ] `useForm<ContactInput>` con `resolver: zodResolver(contactSchema)`
  - [ ] Campos: `name`, `email`, `subject`, `message` con labels visibles encima
  - [ ] Mensajes de error por campo con `aria-describedby` e `id` únicos
  - [ ] `aria-invalid={!!errors.fieldName}` en cada input
- [ ] Implementar honeypot `company` (AC: #3)
  - [ ] Input con `tabindex={-1}`, `autocomplete="off"`, `aria-hidden="true"`, `style={{ position: 'absolute', left: '-9999px' }}`
- [ ] Implementar `FormStatus` state machine (AC: #5)
  - [ ] `useState<FormStatus>('idle')`
  - [ ] Transiciones: `idle → loading → success | error`
- [ ] Botón "Enviar" con estados (AC: #4)
  - [ ] `loading`: spinner visible + texto "Enviando..." + `disabled`
  - [ ] `disabled`: cuando `formStatus === 'loading'`
- [ ] Cumplir touch targets y contraste (AC: #6)
  - [ ] `min-h-[44px]` en inputs y botón
  - [ ] Ring `focus-visible` con color accent

## Dev Notes

- **`"use client"` obligatorio** — React Hook Form usa hooks de estado internamente.
- **React Hook Form + Zod:** Configuración estándar:
  ```ts
  const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur', // validar al salir del campo
  });
  ```
- **Labels visibles (UX-DR5):** NUNCA usar solo `placeholder` como label. Siempre `<label htmlFor="name">Nombre</label>` visible encima del input.
- **`aria-describedby` pattern:**
  ```tsx
  <input id="name" aria-describedby="name-error" aria-invalid={!!errors.name} />
  <p id="name-error" role="alert">{errors.name?.message}</p>
  ```
- **Honeypot:** No usar `display: none` ni `visibility: hidden` — los bots podrían detectarlos. Usar `position: absolute; left: -9999px` con `tabindex={-1}`.
- **`FormStatus` = tipos exactos:** `"idle" | "validating" | "loading" | "success" | "error"` — estos nombres son obligatorios por project-context.md.
- **Este componente NO envía aún al endpoint** — eso se conecta en Story 3.5. En esta historia solo se construye el formulario con validación local.
- **`@hookform/resolvers`:** Verificar versión compatible con `react-hook-form@7.x`.

### Project Structure Notes

```
src/components/forms/
  ContactForm.tsx    ← "use client", RHF + Zod
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.2]
- [Source: _bmad-output/planning-artifacts/epics.md#UX-DR5, UX-DR9, UX-DR13, UX-DR15, FR-10]
- [Source: _bmad-output/project-context.md#Estado (FormStatus)]
- [Source: _bmad-output/project-context.md#Reglas de Accesibilidad]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
