import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useEffect } from 'react';

function ProjectsGrid({ projects }) {
  const scrollContainer = useRef(null);
  useEffect(() => {
    const el = scrollContainer.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollLeft += e.deltaY + e.deltaX;
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return /* @__PURE__ */ jsxs("section", { id: "projects", className: "py-32 relative bg-bg transition-colors duration-500 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "container-max mb-12 px-4 flex items-end justify-between relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-grotesk text-text-muted uppercase tracking-widest font-bold", children: "Selected Works" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-6xl font-grotesk font-bold text-text mt-3 tracking-tight", children: [
          "Featured ",
          /* @__PURE__ */ jsx("span", { className: "text-text-muted", children: "Projects" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scrollContainer.current?.scrollBy({ left: -500, behavior: "smooth" }),
            className: "w-12 h-12 rounded-full border border-border flex items-center justify-center text-text hover:bg-text hover:text-bg transition-all duration-300 active:scale-95",
            children: "←"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scrollContainer.current?.scrollBy({ left: 500, behavior: "smooth" }),
            className: "w-12 h-12 rounded-full border border-border flex items-center justify-center text-text hover:bg-text hover:text-bg transition-all duration-300 active:scale-95",
            children: "→"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: scrollContainer,
        className: "flex gap-6 overflow-x-auto pb-12 px-4 md:px-8 scrollbar-hide snap-x snap-mandatory relative z-10",
        style: { scrollPaddingLeft: "2rem" },
        children: [
          projects.map((project, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "snap-center shrink-0 w-[85vw] md:w-[600px] h-[400px] md:h-[500px] group relative rounded-[2rem] overflow-hidden bg-surface border border-border shadow-sm dark:shadow-none transition-all duration-500",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-surface", children: project.image_url ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: project.image_url,
                    alt: project.title,
                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-white dark:from-white/5 dark:to-white/0", children: /* @__PURE__ */ jsx("span", { className: "text-9xl font-grotesk font-bold text-black/5 dark:text-white/5", children: String(i + 1).padStart(2, "0") }) }) }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 dark:opacity-80 transition-opacity duration-500" }),
                /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75", children: typeof project.tags === "string" ? JSON.parse(project.tags).slice(0, 3).map((tag) => /* @__PURE__ */ jsx("span", { className: "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/20 text-white backdrop-blur-md border border-white/10", children: tag }, tag)) : null }),
                  /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-grotesk font-bold text-white mb-2 leading-tight", children: project.title }),
                  /* @__PURE__ */ jsxs("div", { className: "h-0 group-hover:h-auto overflow-hidden transition-all duration-500", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm md:text-base line-clamp-2 max-w-md mb-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100", children: project.description }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 pb-2", children: [
                      project.demo_url && /* @__PURE__ */ jsx("a", { href: project.demo_url, target: "_blank", rel: "noreferrer", className: "text-white text-sm font-semibold hover:underline transition-all flex items-center gap-1", children: "Live Site ↗" }),
                      project.repo_url && /* @__PURE__ */ jsx("a", { href: project.repo_url, target: "_blank", rel: "noreferrer", className: "text-gray-400 text-sm font-semibold hover:text-white transition-colors", children: "Github" })
                    ] })
                  ] })
                ] })
              ]
            },
            project.id
          )),
          /* @__PURE__ */ jsx("div", { className: "w-8 shrink-0" })
        ]
      }
    )
  ] });
}

export { ProjectsGrid as P };
