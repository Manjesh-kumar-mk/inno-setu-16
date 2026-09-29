import React from 'react';

export const ExpertReports: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Expert Scoring Reports & Analytics
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Evaluator committee score distribution and recommendation summaries.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '14px' }}>
            Score Distribution Summary Across 6 Criteria
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
              <span>1. Technical Feasibility:</span> <strong>18.4 / 20</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
              <span>2. Innovation & IP Novelty:</span> <strong>17.8 / 20</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
              <span>3. Societal & Operational Impact:</span> <strong>18.1 / 20</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
              <span>4. Scalability & Replicability:</span> <strong>13.2 / 15</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
              <span>5. Cost Effectiveness:</span> <strong>13.9 / 15</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>6. Cybersecurity & Data Sovereignty:</span> <strong>9.2 / 10</strong>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '8px' }}>
              Export Committee Evaluation Digest
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Generate official signed PDF summary featuring cryptographic hashes and conflict-of-interest verifications for ministry review committees.
            </p>
          </div>
          <button
            onClick={() => alert('Exporting Official Expert Evaluator Committee Report PDF...')}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '16px', padding: '12px', fontWeight: 700 }}
          >
            📄 Export Signed Committee Digest PDF
          </button>
        </div>
      </div>
    </div>
  );
};
