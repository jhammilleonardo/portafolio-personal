import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { Dashboard } from './Dashboard';

interface AdminAppProps {
  initialAuthed: boolean;
}

export function AdminApp({ initialAuthed }: AdminAppProps) {
  const [authed, setAuthed] = useState(initialAuthed);

  const handleLogin = () => setAuthed(true);

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setAuthed(false);
  };

  if (!authed) return <LoginForm onLogin={handleLogin} />;
  return <Dashboard onLogout={handleLogout} />;
}
