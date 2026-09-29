import React from 'react';

export const GovTemplates: React.FC = () => {
  const templates = [
    { title: 'Standard Outcome-Based Procurement Challenge Schema v3.2', category: 'Challenge Spec', usage: '48 Uses' },
    { title: 'Sandbox Trial Escrow & Milestone Disbursal Contract', category: 'Legal Contract', usage: '32 Uses' },
    { title: 'Rule 194 GFR Direct Procurement Exemption Template', category: 'Procurement Clause', usage: '19 Uses' },
    { title: 'Independent Auditor Technical Validation Protocol', category: 'Audit Rubric', usage: '27 Uses' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>
            Procurement Templates & Standard Schemas
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Pre-approved government outcome challenge specifications, legal clauses, and scoring rubrics.
          </p>
        </div>

        <button className="btn btn-secondary" onClick={() => alert('New Template Editor Opened')}>
          + Create New Template
        </button>
      </div>

      <div className="grid-cols-2">
        {templates.map((t, idx) => (
          <div key={idx} className="card">
            <div className="card-header">
              <h3 className="card-title" style={{ fontSize: '1.05rem' }}>{t.title}</h3>
              <span className="badge badge-primary">{t.category}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Popularity: <strong>{t.usage}</strong></span>
              <button className="btn btn-outline btn-sm" onClick={() => alert(`Using template: ${t.title}`)}>
                Use Template →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
