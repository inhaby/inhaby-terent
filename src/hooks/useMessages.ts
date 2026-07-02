import { useState, useEffect } from 'react';
import { supabase } from '@inhaby/shared';
import { useAuth } from '../context/TenantAuthContext';

export function useMessages() {
  const { user } = useAuth();
  const [unreadChatsCount, setUnreadChatsCount] = useState<number>(0);
  const [openMsgPropertyId, setOpenMsgPropertyId] = useState<string | null>(null);
  const [isMobileChatActive, setIsMobileChatActive] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setUnreadChatsCount(0);
      setOpenMsgPropertyId(null);
      setIsMobileChatActive(false);
      return;
    }

    const fetchUnreadCount = async () => {
      const { data: convs, error } = await supabase
        .from('conversations')
        .select('id')
        .or(`tenant_id.eq.${user.id},owner_id.eq.${user.id}`);

      if (error || !convs) return;

      const convIds = convs.map(c => c.id);
      if (convIds.length === 0) {
        setUnreadChatsCount(0);
        return;
      }

      const { count, error: countErr } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .in('conversation_id', convIds)
        .neq('sender_id', user.id);

      if (!countErr && count !== null) {
        setUnreadChatsCount(count);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 5000);
    return () => clearInterval(interval);
  }, [user]);

  return {
    unreadChatsCount,
    setUnreadChatsCount,
    openMsgPropertyId,
    setOpenMsgPropertyId,
    isMobileChatActive,
    setIsMobileChatActive
  };
}
