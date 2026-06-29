import { supabase } from '@inhaby/shared';
import { Property } from '../../types';
import { mapSupabasePropertyToModel } from '../property/property.service';

export const searchService = {
  async suggestLocations(query: string): Promise<any[]> {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [
        { type: 'trending', text: 'Koramangala 1 BHK', subtext: 'Most searched in Bengaluru' },
        { type: 'trending', text: 'PG near Metro Station', subtext: 'Trending for students' },
        { type: 'area', text: 'HSR Layout', subtext: 'Popular startup hub area' },
        { type: 'area', text: 'Indira Nagar', subtext: 'Premium food & nightlife area' }
      ];
    }

    const suggestions: any[] = [];

    // Match static areas
    const AREAS = ['HSR Layout', 'Indira Nagar', 'Koramangala', 'Whitefield', 'Jayanagar', 'BTM Layout', 'Green Glen Layout', 'Malleshwaram', 'Marathahalli'];
    AREAS.filter(a => a.toLowerCase().includes(q)).forEach(area => {
      suggestions.push({ type: 'area', text: area, subtext: 'Area in Bengaluru' });
    });

    // Match static cities
    const CITIES = ['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Mysuru', 'Mangaluru'];
    CITIES.filter(c => c.toLowerCase().includes(q)).forEach(city => {
      suggestions.push({ type: 'city', text: city, subtext: 'City' });
    });

    // Match properties from Supabase
    try {
      const { data: dbProps } = await supabase
        .from('properties')
        .select('id, title, rent, city')
        .eq('status', 'approved')
        .or(`title.ilike.%${q}%,city.ilike.%${q}%,locality.ilike.%${q}%`)
        .limit(5);

      if (dbProps) {
        dbProps.forEach(p => {
          suggestions.push({
            type: 'property',
            text: p.title,
            subtext: `₹${Number(p.rent).toLocaleString()} • ${p.city}`,
            id: p.id
          });
        });
      }
    } catch (err) {
      console.error('Error suggesting properties:', err);
    }

    // Deduplicate suggestions
    const uniqueMap = new Map();
    suggestions.forEach(item => uniqueMap.set(item.text.toLowerCase() + '-' + item.type, item));
    return Array.from(uniqueMap.values()).slice(0, 10);
  },

  async searchProperties(params: {
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    page?: number;
    limit?: number;
    propertyTypes?: string[];
    bedrooms?: string[];
    furnishings?: string[];
    amenities?: string[];
    verifiedOnly?: boolean;
    lat?: number | null;
    lng?: number | null;
  }): Promise<{ items: Property[]; total: number; page: number; totalPages: number }> {
    const q = params.q?.trim().toLowerCase() || '';
    const minPrice = params.minPrice ?? 0;
    const maxPrice = params.maxPrice ?? 200000;
    const page = params.page ?? 1;
    const limit = params.limit ?? 16;
    const sortBy = params.sortBy ?? 'relevance';

    // Build Supabase base query
    let queryBuilder = supabase
      .from('properties')
      .select(`
        *,
        images: property_images(*),
        amenities: amenities(*),
        owner: owner_profiles(*)
      `)
      .eq('status', 'approved');

    // Apply basic numeric filters at database level for efficiency
    queryBuilder = queryBuilder.gte('rent', minPrice).lte('rent', maxPrice);

    const { data: dbProps, error } = await queryBuilder;
    if (error || !dbProps) {
      console.error('Error in search:', error);
      return { items: [], total: 0, page, totalPages: 1 };
    }

    // Filter and map in memory
    let results = dbProps.map(p => mapSupabasePropertyToModel(p));

    // 1. Text search
    if (q) {
      results = results.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.property_type?.toLowerCase().includes(q)
      );
    }

    // 2. Property types
    if (params.propertyTypes && params.propertyTypes.length > 0) {
      results = results.filter(p => {
        return params.propertyTypes!.some(type => {
          return p.property_type?.toLowerCase() === type.toLowerCase() || p.category?.toLowerCase() === type.toLowerCase() + 's';
        });
      });
    }

    // 3. Bedrooms
    if (params.bedrooms && params.bedrooms.length > 0) {
      results = results.filter(p => {
        const beds = p.bedrooms;
        return params.bedrooms!.some(b => {
          if (b === '5+ BHK') return beds >= 5;
          const match = b.match(/(\d+)/);
          return match ? beds === Number(match[1]) : false;
        });
      });
    }

    // 4. Furnishings
    if (params.furnishings && params.furnishings.length > 0) {
      results = results.filter(p => {
        return params.furnishings!.some(f => {
          const fLower = f.toLowerCase();
          if (fLower.includes('fully') && p.furnished) return true;
          if (fLower.includes('unfurnished') && !p.furnished) return true;
          if (fLower.includes('semi') && !p.furnished) return true;
          return false;
        });
      });
    }

    // 5. Amenities
    if (params.amenities && params.amenities.length > 0) {
      results = results.filter(p => {
        const pAmenityNames = p.amenities.map(a => a.label.toLowerCase());
        return params.amenities!.every(a => pAmenityNames.includes(a.toLowerCase()));
      });
    }

    // 6. Verified only
    if (params.verifiedOnly) {
      results = results.filter(p => p.owner.verified);
    }

    // 7. Distance calculations
    if (params.lat !== undefined && params.lat !== null && params.lng !== undefined && params.lng !== null) {
      results = results.map(p => {
        const distance = calculateDistance(params.lat!, params.lng!, p.latitude || 12.9352, p.longitude || 77.6244);
        return { ...p, distance };
      });
    }

    // 8. Sorting
    if (sortBy === 'price-low') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'newest') {
      results.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
    } else if (sortBy === 'verified') {
      results.sort((a, b) => (b.owner.verified ? 1 : 0) - (a.owner.verified ? 1 : 0));
    } else if (sortBy === 'nearest') {
      results.sort((a, b) => {
        const distA = a.distance !== undefined ? a.distance : 9999;
        const distB = b.distance !== undefined ? b.distance : 9999;
        return distA - distB;
      });
    }

    // Pagination
    const total = results.length;
    const startIndex = (page - 1) * limit;
    const paginated = results.slice(startIndex, startIndex + limit);

    return {
      items: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
};

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
