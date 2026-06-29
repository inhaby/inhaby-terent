import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { NotificationCenter } from '../../components/NotificationCenter';
import { Notification } from '../../types';

interface NotificationsPageProps {
  notifications: Notification[];
  unreadNotificationsCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  setActiveTab: (tab: string) => void;
  setSelectedPropertyId: (id: string | null) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  notifications,
  unreadNotificationsCount,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  setActiveTab,
  setSelectedPropertyId
}) => {
  return (
    <div className="bg-theme-bg min-h-screen text-left">
      <div className="bg-gradient-to-br from-theme-accent to-theme-accent-hover px-6 pt-12 pb-8 text-white shadow-sm flex justify-between items-start">
        <div 
          onClick={() => setActiveTab('HOME')}
          className="flex items-center gap-3 cursor-pointer group select-none block"
          title="Back to Home"
        >
          <button 
            className="p-1.5 hover:bg-white/10 rounded-full text-white transition-all flex items-center justify-center shrink-0 border border-white/20 cursor-pointer"
          >
            <ChevronLeft size={20} className="stroke-[3]" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-black leading-none group-hover:text-white/80 transition-colors">← Your Notifications</h1>
            <p className="text-[10px] font-sans font-bold text-white/70 uppercase tracking-widest mt-1.5 leading-none">Updates and direct verification alerts</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-6 max-w-lg mx-auto">
        <div className="bg-theme-surface border border-theme-border rounded-3xl overflow-hidden shadow-sm">
          <NotificationCenter
            notifications={notifications}
            unreadCount={unreadNotificationsCount}
            markAsRead={markAsRead}
            markAllAsRead={markAllAsRead}
            clearNotifications={clearNotifications}
            onClose={() => setActiveTab('HOME')}
            onActionClick={(tab, id) => {
              if (id) setSelectedPropertyId(id);
              setActiveTab(tab as any);
            }}
            variant="tablet-panel"
          />
        </div>
      </div>
    </div>
  );
};
