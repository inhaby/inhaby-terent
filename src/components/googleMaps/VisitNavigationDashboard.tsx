import React, { useState, useEffect } from 'react';
import { VisitRecord, VisitStatus, verifyVisitArrival, logVisitEvent } from '@inhaby/shared';

interface VisitNavigationDashboardProps {
  visit: VisitRecord;
  propertyCoords: { lat: number; lng: number };
  exactAddress: string;
  isDark?: boolean;
  onStatusChange?: (newStatus: VisitStatus) => void;
}

export const VisitNavigationDashboard: React.FC<VisitNavigationDashboardProps> = ({
  visit,
  propertyCoords,
  exactAddress,
  isDark = false,
  onStatusChange,
}) => {
  const [status, setStatus] = useState<VisitStatus>(visit.status);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  
  // Feedback Ratings State
  const [feedback, setFeedback] = useState({
    locationAccuracy: 5,
    propertyCondition: 5,
    ownerBehaviour: 5,
    photoAccuracy: 5,
    cleanliness: 5,
    overallExperience: 5,
    comment: ''
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const containerStyle = isDark ? darkStyles.container : lightStyles.container;
  const sectionTitleStyle = isDark ? darkStyles.sectionTitle : lightStyles.sectionTitle;
  const cardStyle = isDark ? darkStyles.card : lightStyles.card;

  const handleStartJourney = async () => {
    const next: VisitStatus = 'Tenant Started Journey';
    const res = await logVisitEvent(visit.id, next);
    if (!res.error) {
      setStatus(next);
      if (onStatusChange) onStatusChange(next);
    }
  };

  const handleMarkArrived = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }
    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const tenantCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const { isVerified, distance } = verifyVisitArrival(tenantCoords, propertyCoords);
        const next: VisitStatus = 'Tenant Arrived';
        const res = await logVisitEvent(visit.id, next, {
          gpsSnapshot: {
            lat: tenantCoords.lat,
            lng: tenantCoords.lng,
            isVerified,
            distanceMeters: Math.round(distance)
          }
        });

        setGpsLoading(false);
        if (!res.error) {
          setStatus(next);
          if (onStatusChange) onStatusChange(next);
          if (!isVerified) {
            setGpsError(`Warning: GPS indicates you are ${Math.round(distance)}m away from property.`);
          }
        }
      },
      (err) => {
        setGpsLoading(false);
        setGpsError(`Could not query GPS: ${err.message}. Please complete manually.`);
      }
    );
  };

  const handleVerifyStart = async () => {
    const next: VisitStatus = 'Visit In Progress';
    const res = await logVisitEvent(visit.id, next);
    if (!res.error) {
      setStatus(next);
      if (onStatusChange) onStatusChange(next);
    }
  };

  const handleCompleteVisit = async () => {
    const next: VisitStatus = 'Visit Completed';
    const res = await logVisitEvent(visit.id, next);
    if (!res.error) {
      setStatus(next);
      if (onStatusChange) onStatusChange(next);
    }
  };

  const submitFeedback = async () => {
    const next: VisitStatus = 'Completed';
    const res = await logVisitEvent(visit.id, next, {
      feedbackRating: feedback
    });
    if (!res.error) {
      setStatus(next);
      setFeedbackSubmitted(true);
      if (onStatusChange) onStatusChange(next);
    }
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  // Pre-approved banner state check
  const isApproved = ['Approved', 'Navigation Available', 'Tenant Started Journey', 'Tenant Arrived', 'Visit In Progress', 'Visit Completed', 'Feedback Pending', 'Completed'].includes(status);

  if (!isApproved) {
    return (
      <div style={containerStyle}>
        <div style={{ ...cardStyle, textAlign: 'center', padding: '24px' }}>
          <span style={{ fontSize: '32px' }}>🔒</span>
          <h4 style={{ fontWeight: 'bold', fontSize: '14px', marginTop: '12px' }}>Visit Details Restricted</h4>
          <p style={{ fontSize: '11px', color: isDark ? '#a1a1aa' : '#71717a', marginTop: '4px' }}>
            Navigation parameters, exact building numbers, entry codes and phone keys are locked until the owner approves your visit slot.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>🚀 Visit Navigation Dashboard</h3>

      {/* 1. Timeline lifecycle badge */}
      <div style={{ ...cardStyle, background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.15)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '9px', fontWeight: 'black', textTransform: 'uppercase', color: '#3b82f6' }}>Current Visit Lifecycle</span>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '2px' }}>{status}</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {status === 'Approved' && (
              <button onClick={handleStartJourney} style={actionBtnStyle}>Start Journey</button>
            )}
            {status === 'Tenant Started Journey' && (
              <button onClick={handleMarkArrived} style={actionBtnStyle} disabled={gpsLoading}>
                {gpsLoading ? 'Checking Geolocation...' : 'Mark Arrived'}
              </button>
            )}
            {status === 'Tenant Arrived' && (
              <button onClick={handleVerifyStart} style={actionBtnStyle}>Start Visit Tour</button>
            )}
            {status === 'Visit In Progress' && (
              <button onClick={handleCompleteVisit} style={actionBtnStyle}>Complete Visit</button>
            )}
          </div>
        </div>
        {gpsError && (
          <div style={{ fontSize: '10px', color: '#ef4444', marginTop: '8px', fontWeight: 'semibold' }}>
            ⚠️ {gpsError}
            {status === 'Tenant Started Journey' && (
              <button 
                onClick={async () => {
                  const next: VisitStatus = 'Tenant Arrived';
                  const res = await logVisitEvent(visit.id, next, { gpsSnapshot: { manualConfirm: true } });
                  if (!res.error) {
                    setStatus(next);
                    if (onStatusChange) onStatusChange(next);
                  }
                }}
                style={{ marginLeft: '8px', fontSize: '9px', textDecoration: 'underline', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Confirm Manually
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. Route Navigation Actions */}
      <div style={cardStyle}>
        <div style={sectionTitleStyle}>🗺️ Navigation Launcher</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${propertyCoords.lat},${propertyCoords.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={navLinkStyle}
          >
            Google Maps
          </a>
          <button 
            type="button" 
            onClick={() => handleCopyText(exactAddress, 'address')} 
            style={secondaryBtnStyle}
          >
            {copied === 'address' ? 'Copied!' : 'Copy Address'}
          </button>
          <button 
            type="button" 
            onClick={() => handleCopyText(`${propertyCoords.lat}, ${propertyCoords.lng}`, 'coords')} 
            style={secondaryBtnStyle}
          >
            {copied === 'coords' ? 'Copied!' : 'Copy Coordinates'}
          </button>
        </div>
      </div>

      {/* 3. Gate Entry & Instructions */}
      <div style={{ ...cardStyle, marginTop: '16px' }}>
        <div style={sectionTitleStyle}>🔑 Access & Entry Details</div>
        <div style={{ fontSize: '12px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <span style={{ fontWeight: 'bold' }}>Exact Flat: </span>
            <span>{visit.entryInstructions?.doorNumber || 'Will be shared by owner'}</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Floor Number: </span>
            <span>{visit.entryInstructions?.floor || 'Not specified'}</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Gate access instructions: </span>
            <span>{visit.entryInstructions?.entryInstructions || 'Follow security guidelines'}</span>
          </div>
          {visit.entryInstructions?.parkingInstructions && (
            <div>
              <span style={{ fontWeight: 'bold' }}>Parking Slot: </span>
              <span>{visit.entryInstructions.parkingInstructions}</span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Feedback Rating modal block (Visits Completed) */}
      {(status === 'Visit Completed' || status === 'Feedback Pending') && !feedbackSubmitted && (
        <div style={{ ...cardStyle, marginTop: '16px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={sectionTitleStyle}>⭐ How was your visit?</div>
          <p style={{ fontSize: '11px', color: '#71717a', marginTop: '4px' }}>Please rate the property and owner interactions.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
            {Object.keys(feedback).filter(k => k !== 'comment').map((key) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', textTransform: 'capitalize', fontWeight: 'bold' }}>{key.replace(/([A-Z])/g, ' $1')}</span>
                <select
                  value={(feedback as any)[key]}
                  onChange={(e) => setFeedback({ ...feedback, [key]: Number(e.target.value) })}
                  style={selectStyle}
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Terrible</option>
                </select>
              </div>
            ))}
          </div>
          <textarea
            placeholder="Add comments about layout accuracy, owner behavior, cleanliness..."
            value={feedback.comment}
            onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
            style={textareaStyle}
          />
          <button onClick={submitFeedback} style={{ ...actionBtnStyle, background: '#f59e0b', width: '100%', marginTop: '12px' }}>
            Submit Visit Feedback
          </button>
        </div>
      )}
    </div>
  );
};

const actionBtnStyle: React.CSSProperties = {
  background: '#3b82f6',
  color: '#ffffff',
  border: 'none',
  fontSize: '11px',
  fontWeight: 'bold',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
};

const navLinkStyle: React.CSSProperties = {
  background: '#10b981',
  color: '#ffffff',
  fontSize: '11px',
  fontWeight: 'bold',
  padding: '6px 12px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
};

const secondaryBtnStyle: React.CSSProperties = {
  background: 'rgba(113, 113, 122, 0.08)',
  border: '1px solid rgba(113, 113, 122, 0.15)',
  fontSize: '11px',
  fontWeight: 'semibold',
  padding: '5px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
};

const selectStyle: React.CSSProperties = {
  fontSize: '11px',
  padding: '4px',
  borderRadius: '4px',
  border: '1px solid #d4d4d8',
  marginTop: '4px',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '60px',
  fontSize: '11px',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #d4d4d8',
  marginTop: '12px',
};

const lightStyles = {
  container: {
    fontFamily: 'system-ui',
    padding: '12px',
    color: '#18181b',
  },
  sectionTitle: {
    fontSize: '10px',
    fontWeight: 'black' as const,
    textTransform: 'uppercase' as const,
    color: '#71717a',
    letterSpacing: '0.05em',
    marginBottom: '8px',
  },
  card: {
    padding: '14px',
    borderRadius: '12px',
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
    fontSize: '10px',
    fontWeight: 'black' as const,
    textTransform: 'uppercase' as const,
    color: '#a1a1aa',
    letterSpacing: '0.05em',
    marginBottom: '8px',
  },
  card: {
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #27272a',
    background: '#18181b',
  },
};
