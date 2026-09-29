import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';

export const ExpertEvaluationHistory: React.FC = () => {
  const { evaluations } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Historical Signed Evaluations
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Archived evaluation rubrics and signed scoring decisions submitted to government committees.
        </p>
      </div>

      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {evaluations.map(ev => (
            <div
              key={ev.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: 'var(--bg-muted)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.95rem' }}>
                  {ev.applicationId} — Score: <span style={{ color: 'var(--primary-color)', fontWeight: 800 }}>{ev.totalScore} / 100</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Evaluated on {ev.evaluationDate} by {ev.expertName} ({ev.expertDesignation})
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  {ev.overallComments}
                </div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <StatusBadge status={ev.recommendation} />
                <button
                  onClick={() => alert(`Downloading signed evaluation rubric PDF for ${ev.id}...`)}
                  className="btn btn-outline btn-sm"
                >
                  📄 Download Signed Rubric PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
