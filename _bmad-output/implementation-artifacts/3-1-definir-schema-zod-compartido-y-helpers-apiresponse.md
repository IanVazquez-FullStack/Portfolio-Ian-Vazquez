# Story 3.1: Definir schema Zod compartido y helpers ApiResponse

Status: review

## Story

As a desarrollador del portfolio,
I want un `contactSchema` Zod y helpers `ApiResponse` compartidos entre cliente y servidor,
so that el formulario y el endpoint compartan validación y formato de respuesta (AR-03, AR-04).

## Acceptance Criteria

1. **Given** el proyecto inicializado, **When** se crean `src/lib/validation/contactSchema.ts` y `src/lib/api/responses.ts`, **Then** `contactSchema` valida `name` (2-100), `email` (formato), `subject` (3-200), `message` (10-5000), `company` (opcional, honeypot).
2. Se exporta el tipo `ContactInput = z.infer<typeof contactSchema>`.
3. `responses.ts` exporta `ApiResponse<T>` y helpers `ok<T>(data?, message?)` y `fail(error, fieldErrors?, status?)` que devuelven `Response.json(...)` con el shape de AR-03.
4. Los status codes por defecto son `200`, `400`, `429`, `500` y nunca se filtran errores internos al cliente.
5. Existen tests verificando: input válido, email malformado, message corto, honeypot lleno.

## Tasks / Subtasks

- [x] Instalar Zod si no está presente: `npm install zod` (AC: #1)
- [x] Crear `src/lib/validation/contactSchema.ts` (AC: #1, #2)
  - [x] `name`: `z.string().min(2).max(100)`
  - [x] `email`: `z.string().email()`
  - [x] `subject`: `z.string().min(3).max(200)`
  - [x] `message`: `z.string().min(10).max(5000)`
  - [x] `company`: `z.string().optional()` (honeypot — no validar contenido)
  - [x] Exportar `ContactInput = z.infer<typeof contactSchema>`
- [x] Crear `src/lib/api/responses.ts` (AC: #3, #4)
  - [x] Tipo `ApiResponse<T>`: `{ ok: true; data?: T; message?: string } | { ok: false; error: string; fieldErrors?: Record<string, string[]> }`
  - [x] Helper `ok<T>(data?, message?)`: retorna `Response.json({ ok: true, data, message }, { status: 200 })`
  - [x] Helper `fail(error, fieldErrors?, status = 400)`: retorna `Response.json({ ok: false, error, fieldErrors }, { status })`
  - [x] Mensajes de error al cliente siempre genéricos (nunca stack traces ni mensajes de Resend)
- [x] Crear tests en `src/lib/validation/contactSchema.test.ts` (AC: #5)
  - [x] Test: input válido pasa
  - [x] Test: email malformado falla
  - [x] Test: message < 10 chars falla
  - [x] Test: honeypot `company` con contenido — schema lo permite (descarte es en el handler)

## Dev Notes

- **Zod:** Ya debería estar en el proyecto (React Hook Form lo usa). Verificar `package.json`. Si no, instalar.
- **`contactSchema` es compartido:** Se importa desde el Client Component (`ContactForm`) Y desde el Route Handler. Esto es posible porque no hay código server-only en este archivo.
- **Anti-patrón de respuestas API (AR-03):** El shape DEBE ser:
  ```ts
  type ApiResponse<T = unknown> =
    | { ok: true; data?: T; message?: string }
    | { ok: false; error: string; fieldErrors?: Record<string, string[]> }
  ```
  NO usar `{ success: false, msg: error.message }` ni variantes.
- **Honeypot en schema:** `company` es `optional()` — el schema **no** lo rechaza si tiene contenido. El rechazo silencioso ocurre en el Route Handler (Story 3.3). El schema solo valida formato.
- **Tests:** Si no hay un framework de unit testing configurado, usar Zod `.safeParse()` en un script simple o configurar `vitest` (decisión a tomar en esta historia si es la primera que los necesita).
- **Status codes:** `200` éxito, `400` validación, `429` rate limit, `500` inesperado. El helper `fail` recibe el status como parámetro opcional con default `400`.

### Project Structure Notes

```
src/lib/validation/
  contactSchema.ts          ← schema Zod + ContactInput type
  contactSchema.test.ts     ← tests unitarios
src/lib/api/
  responses.ts              ← ApiResponse<T> + ok() + fail()
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.1]
- [Source: _bmad-output/planning-artifacts/epics.md#AR-03, AR-04]
- [Source: _bmad-output/project-context.md#API Route Handler]
- [Source: _bmad-output/project-context.md#Anti-Patrones (respuestas API)]

## Dev Agent Record

### Agent Model Used

Cascade (Claude)

### Debug Log References

### Completion Notes List

- Instalado vitest como framework de unit testing (primera historia que lo requería).
- Creado `contactSchema` Zod con validaciones name (2-100), email, subject (3-200), message (10-5000), company opcional.
- Exportado tipo `ContactInput`.
- Creado `ApiResponse<T>` y helpers `ok()` / `fail()` con shape AR-03.
- Tests: 9 para contactSchema + 7 para responses = 16 tests pasando.
- Lint y build sin errores.

### File List

- `src/lib/validation/contactSchema.ts`
- `src/lib/validation/contactSchema.test.ts`
- `src/lib/api/responses.ts`
- `src/lib/api/responses.test.ts`
- `package.json` (script `test` agregado)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (status actualizado)
