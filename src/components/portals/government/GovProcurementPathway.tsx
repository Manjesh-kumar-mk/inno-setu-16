import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';

export interface ProcurementRoute {
  id: string;
  name: string;
  ruleCode: string;
  legalBasis: string;
  suitability: string;
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  conditions: string[];
  approvalsRequired: string[];
  recommendedDurationDays: number;
}

export const GovProcurementPathway: React.FC = () => {
  const { pilots, contracts, setCurrentView } = useApp();
  const [selectedPilotId, setSelectedPilotId] = useState<string>(pilots[0]?.id || 'pilot-301');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-gfr-194');
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(4);
  const [complianceChecks, setComplianceChecks] = useState({
    performanceTargetMet: true,
    independentAuditSigned: true,
    ipClearanceVerified: true,
    dataSovereigntyConfirmed: true,
    budgetAvailabilityApproved: true
  });
  const [justificationNotes, setJustificationNotes] = useState<string>(
    'The pilot solution achieved 28.4% delay reduction exceeding the 25% target milestone. NIUA independent audit report verifies hardware durability and zero packet loss telemetry. GFR 2017 Rule 194 direct award is recommended for scale-up across remaining 18 city corridors.'
  );
  const [certificateGenerated, setCertificateGenerated] = useState<boolean>(false);

  const selectedPilot = pilots.find(p => p.id === selectedPilotId) || pilots[0];

  const procurementRoutes: ProcurementRoute[] = [
    {
      id: 'route-gfr-194',
      name: 'GFR 2017 Rule 194 Direct Sandbox Award',
      ruleCode: 'GFR-194-DIRECT',
      legalBasis: 'General Financial Rules 2017, Rule 194 (Direct Procurement of Validated Sandbox Innovations)',
      suitability: 'Applicable when a sandbox pilot completes successfully with >90% KPI achievement & third-party audit verification.',
      riskRating: 'LOW',
      conditions: [
        'Must have completed a minimum 60-day operational sandbox trial.',
        'Independent auditor certificate (NIUA/ICMR/NEERI) attached.',
        'Value for money calculation submitted and verified by Department Finance Advisor.'
      ],
      approvalsRequired: [
        'Independent Technical Auditor Sign-off',
        'Department Financial Advisor (DFA)',
        'Secretary / Head of Department Approval'
      ],
      recommendedDurationDays: 14
    },
    {
      id: 'route-gfr-166',
      name: 'Rule 166 Proprietary / Single Source Exemption',
      ruleCode: 'GFR-166-SINGLE',
      legalBasis: 'General Financial Rules 2017, Rule 166 (Single Tender Inquiry for Proprietary Technology)',
      suitability: 'Applicable when the underlying AI or deep-tech architecture possesses exclusive patents/IP with no direct market equivalent.',
      riskRating: 'MEDIUM',
      conditions: [
        'Proprietary Article Certificate (PAC) signed by competent technical authority.',
        'Market availability survey certifying no alternative provider matches required specifications.',
        'Fair pricing reasonableness certificate from Finance Cell.'
      ],
      approvalsRequired: [
        'Technical Advisory Steering Committee',
        'Chief Information Officer (CIO)',
        'Ministry Tender Exemption Board'
      ],
      recommendedDurationDays: 21
    },
    {
      id: 'route-qcbs',
      name: 'QCBS Fast-Track (Quality & Cost Based Selection)',
      ruleCode: 'QCBS-80-20',
      legalBasis: 'Rule 192 Procurement of Consulting/Tech Services with 80% Weightage on Proven Sandbox Outcomes',
      suitability: 'Applicable for multi-vendor scaling where sandbox trial results grant pre-verified technical points in RFP evaluation.',
      riskRating: 'LOW',
      conditions: [
        'Open invitation with pre-qualification credit for sandbox-validated startups.',
        'Benchmark dataset made public for transparent quality evaluation.',
        'Price bid opening restricted to technical score >80%.'
      ],
      approvalsRequired: [
        'Procurement Evaluation Committee',
        'Department Finance Advisor'
      ],
      recommendedDurationDays: 30
    },
    {
      id: 'route-swiss',
      name: 'Swiss Challenge Mechanism',
      ruleCode: 'SWISS-CHALLENGE',
      legalBasis: 'State & Central Unsolicited Proposal Policy for Breakthrough Innovation',
      suitability: 'Applicable for startup-initiated unsolicited solutions where the startup holds first-right of refusal matching matching counter-bids.',
      riskRating: 'MEDIUM',
      conditions: [
        'Public notice issued for 21 days inviting counter proposals.',
        'Original startup retains right to match lowest bid if within 15% range.',
        'Detailed Project Report (DPR) approved by NITI Aayog policy cell.'
      ],
      approvalsRequired: [
        'State Innovation Council',
        'Department Legal & Finance Cell'
      ],
      recommendedDurationDays: 45
    },
    {
      id: 'route-open-tender',
      name: 'Open Tender Scale-Up with Sandbox Specifications',
      ruleCode: 'OPEN-TENDER-SCALE',
      legalBasis: 'Standard National Competitive Bidding (NCB) using Sandbox-Validated Functional Specs',
      suitability: 'Applicable when specifications are standardized and multiple deep-tech vendors can compete for full state rollout.',
      riskRating: 'LOW',
      conditions: [
        'Functional requirements derived directly from sandbox pilot outcome data.',
        'Minimum TRL-8 operational readiness required.',
        'Relaxed turnover/prior-experience norms for DPIIT-recognized startups under Public Procurement Order.'
      ],
      approvalsRequired: [
        'Central Procurement Directorate',
        'Competent Financial Authority'
      ],
      recommendedDurationDays: 45
    },
    {
      id: 'route-trial-extension',
      name: 'Sandboxed Operational Trial Extension',
      ruleCode: 'SANDBOX-EXT-6M',
      legalBasis: 'Sandbox Governance Guidelines 2026 Clause 14.2 (Extended Validation)',
      suitability: 'Applicable when pilot requires additional seasonal data or expanded testbed scale before full procurement decision.',
      riskRating: 'LOW',
      conditions: [
        'Interim validation report submitted.',
        'Additional KPI targets defined for extended period.',
        'Budget extension capped at 25% of initial pilot allocation.'
      ],
      approvalsRequired: [
        'Pilot Steering Committee',
        'Independent Validator'
      ],
      recommendedDurationDays: 7
    }
  ];

  const selectedRoute = procurementRoutes.find(r => r.id === selectedRouteId) || procurementRoutes[0];

  const workflowSteps = [
    { step: 1, title: 'Pilot Completed', subtitle: 'Live sandbox trial executed & deliverables logged', status: 'COMPLETED' },
    { step: 2, title: 'Performance Validated', subtitle: 'Third-party auditor KPI verification sign-off', status: 'COMPLETED' },
    { step: 3, title: 'Compliance Checked', subtitle: 'GFR, DPDP Act 2023 & VAPT clearance audit', status: 'COMPLETED' },
    { step: 4, title: 'Pathway Assessment', subtitle: 'Statutory route selection & justification', status: 'ACTIVE' },
    { step: 5, title: 'Required Approvals', subtitle: 'DFA & Ministry Steering Committee sign-off', status: 'PENDING' },
    { step: 6, title: 'Procurement / Deployment', subtitle: 'Contract execution & multi-department scale', status: 'PENDING' }
  ];

  const handleGenerateCertificate = () => {
    if (!justificationNotes.trim()) {
      alert('Please enter justification notes before generating recommendation certificate.');
      return;
    }
    setCertificateGenerated(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--navy-900)' }}>
              Procurement Pathway & Decision Support System
            </h2>
            <span style={{ background: 'var(--primary-color)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
              GFR 2017 & Sandboxing Rules Compliant
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Decision-support workflow enabling departments to evaluate validated pilots and select the legally applicable fast-track procurement pathway.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline" onClick={() => setCurrentView('contracts')}>
            📋 View Active Contracts
          </button>
          <button className="btn btn-primary" onClick={() => setCurrentView('scale-up')}>
            🚀 View Scale-Up Registry
          </button>
        </div>
      </div>

      {/* VISUAL DECISION WORKFLOW */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚡</span> Visual Decision & Scale-Up Transition Workflow
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Step {activeWorkflowStep} of 6: <strong>{workflowSteps[activeWorkflowStep - 1].title}</strong>
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
          position: 'relative'
        }}>
          {workflowSteps.map((ws) => {
            const isActive = ws.step === activeWorkflowStep;
            const isCompleted = ws.step < activeWorkflowStep;
            return (
              <div
                key={ws.step}
                onClick={() => setActiveWorkflowStep(ws.step)}
                style={{
                  background: isActive ? 'var(--navy-900)' : isCompleted ? '#f0fdf4' : 'var(--bg-muted)',
                  color: isActive ? '#ffffff' : isCompleted ? 'var(--navy-900)' : 'var(--text-secondary)',
                  border: `2px solid ${isActive ? 'var(--primary-color)' : isCompleted ? '#86efac' : 'var(--border-color)'}`,
                  borderRadius: '10px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: isActive ? 'var(--primary-color)' : isCompleted ? '#22c55e' : 'rgba(0,0,0,0.1)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {isCompleted ? '✓' : ws.step}
                  </span>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    {isCompleted ? 'Verified' : isActive ? 'In Progress' : 'Pending'}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
                  {ws.title}
                </div>
                <div style={{ fontSize: '0.74rem', opacity: 0.85, lineHeight: 1.25 }}>
                  {ws.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELECT PILOT & SOLUTION FOR EVALUATION */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Select Validated Sandbox Pilot for Procurement Assessment:
            </label>
            <select
              value={selectedPilotId}
              onChange={(e) => setSelectedPilotId(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '500px',
                marginTop: '6px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.95rem',
                fontWeight: 600,
                background: 'var(--card-bg)',
                color: 'var(--navy-900)'
              }}
            >
              {pilots.map(p => (
                <option key={p.id} value={p.id}>
                  [{p.code}] {p.startupName} — {p.challengeTitle.substring(0, 55)}... ({p.status})
                </option>
              ))}
            </select>
          </div>

          <div style={{
            background: 'var(--bg-muted)',
            padding: '10px 16px',
            borderRadius: '8px',
            display: 'flex',
            gap: '20px',
            fontSize: '0.85rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Department:</span>{' '}
              <strong>{selectedPilot?.departmentName}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Independent Auditor:</span>{' '}
              <strong style={{ color: 'var(--primary-color)' }}>{selectedPilot?.independentValidatorName}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Outcome Score:</span>{' '}
              <strong style={{ color: 'var(--success-text)' }}>{selectedPilot?.overallSuccessRate}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2-COLUMN SECTION: DECISION SUPPORT ROUTE SELECTOR vs ROUTE DETAILS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) 1.5fr', gap: '20px' }}>
        {/* LEFT COLUMN: LEGAL ROUTES SELECTOR */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--navy-900)', marginBottom: '8px' }}>
            🏛️ Statutory Procurement Routes
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Select the legally applicable route based on public procurement regulations and pilot outcome parameters.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {procurementRoutes.map((route) => {
              const isSelected = route.id === selectedRouteId;
              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: `2px solid ${isSelected ? 'var(--primary-color)' : 'var(--border-color)'}`,
                    background: isSelected ? 'var(--card-bg)' : 'var(--bg-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-color)', background: 'rgba(37,99,235,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                      {route.ruleCode}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: route.riskRating === 'LOW' ? 'var(--success-text)' : 'var(--warning-text)',
                      background: route.riskRating === 'LOW' ? 'var(--success-bg)' : 'var(--warning-bg)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {route.riskRating} RISK
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy-900)' }}>
                    {route.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Est. Approval: {route.recommendedDurationDays} days
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SELECTED ROUTE DETAILED ANALYSIS & COMPLIANCE GATE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Selected Route Legal Specification */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>SELECTED LEGAL FRAMEWORK:</span>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)', marginTop: '2px' }}>
                  {selectedRoute.name}
                </h3>
              </div>
              <StatusBadge status={selectedRoute.riskRating === 'LOW' ? 'LOW_RISK' : 'MEDIUM_RISK'} />
            </div>

            <div style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <strong>Statutory Legal Basis:</strong>
              <p style={{ margin: '4px 0 0 0', color: 'var(--navy-900)', fontStyle: 'italic' }}>
                "{selectedRoute.legalBasis}"
              </p>
            </div>

            <div style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
              <strong>Applicability & Suitability:</strong>
              <p style={{ color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                {selectedRoute.suitability}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--navy-900)' }}>
                  Mandatory Statutory Conditions:
                </strong>
                <ul style={{ paddingLeft: '16px', margin: '8px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {selectedRoute.conditions.map((cond, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{cond}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--navy-900)' }}>
                  Required Approval Chain:
                </strong>
                <ul style={{ paddingLeft: '16px', margin: '8px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {selectedRoute.approvalsRequired.map((app, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{app}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Compliance Gates & Justification Submission */}
          <div className="card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
              ✅ Mandatory Pre-Procurement Compliance Check
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={complianceChecks.performanceTargetMet}
                  onChange={(e) => setComplianceChecks({ ...complianceChecks, performanceTargetMet: e.target.checked })}
                />
                KPI Performance Targets Met (&gt;90%)
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={complianceChecks.independentAuditSigned}
                  onChange={(e) => setComplianceChecks({ ...complianceChecks, independentAuditSigned: e.target.checked })}
                />
                Independent Auditor Sign-off
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={complianceChecks.ipClearanceVerified}
                  onChange={(e) => setComplianceChecks({ ...complianceChecks, ipClearanceVerified: e.target.checked })}
                />
                IP Rights Clearance & License Verified
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={complianceChecks.dataSovereigntyConfirmed}
                  onChange={(e) => setComplianceChecks({ ...complianceChecks, dataSovereigntyConfirmed: e.target.checked })}
                />
                Data Sovereignty & DPDP 2023 Clearance
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={complianceChecks.budgetAvailabilityApproved}
                  onChange={(e) => setComplianceChecks({ ...complianceChecks, budgetAvailabilityApproved: e.target.checked })}
                />
                Scale-Up Escrow Budget Allocation
              </label>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                Departmental Rationale & Statutory Justification:
              </label>
              <textarea
                rows={3}
                value={justificationNotes}
                onChange={(e) => setJustificationNotes(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '6px',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                🔒 Formally logged in cryptographic audit registry upon generation.
              </span>
              <button className="btn btn-primary" onClick={handleGenerateCertificate}>
                📜 Generate Procurement Recommendation Certificate
              </button>
            </div>
          </div>

          {/* OFFICIAL CERTIFICATE PREVIEW MODAL / CARD */}
          {certificateGenerated && (
            <div className="card" style={{ padding: '24px', background: '#fff8f0', border: '2px solid var(--primary-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    REPUBLIC INNOVATION PROCUREMENT DIRECTBuffer
                  </span>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-900)', marginTop: '2px' }}>
                    OFFICIAL PROCUREMENT RECOMMENDATION CERTIFICATE
                  </h3>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Ref: <strong>CERT-PROC-2026-991A</strong><br />
                  Date: <strong>{new Date().toISOString().split('T')[0]}</strong>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px', fontSize: '0.825rem' }}>
                <div><strong>Target Solution:</strong> {selectedPilot.startupName}</div>
                <div><strong>Department:</strong> {selectedPilot.departmentName}</div>
                <div><strong>Selected Route:</strong> {selectedRoute.name} ({selectedRoute.ruleCode})</div>
                <div><strong>Pilot Outcome Score:</strong> {selectedPilot.overallSuccessRate}%</div>
                <div><strong>Auditor Verification:</strong> {selectedPilot.independentValidatorName}</div>
                <div><strong>Cryptographic Hash:</strong> SHA256:7f8a9e...3d2c</div>
              </div>

              <div style={{ background: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.825rem', marginBottom: '16px' }}>
                <strong>Approved Departmental Justification:</strong>
                <p style={{ margin: '4px 0 0 0', fontStyle: 'italic', color: 'var(--navy-900)' }}>
                  "{justificationNotes}"
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--success-text)', fontWeight: 600 }}>
                  ✓ Status: Ready for Ministry Secretary Sign-Off & Contract Execution
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-outline btn-sm" onClick={() => alert('Certificate PDF downloaded to your workstation.')}>
                    ⬇️ Download Executed PDF
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setCurrentView('scale-up')}>
                    🚀 Proceed to Scale-Up Registry
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
