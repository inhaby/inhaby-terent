import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, BookOpen, Clock, Calendar, ArrowRight, Mail, Share2, 
  Check, ChevronRight, Sparkles, Star, Flame, User, 
  Tag, Compass, Shield, Bookmark, X, FileText, Send, 
  HelpCircle, Eye, AlertCircle, BookOpenCheck, ListChecks, Info
} from "lucide-react";
import OptimizedImage from "../components/OptimizedImage";
import { BLOG_ARTICLES, BlogArticle } from "../data/blogData";

// Available blog categories
const CATEGORIES = [
  "All Articles",
  "Safety",
  "Verification",
  "Legal",
  "Budgeting",
  "Rental Guides",
  "Student Housing",
  "Market Analysis",
  "Product & Design",
  "Technology",
  "Future Vision"
];

// All tag suggestions
const ALL_TAGS = [
  "No Brokerage",
  "Rental Scams",
  "Legal Safeguards",
  "Property Deeds",
  "Student Living",
  "Co-Living",
  "Smart Homes",
  "Negotiation Scripts",
  "Market Analysis",
  "Product Philosophy",
  "Artificial Intelligence",
  "Future Vision"
];

// Content Roadmap & Publishing Plan Data
const ROADMAP_PHASES = [
  {
    phase: 1,
    title: "Building Trust (Launch Month)",
    goal: "Establish trust before promoting features. Introduce the problems renters and owners face and explain why INHABY exists.",
    topics: [
      { name: "Why renting is still broken in India", slug: "why-renting-is-broken-india" },
      { name: "Hidden brokerage fees and how to avoid them", slug: "hidden-brokerage-fees-revealed" },
      { name: "What makes a property truly verified?", slug: "inhaby-6-step-verification-system" },
      { name: "Why photos on rental apps can be misleading", status: "Upcoming" },
      { name: "Understanding rental scams and how to identify them", slug: "the-zero-brokerage-revolution" },
      { name: "Direct owner communication versus brokers", status: "Upcoming" },
      { name: "Why transparency matters more than discounts", status: "Upcoming" },
      { name: "The future of digital rental agreements", status: "Upcoming" },
      { name: "How technology can simplify renting", status: "Upcoming" },
      { name: "The vision behind INHABY", status: "Upcoming" }
    ]
  },
  {
    phase: 2,
    title: "Verification Philosophy",
    goal: "Make verification the core identity of INHABY. Educate the market on what real verification means.",
    topics: [
      { name: "Behind Every Verified Property: INHABY’s Rigorous 6-Step Verification System", slug: "inhaby-6-step-verification-system" },
      { name: "How to Legally Verify a Rental Property: Vetting Land Deeds and Ownership", slug: "verify-rental-property-land-deeds" },
      { name: "The math behind brokerage: What does ₹0 brokerage really mean?", status: "Upcoming" },
      { name: "Municipal property records: The missing piece in Indian rentals", status: "Upcoming" },
      { name: "How we screen landlords (and why we reject some)", status: "Upcoming" }
    ]
  },
  {
    phase: 3,
    title: "Owner Education",
    goal: "Become a trusted resource for property owners. Help owners understand the value of renting responsibly.",
    topics: [
      { name: "How to price your rental property: A data-backed guide", status: "Upcoming" },
      { name: "Writing a fair rental agreement that protects both parties", status: "Upcoming" },
      { name: "How to screen tenants legally and ethically", status: "Upcoming" },
      { name: "Tax implications of rental income in India", status: "Upcoming" },
      { name: "Maintaining your property: Landlord vs. Tenant responsibilities", status: "Upcoming" }
    ]
  },
  {
    phase: 4,
    title: "Tenant Education",
    goal: "Become the renter's trusted advisor. Cover the entire renter journey from searching to moving out.",
    topics: [
      { name: "How to Negotiate Your Security Deposit Down in Premium Society Complexes", slug: "how-to-negotiate-security-deposit" },
      { name: "Relocating to Bangalore or Pune? The Ultimate Tech-Tenant Move-In Checklist", slug: "ultimate-tech-tenant-move-in-checklist" },
      { name: "Understanding the Model Tenancy Act: Your Fundamental Eviction & Repair Rights", slug: "model-tenancy-act-tenant-rights" },
      { name: "Student Housing Secrets: Co-Living Hubs vs. Traditional Flatshares", slug: "student-housing-co-living-vs-flatshares" },
      { name: "How to handle unfair security deposit deductions on exit", status: "Upcoming" }
    ]
  },
  {
    phase: 5,
    title: "Product Development Transparency",
    goal: "Build transparency around the product itself. Show how we think, build, and solve problems.",
    topics: [
      { name: "Why We Built a Landing Page Instead of Forcing Login: Our Friction-Free Philosophy", slug: "why-we-built-landing-page-first" },
      { name: "The design details: Crafting an open savings calculator", status: "Upcoming" },
      { name: "How our matching algorithm works without middleman interference", status: "Upcoming" }
    ]
  },
  {
    phase: 6,
    title: "Technology & Security Vetting",
    goal: "Position INHABY as a modern technology company. Explain how we use technology to make renting secure.",
    topics: [
      { name: "AI in Property Verification: Computer Vision, OCR, and Human-in-the-Loop Vetting", slug: "ai-in-property-verification" },
      { name: "Securing renter data: Our end-to-end encryption standards", status: "Upcoming" },
      { name: "Building a scalable rental platform for Indian metros", status: "Upcoming" }
    ]
  },
  {
    phase: 7,
    title: "Community & Customer Stories",
    goal: "Build a human connection with our audience. Share real, raw experiences of renters and owners.",
    topics: [
      { name: "From brokers to direct connection: How Rohan saved ₹45,000", status: "Upcoming" },
      { name: "An owner's story: Renting to verified tenants in 48 hours", status: "Upcoming" },
      { name: "The co-living diaries: Finding community in a new city", status: "Upcoming" }
    ]
  },
  {
    phase: 8,
    title: "Future Vision & System Ambitions",
    goal: "Show long-term ambition while remaining grounded in practical improvements.",
    topics: [
      { name: "The Future of Renting: Smart Homes, AI Assistants, and Digital Rental Identities", slug: "future-of-renting-smart-homes-ai" },
      { name: "Solving the trust deficit in Indian real estate", status: "Upcoming" },
      { name: "Why renting should be as easy as booking a cab", status: "Upcoming" }
    ]
  }
];

export default function BlogListingPage() {
  const [activeTab, setActiveTab] = useState<"articles" | "roadmap">("articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic for BLOG_ARTICLES
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.seo.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === "All Articles" || 
        article.category === selectedCategory;

      const matchesTag = 
        !selectedTag || 
        article.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  // Featured Cover Story (The zero brokerage revolution)
  const primaryFeatured = useMemo(() => {
    return BLOG_ARTICLES.find(a => a.slug === "the-zero-brokerage-revolution") || BLOG_ARTICLES[0];
  }, []);

  // Popular reads sidebar list (marked with popular = true)
  const popularArticles = useMemo(() => {
    return BLOG_ARTICLES.slice(0, 4);
  }, []);

  // Trending reads list
  const trendingArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((_, idx) => idx % 2 === 0).slice(0, 4);
  }, []);

  // Handle bookmarking toggle
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Handle link sharing copy
  const handleCopyLink = (slug: string, id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const fullUrl = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  // Clear all filters easily
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Articles");
    setSelectedTag(null);
  };

  return (
    <div className="bg-background min-h-screen text-foreground relative pt-20">
      
      {/* Editorial Decorative Background Details */}
      <div className="absolute top-[8%] right-[5%] w-[450px] h-[450px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[50%] left-[-10%] w-[550px] h-[550px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="container px-6 mx-auto pb-24 relative z-10">
        
        {/* BREADCRUMB NAVIGATION */}
        <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">INHABY</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary font-black">Trust Journal & Magazine</span>
        </nav>

        {/* LARGE EDITORIAL HERO SECTION */}
        <header className="max-w-5xl mx-auto text-center mb-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-primary-soft text-primary text-xs font-black uppercase tracking-widest rounded-full border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Luxury Rental Knowledge Hub</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-tight leading-[1.08] text-foreground">
            The INHABY Journal
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            We educate, we don't market. Unveiling direct-owner rental blueprints, rigorous legal deed guidelines, and landlord vetting procedures built to protect your rent.
          </p>

          {/* Interactive Mode Tabs Switcher */}
          <div className="flex bg-muted p-1 rounded-2xl border border-border/80 max-w-md mx-auto mt-6" id="blog-nav-tabs">
            <button
              onClick={() => {
                setActiveTab("articles");
                clearFilters();
              }}
              className={`w-1/2 flex items-center justify-center space-x-2 py-3 text-xs font-black rounded-xl transition-all cursor-pointer ${
                activeTab === "articles" 
                  ? "bg-background text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Trust Articles</span>
            </button>
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`w-1/2 flex items-center justify-center space-x-2 py-3 text-xs font-black rounded-xl transition-all cursor-pointer ${
                activeTab === "roadmap" 
                  ? "bg-background text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Editorial Roadmap</span>
            </button>
          </div>
        </header>

        {/* ========================================================= */}
        {/* TAB 1: ARTICLES HUB */}
        {/* ========================================================= */}
        {activeTab === "articles" ? (
          <div>
            {/* REAL-TIME DYNAMIC SEARCH CONTAINER */}
            <div className="max-w-xl mx-auto relative mb-12" id="search-articles-box">
              <div className="relative">
                <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search premium guides, legal deeds, or scam protection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-background border border-border rounded-full text-sm font-semibold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-md"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full animate-none"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* HORIZONTAL CATEGORY SCROLLER & PILLS */}
            <div className="border-b border-border/60 pb-6 mb-12">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground font-extrabold uppercase tracking-wider shrink-0">
                  <Compass className="w-4 h-4 text-primary" />
                  <span>Browse Categories:</span>
                </div>
                
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mb-1 max-w-full">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setSelectedTag(null); // Clear active tag to avoid conflicts
                        }}
                        className={`px-4.5 py-2.5 text-xs font-bold rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                          isSelected 
                            ? "bg-primary text-primary-foreground border-primary shadow-sm scale-102" 
                            : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/80"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* TWO COLUMNS: STORIES GRID & SIDEBAR */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* LEFT SECTION (8 COLS): EDITORIAL STORIES AND GRIDS */}
              <main className="lg:col-span-8 space-y-16">
                
                {isLoading ? (
                  <div className="space-y-16">
                    {/* Cover Story Skeleton */}
                    <div className="space-y-6">
                      <div className="w-40 h-4 rounded-md shimmer-bg" />
                      <div className="block bg-background border border-border/80 rounded-[2.5rem] overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-12">
                          <div className="md:col-span-6 aspect-[16/10] md:aspect-auto shimmer-bg" />
                          <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                              <div className="flex space-x-3">
                                <div className="h-3 w-20 rounded shimmer-bg" />
                                <div className="h-3 w-16 rounded shimmer-bg" />
                              </div>
                              <div className="h-6 w-5/6 rounded shimmer-bg" />
                              <div className="space-y-2">
                                <div className="h-3 w-full rounded shimmer-bg" />
                                <div className="h-3 w-11/12 rounded shimmer-bg" />
                              </div>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-border/60">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full shimmer-bg" />
                                <div className="space-y-1.5">
                                  <div className="h-3 w-16 rounded shimmer-bg" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* If NO SEARCH/CATEGORY active, render the main horizontal Featured masterpiece */}
                    {!searchQuery && selectedCategory === "All Articles" && !selectedTag && (
                      <section className="space-y-6" id="primary-featured-section">
                        <div className="flex items-center space-x-2.5 text-xs text-primary font-black uppercase tracking-wider">
                          <Flame className="w-4 h-4 text-primary" />
                          <span>Featured Cover Story</span>
                        </div>

                        <Link 
                          to={`/blog/${primaryFeatured.slug}`}
                          className="block bg-background border border-border rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/20 group relative"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-12">
                            {/* Image side */}
                            <div className="md:col-span-6 aspect-[16/10] md:aspect-auto overflow-hidden relative">
                              <OptimizedImage 
                                src={primaryFeatured.image} 
                                alt={primaryFeatured.title}
                                aspectRatio="aspect-full h-full w-full"
                                loading="eager"
                              />
                              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Text content side */}
                            <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between space-y-6">
                              <div className="space-y-4">
                                <div className="flex items-center space-x-3 text-[10px] font-black text-primary uppercase tracking-widest">
                                  <span>{primaryFeatured.category} Blueprint</span>
                                  <span>•</span>
                                  <span>{primaryFeatured.readingTime}</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-primary transition-colors duration-300 leading-snug tracking-tight">
                                  {primaryFeatured.title}
                                </h3>
                                <p className="text-xs text-muted-foreground font-semibold leading-relaxed line-clamp-3">
                                  {primaryFeatured.seo.metaDescription}
                                </p>
                              </div>

                              <div className="flex justify-between items-center pt-6 border-t border-border/60">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-[10px] border border-primary/25">
                                    {primaryFeatured.author.avatar}
                                  </div>
                                  <div>
                                    <h5 className="font-extrabold text-foreground text-xs leading-none">{primaryFeatured.author.name}</h5>
                                    <span className="text-[9px] text-muted-foreground font-semibold">{primaryFeatured.publishedDate}</span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <button 
                                    onClick={(e) => toggleBookmark(primaryFeatured.id, e)}
                                    className="w-8 h-8 rounded-xl bg-muted hover:bg-primary-soft text-foreground hover:text-primary flex items-center justify-center transition-colors border border-transparent hover:border-primary/10 cursor-pointer"
                                    title="Bookmark Article"
                                  >
                                    <Bookmark className={`w-3.5 h-3.5 ${bookmarkedIds.includes(primaryFeatured.id) ? "fill-primary text-primary" : ""}`} />
                                  </button>
                                  <button 
                                    onClick={(e) => handleCopyLink(primaryFeatured.slug, primaryFeatured.id, e)}
                                    className="w-8 h-8 rounded-xl bg-muted hover:bg-primary-soft text-foreground hover:text-primary flex items-center justify-center transition-colors border border-transparent hover:border-primary/10 cursor-pointer"
                                    title="Copy Link"
                                  >
                                    {copiedId === primaryFeatured.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </section>
                    )}

                    {/* DYNAMIC FEED GRID */}
                    <section className="space-y-8" id="articles-feed-grid">
                      <div className="flex items-center justify-between pb-4 border-b border-border/60">
                        <div className="flex items-center space-x-2.5 text-xs text-foreground font-black uppercase tracking-wider">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span>
                            {selectedCategory === "All Articles" ? "Trust Blueprints Directory" : `${selectedCategory} Journal`}
                            {selectedTag && ` • #${selectedTag}`}
                          </span>
                        </div>
                        <span className="text-[10px] bg-muted px-2.5 py-1.5 rounded-lg border border-border/60 text-muted-foreground font-black uppercase">
                          {filteredArticles.length} Guides Found
                        </span>
                      </div>

                      {filteredArticles.length === 0 ? (
                        <div className="p-16 border-2 border-dashed border-border rounded-[2rem] text-center space-y-4">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                            <Compass className="w-6 h-6" />
                          </div>
                          <h4 className="text-base font-black text-foreground">No blueprints match your search</h4>
                          <p className="text-xs text-muted-foreground max-w-sm mx-auto font-semibold">
                            We haven't covered that topic yet, but it may be planned! Check out our transparent Editorial Roadmap below to see upcoming topics.
                          </p>
                          <button 
                            onClick={clearFilters}
                            className="px-5 py-2.5 bg-primary text-primary-foreground font-black rounded-xl text-xs shadow-md hover:opacity-95 cursor-pointer"
                          >
                            Clear Filters
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {filteredArticles.map((article) => (
                            <Link 
                              key={article.id}
                              to={`/blog/${article.slug}`}
                              className="group flex flex-col bg-background border border-border hover:border-primary/20 rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                            >
                              {/* Aspect ratio bounding box for catalog layout */}
                              <div className="aspect-[16/10] overflow-hidden relative">
                                <OptimizedImage 
                                  src={article.image} 
                                  alt={article.title} 
                                  aspectRatio="aspect-full h-full w-full"
                                  loading="lazy"
                                />
                                <div className="absolute top-4 left-4">
                                  <span className="px-3 py-1.5 bg-background/90 backdrop-blur-md text-primary rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-border/40">
                                    {article.category}
                                  </span>
                                </div>
                              </div>

                              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between space-y-6">
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                                    <span>{article.publishedDate}</span>
                                    <span>•</span>
                                    <span className="flex items-center text-primary">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {article.readingTime}
                                    </span>
                                  </div>
                                  <h4 className="text-base font-black text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                    {article.title}
                                  </h4>
                                  <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed line-clamp-2">
                                    {article.seo.metaDescription}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between pt-5 border-t border-border/40 mt-auto">
                                  <div className="flex items-center space-x-2.5">
                                    <div className="w-6.5 h-6.5 rounded-full bg-primary/15 text-primary text-[9px] font-black flex items-center justify-center border border-primary/20">
                                      {article.author.avatar}
                                    </div>
                                    <span className="text-[10px] text-foreground font-extrabold">{article.author.name}</span>
                                  </div>

                                  <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                      onClick={(e) => toggleBookmark(article.id, e)}
                                      className="w-7 h-7 rounded-lg bg-muted/60 hover:bg-primary-soft text-foreground hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                                    >
                                      <Bookmark className={`w-3 h-3 ${bookmarkedIds.includes(article.id) ? "fill-primary text-primary" : ""}`} />
                                    </button>
                                    <button 
                                      onClick={(e) => handleCopyLink(article.slug, article.id, e)}
                                      className="w-7 h-7 rounded-lg bg-muted/60 hover:bg-primary-soft text-foreground hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                                    >
                                      {copiedId === article.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Share2 className="w-3 h-3" />}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </section>
                  </>
                )}

              </main>

              {/* RIGHT SIDEBAR (4 COLS): POPULAR READS + NEWSLETTER + TAG CLOUD */}
              <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28" id="desktop-sidebar">
                
                {/* Popular Tags cloud */}
                <div className="bg-background border border-border rounded-[2.5rem] p-8 shadow-xs space-y-6">
                  <h3 className="text-xs font-black text-foreground uppercase tracking-wider pb-3 border-b border-border/60 flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-primary" />
                    <span>Popular Tags</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_TAGS.map((tag) => {
                      const isActive = selectedTag === tag;
                      return (
                        <button
                          key={tag}
                          onClick={() => {
                            setSelectedTag(isActive ? null : tag);
                            setSelectedCategory("All Articles"); // Reset category to avoid filter collision
                          }}
                          className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                            isActive 
                              ? "bg-primary text-primary-foreground border-primary scale-102" 
                              : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40"
                          }`}
                        >
                          #{tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sticky Popular reads */}
                <div className="bg-background border border-border rounded-[2.5rem] p-8 shadow-xs space-y-6">
                  <h3 className="text-xs font-black text-foreground uppercase tracking-wider pb-3 border-b border-border/60 flex items-center space-x-2">
                    <Star className="w-3.5 h-3.5 text-primary" />
                    <span>Recommended Guides</span>
                  </h3>
                  <div className="space-y-4">
                    {popularArticles.map((article) => (
                      <Link
                        key={article.id}
                        to={`/blog/${article.slug}`}
                        className="flex items-start space-x-3.5 group animate-none"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-muted border border-border">
                          <OptimizedImage 
                            src={article.image} 
                            alt={article.title} 
                            aspectRatio="aspect-square w-full h-full"
                            loading="lazy"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-primary uppercase tracking-widest">{article.category}</span>
                          <h4 className="text-xs font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-[9px] text-muted-foreground font-semibold">{article.publishedDate} • {article.readingTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Live Newsletter Form */}
                <div className="bg-muted/40 border border-border rounded-[2.5rem] p-8 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/4 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center space-x-2 text-primary font-black text-xs uppercase tracking-widest">
                    <Mail className="w-4 h-4" />
                    <span>Inhaby Trust Digest</span>
                  </div>
                  <h4 className="text-base font-black text-foreground">Stay Protected from Rental Scams</h4>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Unlock direct landlord negotiation checklists, rental escrow tips, and legal rent agreement guides delivered safely to your inbox.
                  </p>
                  <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                    <input 
                      type="email" 
                      placeholder="Enter email address" 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-xs text-foreground font-semibold focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button 
                      type="submit"
                      className="w-full py-3 bg-primary hover:opacity-95 text-primary-foreground font-black text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-sm transition-opacity cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Join The Dispatch</span>
                    </button>
                  </form>
                  {newsletterSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-600 dark:text-emerald-500 font-bold leading-normal"
                    >
                      Thank you! You have successfully subscribed to Inhaby Trust dispatch.
                    </motion.div>
                  )}
                </div>

              </aside>

            </div>
          </div>
        ) : (
          
          /* ========================================================= */
          /* TAB 2: INHABY EDITORIAL ROADMAP & TRANSPARENCY MANUAL */
          /* ========================================================= */
          <div className="space-y-16" id="editorial-roadmap-tab">
            
            {/* Philosophical Pillars Card */}
            <div className="bg-background border border-border rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-xs">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/3 rounded-full blur-2xl pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center space-x-2 text-primary font-black text-xs uppercase tracking-wider">
                    <Info className="w-5 h-5" />
                    <span>The INHABY Publishing Philosophy</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground tracking-tight leading-tight">
                    Why Our Blog Will Never Feel Like "Marketing"
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">
                    Instead of trying to aggressively sell our product, we focus on extreme education. Renting is broken in India, filled with asymmetric information and middleman monopolies. By telling the absolute truth and providing legal and technical tools to renters, we establish trust naturally. Trust is our ultimate growth engine.
                  </p>
                </div>
                
                <div className="md:col-span-5 bg-muted/50 border border-border p-6 rounded-2xl grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-background border border-border/60 rounded-xl">
                    <span className="text-[10px] text-primary font-black uppercase tracking-widest block mb-1">Pillar 01</span>
                    <h5 className="text-xs font-black text-foreground">Teach First</h5>
                    <p className="text-[9px] text-muted-foreground mt-1">Value over pitches</p>
                  </div>
                  <div className="p-4 bg-background border border-border/60 rounded-xl">
                    <span className="text-[10px] text-primary font-black uppercase tracking-widest block mb-1">Pillar 02</span>
                    <h5 className="text-xs font-black text-foreground">Fact-Based</h5>
                    <p className="text-[9px] text-muted-foreground mt-1">Deeds and laws only</p>
                  </div>
                  <div className="p-4 bg-background border border-border/60 rounded-xl">
                    <span className="text-[10px] text-primary font-black uppercase tracking-widest block mb-1">Pillar 03</span>
                    <h5 className="text-xs font-black text-foreground">No Hype</h5>
                    <p className="text-[9px] text-muted-foreground mt-1">Humble and grounded</p>
                  </div>
                  <div className="p-4 bg-background border border-border/60 rounded-xl">
                    <span className="text-[10px] text-primary font-black uppercase tracking-widest block mb-1">Pillar 04</span>
                    <h5 className="text-xs font-black text-foreground">AEO-Optimized</h5>
                    <p className="text-[9px] text-muted-foreground mt-1">Direct API answers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Publishing Cadence Grid */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2.5 text-xs text-foreground font-black uppercase tracking-wider">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Monthly Publishing Cadence Plan</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="p-6 bg-muted/40 border border-border rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-primary font-black uppercase tracking-widest">Type A</span>
                    <h4 className="text-sm font-black text-foreground leading-tight">Educational Guides</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">
                    Step-by-step deep dives regarding land registers, tenant laws, and security deposit disputes.
                  </p>
                  <div className="pt-3 border-t border-border/60 text-xs font-black text-foreground">
                    2 Articles / Week
                  </div>
                </div>

                <div className="p-6 bg-muted/40 border border-border rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-primary font-black uppercase tracking-widest">Type B</span>
                    <h4 className="text-sm font-black text-foreground leading-tight">Product Updates</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">
                    Transparent behind-the-scenes logs detailing how we design calculations, vetting engines, and AI algorithms.
                  </p>
                  <div className="pt-3 border-t border-border/60 text-xs font-black text-foreground">
                    1 Article / 2 Weeks
                  </div>
                </div>

                <div className="p-6 bg-muted/40 border border-border rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-primary font-black uppercase tracking-widest">Type C</span>
                    <h4 className="text-sm font-black text-foreground leading-tight">Customer Stories</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">
                    Unvarnished, raw, unedited community case studies of tenants escaping brokerage fees or disputes.
                  </p>
                  <div className="pt-3 border-t border-border/60 text-xs font-black text-foreground">
                    1 Article / Month
                  </div>
                </div>

                <div className="p-6 bg-muted/40 border border-border rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-primary font-black uppercase tracking-widest">Type D</span>
                    <h4 className="text-sm font-black text-foreground leading-tight">Market Reports</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">
                    Data-driven analyses of real estate trends, average rent indexes, and occupancy patterns in major Indian hubs.
                  </p>
                  <div className="pt-3 border-t border-border/60 text-xs font-black text-foreground">
                    1 Article / Month
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Timeline of Phases */}
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div className="flex items-center space-x-2.5 text-xs text-foreground font-black uppercase tracking-wider">
                  <ListChecks className="w-5 h-5 text-primary" />
                  <span>The 8 Phases of Rental Transparency & Trust</span>
                </div>
                <span className="text-[10px] bg-muted px-2.5 py-1 text-muted-foreground rounded font-extrabold uppercase border border-border/60">
                  Interactive Pipeline
                </span>
              </div>

              <div className="space-y-6">
                {ROADMAP_PHASES.map((phaseData) => (
                  <div 
                    key={phaseData.phase}
                    className="bg-background border border-border hover:border-primary/10 rounded-3xl p-6 md:p-8 transition-all space-y-6 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider rounded-md border border-primary/20">
                            Phase {phaseData.phase}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-extrabold">• Objective: {phaseData.phase === 1 ? "Launch Focus" : "Expansion"}</span>
                        </div>
                        <h4 className="text-lg font-black text-foreground leading-snug">{phaseData.title}</h4>
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground sm:max-w-md leading-relaxed">
                        {phaseData.goal}
                      </p>
                    </div>

                    {/* Topics Sub-grid */}
                    <div className="border-t border-border/50 pt-5">
                      <span className="text-[10px] text-primary font-black uppercase tracking-widest block mb-3">Roadmap Articles & Topics</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {phaseData.topics.map((topic, index) => {
                          const isPublished = !!topic.slug;
                          const publishedArticle = isPublished ? BLOG_ARTICLES.find(a => a.slug === topic.slug) : null;
                          
                          return (
                            <div 
                              key={index} 
                              className={`p-4 rounded-xl flex items-center justify-between gap-4 border transition-all ${
                                isPublished 
                                  ? "bg-primary-soft/20 hover:bg-primary-soft/30 border-primary/15" 
                                  : "bg-muted/10 border-dashed border-border/60 text-muted-foreground"
                              }`}
                            >
                              <div className="space-y-1">
                                <span className="text-[10px] font-semibold text-foreground/85 leading-snug block line-clamp-1">
                                  {topic.name}
                                </span>
                                {isPublished && publishedArticle && (
                                  <span className="text-[9px] text-primary font-bold flex items-center">
                                    <Clock className="w-2.5 h-2.5 mr-1" />
                                    {publishedArticle.readingTime} • By {publishedArticle.author.name}
                                  </span>
                                )}
                              </div>
                              
                              {isPublished && topic.slug ? (
                                <Link 
                                  to={`/blog/${topic.slug}`}
                                  className="px-3 py-1.5 bg-primary text-primary-foreground font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center space-x-1 hover:opacity-95 shrink-0"
                                >
                                  <span>Read</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </Link>
                              ) : (
                                <span className="px-2.5 py-1.5 bg-muted border border-border text-muted-foreground font-extrabold text-[9px] uppercase tracking-wider rounded-lg shrink-0 flex items-center space-x-1">
                                  <span>Planned</span>
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* BOTTOM CALL TO ACTION CTA PANEL */}
        <section className="mt-20 bg-gradient-to-br from-primary-soft/40 to-muted/20 border border-primary/10 rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center space-y-8 relative overflow-hidden" id="blog-call-to-action">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-sans tracking-tight">
              Looking for a verified, scam-free rental home?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed max-w-lg mx-auto">
              Skip traditional brokerages and paying expensive commissions. Match directly with deed-verified landlords on INHABY.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link 
              to="/savings" 
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-black rounded-full text-xs hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Calculate Savings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/verify" 
              className="w-full sm:w-auto px-8 py-4 bg-background border border-border hover:bg-muted text-foreground font-black rounded-full text-xs transition-all flex items-center justify-center space-x-2"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span>List Your Property</span>
            </Link>
          </div>
        </section>

      </div>

    </div>
  );
}
