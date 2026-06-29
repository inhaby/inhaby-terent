import React, { useState } from 'react';
import { Search } from 'lucide-react';

const PRIVACY_CONTENT = [
  { id: 'p1', title: "1. Credentials Encryption Keys", text: "Identity verification scans, mobile OTP numbers, and lease agreements are stored with AES-256 state level security standards. Credit cards receipt and verification images are immediately masked." },
  { id: 'p2', title: "2. Geolocation Map Privacy", text: "While map coordinates facilitate accurate listings matches, precise coordinates are masked until a tenant registers a direct booking check. Homstay does not sell geolocation track history logs." },
  { id: 'p3', title: "3. Direct-Owner Communication Records", text: "Direct messaging chains and attachment uploads exist on the database. We index content keywords matching terms violations (e.g. offline commission agreements), keeping message contents private." },
  { id: 'p4', title: "4. Third-Party Analytics Shields", text: "We do not integrate marketing tracker libraries across the application. Profile details, tickets, and bookings data are protected under India information privacy rules." },
  { id: 'p5', title: "5. User Control & Deletion Rights", text: "Under data privacy acts, tenants maintain full control to update address records, raise technical support tickets, and request comprehensive profiles deletions subject to concluding existing active leases." }
];

export const PrivacySection: React.FC = () => {
  const [privacySearch, setPrivacySearch] = useState<string>('');

  const filteredPrivacy = PRIVACY_CONTENT.filter(item => 
    item.title.toLowerCase().includes(privacySearch.toLowerCase()) || 
    item.text.toLowerCase().includes(privacySearch.toLowerCase())
  );

  return (
    <div className="space-y-6 text-sans leading-relaxed select-text font-sans">
      <div className="space-y-4">
        <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">Privacy Policy</h2>
        <p className="text-xs text-theme-text-secondary mt-1">
          Our strict encryption directives ensure maximum safety for government credentials and communications.
        </p>
        
        {/* Search privacy doc selection */}
        <div className="relative font-sans">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-text-secondary" />
          <input 
            type="text" 
            placeholder="Filter Privacy parameters..."
            value={privacySearch}
            onChange={(e) => setPrivacySearch(e.target.value)}
            className="w-full text-xs font-semibold p-3 pl-10 bg-theme-surface border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent"
          />
        </div>
      </div>

      {/* Natural page flow document */}
      <div className="space-y-5 pt-2 text-xs text-theme-text-primary">
        {filteredPrivacy.length === 0 ? (
          <p className="text-center font-bold text-theme-text-secondary py-12 uppercase font-sans">No search matches found</p>
        ) : (
          filteredPrivacy.map((item) => (
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

export default PrivacySection;
