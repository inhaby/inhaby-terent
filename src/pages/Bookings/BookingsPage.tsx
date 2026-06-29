import React from 'react';
import { ChevronLeft, Calendar } from 'lucide-react';
import { Property } from '../../types';
import { CustomPropertyCard } from '../../components/CustomPropertyCard';
import { VirtualItem } from '../../components/VirtualItem';
import { useBookings } from '../../hooks/useBookings';

interface BookingsPageProps {
  savedIds: Set<string>;
  toggleSave: (id: string) => void;
  setSelectedPropertyId: (id: string | null) => void;
  triggerShare: (p: Property) => void;
  allProperties: Property[];
  setActiveTab: (tab: string) => void;
}

export const BookingsPage: React.FC<BookingsPageProps> = ({
  savedIds,
  toggleSave,
  setSelectedPropertyId,
  triggerShare,
  allProperties,
  setActiveTab
}) => {
  const { activeTenancy, pendingBookings, pastBookings, payBill } = useBookings();
  
  // Try to see if there is any active lease or tenancy.
  // In the current base design, the desktop and mobile screen displays:
  // "No Active Bookings" and lists recommended properties. 
  // Let's implement this elegant standard mockup layout perfectly.

  return (
    <div className="bg-theme-bg min-h-screen text-left">
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
            <h1 className="font-serif text-2xl font-black leading-none group-hover:text-white/80 transition-colors">← Your Bookings</h1>
            <p className="text-[10px] font-sans font-bold text-white/70 uppercase tracking-widest mt-1.5 leading-none">Zero brokerage platform checks</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        <div className="bg-theme-surface border border-theme-border rounded-3xl p-5 text-center shadow-sm text-sans">
          <Calendar size={24} className="text-theme-text-secondary/30 mx-auto mb-2 animate-bounce" />
          <h3 className="font-serif text-sm font-black text-theme-text-primary uppercase leading-none">No Active Bookings</h3>
          <p className="text-[11px] text-theme-text-secondary mt-1 max-w-sm mx-auto">Explore verified properties available for immediate booking:</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allProperties.slice(0, 8).map((prop) => (
            <VirtualItem key={prop.id}>
              <CustomPropertyCard 
                property={prop}
                isSaved={savedIds.has(prop.id)}
                onToggleSave={toggleSave}
                onClick={setSelectedPropertyId}
                onShare={triggerShare}
              />
            </VirtualItem>
          ))}
        </div>
      </div>
    </div>
  );
};
