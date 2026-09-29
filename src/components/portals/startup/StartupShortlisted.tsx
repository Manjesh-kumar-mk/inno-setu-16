import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';
import { StartupApplicationWizard } from './StartupApplicationWizard';
import { Challenge } from '../../../types';

export const StartupShortlisted: React.FC = () => {
  const { challenges } = useApp();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const shortlistedList = challenges.slice(0, 3).map((ch, idx) => ({
    ...ch,
    matchScore: 95 - idx * 4,
    savedDate: `2026-09-${20 - idx}`,
    notes: 'Prioritized for submission before Q4 closing deadline.'
  }));

  const handleApply = (c: Challenge) => {
    setSelectedChallenge(c);
    setIsWizardOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <span className="badge badge-warning" style={{ marginBottom: '6px' }}>⭐ Bookmarked Challenges</span>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-900)' }}>
          Shortlisted Government Challenges
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          High-value outcome challenges saved for proposal preparation and team collaboration.
        </p>
      </div>

      <div className="grid-cols-2">
        {shortlistedList.map(item => (
          <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="card-header">
                <div>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                    <span className="badge badge-success">{item.matchScore}% Match</span>
                    <span className="badge badge-info">{item.sector}</span>
                  </div>
                  <h3 className="card-title" style={{ marginTop: '4px' }}>{item.title}</h3>
                  <div className="card-subtitle">{item.departmentName}</div>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
                {item.problemStatement}
              </p>

              <div style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '6px', fontSize: '0.78rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
                <div>Grant Cap: <strong>₹{item.budgetCap.toLocaleString('en-IN')}</strong></div>
                <div>Trial Period: <strong>{item.sandboxDurationMonths} Months</strong></div>
                <div>Deadline: <strong>{item.submissionDeadline}</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Saved on {item.savedDate}
              </span>
              <button className="btn btn-primary btn-sm" onClick={() => handleApply(item as Challenge)}>
                Launch Application Wizard →
              </button>
            </div>
          </div>
        ))}
      </div>

      <StartupApplicationWizard
        challenge={selectedChallenge}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />
    </div>
  );
};
