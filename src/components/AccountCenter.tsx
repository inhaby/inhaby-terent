import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, CheckCircle2, AlertTriangle, Clock, XCircle, 
  ChevronRight, ChevronLeft, Calendar, MapPin, Tag, Info, FileText, 
  ShieldCheck, MessageCircle, LogOut, Phone, Mail, 
  Upload, Copy, Check, Plus, Trash2, Edit2, Search,
  Briefcase, GraduationCap, Compass, Send, ThumbsUp, HelpCircle
} from 'lucide-react';
import { LazyImage } from './LazyImage';
import { AccentTheme } from './ThemeSwitcher';

// --- Sub-component Imports (Standard) ---
import { ProfileView } from './Account/ProfileView';
import { VerificationView } from './Account/VerificationView';
import { YourBookingsDashboard } from './Account/YourBookingsDashboard';
import { RecentActivityDashboard } from './Account/RecentActivityDashboard';
import { AddressesView } from './Account/AddressesView';
import { ReferralsView } from './Account/ReferralsView';
import { AboutView } from './Account/AboutView';

// --- Lazy-Loaded Views ---
const TermsSection = lazy(() => import('./Account/TermsSection'));
const PrivacySection = lazy(() => import('./Account/PrivacySection'));
const SupportSection = lazy(() => import('./Account/SupportSection'));
const FeedbackSection = lazy(() => import('./Account/FeedbackSection'));

// --- TS Types for Account Center ---
export interface Address {
  id: string;
  category: 'Home' | 'Office' | 'College' | 'Custom';
  name: string;
  fullAddress: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
}

export interface Ticket {
  id: string;
  relatedTo: string;
  description: string;
  status: 'Open' | 'Pending' | 'Resolved' | 'Closed';
  createdAt: string;
  attachmentName?: string;
}

export interface Feedback {
  id: string;
  categories: string[];
  description: string;
  createdAt: string;
}

interface AccountCenterProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  accent: AccentTheme;
  setAccent: (accent: AccentTheme) => void;
  onLogout: () => void;
  onSelectedPropertyIdChange: (id: string | null) => void;
  propertiesList: any[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const AccountCenter: React.FC<AccountCenterProps> = ({
  isDark,
  setIsDark,
  accent,
  setAccent,
  onLogout,
  onSelectedPropertyIdChange,
  propertiesList,
  activeTab,
  onTabChange
}) => {
  // --- Active Tab / Sub-Page State ---
  const [activeMenuKey, setActiveMenuKey] = useState<string>('VERIFICATION');
  const [isMobileSubOpen, setIsMobileSubOpen] = useState<boolean>(false);

  const mapTabToMenuKey = (tab: string): string => {
    if (tab === 'PROFILE') return 'PROFILE';
    if (tab === 'VERIFICATION') return 'VERIFICATION';
    if (tab === 'ADDRESSES') return 'ADDRESS';
    if (tab === 'REFERRALS') return 'REFER';
    if (tab === 'SUPPORT') return 'HELP';
    if (tab === 'ABOUT') return 'ABOUT';
    if (tab === 'TERMS') return 'TERMS';
    if (tab === 'PRIVACY') return 'PRIVACY';
    if (tab === 'FEEDBACK') return 'FEEDBACK';
    if (tab === 'SETTINGS') return 'SETTINGS';
    return 'PROFILE';
  };

  const currentMenuKey = activeTab ? mapTabToMenuKey(activeTab) : activeMenuKey;

  // --- Profile Details State ---
  const [profileName, setProfileName] = useState<string>(() => {
    return localStorage.getItem('homstay-profile-name') || 'Homstay Luxe User';
  });
  const [profilePhone, setProfilePhone] = useState<string>(() => {
    return localStorage.getItem('homstay-profile-phone') || '+91 9052653548';
  });
  const [profileEmail, setProfileEmail] = useState<string>(() => {
    return localStorage.getItem('homstay-profile-email') || 'tecbowgamods200@gmail.com';
  });
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  // --- Verification States ---
  const [mobileVerified, setMobileVerified] = useState<boolean>(true);
  const [emailVerified, setEmailVerified] = useState<boolean>(true);
  
  const [govIdStatus, setGovIdStatus] = useState<'Pending Review' | 'Approved' | 'Rejected' | 'Request Changes'>(() => {
    return (localStorage.getItem('homstay-gov-id-status') as any) || 'Request Changes';
  });
  const [selectedIdType, setSelectedIdType] = useState<string>('Aadhaar');
  const [idNumber, setIdNumber] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<{name: string; size: string} | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const requestChangesReason = {
    title: "Government ID - Edge Cropping & Blurry Text",
    reason: "The uploaded driving license was partially cut off at the bottom edges, resulting in the failure of our automated document validation flow. Please ensure you upload a clear, high-resolution front-facing image containing all 4 corners of the document."
  };

  // --- OTP Verification Simulations ---
  const [isMobileOtpSent, setIsMobileOtpSent] = useState<boolean>(false);
  const [mobileOtpValue, setMobileOtpValue] = useState<string>('');
  const [isEmailOtpSent, setIsEmailOtpSent] = useState<boolean>(false);
  const [emailOtpValue, setEmailOtpValue] = useState<string>('');

  // --- Address Book States ---
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('homstay-addresses');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: '1',
        category: 'Home',
        name: 'My Parental Home',
        fullAddress: 'Apt 405, Block C, Maple Heights, Sector 62',
        landmark: 'Opposite Fortis Hospital',
        pincode: '201301',
        city: 'Noida',
        state: 'Uttar Pradesh'
      },
      {
        id: '2',
        category: 'Office',
        name: 'Bengaluru Tech HQ',
        fullAddress: 'Level 14, Prestige Tech Park, outer Ring Road, Marathahalli',
        landmark: 'Next to JP Morgan Office',
        pincode: '560103',
        city: 'Bengaluru',
        state: 'Karnataka'
      }
    ];
  });
  const [addressFormOpen, setAddressFormOpen] = useState<boolean>(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressCategory, setAddressCategory] = useState<'Home' | 'Office' | 'College' | 'Custom'>('Home');
  const [addressName, setAddressName] = useState<string>('');
  const [addressFull, setAddressFull] = useState<string>('');
  const [addressLandmark, setAddressLandmark] = useState<string>('');
  const [addressPincode, setAddressPincode] = useState<string>('');
  const [addressCity, setAddressCity] = useState<string>('');
  const [addressState, setAddressState] = useState<string>('');

  // --- Tickets State ---
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('homstay-tickets');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'HS-2026-000084',
        relatedTo: 'Payment',
        description: 'Verification of token deposit for Whitefield Terracotta villa. Owner has acknowledged receipt, request status update on dashboard.',
        status: 'Resolved',
        createdAt: '2026-05-28 10:14'
      },
      {
        id: 'HS-2026-000101',
        relatedTo: 'Visit Request',
        description: 'Need to reschedule my weekend visit to Sunset Hill cottage because of sudden travel plans. Prefer next Tuesday afternoon.',
        status: 'Closed',
        createdAt: '2026-06-01 16:45'
      }
    ];
  });
  const [selectedTicketCategory, setSelectedTicketCategory] = useState<string>('Booking');
  const [ticketDescription, setTicketDescription] = useState<string>('');
  const [ticketAttachmentName, setTicketAttachmentName] = useState<string>('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState<boolean>(false);

  // --- Feedback State ---
  const [feedbackCategories, setFeedbackCategories] = useState<string[]>([]);
  const [feedbackDescription, setFeedbackDescription] = useState<string>('');
  const [feedbackAttachmentName, setFeedbackAttachmentName] = useState<string>('');
  const [submittedFeedbackToken, setSubmittedFeedbackToken] = useState<string | null>(null);

  // --- Copy Actions ---
  const [referralCopied, setReferralCopied] = useState<boolean>(false);

  // --- Search Filtering for Legal/Terms pages ---
  const [termsSearch, setTermsSearch] = useState<string>('');
  const [privacySearch, setPrivacySearch] = useState<string>('');

  // --- Logout Confirmation Modal ---
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  // --- Bookings Data ---
  const activeTenancy = {
    propertyTitle: "The Terracotta Villa",
    location: "Sigma Prestige, Outer Ring Road, Marathahalli, Bengaluru",
    price: 45000,
    leaseStart: "01 Jun, 2026",
    leaseDuration: "11 Months",
    deposit: 90000,
    cycle: "Monthly (Payable by 5th)",
    nextDue: "05 Jun, 2026",
    owner: {
      name: "Mrs. Ananya Sharma",
      phone: "+91 9884521360",
      email: "ananya.sharma@homstay.com",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    },
    bills: [
      { id: 'b1', name: 'June 2026 Monthly Rent', amount: 45000, dueDate: '05 Jun, 2026', status: 'Pending' },
      { id: 'b2', name: 'Apartment Maintenance', amount: 3500, dueDate: '01 Jun, 2026', status: 'Overdue' },
      { id: 'b3', name: 'High-Speed Broadband WiFi', amount: 1200, dueDate: '10 Jun, 2026', status: 'Pending' },
      { id: 'b4', name: 'Token Security Advance', amount: 90000, dueDate: '31 May, 2026', status: 'Paid' },
      { id: 'b5', name: 'Homstay Setup Charges', amount: 4500, dueDate: '25 May, 2026', status: 'Paid' }
    ]
  };

  const pendingBookings = [
    {
      id: 'p-1',
      title: "Luxe Penthouse & Garden",
      location: "Indiranagar, Bengaluru",
      price: 65000,
      status: "Awaiting Host Review",
      appliedOn: "02 Jun, 2026",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=500"
    }
  ];

  const pastBookings = [
    {
      id: 'h-1',
      title: "Vintage Boho Studio",
      location: "Koramangala, Bengaluru",
      price: 28000,
      duration: "01 Jan 2026 - 31 Mar 2026",
      status: "Closed Successfully",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=500"
    }
  ];

  // --- Persistence Handlers ---
  useEffect(() => {
    localStorage.setItem('homstay-gov-id-status', govIdStatus);
  }, [govIdStatus]);

  useEffect(() => {
    localStorage.setItem('homstay-addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('homstay-tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('https://homstay.com/invite/HOMSTAY500');
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2500);
  };

  // --- Government ID Upload Action ---
  const handleIdUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idNumber) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setGovIdStatus('Pending Review');
            setUploadedFile({
              name: `${selectedIdType}_Verification_Scan.${selectedIdType === 'Aadhaar' ? 'jpg' : 'pdf'}`,
              size: '1.4 MB'
            });
          }, 300);
          return 100;
        }
        return p + 25;
      });
    }, 250);
  };

  // --- Profile Edits Submit ---
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('homstay-profile-name', profileName);
    localStorage.setItem('homstay-profile-phone', profilePhone);
    localStorage.setItem('homstay-profile-email', profileEmail);
    setIsEditingProfile(false);
  };

  // --- Address Book CRUD Action ---
  const openNewAddressForm = () => {
    setEditingAddressId(null);
    setAddressCategory('Home');
    setAddressName('');
    setAddressFull('');
    setAddressLandmark('');
    setAddressPincode('');
    setAddressCity('');
    setAddressState('');
    setAddressFormOpen(true);
  };

  const openEditAddressForm = (addr: Address) => {
    setEditingAddressId(addr.id);
    setAddressCategory(addr.category);
    setAddressName(addr.name);
    setAddressFull(addr.fullAddress);
    setAddressLandmark(addr.landmark);
    setAddressPincode(addr.pincode);
    setAddressCity(addr.city);
    setAddressState(addr.state);
    setAddressFormOpen(true);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressName || !addressFull || !addressPincode || !addressCity || !addressState) return;

    if (editingAddressId) {
      setAddresses(prev => prev.map(addr => addr.id === editingAddressId ? {
        id: editingAddressId,
        category: addressCategory,
        name: addressName,
        fullAddress: addressFull,
        landmark: addressLandmark,
        pincode: addressPincode,
        city: addressCity,
        state: addressState
      } : addr));
    } else {
      const newAddr: Address = {
        id: Date.now().toString(),
        category: addressCategory,
        name: addressName,
        fullAddress: addressFull,
        landmark: addressLandmark,
        pincode: addressPincode,
        city: addressCity,
        state: addressState
      };
      setAddresses(prev => [...prev, newAddr]);
    }
    setAddressFormOpen(false);
  };

  const handleAddressDelete = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  // --- Help Support Ticket Submission ---
  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketDescription) return;

    setIsSubmittingTicket(true);
    setTimeout(() => {
      const formattedNum = String(Math.floor(Math.random() * 900) + 100).padStart(6, '0');
      const newTicket: Ticket = {
        id: `HS-2026-${formattedNum}`,
        relatedTo: selectedTicketCategory,
        description: ticketDescription,
        status: 'Open',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        attachmentName: ticketAttachmentName || undefined
      };

      setTickets(prev => [newTicket, ...prev]);
      setIsSubmittingTicket(false);
      setTicketDescription('');
      setTicketAttachmentName('');
    }, 1200);
  };

  // --- Feedback Submission ---
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackCategories.length === 0 || !feedbackDescription) return;

    const formattedNum = String(Math.floor(Math.random() * 900) + 100).padStart(6, '0');
    const token = `FB-2026-${formattedNum}`;
    setSubmittedFeedbackToken(token);
  };

  const toggleFeedbackCategory = (cat: string) => {
    setFeedbackCategories(p => 
      p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat]
    );
  };

  // Check verification state
  const isFullyVerified = mobileVerified && emailVerified && govIdStatus === 'Approved';

  // --- MENU CONFIG ---
  const MENU_ITEMS = [
    { key: 'PROFILE', label: 'My Profile', icon: User },
    { key: 'VERIFICATION', label: 'Verification Center', icon: ShieldCheck, badge: !isFullyVerified ? 'ACTION REQUIRED' : 'VERIFIED', badgeColor: !isFullyVerified ? 'bg-red-500 text-white' : 'bg-green-500 text-white' },
    { key: 'BOOKINGS', label: 'Your Bookings', icon: Calendar },
    { key: 'ACTIVITY', label: 'Recent Activity', icon: Clock },
    { key: 'ADDRESS', label: 'Address Book', icon: MapPin },
    { key: 'REFER', label: 'Refer & Earn', icon: Tag, badge: 'EARN ₹1,000', badgeColor: 'bg-theme-accent text-white' },
    { key: 'ABOUT', label: 'About Us', icon: Info },
    { key: 'TERMS', label: 'Terms & Conditions', icon: FileText },
    { key: 'PRIVACY', label: 'Privacy Policy', icon: ShieldCheck },
    { key: 'HELP', label: 'Help & Support', icon: MessageCircle, badge: tickets.filter(t => t.status === 'Open').length > 0 ? 'ACTIVE' : undefined, badgeColor: 'bg-amber-500 text-white' },
    { key: 'FEEDBACK', label: 'Feedback & Suggestions', icon: ThumbsUp },
    { key: 'LOGOUT', label: 'Logout', icon: LogOut, isAction: true }
  ];

  const handleMenuClick = (key: string, isAction?: boolean) => {
    if (isAction) {
      if (key === 'LOGOUT') {
        setShowLogoutModal(true);
      }
    } else {
      if (onTabChange) {
        if (key === 'PROFILE') onTabChange('PROFILE');
        else if (key === 'VERIFICATION') onTabChange('VERIFICATION');
        else if (key === 'BOOKINGS') onTabChange('BOOKINGS');
        else if (key === 'ACTIVITY') onTabChange('ACTIVITY');
        else if (key === 'ADDRESS') onTabChange('ADDRESSES');
        else if (key === 'REFER') onTabChange('REFERRALS');
        else if (key === 'HELP') onTabChange('SUPPORT');
        else if (key === 'ABOUT') onTabChange('ABOUT');
        else if (key === 'TERMS') onTabChange('TERMS');
        else if (key === 'PRIVACY') onTabChange('PRIVACY');
        else if (key === 'FEEDBACK') onTabChange('FEEDBACK');
        else onTabChange('ACCOUNT');
      } else {
        setActiveMenuKey(key);
        setIsMobileSubOpen(true);
      }
    }
  };

  const isSpecificView = activeTab && ['PROFILE', 'VERIFICATION', 'ADDRESSES', 'REFERRALS', 'SUPPORT', 'SETTINGS', 'TERMS', 'PRIVACY', 'ABOUT', 'FEEDBACK'].includes(activeTab);

  if (isSpecificView) {
    return (
      <div id="account-center-container" className="w-full select-none font-sans min-h-[600px] text-theme-text-primary">
        {/* Mobile / Tablet back banner */}
        <div className="lg:hidden flex items-center justify-between pb-3.5 border-b border-theme-border/60 mb-6 shrink-0 font-sans">
          <button 
            type="button"
            onClick={() => onTabChange && onTabChange('ACCOUNT')}
            className="flex items-center gap-1.5 bg-theme-surface hover:bg-theme-border/25 px-4 py-2 border border-theme-border rounded-xl text-[10px] uppercase font-bold tracking-widest text-[#2d2d2d] dark:text-white cursor-pointer"
          >
            <span>← Back</span>
          </button>
          <span className="text-[10px] font-black text-theme-text-secondary uppercase tracking-[0.2em]">
            Account
          </span>
        </div>

        {/* Natural page flow container - no giant card bounds */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMenuKey}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="h-full flex flex-col justify-between"
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div id="account-center-container" className="flex flex-col gap-6 select-none font-sans min-h-[600px] text-theme-text-primary">
      {/* Back to Home Button Header */}
      <div className="flex items-center gap-3 border-b border-theme-border/60 pb-5">
        <div 
          onClick={() => onTabChange && onTabChange('HOME')}
          className="flex items-center gap-3 cursor-pointer group select-none"
          title="Back to Home"
        >
          <button 
            type="button"
            className="p-1.5 hover:bg-theme-border/45 rounded-full text-theme-text-primary group-hover:text-theme-accent transition-all flex items-center justify-center shrink-0 border border-theme-border/80 bg-theme-surface"
          >
            <ChevronLeft size={20} className="stroke-[3]" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-black uppercase tracking-wider text-theme-text-primary group-hover:text-theme-accent transition-colors duration-200">← Your Account Center</h1>
            <p className="text-xs text-theme-text-secondary mt-1">Manage profile parameters, stay tours, and direct platform preferences.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* ========================================== */}
      {/* LEFT SIDEBAR PANEL: Profile, Progress, Menu */}
      {/* ========================================== */}
      <div className="col-span-1 lg:col-span-4 space-y-6">
        
        {/* Profile Block (Borderless, lives directly on the page background) */}
        <div className="relative">
          
          <div className="text-center py-4">
            {/* Avatar block */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full bg-[#f2ede4] dark:bg-theme-border/40 rounded-3xl flex items-center justify-center border-2 border-theme-accent/25 overflow-hidden">
                <User size={48} className="text-theme-text-secondary" />
              </div>
              {isFullyVerified ? (
                <div title="Fully Verified" className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-xl shadow-lg border-2 border-theme-surface">
                  <CheckCircle2 size={16} className="stroke-[2.5]" />
                </div>
              ) : (
                <div title="Action Required" className="absolute -bottom-1 -right-1 bg-red-500 text-white p-1 rounded-xl shadow-lg border-2 border-theme-surface animate-bounce">
                  <AlertTriangle size={16} className="stroke-[2.5]" />
                </div>
              )}
            </div>

            {/* Profile Info Form / Text */}
            <AnimatePresence mode="wait">
              {isEditingProfile ? (
                <motion.form 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleProfileSave}
                  className="space-y-3.5 text-left bg-theme-surface border border-theme-border p-5 rounded-2xl shadow-sm"
                >
                  <div>
                    <label className="text-[9px] font-black tracking-widest text-[#a1a1aa] uppercase">Full Name</label>
                    <input 
                      type="text" 
                      value={profileName} 
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full p-2.5 bg-theme-bg border border-theme-border rounded-xl text-xs font-bold text-theme-text-primary focus:outline-none focus:ring-1 focus:ring-theme-accent"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black tracking-widest text-[#a1a1aa] uppercase">Mobile Number</label>
                    <input 
                      type="text" 
                      value={profilePhone} 
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full p-2.5 bg-theme-bg border border-theme-border rounded-xl text-xs font-bold text-theme-text-primary focus:outline-none focus:ring-1 focus:ring-theme-accent"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black tracking-widest text-[#a1a1aa] uppercase">Email Verification</label>
                    <input 
                      type="email" 
                      value={profileEmail} 
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full p-2.5 bg-theme-bg border border-theme-border rounded-xl text-xs font-bold text-theme-text-primary focus:outline-none focus:ring-1 focus:ring-theme-accent"
                      required
                    />
                  </div>
                  <div className="flex gap-2 pt-1 font-sans">
                    <button 
                      type="submit"
                      className="flex-1 py-2 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Save Changes
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-3 py-2 bg-theme-border/40 text-theme-text-secondary hover:bg-theme-border border border-theme-border rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-1.5"
                >
                  <h3 className="font-serif text-2xl font-bold text-theme-text-primary tracking-tight leading-none">
                    {profileName}
                  </h3>
                  <p className="text-xs text-theme-text-secondary font-medium tracking-tight mt-0.5">{profilePhone}</p>
                  <p className="text-[10px] text-theme-text-secondary/80 font-bold mb-3">{profileEmail}</p>

                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="mt-3.5 mx-auto bg-theme-accent-soft hover:bg-theme-accent/15 text-theme-accent px-4 py-1.5 border border-theme-accent/20 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 active:scale-95 transition-all text-sans cursor-pointer shadow-sm animate-in fade-in duration-200"
                  >
                    <span>Edit Profile</span>
                    <ChevronRight size={10} className="stroke-[3]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Verification Status Prominent smaller card section */}
          <div className="mt-4 p-5 bg-theme-surface border border-theme-border rounded-[24px] shadow-sm">
            <h4 className="text-[10px] font-black text-theme-text-secondary uppercase tracking-[0.2em] mb-3">Verification Checklist</h4>
            <div className="space-y-2.5 text-xs text-sans">
              
              {/* Mobile item */}
              <div className="flex items-center justify-between p-2.5 bg-theme-bg border border-theme-border/50 rounded-xl">
                <span className="font-semibold text-theme-text-primary">Mobile Verification</span>
                {mobileVerified ? (
                  <div className="flex items-center gap-1 text-green-600 bg-green-500/10 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">
                    <CheckCircle2 size={11} className="stroke-[3]" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">
                    <XCircle size={11} className="stroke-[3]" />
                    <span>Unverified</span>
                  </div>
                )}
              </div>

              {/* Email item */}
              <div className="flex items-center justify-between p-2.5 bg-theme-bg border border-theme-border/50 rounded-xl">
                <span className="font-semibold text-theme-text-primary">Email Verification</span>
                {emailVerified ? (
                  <div className="flex items-center gap-1 text-green-600 bg-green-500/10 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">
                    <CheckCircle2 size={11} className="stroke-[3]" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">
                    <XCircle size={11} className="stroke-[3]" />
                    <span>Unverified</span>
                  </div>
                )}
              </div>

              {/* Gov ID verification prominent display */}
              <div className="flex items-center justify-between p-2.5 bg-theme-bg border border-theme-border/50 rounded-xl">
                <span className="font-semibold text-theme-text-primary">Government ID Spec</span>
                {govIdStatus === 'Approved' && (
                  <div className="flex items-center gap-1 text-green-600 bg-green-500/10 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">
                    <CheckCircle2 size={11} className="stroke-[3]" />
                    <span>Approved</span>
                  </div>
                )}
                {govIdStatus === 'Pending Review' && (
                  <div className="flex items-center gap-1 text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">
                    <Clock size={11} className="stroke-[3]" />
                    <span>Pending</span>
                  </div>
                )}
                {govIdStatus === 'Request Changes' && (
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase border border-amber-500/30">
                    <AlertTriangle size={11} />
                    <span>Amend ID</span>
                  </div>
                )}
                {govIdStatus === 'Rejected' && (
                  <div className="flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">
                    <XCircle size={11} className="stroke-[3]" />
                    <span>Rejected</span>
                  </div>
                )}
              </div>

              {/* Verified progress bar */}
              <div className="pt-2">
                <div className="flex justify-between text-[9px] font-bold text-theme-text-secondary uppercase mb-1">
                  <span>Overall Security trust</span>
                  <span>{isFullyVerified ? '100% Secure' : govIdStatus === 'Pending Review' ? '75% Done' : '50% Complete'}</span>
                </div>
                <div className="w-full h-1.5 bg-theme-bg rounded-full overflow-hidden border border-theme-border/40">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${isFullyVerified ? 'bg-green-500' : govIdStatus === 'Pending Review' ? 'bg-amber-500' : 'bg-red-400'}`}
                    style={{ width: isFullyVerified ? '100%' : govIdStatus === 'Pending Review' ? '75%' : '50%' }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Navigation Sidebar List (Borderless and shadowless menu directly on page background) */}
        <div className="pt-2 pb-2 space-y-1">
          <div className="flex flex-col gap-1">
            {MENU_ITEMS.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeMenuKey === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.key, item.isAction)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all rounded-xl relative cursor-pointer ${
                    isActive && !item.isAction
                      ? 'bg-theme-accent text-white shadow-sm font-black'
                      : item.isAction
                        ? 'text-red-500 font-bold hover:bg-red-500/5'
                        : 'text-theme-text-primary font-semibold hover:bg-theme-surface border border-transparent hover:border-theme-border/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent size={16} className={isActive && !item.isAction ? 'text-white' : 'text-theme-text-secondary'} />
                    <span className="text-[12px] uppercase tracking-wider">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        isActive && !item.isAction
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-theme-accent text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight size={12} className={isActive ? 'text-white' : 'text-theme-text-secondary/40'} />
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* RIGHT CONTENT WORKPLACE: Responsive Views  */}
      {/* ========================================== */}
      
      {/* DESKTOP CONTENT VIEW: active page directly in layout (Unwrapped borderless style) */}
      <div className="hidden lg:col-span-8 min-h-[580px] relative px-4 lg:px-8 py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMenuKey}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="h-full flex flex-col justify-between"
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MOBILE FULLSCREEN DETAIL VIEW PANEL (Using beautiful overlays in React/Vite layout) */}
      <AnimatePresence>
        {isMobileSubOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="lg:hidden fixed inset-0 z-[100] bg-theme-bg overflow-y-auto w-full pb-28 pt-4 px-4 flex flex-col"
          >
            {/* Header toolbar for mobile views */}
            <div className="flex items-center justify-between pb-4 border-b border-theme-border/60 mb-5 shrink-0">
              <button 
                onClick={() => setIsMobileSubOpen(false)}
                className="flex items-center gap-1 bg-theme-surface hover:bg-theme-border/40 px-3.5 py-2.5 border border-theme-border rounded-2xl text-[10px] uppercase font-black tracking-widest text-[#2d2d2d] dark:text-white cursor-pointer"
              >
                <span>Back</span>
              </button>
              <span className="text-[11px] font-black text-theme-text-secondary uppercase tracking-[0.25em]">
                Account Center
              </span>
            </div>

            {/* Sub-page actual loaded form (Flat layout with no nested giant card cards) */}
            <div className="flex-1 px-1 py-2">
              {renderPageContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout confirming wrapper */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowLogoutModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-theme-surface border border-theme-border max-w-sm w-full rounded-3xl shadow-2xl p-6 text-center text-sans z-10"
            >
              <div className="w-14 h-14 bg-red-100 dark:bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LogOut size={28} className="stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-theme-text-primary leading-tight">Confirm Logout</h3>
              <p className="text-xs text-theme-text-secondary mt-2 leading-relaxed">
                Are you sure you want to log out of your Homstay Tenant account? You will need to log back in to review your bookings, addresses, or raise support tickets.
              </p>
              <div className="flex gap-3.5 mt-6">
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 bg-theme-bg border border-theme-border text-theme-text-secondary hover:bg-theme-border/40 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowLogoutModal(false);
                    onLogout();
                  }}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-red-500/15 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Address Form modal popup to keep code tidy */}
      <AnimatePresence>
        {addressFormOpen && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setAddressFormOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative bg-theme-surface border border-theme-border max-w-md w-full rounded-[32px] shadow-2xl p-6 text-sans z-10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center pb-3 border-b border-theme-border mb-4">
                <h3 className="font-serif text-xl font-bold text-theme-text-primary">
                  {editingAddressId ? 'Edit Address' : 'Add New Address'}
                </h3>
                <button 
                  onClick={() => setAddressFormOpen(false)}
                  className="p-1.5 hover:bg-theme-bg rounded-lg border border-theme-border"
                >
                  <XCircle size={18} className="text-theme-text-secondary" />
                </button>
              </div>

              <form onSubmit={handleAddressSubmit} className="space-y-4">
                
                {/* Category selectors */}
                <div>
                  <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-2">Address Type</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { cat: 'Home', icon: User },
                      { cat: 'Office', icon: Briefcase },
                      { cat: 'College', icon: GraduationCap },
                      { cat: 'Custom', icon: Compass }
                    ].map((item) => (
                      <button
                        key={item.cat}
                        type="button"
                        onClick={() => setAddressCategory(item.cat as any)}
                        className={`py-2 px-1 rounded-xl text-[10px] font-black uppercase tracking-wider border flex flex-col items-center gap-1.5 cursor-pointer ${
                          addressCategory === item.cat 
                            ? 'bg-theme-accent border-theme-accent text-white shadow-md' 
                            : 'bg-theme-bg border-theme-border text-theme-text-secondary hover:bg-theme-border/40'
                        }`}
                      >
                        <item.icon size={14} />
                        <span>{item.cat}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1.5">Address Nickname</label>
                  <input 
                    type="text" 
                    placeholder="e.g. My Parents House, Work HQ, Hostel Room 9"
                    value={addressName}
                    onChange={(e) => setAddressName(e.target.value)}
                    className="w-full text-xs font-semibold text-theme-text-primary p-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent"
                    required
                  />
                </div>

                {/* Full Address Text */}
                <div>
                  <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1.5">Full Address Coordinates</label>
                  <textarea 
                    rows={3}
                    placeholder="Provide detailed house/flat number, block, street, road, locality coordinates"
                    value={addressFull}
                    onChange={(e) => setAddressFull(e.target.value)}
                    className="w-full text-xs font-semibold text-theme-text-primary p-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent resize-none pointer-events-auto"
                    required
                  />
                </div>

                {/* Landmark */}
                <div>
                  <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1.5">Landmark (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Near Central Park Bus Stop"
                    value={addressLandmark}
                    onChange={(e) => setAddressLandmark(e.target.value)}
                    className="w-full text-xs font-semibold text-theme-text-primary p-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent"
                  />
                </div>

                {/* Grid inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1.5">Pincode</label>
                    <input 
                      type="text" 
                      placeholder="6-digit Pincode"
                      maxLength={6}
                      value={addressPincode}
                      onChange={(e) => setAddressPincode(e.target.value)}
                      className="w-full text-xs font-semibold text-theme-text-primary p-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1.5">City</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Noida, Bengaluru"
                      value={addressCity}
                      onChange={(e) => setAddressCity(e.target.value)}
                      className="w-full text-xs font-semibold text-theme-text-primary p-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1.5">State</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Karnataka, Uttar Pradesh"
                    value={addressState}
                    onChange={(e) => setAddressState(e.target.value)}
                    className="w-full text-xs font-semibold text-theme-text-primary p-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent"
                    required
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setAddressFormOpen(false)}
                    className="flex-1 py-3 bg-theme-bg border border-theme-border text-theme-text-secondary hover:bg-theme-border/40 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg cursor-pointer"
                  >
                    Save Address
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );

  // --- RENDERING PAGE CONTENT ROUTER ---
  function renderPageContent() {
    const Loader = () => (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-theme-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );

    switch (currentMenuKey) {
      case 'PROFILE':
        return (
          <ProfileView
            profileName={profileName}
            setProfileName={setProfileName}
            profilePhone={profilePhone}
            setProfilePhone={setProfilePhone}
            profileEmail={profileEmail}
            setProfileEmail={setProfileEmail}
            isEditingProfile={isEditingProfile}
            setIsEditingProfile={setIsEditingProfile}
            handleProfileSave={handleProfileSave}
            mobileVerified={mobileVerified}
            emailVerified={emailVerified}
            govIdStatus={govIdStatus}
          />
        );

      case 'VERIFICATION':
        return (
          <VerificationView
            profilePhone={profilePhone}
            profileEmail={profileEmail}
            mobileVerified={mobileVerified}
            setMobileVerified={setMobileVerified}
            emailVerified={emailVerified}
            setEmailVerified={setEmailVerified}
            govIdStatus={govIdStatus}
            setGovIdStatus={setGovIdStatus}
            isMobileOtpSent={isMobileOtpSent}
            setIsMobileOtpSent={setIsMobileOtpSent}
            mobileOtpValue={mobileOtpValue}
            setMobileOtpValue={setMobileOtpValue}
            isEmailOtpSent={isEmailOtpSent}
            setIsEmailOtpSent={setIsEmailOtpSent}
            emailOtpValue={emailOtpValue}
            setEmailOtpValue={setEmailOtpValue}
            selectedIdType={selectedIdType}
            setSelectedIdType={setSelectedIdType}
            idNumber={idNumber}
            setIdNumber={setIdNumber}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            handleIdUpload={handleIdUpload}
            requestChangesReason={requestChangesReason}
          />
        );

      case 'BOOKINGS':
        return (
          <YourBookingsDashboard
            onSelectedPropertyIdChange={onSelectedPropertyIdChange}
            activeTenancy={activeTenancy}
            pendingBookings={pendingBookings}
            pastBookings={pastBookings}
          />
        );

      case 'ACTIVITY':
        return (
          <RecentActivityDashboard
            propertiesList={propertiesList}
            onSelectedPropertyIdChange={onSelectedPropertyIdChange}
          />
        );

      case 'ADDRESS':
        return (
          <AddressesView
            addresses={addresses}
            openNewAddressForm={openNewAddressForm}
            openEditAddressForm={openEditAddressForm}
            handleAddressDelete={handleAddressDelete}
          />
        );

      case 'REFER':
        return (
          <ReferralsView
            handleCopyReferral={handleCopyReferral}
            referralCopied={referralCopied}
          />
        );

      case 'ABOUT':
        return <AboutView />;

      case 'HELP':
        return (
          <Suspense fallback={<Loader />}>
            <SupportSection
              profilePhone={profilePhone}
              profileEmail={profileEmail}
            />
          </Suspense>
        );

      case 'FEEDBACK':
        return (
          <Suspense fallback={<Loader />}>
            <FeedbackSection />
          </Suspense>
        );

      case 'TERMS':
        return (
          <Suspense fallback={<Loader />}>
            <TermsSection />
          </Suspense>
        );

      case 'PRIVACY':
        return (
          <Suspense fallback={<Loader />}>
            <PrivacySection />
          </Suspense>
        );

      case 'SETTINGS':
        return (
          <div className="space-y-6 text-sans">
            <div>
              <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">Theme settings</h2>
              <p className="text-xs text-theme-text-secondary mt-1">
                Customize colors and canvas settings inside your current workspace.
              </p>
            </div>
            {/* Theme picker inside */}
            <div className="bg-theme-bg border border-theme-border p-4 rounded-2xl">
              <span className="text-[10px] uppercase font-black text-theme-text-secondary tracking-wider block mb-3">Color Accent Presets</span>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'classic' as AccentTheme, name: 'Amber Oak', color: 'bg-[#a35c37]' },
                  { id: 'emerald' as AccentTheme, name: 'Sage Green', color: 'bg-[#405c44]' },
                  { id: 'sapphire' as AccentTheme, name: 'Ocean Blue', color: 'bg-[#3b6088]' },
                  { id: 'charcoal' as AccentTheme, name: 'Nordic Slate', color: 'bg-[#4c4e52]' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAccent(item.id)}
                    className={`px-3 py-2 border rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                      accent === item.id 
                        ? 'bg-theme-surface border-theme-accent text-theme-text-primary scale-105' 
                        : 'bg-theme-bg border-theme-border text-theme-text-secondary hover:bg-theme-border/40'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  }
};
