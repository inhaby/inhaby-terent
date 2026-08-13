import React, { useState } from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useGoogleMaps } from './useGoogleMaps';
import { getDisplayCoordinates, Coordinates, DEFAULT_ZOOM, LIGHT_MODE_STYLES, DARK_MODE_STYLES } from '@inhaby/shared';
import { NearbyPlacesCard } from './NearbyPlacesCard';

interface PropertyFullMapProps {
  propertyId: string;
  latitude: number;
  longitude: number;
  hasExactAccess: boolean;
  isDark?: boolean;
  onClose?: () => void;
}

export const PropertyFullMap: React.FC<PropertyFullMapProps> = ({
  propertyId,
  latitude,
  longitude,
  hasExactAccess,
  isDark = false,
  onClose
}) => {
  const { status, error } = useGoogleMaps();
  const [mapType, setMapType] = useState<'roadmap' | 'hybrid'>('roadmap');

  const displayCoords = getDisplayCoordinates(propertyId, latitude, longitude, hasExactAccess);

  return (
    <div style={isDark ? darkStyles.container : lightStyles.container}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>Interactive Map & Travel Explorer</h3>
        {onClose && (
          <button type="button" onClick={onClose} style={closeButtonStyle}>
            ✕ Close
          </button>
        )}
      </div>

      <div style={layoutGridStyle}>
        {/* Main Map Box */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={mapOuterContainerStyle}>
            {status === 'error' ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                background: isDark ? '#27272a' : '#f4f4f5',
                color: isDark ? '#a1a1aa' : '#71717a',
                padding: '24px',
                textAlign: 'center',
                fontSize: '12px',
                fontFamily: 'system-ui'
              }}>
                <span style={{ fontSize: '32px', marginBottom: '8px' }}>🗺️</span>
                <strong>Google Maps Unavailable</strong>
                <span style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
                  {error?.message || 'Google Maps API key is not configured.'}
                </span>
              </div>
            ) : status === 'loading' ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                background: isDark ? '#27272a' : '#f4f4f5',
                color: isDark ? '#a1a1aa' : '#71717a',
                fontSize: '12px',
                fontFamily: 'system-ui'
              }}>
                <span>Loading Map surface...</span>
              </div>
            ) : (
              <Map
              defaultCenter={displayCoords}
              center={displayCoords}
              defaultZoom={DEFAULT_ZOOM}
              mapTypeId={mapType}
              mapId="DEMO_MAP_ID"
              styles={isDark ? DARK_MODE_STYLES : LIGHT_MODE_STYLES}
              disableDefaultUI={true}
              style={{ width: '100%', height: '100%' }}
            >
              {/* Privacy Radius Circle */}
              {!hasExactAccess && (
                <AdvancedMarker position={displayCoords}>
                  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                    <div style={isDark ? darkStyles.privacyCircle : lightStyles.privacyCircle} />
                  </div>
                </AdvancedMarker>
              )}

              <AdvancedMarker position={displayCoords}>
                <Pin background={hasExactAccess ? '#10b981' : '#f59e0b'} glyphColor="#fff" scale={1.2} />
              </AdvancedMarker>
            </Map>
          )}

            {/* Map Type Overlay controls */}
            <div style={mapControlsStyle}>
              <button
                type="button"
                onClick={() => setMapType('roadmap')}
                style={{ ...mapTypeButtonStyle, fontWeight: mapType === 'roadmap' ? 'bold' : 'normal' }}
              >
                Roadmap
              </button>
              <button
                type="button"
                onClick={() => setMapType('hybrid')}
                style={{ ...mapTypeButtonStyle, fontWeight: mapType === 'hybrid' ? 'bold' : 'normal' }}
              >
                Satellite
              </button>
            </div>
          </div>

          <div style={privacyDisclosureStyle}>
            {hasExactAccess ? (
              <span style={{ color: '#059669' }}>
                🟢 Verified precise address and GPS coordinate access unlocked.
              </span>
            ) : (
              <span style={{ color: '#d97706' }}>
                🔒 Exact location is obfuscated within 100-150m for safety. Fully unlocked after Visit Approval.
              </span>
            )}
          </div>
        </div>

        {/* Nearby Places Section */}
        <div style={{ flex: 1 }}>
          <NearbyPlacesCard coordinates={displayCoords} isDark={isDark} />
        </div>
      </div>
    </div>
  );
};

// Styles
const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold',
  margin: 0,
};

const closeButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  background: 'rgba(239, 68, 68, 0.1)',
  color: '#ef4444',
  border: '1px solid rgba(239, 68, 68, 0.2)',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 'bold',
};

const layoutGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  flexWrap: 'wrap',
};

const mapOuterContainerStyle: React.CSSProperties = {
  position: 'relative',
  height: '350px',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid rgba(228,228,231,0.2)',
  flexGrow: 1,
};

const mapControlsStyle: React.CSSProperties = {
  position: 'absolute',
  top: '12px',
  left: '12px',
  display: 'flex',
  gap: '6px',
  zIndex: 10,
};

const mapTypeButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  background: 'white',
  border: '1px solid #d4d4d8',
  borderRadius: '8px',
  fontSize: '10px',
  fontWeight: 'bold',
  color: '#27272a',
  cursor: 'pointer',
};

const privacyDisclosureStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 'bold',
  padding: '10px 14px',
  background: 'rgba(244,244,245,0.06)',
  border: '1px solid rgba(228,228,231,0.1)',
  borderRadius: '12px',
};

// Light / Dark Theme configs
const lightStyles = {
  container: { color: '#18181b', fontFamily: 'system-ui', width: '100%' },
  privacyCircle: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    background: 'rgba(245, 158, 11, 0.08)',
    border: '2px dashed rgba(245, 158, 11, 0.4)',
    animation: 'pulse 2s infinite',
  },
};

const darkStyles = {
  container: { color: '#f4f4f5', fontFamily: 'system-ui', width: '100%' },
  privacyCircle: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    background: 'rgba(245, 158, 11, 0.12)',
    border: '2px dashed rgba(245, 158, 11, 0.5)',
    animation: 'pulse 2s infinite',
  },
};
