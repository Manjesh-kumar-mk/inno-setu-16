import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export const AdminTemplates: React.FC = () => {
  const { addAuditEvent } = useApp();

  // Template Management State for 8 required template types:
  // Problem Statements, Evaluation, Pilot Agreements, Data/IP, Cybersecurity, Risk, KPI, Procurement
  const [selectedTemplateType, setSelectedTemplateType] = useState<string>('PROBLEM_STATEMENTS');
  const [templateVersions, setTemplateVersions] = useState({
    PROBLEM_STATEMENTS: { version: 'v2.4', updatedAt: '2026-08-15', content: 'Standard outcome-focused problem definition schema requiring quantitative metrics, bad baseline vs desired threshold contrast, and testbed site parameters.' },
    EVALUATION: { version: 'v3.1', updatedAt: '2026-09-01', content: '6-criteria scoring rubric template (Technical Feasibility 20, Innovation 20, Impact 20, Scalability 15, Cost 15, Cybersecurity 10).' },
    PILOT_AGREEMENTS: { version: 'v1.8', updatedAt: '2026-07-20', content: 'Sandbox operational tri-party agreement defining milestones, escrow payout schedule, and zero-liability indemnity for pilot trial failures.' },
    DATA_IP: { version: 'v2.0', updatedAt: '2026-09-10', content: 'GFR Rule 194 IP Retention Clause: Startup retains background & foreground IP. Government receives non-exclusive perpetual license for internal use.' },
    CYBERSECURITY: { version: 'v4.0', updatedAt: '2026-08-30', content: 'NIC Security Compliance Checklist: Mandatory TPM 2.0 hardware crypto chip, zero-trust microsegmentation, and DPDP Act 2023 telemetry logging.' },
    RISK: { version: 'v1.5', updatedAt: '2026-06-12', content: 'Operational risk taxonomy template: Categorizes hardware failure, environmental hazards, data privacy leak, and supply chain delays.' },
    KPI: { version: 'v2.2', updatedAt: '2026-09-05', content: 'Empirical KPI benchmark baseline formulation template for third-party independent auditor verification.' },
    PROCUREMENT: { version: 'v3.0', updatedAt: '2026-09-18', content: 'Fast-track non-tender direct procurement certificate template under General Financial Rules (GFR 2017) Rule 194.' }
  });

  const [activeTemplateText, setActiveTemplateText] = useState<string>(templateVersions.PROBLEM_STATEMENTS.content);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Versioned Contract & Challenge Schemas
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Create and manage standardized versioned templates for procurement specifications, legal agreements, and risk controls.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px' }}>
        {/* Left Column: 8 Template Categories Required */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy-900)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Template Categories (8 Types)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { id: 'PROBLEM_STATEMENTS', label: '1. Problem Statements' },
              { id: 'EVALUATION', label: '2. Evaluation Rubric' },
              { id: 'PILOT_AGREEMENTS', label: '3. Pilot Agreements' },
              { id: 'DATA_IP', label: '4. Data / IP Rights' },
              { id: 'CYBERSECURITY', label: '5. Cybersecurity Standards' },
              { id: 'RISK', label: '6. Risk Taxonomy' },
              { id: 'KPI', label: '7. KPI Benchmarks' },
              { id: 'PROCUREMENT', label: '8. Fast-Track Procurement' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTemplateType(t.id);
                  setActiveTemplateText((templateVersions as any)[t.id]?.content || '');
                }}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${selectedTemplateType === t.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
                  background: selectedTemplateType === t.id ? 'rgba(37,99,235,0.08)' : 'var(--card-bg)',
                  color: selectedTemplateType === t.id ? 'var(--primary-color)' : 'var(--navy-900)',
                  fontWeight: selectedTemplateType === t.id ? 700 : 500,
                  fontSize: '0.825rem',
                  cursor: 'pointer'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Template Content Editor & Versioning */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <div>
              <span className="badge badge-info">TEMPLATE SCHEMA VERSION</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '4px' }}>
                {selectedTemplateType.replace(/_/g, ' ')}
              </h3>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Active Version: <strong>{(templateVersions as any)[selectedTemplateType]?.version}</strong> • Updated: {(templateVersions as any)[selectedTemplateType]?.updatedAt}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--navy-900)', display: 'block', marginBottom: '6px' }}>
              Template Content Specification (Markdown / Schema JSON):
            </label>
            <textarea
              rows={8}
              value={activeTemplateText}
              onChange={(e) => setActiveTemplateText(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              onClick={() => alert(`Saving draft for template ${selectedTemplateType}...`)}
              className="btn btn-outline"
            >
              Save Draft
            </button>
            <button
              onClick={() => {
                addAuditEvent('PUBLISHED_TEMPLATE_VERSION', selectedTemplateType);
                alert(`Published new version of ${selectedTemplateType} template!`);
              }}
              className="btn btn-primary"
            >
              ⚡ Publish New Version
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
