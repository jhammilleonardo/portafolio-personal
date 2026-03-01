import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Cq_iU0aJ.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_GvZf9N6X.mjs';
import { $ as $$Certifications$1 } from '../chunks/Certifications_MjQALjfp.mjs';
export { renderers } from '../renderers.mjs';

const $$Certifications = createComponent(async ($$result, $$props, $$slots) => {
  let certifications = [];
  try {
    const { query } = await import('../chunks/db_DC8ZIcEa.mjs');
    certifications = await query("SELECT * FROM certifications ORDER BY issue_date DESC");
  } catch {
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Certificaciones | Portafolio", "description": "Mis certificaciones y cursos completados." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pt-20"> ${renderComponent($$result2, "Certifications", $$Certifications$1, { "certifications": certifications })} </div> ` })}`;
}, "/home/jhammil/Proyectos/Me/Portafolio/src/pages/certifications.astro", void 0);

const $$file = "/home/jhammil/Proyectos/Me/Portafolio/src/pages/certifications.astro";
const $$url = "/certifications";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Certifications,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
