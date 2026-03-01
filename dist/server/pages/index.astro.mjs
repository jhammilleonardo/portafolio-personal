import { f as createComponent, m as maybeRenderHead, r as renderTemplate, i as createAstro, h as addAttribute, k as renderComponent } from '../chunks/astro/server_Cq_iU0aJ.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_GvZf9N6X.mjs';
import 'clsx';
/* empty css                                 */
import { P as ProjectsGrid } from '../chunks/ProjectsGrid_Zlwccvjq.mjs';
import { $ as $$Certifications } from '../chunks/Certifications_MjQALjfp.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../renderers.mjs';

const $$Astro$3 = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Hero;
  const { profile } = Astro2.props;
  const name = profile?.name ?? "Tu Nombre";
  const title = profile?.title ?? "Full Stack Developer";
  return renderTemplate`${maybeRenderHead()}<section id="hero" class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-bg" data-astro-cid-anhloy43> <!-- Dynamic Background --> <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-surface via-bg to-bg z-0 opacity-80 dark:opacity-20" data-astro-cid-anhloy43></div> <!-- Grid Pattern --> <div class="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" style="background-image: radial-gradient(var(--text) 1px, transparent 1px); background-size: 32px 32px; mask-image: radial-gradient(circle at center, black, transparent);" data-astro-cid-anhloy43></div> <!-- Parallax Content --> <div class="z-10 text-center px-4 max-w-5xl mx-auto parallax-container" data-astro-cid-anhloy43> <!-- Animated Status Badge --> ${!!profile?.available_for_work && renderTemplate`<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface/50 backdrop-blur-md mb-8 fade-in-up" style="animation-delay: 0.1s" data-astro-cid-anhloy43> <span class="relative flex h-2 w-2" data-astro-cid-anhloy43> <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" data-astro-cid-anhloy43></span> <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" data-astro-cid-anhloy43></span> </span> <span class="text-xs font-medium tracking-wide text-text-muted uppercase" data-astro-cid-anhloy43>Available for work</span> </div>`} <!-- Mega Typography --> <h1 class="font-grotesk font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-[0.9] mb-6 text-text fade-in-up mix-blend-normal dark:mix-blend-lighten" style="animation-delay: 0.2s" data-astro-cid-anhloy43> ${name.split(" ")[0]}<br data-astro-cid-anhloy43> <span class="text-stroke-dynamic text-transparent hover:text-text/5 transition-colors duration-500" data-astro-cid-anhloy43>${name.split(" ").slice(1).join(" ")}</span> </h1> <!-- Minimal Description --> <p class="font-inter text-xl sm:text-2xl text-text-muted max-w-2xl mx-auto font-light mb-10 fade-in-up" style="animation-delay: 0.4s" data-astro-cid-anhloy43> ${title} focused on crafting <span class="text-text font-medium italic" data-astro-cid-anhloy43>immersive</span> digital experiences.
</p> <!-- Magnetic Buttons --> <div class="flex flex-col sm:flex-row items-center justify-center gap-6 fade-in-up" style="animation-delay: 0.6s" data-astro-cid-anhloy43> <a href="#projects" class="group relative px-8 py-4 bg-text text-bg rounded-full font-bold overflow-hidden transition-transform hover:scale-105 shadow-xl shadow-text/10" data-astro-cid-anhloy43> <span class="relative z-10 flex items-center gap-2" data-astro-cid-anhloy43>
View Selected Works
<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-anhloy43><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-astro-cid-anhloy43></path></svg> </span> </a> <a href="#contact" class="group px-8 py-4 text-text hover:text-text-muted transition-colors" data-astro-cid-anhloy43> <span class="border-b border-border pb-1 group-hover:border-text transition-colors" data-astro-cid-anhloy43>Let's talk</span> </a> </div> </div> <!-- Scroll Indicator --> <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40" data-astro-cid-anhloy43> <span class="text-[10px] uppercase tracking-[0.2em] text-text" data-astro-cid-anhloy43>Scroll</span> <div class="w-[1px] h-12 bg-gradient-to-b from-text to-transparent" data-astro-cid-anhloy43></div> </div> </section>  `;
}, "/home/jhammil/Proyectos/Me/Portafolio/src/components/sections/Hero.astro", void 0);

const $$Astro$2 = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$About;
  const { profile, projectCount, certCount } = Astro2.props;
  const stats = [
    { label: "A\xF1os de experiencia", value: `${profile?.years_experience ?? 3}+` },
    { label: "Proyectos completados", value: `${projectCount}+` },
    { label: "Certificaciones", value: `${certCount}+` }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="about" class="section-padding bg-bg transition-colors duration-300"> <div class="container-max"> <div class="grid lg:grid-cols-2 gap-16 items-center"> <!-- Avatar / Visual --> <div class="flex justify-center fade-in-up"> <div class="relative"> <div class="w-64 h-64 rounded-3xl overflow-hidden border border-border shadow-2xl shadow-text/5 rotate-3 hover:rotate-0 transition-all duration-500 bg-surface dark:border-white/10 dark:shadow-none"> ${profile?.avatar_url ? renderTemplate`<img${addAttribute(profile.avatar_url, "src")}${addAttribute(profile.name, "alt")} class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500">` : renderTemplate`<div class="w-full h-full flex items-center justify-center bg-surface dark:bg-white/5"> <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"> <circle cx="12" cy="8" r="5"></circle> <path d="M20 21a8 8 0 1 0-16 0"></path> </svg> </div>`} </div> <!-- Floating badges --> <div class="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-bg border border-border text-text text-xs font-bold shadow-lg animate-float dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
Full Stack Dev
</div> <div class="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-text text-bg text-xs font-bold shadow-lg animate-float dark:bg-white dark:text-black" style="animation-delay: 1s">
Open to work
</div> </div> </div> <!-- Content --> <div class="fade-in-up" style="animation-delay: 0.15s"> <p class="text-sm font-medium text-text-muted uppercase tracking-widest mb-3">Sobre mí</p> <h2 class="font-grotesk text-4xl font-bold text-text mb-6">
Construyendo el futuro<br> <span class="text-text-muted">una línea a la vez</span> </h2> <p class="text-text-muted leading-relaxed mb-8 text-lg font-light"> ${profile?.bio ?? "Apasionado por crear experiencias digitales excepcionales. Especializado en desarrollo web moderno con un enfoque en rendimiento, accesibilidad y c\xF3digo limpio."} </p> <!-- Stats --> <div class="grid grid-cols-3 gap-4 mb-8"> ${stats.map((stat) => renderTemplate`<div class="text-center p-4 rounded-2xl bg-surface border border-border dark:bg-white/5 dark:border-white/10"> <div class="font-grotesk text-3xl font-bold text-text mb-1">${stat.value}</div> <div class="text-xs text-text-muted font-medium uppercase tracking-wide">${stat.label}</div> </div>`)} </div> <!-- Links --> <div class="flex flex-wrap gap-3"> ${profile?.github_url && renderTemplate`<a${addAttribute(profile.github_url, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm bg-text text-bg hover:opacity-90 transition-all shadow-lg shadow-text/10"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path> </svg>
GitHub
</a>`} ${profile?.linkedin_url && renderTemplate`<a${addAttribute(profile.linkedin_url, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm bg-surface text-text hover:bg-border transition-all"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path> </svg>
LinkedIn
</a>`} ${profile?.email && renderTemplate`<a${addAttribute(`mailto:${profile.email}`, "href")} class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm bg-bg border border-border text-text-muted hover:border-text hover:text-text transition-all"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect width="20" height="16" x="2" y="4" rx="2"></rect> <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path> </svg>
Email
</a>`} </div> </div> </div> </div> </section> `;
}, "/home/jhammil/Proyectos/Me/Portafolio/src/components/sections/About.astro", void 0);

const $$Astro$1 = createAstro();
const $$Skills = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Skills;
  const { skillsByCategory } = Astro2.props;
  const allSkills = Object.values(skillsByCategory).flat();
  const half = Math.ceil(allSkills.length / 2);
  const row1 = [...allSkills.slice(0, half), ...allSkills.slice(0, half)];
  const row2 = [...allSkills.slice(half), ...allSkills.slice(half)];
  const iconMapping = {
    "nextjs": "nextdotjs",
    "nodejs": "nodedotjs",
    "tailwind": "tailwindcss",
    "github-actions": "githubactions",
    "ci/cd": "githubactions"
    // Fallback
  };
  const getIconUrl = (icon) => {
    const slug = iconMapping[icon] || icon;
    return `https://cdn.simpleicons.org/${slug}`;
  };
  return renderTemplate`${maybeRenderHead()}<section id="skills" class="py-32 relative overflow-hidden bg-bg transition-colors duration-500" data-astro-cid-sye7xtqh> <div class="container-max mb-16 px-4 text-center relative z-10" data-astro-cid-sye7xtqh> <h2 class="text-4xl md:text-5xl font-grotesk font-bold text-text mb-6 tracking-tight" data-astro-cid-sye7xtqh>
Tech <span class="text-text-muted" data-astro-cid-sye7xtqh>Stack</span> </h2> <p class="text-text-muted max-w-lg mx-auto text-lg" data-astro-cid-sye7xtqh>
The tools and technologies I use to build scalable, high-performance applications.
</p> </div> <!-- Carousel Container with Fade Edges --> <div class="flex flex-col gap-6 mask-edges relative z-10 py-4" data-astro-cid-sye7xtqh> <!-- Row 1: Left to Right --> <div class="flex w-max animate-marquee-left hover:pause gap-4" data-astro-cid-sye7xtqh> ${row1.map((skill) => renderTemplate`<div class="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-bg border border-border shadow-sm transition-all duration-300 hover:scale-105 cursor-default hover:border-[var(--skill-color)] hover:shadow-md"${addAttribute(`--skill-color: ${skill.color || "#333"}`, "style")} data-astro-cid-sye7xtqh> <div class="w-8 h-8 flex items-center justify-center shrink-0 transition-all duration-300 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" data-astro-cid-sye7xtqh> ${skill.icon ? renderTemplate`<img${addAttribute(getIconUrl(skill.icon), "src")}${addAttribute(skill.name, "alt")} class="w-6 h-6 object-contain" loading="lazy" data-astro-cid-sye7xtqh>` : renderTemplate`<div class="w-full h-full rounded-full bg-text text-bg flex items-center justify-center text-xs font-bold" data-astro-cid-sye7xtqh> ${skill.name.substring(0, 1)} </div>`} </div> <span class="text-sm font-semibold text-text transition-colors duration-300 group-hover:text-[var(--skill-color)] whitespace-nowrap" data-astro-cid-sye7xtqh> ${skill.name} </span> </div>`)} </div> <!-- Row 2: Right to Left --> <div class="flex w-max animate-marquee-right hover:pause gap-4" data-astro-cid-sye7xtqh> ${row2.map((skill) => renderTemplate`<div class="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-bg border border-border shadow-sm transition-all duration-300 hover:scale-105 cursor-default hover:border-[var(--skill-color)] hover:shadow-md"${addAttribute(`--skill-color: ${skill.color || "#333"}`, "style")} data-astro-cid-sye7xtqh> <div class="w-8 h-8 flex items-center justify-center shrink-0 transition-all duration-300 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" data-astro-cid-sye7xtqh> ${skill.icon ? renderTemplate`<img${addAttribute(getIconUrl(skill.icon), "src")}${addAttribute(skill.name, "alt")} class="w-6 h-6 object-contain" loading="lazy" data-astro-cid-sye7xtqh>` : renderTemplate`<div class="w-full h-full rounded-full bg-text text-bg flex items-center justify-center text-xs font-bold" data-astro-cid-sye7xtqh> ${skill.name.substring(0, 1)} </div>`} </div> <span class="text-sm font-semibold text-text transition-colors duration-300 group-hover:text-[var(--skill-color)] whitespace-nowrap" data-astro-cid-sye7xtqh> ${skill.name} </span> </div>`)} </div> </div> </section> `;
}, "/home/jhammil/Proyectos/Me/Portafolio/src/components/sections/Skills.astro", void 0);

function ContactForm({ email, location, availability }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Error al enviar");
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado");
    }
  };
  const inputClass = `w-full px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-text-muted
    focus:outline-none focus:border-text focus:bg-bg transition-all duration-200 text-sm shadow-sm`;
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 px-4 sm:px-6 lg:px-8 bg-bg border-t border-border transition-colors duration-300", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-text-muted uppercase tracking-widest mb-3", children: "¿Hablamos?" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-grotesk text-4xl font-bold text-text", children: [
        "Ponte en ",
        /* @__PURE__ */ jsx("span", { className: "text-text-muted", children: "contacto" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-text-muted mt-4 max-w-md mx-auto text-sm", children: "Tengo un proyecto en mente o simplemente quieres saludar — mi bandeja siempre está abierta." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-start max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [
        {
          icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }),
            /* @__PURE__ */ jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
          ] }),
          label: "Email",
          value: email || "tu@email.com"
        },
        {
          icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" })
          ] }),
          label: "Ubicación",
          value: location || "Tu Ciudad, País"
        },
        {
          icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
            /* @__PURE__ */ jsx("path", { d: "M12 6v6l4 2" })
          ] }),
          label: "Disponibilidad",
          value: availability || "Lun–Vie, 9am–6pm"
        }
      ].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 p-4 rounded-2xl border border-border bg-surface hover:bg-bg hover:shadow-lg transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:shadow-none", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-text text-bg flex items-center justify-center shrink-0 dark:bg-white dark:text-black", children: item.icon }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-text-muted mb-0.5 uppercase tracking-wide", children: item.label }),
          /* @__PURE__ */ jsx("p", { className: "text-text font-medium text-sm", children: item.value })
        ] })
      ] }, item.label)) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 bg-bg p-8 rounded-3xl border border-border shadow-xl shadow-text/5 dark:bg-white/5 dark:border-white/10 dark:shadow-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-text-muted mb-1.5 block font-medium", children: "Nombre *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "name",
                value: form.name,
                onChange: handleChange,
                required: true,
                placeholder: "Tu nombre",
                className: inputClass
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-text-muted mb-1.5 block font-medium", children: "Email *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                value: form.email,
                onChange: handleChange,
                required: true,
                placeholder: "tu@email.com",
                className: inputClass
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-text-muted mb-1.5 block font-medium", children: "Asunto" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              name: "subject",
              value: form.subject,
              onChange: handleChange,
              placeholder: "¿De qué se trata?",
              className: inputClass
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-text-muted mb-1.5 block font-medium", children: "Mensaje *" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "message",
              value: form.message,
              onChange: handleChange,
              required: true,
              rows: 5,
              placeholder: "Cuéntame sobre tu proyecto...",
              className: `${inputClass} resize-none`
            }
          )
        ] }),
        status === "success" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          "¡Mensaje enviado! Te respondo pronto."
        ] }),
        status === "error" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium", children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
            /* @__PURE__ */ jsx("line", { x1: "12", x2: "12", y1: "8", y2: "12" }),
            /* @__PURE__ */ jsx("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })
          ] }),
          errorMsg
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: status === "loading",
            className: "w-full py-3.5 rounded-xl font-bold text-sm bg-text text-bg hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-text/10",
            children: status === "loading" ? "Enviando..." : "Enviar mensaje"
          }
        )
      ] })
    ] })
  ] }) });
}

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const mockProfile = {
    id: 1,
    name: "Tu Nombre",
    title: "Full Stack Developer & Software Engineer",
    bio: "Apasionado por crear experiencias digitales excepcionales. Especializado en desarrollo web moderno con un enfoque en rendimiento, accesibilidad y c\xF3digo limpio.",
    email: "tu@email.com",
    location: "Tu Ciudad, Pa\xEDs",
    avatar_url: null,
    github_url: "https://github.com/tuusuario",
    linkedin_url: "https://linkedin.com/in/tuusuario",
    twitter_url: null,
    years_experience: 3,
    availability: null,
    created_at: "",
    updated_at: ""
  };
  const mockProjects = [
    {
      id: 1,
      title: "Portafolio Personal",
      description: "Portafolio moderno con Astro, React y MySQL. Panel de admin, animaciones glassmorphism.",
      long_description: null,
      repo_url: "https://github.com/tuusuario/portafolio",
      demo_url: null,
      image_url: null,
      tags: ["Astro", "React", "TypeScript", "MySQL", "Tailwind CSS"],
      featured: true,
      status: "active",
      created_at: "",
      updated_at: ""
    },
    {
      id: 2,
      title: "E-Commerce API",
      description: "API REST con autenticaci\xF3n JWT, pagos Stripe y gesti\xF3n de inventario completa.",
      long_description: null,
      repo_url: "https://github.com/tuusuario/ecommerce-api",
      demo_url: null,
      image_url: null,
      tags: ["Node.js", "Express", "PostgreSQL", "JWT", "Stripe"],
      featured: true,
      status: "active",
      created_at: "",
      updated_at: ""
    },
    {
      id: 3,
      title: "Task Manager App",
      description: "Gesti\xF3n de tareas con colaboraci\xF3n en tiempo real, notificaciones push y offline.",
      long_description: null,
      repo_url: "https://github.com/tuusuario/task-manager",
      demo_url: "https://tasks.demo.com",
      image_url: null,
      tags: ["React", "NestJS", "WebSockets", "PWA"],
      featured: false,
      status: "active",
      created_at: "",
      updated_at: ""
    },
    {
      id: 4,
      title: "CLI Dev Tools",
      description: "Herramienta CLI para automatizar scaffolding, deployment y gesti\xF3n de entornos.",
      long_description: null,
      repo_url: "https://github.com/tuusuario/cli-tools",
      demo_url: null,
      image_url: null,
      tags: ["Go", "CLI", "DevOps", "Automation"],
      featured: false,
      status: "active",
      created_at: "",
      updated_at: ""
    }
  ];
  const mockCerts = [
    { id: 1, title: "AWS Certified Developer \u2013 Associate", issuer: "Amazon Web Services", issue_date: "2024-03-15", expiry_date: null, credential_url: "https://aws.amazon.com/certification/", image_url: null, description: null, created_at: "", updated_at: "" },
    { id: 2, title: "Professional Scrum Master I (PSM I)", issuer: "Scrum.org", issue_date: "2023-11-20", expiry_date: null, credential_url: "https://www.scrum.org/certificates/", image_url: null, description: null, created_at: "", updated_at: "" },
    { id: 3, title: "Google Cloud Associate Cloud Engineer", issuer: "Google Cloud", issue_date: "2024-06-10", expiry_date: null, credential_url: "https://cloud.google.com/certification/", image_url: null, description: null, created_at: "", updated_at: "" },
    { id: 4, title: "Meta React Developer Certificate", issuer: "Meta", issue_date: "2023-08-05", expiry_date: null, credential_url: "https://www.coursera.org/professional-certificates/meta-react-native", image_url: null, description: null, created_at: "", updated_at: "" }
  ];
  const mockSkills = [
    { id: 1, name: "React", category: "Frontend", level: 92, icon: "react", color: "#61DAFB", created_at: "", updated_at: "" },
    { id: 2, name: "TypeScript", category: "Frontend", level: 88, icon: "typescript", color: "#3178C6", created_at: "", updated_at: "" },
    { id: 3, name: "Astro", category: "Frontend", level: 85, icon: "astro", color: "#FF5D01", created_at: "", updated_at: "" },
    { id: 4, name: "Tailwind CSS", category: "Frontend", level: 90, icon: "tailwind", color: "#06B6D4", created_at: "", updated_at: "" },
    { id: 5, name: "Node.js", category: "Backend", level: 88, icon: "nodejs", color: "#339933", created_at: "", updated_at: "" },
    { id: 6, name: "NestJS", category: "Backend", level: 75, icon: "nestjs", color: "#E0234E", created_at: "", updated_at: "" },
    { id: 7, name: "Go", category: "Backend", level: 65, icon: "go", color: "#00ADD8", created_at: "", updated_at: "" },
    { id: 8, name: "MySQL", category: "Databases", level: 85, icon: "mysql", color: "#4479A1", created_at: "", updated_at: "" },
    { id: 9, name: "PostgreSQL", category: "Databases", level: 80, icon: "postgresql", color: "#4169E1", created_at: "", updated_at: "" },
    { id: 10, name: "MongoDB", category: "Databases", level: 75, icon: "mongodb", color: "#47A248", created_at: "", updated_at: "" },
    { id: 11, name: "Docker", category: "DevOps", level: 80, icon: "docker", color: "#2496ED", created_at: "", updated_at: "" },
    { id: 12, name: "AWS", category: "DevOps", level: 75, icon: "aws", color: "#FF9900", created_at: "", updated_at: "" },
    { id: 13, name: "Git", category: "DevOps", level: 92, icon: "git", color: "#F05032", created_at: "", updated_at: "" }
  ];
  let profile = mockProfile;
  let projects = mockProjects;
  let certifications = mockCerts;
  let skills = mockSkills;
  try {
    const { query } = await import('../chunks/db_DC8ZIcEa.mjs');
    const [dbProfile, dbProjects, dbCerts, dbSkills] = await Promise.all([
      query("SELECT * FROM profile LIMIT 1"),
      query("SELECT * FROM projects ORDER BY featured DESC, created_at DESC"),
      query("SELECT * FROM certifications ORDER BY issue_date DESC"),
      query("SELECT * FROM skills ORDER BY category, level DESC")
    ]);
    if (dbProfile.length > 0) profile = dbProfile[0];
    if (dbProjects.length > 0) projects = dbProjects;
    if (dbCerts.length > 0) certifications = dbCerts;
    if (dbSkills.length > 0) skills = dbSkills;
  } catch {
  }
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${profile?.name ?? "Portafolio"} | Full Stack Developer` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "profile": profile })} ${renderComponent($$result2, "About", $$About, { "profile": profile, "projectCount": projects.length, "certCount": certifications.length })} ${renderComponent($$result2, "Skills", $$Skills, { "skillsByCategory": skillsByCategory })} ${renderComponent($$result2, "ProjectsGrid", ProjectsGrid, { "client:load": true, "projects": projects, "client:component-hydration": "load", "client:component-path": "/home/jhammil/Proyectos/Me/Portafolio/src/components/sections/ProjectsGrid", "client:component-export": "ProjectsGrid" })} ${renderComponent($$result2, "Certifications", $$Certifications, { "certifications": certifications })} ${renderComponent($$result2, "ContactForm", ContactForm, { "client:load": true, "email": profile?.email, "location": profile?.location, "availability": profile?.availability, "client:component-hydration": "load", "client:component-path": "/home/jhammil/Proyectos/Me/Portafolio/src/components/sections/ContactForm", "client:component-export": "ContactForm" })} ` })}`;
}, "/home/jhammil/Proyectos/Me/Portafolio/src/pages/index.astro", void 0);

const $$file = "/home/jhammil/Proyectos/Me/Portafolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
