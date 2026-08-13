import React, { useState, useEffect } from 'react';
import { PinnedLocation, fetchPinnedLocations, pinLocation, unpinLocation } from '@inhaby/shared';

interface SmartSearchDropdownProps {
  userId: string;
  query: string;
  isDark?: boolean;
  recentSearches: string[];
  onClearRecent: () => void;
  onSelectSearch: (term: string, lat?: number, lng?: number) => void;
}

export const SmartSearchDropdown: React.FC<SmartSearchDropdownProps> = ({
  userId,
  query,
  isDark = false,
  recentSearches,
  onClearRecent,
  onSelectSearch,
}) => {
  const [pinned, setPinned] = useState<PinnedLocation[]>([]);

  const loadPinned = async () => {
    if (!userId) return;
    const data = await fetchPinnedLocations(userId);
    setPinned(data);
  };

  useEffect(() => {
    loadPinned();
  }, [userId]);

  const handlePin = async (e: React.MouseEvent, name: string, placeId: string, lat: number, lng: number) => {
    e.stopPropagation();
    await pinLocation(userId, name, placeId, lat, lng);
    loadPinned();
  };

  const handleUnpin = async (e: React.MouseEvent, placeId: string) => {
    e.stopPropagation();
    await unpinLocation(userId, placeId);
    loadPinned();
  };

  // Popular search items list
  const popularSearches = [
    { term: 'PG near IIT Delhi', lat: 28.5398, lng: 77.1987 },
    { term: 'Flats in HSR Layout', lat: 12.9141, lng: 77.6412 },
    { term: 'Apartments near Electronic City', lat: 12.8452, lng: 77.6602 },
    { term: 'Hostels near Delhi University', lat: 28.6904, lng: 77.2166 },
    { term: 'PG near Infosys Mysore', lat: 12.3556, lng: 76.5987 }
  ];

  const containerStyle = isDark ? darkStyles.container : lightStyles.container;
  const sectionTitleStyle = isDark ? darkStyles.sectionTitle : lightStyles.sectionTitle;
  const itemStyle = isDark ? darkStyles.item : lightStyles.item;

  if (query.trim().length > 0) {
    // Return auto-suggestions block
    return (
      <div style={containerStyle}>
        <div style={sectionTitleStyle}>
          <span>💡 Suggestions Category matches</span>
        </div>
        
        {/* Category: Metro */}
        <div 
          onClick={() => onSelectSearch(`Metro stations near ${query}`)}
          style={itemStyle}
        >
          🚇 Metro Stations near "{query}"
        </div>
        
        {/* Category: Hospitals */}
        <div 
          onClick={() => onSelectSearch(`Hospitals near ${query}`)}
          style={itemStyle}
        >
          🏥 Hospitals & Healthcare near "{query}"
        </div>

        {/* Category: Colleges */}
        <div 
          onClick={() => onSelectSearch(`Colleges near ${query}`)}
          style={itemStyle}
        >
          🎓 Universities & Colleges near "{query}"
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* 1. Pinned Locations */}
      {pinned.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={sectionTitleStyle}>
            <span>📌 Pinned Locations ({pinned.length})</span>
          </div>
          {pinned.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => onSelectSearch(item.name, item.coordinates.lat, item.coordinates.lng)}
              style={pinnedRowStyle}
            >
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>📍 {item.name}</span>
              <button 
                type="button"
                onClick={(e) => handleUnpin(e, item.placeId)}
                style={unpinBtnStyle}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 2. Recent Searches */}
      {recentSearches.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ ...sectionTitleStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🕒 Recent Searches</span>
            <button 
              type="button" 
              onClick={onClearRecent}
              style={clearBtnStyle}
            >
              Clear All
            </button>
          </div>
          <div style={recentGridStyle}>
            {recentSearches.slice(0, 6).map((term, idx) => (
              <div 
                key={idx}
                onClick={() => onSelectSearch(term)}
                style={recentItemStyle}
              >
                🔍 {term}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Popular Searches */}
      <div>
        <div style={sectionTitleStyle}>
          <span>🔥 Popular Localities & Institutions</span>
        </div>
        <div style={recentGridStyle}>
          {popularSearches.map((pop, idx) => (
            <div 
              key={idx}
              onClick={() => onSelectSearch(pop.term, pop.lat, pop.lng)}
              style={popularItemStyle}
            >
              ✨ {pop.term}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Custom layout Styles
const pinnedRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  background: 'rgba(239, 68, 68, 0.05)',
  border: '1px solid rgba(239, 68, 68, 0.1)',
  marginBottom: '6px',
};

const unpinBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '9px',
  fontWeight: 'black',
  textTransform: 'uppercase',
  color: '#ef4444',
  cursor: 'pointer',
};

const clearBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '9px',
  fontWeight: 'black',
  textTransform: 'uppercase',
  color: '#71717a',
  cursor: 'pointer',
};

const recentGridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
};

const recentItemStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 'bold',
  background: 'rgba(113, 113, 122, 0.08)',
  border: '1px solid rgba(113, 113, 122, 0.15)',
  padding: '6px 12px',
  borderRadius: '16px',
  cursor: 'pointer',
};

const popularItemStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 'bold',
  background: 'rgba(245, 158, 11, 0.06)',
  border: '1px solid rgba(245, 158, 11, 0.15)',
  color: '#d97706',
  padding: '6px 12px',
  borderRadius: '16px',
  cursor: 'pointer',
};

const lightStyles = {
  container: {
    fontFamily: 'system-ui',
    padding: '12px',
    color: '#18181b',
  },
  sectionTitle: {
    fontSize: '9px',
    fontWeight: 'black' as const,
    textTransform: 'uppercase' as const,
    color: '#71717a',
    letterSpacing: '0.05em',
    marginBottom: '8px',
  },
  item: {
    padding: '10px 12px',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '4px',
    border: '1px solid #e4e4e7',
    background: '#ffffff',
  },
};

const darkStyles = {
  container: {
    fontFamily: 'system-ui',
    padding: '12px',
    color: '#f4f4f5',
  },
  sectionTitle: {
    fontSize: '9px',
    fontWeight: 'black' as const,
    textTransform: 'uppercase' as const,
    color: '#a1a1aa',
    letterSpacing: '0.05em',
    marginBottom: '8px',
  },
  item: {
    padding: '10px 12px',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '4px',
    border: '1px solid #27272a',
    background: '#18181b',
  },
};
