import { motion } from "motion/react";
import { ArrowLeft, Camera, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";

const propertyPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    title: "Modern Minimalist Studio",
    location: "Downtown, New York",
    rating: 4.9,
    price: "$2,400/mo"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    title: "Urban Loft with View",
    location: "Brooklyn, NY",
    rating: 4.8,
    price: "$3,100/mo"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800",
    title: "Scandinavian Style Apartment",
    location: "Stockholm, SE",
    rating: 4.9,
    price: "$1,800/mo"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
    title: "Luxury Penthouse",
    location: "Miami, FL",
    rating: 5.0,
    price: "$5,500/mo"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
    title: "Cozy Garden Suite",
    location: "Portland, OR",
    rating: 4.7,
    price: "$1,500/mo"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    title: "Bright Sunlit Flat",
    location: "Barcelona, ES",
    rating: 4.8,
    price: "$2,200/mo"
  }
];

export default function PhotosPage() {
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
              <Camera className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Real Photos, <span className="text-primary">Real Trust</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            We believe in transparency. Every photo you see here is verified and captured by our professional team or trusted partners to ensure what you see is exactly what you get.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertyPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-[2rem] overflow-hidden border border-border hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <OptimizedImage 
                  src={photo.url} 
                  alt={photo.title}
                  aspectRatio="aspect-full h-full w-full"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full flex items-center space-x-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-slate-900">{photo.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 px-4 py-1.5 bg-primary/90 backdrop-blur-md text-primary-foreground rounded-full text-sm font-bold shadow-lg">
                  {photo.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {photo.title}
                </h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {photo.location}
                </div>
                <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Verified Listing</span>
                  <button className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-12 bg-muted rounded-[3rem] text-center border border-border"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Want to see more?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Download the INHABY app to explore thousands of verified listings with full 360° virtual tours and high-resolution galleries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
             <button className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">
               Get the App
             </button>
             <Link to="/" className="px-8 py-3 bg-background text-foreground border border-border rounded-2xl font-bold hover:bg-muted transition-all">
               Back to Home
             </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
