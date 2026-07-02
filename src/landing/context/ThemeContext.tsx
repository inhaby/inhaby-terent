import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Accent = "terracotta" | "olive" | "sand" | "slate";

interface ThemeContextType {
  theme: Theme;
  accent: Accent;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "light";
    }
    return "light";
  });

  const [accent, setAccentState] = useState<Accent>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("accent") as Accent) || "terracotta";
    }
    return "terracotta";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-accent", accent);
    localStorage.setItem("accent", accent);
  }, [accent]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const setAccent = (newAccent: Accent) => setAccentState(newAccent);
  const toggleTheme = () => setThemeState((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
