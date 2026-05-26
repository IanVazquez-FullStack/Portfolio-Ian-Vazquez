# Story 3.4: Integrar Resend para envío de email

Status: ready-for-dev

## Story

As a Ian,
I want recibir un email en mi inbox cuando alguien envía el formulario,
so that pueda responder oportunidades a tiempo (FR-08).

## Acceptance Criteria

1. **Given** el endpoint de Story 3.3 y `RESEND_API_KEY` en `.env.local`, **When** se implementa `src/lib/email/sendContactEmail.ts` y se invoca desde el handler, **Then** la función usa el SDK oficial de Resend con `RESEND_API_KEY`, envía desde `CONTACT_FROM_EMAIL` hacia `CONTACT_TO_EMAIL` con `replyTo: email` (AR-05).
2. El cuerpo del email incluye los 4 campos formateados con asunto `[portfolio-ian] {subject}`.
3. Errores del SDK se capturan, se loguean sin filtrar la API key y se devuelven como `{ ok: false, error }` con `500`.
4. La función está aislada en `src/lib/email/` y **no** se importa desde Client Components (AR-07).
5. `.env.example` documenta las 4 variables requeridas.

## Tasks / Subtasks

- [ ] Instalar SDK de Resend: `npm install resend` (AC: #1)
- [ ] Crear `src/lib/email/sendContactEmail.ts` (AC: #1, #2, #3, #4)
  - [ ] Inicializar `new Resend(process.env.RESEND_API_KEY)`
  - [ ] Función `sendContactEmail(data: ContactInput): Promise<{ ok: boolean; error?: string }>`
  - [ ] `from: process.env.CONTACT_FROM_EMAIL`
  - [ ] `to: process.env.CONTACT_TO_EMAIL`
  - [ ] `replyTo: data.email`
  - [ ] `subject: \`[portfolio-ian] ${data.subject}\``
  - [ ] Cuerpo HTML o texto con nombre, email, asunto y mensaje formateados
  - [ ] `try/catch`: loguear error con `console.error` (sin incluir la API key), retornar `{ ok: false, error: 'email_send_failed' }`
- [ ] Actualizar `src/app/api/contact/route.ts` para llamar `sendContactEmail()` (AC: #1)
  - [ ] Reemplazar el `// TODO Story 3.4` por la llamada real
- [ ] Verificar `.env.example` con las 4 variables (AC: #5)

## Dev Notes

- **SDK Resend (versión actual ~v3.x):**
  ```ts
  import { Resend } from 'resend';
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({ from, to, subject, html });
  ```
- **Variables de entorno:** Acceder con `process.env.VAR_NAME`. En Next.js 14, las variables sin `NEXT_PUBLIC_` prefix son server-only (seguro para API keys).
- **Loguear error SIN API key:** No hacer `console.error(process.env.RESEND_API_KEY, error)`. Solo loguear el error y un request ID.
  ```ts
  console.error('[email]', requestId, 'Resend error:', error.message);
  ```
- **Cuerpo del email:** HTML simple es suficiente:
  ```html
  <h2>Nuevo mensaje desde portfolio-ian</h2>
  <p><strong>Nombre:</strong> {name}</p>
  <p><strong>Email:</strong> {email}</p>
  <p><strong>Asunto:</strong> {subject}</p>
  <p><strong>Mensaje:</strong></p>
  <p>{message}</p>
  ```
- **CRÍTICO — server-only:** Esta función NUNCA debe importarse desde un Client Component. Si el bundler lo detecta, causará errores de build.
- **Free tier Resend:** 100 emails/día. Para el MVP del portfolio es más que suficiente.
- **Testing:** En desarrollo local sin `RESEND_API_KEY`, la función fallará. Esto es esperado — documentarlo en `.env.example`.

### Project Structure Notes

```
src/lib/email/
  sendContactEmail.ts    ← server-only, NO importar desde Client Components
src/app/api/contact/
  route.ts               ← actualizar con llamada a sendContactEmail()
.env.example             ← documentar las 4 variables
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.4]
- [Source: _bmad-output/planning-artifacts/epics.md#AR-05, FR-08]
- [Source: _bmad-output/project-context.md#Variables de Entorno Requeridas]
- [Source: _bmad-output/project-context.md#Anti-Patrones (importar email desde Client)]

## Dev Agent Record

### Agent Model Used

Cascade (Claude)

### Debug Log References

- Build inicial falló porque `new Resend(process.env.RESEND_API_KEY)` en top-level causaba "Missing API key" durante `next build` (prerender de /api/contact). Solución: mover la inicialización de Resend dentro de `sendContactEmail` para hacerla lazy y validar `RESEND_API_KEY` antes de instanciar.

### Completion Notes List

- Instalado `resend` v3.x (`npm install resend`).
- Creado `src/lib/email/sendContactEmail.ts` con:
  - Inicialización lazy de `Resend` (dentro de la función, no en top-level).
  - Validación de `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` y `CONTACT_TO_EMAIL`.
  - Envío de email con `replyTo: data.email` y subject `[portfolio-ian] ${data.subject}`.
  - Cuerpo HTML escapado con los 4 campos del formulario.
  - `try/catch` que loguea errores sin exponer la API key y retorna `{ ok: false, error: 'email_send_failed' }`.
- Actualizado `src/app/api/contact/route.ts`:
  - Importa `sendContactEmail`.
  - Reemplazado `// TODO Story 3.4` por la llamada real.
  - Si `sendContactEmail` retorna `ok: false`, se loguea el error y se devuelve 500.
- `.env.example` ya contenía las 4 variables requeridas; no fue necesario modificarlo.
- Build (`npm run build`) pasa exitosamente.

### File List

- `src/lib/email/sendContactEmail.ts` (creado)
- `src/app/api/contact/route.ts` (modificado)
