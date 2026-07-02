import { supabase } from '@inhaby/shared';
import { Property, Section } from '../../types';

export function mapSupabasePropertyToModel(dbProp: any): Property {
  const coverImage = dbProp.images?.find((img: any) => img.is_cover)?.url || dbProp.images?.[0]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400';
  // Use slug if available, fall back to id so navigation never silently fails
  const slug = dbProp.slug || dbProp.id;
  return {
    id: dbProp.id,
    slug,
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
    area: dbProp.locality || '',
    city: dbProp.city || '',
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
  async getPropertyBySlug(slug: string): Promise<Property | null> {
    // First try slug lookup
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        images: property_images(*),
        amenities: amenities(*),
        owner: owner_profiles(*)
      `)
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return mapSupabasePropertyToModel(data);
    }

    // Fall back to id lookup (for properties that have no slug set,
    // where we use the id as the slug in the URL)
    const { data: dataById, error: errorById } = await supabase
      .from('properties')
      .select(`
        *,
        images: property_images(*),
        amenities: amenities(*),
        owner: owner_profiles(*)
      `)
      .eq('id', slug)
      .maybeSingle();

    if (errorById || !dataById) {
      console.error('Error fetching property by slug/id:', error || errorById);
      return null;
    }
    return mapSupabasePropertyToModel(dataById);
  },

  async getPropertyById(id: string): Promise<Property | null> {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        images: property_images(*),
        amenities: amenities(*),
        owner: owner_profiles(*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      console.error('Error fetching property by id:', error);
      return null;
    }
    return mapSupabasePropertyToModel(data);
  },

  async getHomeSections(category: string, area: string, city: string): Promise<Section[]> {
    const fetchSectionsData = async (filterArea?: string, filterCity?: string) => {
      let query = supabase
        .from('properties')
        .select(`
          *,
          images: property_images(*),
          amenities: amenities(*),
          owner: owner_profiles(*)
        `)
        .eq('status', 'approved');

      if (filterCity) {
        query = query.ilike('city', `%${filterCity}%`);
      }
      if (filterArea) {
        query = query.ilike('locality', `%${filterArea}%`);
      }
      if (category && category !== 'all') {
        const type = category === 'homes' ? 'House' : category === 'rooms' ? 'Room' : category === 'apartments' ? 'Apartment' : category === 'pgs' ? 'PG' : category === 'villas' ? 'Villa' : '';
        if (type) {
          query = query.eq('property_type', type);
        }
      }
      const { data, error } = await query;
      return { data: data || [], error };
    };

    let { data: properties, error } = await fetchSectionsData(area, city);
    
    // Fallback: If area filter returns zero properties and an area was provided, try querying just the city
    if ((error || properties.length === 0) && area && city) {
      const fallbackResult = await fetchSectionsData(undefined, city);
      if (!fallbackResult.error && fallbackResult.data.length > 0) {
        properties = fallbackResult.data;
      }
    }

    if (error && properties.length === 0) {
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
    const fetchPropertiesData = async (filterArea?: string, filterCity?: string) => {
      let query = supabase
        .from('properties')
        .select(`
          *,
          images: property_images(*),
          amenities: amenities(*),
          owner: owner_profiles(*)
        `, { count: 'exact' })
        .eq('status', 'approved');

      if (filterCity) {
        query = query.ilike('city', `%${filterCity}%`);
      }
      if (filterArea) {
        query = query.ilike('locality', `%${filterArea}%`);
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
      return { data: data || [], error, count: count || 0 };
    };

    const area = params.area || undefined;
    const city = params.city || undefined;

    let { data, error, count } = await fetchPropertiesData(area, city);

    // Fallback: If area filter returns 0 properties and an area was requested, query just the city
    if ((error || data.length === 0) && area && city) {
      const fallbackResult = await fetchPropertiesData(undefined, city);
      if (!fallbackResult.error && fallbackResult.data.length > 0) {
        data = fallbackResult.data;
        count = fallbackResult.count;
      }
    }

    if (error && data.length === 0) {
      console.error('Error fetching properties list:', error);
      return { items: [], totalPages: 1 };
    }

    const limit = Number(params.limit || 20);
    return {
      items: data.map(p => mapSupabasePropertyToModel(p)),
      totalPages: Math.ceil(count / limit)
    };
  }
};
