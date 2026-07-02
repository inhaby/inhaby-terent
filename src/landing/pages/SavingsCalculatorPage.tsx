import { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  IndianRupee, 
  PiggyBank, 
  ShieldCheck, 
  ChevronRight, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  Coffee,
  Tv,
  Plane,
  Armchair,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SavingsCalculatorPage() {
  const [rent, setRent] = useState<number>(35000);
  const [brokerageOption, setBrokerageOption] = useState<string>("1-month");
  const [customBrokerage, setCustomBrokerage] = useState<number>(15000);
  const [typicalDepositMonths, setTypicalDepositMonths] = useState<number>(6);

  // Calculate values
  const rentValue = rent;
  
  const calculatedBrokerage = (() => {
    if (brokerageOption === "1-month") return rentValue;
    if (brokerageOption === "15-days") return Math.round(rentValue / 2);
    if (brokerageOption === "2-months") return rentValue * 2;
    return customBrokerage;
  })();

  const typicalDeposit = rentValue * typicalDepositMonths;
  const inhabyDeposit = rentValue * 2; // INHABY caps security deposit to 2 months!

  const typicalUpfront = rentValue + typicalDeposit + calculatedBrokerage;
  const inhabyUpfront = rentValue + inhabyDeposit; // ₹0 brokerage

  const totalUpfrontSavings = typicalUpfront - inhabyUpfront;
  const directCashSaved = calculatedBrokerage;

  // Visual gifts matching savings amount
  const getSavingsReward = (savings: number) => {
    if (savings >= 100000) {
      return {
        title: "A Premium Workstation Setup",
        desc: "High-end ergonomic standing desk, dual 4K monitors, and professional task chair.",
        icon: Armchair,
        cost: "₹85,000"
      };
    } else if (savings >= 50000) {
      return {
        title: "A 55-inch 4K Smart QLED TV",
        desc: "Bring home cinema-quality entertainment with Dolby Atmos for your new living room.",
        icon: Tv,
        cost: "₹45,000"
      };
    } else if (savings >= 25000) {
      return {
        title: "A Luxury Weekend Getaway",
        desc: "A fully paid 3-day premium staycation for two in Goa or Coorg, flights included.",
        icon: Plane,
        cost: "₹24,000"
      };
    } else {
      return {
        title: "A Premium Espresso Machine",
        desc: "An Italian-designed home barista coffee maker with automated milk frother.",
        icon: Coffee,
        cost: "₹12,000"
      };
    }
  };

  const reward = getSavingsReward(totalUpfrontSavings);

  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-16 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-10%] w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10 max-w-6xl">
        
        {/* Navigation back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-primary font-bold text-sm transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-primary-soft rounded-full border border-primary/15">
            Zero Brokerage Calculator
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground font-sans leading-tight">
            Calculate your <span className="text-primary">INHABY Savings</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
            Standard agents charge massive brokerage fees and demand huge security deposits. See how much upfront cash stays in your bank account by renting directly.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Sliders */}
          <div className="lg:col-span-5 bg-background rounded-[2.5rem] border border-border p-6 sm:p-8 shadow-xl space-y-8">
            <h2 className="text-xl font-bold text-foreground flex items-center">
              <Sparkles className="w-5 h-5 text-primary mr-2" />
              Customize Rental Deal
            </h2>

            {/* Slider 1: Monthly Rent */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-wider">
                  Target Monthly Rent
                </label>
                <div className="flex items-center text-primary font-black text-lg bg-primary-soft px-3 py-1 rounded-xl border border-primary/10">
                  <IndianRupee className="w-4 h-4 mr-0.5" />
                  <span>{rent.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="200000" 
                step="2500"
                value={rent} 
                onChange={(e) => setRent(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                <span>₹10,000</span>
                <span>₹1,00,000</span>
                <span>₹2,00,000</span>
              </div>
            </div>

            {/* Brokerage Options */}
            <div className="space-y-4">
              <label className="text-xs font-black text-muted-foreground uppercase tracking-wider block">
                Typical Agent Brokerage Rate
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "1-month", label: "1 Month Rent" },
                  { id: "15-days", label: "15 Days Rent" },
                  { id: "2-months", label: "2 Months Rent" },
                  { id: "custom", label: "Custom Amount" }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setBrokerageOption(opt.id)}
                    className={`py-3 px-4 rounded-xl border font-bold text-xs transition-all text-center ${brokerageOption === opt.id ? "bg-primary-soft border-primary text-primary" : "bg-muted/40 border-border hover:bg-muted text-muted-foreground"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {brokerageOption === "custom" && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative mt-2"
                >
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-black text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={customBrokerage}
                    onChange={(e) => setCustomBrokerage(Number(e.target.value))}
                    placeholder="Enter agent brokerage"
                    className="w-full pl-8 pr-4 py-3 bg-muted/40 rounded-xl border border-border text-foreground font-bold outline-none focus:border-primary transition-colors text-sm"
                  />
                </motion.div>
              )}
            </div>

            {/* Security Deposit Months (Agent Typical) */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-wider">
                  Typical Agent Security Deposit
                </label>
                <div className="text-foreground font-black text-sm bg-muted px-3 py-1 rounded-xl border border-border/60">
                  <span>{typicalDepositMonths} Months</span>
                </div>
              </div>
              <input 
                type="range" 
                min="3" 
                max="10" 
                step="1"
                value={typicalDepositMonths} 
                onChange={(e) => setTypicalDepositMonths(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                <span>3 Months</span>
                <span>6 Months (Standard)</span>
                <span>10 Months (Bangalore Standard)</span>
              </div>
              <div className="flex items-center text-[10px] text-amber-600 font-bold bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                <Info className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                <span>INHABY strictly caps security deposits to a maximum of 2 months rent.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Results */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Savings Hero Card */}
            <motion.div 
              key={rentValue + calculatedBrokerage + typicalDepositMonths}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-primary text-primary-foreground rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center space-x-1.5 bg-white/15 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider w-fit mb-3">
                    <PiggyBank className="w-3.5 h-3.5" />
                    <span>Instant Upfront Savings</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tight flex items-baseline">
                    <span className="text-2xl font-bold mr-1">₹</span>
                    {totalUpfrontSavings.toLocaleString("en-IN")}
                  </h3>
                  <p className="text-primary-foreground/80 text-xs sm:text-sm font-semibold mt-2">
                    Kept in your bank instead of locked in a deposit or lost to brokers!
                  </p>
                </div>

                <div className="bg-white text-slate-950 p-5 rounded-2xl border border-white/10 flex flex-col justify-between shrink-0 min-w-[200px]">
                  <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mb-1">
                    Brokerage Saved
                  </p>
                  <p className="text-2xl font-black text-primary flex items-baseline">
                    <span className="text-lg font-bold mr-0.5">₹</span>
                    {directCashSaved.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[10px] font-semibold text-slate-500 mt-1">
                    100% direct cash savings!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Side-by-Side Detailed Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Typical Agent Route */}
              <div className="bg-background rounded-3xl border border-border p-6 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-rose-500 uppercase tracking-widest bg-rose-500/5 border border-rose-500/10 px-2.5 py-1 rounded-md">
                      Typical Agent route
                    </span>
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  </div>
                  <h4 className="text-lg font-black text-foreground mb-4">The Cost Breakdown</h4>
                  
                  <div className="space-y-3.5 text-xs font-semibold">
                    <div className="flex justify-between pb-3 border-b border-border">
                      <span className="text-muted-foreground">1st Month Rent</span>
                      <span className="text-foreground">₹{rentValue.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-border">
                      <span className="text-muted-foreground">Security Deposit ({typicalDepositMonths} months)</span>
                      <span className="text-foreground">₹{typicalDeposit.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-border text-rose-500">
                      <span>Brokerage Fee</span>
                      <span>₹{calculatedBrokerage.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border mt-6 flex justify-between items-baseline font-black">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Upfront Cost</span>
                  <span className="text-xl text-foreground">₹{typicalUpfront.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Card 2: INHABY Route */}
              <div className="bg-background rounded-3xl border border-primary/20 p-6 shadow-md shadow-primary/5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/2 rounded-full blur-xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary-soft border border-primary/10 px-2.5 py-1 rounded-md">
                      INHABY Route
                    </span>
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-lg font-black text-foreground mb-4">The Honest Deal</h4>
                  
                  <div className="space-y-3.5 text-xs font-semibold">
                    <div className="flex justify-between pb-3 border-b border-border">
                      <span className="text-muted-foreground">1st Month Rent</span>
                      <span className="text-foreground">₹{rentValue.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-border">
                      <span className="text-muted-foreground">Security Deposit (Capped 2 months)</span>
                      <span className="text-foreground">₹{inhabyDeposit.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-border text-primary font-black">
                      <span>Brokerage Fee</span>
                      <span className="bg-primary-soft px-2 py-0.5 rounded-md border border-primary/10 text-[10px] uppercase tracking-wider">₹0 Free</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border mt-6 flex justify-between items-baseline font-black">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Upfront Cost</span>
                  <span className="text-xl text-primary">₹{inhabyUpfront.toLocaleString("en-IN")}</span>
                </div>
              </div>

            </div>

            {/* Savings Reward Visualizer Section */}
            <div className="bg-background rounded-3xl border border-border p-6 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-primary-soft text-primary rounded-2xl flex items-center justify-center shrink-0">
                {reward.icon && <reward.icon className="w-8 h-8" />}
              </div>
              <div className="flex-1 space-y-1 text-center md:text-left">
                <span className="text-[9px] font-black tracking-widest uppercase text-primary bg-primary-soft px-2.5 py-0.5 rounded-md border border-primary/5 w-fit">
                  What your savings pays for
                </span>
                <h4 className="text-lg font-black text-foreground pt-1">{reward.title}</h4>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">{reward.desc}</p>
              </div>
              <div className="text-right self-center md:self-auto shrink-0 bg-muted/60 px-4 py-2 rounded-xl border border-border">
                <span className="block text-[8px] font-extrabold uppercase text-muted-foreground tracking-widest text-center">Value</span>
                <span className="text-sm font-black text-foreground">{reward.cost}</span>
              </div>
            </div>

            {/* Premium action section */}
            <div className="p-8 bg-slate-950 text-white rounded-[2.5rem] border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-2 max-w-md">
                <h3 className="text-xl font-bold flex items-center">
                  <TrendingUp className="w-5 h-5 text-primary mr-2" />
                  Ready to rent safely?
                </h3>
                <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                  Join thousands of smart renters in Bangalore, Mumbai, and Delhi who saved massive brokerages and rent with verified peace of mind.
                </p>
              </div>
              <Link 
                to="/verify" 
                className="relative z-10 w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground font-black rounded-xl text-xs hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-1 shrink-0 whitespace-nowrap"
              >
                <span>Verify Property Now</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
