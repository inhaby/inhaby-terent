import React, { createContext, useState, useEffect } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { loadGoogleMaps, GoogleMapsLoadState, MapError } from '@inhaby/shared';

export interface GoogleMapsContextType extends GoogleMapsLoadState {
  apiKeyConfigured: boolean;
}

export const GoogleMapsContext = createContext<GoogleMapsContextType | null>(null);

interface GoogleMapsProviderProps {
  children: React.ReactNode;
  fallbackComponent?: React.ComponentType<{ error: MapError; onRetry: () => void }>;
}

export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({
  children,
  fallbackComponent: Fallback
}) => {
  const [loadState, setLoadState] = useState<GoogleMapsLoadState>({
    status: 'loading',
    error: null,
  });

  const apiKey =
    (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY ||
    (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    '';

  const apiKeyConfigured = Boolean(apiKey) && apiKey !== 'YOUR_API_KEY';

  const triggerLoad = async () => {
    if (!apiKeyConfigured) {
      setLoadState({
        status: 'error',
        error: {
          type: 'INVALID_KEY',
          message: 'Google Maps API key is not configured. Please supply VITE_GOOGLE_MAPS_API_KEY.',
        },
      });
      return;
    }

    if (!navigator.onLine) {
      setLoadState({
        status: 'error',
        error: {
          type: 'OFFLINE',
          message: 'Network is offline. Please check your internet connection and try again.',
        },
      });
      return;
    }

    setLoadState({ status: 'loading', error: null });

    try {
      await loadGoogleMaps();
      setLoadState({ status: 'loaded', error: null });
    } catch (err: any) {
      console.error('[Google Maps Load Error]', err);
      let errorType: MapError['type'] = 'UNAVAILABLE';
      let message = 'Failed to load Google Maps SDK.';

      const errString = String(err).toLowerCase();
      if (errString.includes('quota') || errString.includes('limit')) {
        errorType = 'QUOTA_EXCEEDED';
        message = 'Google Maps request quota exceeded for this API key.';
      } else if (errString.includes('key') || errString.includes('auth')) {
        errorType = 'INVALID_KEY';
        message = 'Google Maps authorization failed. Invalid API Key.';
      } else if (!navigator.onLine) {
        errorType = 'OFFLINE';
        message = 'Connection lost during initialization.';
      }

      setLoadState({
        status: 'error',
        error: {
          type: errorType,
          message,
          originalError: err,
        },
      });
    }
  };

  useEffect(() => {
    triggerLoad();

    const handleOnline = () => {
      if (loadState.status === 'error' && loadState.error?.type === 'OFFLINE') {
        triggerLoad();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleRetry = () => {
    triggerLoad();
  };

  return (
    <GoogleMapsContext.Provider value={{ ...loadState, apiKeyConfigured }}>
      {apiKeyConfigured ? (
        <APIProvider apiKey={apiKey} version="weekly">
          {children}
        </APIProvider>
      ) : (
        children
      )}
    </GoogleMapsContext.Provider>
  );
};

export const GoogleMapsFallback: React.FC<{ error?: MapError | null; onRetry?: () => void }> = ({ error, onRetry }) => {
  return (
    <div style={fallbackContainerStyle}>
      <div style={cardStyle}>
        <div style={iconContainerStyle}>🗺️</div>
        <h3 style={titleStyle}>Google Maps Loading Failed</h3>
        <p style={messageStyle}>{error?.message || 'Failed to load Google Maps SDK.'}</p>
        {onRetry && (
          <button style={buttonStyle} onClick={onRetry}>
            Retry Connection
          </button>
        )}
      </div>
    </div>
  );
};

// Vanilla Inline CSS Styles for Premium Wow Aesthetics (Harmonious Slate Theme)
const fallbackContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  background: '#18181b', // Slate 900
  color: '#f4f4f5',
  borderRadius: '24px',
  minHeight: '350px',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'Inter, system-ui, sans-serif',
  border: '1px solid #27272a'
};

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: '400px',
  padding: '30px',
  background: 'rgba(39, 39, 42, 0.4)', // Slate 800 blur
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(63, 63, 70, 0.4)',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
};

const iconContainerStyle: React.CSSProperties = {
  fontSize: '48px',
  marginBottom: '16px',
  animation: 'pulse 2s infinite'
};

const titleStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 700,
  margin: '0 0 10px 0',
  letterSpacing: '-0.025em',
  color: '#f4f4f5'
};

const messageStyle: React.CSSProperties = {
  fontSize: '13px',
  lineHeight: '1.6',
  margin: '0 0 24px 0',
  color: '#a1a1aa' // Slate 400
};

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#18181b',
  background: '#f4f4f5',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'transform 0.2s, background 0.2s',
  boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)'
};
