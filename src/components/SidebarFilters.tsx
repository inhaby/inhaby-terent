import React from 'react';
import { SlidersHorizontal, ArrowUpDown, DollarSign, Bed, Sparkles, Check } from 'lucide-react';
import { FilterState } from '../types';

interface SidebarFiltersProps {
  filters: FilterState;
  onApply: (newFilters: FilterState) => void;
  resultCount: number;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  filters,
  onApply,
  resultCount
}) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onApply({
      ...filters,
      [key]: value
    });
  };

  const resetFilters = () => {
    onApply({
      minPrice: 0,
      maxPrice: 200000,
      bedrooms: null,
      furnished: null,
      category: 'all',
      sortBy: 'latest'
    });
  };

  return (
    <aside className="w-80 flex-shrink-0 bg-theme-surface rounded-3xl border border-theme-border p-6 shadow-sm sticky top-24 max-h-[85vh] overflow-y-auto no-scrollbar transition-all duration-300">
      
      {/* Title & Counter */}
      <div className="flex items-center justify-between border-b border-theme-border pb-5 mb-6">
        <div className="flex items-center gap-2 text-theme-text-primary">
          <SlidersHorizontal size={18} className="text-theme-accent stroke-[2.5]" />
          <h2 className="text-sm font-sans font-black uppercase tracking-wider">Filters</h2>
        </div>
        <div className="bg-theme-accent-soft text-theme-accent text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {resultCount} found
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Section: Sort By */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-theme-text-secondary uppercase tracking-wider">
            <ArrowUpDown size={14} />
            <span>Sort Listings By</span>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { id: 'latest', label: 'Latest Added' },
              { id: 'price-low', label: 'Price: Low to High' },
              { id: 'price-high', label: 'Price: High to Low' }
            ].map((option) => {
              const matches = filters.sortBy === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => updateFilter('sortBy', option.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold border transition-all text-left cursor-pointer ${
                    matches
                      ? 'bg-theme-accent border-theme-accent text-white shadow-md shadow-theme-accent/20'
                      : 'bg-theme-bg border-theme-border text-theme-text-secondary hover:border-theme-text-primary hover:bg-theme-bg/80'
                  }`}
                >
                  <span>{option.label}</span>
                  {matches && <Check size={14} className="stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Price Range */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-theme-text-secondary uppercase tracking-wider">
            <DollarSign size={14} />
            <span>Price Range (₹)</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[9px] text-theme-text-secondary mb-1.5 uppercase font-bold">Min Budget</p>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-text-secondary/60 font-bold text-xs">₹</span>
                <input 
                  type="number" 
                  value={filters.minPrice}
                  onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
                  className="w-full bg-theme-bg border border-theme-border rounded-2xl pl-8 pr-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-theme-accent/30 text-theme-text-primary transition-all font-sans"
                />
              </div>
            </div>
            <div>
              <p className="text-[9px] text-theme-text-secondary mb-1.5 uppercase font-bold">Max Budget</p>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-text-secondary/60 font-bold text-xs">₹</span>
                <input 
                  type="number" 
                  value={filters.maxPrice}
                  onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
                  className="w-full bg-theme-bg border border-theme-border rounded-2xl pl-8 pr-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-theme-accent/30 text-theme-text-primary transition-all font-sans"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Bedrooms Layout */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-theme-text-secondary uppercase tracking-wider">
            <Bed size={14} />
            <span>Bedroom Config</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Any BHK', value: null },
              { label: '1 BHK', value: 1 },
              { label: '2 BHK', value: 2 },
              { label: '3 BHK', value: 3 },
              { label: '4 BHK', value: 4 }
            ].map((opt) => {
              const matches = filters.bedrooms === opt.value;
              return (
                <button
                  key={opt.label || 'any'}
                  onClick={() => updateFilter('bedrooms', opt.value)}
                  className={`py-3 px-2.5 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer ${
                    matches
                      ? 'bg-theme-accent border-theme-accent text-white shadow-md shadow-theme-accent/20 col-span-2'
                      : 'bg-theme-bg border-theme-border text-theme-text-secondary hover:border-theme-text-primary'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Furnishing */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-theme-text-secondary uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Furnishing Status</span>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: 'All Living Types', value: null },
              { label: 'Fully/Semi Furnished', value: true },
              { label: 'Unfurnished Only', value: false }
            ].map((opt) => {
              const matches = filters.furnished === opt.value;
              return (
                <button
                  key={opt.label}
                  onClick={() => updateFilter('furnished', opt.value)}
                  className={`w-full py-3 px-4 rounded-2xl text-xs font-bold border transition-all text-left flex justify-between items-center cursor-pointer ${
                    matches
                      ? 'bg-theme-accent border-theme-accent text-white shadow-md shadow-theme-accent/20'
                      : 'bg-theme-bg border-theme-border text-theme-text-secondary hover:border-theme-text-primary'
                  }`}
                >
                  <span>{opt.label}</span>
                  {matches && <Check size={14} className="stroke-[3]" /> }
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Reset Panel */}
      <div className="border-t border-theme-border mt-6 pt-6 mb-2">
        <button
          onClick={resetFilters}
          className="w-full py-4 bg-theme-bg hover:bg-theme-border/40 text-theme-text-secondary hover:text-theme-text-primary rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
        >
          Reset Options
        </button>
      </div>

    </aside>
  );
};
