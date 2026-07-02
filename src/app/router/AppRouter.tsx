import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { AppShell } from '../layouts/AppShell';

// Lazy-loaded private tenant views
const PropertyDetailsPage = React.lazy(() => import('../../components/PropertyDetailsPage').then(m => ({ default: m.PropertyDetailsPage })));
const SearchPage = React.lazy(() => import('../../components/SearchPage').then(m => ({ default: m.SearchPage })));
const AccountCenter = React.lazy(() => import('../../components/AccountCenter').then(m => ({ default: m.AccountCenter })));
const MessagesSection = React.lazy(() => import('../../components/MessagesSection').then(m => ({ default: m.MessagesSection })));

// Lazy-loaded pages from original pages directory
import { WishlistPage } from '../../pages/Wishlist/WishlistPage';
import { VisitsPage } from '../../pages/Visits/VisitsPage';
import { BookingsPage } from '../../pages/Bookings/BookingsPage';

// Sidebar & headers
import { CategoryNav } from '../../components/Header';
import { NotificationCenter } from '../../components/NotificationCenter';
import { CustomPropertyCard } from '../../components/CustomPropertyCard';
import { VirtualItem } from '../../components/VirtualItem';
import { propertyService } from '../../services/property/property.service';
import { Property, Section } from '../../types';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { CATEGORIES } from '../../data';

// --- ROUTE COMPONENTS ---

import { HomePage as TenantHomePage } from '../../pages/Home';

// ExploreCategories modal component
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

// ViewAll component
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

// 1. DashboardHomeRoute
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
    currentCategoryProperties
  } = useAppContext();

  const navigate = useNavigate();
  const [isExploringCategories, setIsExploringCategories] = React.useState(false);
  const [viewAllSection, setViewAllSection] = React.useState<Section | null>(null);

  const handleShare = (p: Property) => {
    navigator.clipboard.writeText(`${window.location.origin}/app/property/${p.slug}`);
    showToast('Listing link copied to clipboard!', 'success');
  };

  return (
    <>
      {/* Category Airbnb Scroller Row (Desktop/Tablet & Mobile) */}
      <div className="md:hidden">
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
            if (prop?.slug) navigate(`/app/property/${prop.slug}`);
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
                navigate(`/app/property/${prop.slug}`);
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
    navigator.clipboard.writeText(`${window.location.origin}/app/property/${p.slug}`);
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
        if (prop?.slug) navigate(`/app/property/${prop.slug}`);
      }}
      triggerShare={handleShare}
      allProperties={combinedPropertiesList}
      setActiveTab={() => navigate('/app')}
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
        if (prop?.slug) navigate(`/app/property/${prop.slug}`);
      }}
      setOpenMsgPropertyId={(id) => {
        navigate(`/app/messages?propId=${id}`);
      }}
      setActiveTab={() => navigate('/app')}
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
        if (prop?.slug) navigate(`/app/property/${prop.slug}`);
      }}
      triggerShare={(p) => {
        navigator.clipboard.writeText(`${window.location.origin}/app/property/${p.slug}`);
        showToast('Listing link copied!', 'success');
      }}
      allProperties={combinedPropertiesList}
      setActiveTab={() => navigate('/app')}
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
        if (prop?.slug) navigate(`/app/property/${prop.slug}`);
      }}
      onBackToExplore={() => navigate('/app')}
      openConversationWithPropertyId={openMsgPropertyId}
      onClearOpenConversation={() => setOpenMsgPropertyId(null)}
      onChatActiveChange={setIsMobileChatActive}
      activeTab="MESSAGES"
      onTabChange={(tab) => {
        if (tab === 'HOME') navigate('/app');
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
        if (prop?.slug) navigate(`/app/property/${prop.slug}`);
      }}
      propertiesList={combinedPropertiesList}
      activeTab="ACCOUNT"
      onTabChange={(tab) => {
        if (tab === 'HOME') navigate('/app');
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
    navigate(`/app/messages`);
  };

  return (
    <PropertyDetailsPage 
      property={property}
      onBack={() => {
        if (window.history.length > 1) window.history.back();
        else navigate('/app');
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
          onClick={() => navigate('/app')}
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
          onClose={() => navigate('/app')}
          onActionClick={(tab, id) => {
            if (id) {
              const prop = combinedPropertiesList.find(p => p.id === id);
              if (prop?.slug) navigate(`/app/property/${prop.slug}`);
            } else {
              if (tab === 'VISITS') navigate('/app/tours');
              else if (tab === 'MESSAGES') navigate('/app/messages');
              else navigate('/app');
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
    navigator.clipboard.writeText(`${window.location.origin}/app/property/${p.slug}`);
    showToast('Listing link copied to clipboard!', 'success');
  };

  return (
    <SearchPage 
      onBack={() => navigate('/app')}
      savedIds={new Set(savedIds)}
      onToggleSave={toggleSave}
      onSelectProperty={(id) => {
        const prop = combinedPropertiesList.find(p => p.id === id);
        if (prop?.slug) navigate(`/app/property/${prop.slug}`);
      }}
      onShare={handleShare}
      initialQuery={searchQuery}
      isDark={isDark}
    />
  );
};

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardHomeRoute />} />
        <Route path="wishlist" element={<WishlistRoute />} />
        <Route path="tours" element={<VisitsRoute />} />
        <Route path="bookings" element={<BookingsRoute />} />
        <Route path="messages" element={<MessagesRoute />} />
        <Route path="profile" element={<ProfileRoute />} />
        <Route path="settings" element={<ProfileRoute />} />
        <Route path="notifications" element={<NotificationsRoute />} />
        <Route path="search" element={<StaysSearchRoute />} />
        <Route path="property/:slug" element={<PropertyDetailRoute />} />
      </Route>
      {/* Catch-all redirect back to /app dashboard */}
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
};

export default AppRouter;
