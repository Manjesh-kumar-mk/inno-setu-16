import React, { useState } from 'react';
import { Modal } from './Modal';
import { Application, Startup } from '../../types';
import { useApp } from '../../context/AppContext';

// ==========================================
// FEATURE 1 — PROBLEM STATEMENT ASSISTANT
// ==========================================
interface AIProblemAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDraft: (draft: {
    title?: string;
    problemDescription: string;
    goodExample: string;
    baselineMetric: string;
    primaryMetric: string;
    targetThreshold: string;
    secondaryMetrics: string;
    eligibleStartupCriteria: string[];
  }) => void;
}

export const AIProblemAssistantModal: React.FC<AIProblemAssistantModalProps> = ({
  isOpen,
  onClose,
  onApplyDraft
}) => {
  const [roughInput, setRoughInput] = useState<string>('Our department takes too long to process applications.');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);

  // Mock AI generated result state based on input
  const sampleRoughPrompts = [
    'Our department takes too long to process applications.',
    'Municipal water distribution loses potable water through pipe leaks undetected.',
    'Public transit delays are not communicated to commuters in real-time.'
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 600);
  };

  const generatedResult = {
    title: roughInput.includes('water')
      ? 'Automated Non-Revenue Water Leak Detection & Smart Flow Balancing'
      : roughInput.includes('transit')
        ? 'Real-Time IoT Transit Delay Telemetry & Passenger Information Matrix'
        : 'Automated Multi-Tier Public Application Processing & Credentials Verification',

    // 1. Structured Problem Statement
    structuredProblemStatement: roughInput.includes('water')
      ? 'Municipal water grids lose ~38% of treated potable water via sub-surface fractures before reaching consumer meters due to delayed manual leak detection.'
      : roughInput.includes('transit')
        ? 'Commuters face unpredictable transit delays due to legacy telemetry systems that fail to stream real-time bus location and congestion metrics.'
        : 'Government application verification workflows rely on manual physical paper validation, resulting in severe administrative bottlenecks, 18-day average processing latency, and high operational costs.',

    // 2. Current-State Description
    currentStateDescription: roughInput.includes('water')
      ? 'Baseline acoustic inspection takes 72 hours per 10km grid. Water loss average: 38% total volume per annum.'
      : roughInput.includes('transit')
        ? 'Current ETA updates occur at 15-minute polling intervals with 45% spatial accuracy errors during peak rush hours.'
        : 'Current baseline processing time: 18 working days per application. Backlog volume: 4,500 pending cases. Error rate: 6.2%.',

    // 3. Desired Outcomes
    desiredOutcomes: roughInput.includes('water')
      ? 'Achieve automated real-time leak localization within 5 meters and under 15 minutes of pipe fracture.'
      : roughInput.includes('transit')
        ? 'Sub-3 second ETA update latency across 1,200 municipal buses with 98% arrival prediction accuracy.'
        : 'Reduce end-to-end application turnaround time from 18 days to under 24 hours while eliminating human verification errors.',

    // 4. Possible KPIs
    possibleKpis: [
      roughInput.includes('water') ? 'Leak Localization Time (min)' : 'Turnaround Time (hours)',
      roughInput.includes('water') ? 'Non-Revenue Water Loss (%)' : 'Automated Credential Verification Rate (%)',
      roughInput.includes('water') ? 'Acoustic Sensor Telemetry Uptime (%)' : 'Processing Cost Per Application (₹)'
    ],

    // 5. Measurable Targets
    measurableTargets: [
      roughInput.includes('water') ? 'Reduce water loss by 35% within 60 days' : 'Turnaround time < 24 hours (95% reduction)',
      roughInput.includes('water') ? 'Detection latency < 15 minutes' : 'Verification accuracy > 99.2%',
      roughInput.includes('water') ? '99.9% telemetry stream uptime' : 'Cut administrative cost per application by 60%'
    ],

    // 6. Relevant Technology Categories
    technologyCategories: [
      roughInput.includes('water') ? 'IoT Sensors & Acoustic Telemetry' : 'OCR & AI Document Parsing',
      roughInput.includes('water') ? 'Edge AI Pressure Analytics' : 'Zero-Knowledge Credential Validation',
      roughInput.includes('water') ? 'GIS Mapping API Integration' : 'Workflow Automation Engine'
    ]
  };

  const handleApply = () => {
    onApplyDraft({
      title: generatedResult.title,
      problemDescription: generatedResult.structuredProblemStatement,
      goodExample: generatedResult.desiredOutcomes,
      baselineMetric: generatedResult.currentStateDescription,
      primaryMetric: generatedResult.possibleKpis[0],
      targetThreshold: generatedResult.measurableTargets[0],
      secondaryMetrics: generatedResult.possibleKpis.slice(1).join('; '),
      eligibleStartupCriteria: [
        'DPIIT Registered Startup',
        'Minimum TRL-7 validated solution',
        ...generatedResult.technologyCategories
      ]
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✨ AI Problem Statement Assistant"
      maxWidth="780px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'var(--primary-50, #f0f7ff)', border: '1px solid var(--primary-200, #bae6fd)', borderRadius: '8px', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.1rem' }}>✨</span>
            <strong style={{ fontSize: '0.9rem', color: 'var(--primary-900, #0369a1)' }}>AI Spec Drafting Tool</strong>
            <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>AI-Assisted • Requires Human Approval</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
            Enter a rough problem idea or administrative pain point. The AI will structure it into a formal outcome-driven challenge specification.
          </p>
        </div>

        {/* Rough Input Box */}
        <div>
          <label className="form-label" style={{ fontWeight: 700 }}>
            Enter Rough Problem / Departmental Bottleneck:
          </label>
          <textarea
            className="form-input"
            rows={3}
            value={roughInput}
            onChange={(e) => setRoughInput(e.target.value)}
            placeholder="e.g. Our department takes too long to process applications..."
            style={{ width: '100%', fontSize: '0.875rem' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Try sample prompt:</span>
            {sampleRoughPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.72rem', padding: '2px 8px' }}
                onClick={() => setRoughInput(p)}
              >
                "{p.substring(0, 32)}..."
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={isGenerating || !roughInput.trim()}
          >
            {isGenerating ? '✨ Structuring with AI...' : '✨ Generate AI Draft Specification'}
          </button>
        </div>

        {/* AI Output Preview Section */}
        {hasGenerated && (
          <div style={{ background: 'var(--bg-muted)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', animation: 'fadeIn 0.2s ease-in-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--navy-900)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>✨</span> AI Drafted Outcome Specification
              </h4>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Ready for Review</span>
            </div>

            {/* 1. Structured Problem Statement */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                1. Structured Problem Statement
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--navy-900)', marginTop: '2px', lineHeight: 1.4, background: 'var(--bg-surface)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                {generatedResult.structuredProblemStatement}
              </div>
            </div>

            {/* 2. Current-State Description */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                2. Current-State Description (Baseline Status Quo)
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--navy-900)', marginTop: '2px', background: 'var(--bg-surface)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                {generatedResult.currentStateDescription}
              </div>
            </div>

            {/* 3. Desired Outcomes */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                3. Desired Outcomes
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--navy-900)', marginTop: '2px', background: 'var(--bg-surface)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                {generatedResult.desiredOutcomes}
              </div>
            </div>

            {/* Grid for KPIs, Targets & Tech Categories */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              {/* 4. Possible KPIs */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  4. Recommended KPIs
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {generatedResult.possibleKpis.map((kpi, idx) => (
                    <li key={idx} style={{ marginBottom: '2px' }}>{kpi}</li>
                  ))}
                </ul>
              </div>

              {/* 5. Measurable Targets */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  5. Measurable Targets
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {generatedResult.measurableTargets.map((target, idx) => (
                    <li key={idx} style={{ marginBottom: '2px' }}>{target}</li>
                  ))}
                </ul>
              </div>

              {/* 6. Relevant Technology Categories */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  6. Tech Stack Categories
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {generatedResult.technologyCategories.map((tech, idx) => (
                    <span key={idx} style={{ fontSize: '0.7rem', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                ℹ️ Clicking apply will populate the wizard fields. You retain full editing control.
              </span>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleApply}
              >
                ✨ Apply AI Draft to Form →
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};


// ==========================================
// FEATURE 2 — STARTUP MATCHING BREAKDOWN
// ==========================================
interface AIMatchBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  startup: Startup | null;
}

export const AIMatchBreakdownModal: React.FC<AIMatchBreakdownModalProps> = ({
  isOpen,
  onClose,
  startup
}) => {
  if (!startup) return null;

  // Mock score breakdown based on startup properties
  const aiMatch = startup.pastGovContractsCount >= 2 ? 96 : 89;
  const techMatch = startup.readinessLevel === 'TRL-8' ? 98 : 91;
  const domainMatch = startup.category === 'SmartMobility' ? 95 : 92;
  const capabilityMatch = 94;
  const pastExperienceMatch = startup.pastGovContractsCount > 0 ? 95 : 82;
  const eligibilityMatch = 100;

  const matchDimensions = [
    { label: 'Overall AI Match Score', score: aiMatch, color: '#0284c7' },
    { label: 'Technology Match', score: techMatch, color: '#10b981' },
    { label: 'Domain Match', score: domainMatch, color: '#6366f1' },
    { label: 'Capability Match', score: capabilityMatch, color: '#8b5cf6' },
    { label: 'Past Experience Match', score: pastExperienceMatch, color: '#f59e0b' },
    { label: 'Eligibility Match', score: eligibilityMatch, color: '#14b8a6' }
  ];

  const explainableReasons = [
    `Strong TRL-8 validation status (${startup.readinessLevel}) with ${startup.pastGovContractsCount} completed government contracts.`,
    `Direct capability alignment with requested sensor telemetry & high-density data pipeline requirements.`,
    `Zero security flag record with DPIIT registration (${startup.dpiitRegistrationNumber}).`,
    `Validated team expertise (${startup.employeeCount} engineers & specialists) with prior municipal execution experience.`
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`✨ AI Startup Matching Analysis: ${startup.name}`}
      maxWidth="680px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-muted)', padding: '14px 18px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', margin: 0, fontWeight: 800 }}>{startup.name}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>HQ: {startup.headquarters} • DPIIT: {startup.dpiitRegistrationNumber}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0284c7' }}>{aiMatch}%</div>
            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>✨ AI Recommend</span>
          </div>
        </div>

        {/* 6 Match Dimension Indicators */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '10px' }}>
            Explainable 6-Dimension AI Compatibility Breakdown:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {matchDimensions.map((dim, idx) => (
              <div key={idx} style={{ background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.825rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{dim.label}</span>
                  <span style={{ fontWeight: 800, color: dim.color }}>{dim.score}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg-muted)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${dim.score}%`,
                      height: '100%',
                      background: dim.color,
                      borderRadius: '4px',
                      transition: 'width 0.5s ease-in-out'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explainable Recommendation Rationale */}
        <div style={{ background: 'var(--primary-50, #f0f7ff)', border: '1px solid var(--primary-200, #bae6fd)', padding: '14px', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-900, #0369a1)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🧠</span> Explainable AI Recommendation Rationale:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--navy-900)', lineHeight: 1.5 }}>
            {explainableReasons.map((reason, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};


// ==========================================
// FEATURE 3 — PROPOSAL SUMMARY
// ==========================================
interface AIProposalSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
}

export const AIProposalSummaryModal: React.FC<AIProposalSummaryModalProps> = ({
  isOpen,
  onClose,
  application
}) => {
  if (!application) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`✨ AI Proposal Summary: ${application.startupName}`}
      maxWidth="780px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-muted)', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.95rem' }}>{application.challengeTitle}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Applicant: <strong>{application.startupName}</strong> • Submitted: {application.submissionDate}</div>
          </div>
          <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>✨ AI-Generated Summary</span>
        </div>

        {/* 6 Required Proposal Summary Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Executive Summary */}
          <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-700)', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
              1. Executive Summary
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--navy-900)', margin: 0, lineHeight: 1.4 }}>
              The applicant proposes an end-to-end edge-computed artificial intelligence framework integrated with IoT sensors. The solution focuses on real-time anomaly detection, automated alert dispatch, and 35%+ efficiency gains over legacy infrastructure.
            </p>
          </div>

          {/* Technology Architecture */}
          <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-700)', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
              2. Technology Architecture
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--navy-900)', margin: 0, lineHeight: 1.4 }}>
              Built on NVIDIA Jetson edge gateways connected to cellular telemetry channels. Software stack includes containerized Docker microservices, zero-trust encrypted API streams, and an interactive GIS dashboard.
            </p>
          </div>

          {/* Implementation Plan */}
          <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-700)', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
              3. Implementation Plan
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--navy-900)', margin: 0, lineHeight: 1.4 }}>
              • Phase 1 (Weeks 1-4): Field deployment of 25 sensor nodes & network baseline callibration.<br />
              • Phase 2 (Weeks 5-12): Real-time sandbox benchmarking and automated alert verification.<br />
              • Phase 3 (Weeks 13-24): Independent auditor certification & department scale-up roadmap.
            </p>
          </div>

          {/* Cost & Commercials */}
          <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-700)', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
              4. Cost Breakdown & Commercial Model
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--navy-900)', margin: 0, lineHeight: 1.4 }}>
              Total Proposed Sandbox Budget: ₹28,500,000 (Hardware: ₹14L, Deployment & Labor: ₹9.5L, Software License & Cloud: ₹5L). Complies with government budget cap.
            </p>
          </div>

          {/* Timeline & Milestones */}
          <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-700)', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
              5. Timeline & Delivery Milestones
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--navy-900)', margin: 0, lineHeight: 1.4 }}>
              6-Month Sandbox Period with 4 quarterly milestone reviews. Final evaluation and TRL-9 scale-up clearance scheduled for Month 6.
            </p>
          </div>

          {/* Key Risks */}
          <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-700)', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
              6. Key Identified Risks
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--navy-900)', margin: 0, lineHeight: 1.4 }}>
              Cellular connectivity dropouts during monsoon weather (Mitigation: On-device offline buffering); Specialized hardware import delays (Mitigation: Dual-sourcing local components).
            </p>
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '4px' }}>
          * AI-generated summary compiled from submitted technical proposal documents. Evaluators must verify against source PDF attachments.
        </div>
      </div>
    </Modal>
  );
};


// ==========================================
// FEATURE 4 — RISK ASSISTANT
// ==========================================
interface AIRiskAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityName?: string;
  onConfirmRisk?: (risk: any) => void;
}

export const AIRiskAssistantModal: React.FC<AIRiskAssistantModalProps> = ({
  isOpen,
  onClose,
  entityName = 'Selected Proposal / Sandbox Trial',
  onConfirmRisk
}) => {
  const { notifySuccess } = useApp();
  const [analyzed, setAnalyzed] = useState(true);

  // 6 Required Risk Categories: Technical, Financial, Data, Cybersecurity, Operational, Compliance
  const aiIdentifiedRisks = [
    {
      category: 'Technical',
      severity: 'HIGH',
      description: 'Edge node sensor thermal throttling under sustained ambient temperatures exceeding 42°C.',
      mitigation: 'Implement industrial-grade IP67 heat-sink enclosures and adaptive sampling frequency.'
    },
    {
      category: 'Financial',
      severity: 'MEDIUM',
      description: 'Sub-component import tariffs fluctuation affecting hardware replacement buffer budget.',
      mitigation: 'Lock in 15% contingency reserve in milestone budget allocation.'
    },
    {
      category: 'Data',
      severity: 'MEDIUM',
      description: 'Telemetry packet drops during peak cellular tower congestion.',
      mitigation: 'Enable local eMMC non-volatile flash storage with auto-retry synchronization.'
    },
    {
      category: 'Cybersecurity',
      severity: 'CRITICAL',
      description: 'Unencrypted OTA firmware update vulnerability on edge node gateways.',
      mitigation: 'Enforce hardware TPM 2.0 cryptoprocessor and signed firmware verification.'
    },
    {
      category: 'Operational',
      severity: 'LOW',
      description: 'Municipal field technician access permission delays during night maintenance windows.',
      mitigation: 'Pre-clear municipal access passes during contract sign-off phase.'
    },
    {
      category: 'Compliance',
      severity: 'MEDIUM',
      description: 'DPDP Act 2023 compliance for localized sensor data storage.',
      mitigation: 'Restrict cloud telemetry servers to MeitY-empanelled data centers within India.'
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✨ AI Risk Assistant Analysis"
      maxWidth="780px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'var(--bg-muted)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-900)', margin: 0, fontWeight: 800 }}>
              Multi-Domain Risk Scanning: {entityName}
            </h4>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Scanned 6 risk categories: Technical, Financial, Data, Cybersecurity, Operational, Compliance.
            </div>
          </div>
          <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>✨ AI Risk Engine</span>
        </div>

        {/* Risk Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {aiIdentifiedRisks.map((risk, idx) => (
            <div key={idx} style={{ background: 'var(--bg-surface)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--navy-900)' }}>
                    {risk.category} Risk
                  </span>
                  <span className={`badge ${risk.severity === 'CRITICAL' || risk.severity === 'HIGH' ? 'badge-danger' : risk.severity === 'MEDIUM' ? 'badge-warning' : 'badge-info'}`} style={{ fontSize: '0.65rem' }}>
                    {risk.severity}
                  </span>
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
                  {risk.description}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'var(--bg-muted)', padding: '6px 10px', borderRadius: '4px' }}>
                  <strong>Suggested Mitigation:</strong> {risk.mitigation}
                </div>
              </div>
              {onConfirmRisk && (
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}
                  onClick={() => {
                    onConfirmRisk(risk);
                    notifySuccess('Risk Added', `${risk.category} (${risk.severity}) added to official risk register.`);
                  }}
                >
                  + Add to Risk Matrix
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};


// ==========================================
// FEATURE 5 — KPI INSIGHTS CARD
// ==========================================
export const AIKpiInsightsCard: React.FC = () => {
  const [isSignedOff, setIsSignedOff] = useState(false);

  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)', border: '1px solid var(--primary-200, #bae6fd)', padding: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>✨</span>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-900)', margin: 0 }}>
            AI KPI Performance Insights
          </h3>
          <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>✨ AI Analytics</span>
        </div>

        <button
          type="button"
          className={`btn ${isSignedOff ? 'btn-success' : 'btn-outline'} btn-sm`}
          onClick={() => setIsSignedOff(!isSignedOff)}
        >
          {isSignedOff ? '✓ Human Verified & Approved' : 'Sign Off AI Insights'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        {/* Targets Achieved */}
        <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: '4px' }}>
            ✓ Targets Achieved
          </div>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--navy-900)' }}>
            <li><strong>Processing Latency:</strong> 5.4 min (Target: 6.0 min) — Exceeded by 10%</li>
            <li><strong>Cost Efficiency:</strong> ₹72 / unit (Target: ₹75)</li>
            <li><strong>User Satisfaction:</strong> 87% (Target: 80%)</li>
          </ul>
        </div>

        {/* Targets Missed / At Risk */}
        <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '4px' }}>
            ⚠️ Targets Missed / At Risk
          </div>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--navy-900)' }}>
            <li><strong>Nighttime Camera Accuracy:</strong> 91.2% (Target: 95.0%)</li>
            <li><strong>Gateway Uptime:</strong> 97.4% vs 99.5% target during heavy rain trial</li>
          </ul>
        </div>

        {/* Performance Trends */}
        <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px' }}>
            📈 Performance Trends
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--navy-900)', margin: 0, lineHeight: 1.4 }}>
            Upward efficiency trajectory noted across last 4 consecutive weeks. Latency dropped by 18% following Firmware v2.1 deployment.
          </p>
        </div>

        {/* Potential Issues & Bottlenecks */}
        <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', marginBottom: '4px' }}>
            🔍 Potential Issues & Bottlenecks
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--navy-900)', margin: 0, lineHeight: 1.4 }}>
            Peak-hour network bandwidth throttling observed between 08:30 - 10:00 AM. Recommend upgrading gateway SIM cards to dedicated private 5G slice.
          </p>
        </div>
      </div>
    </div>
  );
};
