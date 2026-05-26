# Story 3.2: Construir ContactForm con validación en tiempo real

Status: review

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

- [x] Instalar dependencias si no están: `npm install react-hook-form @hookform/resolvers` (AC: #1)
- [x] Crear `src/components/forms/ContactForm.tsx` con `"use client"` (AC: #1)
  - [x] `useForm<ContactInput>` con `resolver: zodResolver(contactSchema)`
  - [x] Campos: `name`, `email`, `subject`, `message` con labels visibles encima
  - [x] Mensajes de error por campo con `aria-describedby` e `id` únicos
  - [x] `aria-invalid={!!errors.fieldName}` en cada input
- [x] Implementar honeypot `company` (AC: #3)
  - [x] Input con `tabindex={-1}`, `autocomplete="off"`, `aria-hidden="true"`, `style={{ position: 'absolute', left: '-9999px' }}`
- [x] Implementar `FormStatus` state machine (AC: #5)
  - [x] `useState<FormStatus>('idle')`
  - [x] Transiciones: `idle → loading → success | error`
- [x] Botón "Enviar" con estados (AC: #4)
  - [x] `loading`: spinner visible + texto "Enviando..." + `disabled`
  - [x] `disabled`: cuando `formStatus === 'loading'`
- [x] Cumplir touch targets y contraste (AC: #6)
  - [x] `min-h-[44px]` en inputs y botón
  - [x] Ring `focus-visible` con color accent

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

Cascade

### Debug Log References

### Completion Notes List

- ✅ Instaladas dependencias `react-hook-form@7.76.1` y `@hookform/resolvers`
- ✅ Creado `ContactForm.tsx` como Client Component con RHF + Zod resolver
- ✅ Labels visibles sobre cada input (UX-DR5), sin placeholders sustitutivos
- ✅ Validación `mode: 'onBlur'` con mensajes de error asociados vía `aria-invalid` + `aria-describedby` (UX-DR9)
- ✅ Honeypot `company` con `tabindex={-1}`, `autocomplete="off"`, posicionado fuera de pantalla (FR-10)
- ✅ `FormStatus` state machine gestionado localmente: idle → loading → success | error (AR-09)
- ✅ Botón "Enviar" con estados `idle`/`loading`/`success`/`error`, spinner y disabled durante envío (UX-DR15, UX-DR13)
- ✅ Inputs y botón con `min-h-11` (44px), `focus-visible:ring-2` con color accent
- ✅ Tests unitarios con 9 casos cubriendo render, a11y, honeypot, validación, estados de envío y touch targets
- ✅ Lint pasa sin errores. Build tiene error pre-existente en MDX loader (no relacionado con esta historia).

### File List

- `src/components/forms/ContactForm.tsx` — Componente principal (creado)
- `src/components/forms/ContactForm.test.tsx` — Tests unitarios (creado)
- `vitest.config.ts` — Añadido `environment: "jsdom"` (modificado)
- `package.json` / `package-lock.json` — Dependencias `react-hook-form` y `@hookform/resolvers` (modificado)
