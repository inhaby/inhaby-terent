import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ShieldCheck, Star, MapPin, User, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import OptimizedImage from "./OptimizedImage";
import { useLanguage } from "../context/LanguageContext";

const carouselListings = [
  {
    id: 1,
    title: "Luxury 1BHK Studio • No Brokerage",
    location: "Koramangala 4th Block, Bangalore",
    price: "₹18,500/mo",
    deposit: "2 Months",
    type: "1 BHK Studio",
    ownerType: "Direct Owner",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    postedAt: "Just updated",
  },
  {
    id: 2,
    title: "Modern 2BHK with Sky Balcony",
    location: "Sector 2, HSR Layout, Bangalore",
    price: "₹35,000/mo",
    deposit: "2 Months",
    type: "2 BHK",
    ownerType: "Direct Owner",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    postedAt: "Verified today",
  },
  {
    id: 3,
    title: "Cozy Penthouse for Professionals",
    location: "Indiranagar, Bangalore",
    price: "₹42,000/mo",
    deposit: "3 Months",
    type: "3 BHK Penthouse",
    ownerType: "Managed Owner",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
    postedAt: "3 hours ago",
  },
  {
    id: 4,
    title: "Premium 3BHK Family Flat",
    location: "Whitefield, Bangalore",
    price: "₹65,000/mo",
    deposit: "3 Months",
    type: "3 BHK",
    ownerType: "Direct Owner",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800",
    postedAt: "Verified yesterday",
  }
];

export default function VerifiedListingsCarousel() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  const handleManualAction = () => {
    setLastInteraction(Date.now());
  };

  // Automatic smooth horizontal scrolling
  useEffect(() => {
    if (isLoading || prefersReduced) return;

    const interval = setInterval(() => {
      if (isPaused) return;
      const now = Date.now();
      if (now - lastInteraction >= 6000) {
        if (containerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
          // If we are at the end, wrap back to the start
          if (scrollLeft + clientWidth >= scrollWidth - 25) {
            containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            // Slide by roughly one card width plus gap
            const cardWidth = window.innerWidth < 768 ? 332 : 412; // 300+32 or 380+32
            containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
          }
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isLoading, prefersReduced, isPaused, lastInteraction]);

  const slideLeft = () => {
    handleManualAction();
    if (containerRef.current) {
      const cardWidth = window.innerWidth < 768 ? 332 : 412;
      containerRef.current.scrollBy({ left: -cardWidth, behavior: prefersReduced ? "auto" : "smooth" });
    }
  };

  const slideRight = () => {
    handleManualAction();
    if (containerRef.current) {
      const cardWidth = window.innerWidth < 768 ? 332 : 412;
      containerRef.current.scrollBy({ left: cardWidth, behavior: prefersReduced ? "auto" : "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-24 bg-background relative overflow-hidden border-b border-border">
      {/* Background radial soft light glow */}
      <div className="absolute top-[40%] right-[-10%] w-96 h-96 bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        
        {/* Carousel Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full border border-primary/10">
              Live Verified Catalog
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t("carousel.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              {t("carousel.subtitle")}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex space-x-3.5">
            <button 
              onClick={slideLeft}
              className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted text-foreground flex items-center justify-center transition-all shadow-xs hover:border-primary/30 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={slideRight}
              className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted text-foreground flex items-center justify-center transition-all shadow-xs hover:border-primary/30 active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Track */}
        <div 
          ref={containerRef}
          onMouseEnter={() => {
            setIsPaused(true);
            handleManualAction();
          }}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => {
            setIsPaused(true);
            handleManualAction();
          }}
          onTouchEnd={() => setIsPaused(false)}
          className="flex overflow-x-auto gap-8 pb-10 scrollbar-none snap-x snap-mandatory no-scrollbar -mx-5 sm:-mx-6 px-5 sm:px-6"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        >
          {isLoading ? (
            // Shimmering skeletons for property cards that match final layout exactly
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[300px] md:w-[380px] snap-start scroll-mx-5 sm:scroll-mx-0 bg-background rounded-[2rem] border border-border overflow-hidden"
              >
                <div className={`relative aspect-[16/11] shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`}>
                  <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <div className={`w-20 h-6 rounded-full bg-background/50`} />
                    <div className={`w-24 h-6 rounded-full bg-background/50`} />
                  </div>
                  <div className="absolute bottom-5 left-5 w-16 h-8 rounded-xl bg-background/50" />
                  <div className="absolute bottom-5 right-5 w-24 h-5 rounded bg-background/50" />
                </div>
                <div className="p-6 md:p-7 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <div className={`h-5 w-48 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                      <div className={`h-3 w-32 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                    </div>
                    <div className="space-y-1.5 text-right flex flex-col items-end shrink-0">
                      <div className={`h-5 w-16 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                      <div className={`h-2.5 w-12 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                      <div className={`h-3.5 w-20 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                    </div>
                    <div className={`h-3.5 w-16 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            carouselListings.map((item) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0 w-[300px] md:w-[380px] snap-start scroll-mx-5 sm:scroll-mx-0 bg-background rounded-[2rem] border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                whileHover={prefersReduced ? {} : { y: -6 }}
              >
                {/* Card Image and Floating Badges with Optimized progressive load */}
                <div className="relative aspect-[16/11]">
                  <OptimizedImage 
                    src={item.image} 
                    alt={item.title} 
                    aspectRatio="aspect-full h-full w-full"
                    loading="lazy"
                  />
                  
                  {/* Upper badges: Verified Tag & No Brokerage Tag */}
                  <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
                    <div className="px-3.5 py-1.5 bg-primary/90 backdrop-blur-xs text-primary-foreground text-[10px] font-extrabold rounded-full flex items-center space-x-1 uppercase tracking-wider shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5 fill-current text-primary-foreground" />
                      <span>{t("carousel.badge_verified")}</span>
                    </div>
                    <div className="px-3.5 py-1.5 bg-primary-soft text-primary text-[10px] font-extrabold rounded-full uppercase tracking-wider border border-primary/20 shadow-md">
                      {t("carousel.badge_no_brokerage")}
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-5 left-5 px-3 py-1.5 bg-background/90 backdrop-blur-md text-foreground text-xs font-extrabold rounded-xl flex items-center space-x-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{item.rating}</span>
                  </div>

                  {/* Live update pill */}
                  <div className="absolute bottom-5 right-5 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[9px] font-extrabold uppercase tracking-wide rounded-md">
                    {item.postedAt}
                  </div>
                </div>

                {/* Card Bottom Metadata Content */}
                <div className="p-6 md:p-7 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 text-left">
                      <h3 className="text-base md:text-lg font-extrabold text-foreground leading-snug group-hover:text-primary transition-colors truncate">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground font-semibold mt-1.5">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-primary shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base md:text-lg font-extrabold text-foreground whitespace-nowrap">{item.price}</div>
                      <div className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider whitespace-nowrap">Dep: {item.deposit}</div>
                    </div>
                  </div>

                  {/* Direct Owner contact label footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-bold text-foreground">{t("carousel.direct_owner")}</span>
                    </div>
                    <Link 
                      to="/verify" 
                      className="text-xs font-bold text-primary flex items-center space-x-1 hover:underline"
                    >
                      <span>{t("carousel.verify_property")}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* View all button under listings */}
        <div className="text-center mt-4">
          <Link 
            to="/savings"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-muted hover:bg-border/80 border border-border rounded-2xl font-bold text-foreground transition-all active:scale-98"
          >
            <span>Calculate Your Rental Savings</span>
            <ChevronRight className="w-4 h-4 text-primary" />
          </Link>
        </div>

      </div>
    </section>
  );
}
