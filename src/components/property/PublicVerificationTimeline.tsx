import { useState, useEffect } from 'react';
import { supabase } from '@inhaby/shared';
import type { PublicHistoryEntry, VerificationStatus } from '@inhaby/shared';
import { VERIFICATION_STATUS_CONFIG } from '@inhaby/shared';

interface PublicVerificationTimelineProps {
  propertyId: string;
}

const PUBLIC_ACTIONS = new Set([
  'submitted', 'approved', 'inspection_completed', 'badge_awarded',
  'partially_verified', 'status_changed',
]);

const ACTION_LABELS: Record<string, string> = {
  submitted:            'Submitted for Verification',
  approved:             'Verification Approved by Inhaby',
  inspection_completed: 'Physical Inspection Completed',
  badge_awarded:        'Verification Badge Awarded',
  partially_verified:   'Partially Verified',
  status_changed:       'Verification Status Updated',
};

const STATUS_COLOR: Record<string, string> = {
  green: '#22c55e', blue: '#3b82f6', purple: '#a855f7',
  orange: '#f97316', yellow: '#eab308', teal: '#14b8a6',
  red: '#ef4444', gray: '#6b7280',
};

export default function PublicVerificationTimeline({ propertyId }: PublicVerificationTimelineProps) {
  const [entries, setEntries] = useState<PublicHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        // Only public, non-internal history actions
        const { data } = await supabase
          .from('verification_history')
          .select('action, to_status, created_at')
          .eq('property_id', propertyId)
          .neq('actor_role', 'admin_internal')
          .order('created_at', { ascending: false })
          .limit(10);

        const publicEntries = (data ?? []).filter((e: any) => PUBLIC_ACTIONS.has(e.action));
        setEntries(publicEntries as PublicHistoryEntry[]);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [propertyId]);

  if (loading || entries.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
        <span className="material-symbols-rounded text-base text-secondary">timeline</span>
        <h3 className="text-xs font-semibold text-primary">Verification History</h3>
      </div>

      <div className="px-4 py-3 space-y-3">
        {entries.map((entry, idx) => {
          const sc = VERIFICATION_STATUS_CONFIG[entry.to_status as VerificationStatus];
          const dotColor = sc ? (STATUS_COLOR[sc.color] ?? '#6b7280') : '#6b7280';
          const label = ACTION_LABELS[entry.action] ?? entry.action.replace(/_/g, ' ');
          const isFirst = idx === 0;

          return (
            <div key={`${entry.action}-${entry.created_at}`} className="flex gap-3 items-start">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  backgroundColor: isFirst ? dotColor : `${dotColor}22`,
                  border: `1.5px solid ${dotColor}`,
                }}
              >
                <span
                  className="material-symbols-rounded text-[10px]"
                  style={{ color: isFirst ? '#fff' : dotColor }}
                >
                  {sc?.icon ?? 'info'}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-primary leading-4">{label}</p>
                <p className="text-[10px] text-secondary mt-0.5">
                  {new Date(entry.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 pb-3">
        <p className="text-[10px] text-secondary">
          🔒 Verification conducted by the Inhaby Trust & Safety team
        </p>
      </div>
    </div>
  );
}
