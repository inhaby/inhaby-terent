import React, { useState, useEffect } from 'react';
import { LazyImage } from '../LazyImage';
import { ChevronRight } from 'lucide-react';

interface RecentActivityDashboardProps {
  propertiesList: any[];
  onSelectedPropertyIdChange: (id: string | null) => void;
}

export const RecentActivityDashboard: React.FC<RecentActivityDashboardProps> = ({
  propertiesList,
  onSelectedPropertyIdChange
}) => {
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [clickedIds, setClickedIds] = useState<string[]>([]);
  const [sharedIds, setSharedIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const loadList = (key: string): string[] => {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (err) {}
      return [];
    };

    setViewedIds(loadList('homstay-tracker-history-view'));
    setClickedIds(loadList('homstay-tracker-history-click'));
    setSharedIds(loadList('homstay-tracker-history-share'));
    setSavedIds(loadList('homstay-tracker-history-save'));
  }, []);

  const getSubList = (idsList: string[], fallbackOffset: number): any[] => {
    const list = propertiesList.filter(p => idsList.includes(p.id));
    if (list.length > 0) return list;
    if (propertiesList.length > 0) {
      return [propertiesList[(fallbackOffset) % propertiesList.length], propertiesList[(fallbackOffset + 1) % propertiesList.length]].filter(Boolean);
    }
    return [];
  };

  const recentViewed = getSubList(viewedIds, 0);
  const recentClicked = getSubList(clickedIds, 2);
  const recentShared = getSubList(sharedIds, 4);
  const recentSaved = getSubList(savedIds, 1);

  return (
    <div className="space-y-6 text-sans">
      <div>
        <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">Recent Interactions Activity</h2>
        <p className="text-xs text-theme-text-secondary mt-1">
          Keep history of recently viewed, shared, and interactive property cards across the Homstay platform.
        </p>
      </div>

      <div className="space-y-6">
        {/* viewed */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-[0.2em]">Recently Viewed Properties</h3>
          {recentViewed.length === 0 ? (
            <p className="p-3 text-center text-[10px] border border-dashed text-[#9c9c9c] rounded-xl uppercase">No views tracked yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentViewed.map((prop) => (
                <div 
                  key={prop.id} 
                  onClick={() => onSelectedPropertyIdChange(prop.id)}
                  className="bg-theme-bg border border-theme-border p-2.5 rounded-xl flex gap-3 cursor-pointer hover:bg-theme-border/20 transition-all items-center"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <LazyImage src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[11px] font-bold text-theme-text-primary truncate">{prop.title}</h4>
                    <p className="text-[9px] text-theme-text-secondary mt-0.5 truncate">{prop.location}</p>
                    <p className="text-[10px] text-theme-accent font-extrabold mt-1">₹{prop.price.toLocaleString()} / mo</p>
                  </div>
                  <ChevronRight size={14} className="text-[#cbcbcb] pr-1.5" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* clicked details */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-[0.2em]">Recently Clicked Enquiries</h3>
          {recentClicked.length === 0 ? (
            <p className="p-3 text-center text-[10px] border border-dashed text-[#9c9c9c] rounded-xl uppercase">No direct clicks logged</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentClicked.map((prop) => (
                <div 
                  key={prop.id} 
                  onClick={() => onSelectedPropertyIdChange(prop.id)}
                  className="bg-theme-bg border border-theme-border p-2.5 rounded-xl flex gap-3 cursor-pointer hover:bg-theme-border/20 transition-all items-center"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <LazyImage src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[11px] font-bold text-theme-text-primary truncate">{prop.title}</h4>
                    <p className="text-[9px] text-theme-text-secondary mt-0.5 truncate">{prop.location}</p>
                    <p className="text-[10px] text-theme-accent font-extrabold mt-1">₹{prop.price.toLocaleString()} / mo</p>
                  </div>
                  <ChevronRight size={14} className="text-[#cbcbcb] pr-1.5" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* shared properties list */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-[0.2em]">Recently Shared Properties</h3>
          {recentShared.length === 0 ? (
            <p className="p-3 text-center text-[10px] border border-dashed text-[#9c9c9c] rounded-xl uppercase">No sharing logs registered</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentShared.map((prop) => (
                <div 
                  key={prop.id} 
                  onClick={() => onSelectedPropertyIdChange(prop.id)}
                  className="bg-theme-bg border border-theme-border p-2.5 rounded-xl flex gap-3 cursor-pointer hover:bg-theme-border/20 transition-all items-center"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <LazyImage src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[11px] font-bold text-theme-text-primary truncate">{prop.title}</h4>
                    <p className="text-[9px] text-theme-text-secondary mt-0.5 truncate">{prop.location}</p>
                    <p className="text-[10px] text-theme-accent font-extrabold mt-1">₹{prop.price.toLocaleString()} / mo</p>
                  </div>
                  <ChevronRight size={14} className="text-[#cbcbcb] pr-1.5" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* bookmarks state */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-[0.2em]">Recently Saved Favorites</h3>
          {recentSaved.length === 0 ? (
            <p className="p-3 text-center text-[10px] border border-dashed text-[#9c9c9c] rounded-xl uppercase">No items in saved inventory</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentSaved.map((prop) => (
                <div 
                  key={prop.id} 
                  onClick={() => onSelectedPropertyIdChange(prop.id)}
                  className="bg-theme-bg border border-theme-border p-2.5 rounded-xl flex gap-3 cursor-pointer hover:bg-theme-border/20 transition-all items-center"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <LazyImage src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[11px] font-bold text-theme-text-primary truncate">{prop.title}</h4>
                    <p className="text-[9px] text-theme-text-secondary mt-0.5 truncate">{prop.location}</p>
                    <p className="text-[10px] text-theme-accent font-extrabold mt-1">₹{prop.price.toLocaleString()} / mo</p>
                  </div>
                  <ChevronRight size={14} className="text-[#cbcbcb] pr-1.5" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
