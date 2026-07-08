import { useState, useEffect } from 'react';
import { supabase } from '@inhaby/shared';
import type { PublicVerificationSummary } from '@inhaby/shared';
import { BADGE_CONFIG, getTrustLevel, TRUST_LEVEL_CONFIG } from '@inhaby/shared';

interface PropertyVerificationCardProps {
  propertyId: string;
}

/**
 * Tenant-safe component.
 * Only fetches: trust_score, status, verified_at, expires_at, active badges.
 * Never requests document paths, admin notes, or signed URLs.
 */
export default function PropertyVerificationCard({ propertyId }: PropertyVerificationCardProps) {
  const [summary, setSummary] = useState<PublicVerificationSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const { data: v } = await supabase
          .from('property_verifications')
          .select('status, trust_score, verified_at, expires_at')
          .eq('property_id', propertyId)
          .single();

        if (!v) return;

        const { data: badges } = await supabase
          .from('verification_badges')
          .select('badge, awarded_at, expires_at, is_active')
          .eq('property_id', propertyId)
          .eq('is_active', true);

        setSummary({
          property_id: propertyId,
          status: v.status,
          trust_score: v.trust_score,
          verified_at: v.verified_at,
          expires_at: v.expires_at,
          badges: badges ?? [],
          lastInspectionDate: null,
          lastInspectionResult: null,
          publicHistory: [],
        });
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="h-24 rounded-2xl bg-[var(--surface)] border border-[var(--border)] animate-pulse" />
    );
  }

  if (!summary || (summary.status !== 'verified' && summary.status !== 'partially_verified')) {
    return null; // Only show card for verified/partially-verified properties
  }

  const level = getTrustLevel(summary.trust_score);
  const levelConfig = TRUST_LEVEL_CONFIG[level];
  const activeBadges = summary.badges.filter(b => b.is_active);

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: `${levelConfig.color}40` }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ backgroundColor: `${levelConfig.color}10` }}
      >
        {/* Animated score ring */}
        <div className="relative w-14 h-14 shrink-0">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="23" fill="none" stroke={`${levelConfig.color}30`} strokeWidth="5" />
            <circle
              cx="28" cy="28" r="23" fill="none"
              stroke={levelConfig.color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 23}`}
              strokeDashoffset={`${2 * Math.PI * 23 * (1 - summary.trust_score / 100)}`}
              style={{ transition: 'stroke-dashoffset 1.2s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-base font-bold leading-tight" style={{ color: levelConfig.color }}>
              {summary.trust_score}
            </span>
            <span className="text-[8px] text-secondary font-medium">TRUST</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-rounded text-base" style={{ color: levelConfig.color }}>verified</span>
            <p className="text-sm font-bold" style={{ color: levelConfig.color }}>{levelConfig.label}</p>
          </div>
          <p className="text-xs text-secondary mt-0.5">{levelConfig.description}</p>
          {summary.verified_at && (
            <p className="text-[10px] text-secondary mt-0.5">
              Verified {new Date(summary.verified_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>

      {/* Badges strip */}
      {activeBadges.length > 0 && (
        <div className="px-4 py-3 flex flex-wrap gap-1.5 border-t border-[var(--border)]">
          {activeBadges.map(b => {
            const bc = BADGE_CONFIG[b.badge];
            return (
              <span
                key={b.badge}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: `${levelConfig.color}15`, color: levelConfig.color }}
                title={bc.description}
              >
                <span className="material-symbols-rounded text-[10px]">{bc.icon}</span>
                {bc.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
