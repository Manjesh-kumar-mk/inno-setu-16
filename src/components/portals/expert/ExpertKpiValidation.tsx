import React from 'react';
import { useApp } from '../../../context/AppContext';

export const ExpertKpiValidation: React.FC = () => {
  const { addAuditEvent } = useApp();

  const kpis = [
    { id: 'kpi-101', pilot: 'CH-DTSM-08', startup: 'AeroTraffic AI', metric: 'Peak corridor wait time reduction', baseline: '45 mins', target: '25% reduction', achieved: '31.2% reduction', status: 'VERIFIED' },
    { id: 'kpi-102', pilot: 'CH-MPH-12', startup: 'PulseHealth AI', metric: 'Offline triage diagnostic sensitivity', baseline: '64%', target: '>92%', achieved: '94.8%', status: 'VERIFIED' },
    { id: 'kpi-103', pilot: 'CH-DUWSM-04', startup: 'BioClean Nanotech', metric: 'Arsenic filtration concentration', baseline: '50 ppb', target: '<5 ppb', achieved: '3.2 ppb', status: 'PENDING_VERIFICATION' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          KPI Verification & Independent Audit
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Verify empirical baseline vs achieved KPI metrics before milestone escrow disbursement.
        </p>
      </div>

      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '14px' }}>
          Pending Performance Sign-offs
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {kpis.map(k => (
            <div
              key={k.id}
              style={{
                border: '1px solid var(--border-color)',
                padding: '16px',
                borderRadius: '8px',
                background: 'var(--bg-muted)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.925rem' }}>{k.startup} ({k.pilot})</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>{k.metric}</div>
                <div style={{ fontSize: '0.78rem', marginTop: '6px', color: 'var(--text-secondary)' }}>
                  Baseline: <strong>{k.baseline}</strong> • Target: <strong>{k.target}</strong> • Achieved: <strong style={{ color: 'var(--success-text)' }}>{k.achieved}</strong>
                </div>
              </div>
              <div>
                {k.status === 'VERIFIED' ? (
                  <span className="badge badge-success" style={{ fontWeight: 700 }}>✓ AUDIT VERIFIED</span>
                ) : (
                  <button
                    onClick={() => {
                      addAuditEvent('VERIFIED_KPI_BENCHMARK', `${k.startup} - ${k.metric}`);
                      alert(`KPI Benchmark '${k.metric}' signed off successfully by Expert Panelist.`);
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    Sign Off KPI →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
