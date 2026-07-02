import { motion } from "motion/react";
import { ArrowLeft, ShieldCheck, UserCheck, Award, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";

const verifiedOwners = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Property Manager",
    properties: 12,
    rating: 4.9,
    joined: "2022",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    bio: "Specializing in luxury urban lofts and modern studios in Downtown Manhattan."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Individual Owner",
    properties: 3,
    rating: 5.0,
    joined: "2021",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    bio: "Dedicated to providing high-quality, well-maintained homes for young professionals."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Real Estate Partner",
    properties: 45,
    rating: 4.8,
    joined: "2023",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    bio: "Connecting families with their dream suburban homes across the tri-state area."
  }
];

export default function VerifiedOwnersPage() {
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Verified <span className="text-primary">Owners</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            We vet every landlord and property manager on our platform. Our rigorous verification process ensures you're dealing with legitimate, trustworthy individuals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {verifiedOwners.map((owner, index) => (
            <motion.div
              key={owner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-[2rem] p-8 border border-border hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/10">
                    <OptimizedImage 
                      src={owner.avatar} 
                      alt={owner.name}
                      aspectRatio="aspect-square w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-1 rounded-lg shadow-lg">
                    <UserCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-yellow-500 mb-1">
                    < Award className="w-4 h-4 mr-1 fill-yellow-500" />
                    <span className="font-bold">{owner.rating}</span>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Top Rated</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {owner.name}
              </h3>
              <p className="text-primary font-semibold text-sm mb-4">{owner.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {owner.bio}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Properties</p>
                  <p className="text-lg font-bold text-foreground">{owner.properties}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Member Since</p>
                  <p className="text-lg font-bold text-foreground">{owner.joined}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Identity Check", desc: "Government ID and background checks for all owners." },
             { title: "Ownership Proof", desc: "Verification of property deeds and management rights." },
             { title: "Review System", desc: "Transparent feedback from previous and current tenants." }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-muted rounded-3xl border border-border">
               <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
               <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
               <p className="text-muted-foreground text-sm">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
