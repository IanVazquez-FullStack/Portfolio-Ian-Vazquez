# Story 1.1: Inicializar proyecto Next.js desde starter oficial

Status: review

## Story

As a desarrollador del portfolio,
I want inicializar el proyecto con `create-next-app@latest` configurado con TypeScript estricto, Tailwind, ESLint, App Router, `src/` y alias `@/*`,
so that el trabajo posterior parta de una base predecible y alineada con la arquitectura.

## Acceptance Criteria

1. **Given** un repo limpio sin proyecto Next.js, **When** se ejecuta `npx create-next-app@latest portfolio-ian --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`, **Then** existe un proyecto Next.js 14+ con App Router, `"strict": true` en `tsconfig.json`, Tailwind configurado, ESLint funcional y alias `@/*` operativo.
2. `npm run dev`, `npm run build` y `npm run lint` se ejecutan sin errores.
3. Se crean las carpetas vacías de AR-02: `src/components/{ui,layout,sections,content,forms,motion}`, `src/content/{projects,blog}`, `src/lib/{content,validation,email,seo,api,motion,utils}`, `src/styles`, `src/types`, `tests/e2e`, `public/{projects,cv,og,icons}`.
4. Existe `.env.example` con `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL` y `.env.local` ignorado en `.gitignore`.

## Tasks / Subtasks

- [x] Ejecutar create-next-app con los flags exactos (AC: #1)
  - [x] Verificar `"strict": true` en `tsconfig.json`
  - [x] Verificar alias `@/*` en `tsconfig.json` y `package.json`
- [x] Validar que `npm run dev`, `npm run build` y `npm run lint` pasan sin errores (AC: #2)
- [x] Crear estructura de carpetas vacías según AR-02 (AC: #3)
  - [x] `src/components/{ui,layout,sections,content,forms,motion}`
  - [x] `src/content/{projects,blog}`
  - [x] `src/lib/{content,validation,email,seo,api,motion,utils}`
  - [x] `src/styles`, `src/types`, `tests/e2e`
  - [x] `public/{projects,cv,og,icons}`
- [x] Crear `.env.example` con las 4 variables requeridas (AC: #4)
- [x] Verificar que `.env.local` está en `.gitignore` (AC: #4)

## Dev Notes

- **Comando exacto:** `npx create-next-app@latest portfolio-ian --ts --tailwind --eslint --app --src-dir --import-alias "@/*"` — no omitir ningún flag.
- **TypeScript strict:** El starter ya genera `"strict": true`. Si no, agregarlo manualmente en `tsconfig.json`. También se requiere `"noUncheckedIndexedAccess": true`.
- **Gestor de paquetes:** `npm` (lockfile `package-lock.json` presente). No usar `pnpm` ni `yarn`.
- **App Router:** Toda la app vive en `src/app/` — NO usar `pages/`.
- **Alias imports:** Siempre `@/*` — nunca rutas relativas con `../../`.
- **NO** instalar dependencias adicionales en esta historia. Solo el starter.

### Project Structure Notes

- Esta historia crea la estructura base sobre la que todo lo demás se construye.
- Las carpetas vacías de AR-02 se crean manualmente con `.gitkeep` donde sea necesario para que Git las rastree.
- El archivo `.env.example` es solo documentación — NO contener valores reales.
- `.env.local` debe estar en `.gitignore` (el starter lo incluye por defecto, verificar).

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1]
- [Source: _bmad-output/project-context.md#Stack Tecnológico y Versiones]
- [Source: _bmad-output/planning-artifacts/epics.md#AR-01, AR-02]

## Dev Agent Record

### Agent Model Used

Cascade

### Debug Log References

- `npx create-next-app@latest . ...` falló porque el directorio existente contenía archivos de BMAD y metadata del repo.
- Se actualizó Node mediante `nvm` a `v24.16.0` para poder usar `create-next-app@latest`.
- Se generó el starter en `/tmp/portfolio-ian-next-starter` y se copió el scaffold al repo preservando artefactos existentes.
- `npm run dev` verificado con `timeout 12s`; levantó correctamente en `http://localhost:3000` y fue detenido por timeout esperado.
- `npm run lint` y `npm run build` pasan sin errores.

### Completion Notes List

- Inicializado scaffold Next.js con TypeScript, Tailwind, ESLint, App Router, `src/` y alias `@/*`.
- Verificado `strict: true` y agregado `noUncheckedIndexedAccess: true` en `tsconfig.json`.
- Creada la estructura AR-02 con `.gitkeep` en carpetas vacías.
- Creado `.env.example` con las cuatro variables requeridas.
- Ajustado `.gitignore` para mantener `.env.local` ignorado y permitir versionar `.env.example`.
- Configurado ESLint para ignorar carpetas de tooling/documentación que no pertenecen al código de la app.

### File List

- `.env.example`
- `.gitignore`
- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `eslint.config.mjs`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `public/file.svg`
- `public/globe.svg`
- `public/next.svg`
- `public/vercel.svg`
- `public/window.svg`
- `public/cv/.gitkeep`
- `public/icons/.gitkeep`
- `public/og/.gitkeep`
- `public/projects/.gitkeep`
- `src/app/favicon.ico`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/content/.gitkeep`
- `src/components/forms/.gitkeep`
- `src/components/layout/.gitkeep`
- `src/components/motion/.gitkeep`
- `src/components/sections/.gitkeep`
- `src/components/ui/.gitkeep`
- `src/content/blog/.gitkeep`
- `src/content/projects/.gitkeep`
- `src/lib/api/.gitkeep`
- `src/lib/content/.gitkeep`
- `src/lib/email/.gitkeep`
- `src/lib/motion/.gitkeep`
- `src/lib/seo/.gitkeep`
- `src/lib/utils/.gitkeep`
- `src/lib/validation/.gitkeep`
- `src/styles/.gitkeep`
- `src/types/.gitkeep`
- `tests/e2e/.gitkeep`
- `tsconfig.json`

### Change Log

- 2026-05-25: Inicializado proyecto Next.js y completada estructura base de la historia 1.1.
