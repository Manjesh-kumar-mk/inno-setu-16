import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { AIProblemAssistantModal } from '../../common/AIAssistantComponents';

export const GovCreateChallengeWizard: React.FC = () => {
  const { createChallenge, setCurrentView, departments } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // Form State across 8 Steps
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: 'Automated Non-Revenue Water Leak Detection & Flow Balancing',
    code: 'CH-DUWSM-09',
    departmentId: departments[3]?.id || 'dept-104',
    sector: 'Clean Water',
    targetDate: '2026-11-15',
    budgetCap: 2500000,
    sandboxDurationMonths: 6,

    // Step 2: Problem Definition (Outcome focused)
    badExample: 'We need an AI sensor system for municipal pipes.',
    goodExample: 'Reduce municipal non-revenue water loss by 35% within 15 minutes of pipe fracture across 50km urban network.',
    problemDescription: 'Municipal water distribution loses approximately 38% of treated potable water due to hidden underground pipe breaks and pressure imbalances before reaching household meters.',
    baselineMetric: 'Current loss: 38% total volume. Mean time to leak detection: 72 hours.',

    // Step 3: Desired Outcomes
    primaryMetric: '35% reduction in non-revenue water loss',
    targetThreshold: 'Sub-15 minute leak localization accuracy to within 5 meters',
    secondaryMetrics: '100% cloud telemetry uptime; zero false positive emergency alerts',
    verificationMethod: 'Acoustic sensor benchmarking verified by independent water utility auditors',

    // Step 4: Requirements & Eligibility
    eligibleStartupCriteria: [
      'DPIIT Registered Startup',
      'Minimum TRL-7 validated solution',
      'Compliance with BIS 10500 Drinking Water Safety Standard',
      'ISO 27001 Certified Cybersecurity Controls'
    ],
    minTrlLevel: 'TRL-7',
    securityLevel: 'LEVEL_2_GOVNET',

    // Step 5: Pilot Design
    testbedLocation: 'Zone-4 Urban Water Grid, Ward 18 (50km Pipeline Testbed)',
    dataAccessProvided: 'GIS Pipeline Infrastructure Maps & Real-time Flow Meter Telemetry API',
    safetyProtocols: 'Isolated fail-safe bypass valves with physical backflow preventers',
    govSupportProvided: 'Access to 12 municipal technicians and sandbox testing site',

    // Step 6: Evaluation Criteria Weightings
    techWeight: 30,
    innovationWeight: 20,
    impactWeight: 20,
    scalabilityWeight: 15,
    costWeight: 15,

    // Step 7: Legal & Compliance
    ipRightsModel: 'STARTUP_RETAINS_IP',
    privacyCompliance: 'DPDP Act 2023 & DISHA Guidelines Compliant',
    fastTrackProcurementEligible: true,
    liabilityCapAmount: 100000,

    // Step 8: Review & Status
    status: 'PUBLISHED'
  });

  const steps = [
    { num: 1, title: 'Basic Information' },
    { num: 2, title: 'Problem Definition' },
    { num: 3, title: 'Desired Outcomes' },
    { num: 4, title: 'Requirements' },
    { num: 5, title: 'Pilot Design' },
    { num: 6, title: 'Evaluation Criteria' },
    { num: 7, title: 'Legal & Compliance' },
    { num: 8, title: 'Review & Publish' }
  ];

  const handleNext = () => {
    if (currentStep < 8) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDept = departments.find(d => d.id === formData.departmentId);
    createChallenge({
      title: formData.title,
      departmentId: formData.departmentId,
      departmentName: selectedDept?.name || 'Department of Urban Water & Sanitation',
      problemStatement: formData.problemDescription,
      desiredOutcome: formData.goodExample,
      sector: formData.sector,
      budgetCap: Number(formData.budgetCap),
      sandboxDurationMonths: Number(formData.sandboxDurationMonths),
      eligibleStartupCriteria: formData.eligibleStartupCriteria
    });
    setCurrentView('challenges');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Top Header & Navigation back */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setCurrentView('challenges')}
            style={{ marginBottom: '8px' }}
          >
            ← Back to Challenges
          </button>
          <h2 style={{ fontSize: '1.45rem', color: 'var(--navy-900)' }}>
            Outcome-Based Challenge Creator Wizard
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            8-Step guided process to draft legally compliant, outcome-focused public procurement specifications.
          </p>
        </div>

        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <span className="badge badge-primary" style={{ fontSize: '0.85rem' }}>
            Step {currentStep} of 8: {steps[currentStep - 1].title}
          </span>
          <button
            type="button"
            className="btn btn-outline"
            style={{ fontSize: '0.8rem', borderColor: '#0284c7', color: '#0284c7', background: 'rgba(2, 132, 199, 0.05)' }}
            onClick={() => setIsAiModalOpen(true)}
          >
            ✨ AI Problem Assistant
          </button>
        </div>
      </div>

      {/* Progress Indicator at Top */}
      <div className="card" style={{ padding: '16px 20px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', minWidth: '580px' }}>
          {steps.map((step) => {
            const isActive = step.num === currentStep;
            const isCompleted = step.num < currentStep;

            return (
              <div
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 2,
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isCompleted
                      ? 'var(--success-text)'
                      : isActive
                      ? 'var(--primary-600)'
                      : 'var(--bg-muted)',
                    color: isCompleted || isActive ? '#FFFFFF' : 'var(--text-muted)',
                    border: `2px solid ${
                      isCompleted
                        ? 'var(--success-text)'
                        : isActive
                        ? 'var(--primary-600)'
                        : 'var(--border-strong)'
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isCompleted ? '✓' : step.num}
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--navy-900)' : 'var(--text-muted)',
                    marginTop: '6px',
                    textAlign: 'center'
                  }}
                >
                  {step.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Horizontal Connector Line */}
        <div
          style={{
            position: 'relative',
            marginTop: '-28px',
            height: '2px',
            background: 'var(--border-subtle)',
            zIndex: 1,
            margin: '-26px 40px 0 40px'
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'var(--primary-600)',
              width: `${((currentStep - 1) / 7) * 100}%`,
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>

      {/* Prominent Outcome-Based Callout Banner (Always Visible in Header/Steps) */}
      <div
        style={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #E0F2FE 100%)',
          border: '1px solid #BFDBFE',
          borderRadius: '8px',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>💡</span>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-900)' }}>
            EMPHASIZE OUTCOME-BASED PROBLEM STATEMENTS
          </h4>
        </div>
        <p style={{ fontSize: '0.825rem', color: 'var(--navy-800)' }}>
          Public procurement innovation relies on specifying <strong>what result to achieve</strong> rather than specifying exact technical implementations.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '4px' }}>
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '10px', borderRadius: '6px', fontSize: '0.8rem' }}>
            <span style={{ color: '#B91C1C', fontWeight: 700 }}>❌ Avoid Traditional Input Spec:</span>
            <div style={{ color: '#7F1D1D', fontStyle: 'italic', marginTop: '2px' }}>
              "Need an AI system with 50 CCTV cameras and custom server software."
            </div>
          </div>

          <div style={{ background: '#ECFDF5', border: '1px solid #6EE7B7', padding: '10px', borderRadius: '6px', fontSize: '0.8rem' }}>
            <span style={{ color: '#047857', fontWeight: 700 }}>✅ Use Outcome-Based Spec:</span>
            <div style={{ color: '#064E3B', fontWeight: 600, marginTop: '2px' }}>
              "Reduce manual application processing time by 40% while maintaining sub-15min anomaly response."
            </div>
          </div>
        </div>
      </div>

      {/* Step Content Container */}
      <div className="card">
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="card-title">Step 1: Basic Information</h3>
            <p className="card-subtitle">General metadata and department sponsorship</p>

            <div className="form-group">
              <label className="form-label">Outcome Challenge Title</label>
              <input
                className="form-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Automated Non-Revenue Water Leak Detection"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Government Department</label>
                <select
                  className="form-select"
                  value={formData.departmentId}
                  onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                >
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Sector</label>
                <select
                  className="form-select"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                >
                  <option value="Smart Mobility">Smart Mobility</option>
                  <option value="Health Tech">Health Tech</option>
                  <option value="Clean Water">Clean Water</option>
                  <option value="Environmental Tech">Environmental Tech</option>
                  <option value="Smart Infrastructure">Smart Infrastructure</option>
                  <option value="CyberSecurity">CyberSecurity</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Sandbox Budget Allocation (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.budgetCap}
                  onChange={(e) => setFormData({ ...formData, budgetCap: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Trial Duration (Months)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.sandboxDurationMonths}
                  onChange={(e) => setFormData({ ...formData, sandboxDurationMonths: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Submission Deadline</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="card-title">Step 2: Operational Problem Definition</h3>
            <p className="card-subtitle">Define the public sector operational bottleneck and baseline pain points</p>

            <div className="form-group">
              <label className="form-label">Detailed Operational Bottleneck Description</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={formData.problemDescription}
                onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Measured Baseline Performance</label>
              <input
                className="form-input"
                value={formData.baselineMetric}
                onChange={(e) => setFormData({ ...formData, baselineMetric: e.target.value })}
                placeholder="e.g. Current processing time is 14 days with 12% manual error rate"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="card-title">Step 3: Desired Outcomes & Target KPIs</h3>
            <p className="card-subtitle">Define quantifiable success thresholds for sandbox validation</p>

            <div className="form-group">
              <label className="form-label">Primary Outcome Statement (Quantifiable Target)</label>
              <input
                className="form-input"
                value={formData.goodExample}
                onChange={(e) => setFormData({ ...formData, goodExample: e.target.value })}
                placeholder="e.g. Reduce manual application processing time by 40%"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Performance Threshold</label>
              <input
                className="form-input"
                value={formData.targetThreshold}
                onChange={(e) => setFormData({ ...formData, targetThreshold: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Verification & Auditing Methodology</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={formData.verificationMethod}
                onChange={(e) => setFormData({ ...formData, verificationMethod: e.target.value })}
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="card-title">Step 4: Startup Eligibility & Technical Requirements</h3>
            <p className="card-subtitle">Define mandatory eligibility criteria for startup applicants</p>

            <div className="form-group">
              <label className="form-label">Mandatory Startup Criteria</label>
              {formData.eligibleStartupCriteria.map((crit, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    className="form-input"
                    value={crit}
                    onChange={(e) => {
                      const updated = [...formData.eligibleStartupCriteria];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, eligibleStartupCriteria: updated });
                    }}
                  />
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      const updated = formData.eligibleStartupCriteria.filter((_, i) => i !== idx);
                      setFormData({ ...formData, eligibleStartupCriteria: updated });
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setFormData({
                  ...formData,
                  eligibleStartupCriteria: [...formData.eligibleStartupCriteria, 'New Requirement']
                })}
              >
                + Add Criteria
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Minimum Technology Readiness Level (TRL)</label>
                <select
                  className="form-select"
                  value={formData.minTrlLevel}
                  onChange={(e) => setFormData({ ...formData, minTrlLevel: e.target.value })}
                >
                  <option value="TRL-6">TRL-6 (Prototype in Relevant Environment)</option>
                  <option value="TRL-7">TRL-7 (System Prototype Demo in Operational Environment)</option>
                  <option value="TRL-8">TRL-8 (Completed & Qualified System)</option>
                  <option value="TRL-9">TRL-9 (Proven in Operational Environment)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Cybersecurity Clearance Level</label>
                <select
                  className="form-select"
                  value={formData.securityLevel}
                  onChange={(e) => setFormData({ ...formData, securityLevel: e.target.value })}
                >
                  <option value="LEVEL_1">Level 1 - Public Cloud Standard</option>
                  <option value="LEVEL_2_GOVNET">Level 2 - GovNet Isolated Enclave</option>
                  <option value="LEVEL_3_DEFENSE">Level 3 - Defense SCADA Zero-Trust</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="card-title">Step 5: Sandbox & Pilot Design</h3>
            <p className="card-subtitle">Define physical/virtual testbed environment and government support</p>

            <div className="form-group">
              <label className="form-label">Testbed Facility & Location</label>
              <input
                className="form-input"
                value={formData.testbedLocation}
                onChange={(e) => setFormData({ ...formData, testbedLocation: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Government Data Access & API Provisioning</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={formData.dataAccessProvided}
                onChange={(e) => setFormData({ ...formData, dataAccessProvided: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Operational Safety Guardrails & Emergency Fallback</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={formData.safetyProtocols}
                onChange={(e) => setFormData({ ...formData, safetyProtocols: e.target.value })}
              />
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="card-title">Step 6: Evaluation Criteria Weightings</h3>
            <p className="card-subtitle">Assign scoring weight percentages for expert evaluation panel</p>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Technical Feasibility & Architecture</label>
                <strong>{formData.techWeight}%</strong>
              </div>
              <input
                type="range" min="0" max="50" value={formData.techWeight}
                onChange={(e) => setFormData({ ...formData, techWeight: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Innovation & Uniqueness</label>
                <strong>{formData.innovationWeight}%</strong>
              </div>
              <input
                type="range" min="0" max="40" value={formData.innovationWeight}
                onChange={(e) => setFormData({ ...formData, innovationWeight: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Public Impact & Benefit</label>
                <strong>{formData.impactWeight}%</strong>
              </div>
              <input
                type="range" min="0" max="40" value={formData.impactWeight}
                onChange={(e) => setFormData({ ...formData, impactWeight: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Cross-Department Scalability</label>
                <strong>{formData.scalabilityWeight}%</strong>
              </div>
              <input
                type="range" min="0" max="30" value={formData.scalabilityWeight}
                onChange={(e) => setFormData({ ...formData, scalabilityWeight: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Cost Effectiveness & ROI</label>
                <strong>{formData.costWeight}%</strong>
              </div>
              <input
                type="range" min="0" max="30" value={formData.costWeight}
                onChange={(e) => setFormData({ ...formData, costWeight: Number(e.target.value) })}
              />
            </div>

            <div style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '6px', textAlign: 'right' }}>
              Total Weight: <strong style={{
                color: (formData.techWeight + formData.innovationWeight + formData.impactWeight + formData.scalabilityWeight + formData.costWeight) === 100
                  ? 'var(--success-text)'
                  : 'var(--error-text)'
              }}>
                {formData.techWeight + formData.innovationWeight + formData.impactWeight + formData.scalabilityWeight + formData.costWeight}%
              </strong>
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="card-title">Step 7: Legal & Compliance Framework</h3>
            <p className="card-subtitle">Specify IP rights, data protection, and fast-track procurement clauses</p>

            <div className="form-group">
              <label className="form-label">Intellectual Property Ownership Model</label>
              <select
                className="form-select"
                value={formData.ipRightsModel}
                onChange={(e) => setFormData({ ...formData, ipRightsModel: e.target.value })}
              >
                <option value="STARTUP_RETAINS_IP">Startup Retains Full IP Rights (Gov receives non-exclusive public sector license)</option>
                <option value="JOINT_IP">Joint IP Ownership Framework</option>
                <option value="PUBLIC_DOMAIN">Open Source Public Domain</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Fast-Track Direct Procurement Authorization</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                <input
                  type="checkbox"
                  checked={formData.fastTrackProcurementEligible}
                  onChange={(e) => setFormData({ ...formData, fastTrackProcurementEligible: e.target.checked })}
                />
                <span style={{ fontSize: '0.875rem' }}>
                  Enable automatic Rule 194 GFR procurement eligibility upon successful third-party sandbox validation.
                </span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 8 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="card-title">Step 8: Review & Publish Specification</h3>
              <span className="badge badge-success" style={{ fontSize: '0.85rem' }}>
                ✓ Outcome Clarity Score: 98% (High Quality)
              </span>
            </div>

            <div style={{ background: 'var(--bg-muted)', padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div><strong>Title:</strong> {formData.title}</div>
              <div><strong>Desired Outcome:</strong> {formData.goodExample}</div>
              <div><strong>Sector:</strong> {formData.sector} • <strong>Budget:</strong> ₹{formData.budgetCap.toLocaleString('en-IN')}</div>
              <div><strong>Testbed:</strong> {formData.testbedLocation}</div>
              <div><strong>Eligibility Criteria:</strong> {formData.eligibleStartupCriteria.join(', ')}</div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            className="btn btn-secondary"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            ← Previous Step
          </button>

          {currentStep < 8 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next Step: {steps[currentStep].title} →
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit}>
              🚀 Publish Outcome Challenge Specification
            </button>
          )}
        </div>
      </div>

      <AIProblemAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyDraft={(draft) => {
          setFormData(prev => ({
            ...prev,
            title: draft.title || prev.title,
            problemDescription: draft.problemDescription,
            goodExample: draft.goodExample,
            baselineMetric: draft.baselineMetric,
            primaryMetric: draft.primaryMetric,
            targetThreshold: draft.targetThreshold,
            secondaryMetrics: draft.secondaryMetrics,
            eligibleStartupCriteria: draft.eligibleStartupCriteria
          }));
        }}
      />
    </div>
  );
};
