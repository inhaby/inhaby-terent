import { supabase } from '@inhaby/shared';
import { Property, Section } from '../../types';

export function mapSupabasePropertyToModel(dbProp: any): Property {
  const coverImage = dbProp.images?.find((img: any) => img.is_cover)?.url || dbProp.images?.[0]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400';
  return {
    id: dbProp.id,
    title: dbProp.title,
    image: coverImage,
    images: dbProp.images?.map((img: any) => img.url) || [coverImage],
    tag: dbProp.is_featured ? 'PREMIUM' : undefined,
    details: `${dbProp.bedrooms} BHK • ${dbProp.bathrooms} Bath • ${dbProp.area_sqft || 0} sq. ft.`,
    description: dbProp.description || '',
    price: Number(dbProp.rent),
    originalPrice: Number(dbProp.rent) * 1.1,
    discount: '10% off',
    bedrooms: dbProp.bedrooms,
    furnished: dbProp.furnishing === 'Fully Furnished',
    category: dbProp.property_type === 'PG' ? 'pgs' : dbProp.property_type === 'Villa' ? 'villas' : dbProp.property_type === 'House' ? 'homes' : dbProp.property_type === 'Room' ? 'rooms' : 'apartments',
    location: `${dbProp.address_line ? dbProp.address_line + ', ' : ''}${dbProp.locality || ''}, ${dbProp.city || ''}`,
    amenities: dbProp.amenities?.map((a: any) => ({ icon: 'Zap', label: a.name })) || [],
    rating: 4.5,
    reviewCount: 12,
    maintenanceInfo: dbProp.maintenance > 0 ? `Maintenance: ₹${dbProp.maintenance}/mo` : 'Included',
    badges: ['ZERO BROKERAGE'],
    offers: ['No deposit scheme'],
    configuration: `${dbProp.bedrooms} BHK`,
    size: `${dbProp.area_sqft || 0} sq. ft.`,
    floor: `${dbProp.floor || 1} Floor`,
    facing: dbProp.facing || 'East',
    latitude: dbProp.coordinates?.lat,
    longitude: dbProp.coordinates?.lng,
    verification_status: dbProp.status === 'approved' ? 'verified' : 'unverified',
    property_type: dbProp.property_type,
    owner: {
      name: dbProp.owner?.name || 'Owner',
      image: dbProp.owner?.avatar_url || 'https://i.pravatar.cc/150',
      verified: dbProp.owner?.is_verified || false,
      activeSince: 'Recently'
    },
    ownerId: dbProp.owner_id,
    createdAt: dbProp.created_at,
    updatedAt: dbProp.updated_at
  };
}

export const propertyService = {
  async getHomeSections(category: string, area: string, city: string): Promise<Section[]> {
    let query = supabase
      .from('properties')
      .select(`
        *,
        images: property_images(*),
        amenities: amenities(*),
        owner: owner_profiles(*)
      `)
      .eq('status', 'approved');

    if (city) {
      query = query.ilike('city', `%${city}%`);
    }
    if (area) {
      query = query.ilike('locality', `%${area}%`);
    }
    if (category && category !== 'all') {
      const type = category === 'homes' ? 'House' : category === 'rooms' ? 'Room' : category === 'apartments' ? 'Apartment' : category === 'pgs' ? 'PG' : category === 'villas' ? 'Villa' : '';
      if (type) {
        query = query.eq('property_type', type);
      }
    }

    const { data: properties, error } = await query;
    if (error || !properties) {
      console.error('Error fetching home sections:', error);
      return [];
    }

    const items = properties.map(p => mapSupabasePropertyToModel(p));

    return [
      { id: 'sizzling', title: 'Sizzling Deals', type: 'carousel', items: items.slice(0, 5), actionText: 'VIEW ALL' },
      { id: 'grid-1', title: 'Top Rated Homes', type: 'grid', items: items.filter(i => i.category === 'homes').slice(0, 4), actionText: 'VIEW ALL' },
      { id: 'list-1', title: 'Budget Rooms', type: 'compact-list', items: items.filter(i => i.category === 'rooms').slice(0, 4), actionText: 'VIEW ALL' },
      { id: 'feed-1', title: 'Fresh Listings', type: 'feed', items: items.slice(0, 5), actionText: 'VIEW ALL' }
    ];
  },

  async getProperties(params: Record<string, string>): Promise<{ items: Property[]; totalPages: number }> {
    let query = supabase
      .from('properties')
      .select(`
        *,
        images: property_images(*),
        amenities: amenities(*),
        owner: owner_profiles(*)
      `, { count: 'exact' })
      .eq('status', 'approved');

    if (params.city) {
      query = query.ilike('city', `%${params.city}%`);
    }
    if (params.category && params.category !== 'all') {
      const type = params.category === 'homes' ? 'House' : params.category === 'rooms' ? 'Room' : params.category === 'apartments' ? 'Apartment' : params.category === 'pgs' ? 'PG' : params.category === 'villas' ? 'Villa' : '';
      if (type) {
        query = query.eq('property_type', type);
      }
    }
    if (params.minPrice) {
      query = query.gte('rent', Number(params.minPrice));
    }
    if (params.maxPrice) {
      query = query.lte('rent', Number(params.maxPrice));
    }

    const page = Number(params.page || 1);
    const limit = Number(params.limit || 20);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.range(from, to);

    if (params.sortBy === 'price-low') {
      query = query.order('rent', { ascending: true });
    } else if (params.sortBy === 'price-high') {
      query = query.order('rent', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error, count } = await query;
    if (error || !data) {
      console.error('Error fetching properties list:', error);
      return { items: [], totalPages: 1 };
    }

    return {
      items: data.map(p => mapSupabasePropertyToModel(p)),
      totalPages: Math.ceil((count || 0) / limit)
    };
  }
};
