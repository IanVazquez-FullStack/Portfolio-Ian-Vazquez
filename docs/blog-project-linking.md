# Patrón de enlaces entre Blog y Proyectos

Este documento describe cómo conectar artículos del blog con proyectos del portfolio y viceversa.

## Blog → Proyecto

Para enlazar un post a un proyecto relacionado, usar un link relativo de Markdown dentro del contenido MDX:

```mdx
Podés ver el proyecto completo en la [página de portfolio-ian](/projects/portfolio-ian).
```

La ruta siempre comienza con `/projects/` seguida del slug del proyecto.

## Proyecto → Blog (futura iteración)

Para mostrar un CTA inverso desde la página de un proyecto hacia un post relacionado, se propone agregar un campo opcional al frontmatter del proyecto:

```yaml
title: "Portfolio Ian"
slug: "portfolio-ian"
# ... otros campos
relatedPost: "endpoint-contacto-seguro"
```

El campo `relatedPost` contendría el slug del post relacionado. El componente de página de proyecto podría leer este campo y renderizar un link dinámico al post.

## Convenciones

- Los slugs siempre usan `kebab-case`.
- Los links internos usan rutas absolutas comenzando con `/`.
- No usar URLs completas con dominio para links internos; esto permite que funcionen correctamente en cualquier entorno (local, preview, producción).
