import React from 'react';
import { 
  Search, 
  Home, 
  Calendar, 
  Footprints, 
  User,
  SlidersHorizontal,
  ChevronDown,
  MessageSquare,
  Heart,
  ShieldCheck,
  MapPin,
  Tag,
  HelpCircle,
  FileText,
  Info,
  LogOut,
  Bell
} from 'lucide-react';
import { ThemeSwitcher, AccentTheme } from '../../components/ThemeSwitcher';

interface DesktopHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  savedCount: number;
  onOpenFilters: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onSearchClick?: () => void;
  unreadMessagesCount?: number;
  isDark?: boolean;
  setIsDark?: (dark: boolean) => void;
  accent?: AccentTheme;
  setAccent?: (accent: AccentTheme) => void;
  showToast?: (msg: string) => void;
  onOpenLocationSelector: () => void;
  selectedLocationName: string;
  onOpenNotifications: () => void;
  unreadNotificationsCount?: number;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  activeTab,
  onTabChange,
  savedCount,
  onOpenFilters,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSearchClick,
  unreadMessagesCount = 0,
  isDark,
  setIsDark,
  accent,
  setAccent,
  onOpenLocationSelector,
  selectedLocationName,
  onOpenNotifications,
  unreadNotificationsCount = 0
}) => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [width, setWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = width < 1024;
  const showWishlist = !isTablet && width >= 1250;
  const showVisits = !isTablet && width >= 1250;
  const showBookings = !isTablet && width >= 1250;
  const showMessages = !isTablet && width >= 1150;
  const showNotifications = !isTablet && width >= 1150;

  return (
    <header className="sticky top-0 z-50 bg-theme-surface text-theme-text-primary border-b border-theme-border/60 shadow-sm h-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Identity */}
        <div className="flex items-center gap-4 shrink-0">
          <div 
            onClick={() => onTabChange('HOME')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-theme-accent flex items-center justify-center text-white shadow-lg shadow-theme-accent/20 group-hover:scale-105 transition-transform duration-350">
              <Home size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg lg:text-xl font-serif font-black tracking-tight leading-none text-theme-text-primary group-hover:text-theme-accent transition-colors duration-250">
                Homstay
              </span>
              <span className="text-[9px] lg:text-[10px] text-theme-text-secondary font-bold tracking-widest uppercase leading-none mt-1">
                Zero Brokerage
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-theme-border/60"></div>
          <button 
            onClick={onOpenLocationSelector}
            className="flex items-center gap-1.5 text-theme-text-secondary hover:text-theme-accent transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer select-none"
          >
            <MapPin size={14} className="text-theme-accent stroke-[2.5]" />
            <span className="max-w-[140px] truncate">{selectedLocationName || "Riya Bhati House"}</span>
            <ChevronDown size={12} className="opacity-70" />
          </button>
        </div>

        {/* Center: Search pill */}
        <div className="flex-1 px-2 flex justify-center min-w-[280px] lg:min-w-[320px] max-w-[420px] lg:max-w-[520px] mx-auto transition-all duration-350">
          <div 
            onClick={onSearchClick}
            className="w-full relative flex items-center bg-theme-bg hover:bg-theme-bg/95 border border-theme-border/80 focus-within:border-theme-accent hover:border-theme-accent rounded-full py-2.5 pl-5 pr-5 transition-all duration-300 shadow-md hover:shadow-lg group cursor-pointer"
          >
            <Search className="text-theme-text-secondary/70 group-hover:text-theme-accent stroke-[2.5] flex-shrink-0" size={16} />
            <input 
              type="text" 
              placeholder="Search verified homes, PGs, rooms..."
              value={searchQuery}
              readOnly
              className="w-full bg-transparent border-none text-xs font-bold placeholder-theme-text-secondary/50 text-theme-text-primary focus:outline-none focus:ring-0 ml-3 py-0.5 font-sans truncate select-none cursor-pointer"
            />
          </div>
        </div>

        {/* Right Nav Area */}
        <div className="flex items-center gap-4 shrink-0 font-sans">
          
          {/* Header Navigation Links */}
          {(showMessages || showBookings || showVisits || showWishlist || showNotifications) && (
            <div className="flex items-center gap-1.5 xl:gap-2">
              {/* Messages Button (Priority 2) */}
              {showMessages && (
                <button
                  onClick={() => onTabChange('MESSAGES')}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                    activeTab === 'MESSAGES' 
                      ? 'text-theme-accent bg-theme-accent-soft' 
                      : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg/60'
                  }`}
                >
                  <MessageSquare size={14} fill={activeTab === 'MESSAGES' ? 'currentColor' : 'none'} className="stroke-[2.5]" />
                  <span>Messages</span>
                  {unreadMessagesCount > 0 && (
                    <span className="w-5 h-5 bg-theme-accent text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md animate-pulse">
                      {unreadMessagesCount}
                    </span>
                  )}
                </button>
              )}

              {/* Bookings Button (Priority 2) */}
              {showBookings && (
                <button
                  onClick={() => onTabChange('BOOKINGS')}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                    activeTab === 'BOOKINGS' 
                      ? 'text-theme-accent bg-theme-accent-soft' 
                      : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg/60'
                  }`}
                >
                  <Calendar size={14} fill={activeTab === 'BOOKINGS' ? 'currentColor' : 'none'} className="stroke-[2.5]" />
                  <span>Bookings</span>
                </button>
              )}

              {/* Visits Button (Priority 3) */}
              {showVisits && (
                <button
                  onClick={() => onTabChange('VISITS')}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                    activeTab === 'VISITS' 
                      ? 'text-theme-accent bg-theme-accent-soft' 
                      : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg/60'
                  }`}
                >
                  <Footprints size={14} fill={activeTab === 'VISITS' ? 'currentColor' : 'none'} className="stroke-[2.5]" />
                  <span>Visits</span>
                </button>
              )}

              {/* Wishlist Button (Priority 3) */}
              {showWishlist && (
                <button
                  onClick={() => onTabChange('WISHLIST')}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                    activeTab === 'WISHLIST' 
                      ? 'text-theme-accent bg-theme-accent-soft' 
                      : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg/60'
                  }`}
                >
                  <Heart size={14} fill={activeTab === 'WISHLIST' ? 'currentColor' : 'none'} className="stroke-[2.5]" />
                  <span>Wishlist</span>
                  {savedCount > 0 && (
                    <span className="w-5 h-5 bg-theme-accent text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md animate-pulse">
                      {savedCount}
                    </span>
                  )}
                </button>
              )}

              {/* Notifications Button (Priority 2) */}
              {showNotifications && (
                <button
                  onClick={onOpenNotifications}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                    activeTab === 'NOTIFICATIONS' 
                      ? 'text-theme-accent bg-theme-accent-soft' 
                      : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg/60'
                  }`}
                >
                  <Bell size={14} className="stroke-[2.5]" />
                  <span>Notifications</span>
                  {unreadNotificationsCount > 0 && (
                    <span className="w-5 h-5 bg-theme-accent text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md animate-pulse select-none">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Divider if at least one nav item is shown */}
          {(showMessages || showBookings || showVisits || showWishlist || showNotifications) && (
            <div className="h-6 w-px bg-theme-border/60 font-sans"></div>
          )}

          {/* Profile Dropdown Container */}
          <div className="relative font-sans">
            {(() => {
              const profileName = typeof window !== 'undefined' ? (localStorage.getItem('homstay-profile-name') || 'Max gaur') : 'Max gaur';
              const profileEmail = typeof window !== 'undefined' ? (localStorage.getItem('homstay-profile-email') || 'tecbowgamods200@gmail.com') : 'tecbowgamods200@gmail.com';
              const initial = profileName.charAt(0).toUpperCase();

              return (
                <>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center gap-2 pr-3 pl-1.5 py-1.5 rounded-full border transition-all cursor-pointer h-10 w-40 xl:w-44 shrink-0 justify-between min-w-0 ${
                      ['PROFILE', 'VERIFICATION', 'ADDRESSES', 'REFERRALS', 'SUPPORT', 'SETTINGS', 'TERMS', 'PRIVACY', 'ABOUT'].includes(activeTab) || isProfileOpen
                        ? 'bg-theme-accent border-theme-accent text-white font-sans' 
                        : 'bg-theme-bg border-theme-border text-theme-text-primary hover:bg-theme-bg/90'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-theme-accent text-white flex items-center justify-center font-serif font-black text-xs uppercase shrink-0">
                        {initial}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider truncate text-left max-w-[70px] xl:max-w-[85px] block">{profileName}</span>
                    </div>
                    <ChevronDown size={11} className="opacity-65 shrink-0" />
                  </button>

                  {/* Float Dropdown Menu */}
                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                      <div className="absolute right-0 mt-3.5 w-64 bg-theme-surface border border-theme-border rounded-2xl shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-3 duration-250 select-none font-sans text-sans">
                        
                        {/* Top: Avatar, Name, Email */}
                        <div className="px-4 py-3 border-b border-theme-border/50 mb-2 flex items-center gap-3 text-left">
                          <div className="w-10 h-10 rounded-full bg-theme-accent text-white flex items-center justify-center font-serif font-bold text-base shadow-sm shrink-0">
                            {initial}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black text-theme-text-primary tracking-wide truncate">{profileName}</p>
                            <p className="text-[10px] text-theme-text-secondary truncate">{profileEmail}</p>
                          </div>
                        </div>

                        {/* Options */}
                        <div className="max-h-[380px] overflow-y-auto no-scrollbar font-sans text-xs">
                          <div className="px-2 py-1 space-y-0.5">
                            <button 
                              onClick={() => { onTabChange('PROFILE'); setIsProfileOpen(false); }}
                              className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'PROFILE' ? 'text-theme-accent bg-theme-accent-soft animate-fade-in' : 'text-theme-text-primary'}`}
                            >
                              <User size={13} className="text-theme-text-secondary shrink-0" />
                              <span>My Profile</span>
                            </button>

                            <button 
                              onClick={() => { onTabChange('VERIFICATION'); setIsProfileOpen(false); }}
                              className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'VERIFICATION' ? 'text-theme-accent bg-theme-accent-soft animate-fade-in' : 'text-theme-text-primary'}`}
                            >
                              <ShieldCheck size={13} className="text-theme-text-secondary shrink-0" />
                              <span>Verification Center</span>
                            </button>

                            <button 
                              onClick={() => { onTabChange('ADDRESSES'); setIsProfileOpen(false); }}
                              className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'ADDRESSES' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                            >
                              <MapPin size={13} className="text-theme-text-secondary shrink-0" />
                              <span>Address Book</span>
                            </button>
                          </div>

                          <div className="h-px bg-theme-border/40 my-1"></div>

                          {/* Section 2: Bookings and Activity */}
                          {(!showBookings || !showWishlist || !showVisits || !showMessages || !showNotifications) && (
                            <>
                              <div className="px-2 py-1 space-y-0.5 text-left">
                                {!showBookings && (
                                  <button 
                                    onClick={() => { onTabChange('BOOKINGS'); setIsProfileOpen(false); }}
                                    className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'BOOKINGS' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                                  >
                                    <Calendar size={13} className="text-theme-text-secondary shrink-0" />
                                    <span>Bookings</span>
                                  </button>
                                )}

                                {!showWishlist && (
                                  <button 
                                    onClick={() => { onTabChange('WISHLIST'); setIsProfileOpen(false); }}
                                    className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'WISHLIST' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                                  >
                                    <Heart size={13} className="text-theme-text-secondary shrink-0" />
                                    <span>Wishlist</span>
                                  </button>
                                )}

                                {!showVisits && (
                                  <button 
                                    onClick={() => { onTabChange('VISITS'); setIsProfileOpen(false); }}
                                    className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'VISITS' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                                  >
                                    <Footprints size={13} className="text-theme-text-secondary shrink-0" />
                                    <span>Visits</span>
                                  </button>
                                )}

                                {!showMessages && (
                                  <button 
                                    onClick={() => { onTabChange('MESSAGES'); setIsProfileOpen(false); }}
                                    className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 justify-between transition-colors ${activeTab === 'MESSAGES' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <MessageSquare size={13} className="text-theme-text-secondary shrink-0" />
                                      <span>Messages</span>
                                    </div>
                                    {unreadMessagesCount > 0 && (
                                      <span className="w-5 h-5 bg-theme-accent text-white text-[9px] font-black rounded-full flex items-center justify-center shrink-0">
                                        {unreadMessagesCount}
                                      </span>
                                    )}
                                  </button>
                                )}

                                {!showNotifications && (
                                  <button 
                                    onClick={() => { onOpenNotifications(); setIsProfileOpen(false); }}
                                    className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center justify-between transition-colors ${activeTab === 'NOTIFICATIONS' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <Bell size={13} className="text-theme-text-secondary shrink-0" />
                                      <span>Notifications</span>
                                    </div>
                                    {unreadNotificationsCount > 0 && (
                                      <span className="w-5 h-5 bg-theme-accent text-white text-[9px] font-black rounded-full flex items-center justify-center shrink-0">
                                        {unreadNotificationsCount}
                                      </span>
                                    )}
                                  </button>
                                )}
                              </div>
                              <div className="h-px bg-theme-border/40 my-1"></div>
                            </>
                          )}

                          {/* Section 3: Referrals & Help */}
                          <div className="px-2 py-1 space-y-0.5 text-left">
                            <button 
                              onClick={() => { onTabChange('REFERRALS'); setIsProfileOpen(false); }}
                              className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'REFERRALS' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                            >
                              <Tag size={13} className="text-theme-text-secondary shrink-0" />
                              <span>Refer & Earn</span>
                            </button>

                            <button 
                              onClick={() => { onTabChange('SUPPORT'); setIsProfileOpen(false); }}
                              className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'SUPPORT' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                            >
                              <HelpCircle size={13} className="text-theme-text-secondary shrink-0" />
                              <span>Help & Support</span>
                            </button>

                            <button 
                              onClick={() => { onTabChange('SETTINGS'); setIsProfileOpen(false); }}
                              className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'SETTINGS' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                            >
                              <SlidersHorizontal size={13} className="text-theme-text-secondary shrink-0" />
                              <span>Settings</span>
                            </button>

                            <button 
                              onClick={() => { onTabChange('ABOUT'); setIsProfileOpen(false); }}
                              className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'ABOUT' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                            >
                              <Info size={13} className="text-theme-text-secondary shrink-0" />
                              <span>About Us</span>
                            </button>
                          </div>

                          <div className="h-px bg-theme-border/40 my-1"></div>

                          {/* Section 4: Legal */}
                          <div className="px-2 py-1 space-y-0.5 text-left">
                            <button 
                              onClick={() => { onTabChange('TERMS'); setIsProfileOpen(false); }}
                              className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'TERMS' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                            >
                              <FileText size={13} className="text-theme-text-secondary shrink-0" />
                              <span>Terms & Conditions</span>
                            </button>

                            <button 
                              onClick={() => { onTabChange('PRIVACY'); setIsProfileOpen(false); }}
                              className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-xl hover:bg-theme-bg/60 uppercase tracking-wider flex items-center gap-2.5 transition-colors ${activeTab === 'PRIVACY' ? 'text-theme-accent bg-theme-accent-soft' : 'text-theme-text-primary'}`}
                            >
                              <ShieldCheck size={13} className="text-theme-text-secondary shrink-0" />
                              <span>Privacy Policy</span>
                            </button>
                          </div>
                        </div>

                        <div className="h-px bg-theme-border/40 my-1.5"></div>

                        {/* Section 5: Logout */}
                        <div className="px-2 text-left">
                          <button 
                            onClick={() => {
                              setIsProfileOpen(false);
                              onTabChange('LOGOUT');
                            }}
                            className="w-full text-left px-3 py-2 text-[11px] font-black text-red-500 hover:bg-red-500/10 rounded-xl uppercase tracking-wider cursor-pointer flex items-center gap-2.5 transition-colors"
                          >
                            <LogOut size={13} className="text-red-500 shrink-0" />
                            <span>Logout</span>
                          </button>
                        </div>

                      </div>
                    </>
                  )}
                </>
              );
            })()}
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center shrink-0">
            {isDark !== undefined && setIsDark && accent !== undefined && setAccent && (
              <ThemeSwitcher 
                currentAccent={accent} 
                isDark={isDark} 
                onAccentChange={setAccent} 
                onDarkToggle={setIsDark} 
                mode="inline" 
              />
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
