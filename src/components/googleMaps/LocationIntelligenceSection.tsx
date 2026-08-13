import React, { useState } from 'react';
import { LocationIntelligence, NearbyPlace, calculateTravelTimes } from '@inhaby/shared';

interface LocationIntelligenceSectionProps {
  intelligence: LocationIntelligence;
  isDark?: boolean;
}

export const LocationIntelligenceSection: React.FC<LocationIntelligenceSectionProps> = ({
  intelligence,
  isDark = false,
}) => {
  const { scores, highlights, places, tags, areaProfile } = intelligence;
  const [activeCategory, setActiveCategory] = useState<string>('Transport');

  // Categories for the Tab selector
  const categories = ['Transport', 'Healthcare', 'Education', 'Lifestyle'];

  // Filter places based on categories
  const filteredPlaces = places.filter(place => {
    if (activeCategory === 'Transport') {
      return place.category === 'Metro Station' || place.category === 'Bus Stop' || place.category === 'Railway Station';
    }
    if (activeCategory === 'Healthcare') {
      return place.category === 'Hospital' || place.category === 'Clinic' || place.category === 'Pharmacy';
    }
    if (activeCategory === 'Education') {
      return place.category === 'School' || place.category === 'College' || place.category === 'University';
    }
    if (activeCategory === 'Lifestyle') {
      return place.category === 'Food & Dining' || place.category === 'Cafe' || place.category === 'Gym' || place.category === 'Supermarket';
    }
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981'; // Green
    if (score >= 70) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const containerTheme = isDark ? darkStyles.container : lightStyles.container;
  const scoreCardTheme = isDark ? darkStyles.scoreCard : lightStyles.scoreCard;
  const itemTheme = isDark ? darkStyles.item : lightStyles.item;
  const tabThemeActive = isDark ? darkStyles.tabActive : lightStyles.tabActive;
  const tabThemeInactive = isDark ? darkStyles.tabInactive : lightStyles.tabInactive;

  return (
    <div style={containerTheme}>
      <h3 style={sectionTitleStyle}>Location Intelligence</h3>
      
      {/* 1. Locality Profile */}
      <p style={localitySubtextStyle}>
        📍 {areaProfile.locality}, {areaProfile.city} • Pincode: {areaProfile.pincode}
      </p>

      {/* 2. Smart Tags */}
      {tags.length > 0 && (
        <div style={tagsContainerStyle}>
          {tags.map((tag, idx) => (
            <span key={idx} style={tagBadgeStyle}>
              ✨ {tag}
            </span>
          ))}
        </div>
      )}

      {/* 3. Core Scores & Insights Grid */}
      <div style={gridStyle}>
        {/* Overall Score Circle */}
        <div style={scoreCardTheme}>
          <div style={circleContainerStyle}>
            <div style={{
              ...scoreCircleStyle,
              borderColor: getScoreColor(scores.overall),
            }}>
              <span style={scoreTextStyle}>{scores.overall}</span>
              <span style={scoreLabelStyle}>Overall Score</span>
            </div>
          </div>
          
          <div style={scoreMetricsListStyle}>
            <div style={metricRowStyle}>
              <span style={metricLabelStyle}>Connectivity</span>
              <span style={{ ...metricValueStyle, color: getScoreColor(scores.connectivity) }}>{scores.connectivity}%</span>
            </div>
            <div style={metricRowStyle}>
              <span style={metricLabelStyle}>Transport</span>
              <span style={{ ...metricValueStyle, color: getScoreColor(scores.transport) }}>{scores.transport}%</span>
            </div>
            <div style={metricRowStyle}>
              <span style={metricLabelStyle}>Essentials</span>
              <span style={{ ...metricValueStyle, color: getScoreColor(scores.essentials) }}>{scores.essentials}%</span>
            </div>
            <div style={metricRowStyle}>
              <span style={metricLabelStyle}>Accessibility</span>
              <span style={{ ...metricValueStyle, color: getScoreColor(scores.accessibility) }}>{scores.accessibility}%</span>
            </div>
          </div>
        </div>

        {/* Top Location Highlights */}
        <div style={scoreCardTheme}>
          <h4 style={subTitleStyle}>Location Highlights</h4>
          <div style={highlightsContainerStyle}>
            {highlights.map((hl, idx) => (
              <div key={idx} style={highlightRowStyle}>
                <span style={checkIconStyle}>✔</span>
                <span style={highlightTextStyle}>{hl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Travel Summary & Commute Planner */}
      <div style={{ marginTop: '16px' }}>
        <h4 style={subTitleStyle}>📍 Commute Planner & Essentials</h4>
        
        {/* Tab Selector */}
        <div style={tabsContainerStyle}>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={activeCategory === cat ? tabThemeActive : tabThemeInactive}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Places List with Multi-Mode Travel Options */}
        <div style={placesListStyle}>
          {filteredPlaces.length === 0 ? (
            <div style={emptyPlacesStyle}>No nearby {activeCategory.toLowerCase()} points discovered within 1.5 km.</div>
          ) : (
            filteredPlaces.map((place, idx) => (
              <div key={idx} style={itemTheme}>
                <div style={placeInfoStyle}>
                  <strong style={placeNameStyle}>{place.name}</strong>
                  <span style={placeCategoryStyle}>{place.category}</span>
                </div>
                
                {/* Travel Options Panel */}
                <div style={travelOptionsGridStyle}>
                  {calculateTravelTimes(place.distanceMeters).map((t, idxMode) => (
                    <div key={idxMode} style={travelModeCardStyle}>
                      <span style={modeIconStyle}>
                        {t.mode === 'walking' && '🚶'}
                        {t.mode === 'cycling' && '🚲'}
                        {t.mode === 'driving' && '🚗'}
                        {t.mode === 'transit' && '🚇'}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={travelDurationTextStyle}>{t.duration}</span>
                        <span style={travelDistanceSubtextStyle}>{t.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Styling Parameters
const sectionTitleStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
};

const localitySubtextStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#71717a',
  margin: '0 0 12px 0',
};

const tagsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '16px',
};

const tagBadgeStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 'bold',
  background: 'rgba(59, 130, 246, 0.08)',
  border: '1px solid rgba(59, 130, 246, 0.2)',
  color: '#2563eb',
  padding: '4px 8px',
  borderRadius: '16px',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '16px',
  marginBottom: '16px',
};

const circleContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px',
};

const scoreCircleStyle: React.CSSProperties = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  border: '6px solid',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
};

const scoreTextStyle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: 'black',
  lineHeight: 1,
};

const scoreLabelStyle: React.CSSProperties = {
  fontSize: '9px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: '#71717a',
  marginTop: '2px',
};

const scoreMetricsListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const metricRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '12px',
  fontWeight: '600',
  borderBottom: '1px solid rgba(228,228,231,0.4)',
  paddingBottom: '4px',
};

const metricLabelStyle: React.CSSProperties = {
  color: '#71717a',
};

const metricValueStyle: React.CSSProperties = {
  fontWeight: 'bold',
};

const subTitleStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: '#71717a',
  margin: '0 0 12px 0',
};

const highlightsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const highlightRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const checkIconStyle: React.CSSProperties = {
  color: '#10b981',
  fontWeight: 'bold',
};

const highlightTextStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '600',
};

const tabsContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '6px',
  marginBottom: '12px',
  borderBottom: '1px solid rgba(228,228,231,0.3)',
  paddingBottom: '8px',
};

const placesListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const emptyPlacesStyle: React.CSSProperties = {
  padding: '24px 0',
  textAlign: 'center',
  color: '#71717a',
  fontSize: '12px',
  fontWeight: 'bold',
};

const placeInfoStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
};

const placeNameStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 'bold',
};

const placeCategoryStyle: React.CSSProperties = {
  fontSize: '10px',
  color: '#71717a',
};

const travelOptionsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
  gap: '8px',
  marginTop: '10px',
  borderTop: '1px solid rgba(228,228,231,0.2)',
  paddingTop: '8px',
};

const travelModeCardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  background: 'rgba(244,244,245,0.4)',
  padding: '6px 8px',
  borderRadius: '8px',
};

const modeIconStyle: React.CSSProperties = {
  fontSize: '14px',
};

const travelDurationTextStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 'bold',
};

const travelDistanceSubtextStyle: React.CSSProperties = {
  fontSize: '8px',
  color: '#71717a',
};

// Light / Dark Theme styling presets
const lightStyles = {
  container: { color: '#18181b', fontFamily: 'system-ui', width: '100%' },
  scoreCard: {
    background: '#ffffff',
    border: '1px solid #e4e4e7',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
  },
  item: {
    background: '#ffffff',
    border: '1px solid #e4e4e7',
    borderRadius: '16px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  tabActive: {
    padding: '6px 12px',
    background: '#27272a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  tabInactive: {
    padding: '6px 12px',
    background: 'none',
    color: '#71717a',
    border: 'none',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

const darkStyles = {
  container: { color: '#f4f4f5', fontFamily: 'system-ui', width: '100%' },
  scoreCard: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
  },
  item: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  tabActive: {
    padding: '6px 12px',
    background: '#e4e4e7',
    color: '#09090b',
    border: 'none',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  tabInactive: {
    padding: '6px 12px',
    background: 'none',
    color: '#a1a1aa',
    border: 'none',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};
