import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import OptimizedImage from "./OptimizedImage";

const testimonials = [
  {
    name: "Priya Nair",
    role: "UX Architect at TechCorp",
    location: "Koramangala, Bangalore",
    quote: "I saved over ₹45,000 in brokerage. The direct chat with Mr. Sharma (the owner) was fast, friendly, and transparent. We drafted the digital lease agreement on the app in under 10 minutes. Absolute world-class experience!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    whyTrusted: "Zero Brokerage & Direct Chat",
  },
  {
    name: "Neerav Patel",
    role: "Student (Delhi University)",
    location: "New Delhi",
    quote: "As a college student moving cities, finding a PG was stressful. Every agent tried to scam me with stock photos. On Inhaby, the photos matched the room 100% when I checked in. Trusting the platform was the best decision I made.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80",
    whyTrusted: "Verified Real Photos",
  },
  {
    name: "The Mukherjees",
    role: "Family of Three",
    location: "DLF Phase 3, Gurgaon",
    quote: "Renting with children is tough because of surprise landlord rules and hidden society fees. Inhaby checked the society NOCs and utility bills beforehand. The locked-in price was exactly what we paid. No surprises.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=120&q=80",
    whyTrusted: "Transparent locked Pricing",
  },
  {
    name: "Col. V.S. Rao (Retd.)",
    role: "Retired Defense Landlord",
    location: "Indiranagar, Bangalore",
    quote: "I didn't want brokers harassing me with dozens of spam calls daily. Inhaby physically verified my 2BHK flat, checked the tenant's employment documents, and connected me directly with polite working professionals. Safest way to rent.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    whyTrusted: "Verified Tenant Profiles",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-12 md:py-24 bg-background relative overflow-hidden border-t border-border">
      {/* Visual background accents */}
      <div className="absolute top-[20%] left-[-5%] w-80 h-80 bg-primary/3 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[350px] h-[350px] bg-primary/2 rounded-full blur-[110px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-primary-soft rounded-full border border-primary/10">
            Loved By Thousands
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Why our community trusts INHABY
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
            From students stepping out of their hometowns to families settling into premium flats—here are the real stories behind Inhaby's trusted rental revolution.
          </p>
        </div>

        {/* Desktop / Tablet Testimonial Bento Grid */}
        <div className="hidden md:grid grid-cols-2 gap-8 lg:gap-10">
          {isLoading ? (
            // Testimonial Bento Grid skeleton
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="p-8 bg-background border border-border rounded-[2rem] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-4 h-4 rounded-full shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className={`h-4 w-full rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                    <div className={`h-4 w-5/6 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                    <div className={`h-4 w-4/5 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-12 h-12 rounded-full shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                    <div className="space-y-2">
                      <div className={`h-3 w-24 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                      <div className={`h-2.5 w-32 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                    </div>
                  </div>
                  <div className={`w-28 h-6 rounded-full shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                </div>
              </div>
            ))
          ) : (
            testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 bg-background border border-border rounded-[2rem] hover:border-primary/20 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
              >
                {/* Top Quote Icon */}
                <div className="absolute top-8 right-8 text-primary/10">
                  <Quote className="w-12 h-12 stroke-[3]" />
                </div>

                <div>
                  {/* Gold Rating Stars */}
                  <div className="flex space-x-1 mb-5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-foreground text-sm font-semibold leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* User Bio Card footer */}
                <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-border shrink-0">
                      <OptimizedImage 
                        src={t.avatar} 
                        alt={t.name} 
                        aspectRatio="aspect-square"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-foreground">{t.name}</h4>
                      <p className="text-[11px] text-muted-foreground font-semibold">{t.role} • {t.location}</p>
                    </div>
                  </div>

                  {/* Trusted Badge sticker */}
                  <div className="px-3 py-1 bg-primary-soft text-primary rounded-full text-[10px] font-extrabold uppercase tracking-wide flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 fill-current" />
                    <span>{t.whyTrusted}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Mobile Swipeable Testimonial Carousel (md:hidden) */}
        <div className="md:hidden relative px-1 max-w-lg mx-auto">
          {isLoading ? (
            <div className="w-full bg-background border border-border rounded-3xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`w-4 h-4 rounded-full shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className={`h-4 w-full rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                  <div className={`h-4 w-5/6 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                  <div className={`h-4 w-2/3 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                </div>
              </div>
              <div className="flex flex-col space-y-4 pt-5 border-t border-border mt-auto">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                  <div className="space-y-2">
                    <div className={`h-3 w-20 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                    <div className={`h-2.5 w-24 rounded shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
                  </div>
                </div>
                <div className={`w-28 h-5 rounded-full shimmer-bg ${prefersReduced ? "" : "animate-shimmer"}`} />
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-hidden min-h-[360px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: prefersReduced ? 0 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: prefersReduced ? 0 : -50 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    drag={prefersReduced ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, info) => {
                      if (info.offset.x < -40) {
                        handleNext();
                      } else if (info.offset.x > 40) {
                        handlePrev();
                      }
                    }}
                    className="w-full bg-background border border-border rounded-3xl p-6 relative flex flex-col justify-between shadow-md cursor-grab active:cursor-grabbing"
                  >
                    {/* Quote watermark icon */}
                    <div className="absolute top-6 right-6 text-primary/10">
                      <Quote className="w-10 h-10 stroke-[3]" />
                    </div>

                    <div>
                      {/* Rating Stars */}
                      <div className="flex space-x-1 mb-4">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ))}
                      </div>

                      {/* Testimonial Quote */}
                      <p className="text-foreground text-sm font-semibold leading-relaxed mb-6 italic">
                        "{testimonials[activeIndex].quote}"
                      </p>
                    </div>

                    {/* User Bio Card */}
                    <div className="flex flex-col space-y-4 pt-5 border-t border-border mt-auto">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-border shrink-0">
                          <OptimizedImage 
                            src={testimonials[activeIndex].avatar} 
                            alt={testimonials[activeIndex].name} 
                            aspectRatio="aspect-square"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-foreground">{testimonials[activeIndex].name}</h4>
                          <p className="text-[10px] text-muted-foreground font-semibold leading-tight">
                            {testimonials[activeIndex].role} • {testimonials[activeIndex].location}
                          </p>
                        </div>
                      </div>

                      {/* Trust Badge */}
                      <div className="self-start px-2.5 py-1 bg-primary-soft text-primary rounded-full text-[9px] font-extrabold uppercase tracking-wide flex items-center space-x-1">
                        <ShieldCheck className="w-2.5 h-2.5 fill-current" />
                        <span>{testimonials[activeIndex].whyTrusted}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Swipe Instructions & Swipe Controls */}
              <div className="flex justify-between items-center mt-6">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 bg-background border border-border hover:border-primary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all active:scale-95 shadow-xs"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Slider dots indicator */}
                <div className="flex space-x-1.5 justify-center">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-border'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={handleNext}
                  className="w-10 h-10 bg-background border border-border hover:border-primary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all active:scale-95 shadow-xs"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
