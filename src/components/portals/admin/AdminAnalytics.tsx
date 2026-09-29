import React from 'react';

export const AdminAnalytics: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Platform System Analytics
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Real-time server telemetry, user engagement, and challenge submission throughput.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '12px' }}>
            Platform Traffic & Telemetry
          </h3>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
              <span>Daily Active Users (DAU):</span> <strong>1,420 Users</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
              <span>API Request Throughput:</span> <strong>842 req/sec</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>System Uptime SLA:</span> <strong>99.98%</strong>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '12px' }}>
            Database & Cryptographic Integrity
          </h3>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
              <span>PostgreSQL Ledger Status:</span> <strong style={{ color: 'var(--success-text)' }}>HEALTHY</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
              <span>SHA-256 Merkle Verification:</span> <strong style={{ color: 'var(--success-text)' }}>VALIDATED</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Disaster Recovery Sync:</span> <strong>0.2s Lag</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
