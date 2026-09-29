import React from 'react';
import { useApp } from '../../../context/AppContext';
import { MetricsChart } from '../../common/MetricsChart';

export const GovPerformance: React.FC = () => {
  const { pilots } = useApp();
  const activePilot = pilots[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>
          KPI Performance & Baseline Telemetry Analytics
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Continuous automated comparison between initial government baseline targets and live sandbox trial performance data.
        </p>
      </div>

      {activePilot && (
        <div className="card">
          <div className="card-header">
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--primary-700)', fontWeight: 700 }}>
                TELEMETRY SUITE: {activePilot.code}
              </div>
              <h3 className="card-title">{activePilot.challengeTitle}</h3>
              <div className="card-subtitle">Startup: {activePilot.startupName}</div>
            </div>
            <span className="badge badge-success">✓ 100% Signal Quality</span>
          </div>

          <div style={{ margin: '20px 0' }}>
            <MetricsChart kpis={activePilot.kpis} />
          </div>
        </div>
      )}
    </div>
  );
};
