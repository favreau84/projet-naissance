import { useEffect, useRef, useState } from 'react';

// Hook simple pour persister une valeur dans localStorage sous une clé donnée.
export function usePersistedState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return initial;
      return JSON.parse(raw);
    } catch {
      return initial;
    }
  });

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota/private mode : on ignore silencieusement
    }
  }, [key, value]);

  return [value, setValue];
}
