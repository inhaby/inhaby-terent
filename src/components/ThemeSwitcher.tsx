import React from 'react';
import { Sun, Moon, Palette, Check, X, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type AccentTheme = 'terracotta' | 'olive' | 'sand' | 'slate';

interface ThemeSwitcherProps {
  currentAccent: AccentTheme;
  isDark: boolean;
  onAccentChange: (accent: AccentTheme) => void;
  onDarkToggle: (dark: boolean) => void;
  mode?: 'floating' | 'inline';
  buttonTheme?: 'light' | 'dark';
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentAccent,
  isDark,
  onAccentChange,
  onDarkToggle,
  mode = 'floating',
  buttonTheme = 'light'
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const themeOptions: { id: AccentTheme; name: string; accentColor: string; bgClass: string; textColor: string }[] = [
    { 
      id: 'terracotta', 
      name: 'Terracotta', 
      accentColor: '#B85C38',
      bgClass: 'bg-[#FAF8F5]',
      textColor: 'text-[#2D2D2D]'
    },
    { 
      id: 'olive', 
      name: 'Olive Luxury', 
      accentColor: '#5C6B4F',
      bgClass: 'bg-[#F1F3ED]',
      textColor: 'text-[#2C3327]'
    },
    { 
      id: 'sand', 
      name: 'Sand Gold', 
      accentColor: '#C2A878',
      bgClass: 'bg-[#FAF4E6]',
      textColor: 'text-[#4A3D25]'
    },
    { 
      id: 'slate', 
      name: 'Slate Calm', 
      accentColor: '#607D8B',
      bgClass: 'bg-[#ECEFF1]',
      textColor: 'text-[#2E3C42]'
    }
  ];

  const isInline = mode === 'inline';
  
  // Choose button style based on mode and buttonTheme
  let buttonClasses = "w-12 h-12 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all border border-theme-border bg-theme-surface text-theme-accent hover:text-theme-accent-hover select-none outline-none";
  let buttonStyle: React.CSSProperties = { boxShadow: '0 20px 40px -5px rgba(0,0,0,0.15)' };

  if (isInline) {
    buttonStyle = {};
    if (buttonTheme === 'dark') {
      buttonClasses = "w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all border border-white/20 bg-white/10 text-white hover:bg-white/20 select-none outline-none";
    } else {
      buttonClasses = "w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all border border-theme-border/60 bg-theme-bg text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-border/40 select-none outline-none";
    }
  }

  const iconSize = isInline ? 18 : 20;

  return (
    <div className={isInline ? "relative font-sans inline-block" : "fixed bottom-6 right-6 z-[120] font-sans"}>
      
      {/* Dynamic Switcher Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={buttonClasses}
        style={buttonStyle}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={iconSize} className="stroke-[2.5]" />
            </motion.div>
          ) : (
            <motion.div
              key="palette"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Palette size={iconSize} className="stroke-[2.5]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Slide-out Premium Experience Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile/tablet viewports to easily close/dismiss */}
            {isInline && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/35 z-[140] lg:hidden cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            )}
            
            <motion.div
              initial={isInline ? { opacity: 0, y: -10, scale: 0.95 } : { opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={isInline ? { opacity: 0, y: -10, scale: 0.95 } : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={isInline 
                ? "fixed lg:absolute top-[15vh] lg:top-12 left-0 right-0 lg:left-auto lg:right-0 mx-auto lg:mx-0 w-[90vw] max-w-[340px] lg:w-80 bg-theme-surface border border-theme-border rounded-3xl p-6 shadow-2xl space-y-6 z-[150] origin-top lg:origin-top-right" 
                : "absolute bottom-16 right-0 w-80 bg-theme-surface border border-theme-border rounded-3xl p-6 shadow-2xl space-y-6 z-[150] origin-bottom-right"
              }
              style={{ backdropFilter: 'blur(16px)' }}
            >
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-theme-border pb-4">
              <div className="space-y-0.5">
                <h3 className="font-serif text-lg font-bold text-theme-text-primary">Boutique Themes</h3>
                <p className="text-[10px] text-theme-text-secondary font-semibold uppercase tracking-widest">Homstay Luxury Aesthetic</p>
              </div>
              <motion.button
                onClick={() => onDarkToggle(!isDark)}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 bg-theme-accent-soft text-theme-accent rounded-xl hover:bg-theme-accent hover:text-white transition-all flex items-center justify-center cursor-pointer"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun size={18} className="stroke-[2.5]" /> : <Moon size={18} className="stroke-[2.5]" />}
              </motion.button>
            </div>

            {/* Accent selection options (Tiny Preview Cards!) */}
            <div className="space-y-3">
              <span className="text-[10px] text-theme-text-secondary font-bold uppercase tracking-wider block">
                Heritage Accents
              </span>
              
              <div className="grid grid-cols-2 gap-3.5">
                {themeOptions.map((opt) => {
                  const isSelected = currentAccent === opt.id;
                  
                  return (
                    <button
                      key={opt.id}
                      onClick={() => onAccentChange(opt.id)}
                      className={`group relative text-left rounded-2xl overflow-hidden border p-3 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-theme-accent ring-2 ring-theme-accent/20 bg-theme-accent-soft' 
                          : 'border-theme-border bg-theme-surface hover:border-theme-text-secondary/30'
                      }`}
                    >
                      {/* Mini Preview Card representation */}
                      <div className="space-y-2">
                        {/* Mock card layout indicator */}
                        <div className="flex items-center gap-1.5 pb-1">
                          <div 
                            className="w-3.5 h-3.5 rounded-full border border-theme-border shrink-0 transition-transform group-hover:scale-110" 
                            style={{ backgroundColor: opt.accentColor }}
                          />
                          <span className="text-[11px] font-black tracking-tight text-theme-text-primary truncate">
                            {opt.name.split(' ')[0]}
                          </span>
                        </div>
                        
                        {/* Mini abstract UI preview block */}
                        <div className={`p-1.5 rounded-lg border border-theme-border/50 text-[8px] font-sans h-8 flex flex-col justify-between ${isDark ? 'bg-zinc-800' : 'bg-stone-50'}`}>
                          <div className="w-10 h-1 bg-theme-accent rounded-full mb-1" />
                          <div className="w-full h-1 bg-theme-text-secondary/20 rounded-full" />
                          <div className="flex items-center justify-between mt-auto">
                            <span className="font-extrabold uppercase text-[6px] tracking-widest text-theme-text-secondary">LUXE</span>
                            {isSelected && <Check size={8} className="text-theme-accent stroke-[4]" />}
                          </div>
                        </div>

                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brand Signature footnote */}
            <div className="bg-theme-accent-soft/40 p-3 rounded-2xl border border-theme-border text-center">
              <p className="text-[10px] text-theme-text-secondary leading-relaxed">
                Experience dynamic, boutique lighting & accent schemes reflecting India’s modern hospitality.
              </p>
            </div>

          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
