import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { MessagesSection } from '../../components/MessagesSection';
import { useAppContext } from '../../app/AppContext';

interface MessagesPageProps {
  openMsgPropertyId: string | null;
  setOpenMsgPropertyId: (id: string | null) => void;
  setActiveTab: (tab: string) => void;
  isMobileChatActive: boolean;
  setIsMobileChatActive: (active: boolean) => void;
  setUnreadChatsCount: (count: number) => void;
}

export const MessagesPage: React.FC<MessagesPageProps> = ({
  openMsgPropertyId,
  setOpenMsgPropertyId,
  setActiveTab,
  isMobileChatActive,
  setIsMobileChatActive,
  setUnreadChatsCount
}) => {
  const { combinedPropertiesList } = useAppContext();

  return (
    <div className="bg-theme-bg min-h-screen text-left">
      <div className={`bg-gradient-to-br from-theme-accent to-theme-accent-hover px-6 pt-12 pb-8 text-white shadow-sm flex justify-between items-start ${isMobileChatActive ? 'hidden' : 'flex'}`}>
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
            <h1 className="font-serif text-2xl font-black leading-none group-hover:text-white/80 transition-colors">← Your Messages</h1>
            <p className="text-[10px] font-sans font-bold text-white/70 uppercase tracking-widest mt-1.5 leading-none">Instant direct chat with verified owners</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto md:p-6">
        <MessagesSection 
          propertiesList={combinedPropertiesList}
          openConversationWithPropertyId={openMsgPropertyId}
          onClearOpenConversation={() => setOpenMsgPropertyId(null)}
          onChatActiveChange={setIsMobileChatActive}
        />
      </div>
    </div>
  );
};
