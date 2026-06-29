import React from 'react';
import { Tag, Copy, Check } from 'lucide-react';

interface ReferralsViewProps {
  handleCopyReferral: () => void;
  referralCopied: boolean;
}

export const ReferralsView: React.FC<ReferralsViewProps> = ({
  handleCopyReferral,
  referralCopied
}) => {
  return (
    <div className="space-y-6 text-sans">
      <div>
        <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">Refer & Earn Program</h2>
        <p className="text-xs text-theme-text-secondary mt-1">
          Recommend Homstay Direct Brokerage-Free leases to your network and capture cash credits inside your account.
        </p>
      </div>

      {/* Beautiful visual card */}
      <div className="bg-gradient-to-br from-[#18181b] via-[#202024] to-[#27272a] text-white p-6 rounded-[28px] shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <span className="text-[9px] font-black tracking-widest text-[#d4af37] bg-white/10 px-3 py-1 rounded-full uppercase">
            Cash Rewards Tiered Structure
          </span>
          <h3 className="font-serif text-3xl font-light leading-snug max-w-sm">
            Earn up to <strong className="font-serif font-black text-theme-accent">₹1,000</strong> for every successful booking
          </h3>
          <p className="text-[11px] text-[#bfbfbf] max-w-md leading-relaxed">
            You get credited ₹500 instantly when your friend passes Goverment ID clearance. 
            Get another ₹500 directly in your banking ledger when they pay their booking security advance on the Platform.
          </p>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Tag size={200} />
        </div>
      </div>

      {/* Refer Code and Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 font-sans">
        <div className="p-4 bg-theme-bg border-2 border-dashed border-theme-border rounded-2xl flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest">Your Private referral Code</span>
            <p className="font-mono text-2xl font-black text-theme-accent mt-1 tracking-wider uppercase select-all">HOMSTAY500</p>
          </div>
          <button 
            onClick={handleCopyReferral}
            className="w-full py-2 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {referralCopied ? (
              <>
                <Check size={12} className="stroke-[3]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy link & Invite</span>
              </>
            )}
          </button>
        </div>

        {/* Statistics Counters */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-theme-bg border border-theme-border rounded-xl text-center flex flex-col justify-center">
            <h4 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-wider">Invited</h4>
            <span className="text-3xl font-black text-theme-text-primary mt-1">12</span>
            <span className="text-[8.5px] text-[#a4a4a4] font-bold mt-1 uppercase">Friends Joined</span>
          </div>
          <div className="p-3 bg-theme-bg border border-theme-border rounded-xl text-center flex flex-col justify-center">
            <h4 className="text-[10px] font-black text-[#606e5c] uppercase tracking-wider">Earned Cash</h4>
            <span className="text-3xl font-black text-green-600 mt-1">₹3,500</span>
            <span className="text-[8.5px] text-green-600 font-extrabold mt-1 uppercase bg-green-500/10 py-0.5 rounded">Settled</span>
          </div>
        </div>
      </div>

      {/* How it works simple text */}
      <div className="p-4 border border-theme-border/55 rounded-2xl space-y-3 bg-theme-bg/40 font-sans">
        <h4 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-[0.2em] mb-1">In 3 Quick Steps</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-theme-text-primary">
          <div className="space-y-1">
            <p className="font-black text-theme-accent text-base">01.</p>
            <p className="font-extrabold">Send Invitation</p>
            <p className="text-[10px] text-theme-text-secondary font-medium leading-relaxed">Share your unique HOMSTAY500 copy link directly to WhatsApp/Mail.</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-theme-border/55 pt-3 sm:pt-0 sm:pl-4">
            <p className="font-black text-theme-accent text-base">02.</p>
            <p className="font-extrabold">Pass Id Clearance</p>
            <p className="text-[10px] text-theme-text-secondary font-medium leading-relaxed">Your invited friend signs up and passes Aadhaar Govt security ID check.</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-theme-border/55 pt-3 sm:pt-0 sm:pl-4">
            <p className="font-black text-theme-accent text-base">03.</p>
            <p className="font-extrabold">Collect Rewards</p>
            <p className="text-[10px] text-theme-text-secondary font-medium leading-relaxed">Collect ₹1,000 ledger balance ready to withdraw instantly to your bank.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
