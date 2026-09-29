import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';

export const ExpertPilotReviews: React.FC = () => {
  const { pilots } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Pilot Sandbox Reviews
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Technical audits and field trial reviews for active sandbox projects.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {pilots.map(p => (
          <div key={p.id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-info">{p.code}</span>
              <StatusBadge status={p.status} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>{p.startupName}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{p.challengeTitle}</div>

            <div style={{ background: 'var(--bg-muted)', padding: '10px 12px', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>📍 Testbed Location: <strong>{p.testbedLocation || 'New Delhi Smart City Hub'}</strong></div>
              <div>💰 Funding Disbursed: <strong>${p.disbursedAmount?.toLocaleString() || '180,000'} / ${p.allocatedBudget?.toLocaleString() || '250,000'}</strong></div>
              <div>📊 Audit Validator: <strong>{p.independentValidatorName || 'IIT Delhi Sandbox Committee'}</strong></div>
            </div>

            <button
              onClick={() => alert(`Opening Expert Sandbox Review Audit Portal for ${p.code}...`)}
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
            >
              Audit Field Performance & Telemetry →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
