import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, Home, Building2, CheckCircle2, Sparkles,
  Upload, UserCheck, FileText, Camera, Award, Eye,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const verificationSteps = [
  {
    title: "Property Submitted",
    desc: "Landlord initiates upload including details, rent amount, and original photos.",
    icon: Upload,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    title: "Owner Verification",
    desc: "ID checks and government title deed matching to confirm authentic ownership.",
    icon: UserCheck,
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    title: "Document Verification",
    desc: "Thorough verification of title deeds, NOCs, and municipal records to confirm legal rights.",
    icon: FileText,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    title: "Photo Verification",
    desc: "Original photos are inspected or physically captured to guarantee a 100% room match.",
    icon: Camera,
    color: "text-sky-500 bg-sky-500/10",
  },
  {
    title: "Approved",
    desc: "The property matches all trust checklist requirements and receives our verification stamp.",
    icon: Award,
    color: "text-primary bg-primary/10",
  },
  {
    title: "Published",
    desc: "Goes live to thousands of renters with direct connection, zero brokerage, and locked pricing.",
    icon: Eye,
    color: "text-primary bg-primary/10",
  },
];

export default function UserJourneys() {
  const [activeTab, setActiveTab] = useState<"journey" | "verification">("journey");
  const [activeStep, setActiveStep] = useState(0);
  const [activeJourney, setActiveJourney] = useState<"renter" | "landlord">("renter");
  const { t } = useLanguage();

  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loopIndex, setLoopIndex] = useState(0);

  const loopStates = [
    { tab: "journey" as const, journey: "renter" as const, step: 0, duration: 3000 },
    { tab: "journey" as const, journey: "landlord" as const, step: 0, duration: 3000 },
    { tab: "verification" as const, journey: "landlord" as const, step: 0, duration: 1500 },
    { tab: "verification" as const, journey: "landlord" as const, step: 1, duration: 1500 },
    { tab: "verification" as const, journey: "landlord" as const, step: 2, duration: 1500 },
    { tab: "verification" as const, journey: "landlord" as const, step: 3, duration: 1500 },
    { tab: "verification" as const, journey: "landlord" as const, step: 4, duration: 1500 },
    { tab: "verification" as const, journey: "landlord" as const, step: 5, duration: 3500 },
  ];

  // Monitor inactivity to resume auto play
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      if (!isAutoPlaying && Date.now() - lastInteraction >= 6000) {
        setIsAutoPlaying(true);
        setLoopIndex(0); // Restart linear flow from step 1
      }
    }, 1000);

    return () => clearInterval(checkInactivity);
  }, [isAutoPlaying, lastInteraction]);

  // Handle sequential state transitions
  useEffect(() => {
    if (!isAutoPlaying) return;

    const currentState = loopStates[loopIndex];
    setActiveTab(currentState.tab);
    setActiveJourney(currentState.journey);
    setActiveStep(currentState.step);

    const timer = setTimeout(() => {
      setLoopIndex((prev) => (prev + 1) % loopStates.length);
    }, currentState.duration);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, loopIndex]);

  const handleUserAction = () => {
    setIsAutoPlaying(false);
    setLastInteraction(Date.now());
  };

  const handleTabChange = (tab: "journey" | "verification") => {
    setActiveTab(tab);
    if (tab === "verification") {
      setActiveStep(0);
    } else {
      setActiveJourney("renter");
    }
    handleUserAction();
  };

  const handleJourneyChange = (journey: "renter" | "landlord") => {
    setActiveJourney(journey);
    handleUserAction();
  };

  const handleStepSelect = (idx: number) => {
    setActiveStep(idx);
    handleUserAction();
  };

  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % verificationSteps.length);
    handleUserAction();
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev - 1 + verificationSteps.length) % verificationSteps.length);
    handleUserAction();
  };

  return (
    <section id="user-journeys" className="py-10 md:py-24 bg-background relative overflow-hidden border-t border-border">
      {/* Soft abstract lighting */}
      <div className="absolute top-[30%] left-[-10%] w-[300px] h-[300px] bg-primary/4 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] bg-primary/4 rounded-full blur-[90px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        
        {/* MOBILE EXPERIENCE (md:hidden) */}
        <div className="block md:hidden">
          {/* Header */}
          <div className="text-center max-w-lg mx-auto mb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full border border-primary/25 mb-3">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Interactive Console</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground font-sans leading-tight">
              Platform Pathways
            </h2>
            <p className="mt-2 text-muted-foreground text-xs font-semibold leading-relaxed">
              Explore your journey or see how our industry-leading verification engine secures your next move.
            </p>
          </div>

          {/* Segmented Control Switcher */}
          <div className="flex bg-muted p-1 rounded-full max-w-xs mx-auto mb-8 border border-border/40 shadow-xs">
            <button
              onClick={() => handleTabChange("journey")}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeTab === "journey" 
                  ? "bg-primary text-primary-foreground shadow-sm scale-102" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("journey.tab_journey").split(" ")[0]}
            </button>
            <button
              onClick={() => handleTabChange("verification")}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeTab === "verification" 
                  ? "bg-primary text-primary-foreground shadow-sm scale-102" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("journey.tab_verification").split(" ")[0]}
            </button>
          </div>

          {/* Conditional Content with Animations */}
          <div className="min-h-[350px]">
            <AnimatePresence mode="wait">
              {activeTab === "journey" ? (
                <motion.div
                  key="journey-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Sub-selector for Journey: Renter vs Landlord */}
                  <div className="flex bg-muted/50 p-1 rounded-xl max-w-[240px] mx-auto border border-border/20">
                    <button
                      onClick={() => handleJourneyChange("renter")}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                        activeJourney === "renter" 
                           ? "bg-background text-primary border border-border/40 shadow-xs" 
                          : "text-muted-foreground"
                      }`}
                    >
                      Looking for Home
                    </button>
                    <button
                      onClick={() => handleJourneyChange("landlord")}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                        activeJourney === "landlord" 
                          ? "bg-background text-primary border border-border/40 shadow-xs" 
                          : "text-muted-foreground"
                      }`}
                    >
                      List Property
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {activeJourney === "renter" ? (
                      <motion.div
                        key="renter-card"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-background border-[2px] border-primary rounded-3xl p-6 shadow-md shadow-primary/5 flex flex-col justify-between max-w-md mx-auto"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-5">
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-md">
                              <Home className="w-5 h-5" />
                            </div>
                            <span className="px-2.5 py-0.5 bg-primary/15 text-primary text-[9px] font-extrabold rounded-full uppercase tracking-wider">
                              Renter Hub
                            </span>
                          </div>

                          <h3 className="text-xl font-extrabold text-foreground mb-2 flex items-center">
                            <span className="mr-2">🏠</span>
                            <span>Looking for a Home</span>
                          </h3>
                          <p className="text-muted-foreground text-xs font-semibold leading-relaxed mb-6">
                            Skip agent commissions. Discover thousands of verified flats, PGs, and premium houses. Connect directly with deed-verified owners.
                          </p>

                          <ul className="space-y-3 mb-8">
                            {[
                              "Browse verified listings.",
                              "Connect directly with owners.",
                              "Book visits.",
                              "Move in confidently."
                            ].map((item, idx) => (
                              <li key={idx} className="flex items-center text-xs font-semibold text-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary mr-2.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <a
                          href="https://inhaby.com"
                          className="w-full py-3.5 bg-primary hover:opacity-95 text-primary-foreground font-extrabold text-xs text-center flex items-center justify-center space-x-2 rounded-xl shadow-md shadow-primary/10"
                        >
                          <span>Get Started</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="landlord-card"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-background border border-border rounded-3xl p-6 shadow-sm hover:border-primary/45 transition-all flex flex-col justify-between max-w-md mx-auto"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-5">
                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
                              <Building2 className="w-5 h-5" />
                            </div>
                            <span className="px-2.5 py-0.5 bg-primary/15 text-primary text-[9px] font-extrabold rounded-full uppercase tracking-wider">
                              Landlords
                            </span>
                          </div>

                          <h3 className="text-xl font-extrabold text-foreground mb-2 flex items-center">
                            <span className="mr-2">🏡</span>
                            <span>List Your Property</span>
                          </h3>
                          <p className="text-muted-foreground text-xs font-semibold leading-relaxed mb-6">
                            Publish listings to a massive pre-verified tenant base. Keep track of lead verifications, coordinate walkthroughs, and create legal digital leases.
                          </p>

                          <ul className="space-y-3 mb-8">
                            {[
                              "Create listings.",
                              "Manage enquiries.",
                              "Track verification.",
                              "Reach trusted tenants."
                            ].map((item, idx) => (
                              <li key={idx} className="flex items-center text-xs font-semibold text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary/70 mr-2.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <a
                          href="https://owner.inhaby.com"
                          className="w-full py-3.5 bg-background border border-primary/30 text-primary hover:text-primary-foreground hover:bg-primary font-extrabold text-xs text-center flex items-center justify-center space-x-2 rounded-xl transition-all"
                        >
                          <span>Go to Owner Portal</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="verification-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 max-w-md mx-auto"
                >
                  {/* Stepper Active Card */}
                  <div className="bg-background border border-primary/30 rounded-3xl p-6 shadow-sm relative flex flex-col justify-between min-h-[260px]">
                    <div>
                      {/* Badge & Icon block */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                          Step {activeStep + 1} of 6
                        </span>
                        <div className={`p-2 rounded-xl ${verificationSteps[activeStep].color} shrink-0`}>
                          {(() => {
                            const IconComp = verificationSteps[activeStep].icon;
                            return <IconComp className="w-5 h-5" />;
                          })()}
                        </div>
                      </div>

                      <h3 className="text-lg font-black text-foreground mb-2">
                        {verificationSteps[activeStep].title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                        {verificationSteps[activeStep].desc}
                      </p>
                    </div>

                    {/* Progress Bar inside Card */}
                    <div className="mt-6 space-y-1.5">
                      <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                        <span>Verification Progress</span>
                        <span>{Math.round(((activeStep + 1) / 6) * 100)}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300" 
                          style={{ width: `${((activeStep + 1) / 6) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Navigation & Progress Dots */}
                  <div className="flex justify-between items-center px-2">
                    <button
                      onClick={handlePrevStep}
                      className="w-10 h-10 bg-background border border-border hover:border-primary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all active:scale-95 shadow-xs"
                      aria-label="Previous step"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Stepper dots */}
                    <div className="flex space-x-1.5">
                      {verificationSteps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleStepSelect(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === activeStep ? "w-5 bg-primary" : "w-1.5 bg-border"
                          }`}
                          aria-label={`Go to step ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNextStep}
                      className="w-10 h-10 bg-background border border-border hover:border-primary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all active:scale-95 shadow-xs"
                      aria-label="Next step"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* DESKTOP EXPERIENCE (hidden md:grid / md:block) - EXACTLY AS BEFORE */}
        <div className="hidden md:block">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/25 mb-4">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Dual Gateways</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-sans leading-tight">
              How do you want to use INHABY?
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg font-medium">
              Select your specific path. We have custom-built systems designed for both sides of India's rental market.
            </p>
          </div>

          {/* Two Equal-Width Columns */}
          <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Journey 1: Looking for a Home */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-background border-[2px] border-primary rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(var(--primary),0.12)] shadow-primary/10 flex flex-col justify-between group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                    <Home className="w-7 h-7" />
                  </div>
                  <span className="px-3.5 py-1 bg-primary/15 text-primary text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                    Primary Pathway
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 tracking-tight flex items-center">
                  <span className="mr-2">🏠</span>
                  <span>{t("journey.title_renter")}</span>
                </h3>
                <p className="text-muted-foreground text-sm font-semibold leading-relaxed mb-8">
                  Skip the agent fees. Discover thousands of verified flats, PGs, and houses. Communicate directly with deed-verified owners.
                </p>

                <ul className="space-y-4 mb-10">
                  {[
                    "Browse verified listings.",
                    "Connect directly with owners.",
                    "Book visits.",
                    "Move in confidently."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm font-semibold text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://inhaby.com"
                className="w-full h-14 bg-primary hover:opacity-90 text-primary-foreground font-extrabold text-center flex items-center justify-center space-x-2 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </a>
            </motion.div>

            {/* Journey 2: Want to Rent Out Your Property */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative bg-background border border-primary/20 rounded-[2.5rem] p-8 md:p-12 shadow-md hover:border-primary transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <span className="px-3.5 py-1 bg-primary/15 text-primary text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                    Landlords
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 tracking-tight flex items-center">
                  <span className="mr-2">🏡</span>
                  <span>{t("journey.title_landlord")}</span>
                </h3>
                <p className="text-muted-foreground text-sm font-semibold leading-relaxed mb-8">
                  Publish listings to a massive pre-verified tenant base. Keep track of lead verifications, coordinate walkthroughs, and create legal digital leases.
                </p>

                <ul className="space-y-4 mb-10">
                  {[
                    "Create listings.",
                    "Manage enquiries.",
                    "Track verification.",
                    "Reach trusted tenants."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm font-semibold text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary/70 mr-3 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://owner.inhaby.com"
                className="w-full h-14 bg-background border border-primary/30 text-primary hover:text-primary-foreground hover:bg-primary font-extrabold text-center flex items-center justify-center space-x-2 rounded-2xl transition-all hover:-translate-y-0.5"
              >
                <span>Go to Owner Portal</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </a>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
