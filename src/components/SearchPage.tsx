import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  ArrowLeft, 
  Heart, 
  Star, 
  Share2, 
  Check, 
  Map, 
  X, 
  Navigation, 
  Sparkles, 
  Building, 
  Compass, 
  RotateCcw, 
  Sliders, 
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Clock,
  ShieldCheck,
  Grid,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Property, FilterState } from '../types';
import { LazyImage } from './LazyImage';
import { searchService } from '../services/search/search.service';
import { VirtualItem } from './VirtualItem';
import { PropertySearchMap } from './PropertySearchMap';

const CITIES = ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi', 'Kalaburagi', 'Davanagere', 'Shivamogga'];

const SERVED_AREAS = [
  { area: "HSR Layout", city: "Bengaluru", pincode: "560102", lat: 12.9141, lng: 77.6412 },
  { area: "Indira Nagar", city: "Bengaluru", pincode: "560038", lat: 12.9719, lng: 77.6412 },
  { area: "Jayanagar", city: "Bengaluru", pincode: "560011", lat: 12.9308, lng: 77.5838 },
  { area: "Koramangala", city: "Bengaluru", pincode: "560034", lat: 12.9352, lng: 77.6245 },
  { area: "Green Glen Layout", city: "Bengaluru", pincode: "560103", lat: 12.9279, lng: 77.6801 },
  { area: "Whitefield", city: "Bengaluru", pincode: "560066", lat: 12.9698, lng: 77.7499 },
  { area: "Malleshwaram", city: "Bengaluru", pincode: "560003", lat: 12.9959, lng: 77.5714 },
  { area: "Marathahalli", city: "Bengaluru", pincode: "560037", lat: 12.9562, lng: 77.6970 }
];

interface SearchPageProps {
  onBack: () => void;
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
  onSelectProperty: (id: string) => void;
  onShare: (p: Property) => void;
  initialQuery?: string;
  isDark: boolean;
}

interface SuggestionItem {
  type: 'area' | 'city' | 'property' | 'suggestion' | 'trending' | 'recent';
  text: string;
  subtext: string;
  id?: string;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  onBack,
  savedIds,
  onToggleSave,
  onSelectProperty,
  onShare,
  initialQuery = '',
  isDark
}) => {
  // Property Card Renderer
  const renderPropertyCard = (prop: Property) => {
    const isSaved = savedIds.has(prop.id);
    const isFocusedOnMap = selectedPropId === prop.id;
    return (
      <VirtualItem key={prop.id} height="320px">
        <motion.div
          whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
          onClick={() => {
            setSelectedPropId(prop.id);
            if (selectedPropId === prop.id) {
              onSelectProperty(prop.id);
            }
          }}
          className={`bg-theme-surface rounded-2xl md:rounded-3xl overflow-hidden border shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 group cursor-pointer flex flex-col h-full relative font-sans ${
            isFocusedOnMap ? 'border-theme-accent ring-2 ring-theme-accent/30 bg-theme-accent/[0.01]' : 'border-theme-border/60'
          }`}
        >
          {prop.verification_status === 'verified' && (
            <span className="absolute top-3 left-3 z-10 bg-emerald-500/95 backdrop-blur-md text-white text-[7px] md:text-[8px] font-black uppercase tracking-wider px-2 md:px-2.5 py-1.5 rounded-md shadow-md flex items-center gap-1">
              <Check size={8} className="stroke-[3]" /> VERIFIED
            </span>
          )}

          <div className="relative aspect-[4/3] overflow-hidden bg-theme-bg flex-shrink-0">
            <LazyImage 
              src={prop.image} 
              alt={prop.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />
            
            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(prop);
                }}
                className="p-1.5 md:p-2 rounded-full bg-theme-surface/90 backdrop-blur-md text-theme-text-secondary hover:text-theme-accent hover:bg-theme-surface shadow-md active:scale-90 transition-all cursor-pointer"
                title="Share Property"
              >
                <Share2 size={11} className="stroke-[2.5]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(prop.id);
                }}
                className={`p-1.5 md:p-2 rounded-full backdrop-blur-md shadow-md active:scale-90 transition-all cursor-pointer ${
                  isSaved 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-theme-surface/90 text-theme-text-secondary hover:text-red-500 hover:bg-theme-surface'
                }`}
                title="Save stay"
              >
                <Heart size={11} fill={isSaved ? 'currentColor' : 'none'} className="stroke-[2.5]" />
              </button>
            </div>

            <div className="absolute bottom-3 left-3 z-10 flex gap-1.5">
              <span className="bg-black/50 backdrop-blur-md text-white text-[7px] md:text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded border border-white/10">
                {prop.property_type}
              </span>
              {prop.availability_status && (
                <span className={`text-[7px] md:text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded backdrop-blur-md text-white ${
                  prop.availability_status === 'IMMEDIATE' ? 'bg-emerald-600/70 border border-emerald-500/10' : 'bg-orange-600/70'
                }`}>
                  {prop.availability_status}
                </span>
              )}
            </div>
          </div>

          <div className="p-3 md:p-4.5 flex flex-col flex-1 justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[8px] md:text-[9px] font-bold text-theme-text-secondary uppercase tracking-widest block truncate">
                  {prop.details}
                </span>
                <div className="flex items-center gap-1 text-[10px] md:text-xs font-black text-theme-accent bg-theme-accent-soft px-1.5 py-0.5 rounded-md leading-none shrink-0">
                  <span>{prop.rating?.toFixed(1) || '4.0'}</span>
                  <Star size={10} fill="currentColor" className="stroke-[2.5]" />
                </div>
              </div>

              <h4 className="font-serif text-sm font-semibold text-theme-text-primary leading-tight group-hover:text-theme-accent transition-colors duration-200 line-clamp-2">
                {prop.title}
              </h4>

              <div className="flex flex-col gap-1 text-[10px] md:text-xs py-0.5 text-theme-text-secondary font-medium">
                <div className="flex items-center gap-1 truncate">
                  <MapPin size={11} className="text-theme-accent shrink-0 stroke-[2.5]" />
                  <span className="truncate">{prop.location}</span>
                </div>
                {prop.distance !== undefined && (
                  <div className="text-[9px] font-extrabold tracking-wide uppercase text-zinc-500/80 pl-4">
                    Distance: {(prop.distance).toFixed(1)} km from search center
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-theme-border/60 pt-3 flex items-center justify-between gap-2 shrink-0">
              <div className="flex flex-col">
                <span className="text-[7px] md:text-[8px] text-theme-text-secondary font-bold uppercase tracking-wider">RENT / MONTH</span>
                <div className="flex items-baseline gap-1 leading-none mt-0.5">
                  <span className="font-serif font-black text-theme-text-primary text-sm md:text-base">
                    ₹{prop.price?.toLocaleString()}
                  </span>
                  {prop.originalPrice && (
                    <span className="text-[10px] text-zinc-500 line-through">
                      ₹{prop.originalPrice?.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProperty(prop.id);
                }}
                className="text-[8px] md:text-[9px] font-extrabold text-theme-accent underline shrink-0 select-none cursor-pointer hover:text-theme-accent-hover bg-transparent border-none"
              >
                View details
              </button>
            </div>
          </div>
        </motion.div>
      </VirtualItem>
    );
  };

  // Query States
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  
  // Suggestion & Dropdown States
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('homstay-recent-searches');
      return saved ? JSON.parse(saved) : ['Koramangala 1 BHK', 'PG near Metro Station', 'HSR Layout Studio'];
    } catch {
      return ['Koramangala 1 BHK', 'PG near Metro Station', 'HSR Layout Studio'];
    }
  });

  // Location Coordinate states
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Map Selector Modal
  const [showMapModal, setShowMapModal] = useState(false);
  const [simulatedLat, setSimulatedLat] = useState(12.9352);
  const [simulatedLng, setSimulatedLng] = useState(77.6244);
  const [mapSaved, setMapSaved] = useState(false);

  // Manual City Selector Modal
  const [showCityModal, setShowCityModal] = useState(false);

  // Results State
  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Sorting State
  const [sortBy, setSortBy] = useState('relevance');

  // Filter States
  const [tempMinPrice, setTempMinPrice] = useState<number>(0);
  const [tempMaxPrice, setTempMaxPrice] = useState<number>(150000);
  const [appliedMinPrice, setAppliedMinPrice] = useState<number>(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number>(150000);

  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]); // '1 BHK', '2 BHK', '3 BHK', etc.
  const [selectedFurnishings, setSelectedFurnishings] = useState<string[]>([]); // 'Furnished', 'Semi Furnished', 'Unfurnished'
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [selectedNearby, setSelectedNearby] = useState<string[]>([]);

  // Mobile Bottom Sheet Filter Filter
  const [showMobileFilterSheet, setShowMobileFilterSheet] = useState(false);

  // Layout View Mode and Map selection States
  const [searchViewMode, setSearchViewMode] = useState<'split' | 'list' | 'map'>('split');
  const [selectedPropId, setSelectedPropId] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<'price' | 'propertyType' | 'more' | null>(null);

  // Address Selector States
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [addressSearchQuery, setAddressSearchQuery] = useState('');
  const [addressRequestSubmitted, setAddressRequestSubmitted] = useState(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Save recent search
  const addRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const filtered = [term, ...recentSearches.filter(s => s !== term)].slice(0, 6);
    setRecentSearches(filtered);
    localStorage.setItem('homstay-recent-searches', JSON.stringify(filtered));
  };

  // Fetch live suggestions as the user types
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchService.suggestLocations(query)
        .then(items => {
          let suggestionsList = items;
          // Prepend recent searches if empty query
          if (!query.trim()) {
            const parsedRecent = recentSearches.map(term => ({
              type: 'recent' as const,
              text: term,
              subtext: 'Recent search'
            }));
            suggestionsList = [...parsedRecent, ...suggestionsList];
          }
          setSuggestions(suggestionsList);
        })
        .catch(err => console.error("Error fetching suggestions", err));
    }, 150);

    return () => clearTimeout(delayDebounce);
  }, [query, recentSearches]);

  // Click outside search box to close suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerSearch = () => {
    setLoading(true);
    const searchParams: any = {
      q: submittedQuery,
      minPrice: appliedMinPrice,
      maxPrice: appliedMaxPrice,
      sortBy: sortBy,
      page: page,
      limit: 16
    };

    if (selectedPropertyTypes.length > 0) {
      searchParams.propertyTypes = selectedPropertyTypes;
    }
    if (selectedBedrooms.length > 0) {
      searchParams.bedrooms = selectedBedrooms;
    }
    if (selectedFurnishings.length > 0) {
      searchParams.furnishings = selectedFurnishings;
    }
    if (selectedAmenities.length > 0) {
      searchParams.amenities = selectedAmenities;
    }
    if (verifiedOnly) {
      searchParams.verifiedOnly = true;
    }
    if (selectedNearby.length > 0) {
      searchParams.nearby = selectedNearby;
    }
    if (lat !== null && lng !== null) {
      searchParams.lat = lat;
      searchParams.lng = lng;
    }

    searchService.searchProperties(searchParams)
      .then(data => {
        setResults(data.items || []);
        setTotalResults(data.total || 0);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error searching stays", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    triggerSearch();
  }, [
    submittedQuery,
    appliedMinPrice,
    appliedMaxPrice,
    selectedPropertyTypes,
    selectedBedrooms,
    selectedFurnishings,
    selectedAmenities,
    verifiedOnly,
    selectedNearby,
    lat,
    lng,
    sortBy,
    page
  ]);

  const handleSearchSubmit = (searchTerm: string) => {
    setSubmittedQuery(searchTerm);
    setQuery(searchTerm);
    addRecentSearch(searchTerm);
    setShowDropdown(false);
    setPage(1);
  };

  // Keyboard Navigation for Suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      if (e.key === 'ArrowDown') {
        setShowDropdown(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        const selected = suggestions[activeIndex];
        handleSearchSubmit(selected.text);
      } else {
        handleSearchSubmit(query);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // Geolocation trigger
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setLocationName("Near Me");
        setIsGettingLocation(false);
        setPage(1);
        handleSearchSubmit(""); // Clear query to show near me properties
      },
      (error) => {
        console.warn("Geolocation permission error, falling back to simulated HSR Layout GPS", error);
        // Playful fallback
        setLat(12.9141);
        setLng(77.6412);
        setLocationName("HSR Layout (Simulated GPS)");
        setIsGettingLocation(false);
        setPage(1);
        handleSearchSubmit("");
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  // Clear GPS location
  const handleClearLocation = () => {
    setLat(null);
    setLng(null);
    setLocationName(null);
    setPage(1);
  };

  // Manual city selection
  const handleSelectCity = (city: string) => {
    handleSearchSubmit(city);
    setShowCityModal(false);
  };

  // Quick reset
  const handleResetFilters = () => {
    setTempMinPrice(0);
    setTempMaxPrice(150000);
    setAppliedMinPrice(0);
    setAppliedMaxPrice(150000);
    setSelectedPropertyTypes([]);
    setSelectedBedrooms([]);
    setSelectedFurnishings([]);
    setSelectedAmenities([]);
    setVerifiedOnly(false);
    setSelectedNearby([]);
    setSortBy('relevance');
    setQuery('');
    setSubmittedQuery('');
    setLat(null);
    setLng(null);
    setLocationName(null);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-theme-bg overflow-x-hidden pb-10 text-theme-text-primary transition-colors duration-300 font-sans">
      
      {/* HEADER SECTION (Compact, minimalist top bar containing Back button, Search input, Homstay Logo) */}
      <header className="z-50 bg-theme-surface border-b border-theme-border/60 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 h-14 md:h-16 px-4 md:px-8">
          
          {/* Left: Back Button */}
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 hover:text-theme-accent text-xs font-black uppercase tracking-wider text-theme-text-secondary hover:bg-theme-bg px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 animate-in fade-in"
            title="Go Back"
          >
            <ArrowLeft size={15} className="stroke-[2.5]" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Center: Search Input */}
          <div ref={searchBoxRef} className="relative flex-1 max-w-lg mx-auto">
            <div className="relative flex items-center bg-theme-bg border border-theme-border focus-within:border-theme-accent focus-within:bg-theme-surface rounded-full py-1.5 px-4 transition-all duration-300">
              <Search className="text-theme-text-secondary w-4 h-4 stroke-[2.5] flex-shrink-0" />
              <input 
                type="text"
                placeholder="Search properties, locations..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowDropdown(true);
                  setActiveIndex(-1);
                }}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none text-xs font-bold placeholder-theme-text-secondary/55 text-theme-text-primary focus:outline-none focus:ring-0 ml-2 py-0.5"
              />
              {query && (
                <button 
                  onClick={() => { setQuery(''); setSuggestions([]); }}
                  className="px-2 py-0.5 text-[#a1a1a6] text-[9px] font-black uppercase tracking-widest hover:text-theme-accent"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            <AnimatePresence>
              {showDropdown && (suggestions.length > 0 || !query.trim()) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 4 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full z-[100] bg-theme-surface border border-theme-border shadow-2xl rounded-2xl py-2 overflow-hidden text-sm"
                >
                  <div className="px-4 py-1 flex items-center justify-between border-b border-theme-border/40 pb-1.5 text-[8px] font-black uppercase tracking-wider text-theme-text-secondary/60">
                    <span>{query.trim() ? "Matches Found" : "Recent Searches"}</span>
                    <TrendingUp size={9} className="text-theme-accent" />
                  </div>
                  
                  <div className="max-h-[250px] overflow-y-auto no-scrollbar py-1">
                    {suggestions.map((item, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (item.type === 'property' && item.id) {
                              onSelectProperty(item.id);
                            } else {
                              handleSearchSubmit(item.text);
                            }
                          }}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`px-4 py-2.5 flex items-start gap-3 cursor-pointer transition-all ${
                            isActive ? 'bg-theme-accent-soft text-theme-text-primary border-l-4 border-theme-accent' : 'border-l-4 border-transparent hover:bg-theme-bg/40'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 ${
                            item.type === 'recent' ? 'bg-zinc-500/10 text-zinc-500' :
                            item.type === 'area' ? 'bg-blue-500/10 text-blue-500' :
                            item.type === 'property' ? 'bg-emerald-500/10 text-emerald-500' :
                            item.type === 'city' ? 'bg-purple-500/10 text-purple-500' : 'bg-theme-accent-soft text-theme-accent'
                          }`}>
                            {item.type === 'recent' && <Clock size={12} />}
                            {item.type === 'area' && <MapPin size={12} />}
                            {item.type === 'property' && <Building size={12} />}
                            {item.type === 'city' && <Compass size={12} />}
                            {(item.type === 'suggestion' || item.type === 'trending') && <TrendingUp size={12} />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-xs truncate text-theme-text-primary leading-tight">
                              {item.text}
                            </span>
                            <span className="text-[9px] text-theme-text-secondary leading-none mt-0.5">
                              {item.subtext}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Homstay Logo */}
          <span className="font-serif font-black tracking-widest text-theme-accent text-sm md:text-base select-none shrink-0">
            HOMSTAY
          </span>

        </div>

        {/* SECTION 2: Current Location Selector Ribbon */}
        <div className="bg-theme-surface border-t border-theme-border/40 py-2 px-4 md:px-8 flex items-center md:justify-center">
          <button 
            onClick={() => {
              setShowAddressSelector(true);
              setAddressRequestSubmitted(false);
              setAddressSearchQuery('');
            }}
            className="flex items-center gap-1.5 text-left cursor-pointer hover:opacity-85 transition-opacity"
          >
            <MapPin size={13} className="text-theme-accent stroke-[2.5]" />
            <div className="flex items-center gap-1 font-sans">
              <span className="text-[9px] font-black text-theme-text-secondary uppercase tracking-wider">📍 Current Location:</span>
              <span className="text-[11px] font-bold text-theme-text-primary underline decoration-theme-accent/60 hover:text-theme-accent transition-colors leading-none">
                {locationName || "Riya Bhati House"}
              </span>
            </div>
            <ChevronDown size={11} className="text-theme-text-secondary" />
          </button>
        </div>
      </header>

      {/* 2. STICKY HORIZONTAL FILTERS TOOLBAR FOR DESKTOP & MOBILE TRANSITIONS */}
      <div className="sticky top-20 z-40 bg-theme-surface border-b border-theme-border/60 py-3.5 px-4 md:px-8 shadow-sm transition-all duration-300 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
          
          {/* Filters List */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Price Filter Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
                className={`px-4 py-2 rounded-full border text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  appliedMinPrice > 0 || appliedMaxPrice < 150000
                    ? 'bg-theme-accent border-theme-accent text-white'
                    : 'bg-theme-bg border-theme-border text-theme-text-secondary hover:border-theme-accent'
                }`}
              >
                <span>Price</span>
                {(appliedMinPrice > 0 || appliedMaxPrice < 150000) && (
                  <span className="bg-white text-theme-accent text-[8px] font-black px-1.5 py-0.5 rounded-full leading-none">
                    ₹{appliedMinPrice/1000}k-{appliedMaxPrice/1000}k
                  </span>
                )}
                <ChevronDown size={11} className="stroke-[2.5]" />
              </button>
              
              {openDropdown === 'price' && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                  <div className="absolute left-0 mt-2 p-5 bg-theme-surface border border-theme-border rounded-2xl shadow-xl w-64 z-50 animate-in fade-in slide-in-from-top-1">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#a1a1a6] mb-3">Price range (Rent)</h5>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="space-y-1">
                        <span className="text-[8px] font-bold text-theme-text-secondary uppercase">Min</span>
                        <input 
                          type="number" 
                          value={tempMinPrice}
                          onChange={(e) => setTempMinPrice(Number(e.target.value))}
                          className="w-full bg-theme-bg border border-theme-border rounded-xl px-2.5 py-1.5 text-xs font-black text-theme-text-primary focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] font-bold text-theme-text-secondary uppercase">Max</span>
                        <input 
                          type="number" 
                          value={tempMaxPrice}
                          onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                          className="w-full bg-theme-bg border border-theme-border rounded-xl px-2.5 py-1.5 text-xs font-black text-theme-text-primary focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setTempMinPrice(0);
                          setTempMaxPrice(150000);
                          setAppliedMinPrice(0);
                          setAppliedMaxPrice(150000);
                          setOpenDropdown(null);
                          setPage(1);
                        }}
                        className="flex-1 py-1.5 text-center text-[9px] font-black uppercase tracking-wider text-theme-text-secondary border border-theme-border rounded-lg hover:bg-theme-bg/60 cursor-pointer"
                      >
                        Reset
                      </button>
                      <button 
                        onClick={() => {
                          setAppliedMinPrice(tempMinPrice);
                          setAppliedMaxPrice(tempMaxPrice);
                          setOpenDropdown(null);
                          setPage(1);
                        }}
                        className="flex-1 py-1.5 bg-theme-accent text-white rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-theme-accent-hover cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Property Types Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === 'propertyType' ? null : 'propertyType')}
                className={`px-4 py-2 rounded-full border text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedPropertyTypes.length > 0
                    ? 'bg-theme-accent border-theme-accent text-white'
                    : 'bg-theme-bg border-theme-border text-theme-text-secondary hover:border-theme-accent'
                }`}
              >
                <span>Stay Type</span>
                {selectedPropertyTypes.length > 0 && (
                  <span className="bg-white text-theme-accent text-[8px] font-black px-1.5 py-0.5 rounded-full leading-none shrink-0">
                    {selectedPropertyTypes.length}
                  </span>
                )}
                <ChevronDown size={11} className="stroke-[2.5]" />
              </button>

              {openDropdown === 'propertyType' && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                  <div className="absolute left-0 mt-2 p-4 bg-theme-surface border border-theme-border rounded-2xl shadow-xl w-48 z-50 animate-in fade-in slide-in-from-top-1">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#a1a1a6] mb-2 border-b border-theme-border/40 pb-1.5">Property Type</h5>
                    <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
                      {['PG', 'Apartment', 'Flat', 'House', 'Room', 'Studio', 'Villa'].map(type => {
                        const isChecked = selectedPropertyTypes.includes(type);
                        return (
                          <label key={type} className="flex items-center gap-2.5 text-xs font-bold text-theme-text-primary hover:text-theme-accent transition-colors cursor-pointer leading-none">
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setSelectedPropertyTypes(prev => 
                                  isChecked ? prev.filter(t => t !== type) : [...prev, type]
                                );
                                setPage(1);
                              }}
                              className="w-4 h-4 rounded border-theme-border text-theme-accent focus:ring-0 cursor-pointer shrink-0"
                            />
                            <span>{type}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* More Filters Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === 'more' ? null : 'more')}
                className={`px-4 py-2 rounded-full border text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedBedrooms.length > 0 || selectedFurnishings.length > 0 || selectedAmenities.length > 0 || verifiedOnly || selectedNearby.length > 0
                    ? 'bg-theme-accent border-theme-accent text-white'
                    : 'bg-theme-bg border-theme-border text-theme-text-secondary hover:border-theme-accent'
                }`}
              >
                <span>More Filters</span>
                {(selectedBedrooms.length > 0 || selectedFurnishings.length > 0 || selectedAmenities.length > 0 || verifiedOnly || selectedNearby.length > 0) && (
                  <span className="bg-white text-theme-accent text-[8px] font-black px-1.5 py-0.5 rounded-full leading-none shrink-0">
                    {(selectedBedrooms.length > 0 ? 1 : 0) + (selectedFurnishings.length > 0 ? 1 : 0) + selectedAmenities.length + (verifiedOnly ? 1 : 0) + selectedNearby.length}
                  </span>
                )}
                <ChevronDown size={11} className="stroke-[2.5]" />
              </button>

              {openDropdown === 'more' && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                  <div className="absolute right-0 lg:left-0 mt-2 p-5 bg-theme-surface border border-theme-border rounded-2xl shadow-2xl w-80 max-h-[420px] overflow-y-auto no-scrollbar z-50 animate-in fade-in slide-in-from-top-1 space-y-5">
                    
                    {/* Bedrooms */}
                    <div className="space-y-2 border-b border-theme-border/40 pb-3">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-[#a1a1a6]">BHK Configuration</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {['Any', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'].map(bhk => {
                          const isSelected = selectedBedrooms.includes(bhk) || (bhk === 'Any' && selectedBedrooms.length === 0);
                          return (
                            <button
                              key={bhk}
                              onClick={() => {
                                if (bhk === 'Any') {
                                  setSelectedBedrooms([]);
                                } else {
                                  setSelectedBedrooms(prev => 
                                    prev.includes(bhk) ? prev.filter(b => b !== bhk) : [...prev, bhk]
                                  );
                                }
                                setPage(1);
                              }}
                              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer border ${
                                isSelected 
                                  ? 'bg-theme-accent border-theme-accent text-white' 
                                  : 'bg-theme-bg border-theme-border/80 text-theme-text-secondary hover:border-theme-accent'
                              }`}
                            >
                              {bhk}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Furnishing */}
                    <div className="space-y-2 border-b border-theme-border/40 pb-3">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-[#a1a1a6]">Furnishing</h5>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['Any', 'Fully Furnished', 'Semi Furnished', 'Unfurnished'].map(item => {
                          const isSelected = selectedFurnishings.includes(item) || (item === 'Any' && selectedFurnishings.length === 0);
                          return (
                            <button
                              key={item}
                              onClick={() => {
                                if (item === 'Any') {
                                  setSelectedFurnishings([]);
                                } else {
                                  setSelectedFurnishings(prev => 
                                    prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
                                  );
                                }
                                setPage(1);
                              }}
                              className={`text-left px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border flex items-center justify-between ${
                                isSelected 
                                  ? 'bg-theme-accent-soft border-theme-accent text-theme-accent' 
                                  : 'bg-theme-bg border-theme-border/80 text-theme-text-secondary hover:border-theme-accent'
                              }`}
                            >
                              <span>{item}</span>
                              {isSelected && <Check size={10} className="stroke-[2.5]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Verified Only */}
                    <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#a1a1a6] flex items-center gap-1.5">
                        <ShieldCheck className="text-emerald-500 fill-emerald-500/10" size={14} /> Verified only
                      </span>
                      <input 
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={() => { setVerifiedOnly(!verifiedOnly); setPage(1); }}
                        className="w-4.5 h-4.5 rounded border-theme-border text-theme-accent focus:ring-0 cursor-pointer"
                      />
                    </div>

                    {/* Amenities */}
                    <div className="space-y-2 border-b border-theme-border/40 pb-3">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-[#a1a1a6]">Amenities</h5>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 max-h-36 overflow-y-auto no-scrollbar">
                        {[
                          'WiFi', 'AC', 'Parking', 'Lift', 'Security', 'Kitchen', 
                          'Attached Bathroom', 'Washing Machine', 'Power Backup', 
                          'Gym', 'Balcony', 'Water Supply', 'CCTV'
                        ].map(amenity => {
                          const isChecked = selectedAmenities.includes(amenity);
                          return (
                            <label key={amenity} className="flex items-center gap-2 text-xs font-bold text-theme-text-primary/90 hover:text-theme-accent transition-colors cursor-pointer leading-none">
                              <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  setSelectedAmenities(prev => 
                                    isChecked ? prev.filter(a => a !== amenity) : [...prev, amenity]
                                  );
                                  setPage(1);
                                }}
                                className="w-4 h-4 rounded border-theme-border text-theme-accent focus:ring-0 cursor-pointer shrink-0"
                              />
                              <span className="truncate">{amenity}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Landmarks */}
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-[#a1a1a6]">Landmark Filters</h5>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 max-h-36 overflow-y-auto no-scrollbar">
                        {[
                          { label: 'Near Metro', value: 'Metro' },
                          { label: 'Near College', value: 'College' },
                          { label: 'Near Hospital', value: 'Hospital' },
                          { label: 'Near Office', value: 'Office' },
                          { label: 'Near Bus Stop', value: 'Bus' },
                          { label: 'Near Railway Station', value: 'Railway' },
                          { label: 'Near Market', value: 'Market' },
                          { label: 'Near Mall', value: 'Mall' }
                        ].map(item => {
                          const isChecked = selectedNearby.includes(item.value);
                          return (
                            <label key={item.value} className="flex items-center gap-2 text-xs font-bold text-theme-text-primary/95 hover:text-theme-accent transition-colors cursor-pointer leading-none">
                              <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  setSelectedNearby(prev => 
                                    isChecked ? prev.filter(n => n !== item.value) : [...prev, item.value]
                                  );
                                  setPage(1);
                                }}
                                className="w-4 h-4 rounded border-theme-border text-theme-accent focus:ring-0 cursor-pointer shrink-0"
                              />
                              <span className="truncate">{item.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Apply & Reset Buttons */}
                    <div className="flex gap-2 pt-2 border-t border-theme-border/40">
                      <button 
                        onClick={() => {
                          setSelectedBedrooms([]);
                          setSelectedFurnishings([]);
                          setSelectedAmenities([]);
                          setVerifiedOnly(false);
                          setSelectedNearby([]);
                          setOpenDropdown(null);
                          setPage(1);
                        }}
                        className="flex-1 py-1.5 text-center text-[9px] font-black uppercase tracking-wider text-theme-text-secondary border border-theme-border rounded-lg hover:bg-theme-bg/60 cursor-pointer"
                      >
                        Reset
                      </button>
                      <button 
                        onClick={() => setOpenDropdown(null)}
                        className="flex-1 py-1.5 bg-theme-accent text-white font-black text-[9px] uppercase tracking-wider rounded-lg hover:bg-theme-accent-hover cursor-pointer"
                      >
                        Done
                      </button>
                    </div>

                  </div>
                </>
              )}
            </div>

            {/* Clear All active filters Button */}
            {(appliedMinPrice > 0 || appliedMaxPrice < 150000 || selectedPropertyTypes.length > 0 || selectedBedrooms.length > 0 || selectedFurnishings.length > 0 || selectedAmenities.length > 0 || verifiedOnly || selectedNearby.length > 0) && (
              <button 
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-600 transition-all cursor-pointer text-[10px] uppercase tracking-wider font-black"
              >
                <RotateCcw size={10} className="stroke-[3]" />
                <span>Reset</span>
              </button>
            )}

          </div>

          {/* Quick Stats & Map View Selectors */}
          <div className="flex items-center gap-3 justify-between md:justify-end">
            <span className="text-[10px] font-bold text-theme-text-secondary uppercase tracking-widest hidden md:inline">
              Showing {totalResults} matches
            </span>
            <div className="flex items-center gap-1 bg-theme-bg p-1 rounded-xl border border-theme-border/60 shrink-0 select-none">
              <button
                type="button"
                onClick={() => setSearchViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  searchViewMode === 'list' 
                    ? 'bg-theme-accent text-white shadow-sm' 
                    : 'text-theme-text-secondary hover:text-theme-text-primary'
                }`}
                title="List View Only"
              >
                <Grid size={11} className="stroke-[2.5]" />
                <span>List</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchViewMode('split')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  searchViewMode === 'split' 
                    ? 'bg-theme-accent text-white shadow-sm' 
                    : 'text-theme-text-secondary hover:text-theme-text-primary'
                }`}
                title="Split List + Map"
              >
                <SlidersHorizontal size={11} className="stroke-[2.5]" />
                <span>Split</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  searchViewMode === 'map' 
                    ? 'bg-theme-accent text-white shadow-sm' 
                    : 'text-theme-text-secondary hover:text-theme-text-primary'
                }`}
                title="Immersive Map Only"
              >
                <Map size={11} className="stroke-[2.5]" />
                <span>Map Only</span>
              </button>
            </div>
            
            {/* Tablet/Mobile Sliders sheet fallback handler */}
            <button 
              onClick={() => setShowMobileFilterSheet(true)}
              className="md:hidden flex items-center justify-center p-2 rounded-xl bg-theme-bg border border-theme-border text-theme-text-secondary"
            >
              <Sliders size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN DISPLAY CORE: MULTI-ROW SEARCH RESULTS */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* Dynamic Mobile/Tablet quick count row */}
        <div className="md:hidden flex items-center justify-between bg-theme-surface border border-theme-border rounded-xl p-3 mb-4 select-none shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider text-theme-text-primary flex items-center gap-1.5">
            <Info size={12} className="text-theme-accent" />
            <span>{totalResults} Stays Found</span>
          </span>
          <button 
            onClick={() => setShowMobileFilterSheet(true)}
            className="flex items-center gap-1 bg-theme-accent text-white font-black text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-lg shadow cursor-pointer"
          >
            <SlidersHorizontal size={10} />
            <span>Filters</span>
          </button>
        </div>

        {/* LISTINGS DISPLAY WRAPPER WITH CHIPS SORTING */}
        <div className="space-y-6">
          
          {/* Top Horizontal Sorting Bar with scrolls */}
          <div className="flex flex-col gap-4 bg-theme-surface border border-theme-border/60 rounded-3xl p-4 shadow-sm transition-colors duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-theme-text-primary flex items-center gap-2 font-sans truncate">
                <Compass className="text-theme-accent shrink-0" size={15} />
                {submittedQuery ? `Matches for "${submittedQuery}"` : "Discovering stays"}
                <span className="bg-theme-accent-soft text-theme-accent text-[9px] font-black px-2.5 py-1 rounded-full uppercase ml-1 shrink-0">
                  {totalResults} Stays
                </span>
              </span>
              
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 shrink-0 select-none">
                {[
                  { id: 'relevance', name: 'Relevance' },
                  { id: 'popularity', name: 'Popularity' },
                  { id: 'price-low', name: 'Price Low to High' },
                  { id: 'price-high', name: 'Price High to Low' },
                  { id: 'newest', name: 'Newest First' },
                  { id: 'verified', name: 'Verified Only' },
                  { id: 'nearest', name: 'Nearest Location' }
                ].map(item => {
                  const isActive = sortBy === item.id;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => { setSortBy(item.id); setPage(1); }}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                        isActive 
                          ? 'bg-theme-accent border-theme-accent text-white shadow-sm' 
                          : 'bg-theme-bg border-theme-border text-theme-text-secondary hover:border-theme-accent'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Listings & Map Container based on searchViewMode */}
          {searchViewMode === 'map' ? (
            /* Immersive Full Map view */
            <div className="h-[680px] w-full rounded-2xl overflow-hidden shadow-lg relative border border-theme-border flex-grow animate-in fade-in duration-300">
              <PropertySearchMap 
                properties={results}
                selectedPropertyId={selectedPropId}
                onSelectProperty={(id) => {
                  setSelectedPropId(id);
                }}
                isDark={isDark}
              />
              
              {/* Footer sliding card overlay on top of map */}
              <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
                <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 pointer-events-auto select-none">
                  {results.slice(0, 5).map(prop => {
                    const isSelected = selectedPropId === prop.id;
                    return (
                      <div 
                        key={prop.id}
                        onClick={() => {
                          setSelectedPropId(prop.id);
                          if (isSelected) {
                            onSelectProperty(prop.id);
                          }
                        }}
                        className={`flex gap-3 bg-theme-surface/95 backdrop-blur-md border rounded-2xl p-2 shadow-xl hover:shadow-2xl transition-all w-68 shrink-0 cursor-pointer ${
                          isSelected ? 'border-theme-accent ring-2 ring-theme-accent/20' : 'border-theme-border/60 hover:border-theme-accent'
                        }`}
                      >
                        <img 
                          src={prop.image} 
                          alt={prop.title} 
                          className="w-16 h-16 rounded-xl object-cover shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col justify-between min-w-0 py-0.5">
                          <span className="font-serif font-black text-[10px] text-theme-text-primary line-clamp-1 leading-snug">{prop.title}</span>
                          <span className="text-[9px] text-theme-text-secondary truncate">{prop.location}</span>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-theme-text-primary leading-none">₹{prop.price?.toLocaleString()}</span>
                            <span className="text-[8px] font-black text-theme-accent bg-theme-accent-soft px-1 rounded">★ {prop.rating?.toFixed(1) || '4.0'}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : searchViewMode === 'split' ? (
            /* Side-by-Side: Listings + Real Map */
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-in fade-in duration-300 flex-grow">
              {/* Listings column */}
              <div className="xl:col-span-7 space-y-6">
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-theme-surface h-72 rounded-3xl border border-theme-border" />
                    ))}
                  </div>
                ) : results.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {results.map(prop => renderPropertyCard(prop))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center select-none bg-theme-surface border border-theme-border rounded-3xl p-8">
                    <Compass size={40} className="text-zinc-300 stroke-[1.5] mb-4" />
                    <h3 className="font-serif text-lg font-black text-theme-text-primary uppercase tracking-wider">No stays discovered</h3>
                    <p className="text-xs text-theme-text-secondary mt-2 max-w-sm">We couldn't discover any available properties matching your criteria.</p>
                    <button 
                      onClick={handleResetFilters}
                      className="mt-6 px-6 py-3 bg-theme-accent hover:bg-theme-accent-hover text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-md shadow-theme-accent/20 cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Map Column */}
              <div className="xl:col-span-5 relative h-[680px] self-start sticky top-28 select-none">
                <PropertySearchMap 
                  properties={results}
                  selectedPropertyId={selectedPropId}
                  onSelectProperty={(id) => {
                    setSelectedPropId(id);
                  }}
                  isDark={isDark}
                />
              </div>
            </div>
          ) : (
            /* Traditional Listings grid (List-only) */
            <>
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 animate-pulse">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-theme-surface h-72 md:h-80 rounded-3xl border border-theme-border" />
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {results.map(prop => renderPropertyCard(prop))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center select-none bg-theme-surface border border-theme-border rounded-3xl p-8">
                  <Compass size={48} className="text-zinc-300 stroke-[1.5] mb-5" />
                  <h3 className="font-serif text-lg font-black text-theme-text-primary uppercase tracking-wider">No stays discovered</h3>
                  <p className="text-xs text-theme-text-secondary mt-2 max-w-sm">We couldn't discover any available properties matching your current criteria or location coordinates.</p>
                  <button 
                    onClick={handleResetFilters}
                    className="mt-6 px-6 py-3 bg-theme-accent hover:bg-theme-accent-hover text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-md shadow-theme-accent/20 cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* 3. SIMULATED MAP LOCATION CHOOSE MODAL */}
      <AnimatePresence>
        {showMapModal && (
          <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-theme-surface border border-theme-border w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col font-sans"
            >
              <div className="px-6 py-4 border-b border-theme-border flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-black text-theme-text-primary uppercase">Select custom location on Map</h3>
                  <p className="text-[10px] text-theme-text-secondary font-bold">Drag and move the pin on the map below, double tap or click to relocate</p>
                </div>
                <button 
                  onClick={() => setShowMapModal(false)}
                  className="p-2 hover:bg-theme-bg rounded-full text-theme-text-secondary hover:text-theme-text-primary cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Real Google Map Interactive Canvas */}
              <div className="relative bg-zinc-100 flex-1 h-[320px] overflow-hidden select-none">
                <PropertySearchMap 
                  properties={[]}
                  selectedPropertyId={null}
                  onSelectProperty={() => {}}
                  isChooseLocationMode={true}
                  centerLat={simulatedLat}
                  centerLng={simulatedLng}
                  onLocationSelect={(lat, lng) => {
                    setSimulatedLat(lat);
                    setSimulatedLng(lng);
                  }}
                  isDark={isDark}
                />
              </div>

              {/* Bottom save button coordinates */}
              <div className="p-6 border-t border-theme-border flex items-center justify-between gap-4">
                <div className="flex flex-col text-xs">
                  <span className="font-extrabold text-theme-text-primary uppercase leading-tight">PINPED CENTER COORDINATES</span>
                  <span className="font-mono text-theme-text-secondary leading-none mt-1">
                    LAT: {simulatedLat.toFixed(4)}° N • LNG: {simulatedLng.toFixed(4)}° E
                  </span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      // Simulating randomized click coords in Bengaluru
                      const extraOffsetLat = (Math.random() - 0.5) * 0.05;
                      const extraOffsetLng = (Math.random() - 0.5) * 0.05;
                      setSimulatedLat(12.9352 + extraOffsetLat);
                      setSimulatedLng(77.6244 + extraOffsetLng);
                    }}
                    className="px-4 py-2 border border-theme-border font-extrabold text-xs uppercase rounded-xl hover:bg-theme-bg cursor-pointer"
                  >
                    Move/Relocate Pin
                  </button>
                  <button 
                    onClick={() => {
                      setLat(simulatedLat);
                      setLng(simulatedLng);
                      setMapSaved(true);
                      setLocationName("Selected custom location on Map");
                      setPage(1);
                      setShowMapModal(false);
                      handleSearchSubmit(""); // re-query immediately
                    }}
                    className="bg-theme-accent hover:bg-theme-accent-hover text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase cursor-pointer"
                  >
                    Confirm GPS Center
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. MANUAL SELECT CITY MODAL */}
      <AnimatePresence>
        {showCityModal && (
          <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-theme-surface border border-theme-border w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative flex flex-col font-sans"
            >
              <div className="px-6 py-4 border-b border-theme-border flex items-center justify-between">
                <h3 className="font-serif text-base font-black text-theme-text-primary uppercase flex items-center gap-2">
                  <Building className="text-theme-accent" size={16} /> Choose City Manually
                </h3>
                <button 
                  onClick={() => setShowCityModal(false)}
                  className="p-2 hover:bg-theme-bg rounded-full text-theme-text-secondary hover:text-theme-text-primary cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 grid grid-cols-2 gap-3.5">
                {CITIES.map(city => (
                  <button
                    key={city}
                    onClick={() => handleSelectCity(city)}
                    className="px-4 py-3.5 bg-theme-bg border border-theme-border hover:border-theme-accent hover:bg-theme-accent-soft rounded-2xl font-black text-xs uppercase text-theme-text-primary hover:text-theme-accent text-center active:scale-95 transition-all cursor-pointer"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. MOBILE BOTTOM SHEET FILTER PANEL */}
      <AnimatePresence>
        {showMobileFilterSheet && (
          <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-end justify-center">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.15 }}
              className="bg-theme-surface border-t border-theme-border w-full max-w-md rounded-t-3xl overflow-hidden shadow-2xl h-[85vh] flex flex-col font-sans"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-theme-border flex items-center justify-between">
                <span className="font-serif text-sm font-black uppercase tracking-wider text-theme-text-primary flex items-center gap-2">
                  <Sliders className="text-theme-accent" size={16} /> filter parameters
                </span>
                <button 
                  onClick={() => setShowMobileFilterSheet(false)}
                  className="p-2 hover:bg-theme-bg rounded-full text-theme-text-secondary hover:text-theme-text-primary cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Filters form */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
                
                {/* Price input fields */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-theme-accent">Price limits (₹)</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="number" 
                      value={tempMinPrice}
                      onChange={(e) => setTempMinPrice(Number(e.target.value))}
                      className="w-full bg-theme-bg border border-theme-border rounded-xl px-3 py-2 text-xs font-black text-theme-text-primary"
                      placeholder="Min"
                    />
                    <input 
                      type="number" 
                      value={tempMaxPrice}
                      onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                      className="w-full bg-theme-bg border border-theme-border rounded-xl px-3 py-2 text-xs font-black text-theme-text-primary"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Property Type checklist */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-theme-accent">Property Type</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {['PG', 'Apartment', 'Flat', 'House', 'Room', 'Studio', 'Villa'].map(type => {
                      const isChecked = selectedPropertyTypes.includes(type);
                      return (
                        <label key={type} className="flex items-center gap-3 text-xs font-bold text-theme-text-primary/95 cursor-pointer leading-none">
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedPropertyTypes(prev => 
                                isChecked ? prev.filter(t => t !== type) : [...prev, type]
                              );
                              setPage(1);
                            }}
                            className="w-4.5 h-4.5 rounded border-theme-border text-theme-accent focus:ring-0 cursor-pointer"
                          />
                          <span>{type}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Bedrooms count pills */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-theme-accent">Bedrooms (BHK)</h5>
                  <div className="flex flex-wrap gap-2">
                    {['Any', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'].map(bhk => {
                      const isSelected = selectedBedrooms.includes(bhk) || (bhk === 'Any' && selectedBedrooms.length === 0);
                      return (
                        <button
                          key={bhk}
                          onClick={() => {
                            if (bhk === 'Any') {
                              setSelectedBedrooms([]);
                            } else {
                              setSelectedBedrooms(prev => 
                                prev.includes(bhk) ? prev.filter(b => b !== bhk) : [...prev, bhk]
                              );
                            }
                            setPage(1);
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border ${
                            isSelected 
                              ? 'bg-theme-accent border-theme-accent text-white shadow-md' 
                              : 'bg-theme-bg border-theme-border/80 text-theme-text-secondary'
                          }`}
                        >
                          {bhk}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Furnishing pills */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-theme-accent">Furnishing Status</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {['Any', 'Fully Furnished', 'Semi Furnished', 'Unfurnished'].map(item => {
                      const isSelected = selectedFurnishings.includes(item) || (item === 'Any' && selectedFurnishings.length === 0);
                      return (
                        <button
                          key={item}
                          onClick={() => {
                            if (item === 'Any') {
                              setSelectedFurnishings([]);
                            } else {
                              setSelectedFurnishings(prev => 
                                prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
                              );
                            }
                            setPage(1);
                          }}
                          className={`text-left px-3 py-1.5 rounded-xl text-[10px] font-bold border flex items-center justify-between cursor-pointer ${
                            isSelected 
                              ? 'bg-theme-accent-soft border-theme-accent text-theme-accent' 
                              : 'bg-theme-bg border-theme-border'
                          }`}
                        >
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Verified toggle */}
                <div className="pt-2 border-t border-theme-border/40">
                  <label className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-theme-text-primary cursor-pointer select-none">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-emerald-500" size={16} />
                      <span>Verified Only</span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={() => { setVerifiedOnly(!verifiedOnly); setPage(1); }}
                      className="w-5 h-5 rounded border-theme-border text-theme-accent focus:ring-0 cursor-pointer"
                    />
                  </label>
                </div>

                {/* Amenities checklist */}
                <div className="space-y-3 pt-4 border-t border-theme-border/40">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-theme-accent">Amenities</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {['WiFi', 'AC', 'Parking', 'Lift', 'Security', 'Kitchen', 'Attached Bathroom', 'Washing Machine', 'Gym'].map(amenity => {
                      const isChecked = selectedAmenities.includes(amenity);
                      return (
                        <label key={amenity} className="flex items-center gap-3 text-xs font-bold text-theme-text-primary cursor-pointer leading-none">
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedAmenities(prev => 
                                isChecked ? prev.filter(a => a !== amenity) : [...prev, amenity]
                              );
                              setPage(1);
                            }}
                            className="w-4.5 h-4.5 rounded border-theme-border text-theme-accent focus:ring-0 cursor-pointer"
                          />
                          <span>{amenity}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Sticky bottom buttons */}
              <div className="p-4 border-t border-theme-border flex gap-3">
                <button 
                  onClick={() => { handleResetFilters(); setShowMobileFilterSheet(false); }}
                  className="flex-1 py-3 text-center border border-theme-border text-xs font-black uppercase tracking-wider rounded-xl hover:bg-theme-bg"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => {
                    setAppliedMinPrice(tempMinPrice);
                    setAppliedMaxPrice(tempMaxPrice);
                    setShowMobileFilterSheet(false);
                    setPage(1);
                  }}
                  className="flex-1 py-3 text-center bg-theme-accent text-white hover:bg-theme-accent-hover text-xs font-black uppercase tracking-wider rounded-xl shadow-lg"
                >
                  Apply Filters
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SECTION 2: ADDRESS SELECTOR DIALOG POPUP */}
      <AnimatePresence>
        {showAddressSelector && (
          <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-theme-surface border border-theme-border w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative flex flex-col font-sans max-h-[85vh]"
            >
              <div className="px-5 py-4 border-b border-theme-border flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-sm font-black text-theme-text-primary uppercase tracking-wider">Address Book & Coverage</h3>
                  <p className="text-[9px] text-theme-text-secondary font-bold">Select, request, or verify locations coordinates</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setShowAddressSelector(false)}
                  className="p-1.5 hover:bg-theme-bg rounded-full text-theme-text-secondary hover:text-theme-text-primary cursor-pointer transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 overflow-y-auto no-scrollbar space-y-4">
                
                {/* 1. Device Location */}
                <div className="space-y-1.5">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-[#a1a1a6]">Device Positioning</h4>
                  <button
                    onClick={() => {
                      handleUseCurrentLocation();
                      setShowAddressSelector(false);
                    }}
                    disabled={isGettingLocation}
                    className="w-full flex items-center gap-3 p-3 bg-theme-bg border border-theme-border hover:border-theme-accent hover:bg-theme-accent-soft rounded-2xl transition-all text-left"
                  >
                    <div className="p-2 rounded-xl bg-theme-accent-soft text-theme-accent shrink-0">
                      <Navigation size={13} className={isGettingLocation ? "animate-spin" : ""} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black text-theme-text-primary uppercase block">Current GPS Location</span>
                      <span className="text-[9px] text-theme-text-secondary block mt-0.5">Sync and locate stays where you stand now</span>
                    </div>
                  </button>
                </div>

                {/* 2. Registered Addresses */}
                <div className="space-y-1.5">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-[#a1a1a6]">Saved Addresses</h4>
                  <div className="space-y-1.5">
                    {[
                      { id: 'pres-1', name: 'Riya Bhati House (Default)', address: 'Sector 3, HSR Layout, Bengaluru, 560102', lat: 12.9141, lng: 77.6412 },
                      { id: 'pres-2', name: 'Indiranagar Workplace Campus', address: 'Cyber Hub Indiranagar, Bengaluru, 560038', lat: 12.9719, lng: 77.6412 }
                    ].map(addr => (
                      <button
                        key={addr.id}
                        onClick={() => {
                          setLat(addr.lat);
                          setLng(addr.lng);
                          setLocationName(addr.name);
                          setPage(1);
                          setShowAddressSelector(false);
                          handleSearchSubmit("");
                        }}
                        className="w-full flex items-center gap-3 p-2.5 bg-theme-bg hover:bg-theme-border/45 border border-theme-border rounded-xl text-left transition-colors"
                      >
                        <div className="p-1.5 bg-theme-accent-soft rounded-lg text-theme-accent shrink-0">
                          <Building size={12} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold text-theme-text-primary uppercase leading-tight">{addr.name}</div>
                          <div className="text-[8px] text-theme-text-secondary truncate mt-0.5">{addr.address}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Recent Locations */}
                <div className="space-y-1.5">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-[#a1a1a6]">Recent Locations</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Koramangala', lat: 12.9352, lng: 77.6245 },
                      { name: 'Jayanagar', lat: 12.9308, lng: 77.5838 },
                      { name: 'Marathahalli', lat: 12.9562, lng: 77.6970 },
                      { name: 'HSR Layout', lat: 12.9141, lng: 77.6412 }
                    ].map(recent => (
                      <button
                        key={recent.name}
                        onClick={() => {
                          setLat(recent.lat);
                          setLng(recent.lng);
                          setLocationName(recent.name);
                          setPage(1);
                          setShowAddressSelector(false);
                          handleSearchSubmit(recent.name);
                        }}
                        className="p-1.5 text-center text-[9px] font-black uppercase tracking-wider bg-theme-bg hover:bg-theme-border hover:text-theme-accent border border-theme-border rounded-xl transition-all"
                      >
                        {recent.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Search Coverage Option */}
                <div className="space-y-2 pt-2 border-t border-theme-border/40">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-[#a1a1a6]">Search New Location</h4>
                  <div className="relative flex items-center bg-theme-bg border border-theme-border focus-within:border-theme-accent rounded-xl px-3 py-1.5 shadow-sm">
                    <Search className="text-theme-text-secondary w-3.5 h-3.5 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={addressSearchQuery}
                      placeholder="Enter neighborhood or city..."
                      onChange={(e) => {
                        setAddressSearchQuery(e.target.value);
                        setAddressRequestSubmitted(false);
                      }}
                      className="w-full bg-transparent border-none text-xs font-semibold text-theme-text-primary focus:outline-none focus:ring-0 py-0.5"
                    />
                    {addressSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setAddressSearchQuery('')}
                        className="text-[9px] font-extrabold uppercase text-[#a1a1a6] hover:text-theme-accent"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {addressSearchQuery.trim().length > 1 && (() => {
                    const q2 = addressSearchQuery.toLowerCase();
                    const isServed2 = SERVED_AREAS.some(area => area.area.toLowerCase().includes(q2)) || 
                                     CITIES.some(city => city.toLowerCase().includes(q2));

                    if (isServed2) {
                      const searchFiltered = SERVED_AREAS.filter(area => area.area.toLowerCase().includes(q2) || area.city.toLowerCase().includes(q2));
                      return (
                        <div className="space-y-1 max-h-32 overflow-y-auto pr-1 no-scrollbar animate-in fade-in">
                          <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Service Available
                          </span>
                          {searchFiltered.map((match, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setLat(match.lat);
                                setLng(match.lng);
                                setLocationName(`${match.area}, ${match.city}`);
                                setPage(1);
                                setShowAddressSelector(false);
                                handleSearchSubmit(match.area);
                              }}
                              className="w-full flex items-center justify-between p-2 bg-[#10b981]/5 hover:bg-[#10b981]/10 rounded-xl text-left border border-emerald-500/10 text-xs font-bold text-theme-text-primary transition-colors animate-in fade-in"
                            >
                              <span>{match.area}, {match.city}</span>
                              <span className="text-[7px] uppercase tracking-widest font-black text-[#10b981] bg-emerald-500/10 px-1 py-0.5 rounded">Serve</span>
                            </button>
                          ))}
                        </div>
                      );
                    } else {
                      return (
                        <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl flex flex-col items-center text-center gap-2 animate-in fade-in">
                          <span className="text-[9px] uppercase tracking-widest font-black text-red-500">
                            We are not available here yet.
                          </span>
                          {!addressRequestSubmitted ? (
                            <button
                              onClick={() => setAddressRequestSubmitted(true)}
                              className="w-full py-1.5 bg-theme-accent text-white rounded-lg text-[9px] font-black uppercase tracking-wider"
                            >
                              Request Homstay in this area
                            </button>
                          ) : (
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded-full">
                              ✓ Inquiry request submitted!
                            </span>
                          )}
                        </div>
                      );
                    }
                  })()}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
