# TaskMove — web estilo Atmos (rebranding del template Framer)

Rebranding completo del sitio de referencia `atmos-system.framer.website` con la voz
de TaskMove (español, dueño de negocio) y su logo, **manteniendo todas las animaciones**.

## Ver la web

```bash
node serve.mjs
# → http://localhost:4173
```

(No abrir `index.html` con doble clic: los módulos ES necesitan un servidor HTTP.)

## Cómo funciona

- `index.html` — HTML SSR parcheado (textos ES, logo, metas, favicon).
- `modules/` — los 17 bundles JS de Framer **auto-hospedados y parcheados** con los
  mismos textos. Esto es clave: si los textos solo se cambian en el HTML, la
  hidratación de React los revierte al contenido original de Atmos.
- `logo.jpeg` — logo TaskMove (favicon, og:image y bloque de marca del footer,
  inyectado vía CSS en `<head>` para sobrevivir a la hidratación).
- `patch.mjs` — script que regenera todo desde
  `../atmos-system.framer.website-source.html` (tabla de reemplazos EN→ES dentro).
  Para ajustar un texto: editar la tabla y correr `node patch.mjs`
  (⚠️ re-descarga NO: los módulos se parchean en sitio; si se corre dos veces,
  los reemplazos ya aplicados simplemente no encuentran match — es idempotente).

## Detalles técnicos

- Párrafo del hero: animación palabra-por-palabra → la traducción tiene
  exactamente 28 palabras, igual que el original (mapeo posicional).
- Wordmarks gigantes "TASKMOVE" (hero): fit-text de Framer; los `viewBox` se
  escalaron ×1.7 ("TaskMove" es más ancho que "Atmos").
- CTAs "Pedir una demo" → `mailto:jeicobhiroshi@gmail.com`.
- Se quitó la analítica del sitio original (events.framer.com) y los
  search-index de Framer. Se conservó la atribución del template
  (Created by Liana Tudakova) — verificar licencia del template antes de
  publicar en producción.

QA verificado 2026-07-15: hero, 9 secciones, FAQ (acordeón funciona), footer con
logo, móvil 375px, consola sin errores fatales (solo mismatch recuperable del
reloj, presente también en el original).
