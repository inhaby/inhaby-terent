import React, { useState } from 'react';
import { LazyImage } from '../LazyImage';
import { Phone, Mail } from 'lucide-react';

interface YourBookingsDashboardProps {
  onSelectedPropertyIdChange: (id: string | null) => void;
  activeTenancy: any;
  pendingBookings: any[];
  pastBookings: any[];
}

export const YourBookingsDashboard: React.FC<YourBookingsDashboardProps> = ({
  onSelectedPropertyIdChange,
  activeTenancy,
  pendingBookings,
  pastBookings
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ACTIVE' | 'PENDING' | 'PAST'>('ACTIVE');

  return (
    <div className="space-y-6 text-sans h-full flex flex-col justify-between">
      <div className="space-y-5">
        {/* Title */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">Your Tenancy Bookings</h2>
          <p className="text-xs text-theme-text-secondary mt-1">
            Overview of your active leasing records, billing ledgers, pending applications, and tenancy histories.
          </p>
        </div>

        {/* Dynamic sub tab rows */}
        <div className="flex bg-[#f5f2ed] dark:bg-theme-border/30 p-1 rounded-2xl gap-1 border border-theme-border">
          {[
            { id: 'ACTIVE', label: 'Active Tenancy' },
            { id: 'PENDING', label: 'Pending Bookings' },
            { id: 'PAST', label: 'Past Bookings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex-1 py-2 px-1 text-[10px] text-center font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeSubTab === tab.id 
                  ? 'bg-theme-surface text-theme-accent shadow-sm border border-theme-border' 
                  : 'text-theme-text-secondary hover:text-theme-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab contents panel wrapper */}
        <div className="space-y-4">
          {/* 1. ACTIVE TENANCY */}
          {activeSubTab === 'ACTIVE' && (
            <div className="space-y-6">
              {/* Property outline */}
              <div 
                onClick={() => onSelectedPropertyIdChange('1')}
                className="bg-theme-bg border border-theme-border p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center cursor-pointer hover:shadow-md transition-shadow relative"
              >
                <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden shrink-0">
                  <LazyImage src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600" alt={activeTenancy.propertyTitle} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[8px] font-black bg-theme-accent text-white px-2.5 py-0.5 rounded-lg uppercase tracking-wider">Active Lease</span>
                  <h4 className="text-sm font-bold text-theme-text-primary mt-1 select-all truncate">{activeTenancy.propertyTitle}</h4>
                  <p className="text-[10px] font-medium text-theme-text-secondary select-all mt-0.5 truncate">{activeTenancy.location}</p>
                  <p className="text-xs text-theme-accent font-extrabold mt-1">₹{activeTenancy.price.toLocaleString()} / Month</p>
                </div>
                <div className="absolute top-4 right-4 text-[9px] font-extrabold text-[#748c77] uppercase bg-green-500/10 px-2 py-0.5 rounded border border-green-500/15">In Progress</div>
              </div>

              {/* Grid 2-cols: Lease Information and Owner Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Lease parameters card */}
                <div className="p-4 bg-theme-bg border border-theme-border rounded-xl space-y-2.5 text-xs font-semibold text-theme-text-primary">
                  <h3 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest pb-1.5 border-b border-theme-border">Lease Logistics</h3>
                  <div className="flex justify-between">
                    <span className="text-theme-text-secondary">Lease Start Date</span>
                    <span className="font-bold select-all">{activeTenancy.leaseStart}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-text-secondary">Duration Schedule</span>
                    <span>{activeTenancy.leaseDuration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-text-secondary">Next Rent Day</span>
                    <span className="font-bold text-[#b4482c] select-all">{activeTenancy.nextDue}</span>
                  </div>
                  <div className="flex justify-between border-t border-theme-border/40 pt-2 text-[#4c5c4e]">
                    <span className="font-medium text-theme-text-secondary">Security deposit</span>
                    <span className="font-black select-all">₹{activeTenancy.deposit.toLocaleString()}</span>
                  </div>
                </div>

                {/* Owner specs block */}
                <div className="p-4 bg-theme-bg border border-theme-border rounded-xl space-y-3.5">
                  <h3 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest pb-1.5 border-b border-theme-border">Leasing Landlord</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                      <LazyImage src={activeTenancy.owner.image} alt={activeTenancy.owner.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-theme-text-primary leading-none select-all">{activeTenancy.owner.name}</h4>
                      <p className="text-[9px] text-[#2ebdcd] font-semibold tracking-wider uppercase mt-1 leading-none">✓ Vetted Homstay Owner</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-theme-text-secondary pt-1 border-t border-theme-border/30">
                    <a href={`tel:${activeTenancy.owner.phone}`} className="flex items-center gap-1.5 hover:text-theme-accent truncate select-all">
                      <Phone size={10} />
                      <span>{activeTenancy.owner.phone}</span>
                    </a>
                    <a href={`mailto:${activeTenancy.owner.email}`} className="flex items-center gap-1.5 hover:text-theme-accent truncate select-all">
                      <Mail size={10} />
                      <span>{activeTenancy.owner.email}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bills Section */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-[0.25em]">Financial Bills Ledger</h3>
                <div className="divide-y divide-theme-border/30 border border-theme-border rounded-2xl bg-theme-bg overflow-hidden text-xs">
                  {activeTenancy.bills.map((bill: any) => (
                    <div key={bill.id} className="p-3.5 flex items-center justify-between hover:bg-theme-border/10 transition-colors">
                      <div>
                        <p className="font-bold text-theme-text-primary">{bill.name}</p>
                        <p className="text-[10px] text-[#919191] font-bold uppercase mt-0.5">Due Date: <span className="text-theme-text-secondary lowercase font-medium select-all">{bill.dueDate}</span></p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-black text-theme-text-primary text-xs select-all">₹{bill.amount.toLocaleString()}</span>
                        <button 
                          onClick={() => {
                            if (bill.status === 'Overdue' || bill.status === 'Pending') {
                              alert(`Payment simulation initiated for ${bill.name} (Amount: ₹${bill.amount}). In reality, this opens safe banking gateway.`);
                            }
                          }}
                          className={`px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg border cursor-pointer ${
                            bill.status === 'Paid'
                              ? 'bg-green-500/10 border-green-500/25 text-green-600 cursor-default'
                              : bill.status === 'Overdue'
                                ? 'bg-red-500/10 border-red-500/25 text-red-500 animate-pulse'
                                : 'bg-amber-500/10 border-amber-500/25 text-amber-600'
                          }`}
                        >
                          {bill.status === 'Paid' ? 'Paid Rec' : 'Pay Now'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. PENDING BOOKINGS */}
          {activeSubTab === 'PENDING' && (
            <div className="space-y-4">
              {pendingBookings.map((prop) => (
                <div key={prop.id} className="p-4 bg-theme-bg border border-theme-border rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden shrink-0">
                    <LazyImage src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] font-black bg-amber-500 text-white px-2.5 py-0.5 rounded-lg uppercase tracking-wider">{prop.status}</span>
                    <h4 className="text-xs font-bold text-theme-text-primary mt-1 select-all truncate">{prop.title}</h4>
                    <p className="text-[10px] font-medium text-theme-text-secondary select-all truncate">{prop.location}</p>
                    <p className="text-[11px] text-theme-accent font-bold mt-1">Applied on {prop.appliedOn}</p>
                  </div>
                  <div className="text-right text-xs font-black text-theme-text-primary">
                    ₹{prop.price.toLocaleString()} / mo
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. PAST BOOKINGS */}
          {activeSubTab === 'PAST' && (
            <div className="space-y-4">
              {pastBookings.map((prop) => (
                <div key={prop.id} className="p-4 bg-theme-bg border border-theme-border rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center opacity-80 hover:opacity-100 transition-all">
                  <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden shrink-0 grayscale">
                    <LazyImage src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] font-black bg-[#6e6e6e] text-white px-2.5 py-0.5 rounded-lg uppercase tracking-wider">{prop.status}</span>
                    <h4 className="text-xs font-bold text-theme-text-primary mt-1 select-all truncate">{prop.title}</h4>
                    <p className="text-[10px] font-medium text-theme-text-secondary select-all truncate">{prop.location}</p>
                    <p className="text-[10px] text-theme-text-secondary/70 mt-1 leading-none">{prop.duration}</p>
                  </div>
                  <div className="text-right text-xs font-bold text-theme-text-secondary">
                    ₹{prop.price.toLocaleString()} / mo
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
