# Theme toggle manual test

## Default por sistema

1. Abrir DevTools.
2. Borrar `localStorage.theme`.
3. Emular `prefers-color-scheme: dark`.
4. Recargar la página.
5. Verificar que `<html>` tenga la clase `dark`.

## Persistencia tras reload

1. Usar el botón del header para cambiar a tema claro u oscuro.
2. Verificar que `localStorage.theme` tenga el valor seleccionado.
3. Recargar la página.
4. Verificar que `<html>` conserva la clase seleccionada.

## Ausencia de flash

1. Guardar `localStorage.theme = "dark"`.
2. Recargar la página con throttling de CPU/red.
3. Verificar que la primera pintura ya usa el tema oscuro y que no aparece un frame claro previo.
