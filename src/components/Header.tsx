import React from 'react';
import { Heart, Bell, MapPin, ChevronDown, Search, SlidersHorizontal, ChevronLeft } from 'lucide-react';
import { ThemeSwitcher, AccentTheme } from './ThemeSwitcher';
import { CATEGORIES } from '../data';

interface HeaderProps {
  onOpenFilters: () => void;
  onOpenWishlist: () => void;
  savedCount: number;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onSearchClick?: () => void;
  currentAccent: AccentTheme;
  isDark: boolean;
  onAccentChange: (accent: AccentTheme) => void;
  onDarkToggle: (dark: boolean) => void;
  onOpenLocationSelector: () => void;
  onOpenNotifications: () => void;
  selectedLocationName: string;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenFilters, 
  onOpenWishlist, 
  savedCount,
  searchQuery,
  onSearchChange,
  onSearchClick,
  currentAccent,
  isDark,
  onAccentChange,
  onDarkToggle,
  onOpenLocationSelector,
  onOpenNotifications,
  selectedLocationName,
  unreadNotificationsCount = 0
}) => (
  <header className="bg-theme-surface border-b border-theme-border/60 px-6 pt-10 pb-6 text-theme-text-primary md:px-12 md:py-8 transition-colors duration-300 shadow-sm font-sans">
    <div className="max-w-3xl md:mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="relative inline-block">
            <span className="text-xl font-serif font-black tracking-tight text-theme-text-primary">Homstay</span>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-theme-accent rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-sans">
          <ThemeSwitcher 
            currentAccent={currentAccent} 
            isDark={isDark} 
            onAccentChange={onAccentChange} 
            onDarkToggle={onDarkToggle} 
            mode="inline"
            buttonTheme="light"
          />
          <button onClick={onOpenWishlist} className="p-2.5 bg-theme-bg text-theme-text-secondary rounded-full relative hover:bg-theme-border transition-all outline-none">
            <Heart size={18} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-theme-accent text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md">
                {savedCount}
              </span>
            )}
          </button>
          <button onClick={onOpenNotifications} className="p-2.5 bg-theme-bg text-theme-text-secondary rounded-full hover:bg-theme-border transition-all outline-none font-sans relative">
            <Bell size={18} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-theme-accent text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      <div 
        onClick={onOpenLocationSelector}
        className="flex items-center gap-1.5 mb-6 text-theme-text-secondary md:justify-center cursor-pointer hover:text-theme-accent transition-colors select-none"
      >
        <MapPin size={13} className="text-theme-accent stroke-[2.5]" />
        <span className="text-xs font-semibold">{selectedLocationName || "Riya Bhati House"}</span>
        <ChevronDown size={12} className="opacity-70" />
      </div>

      <div 
        onClick={onSearchClick}
        className="relative md:max-w-xl md:mx-auto cursor-pointer"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-secondary/60" size={16} />
        <input 
          type="text" 
          placeholder="Search location, property..." 
          value={searchQuery}
          onChange={(e) => {
            if (onSearchClick) {
              onSearchClick();
            } else {
              onSearchChange(e.target.value);
            }
          }}
          onFocus={(e) => {
            if (onSearchClick) {
              e.preventDefault();
              e.target.blur();
              onSearchClick();
            }
          }}
          className="w-full bg-theme-bg text-theme-text-primary border border-theme-border rounded-2xl py-3.5 pl-11 pr-12 text-xs font-bold focus:ring-2 focus:ring-theme-accent/30 focus:border-theme-accent outline-none shadow-sm transition-all cursor-pointer"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onSearchClick) {
              onSearchClick();
            } else {
              onOpenFilters();
            }
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-theme-text-secondary hover:text-theme-accent transition-colors"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </div>
  </header>
);

interface CategoryNavProps {
  activeCategory: string;
  onSelect: (id: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategory, onSelect }) => (
  <div className="bg-theme-surface border-b border-theme-border/60 py-4 overflow-x-auto no-scrollbar transition-colors duration-300">
    <div className="flex gap-2.5 px-6">
      <button 
        onClick={() => onSelect('all')}
        className={`px-5 py-2.5 rounded-2xl text-[10px] font-sans font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
          activeCategory === 'all' 
            ? 'bg-theme-accent text-white shadow-md shadow-theme-accent/25' 
            : 'bg-theme-bg text-theme-text-secondary hover:bg-theme-border/50 border border-theme-border/60'
        }`}
      >
        All Verified
      </button>
      {CATEGORIES.map((cat) => (
        <button 
          key={cat.id} 
          onClick={() => onSelect(cat.id)}
          className={`px-5 py-2.5 rounded-2xl text-[10px] font-sans font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeCategory === cat.id 
              ? 'bg-theme-accent text-white shadow-md shadow-theme-accent/25' 
              : 'bg-theme-bg text-theme-text-secondary hover:bg-theme-border/50 border border-theme-border/60'
          }`}
        >
          <cat.icon size={13} />
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  </div>
);
