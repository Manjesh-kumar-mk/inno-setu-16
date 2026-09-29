import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export const RegisterPage: React.FC = () => {
  const { setCurrentView, addAuditEvent, login } = useApp();
  const [activeTab, setActiveTab] = useState<'GOVERNMENT' | 'STARTUP'>('STARTUP');
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Government Registration Form State
  const [govMinistry, setGovMinistry] = useState('Ministry of Road Transport & Urban Mobility');
  const [govDeptName, setGovDeptName] = useState('');
  const [govDeptCode, setGovDeptCode] = useState('');
  const [govOfficerName, setGovOfficerName] = useState('');
  const [govOfficerDesignation, setGovOfficerDesignation] = useState('Joint Secretary / Director');
  const [govEmail, setGovEmail] = useState('');
  const [govPhone, setGovPhone] = useState('');
  const [govBudget, setGovBudget] = useState(5000000);
  const [govAgree, setGovAgree] = useState(true);

  // Startup Registration Form State
  const [startupName, setStartupName] = useState('');
  const [dpiitNumber, setDpiitNumber] = useState('');
  const [cinNumber, setCinNumber] = useState('');
  const [category, setCategory] = useState('SmartMobility');
  const [trlLevel, setTrlLevel] = useState('TRL-7');
  const [founderName, setFounderName] = useState('');
  const [founderEmail, setFounderEmail] = useState('');
  const [founderPhone, setFounderPhone] = useState('');
  const [headquarters, setHeadquarters] = useState('Bengaluru, Karnataka');
  const [employeeCount, setEmployeeCount] = useState(25);
  const [productSummary, setProductSummary] = useState('');

  const handleGovSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addAuditEvent('GOVERNMENT_DEPARTMENT_REGISTERED', `Department ${govDeptName || 'New Dept'} Onboarding Request`);
  };

  const handleStartupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addAuditEvent('STARTUP_ENTITY_REGISTERED', `Startup ${startupName || 'New Startup'} Registered`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>

      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <span className="badge badge-info" style={{ marginBottom: '8px' }}>ENTITY ONBOARDING</span>
        <h1 style={{ fontSize: '2.4rem', color: 'var(--navy-900)' }}>Join the National Innovation Sandbox Platform</h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Separate verified onboarding pathways for Government Nodal Authorities and Deep-Tech Startups.
        </p>
      </div>

      {/* Pathway Selector Tabs */}
      <div className="card" style={{ padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
        <button
          className={`btn ${activeTab === 'STARTUP' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ height: '48px', fontSize: '1rem' }}
          onClick={() => { setActiveTab('STARTUP'); setIsSubmitted(false); setStep(1); }}
        >
          🚀 Startup / Innovator Registration
        </button>

        <button
          className={`btn ${activeTab === 'GOVERNMENT' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ height: '48px', fontSize: '1rem' }}
          onClick={() => { setActiveTab('GOVERNMENT'); setIsSubmitted(false); setStep(1); }}
        >
          🏛️ Government Department Onboarding
        </button>
      </div>

      {/* Form Container */}
      <div className="card" style={{ padding: '36px' }}>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '24px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--success-bg)',
              border: '2px solid var(--success-border)',
              color: 'var(--success-text)',
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800
            }}>
              ✓
            </div>

            <h2 style={{ fontSize: '1.6rem', color: 'var(--navy-900)' }}>
              {activeTab === 'STARTUP' ? 'Startup Registration Submitted!' : 'Department Onboarding Request Received!'}
            </h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', textAlign: 'center', lineHeight: 1.5 }}>
              {activeTab === 'STARTUP'
                ? `Your DPIIT registration (${dpiitNumber || 'DPIIT-ST-PENDING'}) is undergoing automated verification. You can now access your Startup Command Center.`
                : `Your official domain verification link has been sent to ${govEmail || 'your email'}. Once approved by the Nodal Authority, your department challenge portal will be activated.`}
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  login(
                    activeTab,
                    'dashboard',
                    activeTab === 'STARTUP' ? (founderEmail || 'founder@startup.in') : (govEmail || 'official@dept.gov.in')
                  );
                }}
              >
                Proceed to {activeTab} Dashboard →
              </button>
            </div>
          </div>
        ) : activeTab === 'STARTUP' ? (

          /* STARTUP REGISTRATION PATHWAY */
          <form onSubmit={handleStartupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)' }}>Startup Entity Details</h3>
                <span className="badge badge-success">DPIIT Fast-Track Gateway</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Step {step} of 2</span>
            </div>

            {step === 1 ? (
              <>
                <div className="grid-cols-2">
                  <div className="form-group">
                    <label className="form-label">Startup / Company Name</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. AeroTraffic AI Systems Pvt Ltd"
                      value={startupName}
                      onChange={(e) => setStartupName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">DPIIT Registration Number</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. DPIIT-ST-98212"
                      value={dpiitNumber}
                      onChange={(e) => setDpiitNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid-cols-2">
                  <div className="form-group">
                    <label className="form-label">Corporate Identification Number (CIN) or Tax ID</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. U72900DL2021PTC381920"
                      value={cinNumber}
                      onChange={(e) => setCinNumber(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Technology Sector</label>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="SmartMobility">Smart Mobility & Traffic AI</option>
                      <option value="HealthTech">Health Tech & Telemedicine</option>
                      <option value="CleanTech">CleanTech & Energy</option>
                      <option value="GovTech">GovTech & Smart Cities</option>
                      <option value="CyberSecurity">CyberSecurity & SCADA</option>
                      <option value="Clean Water">Clean Water & Sanitation</option>
                    </select>
                  </div>
                </div>

                <div className="grid-cols-3">
                  <div className="form-group">
                    <label className="form-label">Solution Readiness (TRL)</label>
                    <select className="form-select" value={trlLevel} onChange={(e) => setTrlLevel(e.target.value)}>
                      <option value="TRL-6">TRL-6 (Prototype Tested in Relevant Environment)</option>
                      <option value="TRL-7">TRL-7 (System Prototype Demo in Operational Environment)</option>
                      <option value="TRL-8">TRL-8 (System Complete and Qualified)</option>
                      <option value="TRL-9">TRL-9 (Actual System Proven in Operational Field)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Headquarters / State</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Bengaluru, Karnataka"
                      value={headquarters}
                      onChange={(e) => setHeadquarters(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Employee Count</label>
                    <input
                      type="number"
                      className="form-input"
                      value={employeeCount}
                      onChange={(e) => setEmployeeCount(Number(e.target.value))}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setStep(2)}
                  style={{ marginTop: '8px', alignSelf: 'flex-end' }}
                >
                  Next: Founder Credentials & Capability Pitch →
                </button>
              </>
            ) : (
              <>
                <div className="grid-cols-3">
                  <div className="form-group">
                    <label className="form-label">Founder / Lead Contact Name</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Vikramaditya Nair"
                      value={founderName}
                      onChange={(e) => setFounderName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Official Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      placeholder="founders@company.com"
                      value={founderEmail}
                      onChange={(e) => setFounderEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Mobile Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      required
                      placeholder="+91 98765 43210"
                      value={founderPhone}
                      onChange={(e) => setFounderPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Product Summary & Core Technology Capability</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    required
                    placeholder="Briefly describe your deep-tech product, underlying IP/patents, and hardware/software specs..."
                    value={productSummary}
                    onChange={(e) => setProductSummary(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--bg-muted)', padding: '12px 16px', borderRadius: '8px' }}>
                  <input type="checkbox" id="dpiitConsent" defaultChecked required />
                  <label htmlFor="dpiitConsent" style={{ fontSize: '0.825rem', color: 'var(--navy-900)' }}>
                    I declare that all technical specs are authentic and authorize DPIIT API verification of company CIN & tax compliance.
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                    ← Back to Entity Details
                  </button>

                  <button type="submit" className="btn btn-primary btn-lg">
                    Complete Startup Registration 🚀
                  </button>
                </div>
              </>
            )}

          </form>
        ) : (

          /* GOVERNMENT REGISTRATION PATHWAY */
          <form onSubmit={handleGovSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)' }}>Government Department Onboarding</h3>
                <span className="badge badge-info">GFR Rule 194 Nodal Gateway</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Officer Portal</span>
            </div>

            <div className="grid-cols-2">
              <div className="form-group">
                <label className="form-label">Sponsoring Ministry / State Government</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Ministry of Road Transport & Highways"
                  value={govMinistry}
                  onChange={(e) => setGovMinistry(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Department / Agency Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Department of Transportation & Smart Mobility"
                  value={govDeptName}
                  onChange={(e) => setGovDeptName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid-cols-3">
              <div className="form-group">
                <label className="form-label">Department Code (Short)</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. DTSM"
                  value={govDeptCode}
                  onChange={(e) => setGovDeptCode(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Lead Nodal Officer Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Dr. Rajesh Vardhan, IAS"
                  value={govOfficerName}
                  onChange={(e) => setGovOfficerName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Officer Designation</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={govOfficerDesignation}
                  onChange={(e) => setGovOfficerDesignation(e.target.value)}
                />
              </div>
            </div>

            <div className="grid-cols-3">
              <div className="form-group">
                <label className="form-label">Official Email (@gov.in / @nic.in)</label>
                <input
                  type="email"
                  className="form-input"
                  required
                  placeholder="officer@dtsm.gov.in"
                  value={govEmail}
                  onChange={(e) => setGovEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Official Contact Number</label>
                <input
                  type="tel"
                  className="form-input"
                  required
                  placeholder="+91 11 2309 8812"
                  value={govPhone}
                  onChange={(e) => setGovPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sanctioned Sandbox Budget Cap (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  value={govBudget}
                  onChange={(e) => setGovBudget(Number(e.target.value))}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--bg-muted)', padding: '12px 16px', borderRadius: '8px' }}>
              <input
                type="checkbox"
                id="gfrConsent"
                checked={govAgree}
                onChange={(e) => setGovAgree(e.target.checked)}
                required
              />
              <label htmlFor="gfrConsent" style={{ fontSize: '0.825rem', color: 'var(--navy-900)' }}>
                I confirm that I am an authorized procurement officer and agree to publish outcome challenges under GFR Rule 194 Sandbox provisions.
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '8px' }}>
              Submit Department Onboarding Request 🏛️
            </button>
          </form>

        )}

      </div>

    </div>
  );
};
