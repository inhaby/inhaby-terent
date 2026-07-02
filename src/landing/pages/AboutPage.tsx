import { motion } from "motion/react";
import { ArrowLeft, Shield, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 font-sans">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            to="/landing" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              About <span className="text-primary">Inhaby</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl font-medium">
            We are redefining property discovery and renting in India. Zero brokerage, 100% verified owners, complete legal compliance, and total transparency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-muted/40 border border-border p-8 rounded-[2.5rem] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Our Philosophy</h3>
            <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
              Renting should not depend on gatekeepers who charge massive finder fees for basic introductions. We build systems that put trust first.
            </p>
          </div>

          <div className="bg-muted/40 border border-border p-8 rounded-[2.5rem] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Direct Connection</h3>
            <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
              We link tenants directly with verified homeowners. No brokers, no double commissions, and no artificial data monopolies.
            </p>
          </div>

          <div className="bg-muted/40 border border-border p-8 rounded-[2.5rem] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Legally Guarded</h3>
            <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
              Every document is vetted, every tenancy is logged, and standard rental terms are strictly enforced to keep both parties safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
