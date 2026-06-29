import React from 'react';
import { 
  Home, 
  Calendar, 
  Footprints, 
  MessageSquare, 
  User, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { ThemeSwitcher, AccentTheme } from '../../components/ThemeSwitcher';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount: number;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  accent: AccentTheme;
  setAccent: (accent: AccentTheme) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  unreadCount,
  isDark,
  setIsDark,
  accent,
  setAccent,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navItems = [
    { id: 'HOME', icon: Home, label: 'Home', subtitle: 'Explore' },
    { id: 'BOOKINGS', icon: Calendar, label: 'Bookings', subtitle: 'Verify' },
    { id: 'VISITS', icon: Footprints, label: 'Visits', subtitle: 'Saved', badge: 0 },
    { id: 'MESSAGES', icon: MessageSquare, label: 'Messages', subtitle: 'Chats', badge: unreadCount },
    { id: 'ACCOUNT', icon: User, label: 'Profile', subtitle: 'Settings' }
  ];

  return (
    <aside 
      id="homstay-app-sidebar"
      className="hidden md:flex lg:hidden flex-col h-screen shrink-0 bg-theme-surface border-r border-theme-border/60 transition-all duration-300 relative z-30 select-none w-[88px]"
    >
      {/* 1. BRAND LOGO SECTION */}
      <div className="h-20 flex items-center justify-center lg:justify-start px-3 border-b border-theme-border/40 shrink-0">
        <div 
          onClick={() => onTabChange('HOME')}
          className="flex flex-col items-center lg:items-start cursor-pointer select-none group w-full overflow-hidden text-center lg:text-left"
        >
          <span className="text-base lg:text-lg font-serif font-black tracking-tight leading-none text-theme-text-primary group-hover:text-theme-accent transition-colors">
            Homstay
          </span>
          <span className="text-[7px] lg:text-[8px] text-theme-text-secondary font-black tracking-widest uppercase leading-none mt-1.5 whitespace-nowrap">
            Zero Brokerage
          </span>
        </div>
      </div>

      {/* 2. NAVIGATION LINKS CONTAINER */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          const isCompact = isCollapsed;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full rounded-2xl flex transition-all duration-200 cursor-pointer relative group items-center ${
                isActive 
                  ? 'bg-theme-accent-soft text-theme-accent border border-theme-accent/15' 
                  : 'text-theme-text-secondary border border-transparent hover:bg-theme-bg/50 hover:text-theme-text-primary'
              } ${
                isCompact 
                  ? 'flex-col justify-center py-3.5 gap-1 text-center' 
                  : 'lg:flex-row lg:justify-start lg:px-4 lg:py-3.5 flex-col justify-center py-3.5 gap-1 text-center lg:gap-3.5'
              }`}
            >
              {/* Icon Container */}
              <div className="relative shrink-0 flex items-center justify-center">
                <Icon 
                  size={20} 
                  className={`transition-transform duration-200 group-hover:scale-105 stroke-[2.3] ${
                    isActive ? 'text-theme-accent' : 'text-theme-text-secondary/75 group-hover:text-theme-text-primary'
                  }`} 
                  fill={isActive ? 'currentColor' : 'none'} 
                />
                
                {/* Badge Indicator */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-theme-accent text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg animate-pulse border-2 border-theme-surface">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Text Label */}
              <div className={`flex flex-col text-left transition-all duration-200 ${
                isCompact ? 'items-center' : 'lg:items-start items-center'
              }`}>
                <span className={`text-[10px] font-extrabold tracking-wide uppercase transition-colors ${
                  isActive ? 'text-theme-text-primary' : 'text-theme-text-secondary group-hover:text-theme-text-primary'
                } ${
                  isCompact ? 'text-[9px] truncate max-w-[76px]' : 'lg:text-xs text-[9px]'
                }`}>
                  {item.label}
                </span>
                
                {!isCompact && (
                  <span className="hidden lg:inline text-[9px] text-theme-text-secondary/60 font-medium leading-none mt-0.5">
                    {item.subtitle}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* 3. SETTINGS & CONSOLE FOOTER BAR */}
      <div className="p-3 border-t border-theme-border/40 shrink-0 space-y-3 bg-theme-surface/75 backdrop-blur-sm">
        <div className="flex justify-center w-full">
          <ThemeSwitcher 
            currentAccent={accent} 
            isDark={isDark} 
            onAccentChange={setAccent} 
            onDarkToggle={setIsDark} 
            mode="inline" 
          />
        </div>

        <div className="hidden lg:block pt-1">
          <button
            onClick={onToggleCollapse}
            className="w-full py-2.5 rounded-xl border border-theme-border/60 bg-theme-bg hover:bg-theme-border/30 text-theme-text-secondary hover:text-theme-text-primary transition-all flex items-center justify-center gap-2 cursor-pointer text-[10px] font-black uppercase tracking-wider active:scale-95 shadow-sm"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight size={14} className="stroke-[2.5]" />
            ) : (
              <>
                <ChevronLeft size={14} className="stroke-[2.5]" />
                <span className="font-extrabold text-[9px] tracking-widest">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
