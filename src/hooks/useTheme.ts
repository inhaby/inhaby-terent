import { useTheme as useUnifiedTheme } from '../landing/context/ThemeContext';

export type AccentTheme = 'terracotta' | 'olive' | 'sand' | 'slate';

export function useTheme() {
  const { theme, accent, setTheme, setAccent } = useUnifiedTheme();
  
  return {
    isDark: theme === 'dark',
    setIsDark: (dark: boolean) => setTheme(dark ? 'dark' : 'light'),
    accent: accent as AccentTheme,
    setAccent: (acc: AccentTheme) => setAccent(acc)
  };
}
