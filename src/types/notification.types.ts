export interface Notification {
  id: string;
  type: 'VISIT_ACCEPTED' | 'VISIT_REJECTED' | 'VISIT_PENDING' | 'BOOKING_UPDATE' | 'VERIFICATION' | 'SUPPORT' | 'CHAT' | 'SYSTEM' | 'WISHLIST';
  title: string;
  description: string;
  time: string;
  timestamp: number;
  read: boolean;
  actionId?: string;
  actionTab?: string;
}
