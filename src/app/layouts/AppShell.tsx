import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { Sidebar } from '../../components/Sidebar';
import { AppHeader } from './AppHeader';
import { BottomNav } from '../navigation/BottomNav';
import { LocationSelectorModal } from '../../components/LocationSelectorModal';
import { NotificationCenter } from '../../components/NotificationCenter';
import { motion } from 'motion/react';

export const AppShell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    unreadChatsCount,
    savedIds,
    isDark,
    setIsDark,
    accent,
    setAccent,
    isSidebarCollapsed,
    handleToggleSidebarCollapse,
    toast,
    isLocationSelectorOpen,
    setIsLocationSelectorOpen,
    handleSelectLocation,
    activeLocation,
    signOut,
    showToast
  } = useAppContext();

  // Helper to map routes to active tab highlights
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/app') return 'HOME';
    if (path.startsWith('/app/bookings')) return 'BOOKINGS';
    if (path.startsWith('/app/tours')) return 'VISITS';
    if (path.startsWith('/app/messages')) return 'MESSAGES';
    if (path.startsWith('/app/profile')) return 'ACCOUNT';
    if (path.startsWith('/app/settings')) return 'ACCOUNT';
    return 'HOME';
  };

  const handleTabChange = async (tab: string) => {
    if (tab === 'LOGOUT') {
      await signOut();
      showToast('Logged out successfully', 'success');
      navigate('/');
      return;
    }
    if (tab === 'HOME') navigate('/app');
    else if (tab === 'BOOKINGS') navigate('/app/bookings');
    else if (tab === 'VISITS') navigate('/app/tours');
    else if (tab === 'MESSAGES') navigate('/app/messages');
    else if (tab === 'ACCOUNT' || tab === 'PROFILE') navigate('/app/profile');
  };

  return (
    <div className="min-h-screen bg-theme-bg flex text-theme-text-primary transition-colors duration-300">
      {/* A. Sidebar navigation panel */}
      <Sidebar 
        activeTab={getActiveTab()}
        onTabChange={handleTabChange}
        unreadCount={unreadChatsCount}
        isDark={isDark}
        setIsDark={setIsDark}
        accent={accent as any}
        setAccent={setAccent}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebarCollapse}
      />
      
      {/* B. Main viewport space */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative pb-20 md:pb-0">
        <AppHeader />
        
        {/* Inner Scroll Container */}
        <div className="flex-1 overflow-x-hidden font-sans">
          <Outlet />
        </div>
        
        <BottomNav activeTab={getActiveTab()} onTabChange={handleTabChange} unreadCount={unreadChatsCount} savedCount={savedIds.length} />
      </div>

      {/* Global Location Selector overlay */}
      {isLocationSelectorOpen && (
        <LocationSelectorModal 
          isOpen={isLocationSelectorOpen}
          onClose={() => setIsLocationSelectorOpen(false)} 
          onSelectLocation={handleSelectLocation}
          activeLocation={activeLocation}
        />
      )}

      {/* Global Toast Alert Overlay */}
      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-xs font-black shadow-2xl border ${
            toast.type === 'success'
              ? 'bg-emerald-900 border-emerald-500/30 text-emerald-100'
              : toast.type === 'error'
              ? 'bg-rose-950 border-rose-500/30 text-rose-100'
              : 'bg-gray-900 text-white border-transparent'
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
};

export default AppShell;
