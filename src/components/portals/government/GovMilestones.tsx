import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';

export const GovMilestones: React.FC = () => {
  const { pilots, verifyMilestone } = useApp();

  const allMilestones = pilots.flatMap(p => p.milestones.map(m => ({
    ...m,
    pilotCode: p.code,
    pilotTitle: p.challengeTitle,
    startupName: p.startupName,
    pilotId: p.id
  })));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>
            Milestone Verification & Escrow Release Center
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Verify deliverable evidence, review third-party independent auditor sign-offs, and trigger escrow disbursements.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Milestone Ref & Title</th>
                <th>Startup & Pilot Trial</th>
                <th>Due Date</th>
                <th>Disbursement Amount</th>
                <th>Auditor Verification</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allMilestones.map(ms => (
                <tr key={ms.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{ms.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ms.deliverables?.join(', ') || ms.description}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{ms.startupName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{ms.pilotCode}</div>
                  </td>
                  <td style={{ fontSize: '0.825rem' }}>{ms.dueDate}</td>
                  <td><strong>${ms.payoutAmount.toLocaleString()}</strong></td>
                  <td style={{ fontSize: '0.8rem' }}>
                    {ms.verifiedBy ? (
                      <span style={{ color: 'var(--success-text)', fontWeight: 600 }}>✓ Verified by {ms.verifiedBy}</span>
                    ) : (
                      <span style={{ color: 'var(--warning-text)' }}>⌛ Verification Pending</span>
                    )}
                  </td>
                  <td><StatusBadge status={ms.status} /></td>
                  <td>
                    {ms.status === 'PENDING' || ms.status === 'SUBMITTED' ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => verifyMilestone(ms.pilotId, ms.id)}
                      >
                        Sign & Disburse
                      </button>
                    ) : (
                      <button className="btn btn-outline btn-sm" disabled>✓ Disbursed</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
