import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';
import { Milestone } from '../../../types';

export const StartupMilestones: React.FC = () => {
  const { pilots } = useApp();
  const pilot = pilots[0];
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [submittedEvidence, setSubmittedEvidence] = useState(false);

  const milestoneList: Milestone[] = pilot ? pilot.milestones : [
    {
      id: 'ms-101',
      title: 'Phase 1: Edge Sensor Architecture & Testbed Setup',
      description: 'Deploy 12 edge vision nodes along Delhi Corridor 4 and connect to central telemetry stream.',
      dueDate: '2026-08-15',
      payoutPercentage: 30,
      payoutAmount: 105000,
      status: 'DISBURSED',
      deliverables: ['12 Edge Nodes Live', 'Hardware Root of Trust Audit', 'Latency Benchmark <10ms'],
      validationStatus: 'Verified by Prof. S. Ranganathan (Auditor)'
    },
    {
      id: 'ms-102',
      title: 'Phase 2: Algorithmic Model Fine-Tuning & Operational Run',
      description: 'Run 60-day uninterrupted autonomous signal optimization and achieve 20%+ congestion reduction.',
      dueDate: '2026-10-15',
      payoutPercentage: 30,
      payoutAmount: 105000,
      status: 'SUBMITTED',
      deliverables: ['Real-time Video Feed Telemetry', 'Congestion Reduction Log', 'Independent Audit Certificate'],
      validationStatus: 'Under Verification by Validator'
    },
    {
      id: 'ms-103',
      title: 'Phase 3: Final System Integration & Procurement Scale-Up Spec',
      description: 'Hand over open API specifications, source code audit logs, and scale-up rollout plan.',
      dueDate: '2026-12-01',
      payoutPercentage: 40,
      payoutAmount: 140000,
      status: 'PENDING',
      deliverables: ['Open API Specs', 'Scale-up Architecture Plan', 'Final Security Audit Certificate'],
      validationStatus: 'Pending Phase 2 Clearance'
    }
  ];

  const handleEvidenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedEvidence(true);
    setTimeout(() => {
      setSubmittedEvidence(false);
      setSelectedMilestone(null);
      setEvidenceNotes('');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <span className="badge badge-info" style={{ marginBottom: '6px' }}>Performance & Deliverable Management</span>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-900)' }}>
          Milestone Deliverables & Verification
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Submit verification evidence, view independent auditor validations, and claim milestone payout disbursements.
        </p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Milestone Title & Scope</th>
                <th>Deliverables Summary</th>
                <th>Due Date</th>
                <th>Payout (% / ₹)</th>
                <th>Status</th>
                <th>Validation Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {milestoneList.map(ms => (
                <tr key={ms.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{ms.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ms.description}</div>
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                      {ms.deliverables?.map((del: string, i: number) => (
                        <li key={i}>{del}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ fontSize: '0.825rem' }}>{ms.dueDate}</td>
                  <td>
                    <strong>₹{ms.payoutAmount.toLocaleString('en-IN')}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ms.payoutPercentage}% of total</div>
                  </td>
                  <td><StatusBadge status={ms.status as any} /></td>
                  <td style={{ fontSize: '0.78rem' }}>
                    <span style={{
                      color: ms.status === 'DISBURSED' || ms.status === 'APPROVED' ? 'var(--success-text)' : 'var(--primary-700)',
                      fontWeight: 600
                    }}>
                      {ms.validationStatus || 'Pending Independent Review'}
                    </span>
                  </td>
                  <td>
                    {ms.status === 'PENDING' || ms.status === 'SUBMITTED' ? (
                      <button className="btn btn-primary btn-sm" onClick={() => setSelectedMilestone(ms)}>
                        Submit Evidence
                      </button>
                    ) : (
                      <span style={{ color: 'var(--success-text)', fontSize: '0.8rem', fontWeight: 600 }}>✓ Disbursed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Evidence Modal */}
      {selectedMilestone && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', background: '#fff', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-info">Evidence Claim</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '4px', color: 'var(--navy-900)' }}>
                  {selectedMilestone.title}
                </h3>
              </div>
              <button onClick={() => setSelectedMilestone(null)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            </div>

            {submittedEvidence ? (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--success-color)', marginBottom: '10px' }}>✓</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Evidence Submitted to Auditor!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Ref Hash: 0x8a91c0e... written to central registry.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEvidenceSubmit}>
                <div className="form-group">
                  <label className="form-label">Deliverable Verification Notes & Evidence Links</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    required
                    placeholder="Provide telemetry log URLs, test report summary, sensor uptime certificates..."
                    value={evidenceNotes}
                    onChange={(e) => setEvidenceNotes(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Attach Testbed Audit Certificate (PDF / CSV / JSON)</label>
                  <input type="file" className="form-input" style={{ padding: '6px' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedMilestone(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit for Independent Audit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};