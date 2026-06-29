import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { MyVisitsSection } from '../../components/MyVisitsSection';
import { Property, VisitRequest } from '../../types';

interface VisitsPageProps {
  visitRequests: VisitRequest[];
  setVisitRequests: React.Dispatch<React.SetStateAction<VisitRequest[]>>;
  allProperties: Property[];
  setSelectedPropertyId: (id: string | null) => void;
  setOpenMsgPropertyId: (id: string | null) => void;
  setActiveTab: (tab: string) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  addNotification: (title: string, desc: string, type: any) => void;
}

export const VisitsPage: React.FC<VisitsPageProps> = ({
  visitRequests,
  setVisitRequests,
  allProperties,
  setSelectedPropertyId,
  setOpenMsgPropertyId,
  setActiveTab,
  showToast,
  addNotification
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
            <h1 className="font-serif text-2xl font-black leading-none group-hover:text-white/80 transition-colors">← Your Visits</h1>
            <p className="text-[10px] font-sans font-bold text-white/70 uppercase tracking-widest mt-1.5 leading-none">Scheduled stay tours</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-6 max-w-lg mx-auto">
        <MyVisitsSection 
          visitRequests={visitRequests}
          setVisitRequests={setVisitRequests}
          propertiesList={allProperties}
          onSelectPropertyId={setSelectedPropertyId}
          onChatOwner={(propId) => {
            setOpenMsgPropertyId(propId);
            setActiveTab('MESSAGES');
          }}
          onSelectTab={setActiveTab}
          showToast={showToast}
          onStartBrowsing={() => setActiveTab('HOME')}
          addNotification={addNotification}
        />
      </div>
    </div>
  );
};
