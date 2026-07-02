import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@inhaby/shared';
import { useAuth } from '../context/TenantAuthContext';
import { Notification } from '../types';

export interface ToastInfo {
  message: string;
  type: 'success' | 'error' | 'info';
}

export function useNotifications() {
  const { user } = useAuth();
  const [toast, setToast] = useState<ToastInfo | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Show a standard toast alert
  const showToast = useCallback((msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching notifications:', error);
      } else if (data) {
        setNotifications(data.map(n => ({
          id: n.id,
          type: n.category || 'SYSTEM',
          title: n.title,
          description: n.message,
          time: new Date(n.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
          timestamp: new Date(n.created_at).getTime(),
          read: n.is_read,
          actionTab: 'ACCOUNT'
        })));
      }
    } catch (err) {
      console.error('Error loading notifications:', err);
    }
  };

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }
    fetchNotifications();
  }, [user]);

  const addNotification = useCallback(async (
    type: string,
    title: string,
    description: string,
    actionId?: string,
    actionTab?: string
  ) => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          title,
          message: description,
          category: type,
          is_read: false
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setNotifications(prev => [
          {
            id: data.id,
            type: data.category || 'SYSTEM',
            title: data.title,
            description: data.message,
            time: 'Just now',
            timestamp: Date.now(),
            read: false,
            actionTab: actionTab || 'ACCOUNT'
          },
          ...prev
        ]);
        showToast(`${title}: ${description}`);
      }
    } catch (err) {
      console.error('Error adding notification:', err);
    }
  }, [user, showToast]);

  const markAsRead = useCallback(async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    try {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);
    } catch (err) {
      console.error('Error marking notification read:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!user) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id);
      showToast('All notifications marked as read.');
    } catch (err) {
      console.error('Error marking all read:', err);
    }
  }, [user, showToast]);

  const clearNotifications = useCallback(async () => {
    if (!user) return;
    setNotifications([]);
    try {
      await supabase
        .from('notifications')
        .delete()
        .eq('user_id', user.id);
      showToast('Notification center cleared.');
    } catch (err) {
      console.error('Error clearing notifications:', err);
    }
  }, [user, showToast]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    toast,
    setToast,
    showToast,
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications
  };
}
