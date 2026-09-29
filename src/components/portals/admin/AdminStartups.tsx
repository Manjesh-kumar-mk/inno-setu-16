import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';

export const AdminStartups: React.FC = () => {
  const { startups } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Startup DPIIT & Security Verification
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Verify deep-tech startup credentials, DPIIT registrations, and security clearance certificates.
        </p>
      </div>

      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {startups.map(s => (
            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--bg-muted)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--navy-900)' }}>{s.name}</strong>
                  <span className="badge badge-info" style={{ fontSize: '0.72rem' }}>{s.category}</span>
                  <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>{s.readinessLevel}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  DPIIT Reg: <strong>{s.dpiitRegistrationNumber}</strong> • CIN: {s.cinOrTaxId} • Founder: {s.founderName} ({s.headquarters})
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StatusBadge status={s.securityClearanceStatus} />
                <button
                  onClick={() => alert(`Verifying DPIIT certificate & MCA records for ${s.name}...`)}
                  className="btn btn-outline btn-sm"
                >
                  Verify Documents
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
