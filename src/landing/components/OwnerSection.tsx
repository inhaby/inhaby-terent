import { motion } from "motion/react";
import { ArrowRight, BarChart3, Users, Building2, Bell, ShieldCheck, Sparkles } from "lucide-react";

export default function OwnerSection() {
  return (
    <section id="owner-portal" className="py-12 md:py-24 bg-muted/30 border-y border-border/80 relative overflow-hidden">
      {/* Soft abstract glowing shapes */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-primary/3 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-primary/2 rounded-full blur-[110px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Premium Illustration of Owner Dashboard */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-background rounded-3xl border border-border/80 p-6 md:p-8 shadow-xl relative overflow-hidden"
            >
              {/* Decorative radial lighting */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              
              {/* Dashboard Header Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-border/60 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold">
                    OP
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-foreground">Inhaby Owner Hub</h4>
                    <p className="text-[10px] text-muted-foreground font-semibold">Active landlord dashboard</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Connected Live</span>
                </div>
              </div>

              {/* Grid of Owner Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted/50 p-4 rounded-2xl border border-border/40">
                  <div className="text-muted-foreground mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Enquiries</span>
                    <Users className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-lg font-extrabold text-foreground">24 Real</div>
                  <div className="text-[9px] text-primary font-semibold mt-0.5">+12% this week</div>
                </div>

                <div className="bg-muted/50 p-4 rounded-2xl border border-border/40">
                  <div className="text-muted-foreground mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider">My Listings</span>
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-lg font-extrabold text-foreground">3 Properties</div>
                  <div className="text-[9px] text-primary font-semibold mt-0.5">All 100% Verified</div>
                </div>

                <div className="bg-muted/50 p-4 rounded-2xl border border-border/40">
                  <div className="text-muted-foreground mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Monthly Rent</span>
                    <BarChart3 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-lg font-extrabold text-foreground">₹62,000</div>
                  <div className="text-[9px] text-muted-foreground font-semibold mt-0.5">Escrow protected</div>
                </div>
              </div>

              {/* Interactive tenant check-in requests */}
              <div className="space-y-3.5">
                <h5 className="text-[11px] font-extrabold text-foreground uppercase tracking-wider">Recent Tenant Enquiries</h5>
                
                {/* Request 1 */}
                <div className="p-3.5 bg-background border border-border rounded-2xl flex items-center justify-between shadow-xs hover:border-primary/30 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center">
                      KP
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-foreground">Kartik Patel</h6>
                      <p className="text-[10px] text-muted-foreground">Software Dev • Wants 2BHK walkthrough</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-lg text-[9px] font-bold uppercase tracking-wide">
                    ID Checked
                  </span>
                </div>

                {/* Request 2 */}
                <div className="p-3.5 bg-background border border-border rounded-2xl flex items-center justify-between shadow-xs hover:border-primary/30 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                      SM
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-foreground">Sneha Mishra</h6>
                      <p className="text-[10px] text-muted-foreground">MBA Student • Requested lease draft</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-lg text-[9px] font-bold uppercase tracking-wide">
                    Profile Verified
                  </span>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Side: Owner Section Copy & Portal CTA */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 lg:pl-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Owner Portal</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground font-sans leading-[1.15]">
              Own a property?
            </h2>
            
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
              Reach verified tenants, manage listings, track enquiries, and grow your rental business—all from one dashboard.
            </p>

            <ul className="space-y-3.5 text-sm font-semibold text-muted-foreground flex flex-col items-center lg:items-start">
              <li className="flex items-center">
                <ShieldCheck className="w-5 h-5 text-primary mr-2.5 shrink-0" />
                <span>100% verified tenant profiles only (no cold spam calls)</span>
              </li>
              <li className="flex items-center">
                <ShieldCheck className="w-5 h-5 text-primary mr-2.5 shrink-0" />
                <span>Instant paperless, Aadhaar-based lease e-signatures</span>
              </li>
              <li className="flex items-center">
                <ShieldCheck className="w-5 h-5 text-primary mr-2.5 shrink-0" />
                <span>Direct security deposit collections in locked digital escrow</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start">
              <a
                href="https://owner.inhaby.com"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-primary hover:opacity-90 text-primary-foreground font-bold rounded-2xl transition-all active:scale-98 shadow-lg shadow-primary/15"
              >
                <span>Go to Owner Portal</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
