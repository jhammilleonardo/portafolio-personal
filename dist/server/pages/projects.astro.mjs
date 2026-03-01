import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Cq_iU0aJ.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_GvZf9N6X.mjs';
import { P as ProjectsGrid } from '../chunks/ProjectsGrid_Zlwccvjq.mjs';
export { renderers } from '../renderers.mjs';

const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  let projects = [];
  try {
    const { query } = await import('../chunks/db_DC8ZIcEa.mjs');
    projects = await query("SELECT * FROM projects ORDER BY featured DESC, created_at DESC");
  } catch {
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Proyectos | Portafolio", "description": "Todos mis proyectos de desarrollo web y software." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pt-20"> ${renderComponent($$result2, "ProjectsGrid", ProjectsGrid, { "client:load": true, "projects": projects, "client:component-hydration": "load", "client:component-path": "/home/jhammil/Proyectos/Me/Portafolio/src/components/sections/ProjectsGrid", "client:component-export": "ProjectsGrid" })} </div> ` })}`;
}, "/home/jhammil/Proyectos/Me/Portafolio/src/pages/projects.astro", void 0);

const $$file = "/home/jhammil/Proyectos/Me/Portafolio/src/pages/projects.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
