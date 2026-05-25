---
title: PRD - Portfolio Web de Desarrollador Full Stack
status: draft
created: 2026-05-24
updated: 2026-05-24
author: Ian Vázquez
stake_level: launch
entry_point: vision-features
---

# Portfolio Web de Desarrollador Full Stack

## 1. Executive Summary

| Atributo | Valor |
|----------|-------|
| **Versión** | 1.0 |
| **Fecha** | 2026-05-24 |
| **Autor** | Ian Vázquez |
| **Stake Level** | Launch (alto rigor, portfolio profesional) |
| **Entry Point** | Vision + Features (capability-first) |

### 1.1 Propósito

Transformar visitas de reclutadores, empresas y potenciales clientes en oportunidades de contacto mediante demostración tangible de capacidades full stack.

### 1.2 Audiencia Objetivo

- Reclutadores técnicos y no técnicos
- Hiring managers de empresas
- Potenciales clientes para consultorías freelance
- Desarrolladores para networking y colaboración en proyectos

### 1.3 Diferenciadores Clave

1. **Casos técnicos detallados:** Cada proyecto incluye explicación de decisiones difíciles, arquitectura y lecciones aprendidas
2. **Animaciones profesionales:** UX-driven, mobile-first, performance-optimizadas con Framer Motion
3. **Backend funcional real:** Formulario de contacto con API real demostrando skills full stack

---

## 2. Vision & Strategy

### 2.1 Vision Statement

Ser el portfolio de referencia para desarrolladores full stack que demuestra capacidad técnica real a través de evidencia tangible — no listas de tecnologías, sino casos de pensamiento aplicado.

### 2.2 Estrategia de Contenido

| Elemento | Enfoque |
|----------|---------|
| **Proyectos** | Cada proyecto = demostración de pensamiento técnico + arquitectura + implementación |
| **Animaciones** | Cada transición = señal de profesionalismo en UX y atención al detalle |
| **Interacciones** | Cada punto de contacto = oportunidad de conversión (formulario, CV, email) |
| **Blog** | Artículos técnicos demostrando profundidad de conocimiento |

### 2.3 Principios de Priorización

1. **P0 - Core:** Sin esto el portfolio no cumple su función
2. **P1 - Diferenciador:** Elementos que destacan del portfolio genérico
3. **P2 - Polish:** Mejoras de UX que elevan la percepción de calidad

---

## 3. Features (Capability Groups)

### 3.1 Feature Matrix

| ID | Capability Group | Descripción | Prioridad |
|----|------------------|-------------|-----------|
| CG-01 | **Navegación & Estructura** | Home scroll, páginas de proyectos, About, Contact | P0 - Core |
| CG-02 | **Presentación de Proyectos** | Grid de proyectos, páginas individuales con casos técnicos | P0 - Core |
| CG-03 | **Sistema de Contacto** | Formulario con validación, API backend, envío de emails | P0 - Core |
| CG-04 | **Blog Técnico** | Listado de artículos, páginas individuales de posts | P1 - Diferenciador |
| CG-05 | **Animaciones & UX** | Transiciones, micro-interacciones, scroll effects con Framer Motion | P1 - Diferenciador |
| CG-06 | **Tema Oscuro** | Toggle dark/light mode, persistencia de preferencia | P2 - Polish |
| CG-07 | **SEO & Performance** | Meta tags, Open Graph, optimización de imágenes | P1 - Diferenciador |
| CG-08 | **Descarga de CV** | Botón de descarga de CV en formato PDF | P2 - Conversion |

---

### 3.2 Functional Requirements Detallados

#### CG-01: Navegación & Estructura

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| FR-01 | **Home como landing scroll:** Sección Hero + Proyectos destacados + About preview + Contact preview en una sola página con navegación suave | P0 |
| FR-02 | **Navegación persistente:** Header con logo, links a secciones (Proyectos, Blog, About, Contact), responsive con menú hamburguesa en mobile | P0 |
| FR-03 | **Footer consistente:** Links sociales, email, copyright, link a CV | P0 |

#### CG-02: Presentación de Proyectos

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| FR-04 | **Grid de proyectos en Home:** 3-4 proyectos destacados con imagen, título, tech stack resumido, link a detalle | P0 |
| FR-05 | **Página de listado de proyectos:** `/projects` con grid completo de todos los proyectos | P0 |
| FR-06 | **Página individual de proyecto:** `/projects/[slug]` con: screenshots/GIFs, descripción, stack técnico completo, caso técnico (decisiones difíciles, arquitectura, lecciones), link a demo y repo | P0 |
| FR-06a | **Escalabilidad de proyectos:** Sistema de contenido que permita agregar nuevos proyectos sin modificar código (archivo de datos o CMS ligero) | P1 |

#### CG-03: Sistema de Contacto

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| FR-07 | **Formulario de contacto:** Campos: nombre, email, asunto, mensaje, validación en tiempo real | P0 |
| FR-08 | **API backend de contacto:** Endpoint `/api/contact` que recibe formulario y envía email usando servicio de email (Resend/Nodemailer) | P0 |
| FR-09 | **Estados de UI del formulario:** Loading, success (mensaje de confirmación), error (mensaje de error con retry) | P0 |
| FR-10 | **Protección anti-spam:** Honeypot field o reCAPTCHA v2 invisible | P1 |

#### CG-04: Blog Técnico

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| FR-11 | **Listado de artículos:** `/blog` con posts ordenados por fecha, excerpt, fecha de publicación, tiempo de lectura estimado | P1 |
| FR-12 | **Página individual de artículo:** `/blog/[slug]` con contenido formateado (MDX), metadata, navegación anterior/siguiente | P1 |
| FR-13 | **Sistema de contenido:** Posts escritos en MDX con soporte para código syntax-highlighted | P1 |
| FR-13a | **Formato recomendado:** Artículos técnicos de profundidad media (5-10 min), "behind the scenes" de proyectos, tutoriales de problemas resueltos | P1 |

#### CG-05: Animaciones & UX

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| FR-14 | **Animaciones de entrada:** Elementos fade-in/slide-in al entrar en viewport, staggered para grupos | P1 |
| FR-15 | **Transiciones de página:** Transición suave entre rutas con AnimatePresence | P1 |
| FR-16 | **Micro-interacciones:** Hover states en botones y cards, feedback táctil en mobile | P2 |
| FR-17 | **Performance de animaciones:** Uso de `will-change`, `transform` y `opacity` solamente, respeto a `prefers-reduced-motion` | P1 |

#### CG-06: Tema Oscuro

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| FR-18 | **Toggle de tema:** Botón en header para cambiar entre light/dark | P2 |
| FR-19 | **Persistencia de preferencia:** Guardar en localStorage, respetar preferencia del sistema como default | P2 |
| FR-20 | **Tailwind dark mode:** Implementación con `dark:` variantes, sin flash de tema incorrecto en carga | P2 |

#### CG-07: SEO & Performance

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| FR-21 | **Meta tags dinámicos:** Título, descripción, imagen OG por página (Next.js Metadata API) | P1 |
| FR-22 | **Open Graph tags:** Para compartir en redes sociales y LinkedIn | P1 |
| FR-23 | **Optimización de imágenes:** Next.js Image component con lazy loading, WebP format | P1 |
| FR-24 | **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1 | P1 |

#### CG-08: Descarga de CV

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| FR-25 | **Botón de descarga CV:** En header y/o About, descarga directa de PDF | P2 |
| FR-26 | **CV actualizado:** Archivo PDF estático en `/public` o servido desde CDN | P2 |

---

## 4. Non-Functional Requirements

| ID | Requerimiento | Prioridad | Justificación |
|----|---------------|-----------|---------------|
| NFR-01 | **Performance:** Lighthouse score > 90 en todas las categorías | P0 | Señal de calidad técnica para reclutadores |
| NFR-02 | **Accesibilidad:** WCAG 2.1 AA compliance, navegación por teclado, screen reader support | P1 | Profesionalismo y reach más amplio |
| NFR-03 | **Seguridad:** Validación de inputs en frontend y backend, protección contra XSS/CSRF en formularios | P0 | Portfolio con backend debe ser seguro |
| NFR-04 | **Mantenibilidad:** Código modular, componentes reutilizables, TypeScript estricto | P1 | Facilita agregar proyectos/blog posts |
| NFR-05 | **Responsive:** Mobile-first, breakpoints para tablet y desktop | P0 | 60%+ tráfico puede ser mobile |
| NFR-06 | **Browser support:** Chrome, Firefox, Safari, Edge últimas 2 versiones | P1 | No necesita legacy browser support |
| NFR-07 | **Deploy:** CI/CD automático en push a main (Vercel) | P1 | Workflow profesional demostrado |

---

## 5. Success Metrics

| Métrica | Tipo | Objetivo |
|---------|------|----------|
| **Contactos generados** | Cuantitativa | 5+ consultas de calidad en 6 meses |
| **Visitas al portfolio** | Cuantitativa | Referencia base para medir conversión |
| **Engagement con proyectos** | Cuantitativa | Tiempo en páginas de proyecto, scroll depth |
| **Percepción de calidad** | Cualitativa | Feedback de peers: "se nota el nivel de detalle" |
| **Facilidad de mantenimiento** | Cualitativa | Agregar nuevo proyecto en < 30 min |

---

## 6. Decisions Log (Open Questions Resolved)

| Pregunta | Decisión | Fecha |
|----------|----------|-------|
| **Servicio de email** | Resend (free tier, 100 emails/día) | 2026-05-24 |
| **Analytics** | Vercel Analytics (built-in, privacidad-friendly) | 2026-05-24 |
| **Dominio** | Inicialmente `.vercel.app`, migrar a propio después | 2026-05-24 |
| **CMS blog** | MDX estático (más simple, más control) | 2026-05-24 |

---

## 7. Out of Scope (Phase 2+)

| Feature | Razón |
|---------|-------|
| Dashboard de admin | Sobre-ingeniería para portfolio personal |
| Sistema de comentarios en blog | Añade complejidad sin valor core |
| Buscador de proyectos/artículos | Pocos items inicialmente, navegación manual es suficiente |
| Newsletter / suscripción | Fuera del objetivo principal de generar contacto directo |
| Internacionalización (i18n) | Audiencia primaria hispanohablante inicialmente |

---

## 8. Appendix

### 8.1 Stack Tecnológico Confirmado

| Capa | Tecnología |
|------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Lenguaje** | TypeScript (strict) |
| **Estilos** | Tailwind CSS |
| **Animaciones** | Framer Motion |
| **Formularios** | React Hook Form + Zod |
| **Email** | Resend o Nodemailer |
| **Deploy** | Vercel |
| **Contenido** | MDX para blog y proyectos |

### 8.2 Referencias del Brainstorming

Documento base: `/home/ianv/Desktop/Github/portfolio-ian/_bmad-output/brainstorming/brainstorming-session-2026-05-24-23-10.md`

Decisiones clave tomadas en sesión de brainstorming:
- Stack: React/Next.js sobre Angular (por backend integrado y ecosistema de animaciones)
- Diferenciador: Casos técnicos en proyectos
- Enfoque: Portfolio como "aplicación full stack real", no solo estática

