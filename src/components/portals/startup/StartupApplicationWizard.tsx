import React, { useState } from 'react';
import { Challenge } from '../../../types';
import { useApp } from '../../../context/AppContext';

interface Props {
  challenge?: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StartupApplicationWizard: React.FC<Props> = ({ challenge, isOpen, onClose }) => {
  const { startups, addAuditEvent } = useApp();
  const startup = startups[0] || {};
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [eligibilityChecked, setEligibilityChecked] = useState(true);
  const [noConflictChecked, setNoConflictChecked] = useState(true);
  
  const [solutionTitle, setSolutionTitle] = useState(
    challenge ? `AI-Powered Edge Analytics for ${challenge.title}` : ''
  );
  const [execSummary, setExecSummary] = useState(
    'Our proprietary edge-computing AI framework deploys high-throughput computer vision models directly onto local infrastructure for sub-10ms response times without cloud latency dependencies.'
  );
  
  const [techStack, setTechStack] = useState('PyTorch, TensorRT, ROS2, Kubernetes Edge, Hardware Root of Trust');
  const [trlLevel, setTrlLevel] = useState('TRL-7');
  const [ipStatus, setIpStatus] = useState('Patented (Patent Grant #IN-2024-91024)');
  
  const [timelineMonths, setTimelineMonths] = useState(challenge?.sandboxDurationMonths || 6);
  const [keyMilestones, setKeyMilestones] = useState('M1: Edge Sensor Deployment, M2: Algorithmic Tuning, M3: Final Independent Audit');
  
  const [proposedBudget, setProposedBudget] = useState(challenge?.budgetCap || 350000);
  const [commercialNotes, setCommercialNotes] = useState('Cost includes hardware node provisioning, on-site sensors, independent auditor verification, and 6-month SLA maintenance.');

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalSteps = 9;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAuditEvent('SUBMIT_APPLICATION', challenge ? challenge.title : 'Outcome Challenge');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  const stepsList = [
    { num: 1, name: 'Eligibility' },
    { num: 2, name: 'Company Info' },
    { num: 3, name: 'Proposed Solution' },
    { num: 4, name: 'Tech & Architecture' },
    { num: 5, name: 'Implementation' },
    { num: 6, name: 'Team' },
    { num: 7, name: 'Commercial Proposal' },
    { num: 8, name: 'Compliance' },
    { num: 9, name: 'Review & Submit' }
  ];

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '28px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '6px' }}>Government Sandbox Grant Application</span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              {challenge ? challenge.title : 'Outcome Challenge Application'}
            </h2>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Target Department: {challenge?.departmentName || 'Urban Development Department, UP'} • Budget Cap: ₹{challenge?.budgetCap?.toLocaleString('en-IN') || '25,00,000'}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
        </div>

        {/* Step Wizard Progress Bar */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
          {stepsList.map(step => (
            <div
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              style={{
                flex: 1,
                minWidth: '80px',
                textAlign: 'center',
                padding: '8px 4px',
                borderRadius: '6px',
                background: currentStep === step.num ? 'var(--primary-600)' : currentStep > step.num ? 'rgba(37, 99, 235, 0.12)' : 'var(--bg-muted)',
                color: currentStep === step.num ? '#ffffff' : currentStep > step.num ? 'var(--primary-700)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontWeight: currentStep === step.num ? 700 : 500,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '0.8rem' }}>Step {step.num}</div>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{step.name}</div>
            </div>
          ))}
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '3rem', color: 'var(--success-color)', marginBottom: '16px' }}>✓</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>Application Cryptographically Signed & Submitted!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 20px auto' }}>
              Your response has been registered on the Government Procurement Audit Ledger. Ref: <strong>APP-2026-X912</strong>.
            </p>
            <div className="badge badge-success" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Status: UNDER_ELIGIBILITY_SCREENING
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* STEP 1: ELIGIBILITY */}
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-800)' }}>1. Statutory & Governance Eligibility Verification</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Confirm statutory startup compliance under DPIIT policies and procurement frameworks.
                </p>

                <div style={{ background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.2)', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>DPIIT Registered Startup Criteria:</div>
                  <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li>Entity must be recognized by DPIIT with a valid Certificate of Recognition.</li>
                    <li>Technology Readiness Level (TRL) must be TRL-6 or higher for Sandbox trial deployment.</li>
                    <li>No past blacklisting or integrity debarment from any Central/State Ministry.</li>
                  </ul>
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                  <input
                    type="checkbox"
                    id="el-check"
                    checked={eligibilityChecked}
                    onChange={(e) => setEligibilityChecked(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="el-check" style={{ fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
                    I confirm our entity meets all DPIIT and TRL-6 statutory eligibility prerequisites.
                  </label>
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="noc-check"
                    checked={noConflictChecked}
                    onChange={(e) => setNoConflictChecked(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="noc-check" style={{ fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
                    No Conflict of Interest: Neither founders nor directors hold public office in the requesting department.
                  </label>
                </div>
              </div>
            )}

            {/* STEP 2: COMPANY INFO */}
            {currentStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-800)' }}>2. Company Profile & Credentials</h4>
                <div className="grid-cols-2">
                  <div className="form-group">
                    <label className="form-label">Legal Startup Name</label>
                    <input className="form-input" value={startup.name || 'AeroTraffic AI Systems Ltd.'} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">DPIIT Recognition Number</label>
                    <input className="form-input" value={startup.dpiitRegistrationNumber || 'DPIIT-ST-881920'} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Corporate Identification Number (CIN)</label>
                    <input className="form-input" value={startup.cinOrTaxId || 'U72900KA2021PTC148920'} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Headquarters Location</label>
                    <input className="form-input" value={startup.headquarters || 'Bengaluru, Karnataka'} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Founder & Chief Executive</label>
                    <input className="form-input" value={startup.founderName || 'Dr. Vikramaditya Rao'} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Full-Time Technical Workforce</label>
                    <input className="form-input" value={`${startup.employeeCount || 24} Deep-Tech Engineers`} readOnly />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PROPOSED SOLUTION */}
            {currentStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-800)' }}>3. Proposed Outcome Solution</h4>
                <div className="form-group">
                  <label className="form-label">Proposed Solution Title</label>
                  <input
                    className="form-input"
                    value={solutionTitle}
                    onChange={(e) => setSolutionTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Executive Summary & Operational Impact</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    value={execSummary}
                    onChange={(e) => setExecSummary(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Target Government KPI Alignment</label>
                  <input
                    className="form-input"
                    value="Guaranteed 25% Reduction in Corridor Signal Latency & Zero Cloud Dependency"
                    readOnly
                  />
                </div>
              </div>
            )}

            {/* STEP 4: TECH & ARCHITECTURE */}
            {currentStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-800)' }}>4. Technology & Cyber Architecture</h4>
                <div className="grid-cols-2">
                  <div className="form-group">
                    <label className="form-label">Technology Readiness Level (TRL)</label>
                    <select className="form-select" value={trlLevel} onChange={(e) => setTrlLevel(e.target.value)}>
                      <option value="TRL-6">TRL-6 (Prototype Tested in Relevant Environment)</option>
                      <option value="TRL-7">TRL-7 (Integrated System Demonstrated in Operational Environment)</option>
                      <option value="TRL-8">TRL-8 (System Complete and Qualified)</option>
                      <option value="TRL-9">TRL-9 (Actual System Proven in Operational Mission)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Intellectual Property (IP) Ownership</label>
                    <input
                      className="form-input"
                      value={ipStatus}
                      onChange={(e) => setIpStatus(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Core Tech Stack & Cryptographic Hardware Requirements</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* STEP 5: IMPLEMENTATION PLAN */}
            {currentStep === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-800)' }}>5. Sandbox Implementation Plan & Roadmap</h4>
                <div className="grid-cols-2">
                  <div className="form-group">
                    <label className="form-label">Trial Duration (Months)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={timelineMonths}
                      onChange={(e) => setTimelineMonths(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Testbed Deployment Location</label>
                    <input className="form-input" value="Lucknow Smart City Testbed Corridor - Hazratganj Junction" readOnly />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Milestone & Deliverables Roadmap</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={keyMilestones}
                    onChange={(e) => setKeyMilestones(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* STEP 6: TEAM */}
            {currentStep === 6 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-800)' }}>6. Technical Execution Team</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div className="card" style={{ padding: '12px', background: 'var(--bg-muted)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Dr. Vikramaditya Rao</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--primary-700)' }}>Project Lead & Founder</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Ex-IISc AI Researcher, 12 years in Edge Computer Vision.</div>
                  </div>
                  <div className="card" style={{ padding: '12px', background: 'var(--bg-muted)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Priya Sundaram</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--primary-700)' }}>Chief Systems Architect</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Embedded Systems & Cryptographic Hardware Root of Trust Specialist.</div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: COMMERCIAL PROPOSAL */}
            {currentStep === 7 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-800)' }}>7. Milestone Commercial & Grant Proposal</h4>
                <div className="grid-cols-2">
                  <div className="form-group">
                    <label className="form-label">Proposed Total Sandbox Budget (₹)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={proposedBudget}
                      onChange={(e) => setProposedBudget(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Government Budget Cap</label>
                    <input className="form-input" value={`₹${challenge?.budgetCap?.toLocaleString('en-IN') || '25,00,000'}`} readOnly />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Cost Breakdown & Escrow Disbursement Schedule Rationale</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={commercialNotes}
                    onChange={(e) => setCommercialNotes(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* STEP 8: COMPLIANCE DOCUMENTS */}
            {currentStep === 8 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-800)' }}>8. Verification Vault & Statutory Documents</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { title: 'DPIIT Recognition Certificate', file: 'DPIIT_CERT_881920.pdf', status: 'VERIFIED ✓' },
                    { title: 'Audited Financial Statements (Last 2 FYs)', file: 'AUDITED_FINANCIALS_2025.pdf', status: 'VERIFIED ✓' },
                    { title: 'ISO 27001 / Cyber Security Clearance', file: 'CYBER_SECURITY_CERT.pdf', status: 'VERIFIED ✓' },
                    { title: 'Self-Declaration Integrity Undertaking', file: 'INTEGRITY_UNDERTAKING.pdf', status: 'ATTACHED ✓' }
                  ].map((doc, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-muted)', borderRadius: '6px' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{doc.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.file}</div>
                      </div>
                      <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>{doc.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 9: REVIEW & SUBMIT */}
            {currentStep === 9 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-800)' }}>9. Cryptographic Review & Legal Sign-Off</h4>
                
                <div className="card" style={{ background: 'var(--bg-muted)', padding: '16px', fontSize: '0.85rem' }}>
                  <div style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--navy-900)' }}>Application Summary Preview:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    <div><strong>Challenge:</strong> {challenge?.title || 'Outcome Challenge'}</div>
                    <div><strong>Startup:</strong> {startup.name || 'AeroTraffic AI Systems'}</div>
                    <div><strong>Proposed Budget:</strong> ₹{proposedBudget.toLocaleString('en-IN')}</div>
                    <div><strong>Trial Duration:</strong> {timelineMonths} Months</div>
                    <div><strong>TRL Level:</strong> {trlLevel}</div>
                    <div><strong>IP Status:</strong> {ipStatus}</div>
                  </div>
                </div>

                <div style={{ border: '1px solid var(--primary-300)', padding: '14px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.04)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary-700)', marginBottom: '4px' }}>
                    🔒 Digital Cryptographic Stamp
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    By clicking submit, your submission hash will be written to the Central Treasury Procurement Ledger.
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                ← Back
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next Step ({currentStep + 1}/{totalSteps}) →
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: 'var(--success-color)' }}
                >
                  Sign & Submit Application 🚀
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
