import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';
import { useAppContext } from '../app/AppContext';
import { PublicLayout } from '../layouts/PublicLayout';

// Lazy-loaded public landing pages
const HomePage = React.lazy(() => import('../landing/pages/HomePage'));
const DemoPage = React.lazy(() => import('../landing/pages/DemoPage'));
const PhotosPage = React.lazy(() => import('../landing/pages/PhotosPage'));
const VerifiedOwnersPage = React.lazy(() => import('../landing/pages/VerifiedOwnersPage'));
const PricingPage = React.lazy(() => import('../landing/pages/PricingPage'));
const SavingsCalculatorPage = React.lazy(() => import('../landing/pages/SavingsCalculatorPage'));
const VerificationPage = React.lazy(() => import('../landing/pages/VerificationPage'));
const BlogListingPage = React.lazy(() => import('../landing/pages/BlogListingPage'));
const BlogPage = React.lazy(() => import('../landing/pages/BlogPage'));

// Lazy-loaded private tenant views
const PropertyDetailsPage = React.lazy(() => import('../components/PropertyDetailsPage').then(m => ({ default: m.PropertyDetailsPage })));
const SearchPage = React.lazy(() => import('../components/SearchPage').then(m => ({ default: m.SearchPage })));
const AccountCenter = React.lazy(() => import('../components/AccountCenter').then(m => ({ default: m.AccountCenter })));
const MessagesSection = React.lazy(() => import('../components/MessagesSection').then(m => ({ default: m.MessagesSection })));

// Lazy-loaded pages from original pages directory
import { WishlistPage } from '../pages/Wishlist/WishlistPage';
import { VisitsPage } from '../pages/Visits/VisitsPage';
import { BookingsPage } from '../pages/Bookings/BookingsPage';

// Auth views
import { LoginPage } from '../pages/auth/LoginPage';
import { SignupPage } from '../pages/auth/SignupPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';

// Sidebar & headers
import { Sidebar } from '../components/Sidebar';
import { DesktopHeader } from '../components/DesktopHeader';
import { Header, CategoryNav } from '../components/Header';
import { BottomNav } from '../app/navigation/BottomNav';
import { LocationSelectorModal } from '../components/LocationSelectorModal';
import { NotificationCenter } from '../components/NotificationCenter';
import { CustomPropertyCard } from '../components/CustomPropertyCard';
import { VirtualItem } from '../components/VirtualItem';
import { propertyService } from '../services/property/property.service';
import { Property, Section } from '../types';
import { motion } from 'motion/react';
import { X, ChevronLeft } from 'lucide-react';

// --- ROUTE GUARDS ---

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, authLoading } = useAppContext();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to={`/login?redirectTo=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  return <>{children}</>;
};

const RequireGuest: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, authLoading } = useAppContext();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirectTo') || '/dashboard';

  if (authLoading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user && profile) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

// --- LAYOUTS ---

const DashboardLayout: React.FC = () => {
  const {
    unreadChatsCount,
    isDark,
    setIsDark,
    accent,
    setAccent,
    isSidebarCollapsed,
    handleToggleSidebarCollapse,
    savedIds,
    searchQuery,
    setSearchQuery,
    activeCategory,
    activeLocation,
    unreadNotificationsCount,
    isLocationSelectorOpen,
    setIsLocationSelectorOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    handleSelectLocation,
    toast,
    isBookVisitModalOpen,
    setIsBookVisitModalOpen,
    bookingPropertyId,
    setBookingPropertyId,
    chosenBookingDate,
    setChosenBookingDate,
    chosenBookingTime,
    setChosenBookingTime,
    chosenBookingMsg,
    setChosenBookingMsg,
    addVisitRequest,
    profile,
    showToast,
    addNotification,
    isMobileChatActive,
    findPropertyById
  } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();

  // Map path routes to sidebar active tab highlights
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'HOME';
    if (path.startsWith('/bookings')) return 'BOOKINGS';
    if (path.startsWith('/tours')) return 'VISITS';
    if (path.startsWith('/messages')) return 'MESSAGES';
    if (path.startsWith('/profile') || path.startsWith('/settings')) return 'ACCOUNT';
    return 'HOME';
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'HOME') navigate('/dashboard');
    else if (tab === 'BOOKINGS') navigate('/bookings');
    else if (tab === 'VISITS') navigate('/tours');
    else if (tab === 'MESSAGES') navigate('/messages');
    else if (tab === 'ACCOUNT') navigate('/profile');
  };

  const handleBookingSubmit = async () => {
    const bookingProperty = findPropertyById(bookingPropertyId || '');
    if (!bookingProperty) {
      alert("Property lookup failed. Please refresh and try again.");
      return;
    }

    const result = await addVisitRequest({
      propertyId: bookingProperty.id,
      tenantName: profile?.name || 'Riya Bhati',
      date: chosenBookingDate,
      time: chosenBookingTime,
      status: 'pending',
      message: chosenBookingMsg || 'Hi! I would love to check out your premium flat in person.'
    });

    if (result?.success) {
      setIsBookVisitModalOpen(false);
      setBookingPropertyId(null);
      setChosenBookingMsg('');

      navigate('/tours');
      showToast(`Visit Requested Successfully! Review it on the "Visits" tab.`, 'success');
      addNotification(
        'VISIT_PENDING',
        'Visit Request Submitted',
        `Your visit request for ${bookingProperty.title} is now pending owner approval.`,
        bookingProperty.id,
        'VISITS'
      );
    } else {
      showToast(`Failed to request visit: ${result?.error || 'Unknown Error'}`, 'error');
    }
  };

  return (
    <div className={`min-h-screen bg-theme-bg text-theme-text-primary flex font-sans transition-colors duration-300 ${accent ? `accent-${accent}` : ''} ${isDark ? 'theme-dark' : 'theme-light'}`}>
      {/* 1. Desktop & Tablet Sidebar */}
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

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full relative h-screen overflow-hidden">
        {/* Top Header for Desktop */}
        {location.pathname !== '/messages' && (
          <div className="relative shrink-0">
            <DesktopHeader 
              activeTab={getActiveTab()} 
              onTabChange={handleTabChange} 
              savedCount={savedIds.length} 
              onOpenFilters={() => navigate('/search')}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCategory={activeCategory}
              onSearchClick={() => navigate(`/search?q=${encodeURIComponent(searchQuery)}`)}
              unreadMessagesCount={unreadChatsCount}
              isDark={isDark}
              setIsDark={setIsDark}
              accent={accent as any}
              setAccent={setAccent}
              showToast={showToast}
              onOpenLocationSelector={() => setIsLocationSelectorOpen(true)}
              selectedLocationName={activeLocation.area || activeLocation.name}
              onOpenNotifications={() => navigate('/notifications')}
              unreadNotificationsCount={unreadNotificationsCount}
            />
          </div>
        )}

        {/* Dynamic Nested Screen Content */}
        <div className="flex-1 overflow-y-auto w-full select-text h-full relative">
          <Outlet />
        </div>

        {/* Mobile Navigation bar */}
        {!isMobileChatActive && (
          <div className="md:hidden shrink-0">
            <BottomNav 
              activeTab={getActiveTab()} 
              onTabChange={handleTabChange} 
              unreadCount={unreadChatsCount} 
              savedCount={savedIds.length} 
            />
          </div>
        )}
      </div>

      {/* 3. SHARED MODALS */}
      <LocationSelectorModal
        isOpen={isLocationSelectorOpen}
        onClose={() => setIsLocationSelectorOpen(false)}
        activeLocation={activeLocation}
        onSelectLocation={handleSelectLocation}
      />

      {isBookVisitModalOpen && bookingPropertyId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 overflow-y-auto font-sans text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-theme-surface border border-theme-border rounded-[32px] w-full max-w-lg p-6 lg:p-8 space-y-6 shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-theme-border/50 pb-4">
              <div>
                <span className="text-[9px] font-black uppercase text-theme-accent tracking-widest block">Zero Brokerage Verified Tour</span>
                <h3 className="font-serif text-lg font-bold text-theme-text-primary">Arrange In-Person Physical Viewing</h3>
              </div>
              <button 
                onClick={() => {
                  setIsBookVisitModalOpen(false);
                  setBookingPropertyId(null);
                }}
                className="w-10 h-10 rounded-full bg-theme-bg hover:bg-theme-border/40 text-theme-text-secondary hover:text-theme-text-primary flex items-center justify-center border border-theme-border/50 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-theme-text-secondary select-none">1. Choose Booking Date</label>
                <input 
                  type="date" 
                  value={chosenBookingDate}
                  onChange={(e) => setChosenBookingDate(e.target.value)}
                  className="w-full bg-theme-bg hover:bg-theme-bg/80 border border-[#202023] rounded-xl px-4 py-3 text-xs font-semibold text-theme-text-primary focus:outline-none focus:border-theme-accent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-theme-text-secondary select-none">2. Select Viewing Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '10:00 AM', label: '10:00 AM', tag: 'Morning' },
                    { id: '11:30 AM', label: '11:30 AM', tag: 'Morning' },
                    { id: '02:00 PM', label: '02:00 PM', tag: 'Afternoon' },
                    { id: '04:30 PM', label: '04:30 PM', tag: 'Afternoon' },
                    { id: '06:00 PM', label: '06:00 PM', tag: 'Evening' },
                    { id: '07:30 PM', label: '07:30 PM', tag: 'Evening' }
                  ].map((slot) => {
                    const isSelected = chosenBookingTime === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setChosenBookingTime(slot.id)}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all cursor-pointer outline-none ${
                          isSelected 
                            ? 'bg-theme-accent border-theme-accent text-white shadow-md' 
                            : 'bg-theme-bg border-theme-border text-theme-text-primary hover:bg-theme-border/20'
                        }`}
                      >
                        <span className="text-[10px] font-black tracking-wide leading-tight">{slot.label}</span>
                        <span className={`text-[8px] mt-0.5 leading-none ${isSelected ? 'text-white/80' : 'text-theme-text-secondary/80'}`}>{slot.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-theme-text-secondary select-none">3. Host Message (Optional)</label>
                <textarea
                  rows={3}
                  value={chosenBookingMsg}
                  onChange={(e) => setChosenBookingMsg(e.target.value)}
                  placeholder="Hi there! I would love to schedule an in-person tour. Please check if this slot works well for you..."
                  className="w-full bg-theme-bg/80 border border-theme-border rounded-2xl p-4 text-xs font-semibold text-theme-text-primary placeholder:text-theme-text-secondary/40 focus:outline-none focus:border-theme-accent transition-all resize-none leading-normal"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3.5 border-t border-theme-border/50">
              <button
                type="button"
                onClick={() => {
                  setIsBookVisitModalOpen(false);
                  setBookingPropertyId(null);
                }}
                className="flex-1 bg-theme-bg hover:bg-theme-border/50 text-theme-text-primary border border-theme-border font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBookingSubmit}
                className="flex-1 bg-theme-accent hover:bg-theme-accent-hover text-white font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Request Viewing Tour
              </button>
            </div>
          </motion.div>
        </div>
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

// --- ROUTE COMPONENTS ---

import { HomePage as TenantHomePage } from '../pages/Home';
import { ChevronRight, LayoutGrid as LayoutGridIcon } from 'lucide-react';
import { CATEGORIES } from '../data'; // Category definitions

// 1. ExploreCategories modal component
const ExploreCategories = ({ onSelectCategory, onBack }: { onSelectCategory: (id: string) => void, onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[60] bg-theme-bg overflow-y-auto no-scrollbar max-w-md md:max-w-none mx-auto text-left"
    >
      <div className="sticky top-0 z-50 bg-theme-surface px-4 py-4 flex items-center gap-4 border-b border-theme-border">
        <button onClick={onBack} className="p-2 bg-theme-bg rounded-full text-theme-text-primary active:scale-90 transition-transform cursor-pointer">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-theme-text-primary">Explore Categories</h1>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {CATEGORIES.map((category, i) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelectCategory(category.id)}
            className="bg-theme-surface hover:bg-theme-border/20 p-6 rounded-3xl flex flex-col items-center justify-center gap-3 border border-theme-border shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            <div className="p-4 bg-theme-accent/15 text-theme-accent rounded-2xl">
              <category.icon size={32} />
            </div>
            <span className="text-sm font-black tracking-wider uppercase text-theme-text-primary">{category.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// 2. ViewAll component
const ViewAll = ({ 
  title, 
  category, 
  onBack, 
  onSelectProperty,
  savedIds,
  onToggleSave,
  onShare
}: { 
  title: string, 
  category: string, 
  onBack: () => void,
  onSelectProperty: (id: string) => void,
  savedIds: string[],
  onToggleSave: (id: string) => void,
  onShare: (p: Property) => void
}) => {
  const [items, setItems] = React.useState<Property[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const params = {
      page: page.toString(),
      limit: '20',
      category: category === 'sizzling' || category === 'recent' ? 'all' : category
    };

    propertyService.getProperties(params)
      .then(data => {
        setItems(prev => page === 1 ? data.items : [...prev, ...data.items]);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  }, [page, category]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[60] bg-theme-bg overflow-y-auto no-scrollbar max-w-md md:max-w-none mx-auto transition-colors duration-300 text-left"
    >
      <div className="sticky top-0 z-50 bg-theme-surface/95 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-theme-border transition-colors duration-300">
        <button onClick={onBack} className="p-2 bg-theme-bg hover:bg-theme-border/40 rounded-full text-theme-text-primary active:scale-90 transition-all cursor-pointer">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-theme-text-primary">{title}</h1>
      </div>

      <div className="p-4 grid grid-cols-1 gap-4">
        {items.map((property, i) => (
          <VirtualItem key={property.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <CustomPropertyCard 
                property={property} 
                isSaved={savedIds.includes(property.id)}
                onToggleSave={onToggleSave}
                onClick={onSelectProperty}
                onShare={onShare}
              />
            </motion.div>
          </VirtualItem>
        ))}
      </div>

      {page < totalPages && (
        <div className="p-4">
          <button 
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
            className="w-full py-4 bg-theme-surface border border-theme-border rounded-2xl text-theme-accent font-bold text-sm uppercase tracking-widest shadow-sm cursor-pointer hover:bg-theme-bg transition-colors"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </motion.div>
  );
};

// 3. Stays Feed (HOME) page for Tenant Dashboard
const DashboardHomeRoute: React.FC = () => {
  const {
    sections,
    savedIds,
    toggleSave,
    combinedPropertiesList,
    showToast,
    activeCategory,
    setActiveCategory,
    setPage,
    currentCategoryProperties,
    activeLocation,
    setIsLocationSelectorOpen,
    unreadNotificationsCount,
    isDark,
    setIsDark,
    accent,
    setAccent
  } = useAppContext();

  const navigate = useNavigate();
  const [isExploringCategories, setIsExploringCategories] = React.useState(false);
  const [viewAllSection, setViewAllSection] = React.useState<Section | null>(null);

  const handleShare = (p: Property) => {
    navigator.clipboard.writeText(`${window.location.origin}/property/${p.slug}`);
    showToast('Listing link copied to clipboard!', 'success');
  };

  return (
    <>
      {/* Mobile Top Header + Category Navigation */}
      <div className="md:hidden sticky top-0 z-40 bg-theme-surface/95 backdrop-blur-sm border-b border-theme-border/40">
        <Header 
          onOpenFilters={() => navigate('/search')} 
          onOpenWishlist={() => navigate('/wishlist')} 
          savedCount={savedIds.length} 
          searchQuery=""
          onSearchChange={() => {}}
          onSearchClick={() => navigate('/search')}
          currentAccent={accent as any}
          isDark={isDark}
          onAccentChange={setAccent}
          onDarkToggle={setIsDark}
          onOpenLocationSelector={() => setIsLocationSelectorOpen(true)}
          selectedLocationName={activeLocation.area || activeLocation.name}
          onOpenNotifications={() => navigate('/notifications')}
          unreadNotificationsCount={unreadNotificationsCount}
        />
        <CategoryNav activeCategory={activeCategory} onSelect={(id) => { setActiveCategory(id); setPage(1); }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-6 py-8 animate-in fade-in duration-500 w-full space-y-10">
        {/* Category Airbnb Scroller Row (Desktop/Tablet Only) */}
        <div className="hidden md:flex bg-theme-surface p-4 rounded-3xl border border-theme-border items-center justify-between gap-4 shadow-sm transition-colors duration-300">
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
            <button 
              onClick={() => { setActiveCategory('all'); setPage(1); }}
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'all' 
                  ? 'bg-theme-accent text-white shadow-md shadow-theme-accent/20' 
                  : 'bg-theme-bg text-theme-text-secondary hover:bg-theme-border/50 border border-theme-border/60'
              }`}
            >
              All Stays
            </button>
            {CATEGORIES.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => { setActiveCategory(cat.id); setPage(1); }}
                className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id 
                    ? 'bg-theme-accent text-white shadow-md shadow-theme-accent/20' 
                    : 'bg-theme-bg text-theme-text-secondary hover:bg-theme-border/50 border border-theme-border/60'
                }`}
              >
                <cat.icon size={13} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <span className="text-[9px] font-black tracking-widest text-theme-accent bg-theme-accent-soft px-3.5 py-1.5 rounded-full uppercase shrink-0">
            {currentCategoryProperties.length} Stays
          </span>
        </div>

      <TenantHomePage 
        sections={sections}
        savedIds={new Set(savedIds)}
        toggleSave={toggleSave}
        setSelectedPropertyId={(id) => {
          const prop = combinedPropertiesList.find(p => p.id === id);
          if (prop?.slug) navigate(`/property/${prop.slug}`);
        }}
        triggerShare={handleShare}
        setViewAllSection={setViewAllSection}
        activeCategory={activeCategory}
        setIsExploringCategories={setIsExploringCategories}
      />

      {isExploringCategories && (
        <ExploreCategories 
          onBack={() => setIsExploringCategories(false)}
          onSelectCategory={(id) => {
            setActiveCategory(id);
            setIsExploringCategories(false);
            setPage(1);
          }}
        />
      )}

      {viewAllSection && (
        <ViewAll 
          title={viewAllSection.title}
          category={viewAllSection.id}
          onBack={() => setViewAllSection(null)}
          onSelectProperty={(id) => {
            const prop = combinedPropertiesList.find(p => p.id === id);
            if (prop?.slug) {
              navigate(`/property/${prop.slug}`);
              setViewAllSection(null);
            }
          }}
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onShare={handleShare}
        />
      )}
    </div>
  </>
  );
};

// 2. Wishlist Page wrapper route
const WishlistRoute: React.FC = () => {
  const {
    savedIds,
    getSortedWishlist,
    wishlistSort,
    setWishlistSort,
    toggleSave,
    combinedPropertiesList,
    showToast
  } = useAppContext();

  const navigate = useNavigate();

  const savedProperties = React.useMemo(() => {
    return Array.from(savedIds).map(id => combinedPropertiesList.find(p => p.id === id)).filter(Boolean) as Property[];
  }, [savedIds, combinedPropertiesList]);

  const sortedSavedProperties = React.useMemo(() => {
    return getSortedWishlist(savedProperties);
  }, [getSortedWishlist, savedProperties]);

  const handleShare = (p: Property) => {
    navigator.clipboard.writeText(`${window.location.origin}/property/${p.slug}`);
    showToast('Listing link copied to clipboard!', 'success');
  };

  return (
    <WishlistPage 
      savedProperties={savedProperties}
      sortedSavedProperties={sortedSavedProperties}
      wishlistSort={wishlistSort}
      setWishlistSort={setWishlistSort}
      toggleSave={toggleSave}
      setSelectedPropertyId={(id) => {
        const prop = combinedPropertiesList.find(p => p.id === id);
        if (prop?.slug) navigate(`/property/${prop.slug}`);
      }}
      triggerShare={handleShare}
      allProperties={combinedPropertiesList}
      setActiveTab={() => navigate('/dashboard')}
    />
  );
};

// 3. Visits Page wrapper route
const VisitsRoute: React.FC = () => {
  const {
    visitRequests,
    setVisitRequests,
    combinedPropertiesList,
    showToast,
    addNotification
  } = useAppContext();

  const navigate = useNavigate();

  return (
    <VisitsPage 
      visitRequests={visitRequests}
      setVisitRequests={setVisitRequests}
      allProperties={combinedPropertiesList}
      setSelectedPropertyId={(id) => {
        const prop = combinedPropertiesList.find(p => p.id === id);
        if (prop?.slug) navigate(`/property/${prop.slug}`);
      }}
      setOpenMsgPropertyId={(id) => {
        navigate(`/messages?propId=${id}`);
      }}
      setActiveTab={() => navigate('/dashboard')}
      showToast={showToast}
      addNotification={addNotification}
    />
  );
};

// 4. Bookings Page wrapper route
const BookingsRoute: React.FC = () => {
  const {
    savedIds,
    toggleSave,
    combinedPropertiesList,
    showToast
  } = useAppContext();

  const navigate = useNavigate();

  return (
    <BookingsPage 
      savedIds={new Set(savedIds)}
      toggleSave={toggleSave}
      setSelectedPropertyId={(id) => {
        const prop = combinedPropertiesList.find(p => p.id === id);
        if (prop?.slug) navigate(`/property/${prop.slug}`);
      }}
      triggerShare={(p) => {
        navigator.clipboard.writeText(`${window.location.origin}/property/${p.slug}`);
        showToast('Listing link copied!', 'success');
      }}
      allProperties={combinedPropertiesList}
      setActiveTab={() => navigate('/dashboard')}
    />
  );
};

// 5. Messages Section wrapper route
const MessagesRoute: React.FC = () => {
  const {
    combinedPropertiesList,
    openMsgPropertyId,
    setOpenMsgPropertyId,
    setIsMobileChatActive,
    isDark,
    setIsDark,
    accent,
    setAccent
  } = useAppContext();

  const navigate = useNavigate();

  return (
    <MessagesSection 
      propertiesList={combinedPropertiesList}
      onSelectProperty={(id) => {
        const prop = combinedPropertiesList.find(p => p.id === id);
        if (prop?.slug) navigate(`/property/${prop.slug}`);
      }}
      onBackToExplore={() => navigate('/dashboard')}
      openConversationWithPropertyId={openMsgPropertyId}
      onClearOpenConversation={() => setOpenMsgPropertyId(null)}
      onChatActiveChange={setIsMobileChatActive}
      activeTab="MESSAGES"
      onTabChange={(tab) => {
        if (tab === 'HOME') navigate('/dashboard');
      }}
      isDark={isDark}
      setIsDark={setIsDark}
      accent={accent as any}
      setAccent={setAccent}
    />
  );
};

// 6. Account/Profile wrapper route
const ProfileRoute: React.FC = () => {
  const {
    isDark,
    setIsDark,
    accent,
    setAccent,
    signOut,
    showToast,
    combinedPropertiesList
  } = useAppContext();

  const navigate = useNavigate();

  return (
    <AccountCenter 
      isDark={isDark}
      setIsDark={setIsDark}
      accent={accent as any}
      setAccent={setAccent}
      onLogout={async () => {
        await signOut();
        showToast('Logged out successfully', 'success');
        navigate('/');
      }}
      onSelectedPropertyIdChange={(id) => {
        const prop = combinedPropertiesList.find(p => p.id === id);
        if (prop?.slug) navigate(`/property/${prop.slug}`);
      }}
      propertiesList={combinedPropertiesList}
      activeTab="ACCOUNT"
      onTabChange={(tab) => {
        if (tab === 'HOME') navigate('/dashboard');
      }}
    />
  );
};

// 7. Property detail page with slug-based lookups
const PropertyDetailRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    savedIds,
    toggleSave,
    showToast,
    visitRequests,
    setIsBookVisitModalOpen,
    setBookingPropertyId,
    setOpenMsgPropertyId
  } = useAppContext();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    propertyService.getPropertyBySlug(slug)
      .then(prop => {
        setProperty(prop);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleShare = (p: Property) => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Boutique property link copied to clipboard!', 'success');
  };

  const handleBookAttempt = (propId: string) => {
    setBookingPropertyId(propId);
    setIsBookVisitModalOpen(true);
  };

  const handleChatOwner = (propId: string) => {
    setOpenMsgPropertyId(propId);
    navigate(`/messages`);
  };

  return (
    <PropertyDetailsPage 
      property={property}
      onBack={() => {
        if (window.history.length > 1) window.history.back();
        else navigate('/');
      }}
      isSaved={property ? savedIds.includes(property.id) : false}
      onToggleSave={toggleSave}
      onShare={handleShare}
      visitStatus={property ? (visitRequests.find(r => r.propertyId === property.id)?.status || 'none') as any : 'none'}
      visitRequest={property ? visitRequests.find(r => r.propertyId === property.id) : undefined}
      onBookAttempt={handleBookAttempt}
      onChatOwner={handleChatOwner}
    />
  );
};

// 8. Notifications Wrapper Route
const NotificationsRoute: React.FC = () => {
  const {
    notifications,
    unreadNotificationsCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    combinedPropertiesList
  } = useAppContext();

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6 animate-in fade-in duration-500 text-left">
      <div className="flex items-center gap-3 border-b border-theme-border pb-5">
        <div 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none"
          title="Back to Home"
        >
          <button 
            className="p-1.5 -ml-1 hover:bg-theme-border/45 rounded-full text-theme-text-primary group-hover:text-theme-accent transition-all flex items-center justify-center shrink-0 border border-theme-border/80 bg-theme-surface animate-pulse"
          >
            <ChevronLeft size={20} className="stroke-[3]" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-black uppercase tracking-wider text-theme-text-primary group-hover:text-theme-accent transition-colors duration-200">← Your Notifications</h1>
            <p className="text-xs text-theme-text-secondary mt-1">Updates regarding your zero brokerage visits, profile verification, and host messages.</p>
          </div>
        </div>
      </div>
      <div className="bg-theme-surface border border-theme-border/60 rounded-3xl overflow-hidden shadow-sm">
        <NotificationCenter
          notifications={notifications}
          unreadCount={unreadNotificationsCount}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          clearNotifications={clearNotifications}
          onClose={() => navigate('/dashboard')}
          onActionClick={(tab, id) => {
            if (id) {
              const prop = combinedPropertiesList.find(p => p.id === id);
              if (prop?.slug) navigate(`/property/${prop.slug}`);
            } else {
              if (tab === 'VISITS') navigate('/tours');
              else if (tab === 'MESSAGES') navigate('/messages');
              else navigate('/dashboard');
            }
          }}
          variant="tablet-panel"
        />
      </div>
    </div>
  );
};

// 9. Interactive Property Search Route
const StaysSearchRoute: React.FC = () => {
  const {
    savedIds,
    toggleSave,
    combinedPropertiesList,
    showToast,
    searchQuery,
    isDark
  } = useAppContext();

  const navigate = useNavigate();

  const handleShare = (p: Property) => {
    navigator.clipboard.writeText(`${window.location.origin}/property/${p.slug}`);
    showToast('Listing link copied to clipboard!', 'success');
  };

  return (
    <SearchPage 
      onBack={() => navigate('/dashboard')}
      savedIds={new Set(savedIds)}
      onToggleSave={toggleSave}
      onSelectProperty={(id) => {
        const prop = combinedPropertiesList.find(p => p.id === id);
        if (prop?.slug) navigate(`/property/${prop.slug}`);
      }}
      onShare={handleShare}
      initialQuery={searchQuery}
      isDark={isDark}
    />
  );
};

// --- AUTH ROUTE WRAPPERS ---

const LoginRoute: React.FC = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  return (
    <LoginPage 
      onNavigateToSignup={() => navigate('/signup')}
      onNavigateToForgotPassword={() => navigate('/forgot-password')}
      showToast={showToast}
      onClose={() => navigate('/')}
    />
  );
};

const SignupRoute: React.FC = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  return (
    <SignupPage 
      onNavigateToLogin={() => navigate('/login')}
      showToast={showToast}
    />
  );
};

const ForgotPasswordRoute: React.FC = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  return (
    <ForgotPasswordPage 
      onNavigateToLogin={() => navigate('/login')}
      showToast={showToast}
    />
  );
};

const ResetPasswordRoute: React.FC = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  return (
    <ResetPasswordPage 
      onNavigateToLogin={() => navigate('/login')}
      showToast={showToast}
    />
  );
};

// --- CENTRAL ROUTER ---

const LandingPageRoute: React.FC = () => {
  const { user, profile, authLoading } = useAppContext();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user && profile) {
    return <Navigate to="/dashboard" replace />;
  }

  return <HomePage />;
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={
        <div className="min-h-screen bg-theme-bg flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Routes>
          {/* A. Public experience layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPageRoute />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/live-demo" element={<DemoPage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/verified-owners" element={<VerifiedOwnersPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/savings" element={<SavingsCalculatorPage />} />
            <Route path="/verify" element={<VerificationPage />} />
            <Route path="/blog" element={<BlogListingPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            
            {/* City browsing route stubs */}
            <Route path="/pg/:city" element={<LandingPageRoute />} />
            <Route path="/apartments/:city" element={<LandingPageRoute />} />
            <Route path="/flats/:city" element={<LandingPageRoute />} />
            <Route path="/studio/:city" element={<LandingPageRoute />} />

            {/* Property detail page is public-facing */}
            <Route path="/property/:slug" element={<PropertyDetailRoute />} />
          </Route>

          {/* B. Guest authentication routes */}
          <Route element={<RequireGuest><Outlet /></RequireGuest>}>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/signup" element={<SignupRoute />} />
            <Route path="/forgot-password" element={<ForgotPasswordRoute />} />
            <Route path="/reset-password" element={<ResetPasswordRoute />} />
          </Route>

          {/* C. Private tenant dashboard layout */}
          <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
            <Route path="/dashboard" element={<DashboardHomeRoute />} />
            <Route path="/wishlist" element={<WishlistRoute />} />
            <Route path="/tours" element={<VisitsRoute />} />
            <Route path="/bookings" element={<BookingsRoute />} />
            <Route path="/messages" element={<MessagesRoute />} />
            <Route path="/profile" element={<ProfileRoute />} />
            <Route path="/settings" element={<ProfileRoute />} />
            <Route path="/notifications" element={<NotificationsRoute />} />
            <Route path="/search" element={<StaysSearchRoute />} />
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};
