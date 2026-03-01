import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onLogin();
      } else {
        const data = await res.json();
        setError(data.error ?? 'Contraseña incorrecta.');
      }
    } catch {
      setError('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg text-text transition-colors duration-300">
      <div className="relative w-full max-w-sm">
        <div className="bg-surface border border-border rounded-3xl p-10 shadow-2xl shadow-text/5">

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 bg-text text-bg shadow-lg shadow-text/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          <h1 className="text-center text-3xl font-bold mb-2 font-grotesk tracking-tight">
            Admin Panel
          </h1>
          <p className="text-center text-sm mb-10 text-text-muted">
            Ingresa tu contraseña para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-medium mb-2 text-text-muted uppercase tracking-wide">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoFocus
                className="w-full px-5 py-3.5 rounded-xl text-sm bg-bg border border-border text-text placeholder-text-muted focus:outline-none focus:border-text transition-all shadow-sm"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center gap-2 text-sm text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-bg bg-text hover:opacity-90 transition-all shadow-lg shadow-text/10 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Verificando...' : 'Entrar al Panel'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="/" className="text-xs font-medium text-text-muted hover:text-text transition-colors border-b border-transparent hover:border-text pb-0.5">
              ← Volver al sitio público
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}