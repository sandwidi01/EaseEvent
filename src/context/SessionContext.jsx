import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const SessionContext = createContext(null);
const KEY = 'eventease.session';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null;
  } catch {
    return null;
  }
}

// Gestion de l'état de la session utilisateur (persistée dans localStorage).
export function SessionProvider({ children }) {
  const [user, setUser] = useState(load);

  const login = useCallback((name, email) => {
    const u = { name: name.trim(), email: email.trim() };
    setUser(u);
    try { localStorage.setItem(KEY, JSON.stringify(u)); } catch { /* ignore */ }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession doit être utilisé dans SessionProvider');
  return ctx;
};
