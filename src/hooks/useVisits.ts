import { useState, useEffect } from 'react';
import { supabase } from '@inhaby/shared';
import { useAuth } from '../context/TenantAuthContext';
import { VisitRequest } from '../types';

export function useVisits() {
  const { user, profile } = useAuth();
  const [visitRequests, setVisitRequests] = useState<VisitRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVisits = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('visits')
        .select('*, property:properties(title)')
        .eq('tenant_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching visits:', error);
      } else if (data) {
        setVisitRequests(data.map(v => ({
          id: v.id,
          propertyId: v.property_id,
          tenantName: v.tenant_name || profile?.name || 'Tenant',
          date: v.date,
          time: v.time,
          status: (v.status || 'pending').toLowerCase() as any,
          rejectionReason: v.rejection_reason || undefined,
          message: v.notes || ''
        })));
      }
    } catch (err) {
      console.error('Error loading visits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, [user]);

  const addVisitRequest = async (request: Omit<VisitRequest, 'id'>) => {
    if (!user) {
      return { success: false, error: 'User is not logged in' };
    }

    if (!request.date) {
      return { success: false, error: 'Viewing date is required.' };
    }
    if (!request.time) {
      return { success: false, error: 'Viewing time slot is required.' };
    }

    try {
      const { data: propData, error: propError } = await supabase
        .from('properties')
        .select('title, owner_id, owner:owner_profiles(name)')
        .eq('id', request.propertyId)
        .single();

      if (propError || !propData) {
        console.error('Error fetching property details for visit request:', propError);
        return { success: false, error: propError?.message || 'Property not found' };
      }

      const newVisit = {
        tenant_id: user.id,
        tenant_name: request.tenantName || profile?.name || 'Tenant',
        owner_id: propData.owner_id,
        owner_name: (propData.owner as any)?.name || 'Owner',
        property_id: request.propertyId,
        property_title: propData.title,
        date: request.date,
        time: request.time,
        type: 'In-person' as const,
        status: 'pending' as const,
        notes: request.message || ''
      };

      console.log("Supabase insert payload:", newVisit);

      const { data, error } = await supabase
        .from('visits')
        .insert(newVisit)
        .select()
        .single();

      console.log("Supabase insert response data:", data, "error:", error);

      if (error) {
        console.error('Supabase insertion error:', error);
        return { success: false, error: error.message };
      }

      if (data) {
        setVisitRequests(prev => [
          {
            id: data.id,
            propertyId: data.property_id,
            tenantName: data.tenant_name,
            date: data.date,
            time: data.time,
            status: 'pending',
            message: data.notes || ''
          },
          ...prev
        ]);
        return { success: true, data };
      }
      return { success: false, error: 'Failed to create visit request (No data returned)' };
    } catch (err: any) {
      console.error('Error creating visit request:', err);
      return { success: false, error: err?.message || 'Unexpected error occurred' };
    }
  };

  return {
    visitRequests,
    setVisitRequests,
    addVisitRequest,
    loading
  };
}
