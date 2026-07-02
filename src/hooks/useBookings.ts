import { useState, useEffect } from 'react';
import { supabase } from '@inhaby/shared';
import { useAuth } from '../context/TenantAuthContext';
import { ActiveTenancy, PendingBooking, PastBooking } from '../types';

export function useBookings() {
  const { user } = useAuth();
  const [activeTenancy, setActiveTenancy] = useState<ActiveTenancy | null>(null);
  const [pendingBookings, setPendingBookings] = useState<PendingBooking[]>([]);
  const [pastBookings, setPastBookings] = useState<PastBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // 1. Fetch active bookings (status: active or confirmed)
      const { data: activeData, error: activeErr } = await supabase
        .from('bookings')
        .select('*, property:properties(*, owner:owner_profiles(*))')
        .eq('tenant_id', user.id)
        .in('status', ['confirmed', 'active'])
        .order('created_at', { ascending: false });

      if (activeErr) console.error('Error active bookings:', activeErr);
      else if (activeData && activeData.length > 0) {
        const primary = activeData[0];
        const prop = primary.property;
        
        setActiveTenancy({
          propertyTitle: prop.title,
          location: `${prop.address_line ? prop.address_line + ', ' : ''}${prop.locality || ''}, ${prop.city || ''}`,
          price: Number(primary.rent_amount),
          leaseStart: new Date(primary.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          leaseDuration: "11 Months",
          deposit: Number(primary.deposit_amount || 0),
          cycle: "Monthly (Payable by 5th)",
          nextDue: "05 Jun, 2026",
          owner: {
            name: prop.owner?.name || "Owner",
            phone: prop.owner?.phone || "+91 90000 00000",
            email: prop.owner?.email || "owner@inhaby.com",
            image: prop.owner?.avatar_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
          },
          bills: [
            { id: 'b1', name: 'Monthly Rent', amount: Number(primary.rent_amount), dueDate: '05 Jun, 2026', status: 'Pending' },
            { id: 'b2', name: 'Apartment Maintenance', amount: Number(prop.maintenance || 0), dueDate: '01 Jun, 2026', status: 'Pending' },
            { id: 'b3', name: 'WiFi & Power Charges', amount: 1200, dueDate: '10 Jun, 2026', status: 'Pending' }
          ]
        });
      } else {
        setActiveTenancy(null);
      }

      // 2. Fetch pending bookings
      const { data: pendingData } = await supabase
        .from('bookings')
        .select('*, property:properties(*)')
        .eq('tenant_id', user.id)
        .eq('status', 'pending');

      if (pendingData) {
        setPendingBookings(pendingData.map(b => ({
          id: b.id,
          title: b.property?.title || 'Unknown Property',
          location: b.property?.city || 'Bengaluru',
          price: Number(b.rent_amount),
          status: 'Awaiting Host Review',
          appliedOn: new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=500'
        })));
      }

      // 3. Fetch past bookings
      const { data: pastData } = await supabase
        .from('bookings')
        .select('*, property:properties(*)')
        .eq('tenant_id', user.id)
        .in('status', ['completed', 'cancelled']);

      if (pastData) {
        setPastBookings(pastData.map(b => ({
          id: b.id,
          title: b.property?.title || 'Unknown Property',
          location: b.property?.city || 'Bengaluru',
          price: Number(b.rent_amount),
          duration: 'Closed',
          status: b.status === 'completed' ? 'Closed Successfully' : 'Cancelled',
          image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=500'
        })));
      }

    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setActiveTenancy(null);
      setPendingBookings([]);
      setPastBookings([]);
      return;
    }
    fetchBookings();
  }, [user]);

  const payBill = (billId: string) => {
    if (!activeTenancy) return;
    setActiveTenancy(prev => {
      if (!prev) return null;
      const updatedBills = prev.bills.map(bill => {
        if (bill.id === billId) {
          return { ...bill, status: 'Paid' as const };
        }
        return bill;
      });
      return { ...prev, bills: updatedBills };
    });
  };

  return {
    activeTenancy,
    pendingBookings,
    pastBookings,
    payBill,
    loading
  };
}
