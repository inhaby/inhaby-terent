import { motion } from "motion/react";
import { ArrowLeft, HelpCircle, Mail, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function HelpPage() {
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
              <HelpCircle className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Help & <span className="text-primary">Support</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl font-medium">
            Need assistance with verified listings, agreement drafting, scheduling visits, or platform features? Our dedicated team is here to support you 24/7.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="bg-muted/40 border border-border p-8 rounded-[2.5rem] space-y-6">
            <h3 className="text-xl font-bold text-foreground">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1">How long does verification take?</h4>
                <p className="text-muted-foreground text-xs font-semibold leading-relaxed">
                  Verification usually takes 24-48 hours. Our team audits Municipal land records, Aadhaar IDs, and schedules physical inspections.
                </p>
              </div>
              <div className="pt-4 border-t border-border/40">
                <h4 className="text-sm font-bold text-foreground mb-1">What does Zero Brokerage mean?</h4>
                <p className="text-muted-foreground text-xs font-semibold leading-relaxed">
                  You never pay a single rupee in commission to agents or gatekeepers. Renting is fully direct-owner on Inhaby.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/40 border border-border p-8 rounded-[2.5rem] flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1">Email Support</h4>
                <p className="text-muted-foreground text-xs font-semibold mb-2">Reach out to our compliance and support desk.</p>
                <span className="text-xs font-bold text-primary">support@inhaby.com</span>
              </div>
            </div>

            <div className="bg-muted/40 border border-border p-8 rounded-[2.5rem] flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1">Operation Hours</h4>
                <p className="text-muted-foreground text-xs font-semibold mb-2">Active online moderation and support.</p>
                <span className="text-xs font-bold text-foreground">24/7/365 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
