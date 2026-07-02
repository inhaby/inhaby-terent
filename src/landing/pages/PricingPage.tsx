import { motion } from "motion/react";
import { ArrowLeft, Tag, Check, Info, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const pricingFeatures = [
  {
    title: "Monthly Rent",
    desc: "The fixed amount you pay every month. No surprise increases during your lease term.",
    included: true
  },
  {
    title: "Maintenance Fees",
    desc: "All standard building maintenance and repairs are covered. No hidden service charges.",
    included: true
  },
  {
    title: "Utilities (Water/Gas)",
    desc: "Standard water and gas usage are often included in our premium listings.",
    included: true
  },
  {
    title: "Security Deposit",
    desc: "Clearly stated upfront. Held in a secure, interest-bearing escrow account.",
    included: true
  },
  {
    title: "Brokerage Fees",
    desc: "We eliminate the middleman. You pay $0 in brokerage fees on INHABY.",
    included: "Zero"
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center">
              <Tag className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Transparent <span className="text-primary">Pricing</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            No hidden fees. No surprise costs. We believe in total clarity from the moment you start your search to the day you move in.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background rounded-[3rem] p-8 md:p-12 border border-border shadow-sm"
          >
            <h2 className="text-2xl font-bold text-foreground mb-8">What's included?</h2>
            <div className="space-y-8">
              {pricingFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                    {feature.included === "Zero" ? (
                      <span className="text-[10px] font-bold">0</span>
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-bold text-foreground mr-2">{feature.title}</h3>
                      {feature.included === "Zero" && (
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full uppercase">Free</span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-primary p-12 rounded-[3rem] text-primary-foreground relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                  <Info className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold mb-4">The INHABY Guarantee</h2>
                <p className="text-primary-foreground/80 mb-8 leading-relaxed">
                  If you find any hidden fees or undisclosed costs in a listing, we'll refund your first month's service fee. That's our commitment to transparency.
                </p>
                <button className="px-8 py-3 bg-white text-primary rounded-2xl font-bold hover:shadow-xl transition-all">
                  Learn More
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </motion.div>

            <div className="bg-muted p-8 rounded-[2rem] border border-border flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-foreground mb-2">Price Match Policy</h4>
                <p className="text-muted-foreground text-sm">
                  Found the same listing cheaper elsewhere? We'll match the price and give you an additional $100 move-in credit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
