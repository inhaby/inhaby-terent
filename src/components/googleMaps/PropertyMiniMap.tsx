import React, { useState } from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useGoogleMaps } from './useGoogleMaps';
import { getDisplayCoordinates, getDisplayAddress, Coordinates, DEFAULT_ZOOM, LIGHT_MODE_STYLES, DARK_MODE_STYLES } from '@inhaby/shared';

interface PropertyMiniMapProps {
  propertyId: string;
  latitude: number;
  longitude: number;
  area: string;
  city: string;
  pincode: string;
  buildingName: string;
  houseNumber: string;
  hasExactAccess: boolean; // True if Admin, Owner, or Approved Tenant
  isDark?: boolean;
  onOpenFullMap?: () => void;
}

export const PropertyMiniMap: React.FC<PropertyMiniMapProps> = ({
  propertyId,
  latitude,
  longitude,
  area,
  city,
  pincode,
  buildingName,
  houseNumber,
  hasExactAccess,
  isDark = false,
  onOpenFullMap
}) => {
  const { status, error } = useGoogleMaps();
  const [copied, setCopied] = useState(false);

  const displayCoords = getDisplayCoordinates(propertyId, latitude, longitude, hasExactAccess);
  const displayAddress = getDisplayAddress(area, city, pincode, buildingName, houseNumber, hasExactAccess);

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div style={isDark ? darkStyles.container : lightStyles.container}>
      {/* Map Surface */}
      <div style={mapWrapperStyle}>
        {status === 'error' ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            background: isDark ? '#27272a' : '#f4f4f5',
            color: isDark ? '#a1a1aa' : '#71717a',
            padding: '16px',
            textAlign: 'center',
            fontSize: '11px',
            fontFamily: 'system-ui'
          }}>
            <span style={{ fontSize: '20px', marginBottom: '4px' }}>🗺️</span>
            <strong>Map Unavailable</strong>
            <span style={{ fontSize: '9px', marginTop: '2px', opacity: 0.8 }}>
              {error?.message || 'Google Maps key is not configured.'}
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
            fontSize: '11px',
            fontFamily: 'system-ui'
          }}>
            <span>Loading Map Surface...</span>
          </div>
        ) : (
          <>
            <Map
              defaultCenter={displayCoords}
              center={displayCoords}
              defaultZoom={DEFAULT_ZOOM - 1}
              mapId="DEMO_MAP_ID"
              styles={isDark ? DARK_MODE_STYLES : LIGHT_MODE_STYLES}
              disableDefaultUI={true}
              gestureHandling="none"
              style={{ width: '100%', height: '100%' }}
            >
              {/* Approximate Visual Circle */}
              {!hasExactAccess && (
                <AdvancedMarker position={displayCoords}>
                  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                    <div style={isDark ? darkStyles.privacyCircle : lightStyles.privacyCircle} />
                  </div>
                </AdvancedMarker>
              )}

              <AdvancedMarker position={displayCoords}>
                <Pin background={hasExactAccess ? '#10b981' : '#f59e0b'} glyphColor="#fff" scale={1.0} />
              </AdvancedMarker>
            </Map>

            {!hasExactAccess && (
              <div style={privacyBadgeStyle}>
                🔒 Approximate Privacy Radius (100m)
              </div>
            )}
          </>
        )}
      </div>

      {/* Info Card Details */}
      <div style={infoCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4 style={addressTitleStyle}>Property Location</h4>
            <p style={addressTextStyle}>{displayAddress}</p>
          </div>
          <span style={{
            ...statusBadgeStyle,
            background: hasExactAccess ? '#ecfdf5' : '#fffbeb',
            color: hasExactAccess ? '#047857' : '#b45309'
          }}>
            {hasExactAccess ? 'Exact Pin' : 'Approx Location'}
          </span>
        </div>

        <div style={btnGridStyle}>
          {onOpenFullMap && (
            <button type="button" onClick={onOpenFullMap} style={actionButtonStyle}>
              🌐 Open Full Map & Commute
            </button>
          )}
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={linkButtonStyle}>
            🗺️ Open in Google Maps
          </a>
          <button type="button" onClick={handleCopyCoords} style={actionButtonStyle}>
            📋 {copied ? 'Copied!' : 'Copy Coordinates'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const mapWrapperStyle: React.CSSProperties = {
  position: 'relative',
  height: '180px',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid rgba(228,228,231,0.2)',
};

const privacyBadgeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '12px',
  left: '12px',
  background: 'rgba(245, 158, 11, 0.9)',
  backdropFilter: 'blur(4px)',
  color: 'white',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '10px',
  fontWeight: 'bold',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};

const infoCardStyle: React.CSSProperties = {
  marginTop: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const addressTitleStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: '#71717a',
  margin: '0 0 4px 0',
};

const addressTextStyle: React.CSSProperties = {
  fontSize: '13px',
  lineHeight: '1.5',
  margin: 0,
  fontWeight: '600',
};

const statusBadgeStyle: React.CSSProperties = {
  padding: '4px 8px',
  borderRadius: '6px',
  fontSize: '9px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
};

const btnGridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
};

const actionButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: '8px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  background: 'rgba(244,244,245,0.08)',
  border: '1px solid rgba(228,228,231,0.15)',
  borderRadius: '8px',
  cursor: 'pointer',
  textAlign: 'center',
  color: 'inherit',
  whiteSpace: 'nowrap',
};

const linkButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: '8px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  background: 'rgba(244,244,245,0.08)',
  border: '1px solid rgba(228,228,231,0.15)',
  borderRadius: '8px',
  cursor: 'pointer',
  textAlign: 'center',
  color: 'inherit',
  textDecoration: 'none',
  display: 'inline-block',
  whiteSpace: 'nowrap',
};

// Light / Dark Theme configs
const lightStyles = {
  container: { color: '#18181b', fontFamily: 'system-ui' },
  privacyCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'rgba(245, 158, 11, 0.08)',
    border: '2px dashed rgba(245, 158, 11, 0.4)',
    animation: 'pulse 2s infinite',
  },
};

const darkStyles = {
  container: { color: '#f4f4f5', fontFamily: 'system-ui' },
  privacyCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'rgba(245, 158, 11, 0.12)',
    border: '2px dashed rgba(245, 158, 11, 0.5)',
    animation: 'pulse 2s infinite',
  },
};
