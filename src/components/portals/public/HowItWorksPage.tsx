import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { LIFECYCLE_STAGES } from '../../../mockData';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentView, setCurrentRole } = useApp();
  const [activeTab, setActiveTab] = useState<'GOVERNMENT' | 'STARTUP' | 'EXPERT' | 'AUDITOR'>('GOVERNMENT');
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);

  const stageDetails = [
    {
      title: 'Stage 1: Problem Definition & Operational Scoping',
      actor: 'Government Department',
      desc: 'Operational pain points are identified by ministry officials and translated into quantifiable outcome metrics rather than rigid technical inputs.',
      inputs: 'Field operational logs, congestion data, water purity targets',
      deliverable: 'Approved Problem Statement & Need Document',
      gfrRef: 'GFR Rule 194 Scoping Clause'
    },
    {
      title: 'Stage 2: Outcome Challenge Specification',
      actor: 'GovProcure Platform Engine',
      desc: 'The problem statement is published to the public marketplace with sandbox budget allocation, trial duration, and eligibility criteria.',
      inputs: 'Outcome Specification, Escrow Budget Allocation',
      deliverable: 'Public Outcome Challenge Listing',
      gfrRef: 'Public Sandbox Circular #88'
    },
    {
      title: 'Stage 3: Startup Discovery & Matching',
      actor: 'Deep-Tech Startups',
      desc: 'DPIIT registered startups matching sector and TRL criteria submit technical proposals, hardware test reports, and milestone budgets.',
      inputs: 'TRL Self-Declaration, Architecture Deck, Financial Bid',
      deliverable: 'Verified Startup Discovery Dossier',
      gfrRef: 'DPIIT Verification API'
    },
    {
      title: 'Stage 4: Independent Expert Panel Evaluation',
      actor: 'IIT / NIC / AIIMS Expert Panel',
      desc: 'Multi-disciplinary evaluation panel conducts blind technical scoring, cybersecurity audit verification, and financial feasibility checks.',
      inputs: 'Application Dossier, Penetration Test Reports',
      deliverable: 'Signed Evaluator Scorecard (Cutoff: >80/100)',
      gfrRef: 'NIC Sovereign Audit Protocol'
    },
    {
      title: 'Stage 5: Controlled Sandbox Pilot Trial',
      actor: 'Startup & Department Host Bed',
      desc: 'Shortlisted startup deploys solution in a designated operational testbed (e.g. 6 traffic intersections or 5 rural PHCs) for 90-180 days.',
      inputs: 'Sandbox Contract execution, Hardware Deployment',
      deliverable: 'Live Operational Sandbox Testbed',
      gfrRef: 'PFMS Milestone Escrow Agreement'
    },
    {
      title: 'Stage 6: KPI & Telemetry Measurement',
      actor: 'Automated IoT / API Telemetry Engine',
      desc: 'Continuous real-time data telemetry tracks operational metrics against target baselines with zero manual tampering.',
      inputs: 'IoT Sensor Feeds, API Endpoint Streams',
      deliverable: 'Automated KPI Performance Dashboard',
      gfrRef: 'Sovereign Telemetry Protocol'
    },
    {
      title: 'Stage 7: Third-Party Independent Validation',
      actor: 'Independent Auditor (e.g. NIUA, ICMR, NEERI)',
      desc: 'Third-party auditor measures real-world performance against target KPIs and certifies milestone and pilot completion.',
      inputs: 'Live Metric Streams, Field Inspection Sampling',
      deliverable: 'Certified Independent Audit Report',
      gfrRef: 'Independent Validation Schema'
    },
    {
      title: 'Stage 8: Fast-Track Direct Procurement',
      actor: 'Department Nodal Procurement Officer',
      desc: 'Upon successful audit signoff, the solution receives direct procurement clearance without mandatory re-tendering under GFR Rule 194.',
      inputs: 'Final Audit Certificate, Unit Cost Schedule',
      deliverable: 'Direct Procurement Contract Award',
      gfrRef: 'GFR Rule 194 Direct Award Provision'
    },
    {
      title: 'Stage 9: Cross-Departmental Scale-Up',
      actor: 'Ministry Steering Committee & Sister Depts',
      desc: 'Standardized procurement template is shared with state & central departments for rapid multi-agency scale deployment.',
      inputs: 'Scale Template, Deployment Blueprint',
      deliverable: 'Nationwide Replicated Procurement Contract',
      gfrRef: 'National Innovation Replicability Guidelines'
    }
  ];

  const roleWorkflows = {
    GOVERNMENT: [
      { step: '1. Identify Pain Point', detail: 'Convert departmental bottlenecks into measurable target KPIs.' },
      { step: '2. Post Challenge', detail: 'Define sandbox budget cap (₹15 Lakh - ₹50 Lakh) and trial duration.' },
      { step: '3. Host Sandbox', detail: 'Provide testbed location, GIS maps, or data feeds to shortlisted startup.' },
      { step: '4. Award Scale Contract', detail: 'Transition validated pilot to multi-year deployment upon auditor signoff.' }
    ],
    STARTUP: [
      { step: '1. Discover Challenges', detail: 'Browse open outcome challenges matching your TRL-6+ technology.' },
      { step: '2. Submit Proposal', detail: 'Upload technical architecture deck and milestone budget breakdown.' },
      { step: '3. Execute Pilot', detail: 'Deploy solution in government testbed with 100% IP retention.' },
      { step: '4. Receive Escrow Payouts', detail: 'Get automated milestone funds disbursed directly into your bank.' }
    ],
    EXPERT: [
      { step: '1. Receive Assigned Dossier', detail: 'Review anonymized technical proposals in your domain.' },
      { step: '2. Score Rubric', detail: 'Evaluate Architecture (30%), Field Feasibility (25%), Cost (25%), Security (20%).' },
      { step: '3. Sign & Submit', detail: 'Submit cryptographic evaluation recommendation.' }
    ],
    AUDITOR: [
      { step: '1. Inspect Testbed', detail: 'Perform unannounced physical and digital telemetry audits.' },
      { step: '2. Benchmark KPIs', detail: 'Compare baseline metrics against achieved pilot performance data.' },
      { step: '3. Certify Milestone', detail: 'Sign digital verification certificate to unlock PFMS escrow payout.' }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Header */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
        color: 'white',
        padding: '44px 40px',
        borderRadius: '16px'
      }}>
        <span className="badge badge-info" style={{ marginBottom: '12px' }}>END-TO-END PROCESS</span>
        <h1 style={{ fontSize: '2.4rem', color: 'white', lineHeight: 1.2 }}>
          How Government Sandbox Procurement Works
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginTop: '14px', maxWidth: '800px', lineHeight: 1.6 }}>
          A step-by-step walkthrough of how public challenges are posted, independently evaluated, piloted in live sandboxes, and scaled nationally.
        </p>
      </div>

      {/* Interactive Lifecycle Step Selector */}
      <div className="card">
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>Interactive 7-Stage Sandbox Stepper</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Click on any stage below to inspect inputs, actors, and legal deliverables.</p>
        </div>

        {/* Stepper Node Bar */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
          {stageDetails.map((st, i) => (
            <button
              key={i}
              onClick={() => setSelectedStageIndex(i)}
              style={{
                background: selectedStageIndex === i ? 'var(--primary-700)' : 'var(--bg-muted)',
                color: selectedStageIndex === i ? 'white' : 'var(--navy-900)',
                border: selectedStageIndex === i ? '1px solid var(--primary-800)' : '1px solid var(--border-subtle)',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.825rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: selectedStageIndex === i ? 'white' : 'var(--navy-800)',
                color: selectedStageIndex === i ? 'var(--primary-700)' : 'white',
                fontSize: '0.7rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {i + 1}
              </span>
              <span>Stage {i + 1}</span>
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Display */}
        <div style={{ background: 'var(--bg-muted)', padding: '24px', borderRadius: '12px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-900)' }}>
              {stageDetails[selectedStageIndex].title}
            </h3>
            <span className="badge badge-info">{stageDetails[selectedStageIndex].actor}</span>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
            {stageDetails[selectedStageIndex].desc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>REQUIRED INPUTS</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--navy-900)', marginTop: '4px', fontWeight: 600 }}>
                {stageDetails[selectedStageIndex].inputs}
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>KEY DELIVERABLE</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--success-text)', marginTop: '4px', fontWeight: 600 }}>
                {stageDetails[selectedStageIndex].deliverable}
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>GOVERNANCE CLAUSE</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--primary-700)', marginTop: '4px', fontWeight: 600 }}>
                {stageDetails[selectedStageIndex].gfrRef}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role-Based Workflow Perspectives */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>Role-Specific User Journeys</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Select your role to view your specific workflow steps.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['GOVERNMENT', 'STARTUP', 'EXPERT', 'AUDITOR'] as const).map(role => (
              <button
                key={role}
                className={`btn ${activeTab === role ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveTab(role)}
              >
                {role === 'GOVERNMENT' ? '🏛️ Gov Official' : role === 'STARTUP' ? '🚀 Startup' : role === 'EXPERT' ? '🔬 Evaluator' : '📊 Auditor'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-cols-4">
          {roleWorkflows[activeTab].map((step, idx) => (
            <div key={idx} className="card" style={{ borderLeft: '3px solid var(--primary-600)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--primary-700)', fontWeight: 700, marginBottom: '4px' }}>
                STEP 0{idx + 1}
              </div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--navy-900)', marginBottom: '8px' }}>
                {step.step}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Banner */}
      <div className="card" style={{ background: 'var(--navy-900)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', color: 'white' }}>Ready to participate in an active outcome challenge?</h3>
          <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '4px' }}>
            Browse open challenges or log in to submit your solution proposal.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" onClick={() => setCurrentView('public-challenges')}>
            Browse Marketplace →
          </button>
          <button className="btn btn-secondary" onClick={() => { setCurrentRole('PUBLIC'); setCurrentView('public-login'); }}>
            Login as Startup
          </button>
        </div>
      </div>

    </div>
  );
};
