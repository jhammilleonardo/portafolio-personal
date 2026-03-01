import React, { useState, useEffect } from 'react';
import type { Project } from '../../types';

const empty = (): Partial<Project> => ({
  title: '', description: '', repo_url: '', demo_url: '',
  image_url: '', tags: [], featured: false, status: 'active',
});

function parseTags(tags: string[] | string | null): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  try { return JSON.parse(tags); } catch { return []; }
}

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-bg border border-border text-text placeholder-text-muted focus:outline-none focus:border-text transition-all duration-200 text-sm";
const labelClass = "block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide";

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Project>>(empty());
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgOk, setMsgOk] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data.data ?? []);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleEdit = (p: Project) => {
    setForm({ ...p, tags: parseTags(p.tags) });
    setEditing(p.id);
    setShowForm(true);
  };

  const handleNew = () => { setForm(empty()); setEditing(null); setShowForm(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const body = { ...form, id: editing, tags: form.tags };
    const res = await fetch('/api/admin/projects', {
      method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    const data = await res.json();
    setMsgOk(res.ok);
    setMsg(data.message ?? data.error ?? '');
    if (res.ok) { setShowForm(false); load(); }
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este proyecto?')) return;
    await fetch('/api/admin/projects', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    });
    load();
  };

  const tagsStr = Array.isArray(form.tags) ? form.tags.join(', ') : '';

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text font-grotesk">Proyectos</h1>
          <p className="text-text-muted mt-1">{projects.length} proyectos en total</p>
        </div>
        <button onClick={handleNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-text text-bg hover:opacity-90 transition-all shadow-lg shadow-text/5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
          Nuevo proyecto
        </button>
      </div>

      {msg && <div className={`mb-6 px-4 py-3 rounded-xl text-sm border ${msgOk ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>{msg}</div>}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl p-8 max-h-[90vh] overflow-y-auto bg-surface border border-border shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-xl text-text font-grotesk">
                {editing ? 'Editar proyecto' : 'Nuevo proyecto'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-text-muted hover:text-text transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'Título *', name: 'title', required: true },
                { label: 'Descripción corta', name: 'description' },
                { label: 'URL repositorio', name: 'repo_url' },
                { label: 'URL demo', name: 'demo_url' },
                { label: 'URL imagen', name: 'image_url' },
              ].map(f => (
                <div key={f.name}>
                  <label className={labelClass}>{f.label}</label>
                  <input
                    className={inputClass}
                    required={f.required}
                    value={(form as Record<string, unknown>)[f.name] as string ?? ''}
                    onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                  />
                </div>
              ))}
              <div>
                <label className={labelClass}>Tags (separados por coma)</label>
                <input className={inputClass} value={tagsStr}
                  onChange={e => setForm(p => ({ ...p, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))}
                  placeholder="React, TypeScript, Node.js" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className={labelClass}>Estado</label>
                  <select className={inputClass}
                    value={form.status ?? 'active'}
                    onChange={e => setForm(p => ({ ...p, status: e.target.value as Project['status'] }))}>
                    <option value="active">Activo</option>
                    <option value="wip">En progreso</option>
                    <option value="archived">Archivado</option>
                  </select>
                </div>
                <div className="flex items-end pb-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={!!form.featured}
                      onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
                      className="w-5 h-5 accent-text rounded-md" />
                    <span className="text-sm font-medium text-text-muted">Destacado</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-border">
                <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-bold text-bg bg-text hover:opacity-90 transition-all shadow-sm">
                  {editing ? 'Guardar cambios' : 'Crear proyecto'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium bg-bg border border-border text-text-muted hover:text-text transition-all">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 text-text-muted">Cargando...</div>
      ) : (
        <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg/50">
                {['Título', 'Tags', 'Estado', 'Destacado', 'Acciones'].map(h => (
                  <th key={h} className="px-6 py-4 text-left font-semibold text-text-muted text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-bg/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text">{p.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {parseTags(p.tags).slice(0, 2).map(t => (
                        <span key={t} className="px-2.5 py-1 rounded-md text-xs font-medium bg-bg border border-border text-text-muted">
                          {t}
                        </span>
                      ))}
                      {parseTags(p.tags).length > 2 && (
                        <span className="text-xs text-text-muted self-center ml-1">+{parseTags(p.tags).length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      p.status === 'active' ? 'bg-emerald-500/10 text-emerald-600' : 
                      p.status === 'wip' ? 'bg-amber-500/10 text-amber-600' : 'bg-slate-500/10 text-slate-600'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-muted">
                    {p.featured ? <span className="text-amber-500 text-lg">★</span> : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-text hover:bg-bg border border-transparent hover:border-border transition-all">
                        Editar
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-all">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <p className="text-center py-16 text-text-muted">No hay proyectos aún.</p>
          )}
        </div>
      )}
    </div>
  );
}
