import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatCard } from '../../common/StatCard';
import { StatusBadge } from '../../common/StatusBadge';

export const StartupPayments: React.FC = () => {
  const { payments, notifySuccess } = useApp();
  const [selectedInvoiceModal, setSelectedInvoiceModal] = useState(false);

  const totalContractValue = 2500000; // ₹25,00,000
  const totalPaid = 1250000; // ₹12,50,000
  const totalPending = 1250000; // ₹12,50,000
  const upcomingDisbursement = 500000; // ₹5,00,000

  const disbursementLedger = [
    {
      id: 'pfms-901',
      pfmsReference: 'PFMS-TRX-20260402-88192',
      milestone: 'Milestone 1: Prototype & Sensor Setup',
      amount: 500000,
      disbursementDate: '03 Apr 2026',
      status: 'DISBURSED',
      bankName: 'State Bank of India - Main Branch',
      accountMask: '•••• 9102'
    },
    {
      id: 'pfms-902',
      pfmsReference: 'PFMS-TRX-20260518-11029',
      milestone: 'Milestone 2: Field Deployment & Route AI',
      amount: 750000,
      disbursementDate: '19 May 2026',
      status: 'DISBURSED',
      bankName: 'State Bank of India - Main Branch',
      accountMask: '•••• 9102'
    },
    {
      id: 'pfms-903',
      pfmsReference: 'PFMS-ESCROW-HELD-901',
      milestone: 'Milestone 3: Performance Testing',
      amount: 500000,
      disbursementDate: '15 Jul 2026 (Scheduled)',
      status: 'IN_TREASURY_CLEARANCE',
      bankName: 'PFMS Treasury Escrow Pool',
      accountMask: '•••• 4410'
    },
    {
      id: 'pfms-904',
      pfmsReference: 'PFMS-ESCROW-LOCKED-902',
      milestone: 'Milestone 4: Final Validation & State Blueprint',
      amount: 750000,
      disbursementDate: '31 Aug 2026 (Scheduled)',
      status: 'ESCROW_LOCKED',
      bankName: 'PFMS Treasury Escrow Pool',
      accountMask: '•••• 4410'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="badge badge-info" style={{ marginBottom: '6px' }}>PFMS Treasury & Escrow Gateway</span>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-900)' }}>
            Grant Payments & Escrow Ledger
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Track milestone payout releases, PFMS transaction references, and government escrow reserve balances.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setSelectedInvoiceModal(true)}>
          + Upload Milestone Invoice
        </button>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid-cols-4">
        <StatCard
          title="Total Contract Value"
          value={`₹${totalContractValue.toLocaleString('en-IN')}`}
          subtitle="Allocated Sandbox Grant"
          icon="📄"
        />
        <StatCard
          title="Total Paid (Disbursed)"
          value={`₹${totalPaid.toLocaleString('en-IN')}`}
          subtitle="Cleared into Bank via PFMS"
          icon="✅"
          trend="50% Disbursed"
        />
        <StatCard
          title="Pending Escrow"
          value={`₹${totalPending.toLocaleString('en-IN')}`}
          subtitle="Held in Treasury"
          icon="🔒"
        />
        <StatCard
          title="Upcoming Payout"
          value={`₹${upcomingDisbursement.toLocaleString('en-IN')}`}
          subtitle="Target: 15 Jul 2026"
          icon="⏳"
          trend="In Audit Clearance"
        />
      </div>

      {/* PFMS Transaction Ledger Table */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '14px' }}>PFMS Treasury Disbursement Registry</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>PFMS Ref & Milestone</th>
                <th>Disbursement Amount</th>
                <th>Disbursement Date</th>
                <th>Receiving Bank Account</th>
                <th>Escrow Status</th>
                <th>Receipt / Action</th>
              </tr>
            </thead>
            <tbody>
              {disbursementLedger.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{item.milestone}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>REF: {item.pfmsReference}</div>
                  </td>
                  <td><strong style={{ color: 'var(--navy-900)' }}>₹{item.amount.toLocaleString('en-IN')}</strong></td>
                  <td style={{ fontSize: '0.825rem' }}>{item.disbursementDate}</td>
                  <td style={{ fontSize: '0.825rem' }}>{item.bankName} ({item.accountMask})</td>
                  <td><StatusBadge status={item.status as any} /></td>
                  <td>
                    {item.status === 'DISBURSED' ? (
                      <button className="btn btn-outline btn-sm" onClick={() => notifySuccess('Downloading PFMS Receipt', `Reference ${item.pfmsReference}`)}>
                        Download Receipt PDF
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>In Process</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Upload Modal */}
      {selectedInvoiceModal && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '550px', background: '#fff', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Upload Milestone Grant Invoice</h3>
              <button onClick={() => setSelectedInvoiceModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              notifySuccess('Invoice Uploaded', 'Invoice logged to PFMS Treasury Portal for auditor verification.');
              setSelectedInvoiceModal(false);
            }}>
              <div className="form-group">
                <label className="form-label">Select Milestone Phase</label>
                <select className="form-select">
                  <option value="m3">Milestone 3: Performance Testing (₹5,00,000)</option>
                  <option value="m4">Milestone 4: Final Validation & Blueprint (₹7,50,000)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">GST / Tax Invoice Number</label>
                <input className="form-input" required placeholder="e.g. GSTIN-INV-2026-BHARAT-002" />
              </div>

              <div className="form-group">
                <label className="form-label">Upload Tax Invoice File (PDF)</label>
                <input type="file" className="form-input" required style={{ padding: '6px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedInvoiceModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Invoice to Treasury →</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
