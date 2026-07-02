import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Palette, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const accents = [
  { name: "terracotta", label: "Terracotta Luxury", color: "bg-[#C25D3D]" },
  { name: "olive", label: "Olive Luxury", color: "bg-[#556B4D]" },
  { name: "sand", label: "Sand Gold", color: "bg-[#C2A86A]" },
  { name: "slate", label: "Slate Calm", color: "bg-[#55738A]" },
] as const;

export default function ThemeSwitcher() {
  const { theme, accent, setTheme, setAccent, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 mb-4 p-5 bg-background border border-border rounded-2xl shadow-2xl min-w-[240px]"
          >
            <div className="space-y-6">
              {/* Mode Toggle */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Appearance</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex items-center justify-center p-2 rounded-xl border transition-all ${
                      theme === "light" ? "bg-primary/10 border-primary text-primary" : "bg-muted border-transparent text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <Sun className="w-4 h-4 mr-2" />
                    <span className="text-xs font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex items-center justify-center p-2 rounded-xl border transition-all ${
                      theme === "dark" ? "bg-primary/10 border-primary text-primary" : "bg-muted border-transparent text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <Moon className="w-4 h-4 mr-2" />
                    <span className="text-xs font-medium">Dark</span>
                  </button>
                </div>
              </div>

              {/* Accent Selector */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Brand Theme Preset</p>
                <div className="space-y-2">
                  {accents.map((a) => (
                    <button
                      key={a.name}
                      onClick={() => setAccent(a.name)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                        accent === a.name
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-muted border-transparent text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className={`w-3.5 h-3.5 rounded-full ${a.color} border border-white/20`} />
                        <span className="text-xs font-bold">{a.label}</span>
                      </div>
                      {accent === a.name && (
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl flex items-center justify-center hover:shadow-primary/20 transition-shadow"
      >
        {isOpen ? (
          <Palette className="w-6 h-6" />
        ) : (
          theme === "light" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}
