import React from 'react';
import { Heart, Share2, Star, Map as MapIcon, CameraOff } from 'lucide-react';
import { motion } from 'motion/react';
import { Property } from '../types';
import { LazyImage } from './LazyImage';

/** Neutral placeholder shown when a property has no uploaded photos */
const NoPhotoPlaceholder = ({ className = '' }: { className?: string }) => (
  <div className={`w-full h-full bg-zinc-100 flex flex-col items-center justify-center text-zinc-400 ${className}`}>
    <CameraOff className="w-6 h-6 mb-1" />
    <span className="text-[9px] font-bold uppercase tracking-wider">No photos</span>
  </div>
);

export const LargeCard = React.memo(({ property, isSaved, onToggleSave, onClick, onShare }: { property: Property, isSaved: boolean, onToggleSave: (id: string) => void, onClick: (id: string) => void, onShare: (p: Property) => void, key?: any }) => (
  <div 
    onClick={() => onClick(property.id)}
    className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative active:scale-[0.98] transition-transform cursor-pointer mb-6 animate-in fade-in duration-300"
  >
    <div className="relative aspect-[16/9] w-full overflow-hidden">
      {property.image ? <LazyImage src={property.image} alt={property.title} className="w-full h-full object-cover block" referrerPolicy="no-referrer" /> : <NoPhotoPlaceholder />}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleSave(property.id); }}
          className={`p-2.5 rounded-full shadow-lg transition-colors cursor-pointer ${isSaved ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-400'}`}
        >
          <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="absolute bottom-4 left-4">
        <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
          Premium Villa
        </div>
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-black text-gray-900 text-xl leading-tight flex-1">{property.title}</h4>
        <div className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-black px-2 py-1 rounded-lg">
          <span>{property.rating.toFixed(1)}</span>
          <Star size={12} fill="currentColor" />
        </div>
      </div>
      <p className="text-sm text-gray-500 font-medium">{property.location}</p>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Starting from</span>
          <span className="font-black text-gray-900 text-2xl">₹{property.price.toLocaleString()}</span>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100 cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  </div>
));
LargeCard.displayName = 'LargeCard';

export const MiniCard = React.memo(({ property, isSaved, onToggleSave, onClick, onShare }: { property: Property, isSaved: boolean, onToggleSave: (id: string) => void, onClick: (id: string) => void, onShare: (p: Property) => void, key?: any }) => (
  <div 
    onClick={() => onClick(property.id)}
    className="bg-white rounded-2xl p-2 border border-gray-100 flex items-center gap-3 active:scale-[0.98] transition-transform cursor-pointer hover:border-theme-accent/20"
  >
    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
      {property.image ? <LazyImage src={property.image} alt={property.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <NoPhotoPlaceholder />}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-gray-900 text-[11px] truncate">{property.title}</h4>
      <p className="text-[9px] text-gray-500 truncate">{property.location}</p>
      <p className="text-[11px] font-black text-blue-600 mt-0.5">₹{property.price.toLocaleString()}</p>
    </div>
  </div>
));
MiniCard.displayName = 'MiniCard';

export const ImageFeedCard = React.memo(({ property, isSaved, onToggleSave, onClick, onShare }: { property: Property, isSaved: boolean, onToggleSave: (id: string) => void, onClick: (id: string) => void, onShare: (p: Property) => void, key?: any }) => (
  <div 
    onClick={() => onClick(property.id)}
    className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden group cursor-pointer shadow-md"
  >
    {property.image ? <LazyImage src={property.image} alt={property.title} className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" /> : <NoPhotoPlaceholder />}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    <div className="absolute top-3 right-3">
      <button 
        onClick={(e) => { e.stopPropagation(); onToggleSave(property.id); }}
        className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${isSaved ? 'bg-red-500 text-white' : 'bg-white/20 text-white'}`}
      >
        <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
      </button>
    </div>
    <div className="absolute bottom-4 left-4 right-4 text-white">
      <h4 className="font-bold text-sm leading-tight mb-1">{property.title}</h4>
      <div className="flex items-center justify-between">
        <span className="text-xs font-black">₹{property.price.toLocaleString()}</span>
        <div className="flex items-center gap-1 text-[10px] font-bold opacity-80">
          <Star size={10} fill="currentColor" />
          <span>{property.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  </div>
));
ImageFeedCard.displayName = 'ImageFeedCard';

export const ComparisonCard = React.memo(({ property, onClick }: { property: Property, onClick: (id: string) => void, key?: any }) => (
  <div 
    onClick={() => onClick(property.id)}
    className="bg-white rounded-2xl border border-gray-100 p-4 min-w-[200px] shadow-sm hover:shadow-md cursor-pointer transition-shadow"
  >
    <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-3">
      {property.image ? <LazyImage src={property.image} alt={property.title} className="w-full h-full object-cover block" referrerPolicy="no-referrer" /> : <NoPhotoPlaceholder />}
    </div>
    <h4 className="font-bold text-gray-900 text-xs truncate mb-2">{property.title}</h4>
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] border-b border-gray-50 pb-1">
        <span className="text-gray-400">Price</span>
        <span className="font-bold">₹{property.price.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-[10px] border-b border-gray-50 pb-1">
        <span className="text-gray-400">Size</span>
        <span className="font-bold">{property.size}</span>
      </div>
      <div className="flex justify-between text-[10px]">
        <span className="text-gray-400">Rating</span>
        <span className="font-bold text-green-600">{property.rating.toFixed(1)}</span>
      </div>
    </div>
  </div>
));
ComparisonCard.displayName = 'ComparisonCard';

export const StackCard = React.memo(({ property, index, onClick }: { property: Property, index: number, onClick: (id: string) => void, key?: any }) => (
  <motion.div 
    onClick={() => onClick(property.id)}
    style={{ zIndex: 10 - index, marginTop: index === 0 ? 0 : -120 }}
    whileHover={{ y: -20, transition: { duration: 0.2 } }}
    className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative cursor-pointer"
  >
    <div className="w-full aspect-[16/9] overflow-hidden">
      {property.image ? <LazyImage src={property.image} alt={property.title} className="w-full h-full object-cover block" referrerPolicy="no-referrer" /> : <NoPhotoPlaceholder />}
    </div>
    <div className="p-4 bg-white">
      <h4 className="font-black text-gray-900 text-sm truncate">{property.title}</h4>
      <div className="flex items-center justify-between mt-2">
        <span className="font-black text-blue-600">₹{property.price.toLocaleString()}</span>
        <span className="text-[10px] font-bold text-gray-400 uppercase">{property.location}</span>
      </div>
    </div>
  </motion.div>
));
StackCard.displayName = 'StackCard';

export const StoryCard = React.memo(({ property, onClick }: { property: Property, onClick: (id: string) => void, key?: any }) => (
  <div 
    onClick={() => onClick(property.id)}
    className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
  >
    <div className="w-20 h-20 rounded-full p-1 border-2 border-theme-accent overflow-hidden">
      {property.image ? <LazyImage src={property.image} alt={property.title} className="w-full h-full rounded-full object-cover animate-in fade-in decoration-300" referrerPolicy="no-referrer" /> : <NoPhotoPlaceholder className="rounded-full" />}
    </div>
    <span className="text-[10px] font-bold text-theme-text-secondary w-20 truncate text-center">{property.title.split(' ')[0]}</span>
  </div>
));
StoryCard.displayName = 'StoryCard';

export const GridCard = React.memo(({ property, isSaved, onToggleSave, onClick, onShare }: { property: Property, isSaved: boolean, onToggleSave: (id: string) => void, onClick: (id: string) => void, onShare: (p: Property) => void, key?: any }) => (
  <div 
    onClick={() => onClick(property.id)}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative active:scale-[0.98] transition-all cursor-pointer hover:shadow-md hover:border-theme-accent/10 duration-200"
  >
    <div className="relative aspect-[16/9] w-full overflow-hidden mb-1">
      {property.image ? <LazyImage src={property.image} alt={property.title} className="w-full h-full object-cover block" referrerPolicy="no-referrer" /> : <NoPhotoPlaceholder />}
      {property.tag && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase leading-none">
          {property.tag}
        </span>
      )}
      <div className="absolute top-2 right-2 flex flex-col gap-1.5">
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleSave(property.id); }}
          className={`p-1.5 rounded-full shadow-md transition-colors cursor-pointer ${isSaved ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400'}`}
        >
          <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
    <div className="p-2.5">
      <h4 className="font-bold text-gray-800 text-xs truncate leading-snug">{property.title}</h4>
      <p className="text-[9px] text-gray-500 mt-0.5 truncate">{property.location}</p>
      <div className="flex items-center justify-between mt-2 pt-0.5">
        <span className="font-black text-gray-900 text-sm">₹{property.price.toLocaleString()}</span>
        <div className="flex items-center gap-0.5 bg-green-50 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded">
          <span>{property.rating.toFixed(1)}</span>
          <Star size={8} fill="currentColor" />
        </div>
      </div>
    </div>
  </div>
));
GridCard.displayName = 'GridCard';

export const ListCard = React.memo(({ property, isSaved, onToggleSave, onClick, onShare }: { property: Property, isSaved: boolean, onToggleSave: (id: string) => void, onClick: (id: string) => void, onShare: (p: Property) => void, key?: any }) => (
  <div 
    onClick={() => onClick(property.id)}
    className="bg-theme-surface rounded-2xl overflow-hidden shadow-sm border border-theme-border/60 flex gap-3 p-2 active:scale-[0.98] transition-all duration-300 cursor-pointer hover:border-theme-accent/25"
  >
    <div className="relative w-24 h-24 flex-shrink-0">
      {property.image ? <LazyImage src={property.image} alt={property.title} className="w-full h-full rounded-xl object-cover" referrerPolicy="no-referrer" /> : <NoPhotoPlaceholder className="rounded-xl" />}
      {property.tag && (
        <span className="absolute top-1.5 left-1.5 bg-theme-accent text-white text-[7px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
          {property.tag}
        </span>
      )}
    </div>
    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
      <div>
        <h4 className="font-serif text-sm font-semibold text-theme-text-primary leading-tight truncate">{property.title}</h4>
        <p className="text-[9px] text-theme-text-secondary mt-1 truncate">{property.location}</p>
        <div className="flex gap-1.5 mt-2">
          {property.badges?.slice(0, 2).map((b, i) => (
            <span key={i} className="text-[7px] font-bold text-theme-accent bg-theme-accent-soft px-2 py-0.5 rounded uppercase tracking-wider">{b}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="font-serif font-black text-theme-text-primary text-sm">₹{property.price.toLocaleString()}</span>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleSave(property.id); }}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${isSaved ? 'text-red-500' : 'text-theme-text-secondary/50 hover:text-red-500'}`}
        >
          <Heart size={15} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  </div>
));
ListCard.displayName = 'ListCard';

export const CarouselCard = React.memo(({ property, isSaved, onToggleSave, onClick, onShare }: { property: Property, isSaved: boolean, onToggleSave: (id: string) => void, onClick: (id: string) => void, onShare: (p: Property) => void, key?: any }) => (
  <div 
    onClick={() => onClick(property.id)}
    className="w-64 flex-shrink-0 bg-theme-surface rounded-2xl overflow-hidden shadow-sm border border-theme-border/60 relative active:scale-[0.98] transition-all duration-300 cursor-pointer animate-in fade-in hover:border-theme-accent/25"
  >
    <div className="relative aspect-[16/9] w-full overflow-hidden">
      {property.image ? <LazyImage src={property.image} alt={property.title} className="w-full h-full object-cover block" referrerPolicy="no-referrer" /> : <NoPhotoPlaceholder />}
      <div className="absolute top-2 right-2 flex gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onShare(property); }}
          className="p-1.5 bg-theme-surface/90 backdrop-blur-md rounded-full text-theme-text-secondary hover:text-theme-accent shadow-sm cursor-pointer"
        >
          <Share2 size={13} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleSave(property.id); }}
          className={`p-1.5 rounded-full shadow-sm cursor-pointer ${isSaved ? 'bg-red-500 text-white' : 'bg-theme-surface/90 text-theme-text-secondary hover:text-red-500'}`}
        >
          <Heart size={13} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      {property.tag && (
        <div className="absolute bottom-2 left-2 bg-theme-accent text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
          {property.tag}
        </div>
      )}
    </div>
    <div className="p-3.5 space-y-2">
      <h4 className="font-serif text-sm font-semibold text-theme-text-primary truncate leading-tight">{property.title}</h4>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif font-black text-theme-text-primary text-sm">₹{property.price.toLocaleString()}</span>
          {property.originalPrice && <span className="text-[10px] text-theme-text-secondary/50 line-through">₹{property.originalPrice?.toLocaleString()}</span>}
        </div>
        <div className="flex items-center gap-1 text-[10px] bg-theme-accent-soft text-theme-accent font-bold px-2 py-0.5 rounded-lg">
          <Star size={10} fill="currentColor" />
          <span>{property.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  </div>
));
CarouselCard.displayName = 'CarouselCard';

export const MapPlaceholder = React.memo(() => (
  <div className="px-4 py-2">
    <div className="bg-gray-100 rounded-3xl h-48 flex flex-col items-center justify-center border border-gray-200 relative overflow-hidden">
      <MapIcon size={48} className="text-gray-300 mb-2" />
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Interactive Map View</p>
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      <button className="mt-4 bg-white text-gray-900 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border border-gray-200 cursor-pointer">
        Open Map
      </button>
    </div>
  </div>
));
MapPlaceholder.displayName = 'MapPlaceholder';

export const FilterChips = React.memo(() => (
  <div className="flex gap-2 overflow-x-auto px-4 py-2 no-scrollbar">
    {['Near Metro', 'Single Room', 'With Food', 'No Deposit', 'Verified'].map((chip) => (
      <button key={chip} className="flex-shrink-0 bg-white border border-gray-100 px-4 py-2 rounded-full text-[10px] font-bold text-gray-600 shadow-sm whitespace-nowrap cursor-pointer hover:bg-gray-50">
        {chip}
      </button>
    ))}
  </div>
));
FilterChips.displayName = 'FilterChips';

export const TagFilters = React.memo(() => (
  <div className="grid grid-cols-3 gap-2 px-4 py-2">
    {['Budget', 'Premium', 'Shared', 'Private', 'Short Term', 'Long Term'].map((tag) => (
      <button key={tag} className="bg-gray-50 py-3 rounded-xl text-[10px] font-black text-gray-800 uppercase tracking-tight border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
        {tag}
      </button>
    ))}
  </div>
));
TagFilters.displayName = 'TagFilters';
