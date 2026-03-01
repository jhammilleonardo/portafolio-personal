import React, { useState, useEffect } from 'react';
import type { Skill } from '../../types';

const empty = (): Partial<Skill> => ({ name: '', category: 'Frontend', level: 50, icon: '', color: '#7c3aed' });

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-bg border border-border text-text placeholder-text-muted focus:outline-none focus:border-text transition-all duration-200 text-sm";
const labelClass = "block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide";

const CATEGORIES = ['Frontend', 'Backend', 'Databases', 'DevOps', 'Mobile', 'Other'];

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Skill>>(empty());
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgOk, setMsgOk] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/skills');
      const data = await res.json();
      setSkills(data.data ?? []);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleEdit = (s: Skill) => { setForm(s); setEditing(s.id); setShowForm(true); };
  const handleNew = () => { setForm(empty()); setEditing(null); setShowForm(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/skills', {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: editing }),
    });
    const data = await res.json();
    setMsgOk(res.ok);
    setMsg(data.message ?? data.error ?? '');
    if (res.ok) { setShowForm(false); load(); }
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta skill?')) return;
    await fetch('/api/admin/skills', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    });
    load();
  };

  const grouped = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text font-grotesk">Skills</h1>
          <p className="text-text-muted mt-1">{skills.length} habilidades</p>
        </div>
        <button onClick={handleNew} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-text text-bg hover:opacity-90 transition-all shadow-lg shadow-text/5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
          Nueva skill
        </button>
      </div>

      {msg && <div className={`mb-6 px-4 py-3 rounded-xl text-sm border ${msgOk ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>{msg}</div>}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl p-8 bg-surface border border-border shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-text font-grotesk">
                {editing ? 'Editar skill' : 'Nueva skill'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-text-muted hover:text-text transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={labelClass}>Nombre *</label>
                <input className={inputClass} required value={form.name ?? ''}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="React, TypeScript..." />
              </div>
              <div>
                <label className={labelClass}>Categoría *</label>
                <select className={inputClass} value={form.category ?? 'Frontend'}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Ícono (nombre)</label>
                  <input className={inputClass} value={form.icon ?? ''}
                    onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} placeholder="react" />
                </div>
                <div>
                  <label className={labelClass}>Color</label>
                  <div className="flex gap-2">
                    <input type="color" value={form.color ?? '#7c3aed'}
                      onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                      className="w-10 h-10 rounded-lg border border-border cursor-pointer bg-bg p-1" />
                    <input className={inputClass} value={form.color ?? ''}
                      onChange={e => setForm(p => ({ ...p, color: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-border">
                <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-bold text-bg bg-text hover:opacity-90 transition-all shadow-sm">
                  {editing ? 'Guardar' : 'Crear'}
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

      {loading ? (
        <div className="text-center py-20 text-text-muted">Cargando...</div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-border bg-bg/50">
                <span className="text-sm font-bold text-text">{category}</span>
                <span className="ml-2 text-xs text-text-muted">({items.length})</span>
              </div>
              <div className="divide-y divide-border">
                {items.map(s => (
                  <div key={s.id} className="px-6 py-4 flex items-center gap-4 hover:bg-bg/50 transition-colors">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color ?? '#7c3aed' }} />
                    <span className="flex-1 text-sm text-text font-medium">{s.name}</span>

                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(s)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-text hover:bg-bg border border-transparent hover:border-border transition-all">Editar</button>
                      <button onClick={() => handleDelete(s.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-all">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {skills.length === 0 && <p className="text-center py-16 text-text-muted">No hay skills.</p>}
        </div>
      )}
    </div>
  );
}
