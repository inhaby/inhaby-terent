import React from 'react';
import { Search, MapPin, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { Property } from '../../types';
import { ListCard } from '../../components/Cards';

interface SearchPageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProperties: Property[];
  onBack: () => void;
  onOpenFilters: () => void;
  savedIds: Set<string>;
  toggleSave: (id: string) => void;
  setSelectedPropertyId: (id: string | null) => void;
  triggerShare: (p: Property) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  searchQuery,
  setSearchQuery,
  filteredProperties,
  onBack,
  onOpenFilters,
  savedIds,
  toggleSave,
  setSelectedPropertyId,
  triggerShare
}) => {
  return (
    <div className="bg-theme-bg min-h-screen text-left">
      {/* Search Header */}
      <div className="bg-theme-surface border-b border-theme-border/60 px-4 py-3.5 sticky top-0 z-20 flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-1.5 hover:bg-theme-bg rounded-full text-theme-text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex-1 relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-theme-text-secondary/60" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search localities, metro stations, etc."
            className="w-full bg-theme-bg text-theme-text-primary text-xs font-bold pl-10 pr-4 py-3 rounded-xl border border-theme-border/40 focus:outline-none focus:border-theme-accent/50 placeholder:text-theme-text-secondary/40"
          />
        </div>

        <button 
          onClick={onOpenFilters}
          className="p-3 bg-theme-accent-soft text-theme-accent rounded-xl hover:bg-theme-accent/15 transition-colors cursor-pointer"
          title="Filters"
        >
          <SlidersHorizontal size={16} className="stroke-[2.5]" />
        </button>
      </div>

      {/* Results Count & Location indicator */}
      <div className="px-4 py-4 flex justify-between items-center bg-theme-surface/50 border-b border-theme-border/30">
        <div className="flex items-center gap-1.5 text-xs text-theme-text-secondary font-black tracking-wide uppercase">
          <MapPin size={14} className="text-theme-accent shrink-0" />
          <span>Search Results</span>
        </div>
        <span className="text-[10px] bg-theme-accent-soft text-theme-accent font-black px-2.5 py-1 rounded-full">{filteredProperties.length} Matches</span>
      </div>

      {/* Search Listings Feed */}
      <div className="p-4 space-y-4 pb-24 max-w-3xl mx-auto">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <ListCard 
              key={property.id}
              property={property}
              isSaved={savedIds.has(property.id)}
              onToggleSave={toggleSave}
              onClick={setSelectedPropertyId}
              onShare={triggerShare}
            />
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-theme-border/30 rounded-full flex items-center justify-center text-theme-text-secondary/60 mb-4">
              <Search size={32} />
            </div>
            <h4 className="font-serif text-lg font-black text-theme-text-primary">No results found</h4>
            <p className="text-xs text-theme-text-secondary/70 mt-1 max-w-[240px]">Try adjusting your search terms or filters to find more properties.</p>
          </div>
        )}
      </div>
    </div>
  );
};
