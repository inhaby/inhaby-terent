import React from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { Property } from '../../types';
import { CustomPropertyCard } from '../../components/CustomPropertyCard';
import { VirtualItem } from '../../components/VirtualItem';

interface WishlistPageProps {
  savedProperties: Property[];
  sortedSavedProperties: Property[];
  wishlistSort: string;
  setWishlistSort: (sort: 'price-low' | 'price-high' | 'rating' | 'name') => void;
  toggleSave: (id: string) => void;
  setSelectedPropertyId: (id: string | null) => void;
  triggerShare: (p: Property) => void;
  allProperties: Property[];
  setActiveTab: (tab: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  savedProperties,
  sortedSavedProperties,
  wishlistSort,
  setWishlistSort,
  toggleSave,
  setSelectedPropertyId,
  triggerShare,
  allProperties,
  setActiveTab
}) => {
  return (
    <div className="bg-theme-bg min-h-screen pb-24 text-left">
      <div className="bg-gradient-to-br from-theme-accent to-theme-accent-hover px-6 pt-12 pb-8 text-white shadow-sm flex justify-between items-start">
        <div 
          onClick={() => setActiveTab('HOME')}
          className="flex items-center gap-3 cursor-pointer group select-none"
          title="Back to Home"
        >
          <button 
            className="p-1.5 hover:bg-white/10 rounded-full text-white transition-all flex items-center justify-center shrink-0 border border-white/20 cursor-pointer"
          >
            <ChevronLeft size={20} className="stroke-[3]" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-black leading-none group-hover:text-white/80 transition-colors">← Your Wishlist</h1>
            <p className="text-[10px] font-sans font-bold text-white/70 uppercase tracking-widest mt-1.5 leading-none">Bookmarked stays</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4 max-w-lg mx-auto">
        {savedProperties.length > 0 && (
          <div className="bg-theme-surface p-3 rounded-2xl border border-theme-border flex flex-col gap-2 font-sans">
            <span className="text-[9px] font-black uppercase tracking-widest text-theme-text-secondary">Sort Bookmarks:</span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'price-low', label: 'Price Low' },
                { id: 'price-high', label: 'Price High' },
                { id: 'rating', label: 'Rating' },
                { id: 'name', label: 'A-Z Name' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setWishlistSort(opt.id as any)}
                  className={`py-2 px-1 rounded-xl text-[9px] font-bold uppercase tracking-wider border text-center transition-all cursor-pointer ${
                    wishlistSort === opt.id
                      ? 'bg-theme-accent border-theme-accent text-white shadow font-black'
                      : 'bg-theme-bg border-theme-border/50 text-theme-text-secondary hover:text-theme-text-primary'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {sortedSavedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedSavedProperties.map(prop => (
              <VirtualItem key={prop.id}>
                <CustomPropertyCard 
                  property={prop} 
                  isSaved={true}
                  onToggleSave={toggleSave}
                  onClick={setSelectedPropertyId}
                  onShare={triggerShare}
                />
              </VirtualItem>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-theme-surface border border-theme-border rounded-2xl p-5 text-center shadow-sm text-sans">
              <Heart size={24} className="text-theme-text-secondary/30 mx-auto mb-1" />
              <h3 className="font-serif text-sm font-black text-theme-text-primary uppercase leading-tight">Your Wishlist is Empty</h3>
              <p className="text-[11px] text-theme-text-secondary mt-1">Check verified properties available for immediate saving below:</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allProperties.slice(0, 8).map((prop) => (
                <VirtualItem key={prop.id}>
                  <CustomPropertyCard 
                    property={prop}
                    isSaved={false}
                    onToggleSave={toggleSave}
                    onClick={setSelectedPropertyId}
                    onShare={triggerShare}
                  />
                </VirtualItem>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
