---
marp: true
theme: custom
paginate: true
backgroundColor: #0f172a
color: #f8fafc
style: |
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  
  :root {
    --primary: #3b82f6;
    --secondary: #8b5cf6;
    --accent: #06b6d4;
    --bg-dark: #0f172a;
    --bg-card: #1e293b;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
  }
  
  section {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, var(--bg-dark) 0%, #1e1b4b 100%);
    background-size: cover;
  }
  
  h1 {
    color: var(--text-primary);
    font-weight: 800;
    font-size: 3em;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  h2 {
    color: var(--text-primary);
    font-weight: 700;
    font-size: 2.2em;
    border-bottom: 3px solid var(--primary);
    padding-bottom: 0.5em;
    margin-bottom: 1em;
  }
  
  h3 {
    color: var(--primary);
    font-weight: 600;
    font-size: 1.5em;
  }
  
  strong {
    color: var(--accent);
    font-weight: 600;
  }
  
  code {
    background: var(--bg-card);
    color: var(--accent);
    padding: 0.2em 0.5em;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
  }
  
  pre {
    background: var(--bg-card);
    padding: 1.5em;
    border-radius: 8px;
    border: 1px solid var(--primary);
  }
  
  pre code {
    background: transparent;
    color: var(--text-primary);
    padding: 0;
  }
  
  ul, ol {
    color: var(--text-secondary);
    line-height: 1.8;
  }
  
  li {
    margin: 0.5em 0;
  }
  
  blockquote {
    border-left: 4px solid var(--primary);
    background: var(--bg-card);
    padding: 1em 1.5em;
    margin: 1.5em 0;
    color: var(--text-secondary);
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1.5em 0;
  }
  
  th, td {
    border: 1px solid var(--primary);
    padding: 0.75em;
    text-align: left;
  }
  
  th {
    background: var(--bg-card);
    color: var(--primary);
    font-weight: 600;
  }
  
  a {
    color: var(--accent);
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  .highlight {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    padding: 0.1em 0.3em;
    border-radius: 4px;
    color: white;
  }
  
  .card {
    background: var(--bg-card);
    padding: 1.5em;
    border-radius: 12px;
    border: 1px solid var(--primary);
    margin: 1em 0;
  }
  
  .metric {
    font-size: 2em;
    font-weight: 700;
    color: var(--accent);
  }
  
  .metric-label {
    color: var(--text-secondary);
    font-size: 0.9em;
  }
  
  /* Slide numbers */
  footer {
    color: var(--text-secondary);
    font-size: 0.8em;
  }
---

# Portfolio Ian Vazquez - Presentación del Proyecto

---

## Slide 1: Título

# Portfolio Personal Ian Vazquez

### Desarrollo Full-Stack con Next.js 16 y Stack Moderno

<div class="card">

**Ian Vazquez**
*Desarrollador Full-Stack*

</div>

---

<div style="display: flex; gap: 2em; margin-top: 2em;">
<div style="flex: 1; text-align: center;">
<div class="metric">16</div>
<div class="metric-label">Slides</div>
</div>
<div style="flex: 1; text-align: center;">
<div class="metric">95+</div>
<div class="metric-label">Lighthouse Score</div>
</div>
<div style="flex: 1; text-align: center;">
<div class="metric">11s</div>
<div class="metric-label">Startup Time</div>
</div>
</div>

---

## Slide 2: Resumen del Proyecto

## ¿Qué es este proyecto?

Portfolio personal de alto rendimiento diseñado para showcase de proyectos y blog profesional.

### Características Principales:
- 🎨 Diseño moderno y responsive
- 📝 Sistema de blog con MDX
- 🚀 Optimizado para performance
- ✨ Animaciones fluidas
- 📧 Formulario de contacto funcional
- 🧪 Testing automatizado

---

## Slide 3: Stack Tecnológico

## Stack Tecnológico

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5em;">

<div class="card">
<h3>Frontend Core</h3>
<ul>
<li><strong>Next.js 16</strong> - App Router con RSC</li>
<li><strong>React 19</strong> - Latest performance</li>
<li><strong>TypeScript 5</strong> - Strict mode</li>
<li><strong>Tailwind CSS 4</strong> - Modern design</li>
</ul>
</div>

<div class="card">
<h3>Animaciones & UX</h3>
<ul>
<li><strong>Framer Motion 12</strong> - Declarative animations</li>
<li><strong>Radix UI</strong> - Accessible components</li>
<li><strong>Lucide React</strong> - Modern icons</li>
</ul>
</div>

<div class="card">
<h3>Content & Forms</h3>
<ul>
<li><strong>MDX 3</strong> - Markdown + JSX</li>
<li><strong>React Hook Form + Zod</strong> - Validation</li>
<li><strong>Resend</strong> - Transactional emails</li>
</ul>
</div>

<div class="card">
<h3>Testing & CI/CD</h3>
<ul>
<li><strong>Playwright</strong> - E2E testing</li>
<li><strong>Vitest</strong> - Unit testing</li>
<li><strong>GitHub Actions</strong> - Automated CI/CD</li>
</ul>
</div>

</div>

---

## Slide 4: Arquitectura del Proyecto

## Arquitectura

### Estructura de Carpetas:
```
src/
├── app/              # Next.js App Router
│   ├── (pages)/      # Páginas públicas
│   ├── api/          # API Routes
│   └── layout.tsx    # Layout raíz
├── components/       # Componentes React
│   ├── ui/          # Primitivas visuales
│   ├── layout/      # Header, Footer
│   ├── sections/    # Secciones de páginas
│   └── forms/       # Formularios
├── lib/             # Utilidades
│   ├── content/     # Loaders MDX
│   ├── email/       # Lógica de email
│   └── seo/         # Metadata helpers
└── styles/          # Estilos globales
```

---

## Slide 5: Características Técnicas

## Características Técnicas

### Performance:
- ⚡ Next.js 16 con Turbopack
- 🖼️ Optimización automática de imágenes
- 📦 Code splitting automático
- 🎯 Server Components por defecto

### SEO & Accesibilidad:
- 🔍 Metadata API dinámica
- 📱 Responsive design
- ♿ Componentes accesibles (Radix UI)
- 🗺️ Sitemap automático

### Developer Experience:
- 🎨 Tailwind CSS con custom tokens
- 📝 TypeScript estricto
- 🔄 Hot reload instantáneo
- 🧪 Testing integrado

---

## Slide 6: Sistema de Contenido MDX

## Sistema de Contenido con MDX

### ¿Por qué MDX?
- Markdown + JSX en un solo archivo
- Componentes React interactivos en contenido
- Frontmatter para metadata
- Soporte para código con syntax highlighting

### Implementación:
```typescript
// Loader personalizado para MDX
import { compile, run } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
```

### Características:
- 📝 Blog posts con frontmatter
- 💻 Code blocks con syntax highlighting
- 🎨 Temas personalizados (GitHub Dark/Light)
- 📊 Tablas con GFM support

---

## Slide 7: Formulario de Contacto

## Formulario de Contacto

### Stack de Validación:
- **React Hook Form** - Manejo de formularios
- **Zod** - Schema validation
- **Resend API** - Envío de emails

### Flujo de Validación:
1. Validación en cliente (Zod)
2. Submit a API Route de Next.js
3. Validación en servidor
4. Envío de email via Resend
5. Feedback al usuario

### Seguridad:
- ✅ Rate limiting
- ✅ Validación de email
- ✅ Sanitización de inputs
- ✅ Environment variables protegidas

---

## Slide 8: Testing & QA

## Testing Automatizado

### E2E Testing con Playwright:
- 🎭 Tests de navegación
- 📱 Tests responsive
- 🌐 Tests de accesibilidad
- 📸 Visual regression testing

### Unit Testing con Vitest:
- ⚡ Tests rápidos
- 📊 Coverage reports
- 🔧 Mocking de dependencias

### CI/CD Pipeline:
```yaml
- npm ci
- npm run lint
- tsc --noEmit
- npm run build
- playwright test
```

---

## Slide 9: Deploy & DevOps

## Deploy & DevOps

### Hosting:
- **Vercel** - Deploy automático
- **Edge Network** - CDN global
- **Preview Deployments** - Para PRs

### CI/CD:
- **GitHub Actions** - Pipeline automatizado
- **Branch Protection** - Reglas de merge
- **Automated Tests** - Tests en cada PR

### Environment Variables:
- 🔐 Variables protegidas en Vercel
- 🔄 Rotación de secrets
- 📝 .env.example para documentación

---

## Slide 10: Métricas de Performance

## Métricas de Performance

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5em; margin: 2em 0;">

<div class="card">
<h3>Build Time</h3>
<div class="metric">11s</div>
<div class="metric-label">Cold Start</div>
<div class="metric">&lt;1s</div>
<div class="metric-label">Hot Reload</div>
<div class="metric">79s</div>
<div class="metric-label">Production Build</div>
</div>

<div class="card">
<h3>Lighthouse Scores</h3>
<div class="metric">95+</div>
<div class="metric-label">Performance</div>
<div class="metric">100</div>
<div class="metric-label">Accessibility</div>
<div class="metric">100</div>
<div class="metric-label">SEO</div>
</div>

</div>

### Bundle Size:
- **JavaScript:** Optimizado con code splitting
- **CSS:** Purged con Tailwind
- **Images:** Optimizadas automáticamente

---

## Slide 11: Desafíos y Soluciones

## Desafíos y Soluciones

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5em;">

<div class="card">
<h3>Performance</h3>
<p><strong>Problema:</strong> 93s startup</p>
<p><strong>Solución:</strong> `"type": "module"`</p>
<p><strong>Resultado:</strong> <span class="highlight">88% mejora</span></p>
</div>

<div class="card">
<h3>MDX Integration</h3>
<p><strong>Problema:</strong> Config compleja</p>
<p><strong>Solución:</strong> Custom loader</p>
<p><strong>Resultado:</strong> Sistema flexible</p>
</div>

<div class="card">
<h3>Form Testing</h3>
<p><strong>Problema:</strong> Email dependency</p>
<p><strong>Solución:</strong> API mocking</p>
<p><strong>Resultado:</strong> Full coverage</p>
</div>

</div>

---

## Slide 12: Mejoras Futuras

## Roadmap de Mejoras

### Short-term:
- [ ] PWA support para offline access
- [ ] Analytics con Plausible
- [ ] Dark mode toggle persistente
- [ ] Search con Algolia

### Medium-term:
- [ ] CMS headless (Sanity/Contentful)
- [ ] Multi-language support (i18n)
- [ ] Comments system (giscus)
- [ ] Newsletter subscription

### Long-term:
- [ ] E-commerce para productos digitales
- [ ] AI-powered content suggestions
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)

---

## Slide 13: Aprendizajes

## Aprendizajes del Proyecto

### Técnicos:
- ✅ Next.js 16 App Router patterns
- ✅ React Server Components best practices
- ✅ TypeScript advanced typing
- ✅ Performance optimization techniques
- ✅ Testing strategies for full-stack apps

### Soft Skills:
- 🎯 Project planning and execution
- 📚 Documentation habits
- 🤝 Open source contribution
- 🔄 CI/CD pipeline setup
- 📊 Metrics-driven development

---

## Slide 14: Enlaces y Recursos

## Enlaces y Recursos

### Repositorio:
🔗 https://github.com/oneConnor/Portfolio-Ian-Vazquez

### Deploy en Producción:
🌐 https://portfolio-ian.vercel.app

### Documentación:
📖 README.md con setup completo
📋 Convenciones de código en `_bmad-output/`

### Stack References:
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

## Slide 15: Q&A

# ¿Preguntas?

### Ian Vazquez
*Desarrollador Full-Stack*

📧 ian.vazquez@example.com
🔗 linkedin.com/in/ianvazquez
🐦 @ianvazquez

---

## Slide 16: Gracias

# ¡Gracias!

### Portfolio Ian Vazquez

**Desarrollado con ❤️ usando Next.js 16, TypeScript y Tailwind CSS**

---

## Notas para el Presentador

### Tips para la presentación:
1. **Tiempo estimado:** 10-15 minutos
2. **Enfoque:** Destaca el stack moderno y las mejores prácticas
3. **Demo:** Muestra el portfolio en vivo si es posible
4. **Q&A:** Prepárate para preguntas sobre arquitectura y performance

### Puntos clave a resaltar:
- Migración de npm a pnpm (mejora de performance)
- Next.js 16 con React Server Components
- Sistema de testing automatizado
- CI/CD pipeline profesional
- Optimización de bundle size

### Recursos visuales sugeridos:
- Screenshots del portfolio
- Diagramas de arquitectura
- Gráficos de performance
- Capturas de tests en CI/CD
