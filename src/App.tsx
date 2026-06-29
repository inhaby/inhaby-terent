import React from 'react';
import { 
  Search, 
  Bell, 
  MapPin, 
  Home, 
  Bed, 
  Building2, 
  Users, 
  Warehouse, 
  Flame, 
  Star, 
  CheckCircle2, 
  FileText, 
  CreditCard,
  Compass,
  Heart,
  User,
  SlidersHorizontal,
  X,
  ChevronLeft,
  Share2,
  Phone,
  MessageCircle,
  Info,
  ShieldCheck,
  Zap,
  Tag,
  Waves,
  Dumbbell,
  LayoutGrid,
  Map as MapIcon,
  Layers,
  Columns,
  Image as ImageIcon,
  BookOpen,
  Filter,
  Check,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Tv,
  Wind,
  ChevronRight,
  Calendar,
  Footprints,
  ChevronDown,
  LogOut,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';

// --- Shared Components & Types ---
import { Property, Category, Section, FilterState, VisitRequest } from './types';
import { DesktopHeader } from './components/DesktopHeader';
import { SidebarFilters } from './components/SidebarFilters';
import { CustomPropertyCard } from './components/CustomPropertyCard';
import { ThemeSwitcher, AccentTheme } from './components/ThemeSwitcher';
import { MyVisitsSection } from './components/MyVisitsSection';
import { LazyImage } from './components/LazyImage';
import { Sidebar } from './components/Sidebar';
import { LocationSelectorModal } from './components/LocationSelectorModal';
import { NotificationCenter } from './components/NotificationCenter';
import { LocationInfo } from './types';

// --- Visual Virtualization & Modular Cards ---
import { VirtualItem } from './components/VirtualItem';
import { 
  LargeCard, MiniCard, ImageFeedCard, ComparisonCard, 
  StackCard, StoryCard, GridCard, ListCard, CarouselCard, 
  MapPlaceholder, FilterChips, TagFilters 
} from './components/Cards';

// --- Custom Hooks for Core State Management ---
import { useTheme } from './hooks/useTheme';
import { useWishlist } from './hooks/useWishlist';
import { useVisits } from './hooks/useVisits';
import { useMessages } from './hooks/useMessages';
import { useProperties } from './hooks/useProperties';
import { useSearch } from './hooks/useSearch';
import { useAuth } from './context/TenantAuthContext';
import { supabase } from '@inhaby/shared';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { useNotifications } from './hooks/useNotifications';
import { propertyService } from './services/property/property.service';

// --- Lazy-Loaded Views for Performance Refactoring ---
const PropertyDetailsPage = React.lazy(() => import('./components/PropertyDetailsPage').then(m => ({ default: m.PropertyDetailsPage })));
const SearchPage = React.lazy(() => import('./components/SearchPage').then(m => ({ default: m.SearchPage })));
const AccountCenter = React.lazy(() => import('./components/AccountCenter').then(m => ({ default: m.AccountCenter })));
const MessagesSection = React.lazy(() => import('./components/MessagesSection').then(m => ({ default: m.MessagesSection })));

// --- Mock Data ---
const CATEGORIES = [
  { id: 'homes', name: 'HOMES', icon: Home, color: 'bg-blue-50 text-blue-600' },
  { id: 'rooms', name: 'ROOMS', icon: Bed, color: 'bg-orange-50 text-orange-600' },
  { id: 'apartments', name: 'APARTMENTS', icon: Building2, color: 'bg-green-50 text-green-600' },
  { id: 'pgs', name: 'PGS', icon: Users, color: 'bg-indigo-50 text-indigo-600' },
  { id: 'villas', name: 'VILLAS', icon: Warehouse, color: 'bg-amber-50 text-amber-600' },
];

const SIZZLING_DEALS: Property[] = [
  {
    id: '1',
    title: 'Luxury 3BHK Apartment in HSR Layout - Semi Furnished',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800'
    ],
    tag: 'PREMIUM LISTING',
    details: '3 BHK • 3 Bath • 1,850 sq. ft.',
    description: 'A beautiful, modern studio apartment located in the heart of Sector 45. Perfect for working professionals looking for a stylish and convenient living space.',
    price: 45000,
    originalPrice: 50000,
    discount: '10% off',
    bedrooms: 3,
    furnished: true,
    category: 'apartments',
    location: '2nd Main, Sector 4, HSR Layout, Bangalore',
    rating: 4.8,
    reviewCount: 124,
    maintenanceInfo: 'Inclusive of Maintenance & Electricity',
    badges: ['IMMEDIATE POSSESSION', 'FAMILY ONLY', 'PREMIUM LISTING'],
    offers: [
      'Bank Offer: 10% instant discount on ICICI Bank Credit Cards.',
      'Move-in Bonus: Flat ₹2,000 off on professional packers & movers.'
    ],
    configuration: '3 BHK + 3 Bath',
    size: '1,850 sq. ft.',
    floor: '4th of 12 Floors',
    facing: 'East (Vastu Compliant)',
    amenities: [
      { icon: Waves, label: 'Swimming' },
      { icon: Dumbbell, label: 'Gym' },
      { icon: ShieldCheck, label: '24/7 Security' },
      { icon: Zap, label: 'Power Backup' }
    ],
    owner: {
      name: 'Rahul Deshmukh',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      verified: true,
      activeSince: '2 days'
    }
  },
  {
    id: '2',
    title: 'Penthouse Suite, Indira Nagar',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800'
    ],
    tag: 'Flat 5000 Off',
    details: 'Private Terrace • Verified',
    description: 'Experience luxury living in this stunning penthouse suite in Indira Nagar. Boasting a massive private terrace, floor-to-ceiling windows, and premium wooden flooring.',
    price: 45000,
    originalPrice: 50000,
    bedrooms: 3,
    furnished: true,
    category: 'apartments',
    location: 'Indira Nagar, Bangalore',
    rating: 4.5,
    reviewCount: 89,
    badges: ['PREMIUM LISTING'],
    offers: ['Bank Offer: 5% off on HDFC'],
    configuration: '3 BHK + 4 Bath',
    size: '2,200 sq. ft.',
    floor: '10th of 10 Floors',
    facing: 'North',
    amenities: [
      { icon: Compass, label: 'Gym' },
      { icon: ShieldCheck, label: 'Security' }
    ],
    owner: {
      name: 'Suresh Kumar',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      verified: true,
      activeSince: '1 week'
    }
  },
];

const TOP_SELECTIONS: Category[] = [
  { id: '1', title: 'Working Professionals', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300' },
  { id: '2', title: 'Student Housing', image: 'https://images.unsplash.com/photo-1555854816-80dc12219bbf?auto=format&fit=crop&q=80&w=300' },
  { id: '3', title: 'Family Suites', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=300' },
  { id: '4', title: 'Bachelor Pads', image: 'https://images.unsplash.com/photo-1536376074432-bf121770998a?auto=format&fit=crop&q=80&w=300' },
];

const RECENTLY_VIEWED: Property[] = [
  {
    id: 'r1',
    title: 'Shared PG, Koramangala',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=300',
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555854816-80dc12219bbf?auto=format&fit=crop&q=80&w=800'
    ],
    details: 'Shared Room • For Students',
    description: 'Affordable and clean shared PG accommodation in Koramangala.',
    price: 8000,
    bedrooms: 1,
    furnished: false,
    category: 'pgs',
    location: 'Koramangala, Bangalore',
    rating: 4.2,
    reviewCount: 45,
    badges: ['STUDENT FRIENDLY'],
    offers: [],
    configuration: 'Shared Room',
    size: '200 sq. ft.',
    floor: '2nd of 4 Floors',
    facing: 'East',
    amenities: [
      { icon: Flame, label: 'WiFi' }
    ],
    owner: {
      name: 'Anita Rao',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      verified: true,
      activeSince: '3 days'
    }
  },
  {
    id: 'r2',
    title: '1BHK, Marathahalli',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=300',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
    ],
    details: 'Semi-Furnished • Near IT Park',
    description: 'Spacious 1BHK apartment located conveniently near Marathahalli IT parks.',
    price: 15500,
    bedrooms: 1,
    furnished: true,
    category: 'apartments',
    location: 'Marathahalli, Bangalore',
    rating: 4.0,
    reviewCount: 32,
    badges: ['NEAR IT PARK'],
    offers: [],
    configuration: '1 BHK + 1 Bath',
    size: '650 sq. ft.',
    floor: '1st of 5 Floors',
    facing: 'West',
    amenities: [
      { icon: Compass, label: 'Gym' }
    ],
    owner: {
      name: 'Vikram Singh',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      verified: true,
      activeSince: '5 days'
    }
  },
  {
    id: 'r3',
    title: 'Full House, Whitefield',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=300',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800'
    ],
    details: 'Independent House • Family Only',
    description: 'A spacious independent house in the quiet suburbs of Whitefield.',
    price: 28000,
    bedrooms: 2,
    furnished: true,
    category: 'homes',
    location: 'Whitefield, Bangalore',
    rating: 4.6,
    reviewCount: 67,
    badges: ['FAMILY ONLY'],
    offers: [],
    configuration: '2 BHK + 2 Bath',
    size: '1,200 sq. ft.',
    floor: 'Ground Floor',
    facing: 'North-East',
    amenities: [
      { icon: Flame, label: 'Garden' }
    ],
    owner: {
      name: 'Meera Reddy',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
      verified: true,
      activeSince: '1 month'
    }
  },
];

const ALL_PROPERTIES: Property[] = [
  ...SIZZLING_DEALS,
  ...RECENTLY_VIEWED,
  {
    id: 'v1',
    title: 'Royal Villa with Private Pool',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400',
    images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'],
    tag: 'EXCLUSIVE',
    details: '4 BHK • 5 Bath • 4,500 sq. ft.',
    description: 'A magnificent villa offering ultimate privacy and luxury.',
    price: 125000,
    bedrooms: 4,
    furnished: true,
    category: 'villas',
    location: 'Palm Meadows, Whitefield, Bangalore',
    rating: 4.9,
    reviewCount: 42,
    badges: ['PRIVATE POOL', 'LUXURY'],
    offers: ['Special Weekend Discount: 15% off'],
    configuration: '4 BHK + 5 Bath',
    size: '4,500 sq. ft.',
    floor: 'G + 2 Floors',
    facing: 'East',
    amenities: [{ icon: Waves, label: 'Pool' }, { icon: Dumbbell, label: 'Gym' }],
    owner: { name: 'Aditya Birla', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100', verified: true, activeSince: '1 year' }
  },
  {
    id: 'v2',
    title: 'Mediterranean Style Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=400',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800'],
    tag: 'HOT DEAL',
    details: '5 BHK • 6 Bath • 5,200 sq. ft.',
    description: 'Stunning Mediterranean architecture with modern interiors.',
    price: 185000,
    bedrooms: 5,
    furnished: true,
    category: 'villas',
    location: 'Sadashiva Nagar, Bangalore',
    rating: 4.8,
    reviewCount: 24,
    badges: ['PREMIUM', 'VERIFIED'],
    offers: [],
    configuration: '5 BHK',
    size: '5,200 sq. ft.',
    floor: 'G + 1',
    facing: 'North',
    amenities: [{ icon: Waves, label: 'Pool' }],
    owner: { name: 'Rajesh Khanna', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', verified: true, activeSince: '2 years' }
  },
  {
    id: 'rm1',
    title: 'Cozy Single Room for Students',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400',
    images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'],
    details: '1 Room • Shared Bath',
    description: 'Perfect for students looking for a quiet place to study.',
    price: 6500,
    bedrooms: 1,
    furnished: true,
    category: 'rooms',
    location: 'Near Christ University, Bangalore',
    rating: 4.1,
    reviewCount: 28,
    badges: ['STUDENT FRIENDLY'],
    offers: [],
    configuration: '1 Room',
    size: '150 sq. ft.',
    floor: '2nd Floor',
    facing: 'North',
    amenities: [{ icon: Zap, label: 'WiFi' }],
    owner: { name: 'Mrs. Gupta', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', verified: true, activeSince: '2 years' }
  },
  {
    id: 'rm2',
    title: 'Executive Room in MG Road',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400',
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'],
    details: '1 Room • Attached Bath',
    description: 'Premium room for working professionals in the city center.',
    price: 15000,
    bedrooms: 1,
    furnished: true,
    category: 'rooms',
    location: 'MG Road, Bangalore',
    rating: 4.5,
    reviewCount: 42,
    badges: ['CITY CENTER', 'AC'],
    offers: [],
    configuration: '1 Room',
    size: '250 sq. ft.',
    floor: '5th Floor',
    facing: 'East',
    amenities: [{ icon: Zap, label: 'WiFi' }],
    owner: { name: 'Sanjay Dutt', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100', verified: true, activeSince: '1 year' }
  },
  {
    id: 'h1',
    title: 'Modern 2BHK Independent House',
    image: 'https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&q=80&w=400',
    images: ['https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&q=80&w=800'],
    details: '2 BHK • 2 Bath • Garden',
    description: 'A beautiful independent house with a small garden in the front.',
    price: 22000,
    bedrooms: 2,
    furnished: false,
    category: 'homes',
    location: 'Jayanagar, Bangalore',
    rating: 4.4,
    reviewCount: 56,
    badges: ['GARDEN', 'PET FRIENDLY'],
    offers: [],
    configuration: '2 BHK',
    size: '1,100 sq. ft.',
    floor: 'Ground Floor',
    facing: 'West',
    amenities: [{ icon: Zap, label: 'Backup' }],
    owner: { name: 'Ramesh Babu', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', verified: true, activeSince: '6 months' }
  },
  {
    id: 'h2',
    title: 'Spacious 3BHK Family Home',
    image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=400',
    images: ['https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=800'],
    details: '3 BHK • 3 Bath • Parking',
    description: 'Ideal for a large family, located in a peaceful residential area.',
    price: 35000,
    bedrooms: 3,
    furnished: true,
    category: 'homes',
    location: 'BTM Layout, Bangalore',
    rating: 4.3,
    reviewCount: 38,
    badges: ['FAMILY ONLY', 'QUIET AREA'],
    offers: [],
    configuration: '3 BHK',
    size: '1,800 sq. ft.',
    floor: 'G + 1',
    facing: 'South',
    amenities: [{ icon: Zap, label: 'Backup' }],
    owner: { name: 'Priya Mani', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', verified: true, activeSince: '3 years' }
  },
  {
    id: 'pg3',
    title: 'Stanza Living - Tokyo House',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=400',
    images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800'],
    details: 'Single Sharing • Premium',
    description: 'Modern PG with high-speed internet and professional housekeeping.',
    price: 18000,
    bedrooms: 1,
    furnished: true,
    category: 'pgs',
    location: 'Koramangala 4th Block, Bangalore',
    rating: 4.9,
    reviewCount: 156,
    badges: ['HIGH SPEED WIFI', 'CLEAN'],
    offers: [],
    configuration: 'Single Sharing',
    size: '300 sq. ft.',
    floor: '1st Floor',
    facing: 'North',
    amenities: [{ icon: Zap, label: 'WiFi' }, { icon: ShieldCheck, label: 'Security' }],
    owner: { name: 'Stanza Living', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100', verified: true, activeSince: '4 years' }
  },
  {
    id: 'a3',
    title: 'Skyline View Apartment',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800'],
    details: '2 BHK • 2 Bath • Balcony',
    description: 'Beautiful apartment with a stunning view of the city skyline.',
    price: 32000,
    bedrooms: 2,
    furnished: true,
    category: 'apartments',
    location: 'Hebbal, Bangalore',
    rating: 4.6,
    reviewCount: 74,
    badges: ['SKYLINE VIEW', 'BALCONY'],
    offers: [],
    configuration: '2 BHK',
    size: '1,250 sq. ft.',
    floor: '15th Floor',
    facing: 'West',
    amenities: [{ icon: Zap, label: 'Backup' }, { icon: Dumbbell, label: 'Gym' }],
    owner: { name: 'Kiran Rao', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', verified: true, activeSince: '1 year' }
  }
];

// --- Components ---

const ExploreCategories = ({ onSelectCategory, onBack }: { onSelectCategory: (id: string) => void, onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[60] bg-theme-bg overflow-y-auto no-scrollbar max-w-md md:max-w-none mx-auto"
    >
      <div className="sticky top-0 z-50 bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-100">
        <button onClick={onBack} className="p-2 bg-gray-100 rounded-full text-gray-800 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-gray-900">Explore Categories</h1>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {CATEGORIES.map((category, i) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelectCategory(category.id)}
            className={`${category.color} p-6 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-sm active:scale-95 transition-transform`}
          >
            <div className="p-4 bg-white/50 rounded-2xl">
              <category.icon size={32} />
            </div>
            <span className="text-sm font-black tracking-wider uppercase">{category.name}</span>
          </motion.button>
        ))}
      </div>

      <div className="p-4 mt-4">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Top Selections</h3>
        <div className="space-y-4">
          {TOP_SELECTIONS.map((selection, i) => (
            <motion.div
              key={selection.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative h-32 rounded-3xl overflow-hidden group cursor-pointer"
            >
              <LazyImage src={selection.image} alt={selection.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-6 pointer-events-none">
                <span className="text-white font-black text-lg max-w-[150px]">{selection.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ViewAll = ({ 
  title, 
  category, 
  onBack, 
  onSelectProperty,
  savedIds,
  onToggleSave,
  onShare
}: { 
  title: string, 
  category: string, 
  onBack: () => void,
  onSelectProperty: (id: string) => void,
  savedIds: string[],
  onToggleSave: (id: string) => void,
  onShare: (p: Property) => void
}) => {
  const [items, setItems] = React.useState<Property[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const params = {
      page: page.toString(),
      limit: '20',
      category: category === 'sizzling' || category === 'recent' ? 'all' : category
    };

    propertyService.getProperties(params)
      .then(data => {
        setItems(prev => page === 1 ? data.items : [...prev, ...data.items]);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  }, [page, category]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[60] bg-theme-bg overflow-y-auto no-scrollbar max-w-md md:max-w-none mx-auto transition-colors duration-300"
    >
      <div className="sticky top-0 z-50 bg-theme-surface/95 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-theme-border/60 transition-colors duration-300">
        <button onClick={onBack} className="p-2 bg-theme-bg hover:bg-theme-border/40 rounded-full text-theme-text-primary active:scale-90 transition-all">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-theme-text-primary">{title}</h1>
      </div>

      <div className="p-4 grid grid-cols-1 gap-4">
        {items.map((property, i) => (
          <VirtualItem key={property.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ListCard 
                property={property} 
                isSaved={savedIds.includes(property.id)}
                onToggleSave={onToggleSave}
                onClick={() => onSelectProperty(property.id)}
                onShare={onShare}
              />
            </motion.div>
          </VirtualItem>
        ))}
      </div>

      {page < totalPages && (
        <div className="p-4">
          <button 
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
            className="w-full py-4 bg-white border border-gray-100 rounded-2xl text-blue-600 font-bold text-sm uppercase tracking-widest shadow-sm"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </motion.div>
  );
};

const Header = ({ 
  onOpenFilters, 
  onOpenWishlist, 
  savedCount,
  searchQuery,
  onSearchChange,
  onSearchClick,
  currentAccent,
  isDark,
  onAccentChange,
  onDarkToggle,
  onOpenLocationSelector,
  onOpenNotifications,
  selectedLocationName,
  unreadNotificationsCount = 0
}: { 
  onOpenFilters: () => void, 
  onOpenWishlist: () => void, 
  savedCount: number,
  searchQuery: string,
  onSearchChange: (val: string) => void,
  onSearchClick?: () => void,
  currentAccent: AccentTheme,
  isDark: boolean,
  onAccentChange: (accent: AccentTheme) => void,
  onDarkToggle: (dark: boolean) => void,
  onOpenLocationSelector: () => void,
  onOpenNotifications: () => void,
  selectedLocationName: string,
  unreadNotificationsCount: number
}) => (
  <header className="bg-theme-surface border-b border-theme-border/60 px-6 pt-10 pb-6 text-theme-text-primary md:px-12 md:py-8 transition-colors duration-300 shadow-sm font-sans">
    <div className="max-w-3xl md:mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="relative inline-block">
            <span className="text-xl font-serif font-black tracking-tight text-theme-text-primary">Homstay</span>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-theme-accent rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-sans">
          <ThemeSwitcher 
            currentAccent={currentAccent} 
            isDark={isDark} 
            onAccentChange={onAccentChange} 
            onDarkToggle={onDarkToggle} 
            mode="inline"
            buttonTheme="light"
          />
          <button onClick={onOpenWishlist} className="p-2.5 bg-theme-bg text-theme-text-secondary rounded-full relative hover:bg-theme-border transition-all outline-none">
            <Heart size={18} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-theme-accent text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md">
                {savedCount}
              </span>
            )}
          </button>
          <button onClick={onOpenNotifications} className="p-2.5 bg-theme-bg text-theme-text-secondary rounded-full hover:bg-theme-border transition-all outline-none font-sans relative">
            <Bell size={18} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-theme-accent text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      <div 
        onClick={onOpenLocationSelector}
        className="flex items-center gap-1.5 mb-6 text-theme-text-secondary md:justify-center cursor-pointer hover:text-theme-accent transition-colors select-none"
      >
        <MapPin size={13} className="text-theme-accent stroke-[2.5]" />
        <span className="text-xs font-semibold">{selectedLocationName || "Riya Bhati House"}</span>
        <ChevronDown size={12} className="opacity-70" />
      </div>

      <div 
        onClick={onSearchClick}
        className="relative md:max-w-xl md:mx-auto cursor-pointer"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-secondary/60" size={16} />
        <input 
          type="text" 
          placeholder="Search location, property..." 
          value={searchQuery}
          onChange={(e) => {
            if (onSearchClick) {
              onSearchClick();
            } else {
              onSearchChange(e.target.value);
            }
          }}
          onFocus={(e) => {
            if (onSearchClick) {
              e.preventDefault();
              e.target.blur();
              onSearchClick();
            }
          }}
          className="w-full bg-theme-bg text-theme-text-primary border border-theme-border rounded-2xl py-3.5 pl-11 pr-12 text-xs font-bold focus:ring-2 focus:ring-theme-accent/30 focus:border-theme-accent outline-none shadow-sm transition-all cursor-pointer"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onSearchClick) {
              onSearchClick();
            } else {
              onOpenFilters();
            }
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-theme-text-secondary hover:text-theme-accent transition-colors"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </div>
  </header>
);

const CategoryNav = ({ activeCategory, onSelect }: { activeCategory: string, onSelect: (id: string) => void }) => (
  <div className="bg-theme-surface border-b border-theme-border/60 py-4 overflow-x-auto no-scrollbar transition-colors duration-300">
    <div className="flex gap-2.5 px-6">
      <button 
        onClick={() => onSelect('all')}
        className={`px-5 py-2.5 rounded-2xl text-[10px] font-sans font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
          activeCategory === 'all' 
            ? 'bg-theme-accent text-white shadow-md shadow-theme-accent/25' 
            : 'bg-theme-bg text-theme-text-secondary border border-theme-border/60'
        }`}
      >
        All Verified
      </button>
      {CATEGORIES.map((cat) => (
        <button 
          key={cat.id} 
          onClick={() => onSelect(cat.id)}
          className={`px-5 py-2.5 rounded-2xl text-[10px] font-sans font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeCategory === cat.id 
              ? 'bg-theme-accent text-white shadow-md shadow-theme-accent/25' 
              : 'bg-theme-bg text-theme-text-secondary border border-theme-border/60'
          }`}
        >
          <cat.icon size={12} />
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  </div>
);

const HeroBanner = () => (
  <div className="px-6 py-4">
    <div className="relative rounded-[32px] overflow-hidden aspect-[16/8] bg-gradient-to-br from-theme-accent to-theme-accent-hover text-white p-8 flex flex-col justify-center shadow-lg shadow-theme-accent/10">
      <div className="relative z-10 max-w-[200px] space-y-1">
        <h2 className="font-serif text-2xl font-semibold leading-tight pr-5">A Home For Your Best Memories</h2>
        <p className="text-[10px] font-sans font-extrabold text-white/75 uppercase tracking-widest leading-none mt-1">Luxe stays & homes</p>
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10">
        <Building2 size={100} />
      </div>
      <div className="absolute right-12 top-1/2 -translate-y-1/2 text-white/10">
        <Home size={60} />
      </div>
    </div>
  </div>
);
const ProfileSection = ({ 
  onLogout,
  currentAccent,
  isDark,
  onAccentChange,
  onDarkToggle
}: { 
  onLogout: () => void;
  currentAccent?: AccentTheme;
  isDark?: boolean;
  onAccentChange?: (accent: AccentTheme) => void;
  onDarkToggle?: (dark: boolean) => void;
}) => {
  const menuItems = [
    { icon: Calendar, label: 'Your booking' },
    { icon: MapPin, label: 'Address book' },
    { icon: Tag, label: 'Refer & Eren', badge: 'EARN UPTO ₹1000' },
    { icon: Info, label: 'About us' },
    { icon: FileText, label: 'Term & conditions' },
    { icon: ShieldCheck, label: 'Private policy' },
    { icon: MessageCircle, label: 'Help & support' },
    { icon: LogOut, label: 'Log out', onClick: onLogout, color: 'text-red-500' },
  ];

  return (
    <div className="bg-theme-surface border border-theme-border rounded-3xl overflow-hidden shadow-sm max-w-xl mx-auto font-sans transition-colors duration-300">
      <div className="bg-gradient-to-br from-theme-accent to-theme-accent-hover px-6 pt-12 pb-8 text-white flex justify-between items-start">
        <div>
          <h1 className="font-serif text-2xl font-black mb-8 leading-none">Profile</h1>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 overflow-hidden">
              <User size={32} className="text-white/85" />
            </div>
            <div className="flex flex-col font-sans">
              <h2 className="text-lg font-black leading-none">Homstay Luxe User</h2>
              <p className="text-xs text-white/70 mt-1 font-semibold tracking-wider">+91 9052653548</p>
              <button className="text-[10px] font-sans font-black uppercase tracking-wider text-white mt-3 bg-white/15 px-3 py-1.5 rounded-lg border border-white/25 flex items-center gap-1 hover:bg-white/25 active:scale-95 transition-all font-sans cursor-pointer">
                <span>Edit Profile</span> 
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
        {currentAccent && onAccentChange && onDarkToggle && (
          <div className="relative mt-1">
            <ThemeSwitcher 
              currentAccent={currentAccent} 
              isDark={isDark || false} 
              onAccentChange={onAccentChange} 
              onDarkToggle={onDarkToggle} 
              mode="inline"
              buttonTheme="dark"
            />
          </div>
        )}
      </div>

      <div className="py-3 bg-theme-surface divide-y divide-theme-border/40">
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={item.onClick}
            className={`w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none ${item.color || 'text-gray-700'}`}
          >
            <div className="flex items-center gap-4">
              <item.icon size={20} className={item.color ? 'text-red-500' : 'text-gray-400'} />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                    ({item.badge})
                  </span>
                )}
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        ))}
      </div>

      <div className="p-8 text-center">
        <p className="text-[10px] text-gray-300 font-medium tracking-widest uppercase">
          App version: 1.4.1(503c)
        </p>
      </div>
    </div>
  );
};

const handleShare = async (property: Property, showToast: (msg: string) => void) => {
  const shareData = {
    title: property.title,
    text: `Check out this property: ${property.title} at ${property.location}`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      showToast('Link copied to clipboard!');
    }
  } catch (err) {
    console.error('Error sharing:', err);
  }
};

const SectionWrapper = ({ section, savedIds, onToggleSave, onClick, onShare, onViewAll }: { section: Section, savedIds: Set<string>, onToggleSave: (id: string) => void, onClick: (id: string) => void, onShare: (p: Property) => void, onViewAll: (s: Section) => void, key?: any }) => {
  if (section.items && section.items.length === 0) {
    return null;
  }

  if (section.type === 'banner') {
    return (
      <div className="px-4 py-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-blue-600 flex items-center px-8">
          <LazyImage src={section.image} alt={section.title} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="relative z-10">
            <h3 className="text-white text-xl font-black leading-tight max-w-[150px]">{section.title}</h3>
            <button className="mt-3 bg-white text-blue-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
              {section.actionText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (section.type === 'map-view') return <MapPlaceholder />;
  if (section.type === 'filter-chips') return <FilterChips />;
  if (section.type === 'tag-filters') return <TagFilters />;

  return (
    <div className="py-4">
      <div className="flex items-center justify-between px-4 mb-4">
        <h3 className="text-lg font-black text-gray-900 tracking-tight">{section.title}</h3>
        {section.actionText && (
          <button 
            onClick={() => onViewAll(section)}
            className="text-blue-600 text-[10px] font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg"
          >
            {section.actionText}
          </button>
        )}
      </div>

      {section.type === 'carousel' && (
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
          {section.items?.map(item => (
            <CarouselCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'snap-carousel' && (
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar snap-x snap-mandatory">
          {section.items?.map(item => (
            <div key={item.id} className="snap-center">
              <CarouselCard 
                property={item} 
                isSaved={savedIds.has(item.id)} 
                onToggleSave={onToggleSave} 
                onClick={onClick} 
                onShare={onShare} 
              />
            </div>
          ))}
        </div>
      )}

      {section.type === 'story-carousel' && (
        <div className="flex gap-6 overflow-x-auto px-4 pb-2 no-scrollbar">
          {section.items?.map(item => (
            <StoryCard 
              key={item.id} 
              property={item} 
              onClick={onClick} 
            />
          ))}
        </div>
      )}

      {section.type === 'grid' && (
        <div className="grid grid-cols-2 gap-3 md:gap-5 px-4">
          {section.items?.map(item => (
            <GridCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'compact-grid' && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 px-4">
          {section.items?.map(item => (
            <GridCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'dense-grid' && (
        <div className="grid grid-cols-2 gap-2 md:gap-4 px-4">
          {section.items?.map(item => (
            <GridCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'list' && (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-5 px-4">
          {section.items?.map(item => (
            <ListCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'compact-list' && (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-4 px-4">
          {section.items?.map(item => (
            <MiniCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'mini-list' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 px-4">
          {section.items?.map(item => (
            <MiniCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'multi-row-scroll' && (
        <div className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto px-4 pb-4 no-scrollbar">
          {section.items?.map(item => (
            <CarouselCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'comparison-cards' && (
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
          {section.items?.map(item => (
            <ComparisonCard 
              key={item.id} 
              property={item} 
              onClick={onClick} 
            />
          ))}
        </div>
      )}

      {section.type === 'large-cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4">
          {section.items?.map(item => (
            <LargeCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'stack-cards' && (
        <div className="px-4 pt-4 pb-20 max-w-md mx-auto">
          {section.items?.map((item, i) => (
            <StackCard 
              key={item.id} 
              property={item} 
              index={i}
              onClick={onClick} 
            />
          ))}
        </div>
      )}

      {section.type === 'image-feed' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 px-4">
          {section.items?.map(item => (
            <ImageFeedCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'feed' && (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 px-4">
          {section.items?.map(item => (
            <ListCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryGrid = () => (
  <div className="px-4 pb-6">
    <div className="grid grid-cols-2 gap-3">
      {TOP_SELECTIONS.map((cat) => (
        <div key={cat.id} className="relative rounded-xl overflow-hidden aspect-square group">
          <LazyImage src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
            <span className="text-white text-xs font-bold leading-tight">{cat.title}</span>
          </div>
        </div>
      ))}
    </div>
    <button className="w-full mt-4 py-3 border border-blue-200 rounded-xl text-blue-600 font-bold text-sm bg-blue-50/50 active:bg-blue-100 transition-colors">
      EXPLORE ALL CATEGORIES
    </button>
  </div>
);

const OwnerCTA = () => (
  <div className="mx-4 my-6 p-6 rounded-2xl bg-[#fdf6e9] relative overflow-hidden border border-amber-100">
    <div className="relative z-10">
      <h3 className="text-xl font-black text-[#8b5e00]">Owner? List for FREE</h3>
      <p className="text-xs text-amber-800/70 mt-1">Reach 10k+ seekers daily</p>
      
      <div className="mt-4 space-y-3">
        {[
          { icon: CheckCircle2, text: 'Verified Tenant Profiles' },
          { icon: FileText, text: 'Easy Digital Contracts' },
          { icon: CreditCard, text: 'Automated Rent Collection' }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <item.icon size={16} className="text-green-600" />
            <span className="text-xs font-medium text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>
      
      <button className="mt-6 bg-[#8b5e00] text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg active:scale-95 transition-transform">
        POST YOUR PROPERTY
      </button>
    </div>
    
    {/* Abstract background shapes */}
    <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-200/20 rounded-tl-full -mr-8 -mb-8"></div>
    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-300/10 rounded-full -mt-4 -mr-4"></div>
  </div>
);

const BottomNav = ({ 
  activeTab, 
  onTabChange,
  unreadCount,
  savedCount
}: { 
  activeTab: string, 
  onTabChange: (tab: string) => void,
  unreadCount: number,
  savedCount: number
}) => {
  const items = [
    { id: 'HOME', icon: Home, label: 'Home' },
    { id: 'WISHLIST', icon: Heart, label: 'Wishlist', badge: savedCount },
    { id: 'VISITS', icon: Footprints, label: 'Visits' },
    { id: 'MESSAGES', icon: MessageSquare, label: 'Messages', badge: unreadCount },
    { id: 'ACCOUNT', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-theme-surface/95 backdrop-blur-md border-t border-theme-border/60 px-5 md:px-16 py-3.5 flex justify-between items-center z-50 max-w-md md:max-w-none mx-auto lg:hidden transition-all duration-300">
      {items.map((item) => (
        <button 
          key={item.id} 
          onClick={() => onTabChange(item.id)}
          className={`flex flex-col items-center gap-1.5 transition-all cursor-pointer relative ${activeTab === item.id ? 'text-theme-accent scale-110' : 'text-theme-text-secondary/50 hover:text-theme-accent'}`}
        >
          <item.icon size={22} fill={activeTab === item.id ? 'currentColor' : 'none'} className="stroke-[2.5]" />
          <span className={`text-[10px] font-extrabold tracking-wide ${activeTab === item.id ? 'text-theme-text-primary' : 'text-theme-text-secondary/60'}`}>{item.label}</span>
          {item.id === 'MESSAGES' && item.badge > 0 && (
            <span className="absolute top-0 right-3 -mt-1 -mr-2 bg-theme-accent text-white text-[9px] font-black rounded-full w-4.5 h-4.5 shadow-md flex items-center justify-center animate-pulse">
              {item.badge}
            </span>
          )}
          {item.id === 'WISHLIST' && item.badge > 0 && (
            <span className="absolute top-0 right-3 -mt-1 -mr-2 bg-theme-accent text-white text-[9px] font-black rounded-full w-4.5 h-4.5 shadow-md flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};




const FilterModal = ({ 
  isOpen, 
  onClose, 
  filters, 
  onApply 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  filters: FilterState; 
  onApply: (filters: FilterState) => void 
}) => {
  const [tempFilters, setTempFilters] = React.useState(filters);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="bg-white w-full max-w-md rounded-t-3xl p-6 pb-10 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-gray-900">Filters</h3>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8 overflow-y-auto max-h-[70vh] no-scrollbar">
          {/* Sort By */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-4 uppercase tracking-wider">Sort By</label>
            <div className="grid grid-cols-2 gap-2">
              {['latest', 'price-low', 'price-high'].map((sort) => (
                <button 
                  key={sort}
                  onClick={() => setTempFilters({ ...tempFilters, sortBy: sort })}
                  className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${tempFilters.sortBy === sort ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-gray-100 text-gray-500'}`}
                >
                  {sort.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-4 uppercase tracking-wider">Price Range (₹)</label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 mb-1 uppercase font-bold">Min</p>
                <input 
                  type="number" 
                  value={tempFilters.minPrice}
                  onChange={(e) => setTempFilters({ ...tempFilters, minPrice: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 mb-1 uppercase font-bold">Max</p>
                <input 
                  type="number" 
                  value={tempFilters.maxPrice}
                  onChange={(e) => setTempFilters({ ...tempFilters, maxPrice: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-4 uppercase tracking-wider">Bedrooms</label>
            <div className="flex gap-2">
              {[null, 1, 2, 3, 4].map((num) => (
                <button
                  key={num === null ? 'any' : num}
                  onClick={() => setTempFilters({ ...tempFilters, bedrooms: num })}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                    tempFilters.bedrooms === num 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-blue-200'
                  }`}
                >
                  {num === null ? 'Any' : `${num} BHK`}
                </button>
              ))}
            </div>
          </div>

          {/* Furnishing */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-4 uppercase tracking-wider">Furnishing</label>
            <div className="flex gap-2">
              {[
                { label: 'Any', value: null },
                { label: 'Furnished', value: true },
                { label: 'Unfurnished', value: false }
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setTempFilters({ ...tempFilters, furnished: opt.value })}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                    tempFilters.furnished === opt.value 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-blue-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button 
            onClick={() => setTempFilters({ minPrice: 0, maxPrice: 200000, bedrooms: null, furnished: null, category: 'all', sortBy: 'latest' })}
            className="flex-1 py-4 text-gray-400 text-xs font-bold uppercase tracking-widest"
          >
            Reset
          </button>
          <button 
            onClick={() => { onApply(tempFilters); onClose(); }}
            className="flex-[2] bg-blue-700 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-blue-100 active:scale-95 transition-transform"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const AMENITY_ICONS: Record<string, any> = {
  Waves, Dumbbell, ShieldCheck, Zap, Wifi, Car, Coffee, Utensils, Tv, Wind
};

const PropertyGallery = ({ images, title }: { images: string[], title: string }) => {
  const [index, setIndex] = React.useState(0);

  return (
    <div className="relative aspect-[4/5] w-full bg-black overflow-hidden">
      <motion.div 
        key={index}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        <LazyImage 
          src={images[index]} 
          alt={title} 
          className="w-full h-full object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Thumbnails / Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 px-4">
        {images.map((_, i) => (
          <button 
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 transition-all duration-300 rounded-full ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

const PropertyDetails = ({ 
  property, 
  onBack, 
  isSaved, 
  onToggleSave,
  onShare
}: { 
  property: Property; 
  onBack: () => void; 
  isSaved: boolean; 
  onToggleSave: (id: string) => void;
  onShare: (p: Property) => void;
}) => {
  const getIcon = (icon: any) => {
    if (typeof icon === 'string') return AMENITY_ICONS[icon] || Zap;
    return icon;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-theme-bg overflow-y-auto no-scrollbar max-w-md md:max-w-none mx-auto transition-colors duration-300"
    >
      {/* Floating Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-[70] p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white active:scale-90 transition-transform shadow-lg"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Floating Actions */}
      <div className="fixed top-6 right-6 z-[70] flex gap-3">
        <button 
          onClick={() => onShare(property)}
          className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white active:scale-90 transition-transform"
        >
          <Share2 size={20} />
        </button>
        <button 
          onClick={() => onToggleSave(property.id)}
          className={`p-3 backdrop-blur-md border rounded-full active:scale-90 transition-transform ${isSaved ? 'bg-white border-white text-red-500' : 'bg-white/10 border-white/20 text-white'}`}
        >
          <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <PropertyGallery images={property.images} title={property.title} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative -mt-12 z-10 bg-[#f5f2ed] rounded-t-[40px] px-6 pt-10 pb-32"
      >
        {/* Header Info */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {property.category}
            </span>
            {property.tag && (
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                {property.tag}
              </span>
            )}
          </div>
          <h1 className="font-serif text-4xl font-medium text-[#1a1a1a] leading-[1.1] mb-4">
            {property.title}
          </h1>
          <div className="flex items-center gap-4 text-[#1a1a1a]/60">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span className="text-xs font-medium">{property.location.split(',')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} fill="currentColor" className="text-amber-500" />
              <span className="text-xs font-bold">{property.rating}</span>
              <span className="text-[10px] opacity-50">({property.reviewCount})</span>
            </div>
          </div>
        </motion.div>

        {/* Price Section */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-sm border border-[#1a1a1a]/5 mb-8">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl font-black text-[#1a1a1a]">₹{property.price.toLocaleString()}</span>
            {property.originalPrice && (
              <span className="text-sm text-gray-400 line-through">₹{property.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{property.maintenanceInfo || 'All Inclusive'}</p>
            {property.discount && (
              <span className="text-[10px] bg-green-100 text-green-700 font-black px-2 py-1 rounded-lg uppercase tracking-wider">
                Save {property.discount}
              </span>
            )}
          </div>
        </motion.div>

        {/* Quick Specs Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: 'Configuration', value: property.configuration, icon: LayoutGrid },
            { label: 'Area Size', value: property.size, icon: Layers },
            { label: 'Floor Level', value: property.floor, icon: Columns },
            { label: 'Facing', value: property.facing, icon: Compass }
          ].map((spec, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/50 p-4 rounded-2xl border border-[#1a1a1a]/5">
              <div className="p-2 bg-white rounded-xl text-[#1a1a1a]/40">
                <spec.icon size={18} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{spec.label}</p>
                <p className="text-xs font-bold text-[#1a1a1a]">{spec.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="font-serif text-xl font-medium text-[#1a1a1a] mb-3">About this property</h3>
          <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
            {property.description}
          </p>
        </motion.div>

        {/* Amenities */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-medium text-[#1a1a1a]">Amenities</h3>
            <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">View All</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {property.amenities?.slice(0, 8).map((amenity, i) => {
              const Icon = getIcon(amenity.icon);
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#1a1a1a]/60 shadow-sm border border-[#1a1a1a]/5">
                    {Icon && <Icon size={20} />}
                  </div>
                  <span className="text-[9px] font-medium text-gray-500 text-center leading-tight">{amenity.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Owner Section */}
        <motion.div variants={itemVariants} className="bg-[#1a1a1a] rounded-3xl p-6 text-white mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <LazyImage src={property.owner.image} alt={property.owner.name} className="w-16 h-16 rounded-2xl object-cover" />
              {property.owner.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 p-1 rounded-full border-2 border-[#1a1a1a]">
                  <CheckCircle2 size={10} className="text-white" />
                </div>
              )}
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Listed By Owner</p>
              <h4 className="text-lg font-medium font-serif">{property.owner.name}</h4>
              <p className="text-[10px] text-white/60">Active since {property.owner.activeSince}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">
              Message
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-blue-900/20">
              Call Now
            </button>
          </div>
        </motion.div>

        {/* Location Preview */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="font-serif text-xl font-medium text-[#1a1a1a] mb-4">Location</h3>
          <div className="relative rounded-3xl overflow-hidden aspect-video mb-4 group cursor-pointer">
            <LazyImage 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
              alt="Map" 
              className="w-full h-full object-cover grayscale opacity-80 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white p-3 rounded-2xl shadow-2xl text-blue-600">
                <MapPin size={24} fill="currentColor" />
              </div>
            </div>
          </div>
          <p className="text-sm text-[#1a1a1a]/80 font-medium leading-relaxed">
            {property.location}
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom Sticky Action */}
      <div className="fixed bottom-0 left-0 right-0 z-[80] max-w-md md:max-w-none mx-auto px-6 py-6 bg-gradient-to-t from-theme-bg via-theme-bg to-transparent">
        <button className="w-full bg-theme-accent hover:bg-theme-accent-hover text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-theme-accent/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-3 cursor-pointer">
          <Zap size={16} fill="currentColor" />
          <span>Instant Booking</span>
        </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const { user, profile, loading, signOut } = useAuth();
  const [authView, setAuthView] = React.useState<'login' | 'signup' | 'forgot_password' | 'reset_password' | 'main'>('main');
  // 1. Hooks state definitions
  const { isDark, setIsDark, accent, setAccent } = useTheme();
  
  // Expanded notifications state
  const { 
    toast, 
    showToast, 
    notifications, 
    unreadCount: unreadNotificationsCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications,
    addNotification
  } = useNotifications();

  const { savedIds, toggleSave: originalToggleSave, wishlistSort, setWishlistSort, getSortedWishlist } = useWishlist();
  const { visitRequests, setVisitRequests, addVisitRequest } = useVisits();
  const { unreadChatsCount, openMsgPropertyId, setOpenMsgPropertyId, isMobileChatActive, setIsMobileChatActive } = useMessages();
  const { selectedPropertyId, currentRoute, setCurrentRoute, recentlyViewedIds, isExploringCategories, setIsExploringCategories, searchQuery, setSearchQuery, setSelectedPropertyId, navigate } = useSearch();

  const [activeTab, setActiveTab] = React.useState('HOME');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  // Guard for protected sections for unauthenticated guests
  React.useEffect(() => {
    const isProtected = ['WISHLIST', 'VISITS', 'BOOKINGS', 'NOTIFICATIONS', 'MESSAGES', 'ACCOUNT', 'PROFILE', 'VERIFICATION', 'ADDRESSES', 'REFERRALS', 'SUPPORT', 'SETTINGS', 'TERMS', 'PRIVACY', 'ABOUT', 'FEEDBACK'].includes(activeTab);
    if (isProtected && (!user || !profile)) {
      showToast('Please log in to access this section.', 'info');
      setAuthView('login');
      setActiveTab('HOME');
    }
  }, [activeTab, user, profile]);

  const toggleSave = (id: string) => {
    if (!user || !profile) {
      showToast('Please log in to save properties to your wishlist.', 'info');
      setAuthView('login');
      return;
    }
    originalToggleSave(id);
  };

  const handleBookAttempt = (propId: string) => {
    if (!user || !profile) {
      showToast('Please log in to arrange a viewing tour.', 'info');
      setAuthView('login');
      return;
    }
    setBookingPropertyId(propId);
    setIsBookVisitModalOpen(true);
  };

  const handleChatOwner = (propId: string) => {
    if (!user || !profile) {
      showToast('Please log in to message the property owner.', 'info');
      setAuthView('login');
      return;
    }
    setOpenMsgPropertyId(propId);
    setSelectedPropertyId(null);
    setActiveTab('MESSAGES');
    window.history.pushState({ route: 'MAIN' }, '', '/');
    setCurrentRoute('MAIN');
  };

  // Listen for password recovery trigger
  React.useEffect(() => {
    if (window.location.hash && window.location.hash.includes('type=recovery')) {
      setAuthView('reset_password');
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuthView('reset_password');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (profile) {
      localStorage.setItem('homstay-profile-name', profile.name || '');
      localStorage.setItem('homstay-profile-phone', profile.phone || '');
      localStorage.setItem('homstay-profile-email', profile.email || '');
    }
  }, [profile]);

  // Active Location state
  const [activeLocation, setActiveLocation] = React.useState<LocationInfo>(() => {
    try {
      const cached = localStorage.getItem('homstay-active-location');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return {
      name: "Riya Bhati House",
      area: "HSR Layout",
      city: "Bengaluru",
      pincode: "560102",
      address: "2nd Main, Sector 4, HSR Layout, Sector 2, Bengaluru",
      lat: 12.9141,
      lng: 77.6412
    };
  });

  const handleSelectLocation = (loc: LocationInfo) => {
    setActiveLocation(loc);
    try {
      localStorage.setItem('homstay-active-location', JSON.stringify(loc));
    } catch (e) {}
    showToast(`Service location synchronized to ${loc.area || loc.name}!`);
    
    // Refresh properties page state back to starting offset
    setPage(1);
    
    // Trigger notification alert
    addNotification('SYSTEM', 'Location Updated', `Active service area set to ${loc.area || loc.name}, ${loc.city}.`);
  };

  // Dialog togglers
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

  // We can push a dynamic notification when location changes
  React.useEffect(() => {
    // Save to local variable to avoid stale reference
    const timer = setTimeout(() => {
      // Adding a notification is nice, but let's notify only on real user change
    }, 100);
    return () => clearTimeout(timer);
  }, [activeLocation]);

  const {
    activeCategory,
    setActiveCategory,
    sections,
    paginatedProperties,
    setPaginatedProperties,
    page,
    setPage,
    totalPages,
    isLoading,
    viewAllSection,
    setViewAllSection,
    filters,
    setFilters,
    filteredProperties
  } = useProperties(searchQuery, activeTab, activeLocation);

  // Sidebar collapsible UI state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState<boolean>(() => {
    try {
      return localStorage.getItem('homstay-sidebar-collapsed') === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleToggleSidebarCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('homstay-sidebar-collapsed', String(next));
      } catch (e) {}
      return next;
    });
  };

  // Other dynamic modals and details state
  const [isBookVisitModalOpen, setIsBookVisitModalOpen] = React.useState<boolean>(false);
  const [bookingPropertyId, setBookingPropertyId] = React.useState<string | null>(null);
  const [chosenBookingDate, setChosenBookingDate] = React.useState('2026-06-05');
  const [chosenBookingTime, setChosenBookingTime] = React.useState('11:30 AM');
  const [chosenBookingMsg, setChosenBookingMsg] = React.useState('');

  // Logout Effect
  React.useEffect(() => {
    if (activeTab === 'LOGOUT') {
      try {
        signOut();
      } catch (e) {
        console.error('Logout error:', e);
      }
      setAuthView('main');
      showToast('Logged out successfully');
      setActiveTab('HOME');
    }
  }, [activeTab, signOut, showToast]);

  const triggerShare = (p: Property) => handleShare(p, showToast);

  // Sub-filtering & lists derived properties
  const findPropertyById = React.useCallback((id: string): Property | undefined => {
    if (!id) return undefined;
    return paginatedProperties.find(p => p.id === id) || 
           sections.flatMap(s => s.items || []).find(p => p.id === id) ||
           ALL_PROPERTIES.find(p => p.id === id);
  }, [paginatedProperties, sections]);

  const selectedProperty = React.useMemo(() => {
    return findPropertyById(selectedPropertyId || '');
  }, [selectedPropertyId, findPropertyById]);

  const combinedPropertiesList = React.useMemo(() => {
    const map = new Map<string, Property>();
    ALL_PROPERTIES.forEach(p => map.set(p.id, p));
    sections.flatMap(s => s.items || []).forEach(p => map.set(p.id, p));
    paginatedProperties.forEach(p => map.set(p.id, p));
    return Array.from(map.values());
  }, [paginatedProperties, sections]);

  const savedProperties = React.useMemo(() => {
    return Array.from(savedIds).map(id => findPropertyById(id)).filter(Boolean) as Property[];
  }, [savedIds, findPropertyById]);

  const sortedSavedProperties = React.useMemo(() => {
    return getSortedWishlist(savedProperties);
  }, [getSortedWishlist, savedProperties]);

  const currentCategoryProperties = React.useMemo(() => {
    // If we have properties loaded from the paginated API, they represent the rich live server database (350 properties).
    // This allows desktop & tablet to view properties across all cities (Mumbai, Delhi, Bengaluru, etc.)
    const sourceProperties = paginatedProperties && paginatedProperties.length > 0 
      ? paginatedProperties 
      : ALL_PROPERTIES;

    let filtered = [...sourceProperties];
    console.log("DIAGNOSTIC: starting currentCategoryProperties with count:", filtered.length, "Source is API?", paginatedProperties && paginatedProperties.length > 0);
    
    // Filter by city first (default to Bengaluru if not defined)
    const city = activeLocation?.city || 'Bengaluru';
    filtered = filtered.filter(p => {
      const pLoc = p.location ? p.location.toLowerCase() : '';
      const pCity = p.city ? p.city.toLowerCase() : '';
      const cityLower = city.toLowerCase();
      
      let matched = false;
      if (cityLower === 'bengaluru' || cityLower === 'bangalore') {
        matched = pLoc.includes('bengaluru') || pLoc.includes('bangalore') || pCity.includes('bengaluru') || pCity.includes('bangalore');
      } else {
        matched = pLoc.includes(cityLower) || pCity.includes(cityLower);
      }
      return matched;
    });
    console.log("DIAGNOSTIC: after city filter count:", filtered.length, "for city:", city);
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
      console.log("DIAGNOSTIC: after category filter count:", filtered.length, "for category:", activeCategory);
    }
    
    // Prioritize active area
    const area = activeLocation?.area || '';
    if (area) {
      const areaMatched = filtered.filter(p => {
        const pArea = p.area ? p.area.toLowerCase() : '';
        const pLoc = p.location ? p.location.toLowerCase() : '';
        return pArea.includes(area.toLowerCase()) || pLoc.includes(area.toLowerCase());
      });
      console.log("DIAGNOSTIC: area matched count:", areaMatched.length, "for area:", area);
      if (areaMatched.length > 0) {
        return areaMatched;
      }
    }
    
    return filtered;
  }, [activeCategory, activeLocation, paginatedProperties]);

  // Debugging pipeline logs as explicitly requested by user
  React.useEffect(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const breakpoint = width < 768 ? 'MOBILE' : width < 1024 ? 'TABLET' : 'DESKTOP';
    
    console.log("--- CRITICAL BUG INVESTIGATION PIPELINE LOGS ---");
    console.log("BREAKPOINT:", breakpoint, `(width: ${width}px)`);
    console.log("ALL LOCAL PROPERTIES COUNT:", ALL_PROPERTIES.length);
    console.log("API PAGINATED PROPERTIES COUNT:", paginatedProperties.length);
    console.log("SELECTED LOCATION:", activeLocation);
    console.log("SELECTED CATEGORY:", activeCategory);
    console.log("SEARCH QUERY:", searchQuery);
    console.log("DERIVED VISIBLE PROPERTIES COUNT:", currentCategoryProperties.length);
    
    if (currentCategoryProperties.length === 0) {
      console.log("REASON FOR EMPTY STATE: No stays matched city:", activeLocation?.city, "or category:", activeCategory, "or area:", activeLocation?.area);
    }
    console.log("-----------------------------------------------");
  }, [activeLocation, activeCategory, searchQuery, currentCategoryProperties, paginatedProperties]);

  const featuredProps = React.useMemo(() => {
    const list = currentCategoryProperties.filter(p => p.tag === 'HOT DEAL' || p.rating >= 4.5);
    return list.length > 0 ? list.slice(0, 4) : currentCategoryProperties.slice(0, 4);
  }, [currentCategoryProperties]);

  const nearbyProps = React.useMemo(() => {
    const area = activeLocation?.area || 'HSR Layout';
    const list = currentCategoryProperties.filter(p => {
      const pArea = p.area || p.location.split(',')[0] || '';
      return pArea.toLowerCase().trim().includes(area.toLowerCase().trim()) || 
             p.location.toLowerCase().includes(area.toLowerCase().trim());
    });
    return list.length > 0 ? list.slice(0, 4) : currentCategoryProperties.slice(0, 4);
  }, [currentCategoryProperties, activeLocation]);

  const recommendedProps = React.useMemo(() => {
    const list = currentCategoryProperties.filter(p => p.rating >= 4.3);
    return list.length > 0 ? list.slice(0, 4) : currentCategoryProperties.slice(2, 6);
  }, [currentCategoryProperties]);

  const recentlyViewedProps = React.useMemo(() => {
    const viewed = recentlyViewedIds
      .map(id => findPropertyById(id))
      .filter((p): p is Property => !!p && (activeCategory === 'all' || p.category === activeCategory));
    
    if (viewed.length > 0) return viewed.slice(0, 4);
    return currentCategoryProperties.slice(4, 8);
  }, [recentlyViewedIds, currentCategoryProperties, activeCategory]);

  const isAccountSection = ['ACCOUNT', 'PROFILE', 'VERIFICATION', 'ADDRESSES', 'REFERRALS', 'SUPPORT', 'SETTINGS', 'TERMS', 'PRIVACY', 'ABOUT', 'FEEDBACK'].includes(activeTab);

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Toast overlay for auth screens (auth pages return early before the main app toast is reached)
  const AuthToastOverlay = toast ? (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      className={`fixed top-4 right-4 z-[9999] max-w-xs px-5 py-3.5 rounded-2xl text-xs font-bold shadow-2xl border flex items-center gap-2 ${
        toast.type === 'success'
          ? 'bg-emerald-900/95 border-emerald-700/40 text-emerald-100'
          : toast.type === 'error'
          ? 'bg-rose-950/95 border-rose-700/40 text-rose-100'
          : 'bg-gray-900/95 border-transparent text-white'
      }`}
    >
      {toast.message}
    </motion.div>
  ) : null;

  const showAuthScreen = (!user || !profile) && authView !== 'main';

  if (showAuthScreen) {
    if (authView === 'signup') {
      return <><SignupPage onNavigateToLogin={() => setAuthView('login')} showToast={showToast} />{AuthToastOverlay}</>;
    }
    if (authView === 'forgot_password') {
      return <><ForgotPasswordPage onNavigateToLogin={() => setAuthView('login')} showToast={showToast} />{AuthToastOverlay}</>;
    }
    if (authView === 'reset_password') {
      return <><ResetPasswordPage onNavigateToLogin={() => setAuthView('login')} showToast={showToast} />{AuthToastOverlay}</>;
    }
    return (
      <>
        <LoginPage 
          onNavigateToSignup={() => setAuthView('signup')}
          onNavigateToForgotPassword={() => setAuthView('forgot_password')}
          showToast={showToast}
          onClose={() => {
            setAuthView('main');
            setActiveTab('HOME');
          }}
        />
        {AuthToastOverlay}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-primary font-sans relative transition-colors duration-400">
      
      {currentRoute === 'PROPERTY' ? (
        <React.Suspense fallback={
          <div className="min-h-screen bg-theme-bg flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <PropertyDetailsPage 
            property={selectedProperty}
            onBack={() => {
              const path = window.location.pathname;
              if (path.startsWith('/property/')) {
                window.history.pushState({ route: 'MAIN' }, '', '/');
                setCurrentRoute('MAIN');
                setSelectedPropertyId(null);
              } else if (window.history.length > 1) {
                window.history.back();
              } else {
                navigate('MAIN');
              }
            }}
            isSaved={selectedProperty ? savedIds.has(selectedProperty.id) : false}
            onToggleSave={toggleSave}
            onShare={triggerShare}
            visitStatus={selectedProperty ? (visitRequests.find(r => r.propertyId === selectedProperty.id)?.status || 'NONE') : 'NONE'}
            visitRequest={selectedProperty ? visitRequests.find(r => r.propertyId === selectedProperty.id) : undefined}
            onBookAttempt={handleBookAttempt}
            onChatOwner={handleChatOwner}
          />
        </React.Suspense>
      ) : currentRoute === 'SEARCH' ? (
        <React.Suspense fallback={
          <div className="min-h-screen bg-theme-bg flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <SearchPage 
            onBack={() => navigate('MAIN')}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onSelectProperty={setSelectedPropertyId}
            onShare={triggerShare}
            initialQuery={searchQuery}
            isDark={isDark}
          />
        </React.Suspense>
      ) : (
        <>

      {/* A. TABLET & DESKTOP VIEWPORT LAYOUT (>= 768px) */}
      <div className="hidden md:flex flex-row h-screen w-full overflow-hidden bg-theme-bg">
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unreadCount={unreadChatsCount}
          isDark={isDark}
          setIsDark={setIsDark}
          accent={accent}
          setAccent={setAccent}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebarCollapse}
        />

        <div className="flex-grow flex flex-col h-full overflow-hidden min-w-0 relative">
          {/* Main Top Header - only rendered if NOT on raw messages page */}
          {activeTab !== 'MESSAGES' && (
            <div className="relative">
              <DesktopHeader 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                savedCount={savedIds.size} 
                onOpenFilters={() => setIsFilterOpen(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeCategory={activeCategory}
                onSearchClick={() => navigate('SEARCH', searchQuery)}
                unreadMessagesCount={unreadChatsCount}
                isDark={isDark}
                setIsDark={setIsDark}
                accent={accent}
                setAccent={setAccent}
                showToast={showToast}
                onOpenLocationSelector={() => setIsLocationSelectorOpen(true)}
                selectedLocationName={activeLocation.area || activeLocation.name}
                onOpenNotifications={() => setActiveTab('NOTIFICATIONS')}
                unreadNotificationsCount={unreadNotificationsCount}
              />
            </div>
          )}

          {/* Main Workspace Body scroll region */}
          <div className="flex-1 overflow-y-auto w-full select-text h-full">
          {activeTab === 'HOME' && (
            <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-6 py-8 animate-in fade-in duration-500 w-full space-y-10">
              
              {/* Category selectors (Airbnb style scroller row) */}
              <div className="bg-theme-surface p-4 rounded-3xl border border-theme-border flex items-center justify-between gap-4 shadow-sm transition-all duration-300">
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
                  <button 
                    onClick={() => { setActiveCategory('all'); setPage(1); }}
                    className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      activeCategory === 'all' 
                        ? 'bg-theme-accent text-white shadow-md shadow-theme-accent/20' 
                        : 'bg-theme-bg text-theme-text-secondary hover:bg-theme-border/50 border border-theme-border/60'
                    }`}
                  >
                    All Verified
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button 
                      key={cat.id} 
                      onClick={() => { setActiveCategory(cat.id); setPage(1); }}
                      className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                        activeCategory === cat.id 
                          ? 'bg-theme-accent text-white shadow-md shadow-theme-accent/20' 
                          : 'bg-theme-bg text-theme-text-secondary hover:bg-theme-border/50 border border-theme-border/60'
                      }`}
                    >
                      <cat.icon size={13} />
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>

                {/* Immediate Search Count Tag */}
                <span className="text-[9px] font-black tracking-widest text-theme-accent bg-theme-accent-soft px-3.5 py-1.5 rounded-full uppercase shrink-0 block">
                  {currentCategoryProperties.length} DISCOVERIES
                </span>
              </div>

              {/* Discovery Sections */}
              <div className="space-y-10">
                
                {currentCategoryProperties.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500 bg-theme-surface border border-theme-border rounded-3xl p-8 max-w-lg mx-auto">
                    <div className="w-16 h-16 bg-theme-accent-soft text-theme-accent rounded-full flex items-center justify-center mb-4">
                      <Building2 size={28} />
                    </div>
                    <h3 className="font-serif text-base font-bold text-theme-text-primary uppercase">No Available Stays found</h3>
                    <p className="text-xs text-theme-text-secondary mt-2 max-w-xs leading-relaxed">
                      We couldn't find any listings matching your current category or search criteria in {activeLocation?.area || activeLocation?.city || 'this location'}.
                    </p>
                    <button 
                      onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                      className="mt-6 bg-theme-accent hover:bg-theme-accent-hover text-white font-black px-5 py-3 rounded-xl text-[10px] uppercase tracking-wider cursor-pointer"
                    >
                      Clear Filters & Show All
                    </button>
                  </div>
                ) : (
                  <>
                    {/* 1. FEATURED PROPERTIES */}
                    {featuredProps.length > 0 && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between border-b border-theme-border/60 pb-2">
                          <h2 className="font-serif text-lg font-black text-theme-text-primary uppercase tracking-tight flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-theme-accent rounded-full"></span>
                            Featured Properties
                          </h2>
                          <span className="text-[9px] font-bold tracking-widest text-theme-accent bg-theme-accent-soft px-3 py-1 rounded-full uppercase shrink-0">
                            Curated Premium
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {featuredProps.map((prop, idx) => (
                            <div key={prop.id} className={idx === 3 ? 'hidden lg:block' : ''}>
                              <CustomPropertyCard 
                                property={prop}
                                isSaved={savedIds.has(prop.id)}
                                onToggleSave={toggleSave}
                                onClick={setSelectedPropertyId}
                                onShare={triggerShare}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. NEARBY PROPERTIES */}
                    {nearbyProps.length > 0 && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between border-b border-theme-border/60 pb-2">
                          <h2 className="font-serif text-lg font-black text-theme-text-primary uppercase tracking-tight flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-theme-accent rounded-full"></span>
                            Nearby Properties
                          </h2>
                          <span className="text-[9px] font-bold tracking-widest text-theme-accent bg-theme-accent-soft px-3 py-1 rounded-full uppercase shrink-0">
                            Prime Locations
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {nearbyProps.map((prop, idx) => (
                            <div key={prop.id} className={idx === 3 ? 'hidden lg:block' : ''}>
                              <CustomPropertyCard 
                                property={prop}
                                isSaved={savedIds.has(prop.id)}
                                onToggleSave={toggleSave}
                                onClick={setSelectedPropertyId}
                                onShare={triggerShare}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. RECOMMENDED PROPERTIES */}
                    {recommendedProps.length > 0 && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between border-b border-theme-border/60 pb-2">
                          <h2 className="font-serif text-lg font-black text-theme-text-primary uppercase tracking-tight flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-theme-accent rounded-full"></span>
                            Recommended Properties
                          </h2>
                          <span className="text-[9px] font-bold tracking-widest text-theme-accent bg-theme-accent-soft px-3 py-1 rounded-full uppercase shrink-0">
                            Top Verified
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {recommendedProps.map((prop, idx) => (
                            <div key={prop.id} className={idx === 3 ? 'hidden lg:block' : ''}>
                              <CustomPropertyCard 
                                property={prop}
                                isSaved={savedIds.has(prop.id)}
                                onToggleSave={toggleSave}
                                onClick={setSelectedPropertyId}
                                onShare={triggerShare}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. RECENTLY VIEWED / RECENT PICKS */}
                    {recentlyViewedProps.length > 0 && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between border-b border-theme-border/60 pb-2">
                          <h2 className="font-serif text-lg font-black text-theme-text-primary uppercase tracking-tight flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-theme-accent rounded-full"></span>
                            {recentlyViewedIds.length > 0 ? "Recently Viewed" : "Recent Picks"}
                          </h2>
                          <span className="text-[9px] font-bold tracking-widest text-theme-accent bg-theme-accent-soft px-3 py-1 rounded-full uppercase shrink-0">
                            Selected History
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {recentlyViewedProps.map((prop, idx) => (
                            <div key={prop.id} className={idx === 3 ? 'hidden lg:block' : ''}>
                              <CustomPropertyCard 
                                property={prop}
                                isSaved={savedIds.has(prop.id)}
                                onToggleSave={toggleSave}
                                onClick={setSelectedPropertyId}
                                onShare={triggerShare}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>

            </div>
          )}

          {activeTab === 'VISITS' && (
            <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-6 py-8 space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-3 border-b border-theme-border pb-5">
                <div 
                  onClick={() => setActiveTab('HOME')}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                  title="Back to Home"
                >
                  <button 
                    className="p-1.5 -ml-1 hover:bg-theme-border/45 rounded-full text-theme-text-primary group-hover:text-theme-accent transition-all flex items-center justify-center shrink-0 border border-theme-border/80 bg-theme-surface animate-pulse"
                  >
                    <ChevronLeft size={20} className="stroke-[3]" />
                  </button>
                  <div>
                    <h1 className="font-serif text-2xl font-black uppercase tracking-wider text-theme-text-primary group-hover:text-theme-accent transition-colors duration-200">← Your Viewing Stays</h1>
                    <p className="text-xs text-theme-text-secondary mt-1">Schedule and manage physical in-person verified viewings with hosts.</p>
                  </div>
                </div>
              </div>

              <MyVisitsSection 
                visitRequests={visitRequests}
                setVisitRequests={setVisitRequests}
                propertiesList={combinedPropertiesList}
                onSelectPropertyId={setSelectedPropertyId}
                onChatOwner={(propId) => {
                  setOpenMsgPropertyId(propId);
                  setActiveTab('MESSAGES');
                }}
                onSelectTab={setActiveTab}
                showToast={showToast}
                onStartBrowsing={() => setActiveTab('HOME')}
                addNotification={addNotification}
              />
            </div>
          )}

          {activeTab === 'WISHLIST' && (
            <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-6 py-8 space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between border-b border-theme-border pb-5">
                <div 
                  onClick={() => setActiveTab('HOME')}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                  title="Back to Home"
                >
                  <button 
                    className="p-1.5 -ml-1 hover:bg-theme-border/45 rounded-full text-theme-text-primary group-hover:text-theme-accent transition-all flex items-center justify-center shrink-0 border border-theme-border/80 bg-theme-surface animate-pulse"
                  >
                    <ChevronLeft size={20} className="stroke-[3]" />
                  </button>
                  <div>
                    <h1 className="font-serif text-2xl font-black uppercase tracking-wider text-theme-text-primary group-hover:text-theme-accent transition-colors duration-200">← Your Wishlist</h1>
                    <p className="text-xs text-theme-text-secondary mt-1">Bookmarked premium properties saved for later review</p>
                  </div>
                </div>
                <div className="bg-theme-accent-soft text-theme-accent px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider font-sans">
                  {savedProperties.length} Saved
                </div>
              </div>

              {savedProperties.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-theme-surface/50 p-4 rounded-3xl border border-theme-border/50 font-sans">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-widest text-theme-text-secondary mr-2">Sort Saved Stays:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'price-low', label: '₹ Price: Low to High' },
                        { id: 'price-high', label: '₹ Price: High to Low' },
                        { id: 'rating', label: '★ Rating' },
                        { id: 'name', label: 'A-Z Name' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setWishlistSort(opt.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                            wishlistSort === opt.id
                              ? 'bg-theme-accent border-theme-accent text-white shadow-md shadow-theme-accent/10 font-black'
                              : 'bg-theme-bg border-theme-border/40 text-theme-text-secondary hover:text-theme-text-primary'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {sortedSavedProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedSavedProperties.map((prop) => (
                    <VirtualItem key={prop.id}>
                      <CustomPropertyCard 
                        property={prop}
                        isSaved={true}
                        onToggleSave={toggleSave}
                        onClick={setSelectedPropertyId}
                        onShare={triggerShare}
                      />
                    </VirtualItem>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-theme-surface border border-theme-border/60 rounded-3xl p-6 text-center max-w-lg mx-auto shadow-sm text-sans">
                    <Heart size={28} className="text-theme-text-secondary/30 mx-auto mb-2" />
                    <h3 className="font-serif text-sm font-black text-theme-text-primary uppercase">Your Wishlist is Empty</h3>
                    <p className="text-xs text-theme-text-secondary mt-1">Below are available verified premium stays you can save right away:</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {ALL_PROPERTIES.slice(0, 8).map((prop) => (
                      <VirtualItem key={prop.id}>
                        <CustomPropertyCard 
                          property={prop}
                          isSaved={false}
                          onToggleSave={toggleSave}
                          onClick={setSelectedPropertyId}
                          onShare={triggerShare}
                        />
                      </VirtualItem>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'BOOKINGS' && (
            <div className="max-w-4xl mx-auto px-6 py-8 space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-3 border-b border-theme-border pb-5 text-left">
                <div 
                  onClick={() => setActiveTab('HOME')}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                  title="Back to Home"
                >
                  <button 
                    className="p-1.5 -ml-1 hover:bg-theme-border/45 rounded-full text-theme-text-primary group-hover:text-theme-accent transition-all flex items-center justify-center shrink-0 border border-theme-border/80 bg-theme-surface animate-pulse"
                  >
                    <ChevronLeft size={20} className="stroke-[3]" />
                  </button>
                  <div>
                    <h1 className="font-serif text-2xl font-black uppercase tracking-wider text-theme-text-primary group-hover:text-theme-accent transition-colors duration-200">← Your Bookings</h1>
                    <p className="text-xs text-theme-text-secondary mt-1">Verify and manage rental reservations securely with zero-fee assurance.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-theme-surface border border-theme-border/60 rounded-3xl p-6 text-center max-w-lg mx-auto shadow-sm text-sans">
                  <Calendar size={28} className="text-theme-text-secondary/30 mx-auto mb-2 animate-bounce" />
                  <h3 className="font-serif text-sm font-black text-theme-text-primary uppercase">No Active Bookings</h3>
                  <p className="text-xs text-theme-text-secondary mt-1">Below are available verified premium stays you can reserve instantly:</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {ALL_PROPERTIES.slice(0, 8).map((prop) => (
                    <VirtualItem key={prop.id}>
                      <CustomPropertyCard 
                        property={prop}
                        isSaved={savedIds.has(prop.id)}
                        onToggleSave={toggleSave}
                        onClick={setSelectedPropertyId}
                        onShare={triggerShare}
                      />
                    </VirtualItem>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'NOTIFICATIONS' && (
            <div className="max-w-4xl mx-auto px-6 py-8 space-y-6 animate-in fade-in duration-500 text-left">
              <div className="flex items-center gap-3 border-b border-theme-border pb-5">
                <div 
                  onClick={() => setActiveTab('HOME')}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                  title="Back to Home"
                >
                  <button 
                    className="p-1.5 -ml-1 hover:bg-theme-border/45 rounded-full text-theme-text-primary group-hover:text-theme-accent transition-all flex items-center justify-center shrink-0 border border-theme-border/80 bg-theme-surface animate-pulse"
                  >
                    <ChevronLeft size={20} className="stroke-[3]" />
                  </button>
                  <div>
                    <h1 className="font-serif text-2xl font-black uppercase tracking-wider text-theme-text-primary group-hover:text-theme-accent transition-colors duration-200">← Your Notifications</h1>
                    <p className="text-xs text-theme-text-secondary mt-1">Updates regarding your zero brokerage visits, profile verification, and host messages.</p>
                  </div>
                </div>
              </div>
              <div className="bg-theme-surface border border-theme-border/60 rounded-3xl overflow-hidden shadow-sm">
                <NotificationCenter
                  notifications={notifications}
                  unreadCount={unreadNotificationsCount}
                  markAsRead={markAsRead}
                  markAllAsRead={markAllAsRead}
                  clearNotifications={clearNotifications}
                  onClose={() => setActiveTab('HOME')}
                  onActionClick={(tab, id) => {
                    if (id) setSelectedPropertyId(id);
                    setActiveTab(tab as any);
                  }}
                  variant="tablet-panel"
                />
              </div>
            </div>
          )}

          {isAccountSection && (
            <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
              <React.Suspense fallback={
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <AccountCenter 
                  isDark={isDark}
                  setIsDark={setIsDark}
                  accent={accent}
                  setAccent={setAccent}
                  onLogout={async () => {
                    try {
                      await signOut();
                    } catch (e) {}
                    setAuthView('main');
                    showToast('Logged out successfully');
                    setActiveTab('HOME');
                  }}
                  onSelectedPropertyIdChange={setSelectedPropertyId}
                  propertiesList={combinedPropertiesList}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </React.Suspense>
            </div>
          )}

          {activeTab === 'MESSAGES' && (
            <React.Suspense fallback={
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <MessagesSection 
                propertiesList={combinedPropertiesList}
                onSelectProperty={(id) => {
                  setSelectedPropertyId(id);
                  setActiveTab('HOME');
                }}
                onBackToExplore={() => setActiveTab('HOME')}
                openConversationWithPropertyId={openMsgPropertyId}
                onClearOpenConversation={() => setOpenMsgPropertyId(null)}
                onChatActiveChange={setIsMobileChatActive}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                isDark={isDark}
                setIsDark={setIsDark}
                accent={accent}
                setAccent={setAccent}
              />
            </React.Suspense>
          )}
          </div>
        </div>
      </div>

      {/* B. MOBILE VIEWPORT LAYOUT (< 768px) */}
      <div className={`md:hidden min-h-screen bg-theme-bg relative flex flex-col w-full ${isMobileChatActive ? 'pb-0' : 'pb-24'}`}>
        <main className="flex-1 animate-in fade-in duration-500 min-h-0">
          {activeTab === 'HOME' && (
            <>
              <Header 
                onOpenFilters={() => setIsFilterOpen(true)} 
                onOpenWishlist={() => setActiveTab('WISHLIST')} 
                savedCount={savedIds.size} 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearchClick={() => navigate('SEARCH', searchQuery)}
                currentAccent={accent}
                isDark={isDark}
                onAccentChange={setAccent}
                onDarkToggle={setIsDark}
                onOpenLocationSelector={() => setIsLocationSelectorOpen(true)}
                selectedLocationName={activeLocation.area || activeLocation.name}
                onOpenNotifications={() => setActiveTab('NOTIFICATIONS')}
                unreadNotificationsCount={unreadNotificationsCount}
              />
              <CategoryNav activeCategory={activeCategory} onSelect={(id) => { setActiveCategory(id); setPage(1); }} />
              
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {sections.map(section => (
                  <SectionWrapper 
                    key={section.id} 
                    section={section} 
                    savedIds={savedIds} 
                    onToggleSave={toggleSave} 
                    onClick={setSelectedPropertyId} 
                    onShare={triggerShare}
                    onViewAll={setViewAllSection}
                  />
                ))}
                
                {activeCategory === 'all' && <OwnerCTA />}
                
                {activeCategory === 'all' && (
                  <div className="px-4 py-8">
                    <button 
                      onClick={() => setIsExploringCategories(true)}
                      className="w-full bg-[#18181B] text-white py-5 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl shadow-black/10 cursor-pointer text-sans text-sm"
                    >
                      <LayoutGrid size={20} />
                      <span>Explore All Categories</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'VISITS' && (
            <div className="bg-theme-bg min-h-screen pb-24">
              <div className="bg-gradient-to-br from-theme-accent to-theme-accent-hover px-6 pt-12 pb-8 text-white shadow-sm flex justify-between items-start">
                <div 
                  onClick={() => setActiveTab('HOME')}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                  title="Back to Home"
                >
                  <button 
                    className="p-1.5 hover:bg-white/10 rounded-full text-white transition-all flex items-center justify-center shrink-0 border border-white/20"
                  >
                    <ChevronLeft size={20} className="stroke-[3]" />
                  </button>
                  <div>
                    <h1 className="font-serif text-2xl font-black leading-none group-hover:text-white/80 transition-colors">← Your Visits</h1>
                    <p className="text-[10px] font-sans font-bold text-white/70 uppercase tracking-widest mt-1.5 leading-none">Scheduled stay tours</p>
                  </div>
                </div>
                <div className="relative mt-1">
                  <ThemeSwitcher 
                    currentAccent={accent} 
                    isDark={isDark} 
                    onAccentChange={setAccent} 
                    onDarkToggle={setIsDark} 
                    mode="inline"
                    buttonTheme="dark"
                  />
                </div>
              </div>
              <div className="px-4 py-6">
                <MyVisitsSection 
                  visitRequests={visitRequests}
                  setVisitRequests={setVisitRequests}
                  propertiesList={ALL_PROPERTIES}
                  onSelectPropertyId={setSelectedPropertyId}
                  onChatOwner={(propId) => {
                    setOpenMsgPropertyId(propId);
                    setActiveTab('MESSAGES');
                  }}
                  onSelectTab={setActiveTab}
                  showToast={showToast}
                  onStartBrowsing={() => setActiveTab('HOME')}
                  addNotification={addNotification}
                />
              </div>
            </div>
          )}

          {activeTab === 'WISHLIST' && (
            <div className="bg-theme-bg min-h-screen pb-24">
              <div className="bg-gradient-to-br from-theme-accent to-theme-accent-hover px-6 pt-12 pb-8 text-white shadow-sm flex justify-between items-start">
                <div 
                  onClick={() => setActiveTab('HOME')}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                  title="Back to Home"
                >
                  <button 
                    className="p-1.5 hover:bg-white/10 rounded-full text-white transition-all flex items-center justify-center shrink-0 border border-white/20"
                  >
                    <ChevronLeft size={20} className="stroke-[3]" />
                  </button>
                  <div>
                    <h1 className="font-serif text-2xl font-black leading-none group-hover:text-white/80 transition-colors">← Your Wishlist</h1>
                    <p className="text-[10px] font-sans font-bold text-white/70 uppercase tracking-widest mt-1.5 leading-none">Bookmarked stays</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-6 space-y-4">
                {savedProperties.length > 0 && (
                  <div className="bg-theme-surface p-3 rounded-2xl border border-theme-border flex flex-col gap-2 font-sans">
                    <span className="text-[9px] font-black uppercase tracking-widest text-theme-text-secondary">Sort Bookmarks:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'price-low', label: 'Price Low' },
                        { id: 'price-high', label: 'Price High' },
                        { id: 'rating', label: 'Rating' },
                        { id: 'name', label: 'A-Z Name' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setWishlistSort(opt.id as any)}
                          className={`py-2 px-1 rounded-xl text-[9px] font-bold uppercase tracking-wider border text-center transition-all cursor-pointer ${
                            wishlistSort === opt.id
                              ? 'bg-theme-accent border-theme-accent text-white shadow font-black'
                              : 'bg-theme-bg border-theme-border/50 text-theme-text-secondary hover:text-theme-text-primary'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {sortedSavedProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sortedSavedProperties.map(prop => (
                      <VirtualItem key={prop.id}>
                        <CustomPropertyCard 
                          property={prop} 
                          isSaved={true}
                          onToggleSave={toggleSave}
                          onClick={setSelectedPropertyId}
                          onShare={triggerShare}
                        />
                      </VirtualItem>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-theme-surface border border-theme-border rounded-2xl p-5 text-center shadow-sm text-sans">
                      <Heart size={24} className="text-theme-text-secondary/30 mx-auto mb-1" />
                      <h3 className="font-serif text-sm font-black text-theme-text-primary uppercase leading-tight">Your Wishlist is Empty</h3>
                      <p className="text-[11px] text-theme-text-secondary mt-1">Check verified properties available for immediate saving below:</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {ALL_PROPERTIES.slice(0, 8).map((prop) => (
                        <VirtualItem key={prop.id}>
                          <CustomPropertyCard 
                            property={prop}
                            isSaved={false}
                            onToggleSave={toggleSave}
                            onClick={setSelectedPropertyId}
                            onShare={triggerShare}
                          />
                        </VirtualItem>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'BOOKINGS' && (
            <div className="bg-theme-bg min-h-screen">
              <div className="bg-gradient-to-br from-theme-accent to-theme-accent-hover px-6 pt-12 pb-8 text-white shadow-sm flex justify-between items-start">
                <div 
                  onClick={() => setActiveTab('HOME')}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                  title="Back to Home"
                >
                  <button 
                    className="p-1.5 hover:bg-white/10 rounded-full text-white transition-all flex items-center justify-center shrink-0 border border-white/20"
                  >
                    <ChevronLeft size={20} className="stroke-[3]" />
                  </button>
                  <div>
                    <h1 className="font-serif text-2xl font-black leading-none group-hover:text-white/80 transition-colors">← Your Bookings</h1>
                    <p className="text-[10px] font-sans font-bold text-white/70 uppercase tracking-widest mt-1.5 leading-none">Zero brokerage platform checks</p>
                  </div>
                </div>
                <div className="relative mt-1">
                  <ThemeSwitcher 
                    currentAccent={accent} 
                    isDark={isDark} 
                    onAccentChange={setAccent} 
                    onDarkToggle={setIsDark} 
                    mode="inline"
                    buttonTheme="dark"
                  />
                </div>
              </div>
              <div className="px-4 py-6 space-y-6">
                <div className="bg-theme-surface border border-theme-border rounded-3xl p-5 text-center max-w-lg mx-auto shadow-sm text-sans">
                  <Calendar size={24} className="text-theme-text-secondary/30 mx-auto mb-2" />
                  <h3 className="font-serif text-sm font-black text-theme-text-primary uppercase leading-none">No Active Bookings</h3>
                  <p className="text-[11px] text-theme-text-secondary mt-1 max-w-sm mx-auto">Explore verified properties available for immediate booking:</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ALL_PROPERTIES.slice(0, 8).map((prop) => (
                    <VirtualItem key={prop.id}>
                      <CustomPropertyCard 
                        property={prop}
                        isSaved={savedIds.has(prop.id)}
                        onToggleSave={toggleSave}
                        onClick={setSelectedPropertyId}
                        onShare={triggerShare}
                      />
                    </VirtualItem>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'NOTIFICATIONS' && (
            <div className="bg-theme-bg min-h-screen">
              <div className="bg-gradient-to-br from-theme-accent to-theme-accent-hover px-6 pt-12 pb-8 text-white shadow-sm flex justify-between items-start">
                <div 
                  onClick={() => setActiveTab('HOME')}
                  className="flex items-center gap-3 cursor-pointer group select-none block text-left"
                  title="Back to Home"
                >
                  <button 
                    className="p-1.5 hover:bg-white/10 rounded-full text-white transition-all flex items-center justify-center shrink-0 border border-white/20"
                  >
                    <ChevronLeft size={20} className="stroke-[3]" />
                  </button>
                  <div>
                    <h1 className="font-serif text-2xl font-black leading-none group-hover:text-white/80 transition-colors">← Your Notifications</h1>
                    <p className="text-[10px] font-sans font-bold text-white/70 uppercase tracking-widest mt-1.5 leading-none">Updates and direct verification alerts</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-6">
                <div className="bg-theme-surface border border-theme-border rounded-3xl overflow-hidden shadow-sm">
                  <NotificationCenter
                    notifications={notifications}
                    unreadCount={unreadNotificationsCount}
                    markAsRead={markAsRead}
                    markAllAsRead={markAllAsRead}
                    clearNotifications={clearNotifications}
                    onClose={() => setActiveTab('HOME')}
                    onActionClick={(tab, id) => {
                      if (id) setSelectedPropertyId(id);
                      setActiveTab(tab as any);
                    }}
                    variant="tablet-panel"
                  />
                </div>
              </div>
            </div>
          )}

          {isAccountSection && (
            <div className="bg-theme-bg min-h-screen px-4 py-8">
              <React.Suspense fallback={
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <AccountCenter 
                  isDark={isDark}
                  setIsDark={setIsDark}
                  accent={accent}
                  setAccent={setAccent}
                  onLogout={async () => {
                    try {
                      await signOut();
                    } catch (e) {}
                    setAuthView('main');
                    showToast('Logged out successfully');
                    setActiveTab('HOME');
                  }}
                  onSelectedPropertyIdChange={setSelectedPropertyId}
                  propertiesList={combinedPropertiesList}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </React.Suspense>
            </div>
          )}

          {activeTab === 'MESSAGES' && (
            <React.Suspense fallback={
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <MessagesSection 
                propertiesList={combinedPropertiesList}
                onSelectProperty={(id) => {
                  setSelectedPropertyId(id);
                  setActiveTab('HOME');
                }}
                onBackToExplore={() => setActiveTab('HOME')}
                openConversationWithPropertyId={openMsgPropertyId}
                onClearOpenConversation={() => setOpenMsgPropertyId(null)}
                onChatActiveChange={setIsMobileChatActive}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                isDark={isDark}
                setIsDark={setIsDark}
                accent={accent}
                setAccent={setAccent}
              />
            </React.Suspense>
          )}
        </main>
        
        {!isMobileChatActive && (
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} unreadCount={unreadChatsCount} savedCount={savedIds.size} />
        )}
      </div>
        </>
      )}

      {/* 3. SHARED MODALS & OVERLAYS */}
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setIsFilterOpen(false);
        }}
      />

      {isExploringCategories && (
        <ExploreCategories 
          onBack={() => setIsExploringCategories(false)}
          onSelectCategory={(id) => {
            setActiveCategory(id);
            setIsExploringCategories(false);
          }}
        />
      )}

      {viewAllSection && (
        <ViewAll 
          title={viewAllSection.title}
          category={viewAllSection.id}
          onBack={() => setViewAllSection(null)}
          onSelectProperty={(id) => {
            setSelectedPropertyId(id);
            setViewAllSection(null);
          }}
          savedIds={Array.from(savedIds)}
          onToggleSave={toggleSave}
          onShare={triggerShare}
        />
      )}

      {isBookVisitModalOpen && bookingPropertyId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 overflow-y-auto font-sans">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-theme-surface border border-theme-border rounded-[32px] w-full max-w-lg p-6 lg:p-8 space-y-6 shadow-2xl relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-theme-border/50 pb-4">
              <div>
                <span className="text-[9px] font-black uppercase text-theme-accent tracking-widest block font-sans">Zero Brokerage Verified Tour</span>
                <h3 className="font-serif text-lg font-bold text-theme-text-primary">Arrange In-Person Physical Viewing</h3>
              </div>
              <button 
                onClick={() => {
                  setIsBookVisitModalOpen(false);
                  setBookingPropertyId(null);
                }}
                className="w-10 h-10 rounded-full bg-theme-bg hover:bg-theme-border/40 text-theme-text-secondary hover:text-theme-text-primary flex items-center justify-center border border-theme-border/50 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Property Minimal Summary Card */}
            {(() => {
              const bookingProperty = findPropertyById(bookingPropertyId || '');
              if (!bookingProperty) return null;
              return (
                <div className="flex items-center gap-4 bg-theme-bg/60 border border-theme-border/40 rounded-2xl p-3">
                  <img src={bookingProperty.image} alt={bookingProperty.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-theme-border/30" referrerPolicy="no-referrer" />
                  <div className="min-w-0 pr-2">
                    <h4 className="font-serif text-xs font-bold text-theme-text-primary truncate">{bookingProperty.title}</h4>
                    <p className="text-[10px] text-theme-text-secondary truncate mt-0.5">{bookingProperty.location}</p>
                    <p className="text-[11px] font-serif font-black text-theme-accent mt-1">₹{bookingProperty.price?.toLocaleString()} / month</p>
                  </div>
                </div>
              );
            })()}

            {/* Inputs Form */}
            <div className="space-y-4">
              
              {/* Date Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-theme-text-secondary select-none font-sans">1. Choose Booking Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    min="2026-06-04"
                    max="2026-07-04"
                    value={chosenBookingDate}
                    onChange={(e) => setChosenBookingDate(e.target.value)}
                    className="w-full bg-theme-bg hover:bg-theme-bg/80 border border-[#202023] rounded-xl px-4 py-3 text-xs font-semibold text-theme-text-primary focus:outline-none focus:border-theme-accent transition-colors"
                  />
                </div>
              </div>

              {/* Time Slots Selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-theme-text-secondary select-none font-sans">2. Select Viewing Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '10:00 AM', label: '10:00 AM', tag: 'Morning' },
                    { id: '11:30 AM', label: '11:30 AM', tag: 'Morning' },
                    { id: '02:00 PM', label: '02:00 PM', tag: 'Afternoon' },
                    { id: '04:30 PM', label: '04:30 PM', tag: 'Afternoon' },
                    { id: '06:00 PM', label: '06:00 PM', tag: 'Evening' },
                    { id: '07:30 PM', label: '07:30 PM', tag: 'Evening' }
                  ].map((slot) => {
                    const isSelected = chosenBookingTime === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setChosenBookingTime(slot.id)}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all cursor-pointer outline-none ${
                          isSelected 
                            ? 'bg-theme-accent border-theme-accent text-white shadow-md' 
                            : 'bg-theme-bg border-theme-border text-theme-text-primary hover:bg-theme-border/20'
                        }`}
                      >
                        <span className="text-[10px] font-black tracking-wide leading-tight">{slot.label}</span>
                        <span className={`text-[8px] mt-0.5 leading-none ${isSelected ? 'text-white/80' : 'text-theme-text-secondary/80'}`}>{slot.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Msg input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-widest text-theme-text-secondary select-none font-sans">3. Host Message (Optional)</label>
                  <span className="text-[9px] text-theme-text-secondary/70 font-semibold font-sans">Verified introduction</span>
                </div>
                <textarea
                  rows={3}
                  value={chosenBookingMsg}
                  onChange={(e) => setChosenBookingMsg(e.target.value)}
                  placeholder="Hi there! I would love to schedule an in-person tour. Please check if this slot works well for you..."
                  className="w-full bg-theme-bg hover:bg-theme-bg/80 border border-theme-border rounded-2xl p-4 text-xs font-semibold text-theme-text-primary placeholder:text-theme-text-secondary/40 focus:outline-none focus:border-theme-accent transition-all resize-none leading-normal"
                />
              </div>

            </div>

            {/* Modal actions footer */}
            <div className="flex gap-3 pt-3.5 border-t border-theme-border/50">
              <button
                type="button"
                onClick={() => {
                  setIsBookVisitModalOpen(false);
                  setBookingPropertyId(null);
                }}
                className="flex-1 bg-theme-bg hover:bg-theme-border/50 text-theme-text-primary border border-theme-border font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  // Construct new request
                  const bookingProperty = findPropertyById(bookingPropertyId || '');
                  if (!bookingProperty) {
                    console.error("STEP 4.1: Property lookup failed for ID:", bookingPropertyId);
                    alert("Property lookup failed. Please refresh and try again.");
                    return;
                  }

                  const triggerAddVisit = async () => {
                    const result = await addVisitRequest({
                      propertyId: bookingProperty.id,
                      tenantName: profile?.name || 'Riya Bhati',
                      date: chosenBookingDate,
                      time: chosenBookingTime,
                      status: 'pending',
                      message: chosenBookingMsg || 'Hi! I would love to check out your premium flat in person.'
                    });

                    if (result?.success) {
                      setIsBookVisitModalOpen(false);
                      setBookingPropertyId(null);
                      setChosenBookingMsg('');

                      setActiveTab('VISITS');
                      window.history.pushState({ route: 'MAIN' }, '', '/');
                      setCurrentRoute('MAIN');
                      setSelectedPropertyId(null);

                      showToast(`Visit Requested Successfully! Review it on the "Visits" tab.`, 'success');
                      addNotification(
                        'VISIT_PENDING',
                        'Visit Request Submitted',
                        `Your visit request for ${bookingProperty.title} is now pending owner approval.`,
                        bookingProperty.id,
                        'VISITS'
                      );
                    } else {
                      showToast(`Failed to request visit: ${result?.error || 'Unknown Error'}`, 'error');
                      alert(`Failed to request visit: ${result?.error || 'Unknown Error'}`);
                    }
                  };
                  triggerAddVisit();
                }}
                className="flex-1 bg-theme-accent hover:bg-theme-accent-hover text-white font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-theme-accent/20 hover:shadow-xl transition-all cursor-pointer"
              >
                Request Viewing Tour
              </button>
            </div>

          </motion.div>
        </div>
      )}


      {/* Location Selector modal */}
      <LocationSelectorModal
        isOpen={isLocationSelectorOpen}
        onClose={() => setIsLocationSelectorOpen(false)}
        activeLocation={activeLocation}
        onSelectLocation={handleSelectLocation}
      />

      {/* Mobile Notification Center replaced with direct view tab */}


      {/* Toast Notification */}
      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-xs font-black shadow-2xl border ${
            toast.type === 'success'
              ? 'bg-emerald-900 border-emerald-500/30 text-emerald-100'
              : toast.type === 'error'
              ? 'bg-rose-950 border-rose-500/30 text-rose-100'
              : 'bg-gray-900 text-white border-transparent'
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
}
