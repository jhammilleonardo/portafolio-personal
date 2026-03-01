import React, { useState, useEffect } from 'react';
import type { ContactMessage } from '../../types';

export function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      const data = await res.json();
      setMessages(data.data ?? []);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: number) => {
    await fetch('/api/admin/messages', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este mensaje?')) return;
    await fetch('/api/admin/messages', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    });
    if (selected?.id === id) setSelected(null);
    load();
  };

  const unread = messages.filter(m => !m.read_at).length;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text font-grotesk">Mensajes</h1>
        <p className="text-text-muted mt-1">
          {messages.length} mensajes
          {unread > 0 && <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-text text-bg">{unread} sin leer</span>}
        </p>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl p-8 bg-surface border border-border shadow-2xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-bold text-text text-xl font-grotesk">
                  {selected.subject ?? 'Sin asunto'}
                </h2>
                <p className="text-sm mt-1 text-text-muted">
                  De <span className="text-text font-medium">{selected.name}</span> — {selected.email}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-text-muted hover:text-text transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
              </button>
            </div>
            <div className="p-6 rounded-2xl text-sm leading-relaxed mb-6 bg-bg border border-border text-text">
              {selected.message}
            </div>
            <div className="flex gap-3">
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject ?? ''}`}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-bg bg-text text-center hover:opacity-90 transition-all shadow-sm">
                Responder
              </a>
              {!selected.read_at && (
                <button onClick={() => { markRead(selected.id); setSelected(null); }}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium bg-bg border border-border text-text-muted hover:text-text transition-all">
                  Marcar leído
                </button>
              )}
              <button onClick={() => handleDelete(selected.id)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-text-muted">Cargando...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-24 text-text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-20">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          No hay mensajes aún.
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            {messages.map(m => (
              <div key={m.id}
                className={`group px-6 py-5 flex items-start gap-5 cursor-pointer transition-colors hover:bg-bg/50 ${!m.read_at ? 'bg-bg/30' : ''}`}
                onClick={() => setSelected(m)}>
                {/* Unread dot */}
                <div className={`mt-2 w-2.5 h-2.5 rounded-full flex-shrink-0 ${!m.read_at ? 'bg-text' : 'bg-transparent border border-border'}`} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className={`text-sm font-medium truncate ${!m.read_at ? 'text-text' : 'text-text-muted'}`}>{m.name}</span>
                    <span className="text-xs flex-shrink-0 text-text-muted">
                      {new Date(m.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-xs mb-1.5 text-text-muted">{m.email}</p>
                  {m.subject && <p className="text-sm font-medium mb-1 text-text">{m.subject}</p>}
                  <p className="text-sm truncate text-text-muted">{m.message}</p>
                </div>

                <button onClick={e => { e.stopPropagation(); handleDelete(m.id); }}
                  className="flex-shrink-0 p-2 rounded-lg transition-colors text-text-muted hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
