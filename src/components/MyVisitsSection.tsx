import React from 'react';
import { Footprints, CalendarDays, MessageCircle, Phone, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { VisitRequest, Property } from '../types';
import { VirtualItem } from './VirtualItem';
import { VisitNavigationDashboard } from './googleMaps/VisitNavigationDashboard';


interface MyVisitsSectionProps {
  visitRequests: VisitRequest[];
  setVisitRequests: React.Dispatch<React.SetStateAction<VisitRequest[]>>;
  propertiesList: Property[];
  onSelectPropertyId: (id: string) => void;
  onChatOwner: (id: string) => void;
  onSelectTab: (tab: string) => void;
  showToast: (msg: string) => void;
  onStartBrowsing: () => void;
  addNotification?: (type: any, title: string, description: string, actionId?: string, actionTab?: string) => void;
}

export const MyVisitsSection: React.FC<MyVisitsSectionProps> = ({
  visitRequests,
  propertiesList,
  onSelectPropertyId,
  onChatOwner,
  onSelectTab,
  onStartBrowsing,
  setVisitRequests
}) => {
  const [activeSubTab, setActiveSubTab] = React.useState<'pending' | 'approved' | 'rejected'>('pending');
  const [expandedVisitId, setExpandedVisitId] = React.useState<string | null>(null);

  // Filter requests
  const filteredRequests = visitRequests.filter(req => {
    if (activeSubTab === 'pending') return req.status === 'pending';
    if (activeSubTab === 'approved') return req.status === 'approved' || req.status === 'completed';
    return req.status === 'rejected';
  });

  // Helper to find associated property
  const getPropertyOfRequest = (propertyId: string): Property | undefined => {
    return propertiesList.find(p => p.id === propertyId);
  };

  // Counters for sub-tabs
  const counts = {
    pending: visitRequests.filter(r => r.status === 'pending').length,
    approved: visitRequests.filter(r => r.status === 'approved' || r.status === 'completed').length,
    rejected: visitRequests.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      
      {/* 2. TAB CONTROLS (approved, pending, rejected) */}
      <div className="flex border-b border-theme-border/60 gap-1.5 overflow-x-auto no-scrollbar py-1">
        {(['pending', 'approved', 'rejected'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-5 py-3 rounded-t-2xl font-black text-[10px] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 outline-none border-b-2 whitespace-nowrap ${
              activeSubTab === tab
                ? 'border-theme-accent text-theme-accent bg-theme-accent-soft/30'
                : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-border/20'
            }`}
          >
            <span>
              {tab === 'pending' 
                ? '⏳ Pending Approval' 
                : tab === 'approved' 
                ? '✅ Scheduled Visits' 
                : '❌ Portfolio Rejected'}
            </span>
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-black ${
              activeSubTab === tab 
                ? 'bg-theme-accent text-white' 
                : 'bg-theme-bg text-theme-text-secondary border border-theme-border/40'
            }`}>
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* 3. LISTINGS OF FILTERED VISITS */}
      {filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {filteredRequests.map(req => {
            const prop = getPropertyOfRequest(req.propertyId);
            if (!prop) return null;

            return (
              <VirtualItem key={req.id}>
                <div 
                  className="bg-theme-surface rounded-3xl border border-theme-border/60 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300 relative group"
                >
                {/* Image aspect overlay */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-theme-bg shrink-0">
                  <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  <span className="absolute bottom-3 left-4 text-[9px] bg-black/40 backdrop-blur-md text-white border border-white/10 font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {prop.category}
                  </span>

                  {/* Date details badge floating */}
                  <div className="absolute top-3 right-4 bg-theme-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-sm border border-theme-border/40 text-right">
                    <span className="text-[10px] font-black text-theme-accent block uppercase leading-tight">{req.time}</span>
                    <span className="text-[8px] font-semibold text-theme-text-secondary block leading-none">{req.date}</span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div className="space-y-1.5">
                    
                    {/* Title */}
                    <h4 
                      onClick={() => onSelectPropertyId(prop.id)}
                      className="font-serif text-base font-bold text-theme-text-primary line-clamp-2 hover:text-theme-accent cursor-pointer transition-colors"
                    >
                      {prop.title}
                    </h4>

                    {/* Rent Detail */}
                    <div className="flex items-center justify-between text-xs py-1 border-b border-theme-border/40">
                      <span className="text-theme-text-secondary font-medium">Monthly Rent</span>
                      <span className="font-serif font-black text-theme-text-primary">
                        ₹{prop.price?.toLocaleString()}
                      </span>
                    </div>

                    {/* Details Box */}
                    <div className="bg-theme-bg/65 rounded-2xl p-3 border border-theme-border/40 mt-2 space-y-1.5 text-[11px] leading-relaxed">
                      
                      {activeSubTab === 'approved' && (
                        <div className="text-green-600 dark:text-green-400 font-extrabold flex items-center gap-1.5 uppercase text-[9px] tracking-wider leading-none">
                          <CheckCircle2 size={12} className="stroke-[2.5]" />
                          <span>Visit {req.status === 'completed' ? 'Completed ✓' : 'Approved (Scheduled)'}</span>
                        </div>
                      )}
                      {activeSubTab === 'pending' && (
                        <div className="text-amber-500 font-extrabold flex items-center gap-1.5 uppercase text-[9px] tracking-wider leading-none">
                          <AlertCircle size={12} className="stroke-[2.5]" />
                          <span>Awaiting Landlord Review...</span>
                        </div>
                      )}
                      {activeSubTab === 'rejected' && (
                        <div className="text-red-500 font-extrabold flex items-center gap-1.5 uppercase text-[9px] tracking-wider leading-none">
                          <XCircle size={12} className="stroke-[2.5]" />
                          <span>Requested Slot Refused</span>
                        </div>
                      )}

                      <span className="text-theme-text-secondary block">
                        <span className="font-bold text-theme-text-primary">Host:</span> {prop.owner?.name || 'Authorized Homstay Landlord'} • Verified Owner
                      </span>

                      {req.message && (
                        <div className="text-theme-text-secondary italic pt-1 border-t border-theme-border/40 truncate">
                          "{req.message}"
                        </div>
                      )}

                      {req.rejectionReason && (
                        <div className="text-red-500/90 font-medium bg-red-500/5 p-2 rounded-xl border border-red-500/10 mt-1">
                          <span className="font-black uppercase text-[8px] tracking-widest block text-red-600">REJECTION REASON:</span>
                          "{req.rejectionReason}"
                        </div>
                      )}
                    </div>

                    {activeSubTab === 'approved' && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => setExpandedVisitId(expandedVisitId === req.id ? null : req.id)}
                          className="w-full bg-theme-accent-soft text-theme-accent hover:bg-theme-accent-soft/80 py-2 rounded-xl font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          {expandedVisitId === req.id ? 'Close Navigation Console ▲' : 'Open Navigation Console ▼'}
                        </button>
                        
                        {expandedVisitId === req.id && (
                          <div className="mt-2 border-t border-theme-border/40 pt-2 text-left">
                            <VisitNavigationDashboard
                              visit={{
                                ...req,
                                status: req.status as any,
                                entryInstructions: (req as any).entryInstructions || {
                                  buildingName: prop.title,
                                  gateNumber: 'Gate 2',
                                  floor: '3rd Floor',
                                  doorNumber: 'Flat 304',
                                  entryInstructions: 'Show visitor gate pass at security guard post.'
                                }
                              } as any}
                              propertyCoords={{ lat: prop.latitude || 12.9716, lng: prop.longitude || 77.5946 }}
                              exactAddress={prop.location || 'Address'}
                              isDark={false}
                              onStatusChange={(newStatus) => {
                                setVisitRequests(prev => prev.map(v => v.id === req.id ? { ...v, status: newStatus as any } : v));
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                  {/* Actions Block */}
                  <div className="border-t border-theme-border/60 pt-3.5 mt-auto">
                    {req.status === 'completed' ? (
                      <div className="flex gap-2">
                        <a 
                          href="tel:+919876543210"
                          className="flex-1 bg-theme-bg hover:bg-theme-border/50 border border-theme-border text-theme-text-primary active:scale-95 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer"
                        >
                          <Phone size={12} className="text-theme-accent stroke-[2.5]" />
                          <span>Call Host</span>
                        </a>
                        <button 
                          onClick={() => onChatOwner(prop.id)}
                          className="flex-1 bg-theme-accent hover:bg-theme-accent-hover text-white active:scale-95 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md shadow-theme-accent/15 cursor-pointer outline-none"
                        >
                          <MessageCircle size={12} />
                          <span>MESSAGES</span>
                        </button>
                      </div>
                    ) : req.status === 'approved' ? (
                      <div className="text-center py-2 bg-theme-bg rounded-xl text-[10px] text-theme-text-secondary/80 font-bold border border-theme-border/30">
                        Chat & Call Unlocks After Visit is Completed
                      </div>
                    ) : activeSubTab === 'pending' ? (
                      <div className="text-center py-2 bg-theme-bg rounded-xl text-[10px] text-theme-text-secondary/80 font-bold border border-theme-border/30">
                        Chat Unlocks After Visit is Completed
                      </div>
                    ) : (
                      <button 
                        onClick={() => onSelectPropertyId(prop.id)}
                        className="w-full bg-theme-accent hover:bg-theme-accent-hover text-white active:scale-95 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer outline-none"
                      >
                        <CalendarDays size={12} />
                        <span>Reschedule / View Stay</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </VirtualItem>
            );
          })}
        </div>
      ) : (
        <div className="bg-theme-surface border border-theme-border rounded-3xl p-16 text-center max-w-lg mx-auto shadow-sm text-sans">
          <Footprints size={48} className="text-theme-text-secondary/30 mx-auto mb-4" />
          <h3 className="font-serif text-base font-black text-theme-text-primary uppercase">No {activeSubTab.toLowerCase()} requests</h3>
          <p className="text-xs text-theme-text-secondary mt-2 border-none">
            {activeSubTab === 'pending' 
              ? 'You have no current active visit requests waiting for approval.' 
              : activeSubTab === 'approved' 
              ? 'No scheduled visits. Submit viewing requests to secure direct flat coordinates.' 
              : 'You have no rejected requests. Let us schedule our viewing and tour verified stays.'}
          </p>
          <button 
            onClick={onStartBrowsing}
            className="mt-6 bg-theme-accent hover:bg-theme-accent-hover text-white font-black px-6 py-3.5 rounded-xl text-[10px] uppercase tracking-wider cursor-pointer active:scale-95 transition-transform"
          >
            Start Browsing
          </button>
        </div>
      )}

    </div>
  );
};
