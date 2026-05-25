# Story 4.4: Implementar página individual /blog/[slug] con navegación prev/next

Status: ready-for-dev

## Story

As a lector del blog,
I want leer un artículo con tipografía cuidada y navegar al siguiente sin volver al listado,
so that pueda profundizar y descubrir más.

## Acceptance Criteria

1. **Given** el pipeline MDX de Story 4.2 y el loader de Story 4.1, **When** se implementa `src/app/blog/[slug]/page.tsx` con `generateStaticParams()`, **Then** cada post se pre-renderiza estáticamente (FR-12).
2. La página muestra `h1` con el título, metadata (fecha, tiempo de lectura, tags), contenido MDX vía `MDXComponents` y al final navegación "← Anterior" / "Siguiente →" hacia posts adyacentes en orden cronológico.
3. Existe link "← Volver al blog" arriba (UX-DR14).
4. Slug inexistente devuelve `notFound()`.
5. La página es Server Component (AR-07).

## Tasks / Subtasks

- [ ] Crear `src/app/blog/[slug]/page.tsx` (AC: #1, #4, #5)
  - [ ] `export async function generateStaticParams()`: retorna slugs de `getBlogPosts()`
  - [ ] Llamar `getBlogPostBySlug(slug)`, `notFound()` si null
  - [ ] Metadata básica (refinada en Epic 6)
- [ ] Implementar layout del artículo (AC: #2)
  - [ ] `<h1>{post.title}</h1>` único
  - [ ] Metadata bar: fecha formateada (`formatDate`), tiempo de lectura, tags como `Badge`
  - [ ] Renderizar contenido MDX con `MDXComponents`
- [ ] Implementar navegación prev/next (AC: #2)
  - [ ] Obtener todos los posts ordenados: `getBlogPosts()`
  - [ ] Encontrar índice del post actual, extraer prev/next
  - [ ] Renderizar links "← {prev.title}" y "{next.title} →" al final del artículo
- [ ] Agregar link "← Volver al blog" en el header de la página (AC: #3)

## Dev Notes

- **`generateStaticParams()` para blog:**
  ```ts
  export async function generateStaticParams() {
    const posts = await getBlogPosts(); // excluye drafts en prod
    return posts.map(p => ({ slug: p.slug }));
  }
  ```
- **Prev/Next cronológico:** `getBlogPosts()` ya devuelve ordenado por `publishedAt` desc. El post anterior en la lista es el más reciente publicado antes, el siguiente es el más antiguo posterior. Definir claramente: "anterior" = publicado antes (índice + 1 en array desc), "siguiente" = publicado después (índice - 1 en array desc).
- **`notFound()`:** Importar de `next/navigation`. Llamar si `getBlogPostBySlug()` retorna `null`.
- **`MDXComponents`:** Ya definido en Story 4.2. Importar y pasar al renderizador MDX.
- **Tipografía del artículo:** Usar clase `prose` de Tailwind Typography plugin (`@tailwindcss/typography`) para el cuerpo del artículo. Si no está instalado, instalarlo: `npm install @tailwindcss/typography`.
- **Link "Volver al blog":** `<Link href="/blog">← Volver al blog</Link>` en la parte superior (UX-DR14).
- **Server Component:** Toda la página puede ser Server Component. No se necesita estado cliente.

### Project Structure Notes

```
src/app/blog/[slug]/
  page.tsx    ← generateStaticParams + Server Component
```

### Referencias

- [Source: _bmad-output/planning-artifacts/epics.md#Story 4.4]
- [Source: _bmad-output/planning-artifacts/epics.md#FR-12, UX-DR14]
- [Source: _bmad-output/project-context.md#Server vs Client Components]

## Dev Agent Record

### Agent Model Used

_pending_

### Debug Log References

### Completion Notes List

### File List
