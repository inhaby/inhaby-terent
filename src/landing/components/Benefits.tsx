import { motion } from "motion/react";
import { Zap, Shield, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    title: "No Brokers",
    description: "Direct connection with owners means zero brokerage fees and transparent communication.",
    icon: Users,
  },
  {
    title: "Fast Process",
    description: "From search to move-in, our streamlined digital workflow saves you weeks of time.",
    icon: Zap,
  },
  {
    title: "Verified Listings",
    description: "Every single home on our platform undergoes a rigorous 20-point verification check.",
    icon: Shield,
  },
  {
    title: "24/7 Support",
    description: "Our dedicated concierge team is always here to help you with any rental issues.",
    icon: Clock,
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-12 md:py-24 bg-background">
      <div className="container px-5 sm:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl mb-8">
              Why choose INHABY?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const isVerified = benefit.title === "Verified Listings";
                
                const cardContent = (
                  <>
                    <div className="w-12 h-12 bg-primary-soft rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 flex items-center">
                      {benefit.title}
                      {isVerified && <Shield className="w-4 h-4 ml-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </>
                );

                if (isVerified) {
                  return (
                    <Link 
                      key={index} 
                      to="/verify"
                      className="flex flex-col group cursor-pointer p-4 -m-4 rounded-2xl hover:bg-primary/5 transition-colors"
                    >
                      {cardContent}
                    </Link>
                  );
                }
                
                return (
                  <div 
                    key={index} 
                    className="flex flex-col"
                  >
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-muted rounded-[3rem] overflow-hidden flex items-center justify-center p-12">
              <div className="relative w-full h-full bg-background rounded-3xl shadow-2xl p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full"></div>
                    <div className="space-y-1">
                      <div className="h-3 w-24 bg-muted rounded"></div>
                      <div className="h-2 w-16 bg-muted rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-muted rounded"></div>
                  <div className="h-4 w-3/4 bg-muted rounded"></div>
                </div>
                <Link 
                  to="/verify"
                  className="bg-primary h-12 w-full rounded-xl flex items-center justify-center text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  Verify Now
                </Link>
              </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
