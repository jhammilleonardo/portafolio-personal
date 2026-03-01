import React, { useState } from 'react';

interface ContactFormProps {
  email?: string | null;
  location?: string | null;
  availability?: string | null;
}

export function ContactForm({ email, location, availability }: ContactFormProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Error al enviar');
      }
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error inesperado');
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-text-muted
    focus:outline-none focus:border-text focus:bg-bg transition-all duration-200 text-sm shadow-sm`;

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg border-t border-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-text-muted uppercase tracking-widest mb-3">¿Hablamos?</p>
          <h2 className="font-grotesk text-4xl font-bold text-text">
            Ponte en <span className="text-text-muted">contacto</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-md mx-auto text-sm">
            Tengo un proyecto en mente o simplemente quieres saludar — mi bandeja siempre está abierta.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
          {/* Info */}
          <div className="space-y-6">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                ),
                label: 'Email',
                value: email || 'tu@email.com',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: 'Ubicación',
                value: location || 'Tu Ciudad, País',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                ),
                label: 'Disponibilidad',
                value: availability || 'Lun–Vie, 9am–6pm',
              },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-surface hover:bg-bg hover:shadow-lg transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:shadow-none">
                <div className="w-10 h-10 rounded-xl bg-text text-bg flex items-center justify-center shrink-0 dark:bg-white dark:text-black">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-muted mb-0.5 uppercase tracking-wide">{item.label}</p>
                  <div className="text-text font-medium text-sm">
                    {(() => {
                      if (item.label === 'Disponibilidad' && typeof item.value === 'string') {
                        try {
                          const parsed = JSON.parse(item.value);
                          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].day) {
                            return (
                              <div className="flex flex-col gap-1.5 mt-2 w-full max-w-[240px]">
                                {parsed.map((d: any, idx: number) => {
                                  if (!d.hours) return null;
                                  return (
                                    <div key={idx} className="flex justify-between items-center text-xs pb-1.5 border-b border-border/50 last:border-0 last:pb-0">
                                      <span className="text-text-muted">{d.day}</span>
                                      <span className="font-semibold">{d.hours}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          }
                        } catch (e) {
                          // Not JSON, fallback to default rendering
                        }
                      }
                      
                      return typeof item.value === 'string' 
                        ? item.value.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i !== item.value.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          ))
                        : item.value;
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-bg p-8 rounded-3xl border border-border shadow-xl shadow-text/5 dark:bg-white/5 dark:border-white/10 dark:shadow-none">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-text-muted mb-1.5 block font-medium">Nombre *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1.5 block font-medium">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-text-muted mb-1.5 block font-medium">Asunto</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="¿De qué se trata?"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs text-text-muted mb-1.5 block font-medium">Mensaje *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Cuéntame sobre tu proyecto..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'success' && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                ¡Mensaje enviado! Te respondo pronto.
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
                </svg>
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-text text-bg hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-text/10"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
