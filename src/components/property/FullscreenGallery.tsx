import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  X, ChevronLeft, ChevronRight, Play, Pause, ZoomIn, ZoomOut, 
  Copy, Download, Flag, Share2, Star, CheckCircle, Info, Sliders,
  HelpCircle, Eye, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MediaItem {
  id: string;
  url: string;
  category: string;
  version: number;
  edited: boolean;
  ai_analysis?: {
    overallScore?: number;
    brightness?: number;
    sharpness?: number;
    warnings?: string[];
  };
  created_at?: string;
  is_cover: boolean;
  size_bytes?: number;
}

interface FullscreenGalleryProps {
  propertySlug: string;
  mediaItems: MediaItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  isOwner?: boolean;
}

export const FullscreenGallery: React.FC<FullscreenGalleryProps> = ({
  propertySlug,
  mediaItems,
  initialIndex,
  isOpen,
  onClose,
  isOwner = false
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isTourMode, setIsTourMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const touchStart = useRef({ x: 0, y: 0 });
  const tourInterval = useRef<NodeJS.Timeout | null>(null);
  const thumbnailRefs = useRef<HTMLButtonElement[]>([]);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  // Sync index from props initially
  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  // Clean media items fallback
  const items = useMemo(() => {
    return mediaItems || [];
  }, [mediaItems]);

  const activeItem = items[activeIndex] || items[0];

  // 1. Group images by Room Category
  const roomGroups = useMemo(() => {
    const groups: Record<string, { label: string; startIndex: number; count: number }> = {};
    items.forEach((item, idx) => {
      const cat = item.category || "Other";
      if (!groups[cat]) {
        groups[cat] = { label: cat, startIndex: idx, count: 0 };
      }
      groups[cat].count++;
    });
    return Object.values(groups);
  }, [items]);

  // 2. URL SEO Friendly State Management (Update address bar without reloading)
  useEffect(() => {
    if (!isOpen) return;
    const galleryUrl = `${window.location.origin}/app/property/${propertySlug}/gallery/${activeIndex + 1}`;
    window.history.replaceState({ path: galleryUrl }, "", galleryUrl);
  }, [activeIndex, propertySlug, isOpen]);

  // Reset URL on close
  useEffect(() => {
    if (!isOpen) {
      const originalUrl = `${window.location.origin}/app/property/${propertySlug}`;
      window.history.replaceState({ path: originalUrl }, "", originalUrl);
    }
  }, [isOpen, propertySlug]);

  // 3. Smart Preloading hook
  useEffect(() => {
    if (!isOpen) return;
    
    // Helper to preload image URL
    const preloadImage = (url: string) => {
      const img = new Image();
      img.src = url;
    };

    // Preload next image
    if (activeIndex < items.length - 1) {
      preloadImage(items[activeIndex + 1].url);
    }
    // Preload previous image
    if (activeIndex > 0) {
      preloadImage(items[activeIndex - 1].url);
    }
    // Preload current room images
    const currentRoom = activeItem.category;
    items.forEach((item) => {
      if (item.category === currentRoom && item.url !== activeItem.url) {
        preloadImage(item.url);
      }
    });
  }, [activeIndex, items, activeItem, isOpen]);

  // 4. Keyboard navigation listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, items.length]);

  // 5. Autoplay Story Tour Mode
  useEffect(() => {
    if (isTourMode) {
      tourInterval.current = setInterval(() => {
        setActiveIndex((prev) => {
          if (prev >= items.length - 1) {
            setIsTourMode(false); // End tour
            return prev;
          }
          return prev + 1;
        });
      }, 4000);
    } else {
      if (tourInterval.current) {
        clearInterval(tourInterval.current);
      }
    }

    return () => {
      if (tourInterval.current) clearInterval(tourInterval.current);
    };
  }, [isTourMode, items.length]);

  // 6. Thumbnail strip auto-scrolling layout sync
  useEffect(() => {
    const activeThumb = thumbnailRefs.current[activeIndex];
    const strip = thumbnailStripRef.current;
    if (activeThumb && strip) {
      const stripWidth = strip.clientWidth;
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.clientWidth;
      
      // Center thumbnail in container
      strip.scrollTo({
        left: thumbLeft - stripWidth / 2 + thumbWidth / 2,
        behavior: "smooth"
      });
    }
  }, [activeIndex]);

  const handleNext = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const nextZoom = Math.max(prev - 0.5, 1);
      if (nextZoom === 1) setPan({ x: 0, y: 0 });
      return nextZoom;
    });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setZoomLevel(1);
      setPan({ x: 0, y: 0 });
    } else {
      setZoomLevel(2.5);
      // Center zoom around click
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left - rect.width / 2;
      const clickY = e.clientY - rect.top - rect.height / 2;
      setPan({ x: -clickX, y: -clickY });
    }
  };

  // Touch Swipe gestures handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStart.current.x;
    const diffY = touch.clientY - touchStart.current.y;

    if (Math.abs(diffX) > 60 && Math.abs(diffY) < 50) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Mouse Drag panning for zoomed state
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel === 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.clientX - dragStart.current.x;
    const y = e.clientY - dragStart.current.y;
    setPan({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const copyShareLink = () => {
    const link = `${window.location.origin}/app/property/${propertySlug}/gallery/${activeIndex + 1}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(activeItem.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `property_${propertySlug}_photo_${activeIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download image", err);
    }
  };

  if (!isOpen || items.length === 0) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] bg-[#0c0c0e] text-white flex flex-col md:flex-row select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Property Media Fullscreen Viewer"
      >
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative min-h-0">
          
          {/* Top GalleryToolbar */}
          <div className="h-16 flex items-center justify-between px-4 bg-gradient-to-b from-black/80 to-transparent z-10">
            <div className="flex items-center gap-3">
              <button 
                onClick={onClose}
                className="p-2 bg-zinc-900/60 hover:bg-zinc-800 rounded-full transition cursor-pointer"
                aria-label="Exit Fullscreen Gallery"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-xs font-mono tracking-wider font-bold bg-zinc-900/60 px-3 py-1 rounded-full text-zinc-400">
                {activeIndex + 1} / {items.length}
              </div>
            </div>

            {/* Middle Tour Mode Indicator */}
            {isTourMode && (
              <div className="hidden sm:flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider animate-pulse">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Auto Playing Tour...
              </div>
            )}

            {/* Actions list buttons */}
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setIsTourMode(!isTourMode)}
                className={`p-2 rounded-full transition cursor-pointer flex items-center gap-1 text-xs font-black uppercase tracking-wider ${isTourMode ? 'bg-amber-500 text-white' : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300'}`}
                title={isTourMode ? "Pause Tour" : "Start Auto Tour"}
              >
                {isTourMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="hidden sm:inline">{isTourMode ? 'Pause' : 'Tour'}</span>
              </button>
              
              <button 
                onClick={handleZoomOut} 
                disabled={zoomLevel === 1}
                className="p-2 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 disabled:opacity-30 rounded-full transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              
              <button 
                onClick={handleZoomIn} 
                disabled={zoomLevel === 4}
                className="p-2 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 disabled:opacity-30 rounded-full transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button 
                onClick={copyShareLink} 
                className="p-2 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 rounded-full transition cursor-pointer"
                title="Copy Link"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              {isOwner && (
                <button 
                  onClick={downloadImage} 
                  className="p-2 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 rounded-full transition cursor-pointer"
                  title="Download Image"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}

              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-2 rounded-full transition cursor-pointer ${isSidebarOpen ? 'bg-brand text-white' : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300'}`}
                title="Toggle Sidebar Info"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ImageViewer Frame */}
          <div 
            className="flex-1 flex items-center justify-center relative overflow-hidden select-none touch-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Main view container image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
                cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default"
              }}
              onDoubleClick={handleDoubleClick}
              className="max-w-full max-h-[75vh] flex items-center justify-center transition-transform"
            >
              <img 
                src={activeItem.url} 
                alt={`${activeItem.category} View`} 
                className="max-w-full max-h-[75vh] object-contain pointer-events-none rounded-lg"
                draggable={false}
              />
            </motion.div>

            {/* Floating Navigation Controls */}
            {activeIndex > 0 && (
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full transition shadow-xl z-20 cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6 stroke-[3]" />
              </button>
            )}

            {activeIndex < items.length - 1 && (
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full transition shadow-xl z-20 cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>
            )}
          </div>

          {/* Bottom ThumbnailStrip */}
          <div className="bg-zinc-950/80 border-t border-zinc-900 p-4 z-10 flex flex-col items-center">
            <div 
              ref={thumbnailStripRef}
              className="w-full max-w-4xl flex gap-2 overflow-x-auto no-scrollbar py-2"
            >
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  ref={(el) => { if (el) thumbnailRefs.current[idx] = el; }}
                  onClick={() => {
                    setZoomLevel(1);
                    setPan({ x: 0, y: 0 });
                    setActiveIndex(idx);
                  }}
                  className={`relative flex-shrink-0 w-16 aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 border-2 cursor-pointer ${idx === activeIndex ? 'border-brand scale-105 opacity-100 shadow-md shadow-brand/20' : 'border-transparent opacity-50 hover:opacity-85'}`}
                >
                  <img src={item.url} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  
                  {/* Category tiny indicator */}
                  <span className="absolute bottom-0.5 left-0.5 right-0.5 text-[7px] text-center font-black uppercase text-white bg-black/75 px-1 truncate rounded-sm">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info Sidebar Section */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="w-full md:w-[340px] bg-zinc-950 border-t md:border-t-0 md:border-l border-zinc-900 p-5 flex flex-col justify-between overflow-y-auto no-scrollbar shrink-0 text-left"
            >
              <div className="space-y-6">
                
                {/* Header Room grouping info */}
                <div>
                  <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-wider">Viewing Area</h3>
                  <h2 className="text-lg font-black text-white mt-0.5">{activeItem.category} Group</h2>
                  {activeItem.is_cover && (
                    <span className="inline-flex items-center gap-1 text-[8px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-black tracking-wider uppercase mt-1">
                      <Star className="w-2.5 h-2.5 fill-current" /> Cover Image Focus
                    </span>
                  )}
                </div>

                {/* AI media diagnostics scoring metrics */}
                {activeItem.ai_analysis && (
                  <div className="bg-zinc-900/60 rounded-2xl border border-zinc-800 p-4 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase">AI Quality Diagnostics</span>
                      <span className="text-xs font-black text-brand">{activeItem.ai_analysis.overallScore || 70}/100</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[10px] text-zinc-400 font-bold border-t border-zinc-800/40 pt-3">
                      <div>Brightness: {activeItem.ai_analysis.brightness || 70}%</div>
                      <div>Sharpness: {activeItem.ai_analysis.sharpness || 75}%</div>
                    </div>

                    {activeItem.ai_analysis.warnings && activeItem.ai_analysis.warnings.length > 0 && (
                      <div className="border-t border-zinc-800/40 pt-3.5 space-y-2">
                        <span className="text-[9px] text-rose-500 font-black uppercase tracking-wider block">AI Audit Alerts</span>
                        {activeItem.ai_analysis.warnings.map((warn, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-zinc-400 text-[11px] leading-relaxed font-semibold">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                            <span>{warn}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Room Navigator list */}
                <div className="space-y-2.5">
                  <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-wider">Property Story Navigation</h3>
                  <div className="space-y-1.5 max-h-[30vh] overflow-y-auto no-scrollbar">
                    {roomGroups.map((group) => {
                      const isActive = activeItem.category === group.label;
                      return (
                        <button
                          key={group.label}
                          onClick={() => {
                            setZoomLevel(1);
                            setPan({ x: 0, y: 0 });
                            setActiveIndex(group.startIndex);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left border cursor-pointer ${isActive ? 'bg-brand/10 border-brand/20 text-brand' : 'bg-zinc-900/30 border-transparent hover:bg-zinc-900/60 text-zinc-400'}`}
                        >
                          <span className="truncate">{group.label}</span>
                          <span className="text-[10px] bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded font-black">
                            {group.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Metadata properties */}
                <div className="text-[10px] text-zinc-500 font-semibold space-y-2 border-t border-zinc-900 pt-4">
                  <div>Version: Alpha v{activeItem.version || 1.0}</div>
                  {activeItem.created_at && (
                    <div>Registered: {new Date(activeItem.created_at).toLocaleDateString()}</div>
                  )}
                  {activeItem.size_bytes && (
                    <div>Resolution Size: {(activeItem.size_bytes / 1024).toFixed(1)} KB</div>
                  )}
                  {activeItem.edited && (
                    <div className="text-amber-500 font-bold">Processed via Image Studio (Non-destructive)</div>
                  )}
                </div>

              </div>

              {/* Close Sidebar helper hint */}
              <div className="text-[10px] text-zinc-600 text-center font-bold border-t border-zinc-900/60 pt-4 mt-6">
                Tip: Press Esc or double click image to close/zoom.
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AnimatePresence>
  );
};
