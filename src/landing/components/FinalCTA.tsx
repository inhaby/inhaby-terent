import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ShieldCheck, FileCheck, Landmark, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-12 md:py-24 bg-[#0B091B] text-white relative overflow-hidden border-t border-primary/20">
      {/* Background gradients and visual elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-md rounded-3xl md:rounded-[3.5rem] p-6 md:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content - Mission Statement & App stores */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our True Mission</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] font-sans text-white">
                We're not building another rental platform.
              </h2>
              
              <p className="text-primary text-lg md:text-xl font-bold tracking-wide">
                We're building India's most trusted way to rent a home.
              </p>
              
              <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                By physically checking every property deed, banning greedy broker agents, and guaranteeing photo accuracy, we are setting a new baseline of safety. Join the community today.
              </p>

              {/* Bullet proof list */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-300 pt-2 pb-6">
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-primary mr-1.5" /> Direct Owner Contract</span>
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-primary mr-1.5" /> Instant Video Tours</span>
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-primary mr-1.5" /> Escrow Deposit Protection</span>
              </div>
              
              {/* Clean web-first gateway CTA stack */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href="https://inhaby.com"
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:opacity-90 hover:shadow-xl hover:shadow-primary/25 transition-all text-center flex items-center justify-center text-sm"
                >
                  <span>Get Started (Tenant Portal)</span>
                  <ArrowRight className="w-4.5 h-4.5 ml-2" />
                </a>
                
                <a 
                  href="https://owner.inhaby.com"
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border border-primary/40 hover:border-primary text-primary font-bold rounded-2xl hover:bg-primary/10 transition-all text-center flex items-center justify-center text-sm"
                >
                  <span>List Your Property</span>
                </a>
              </div>
            </div>

            {/* Right Content - Premium layered Trust illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-xl text-center max-w-[320px] w-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
                
                {/* Circular shield lock badge icon */}
                <div className="w-16 h-16 bg-primary/10 border border-primary/25 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                
                <h4 className="text-sm font-extrabold text-white mb-2 uppercase tracking-wider">Verification Guarantee</h4>
                <p className="text-xs text-slate-400 font-semibold mb-6">Every flat undergoes our manual desk-review and registry deed checks before publishing.</p>
                
                {/* Visual mini-cards representing checks */}
                <div className="space-y-3.5 text-left">
                  <div className="p-3 bg-white/[0.04] border border-white/10 rounded-xl flex items-center space-x-3">
                    <FileCheck className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[11px] font-bold text-slate-200">Municipal Land Deed Checked</span>
                  </div>
                  
                  <div className="p-3 bg-white/[0.04] border border-white/10 rounded-xl flex items-center space-x-3">
                    <Landmark className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[11px] font-bold text-slate-200">Zero Brokerage Verified</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
