import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';

export const GovPayments: React.FC = () => {
  const { payments, pilots, addAuditEvent } = useApp();
  const [selectedPilotId, setSelectedPilotId] = useState<string>(pilots[0]?.id || 'pilot-301');
  const [disbursementModalOpen, setDisbursementModalOpen] = useState<boolean>(false);
  const [targetMilestone, setTargetMilestone] = useState<any>(null);
  const [disbursementSuccess, setDisbursementSuccess] = useState<string | null>(null);

  const selectedPilot = pilots.find(p => p.id === selectedPilotId) || pilots[0];

  const structuredMilestoneExample = [
    {
      id: 'm1-proto',
      title: 'Milestone 1 — Prototype & Hardware Setup',
      share: 20,
      amount: selectedPilot ? (selectedPilot.allocatedBudget * 0.20) : 500000,
      status: 'PAID',
      disbursementDate: '15 Mar 2026',
      pfmsRef: 'PFMS-TRX-20260315-99812',
      auditor: 'NIUA Certified',
      hash: 'SHA256:7f8a9e...100a'
    },
    {
      id: 'm2-deploy',
      title: 'Milestone 2 — Field Deployment',
      share: 30,
      amount: selectedPilot ? (selectedPilot.allocatedBudget * 0.30) : 750000,
      status: 'PAID',
      disbursementDate: '18 May 2026',
      pfmsRef: 'PFMS-TRX-20260518-44129',
      auditor: 'NIUA Certified',
      hash: 'SHA256:88e14b...229c'
    },
    {
      id: 'm3-field',
      title: 'Milestone 3 — Performance Testing',
      share: 20,
      amount: selectedPilot ? (selectedPilot.allocatedBudget * 0.20) : 500000,
      status: 'PENDING_VALIDATION',
      disbursementDate: 'Scheduled 15 Jul 2026',
      pfmsRef: 'PFMS-ESCROW-HELD-901',
      auditor: 'Under Review by Independent Auditor',
      hash: 'SHA256:9901ae...551b'
    },
    {
      id: 'm4-final',
      title: 'Milestone 4 — Final Validation',
      share: 30,
      amount: selectedPilot ? (selectedPilot.allocatedBudget * 0.30) : 750000,
      status: 'UPCOMING',
      disbursementDate: 'Scheduled 31 Aug 2026',
      pfmsRef: 'PFMS-ESCROW-LOCKED-902',
      auditor: 'Awaiting M3 Completion',
      hash: 'SHA256:000000...LOCKED'
    }
  ];

  const handleOpenDisbursementModal = (m: any) => {
    setTargetMilestone(m);
    setDisbursementModalOpen(true);
  };

  const handleExecuteDisbursement = () => {
    if (!targetMilestone) return;

    addAuditEvent(
      `PFMS Milestone Payout Released: ₹${targetMilestone.amount.toLocaleString('en-IN')} for ${targetMilestone.title}`,
      selectedPilot.code
    );

    setDisbursementSuccess(
      `Disbursement of ₹${targetMilestone.amount.toLocaleString('en-IN')} successfully authorized via PFMS Treasury Gateway for milestone: '${targetMilestone.title}'. Transaction Ref: PFMS-TRX-${Date.now().toString().substring(5)}`
    );

    setDisbursementModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', color: 'var(--navy-900)' }}>
            Escrow Treasury & PFMS Gateway Ledger
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Automated milestone-based payments disbursed directly into verified startup accounts via Public Financial Management System (PFMS).
          </p>
        </div>

        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--success-text)', background: 'var(--success-bg)', padding: '8px 14px', borderRadius: '6px' }}>
          ✓ PFMS Gateway Online (100% Escrow Security SLA)
        </div>
      </div>

      {disbursementSuccess && (
        <div style={{
          background: 'var(--success-bg)',
          color: 'var(--success-text)',
          border: '1px solid #86efac',
          padding: '14px 18px',
          borderRadius: '8px',
          fontSize: '0.875rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <strong>✓ Disbursement Executed:</strong> {disbursementSuccess}
          </div>
          <button
            onClick={() => setDisbursementSuccess(null)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--success-text)', fontWeight: 700 }}
          >
            ✕
          </button>
        </div>
      )}

      {/* SELECT PILOT FOR MILESTONE PAYMENT TRACKING */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Select Pilot for Milestone Payout Tracking & Escrow Ledger:
            </label>
            <select
              value={selectedPilotId}
              onChange={(e) => setSelectedPilotId(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '550px',
                marginTop: '6px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.95rem',
                fontWeight: 600,
                background: 'var(--card-bg)',
                color: 'var(--navy-900)'
              }}
            >
              {pilots.map(p => (
                <option key={p.id} value={p.id}>
                  [{p.code}] {p.startupName} — ₹{p.allocatedBudget.toLocaleString('en-IN')} Total Escrow
                </option>
              ))}
            </select>
          </div>

          <div style={{
            background: 'var(--bg-muted)',
            padding: '10px 16px',
            borderRadius: '8px',
            display: 'flex',
            gap: '24px',
            fontSize: '0.85rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Pilot Contract Value:</span><br />
              <strong style={{ fontSize: '1rem', color: 'var(--navy-900)' }}>₹{selectedPilot.allocatedBudget.toLocaleString('en-IN')}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Released Payouts:</span><br />
              <strong style={{ fontSize: '1rem', color: 'var(--success-text)' }}>₹{selectedPilot.disbursedAmount.toLocaleString('en-IN')}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Escrow Held:</span><br />
              <strong style={{ fontSize: '1rem', color: 'var(--warning-text)' }}>
                ₹{(selectedPilot.allocatedBudget - selectedPilot.disbursedAmount).toLocaleString('en-IN')}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* MILESTONE-BASED PAYMENT TRACKING STRUCTURE */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>
              🎯 Structured Milestone Payment Tracker [{selectedPilot.startupName}]
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Sequential milestone disbursement schedule tied strictly to third-party independent KPI verification under PFMS.
            </p>
          </div>
        </div>

        {/* Milestone Cards Grid (M1-M4 Structure) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          {structuredMilestoneExample.map(m => {
            const isPaid = m.status === 'PAID';
            const isPending = m.status === 'PENDING_VALIDATION';
            return (
              <div
                key={m.id}
                style={{
                  background: isPaid ? '#f0fdf4' : isPending ? '#fffbebfb' : 'var(--bg-muted)',
                  border: `2px solid ${isPaid ? '#86efac' : isPending ? '#fde047' : 'var(--border-color)'}`,
                  borderRadius: '10px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: isPaid ? '#16a34a' : isPending ? '#d97706' : '#64748b',
                      color: '#fff',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      {m.share}% — ₹{m.amount.toLocaleString('en-IN')}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: isPaid ? 'var(--success-text)' : isPending ? 'var(--warning-text)' : 'var(--text-muted)'
                    }}>
                      {m.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
                    {m.title}
                  </h4>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px' }}>
                    ₹{m.amount.toLocaleString('en-IN')}
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.4 }}>
                    <div><strong>Date:</strong> {m.disbursementDate}</div>
                    <div><strong>PFMS Ref:</strong> <code style={{ fontSize: '0.72rem' }}>{m.pfmsRef}</code></div>
                    <div><strong>Verification:</strong> {m.auditor}</div>
                  </div>
                </div>

                <div>
                  {isPaid ? (
                    <div style={{ fontSize: '0.78rem', color: 'var(--success-text)', fontWeight: 600, textAlign: 'center', padding: '6px', background: 'rgba(34,197,94,0.1)', borderRadius: '4px' }}>
                      ✓ Status: Paid
                    </div>
                  ) : isPending ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleOpenDisbursementModal(m)}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      ⚡ Verify & Release Payout
                    </button>
                  ) : (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, textAlign: 'center', padding: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}>
                      🔒 Status: Upcoming
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PAYMENT TIMELINE & DISBURSEMENT HISTORY LEDGER */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '14px' }}>
          📜 Master PFMS Treasury Payment History & Audit Ledger
        </h3>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>PFMS Ref</th>
                <th>Startup Beneficiary</th>
                <th>Milestone Deliverable</th>
                <th>Disbursement Date</th>
                <th>Amount (₹)</th>
                <th>Gateway Status</th>
                <th>Cryptographic Audit Hash</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td><strong style={{ fontFamily: 'monospace', color: 'var(--primary-color)' }}>{p.transactionRef}</strong></td>
                  <td><strong>{p.startupName}</strong></td>
                  <td style={{ fontSize: '0.825rem' }}>{p.departmentName} — Sandbox Milestone</td>
                  <td style={{ fontSize: '0.825rem' }}>{p.disbursementDate}</td>
                  <td><strong style={{ color: 'var(--success-text)' }}>₹{p.amount.toLocaleString('en-IN')}</strong></td>
                  <td><StatusBadge status={p.paymentGatewayStatus} /></td>
                  <td style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                    SHA256:7a9f...331b
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISBURSEMENT RELEASE MODAL */}
      {disbursementModalOpen && targetMilestone && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '520px', padding: '24px', background: '#fff', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)' }}>
                Authorize PFMS Escrow Disbursement
              </h3>
              <button
                onClick={() => setDisbursementModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <div>Target Milestone: <strong>{targetMilestone.title}</strong></div>
              <div>Beneficiary: <strong>{selectedPilot.startupName}</strong></div>
              <div>Disbursement Amount: <strong style={{ color: 'var(--success-text)', fontSize: '1.1rem' }}>₹{targetMilestone.amount.toLocaleString('en-IN')}</strong> ({targetMilestone.share}% of Escrow)</div>
            </div>

            <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              <strong>Pre-Disbursement Audit Sign-off Checklist:</strong>
              <ul style={{ paddingLeft: '18px', margin: '6px 0 0 0' }}>
                <li>Independent Auditor (NIUA / NEERI / CRRI) verification certificate confirmed.</li>
                <li>Department Financial Advisor (DFA) key sign-off active.</li>
                <li>PFMS Gateway API handshake verified online.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn btn-outline" onClick={() => setDisbursementModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleExecuteDisbursement}>
                ⚡ Release Escrow Disbursement via PFMS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
