import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Star, Shield, Home, Sparkles, Check, ChevronRight, Heart } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import OptimizedImage from "./OptimizedImage";
import { useLanguage } from "../context/LanguageContext";

const stats = [
  { value: "15,000+", label: "Verified Homes", desc: "No fake listings" },
  { value: "98%", label: "Verification Accuracy", desc: "Manual deed matched" },
  { value: "50+", label: "Cities", desc: "Across India" },
  { value: "Zero", label: "Brokerage", desc: "No hidden charges" },
];

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReduced = usePrefersReducedMotion();
  const { t } = useLanguage();

  const [isDesktop, setIsDesktop] = useState(false);
  const [timeMs, setTimeMs] = useState(0);
  const [loopIndex, setLoopIndex] = useState(0);
  const [isPhoneEntered, setIsPhoneEntered] = useState(false);

  // Live Interactive Demo states
  const [isDemoInViewport, setIsDemoInViewport] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // >=768 to include tablets
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !phoneRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDemoInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(phoneRef.current);
    return () => observer.disconnect();
  }, []);

  const shouldAnimate = !prefersReduced && isDesktop;

  useEffect(() => {
    if (!shouldAnimate) {
      setIsPhoneEntered(false);
      return;
    }

    // Set phone entered state after the 700ms entrance animation completes
    const enteredTimeout = setTimeout(() => {
      setIsPhoneEntered(true);
    }, 700);

    return () => clearTimeout(enteredTimeout);
  }, [shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate) {
      setTimeMs(0);
      setLoopIndex(0);
      return;
    }
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setTimeMs(elapsed % 15000);
      setLoopIndex(Math.floor(elapsed / 15000) % 4);
    }, 100);
    return () => clearInterval(interval);
  }, [shouldAnimate]);

  // Derive all active state values based on timeMs (0ms - 15000ms)
  const searchQueries = ["Search PGs...", "Search Flats...", "Search Rooms...", "Search Apartments..."];
  const currentQuery = searchQueries[loopIndex];

  // Search typing: starts typing at 2s (2000ms), completes, stays until 15s reset.
  let displayText = "";
  if (!shouldAnimate) {
    displayText = "Search PGs, Rooms, Flats...";
  } else if (timeMs >= 2000) {
    const charsToShow = Math.min(
      currentQuery.length,
      Math.floor((timeMs - 2000) / 100) // typing speed: 100ms per char
    );
    displayText = currentQuery.substring(0, charsToShow);
  } else {
    displayText = "";
  }

  // Active floating badge index cycles every 3 seconds (5 badges across 15 seconds)
  const activeBadgeIndex = Math.floor(timeMs / 3000);

  // Bottom navigation tab bar active index:
  // - 0s to 10s: tab 0 (Explore)
  // - 10s to 13s: tab 1 (Verify)
  // - 13s to 15s: tab 2 (Reviews)
  let activeTab = 0;
  if (shouldAnimate) {
    if (timeMs >= 13000) {
      activeTab = 2;
    } else if (timeMs >= 10000) {
      activeTab = 1;
    }
  }

  return (
    <section className="relative pt-[144px] pb-4 sm:pt-20 sm:pb-6 md:pt-28 md:pb-12 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* Decorative blurred green glow and geometric circles behind the hero */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] -z-10 pointer-events-none opacity-80" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px] -z-10 pointer-events-none" />
 
      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left md:justify-between gap-4 md:gap-6 lg:gap-8">
          
          {/* Hero Left Content */}
          <div className="max-w-2xl md:w-[52%] lg:w-[55%] shrink-0">
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 mb-3.5 md:mb-6 text-[10.5px] md:text-sm font-semibold tracking-wide text-primary uppercase bg-primary-soft rounded-full border border-primary/10">
                <span>{t("hero.live")}</span>
              </div>
              
              <h1 className="mb-3.5 md:mb-4 text-[34px] font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-sans max-w-sm sm:max-w-md md:max-w-none mx-auto lg:mx-0">
                {t("hero.title1")}<br className="hidden sm:inline" />
                {t("hero.title2")}{" "}
                <span className="text-primary relative inline-block">
                  {t("hero.title_accent")}
                  <span className="absolute bottom-1 left-0 w-full h-[6px] bg-primary/20 rounded-full" />
                </span>
              </h1>
              
              <p className="mb-4.5 md:mb-6 text-[15px] sm:text-sm md:text-xl leading-relaxed text-muted-foreground font-medium max-w-sm sm:max-w-md md:max-w-xl mx-auto lg:mx-0">
                <span className="md:hidden">{t("hero.subtitle_mobile")}</span>
                <span className="hidden md:inline">{t("hero.subtitle_desktop")}</span>
              </p>
              
              <div className="space-y-2 md:space-y-4 mb-3 md:mb-8 max-w-md mx-auto lg:mx-0">
                <div className="flex flex-col space-y-1.5 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                  <a 
                    href="https://inhaby.com" 
                    className="w-full sm:w-auto px-5 md:px-8 h-[48px] md:h-[52px] bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 transition-all text-center flex items-center justify-center text-xs md:text-sm shadow-md"
                  >
                    Get Started
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-1.5" />
                  </a>
                  
                  <a 
                    href="https://owner.inhaby.com" 
                    className="w-full sm:w-auto px-5 md:px-8 h-[48px] md:h-[52px] bg-background border border-primary/35 text-primary hover:bg-primary-soft hover:border-primary rounded-xl font-bold hover:-translate-y-0.5 active:translate-y-0 transition-all text-center flex items-center justify-center text-xs md:text-sm shadow-xs"
                  >
                    List Your Property
                  </a>
                </div>
 
                {/* Already own a property? subtle text link */}
                <div className="text-center lg:text-left">
                  <a 
                    href="https://owner.inhaby.com"
                    className="inline-flex items-center text-[10px] md:text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <span>Already own a property? List it in minutes →</span>
                  </a>
                </div>
              </div>
 
              {/* Trust Badge Indicators right under CTAs - Compact layout on mobile */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 sm:flex sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start sm:gap-x-4 md:gap-x-6 mb-3 md:mb-12 text-[9px] sm:text-xs font-semibold text-muted-foreground border-t border-border pt-2.5 md:pt-6">
                <div className="col-span-2 sm:col-span-1 flex items-center justify-center lg:justify-start space-x-1">
                  <div className={`w-1.5 h-1.5 bg-primary rounded-full ${prefersReduced ? "" : "animate-ping"} shrink-0`} />
                  <span className="flex items-center"><Shield className="w-3.5 h-3.5 mr-1 text-primary shrink-0" /> Every listing manually verified</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-1">
                  <span className="flex items-center"><Check className="w-3.5 h-3.5 mr-1 text-primary shrink-0" /> Zero brokerage.</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-1">
                  <span className="flex items-center"><Star className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500 shrink-0" /> Rent directly from owners</span>
                </div>
              </div>
 
              {/* Trust Indicators Section (Statistics with skeleton support) */}
              <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-background/40 backdrop-blur-md rounded-2xl border border-border/80 flex flex-col space-y-2"
                    >
                      <div className={`h-8 w-16 rounded-md shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                      <div className={`h-3.5 w-20 rounded-md shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                      <div className={`h-2.5 w-12 rounded-md shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                    </div>
                  ))
                ) : (
                  stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="p-4 bg-background/40 backdrop-blur-md rounded-2xl border border-border/80 hover:border-primary/20 hover:bg-background/80 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default"
                    >
                      <div className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</div>
                      <div className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-wide">{stat.label}</div>
                      <div className="text-[10px] text-muted-foreground/80 mt-0.5">{stat.desc}</div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
 
          {/* Hero Right Content - Mobile Mockup and Premium Floating Cards */}
          <div className="hidden md:flex relative w-full md:w-[48%] lg:w-[45%] items-center justify-center hero-phone-group" ref={phoneRef}>
            
            {/* Low-opacity geometric concentric circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-primary/5 -z-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-primary/3 -z-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-primary/2 -z-10 pointer-events-none" />
            
            {/* Subtle themed radial glow behind the phone */}
            {shouldAnimate && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full pointer-events-none opacity-5 animate-glow-pulse bg-themed-radial-glow -z-10" />
            )}

            {/* Vertical Slow Floating Phone Wrapper */}
            <div
              className={`relative w-full max-w-[190px] xs:max-w-[210px] md:max-w-[380px] z-10 phone-hover-container ${
                shouldAnimate 
                  ? (isPhoneEntered ? "animate-phone-float" : "animate-phone-entrance") 
                  : ""
              }`}
            >
              {/* Phone Body with premium shadow depth */}
              <div className="relative p-3 bg-slate-950 rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-[8px] border-slate-900 overflow-hidden">
                {/* Dynamic Island style header notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-full z-20 flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-950/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950/40" />
                </div>

                <div className="overflow-hidden bg-background rounded-[38px] aspect-[9/19.5] relative">
                  
                  {/* Real-looking iOS Status Bar (Always on top of the iframe) */}
                  <div className="absolute top-0 left-0 right-0 h-10 px-6 pt-3.5 flex justify-between items-center text-[10px] font-extrabold text-foreground z-30 pointer-events-none bg-background/40 backdrop-blur-xs">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2 bg-foreground rounded-xs opacity-90" />
                      <span className="w-3.5 h-2.5 bg-foreground rounded-xs opacity-90" />
                    </div>
                  </div>

                  {/* Lazy-loaded Interactive Live Demo App */}
                  {isDemoInViewport && (
                    <iframe
                      src="/demo"
                      title="INHABY Live Interactive Demo"
                      className={`absolute inset-x-0 bottom-0 w-full h-[calc(100%-2.5rem)] border-none z-10 transition-opacity duration-500 no-scrollbar ${
                        isIframeLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                      onLoad={() => setIsIframeLoaded(true)}
                    />
                  )}

                  {/* Real-looking iOS Home Indicator Bar (Always on top) */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-foreground/15 dark:bg-foreground/20 rounded-full z-30 pointer-events-none" />

                  {/* Beautiful exact layout matching shimmer skeleton for the app mockup */}
                  {(!isDemoInViewport || !isIframeLoaded) && (
                    <div className="absolute inset-0 z-0 bg-background flex flex-col justify-between p-5 pt-13 overflow-hidden">
                      <div className="space-y-5">
                        {/* Custom App Header Skeleton */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-xl shimmer-bg animate-shimmer" />
                            <div className="h-4 w-20 rounded shimmer-bg animate-shimmer" />
                          </div>
                          <div className="w-8 h-8 rounded-full shimmer-bg animate-shimmer" />
                        </div>

                        {/* Search Title Skeleton */}
                        <div className="space-y-1.5">
                          <div className="h-4.5 w-32 rounded shimmer-bg animate-shimmer" />
                          <div className="h-3 w-40 rounded shimmer-bg animate-shimmer" />
                        </div>

                        {/* Search Bar Mockup Skeleton */}
                        <div className="h-9.5 w-full rounded-xl shimmer-bg animate-shimmer" />

                        {/* Categories List Skeleton */}
                        <div className="flex space-x-2 overflow-hidden -mx-5 px-5">
                          <div className="h-7 w-12 rounded-lg shimmer-bg animate-shimmer shrink-0" />
                          <div className="h-7 w-24 rounded-lg shimmer-bg animate-shimmer shrink-0" />
                          <div className="h-7 w-20 rounded-lg shimmer-bg animate-shimmer shrink-0" />
                        </div>

                        {/* Premium Property Listing Mockup Skeleton */}
                        <div className="border border-border rounded-xl overflow-hidden flex flex-col">
                          <div className="aspect-[16/10] shimmer-bg animate-shimmer" />
                          <div className="p-3.5 space-y-2">
                            <div className="flex justify-between">
                              <div className="h-3 w-24 rounded shimmer-bg animate-shimmer" />
                              <div className="h-3.5 w-16 rounded shimmer-bg animate-shimmer" />
                            </div>
                            <div className="h-3.5 w-36 rounded shimmer-bg animate-shimmer" />
                            <div className="h-3 w-28 rounded pt-1 border-t border-border/40 shimmer-bg animate-shimmer" />
                          </div>
                        </div>
                      </div>

                      {/* App Tabbar Skeleton */}
                      <div className="h-13 border-t border-border flex justify-between items-center px-6 -mx-5 -mb-5 bg-background">
                        <div className="w-5 h-5 rounded shimmer-bg animate-shimmer" />
                        <div className="w-5 h-5 rounded shimmer-bg animate-shimmer" />
                        <div className="w-5 h-5 rounded shimmer-bg animate-shimmer" />
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* FLOATING UI CARD 1: ✓ Verified Owner (Left side) */}
              <div className={`absolute top-[15%] -left-[10%] md:-left-[18%] hidden sm:flex z-20 transition-all duration-700 ease-out delay-100 pointer-events-none ${
                shouldAnimate 
                  ? (isPhoneEntered ? "animate-float-badge-1 opacity-100 scale-100" : "opacity-0 scale-90 translate-y-4") 
                  : "opacity-100 scale-100"
              }`}>
                <div className="badge-hover-container pointer-events-auto">
                  <div className="bg-background/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-primary/20 shadow-xl flex items-center space-x-2">
                    <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-foreground">Verified Owner</div>
                      <div className="text-[9px] text-muted-foreground font-medium">Deed Matched</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING UI CARD 2: ⭐ 4.9 User Rating (Right side) */}
              <div className={`absolute top-[30%] -right-[8%] md:-right-[14%] hidden sm:flex z-20 transition-all duration-700 ease-out delay-200 pointer-events-none ${
                shouldAnimate 
                  ? (isPhoneEntered ? "animate-float-badge-2 opacity-100 scale-100" : "opacity-0 scale-90 translate-y-4") 
                  : "opacity-100 scale-100"
              }`}>
                <div className="badge-hover-container pointer-events-auto">
                  <div className="bg-background/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-primary/10 shadow-xl flex items-center space-x-2">
                    <div className="w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                      ⭐
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-foreground">4.9 User Rating</div>
                      <div className="text-[9px] text-muted-foreground font-medium">Verified Reviews</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING UI CARD 3: ✓ Verified Listing (Bottom Right) */}
              <div className={`absolute bottom-[12%] -right-[10%] md:-right-[16%] hidden sm:flex z-20 transition-all duration-700 ease-out delay-300 pointer-events-none ${
                shouldAnimate 
                  ? (isPhoneEntered ? "animate-float-badge-3 opacity-100 scale-100" : "opacity-0 scale-90 translate-y-4") 
                  : "opacity-100 scale-100"
              }`}>
                <div className="badge-hover-container pointer-events-auto">
                  <div className="bg-background/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-primary/20 shadow-xl flex items-center space-x-2.5">
                    <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-foreground">Verified Listing</div>
                      <div className="text-[9px] text-muted-foreground font-medium">Manual Check</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING UI CARD 4: ✓ No Brokerage (Bottom Left) */}
              <div className={`absolute bottom-[20%] -left-[12%] md:-left-[20%] hidden sm:flex z-20 transition-all duration-700 ease-out delay-400 pointer-events-none ${
                shouldAnimate 
                  ? (isPhoneEntered ? "animate-float-badge-4 opacity-100 scale-100" : "opacity-0 scale-90 translate-y-4") 
                  : "opacity-100 scale-100"
              }`}>
                <div className="badge-hover-container pointer-events-auto">
                  <div className="bg-background/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-primary/20 shadow-xl flex items-center space-x-2">
                    <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-foreground">No Brokerage</div>
                      <div className="text-[9px] text-muted-foreground font-medium">Direct Contract</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING UI CARD 5: Verified Today (Top Right) */}
              <div className={`absolute top-[3%] right-[10%] hidden sm:flex z-30 transition-all duration-700 ease-out delay-500 pointer-events-none ${
                shouldAnimate 
                  ? (isPhoneEntered ? "animate-float-badge-5 opacity-100 scale-100" : "opacity-0 scale-90 translate-y-4") 
                  : "opacity-100 scale-100"
              }`}>
                <div className="badge-hover-container pointer-events-auto">
                  <div className="bg-primary text-primary-foreground px-3.5 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 text-[10px] font-extrabold uppercase tracking-wider">
                    <span className={`w-1.5 h-1.5 bg-primary-foreground rounded-full ${prefersReduced ? "" : "animate-ping"}`} />
                    <span>Verified Today</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
