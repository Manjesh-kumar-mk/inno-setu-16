import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';

export const GlobalModals: React.FC = () => {
  const {
    activeModal,
    modalData,
    closeModal,
    createChallenge,
    submitEvaluation,
    notifySuccess,
    currentRole,
    logout
  } = useApp();

  // Create Challenge state
  const [newTitle, setNewTitle] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newOutcome, setNewOutcome] = useState('');
  const [newSector, setNewSector] = useState('Smart Mobility');
  const [newBudget, setNewBudget] = useState(350000);
  const [newMonths, setNewMonths] = useState(6);

  // Score Application state
  const [techScore, setTechScore] = useState(28);
  const [fieldScore, setFieldScore] = useState(24);
  const [finScore, setFinScore] = useState(23);
  const [secScore, setSecScore] = useState(19);
  const [evalComments, setEvalComments] = useState('Architecture is verified with hardware root of trust.');

  // Apply Challenge state
  const [solutionTitle, setSolutionTitle] = useState('');
  const [proposedBudget, setProposedBudget] = useState(350000);

  const handleCreateChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createChallenge({
      title: newTitle,
      problemStatement: newProblem,
      desiredOutcome: newOutcome,
      sector: newSector,
      budgetCap: Number(newBudget),
      sandboxDurationMonths: Number(newMonths)
    });
    closeModal();
  };

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Number(techScore) + Number(fieldScore) + Number(finScore) + Number(secScore);
    submitEvaluation({
      applicationId: modalData?.id || 'app-501',
      totalScore: total,
      overallComments: evalComments,
      recommendation: total > 80 ? 'APPROVE_FOR_SANDBOX' : 'REJECT'
    });
    closeModal();
  };

  if (!activeModal) return null;

  if (activeModal === 'CREATE_CHALLENGE') {
    return (
      <Modal
        isOpen={true}
        onClose={closeModal}
        title="Post New Government Outcome-Based Challenge"
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={handleCreateChallengeSubmit}>Publish Challenge Spec</button>
          </>
        }
      >
        <form onSubmit={handleCreateChallengeSubmit}>
          <div className="form-group">
            <label className="form-label">Outcome Challenge Title</label>
            <input
              className="form-input"
              required
              placeholder="e.g. AI-Based Real-time Urban Signal Optimization"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Government Operational Problem Statement</label>
            <textarea
              className="form-textarea"
              rows={3}
              required
              placeholder="Describe the existing operational bottleneck or public service limitation..."
              value={newProblem}
              onChange={(e) => setNewProblem(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Desired Outcome & Target Performance Metrics</label>
            <textarea
              className="form-textarea"
              rows={2}
              required
              placeholder="e.g. Minimum 25% reduction in corridor congestion wait times..."
              value={newOutcome}
              onChange={(e) => setNewOutcome(e.target.value)}
            />
          </div>

          <div className="grid-cols-3" style={{ gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Sector</label>
              <select className="form-select" value={newSector} onChange={(e) => setNewSector(e.target.value)}>
                <option value="Smart Mobility">Smart Mobility</option>
                <option value="Health Tech">Health Tech</option>
                <option value="Clean Water">Clean Water</option>
                <option value="Environmental Tech">Environmental Tech</option>
                <option value="CyberSecurity">CyberSecurity</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Sandbox Budget Cap (₹)</label>
              <input
                type="number"
                className="form-input"
                value={newBudget}
                onChange={(e) => setNewBudget(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Duration (Months)</label>
              <input
                type="number"
                className="form-input"
                value={newMonths}
                onChange={(e) => setNewMonths(Number(e.target.value))}
              />
            </div>
          </div>
        </form>
      </Modal>
    );
  }

  if (activeModal === 'CHALLENGE_DETAILS' && modalData) {
    return (
      <Modal
        isOpen={true}
        onClose={closeModal}
        title={`Challenge Specification: ${modalData.code}`}
        footer={<button className="btn btn-secondary" onClick={closeModal}>Close Specification</button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)' }}>{modalData.title}</h3>
            <StatusBadge status={modalData.status} />
          </div>

          <div style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '6px', fontSize: '0.85rem' }}>
            <div>Department: <strong>{modalData.departmentName}</strong></div>
            <div>Sector: <strong>{modalData.sector}</strong> • Stage: <strong>{modalData.currentStage}</strong></div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Problem Statement:</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {modalData.problemStatement}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Desired Outcome:</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {modalData.desiredOutcome}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Mandatory Startup Eligibility Criteria:</h4>
            <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', paddingLeft: '18px', marginTop: '4px' }}>
              {modalData.eligibleStartupCriteria?.map((crit: string, i: number) => (
                <li key={i}>{crit}</li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    );
  }

  if (activeModal === 'SCORE_APPLICATION' && modalData) {
    const currentTotal = Number(techScore) + Number(fieldScore) + Number(finScore) + Number(secScore);

    return (
      <Modal
        isOpen={true}
        onClose={closeModal}
        title={`Scoring Rubric: ${modalData.startupName}`}
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={handleScoreSubmit}>Sign & Submit Score ({currentTotal}/100)</button>
          </>
        }
      >
        <form onSubmit={handleScoreSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Target Challenge: {modalData.challengeTitle}</div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label className="form-label">1. Technical Architecture & Innovation (Max: 30)</label>
              <strong>{techScore} / 30</strong>
            </div>
            <input 
              type="range" 
              min="0" 
              max="30" 
              value={techScore} 
              onChange={(e) => setTechScore(Number(e.target.value))} 
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label className="form-label">2. Field Deployability & Robustness (Max: 25)</label>
              <strong>{fieldScore} / 25</strong>
            </div>
            <input 
              type="range" 
              min="0" 
              max="25" 
              value={fieldScore} 
              onChange={(e) => setFieldScore(Number(e.target.value))} 
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label className="form-label">3. Financial Realism & Cost Benefit (Max: 25)</label>
              <strong>{finScore} / 25</strong>
            </div>
            <input 
              type="range" 
              min="0" 
              max="25" 
              value={finScore} 
              onChange={(e) => setFinScore(Number(e.target.value))} 
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label className="form-label">4. Cybersecurity & Compliance (Max: 20)</label>
              <strong>{secScore} / 20</strong>
            </div>
            <input 
              type="range" 
              min="0" 
              max="20" 
              value={secScore} 
              onChange={(e) => setSecScore(Number(e.target.value))} 
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Evaluator Qualitative Assessment Comments</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={evalComments}
              onChange={(e) => setEvalComments(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    );
  }

  if (activeModal === 'APPLY_CHALLENGE' && modalData) {
    return (
      <Modal
        isOpen={true}
        onClose={closeModal}
        title={`Submit Solution Proposal: ${modalData.code}`}
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={() => { notifySuccess('Application Submitted Successfully', 'Your proposal has been logged and queued for expert evaluation.'); closeModal(); }}>
              Submit Formal Application →
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy-900)' }}>
            Applying to: {modalData.title}
          </div>

          <div className="form-group">
            <label className="form-label">Proposed Solution Title</label>
            <input 
              className="form-input" 
              placeholder="e.g. AeroTraffic Edge AI Signal Controller"
              value={solutionTitle}
              onChange={(e) => setSolutionTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technical Architecture Summary</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Describe your TRL-7+ technical solution, hardware specs, and software stack..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Proposed Trial Budget (₹)</label>
            <input
              type="number"
              className="form-input"
              value={proposedBudget}
              onChange={(e) => setProposedBudget(Number(e.target.value))}
            />
          </div>
        </div>
      </Modal>
    );
  }

  if (activeModal === 'USER_PROFILE') {
    const profile = (() => {
      switch (currentRole) {
        case 'GOVERNMENT':
          return {
            initials: 'RV',
            name: 'Dr. Rajesh Vardhan, IAS',
            designation: 'Principal Secretary & Nodal Officer',
            id: 'GOV-UID-991048',
            dept: 'Department of Transportation & Smart Mobility',
            clearance: 'Level-3 Executive'
          };
        case 'STARTUP':
          return {
            initials: 'VN',
            name: 'Vikramaditya Nair',
            designation: 'Founder & CEO, BharatVision Labs',
            id: 'DPIIT-ST-881920',
            dept: 'BharatVision Labs Pvt. Ltd. (TRL-8 Verified)',
            clearance: 'Commercial Sandbox Cleared'
          };
        case 'EXPERT':
          return {
            initials: 'AS',
            name: 'Prof. Anand R. Swaminathan',
            designation: 'Chair, Intelligent Transportation Systems',
            id: 'EXP-EVAL-44120',
            dept: 'Indian Institute of Technology, Delhi',
            clearance: 'Independent Technical Evaluator'
          };
        case 'ADMIN':
          return {
            initials: 'SA',
            name: 'National System Administrator',
            designation: 'Director, InnoSetu Digital Governance Cell',
            id: 'SYS-ADMIN-0001',
            dept: 'Ministry of Commerce & Industry / DPIIT',
            clearance: 'Root Super-Admin'
          };
        default:
          return {
            initials: 'G',
            name: 'Guest Citizen / Evaluator',
            designation: 'Public Gateway Explorer',
            id: 'GUEST-SESSION',
            dept: 'Open Public Domain',
            clearance: 'Public Unauthenticated'
          };
      }
    })();

    return (
      <Modal
        isOpen={true}
        onClose={closeModal}
        title="User Identity & Verification Profile"
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <button
              className="btn btn-outline btn-sm"
              style={{ color: 'var(--danger-text)', borderColor: 'var(--border-subtle)' }}
              onClick={() => {
                logout();
                closeModal();
              }}
            >
              🚪 Logout
            </button>
            <button className="btn btn-secondary" onClick={closeModal}>Close</button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-600)',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {profile.initials}
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>
                {profile.name}
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Role: <strong>{currentRole}</strong> • Status: <span style={{ color: 'var(--success-text)', fontWeight: 600 }}>✓ Verified Identity</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px', border: '1px solid var(--border-subtle)' }}>
            <div>GovNet Identification ID: <strong>{profile.id}</strong></div>
            <div>Designation: <strong>{profile.designation}</strong></div>
            <div>Department / Organization: <strong>{profile.dept}</strong></div>
            <div>Security Clearance: <strong>{profile.clearance}</strong></div>
          </div>
        </div>
      </Modal>
    );
  }

  return null;
};
