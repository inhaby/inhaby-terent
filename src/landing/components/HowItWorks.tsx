import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShieldCheck, MessageSquare, Calendar, FileText, Home, ArrowRight, ArrowDown } from "lucide-react";

const steps = [
  {
    title: "Search Home",
    description: "Browse 100% real and verified listings with high-resolution actual photos.",
    icon: Search,
    badge: "Browse",
  },
  {
    title: "Property Verification",
    description: "Our team verifies documents and physically inspects listings.",
    icon: ShieldCheck,
    badge: "Verified",
  },
  {
    title: "Chat With Owner",
    description: "Connect directly with verified landlords without intermediate agents.",
    icon: MessageSquare,
    badge: "Direct",
  },
  {
    title: "Book Visit",
    description: "Schedule visits easily on dates that work for you.",
    icon: Calendar,
    badge: "Tours",
  },
  {
    title: "Digital Agreement",
    description: "Complete paperless, legal lease agreements within the app.",
    icon: FileText,
    badge: "Legal",
  },
  {
    title: "Move In",
    description: "Collect keys and move into your clean, trusted home.",
    icon: Home,
    badge: "Unpack",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [interactionTimeout, setInteractionTimeout] = useState<NodeJS.Timeout | null>(null);

  // Check Accessibility "Reduce Motion" setting
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }

    const listener = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
      if (e.matches) {
        setIsPlaying(false);
      }
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Continuous electrical/energy timing loop
  useEffect(() => {
    if (!isPlaying || reduceMotion) return;

    const initialElapsed = activeStep * 1800;
    const startTime = Date.now() - initialElapsed;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) % 10800; // 1.8s per step * 6 steps = 10.8s
      const step = Math.floor(elapsed / 1800);
      setActiveStep(step);
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, reduceMotion, activeStep]);

  const handleUserInteraction = (newStep: number) => {
    setIsPlaying(false);
    setActiveStep(newStep);

    if (interactionTimeout) clearTimeout(interactionTimeout);

    const timeout = setTimeout(() => {
      if (!reduceMotion) {
        setIsPlaying(true);
      }
    }, 6000); // Resume autoplay after 6 seconds of inactivity
    setInteractionTimeout(timeout);
  };

  const handleSwipeLeft = () => {
    const next = (activeStep + 1) % 6;
    handleUserInteraction(next);
  };

  const handleSwipeRight = () => {
    const prev = (activeStep - 1 + 6) % 6;
    handleUserInteraction(prev);
  };

  return (
    <section id="how-it-works" className="py-12 md:py-24 relative overflow-hidden bg-background">
      {/* Living background circles inside the section */}
      <div className="absolute top-[30%] left-[5%] w-72 h-72 bg-primary/3 rounded-full blur-[90px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-80 h-80 bg-primary/2 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-primary-soft rounded-full">
            E2E Seamless Process
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            A beautiful, connected visual journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From the moment you start searching to the day you unlock your front door, we back your rental journey with complete transparency.
          </p>
        </motion.div>

        {/* MOBILE & TABLET VERSION (xl:hidden) - Premium Horizontal Slider Layout */}
        <div className="block xl:hidden max-w-xl mx-auto space-y-10">
          
          {/* Interactive Horizontal Timeline */}
          <div className="relative w-full py-4">
            
            {/* Base timeline line background */}
            <div className="absolute left-[20px] right-[20px] top-[36px] -translate-y-1/2 h-[3.5px] bg-muted rounded-full -z-10" />

            {/* Dynamic theme-colored progress fill line */}
            <motion.div 
              className="absolute left-[20px] top-[36px] -translate-y-1/2 h-[3.5px] bg-primary rounded-full -z-10 origin-left"
              animate={{
                width: `calc(${(activeStep / 5) * 100}% - ${(activeStep / 5) * 40}px)`
              }}
              transition={{
                duration: isPlaying ? (activeStep === 0 ? 0 : 1.8) : 0.3,
                ease: isPlaying ? "linear" : "easeOut"
              }}
              style={{
                maxWidth: "calc(100% - 40px)"
              }}
            />

            {/* Flowing electric energy pulse head */}
            <motion.div
              className="absolute h-2.5 w-2.5 bg-primary rounded-full shadow-[0_0_12px_rgba(var(--primary),0.8)] -z-10"
              animate={{
                left: `calc(20px + ${(activeStep / 5) * 100}% - ${(activeStep / 5) * 40}px)`
              }}
              transition={{
                duration: isPlaying ? (activeStep === 0 ? 0 : 1.8) : 0.3,
                ease: isPlaying ? "linear" : "easeOut"
              }}
              style={{
                transform: "translate(-50%, -50%)",
                top: "36px"
              }}
            />

            {/* Step buttons */}
            <div className="flex justify-between items-center w-full">
              {steps.map((step, idx) => {
                const isActive = idx === activeStep;
                const isCompleted = idx < activeStep;
                const IconComp = step.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleUserInteraction(idx)}
                    className="relative flex flex-col items-center focus:outline-none cursor-pointer"
                    style={{ width: "40px" }}
                  >
                    {/* Circle step indicator */}
                    <div 
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 relative ${
                        isActive 
                          ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/35 scale-110 ring-4 ring-primary/10" 
                          : isCompleted
                            ? "bg-primary-soft border-primary/30 text-primary"
                            : "bg-background border-border text-muted-foreground/60"
                      }`}
                    >
                      <IconComp className={`w-4 h-4 transition-all duration-300 ${isActive ? "scale-110 text-primary-foreground" : "opacity-70 scale-90"}`} />
                      
                      {/* Small step number badge at the top right of each circle */}
                      <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black border ${
                        isActive
                          ? "bg-foreground text-background border-foreground"
                          : "bg-muted text-muted-foreground border-border"
                      }`}>
                        {idx + 1}
                      </span>
                    </div>

                    {/* Badge Label below indicator */}
                    <span className={`text-[9px] font-black mt-2 tracking-wide uppercase transition-all duration-300 ${
                      isActive 
                        ? "text-primary scale-105" 
                        : "text-muted-foreground/60"
                    }`}>
                      {step.badge}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Active Step Content Card with drag/swipe support */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(e, info) => {
              const swipeThreshold = 40;
              if (info.offset.x < -swipeThreshold) {
                handleSwipeLeft();
              } else if (info.offset.x > swipeThreshold) {
                handleSwipeRight();
              }
            }}
            className="cursor-grab active:cursor-grabbing bg-background border border-border/80 rounded-[2rem] p-6 sm:p-8 shadow-xl relative overflow-hidden group select-none touch-pan-y"
          >
            {/* Soft theme-colored background decorative glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
                      {(() => {
                        const IconComp = steps[activeStep].icon;
                        return <IconComp className="w-5 h-5 animate-pulse" />;
                      })()}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary-soft px-3 py-1 rounded-full border border-primary/10">
                      {steps[activeStep].badge}
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-muted-foreground">
                    Step {activeStep + 1} of 6
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-foreground font-sans tracking-tight">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                    {steps[activeStep].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls / Swipe feedback bar */}
            <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center text-[10px] font-bold text-muted-foreground">
              <button 
                onClick={handleSwipeRight}
                className="flex items-center hover:text-primary transition-colors cursor-pointer"
              >
                <span>Swipe Right or Tap Prev</span>
              </button>
              <div className="flex space-x-1.5">
                {steps.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${idx === activeStep ? "w-4 bg-primary" : "w-1 bg-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <button 
                onClick={handleSwipeLeft}
                className="flex items-center hover:text-primary transition-colors cursor-pointer"
              >
                <span>Swipe Left or Tap Next</span>
              </button>
            </div>
          </motion.div>

        </div>

        {/* DESKTOP VERSION (xl:block) - EXACTLY AS BEFORE */}
        <div className="hidden xl:block">
          <div className="relative">
            {/* Animated Connecting Timeline line (Desktop horizontal line) */}
            <div className="absolute top-[68px] left-[10%] right-[10%] h-[3px] bg-border -z-10">
              <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                className="h-full bg-primary"
              />
            </div>

            <div className="grid xl:grid-cols-6 gap-8 relative">
              {steps.map((step, index) => {
                const IconComp = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Visual Step bubble */}
                    <div className="relative w-28 h-28 bg-background border-2 border-border rounded-[2rem] flex items-center justify-center mb-6 shadow-sm group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5 transition-all duration-300">
                      {/* Step number badge */}
                      <div className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-muted text-muted-foreground rounded-xl flex items-center justify-center text-xs font-bold border border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                        {index + 1}
                      </div>
                      
                      {/* Outer circle spin effect on hover */}
                      <div className="absolute inset-2 border border-dashed border-muted-foreground/10 rounded-[1.5rem] group-hover:border-primary/20 group-hover:rotate-45 transition-all duration-700" />
                      
                      <IconComp className="w-9 h-9 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                    </div>

                    {/* Badge */}
                    <span className="text-[10px] font-extrabold tracking-widest text-primary bg-primary-soft px-2.5 py-0.5 rounded-full mb-3 uppercase opacity-90">
                      {step.badge}
                    </span>

                    {/* Step Text Content */}
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Emotionally reinforcing message banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 p-8 rounded-3xl bg-primary-soft/40 border border-primary/10 text-center max-w-3xl mx-auto"
        >
          <p className="text-base md:text-lg font-semibold text-foreground italic">
            "Every home deserves complete honesty. We guide you along a path built on verification and direct landlord transparency—so you never have to sign an agreement with uncertainty."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

