import { useContext } from 'react';
import { GoogleMapsContext, GoogleMapsContextType } from './GoogleMapsProvider';

/**
 * Access Google Maps load status, error state, and configuration parameters
 */
export function useGoogleMaps(): GoogleMapsContextType {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
}
