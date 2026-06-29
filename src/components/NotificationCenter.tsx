import React from 'react';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  HelpCircle, 
  MessageSquare, 
  Megaphone, 
  Heart,
  BookOpen,
  Trash2,
  CheckCheck
} from 'lucide-react';
import { Notification } from '../types';

interface NotificationCenterProps {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  onClose: () => void;
  onActionClick: (actionTab: string, actionId?: string) => void;
  variant: 'desktop-dropdown' | 'tablet-panel' | 'mobile-fullscreen';
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  onClose,
  onActionClick,
  variant
}) => {

  // Helper to resolve icon type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'VISIT_ACCEPTED':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} className="stroke-[2.5]" />
          </div>
        );
      case 'VISIT_REJECTED':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
            <XCircle size={16} className="stroke-[2.5]" />
          </div>
        );
      case 'VISIT_PENDING':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Clock size={16} className="stroke-[2.5]" />
          </div>
        );
      case 'BOOKING_UPDATE':
        return (
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
            <Calendar size={16} className="stroke-[2.5]" />
          </div>
        );
      case 'VERIFICATION':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <ShieldCheck size={16} className="stroke-[2.5]" />
          </div>
        );
      case 'SUPPORT':
        return (
          <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center shrink-0">
            <HelpCircle size={16} className="stroke-[2.5]" />
          </div>
        );
      case 'CHAT':
        return (
          <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
            <MessageSquare size={16} className="stroke-[2.5]" />
          </div>
        );
      case 'WISHLIST':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
            <Heart size={16} className="stroke-[2.5]" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-zinc-500/10 text-zinc-500 flex items-center justify-center shrink-0">
            <Megaphone size={16} className="stroke-[2.5]" />
          </div>
        );
    }
  };

  const renderHeader = () => (
    <div className="p-4 border-b border-theme-border/60 flex items-center justify-between bg-theme-bg/40">
      <div className="flex items-center gap-2 font-sans">
        <Bell size={16} className="text-theme-accent stroke-[2.5]" />
        <div>
          <h3 className="text-xs font-black text-theme-text-primary uppercase tracking-wider leading-none">Notifications Center</h3>
          <span className="text-[9px] text-[#8e8e93] leading-none mt-1.5 block">
            {unreadCount > 0 ? `${unreadCount} unread announcements` : 'No unread notifications'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {notifications.length > 0 && (
          <>
            <button 
              onClick={markAllAsRead} 
              title="Mark all as read"
              className="p-1 text-theme-text-secondary hover:text-theme-accent rounded hover:bg-theme-border/60 transition-colors cursor-pointer"
            >
              <CheckCheck size={14} />
            </button>
            <button 
              onClick={clearNotifications} 
              title="Clear all"
              className="p-1 text-theme-text-secondary hover:text-rose-500 rounded hover:bg-theme-border/60 transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
        {variant !== 'desktop-dropdown' && (
          <button 
            onClick={onClose} 
            className="p-1 text-theme-text-secondary hover:bg-theme-border rounded-full transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );

  const renderList = () => {
    if (notifications.length === 0) {
      return (
        <div className="py-16 px-4 text-center text-sans flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-dashed border-theme-border flex items-center justify-center text-theme-text-secondary/40 mb-3 animate-pulse">
            <Bell size={20} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#a1a1a6]">All caught up!</span>
          <p className="text-[10px] text-theme-text-secondary/80 mt-1 max-w-[200px]">
            Announcements regarding visits, tenant status, and landlord replies appear cataloged here.
          </p>
        </div>
      );
    }

    return (
      <div className="divide-y divide-theme-border/40 overflow-y-auto no-scrollbar flex-1">
        {notifications.map((n) => (
          <div 
            key={n.id}
            onClick={() => {
              if (!n.read) markAsRead(n.id);
              if (n.actionTab) {
                onActionClick(n.actionTab, n.actionId);
              }
            }}
            className={`p-4 flex gap-3 hover:bg-theme-accent-soft/20 cursor-pointer transition-all relative ${n.read ? 'opacity-70 bg-transparent' : 'bg-theme-accent-soft/[0.08]'}`}
          >
            {/* Unread tiny gem indicator */}
            {!n.read && (
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-theme-accent rounded-full animate-pulse" />
            )}
            
            {getNotificationIcon(n.type)}

            <div className="min-w-0 flex-1 text-left text-sans">
              <span className="text-xs font-bold text-theme-text-primary block leading-snug">{n.title}</span>
              <p className="text-[11px] text-theme-text-secondary leading-normal mt-0.5">{n.description}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[9px] text-[#9a9a9f] font-semibold">{n.time}</span>
                {n.actionTab && (
                  <>
                    <span className="text-[9px] text-theme-text-secondary/60 font-black">•</span>
                    <span className="text-[9px] text-theme-accent font-bold uppercase tracking-wider hover:underline">
                      Go to {n.actionTab}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // 1. Desktop Dropdown Variant
  if (variant === 'desktop-dropdown') {
    return (
      <div className="absolute right-0 top-11 w-85 bg-theme-surface border border-theme-border rounded-2xl shadow-xl overflow-hidden flex flex-col z-[110] animate-in slide-in-from-top-2 duration-300">
        {renderHeader()}
        <div className="max-h-96 flex flex-col overflow-hidden">
          {renderList()}
        </div>
        {notifications.length > 0 && (
          <div className="p-2.5 text-center border-t border-theme-border/40 bg-theme-bg/30">
            <button 
              onClick={onClose}
              className="text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-theme-text-primary transition-colors cursor-pointer"
            >
              Close Menu
            </button>
          </div>
        )}
      </div>
    );
  }

  // 2. Tablet Drawer/Panel Variant
  if (variant === 'tablet-panel') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-end p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative w-full max-w-sm h-full max-h-[85vh] bg-theme-surface border border-theme-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right-10 duration-400">
          {renderHeader()}
          {renderList()}
        </div>
      </div>
    );
  }

  // 3. Mobile Fullscreen Variant
  return (
    <div className="fixed inset-0 z-[120] bg-theme-bg flex flex-col h-screen w-full animate-in slide-in-from-bottom duration-400">
      {renderHeader()}
      <div className="flex-1 overflow-y-auto w-full flex flex-col bg-theme-surface">
        {renderList()}
      </div>
    </div>
  );
};
