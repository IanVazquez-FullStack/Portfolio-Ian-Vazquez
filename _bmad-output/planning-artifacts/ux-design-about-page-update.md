# Especificaciones UX: Actualización de Página /about

**Fecha:** 2026-05-26  
**Diseñadora:** Sally (bmad-agent-ux-designer)  
**Proyecto:** portfolio-ian  
**Estado:** Draft para revisión

---

## 1. Objetivo

Actualizar la página `/about` con nuevo contenido personal narrativo y agregar un índice navegable (Table of Contents) para mejorar la experiencia de lectura y navegación.

---

## 2. Estructura de Contenido

### 2.1 Secciones Principales

El contenido se organiza en 4 secciones narrativas con IDs para navegación:

| ID | Título | Longitud estimada |
|----|--------|-------------------|
| `quien-soy` | De la lógica al código: quién soy | ~150 palabras |
| `giro-timon` | El giro de timón: de la medicina al código | ~120 palabras |
| `escuela-frustracion` | La escuela de la frustración (y cómo la convertí en mi ventaja) | ~180 palabras |
| `presente` | El presente: El ecosistema Full Stack y mis próximas metas | ~160 palabras |

### 2.2 Contenido Completo

#### Sección 1: `quien-soy`
```
Me llamo Ian Vazquez, tengo 18 años y vivo en Buenos Aires, Argentina. Si tuviera que definirme en pocas palabras, soy alguien simple pero profundamente detallista. Desde chico encontré en las matemáticas mi fuerte: esa satisfacción única de que las cosas funcionen exactamente como tu cabeza las piensa. Me apasiona la resolución de problemas, desarmar desafíos complejos y encontrarles una salida lógica.

Pero para mí, la tecnología no es solo números y pantallas. Creo que lo que realmente me define es la empatía, el amor y la compasión por los demás. Me gusta escuchar, entender a las personas y usar mis herramientas para ayudar a resolver sus necesidades. En un mundo lleno de líneas de código, mi objetivo es crear software con un propósito real: hacerle la vida más fácil y mejor a la gente. Siempre estoy listo para el próximo desafío técnico, buscando aprender más y más en cada paso.
```

#### Sección 2: `giro-timon`
```
Durante mucho tiempo, mi sueño de chico fue ser médico; sentía que ahí estaba mi camino para ayudar a las personas. Sin embargo, cuando arranqué la carrera, sentí que algo no encajaba del todo. El destino quiso que, cursando una materia de matemática, redescubriera la grandeza de las ingenierías. Fue en ese cruce de caminos donde me topé con la programación, y todo hizo un "clic" en mi cabeza.

Encontré mi carrera ideal y lo que verdaderamente me apasionaba. Escribir código nunca fue una simple tarea para mí; iba mucho más allá. El hecho de ver que el código respondía exactamente a lo que yo le indicaba, el orden, la complejidad y los desafíos constantes que traía consigo, desataron en mí una chispa que no se apagó más. Decidí que no me iba a quedar en la superficie: tenía que escarbar más y más en el desarrollo de software.
```

#### Sección 3: `escuela-frustracion`
```
Cuando me metí de lleno en este mundo, decidí arrancar con JavaScript. Me fascinaba, pero pronto aparecieron las primeras paredes: dominar el Async/Await o entender a fondo el Event Loop me costaron noches de cabeza. Pero mi hambre de aprender era más grande. Quise ir más profundo y me incliné hacia el backend, sumando Node.js, Express, Next.js y Jest. A medida que avanzaba, el juego se volvía más complejo: arquitecturas intrincadas, bases de datos y WebSockets. En ese entonces, no contaba con la ayuda de copilotos de IA; resolver un error significaba pasar horas y horas investigando en foros y documentación. Hoy agradezco ese camino, porque me enseñó a pensar y moldeó mi criterio para resolver problemas complejos de forma autónoma.

Pero el desafío no fue solo de software, sino también de hardware. Empecé a programar con una computadora de recursos limitados que no me hacía las cosas fáciles. En lugar de rendirme, busqué alternativas y me topé con Linux. Esa necesidad se transformó en otra pasión: tener el control total del sistema operativo y entender que con un solo comando podía arreglarlo todo (o romperlo todo) me atrapó por completo. Así resolví mi limitación técnica y, al día de hoy, Linux sigue siendo mi entorno de desarrollo principal.
```

#### Sección 4: `presente`
```
El hambre de ir más allá me llevó a cruzar la vereda y dominar también el Frontend, convirtiéndome en desarrollador Full Stack. Hoy en día, combino la solidez del backend con interfaces dinámicas utilizando React y Angular como mis grandes fuertes. Para respaldar esta pasión con bases académicas, actualmente curso la Tecnicatura Universitaria en Programación en la UTN Avellaneda, mientras sigo expandiendo mis límites de forma activa en plataformas como Udemy y FreeCodeCamp.

Mi stack principal se apoya en Python, JavaScript y Node.js. Me especializo en construir aplicaciones robustas de punta a punta: desde el diseño de APIs REST escalables con NestJS, TypeScript y Express, hasta la creación de aplicaciones móviles con React Native. No me quedo solo en escribir código que funcione; me obsesiona la calidad del software. Por eso aplico estándares de Clean Code, aseguro la estabilidad con testing en Jest, contengo con Docker y gestiono despliegues en AWS con pipelines de CI/CD, optimizando mi productividad con herramientas de IA como Cursor y Claude.

Me entusiasman los proyectos desafiantes, ya sea optimizando sistemas de gestión comercial o diseñando arquitecturas limpias desde cero. Mi meta a corto y mediano plazo es integrarme a un equipo de desarrollo donde pueda aportar mi mentalidad detallista y resolutiva, afrontando nuevos desafíos tecnológicos mientras sigo creciendo profesionalmente.
```

---

## 3. Componente: Table of Contents (Índice Navegable)

### 3.1 Comportamiento General

**Propósito:** Permitir navegación rápida entre secciones y indicar progreso de lectura.

**Trigger:** 
- Desktop: siempre visible como sidebar sticky
- Mobile: botón de toggle "Índice" que abre un Sheet/Drawer

### 3.2 Layout Responsive

#### Desktop (≥1024px)
```
┌─────────────────────────────────────────────────────────┐
│  Header (global)                                         │
├──────────────┬──────────────────────────────────────────┤
│              │  [H1] Sobre Ian                          │
│  [TOC]       │                                          │
│  • Quién soy │  [H2] De la lógica al código...         │
│  • Giro...   │  [Contenido sección 1]                   │
│  • Escuela...│                                          │
│  • Presente  │  [H2] El giro de timón...                │
│  (sticky)    │  [Contenido sección 2]                   │
│              │                                          │
│              │  [H2] La escuela de la frustración...    │
│              │  [Contenido sección 3]                   │
│              │                                          │
│              │  [H2] El presente...                     │
│              │  [Contenido sección 4]                   │
│              │                                          │
│              │  [CV Download Button]                    │
└──────────────┴──────────────────────────────────────────┘
```

- **Ancho TOC:** 240px
- **Gap entre TOC y contenido:** 64px
- **Posición:** Sticky, top offset 32px
- **Scroll independiente del contenido principal

#### Tablet (768px–1023px)
- **Ancho TOC:** 200px
- **Gap:** 48px
- Mismo comportamiento sticky que desktop

#### Mobile (<768px)
```
┌─────────────────────────────────┐
│  Header (global)                │
├─────────────────────────────────┤
│  [H1] Sobre Ian                 │
│  [Btn Índice] ──────────────┐   │
│                                 │   │
│  [H2] De la lógica al código... │   │
│  [Contenido sección 1]          │   │
│                                 │   │
│  [H2] El giro de timón...       │   │
│  [Contenido sección 2]          │   │
│                                 │   │
│  [H2] La escuela de...          │   │
│  [Contenido sección 3]          │   │
│                                 │   │
│  [H2] El presente...            │   │
│  [Contenido sección 4]          │   │
│                                 │   │
│  [CV Download Button]           │   │
└─────────────────────────────────┘   │
                                      │
         ┌────────────────────────────┘
         │ Sheet: Índice
         │ • Quién soy
         │ • Giro de timón
         │ • Escuela de frustración
         │ • Presente
         └────────────────────────────┘
```

- **Botón toggle:** Icono de lista + texto "Índice", posicionado debajo del H1
- **Sheet:** Se desliza desde la derecha con animación suave
- **Backdrop:** Click fuera cierra el Sheet

### 3.3 Estado Activo y Scroll

**Indicador Visual de Sección Activa:**
- Color de texto: `text-foreground` (activo) vs `text-muted-foreground` (inactivo)
- Indicador lateral: barra vertical de 2px de ancho en color `accent` a la izquierda del item activo
- Scroll spy: la sección visible en el viewport determina el item activo

**Smooth Scroll:**
- Click en item del índice → smooth scroll hacia la sección correspondiente
- Offset: 64px desde el top (para compensar header global)
- Duración: 500ms

**URL Hash:**
- Al navegar a una sección, el hash de la URL se actualiza (ej: `/about#giro-timon`)
- Si la página se carga con hash, scroll automático a la sección correspondiente

### 3.4 Accesibilidad

**ARIA Attributes:**
- Links semánticos con `href="#section-id"`
- `aria-current="page"` en el item activo
- `aria-label="Table of contents"` en el contenedor del TOC
- `aria-controls="toc-sheet"` en el botón de toggle mobile

**Navegación por Teclado:**
- Tab navigation completa a través de todos los items
- Enter/Space activa la navegación
- Focus visible en todos los elementos interactivos
- Escape cierra el Sheet en mobile

**Screen Readers:**
- Anuncio de cambio de sección activa (opcional, live region)
- Labels descriptivos en todos los links

---

## 4. Layout y Tipografía

### 4.1 Contenedor Principal

```tsx
<Container className="py-20">
  <div className="grid lg:grid-cols-[240px_1fr] lg:gap-16">
    {/* TOC Sidebar - Desktop */}
    <aside className="hidden lg:block sticky top-8 h-fit">
      <TableOfContents />
    </aside>

    {/* Contenido Principal */}
    <section className="max-w-3xl">
      {/* Header + Botón Toggle Mobile */}
      <header>
        <p className="text-caption ...">About</p>
        <h1 className="text-display ...">Sobre Ian</h1>
        <TOCToggleButton className="lg:hidden mt-4" />
      </header>

      {/* Secciones de Contenido */}
      <div className="mt-8 flex flex-col gap-12">
        <Section id="quien-soy" heading="De la lógica al código: quién soy">
          {/* contenido */}
        </Section>
        <Section id="giro-timon" heading="El giro de timón: de la medicina al código">
          {/* contenido */}
        </Section>
        <Section id="escuela-frustracion" heading="La escuela de la frustración...">
          {/* contenido */}
        </Section>
        <Section id="presente" heading="El presente: El ecosistema Full Stack...">
          {/* contenido */}
        </Section>
      </div>

      <CVDownloadButton className="mt-10" />
    </section>
  </div>
</Container>
```

### 4.2 Tipografía por Elemento

| Elemento | Token | Tamaño | Weight | Line-height |
|----------|-------|--------|--------|-------------|
| Label "About" | `text-caption` | 12px | 600 (semibold) | 1.5 |
| H1 "Sobre Ian" | `text-display` | 48px | 700 (bold) | 1.1 |
| H2 Secciones | `text-h2` | 32px | 600 (semibold) | 1.2 |
| Párrafos | `text-body-lg` | 18px | 400 (regular) | 1.7 |
| TOC Items | `text-body` | 16px | 400 (regular) | 1.5 |

### 4.3 Espaciado

- **Gap entre secciones:** 48px (12 en Tailwind)
- **Margin top del contenido:** 32px (8 en Tailwind)
- **Padding del contenedor:** 80px vertical (20 en Tailwind)
- **Gap TOC ↔ contenido:** 64px (16 en Tailwind)

---

## 5. Tokens de Diseño y Colores

### 5.1 Colores

**TOC Item States:**
- **Inactivo:** `text-muted-foreground` (foreground con 60% opacidad)
- **Activo:** `text-foreground` (foreground full)
- **Hover:** `text-foreground` + underline sutil
- **Indicador activo:** `bg-accent` (color accent del tema)

**Botón Toggle Mobile:**
- **Default:** `bg-muted` + `text-foreground`
- **Hover:** `bg-muted/80`
- **Active (Sheet abierto):** `bg-accent` + `text-accent-foreground`

### 5.2 Motion y Animaciones

**Smooth Scroll:**
```css
html {
  scroll-behavior: smooth;
}
```

**Sheet Animation (Mobile):**
- Entrada: slide-in desde derecha, 300ms, ease-out
- Salida: slide-out hacia derecha, 250ms, ease-in
- Backdrop: fade-in 200ms

**Indicador Activo:**
- Transición de color: 150ms, ease-out
- Transición de posición del indicador: 200ms, ease-out

**Respect `prefers-reduced-motion`:**
- Desactivar smooth scroll si el usuario prefiere reducción de movimiento
- Desactivar animaciones del Sheet (instantáneo)

---

## 6. Componentes a Crear/Modificar

### 6.1 Nuevos Componentes

1. **`TableOfContents`** (`src/components/content/TableOfContents.tsx`)
   - Client component (usa useState + useEffect para scroll spy)
   - Props: `sections: { id: string; title: string }[]`
   - Responsivo: sidebar desktop, sheet mobile

2. **`TOCToggleButton`** (`src/components/content/TOCToggleButton.tsx`)
   - Client component
   - Props: `onClick: () => void`, `isOpen: boolean`
   - Icono: List icon de lucide-react

3. **`AboutSection`** (`src/components/content/AboutSection.tsx`)
   - Server component
   - Props: `id: string`, `heading: string`, `children: ReactNode`
   - Wrapper con ID para scroll y heading H2

### 6.2 Componentes a Modificar

1. **`src/app/about/page.tsx`**
   - Reemplazar `bioSections.map()` con las nuevas secciones estáticas
   - Integrar `TableOfContents` y `TOCToggleButton`
   - Mantener `CVDownloadButton`

2. **`src/lib/data/personal.ts`**
   - Opción A: Reemplazar `bioSections` con nueva estructura `aboutSections`
   - Opción B: Crear archivo separado `src/lib/data/about.ts` para contenido narrativo
   - **Recomendación:** Opción B para separar datos del portfolio vs contenido narrativo

---

## 7. Datos Estructurados

### 7.1 Schema Propuesto (`src/lib/data/about.ts`)

```ts
export const aboutSections = [
  {
    id: "quien-soy",
    heading: "De la lógica al código: quién soy",
    content: `Me llamo Ian Vazquez...`,
  },
  {
    id: "giro-timon",
    heading: "El giro de timón: de la medicina al código",
    content: `Durante mucho tiempo...`,
  },
  {
    id: "escuela-frustracion",
    heading: "La escuela de la frustración (y cómo la convertí en mi ventaja)",
    content: `Cuando me metí de lleno...`,
  },
  {
    id: "presente",
    heading: "El presente: El ecosistema Full Stack y mis próximas metas",
    content: `El hambre de ir más allá...`,
  },
] as const;
```

---

## 8. Consideraciones Técnicas

### 8.1 Scroll Spy Implementation

**Approach:** Intersection Observer API

```ts
// Pseudocódigo
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  },
  { threshold: 0.5 } // Sección activa cuando 50% visible
);
```

**Fallback:** Si Intersection Observer no está disponible, usar scroll event listener con throttling.

### 8.2 URL Hash Handling

- On mount: verificar `window.location.hash` y scroll a la sección
- On hash change: scroll a la sección correspondiente
- On scroll: actualizar hash sin causar scroll loop (usar `history.replaceState`)

### 8.3 Mobile Sheet

Usar `shadcn/ui` Sheet component (ya disponible en el proyecto según project-context.md).

---

## 9. Edge Cases y Validaciones

### 9.1 Edge Cases

1. **Sección muy corta:** Si una sección tiene menos altura que el viewport, el scroll spy puede activar múltiples secciones. Solución: usar `rootMargin` en Intersection Observer para priorizar la sección más centrada.

2. **Scroll rápido:** El usuario scrollea rápidamente → scroll spy puede saltar secciones. Solución: debounce de 100ms en la actualización del estado activo.

3. **Mobile con teclado físico:** El Sheet debe cerrarse al presionar Escape.

4. **URL hash inválido:** Si el hash no corresponde a ninguna sección, scroll al top de la página.

### 9.2 Validaciones

- [ ] TOC funciona en desktop (sticky, scroll independiente)
- [ ] TOC funciona en mobile (Sheet, toggle, backdrop)
- [ ] Scroll spy actualiza correctamente el item activo
- [ ] Smooth scroll funciona en todos los navegadores
- [ ] URL hash se actualiza al navegar
- [ ] Navegación por teclado completa
- [ ] `prefers-reduced-motion` respeta las preferencias del usuario
- [ ] CV Download Button sigue funcional
- [ ] Metadata SEO se mantiene correcta

---

## 10. Métricas de Éxito

- **Legibilidad:** El contenido es fácil de leer con el espaciado propuesto (line-height 1.7, gap 48px entre secciones)
- **Navegabilidad:** El usuario puede saltar a cualquier sección en ≤ 2 clicks
- **Discoverability:** El índice es visible sin effort en desktop, discoverable en mobile
- **Performance:** El scroll spy no impacta el scroll performance (60fps)
- **Accesibilidad:** WCAG 2.1 AA compliance en navegación y focus states

---

## 11. Próximos Pasos

1. **Revisión por Ian:** Validar que el contenido narrativo refleja su voz y que la estructura de secciones tiene sentido
2. **Aprobación de diseño:** Confirmar que el layout responsive y el comportamiento del TOC cumplen sus expectativas
3. **Handoff a arquitectura:** Winston (bmad-agent-architect) debe validar que la implementación propuesta es consistente con la arquitectura existente
4. **Handoff a implementación:** Amelia (bmad-agent-dev) o Mimir (wds-agent-mimir-builder) implementarán según estas especificaciones

---

**Fin de especificaciones UX**
