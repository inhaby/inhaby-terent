import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { DesktopHeader } from '../../components/DesktopHeader';
import { Header as MobileHeader } from '../../components/Header';

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    savedIds,
    activeCategory,
    unreadChatsCount,
    isDark,
    setIsDark,
    accent,
    setAccent,
    setIsLocationSelectorOpen,
    activeLocation,
    setIsNotificationsOpen,
    unreadNotificationsCount,
    signOut,
    showToast
  } = useAppContext();

  // Helper to get active tab
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/app') return 'HOME';
    if (path.startsWith('/app/bookings')) return 'BOOKINGS';
    if (path.startsWith('/app/tours')) return 'VISITS';
    if (path.startsWith('/app/messages')) return 'MESSAGES';
    if (path.startsWith('/app/profile')) return 'PROFILE';
    if (path.startsWith('/app/settings')) return 'SETTINGS';
    if (path.startsWith('/app/wishlist')) return 'WISHLIST';
    if (path.startsWith('/app/notifications')) return 'NOTIFICATIONS';
    return 'HOME';
  };

  const handleTabChange = async (tab: string) => {
    if (tab === 'LOGOUT') {
      await signOut();
      showToast('Logged out successfully', 'success');
      navigate('/landing');
      return;
    }
    if (tab === 'HOME') navigate('/app');
    else if (tab === 'BOOKINGS') navigate('/app/bookings');
    else if (tab === 'VISITS') navigate('/app/tours');
    else if (tab === 'MESSAGES') navigate('/app/messages');
    else if (tab === 'ACCOUNT' || tab === 'PROFILE') navigate('/app/profile');
    else if (tab === 'SETTINGS') navigate('/app/settings');
    else if (tab === 'WISHLIST') navigate('/app/wishlist');
    else if (tab === 'NOTIFICATIONS') navigate('/app/notifications');
  };

  // We only show the mobile header on the dashboard home screen or search/notifications/wishlist where mobile header was present.
  const isDashboardHome = location.pathname === '/app';

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <DesktopHeader 
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
          savedCount={savedIds.length}
          onOpenFilters={() => navigate('/app/search')}
          searchQuery=""
          onSearchChange={() => {}}
          activeCategory={activeCategory}
          onSearchClick={() => navigate('/app/search')}
          unreadMessagesCount={unreadChatsCount}
          isDark={isDark}
          setIsDark={setIsDark}
          accent={accent as any}
          setAccent={setAccent}
        />
      </div>

      {/* Mobile Header (Sticky only on Dashboard Home) */}
      {isDashboardHome && (
        <div className="md:hidden sticky top-0 z-40 bg-theme-surface/95 backdrop-blur-sm border-b border-theme-border/40">
          <MobileHeader 
            onOpenFilters={() => navigate('/app/search')} 
            onOpenWishlist={() => navigate('/app/wishlist')} 
            savedCount={savedIds.length} 
            searchQuery=""
            onSearchChange={() => {}}
            onSearchClick={() => navigate('/app/search')}
            currentAccent={accent as any}
            isDark={isDark}
            onAccentChange={setAccent}
            onDarkToggle={setIsDark}
            onOpenLocationSelector={() => setIsLocationSelectorOpen(true)}
            selectedLocationName={activeLocation.area || activeLocation.name}
            onOpenNotifications={() => navigate('/app/notifications')}
            unreadNotificationsCount={unreadNotificationsCount}
          />
        </div>
      )}
    </>
  );
};

export default AppHeader;
