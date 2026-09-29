import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';

export const StartupContracts: React.FC = () => {
  const { contracts } = useApp();

  const contractList = [
    {
      id: 'ctr-901',
      code: 'CONTRACT-UP-MOBILITY-2026',
      title: 'Tri-Partite Outcome-Based Sandbox Procurement Contract',
      departmentName: 'Urban Development Department, Uttar Pradesh',
      effectiveDate: '2026-08-01',
      expiryDate: '2027-02-01',
      totalValue: 2500000,
      status: 'ACTIVE',
      signatories: [
        'Shri Rajesh Verma, IAS (Special Secretary, UDD UP)',
        'Ananya Sharma (Co-Founder & CEO, Aarohan AI Technologies)',
        'Prof. S. Ranganathan (Independent Expert Evaluator, IIT Delhi)'
      ],
      blockchainHash: '0x9a81f88c72109e44a0129bc...d910'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <span className="badge badge-info" style={{ marginBottom: '6px' }}>Master Procurement Legal Registry</span>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-900)' }}>
          Executed Government Contracts & MOUs
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Legal tri-partite agreements, escrow terms, and digital signature records.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {contractList.map(c => (
          <div key={c.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span className="badge badge-info" style={{ marginBottom: '4px' }}>REF: {c.code}</span>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                  {c.title}
                </h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Department: {c.departmentName}
                </div>
              </div>
              <StatusBadge status={c.status as any} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              padding: '14px',
              background: 'var(--bg-muted)',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '0.85rem'
            }}>
              <div>Total Sandbox Budget Value: <strong>₹{c.totalValue.toLocaleString('en-IN')}</strong></div>
              <div>Effective Term: <strong>{c.effectiveDate} to {c.expiryDate}</strong></div>
              <div>Escrow Mechanism: <strong>PFMS Direct Benefit Transfer</strong></div>
            </div>

            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>✍️ Digital Signatories:</h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '20px', marginBottom: '16px', lineHeight: 1.6 }}>
              {c.signatories.map((sig, i) => (
                <li key={i}>✓ {sig} (Digitally Signed)</li>
              ))}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                🔗 Blockchain Hash Stamp: {c.blockchainHash}
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => alert('Downloading executed Contract PDF with Digital Signatures.')}>
                Download Executed Contract PDF 📥
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
