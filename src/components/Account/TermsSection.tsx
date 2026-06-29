import React, { useState } from 'react';
import { Search } from 'lucide-react';

const TERMS_CONTENT = [
  { id: 't1', title: "1. Zero-Broker Matchmaking Protocol", text: "Homstay serves as a direct matching directory. We declare zero mediation brokerage commissions. Tenants and owners manage communications directly. Any external brokerages introduced outside Homstay violates our direct host charter and terminates service permissions." },
  { id: 't2', title: "2. Identity Credentials Mandates", text: "All active platform profiles must verify their active email coordinates, mobile telephone channels, and submit a clear scan of standard national identify documents (such as Aadhaar or Passport checks). Fraudulent document updates trigger prompt profile deactivations." },
  { id: 't3', title: "3. Direct Tenancy Booking Safeguards", text: "Upon finalizing rental conditions, tenants pay deposits into secure accounts. Leases undergo virtual law review. Moving arrangements are verified within 48 hours. Cancelations adhere strictly to Host policies detailed on the active card specifications." },
  { id: 't4', title: "4. Maintenance Allocation Ledger", text: "Utility allocations, electricity charges, and community maintenance charges are documented directly on the tenant dashboard billing ledger. Payments processed outside our system coordinates receive no mediation support from Homstay Help hotlines." }
];

export const TermsSection: React.FC = () => {
  const [termsSearch, setTermsSearch] = useState<string>('');

  const filteredTerms = TERMS_CONTENT.filter(item => 
    item.title.toLowerCase().includes(termsSearch.toLowerCase()) || 
    item.text.toLowerCase().includes(termsSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 text-sans leading-relaxed select-text font-sans">
      <div className="space-y-4 font-sans">
        <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">Terms & Conditions</h2>
        <p className="text-xs text-theme-text-secondary mt-1">
          Last updated: June 5, 2026. Review mutual host policies and digital tenancy requirements below.
        </p>
        
        {/* Search legal block */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-text-secondary" />
          <input 
            type="text" 
            placeholder="Query Terms text..."
            value={termsSearch}
            onChange={(e) => setTermsSearch(e.target.value)}
            className="w-full text-xs font-semibold p-3 pl-10 bg-theme-surface border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent"
          />
        </div>
      </div>

      {/* Natural page flow document */}
      <div className="space-y-5 pt-2 text-xs text-theme-text-primary">
        {filteredTerms.length === 0 ? (
          <p className="text-center font-bold text-theme-text-secondary py-12 uppercase font-sans">No search matches found</p>
        ) : (
          filteredTerms.map((item) => (
            <div id={item.id} key={item.id} className="space-y-2 pb-5 border-b border-theme-border/30 last:border-none last:pb-0">
              <h4 className="font-serif text-base font-bold text-theme-text-primary">{item.title}</h4>
              <p className="leading-relaxed font-sans font-medium text-theme-text-secondary text-sm">{item.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TermsSection;
