import React from 'react';
import { Milestone } from '../../types';
import { StatusBadge } from './StatusBadge';

interface TimelineProps {
  milestones: Milestone[];
  onVerifyClick?: (milestoneId: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ milestones, onVerifyClick }) => {
  return (
    <div className="timeline">
      {milestones.map((ms, idx) => {
        const isDisbursed = ms.status === 'DISBURSED';
        return (
          <div key={ms.id} className="timeline-item">
            <div className={`timeline-marker ${isDisbursed ? 'completed' : ''}`}>
              {isDisbursed ? '✓' : idx + 1}
            </div>

            <div className="timeline-content">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-900)' }}>{ms.title}</h4>
                <StatusBadge status={ms.status} />
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                {ms.description}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '8px',
                background: 'var(--bg-muted)',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                marginBottom: '10px'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Due Date:</span>{' '}
                  <strong style={{ color: 'var(--navy-900)' }}>{ms.dueDate}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Payout Share:</span>{' '}
                  <strong style={{ color: 'var(--navy-900)' }}>{ms.payoutPercentage}%</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Disbursement Amount:</span>{' '}
                  <strong style={{ color: 'var(--primary-700)' }}>₹{ms.payoutAmount.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {ms.deliverables && ms.deliverables.length > 0 && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <strong>Key Deliverables:</strong>
                  <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
                    {ms.deliverables.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}

              {ms.status === 'UNDER_VERIFICATION' && onVerifyClick && (
                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => onVerifyClick(ms.id)}
                  >
                    Verify Milestone & Disburse Escrow Funds
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
