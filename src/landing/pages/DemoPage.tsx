import React, { useState, useEffect, useRef } from "react";
import { 
  Search, Shield, Star, Heart, MapPin, Sparkles, ArrowLeft, 
  MessageSquare, Calendar, ChevronLeft, ChevronRight, User, Check,
  X, Lock, Send, CreditCard, Clock, CheckCircle2, UserCheck, BookOpen
} from "lucide-react";

// --- Types ---
interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  category: string;
  images: string[];
  owner: string;
  ownerType: string;
  ownerAvatar: string;
  rating: number;
  reviewsCount: number;
  description: string;
  size: string;
  amenities: string[];
}

// --- Sample Data ---
const MOCK_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Luxury 2 BHK • No Brokerage",
    price: 24000,
    location: "Indiranagar, Bangalore",
    category: "2 BHK",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80"
    ],
    owner: "Ravi Kumar",
    ownerType: "Direct Owner",
    ownerAvatar: "RK",
    rating: 4.9,
    reviewsCount: 42,
    description: "Spacious 2 BHK located in 12th Main, Indiranagar. Fully furnished with modular kitchen, premium fittings, and balconies with trees. Walking distance to Metro, food streets, and parks. Zero brokerage guaranteed.",
    size: "1,200 sq.ft",
    amenities: ["Power Backup", "Modular Kitchen", "Balcony", "Gated Security", "Wardrobes"]
  },
  {
    id: 2,
    title: "Luxury Studio • Premium Location",
    price: 18500,
    location: "Koramangala, Bangalore",
    category: "Studio Apartments",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
    ],
    owner: "Ananya S.",
    ownerType: "Direct Owner",
    ownerAvatar: "AS",
    rating: 4.8,
    reviewsCount: 18,
    description: "Modern high-end studio apartment built for young professionals and couples. Fully air-conditioned, with biometric smart lock, fully equipped kitchen, high-speed fiber internet and power backup. Located in Koramangala 4th Block.",
    size: "550 sq.ft",
    amenities: ["AC", "Smart Lock", "High-speed WiFi", "Power Backup", "Gym Access"]
  },
  {
    id: 3,
    title: "Cozy 1 BHK • Direct Owner",
    price: 15000,
    location: "HSR Layout, Bangalore",
    category: "Verified Apartments",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80"
    ],
    owner: "Amit Patel",
    ownerType: "Verified Owner",
    ownerAvatar: "AP",
    rating: 4.7,
    reviewsCount: 29,
    description: "Peaceful 1 BHK in Sector 3 HSR Layout. Direct owner verified deed. Wooden flooring, private terrace entry, natural ventilation, modular wardrobes. Close to local cafes and HSR Club.",
    size: "750 sq.ft",
    amenities: ["Terrace", "Wardrobes", "Geyser", "Water Filter", "Car Parking"]
  },
  {
    id: 4,
    title: "Premium Men's & Women's PG",
    price: 9500,
    location: "Sarjapur, Bangalore",
    category: "Verified PGs",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80"
    ],
    owner: "Meera Reddy",
    ownerType: "PG Manager",
    ownerAvatar: "MR",
    rating: 4.6,
    reviewsCount: 54,
    description: "High-comfort hostel and PG living. Includes 3 organic meals daily, standard biometric verification, continuous high-speed Wi-Fi, premium gym, and weekly community events. No security deposit hassle.",
    size: "Single/Double Rooms",
    amenities: ["3 Meals Included", "Housekeeping", "WiFi", "Gym", "Biometric Entry"]
  },
  {
    id: 5,
    title: "Elite Co-Living Community",
    price: 11000,
    location: "Whitefield, Bangalore",
    category: "Hostels",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80"
    ],
    owner: "Siddharth Sen",
    ownerType: "Community Lead",
    ownerAvatar: "SS",
    rating: 4.9,
    reviewsCount: 88,
    description: "Beautiful co-living spaces with like-minded creators and techies. Features dynamic rooftop working lounges, fast fiber network, fully serviced laundry, pool tables, and modern gym facilities.",
    size: "Studio / Shared",
    amenities: ["Rooftop Cafe", "Co-working space", "Weekly Events", "Laundry", "Gym"]
  },
  {
    id: 6,
    title: "Smart Student Nest Housing",
    price: 8000,
    location: "Mathikere, Bangalore",
    category: "Student Housing",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80"
    ],
    owner: "Karan Johar",
    ownerType: "Property Host",
    ownerAvatar: "KJ",
    rating: 4.5,
    reviewsCount: 15,
    description: "Perfect accommodation for students of Ramaiah University and IISc. Dedicated study cabins with power ports, high-speed 100 Mbps internet, home-cooked food options, safe CCTV security, and friendly community.",
    size: "Double Sharing",
    amenities: ["Study Room", "CCTV Security", "Wifi 100Mbps", "Veg Food", "Laundry"]
  },
  {
    id: 7,
    title: "Spacious Premium 3 BHK",
    price: 38000,
    location: "Indiranagar, Bangalore",
    category: "3 BHK",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
    ],
    owner: "Ravi Kumar",
    ownerType: "Direct Owner",
    ownerAvatar: "RK",
    rating: 4.9,
    reviewsCount: 24,
    description: "Spacious 3 BHK apartment in a luxury gated community on 100 Feet Road, Indiranagar. Premium marble flooring, modular kitchen with chimney, 2 balconies with natural breeze, dedicated car parking, and 24/7 security. Zero broker intervention.",
    size: "1,800 sq.ft",
    amenities: ["Marble Flooring", "Gated Community", "Water Backup", "2 Car Parking", "Elevator"]
  }
];

const CATEGORIES = [
  "All",
  "Verified Apartments",
  "Verified PGs",
  "Studio Apartments",
  "2 BHK",
  "3 BHK",
  "Hostels",
  "Student Housing"
];

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Vikram Malhotra",
    avatar: "VM",
    rating: 5,
    category: "Zero Brokerage",
    date: "2 days ago",
    content: "Saved ₹48,000 on brokerage fees for my Indiranagar flat! The transaction process was incredibly smooth, and the rent agreement was generated digitally inside the app. Best rental experience in Bangalore.",
    likes: 12
  },
  {
    id: 2,
    name: "Sneha Hegde",
    avatar: "SH",
    rating: 5,
    category: "Document Verification",
    date: "1 week ago",
    content: "I was extremely skeptical about rent postings online, but Inhaby's title deed matching proved the owner Ravi actually owned the property. This verification is a lifesaver. Highly recommended!",
    likes: 24
  },
  {
    id: 3,
    name: "Arjun Das",
    avatar: "AD",
    rating: 5,
    category: "Peace of Mind",
    date: "3 weeks ago",
    content: "Moving from Kolkata to Koramangala was seamless. Booked a studio, completed security deposit verification, and unlocked the smart locks within an hour. Real properties, real owners.",
    likes: 8
  },
  {
    id: 4,
    name: "Pooja Sharma",
    avatar: "PS",
    rating: 4,
    category: "Zero Brokerage",
    date: "1 month ago",
    content: "Clean app, honest listings. Found a verified PG in HSR without brokers calling me day and night. The deposit escrow gave me peace of mind.",
    likes: 15
  }
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<number>(0); // 0: Explore, 1: Verify, 2: Reviews
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Carousel images state (tracked per property ID)
  const [carouselIndex, setCarouselIndex] = useState<{ [key: number]: number }>({});

  // Hearted properties
  const [likedList, setLikedList] = useState<number[]>([1, 3]);

  // Premium Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");

  // Deed Verification Simulation State
  const [verifyOwner, setVerifyOwner] = useState("Ravi Kumar");
  const [verifyDeed, setVerifyDeed] = useState("KA-5612/2023");
  const [verifyStep, setVerifyStep] = useState(0); // 0: Idle, 1, 2, 3: Verifying steps, 4: Success
  const [verifyLog, setVerifyLog] = useState<string[]>([]);

  // Inactivity timeout reference
  const lastActiveRef = useRef<number>(Date.now());

  // --- Hide scrollbars on root document element and body for iframe high-fidelity ---
  useEffect(() => {
    document.documentElement.classList.add("no-scrollbar", "h-full", "overflow-hidden");
    document.body.classList.add("no-scrollbar", "h-full", "overflow-hidden");
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.classList.add("h-full", "overflow-hidden");
    }
    return () => {
      document.documentElement.classList.remove("no-scrollbar", "h-full", "overflow-hidden");
      document.body.classList.remove("no-scrollbar", "h-full", "overflow-hidden");
      if (rootEl) {
        rootEl.classList.remove("h-full", "overflow-hidden");
      }
    };
  }, []);

  // --- Sync theme and accent of iframe with Landing Page ---
  useEffect(() => {
    const syncTheme = () => {
      try {
        const parentDoc = window.parent?.document?.documentElement;
        if (parentDoc) {
          const theme = parentDoc.getAttribute("data-theme") || "light";
          const accent = parentDoc.getAttribute("data-accent") || "terracotta";
          document.documentElement.setAttribute("data-theme", theme);
          document.documentElement.setAttribute("data-accent", accent);
        }
      } catch (e) {
        // Fallback to local storage
        const theme = localStorage.getItem("theme") || "light";
        const accent = localStorage.getItem("accent") || "terracotta";
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.setAttribute("data-accent", accent);
      }
    };

    syncTheme();
    const interval = setInterval(syncTheme, 500);
    return () => clearInterval(interval);
  }, []);

  // --- Inactivity Reset Tracker ---
  useEffect(() => {
    const recordActivity = () => {
      lastActiveRef.current = Date.now();
    };

    window.addEventListener("mousemove", recordActivity);
    window.addEventListener("click", recordActivity);
    window.addEventListener("touchstart", recordActivity);
    window.addEventListener("keydown", recordActivity);

    // Check inactivity every 2 seconds
    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - lastActiveRef.current;
      if (elapsed >= 60000) {
        // Reset Demo back to original clean Home screen!
        setActiveTab(0);
        setSelectedProperty(null);
        setSearchQuery("");
        setSelectedCategory("All");
        setIsModalOpen(false);
        setVerifyStep(0);
        setVerifyLog([]);
        // Update activity timestamp so it doesn't loop trigger
        lastActiveRef.current = Date.now();
      }
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", recordActivity);
      window.removeEventListener("click", recordActivity);
      window.removeEventListener("touchstart", recordActivity);
      window.removeEventListener("keydown", recordActivity);
      clearInterval(checkInterval);
    };
  }, []);

  // --- Handle Verification Simulation ---
  const startVerificationSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyOwner.trim() || !verifyDeed.trim()) return;

    setVerifyStep(1);
    setVerifyLog(["Initiating Inhaby Secure Title Escrow Protocol..."]);

    const steps = [
      {
        delay: 1200,
        text: "Connecting to Karnataka Bhoomi Land Records database API...",
        nextStep: 2
      },
      {
        delay: 2400,
        text: "Matching identity details of landlord: '" + verifyOwner + "' with Deed ID: '" + verifyDeed + "'...",
        nextStep: 3
      },
      {
        delay: 3600,
        text: "Validating deed encumbrance boundaries & historical ownership chain...",
        nextStep: 4
      }
    ];

    steps.forEach((s) => {
      setTimeout(() => {
        setVerifyStep(s.nextStep);
        setVerifyLog((prev) => [...prev, s.text]);
      }, s.delay);
    });
  };

  const resetVerificationSimulation = () => {
    setVerifyStep(0);
    setVerifyLog([]);
  };

  // --- Action triggers with modal ---
  const triggerRestrictedAction = (actionName: string) => {
    setModalAction(actionName);
    setIsModalOpen(true);
  };

  const handleLikeToggle = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedList.includes(id)) {
      setLikedList(prev => prev.filter(x => x !== id));
    } else {
      setLikedList(prev => [...prev, id]);
    }
  };

  const handleNextImage = (id: number, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = carouselIndex[id] || 0;
    setCarouselIndex(prev => ({
      ...prev,
      [id]: (currentIndex + 1) % total
    }));
  };

  const handlePrevImage = (id: number, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = carouselIndex[id] || 0;
    setCarouselIndex(prev => ({
      ...prev,
      [id]: (currentIndex - 1 + total) % total
    }));
  };

  // --- Filter Logic ---
  const filteredProperties = MOCK_PROPERTIES.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.owner.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesCategory = selectedCategory === "All" || 
                            p.category === selectedCategory || 
                            (selectedCategory === "Verified Apartments" && (p.category === "2 BHK" || p.category === "3 BHK" || p.category === "Verified Apartments" || p.category === "Studio Apartments")) ||
                            (selectedCategory === "Verified PGs" && p.category === "Verified PGs") ||
                            (selectedCategory === "Hostels" && p.category === "Hostels") ||
                            (selectedCategory === "Student Housing" && p.category === "Student Housing");

    return matchesSearch && matchesCategory;
  });

  const handleLoginClick = () => {
    // Redirect parent window or current window
    try {
      if (window.parent && window.parent !== window) {
        window.parent.location.href = "https://inhaby.com";
      } else {
        window.location.href = "https://inhaby.com";
      }
    } catch (e) {
      window.location.href = "https://inhaby.com";
    }
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground overflow-hidden font-sans select-none select-text">
      {/* Scrollable Main Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-16 relative">
        
        {/* VIEW: PROPERTY DETAILS SCREEN */}
        {selectedProperty ? (
          <div className="animate-fade-in">
            {/* Top Back Action */}
            <div className="sticky top-0 bg-background/90 backdrop-blur-md z-20 flex justify-between items-center px-4 py-3 border-b border-border">
              <button 
                onClick={() => setSelectedProperty(null)}
                className="p-1.5 hover:bg-muted rounded-full transition-colors cursor-pointer flex items-center space-x-1"
                id="demo-back-btn"
              >
                <ArrowLeft className="w-4 h-4 text-foreground" />
                <span className="text-xs font-bold">Search</span>
              </button>
              <span className="text-[10px] font-extrabold tracking-wider text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">
                Verified Listing
              </span>
              <button 
                onClick={(e) => handleLikeToggle(selectedProperty.id, e)}
                className="p-1.5 hover:bg-muted rounded-full transition-colors cursor-pointer"
                id="demo-fav-btn"
              >
                <Heart className={`w-4.5 h-4.5 ${likedList.includes(selectedProperty.id) ? "fill-red-500 text-red-500" : "text-foreground"}`} />
              </button>
            </div>

            {/* Large Image Swiper Mock */}
            <div className="relative aspect-video w-full bg-muted overflow-hidden">
              <img 
                src={selectedProperty.images[carouselIndex[selectedProperty.id] || 0]} 
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {selectedProperty.images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => handlePrevImage(selectedProperty.id, selectedProperty.images.length, e)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer"
                    id="demo-img-prev"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => handleNextImage(selectedProperty.id, selectedProperty.images.length, e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer"
                    id="demo-img-next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
                {selectedProperty.images.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      (carouselIndex[selectedProperty.id] || 0) === idx ? "bg-primary w-3" : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 space-y-4">
              {/* Title & Price */}
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h1 className="text-sm font-black tracking-tight leading-snug max-w-[70%]">
                    {selectedProperty.title}
                  </h1>
                  <div className="text-right">
                    <div className="text-sm font-black text-primary">₹{selectedProperty.price.toLocaleString()}/mo</div>
                    <div className="text-[8px] text-muted-foreground font-extrabold uppercase">Fully Refundable Deposit</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{selectedProperty.location}</span>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/25 p-3 rounded-xl flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-black flex-shrink-0 animate-badge-pulse">
                  ✓
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">Direct Landlord Identity Verified</h3>
                  <p className="text-[8.5px] text-muted-foreground mt-0.5 leading-normal">
                    Ownership deed matched manually with state registry. 100% legal guarantee.
                  </p>
                </div>
              </div>

              {/* Direct Owner Profile */}
              <div className="border border-border p-3 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                      {selectedProperty.ownerAvatar}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black flex items-center space-x-1">
                        <span>{selectedProperty.owner}</span>
                        <span className="text-primary text-[8px] bg-primary/10 px-1 py-0.2 rounded">Owner</span>
                      </h4>
                      <p className="text-[8.5px] text-muted-foreground">Response Rate: 100% (Avg. 5 mins)</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => triggerRestrictedAction("Chat with " + selectedProperty.owner)}
                    className="px-3 py-1.5 bg-primary text-primary-foreground text-[9px] font-black rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center space-x-1 cursor-pointer"
                    id="demo-chat-owner-btn"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Chat Now</span>
                  </button>
                </div>
                <div className="pt-2.5 border-t border-border flex justify-between text-center">
                  <div className="w-[32%]">
                    <div className="text-[9px] font-extrabold text-foreground">5.0 ★</div>
                    <div className="text-[7.5px] text-muted-foreground">Owner Rating</div>
                  </div>
                  <div className="w-[1px] bg-border h-6 self-center" />
                  <div className="w-[32%]">
                    <div className="text-[9px] font-extrabold text-foreground">Verified</div>
                    <div className="text-[7.5px] text-muted-foreground">Identity & Deed</div>
                  </div>
                  <div className="w-[1px] bg-border h-6 self-center" />
                  <div className="w-[32%]">
                    <div className="text-[9px] font-extrabold text-foreground">₹0</div>
                    <div className="text-[7.5px] text-muted-foreground">Brokerage Fee</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">About Property</h3>
                <p className="text-[10px] text-foreground leading-relaxed font-medium">
                  {selectedProperty.description}
                </p>
              </div>

              {/* Specs & Amenities */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-medium">
                <div className="border border-border/70 p-2 rounded-lg flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-extrabold">{selectedProperty.size}</span>
                </div>
                <div className="border border-border/70 p-2 rounded-lg flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-extrabold">{selectedProperty.category}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Amenities Included</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProperty.amenities.map((amenity, idx) => (
                    <span key={idx} className="bg-muted text-foreground text-[8.5px] font-semibold px-2.5 py-1 rounded-full border border-border/40">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call-to-actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button 
                  onClick={() => triggerRestrictedAction("Schedule Physical Visit")}
                  className="w-full py-2.5 bg-muted text-foreground text-[10px] font-black rounded-xl border border-border flex items-center justify-center space-x-1.5 hover:bg-muted/80 transition-colors cursor-pointer"
                  id="demo-sched-visit"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Visit</span>
                </button>
                <button 
                  onClick={() => triggerRestrictedAction("Rent Immediately")}
                  className="w-full py-2.5 bg-primary text-primary-foreground text-[10px] font-black rounded-xl flex items-center justify-center space-x-1.5 hover:opacity-90 transition-opacity shadow-md shadow-primary/10 cursor-pointer"
                  id="demo-book-visit"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rent Now</span>
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* TAB LAYOUTS */
          <div className="animate-fade-in">
            {/* VIEW: TAB 0 (EXPLORE) */}
            {activeTab === 0 && (
              <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-6.5 h-6.5 bg-primary rounded-lg flex items-center justify-center font-black text-xs text-primary-foreground shadow-md shadow-primary/25">I</span>
                    <span className="font-black text-xs tracking-tight">Inhaby Portal</span>
                  </div>
                  <div 
                    onClick={() => triggerRestrictedAction("View Alerts")}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center relative bg-primary/5 cursor-pointer"
                    id="demo-profile-ring"
                  >
                    <span className="text-[9px] font-black text-primary">JD</span>
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-background animate-notification-blink" />
                  </div>
                </div>

                {/* Greeting */}
                <div className="space-y-0.5">
                  <h2 className="text-sm font-black tracking-tight text-foreground leading-none">Find Verified Homes</h2>
                  <p className="text-[9px] text-muted-foreground font-semibold">Bypass broker traps with 100% manual title deed checks</p>
                </div>

                {/* Search Bar Input */}
                <div className="relative h-9.5 w-full bg-muted border border-border rounded-xl flex items-center px-3 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20">
                  <Search className="w-3.5 h-3.5 text-muted-foreground mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search Koramangala, 2 BHK, PGs..." 
                    className="bg-transparent text-[10px] w-full text-foreground outline-none font-bold placeholder:text-muted-foreground/80 placeholder:font-semibold"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="demo-search-input"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="p-1 hover:bg-muted rounded-full cursor-pointer"
                      id="demo-search-clear"
                    >
                      <X className="w-3 h-3 text-muted-foreground" />
                    </button>
                  )}
                </div>

                {/* Category Slider */}
                <div className="flex space-x-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-[8.5px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap border cursor-pointer transition-all ${
                        selectedCategory === category 
                          ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                          : "bg-background text-muted-foreground border-border hover:bg-muted"
                      }`}
                      id={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Properties Listings Feed */}
                <div className="space-y-4">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((prop) => (
                      <div 
                        key={prop.id}
                        onClick={() => setSelectedProperty(prop)}
                        className="bg-background border border-border rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 relative cursor-pointer"
                        id={`prop-card-${prop.id}`}
                      >
                        {/* Swiper Image container */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                          <img 
                            src={prop.images[carouselIndex[prop.id] || 0]} 
                            alt={prop.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {/* Image Swiping buttons */}
                          {prop.images.length > 1 && (
                            <>
                              <button 
                                onClick={(e) => handlePrevImage(prop.id, prop.images.length, e)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 cursor-pointer"
                                id={`prop-${prop.id}-prev-img`}
                              >
                                <ChevronLeft className="w-3 h-3" />
                              </button>
                              <button 
                                onClick={(e) => handleNextImage(prop.id, prop.images.length, e)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 cursor-pointer"
                                id={`prop-${prop.id}-next-img`}
                              >
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </>
                          )}
                          {/* Rating tag */}
                          <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-[7.5px] font-black text-white px-2 py-0.5 rounded flex items-center space-x-0.5">
                            <span>★</span>
                            <span>{prop.rating}</span>
                          </div>
                          {/* Heart tag */}
                          <button 
                            onClick={(e) => handleLikeToggle(prop.id, e)}
                            className="absolute top-2 right-2 w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xs cursor-pointer hover:scale-115 active:scale-90 transition-transform"
                            id={`prop-${prop.id}-heart`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${likedList.includes(prop.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                          </button>
                          
                          {/* Zero Brokerage Badge */}
                          <div className="absolute bottom-2.5 left-2.5 bg-primary text-primary-foreground text-[7.5px] font-extrabold px-2 py-0.5 rounded shadow">
                            ZERO BROKERAGE
                          </div>
                        </div>

                        {/* Title details */}
                        <div className="p-3 space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] font-extrabold text-muted-foreground tracking-wider uppercase">{prop.location}</span>
                            <span className="text-[11px] font-black text-primary">₹{prop.price.toLocaleString()}/mo</span>
                          </div>
                          <h4 className="text-[10px] font-black text-foreground truncate">{prop.title}</h4>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-border/60">
                            <div className="flex items-center space-x-1">
                              <div className="w-3.5 h-3.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-[7px] font-black">✓</div>
                              <span className="text-[8px] text-muted-foreground font-semibold">Owner Verified Deed</span>
                            </div>
                            <span className="text-[8px] text-primary bg-primary/10 px-1.5 py-0.5 rounded font-black">{prop.ownerType}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 space-y-2">
                      <p className="text-[10px] text-muted-foreground font-bold">No verified properties match your criteria.</p>
                      <button 
                        onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                        className="text-[9px] font-black text-primary hover:underline cursor-pointer"
                        id="demo-reset-filters"
                      >
                        Reset Search
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIEW: TAB 1 (VERIFY SIMULATOR) */}
            {activeTab === 1 && (
              <div className="p-4 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 text-primary">
                    <Shield className="w-5 h-5" />
                    <h2 className="text-xs font-black tracking-wider uppercase">Title Deed Escrow</h2>
                  </div>
                  <h3 className="text-sm font-black tracking-tight">Manual Ownership Verification</h3>
                  <p className="text-[9px] text-muted-foreground leading-normal">
                    Experience how Inhaby matches landlord identity against state land deeds in real-time. No blind trust.
                  </p>
                </div>

                {verifyStep === 0 ? (
                  <form onSubmit={startVerificationSimulation} className="space-y-3.5 border border-border p-3.5 rounded-xl bg-muted/30">
                    <div className="space-y-1">
                      <label className="text-[8.5px] font-black text-muted-foreground uppercase">Landlord Legal Name</label>
                      <input 
                        type="text"
                        className="w-full bg-background border border-border px-3 py-2 rounded-lg text-[10px] font-bold outline-none focus:ring-1 focus:ring-primary"
                        placeholder="e.g., Ravi Kumar"
                        value={verifyOwner}
                        onChange={(e) => setVerifyOwner(e.target.value)}
                        required
                        id="verify-owner-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8.5px] font-black text-muted-foreground uppercase">Deed Registration ID</label>
                      <input 
                        type="text"
                        className="w-full bg-background border border-border px-3 py-2 rounded-lg text-[10px] font-bold outline-none focus:ring-1 focus:ring-primary"
                        placeholder="e.g., KA-5612/2023"
                        value={verifyDeed}
                        onChange={(e) => setVerifyDeed(e.target.value)}
                        required
                        id="verify-deed-input"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-2 bg-primary text-primary-foreground text-[10px] font-black rounded-lg shadow hover:opacity-95 transition-opacity cursor-pointer"
                      id="verify-submit-btn"
                    >
                      Verify Legal Ownership Status
                    </button>
                  </form>
                ) : (
                  <div className="border border-border p-4 rounded-xl space-y-4 bg-muted/25">
                    <div className="space-y-1.5">
                      <h4 className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground">Verification Sequence Log:</h4>
                      <div className="space-y-2 max-h-[140px] overflow-y-auto font-mono text-[8px] leading-relaxed">
                        {verifyLog.map((log, idx) => (
                          <div key={idx} className="flex items-start space-x-1.5 text-foreground animate-fade-in">
                            <span className="text-primary font-bold">►</span>
                            <span>{log}</span>
                          </div>
                        ))}
                        {verifyStep > 0 && verifyStep < 4 && (
                          <div className="flex items-center space-x-1.5 text-primary animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                            <span>Processing next secure security layer...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {verifyStep === 4 && (
                      <div className="bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-lg text-center space-y-2 animate-scale-up">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black mx-auto text-lg">
                          ✓
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">100% DEED VERIFIED SUCCESS</h4>
                          <p className="text-[8.5px] text-muted-foreground leading-normal max-w-[200px] mx-auto">
                            State database confirms Ravi Kumar is the lawful registered holder. Zero encumbrance. Real property.
                          </p>
                        </div>
                        <button 
                          onClick={resetVerificationSimulation}
                          className="px-3 py-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[8.5px] font-black rounded border border-emerald-500/20 cursor-pointer"
                          id="verify-reset-btn"
                        >
                          Verify Another
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Secure Trust Info card */}
                <div className="border border-border p-3.5 rounded-xl flex items-start space-x-3 bg-primary/5">
                  <Lock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <h4 className="text-[10px] font-black text-primary">Inhaby Anti-Scam Shield</h4>
                    <p className="text-[8.5px] text-muted-foreground leading-normal">
                      By checking deeds *before* you pay booking deposits, we eliminate rent deposit fraud and double rental scams entirely.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: TAB 2 (REVIEWS FEED) */}
            {activeTab === 2 && (
              <div className="p-4 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 text-primary">
                    <Star className="w-5 h-5" />
                    <h2 className="text-xs font-black tracking-wider uppercase">Verified Tenant Feedback</h2>
                  </div>
                  <h3 className="text-sm font-black tracking-tight">Real Reviews. Zero Filters.</h3>
                  <p className="text-[9px] text-muted-foreground leading-normal">
                    We invite third-party auditors to match reviewer identities with digital rent receipts.
                  </p>
                </div>

                {/* Rating Breakdown Mock Chart */}
                <div className="border border-border p-3 rounded-xl space-y-2 bg-muted/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-foreground">4.8</span>
                      <span className="text-[10px] text-muted-foreground font-semibold ml-1">out of 5.0</span>
                    </div>
                    <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 rounded font-black uppercase">Verified platform audit</span>
                  </div>
                  {/* Rating progress rows */}
                  <div className="space-y-1 text-[8px] font-bold">
                    <div className="flex items-center space-x-2">
                      <span className="w-10 text-muted-foreground">5 stars</span>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full w-[88%]" />
                      </div>
                      <span className="w-6 text-right">88%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-10 text-muted-foreground">4 stars</span>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full w-[10%]" />
                      </div>
                      <span className="w-6 text-right">10%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-10 text-muted-foreground">3 stars</span>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full w-[2%]" />
                      </div>
                      <span className="w-6 text-right">2%</span>
                    </div>
                  </div>
                </div>

                {/* Testimonial review feed */}
                <div className="space-y-3">
                  {MOCK_REVIEWS.map((review) => (
                    <div key={review.id} className="border border-border p-3 rounded-xl space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <div className="w-6.5 h-6.5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-black">
                            {review.avatar}
                          </div>
                          <div>
                            <h4 className="text-[9px] font-black text-foreground">{review.name}</h4>
                            <p className="text-[7.5px] text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <span className="text-[7px] font-black bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/10">
                          {review.category}
                        </span>
                      </div>
                      <p className="text-[9.5px] text-foreground leading-relaxed font-semibold">
                        {review.content}
                      </p>
                      <div className="flex justify-between items-center pt-1.5 border-t border-border/40">
                        <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-black flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>Tenant Deed Verified</span>
                        </span>
                        <span className="text-[8px] text-muted-foreground font-semibold">
                          Helpful ({review.likes})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        )}

      </div>

      {/* --- App Tabbar (Fixed Bottom) --- */}
      <div className="absolute bottom-0 left-0 right-0 h-14.5 bg-background border-t border-border flex justify-between items-center px-4 pb-2 z-10">
        <button 
          onClick={() => { setSelectedProperty(null); setActiveTab(0); }}
          className={`flex flex-col items-center justify-center space-y-0.5 w-[30%] h-full cursor-pointer transition-colors ${
            activeTab === 0 && !selectedProperty ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
          id="demo-tab-explore"
        >
          <Search className="w-4 h-4" />
          <span className="text-[7.5px] font-black uppercase">Explore</span>
        </button>
        <button 
          onClick={() => { setSelectedProperty(null); setActiveTab(1); }}
          className={`flex flex-col items-center justify-center space-y-0.5 w-[30%] h-full cursor-pointer transition-colors ${
            activeTab === 1 ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
          id="demo-tab-verify"
        >
          <Shield className="w-4 h-4" />
          <span className="text-[7.5px] font-black uppercase">Verify</span>
        </button>
        <button 
          onClick={() => { setSelectedProperty(null); setActiveTab(2); }}
          className={`flex flex-col items-center justify-center space-y-0.5 w-[30%] h-full cursor-pointer transition-colors ${
            activeTab === 2 ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
          id="demo-tab-reviews"
        >
          <Star className="w-4 h-4" />
          <span className="text-[7.5px] font-black uppercase">Reviews</span>
        </button>
      </div>

      {/* --- RESTRICTED ACTION PREMIUM MODAL (Custom Embedded overlay inside phone) --- */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-background border border-border p-4.5 rounded-2xl shadow-2xl text-center space-y-4 max-w-[240px] animate-scale-up relative">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
              id="demo-modal-close-top"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Lock Circle */}
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center text-lg font-black mx-auto animate-badge-pulse">
              <Lock className="w-5 h-5 text-primary" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs font-black text-foreground">Continue with INHABY</h3>
              <p className="text-[9px] text-muted-foreground leading-normal">
                You're currently exploring a live demo. Login to continue your rental journey.
              </p>
            </div>

            {/* Modal Buttons */}
            <div className="flex flex-col space-y-1.5 pt-1">
              <button 
                onClick={handleLoginClick}
                className="w-full py-2 bg-primary text-primary-foreground text-[10px] font-black rounded-lg shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                id="demo-modal-login"
              >
                Login
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2 bg-muted text-foreground text-[10px] font-black rounded-lg border border-border hover:bg-muted/80 transition-colors cursor-pointer"
                id="demo-modal-close"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
