export interface Message {
  id: string;
  sender: 'TENANT' | 'OWNER';
  text: string;
  time: string;
  timestamp: number;
  isDateSeparator?: boolean;
}

export interface Conversation {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  propertyPrice: number;
  ownerName: string;
  ownerImage: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
}
