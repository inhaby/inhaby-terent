import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, ArrowRight, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

export default function TrustBanner() {
  return (
    <section className="py-6 md:py-12 bg-primary/5 border-y border-primary/10">
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center space-x-4 md:space-x-6 text-left">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-foreground">Verify any INHABY Listing</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">Protect yourself from fraud. Check the verification status of any property.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
            <Link 
              to="/verify" 
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-primary text-primary-foreground rounded-xl md:rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center text-xs md:text-base"
            >
              Verify Now
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1.5 md:ml-2" />
            </Link>
            <Link 
              to="/savings" 
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-background border border-border text-foreground rounded-xl md:rounded-2xl font-bold hover:bg-muted transition-all flex items-center justify-center text-xs md:text-base"
            >
              <Calculator className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
              Calculate Savings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
