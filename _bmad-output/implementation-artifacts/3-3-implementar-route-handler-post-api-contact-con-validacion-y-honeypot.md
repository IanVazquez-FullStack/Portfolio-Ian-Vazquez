# Story 3.3: Implementar Route Handler POST /api/contact con validación y honeypot

Status: ready-for-dev

## Story

As a desarrollador del portfolio,
I want un endpoint que valide la entrada con Zod, descarte requests con honeypot y devuelva respuestas estándar,
so that el backend sea seguro y consistente sin filtrar detalles (NFR-03, FR-08, FR-10).

## Acceptance Criteria

1. **Given** el schema y helpers de Story 3.1, **When** se implementa `src/app/api/contact/route.ts`, **Then** el handler `POST` parsea el body, valida con `contactSchema.safeParse()` y devuelve `400` con `fieldErrors` si falla (AR-03).
2. Si `company` (honeypot) tiene contenido, devuelve `200 ok` simulando éxito sin enviar email (descarte silencioso) (FR-10).
3. `GET/PUT/DELETE/PATCH` devuelven `405`.
4. Errores internos se loguean con `console.error` incluyendo un id de request, pero el mensaje al cliente es genérico (NFR-03, AR-12).
5. El handler **no** importa componentes UI ni módulos client-only (AR-07).
6. Existe test (unit o E2E) que verifica: input válido → 200, input inválido → 400 con fieldErrors, honeypot → 200 sin email, GET → 405.

## Tasks / Subtasks

- [ ] Crear `src/app/api/contact/route.ts` (AC: #1, #2, #3, #4, #5)
  - [ ] Exportar solo `POST` (y métodos para `405`)
  - [ ] Parsear body: `const body = await req.json()`
  - [ ] Validar: `const result = contactSchema.safeParse(body)`
  - [ ] Si `!result.success` → `fail(...)` con `fieldErrors` y status 400
  - [ ] Si `result.data.company` (honeypot) → `ok()` silencioso sin email
  - [ ] En éxito real → llamar `sendContactEmail()` (se implementa en Story 3.4; mock/skip aquí)
  - [ ] `try/catch` con `console.error` y `fail("No pude enviar...", undefined, 500)` al cliente
- [ ] Exportar handlers `GET`, `PUT`, `DELETE`, `PATCH` que retornen 405 (AC: #3)
- [ ] Generar ID de request para logging (AC: #4)
  - [ ] `const requestId = crypto.randomUUID()`
  - [ ] Incluir en logs: `console.error('[contact]', requestId, error)`
- [ ] Crear test para el endpoint (AC: #6)
  - [ ] `src/app/api/contact/route.test.ts` o test E2E en `tests/e2e/contact.spec.ts`

## Dev Notes

- **Único endpoint público:** Solo existe `POST /api/contact`. NO crear otros endpoints (AR-03).
- **Mensaje de error al cliente (NFR-03):** SIEMPRE genérico: `"No pude enviar el mensaje. Revisá tu conexión e intentá de nuevo."` — NUNCA exponer mensajes de Resend, stack traces, ni API keys.
- **Honeypot silencioso:** Si `company` tiene contenido → `return ok(undefined, "Mensaje enviado correctamente.")` — el bot "cree" que funcionó.
- **405 para métodos no permitidos:**
  ```ts
  export async function GET() {
    return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  }
  ```
- **`sendContactEmail` en Story 3.3:** En esta historia, si Story 3.4 no está lista, agregar un placeholder:
  ```ts
  // TODO Story 3.4: await sendContactEmail(data)
  return ok(undefined, "Mensaje enviado correctamente.");
  ```
- **NO importar** `src/components/`, `src/styles/` ni nada con `"use client"` desde este archivo.
- **Route Handler en Next.js 14 App Router:** El archivo debe ser `src/app/api/contact/route.ts` con exports nombrados `POST`, `GET`, etc. (no default export).

### Project Structure Notes

```
src/app/api/contact/
  route.ts              ← Route Handler, solo POST funcional
  route.test.ts         ← tests unitarios del handler
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.3]
- [Source: _bmad-output/planning-artifacts/epics.md#AR-03, NFR-03, FR-10, AR-12]
- [Source: _bmad-output/project-context.md#API Route Handler]
- [Source: _bmad-output/project-context.md#Anti-Patrones (respuestas API, errores internos)]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
