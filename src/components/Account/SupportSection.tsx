import React, { useState, useEffect } from 'react';
import { HelpCircle, Upload, Mail, Phone } from 'lucide-react';

interface SupportSectionProps {
  profilePhone: string;
  profileEmail: string;
}

export const SupportSection: React.FC<SupportSectionProps> = ({
  profilePhone,
  profileEmail
}) => {
  const [tickets, setTickets] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('homstay-tickets-logs');
      return saved ? JSON.parse(saved) : [
        { id: 'TCK-2026-0041', relatedTo: 'Booking', description: 'Request check-in time extension till 9 PM for Sector 4 listing.', status: 'Resolved', createdAt: '02/06/2026 14:22' },
        { id: 'TCK-2026-0089', relatedTo: 'Payment', description: 'Electricity bill transaction for May showing pending even after debit.', status: 'Pending', createdAt: 'Yesterday, 11:05' }
      ];
    } catch {
      return [
        { id: 'TCK-2026-0041', relatedTo: 'Booking', description: 'Request check-in time extension till 9 PM for Sector 4 listing.', status: 'Resolved', createdAt: '02/06/2026 14:22' },
        { id: 'TCK-2026-0089', relatedTo: 'Payment', description: 'Electricity bill transaction for May showing pending even after debit.', status: 'Pending', createdAt: 'Yesterday, 11:05' }
      ];
    }
  });

  const [selectedTicketCategory, setSelectedTicketCategory] = useState<string>('Booking');
  const [ticketDescription, setTicketDescription] = useState<string>('');
  const [ticketAttachmentName, setTicketAttachmentName] = useState<string>('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('homstay-tickets-logs', JSON.stringify(tickets));
  }, [tickets]);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketDescription.trim()) return;

    setIsSubmittingTicket(true);

    setTimeout(() => {
      const newTicket = {
        id: `TCK-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        relatedTo: selectedTicketCategory,
        description: ticketDescription,
        attachmentName: ticketAttachmentName || undefined,
        status: 'Open',
        createdAt: 'Just now'
      };

      setTickets([newTicket, ...tickets]);
      setTicketDescription('');
      setTicketAttachmentName('');
      setIsSubmittingTicket(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 text-sans">
      <div>
        <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">Help & Support Ticket Desk</h2>
        <p className="text-xs text-[#71717a] mt-1">
          Post an official customer support ticket directly onto the database to resolve payment discrepancies, contract queries, or visit cancellations.
        </p>
      </div>

      {/* Support Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Create Ticket */}
        <form onSubmit={handleTicketSubmit} className="md:col-span-7 space-y-4">
          <h3 className="text-[10px] font-black tracking-widest text-theme-text-secondary uppercase mb-1 font-sans">Create Support Ticket</h3>
          
          {/* Auto fetched read only elements */}
          <div className="grid grid-cols-2 gap-3.5 text-[10px] font-semibold text-theme-text-secondary uppercase select-text bg-[#f6f5ef] dark:bg-black/10 p-2.5 rounded-xl border border-theme-border">
            <div>
              <span className="block font-medium tracking-tight text-[#acacac]">Tenant ID</span>
              <span className="font-bold text-theme-text-primary tracking-wide">TR-2026-009581</span>
            </div>
            <div>
              <span className="block font-medium tracking-tight text-[#acacac]">Phone Coordinate</span>
              <span className="font-bold text-theme-text-primary tracking-wide">{profilePhone}</span>
            </div>
            <div className="col-span-2 pt-1 border-t border-theme-border mt-1">
              <span className="block font-medium tracking-tight text-[#acacac]">Verified User Email</span>
              <span className="font-bold text-theme-text-primary tracking-normal select-all">{profileEmail}</span>
            </div>
          </div>

          {/* Related To selector */}
          <div>
            <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1">Inquire Category</label>
            <select 
              value={selectedTicketCategory}
              onChange={(e) => setSelectedTicketCategory(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent cursor-pointer text-theme-text-primary"
            >
              {['Booking', 'Payment', 'Verification', 'Property', 'Visit Request', 'Account', 'Technical Issue', 'Other'].map((cat) => (
                <option key={cat} value={cat}>{cat} Inquiries</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1">Explain support description</label>
            <textarea 
              rows={3}
              placeholder="Elaborate support context, booking IDs, payment receipts dates, or specific issue details..."
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
              className="w-full text-xs font-semibold text-theme-text-primary p-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent resize-none"
              maxLength={1000}
              required
            />
          </div>

          {/* Simulated file upload */}
          <div>
            <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1">Optional Attachment (Screenshot/Doc)</label>
            <div className="relative border border-dashed border-theme-border rounded-xl py-2 px-3 bg-theme-bg text-center cursor-pointer hover:bg-theme-border/20">
              <span className="text-[9px] font-bold text-[#8c8888] uppercase">Add image scanned screenshots</span>
              <input 
                type="file" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setTicketAttachmentName(e.target.files[0].name);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {ticketAttachmentName && (
              <p className="text-[9.5px] font-extrabold text-[#2a2a2a] dark:text-white mt-1 border-b border-theme-border pb-0.5 inline-block">{ticketAttachmentName}</p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isSubmittingTicket || !ticketDescription}
            className={`w-full py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              ticketDescription && !isSubmittingTicket 
                ? 'bg-theme-accent hover:bg-theme-accent-hover text-white shadow-md' 
                : 'bg-theme-border/60 text-theme-text-secondary/50 cursor-not-allowed'
            }`}
          >
            {isSubmittingTicket ? 'Recording ticket...' : 'Post Support Ticket'}
          </button>
        </form>

        {/* Right Column: Active and Past Ticket Listing */}
        <div className="md:col-span-5 space-y-4">
          <h3 className="text-[10px] font-black tracking-widest text-[#9c9c9c] uppercase leading-none">Inquiry Logs</h3>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="p-3 bg-theme-bg border border-theme-border/70 rounded-xl space-y-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black select-all text-theme-text-primary block">{t.id}</span>
                    <span className="text-[8px] font-extrabold bg-[#f5ebe5] dark:bg-theme-border text-theme-accent px-1.5 py-0.5 rounded uppercase">{t.relatedTo}</span>
                  </div>
                  
                  {/* Badge tag */}
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wide ${
                    t.status === 'Open' 
                      ? 'bg-blue-500 text-white' 
                      : t.status === 'Pending' 
                        ? 'bg-amber-500 text-white' 
                        : t.status === 'Resolved' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-500 text-white'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <p className="text-[10.5px] font-medium text-theme-text-secondary leading-normal select-text">
                  {t.description}
                </p>
                {t.attachmentName && (
                  <p className="text-[8.5px] text-[#2c3d52] dark:text-blue-300 font-semibold">📎 File: <span className="underline select-all">{t.attachmentName}</span></p>
                )}
                <p className="text-[8.5px] text-right font-semibold text-[#8c8c8c] italic uppercase">{t.createdAt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
