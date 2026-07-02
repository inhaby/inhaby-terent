import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, ShieldCheck, Tag, ArrowRight, X, Check, MessageSquare, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";

export default function TrustSection() {
  const [photoComparison, setPhotoComparison] = useState<"real" | "stock">("real");
  const [activeCard, setActiveCard] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const handleManualAction = () => {
    setLastInteraction(Date.now());
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastInteraction >= 6000) {
        setActiveCard((prev) => (prev + 1) % 4);
      }
    }, 4500); // Auto slide every 4.5s if inactive for 6s
    return () => clearInterval(timer);
  }, [lastInteraction]);

  const handleNextCard = () => {
    handleManualAction();
    setActiveCard((prev) => (prev + 1) % 4);
  };

  const handlePrevCard = () => {
    handleManualAction();
    setActiveCard((prev) => (prev - 1 + 4) % 4);
  };

  return (
    <section id="trust" className="py-10 md:py-24 bg-muted relative overflow-hidden">
      {/* Decorative atmospheric blobs */}
      <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-primary/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-primary-soft rounded-full border border-primary/15">
            Every Listing Hand-Checked
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold tracking-tight text-foreground font-sans leading-tight">
            Every home deserves honesty
          </h2>
          <p className="mt-3 text-sm md:text-lg text-muted-foreground leading-relaxed font-medium">
            We reject 40% of submitted properties so you only see the ones that are 100% genuine, honestly priced, and verified.
          </p>
        </div>

        {/* MOBILE CAROUSEL LAYOUT (md:hidden) */}
        <div className="block md:hidden max-w-md mx-auto">
          <div className="min-h-[460px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeCard === 0 && (
                <motion.div
                  key="card-real-photos"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full bg-background rounded-3xl border border-border p-6 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Camera className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground mb-2 tracking-tight">Real Photos</h3>
                    <p className="text-muted-foreground text-xs font-semibold leading-relaxed mb-6">
                      We ban misleading wide-angle lenses and stock filters. Every picture is captured in its natural aspect ratio. Use the toggle below to see the difference.
                    </p>
                  </div>

                  {/* Interactive Photo Comparison Widget */}
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 border border-border">
                      <AnimatePresence mode="wait">
                        {photoComparison === "real" ? (
                          <motion.div
                            key="real-mob"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0"
                          >
                            <OptimizedImage 
                              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80" 
                              alt="Inhaby Real Verified Listing" 
                              aspectRatio="aspect-full h-full w-full"
                              loading="lazy"
                            />
                            <div className="absolute top-2.5 left-2.5 bg-primary text-primary-foreground text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-sm">
                              <Check className="w-2.5 h-2.5" />
                              <span>Inhaby Verified View</span>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="stock-mob"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 filter blur-[1px] saturate-[1.6]"
                          >
                            <OptimizedImage 
                              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80" 
                              alt="Misleading Wide Angle" 
                              aspectRatio="aspect-full h-full w-full"
                              loading="lazy"
                            />
                            <div className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-sm">
                              <X className="w-2.5 h-2.5" />
                              <span>Distorted Agent View</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Toggle Buttons */}
                    <div className="flex bg-muted p-0.5 rounded-lg w-full border border-border/20">
                      <button
                        onClick={() => setPhotoComparison("real")}
                        className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all cursor-pointer ${photoComparison === "real" ? "bg-background text-primary shadow-xs" : "text-muted-foreground"}`}
                      >
                        Inhaby Verified
                      </button>
                      <button
                        onClick={() => setPhotoComparison("stock")}
                        className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all cursor-pointer ${photoComparison === "stock" ? "bg-background text-rose-500 shadow-xs" : "text-muted-foreground"}`}
                      >
                        Agent View
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeCard === 1 && (
                <motion.div
                  key="card-verified-owners"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full bg-background rounded-3xl border border-border p-6 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground mb-2 tracking-tight">Verified Owners</h3>
                    <p className="text-muted-foreground text-xs font-semibold leading-relaxed mb-6">
                      Meet owners, not agents. We check property deed documents and matching government-issued credentials for every listing before we grant them their owner pass.
                    </p>
                  </div>

                  {/* Verification Mockup Badge */}
                  <div className="p-4 bg-muted/60 rounded-2xl border border-border/80 space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center font-bold text-xs text-foreground">
                          AR
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-foreground">Ananya Roy</h4>
                          <p className="text-[9px] text-muted-foreground font-semibold">Verified Owner since 2024</p>
                        </div>
                      </div>
                      <div className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[8px] font-extrabold flex items-center space-x-1 border border-primary/20">
                        <span className="w-1 h-1 bg-primary rounded-full animate-ping" />
                        <span>DEED MATCHED</span>
                      </div>
                    </div>

                    {/* ID Check Progress Steps */}
                    <div className="space-y-2 pt-2 border-t border-border">
                      <div className="flex items-center justify-between text-[10px] font-semibold">
                        <span className="text-muted-foreground flex items-center"><Check className="w-3.5 h-3.5 text-primary mr-1" /> Identity Checked</span>
                        <span className="text-primary font-bold">100% Passed</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-semibold">
                        <span className="text-muted-foreground flex items-center"><Check className="w-3.5 h-3.5 text-primary mr-1" /> Title Deed Docs</span>
                        <span className="text-primary font-bold">Matched</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-semibold">
                        <span className="text-muted-foreground flex items-center"><Check className="w-3.5 h-3.5 text-primary mr-1" /> Direct Owner Connection</span>
                        <span className="text-primary font-bold">No Agent</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeCard === 2 && (
                <motion.div
                  key="card-transparent-pricing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full bg-background rounded-3xl border border-border p-6 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Tag className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground mb-2 tracking-tight">Transparent Pricing</h3>
                    <p className="text-muted-foreground text-xs font-semibold leading-relaxed mb-6">
                      No hidden lease drafting charges or sudden society maintenance spikes. Rent and security deposits are locked in writing with zero hidden fees.
                    </p>
                  </div>

                  {/* Price Breakdown Interactive Receipt */}
                  <div className="grid grid-cols-1 gap-3">
                    {/* Inhaby receipt */}
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 relative">
                      <div className="text-[8px] font-extrabold text-primary uppercase tracking-widest mb-2">INHABY BILL</div>
                      <div className="space-y-1.5 text-[10px]">
                        <div className="flex justify-between font-semibold">
                          <span className="text-muted-foreground">Monthly Rent + Maintenance</span>
                          <span className="text-foreground">₹20,000</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-primary">Brokerage</span>
                          <span className="text-primary font-bold">₹0 Free</span>
                        </div>
                        <div className="flex justify-between font-bold border-t border-primary/20 pt-1.5 text-xs text-foreground">
                          <span>True Total</span>
                          <span>₹20,000</span>
                        </div>
                      </div>
                    </div>

                    {/* Other agents receipt */}
                    <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20 relative">
                      <div className="text-[8px] font-extrabold text-rose-500 uppercase tracking-widest mb-2">TYPICAL PORTAL</div>
                      <div className="space-y-1.5 text-[10px]">
                        <div className="flex justify-between font-semibold">
                          <span className="text-muted-foreground">Monthly Rent + Maintenance</span>
                          <span className="text-foreground">₹20,000</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-rose-500 flex items-center">Brokerage <AlertCircle className="w-3.5 h-3.5 ml-0.5" /></span>
                          <span className="text-rose-500 font-bold">₹18,000</span>
                        </div>
                        <div className="flex justify-between font-bold border-t border-rose-500/20 pt-1.5 text-xs text-foreground">
                          <span>First Month Cost</span>
                          <span>₹41,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeCard === 3 && (
                <motion.div
                  key="card-direct-connections"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full bg-background rounded-3xl border border-border p-6 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground mb-2 tracking-tight">Direct Connections</h3>
                    <p className="text-muted-foreground text-xs font-semibold leading-relaxed mb-6">
                      Chat directly with verified owners, arrange digital visits, or request customized terms. Save massive commissions and bypass third-party agents.
                    </p>
                  </div>

                  {/* Direct Owner Messenger Mockup */}
                  <div className="p-4 bg-muted/60 rounded-2xl border border-border space-y-3">
                    {/* Message 1 */}
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                        AR
                      </div>
                      <div className="bg-background border border-border p-2.5 rounded-xl rounded-tl-none shadow-xs text-[11px] max-w-[85%]">
                        <div className="font-extrabold text-foreground text-[9px] mb-0.5">Amit (Renter)</div>
                        <p className="text-muted-foreground font-medium">Hello, can I visit the flat today?</p>
                      </div>
                    </div>

                    {/* Message 2 */}
                    <div className="flex items-start space-x-2 justify-end">
                      <div className="bg-primary text-primary-foreground p-2.5 rounded-xl rounded-tr-none shadow-xs text-[11px] max-w-[85%] text-right">
                        <div className="font-extrabold text-primary-foreground text-[9px] mb-0.5">Mr. Sharma (Owner)</div>
                        <p className="text-primary-foreground/90 font-medium">Yes Amit! Come directly at 5 PM. No brokers.</p>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-primary/85 text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                        S
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation and Indicators for mobile */}
          <div className="flex justify-between items-center mt-5 px-1">
            <button
              onClick={handlePrevCard}
              className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary active:scale-95 shadow-xs"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slider dots indicator */}
            <div className="flex space-x-2">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveCard(idx);
                    handleManualAction();
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeCard ? "w-5 bg-primary" : "w-1.5 bg-border"}`}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextCard}
              className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary active:scale-95 shadow-xs"
              aria-label="Next card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DESKTOP BENTO-STYLE FEATURE CARDS LAYOUT (hidden md:grid) */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* CARD 1: Real Photos (Fake vs Verified interactive comparison) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group bg-background rounded-[2.5rem] border border-border overflow-hidden flex flex-col justify-between p-8 md:p-10 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight">Real Photos</h3>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 max-w-md">
                We ban misleading wide-angle lenses and stock filters. Every picture is captured in its natural aspect ratio. Use the toggle below to see the difference.
              </p>
            </div>

            {/* Interactive Photo Comparison Widget */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 border border-border">
                <AnimatePresence mode="wait">
                  {photoComparison === "real" ? (
                    <motion.div
                      key="real"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <OptimizedImage 
                        src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80" 
                        alt="Inhaby Real Verified Listing" 
                        aspectRatio="aspect-full h-full w-full"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-md">
                        <Check className="w-3 h-3" />
                        <span>Inhaby Verified: Actual Room</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="stock"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 filter blur-[1px] saturate-[1.6]"
                    >
                      <OptimizedImage 
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80" 
                        alt="Misleading Wide Angle" 
                        aspectRatio="aspect-full h-full w-full"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-md">
                        <X className="w-3 h-3" />
                        <span>Wide-Angle / CGI Render</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Toggle Buttons */}
              <div className="flex bg-muted p-1 rounded-xl w-full">
                <button
                  onClick={() => setPhotoComparison("real")}
                  className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${photoComparison === "real" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Inhaby Verified View
                </button>
                <button
                  onClick={() => setPhotoComparison("stock")}
                  className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${photoComparison === "stock" ? "bg-background text-rose-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Distorted Agent View
                </button>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: Verified Owners (ID verification mockup) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group bg-background rounded-[2.5rem] border border-border overflow-hidden flex flex-col justify-between p-8 md:p-10 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight">Verified Owners</h3>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 max-w-md">
                Meet owners, not agents. We check property deed documents and matching government-issued credentials for every listing before we grant them their owner pass.
              </p>
            </div>

            {/* Verification Mockup Badge */}
            <div className="p-6 bg-muted/60 rounded-3xl border border-border/80 space-y-4 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center font-bold text-foreground">
                    AR
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Ananya Roy</h4>
                    <p className="text-[10px] text-muted-foreground font-semibold">Verified Owner since 2024</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-extrabold flex items-center space-x-1 border border-primary/20">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                  <span>DEED MATCHED</span>
                </div>
              </div>

              {/* ID Check Progress Steps */}
              <div className="space-y-2.5 pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground flex items-center"><Check className="w-4 h-4 text-primary mr-1.5" /> Identity Checked (Aadhaar / Passport)</span>
                  <span className="text-primary font-bold">100% Passed</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground flex items-center"><Check className="w-4 h-4 text-primary mr-1.5" /> Property Registration Document</span>
                  <span className="text-primary font-bold">Matched</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground flex items-center"><Check className="w-4 h-4 text-primary mr-1.5" /> Direct Owner Connection Check</span>
                  <span className="text-primary font-bold">No Agent Link</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 3: Transparent Pricing (Itemized Receipt Comparison) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group bg-background rounded-[2.5rem] border border-border overflow-hidden flex flex-col justify-between p-8 md:p-10 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight">Transparent Pricing</h3>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 max-w-md">
                No hidden lease drafting charges or sudden society maintenance spikes. Rent and security deposits are locked in writing with zero hidden fees.
              </p>
            </div>

            {/* Price Breakdown Interactive Receipt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Inhaby receipt */}
              <div className="p-5 bg-primary/5 rounded-2xl border border-primary/20 relative">
                <div className="text-[10px] font-extrabold text-primary uppercase tracking-widest mb-3">INHABY BILL</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="text-foreground">₹18,000</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground">Maintenance</span>
                    <span className="text-foreground">₹2,000</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-primary">Brokerage</span>
                    <span className="text-primary font-bold">₹0 Free</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground">Lease Creation</span>
                    <span className="text-primary font-bold">Free</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-primary/20 pt-2 text-sm text-foreground">
                    <span>True Total</span>
                    <span>₹20,000</span>
                  </div>
                </div>
              </div>

              {/* Other agents receipt */}
              <div className="p-5 bg-rose-500/5 rounded-2xl border border-rose-500/20 relative">
                <div className="text-[10px] font-extrabold text-rose-500 uppercase tracking-widest mb-3">TYPICAL PORTAL</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="text-foreground">₹18,000</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground">Maintenance</span>
                    <span className="text-foreground">₹2,000</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-rose-500 flex items-center">Brokerage <AlertCircle className="w-3 h-3 ml-1" /></span>
                    <span className="text-rose-500 font-bold">₹18,000</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-rose-500">Stamp Charge</span>
                    <span className="text-rose-500 font-bold">₹3,000</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-rose-500/20 pt-2 text-sm text-foreground">
                    <span>First Month</span>
                    <span>₹41,000</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* CARD 4: No Brokerage (Direct Owner Chat Mockup) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group bg-background rounded-[2.5rem] border border-border overflow-hidden flex flex-col justify-between p-8 md:p-10 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight">Direct Connections</h3>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 max-w-md">
                Chat directly with verified owners, arrange digital visits, or request customized terms. Save massive commissions and bypass third-party agents.
              </p>
            </div>

            {/* Direct Owner Messenger Mockup */}
            <div className="p-5 bg-muted/60 rounded-3xl border border-border space-y-3.5">
              
              {/* Message 1 */}
              <div className="flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                  AR
                </div>
                <div className="bg-background border border-border p-3 rounded-2xl rounded-tl-none shadow-xs text-xs max-w-[80%]">
                  <div className="font-extrabold text-foreground text-[10px] mb-0.5">Amit (Renter)</div>
                  <p className="text-muted-foreground font-medium">Hello sir, is the 2BHK flat available for physical visits today?</p>
                </div>
              </div>

              {/* Message 2 */}
              <div className="flex items-start space-x-2.5 justify-end">
                <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none shadow-xs text-xs max-w-[80%] text-right">
                  <div className="font-extrabold text-primary-foreground text-[10px] mb-0.5">Mr. Sharma (Owner)</div>
                  <p className="text-primary-foreground/90 font-medium">Yes Amit! I'm free between 4:00 PM and 7:00 PM. No brokers, you can visit directly.</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-primary/80 text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                  S
                </div>
              </div>

              {/* Input field mock */}
              <div className="h-9 bg-background rounded-xl border border-border flex items-center px-3 justify-between text-[11px] text-muted-foreground font-medium">
                <span>Type a message...</span>
                <span className="text-primary font-bold">Send</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
