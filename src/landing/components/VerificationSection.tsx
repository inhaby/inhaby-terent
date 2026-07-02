import { motion } from "motion/react";
import { CheckCircle2, Shield, Upload, FileText, Camera, UserCheck, Award, Eye, ArrowRight, ArrowDown } from "lucide-react";

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

export default function VerificationSection() {
  return (
    <section className="hidden md:block py-24 bg-muted/30 border-t border-b border-border relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-primary-soft rounded-full border border-primary/10">
            Rigorous Verification Protocol
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl leading-tight">
            Our 6-Step Verification Timeline
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground font-medium">
            We inspect every home so you don't have to. Here is how we verify both physical conditions and ownership documentation.
          </p>
        </div>

        {/* Horizontal Timeline on Desktop / Vertical Timeline on Mobile */}
        <div className="relative max-w-7xl mx-auto">
          
          {/* Connecting Track Line for Desktop (lg+) */}
          <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[2px] bg-border -z-10">
            <motion.div 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full bg-primary"
            />
          </div>

          {/* Steps Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 relative">
            {verificationSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center w-full group"
                >
                  {/* Step Bubble Indicator */}
                  <div className="relative w-[100px] h-[100px] bg-background border-2 border-border rounded-[2.25rem] flex items-center justify-center mb-6 shadow-xs group-hover:border-primary group-hover:shadow-lg transition-all duration-300 shrink-0">
                    {/* Ring Pulse for Active/End step */}
                    {index === 4 && (
                      <span className="absolute -inset-1.5 rounded-[2.5rem] bg-primary/10 animate-ping opacity-65" />
                    )}
                    {index === 5 && (
                      <span className="absolute -inset-1.5 rounded-[2.5rem] bg-primary/10 animate-pulse opacity-65" />
                    )}
                    <div className={`p-3 rounded-2xl ${step.color}`}>
                      <step.icon className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Step Details inside full-width mobile card */}
                  <div className="bg-background/60 hover:bg-background/90 p-6 rounded-3xl border border-border/60 hover:border-primary/25 hover:shadow-md transition-all duration-300 w-full min-h-[140px] flex flex-col justify-start">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary mb-2 block">
                      Step {index + 1}
                    </span>
                    <h3 className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Arrow down (↓) connector for Mobile/Tablet */}
                {index < verificationSteps.length - 1 && (
                  <div className="lg:hidden my-4 text-primary/40 animate-bounce">
                    <ArrowDown className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reimbursement Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 rounded-3xl bg-background border border-border text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs"
        >
          <div className="flex items-center space-x-4 text-left">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Complete Verification Guarantee</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-xl">
                We believe in complete truth. If any listing is inaccurate or has hidden brokerage upon contact, we compensate your travel costs.
              </p>
            </div>
          </div>
          <button className="px-6 py-3 bg-primary hover:opacity-90 text-primary-foreground text-xs font-bold rounded-xl transition-all shadow-md shrink-0 flex items-center space-x-1.5">
            <span>Read Our Guarantee</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
