# Story 6.5: Configurar Vercel deploy, env vars y CI con GitHub Actions

Status: ready-for-dev

## Story

As a equipo del portfolio,
I want push a `main` que despliegue producción y PRs que generen previews, con validaciones automáticas,
so that el flujo sea confiable y demuestre madurez técnica (NFR-07, AR-10).

## Acceptance Criteria

1. **Given** el proyecto integrado con Git y una cuenta Vercel, **When** se conecta el repo a Vercel y se crea `.github/workflows/ci.yml`, **Then** Vercel está configurado con `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL` (AR-05).
2. Push a `main` despliega producción y PRs generan preview deployments accesibles vía URL única (AR-10).
3. `ci.yml` ejecuta `npm ci`, `npm run lint`, `tsc --noEmit` y `npm run build` en pull_request y push a `main`.
4. Un fallo en cualquier paso de CI bloquea el merge (branch protection recomendada).
5. Existe documentación breve en `README.md` describiendo cómo deployar y rotar env vars.

## Tasks / Subtasks

- [ ] Conectar repositorio a Vercel (AC: #1, #2)
  - [ ] Importar proyecto desde GitHub en vercel.com
  - [ ] Framework preset: Next.js
  - [ ] Agregar variables de entorno en Vercel Dashboard: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`
- [ ] Crear `.github/workflows/ci.yml` (AC: #3)
  - [ ] Trigger: `push` a `main` y `pull_request`
  - [ ] Steps: `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm run build`
  - [ ] Node version: `20.x` (LTS actual)
- [ ] Configurar branch protection en GitHub (AC: #4)
  - [ ] Requerir que CI pase antes de merge a `main`
  - [ ] Opcionalmente: requerir review antes de merge
- [ ] Actualizar/crear `README.md` con instrucciones de deploy (AC: #5)
  - [ ] Cómo clonar y configurar env vars localmente
  - [ ] Cómo deployar en Vercel
  - [ ] Cómo rotar env vars (cambiar en Vercel Dashboard + redeploy)

## Dev Notes

- **`.github/workflows/ci.yml` mínimo:**
  ```yaml
  name: CI
  on:
    push:
      branches: [main]
    pull_request:
      branches: [main]
  jobs:
    ci:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: '20'
            cache: 'npm'
        - run: npm ci
        - run: npm run lint
        - run: npx tsc --noEmit
        - run: npm run build
  ```
- **Preview deployments de Vercel:** Vercel genera automáticamente una URL única por PR (ej. `portfolio-ian-git-feature-branch-user.vercel.app`). No requiere configuración adicional.
- **`NEXT_PUBLIC_SITE_URL` en Vercel:** Setear al dominio de producción (ej. `https://portfolio-ian.vercel.app`). Para previews, Vercel inyecta `VERCEL_URL` automáticamente — considerar usar esa en lugar de hardcodear.
- **Branch protection:** En GitHub Settings → Branches → Add rule → `main` → "Require status checks to pass before merging" → seleccionar el job de CI.
- **`npm ci` vs `npm install`:** Usar `npm ci` en CI para reproducibilidad garantizada (respeta el lockfile).

### Project Structure Notes

```
.github/workflows/
  ci.yml          ← nuevo
README.md         ← crear o actualizar
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.5]
- [Source: _bmad-output/planning-artifacts/epics.md#NFR-07, AR-10]
- [Source: _bmad-output/project-context.md#Workflow de Desarrollo]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
