import React from 'react';
import { Plus, MapPin, Edit2, Trash2 } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  category: string;
  fullAddress: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

interface AddressesViewProps {
  addresses: Address[];
  openNewAddressForm: () => void;
  openEditAddressForm: (addr: Address) => void;
  handleAddressDelete: (id: string | number) => void;
}

export const AddressesView: React.FC<AddressesViewProps> = ({
  addresses,
  openNewAddressForm,
  openEditAddressForm,
  handleAddressDelete
}) => {
  return (
    <div className="space-y-6 text-sans">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">Your Address Book</h2>
          <p className="text-xs text-theme-text-secondary mt-1">
            Re-use cataloged locations for booking contract coordinates, billing addresses, or visit reservations.
          </p>
        </div>
        <button 
          onClick={openNewAddressForm}
          className="bg-theme-accent hover:bg-theme-accent-hover text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1.5 active:scale-95 transition-all text-sans cursor-pointer shrink-0"
        >
          <Plus size={12} className="stroke-[3]" />
          <span>New Address</span>
        </button>
      </div>

      {/* Address grid */}
      {addresses.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-theme-border rounded-2xl bg-theme-bg">
          <MapPin size={32} className="text-[#cbcbcb] mx-auto mb-2" />
          <p className="text-xs text-theme-text-secondary font-bold uppercase tracking-wider mb-1">Catalog is Empty</p>
          <p className="text-[10px] text-theme-text-secondary/70 max-w-sm mx-auto leading-relaxed">Save your Home, Corporate Office, or College address to instantly fill logistics info.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="p-4 bg-theme-bg border border-theme-border rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                {/* Header tier and icon */}
                <div className="flex items-center justify-between pb-2 border-b border-theme-border mb-3">
                  <span className="text-[10px] font-black bg-theme-accent-soft text-theme-accent px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {addr.category}
                  </span>
                  <span className="text-[10px] text-[#9b9b9b] font-bold uppercase">{addr.name}</span>
                </div>
                {/* Address body */}
                <p className="text-xs font-semibold text-theme-text-primary leading-relaxed">
                  {addr.fullAddress}
                </p>
                {addr.landmark && (
                  <p className="text-[10px] text-[#888888] font-bold mt-1 uppercase">
                    Landmark: <span className="text-theme-text-secondary font-medium lowercase select-text">{addr.landmark}</span>
                  </p>
                )}
                <p className="text-[10px] text-theme-text-secondary font-semibold mt-1 bg-white/40 dark:bg-black/10 p-1.5 rounded inline-block">
                  {addr.city}, {addr.state} — {addr.pincode}
                </p>
              </div>

              {/* CRUD Actions buttons */}
              <div className="flex gap-2 border-t border-theme-border/40 mt-4 pt-3 justify-end">
                <button 
                  onClick={() => openEditAddressForm(addr)}
                  className="p-1 w-7 h-7 bg-white dark:bg-theme-border/45 border border-theme-border hover:bg-theme-bg text-theme-text-secondary rounded-lg flex items-center justify-center transition-all cursor-pointer"
                  title="Edit Address"
                >
                  <Edit2 size={12} />
                </button>
                <button 
                  onClick={() => handleAddressDelete(addr.id)}
                  className="p-1 w-7 h-7 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/25 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                  title="Delete Address"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
