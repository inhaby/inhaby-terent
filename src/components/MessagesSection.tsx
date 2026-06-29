import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Paperclip, Send, Image, Smile, Phone, Video, Info, 
  ChevronLeft, Check, CheckCheck, Circle, MessageSquare, 
  Eye, Heart, ExternalLink, Calendar, MapPin, Trash2, Camera, MoreVertical, Sparkles,
  Home, Footprints, User, Pin, VolumeX, Shield, Slash, VideoOff, Mic, MicOff, Volume2, Star, ShieldCheck, CheckCircle2, Bookmark, SlidersHorizontal, CircleDot, Zap
} from 'lucide-react';
import { Property } from '../types';
import { useAuth } from '../context/TenantAuthContext';
import { supabase } from '@inhaby/shared';

export interface ChatMessage {
  id: string;
  senderId: 'tenant' | 'owner';
  text?: string;
  imageUrl?: string;
  timestamp: string; // ISO String
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  ownerName: string;
  ownerPhoto: string;
  ownerPhone: string;
  ownerEmail: string;
  isOnline: boolean;
  onlineStatusText?: string;
  property: {
    id: string;
    title: string;
    type: string;
    price: number;
    image: string;
  };
  messages: ChatMessage[];
  unreadCount: number;
  lastMessageTime: string; // Used for listing sort
  typing?: boolean;
  notes?: string; // Optional bubble story
}

interface MessagesSectionProps {
  propertiesList: Property[];
  onSelectProperty?: (id: string) => void;
  onBackToExplore?: () => void;
  // Trigger from outside to immediately open a chat
  openConversationWithPropertyId?: string | null;
  onClearOpenConversation?: () => void;
  onChatActiveChange?: (active: boolean) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  isDark?: boolean;
  setIsDark?: (dark: boolean) => void;
  accent?: string;
  setAccent?: (accent: string) => void;
}

// Predefined room mock images for simulated attachment upload
const MOCK_ATTACHMENT_IMAGES = [
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=400',
];

const getOwnerMetadata = (name: string) => {
  const norm = name.toLowerCase();
  if (norm.includes('arpit')) {
    return {
      level: 'Elite Owner',
      joined: 'Joined October 2021',
      listed: 5,
      active: 3,
      responseRate: '99%',
      responseTime: '< 15 mins',
      completedVisits: 64,
      verifiedListings: '100%',
    };
  } else if (norm.includes('nao')) {
    return {
      level: 'Gold Owner',
      joined: 'Joined April 2023',
      listed: 3,
      active: 2,
      responseRate: '100%',
      responseTime: '< 30 mins',
      completedVisits: 18,
      verifiedListings: '100%',
    };
  } else if (norm.includes('veer')) {
    return {
      level: 'Verified Owner',
      joined: 'Joined January 2022',
      listed: 4,
      active: 3,
      responseRate: '95%',
      responseTime: '< 1 hour',
      completedVisits: 29,
      verifiedListings: '100%',
    };
  } else if (norm.includes('rm')) {
    return {
      level: 'Elite Owner',
      joined: 'Joined September 2020',
      listed: 8,
      active: 6,
      responseRate: '98%',
      responseTime: '< 10 mins',
      completedVisits: 84,
      verifiedListings: '100%',
    };
  } else {
    return {
      level: 'Verified Owner',
      joined: 'Joined August 2022',
      listed: 2,
      active: 1,
      responseRate: '90%',
      responseTime: '< 2 hours',
      completedVisits: 12,
      verifiedListings: '100%',
    };
  }
};

const formatDuration = (secs: number) => {
  const mins = Math.floor(secs / 60);
  const remainingSecs = secs % 60;
  return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
};

export const MessagesSection: React.FC<MessagesSectionProps> = ({
  propertiesList,
  onSelectProperty,
  onBackToExplore,
  openConversationWithPropertyId,
  onClearOpenConversation,
  onChatActiveChange,
  activeTab = 'MESSAGES',
  onTabChange,
  isDark,
  setIsDark,
  accent,
  setAccent
}) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notesList, setNotesList] = useState<{ id: string; name: string; avatar: string; note: string; song?: string }[]>([]);
  
  // Input fields for current chat
  const [inputText, setInputText] = useState('');
  const [selectedAttachmentImage, setSelectedAttachmentImage] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // --- Mute, Pin & Status States ---
  const [pinnedChats, setPinnedChats] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('homstay-pinned-chats-v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [mutedChats, setMutedChats] = useState<{[key: string]: 'All' | 'Chats Only' | 'Calls Only' | null}>(() => {
    try {
      const stored = localStorage.getItem('homstay-muted-chats-v1');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [activeMenuConvId, setActiveMenuConvId] = useState<string | null>(null);
  const [showMuteModalId, setShowMuteModalId] = useState<string | null>(null);
  const [tempMuteType, setTempMuteType] = useState<'All' | 'Chats Only' | 'Calls Only'>('All');
  const [showDeleteModalId, setShowDeleteModalId] = useState<string | null>(null);

  // Call state: 'idle' | 'checking' | 'active' | 'denied'
  const [activeCall, setActiveCall] = useState<{
    type: 'audio' | 'video';
    status: 'checking' | 'active' | 'denied';
    isMuted: boolean;
    isSpeakerOn: boolean;
    duration: number;
    camStatus: 'checking' | 'Available' | 'Permission Required';
    micStatus: 'checking' | 'Available' | 'Permission Required';
    speakerStatus: 'checking' | 'Available' | 'Unavailable';
  } | null>(null);

  // Active chat workspace view: 'chat' | 'profile'
  const [activeWorkspaceMode, setActiveWorkspaceMode] = useState<'chat' | 'profile'>('chat');

  // Sync Pinned & Muted to LocalStorage
  useEffect(() => {
    localStorage.setItem('homstay-pinned-chats-v1', JSON.stringify(pinnedChats));
  }, [pinnedChats]);

  useEffect(() => {
    localStorage.setItem('homstay-muted-chats-v1', JSON.stringify(mutedChats));
  }, [mutedChats]);

  // Call Duration ticking effect
  useEffect(() => {
    let timer: any;
    if (activeCall && activeCall.status === 'active') {
      timer = setInterval(() => {
        setActiveCall(prev => prev ? { ...prev, duration: prev.duration + 1 } : null);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeCall?.status]);

  // Load conversations from Supabase
  const loadConversations = async (currentUserId: string, selectNewId?: string) => {
    try {
      const { data: dbConvs, error: convError } = await supabase
        .from('conversations')
        .select(`
          id,
          created_at,
          tenant_id,
          owner_id,
          property_id,
          property:properties (
            id,
            title,
            property_type,
            rent,
            bedrooms,
            bathrooms,
            locality,
            city,
            owner_id,
            property_images (
              url,
              is_cover
            )
          ),
          owner:owner_profiles (
            id,
            name,
            avatar_url,
            phone
          ),
          messages (
            id,
            sender_id,
            text,
            created_at
          )
        `)
        .or(`tenant_id.eq.${currentUserId},owner_id.eq.${currentUserId}`);

      if (convError) throw convError;
      if (!dbConvs) return;

      const mappedConvs: Conversation[] = dbConvs.map((c: any) => {
        const sortedMsgs = (c.messages || []).sort((a: any, b: any) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        const lastMsg = sortedMsgs[sortedMsgs.length - 1];
        const lastTime = lastMsg ? lastMsg.created_at : c.created_at;

        const images = c.property?.property_images || [];
        const coverImage = images.find((i: any) => i.is_cover)?.url || images[0]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400';

        const isSelected = selectedConvId === c.id || selectNewId === c.id;
        const unreadCount = (!isSelected && lastMsg && lastMsg.sender_id !== currentUserId) ? 1 : 0;

        return {
          id: c.id,
          ownerName: c.owner?.name || 'Owner',
          ownerPhoto: c.owner?.avatar_url || 'https://i.pravatar.cc/150',
          ownerPhone: c.owner?.phone || '+91 99999 99999',
          ownerEmail: `${(c.owner?.name || 'owner').toLowerCase().replace(/\s+/g, '')}@inhaby.com`,
          isOnline: true,
          onlineStatusText: 'Active now',
          property: {
            id: c.property?.id || c.property_id || '',
            title: c.property?.title || 'Unknown Property',
            type: `${c.property?.bedrooms || 1} BHK • ${c.property?.locality || 'Noida'}`,
            price: Number(c.property?.rent || 0),
            image: coverImage
          },
          messages: sortedMsgs.map((m: any) => ({
            id: m.id,
            senderId: m.sender_id === currentUserId ? 'tenant' : 'owner',
            text: m.text,
            timestamp: m.created_at,
            status: 'read' as const
          })),
          unreadCount,
          lastMessageTime: lastTime
        };
      });

      setConversations(mappedConvs);
      if (selectNewId) {
        setSelectedConvId(selectNewId);
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
    }
  };

  // --- Initialize & Polling from Supabase ---
  useEffect(() => {
    if (!user) return;
    loadConversations(user.id);
    const interval = setInterval(() => {
      loadConversations(user.id);
    }, 5000);

    // Seed notes row matching styling requirements (EXCLUDING self 'Your note' story bubble/avatar)
    setNotesList([
      {
        id: 'note-1',
        name: 'Arpit Saxena',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        note: 'Looking for flatmates!',
        song: 'Mat Maari - Pritam, Kunal'
      },
      {
        id: 'note-2',
        name: 'nao',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        note: 'Study hard ⛩️'
      },
      {
        id: 'note-3',
        name: 'Veerr',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        note: 'Weekend vibes 🍻'
      }
    ]);

    return () => clearInterval(interval);
  }, [user]);

  // Handle outside activation
  useEffect(() => {
    if (!user || !openConversationWithPropertyId || propertiesList.length === 0) return;

    const handleOutsideOpen = async () => {
      const matchProp = propertiesList.find(p => p.id === openConversationWithPropertyId);
      if (!matchProp) return;

      // Check if conversation already exists in database
      try {
        const { data: existing, error } = await supabase
          .from('conversations')
          .select('id')
          .eq('property_id', matchProp.id)
          .eq('tenant_id', user.id)
          .maybeSingle();

        if (existing) {
          setSelectedConvId(existing.id);
        } else {
          // Create new conversation in Supabase
          const { data: newConv, error: insertError } = await supabase
            .from('conversations')
            .insert({
              property_id: matchProp.id,
              tenant_id: user.id,
              owner_id: matchProp.ownerId || 'd79b25ee-5b8d-4a1e-8fd9-d5966a3d666d'
            })
            .select()
            .single();

          if (insertError) throw insertError;
          if (newConv) {
            // Also insert initial message from tenant
            await supabase
              .from('messages')
              .insert({
                conversation_id: newConv.id,
                sender_id: user.id,
                text: `Hi, I am interested in your property "${matchProp.title}". Is it available?`
              });

            await loadConversations(user.id, newConv.id);
          }
        }
      } catch (err) {
        console.error('Error opening conversation from outside:', err);
      } finally {
        if (onClearOpenConversation) {
          onClearOpenConversation();
        }
      }
    };

    handleOutsideOpen();
  }, [openConversationWithPropertyId, propertiesList, user]);

  // Scroll details chat window to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
    if (onChatActiveChange) {
      onChatActiveChange(selectedConvId !== null);
    }
  }, [selectedConvId, conversations, onChatActiveChange]);

  const seedConversations = () => {
    if (user) {
      loadConversations(user.id);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !selectedAttachmentImage) return;
    if (!selectedConvId || !user) return;

    const textToSend = inputText.trim() || (selectedAttachmentImage ? `[Attachment]: ${selectedAttachmentImage}` : '');
    
    setInputText('');
    setSelectedAttachmentImage(null);
    setShowEmojiPicker(false);
    setShowAttachMenu(false);

    try {
      const { data: newMsg, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: selectedConvId,
          sender_id: user.id,
          text: textToSend
        })
        .select()
        .single();

      if (error) throw error;

      await loadConversations(user.id);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleMarkAsRead = (convId: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          unreadCount: 0
        };
      }
      return c;
    }));
  };

  const selectConversation = (id: string) => {
    setSelectedConvId(id);
    handleMarkAsRead(id);
    setActiveWorkspaceMode('chat');
    setActiveCall(null);
  };

  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModalId(id);
  };

  const handleAddEmoji = (emoji: string) => {
    setInputText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleSimulateImageUpload = (index: number) => {
    setSelectedAttachmentImage(MOCK_ATTACHMENT_IMAGES[index]);
    setShowAttachMenu(false);
  };

  // Filter conversations (excluding self chats and using pin & date for sorting)
  const filteredConversations = conversations.filter(conv => {
    const profileName = typeof window !== 'undefined' ? (localStorage.getItem('homstay-profile-name') || 'Max gaur') : 'Max gaur';
    if (conv.ownerName.toLowerCase() === profileName.toLowerCase()) {
      return false;
    }
    const textMatch = conv.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      conv.property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      conv.messages.some(m => m.text?.toLowerCase().includes(searchQuery.toLowerCase()));
    return textMatch;
  });

  const sortedConversations = [...filteredConversations].sort((a, b) => {
    const aPinned = pinnedChats.includes(a.id);
    const bPinned = pinnedChats.includes(b.id);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
  });

  const currentChat = conversations.find(c => c.id === selectedConvId);

  const handleStartAudioCall = () => {
    setActiveCall({
      type: 'audio',
      status: 'checking',
      isMuted: false,
      isSpeakerOn: false,
      duration: 0,
      camStatus: 'checking',
      micStatus: 'checking',
      speakerStatus: 'checking'
    });
    // Simulate checking device permissions
    setTimeout(() => {
      setActiveCall(prev => {
        if (prev && prev.type === 'audio') {
          return {
            ...prev,
            status: 'active',
            micStatus: 'Available',
            camStatus: 'Permission Required',
            speakerStatus: 'Available'
          };
        }
        return prev;
      });
    }, 1500);
  };

  const handleStartVideoCall = () => {
    setActiveCall({
      type: 'video',
      status: 'checking',
      isMuted: false,
      isSpeakerOn: false,
      duration: 0,
      camStatus: 'checking',
      micStatus: 'checking',
      speakerStatus: 'checking'
    });
    
    // Attempt real browser check of device access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(() => {
          setTimeout(() => {
            setActiveCall(prev => {
              if (prev && prev.type === 'video') {
                return {
                  ...prev,
                  status: 'active',
                  camStatus: 'Available',
                  micStatus: 'Available',
                  speakerStatus: 'Available'
                };
              }
              return prev;
            });
          }, 1500);
        })
        .catch(() => {
          // Denied / Unavailable (very common in sandboxed system iframe)
          setTimeout(() => {
            setActiveCall(prev => {
              if (prev && prev.type === 'video') {
                return {
                  ...prev,
                  status: 'denied',
                  camStatus: 'Permission Required',
                  micStatus: 'Permission Required',
                  speakerStatus: 'Unavailable'
                };
              }
              return prev;
            });
          }, 1500);
        });
    } else {
      // Fallback fallback if getUserMedia is not supported
      setTimeout(() => {
        setActiveCall(prev => {
          if (prev && prev.type === 'video') {
            return {
              ...prev,
              status: 'denied',
              camStatus: 'Permission Required',
              micStatus: 'Permission Required',
              speakerStatus: 'Unavailable'
            };
          }
          return prev;
        });
      }, 1500);
    }
  };

  const handleSimulateGrantPermissions = () => {
    setActiveCall(prev => prev ? {
      ...prev,
      status: 'active',
      camStatus: 'Available',
      micStatus: 'Available',
      speakerStatus: 'Available'
    } : null);
  };

  const handleConfirmMute = (id: string, option: 'All' | 'Chats Only' | 'Calls Only') => {
    setMutedChats(prev => ({
      ...prev,
      [id]: option
    }));
    setShowMuteModalId(null);
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setConversations(prev => prev.filter(c => c.id !== id));
      if (selectedConvId === id) {
        setSelectedConvId(null);
      }
      setShowDeleteModalId(null);
    } catch (err) {
      console.error('Error deleting conversation:', err);
    }
  };

  const groupMessagesByDate = (msgs: ChatMessage[]) => {
    const groups: { [key: string]: ChatMessage[] } = {};
    msgs.forEach(m => {
      const dateStr = new Date(m.timestamp).toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(m);
    });
    return groups;
  };

  return (
    <div 
      id="tenant-messaging-module" 
      className="absolute inset-0 md:relative md:inset-auto w-full h-full bg-theme-bg select-none z-30 md:z-10 flex overflow-hidden text-theme-text-primary"
    >
      
      {/* 2. INBOX PANEL (Left Column on Mobile/Tablet, Middle Column on Desktop) */}
      <div className={`border-r border-theme-border/55 flex flex-col h-full bg-theme-surface shrink-0 w-full md:w-[350px] lg:w-[365px] xl:w-[385px] ${
        selectedConvId ? 'hidden md:flex' : 'flex'
      }`}>
        
        {/* Header Inbox */}
        <div className="px-5 py-3.5 border-b border-theme-border/40 flex flex-col gap-2 shrink-0 font-sans">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => onBackToExplore?.()}
              className="flex items-center gap-2 flex-wrap cursor-pointer group select-none"
              title="Back to Explore Stays"
            >
              <button 
                className="p-1.5 -ml-1 hover:bg-theme-border/40 rounded-full text-theme-text-primary group-hover:text-theme-accent transition-all flex items-center justify-center shrink-0 border border-theme-border/40 bg-theme-surface"
              >
                <ChevronLeft size={20} className="stroke-[3]" />
              </button>
              <span className="font-serif text-2xl font-black text-theme-text-primary tracking-tight group-hover:text-theme-accent transition-colors duration-200">
                ← Inbox
              </span>
              {conversations.reduce((acc, curr) => acc + curr.unreadCount, 0) > 0 && (
                <span className="bg-theme-accent text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md animate-pulse">
                  {conversations.reduce((acc, curr) => acc + curr.unreadCount, 0)}
                </span>
              )}
            </div>
            <button 
              onClick={() => seedConversations()}
              className="p-1 px-2.5 rounded-lg border border-theme-border/80 text-[9px] font-black text-theme-accent bg-theme-accent-soft tracking-wider hover:bg-theme-accent/15 cursor-pointer uppercase transition-all"
              title="Reset conversation state to seed standard direct listings content"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Search bar inside inbox */}
        <div className="px-5 py-3 border-b border-theme-border/40 shrink-0">
          <div className="relative flex items-center bg-theme-bg border border-theme-border/80 px-3.5 py-2.5 rounded-xl">
            <Search size={14} className="text-theme-text-secondary mr-2.5 shrink-0" />
            <input 
              type="text" 
              placeholder="Search owner or property..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-xs text-theme-text-primary placeholder-theme-text-secondary/60 focus:outline-none focus:ring-0 font-sans cursor-text font-semibold"
            />
          </div>
        </div>

        {/* Conversations listing */}
        <div className="flex-1 overflow-y-auto divide-y divide-theme-border/30">
          {sortedConversations.length === 0 ? (
            <div className="p-8 text-center text-sans h-full flex flex-col items-center justify-center">
              <MessageSquare className="text-theme-text-secondary/35 mb-3" size={32} />
              <p className="text-sm font-serif font-black text-theme-text-primary mb-1">No Conversations Found</p>
              <p className="text-xs text-theme-text-secondary max-w-[200px] leading-relaxed font-semibold">
                Search matched zero logs. Send a new message from explore items!
              </p>
            </div>
          ) : (
            sortedConversations.map((conv) => {
              const isSelected = selectedConvId === conv.id;
              const lastMsg = conv.messages[conv.messages.length - 1];
              const msgTime = new Date(conv.lastMessageTime).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit'
              });
              
              return (
                <div
                  key={conv.id}
                  onClick={() => selectConversation(conv.id)}
                  className={`p-4 flex gap-3.5 items-start cursor-pointer transition-all border-l-4 hover:bg-theme-bg/60 relative group ${
                    isSelected 
                      ? 'bg-theme-accent-soft border-theme-accent text-theme-text-primary' 
                      : 'border-transparent text-theme-text-primary'
                  }`}
                >
                  {/* User profile with online indicator */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-theme-border bg-theme-border bg-cover bg-center" style={{ backgroundImage: `url(${conv.ownerPhoto})` }} />
                    {conv.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-theme-surface rounded-full shadow-lg" />
                    )}
                  </div>

                  {/* Meta info */}
                  <div className="flex-1 min-w-0 font-sans space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black tracking-tight truncate group-hover:text-theme-accent transition-colors flex items-center gap-1">
                        {conv.ownerName}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {pinnedChats.includes(conv.id) && (
                          <Pin size={10} className="text-theme-accent rotate-45 shrink-0" />
                        )}
                        {mutedChats[conv.id] && (
                          <VolumeX size={10} className="text-theme-text-secondary/60 shrink-0" />
                        )}
                        <span className="text-[10px] text-theme-text-secondary/70 font-bold">
                          {msgTime}
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] font-bold text-theme-accent uppercase tracking-wider truncate">
                      Regarding: {conv.property.title}
                    </div>

                    <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'text-theme-text-primary font-bold' : 'text-theme-text-secondary/75'}`}>
                      {lastMsg?.senderId === 'tenant' ? 'You: ' : ''}
                      {lastMsg?.imageUrl ? 'Sent an attachment' : lastMsg?.text}
                    </p>
                  </div>

                  {/* Unread dot / action button */}
                  <div className="flex flex-col items-end justify-between self-stretch shrink-0 relative">
                    {conv.unreadCount > 0 ? (
                      <span className="w-2.5 h-2.5 bg-[#0095f6] rounded-full shadow-lg" />
                    ) : (
                      <span className="w-2 h-2 opacity-0" />
                    )}
                    
                    {/* Ellipsis ⋮ options menu triggers */}
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuConvId(activeMenuConvId === conv.id ? null : conv.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-theme-text-secondary hover:bg-theme-bg border border-theme-border/20 transition-all cursor-pointer"
                        title="Options"
                      >
                        <MoreVertical size={13} className="stroke-[2.5]" />
                      </button>

                      {/* Dropdown Menu absolutely aligned */}
                      {activeMenuConvId === conv.id && (
                        <>
                          <div className="fixed inset-0 z-30" onClick={(e) => { e.stopPropagation(); setActiveMenuConvId(null); }} />
                          <div className="absolute right-0 bottom-[110%] w-36 bg-theme-surface border border-theme-border rounded-xl shadow-2xl py-1.5 z-40 font-sans text-xs">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuConvId(null);
                                if (pinnedChats.includes(conv.id)) {
                                  setPinnedChats(prev => prev.filter(id => id !== conv.id));
                                } else {
                                  setPinnedChats(prev => [...prev, conv.id]);
                                }
                              }}
                              className="w-full text-left px-3 py-2 hover:bg-theme-bg text-theme-text-primary font-semibold flex items-center gap-2 cursor-pointer"
                            >
                              <Pin size={12} className="text-theme-text-secondary rotate-45 shrink-0" />
                              <span>{pinnedChats.includes(conv.id) ? 'Unpin' : 'Pin'}</span>
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuConvId(null);
                                if (mutedChats[conv.id]) {
                                  setMutedChats(prev => {
                                    const next = { ...prev };
                                    delete next[conv.id];
                                    return next;
                                  });
                                } else {
                                  setShowMuteModalId(conv.id);
                                  setTempMuteType('All');
                                }
                              }}
                              className="w-full text-left px-3 py-2 hover:bg-theme-bg text-theme-text-primary font-semibold flex items-center gap-2 cursor-pointer"
                            >
                              <VolumeX size={12} className="text-theme-text-secondary shrink-0" />
                              <span>{mutedChats[conv.id] ? 'Unmute' : 'Mute'}</span>
                            </button>

                            <div className="h-px bg-theme-border/40 my-1"></div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuConvId(null);
                                setShowDeleteModalId(conv.id);
                              }}
                              className="w-full text-left px-3 py-2 hover:bg-red-500/10 text-red-500 font-bold flex items-center gap-2 cursor-pointer"
                            >
                              <Trash2 size={12} className="text-red-500 shrink-0" />
                              <span>Delete Chat</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>

      {/* 3. ACTIVE CHAT WORKSPACE (Right Column always except Mobile when no chat selected) */}
      <div className={`flex-1 flex flex-col h-full bg-theme-bg relative ${
        selectedConvId ? 'flex' : 'hidden md:flex items-center justify-center p-8 text-center bg-theme-surface'
      }`}>
        
        {currentChat ? (
          <div className="flex flex-col h-full w-full bg-theme-surface">
            
            {/* CHAT HEADER */}
            <div className="px-5 py-4 border-b border-theme-border/50 flex justify-between items-center bg-theme-surface relative shrink-0">
              <div className="flex items-center gap-3.5">
                {/* Mobile Back control */}
                <button 
                  onClick={() => setSelectedConvId(null)}
                  className="md:hidden p-2 bg-theme-bg border border-theme-border rounded-xl text-theme-text-primary hover:bg-theme-border transition-all active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Profile photo */}
                <div className="relative cursor-pointer">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-theme-border bg-theme-bg bg-cover bg-center" style={{ backgroundImage: `url(${currentChat.ownerPhoto})` }} />
                  {currentChat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-theme-surface rounded-full shadow-sm" />
                  )}
                </div>

                {/* Name with text context */}
                <div className="font-sans">
                  <div className="flex items-center gap-1.5 flex-row">
                    <span className="text-xs font-black text-theme-text-primary leading-none hover:text-theme-accent transition-colors cursor-pointer font-bold">
                      {currentChat.ownerName}
                    </span>
                    <span className="text-[8px] font-black bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      LANDLORD
                    </span>
                  </div>
                  <div className="text-[10px] text-theme-text-secondary leading-none mt-1 select-none flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span>{currentChat.onlineStatusText || 'Active now'}</span>
                  </div>
                </div>
              </div>

              {/* Right Call & Actions Header tools */}
              <div className="flex items-center gap-2 flex-row">
                <button 
                  onClick={handleStartAudioCall}
                  className="p-2.5 rounded-full border border-theme-border hover:bg-theme-bg text-theme-text-primary transition-all active:scale-95 cursor-pointer"
                  title="Voice Call"
                >
                  <Phone size={14} className="stroke-[2.5]" />
                </button>
                <button 
                  onClick={handleStartVideoCall}
                  className="p-2.5 rounded-full border border-theme-border hover:bg-theme-bg text-theme-text-primary transition-all active:scale-95 cursor-pointer"
                  title="Live Video Walkthrough"
                >
                  <Video size={14} />
                </button>
                <button 
                  onClick={() => setActiveWorkspaceMode('profile')}
                  className="p-2.5 rounded-full border border-theme-border hover:bg-theme-bg text-theme-text-primary transition-all active:scale-95 cursor-pointer"
                  title="View Owner Profile"
                >
                  <Info size={14} />
                </button>
              </div>

            </div>

            {activeWorkspaceMode === 'profile' ? (
              /* --- OWNER PROFILE VIEW --- */
              <div id="owner-profile-submodule" className="flex-1 flex flex-col h-full bg-theme-bg overflow-y-auto">
                {/* Host profile Header */}
                <div className="p-4 border-b border-theme-border/50 bg-theme-surface flex items-center justify-between shrink-0 font-sans">
                  <button 
                    onClick={() => setActiveWorkspaceMode('chat')}
                    className="flex items-center gap-1.5 text-xs font-bold text-theme-text-secondary hover:text-theme-accent transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                    <span>Back to Chat</span>
                  </button>
                  <div className="text-[10px] uppercase font-black tracking-widest text-theme-text-secondary">Owner Profile</div>
                  <div className="w-8 h-8 opacity-0" />
                </div>

                {/* Profile Body content */}
                <div className="p-6 max-w-2xl mx-auto w-full space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-2">
                    {/* Badge and verification */}
                    <div className="md:col-span-5 bg-theme-surface border border-theme-border rounded-[24px] p-6 text-center flex flex-col items-center justify-center shadow-lg relative overflow-hidden font-sans">
                      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-br from-theme-accent/15 to-transparent -z-10" />
                      
                      <div className="relative mb-3.5">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-theme-surface bg-theme-surface shadow-xl flex items-center justify-center">
                          <img src={currentChat.ownerPhoto} alt={currentChat.ownerName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="absolute -bottom-2 -right-1 bg-amber-500 text-stone-900 font-serif text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-theme-border shadow-lg tracking-wider">
                          {getOwnerMetadata(currentChat.ownerName).level}
                        </div>
                      </div>

                      <h2 className="font-serif text-2xl font-black text-theme-text-primary leading-tight">{currentChat.ownerName}</h2>
                      <p className="text-[10px] text-theme-text-secondary font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                        <ShieldCheck size={12} className="text-theme-accent inline shrink-0" />
                        <span>{getOwnerMetadata(currentChat.ownerName).level}</span>
                      </p>
                      <p className="text-xs text-theme-text-secondary font-semibold mt-3">
                        {getOwnerMetadata(currentChat.ownerName).joined}
                      </p>

                      <div className="h-px bg-theme-border/50 w-full my-4" />

                      {/* Trust Badge Indicators */}
                      <div className="w-full space-y-2 text-left bg-theme-bg/40 border border-theme-border/60 rounded-xl p-3">
                        <p className="text-[9px] font-black text-theme-text-secondary uppercase tracking-widest mb-1.5">Trust & Verification</p>
                        <div className="grid grid-cols-1 gap-2 text-[11px] font-semibold text-theme-text-primary">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-[#0095f6]" />
                            <span>✓ Identity Verified</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-[#0095f6]" />
                            <span>✓ Email Verified</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-[#0095f6]" />
                            <span>✓ Mobile Verified</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-[#0095f6]" />
                            <span>✓ Property Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="bg-theme-surface border border-theme-border rounded-[24px] p-5 shadow-sm">
                        <h3 className="text-xs font-black text-theme-text-secondary uppercase tracking-widest mb-4">Owner Statistics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: 'Properties Listed', val: getOwnerMetadata(currentChat.ownerName).listed },
                            { label: 'Properties Active', val: getOwnerMetadata(currentChat.ownerName).active },
                            { label: 'Response Rate', val: getOwnerMetadata(currentChat.ownerName).responseRate, highlight: true },
                            { label: 'Avg Responsiveness', val: getOwnerMetadata(currentChat.ownerName).responseTime, highlight: true },
                            { label: 'Completed Visits', val: getOwnerMetadata(currentChat.ownerName).completedVisits },
                            { label: 'Verified Listings', val: getOwnerMetadata(currentChat.ownerName).verifiedListings }
                          ].map((stat, i) => (
                            <div key={i} className="bg-theme-bg/40 border border-theme-border/30 rounded-2xl p-3 flex flex-col justify-between">
                              <span className="text-[10px] text-theme-text-secondary font-bold uppercase tracking-wider leading-tight">{stat.label}</span>
                              <span className={`text-base font-black tracking-tight mt-1 ${stat.highlight ? 'text-theme-accent' : 'text-theme-text-primary'}`}>{stat.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Privacy mask statement explicitly complying with specs */}
                      <div className="bg-theme-accent-soft p-4 rounded-2xl border border-theme-accent/20 flex gap-2.5 items-start">
                        <Shield size={16} className="text-theme-accent mt-0.5 shrink-0" />
                        <div className="font-sans text-[11px] leading-relaxed">
                          <span className="font-black text-theme-accent block mb-0.5">Secure Shield Encrypted Protection</span>
                          <span className="text-theme-text-secondary/90 font-semibold text-xs">
                            To ensure platform security and avoid fraudulent actions, direct contact details such as exact address coordinates, phone numbers, email keys, or WhatsApp identifiers are protected until booking execution.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Listings Section */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <h3 className="font-serif text-lg font-black text-theme-text-primary tracking-tight">Active Landlord Listings</h3>
                      <p className="text-[11px] text-theme-text-secondary font-semibold font-sans">Explore all properties published by {currentChat.ownerName}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {propertiesList.filter(p => p.owner.name.toLowerCase() === currentChat.ownerName.toLowerCase()).length === 0 ? (
                        <div className="bg-theme-surface border border-theme-border/60 rounded-2xl p-6 text-center font-sans col-span-2">
                          <p className="text-xs font-bold text-theme-text-secondary font-sans">This property is currently the single listed item by this landlord.</p>
                        </div>
                      ) : (
                        propertiesList
                          .filter(p => p.owner.name.toLowerCase() === currentChat.ownerName.toLowerCase())
                          .map((prop) => (
                            <div 
                              key={prop.id}
                              onClick={() => {
                                if (onSelectProperty) {
                                  onSelectProperty(prop.id);
                                }
                              }}
                              className="bg-theme-surface border border-theme-border hover:border-theme-accent rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 group flex flex-col"
                            >
                              <div className="h-28 w-full overflow-hidden bg-theme-bg relative">
                                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                                <div className="absolute top-2 left-2 bg-theme-surface border border-theme-border text-[9px] font-black uppercase px-2 py-0.5 rounded-md text-theme-text-primary">
                                  ₹{prop.price.toLocaleString('en-IN')}/mo
                                </div>
                              </div>
                              <div className="p-3 font-sans flex-1 flex flex-col justify-between">
                                <h4 className="text-xs font-black text-theme-text-primary tracking-tight truncate line-clamp-1 group-hover:text-theme-accent transition-colors">{prop.title}</h4>
                                <span className="text-[10px] text-theme-text-secondary font-bold mt-1 block uppercase tracking-wider">{prop.details}</span>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              /* --- CONVENTIONAL CHAT LAYOUT --- */
              <>
                {/* QUICK COMPACT PROPERTY CONTEXT ANCHOR (TOP OF CHAT) */}
                <div className="px-5 py-2.5 bg-theme-bg/40 border-b border-theme-border/30 flex items-center justify-between gap-3 shrink-0 flex-row">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-theme-border/60">
                  <img src={currentChat.property.image} alt={currentChat.property.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="min-w-0 font-sans">
                  <p className="text-[11px] font-black text-theme-text-primary truncate">{currentChat.property.title}</p>
                  <p className="text-[9px] text-theme-text-secondary font-bold truncate tracking-tight">{currentChat.property.type} • ₹{currentChat.property.price.toLocaleString('en-IN')}/mo</p>
                </div>
              </div>
              {onSelectProperty && (
                <button 
                  onClick={() => onSelectProperty(currentChat.property.id)}
                  className="bg-theme-accent hover:bg-theme-accent-hover text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1 active:scale-95 transition-all text-sans shrink-0 cursor-pointer"
                >
                  <span>View Property</span>
                  <ExternalLink size={10} />
                </button>
              )}
            </div>

            {/* CHAT BUBBLES CONTAINER BODY */}
            <div 
              ref={chatBodyRef}
              className="flex-1 overflow-y-auto px-5 py-6 bg-theme-bg/15 space-y-4"
            >
              {/* Visual guidelines */}
              <div className="max-w-md mx-auto text-center space-y-2 pb-6 select-none">
                <span className="inline-block px-3 py-1 bg-theme-bg/60 border border-theme-border rounded-full text-[9px] text-theme-text-secondary font-bold uppercase tracking-[0.15em]">
                  🛡️ Homstay Verified Connection
                </span>
                <p className="text-[10px] text-theme-text-secondary/80 leading-relaxed font-bold">
                  Zero brokerage, direct landlord dealing. Payments processed inside active leases reflect in your account profile automatically.
                </p>
              </div>

              {/* Rendered group of messages with separators */}
              {Object.entries(groupMessagesByDate(currentChat.messages)).map(([date, msgs]) => (
                <div key={date} className="space-y-4">
                  {/* Timestamp dated separator */}
                  <div className="text-center">
                    <span className="inline-block px-2.5 py-0.5 bg-theme-bg border border-theme-border/40 text-[9px] text-theme-text-secondary/70 font-semibold uppercase tracking-wider rounded-lg">
                      {date}
                    </span>
                  </div>

                  {msgs.map((msg) => {
                    const isMe = msg.senderId === 'tenant';
                    
                    return (
                      <div 
                        key={msg.id}
                        className={`flex gap-2.5 items-end max-w-[85%] ${
                          isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'
                        }`}
                      >
                        {/* Owner profile bubble icon on the left of left messages */}
                        {!isMe && (
                          <div className="w-7 h-7 rounded-full shrink-0 overflow-hidden border border-theme-border select-none bg-cover bg-center" style={{ backgroundImage: `url(${currentChat.ownerPhoto})` }} />
                        )}

                        {/* Chat detail block */}
                        <div className="space-y-1">
                          <div className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed tracking-tight break-words select-all ${
                            isMe 
                              ? 'bg-[#0095f6] text-white rounded-br-sm shadow-md' 
                              : 'bg-theme-surface dark:bg-theme-border/45 text-theme-text-primary border border-theme-border rounded-bl-sm font-sans'
                          }`}>
                            {msg.imageUrl && (
                              <div className="mb-2 max-w-[200px] overflow-hidden rounded-lg shadow-sm">
                                <img src={msg.imageUrl} alt="Attachement" className="w-full h-auto object-cover cursor-pointer hover:opacity-90" referrerPolicy="no-referrer" />
                              </div>
                            )}
                            {msg.text && (
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                            )}
                          </div>

                          {/* Message Status indicators footer */}
                          {isMe && (
                            <div className="flex items-center justify-end gap-1 text-[9px] text-theme-text-secondary/60 select-none font-bold">
                              <span>
                                {new Date(msg.timestamp).toLocaleTimeString(undefined, {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                              <span>
                                {msg.status === 'sending' && (
                                  <span className="w-2.5 h-2.5 border border-theme-text-secondary/60 border-t-transparent rounded-full inline-block animate-spin" />
                                )}
                                {msg.status === 'sent' && (
                                  <Check size={11} className="stroke-[2.5]" />
                                )}
                                {msg.status === 'delivered' && (
                                  <CheckCheck size={11} className="stroke-[2.5]" />
                                )}
                                {msg.status === 'read' && (
                                  <CheckCheck size={11} className="stroke-[2.5] text-[#0095f6]" />
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Simulated Owner Typing animation */}
              {currentChat.typing && (
                <div className="flex gap-2.5 items-end mr-auto max-w-[85%]">
                  <div className="w-7 h-7 rounded-full shrink-0 overflow-hidden border border-theme-border select-none bg-cover bg-center" style={{ backgroundImage: `url(${currentChat.ownerPhoto})` }} />
                  <div className="bg-theme-bg border border-theme-border/60 py-2.5 px-4 rounded-2xl rounded-bl-none text-xs text-theme-text-secondary flex items-center gap-1 font-sans">
                    <span className="text-[10px] font-bold tracking-tight">{currentChat.ownerName} is typing</span>
                    <span className="flex items-center gap-1.5 ml-1">
                      <span className="w-1.5 h-1.5 bg-theme-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-theme-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-theme-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}

            </div>

            {/* INPUT FIXED TOOLBAR BOTTOM BAR */}
            <div className="p-3.5 border-t border-theme-border/60 bg-theme-surface flex flex-col gap-2 shrink-0 relative animate-none">
              
              {/* Simulated image selection preview block before sending */}
              {selectedAttachmentImage && (
                <div className="absolute bottom-[105%] left-4 bg-theme-surface border border-theme-border p-2 rounded-2xl shadow-xl z-20 flex flex-row items-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden border border-theme-border shrink-0">
                    <img src={selectedAttachmentImage} alt="Preview Attachment" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="font-sans text-xs">
                    <p className="font-black text-theme-text-primary">Image loaded</p>
                    <p className="text-[10px] text-theme-text-secondary font-bold">Ready to send</p>
                  </div>
                  <button 
                    onClick={() => setSelectedAttachmentImage(null)}
                    className="p-1.5 hover:bg-red-500/10 text-red-500 rounded-lg ml-2 font-black tracking-wider text-[10px] uppercase cursor-pointer transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Attachment select list panel */}
              {showAttachMenu && (
                <div className="absolute bottom-[105%] left-4 bg-theme-surface border border-theme-border rounded-2xl shadow-xl z-20 p-3.5 w-56 space-y-2.5 font-sans">
                  <p className="text-[9px] font-black text-theme-text-secondary uppercase tracking-widest px-1">Simulate File Upload</p>
                  <div className="grid grid-cols-3 gap-2">
                    {MOCK_ATTACHMENT_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => handleSimulateImageUpload(i)}
                        className="w-full h-12 rounded-lg overflow-hidden border border-theme-border hover:opacity-85 animate-none"
                      >
                        <img src={img} alt="Selection option" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleSimulateImageUpload(Math.floor(Math.random() * 3))}
                    className="w-full py-1.5 bg-theme-accent-soft hover:bg-theme-accent/15 text-theme-accent tracking-wider border border-theme-accent/20 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-colors"
                  >
                    Gallery Pick
                  </button>
                </div>
              )}

              {/* Quick replies professional list panel */}
              {showEmojiPicker && (
                <div className="absolute bottom-[105%] right-4 bg-theme-surface border border-theme-border p-3 rounded-2xl shadow-xl z-20 flex flex-col gap-1.5 w-64 text-left">
                  <span className="text-[9px] font-black uppercase tracking-widest text-theme-text-secondary mb-1 px-1">Quick Replies</span>
                  {[
                    "Is this property still available?",
                    "Can we schedule an in-person tour?",
                    "Is the security deposit negotiable?",
                    "Are maintenance charges included?"
                  ].map((phrase) => (
                    <button 
                      key={phrase}
                      onClick={() => {
                        setInputText(phrase);
                        setShowEmojiPicker(false);
                      }}
                      className="p-2 text-[10px] font-bold text-theme-text-primary hover:bg-theme-accent-soft/35 rounded-lg text-left transition-colors cursor-pointer border border-transparent hover:border-theme-border font-sans"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              )}

              {/* Input block row */}
              <div className="flex items-center gap-2 relative flex-row">
                
                {/* Plus/Attachment toggle tool */}
                <button 
                  onClick={() => {
                    setShowAttachMenu(!showAttachMenu);
                    setShowEmojiPicker(false);
                  }}
                  className={`p-3 rounded-xl border transition-all active:scale-95 shrink-0 hover:bg-theme-bg cursor-pointer ${
                    showAttachMenu ? 'bg-theme-accent border-theme-accent text-white' : 'border-theme-border text-theme-text-secondary/70'
                  }`}
                  title="Upload File"
                >
                  <Paperclip size={16} />
                </button>

                {/* Text bar input */}
                <div className="flex-grow flex relative flex-row items-center bg-theme-bg border border-theme-border/80 focus-within:border-theme-accent rounded-xl px-3 transition-colors">
                  <input 
                    type="text" 
                    placeholder="Message..." 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    className="w-full bg-transparent border-none text-xs text-theme-text-primary placeholder-theme-text-secondary/60 focus:outline-none focus:ring-0 py-3.5 block font-sans select-all font-semibold"
                  />
                  
                  {/* Smiley/emoji click button inside list */}
                  <button 
                    onClick={() => {
                      setShowEmojiPicker(!showEmojiPicker);
                      setShowAttachMenu(false);
                    }}
                    className="p-1.5 rounded-lg text-theme-text-secondary/60 hover:text-theme-accent transition-all shrink-0 cursor-pointer"
                    title="Quick Replies"
                  >
                    <Zap size={14} className="stroke-[2.5]" />
                  </button>
                </div>

                {/* Send button */}
                <button 
                  onClick={handleSendMessage}
                  className="p-3.5 rounded-xl bg-theme-accent hover:bg-theme-accent-hover text-white flex items-center justify-center shadow-md shadow-theme-accent/20 active:scale-95 transition-all shrink-0 cursor-pointer"
                  title="Send"
                >
                  <Send size={15} />
                </button>

              </div>

            </div>
          </>
        )}

          {/* CALL USER INTERFACE OVERLAY */}
          {activeCall && (
            <div className="absolute inset-0 bg-theme-bg/95 backdrop-blur-sm z-50 flex flex-col font-sans transition-all">
              {activeCall.status === 'checking' && (
                /* Pre-Call Device Checker step */
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
                  <div className="w-16 h-16 bg-theme-accent/10 border border-theme-accent/20 rounded-full flex items-center justify-center animate-pulse text-theme-accent">
                    <SlidersHorizontal size={28} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-black text-theme-text-primary uppercase tracking-wider mb-2">Pre-Call Device Check</h3>
                    <p className="text-xs text-theme-text-secondary font-bold max-w-sm mx-auto">Verifying camera, microphone and speaker access inside your browser before connection...</p>
                  </div>

                  <div className="bg-theme-surface border border-theme-border rounded-[24px] p-4 max-w-xs w-full text-left space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-theme-text-secondary font-bold">Microphone Status</span>
                      <span className="text-theme-accent font-black tracking-wider animate-pulse flex items-center gap-1">
                        <CircleDot size={10} className="text-theme-accent" />
                        Checking...
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-theme-text-secondary font-bold">Speaker Status</span>
                      <span className="text-green-500 font-extrabold flex items-center gap-1">
                        <CheckCircle2 size={11} className="text-green-500" />
                        Ready
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-theme-text-secondary font-bold">Video Input</span>
                      <span className="text-theme-text-secondary/70 font-semibold">{activeCall.type === 'video' ? 'Checking Camera...' : 'Not Required'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeCall.status === 'denied' && (
                /* Device permission denied block with override options */
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
                  <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
                    <VideoOff size={28} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-black text-theme-text-primary uppercase tracking-wider mb-2">Device Access Issue</h3>
                    <p className="text-xs text-theme-text-secondary font-bold max-w-xs mx-auto leading-relaxed">
                      Camera or Microphone access was restricted. Grant authorization to proceed or bypass manually for testing.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 max-w-xs w-full">
                    <button 
                      onClick={handleStartVideoCall}
                      className="py-3 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Retry Authorization
                    </button>
                    <button 
                      onClick={handleSimulateGrantPermissions}
                      className="py-3 border border-theme-border text-theme-text-primary hover:bg-theme-surface rounded-xl text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Bypass Check / Settings
                    </button>
                  </div>
                </div>
              )}

              {activeCall.status === 'active' && activeCall.type === 'audio' && (
                /* VOICE CALL DISPLAY SCREEN */
                <div className="flex-1 flex flex-col items-center justify-between p-8 font-sans">
                  <div className="text-center font-sans mt-8">
                    <span className="inline-block px-3 py-1 bg-green-500/10 text-green-600 text-[9px] font-black rounded-full uppercase tracking-widest border border-green-500/20 mb-3.5">
                      SECURE AUDIO RENTAL WALKTHROUGH
                    </span>
                    <h4 className="text-xs text-theme-text-secondary font-semibold uppercase tracking-wider">Homstay VoIP Voice Room</h4>
                  </div>

                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-theme-accent/20 rounded-full scale-125 animate-ping" />
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-theme-accent bg-theme-surface shadow-2xl relative z-10">
                        <img src={currentChat.ownerPhoto} alt={currentChat.ownerName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-serif text-2xl font-black text-theme-text-primary tracking-tight leading-tight">{currentChat.ownerName}</h3>
                      <p className="text-xs text-theme-accent font-extrabold mt-1 tracking-tight truncate max-w-xs">{currentChat.property.title}</p>
                      <p className="text-sm font-mono text-theme-text-secondary mt-3 font-semibold">{formatDuration(activeCall.duration)}</p>
                    </div>
                  </div>

                  <div className="w-full max-w-sm flex items-center justify-center gap-6 pb-8">
                    <button 
                      onClick={() => setActiveCall(p => p ? { ...p, isMuted: !p.isMuted } : null)}
                      className={`p-4 rounded-full border transition-all active:scale-90 cursor-pointer ${
                        activeCall.isMuted 
                          ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20' 
                          : 'border-theme-border text-theme-text-primary hover:bg-theme-surface'
                      }`}
                      title={activeCall.isMuted ? "Unmute" : "Mute Mic"}
                    >
                      {activeCall.isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>

                    <button 
                      onClick={() => setActiveCall(null)}
                      className="p-5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/30 active:scale-90 transition-all cursor-pointer"
                      title="End Call"
                    >
                      <Phone size={22} className="rotate-[135deg]" />
                    </button>

                    <button 
                      onClick={() => setActiveCall(p => p ? { ...p, isSpeakerOn: !p.isSpeakerOn } : null)}
                      className={`p-4 rounded-full border transition-all active:scale-90 cursor-pointer ${
                        activeCall.isSpeakerOn 
                          ? 'bg-theme-accent border-theme-accent text-white shadow-lg shadow-theme-accent/20' 
                          : 'border-theme-border text-theme-text-primary hover:bg-theme-surface'
                      }`}
                      title="Speaker Mode"
                    >
                      <Volume2 size={18} className={activeCall.isSpeakerOn ? "opacity-100" : "opacity-60"} />
                    </button>
                  </div>
                </div>
              )}

              {activeCall.status === 'active' && activeCall.type === 'video' && (
                /* VIDEO CALL DISPLAY SCREEN */
                <div className="flex-1 flex flex-col justify-between p-6 relative bg-black select-none overflow-hidden rounded-2xl">
                  
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 z-10" />
                    
                    {activeCall.isSpeakerOn ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center font-sans space-y-3 z-20">
                          <div className="w-20 h-20 bg-theme-surface/10 border border-theme-surface/20 rounded-full flex items-center justify-center text-theme-text-secondary mx-auto">
                            <Slash size={32} />
                          </div>
                          <p className="text-xs text-theme-text-secondary/80 uppercase font-black tracking-widest">{currentChat.ownerName} has camera disabled</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full relative">
                        <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200" alt="Walkthrough Feed" className="w-full h-full object-cover opacity-65" referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="bg-black/60 backdrop-blur-md rounded-2xl p-3 border border-white/10 max-w-xs font-sans">
                      <div className="flex items-center gap-1.5 flex-row">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-ping shrink-0" />
                        <h4 className="text-[10px] uppercase font-black text-white tracking-widest leading-none">Live Stream Walkthrough</h4>
                      </div>
                      <p className="text-xs text-stone-200 mt-1 font-semibold truncate">{currentChat.ownerName}</p>
                      <p className="text-[10px] text-stone-300 font-bold truncate mt-0.5">{currentChat.property.title}</p>
                    </div>

                    <div className="w-24 h-32 bg-stone-900 border border-white/20 rounded-xl overflow-hidden shadow-2xl shrink-0">
                      <div className="w-full h-full flex items-center justify-center text-center relative">
                        <div className="absolute inset-0 bg-stone-900 z-10 flex flex-col items-center justify-center">
                          <Camera size={14} className="text-stone-500" />
                          <span className="text-[8px] text-stone-500 font-bold uppercase tracking-wider mt-1">Local Feed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 text-center select-none pt-12">
                    <span className="inline-block px-3 py-1 bg-black/60 border border-white/10 rounded-full font-mono text-sm text-stone-200 font-extrabold shadow-lg">
                      {formatDuration(activeCall.duration)}
                    </span>
                  </div>

                  <div className="relative z-10 flex items-center justify-center gap-4 py-2 bg-black/40 border border-white/15 rounded-3xl max-w-sm mx-auto w-full backdrop-blur-md px-4">
                    <button 
                      onClick={() => setActiveCall(p => p ? { ...p, isSpeakerOn: !p.isSpeakerOn } : null)}
                      className={`p-3 rounded-full hover:scale-105 active:scale-90 transition-all cursor-pointer ${
                        activeCall.isSpeakerOn 
                          ? 'bg-[#ea4335] text-white shadow-md' 
                          : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                      }`}
                      title={activeCall.isSpeakerOn ? "Turn Camera On" : "Turn Camera Off"}
                    >
                      {activeCall.isSpeakerOn ? <VideoOff size={16} /> : <Video size={16} />}
                    </button>

                    <button 
                      onClick={() => setActiveCall(p => p ? { ...p, isMuted: !p.isMuted } : null)}
                      className={`p-3 rounded-full hover:scale-105 active:scale-90 transition-all cursor-pointer ${
                        activeCall.isMuted 
                          ? 'bg-[#ea4335] text-white shadow-md' 
                          : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                      }`}
                      title={activeCall.isMuted ? "Unmute Mic" : "Mute Mic"}
                    >
                      {activeCall.isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>

                    <button 
                      onClick={() => setActiveCall(null)}
                      className="p-3 px-5 rounded-3xl bg-[#ea4335] hover:bg-[#d93025] text-white shadow-xl shadow-red-600/20 active:scale-95 transition-all text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                      title="End Call"
                    >
                      <Phone size={14} className="rotate-[135deg]" />
                      <span>Hang Up</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* MUTE NOTIFICATIONS CONFIRMATION MODAL */}
          {showMuteModalId && (
            <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
              <div 
                className="bg-theme-surface border border-theme-border rounded-[28px] p-6 max-w-sm w-full shadow-2xl animate-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-12 bg-theme-accent/10 rounded-full flex items-center justify-center text-theme-accent mb-4">
                  <VolumeX size={22} className="stroke-[2]" />
                </div>
                <h3 className="font-serif text-lg font-black text-theme-text-primary leading-tight">Mute Notifications?</h3>
                <p className="text-xs text-theme-text-secondary mt-1.5 font-semibold">Choose how long to disable sound alerts and banner updates for this connection.</p>
                
                <div className="my-5 space-y-2 text-xs font-bold text-theme-text-primary">
                  {[
                    { label: 'All (Chats & Calls)', id: 'All' },
                    { label: 'Chats Only', id: 'Chats Only' },
                    { label: 'Calls Only', id: 'Calls Only' },
                  ].map((opt) => (
                    <label 
                      key={opt.id} 
                      className={`flex items-center gap-2.5 p-3 rounded-xl border border-theme-border/60 hover:bg-theme-bg cursor-pointer transition-colors ${
                        tempMuteType === opt.id ? 'bg-theme-accent/5 border-theme-accent text-theme-accent' : ''
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="mute-duration" 
                        value={opt.id}
                        checked={tempMuteType === opt.id}
                        onChange={() => setTempMuteType(opt.id as any)}
                        className="text-theme-accent focus:ring-theme-accent focus:ring-offset-0 cursor-pointer"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowMuteModalId(null)}
                    className="flex-1 py-3 text-xs font-black text-theme-text-secondary hover:bg-theme-bg border border-theme-border rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleConfirmMute(showMuteModalId, tempMuteType)}
                    className="flex-1 py-3 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DELETE CHAT CONFIRMATION MODAL */}
          {showDeleteModalId && (
            <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
              <div 
                className="bg-theme-surface border border-theme-border rounded-[28px] p-6 max-w-sm w-full shadow-2xl animate-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-4">
                  <Trash2 size={22} className="stroke-[2]" />
                </div>
                <h3 className="font-serif text-lg font-black text-theme-text-primary leading-tight">Delete Chat Room?</h3>
                <p className="text-xs text-theme-text-secondary mt-1.5 leading-relaxed font-semibold">
                  Are you absolutely sure you want to delete this chat with <span className="font-bold text-theme-text-primary">
                    {conversations.find(c => c.id === showDeleteModalId)?.ownerName}
                  </span>? All messages will be permanently eliminated. This action is irreversible.
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <button 
                    onClick={() => setShowDeleteModalId(null)}
                    className="flex-1 py-3 text-xs font-black text-theme-text-secondary hover:bg-theme-bg border border-theme-border rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Discard
                  </button>
                  <button 
                    onClick={() => handleConfirmDelete(showDeleteModalId)}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Delete Chat
                  </button>
                </div>
              </div>
            </div>
          )}

          </div>
        ) : (
          <div className="p-8 text-center text-sans h-full flex flex-col items-center justify-center max-w-sm mx-auto select-none bg-theme-bg/10">
            <div className="w-16 h-16 bg-theme-accent/15 border border-theme-accent/25 text-theme-accent rounded-[24px] flex items-center justify-center mb-4">
              <MessageSquare size={32} />
            </div>
            <h3 className="font-serif text-2xl font-black text-theme-text-primary mb-1">Select a Conversation</h3>
            <p className="text-xs text-theme-text-secondary leading-relaxed font-bold">
              Connect with verified property landlords directly! Choose an active log on the left or tap "Contact Owner" from any rental details page to begin chatting.
            </p>
            {onBackToExplore && (
              <button 
                onClick={onBackToExplore}
                className="mt-6 bg-theme-accent hover:bg-theme-accent-hover text-white px-6 py-3.5 rounded-xl text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                Explore Properties
              </button>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
