import React, { useState, useEffect } from 'react';
import type { Certification } from '../../types';

const empty = (): Partial<Certification> => ({
  title: '', issuer: '', issue_date: '', expiry_date: '', credential_url: '', image_url: '', description: '',
});

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-bg border border-border text-text placeholder-text-muted focus:outline-none focus:border-text transition-all duration-200 text-sm";
const labelClass = "block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide";

export function CertsManager() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Certification>>(empty());
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgOk, setMsgOk] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/certifications');
      const data = await res.json();
      setCerts(data.data ?? []);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleEdit = (c: Certification) => { setForm(c); setEditing(c.id); setShowForm(true); };
  const handleNew = () => { setForm(empty()); setEditing(null); setShowForm(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/certifications', {
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
    if (!confirm('¿Eliminar esta certificación?')) return;
    await fetch('/api/admin/certifications', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    });
    load();
  };

  const fields = [
    { label: 'Título *', name: 'title', required: true },
    { label: 'Emisor *', name: 'issuer', required: true },
    { label: 'Fecha emisión', name: 'issue_date', type: 'date' },
    { label: 'Fecha vencimiento', name: 'expiry_date', type: 'date' },
    { label: 'URL credencial', name: 'credential_url' },
    { label: 'URL imagen', name: 'image_url' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text font-grotesk">Certificaciones</h1>
          <p className="text-text-muted mt-1">{certs.length} certificaciones</p>
        </div>
        <button onClick={handleNew} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-text text-bg hover:opacity-90 transition-all shadow-lg shadow-text/5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
          Nueva certificación
        </button>
      </div>

      {msg && <div className={`mb-6 px-4 py-3 rounded-xl text-sm border ${msgOk ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>{msg}</div>}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl p-8 max-h-[90vh] overflow-y-auto bg-surface border border-border shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-xl text-text font-grotesk">
                {editing ? 'Editar certificación' : 'Nueva certificación'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-text-muted hover:text-text transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {fields.map(f => (
                <div key={f.name}>
                  <label className={labelClass}>{f.label}</label>
                  <input type={f.type ?? 'text'} className={inputClass} required={f.required}
                    value={(form as Record<string, unknown>)[f.name] as string ?? ''}
                    onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))} />
                </div>
              ))}
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
        <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg/50">
                {['Título', 'Emisor', 'Fecha', 'Acciones'].map(h => (
                  <th key={h} className="px-6 py-4 text-left font-semibold text-text-muted text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {certs.map(c => (
                <tr key={c.id} className="hover:bg-bg/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text">{c.title}</td>
                  <td className="px-6 py-4 text-text-muted">{c.issuer}</td>
                  <td className="px-6 py-4 text-text-muted">
                    {c.issue_date ? new Date(c.issue_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' }) : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(c)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-text hover:bg-bg border border-transparent hover:border-border transition-all">Editar</button>
                      <button onClick={() => handleDelete(c.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-all">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {certs.length === 0 && <p className="text-center py-16 text-text-muted">No hay certificaciones.</p>}
        </div>
      )}
    </div>
  );
}
