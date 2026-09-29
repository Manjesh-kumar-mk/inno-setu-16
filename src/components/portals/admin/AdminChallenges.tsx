import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';

export const AdminChallenges: React.FC = () => {
  const { challenges } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          All Platform Outcome Challenges
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Administrative registry of all published and draft outcome challenges across ministries.
        </p>
      </div>

      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {challenges.map(c => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--bg-muted)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.925rem' }}>{c.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Code: <strong>{c.code}</strong> • Dept: {c.departmentName} • Budget Cap: <strong>₹{c.budgetCap.toLocaleString('en-IN')}</strong>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusBadge status={c.status} />
                <button className="btn btn-outline btn-sm" onClick={() => alert(`Editing administrative status for ${c.code}...`)}>
                  Edit Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
