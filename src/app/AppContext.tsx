import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../context/TenantAuthContext';
import { useTheme } from '../hooks/useTheme';
import { useNotifications } from '../hooks/useNotifications';
import { useWishlist } from '../hooks/useWishlist';
import { useVisits } from '../hooks/useVisits';
import { useMessages } from '../hooks/useMessages';
import { useProperties } from '../hooks/useProperties';
import { useSearch } from '../hooks/useSearch';
import { Property, Category, Section, FilterState, VisitRequest, LocationInfo } from '../types';
import { supabase } from '@inhaby/shared';

interface AppContextType {
  // Auth
  user: any;
  profile: any;
  authLoading: boolean;
  signOut: () => Promise<any>;

  // Theme
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  accent: string;
  setAccent: (accent: any) => void;

  // Toast / Notifications
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  notifications: any[];
  unreadNotificationsCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  addNotification: (category: string, title: string, message: string, propertyId?: string, actionTab?: string) => void;

  // Wishlist
  savedIds: string[];
  toggleSave: (id: string) => void;
  wishlistSort: string;
  setWishlistSort: (sort: 'price-low' | 'price-high' | 'rating' | 'name') => void;
  getSortedWishlist: (props: Property[]) => Property[];

  // Visits
  visitRequests: VisitRequest[];
  setVisitRequests: React.Dispatch<React.SetStateAction<VisitRequest[]>>;
  addVisitRequest: (req: Omit<VisitRequest, 'id' | 'created_at'>) => Promise<{ success: boolean; error?: string }>;

  // Messages
  unreadChatsCount: number;
  openMsgPropertyId: string | null;
  setOpenMsgPropertyId: (id: string | null) => void;
  isMobileChatActive: boolean;
  setIsMobileChatActive: (active: boolean) => void;

  // Search Query
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  recentlyViewedIds: string[];

  // Location selector state
  activeLocation: LocationInfo;
  handleSelectLocation: (loc: LocationInfo) => void;
  isLocationSelectorOpen: boolean;
  setIsLocationSelectorOpen: (open: boolean) => void;

  // Stays & Properties state
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  sections: Section[];
  paginatedProperties: Property[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  isLoading: boolean;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filteredProperties: Property[];
  currentCategoryProperties: Property[];
  featuredProps: Property[];
  nearbyProps: Property[];
  recommendedProps: Property[];
  recentlyViewedProps: Property[];
  combinedPropertiesList: Property[];
  findPropertyById: (id: string) => Property | undefined;

  // Book Visit Modal states
  isBookVisitModalOpen: boolean;
  setIsBookVisitModalOpen: (open: boolean) => void;
  bookingPropertyId: string | null;
  setBookingPropertyId: (id: string | null) => void;
  chosenBookingDate: string;
  setChosenBookingDate: (date: string) => void;
  chosenBookingTime: string;
  setChosenBookingTime: (time: string) => void;
  chosenBookingMsg: string;
  setChosenBookingMsg: (msg: string) => void;

  // UI elements
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  handleToggleSidebarCollapse: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const { isDark, setIsDark, accent, setAccent } = useTheme();

  const {
    toast,
    showToast,
    notifications,
    unreadCount: unreadNotificationsCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    addNotification
  } = useNotifications();

  const { savedIds, toggleSave: originalToggleSave, wishlistSort, setWishlistSort, getSortedWishlist } = useWishlist();
  const { visitRequests, setVisitRequests, addVisitRequest } = useVisits();
  const { unreadChatsCount, openMsgPropertyId, setOpenMsgPropertyId, isMobileChatActive, setIsMobileChatActive } = useMessages();
  const { searchQuery, setSearchQuery, recentlyViewedIds } = useSearch();

  // Location details
  const [activeLocation, setActiveLocation] = useState<LocationInfo>(() => {
    try {
      const cached = localStorage.getItem('homstay-active-location');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return {
      name: "",
      area: "",
      city: "",
      pincode: ""
    };
  });

  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Load properties based on active parameters
  const {
    activeCategory,
    setActiveCategory,
    sections,
    paginatedProperties,
    page,
    setPage,
    totalPages,
    isLoading,
    filters,
    setFilters,
    filteredProperties
  } = useProperties(searchQuery, 'HOME', activeLocation);

  const handleSelectLocation = useCallback((loc: LocationInfo) => {
    setActiveLocation(loc);
    try {
      localStorage.setItem('homstay-active-location', JSON.stringify(loc));
    } catch (e) {}
    showToast(`Service location synchronized to ${loc.area || loc.name}!`);
    setPage(1);
    addNotification('SYSTEM', 'Location Updated', `Active service area set to ${loc.area || loc.name}, ${loc.city}.`);
  }, [setPage, showToast, addNotification]);

  // Sidebar controls
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('homstay-sidebar-collapsed') === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleToggleSidebarCollapse = useCallback(() => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('homstay-sidebar-collapsed', String(next));
      } catch (e) {}
      return next;
    });
  }, []);

  // Modal forms
  const [isBookVisitModalOpen, setIsBookVisitModalOpen] = useState<boolean>(false);
  const [bookingPropertyId, setBookingPropertyId] = useState<string | null>(null);
  const [chosenBookingDate, setChosenBookingDate] = useState('2026-06-05');
  const [chosenBookingTime, setChosenBookingTime] = useState('11:30 AM');
  const [chosenBookingMsg, setChosenBookingMsg] = useState('');

  // Helpers
  const findPropertyById = useCallback((id: string): Property | undefined => {
    if (!id) return undefined;
    return paginatedProperties.find(p => p.id === id) || 
           sections.flatMap(s => s.items || []).find(p => p.id === id);
  }, [paginatedProperties, sections]);

  const combinedPropertiesList = useMemo(() => {
    const map = new Map<string, Property>();
    sections.flatMap(s => s.items || []).forEach(p => map.set(p.id, p));
    paginatedProperties.forEach(p => map.set(p.id, p));
    return Array.from(map.values());
  }, [paginatedProperties, sections]);

  const currentCategoryProperties = useMemo(() => {
    let filtered = [...paginatedProperties];
    
    // Filter by city only if city is explicitly selected/provided
    const city = activeLocation?.city;
    if (city) {
      const cityFiltered = filtered.filter(p => {
        const pLoc = p.location ? p.location.toLowerCase() : '';
        const pCity = p.city ? p.city.toLowerCase() : '';
        const cityLower = city.toLowerCase();
        
        if (cityLower === 'bengaluru' || cityLower === 'bangalore') {
          return pLoc.includes('bengaluru') || pLoc.includes('bangalore') || pCity.includes('bengaluru') || pCity.includes('bangalore');
        }
        return pLoc.includes(cityLower) || pCity.includes(cityLower);
      });
      // Fallback: If filtering by city yields zero results, do not apply it (or if city matches exist, apply them)
      if (cityFiltered.length > 0) {
        filtered = cityFiltered;
      }
    }

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    // Filter by area only if area is explicitly selected/provided
    const area = activeLocation?.area;
    if (area) {
      const areaMatched = filtered.filter(p => {
        const pArea = p.area ? p.area.toLowerCase() : '';
        const pLoc = p.location ? p.location.toLowerCase() : '';
        return pArea.includes(area.toLowerCase()) || pLoc.includes(area.toLowerCase());
      });
      // Fallback: If filtering by area yields zero results, fall back to showing all city properties
      if (areaMatched.length > 0) {
        return areaMatched;
      }
    }
    
    return filtered;
  }, [activeCategory, activeLocation, paginatedProperties]);

  const featuredProps = useMemo(() => {
    const list = currentCategoryProperties.filter(p => p.tag === 'HOT DEAL' || p.rating >= 4.5);
    return list.length > 0 ? list.slice(0, 4) : currentCategoryProperties.slice(0, 4);
  }, [currentCategoryProperties]);

  const nearbyProps = useMemo(() => {
    const area = activeLocation?.area;
    if (!area) {
      return currentCategoryProperties.slice(0, 4);
    }
    const list = currentCategoryProperties.filter(p => {
      const pArea = p.area || p.location.split(',')[0] || '';
      return pArea.toLowerCase().trim().includes(area.toLowerCase().trim()) || 
             p.location.toLowerCase().includes(area.toLowerCase().trim());
    });
    return list.length > 0 ? list.slice(0, 4) : currentCategoryProperties.slice(0, 4);
  }, [currentCategoryProperties, activeLocation]);

  const recommendedProps = useMemo(() => {
    const list = currentCategoryProperties.filter(p => p.rating >= 4.3);
    return list.length > 0 ? list.slice(0, 4) : currentCategoryProperties.slice(2, 6);
  }, [currentCategoryProperties]);

  const recentlyViewedProps = useMemo(() => {
    const viewed = recentlyViewedIds
      .map(id => findPropertyById(id))
      .filter((p): p is Property => !!p && (activeCategory === 'all' || p.category === activeCategory));
    
    if (viewed.length > 0) return viewed.slice(0, 4);
    return currentCategoryProperties.slice(4, 8);
  }, [recentlyViewedIds, currentCategoryProperties, activeCategory, findPropertyById]);

  const toggleSave = useCallback((id: string) => {
    if (!user || !profile) {
      showToast('Please log in to save properties to your wishlist.', 'info');
      return;
    }
    originalToggleSave(id);
  }, [user, profile, originalToggleSave, showToast]);

  const savedIdsArray = useMemo(() => Array.from(savedIds), [savedIds]);

  return (
    <AppContext.Provider
      value={{
        user,
        profile,
        authLoading,
        signOut,

        isDark,
        setIsDark,
        accent,
        setAccent,

        toast,
        showToast,
        notifications,
        unreadNotificationsCount,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        addNotification,

        savedIds: savedIdsArray,
        toggleSave,
        wishlistSort,
        setWishlistSort,
        getSortedWishlist,

        visitRequests,
        setVisitRequests,
        addVisitRequest,

        unreadChatsCount,
        openMsgPropertyId,
        setOpenMsgPropertyId,
        isMobileChatActive,
        setIsMobileChatActive,

        searchQuery,
        setSearchQuery,
        recentlyViewedIds,

        activeLocation,
        handleSelectLocation,
        isLocationSelectorOpen,
        setIsLocationSelectorOpen,

        activeCategory,
        setActiveCategory,
        sections,
        paginatedProperties,
        page,
        setPage,
        totalPages,
        isLoading,
        filters,
        setFilters,
        filteredProperties,
        currentCategoryProperties,
        featuredProps,
        nearbyProps,
        recommendedProps,
        recentlyViewedProps,
        combinedPropertiesList,
        findPropertyById,

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

        isNotificationsOpen,
        setIsNotificationsOpen,
        isSidebarCollapsed,
        handleToggleSidebarCollapse
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppStateProvider');
  }
  return context;
};
