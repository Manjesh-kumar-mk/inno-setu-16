import React from 'react';
import { useApp } from '../../../context/AppContext';

export const AdminExperts: React.FC = () => {
  const { experts } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
            Expert Panelists & Evaluators
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Independent jury panelists, domain specializations, and assignment quotas.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => alert('Opening Onboard Expert Panelist Dialog...')}>
          + Onboard Expert Panelist
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {experts.map(e => (
          <div key={e.id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-info">{e.department || e.domainSpecialization?.[0] || 'Domain Expert'}</span>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>{e.clearanceLevel}</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-900)' }}>{e.name}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              {e.designation}, <strong>{e.institution}</strong>
            </div>
            {e.domainSpecialization && e.domainSpecialization.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {e.domainSpecialization.map((spec, i) => (
                  <span key={i} style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(2, 132, 199, 0.08)', color: '#0284c7', borderRadius: '4px', fontWeight: 600 }}>
                    {spec}
                  </span>
                ))}
              </div>
            )}
            <div style={{ fontSize: '0.78rem', background: 'var(--bg-muted)', padding: '10px 12px', borderRadius: '6px', marginBottom: '14px', border: '1px solid var(--border-color)' }}>
              Evaluations: <strong>{e.evaluationsCompletedCount}</strong> • Email: {e.email || `${e.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@eval.gov.in`}
            </div>
            <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={() => alert(`Assigning challenge proposals to ${e.name}...`)}>
              Assign Applications →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
