import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ExtendedChallenge } from './MarketplacePage';

export const ChallengeDetailPage: React.FC<{
  challenge?: ExtendedChallenge | null;
  onBackToMarketplace: () => void;
}> = ({ challenge, onBackToMarketplace }) => {
  const { openModal, setCurrentView, isAuthenticated, currentRole, notifyInfo, notifyError } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Fallback default challenge if none selected: AI-Based Municipal Waste Optimization
  const currentChallenge: ExtendedChallenge = challenge || {
    id: 'ch-waste-01',
    code: 'CH-DUSWM-09',
    title: 'AI-Based Municipal Waste Optimization',
    departmentId: 'dept-105',
    departmentName: 'Department of Urban Sanitation & Waste Management',
    problemStatement: 'Municipal waste collection vehicles currently operate on rigid pre-scheduled routes. This leads to a dual operational failure: 35% of collection runs are executed for underfilled bins (wasting fuel and labor), while dense commercial hubs experience frequent 45 tons/day bin overflows causing public hygiene hazards.',
    desiredOutcome: 'Deploy real-time optical/ultrasonic fill-level sensors across 450 municipal bins and an AI dynamic route optimization engine to achieve a 30% reduction in fleet fuel consumption and zero unmanaged bin overflow incidents.',
    sector: 'CleanTech',
    budgetCap: 2500000,
    sandboxDurationMonths: 6,
    currentStage: 'CHALLENGE',
    status: 'OPEN',
    publishDate: '2026-03-01',
    submissionDeadline: '2026-10-30',
    eligibleStartupCriteria: [
      'DPIIT Registered Startup status',
      'Minimum TRL-7 validated IoT hardware and AI algorithm',
      'ISO 9001 quality certification & IP67 sensor weatherproofing',
      'Capability to integrate telemetry with municipal GIS mapping'
    ],
    applicationsCount: 18,
    evaluationsCount: 0,
    location: 'Pune, Maharashtra',
    technology: 'Edge AI & IoT Sensors',
    state: 'Maharashtra'
  };

  const currentSituationText = `Currently, 120 municipal waste collection trucks cover 85 fixed daily routes across Ward 7 and Ward 12. Because collection teams have zero visibility into real-time bin levels, trucks visit empty bins while missed overflows in vegetable markets generate over 200 public complaints weekly. Annual fuel expenditure stands at ₹35,00,000 with a vehicle carbon footprint of 1,200 metric tons of CO2.`;

  const requirementsList = [
    { category: 'Technical Requirements', items: ['IP67 optical fill-level sensors with >5 year lithium battery lifespan', 'Sub-100ms dynamic route calculation cloud backend', 'Android mobile navigation app for truck drivers with offline cache support'] },
    { category: 'Security & Privacy', items: ['AES-256 telemetry encryption from edge sensor to gateway', 'CERT-In cybersecurity audit clearance report mandatory', 'Role-based access control (RBAC) compliant with National Data Sharing policy'] },
    { category: 'Operational Deployment', items: ['Capability to complete physical sensor installation on 450 bins within 30 days', 'Provision of 2-day hands-on training for 60 municipal drivers', '99.5% system uptime SLA during 6-month trial'] }
  ];

  const impactMetrics = [
    { label: 'Fuel Savings', value: '30% Reduction', detail: 'Est. ₹10,00,000 direct annual fuel cost savings' },
    { label: 'CO2 Reduction', value: '400 Metric Tons/yr', detail: 'Reduced unnecessary vehicle idling & mileage' },
    { label: 'Citizen Complaints', value: '< 5 per month', detail: 'Down from 200+ weekly unmanaged overflows' },
    { label: 'Route Efficiency', value: '45% Faster', detail: 'Trucks only visit bins at >80% capacity' }
  ];

  const pilotInfo = {
    duration: '6 Months (180 Calendar Days)',
    location: 'Lucknow Municipal Corporation, Ward 7 & Ward 12, Uttar Pradesh',
    escrowFunding: '₹25,00,000 PFMS Milestone Escrow Allocation',
    datasetsProvided: '3 years historical waste tonnage logs, LMC GIS street vectors, vehicle GPS stream'
  };

  const evaluationCriteria = [
    { criterion: 'Technical Architecture & Sensor Durability', weight: 30, desc: 'Evaluates IP67 ruggedness, battery longevity, and sub-second route solver accuracy.' },
    { criterion: 'Route Optimization Algorithm Efficiency', weight: 25, desc: 'Evaluates distance reduction, traffic awareness, and load balance logic.' },
    { criterion: 'Financial Viability & Scalability', weight: 25, desc: 'Evaluates unit sensor cost, maintenance model, and multi-city scale ease.' },
    { criterion: 'Cybersecurity & Compliance', weight: 20, desc: 'Evaluates CERT-In audit, data encryption, and GFR 194 alignment.' }
  ];

  const timelinePhases = [
    { phase: 'Phase 1 (Month 1)', name: 'Hardware Deployment & Calibration', desc: 'Install 450 sensors and calibrate baseline fill telemetry.' },
    { phase: 'Phase 2 (Months 2-4)', name: 'Live Dynamic Routing Trial', desc: 'Drivers execute AI-generated dynamic routes daily across pilot wards.' },
    { phase: 'Phase 3 (Months 5-6)', name: 'Independent Performance Audit', desc: 'NEERI & PMC independent committee verify fuel savings & overflow reduction.' },
    { phase: 'Phase 4 (Month 7+)', name: 'Direct Procurement Scale-Up', desc: 'Fast-track transition to 5-year municipal contract covering all 41 wards.' }
  ];

  const documents = [
    { name: 'Municipal_Waste_RFP_Specification_v2.4.pdf', size: '3.4 MB', type: 'PDF Document' },
    { name: 'PMC_GIS_Street_Vector_Sample_Data.json', size: '1.2 MB', type: 'JSON Dataset' },
    { name: 'GovProcure_Sandbox_Escrow_Rules_2026.pdf', size: '1.8 MB', type: 'Legal Guideline' },
    { name: 'Sensor_Telemetry_API_Integration_Spec.pdf', size: '890 KB', type: 'Technical Spec' }
  ];

  const faqs = [
    { q: 'Does the startup retain Intellectual Property rights for the waste optimization algorithm?', a: 'Yes. Under GFR Rule 194 Sandbox provisions, the startup retains 100% IP ownership of all algorithms, hardware designs, and code base. The government department receives a perpetual operational usage license.' },
    { q: 'How are milestone escrow payments disbursed during the 6-month trial?', a: 'Funds are locked in a PFMS-linked escrow account. Disbursement occurs automatically in 3 tranches (50% on hardware deployment, 35% on 90-day trial performance signoff, 15% on final audit certification).' },
    { q: 'What happens after the 6-month sandbox trial is successfully completed?', a: 'If the independent audit verifies >25% fuel savings and >95% system uptime, the solution receives a National Scale Certificate, enabling direct non-tender procurement across PMC and sister municipalities.' },
    { q: 'Can non-DPIIT registered startups apply for this challenge?', a: 'DPIIT registration is mandatory. Unregistered startups can initiate DPIIT fast-track registration via the Startup India portal prior to application submission.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Back Button Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-outline btn-sm" onClick={onBackToMarketplace}>
          ← Back to Challenges Marketplace
        </button>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Challenge Specification Code: <strong>{currentChallenge.code}</strong>
        </span>
      </div>

      {/* Title & Key Header Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
        color: 'white',
        padding: '36px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-info">{currentChallenge.sector}</span>
              <span className="badge badge-neutral">📍 {currentChallenge.location}</span>
            </div>
            <h1 style={{ fontSize: '2.2rem', color: 'white', lineHeight: 1.2 }}>
              {currentChallenge.title}
            </h1>
            <div style={{ fontSize: '0.95rem', color: '#93C5FD', marginTop: '6px', fontWeight: 600 }}>
              🏛️ {currentChallenge.departmentName}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
              STATUS: {currentChallenge.status}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>
              👥 {currentChallenge.applicationsCount} Applications Submitted
            </span>
          </div>
        </div>

        {/* Highlight Specs Row */}
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '10px',
          padding: '16px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginTop: '8px'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>SANDBOX BUDGET CAP</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white' }}>
              ₹{currentChallenge.budgetCap.toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>PILOT DURATION</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>
              {currentChallenge.sandboxDurationMonths} Months
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>APPLICATION DEADLINE</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FCA5A5' }}>
              {currentChallenge.submissionDeadline}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>TARGET STAGE</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#6EE7B7' }}>
              {currentChallenge.currentStage}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left 2 Cols, Right 1 Col */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>

        {/* Left Detailed Specs Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* 1. Problem Statement */}
          <div className="card">
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '10px' }}>1. Problem Statement</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {currentChallenge.problemStatement}
            </p>
          </div>

          {/* 2. Current Situation */}
          <div className="card" style={{ borderLeft: '4px solid var(--warning-text)' }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '10px' }}>2. Current Operational Situation</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {currentSituationText}
            </p>
          </div>

          {/* 3. Desired Outcome */}
          <div className="card" style={{ borderLeft: '4px solid var(--success-text)' }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '10px' }}>3. Desired Outcome</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {currentChallenge.desiredOutcome}
            </p>
          </div>

          {/* 4. Requirements */}
          <div className="card">
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '16px' }}>4. Detailed Technical & Security Requirements</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {requirementsList.map((req, idx) => (
                <div key={idx} style={{ background: 'var(--bg-muted)', padding: '14px 16px', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '0.95rem', color: 'var(--navy-900)', marginBottom: '8px' }}>{req.category}</h3>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {req.items.map((it, i) => <li key={i}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Expected Impact */}
          <div className="card">
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '16px' }}>5. Expected Impact Metrics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {impactMetrics.map((m, idx) => (
                <div key={idx} style={{ background: 'var(--bg-surface-hover)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{m.label}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '2px' }}>{m.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{m.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Evaluation Criteria */}
          <div className="card">
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '14px' }}>6. Independent Expert Evaluation Criteria</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Evaluation Metric</th>
                    <th>Weight</th>
                    <th>Scoring Focus</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluationCriteria.map((c, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{c.criterion}</td>
                      <td style={{ fontWeight: 800, color: 'var(--primary-700)' }}>{c.weight}%</td>
                      <td style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>{c.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 7. Timeline & Phases */}
          <div className="card">
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '16px' }}>7. Sandbox Trial Timeline</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {timelinePhases.map((tp, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--primary-600)',
                    color: 'white',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    flexShrink: 0
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ background: 'var(--bg-muted)', padding: '12px 16px', borderRadius: '8px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)' }}>{tp.name}</span>
                      <span className="badge badge-neutral">{tp.phase}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{tp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Frequently Asked Questions */}
          <div className="card">
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '16px' }}>8. Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'var(--bg-surface-hover)',
                      border: 'none',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: 'var(--navy-900)',
                      fontSize: '0.9rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <span>❓ {faq.q}</span>
                    <span>{openFaqIndex === i ? '▲' : '▼'}</span>
                  </button>
                  {openFaqIndex === i && (
                    <div style={{ padding: '14px 16px', fontSize: '0.875rem', color: 'var(--text-secondary)', background: 'var(--bg-surface)', lineHeight: 1.5 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sticky Sidebar Info & Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Apply CTA Card */}
          <div className="card" style={{
            background: 'var(--bg-surface)',
            border: '2px solid var(--primary-600)',
            position: 'sticky',
            top: '80px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)', marginBottom: '6px' }}>
              Submit Solution Proposal
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Open to verified DPIIT registered deep-tech startups.
            </p>

            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginBottom: '12px' }}
              onClick={() => {
                if (isAuthenticated && currentRole === 'STARTUP') {
                  openModal('APPLY_CHALLENGE', currentChallenge);
                } else if (!isAuthenticated) {
                  notifyInfo('Startup Sign-In Required', 'Please sign in with verified startup credentials to apply for this challenge.');
                  setCurrentView('public-login');
                } else {
                  notifyError('Role Restriction', 'Only verified startups can submit challenge proposals.');
                }
              }}
            >
              Apply as Startup 🚀
            </button>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              🔒 100% IP Protected under GFR Rule 194
            </div>
          </div>

          {/* Pilot Specification Summary */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
              Pilot Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.825rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Duration:</span>
                <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{pilotInfo.duration}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Testbed Location:</span>
                <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{pilotInfo.location}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Escrow Mechanism:</span>
                <div style={{ fontWeight: 700, color: 'var(--success-text)' }}>{pilotInfo.escrowFunding}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Datasets Provided:</span>
                <div style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{pilotInfo.datasetsProvided}</div>
              </div>
            </div>
          </div>

          {/* Mandatory Eligibility Criteria */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '10px' }}>
              Startup Eligibility
            </h3>
            <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {currentChallenge.eligibleStartupCriteria.map((crit, i) => (
                <li key={i}>✓ {crit}</li>
              ))}
            </ul>
          </div>

          {/* Download Documents Section */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
              Specification Documents
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {documents.map((doc, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-muted)',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.78rem'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>📄 {doc.name}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{doc.size} • {doc.type}</div>
                  </div>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => alert(`Downloading document: ${doc.name}`)}
                  >
                    ⬇️
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};