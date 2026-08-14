import { supabase, getThumbnailUrl, getGalleryUrl, getAvatarUrl } from '@inhaby/shared';
import { Property, Section } from '../../types';

export function mapSupabasePropertyToModel(dbProp: any): Property {
  const mediaList = dbProp.property_media || dbProp.images || [];
  
  // Sort by sort_order
  const sortedMediaList = [...mediaList].sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));

  const rawCoverUrl = sortedMediaList.find((img: any) => img.is_cover || img.is_cover === true)?.public_url || 
                      sortedMediaList.find((img: any) => img.is_cover || img.is_cover === true)?.url || 
                      sortedMediaList[0]?.public_url || 
                      sortedMediaList[0]?.url;
  const coverImage = rawCoverUrl ? getThumbnailUrl(rawCoverUrl) : null;
  
  // Use slug if available, fall back to id so navigation never silently fails
  const slug = dbProp.slug || dbProp.id;

  const mappedMedia = sortedMediaList.map((img: any) => ({
    id: img.id,
    url: img.public_url || img.url,
    category: img.room_override || img.ai_analysis?.roomType || img.category || 'Other',
    version: img.version || 1,
    edited: img.edited || false,
    ai_analysis: img.ai_analysis,
    created_at: img.created_at || img.edited_at,
    is_cover: img.is_cover || false,
    size_bytes: img.size_bytes
  }));

  const loc = dbProp.property_locations?.[0] || dbProp.property_locations || {};
  const lat = loc.latitude !== undefined ? Number(loc.latitude) : (dbProp.coordinates?.lat || 12.9716);
  const lng = loc.longitude !== undefined ? Number(loc.longitude) : (dbProp.coordinates?.lng || 77.5946);
  const area = loc.area || dbProp.locality || '';
  const city = loc.city || dbProp.city || '';
  const pincode = loc.pincode || '';
  const houseNumber = loc.house_number || '';
  const buildingName = loc.building_name || '';

  return {
    id: dbProp.id,
    slug,
    title: dbProp.title,
    image: coverImage,
    images: mappedMedia.map(m => getGalleryUrl(m.url)),
    mediaItems: mappedMedia.map(m => ({ ...m, url: getGalleryUrl(m.url) })), // Attach transformed gallery url
    tag: dbProp.is_featured ? 'PREMIUM' : undefined,
    details: `${dbProp.bedrooms} BHK • ${dbProp.bathrooms} Bath • ${dbProp.area_sqft || 0} sq. ft.`,
    description: dbProp.description || '',
    price: Number(dbProp.rent),
    originalPrice: Number(dbProp.rent) * 1.1,
    discount: '10% off',
    bedrooms: dbProp.bedrooms,
    furnished: dbProp.furnishing === 'Fully Furnished',
    category: dbProp.property_type === 'PG' ? 'pgs' : dbProp.property_type === 'Villa' ? 'villas' : dbProp.property_type === 'House' ? 'homes' : dbProp.property_type === 'Room' ? 'rooms' : 'apartments',
    location: `${houseNumber ? houseNumber + ', ' : ''}${buildingName ? buildingName + ', ' : ''}${area || ''}, ${city || ''}`,
    area,
    city,
    pincode,
    houseNumber,
    buildingName,
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
    latitude: lat,
    longitude: lng,
    verification_status: dbProp.status === 'approved' ? 'verified' : 'unverified',
    property_type: dbProp.property_type,
    owner: {
      name: dbProp.owner?.name || 'Owner',
      image: getAvatarUrl(dbProp.owner?.avatar_url, dbProp.owner?.name || 'Owner'),
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
        property_media(*),
        images: property_images(*),
        amenities: amenities(*),
        owner: owner_profiles(*),
        property_locations(*)
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
        property_media(*),
        images: property_images(*),
        amenities: amenities(*),
        owner: owner_profiles(*),
        property_locations(*)
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
        property_media(*),
        images: property_images(*),
        amenities: amenities(*),
        owner: owner_profiles(*),
        property_locations(*)
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
          property_media(*),
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
          property_media(*),
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
