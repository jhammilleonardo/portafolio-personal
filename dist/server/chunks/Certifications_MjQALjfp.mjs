import { f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, i as createAstro } from './astro/server_Cq_iU0aJ.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Certifications = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Certifications;
  const { certifications } = Astro2.props;
  function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("es-ES", { year: "numeric", month: "long" });
  }
  return renderTemplate`${maybeRenderHead()}<section id="certifications" class="section-padding bg-surface border-t border-border transition-colors duration-300"> <div class="container-max"> <div class="text-center mb-16 fade-in-up"> <p class="text-sm font-medium text-text-muted uppercase tracking-widest mb-3">Aprendizaje continuo</p> <h2 class="font-grotesk text-4xl font-bold text-text">
Certificaciones <span class="text-text-muted">&amp; Cursos</span> </h2> </div> <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"> ${certifications.map((cert, i) => renderTemplate`<div class="bg-bg rounded-2xl p-6 border border-border shadow-sm hover:shadow-xl hover:shadow-text/5 hover:-translate-y-1 transition-all duration-300 fade-in-up group dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20 dark:shadow-none"${addAttribute(`animation-delay: ${i * 0.1}s`, "style")}> <!-- Icon --> <div class="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center mb-4 group-hover:bg-text group-hover:text-bg transition-colors dark:bg-white/10 dark:border-white/5 dark:text-white dark:group-hover:bg-white dark:group-hover:text-black"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted group-hover:text-bg transition-colors"> <circle cx="12" cy="8" r="6"></circle> <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path> </svg> </div> <h3 class="font-grotesk font-semibold text-text mb-1 group-hover:text-text-muted transition-colors line-clamp-2"> ${cert.title} </h3> <p class="text-sm text-text-muted font-medium mb-1">${cert.issuer}</p> ${cert.issue_date && renderTemplate`<p class="text-xs text-text-muted mb-4">${formatDate(cert.issue_date)}</p>`} ${cert.credential_url && renderTemplate`<a${addAttribute(cert.credential_url, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors border-b border-transparent hover:border-text pb-0.5"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path> <polyline points="15 3 21 3 21 9"></polyline> <line x1="10" x2="21" y1="14" y2="3"></line> </svg>
Ver credencial
</a>`} </div>`)} </div> </div> </section> `;
}, "/home/jhammil/Proyectos/Me/Portafolio/src/components/sections/Certifications.astro", void 0);

export { $$Certifications as $ };
