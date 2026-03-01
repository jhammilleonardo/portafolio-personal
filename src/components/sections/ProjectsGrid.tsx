import React, { useRef, useEffect } from 'react';
import type { Project } from '../../types';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainer.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollLeft += e.deltaY + e.deltaX;
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  return (
    <section id="projects" className="py-32 relative bg-bg transition-colors duration-500 overflow-hidden">
      <div className="container-max mb-12 px-4 flex items-end justify-between relative z-10">
        <div>
          <span className="text-sm font-grotesk text-text-muted uppercase tracking-widest font-bold">Selected Works</span>
          <h2 className="text-4xl md:text-6xl font-grotesk font-bold text-text mt-3 tracking-tight">
            Featured <span className="text-text-muted">Projects</span>
          </h2>
        </div>
        
        {/* Navigation Buttons */}
        <div className="hidden md:flex gap-3">
          <button 
            onClick={() => scrollContainer.current?.scrollBy({ left: -500, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text hover:bg-text hover:text-bg transition-all duration-300 active:scale-95"
          >
            ←
          </button>
          <button 
            onClick={() => scrollContainer.current?.scrollBy({ left: 500, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text hover:bg-text hover:text-bg transition-all duration-300 active:scale-95"
          >
            →
          </button>
        </div>
      </div>

      {/* Scroll Container */}
      <div 
        ref={scrollContainer}
        className="flex gap-6 overflow-x-auto pb-12 px-4 md:px-8 scrollbar-hide snap-x snap-mandatory relative z-10"
        style={{ scrollPaddingLeft: '2rem' }}
      >
        {projects.map((project, i) => (
          <div 
            key={project.id}
            className="snap-center shrink-0 w-[85vw] md:w-[600px] h-[400px] md:h-[500px] group relative rounded-[2rem] overflow-hidden bg-surface border border-border shadow-sm dark:shadow-none transition-all duration-500"
          >
            {/* Background Image/Placeholder */}
            <div className="absolute inset-0 bg-surface">
              {project.image_url ? (
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-white dark:from-white/5 dark:to-white/0">
                  <span className="text-9xl font-grotesk font-bold text-black/5 dark:text-white/5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 dark:opacity-80 transition-opacity duration-500"></div>

            {/* Content Content (Always visible at bottom) */}
            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                {typeof project.tags === 'string' ? JSON.parse(project.tags).slice(0,3).map((tag: string) => (
                  <span key={tag} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/20 text-white backdrop-blur-md border border-white/10">
                    {tag}
                  </span>
                )) : null}
              </div>

              <h3 className="text-3xl md:text-4xl font-grotesk font-bold text-white mb-2 leading-tight">
                {project.title}
              </h3>
              
              <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                 <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-md mb-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {project.description}
                </p>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 pb-2">
                  {project.demo_url && (
                    <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-white text-sm font-semibold hover:underline transition-all flex items-center gap-1">
                      Live Site ↗
                    </a>
                  )}
                  {project.repo_url && (
                    <a href={project.repo_url} target="_blank" rel="noreferrer" className="text-gray-400 text-sm font-semibold hover:text-white transition-colors">
                      Github
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* End Spacer */}
        <div className="w-8 shrink-0"></div>
      </div>
    </section>
  );
}
