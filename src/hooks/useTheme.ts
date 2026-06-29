import { useState, useEffect } from 'react';

export type AccentTheme = 'terracotta' | 'olive' | 'sand' | 'slate';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('homstay-theme-dark') === 'true';
  });

  const [accent, setAccent] = useState<AccentTheme>(() => {
    return (localStorage.getItem('homstay-theme-accent') as AccentTheme) || 'terracotta';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
    } else {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
    }
    localStorage.setItem('homstay-theme-dark', String(isDark));
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('accent-terracotta', 'accent-olive', 'accent-sand', 'accent-slate');
    root.classList.add(`accent-${accent}`);
    localStorage.setItem('homstay-theme-accent', accent);
  }, [accent]);

  return { isDark, setIsDark, accent, setAccent };
}
