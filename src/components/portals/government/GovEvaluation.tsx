import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Evaluation } from '../../../types';
import { StatusBadge } from '../../common/StatusBadge';

export const GovEvaluation: React.FC = () => {
  const { evaluations, experts, applications, openModal, submitEvaluation } = useApp();
  const [selectedEvalModal, setSelectedEvalModal] = useState<Evaluation | null>(null);

  // Assignment Modal state
  const [assignAppId, setAssignAppId] = useState<string>('app-501');
  const [assignExpertId, setAssignExpertId] = useState<string>('exp-01');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>
            Expert Panel Evaluation & Assignment Portal
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Assign independent domain experts, review structured evaluation rubrics, and verify cybersecurity compliance.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAssignModalOpen(true)}>
          + Assign Expert Evaluator Panel
        </button>
      </div>

      {/* Structured Evaluation Criteria Callout */}
      <div className="card" style={{ background: 'var(--bg-muted)', padding: '16px' }}>
        <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-900)', marginBottom: '8px' }}>
          Standardized 6-Criterion Scoring Framework
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary-700)' }}>1. Technical Feasibility</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Max Score: 30 pts</div>
          </div>
          <div style={{ background: 'var(--bg-surface)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary-700)' }}>2. Innovation</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Max Score: 20 pts</div>
          </div>
          <div style={{ background: 'var(--bg-surface)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary-700)' }}>3. Impact</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Max Score: 20 pts</div>
          </div>
          <div style={{ background: 'var(--bg-surface)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary-700)' }}>4. Scalability</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Max Score: 15 pts</div>
          </div>
          <div style={{ background: 'var(--bg-surface)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary-700)' }}>5. Cost Effectiveness</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Max Score: 15 pts</div>
          </div>
          <div style={{ background: 'var(--bg-surface)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary-700)' }}>6. Cybersecurity</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Pass / Fail Gate</div>
          </div>
        </div>
      </div>

      {/* Evaluations Data Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Completed & Active Expert Reviews</h3>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Expert Evaluator</th>
                <th>Target Application & Startup</th>
                <th>Evaluation Date</th>
                <th>Recommendation</th>
                <th>Total Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map(ev => (
                <tr key={ev.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{ev.expertName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ev.expertDesignation}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>App Ref: {ev.applicationId}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{ev.overallComments.substring(0, 45)}...</div>
                  </td>
                  <td style={{ fontSize: '0.825rem' }}>{ev.evaluationDate}</td>
                  <td>
                    <span className={`badge ${ev.recommendation === 'APPROVE_FOR_SANDBOX' ? 'badge-success' : 'badge-warning'}`}>
                      {ev.recommendation === 'APPROVE_FOR_SANDBOX' ? '✓ Recommended' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--navy-900)' }}>{ev.totalScore} / 100</strong>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedEvalModal(ev)}
                    >
                      View Scorecard
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evaluator Assignment Modal */}
      {isAssignModalOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
          }}
          onClick={() => setIsAssignModalOpen(false)}
        >
          <div className="card" style={{ maxWidth: '500px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title">Assign Expert Evaluator Panel</h3>
              <button className="btn btn-outline btn-sm" onClick={() => setIsAssignModalOpen(false)}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
              <div className="form-group">
                <label className="form-label">Select Application</label>
                <select className="form-select" value={assignAppId} onChange={(e) => setAssignAppId(e.target.value)}>
                  {applications.map(a => (
                    <option key={a.id} value={a.id}>{a.startupName} ({a.challengeTitle.substring(0, 30)}...)</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Select Registered Domain Expert</label>
                <select className="form-select" value={assignExpertId} onChange={(e) => setAssignExpertId(e.target.value)}>
                  {experts.map(ex => (
                    <option key={ex.id} value={ex.id}>{ex.name} - {ex.designation}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-secondary" onClick={() => setIsAssignModalOpen(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  alert('Expert Panelist Assigned Successfully! Notification sent.');
                  setIsAssignModalOpen(false);
                }}
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Scorecard Modal */}
      {selectedEvalModal && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
          }}
          onClick={() => setSelectedEvalModal(null)}
        >
          <div className="card" style={{ maxWidth: '600px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <div>
                <h3 className="card-title">Expert Scorecard: {selectedEvalModal.expertName}</h3>
                <div className="card-subtitle">{selectedEvalModal.expertDesignation}</div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedEvalModal(null)}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
              <div style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Evaluation Date: <strong>{selectedEvalModal.evaluationDate}</strong></span>
                <span>Total Score: <strong style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>{selectedEvalModal.totalScore} / 100</strong></span>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Criteria Score Breakdown:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedEvalModal.criteriaScores?.map(crit => (
                    <div key={crit.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                        <span>{crit.name}</span>
                        <span>{crit.givenScore} / {crit.maxScore}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {crit.comments}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem' }}>Qualitative Evaluator Comments:</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {selectedEvalModal.overallComments}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedEvalModal(null)}>Close Scorecard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
