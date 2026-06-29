import { Home, Heart, Footprints, MessageSquare, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount: number;
  savedCount: number;
}

export const BottomNav = ({ 
  activeTab, 
  onTabChange,
  unreadCount,
  savedCount
}: BottomNavProps) => {
  const items = [
    { id: 'HOME', icon: Home, label: 'Home' },
    { id: 'WISHLIST', icon: Heart, label: 'Wishlist', badge: savedCount },
    { id: 'VISITS', icon: Footprints, label: 'Visits' },
    { id: 'MESSAGES', icon: MessageSquare, label: 'Messages', badge: unreadCount },
    { id: 'ACCOUNT', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-theme-surface/95 backdrop-blur-md border-t border-theme-border/60 px-5 md:px-16 py-3.5 flex justify-between items-center z-50 max-w-md md:max-w-none mx-auto lg:hidden transition-all duration-300">
      {items.map((item) => (
        <button 
          key={item.id} 
          onClick={() => onTabChange(item.id)}
          className={`flex flex-col items-center gap-1.5 transition-all cursor-pointer relative ${activeTab === item.id ? 'text-theme-accent scale-110' : 'text-theme-text-secondary/50 hover:text-theme-accent'}`}
        >
          <item.icon size={22} fill={activeTab === item.id ? 'currentColor' : 'none'} className="stroke-[2.5]" />
          <span className={`text-[10px] font-extrabold tracking-wide ${activeTab === item.id ? 'text-theme-text-primary' : 'text-theme-text-secondary/60'}`}>{item.label}</span>
          {item.id === 'MESSAGES' && item.badge > 0 && (
            <span className="absolute top-0 right-3 -mt-1 -mr-2 bg-theme-accent text-white text-[9px] font-black rounded-full w-4.5 h-4.5 shadow-md flex items-center justify-center animate-pulse">
              {item.badge}
            </span>
          )}
          {item.id === 'WISHLIST' && item.badge > 0 && (
            <span className="absolute top-0 right-3 -mt-1 -mr-2 bg-theme-accent text-white text-[9px] font-black rounded-full w-4.5 h-4.5 shadow-md flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};
