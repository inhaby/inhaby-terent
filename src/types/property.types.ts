export interface Property {
  id: string;
  slug?: string;
  title: string;
  image: string;
  images: string[];
  tag?: string;
  details: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  bedrooms: number;
  furnished: boolean;
  category: string;
  location: string;
  amenities: { icon: any | string; label: string }[];
  rating: number;
  reviewCount: number;
  maintenanceInfo?: string;
  badges: string[];
  offers: string[];
  configuration: string;
  size: string;
  floor: string;
  facing: string;
  latitude?: number;
  longitude?: number;
  verification_status?: string;
  property_type?: string;
  availability_status?: string;
  distance?: number;
  area?: string;
  city?: string;
  owner: {
    name: string;
    image: string;
    verified: boolean;
    activeSince: string;
  };
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
  mediaItems?: any[];
}

export interface Category {
  id: string;
  title: string;
  image: string;
}

export interface Section {
  id: string;
  title: string;
  type: 'grid' | 'carousel' | 'list' | 'banner' | 'compact-list' | 'map-view' | 'feed' | 'snap-carousel' | 'filter-chips' | 'compact-grid' | 'stack-cards' | 'multi-row-scroll' | 'dense-grid' | 'comparison-cards' | 'large-cards' | 'premium-list' | 'image-feed' | 'story-carousel' | 'tag-filters' | 'mini-list';
  items?: Property[];
  image?: string;
  actionText?: string;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  bedrooms: number | null;
  furnished: boolean | null;
  category: string;
  sortBy: string;
}

export interface LocationInfo {
  name: string;
  area: string;
  city: string;
  pincode: string;
  address?: string;
  lat?: number;
  lng?: number;
}
