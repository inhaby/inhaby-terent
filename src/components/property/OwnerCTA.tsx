import { CheckCircle2, FileText, CreditCard } from 'lucide-react';

export const OwnerCTA = () => (
  <div className="mx-4 my-6 p-6 rounded-2xl bg-[#fdf6e9] relative overflow-hidden border border-amber-100">
    <div className="relative z-10 text-left">
      <h3 className="text-xl font-black text-[#8b5e00]">Owner? List for FREE</h3>
      <p className="text-xs text-amber-800/70 mt-1">Reach 10k+ seekers daily</p>
      
      <div className="mt-4 space-y-3">
        {[
          { icon: CheckCircle2, text: 'Verified Tenant Profiles' },
          { icon: FileText, text: 'Easy Digital Contracts' },
          { icon: CreditCard, text: 'Automated Rent Collection' }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <item.icon size={16} className="text-green-600" />
            <span className="text-xs font-medium text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>
      
      <button className="mt-6 bg-[#8b5e00] text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg active:scale-95 transition-transform cursor-pointer">
        POST YOUR PROPERTY
      </button>
    </div>
    
    {/* Abstract background shapes */}
    <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-200/20 rounded-tl-full -mr-8 -mb-8"></div>
    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-300/10 rounded-full -mt-4 -mr-4"></div>
  </div>
);
