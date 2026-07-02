import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  FileText, 
  Camera, 
  UserCheck,
  ArrowRight,
  ShieldAlert
} from "lucide-react";

export default function VerificationPage() {
  const [listingId, setListingId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<null | "verified" | "fraud" | "not_found">(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listingId) return;

    setIsVerifying(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      // Mock logic for demo
      if (listingId.toLowerCase().includes("fraud")) {
        setResult("fraud");
      } else if (listingId.length > 5) {
        setResult("verified");
      } else {
        setResult("not_found");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container px-6 mx-auto">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6"
          >
            <ShieldCheck className="w-10 h-10 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            INHABY <span className="text-primary">Trust Center</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Verify any property listing on INHABY to ensure it's authentic. We use physical inspections and document verification to protect you from rental fraud.
          </motion.p>
        </div>

        {/* Verification Input */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-muted/30 p-8 rounded-[2.5rem] border border-border shadow-sm">
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Enter Listing ID or Property URL..."
                  className="w-full pl-14 pr-6 py-5 bg-background rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 transition-all outline-none text-foreground font-medium"
                  value={listingId}
                  onChange={(e) => setListingId(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                disabled={isVerifying}
                className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center disabled:opacity-70"
              >
                {isVerifying ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-3"></div>
                    Verifying with Database...
                  </div>
                ) : (
                  "Verify Listing Status"
                )}
              </button>
            </form>

            {/* Results Display */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-8"
                >
                  {result === "verified" && (
                    <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-start space-x-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-green-500 text-lg">Verified Authentic</h4>
                        <p className="text-sm text-green-500/80">This listing has passed our 3-step verification process. It is safe to proceed.</p>
                      </div>
                    </div>
                  )}
                  {result === "fraud" && (
                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-4">
                      <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-red-500 text-lg">Fraud Alert!</h4>
                        <p className="text-sm text-red-500/80">This listing has been flagged as suspicious or fraudulent. Do not share any personal info or money.</p>
                      </div>
                    </div>
                  )}
                  {result === "not_found" && (
                    <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start space-x-4">
                      <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-amber-500 text-lg">Not Found</h4>
                        <p className="text-sm text-amber-500/80">We couldn't find this listing in our database. It might be from an external site or unverified.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Verification Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Document Audit",
                desc: "We verify property ownership documents and tax receipts to ensure the lister is authorized."
              },
              {
                icon: Camera,
                title: "Physical Inspection",
                desc: "Our field agents visit the property to verify photos, amenities, and current condition."
              },
              {
                icon: UserCheck,
                title: "Owner KYC",
                desc: "We perform background checks on owners and managers to build a community of trust."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-muted/20 rounded-[2rem] border border-border hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Report Fraud Section */}
        <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Spotted something suspicious?</h2>
              <p className="text-background/70 text-lg mb-8">
                Help us keep the community safe. If you find a listing that looks like a scam, report it immediately. Our team investigates all reports within 24 hours.
              </p>
              <button className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:shadow-xl transition-all flex items-center">
                Report a Fraud Listing
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="w-64 h-64 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-32 h-32 text-primary" />
              </div>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
