import { f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, k as renderComponent, i as createAstro, j as renderHead, l as renderSlot } from './astro/server_Cq_iU0aJ.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                  */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", `<button class="theme-toggle p-2 rounded-lg text-text-muted hover:text-text hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Toggle dark mode"> <!-- Sun icon (for dark mode) --> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden dark:block"> <circle cx="12" cy="12" r="5"></circle> <line x1="12" y1="1" x2="12" y2="3"></line> <line x1="12" y1="21" x2="12" y2="23"></line> <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line> <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line> <line x1="1" y1="12" x2="3" y2="12"></line> <line x1="21" y1="12" x2="23" y2="12"></line> <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line> <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line> </svg> <!-- Moon icon (for light mode) --> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="block dark:hidden"> <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path> </svg> </button> <script>
(function() {
  const getTheme = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const theme = getTheme();

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  window.localStorage.setItem('theme', theme);

  const handleToggleClick = () => {
    const element = document.documentElement;
    element.classList.toggle('dark');

    const isDark = element.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  document.querySelectorAll('.theme-toggle').forEach(el => {
    if (el.hasAttribute('data-initialized')) return;
    el.addEventListener('click', handleToggleClick);
    el.setAttribute('data-initialized', 'true');
  });
})();
<\/script>`])), maybeRenderHead());
}, "/home/jhammil/Proyectos/Me/Portafolio/src/components/ui/ThemeToggle.astro", void 0);

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const navLinks = [
    { href: "/#about", label: "Sobre m\xED" },
    { href: "/#skills", label: "Skills" },
    { href: "/#projects", label: "Proyectos" },
    { href: "/#certifications", label: "Certificaciones" },
    { href: "/#contact", label: "Contacto" }
  ];
  return renderTemplate`${maybeRenderHead()}<header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <nav class="flex items-center justify-between h-16"> <!-- Logo --> <a href="/" class="font-grotesk font-bold text-xl text-text hover:text-accent-cyan transition-colors">
&lt;Dev/&gt;
</a> <!-- Desktop nav --> <ul class="hidden md:flex items-center gap-1"> ${navLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="px-4 py-2 rounded-lg text-sm text-text-muted hover:text-text hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 font-medium"> ${link.label} </a> </li>`)} </ul> <div class="hidden md:flex items-center gap-4"> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})} <!-- CTA --> <a href="/#contact" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-text text-bg hover:opacity-90 transition-all duration-200 shadow-lg shadow-black/10 dark:shadow-white/5">
Hablemos
</a> </div> <!-- Mobile actions --> <div class="flex items-center gap-4 md:hidden"> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})} <!-- Mobile menu button --> <button id="mobile-menu-btn" class="p-2 rounded-lg text-text-muted hover:text-text hover:bg-black/5 dark:hover:bg-white/5" aria-label="Menu"> <svg id="icon-open" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="hidden"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </nav> </div> <!-- Mobile menu --> <div id="mobile-menu" class="hidden md:hidden border-t border-border bg-bg/95 backdrop-blur-xl"> <ul class="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1"> ${navLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="mobile-nav-link block px-4 py-2.5 rounded-lg text-text-muted hover:text-text hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium"> ${link.label} </a> </li>`)} </ul> </div> </header> `;
}, "/home/jhammil/Proyectos/Me/Portafolio/src/components/layout/Navbar.astro", void 0);

const $$Astro$1 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-border py-10 px-4 bg-bg transition-colors duration-300"> <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"> <p class="text-text-muted text-sm font-medium">
© ${year} — Construido con
<span class="text-text font-semibold">Astro + React</span> </p> <div class="flex items-center gap-4"> <a href="/#about" class="text-text-muted hover:text-text text-sm transition-colors font-medium">Sobre mí</a> <a href="/#projects" class="text-text-muted hover:text-text text-sm transition-colors font-medium">Proyectos</a> <a href="/#contact" class="text-text-muted hover:text-text text-sm transition-colors font-medium">Contacto</a> </div> </div> </footer>`;
}, "/home/jhammil/Proyectos/Me/Portafolio/src/components/layout/Footer.astro", void 0);

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "Portafolio | Full Stack Developer",
    description = "Portafolio profesional de desarrollo web. Proyectos, certificaciones y habilidades."
  } = Astro2.props;
  return renderTemplate`<html lang="es" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#0a0a0f"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title><!-- Preconnect fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-bg text-white antialiased"> ${renderComponent($$result, "Navbar", $$Navbar, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/jhammil/Proyectos/Me/Portafolio/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
