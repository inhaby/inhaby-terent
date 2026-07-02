import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, MapPin, Shield, Calendar, Clock, MessageSquare, 
  Send, Check, Bell, RefreshCw, ChevronLeft, ChevronRight, Sparkles 
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Previews definitions
const previews = [
  { id: "explore", title: "Explore", themeColor: "blue", purpose: "Property discovery" },
  { id: "connect", title: "Connect", themeColor: "green", purpose: "Direct communication with owners" },
  { id: "book", title: "Book", themeColor: "orange", purpose: "Visit scheduling" },
  { id: "verify", title: "Verify", themeColor: "purple", purpose: "Trust system" },
  { id: "move-in", title: "Move In", themeColor: "gold", purpose: "Rental completion" },
  { id: "manage", title: "Manage", themeColor: "slate", purpose: "Dashboard" }
];

// Inner Screen 1: Explore
const ExplorePreview = ({ isActive }: { isActive: boolean }) => {
  const [searchTermIndex, setSearchTermIndex] = useState(0);
  const searchTerms = ["Indiranagar", "2 BHK Flat", "PG in Koramangala", "Studio Apartment"];
  const [typedText, setTypedText] = useState("");
  const [showVerified, setShowVerified] = useState(false);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setTypedText("");
      setShowVerified(false);
      setSlideUp(false);
      return;
    }

    let currentTerm = searchTerms[searchTermIndex];
    let charIndex = 0;
    setTypedText("");
    setSlideUp(false);
    setShowVerified(false);
    
    const typingInterval = setInterval(() => {
      if (charIndex < currentTerm.length) {
        setTypedText((prev) => prev + currentTerm[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Staggered trigger of elements
        setTimeout(() => {
          setSlideUp(true);
        }, 200);

        setTimeout(() => {
          setShowVerified(true);
        }, 600);

        // Transition to next query cycle
        setTimeout(() => {
          setSearchTermIndex((prev) => (prev + 1) % searchTerms.length);
        }, 2400);
      }
    }, 70);

    return () => clearInterval(typingInterval);
  }, [isActive, searchTermIndex]);

  return (
    <div className="flex-1 flex flex-col space-y-2 h-full justify-between">
      <div className="space-y-2">
        {/* Title */}
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[10px] font-black uppercase text-blue-500 tracking-wider">Discover Homes</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        </div>

        {/* Search Input Bar */}
        <div className="h-8 px-2 bg-muted/60 rounded-xl border border-border/40 flex items-center space-x-2 shadow-2xs">
          <Search className="w-3 h-3 text-blue-500 shrink-0" />
          <span className="text-[10px] font-semibold text-foreground/80 overflow-hidden text-ellipsis whitespace-nowrap">
            {typedText}
            <span className="inline-block w-[1px] h-2.5 bg-blue-500 animate-pulse ml-0.5" />
          </span>
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-1 overflow-x-auto no-scrollbar py-0.5">
          {["Bangalore", "2 BHK", "No Brokerage", "Furnished"].map((chip, idx) => (
            <span
              key={chip}
              className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border transition-all shrink-0 ${
                idx === 0 
                  ? "bg-blue-500/10 text-blue-500 border-blue-500/20" 
                  : "bg-muted/40 text-muted-foreground border-border/40"
              }`}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Property Listing Card */}
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          animate={slideUp ? { y: 0, opacity: 1, scale: 1 } : { y: 15, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="bg-muted/40 border border-border/30 rounded-xl p-1.5 shadow-2xs overflow-hidden"
        >
          {/* Room Image with overlay badges */}
          <div className="relative aspect-[16/10] bg-muted/60 rounded-lg overflow-hidden mb-1.5">
            <img 
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400" 
              alt="Room" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Verified Badge */}
            {showVerified && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-1 left-1 bg-blue-600 text-white font-extrabold text-[7px] px-1 py-0.5 rounded-xs flex items-center space-x-0.5 shadow-xs"
              >
                <Shield className="w-2 h-2 fill-white shrink-0" />
                <span>DEED VERIFIED</span>
              </motion.div>
            )}
            
            <span className="absolute bottom-1 right-1 bg-slate-900/85 backdrop-blur-3xs text-white font-black text-[8px] px-1 py-0.5 rounded-xs">
              ₹24,000/mo
            </span>
          </div>

          <div className="px-0.5 space-y-0.5 text-left">
            <h4 className="text-[10px] font-extrabold text-foreground leading-tight truncate">Sundance Villa, 2 BHK</h4>
            <div className="flex items-center text-muted-foreground text-[8px]">
              <MapPin className="w-2.5 h-2.5 text-blue-500 mr-0.5" />
              <span className="truncate">Indiranagar, Bangalore</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mini Bottom Nav Bar */}
      <div className="h-7 border-t border-border/30 flex justify-around items-center pt-1 text-[8px] font-bold text-muted-foreground">
        <div className="flex flex-col items-center text-blue-500">
          <Search className="w-3 h-3" />
          <span>Explore</span>
        </div>
        <div className="flex flex-col items-center opacity-60">
          <MessageSquare className="w-3 h-3" />
          <span>Chats</span>
        </div>
        <div className="flex flex-col items-center opacity-60">
          <Calendar className="w-3 h-3" />
          <span>Visits</span>
        </div>
      </div>
    </div>
  );
};

// Inner Screen 2: Connect
const ConnectPreview = ({ isActive }: { isActive: boolean }) => {
  const [chatStep, setChatStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setChatStep(0);
      return;
    }

    const timer1 = setTimeout(() => setChatStep(1), 1100); 
    const timer2 = setTimeout(() => setChatStep(2), 2400); 
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isActive]);

  return (
    <div className="flex-1 flex flex-col space-y-2 h-full justify-between">
      {/* Contact Profile Header */}
      <div className="flex items-center justify-between pb-1 border-b border-border/40">
        <div className="flex items-center space-x-1.5">
          <div className="relative">
            <div className="w-7 h-7 bg-green-500/10 text-green-600 border border-green-500/20 rounded-full flex items-center justify-center font-bold text-[10px]">
              RD
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-background rounded-full animate-pulse" />
          </div>
          <div className="text-left">
            <div className="flex items-center space-x-1 leading-none">
              <span className="text-[10px] font-bold text-foreground">Rohan Das</span>
              <span className="bg-green-500/15 text-green-500 text-[6px] font-black px-0.5 rounded-xs">OWNER</span>
            </div>
            <span className="text-[7px] text-muted-foreground font-semibold">Online (Verified Owner)</span>
          </div>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 flex flex-col justify-end space-y-1.5 py-1">
        {/* Msg 1: Tenant */}
        <div className="self-end max-w-[85%] bg-primary text-primary-foreground rounded-xl rounded-tr-xs p-1.5 text-[9px] font-semibold leading-relaxed shadow-3xs text-left">
          Hi Rohan! Is your Indiranagar 2 BHK available for a visit tomorrow afternoon?
        </div>

        {/* Msg 2: Typing / Reply */}
        {chatStep === 1 && (
          <div className="self-start bg-muted/60 border border-border/40 rounded-xl rounded-tl-xs px-2 py-1.5 flex items-center space-x-0.5">
            <span className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        {chatStep === 2 && (
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="self-start max-w-[85%] bg-muted/60 border border-border/40 rounded-xl rounded-tl-xs p-1.5 text-[9px] font-medium leading-relaxed text-foreground shadow-3xs text-left"
          >
            Hi Vikram! Yes, it's absolutely available. I am the direct owner here. What time works for you?
          </motion.div>
        )}
      </div>

      {/* Mock Text Field */}
      <div className="h-7 bg-muted/30 border border-border/40 rounded-lg px-2 flex items-center justify-between text-muted-foreground">
        <span className="text-[8px] font-semibold">Message Rohan...</span>
        <Send className="w-3 h-3 text-green-500 cursor-pointer hover:scale-105 transition-transform" />
      </div>
    </div>
  );
};

// Inner Screen 3: Book
const BookPreview = ({ isActive }: { isActive: boolean }) => {
  const [bookStep, setBookStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setBookStep(0);
      return;
    }

    const timer1 = setTimeout(() => setBookStep(1), 1000); 
    const timer2 = setTimeout(() => setBookStep(2), 2000); 
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isActive]);

  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const dates = [14, 15, 16, 17, 18, 19, 20];

  return (
    <div className="flex-1 flex flex-col space-y-2 h-full justify-between">
      <div className="space-y-1.5">
        {/* Title */}
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[10px] font-black uppercase text-orange-500 tracking-wider">Book Viewing</span>
          <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-500 text-[7px] font-extrabold rounded-xs uppercase">INSTANT</span>
        </div>

        {/* Calendar Strip */}
        <div className="bg-muted/40 border border-border/30 rounded-xl p-1.5 text-center">
          <div className="text-[8px] font-bold text-foreground mb-1">June 2026</div>
          <div className="grid grid-cols-7 gap-0.5">
            {days.map((day, idx) => (
              <div key={`${day}-${idx}`} className="text-[7px] font-extrabold text-muted-foreground">{day}</div>
            ))}
            {dates.map((date, idx) => (
              <div
                key={date}
                className={`text-[8px] font-extrabold h-5 w-5 mx-auto flex items-center justify-center rounded-md transition-all ${
                  idx === 4 
                    ? "bg-orange-500 text-white shadow-xs scale-105" 
                    : "text-foreground hover:bg-muted/50"
                }`}
              >
                {date}
              </div>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-0.5">
          <span className="text-[7px] font-bold text-muted-foreground uppercase tracking-wider text-left block">Available Slots</span>
          <div className="grid grid-cols-3 gap-1">
            {["11:00 AM", "02:30 PM", "06:00 PM"].map((slot, idx) => {
              const isHighlighted = idx === 1 && bookStep >= 1;
              return (
                <div
                  key={slot}
                  className={`text-[7px] font-bold py-1 px-0.5 rounded-md text-center border transition-all ${
                    isHighlighted
                      ? "bg-orange-500/10 text-orange-500 border-orange-500/30 scale-102 ring-1 ring-orange-500/20"
                      : "bg-muted/20 text-muted-foreground border-border/30"
                  }`}
                >
                  {slot}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Button / Confirmation overlay */}
      <div className="flex-1 flex flex-col justify-end">
        {bookStep < 2 ? (
          <button className="w-full py-2 bg-orange-500 hover:opacity-95 text-white text-[9px] font-black rounded-lg shadow-sm flex items-center justify-center space-x-1">
            <Clock className="w-2.5 h-2.5" />
            <span>Confirm Booking</span>
          </button>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-emerald-500 text-white rounded-xl p-2 text-center flex flex-col items-center space-y-1 shadow-md shadow-emerald-500/10"
          >
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white font-black" />
            </div>
            <span className="text-[9px] font-black tracking-tight">VISIT BOOKED!</span>
            <span className="text-[7px] opacity-90 leading-none">Tomorrow at 02:30 PM</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Inner Screen 4: Verify
const VerifyPreview = ({ isActive }: { isActive: boolean }) => {
  const [vStep, setVStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setVStep(0);
      return;
    }

    const timer1 = setTimeout(() => setVStep(1), 600);
    const timer2 = setTimeout(() => setVStep(2), 1200);
    const timer3 = setTimeout(() => setVStep(3), 1800);
    const timer4 = setTimeout(() => setVStep(4), 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isActive]);

  const checklist = [
    { title: "Owner Aadhaar / KYC", desc: "Identity Check" },
    { title: "Registry Deeds Match", desc: "Title Match" },
    { title: "In-Person Verification", desc: "Photos Verified" },
    { title: "Legal Price Check", desc: "Zero Brokerage" },
  ];

  return (
    <div className="flex-1 flex flex-col space-y-1.5 h-full justify-between">
      {/* Header */}
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[10px] font-black uppercase text-purple-500 tracking-wider">Vetting Gate</span>
        <span className="bg-purple-500/15 text-purple-500 text-[7px] font-bold px-1 rounded-xs">100% SECURE</span>
      </div>

      {/* Trust Rating Dial */}
      <div className="bg-muted/40 border border-border/30 rounded-xl p-1.5 flex items-center space-x-2 shrink-0">
        <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="18" cy="18" r="15" fill="transparent" stroke="currentColor" className="text-muted/40" strokeWidth="2.5" />
            <motion.circle
              cx="18"
              cy="18"
              r="15"
              fill="transparent"
              stroke="#A855F7"
              strokeWidth="3"
              strokeDasharray="94.2"
              animate={isActive ? { strokeDashoffset: 94.2 - (94.2 * (vStep * 25)) / 100 } : { strokeDashoffset: 94.2 }}
              transition={{ duration: 0.4 }}
            />
          </svg>
          <div className="absolute text-[8px] font-black text-purple-500">
            {vStep * 25}%
          </div>
        </div>
        <div className="text-left">
          <span className="text-[9px] font-extrabold text-foreground leading-none block">System Integrity</span>
          <span className="text-[7px] text-muted-foreground leading-tight font-semibold block">Registry match & live photo vetting.</span>
        </div>
      </div>

      {/* Checklist items */}
      <div className="flex-1 flex flex-col justify-center space-y-1 py-1">
        {checklist.map((item, idx) => {
          const isPassed = vStep > idx;
          return (
            <div
              key={item.title}
              className={`flex items-center justify-between p-1 rounded-md border transition-all ${
                isPassed 
                  ? "bg-purple-500/5 border-purple-500/20" 
                  : "bg-muted/10 border-border/20 opacity-50"
              }`}
            >
              <div className="flex items-center space-x-1.5 text-left">
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all shrink-0 ${
                  isPassed ? "bg-purple-500 text-white" : "bg-muted text-transparent"
                }`}>
                  <Check className="w-2 h-2 stroke-[3]" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-[8px] font-bold leading-tight ${isPassed ? "text-foreground" : "text-muted-foreground"}`}>{item.title}</span>
                  <span className="text-[6px] text-muted-foreground leading-none">{item.desc}</span>
                </div>
              </div>
              {isPassed && (
                <span className="text-[6px] font-extrabold text-purple-500 bg-purple-500/10 px-1 rounded-xs">DONE</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Inner Screen 5: Move In
const MoveInPreview = ({ isActive }: { isActive: boolean }) => {
  const [signed, setSigned] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setSigned(false);
      setCompleted(false);
      return;
    }

    const timer1 = setTimeout(() => setSigned(true), 1100); 
    const timer2 = setTimeout(() => setCompleted(true), 2400); 
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isActive]);

  return (
    <div className="flex-1 flex flex-col space-y-2 h-full justify-between">
      {/* Title */}
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider">Rent / Lease</span>
        <span className="text-[7px] font-black text-amber-500 bg-amber-500/15 px-1 rounded-xs">ZERO COMMISSION</span>
      </div>

      {/* Contract paper UI */}
      <div className="bg-muted/40 border border-border/30 rounded-xl p-1.5 relative overflow-hidden flex-1 flex flex-col justify-between">
        <div className="space-y-1 text-left">
          <div className="flex justify-between text-[7px] font-bold text-muted-foreground border-b border-border/30 pb-0.5 mb-0.5">
            <span>MUTUAL LEASE</span>
            <span>MTA COMPLIANT</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[7px] font-extrabold text-foreground leading-none block">Agreement details:</span>
            <span className="text-[6px] text-muted-foreground font-semibold leading-tight block">Lessor: Rohan Das</span>
            <span className="text-[6px] text-muted-foreground font-semibold leading-tight block">Lessee: Vikram Dev</span>
          </div>
        </div>

        {/* Custom Signature Path */}
        <div className="mt-1.5 p-1 bg-muted/40 border border-dashed border-border/40 rounded-lg text-center relative h-8 flex items-center justify-center">
          {!signed ? (
            <span className="text-[7px] text-muted-foreground animate-pulse font-bold">Signing lease...</span>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <svg className="absolute w-20 h-4 text-amber-600 stroke-current fill-none">
                <motion.path
                  d="M10,10 C18,5 25,18 35,8 C45,2 55,14 70,6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </svg>
              <span className="absolute bottom-0 right-1 text-[5px] text-muted-foreground font-black">Vikram Dev</span>
            </div>
          )}
        </div>
      </div>

      {/* Golden check block */}
      {completed && (
        <motion.div
          initial={{ scale: 0.9, y: 8, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          className="bg-amber-500 text-white p-1.5 rounded-lg text-center flex items-center justify-center space-x-1 shadow-sm shadow-amber-500/10 shrink-0"
        >
          <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-white" />
          </div>
          <div className="text-left leading-none">
            <span className="text-[8px] font-black block">PAYMENT SETTLED</span>
            <span className="text-[6px] opacity-90 block">Deposit & rent locked securely</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Inner Screen 6: Manage
const ManagePreview = ({ isActive }: { isActive: boolean }) => {
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setNotify(false);
      return;
    }

    const timer = setTimeout(() => setNotify(true), 1400);
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div className="flex-1 flex flex-col space-y-2 h-full justify-between">
      {/* Title */}
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Tenant Desk</span>
        <div className="relative">
          <Bell className={`w-3.5 h-3.5 text-slate-500 ${notify ? "animate-bounce" : ""}`} />
          {notify && (
            <span className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-red-500 rounded-full" />
          )}
        </div>
      </div>

      {/* Active Lease Widget */}
      <div className="bg-slate-500/10 border border-slate-500/20 rounded-xl p-2 text-left shrink-0">
        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Contract State</span>
        <div className="flex items-center justify-between mt-1 leading-none">
          <span className="text-[10px] font-black text-foreground">Active (Month 1/11)</span>
          <span className="bg-emerald-500/10 text-emerald-500 font-extrabold text-[6px] px-1 rounded-xs">COMPLIANT</span>
        </div>
      </div>

      {/* Grid numbers */}
      <div className="grid grid-cols-2 gap-1 shrink-0">
        <div className="bg-muted/40 border border-border/30 rounded-lg p-1 text-left">
          <span className="text-[6px] font-bold text-muted-foreground block leading-none">Next Due</span>
          <span className="text-[8px] font-black text-foreground block mt-1 leading-none">July 1, 2026</span>
        </div>
        <div className="bg-muted/40 border border-border/30 rounded-lg p-1 text-left">
          <span className="text-[6px] font-bold text-muted-foreground block leading-none">Rent Amount</span>
          <span className="text-[8px] font-black text-foreground block mt-1 leading-none">₹24,000</span>
        </div>
      </div>

      {/* Quick Action Widget / Maintenance Logged */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="bg-muted/40 border border-border/30 rounded-xl p-1.5 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-left truncate">
            <div className="w-5 h-5 bg-slate-500/10 text-slate-600 rounded-md flex items-center justify-center shrink-0">
              <RefreshCw className="w-3 h-3" />
            </div>
            <div className="truncate">
              <span className="text-[8px] font-extrabold text-foreground block leading-none">Repair Ticket</span>
              <span className="text-[6px] text-muted-foreground font-semibold leading-none truncate block">Sink Leak Logged</span>
            </div>
          </div>
          <span className="text-[6px] font-extrabold text-amber-500 bg-amber-500/10 px-1 rounded-xs shrink-0">ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

// Main Phone Shell
interface PhoneShellProps {
  children: React.ReactNode;
  isActive: boolean;
  themeColor: string;
  theme: "light" | "dark";
}

const PhoneShell = ({ children, isActive, themeColor, theme }: PhoneShellProps) => {
  const isDark = theme === "dark";

  // Accent highlights & glow mapping for active card
  const colorGlows = {
    blue: "shadow-[0_0_25px_rgba(59,130,246,0.18)] border-blue-500/30 ring-1 ring-blue-500/20",
    green: "shadow-[0_0_25px_rgba(34,197,94,0.18)] border-green-500/30 ring-1 ring-green-500/20",
    orange: "shadow-[0_0_25px_rgba(249,115,22,0.18)] border-orange-500/30 ring-1 ring-orange-500/20",
    purple: "shadow-[0_0_25px_rgba(168,85,247,0.18)] border-purple-500/30 ring-1 ring-purple-500/20",
    gold: "shadow-[0_0_25px_rgba(234,179,8,0.18)] border-amber-500/30 ring-1 ring-amber-500/20",
    slate: "shadow-[0_0_25px_rgba(148,163,184,0.18)] border-slate-500/30 ring-1 ring-slate-500/20"
  };

  return (
    <div
      className={`relative aspect-[9/18.5] rounded-[2.2rem] p-2 transition-all duration-500 border-[3.5px] ${
        isDark 
          ? "bg-[#161619] border-[#29292e] text-slate-100" 
          : "bg-white border-neutral-200 text-slate-900 shadow-md"
      } ${
        isActive 
          ? `${colorGlows[themeColor as keyof typeof colorGlows]} scale-[1.03] z-20` 
          : "opacity-45 scale-[0.96] z-10"
      }`}
    >
      {/* Notch / Dynamic Island */}
      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-30 flex items-center justify-between px-2">
        <div className="w-1 h-1 bg-neutral-800 rounded-full" />
        <div className="w-6 h-0.5 bg-neutral-950 rounded-full" />
      </div>

      {/* Inner Screen */}
      <div className={`w-full h-full rounded-[1.8rem] overflow-hidden relative ${isDark ? "bg-[#0b0b0d]" : "bg-neutral-50"} flex flex-col pt-6`}>
        {/* Status Bar */}
        <div className="absolute top-1 left-0 right-0 h-5 px-3 flex justify-between items-center text-[8px] font-bold z-20 opacity-60">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            {/* simple custom wifi / battery bars */}
            <div className="flex space-x-0.5 items-end">
              <span className="w-[1.5px] h-1.5 bg-current rounded-3xs" />
              <span className="w-[1.5px] h-2 bg-current rounded-3xs" />
              <span className="w-[1.5px] h-2.5 bg-current rounded-3xs" />
            </div>
            <div className="w-3.5 h-2 border border-current rounded-xs p-0.5 flex items-center justify-start">
              <span className="w-1.5 h-1 bg-current rounded-4xs" />
            </div>
          </div>
        </div>

        {/* Screen Area */}
        <div className="flex-1 flex flex-col p-2.5 relative overflow-hidden select-none">
          {children}
        </div>

        {/* Bottom Home Line */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-current opacity-20 rounded-full z-20" />
      </div>
    </div>
  );
};

export default function AppPreview() {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const trackRef = useRef<HTMLDivElement>(null);

  // Auto-cycle through previews every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      // Check if 6 seconds of manual inactivity have passed
      if (Date.now() - lastInteraction >= 6000) {
        setActiveIndex((prev) => (prev + 1) % previews.length);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [lastInteraction]);

  // Handle auto-scroll inside the carousel track to center selected card
  useEffect(() => {
    if (trackRef.current) {
      const activeCard = trackRef.current.children[activeIndex] as HTMLElement;
      if (activeCard) {
        const containerWidth = trackRef.current.offsetWidth;
        const cardWidth = activeCard.offsetWidth;
        const cardLeft = activeCard.offsetLeft;
        
        trackRef.current.scrollTo({
          left: cardLeft - containerWidth / 2 + cardWidth / 2,
          behavior: "smooth"
        });
      }
    }
  }, [activeIndex]);

  const handleManualAction = (index: number) => {
    setActiveIndex(index);
    setLastInteraction(Date.now());
  };

  const handlePrev = () => {
    const nextIndex = (activeIndex - 1 + previews.length) % previews.length;
    handleManualAction(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % previews.length;
    handleManualAction(nextIndex);
  };

  return (
    <section id="platform-pathways" className="py-12 md:py-24 overflow-hidden border-t border-border bg-muted/20 relative">
      {/* Decorative Aurora Glow Backdrop */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto mb-8 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl text-left"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full border border-primary/25 mb-3">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Real App Previews</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl lg:text-4xl text-foreground mb-3 font-sans">
              Platform Pathways
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm font-semibold leading-relaxed">
              Explore six premium capabilities of the INHABY ecosystem. Click or scroll to play interactive mini-applications simulating the complete user experience.
            </p>
          </motion.div>

          {/* Quick Segment Selector Tabs (Desktop / Tablet) */}
          <div className="hidden sm:flex bg-muted p-1 rounded-xl border border-border/30 shadow-3xs max-w-lg">
            {previews.map((preview, index) => (
              <button
                key={preview.id}
                onClick={() => handleManualAction(index)}
                className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                  activeIndex === index 
                    ? "bg-primary text-primary-foreground shadow-xs" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {preview.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Track Area */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 z-30 hidden md:block">
          <button
            onClick={handlePrev}
            className="w-9 h-9 bg-background/80 backdrop-blur-xs border border-border hover:border-primary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-2 z-30 hidden md:block">
          <button
            onClick={handleNext}
            className="w-9 h-9 bg-background/80 backdrop-blur-xs border border-border hover:border-primary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Scroll Track container */}
        <div 
          ref={trackRef}
          className="flex overflow-x-auto pb-6 pt-2 px-6 md:px-12 space-x-5 md:space-x-7 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {previews.map((preview, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={preview.id}
                onClick={() => handleManualAction(index)}
                className="flex-shrink-0 w-[230px] md:w-[250px] snap-center cursor-pointer transition-transform duration-300"
              >
                {/* Phone Frame wrapper */}
                <PhoneShell 
                  isActive={isActive} 
                  themeColor={preview.themeColor} 
                  theme={theme}
                >
                  {/* Dynamic Render according to page/screen */}
                  {preview.id === "explore" && <ExplorePreview isActive={isActive} />}
                  {preview.id === "connect" && <ConnectPreview isActive={isActive} />}
                  {preview.id === "book" && <BookPreview isActive={isActive} />}
                  {preview.id === "verify" && <VerifyPreview isActive={isActive} />}
                  {preview.id === "move-in" && <MoveInPreview isActive={isActive} />}
                  {preview.id === "manage" && <ManagePreview isActive={isActive} />}
                </PhoneShell>

                {/* Miniature Caption overlay */}
                <div className={`mt-4 text-center transition-all duration-300 ${isActive ? "opacity-100" : "opacity-30"}`}>
                  <h3 className="text-xs font-black text-foreground">{preview.title}</h3>
                  <p className="text-[10px] text-muted-foreground font-semibold mt-0.5 leading-none">{preview.purpose}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Navigation dots */}
      <div className="flex justify-center space-x-1.5 mt-2">
        {previews.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualAction(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-5 bg-primary" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
