import React from 'react';
import { 
  ChevronLeft, 
  Share2, 
  Heart, 
  MapPin, 
  Star, 
  LayoutGrid, 
  Layers, 
  Columns, 
  Compass, 
  CheckCircle2, 
  Zap,
  Waves, 
  Dumbbell, 
  ShieldCheck, 
  Wifi, 
  Car, 
  Coffee, 
  Utensils, 
  Tv, 
  Wind,
  Phone,
  MessageCircle,
  Award,
  CalendarDays,
  Sparkles,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { Property, VisitRequest } from '../types';
import { LazyImage } from './LazyImage';

const AMENITY_ICONS: Record<string, any> = {
  Waves, Dumbbell, ShieldCheck, Zap, Wifi, Car, Coffee, Utensils, Tv, Wind
};

const getIcon = (iconName: any) => {
  if (typeof iconName === 'string') {
    return AMENITY_ICONS[iconName] || Zap;
  }
  return iconName || Zap;
};

interface PropertyDetailsPageProps {
  property: Property | null;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onShare: (p: Property) => void;
  onBookAttempt: (propertyId: string) => void;
  onChatOwner: (propertyId: string) => void;
  visitStatus?: 'pending' | 'approved' | 'completed' | 'rejected' | 'none';
  visitRequest?: VisitRequest;
}

export const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({
  property,
  onBack,
  isSaved,
  onToggleSave,
  onShare,
  onBookAttempt,
  onChatOwner,
  visitStatus = 'none',
  visitRequest
}) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  React.useEffect(() => {
    // Scroll to the top when navigating to a new property page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [property?.id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-theme-bg flex flex-col items-center justify-center p-8 text-center">
        <ShieldAlert size={48} className="text-theme-accent mb-4 animate-bounce" />
        <h2 className="font-serif text-2xl font-bold text-theme-text-primary">Property Not Found</h2>
        <p className="text-sm text-theme-text-secondary mt-2 max-w-md">The property you are looking for does not exist or may have been unlisted.</p>
        <button 
          onClick={onBack}
          className="mt-6 px-6 py-3 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-xl font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer"
        >
          Return to Explore
        </button>
      </div>
    );
  }

  // Guarantee we have at least 5 images for the desktop layout (repeat if necessary)
  const galleryImages = React.useMemo(() => {
    let list = [...(property.images || [])];
    if (list.length === 0) list = [property.image];
    while (list.length < 5) {
      list.push(...list);
    }
    return list.slice(0, 5);
  }, [property]);

  return (
    <div className="w-full min-h-screen bg-theme-bg select-text pb-16 transition-colors duration-300">
      
      {/* 1. TOP NAV WORKSPACE BAR */}
      <div className="border-b border-theme-border bg-theme-surface/75 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-2 bg-theme-bg/80 hover:bg-theme-border/60 transition-colors rounded-xl text-theme-text-primary font-bold text-[11px] uppercase tracking-wider cursor-pointer"
          >
            <ChevronLeft size={16} className="stroke-[3]" />
            <span>Back to Listings</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onShare(property)}
              className="p-2.5 bg-theme-bg/85 hover:bg-theme-border/80 border border-theme-border/50 rounded-xl text-theme-text-secondary transition-colors cursor-pointer"
              title="Share Page"
            >
              <Share2 size={16} className="stroke-[2.5]" />
            </button>
            <button 
              onClick={() => onToggleSave(property.id)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer active:scale-95 ${
                isSaved 
                  ? 'bg-red-500 border-red-500 text-white shadow-md shadow-red-500/20' 
                  : 'bg-theme-surface hover:bg-theme-bg border-theme-border text-theme-text-secondary'
              }`}
              title={isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
            >
              <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">

        {/* 2. AIRBNB BENTO GALLERY GRID WITHOUT MODAL CONTAINER SCROLLS */}
        
        {/* Mobile Gallery (Carousel) */}
        <div className="block md:hidden relative aspect-[4/3] rounded-2xl overflow-hidden bg-black select-none pointer-events-auto">
          <LazyImage 
            src={property.images?.[activeImageIndex] || property.image} 
            alt={property.title} 
            className="w-full h-full object-cover opacity-95 transition-all duration-350"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-transparent to-transparent h-1/3 pointer-events-none" />
          
          {/* Dot Controls */}
          {property.images && property.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
              {property.images.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${i === activeImageIndex ? 'w-5 bg-theme-accent' : 'w-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tablet & Desktop Layout Bento Grid */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 aspect-[21/9] bg-[#1c1c1e] rounded-3xl overflow-hidden relative group border border-theme-border/50 shadow-md">
          {/* Primary Main Image */}
          <div className="col-span-2 row-span-2 overflow-hidden relative cursor-pointer group/item">
            <LazyImage 
              src={galleryImages[0]} 
              alt={property.title} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Secondary Grid Blocks */}
          <div className="overflow-hidden relative cursor-pointer">
            <LazyImage 
              src={galleryImages[1]} 
              alt={property.title} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden relative cursor-pointer">
            <LazyImage 
              src={galleryImages[2]} 
              alt={property.title} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden relative cursor-pointer">
            <LazyImage 
              src={galleryImages[3]} 
              alt={property.title} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden relative cursor-pointer">
            <LazyImage 
              src={galleryImages[4]} 
              alt={property.title} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 3. CORE CONTENT GRID EXPANSION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-11 mt-8 relative items-start">
          
          {/* A. LEFT / CENTER COLUMN - Primary Details Page Content */}
          <div className="lg:col-span-2 space-y-7 min-w-0">
            
            {/* Tag Badges row */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-theme-accent bg-theme-accent-soft px-3 py-1 rounded-full">
                {property.category}
              </span>
              {property.tag && (
                <span className="text-[9px] font-black uppercase tracking-widest text-[#B85C38] bg-[#FAF3F0] dark:bg-amber-950/40 px-3 py-1 rounded-full">
                  {property.tag}
                </span>
              )}
              {property.badges?.map((badge, index) => (
                <span key={index} className="text-[9px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-200 bg-blue-100 dark:bg-blue-950/40 px-3 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>

            {/* STRENGTHENED HEADINGS: PROPERTY TITLE */}
            <div className="border-b border-theme-border pb-6">
              <h1 id="property-main-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-theme-text-primary leading-tight tracking-tight mb-3">
                {property.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-theme-text-secondary mt-1">
                <div className="flex items-center gap-1.5 focus-within:ring-1">
                  <MapPin size={15} className="text-theme-accent stroke-[2.5]" />
                  <span className="font-semibold text-theme-text-primary text-sm">{property.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={15} fill="currentColor" className="text-amber-500 stroke-[2.5]" />
                  <span className="font-bold text-theme-text-primary text-sm">{property.rating?.toFixed(1) || '4.0'}</span>
                  <span className="text-xs text-theme-text-secondary">({property.reviewCount || 48} verified reviews)</span>
                </div>
              </div>
            </div>

            {/* Quick specifications grid */}
            <div className="space-y-3 pb-3">
              <h3 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest">Configuration Specifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  { label: 'Bedrooms', value: property.configuration || `${property.bedrooms} BHK`, icon: LayoutGrid },
                  { label: 'Built Area', value: property.size, icon: Layers },
                  { label: 'Floor Level', value: property.floor || 'Ground Floor', icon: Columns },
                  { label: 'Unit Facing', value: property.facing || 'East', icon: Compass }
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 bg-theme-surface p-3.5 rounded-2xl border border-theme-border shadow-[0_4px_16px_rgba(0,0,0,0.01)] transition-colors duration-300">
                    <div className="p-2.5 bg-theme-accent-soft text-theme-accent rounded-xl shrink-0">
                      <spec.icon size={15} className="stroke-[2.5]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-black text-theme-text-secondary uppercase tracking-wider truncate">{spec.label}</p>
                      <p className="text-xs font-black text-theme-text-primary truncate mt-0.5">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STRENGTHENED HEADINGS: DESCRIPTION */}
            <div className="space-y-2 pt-2 border-t border-theme-border/60 pb-1">
              <h2 id="property-section-about" className="font-serif text-2xl sm:text-3xl font-medium text-theme-text-primary">
                About this boutique stay
              </h2>
              <p className="text-sm text-theme-text-secondary leading-relaxed font-sans font-medium whitespace-pre-line antialiased">
                {property.description}
              </p>
            </div>

            {/* STRENGTHENED HEADINGS & DENSITY IMPROVEMENT: AMENITIES */}
            <div className="space-y-4 pt-4 border-t border-theme-border/60">
              <div className="flex items-center justify-between">
                <h2 id="property-section-amenities" className="font-serif text-2xl sm:text-3xl font-medium text-theme-text-primary">
                  Amenities & Facilities
                </h2>
                <span className="text-[9px] font-black text-theme-accent uppercase tracking-wider bg-theme-accent-soft px-3 py-1 rounded-full shrink-0">
                  All Inclusive
                </span>
              </div>
              
              {/* Clean high-density representation instead of heavy card columns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 pt-2">
                {(property.amenities || []).map((amenity, i) => {
                  const Icon = getIcon(amenity.icon);
                  return (
                    <div key={i} className="flex items-center gap-3 py-1.5 border-b border-theme-border/40 hover:border-theme-accent/30 transition-colors">
                      <div className="text-theme-accent shrink-0">
                        <Icon size={16} className="stroke-[2.5]" />
                      </div>
                      <span className="text-xs font-bold text-theme-text-primary truncate">
                        {amenity.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STRENGTHENED HEADINGS: LOCATION MAP */}
            <div className="space-y-3 pt-4 border-t border-theme-border/60">
              <h2 id="property-section-location" className="font-serif text-2xl sm:text-3xl font-medium text-theme-text-primary">
                Explore the Location
              </h2>
              <p className="text-xs font-bold text-theme-text-secondary leading-relaxed flex items-center gap-1.5 animate-in fade-in">
                <MapPin size={14} className="text-theme-accent stroke-[2.5]" />
                {visitStatus === 'completed' ? property.location : `${property.location.split(',').slice(-2).join(', ').trim()} (Approximate Area)`}
              </p>
              
              <div className="relative rounded-3xl overflow-hidden aspect-video max-h-[300px] border border-theme-border">
                {visitStatus === 'completed' ? (
                  <>
                    <LazyImage 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                      alt="City Blueprint Map" 
                      className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-theme-accent/5 pointer-events-none">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-36 h-36 border border-theme-accent bg-theme-accent/15 rounded-full animate-ping duration-1000 opacity-25"></div>
                        <div className="absolute w-28 h-28 border border-theme-accent bg-theme-accent/5 rounded-full opacity-60"></div>
                        <div className="bg-theme-surface p-3.5 rounded-2xl shadow-xl text-theme-accent border border-theme-border flex items-center gap-2">
                          <MapPin size={20} fill="currentColor" className="stroke-[2.5]" />
                          <span className="text-[10px] font-black uppercase tracking-wider">~10 Min Walk Radius</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-theme-bg filter blur-[6px] opacity-75">
                      <LazyImage 
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                        alt="Blurred Map Preview" 
                        className="w-full h-full object-cover scale-110 pointer-events-none"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/45 dark:bg-black/75 flex flex-col items-center justify-center text-center p-6 space-y-3 z-10">
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/20">
                        <MapPin size={24} className="stroke-[2.5] text-amber-400" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-white text-xs font-black uppercase tracking-widest block">Exact Location Hidden</span>
                        <p className="text-white/70 text-[10px] max-w-[280px] font-semibold leading-normal">
                          Exact location details and interactive maps are unlocked after the owner accepts your visit request.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* STRENGTHENED HEADINGS & EXPANDED OWNER SECTION */}
            <div className="space-y-4 pt-5 border-t border-theme-border/60">
              <h2 id="property-section-owner" className="font-serif text-2xl sm:text-3xl font-medium text-theme-text-primary">
                Owner Information
              </h2>
              
              <div className="bg-theme-surface rounded-2xl border border-theme-border p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-colors duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 border-b border-theme-border/60">
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <LazyImage 
                        src={property.owner.image} 
                        alt={property.owner.name} 
                        className="w-16 h-16 rounded-2xl object-cover border border-theme-border shadow-inner" 
                        referrerPolicy="no-referrer"
                      />
                      {property.owner.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-theme-accent p-0.5 rounded-full border border-theme-surface text-white" title="Verified Landlord">
                          <CheckCircle2 size={13} fill="currentColor" className="text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-base font-black text-theme-text-primary">{property.owner.name}</h4>
                        {property.owner.verified && (
                          <span className="text-[8px] font-black uppercase tracking-widest text-[#B85C38] bg-[#FAF3F0] dark:bg-amber-950/40 px-2 py-0.5 rounded flex items-center gap-0.5 shrink-0 select-none">
                            <Award size={8} /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-theme-text-secondary mt-1 font-medium">Active Partner since {property.owner.activeSince || '2023'}</p>
                    </div>
                  </div>
                  
                  {/* Expanded Owner Verification / Response Rates */}
                  <div className="flex gap-4 sm:border-l sm:border-theme-border/60 sm:pl-6">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-theme-text-secondary uppercase tracking-widest">Response Rate</p>
                      <p className="text-sm font-black text-theme-accent">98% Response</p>
                    </div>
                    <div className="space-y-1 border-l border-theme-border/40 pl-4">
                      <p className="text-[8px] font-black text-theme-text-secondary uppercase tracking-widest">Response Time</p>
                      <p className="text-xs font-semibold text-theme-text-primary">Within 1 hour</p>
                    </div>
                  </div>
                </div>

                {/* Prompt: Add Call Owner, Chat With Owner to Owner Section */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {visitStatus === 'completed' ? (
                    <a 
                      href="tel:+919876543210"
                      className="flex-1 min-w-[140px] bg-theme-bg hover:bg-theme-border/50 border border-theme-border text-theme-text-primary hover:text-theme-text-primary active:scale-98 transition-all py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <Phone size={14} className="text-theme-accent stroke-[2.5]" />
                      <span>Call Owner</span>
                    </a>
                  ) : (
                    <button 
                      onClick={() => alert(`Contact information is private until the viewing is completed. Current status: ${visitStatus.toUpperCase()}`)}
                      className="flex-1 min-w-[140px] bg-theme-bg/40 border border-theme-border/40 text-theme-text-secondary/50 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed opacity-80"
                    >
                      <Phone size={14} className="opacity-30" />
                      <span>Call (Private)</span>
                    </button>
                  )}

                  <button 
                    onClick={() => {
                      if (visitStatus === 'completed') {
                        onChatOwner(property.id);
                      } else {
                        alert('Chat becomes available after the owner accepts your visit request.');
                      }
                    }}
                    className={`flex-1 min-w-[140px] active:scale-98 transition-all py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border shadow-sm ${
                      visitStatus === 'completed'
                        ? 'bg-theme-accent hover:bg-theme-accent-hover text-white border-transparent cursor-pointer'
                        : 'bg-theme-bg border-theme-border/60 text-theme-text-secondary/50 cursor-not-allowed opacity-80'
                    }`}
                  >
                    <MessageCircle size={14} />
                    <span>{visitStatus === 'completed' ? 'Chat With Owner' : 'Chat (Locked)'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* B. RIGHT STICKY ACTION CARD (1/3 Width On Large Screens) */}
          <div className="lg:col-span-1">
            <div className="bg-theme-surface rounded-3xl border border-theme-border p-6 shadow-xl sticky top-24 space-y-5 transition-colors duration-300">
              
              {/* Deal Header */}
              <div className="flex items-start justify-between gap-2 border-b border-theme-border pb-4">
                <div className="space-y-1">
                  <span className="text-[9px] text-theme-text-secondary font-extrabold uppercase tracking-widest block">MONTHLY RENT</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-serif font-black text-theme-text-primary">₹{property.price?.toLocaleString()}</span>
                    {property.originalPrice && (
                      <span className="text-sm text-theme-text-secondary/70 line-through">₹{property.originalPrice?.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                {property.discount && (
                  <span className="text-[8px] bg-theme-accent-soft text-theme-accent font-black px-2.5 py-1.5 rounded-lg uppercase tracking-wider shrink-0">
                    -{property.discount}
                  </span>
                )}
              </div>

              {/* Specs Breakdown inside checkin card */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-theme-text-secondary font-medium">Maintenance & Utility</span>
                  <span className="text-theme-text-primary font-bold uppercase tracking-wide text-[10px] bg-theme-bg px-2 py-0.5 rounded border border-theme-border/40">
                    {property.maintenanceInfo || 'Free / Included'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-theme-text-secondary font-medium">Brokerage Commission</span>
                  <span className="text-theme-accent font-black uppercase tracking-widest text-[9px] bg-theme-accent-soft px-2.5 py-1 rounded">
                    ₹0 (ZERO)
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-theme-border pb-4">
                  <span className="text-theme-text-secondary font-medium">Availability Schedule</span>
                  <span className="text-theme-accent font-black uppercase tracking-wider text-[9px] bg-theme-accent-soft px-2.5 py-1 rounded">
                    Immediate Move-In
                  </span>
                </div>
              </div>

              {/* CTAs: Stronger CTA hierarchy requested:
                  Primary: Book Visit
                  Secondary: Chat With Owner
              */}
              <div className="space-y-2.5 pt-2">
                {visitStatus === 'pending' && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-wide text-center">
                    ⏳ Visit Requested • Pending Approval
                  </div>
                )}
                {visitStatus === 'approved' && (
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-blue-600 dark:text-blue-400 text-[10px] font-extrabold uppercase tracking-wide text-center">
                    🗓 Visit Approved • Scheduled Tour
                  </div>
                )}
                {visitStatus === 'completed' && (
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-600 dark:text-green-400 text-[10px] font-extrabold uppercase tracking-wide text-center">
                    ✅ Visit Completed • Stay Coordinates Unlocked
                  </div>
                )}
                {visitStatus === 'rejected' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-600 dark:text-red-400 text-[10px] font-extrabold uppercase tracking-wide text-center">
                    ❌ Visit Rejected {visitRequest?.rejectionReason ? `(${visitRequest.rejectionReason})` : ''}
                  </div>
                )}

                {visitStatus === 'completed' ? (
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        alert('Instant booking initiated successfully!');
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white active:scale-95 transition-all py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Zap size={14} className="stroke-[2.5]" />
                      <span>Book Property</span>
                    </button>
                    <button 
                      onClick={() => {
                        alert('Shift Now request generated! The host is coordinating your logistics.');
                      }}
                      className="w-full bg-[#B85C38] hover:bg-[#A34E2C] text-white active:scale-95 transition-all py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Zap size={14} className="stroke-[2.5]" />
                      <span>Shift Now</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => onBookAttempt(property.id)}
                    disabled={visitStatus === 'pending' || visitStatus === 'approved'}
                    className={`w-full active:scale-95 transition-all py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                      visitStatus === 'approved'
                        ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-600 border border-blue-300/40 shadow-none cursor-not-allowed'
                        : visitStatus === 'pending'
                        ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 border border-amber-300/40 shadow-none cursor-not-allowed'
                        : 'bg-theme-accent hover:bg-theme-accent-hover text-white shadow-theme-accent/20'
                    }`}
                  >
                    <CalendarDays size={14} className="stroke-[2.5]" />
                    <span>
                      {visitStatus === 'approved'
                        ? 'Visit Scheduled'
                        : visitStatus === 'pending'
                        ? 'Awaiting Owner Approval'
                        : 'Request Visit'}
                    </span>
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    if (visitStatus === 'completed') {
                      onChatOwner(property.id);
                    } else {
                      alert('Chat becomes available after the landlord completes your physical viewing.');
                    }
                  }}
                  className={`w-full active:scale-95 transition-all py-3.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${
                    visitStatus === 'completed'
                      ? 'bg-transparent border border-theme-border hover:bg-theme-bg text-theme-text-primary cursor-pointer'
                      : 'bg-theme-bg border border-theme-border/60 text-theme-text-secondary/40 cursor-not-allowed opacity-75'
                  }`}
                >
                  <MessageCircle size={14} />
                  <span>{visitStatus === 'completed' ? 'Chat With Owner' : 'Chat (Locked)'}</span>
                </button>
              </div>

              <p className="text-[10px] text-theme-text-secondary text-center leading-relaxed font-sans font-medium px-4">
                No subscription charges. Direct landlord interactions guarantee safe transactions.
              </p>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
