// Rebranding Atmos → TaskMove sobre el export de Framer.
// Regenera index.html y parchea modules/ (texto en backticks) manteniendo
// las animaciones: el bundle se auto-hospeda para que la hidratación de React
// no revierta los textos. Correr con: node patch.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const SRC_HTML = path.join(ROOT, '..', 'atmos-system.framer.website-source.html');
const OUT_HTML = path.join(ROOT, 'index.html');
const MODULES = path.join(ROOT, 'modules');
const CDN = 'https://framerusercontent.com/sites/7r57ihs2DIztHlrPHq6b91/';

const MAILTO = 'mailto:jeicobhiroshi@gmail.com?subject=Quiero%20una%20demo%20de%20TaskMove';

// ---------- Tabla de reemplazos (EN exacto → ES voz TaskMove) ----------
const T = [
  // Nav / global
  ['System active', 'Sistema activo'],
  ['Join waitlist', 'Pedir una demo'],
  // Hero
  ['Unified system for global environment', 'Automatización con IA para tu negocio'],
  // Cómo funciona
  ['How it works', 'Cómo funciona'],
  ['Manage your climate data from source to insights', 'Tu atención al cliente, del primer mensaje a la venta'],
  ['Collect data, process it through analysis, and surface key metrics you can track.', 'El agente recibe cada mensaje, responde con tu catálogo y te muestra las métricas que importan.'],
  ['Data Collection', 'Canales conectados'],
  ['Collect emissions and environmental data from sensors, infrastructure, and external sources in real time.', 'Tu WhatsApp, Telegram o web conectados a un solo agente que responde al instante, a toda hora.'],
  ['System Analysis', 'Cerebro con IA'],
  ['Analyze environmental performance, detect patterns, and monitor system behavior continuously.', 'Entiende qué pide cada cliente, cotiza con tus precios reales y te deriva la conversación cuando hace falta.'],
  ['Live Metrics', 'Métricas en vivo'],
  ['Carbon Output', 'Ventas del día'],
  ['Energy Usage', 'Chats atendidos'],
  ['Emission Trends', 'Cotizaciones enviadas'],
  ['Climate Signals', 'Seguimientos activos'],
  // Asistente IA
  ['AI Assistant', 'Asistente IA'],
  ['Interact with your data and get answers instantly', 'Pregúntale a tu negocio y entiende tus ventas al instante'],
  ['Ask questions, explore patterns, and understand energy, emissions, and systems.', 'Consulta ventas, cotizaciones y seguimientos en lenguaje natural, como en un chat.'],
  ['File', 'Archivo'], ['Edit', 'Edición'], ['View', 'Ver'], ['Window', 'Ventana'],
  ['Fri 28 Mar 12:58', 'Vie 28 Mar 12:58'],
  ['Overview', 'Resumen'], ['Live Data', 'En vivo'], ['Analytics', 'Analítica'],
  ['Reports', 'Reportes'], ['Assistant', 'Asistente'], ['Settings', 'Ajustes'],
  ['Climate Intelligence', 'Inteligencia comercial'],
  ['version 2.1', 'versión 2.1'],
  ['What is the current energy distribution across sources in North America?', '¿Cómo van las ventas y las cotizaciones de esta semana?'],
  ['North America shows a balanced but solar-led energy distribution across its energy infrastructure.', 'Buena semana: las cotizaciones suben y la mayoría de consultas llega por WhatsApp.'],
  ['Energy grid activity as of Mar 2026', 'Actividad comercial · Mar 2026'],
  ['Solar Farm #04', 'Cotizaciones enviadas'],
  ['124 MW', '124'],
  ['Offshore Wind', 'Chats atendidos'],
  ['89 MW', '89'],
  ['Hydro Station', 'Ventas cerradas'],
  ['8 MW', '8'],
  ['Would you like me to generate a detailed report based on this data?', '¿Te envío el reporte detallado a tu WhatsApp?'],
  ['Ask about climate insights...', 'Pregunta por tus ventas...'],
  ['Data is updated in real time', 'Datos actualizados en tiempo real'],
  // Todo en un lugar (bento)
  ['Unified System', 'Todo en un solo lugar'],
  ['Bring all your data together into one clear system', 'Todo tu negocio en un solo panel claro'],
  ['Combine your data from different sources into one place you can actually use.', 'Chats, cotizaciones y ventas de todos tus canales en un solo lugar que sí usas.'],
  ['Connect all data sources', 'Conecta tus canales'],
  ['Sync data from multiple systems', 'WhatsApp, Telegram y tu web en un solo agente'],
  ['Work as one team', 'Trabaja como un equipo'],
  ['Share insights and act faster', 'Comparte el panel y decide más rápido'],
  ['Catch issues early', 'Detecta ventas en riesgo'],
  ['Spot anomalies before they grow', 'Ningún lead se enfría sin seguimiento'],
  ['Unified system overview', 'Resumen de tu negocio'],
  ['Real-time metrics across all connected sources.', 'Métricas en tiempo real de todos tus canales.'],
  ['42.1 g/kWh', 'S/ 4 280'],
  ['Carbon intensity', 'Vendido hoy'],
  ['1.8k MW', '1.8k'],
  ['Energy usage', 'Chats atendidos'],
  ['2032-2048', '~1 min'],
  ['Net zero target', 'Respuesta promedio'],
  ['Compliance score', 'Satisfacción de clientes'],
  // Tarjeta de equipo
  ['Team member', 'Equipo'],
  ['Open profile', 'Abrir perfil'],
  ['Sofia Novak', 'María González'],
  ['Climate Analyst', 'Asesora comercial'],
  ['Region', 'Zona'],
  ['EU Central (Western Europe)', 'Lima, Perú'],
  ['Responsibility', 'Encargada de'],
  ['Emission monitoring & reporting', 'Cotizaciones y seguimiento'],
  ['View activity', 'Ver actividad'],
  ['Message', 'Mensaje'],
  ['Assign task', 'Asignar tarea'],
  // Tu equipo al mando
  ['Team Workflow', 'Tu equipo al mando'],
  ['Work together across teams and regions in real time', 'Tu equipo y tu agente trabajan juntos en tiempo real'],
  ['Collaborate on data, share insights and align decisions across your entire organization.', 'El agente atiende; tú entras a la conversación cuando quieres y cierras la venta.'],
  ['Share insights across teams', 'Comparte con tu equipo'],
  ['Keep everyone aligned with the same data', 'Todos ven las mismas conversaciones y métricas'],
  ['Collaborate in real time', 'Colabora en tiempo real'],
  ['Work together without delays or silos', 'Interviene en cualquier chat sin demoras'],
  ['Align decisions faster', 'Decide más rápido'],
  ['Turn insights into action instantly', 'Convierte cada consulta en una venta'],
  // Alertas tempranas
  ['Early Alerts', 'Alertas tempranas'],
  ['Detect potential issues before they impact your operations', 'Entérate antes de que una venta se enfríe'],
  ['Stay ahead of risks by identifying anomalies and unusual patterns as they emerge.', 'El agente vigila tus conversaciones y te avisa cuando algo necesita tu atención.'],
  ['Monitor unusual patterns', 'Vigila tus conversaciones'],
  ['Track unexpected changes in your data', 'Detecta clientes sin respuesta o pedidos trabados'],
  ['Get instant alerts', 'Recibe alertas al instante'],
  ['Be notified as soon as something shifts', 'Un aviso apenas algo cambia'],
  ['Act before it escalates', 'Actúa antes de perder la venta'],
  ['Respond early and reduce impact', 'Responde a tiempo y cierra más'],
  ['Monitoring', 'Monitoreo'],
  ['Emissions spike detected', 'Pico de consultas detectado'],
  ['Carbon intensity increased by', 'Las consultas subieron'],
  ['+18% in EU Central (Frankfurt)', '+18% en WhatsApp (esta semana)'],
  ['driven by industrial output over the last 24 hours.', 'impulsadas por tu campaña en las últimas 24 horas.'],
  // Lo que incluye
  ['Core Capabilities', 'Lo que incluye'],
  ['Everything you need to manage your climate data', 'Todo lo que necesitas para vender en automático'],
  ['Monitor, analyze and respond across your entire infrastructure in real time', 'Atiende, cotiza y haz seguimiento en todos tus canales, en tiempo real'],
  ['Connect all sources', 'Todos tus canales'],
  ['Understand patterns', 'Entiende a tus clientes'],
  ['Turn raw data into clear, useful insights', 'Convierte cada chat en información útil para vender'],
  ['Monitor in real time', 'Monitorea en tiempo real'],
  ['Track changes across all systems', 'Sigue cada pedido y cotización al segundo'],
  ['Respond to issues without delay', 'Responde sin demora, a toda hora'],
  // Señales en vivo
  ['Global Signals', 'Señales en vivo'],
  ['Understand what’s happening across the planet', 'Mira lo que pasa en tu negocio, estés donde estés'],
  ['Track emissions, energy and system activity in real time across regions', 'Ventas, chats y seguimientos en tiempo real, desde cualquier lugar'],
  ['Carbon emissions', 'Consultas nuevas'],
  ['Industrial output', 'Cotizaciones'],
  ['Energy demand', 'Seguimientos'],
  ['+18% emissions', '+18% consultas'],
  ['EU Central', 'Lima Centro'],
  ['Stable grid', 'Pedidos al día'],
  ['US West', 'Miraflores'],
  ['+9% surge', '+9% ventas'],
  ['Asia Pacific', 'Arequipa'],
  ['Active regions', 'Zonas activas'],
  // FAQ
  ['Answers to common questions about Atmos', 'Respuestas a las preguntas más comunes sobre TaskMove'],
  ['Clear answers on data collection, analysis, and how climate insights are generated.', 'Respuestas claras sobre el agente, tus datos y cómo empezamos.'],
  ['How is climate data collected?', '¿Cómo atiende el agente a mis clientes?'],
  ['Data is gathered from sensors, infrastructure systems, and external providers, then unified into a single real-time stream.', 'Se conecta a tu WhatsApp o Telegram y responde con la información real de tu negocio: catálogo, precios y horarios.'],
  ['How often is the data updated?', '¿Qué pasa si el agente no sabe qué responder?'],
  ['Data is continuously updated in real time, reflecting live changes across regions and systems.', 'Te deriva la conversación al instante y te avisa, para que ningún cliente se quede sin respuesta.'],
  ['What kind of data can I track?', '¿Qué puedo ver en el panel?'],
  ['You can monitor emissions, energy usage, industrial activity, and environmental signals across multiple regions.', 'Ventas, cotizaciones, chats atendidos y seguimientos pendientes, actualizados en tiempo real.'],
  ['How does the platform generate insights?', '¿Cómo cotiza el agente?'],
  ['The system analyzes incoming data, detects patterns, and highlights meaningful changes you can act on.', 'Usa tu catálogo real, arma la cotización en segundos y la envía en PDF por el mismo chat.'],
  ['Can I connect my own data sources?', '¿Funciona con mi forma de trabajar?'],
  ['Yes, you can integrate your own systems and combine them with external data for a complete view.', 'Sí: el sistema se adapta a tu operación — catálogo, precios y procesos — y no al revés.'],
  ['Is the data reliable?', '¿Mis datos están seguros?'],
  ['Data is validated and processed from multiple sources to ensure accuracy and consistency.', 'Sí: tus datos se validan y viajan protegidos; solo tú y tu equipo los ven.'],
  ['Didn’t find what you were looking for?', '¿No encontraste lo que buscabas?'],
  ['Reach out and we’ll help you get the answers you need.', 'Escríbenos y te ayudamos con lo que necesites.'],
  ['support@atmos.com', 'jeicobhiroshi@gmail.com'],
  // CTA final
  ['Get Started', 'Empieza hoy'],
  ['Start exploring global climate data today', 'Pon tu negocio a vender en automático'],
  ['Global system overview', 'Panel de tu negocio'],
  ['Energy, emissions, and system data in one view.', 'Ventas, chats y seguimientos en una sola vista.'],
  ['Scope 1 & 2 Emissions', 'Ventas y cotizaciones'],
  ['Real-time metrics from global sensor networks.', 'Métricas en vivo de tus canales conectados.'],
  ['JAN', 'ENE'], ['APR', 'ABR'],
  // Contacto / footer
  ['Get in touch', 'Hablemos'],
  ['Reach out for access, questions, or partnerships.', 'Escríbenos para una demo, preguntas o alianzas.'],
  ['Contact Us', 'Contáctanos'],
  ['Explore', 'Explora'],
  ['Home', 'Inicio'], ['About', 'Nosotros'], ['Features', 'Servicios'],
  ['Follow Us', 'Síguenos'],
  ['Privacy Policy', 'Política de privacidad'],
  ['Terms of Service', 'Términos del servicio'],
  ['© 2026 Atmos. All rights reserved.', '© 2026 TaskMove. Todos los derechos reservados.'],
];

// Párrafo hero (stagger palabra por palabra): 28 palabras EN → 28 palabras ES.
const PARA_EN = 'Atmos is a unified system for global infrastructure. We connect climate, emissions, energy, and regional data into one evolving layer that reflects how systems behave in real time.';
const PARA_ES = 'TaskMove es el equipo digital de tu negocio. Conectamos WhatsApp, cotizaciones, seguimiento y reportes en un solo agente con IA que atiende a tus clientes las 24 horas.';
const wEN = PARA_EN.split(' ');
const wES = PARA_ES.split(' ');
if (wEN.length !== wES.length) throw new Error(`word count ${wEN.length} vs ${wES.length}`);

const TITLE_EN = 'Atmos — Climate Data Platform';
const TITLE_ES = 'TaskMove — Automatización con IA para tu negocio';
const DESC_EN = 'Atmos is a real-time climate and energy data platform. Early access available via waitlist.';
const DESC_ES = 'TaskMove construye agentes con IA que atienden tu WhatsApp, cotizan en PDF y hacen seguimiento 24/7. Pide tu demo.';

// viewBox de los wordmarks fit-text: "TaskMove" ≈ 1.7× el ancho de "Atmos"
const VIEWBOXES = [
  ['0 0 1125.62 178', '0 0 1914 178'],
  ['0 0 744.04 118', '0 0 1265 118'],
  ['0 0 332.25 53', '0 0 565 53'],
  ['0 0 1129.65 179', '0 0 1920 179'],
];

const SOCIALS = [
  'https://x.com/liana_tme',
  'https://www.threads.com/@liana.tudakova',
  'https://www.linkedin.com/in/liana-tme/',
  'https://www.instagram.com/liana.tudakova/',
];

const rep = (s, a, b) => s.split(a).join(b);
const escHtml = s => s.replace(/&/g, '&amp;');

// ---------- Módulos ----------
const CONTENT_MODULES = [
  'LadOjlWNGJYXuVHTYGlq0MMV0hyJUUyofEYp1WM1-S4.B_20dwid.mjs',
  'script_main.DdInMlv5.mjs',
  'augiA20Il.BViKfbqn.mjs',
];
let modStats = [];
for (const f of CONTENT_MODULES) {
  const p = path.join(MODULES, f);
  let s = fs.readFileSync(p, 'utf8');
  let hits = 0;
  for (const [en, es] of T) {
    const k = '`' + en + '`';
    if (s.includes(k)) { hits += s.split(k).length - 1; s = rep(s, k, '`' + es + '`'); }
  }
  // párrafo hero, título, descripción, wordmark, viewBoxes, enlaces
  for (const [a, b] of [[PARA_EN, PARA_ES], [TITLE_EN, TITLE_ES], [DESC_EN, DESC_ES],
    ['`Atmos`', '`TaskMove`'], ['`© 2026 Atmos. All rights reserved.`', '`© 2026 TaskMove. Todos los derechos reservados.`'],
    ['./waitlist', MAILTO.replace(/&/g, '&')], ['mailto:contact@atmos.com', MAILTO],
    ['https://framerusercontent.com/assets/U0nEjmohYWmgu9YKofEMW0.png', './logo.jpeg'],
    ...VIEWBOXES]) {
    if (s.includes(a)) { hits += s.split(a).length - 1; s = rep(s, a, b); }
  }
  for (const u of SOCIALS) s = rep(s, u, './');
  fs.writeFileSync(p, s);
  modStats.push(`${f.slice(0, 12)}…: ${hits} reemplazos`);
}

// ---------- HTML ----------
let h = fs.readFileSync(SRC_HTML, 'utf8');

// 1) módulos locales
h = rep(h, CDN, './modules/');

// 2) quitar analytics del sitio original y search-index
h = h.replace(/<script async src="https:\/\/events\.framer\.com\/script[^>]*><\/script>/, '');
h = h.replace(/\s*<meta name="framer-search-index[^>]*>/g, '');

// 3) metas, título, favicon, og
h = rep(h, TITLE_EN, TITLE_ES);
h = rep(h, DESC_EN, DESC_ES);
h = h.replace(/<link href="[^"]*" rel="icon"[^>]*>\s*<link href="[^"]*" rel="icon"[^>]*>/, '<link href="./logo.jpeg" rel="icon">');
h = rep(h, 'https://framerusercontent.com/assets/U0nEjmohYWmgu9YKofEMW0.png', './logo.jpeg');
h = h.replace(/<html lang="en"/, '<html lang="es"');

// 4) párrafo hero palabra por palabra (nodos de texto duplicados base+overlay ×3 breakpoints)
const queue = [];
for (let bp = 0; bp < 3; bp++) for (const w of wEN) { queue.push(w); queue.push(w); }
let qi = 0, replaced = 0;
h = h.replace(/>([^<>]+)</g, (m, txt) => {
  if (qi < queue.length && txt === queue[qi]) {
    const idx = qi % (wEN.length * 2);
    const es = wES[Math.floor(idx / 2)];
    qi++; replaced++;
    return '>' + escHtml(es) + '<';
  }
  return m;
});
if (replaced !== queue.length) console.warn(`AVISO: párrafo hero ${replaced}/${queue.length} palabras reemplazadas`);

// 5) tabla de reemplazos sobre nodos de texto
let tHits = 0;
for (const [en, es] of T) {
  const a = '>' + escHtml(en) + '<';
  if (h.includes(a)) { tHits += h.split(a).length - 1; h = rep(h, a, '>' + escHtml(es) + '<'); }
}
// wordmarks restantes
h = rep(h, '>Atmos<', '>TaskMove<');
for (const [a, b] of VIEWBOXES) h = rep(h, 'viewBox="' + a + '"', 'viewBox="' + b + '"');

// 6) enlaces
h = rep(h, 'href="./waitlist"', 'href="' + MAILTO.replace(/&/g, '&amp;') + '"');
h = rep(h, 'mailto:contact@atmos.com', MAILTO.replace(/&/g, '&amp;'));
for (const u of SOCIALS) h = rep(h, 'href="' + u + '"', 'href="./"');

// 7) logo TaskMove en el bloque de marca del footer (CSS sobrevive a la hidratación)
h = h.replace('</head>', `\t<style data-taskmove-logo>
\t\tsvg.framer-1oku6q2 foreignObject{visibility:hidden}
\t\tsvg.framer-1oku6q2{background:#000 url(./logo.jpeg) center 47%/auto 300% no-repeat}
\t</style>\n</head>`);

fs.writeFileSync(OUT_HTML, h);
console.log(modStats.join('\n'));
console.log(`HTML: párrafo ${replaced}/${queue.length} · tabla ${tHits} reemplazos · escrito index.html`);
