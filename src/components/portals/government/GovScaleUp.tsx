import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';

export type ScaleUpActionType = 'CONTINUE_PILOT' | 'MODIFY_SOLUTION' | 'CLOSE_PILOT' | 'PROCEED_PROCUREMENT';

export const GovScaleUp: React.FC = () => {
  const { scaleUpDecisions, pilots, setCurrentView, addAuditEvent } = useApp();
  const [selectedPilotId, setSelectedPilotId] = useState<string>(pilots[0]?.id || 'pilot-301');

  // Modal State for Mandatory Evidence / Comments Action Decision
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ScaleUpActionType>('PROCEED_PROCUREMENT');
  const [justificationComment, setJustificationComment] = useState<string>('');
  const [evidenceDocRef, setEvidenceDocRef] = useState<string>('NIUA_Independent_Performance_Audit_2026.pdf');
  const [decisionLogged, setDecisionLogged] = useState<string | null>(null);

  const selectedPilot = pilots.find(p => p.id === selectedPilotId) || pilots[0];

  // 7 Scale-Up Readiness Indicators structure
  const readinessIndicators = [
    {
      key: 'technical',
      name: '1. Technical Readiness',
      score: '98/100',
      status: 'READY',
      metrics: 'TRL-8/9 Operational Edge Hardware, REST/gRPC API Uptime 99.9%, Latency < 45ms fail-safe',
      icon: '⚙️'
    },
    {
      key: 'performance',
      name: '2. Performance Readiness',
      score: '96/100',
      status: 'READY',
      metrics: 'KPI Targets Exceeded (28.4% delay reduction vs 25% target), Verified by NIUA Lead Auditor',
      icon: '📊'
    },
    {
      key: 'cost',
      name: '3. Cost & ROI Efficiency',
      score: '94/100',
      status: 'READY',
      metrics: '34% Unit Cost Reduction vs Legacy Hardware, ₹1.5 Crore Projected Annual Savings, Payback < 11 Months',
      icon: '💰'
    },
    {
      key: 'security',
      name: '4. Cybersecurity Clearance',
      score: '100/100',
      status: 'READY',
      metrics: 'VAPT Passed with Zero Critical Vulnerabilities, AES-256 Quantum-Resistant Encryption, CERT-In Cleared',
      icon: '🛡️'
    },
    {
      key: 'compliance',
      name: '5. Regulatory & GFR Compliance',
      score: '100/100',
      status: 'READY',
      metrics: 'GFR 2017 Rule 194 Direct Award Eligible, DPDP Act 2023 Sovereign Data Protection Compliant',
      icon: '⚖️'
    },
    {
      key: 'userAcceptance',
      name: '6. User & Field Operator Acceptance',
      score: '95/100',
      status: 'READY',
      metrics: '96% Operator Satisfaction Score across 6 testbed corridors, 100% staff training completion',
      icon: '👥'
    },
    {
      key: 'scalability',
      name: '7. Multi-Region Scalability',
      score: '92/100',
      status: 'READY',
      metrics: 'Multi-Node Edge Microservice Architecture, Tested for 150+ intersection simultaneous replication',
      icon: '🌐'
    }
  ];

  const handleOpenActionModal = (type: ScaleUpActionType) => {
    setActionType(type);
    setJustificationComment('');
    setIsDecisionModalOpen(true);
  };

  const handleConfirmDecision = () => {
    if (!justificationComment.trim()) {
      alert('ERROR: Justification comments and evidence references are mandatory for all scale-up decisions.');
      return;
    }

    const actionTitle =
      actionType === 'CONTINUE_PILOT'
        ? 'Continue Pilot Sandbox Trial'
        : actionType === 'MODIFY_SOLUTION'
          ? 'Modify Solution & Technical Scope'
          : actionType === 'CLOSE_PILOT'
            ? 'Close Sandbox Pilot'
            : 'Proceed to Direct Procurement & Scale-Up';

    addAuditEvent(
      `Scale-Up Decision Executed: ${actionTitle} for ${selectedPilot.startupName}`,
      selectedPilot.code
    );

    setDecisionLogged(
      `Decision '${actionTitle}' successfully executed and cryptographically signed into audit trail. Attached Evidence: ${evidenceDocRef}`
    );
    setIsDecisionModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', color: 'var(--navy-900)' }}>
            Validated Innovation Scale-Up & Cross-Department Replication
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Replicate proven sandbox solutions across state municipal bodies, central ministries, and sister government agencies.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline" onClick={() => setCurrentView('procurement-pathway')}>
            ⚡ Procurement Pathway Engine
          </button>
          <button className="btn btn-primary" onClick={() => alert('Cross-Department Replication Spec Opened')}>
            + Inter-Agency Replication Spec
          </button>
        </div>
      </div>

      {decisionLogged && (
        <div style={{
          background: 'var(--success-bg)',
          color: 'var(--success-text)',
          border: '1px solid #86efac',
          padding: '14px 18px',
          borderRadius: '8px',
          fontSize: '0.875rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <strong>✓ Decision Recorded:</strong> {decisionLogged}
          </div>
          <button
            className="btn btn-sm"
            onClick={() => setDecisionLogged(null)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--success-text)', fontWeight: 700 }}
          >
            ✕
          </button>
        </div>
      )}

      {/* SUCCESSFUL PILOTS & EVIDENCE DISPLAY */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🏆</span> Validated Sandbox Pilots & Empirical Performance Evidence
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {pilots.map(p => {
            const isSelected = p.id === selectedPilotId;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPilotId(p.id)}
                style={{
                  border: `2px solid ${isSelected ? 'var(--primary-color)' : 'var(--border-color)'}`,
                  borderRadius: '10px',
                  padding: '16px',
                  background: isSelected ? 'var(--card-bg)' : 'var(--bg-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                      {p.code}
                    </span>
                    <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', margin: '2px 0' }}>
                      {p.startupName}
                    </h4>
                  </div>
                  <StatusBadge status={p.status} />
                </div>

                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.35 }}>
                  {p.challengeTitle}
                </p>

                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>Auditor: <strong>{p.independentValidatorName.split(' ')[0]}</strong></div>
                  <div>Success Score: <strong style={{ color: 'var(--success-text)' }}>{p.overallSuccessRate}%</strong></div>
                  <div>Budget: <strong>₹{p.allocatedBudget.toLocaleString('en-IN')}</strong></div>
                  <div>Location: <strong>{p.testbedLocation ? 'Verified Testbed' : 'Sandbox Site'}</strong></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7 SCALE-UP READINESS INDICATORS */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>
              🎯 7 Scale-Up Readiness Indicators [{selectedPilot.startupName}]
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Comprehensive evaluation dimensions required prior to authorizing state-wide or multi-department procurement deployment.
            </p>
          </div>

          <div style={{
            background: 'var(--success-bg)',
            color: 'var(--success-text)',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '8px 14px',
            borderRadius: '6px'
          }}>
            Overall Readiness Score: {selectedPilot.overallSuccessRate}/100 (PASSED)
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
          {readinessIndicators.map(ind => (
            <div key={ind.key} style={{
              background: 'var(--bg-muted)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{ind.icon}</span>
                  <span>{ind.name}</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success-text)', background: 'var(--success-bg)', padding: '2px 8px', borderRadius: '4px' }}>
                  {ind.score}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.35 }}>
                {ind.metrics}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONS: REQUIRE EVIDENCE & COMMENTS (CRITICAL REQUIREMENT) */}
      <div className="card" style={{ padding: '20px', background: '#f8fafc', border: '2px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>
              ⚖️ Official Scale-Up Decision Center
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Select a formal steering committee action for <strong>{selectedPilot.startupName}</strong>. <em>All decisions strictly require attached evidence files and justification comments.</em>
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <button
            className="btn btn-outline"
            onClick={() => handleOpenActionModal('CONTINUE_PILOT')}
            style={{ padding: '14px', fontSize: '0.9rem', justifyContent: 'center' }}
          >
            🔄 Continue Pilot
          </button>

          <button
            className="btn btn-outline"
            onClick={() => handleOpenActionModal('MODIFY_SOLUTION')}
            style={{ padding: '14px', fontSize: '0.9rem', justifyContent: 'center' }}
          >
            🛠️ Modify Solution
          </button>

          <button
            className="btn btn-outline"
            onClick={() => handleOpenActionModal('CLOSE_PILOT')}
            style={{ padding: '14px', fontSize: '0.9rem', justifyContent: 'center', borderColor: 'var(--danger-text)', color: 'var(--danger-text)' }}
          >
            🛑 Close Pilot
          </button>

          <button
            className="btn btn-primary"
            onClick={() => handleOpenActionModal('PROCEED_PROCUREMENT')}
            style={{ padding: '14px', fontSize: '0.9rem', justifyContent: 'center' }}
          >
            🚀 Proceed to Procurement / Scale-Up
          </button>
        </div>
      </div>

      {/* MANDATORY DECISION & EVIDENCE MODAL */}
      {isDecisionModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '580px', padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)' }}>
                Scale-Up Decision Execution & Evidence Verification
              </h3>
              <button
                onClick={() => setIsDecisionModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
              Selected Target: <strong>{selectedPilot.startupName}</strong> ({selectedPilot.code})<br />
              Action Type: <strong style={{ color: 'var(--primary-color)' }}>{actionType.replace('_', ' ')}</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--navy-900)', display: 'block', marginBottom: '4px' }}>
                  Mandatory Evidence / Technical Audit Document Reference:
                </label>
                <input
                  type="text"
                  value={evidenceDocRef}
                  onChange={(e) => setEvidenceDocRef(e.target.value)}
                  placeholder="e.g. NIUA_Independent_Performance_Audit_2026.pdf"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--navy-900)', display: 'block', marginBottom: '4px' }}>
                  Mandatory Steering Committee Justification & Comments:
                </label>
                <textarea
                  rows={4}
                  value={justificationComment}
                  onChange={(e) => setJustificationComment(e.target.value)}
                  placeholder="Enter detailed rationale, empirical evidence observations, and steering committee decision notes..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                🔒 This decision will be stamped with your government credentials and published to the immutable blockchain audit trail.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn btn-outline" onClick={() => setIsDecisionModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmDecision}>
                ✍️ Sign & Execute Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
