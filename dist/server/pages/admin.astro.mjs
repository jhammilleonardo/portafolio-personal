import { f as createComponent, j as renderHead, k as renderComponent, r as renderTemplate, i as createAstro } from '../chunks/astro/server_Cq_iU0aJ.mjs';
import 'kleur/colors';
import { i as isAuthenticated } from '../chunks/auth_TeUwq8T5.mjs';
/* empty css                                          */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const authed = isAuthenticated(Astro2.request);
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin | Portafolio</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-bg text-text antialiased min-h-screen transition-colors duration-300"> ${renderComponent($$result, "AdminApp", null, { "client:only": "react", "initialAuthed": authed, "client:component-hydration": "only", "client:component-path": "/home/jhammil/Proyectos/Me/Portafolio/src/components/admin/AdminApp", "client:component-export": "AdminApp" })} </body></html>`;
}, "/home/jhammil/Proyectos/Me/Portafolio/src/pages/admin/index.astro", void 0);

const $$file = "/home/jhammil/Proyectos/Me/Portafolio/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
