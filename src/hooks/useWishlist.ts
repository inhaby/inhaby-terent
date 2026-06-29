import { useState, useMemo, useCallback, useEffect } from 'react';
import { supabase } from '@inhaby/shared';
import { useAuth } from '../context/TenantAuthContext';
import { Property } from '../types';

export function useWishlist() {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [wishlistSort, setWishlistSort] = useState<'price-low' | 'price-high' | 'rating' | 'name'>('price-low');

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('property_id')
        .eq('tenant_id', user.id);

      if (error) {
        console.error('Error fetching favorites:', error);
      } else if (data) {
        setSavedIds(new Set(data.map(item => item.property_id)));
      }
    } catch (err) {
      console.error('Error loading wishlist:', err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const toggleSave = useCallback(async (id: string) => {
    if (!user) return;

    setSavedIds(prev => {
      const next = new Set(prev);
      const isSaving = !next.has(id);
      
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      // Perform background update
      (async () => {
        if (isSaving) {
          await supabase
            .from('favorites')
            .insert({ tenant_id: user.id, property_id: id });
        } else {
          await supabase
            .from('favorites')
            .delete()
            .eq('tenant_id', user.id)
            .eq('property_id', id);
        }
      })();

      return next;
    });
  }, [user]);

  const getSortedWishlist = useCallback((properties: Property[]) => {
    const saved = properties.filter(p => savedIds.has(p.id));
    const list = [...saved];
    if (wishlistSort === 'price-low') {
      return list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (wishlistSort === 'price-high') {
      return list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (wishlistSort === 'rating') {
      return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (wishlistSort === 'name') {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [savedIds, wishlistSort]);

  return {
    savedIds,
    toggleSave,
    wishlistSort,
    setWishlistSort,
    getSortedWishlist,
    wishlistCount: savedIds.size
  };
}
