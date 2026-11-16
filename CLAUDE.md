@AGENTS.md

# La Torre del Guayaibí — convenciones del proyecto

## Idiomas (obligatorio)
- El sitio es bilingüe: español (`/es`, por defecto) e inglés (`/en`). Todas las rutas viven en `src/app/[lang]/`.
- **Todo texto visible nuevo va en ambos idiomas**: agregarlo a `src/i18n/dictionaries/es.ts` y `en.ts`
  (incluye `alt` de imágenes, `aria-label`, placeholders, mensajes de error y metadata). Nunca hardcodear texto en componentes.
- `en.ts` está tipado con la forma de `es.ts`: si falta una clave, el build falla.
- Server Components: `getDictionary()` / `getLocale()` de `@/i18n/getDictionary`.
  Client Components: recibir `lang` y la parte del diccionario (`t`) por props.
- Links internos siempre con `localizePath(lang, "/ruta")` de `@/i18n/config`.
- `src/proxy.ts` redirige rutas sin idioma y recuerda el último idioma en la cookie `NEXT_LOCALE`.

## Estilos
- Sass (no Tailwind). Tokens y mixins en `src/styles/abstracts/` (`@use "abstracts" as *;` en cada `.module.scss`).
- Seguir el design system: colores, tipografías y componentes ya definidos como variables/mixins.
- En Turbopack los CSS Modules no aceptan bloques `:global { }`: usar `:global(.clase)` por selector.
