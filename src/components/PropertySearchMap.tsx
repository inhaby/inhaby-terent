import React, { useState, useEffect, useMemo, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { Property } from '../types';
import { MapPin, Star, ExternalLink, Sliders, Settings, ShieldCheck } from 'lucide-react';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

interface PropertySearchMapProps {
  properties: Property[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string) => void;
  centerLat?: number | null;
  centerLng?: number | null;
  isChooseLocationMode?: boolean;
  onLocationSelect?: (lat: number, lng: number) => void;
  isDark?: boolean;
}

export const PropertySearchMap: React.FC<PropertySearchMapProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
  centerLat = 12.9352, // Default to Koramangala
  centerLng = 77.6244,
  isChooseLocationMode = false,
  onLocationSelect,
  isDark = false,
}) => {
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);

  // Sync active marker if selected from parent list
  useEffect(() => {
    if (selectedPropertyId) {
      setActivePropertyId(selectedPropertyId);
    }
  }, [selectedPropertyId]);

  // Determine dynamic map center
  const mapCenter = useMemo(() => {
    if (isChooseLocationMode && centerLat && centerLng) {
      return { lat: centerLat, lng: centerLng };
    }
    if (selectedPropertyId) {
      const selectedProp = properties.find(p => p.id === selectedPropertyId);
      if (selectedProp && selectedProp.latitude && selectedProp.longitude) {
        return { lat: selectedProp.latitude, lng: selectedProp.longitude };
      }
    }
    // Average centers of visible properties
    const propsWithCoords = properties.filter(p => p.latitude !== undefined && p.longitude !== undefined);
    if (propsWithCoords.length > 0) {
      const sumLat = propsWithCoords.reduce((acc, p) => acc + (p.latitude || 0), 0);
      const sumLng = propsWithCoords.reduce((acc, p) => acc + (p.longitude || 0), 0);
      return { lat: sumLat / propsWithCoords.length, lng: sumLng / propsWithCoords.length };
    }
    return { lat: centerLat || 12.9352, lng: centerLng || 77.6244 };
  }, [properties, selectedPropertyId, centerLat, centerLng, isChooseLocationMode]);

  // Handle clicking markers
  const handleMarkerClick = (propId: string) => {
    setActivePropertyId(propId === activePropertyId ? null : propId);
    onSelectProperty(propId);
  };

  const handleMapClick = (e: any) => {
    // Check if clicking in location choose mode
    if (isChooseLocationMode && onLocationSelect && e.detail?.latLng) {
      const { lat, lng } = e.detail.latLng;
      onLocationSelect(lat, lng);
    } else {
      setActivePropertyId(null);
    }
  };

  // Find currently active property details for InfoWindow
  const activeProperty = useMemo(() => {
    return properties.find(p => p.id === activePropertyId);
  }, [properties, activePropertyId]);

  // Render Splash Setup Screen if GOOGLE_MAPS_PLATFORM_KEY is missing/unconfigured
  if (!hasValidKey) {
    return (
      <div className={`p-6 border border-dashed rounded-3xl flex flex-col justify-center items-center text-center h-full min-h-[350px] font-sans transition-colors ${
        isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-stone-50 border-stone-200 text-stone-700'
      }`}>
        <div className="w-16 h-16 bg-theme-accent-soft text-theme-accent rounded-full flex items-center justify-center mb-5 animate-bounce">
          <Settings size={28} className="stroke-[2.5]" />
        </div>
        <h4 className="font-serif text-lg font-black uppercase tracking-wider text-theme-text-primary">
          Google Maps View Blocked
        </h4>
        <p className="text-xs text-theme-text-secondary max-w-sm mt-3 leading-relaxed">
          Unlock an interactive fully-integrated real-time map view by configuring your secure Google Maps API Key.
        </p>
        
        <div className="w-full max-w-md bg-theme-surface border border-theme-border/60 rounded-2xl p-5 mt-6 text-left space-y-4">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center bg-theme-accent text-white w-5 h-5 rounded-full text-[10px] font-bold shrink-0 mt-0.5">1</span>
            <p className="text-xs text-theme-text-primary leading-relaxed font-semibold">
              Get an official Maps API Key from the{' '}
              <a 
                href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-theme-accent underline font-black"
              >
                Google Cloud Console
              </a>.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center bg-theme-accent text-white w-5 h-5 rounded-full text-[10px] font-bold shrink-0 mt-0.5">2</span>
            <div className="text-xs text-theme-text-secondary space-y-1">
              <p className="font-semibold text-theme-text-primary">Inject your key inside the platform secrets panel:</p>
              <ul className="list-disc pl-4 space-y-1 mt-1 font-mono text-[10px] text-theme-text-secondary">
                <li>Tap <strong>Settings</strong> (⚙️ gear icon, top-right)</li>
                <li>Go to <strong>Secrets</strong></li>
                <li>Save under name: <code>GOOGLE_MAPS_PLATFORM_KEY</code></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-theme-text-secondary/60 mt-5 font-bold tracking-wide uppercase">
          *The container will reload automatically to pick up your key.
        </p>
      </div>
    );
  }

  // Deterministic offset to shift location by 300m for privacy
  const getApproximateCoords = (id: string, lat: number, lng: number) => {
    const offsetCode = id.split('-').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const latOffset = ((offsetCode % 5) - 2) * 0.0012; // Small shift
    const lngOffset = (((offsetCode + 3) % 5) - 2) * 0.0012;
    return {
      lat: lat + latOffset,
      lng: lng + lngOffset
    };
  };

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-inner border border-theme-border flex-grow min-h-[350px]">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={mapCenter}
          center={mapCenter}
          defaultZoom={13}
          mapId="DEMO_MAP_ID"
          onClick={handleMapClick}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
          gestureHandling="cooperative"
        >
          {/* Location Picker Drag Pin for custom select coordinate mode */}
          {isChooseLocationMode && centerLat && centerLng && (
            <AdvancedMarker 
              position={mapCenter}
              draggable={true}
              onDragEnd={(e) => {
                if (onLocationSelect && e.latLng) {
                  onLocationSelect(e.latLng.lat(), e.latLng.lng());
                }
              }}
            >
              <Pin background="#E11D48" glyphColor="#fff" borderColor="#BE123C" scale={1.2} />
            </AdvancedMarker>
          )}

          {/* Regular Property Markers */}
          {!isChooseLocationMode && properties.map((prop) => {
            if (prop.latitude === undefined || prop.longitude === undefined) return null;
            const isHovered = prop.id === hoveredPropertyId;
            const isActive = prop.id === activePropertyId;

            // Compute shifted privacy coordinates so exact position is NEVER exposed on map
            const approxPos = getApproximateCoords(prop.id, prop.latitude, prop.longitude);

            return (
              <React.Fragment key={prop.id}>
                {/* Visual pulsating privacy radius circle when active or hovered */}
                {(isActive || isHovered) && (
                  <AdvancedMarker position={approxPos}>
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                      <div className="w-28 h-28 sm:w-36 sm:h-36 bg-amber-500/[0.08] dark:bg-amber-500/[0.12] border border-amber-500/30 border-dashed rounded-full animate-pulse"></div>
                    </div>
                  </AdvancedMarker>
                )}

                <AdvancedMarker
                  position={approxPos}
                  onClick={() => handleMarkerClick(prop.id)}
                  title={prop.title}
                >
                  <div 
                    onMouseEnter={() => setHoveredPropertyId(prop.id)}
                    onMouseLeave={() => setHoveredPropertyId(null)}
                    className={`px-2.5 py-1.5 rounded-full font-sans font-black text-[10px] md:text-xs transition-all duration-300 shadow-md ${
                      isActive 
                        ? 'bg-amber-500 text-white border-2 border-white scale-110' 
                        : isHovered
                          ? 'bg-theme-accent text-white border-2 border-white scale-105'
                          : 'bg-theme-surface border border-theme-border text-theme-text-primary'
                    }`}
                  >
                    ₹{prop.price >= 1000 ? `${(prop.price/1000).toFixed(0)}k` : prop.price}
                  </div>
                </AdvancedMarker>
              </React.Fragment>
            );
          })}

          {/* Render Active Property Detailed Popup inside InfoWindow at Shifted Privacy coords */}
          {!isChooseLocationMode && activeProperty && activeProperty.latitude && activeProperty.longitude && (() => {
            const approxPos = getApproximateCoords(activeProperty.id, activeProperty.latitude, activeProperty.longitude);
            return (
              <InfoWindow
                position={approxPos}
                onCloseClick={() => setActivePropertyId(null)}
                headerDisabled={true}
              >
                <div className="w-[180px] p-1 font-sans text-stone-900 leading-normal flex flex-col gap-2">
                  <div className="relative h-20 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    <img 
                      src={activeProperty.image} 
                      alt={activeProperty.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {activeProperty.verification_status === 'verified' && (
                      <span className="absolute top-1 left-1 bg-emerald-500/95 backdrop-blur-md text-white text-[6px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        VERIFIED
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-stone-500">
                        {activeProperty.property_type}
                      </span>
                      <div className="flex items-center gap-0.5 text-[8px] font-black text-amber-600">
                        <span>{activeProperty.rating?.toFixed(1) || '4.0'}</span>
                        <Star size={7} fill="currentColor" />
                      </div>
                    </div>

                    <h5 className="text-[10px] font-extrabold text-stone-900 leading-snug line-clamp-1">
                      {activeProperty.title}
                    </h5>

                    <p className="text-[8px] text-stone-500 truncate">
                      {activeProperty.location}
                    </p>

                    {/* Highly visible privacy disclosure indicator details */}
                    <div className="flex items-center gap-1.5 bg-amber-50/90 border border-amber-200/50 text-[#8a6d1c] px-1.5 py-1 rounded text-[7px] font-extrabold uppercase tracking-widest leading-none mt-1">
                      <ShieldCheck size={10} className="stroke-[2.5]" />
                      <span>Approximate Location</span>
                    </div>

                    <div className="border-t border-stone-200 pt-1.5 mt-1 flex justify-between items-center">
                      <span className="font-extrabold text-[10px] text-stone-900">
                        ₹{activeProperty.price?.toLocaleString()}
                      </span>
                      <button
                        onClick={() => onSelectProperty(activeProperty.id)}
                        className="text-[8px] font-bold uppercase tracking-wider text-theme-accent hover:underline flex items-center gap-0.5 cursor-pointer bg-transparent border-none"
                      >
                        <span>Explore</span>
                        <ExternalLink size={8} />
                      </button>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            );
          })()}
        </Map>
      </APIProvider>
    </div>
  );
};
