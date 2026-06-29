import React from 'react';
import { Heart, Star, Share2, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Property } from '../types';
import { LazyImage } from './LazyImage';

interface CustomPropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onClick: (id: string) => void;
  onShare: (p: Property) => void;
}

export const CustomPropertyCard: React.FC<CustomPropertyCardProps> = React.memo(({
  property,
  isSaved,
  onToggleSave,
  onClick,
  onShare
}) => {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      onClick={() => onClick(property.id)}
      className="bg-theme-surface rounded-3xl overflow-hidden border border-theme-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-300 group cursor-pointer flex flex-col h-full relative"
    >
      {/* Property Tag Label */}
      {property.tag && (
        <span className="absolute top-4 left-4 z-10 bg-theme-accent text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
          {property.tag}
        </span>
      )}

      {/* Image Container with premium scaling & hover */}
      <div className="relative aspect-[4/3] overflow-hidden bg-theme-bg flex-shrink-0">
        <LazyImage
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        
        {/* Soft immersive dark gradients on image lower edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

        {/* Action Tray: heart & share */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(property);
            }}
            className="p-2.5 rounded-full bg-theme-surface/90 backdrop-blur-md text-theme-text-secondary hover:text-theme-accent hover:bg-theme-surface shadow-md active:scale-90 transition-all cursor-pointer"
            title="Share Property"
          >
            <Share2 size={13} className="stroke-[2.5]" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(property.id);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md shadow-md active:scale-90 transition-all cursor-pointer ${
              isSaved 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-theme-surface/90 text-theme-text-secondary hover:text-red-500 hover:bg-theme-surface'
            }`}
            title="Save to Wishlist"
          >
            <Heart size={13} fill={isSaved ? 'currentColor' : 'none'} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Floating Category Badge inside image */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="bg-black/40 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
            {property.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          
          {/* Header Row: Config & Rating */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-theme-text-secondary uppercase tracking-wider block">
              {property.configuration || `${property.bedrooms} BHK`} • {property.size}
            </span>
            <div className="flex items-center gap-1 bg-theme-accent-soft text-theme-accent text-xs font-black px-2 py-0.5 rounded-lg">
              <span>{property.rating?.toFixed(1) || '4.0'}</span>
              <Star size={11} fill="currentColor" className="stroke-[2.5]" />
            </div>
          </div>

          {/* Title - Refined Cormorant Garamond Serif! */}
          <h4 className="font-serif text-base font-semibold text-theme-text-primary leading-snug group-hover:text-theme-accent transition-colors duration-250 line-clamp-2">
            {property.title}
          </h4>

          {/* Location details */}
          <div className="flex items-center gap-1.5 text-theme-text-secondary text-xs py-0.5">
            <MapPin size={12} className="text-theme-accent shrink-0 stroke-[2.5]" />
            <span className="truncate">{property.location}</span>
          </div>

        </div>

        {/* Bottom Price and Actions Row */}
        <div className="border-t border-theme-border/60 pt-4 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[9px] text-theme-text-secondary font-bold uppercase tracking-wider">MONTHLY RENT</span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif font-black text-theme-text-primary text-lg">
                ₹{property.price?.toLocaleString()}
              </span>
              {property.originalPrice && (
                <span className="text-xs text-[#a1a1aa] line-through ml-1.5">
                  ₹{property.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClick(property.id);
            }}
            className="bg-theme-accent hover:bg-theme-accent-hover text-white px-4 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer shrink-0 whitespace-nowrap md:hidden"
          >
            View Stay
          </button>
        </div>

      </div>
    </motion.div>
  );
});

CustomPropertyCard.displayName = 'CustomPropertyCard';
