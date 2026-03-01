import React, { useState } from 'react';
import { ProfileManager } from './ProfileManager';
import { ProjectsManager } from './ProjectsManager';
import { CertsManager } from './CertsManager';
import { SkillsManager } from './SkillsManager';
import { MessagesManager } from './MessagesManager';

type Tab = 'profile' | 'projects' | 'certifications' | 'skills' | 'messages';

interface DashboardProps {
  onLogout: () => void;
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'profile', label: 'Perfil',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  },
  {
    id: 'projects', label: 'Proyectos',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>,
  },
  {
    id: 'certifications', label: 'Certificaciones',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  },
  {
    id: 'skills', label: 'Skills',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  },
  {
    id: 'messages', label: 'Mensajes',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
];

export function Dashboard({ onLogout }: DashboardProps) {
  const [tab, setTab] = useState<Tab>('projects');

  return (
    <div className="min-h-screen flex bg-bg text-text font-inter transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-surface border-r border-border h-screen sticky top-0">
        {/* Logo */}
        <div className="px-6 py-8 border-b border-border">
          <span className="font-grotesk font-bold text-xl text-text">
            Admin Panel
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                tab === t.id 
                  ? 'bg-text text-bg shadow-lg shadow-text/5' 
                  : 'text-text-muted hover:bg-bg hover:text-text'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-6 border-t border-border space-y-2">
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-text-muted hover:bg-bg hover:text-text transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
            </svg>
            Ver sitio
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-text-muted hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-bg p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          {tab === 'profile' && <ProfileManager />}
          {tab === 'projects' && <ProjectsManager />}
          {tab === 'certifications' && <CertsManager />}
          {tab === 'skills' && <SkillsManager />}
          {tab === 'messages' && <MessagesManager />}
        </div>
      </main>
    </div>
  );
}
