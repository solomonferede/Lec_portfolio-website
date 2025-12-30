import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'light') html.classList.remove('dark');
    else html.classList.add('dark');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }

  return { theme, toggleTheme };
}


