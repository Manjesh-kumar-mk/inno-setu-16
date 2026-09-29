import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Column } from '../../common/DataTable';
import { StatusBadge } from '../../common/StatusBadge';
import { formatINR } from '../../../utils/format';
import { Payment } from '../../../types';

export const AdminPayments: React.FC = () => {
  const { payments } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredPayments = payments.filter(p => {
    if (filterStatus === 'ALL') return true;
    return p.paymentGatewayStatus === filterStatus;
  });

  const columns: Column<Payment>[] = [
    {
      key: 'transactionRef',
      header: 'PFMS Transaction Ref',
      render: (p) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{p.transactionRef}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pilot ID: {p.pilotId}</div>
        </div>
      )
    },
    {
      key: 'startupName',
      header: 'Beneficiary Startup',
      render: (p) => (
        <span style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{p.startupName}</span>
      )
    },
    {
      key: 'departmentName',
      header: 'Authorizing Department',
      render: (p) => (
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{p.departmentName}</span>
      )
    },
    {
      key: 'amount',
      header: 'Escrow Amount',
      render: (p) => (
        <strong style={{ color: 'var(--primary-700)' }}>{formatINR(p.amount)}</strong>
      )
    },
    {
      key: 'disbursementDate',
      header: 'Date',
      render: (p) => (
        <span style={{ fontSize: '0.85rem' }}>{p.disbursementDate}</span>
      )
    },
    {
      key: 'paymentGatewayStatus',
      header: 'Gateway Status',
      render: (p) => <StatusBadge status={p.paymentGatewayStatus} />
    }
  ];

  const totalDisbursed = payments.reduce((acc, p) => acc + (p.paymentGatewayStatus === 'SUCCESS' ? p.amount : 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          PFMS Treasury & Escrow Disbursement Ledger
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          National treasury integration, milestone escrow disbursements, and multi-signature bank verification.
        </p>
      </div>

      <div className="grid-cols-3">
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>PFMS Escrow Corpus</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '4px' }}>₹18.60 Crore</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-text)', marginTop: '4px' }}>✓ PFMS Dedicated Account Active</div>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total Milestone Payouts</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '4px' }}>{formatINR(totalDisbursed)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Audited & Transferred to Beneficiaries</div>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Transactions Processed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '4px' }}>{payments.length} Settlements</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-text)', marginTop: '4px' }}>100% GFR 2017 Milestone Compliance</div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="tabs">
        <button className={`tab ${filterStatus === 'ALL' ? 'active' : ''}`} onClick={() => setFilterStatus('ALL')}>
          All Transactions ({payments.length})
        </button>
        <button className={`tab ${filterStatus === 'SUCCESS' ? 'active' : ''}`} onClick={() => setFilterStatus('SUCCESS')}>
          Disbursed ({payments.filter(p => p.paymentGatewayStatus === 'SUCCESS').length})
        </button>
        <button className={`tab ${filterStatus === 'PENDING' ? 'active' : ''}`} onClick={() => setFilterStatus('PENDING')}>
          Pending ({payments.filter(p => p.paymentGatewayStatus === 'PENDING').length})
        </button>
        <button className={`tab ${filterStatus === 'ESCROW_HELD' ? 'active' : ''}`} onClick={() => setFilterStatus('ESCROW_HELD')}>
          Escrow Held ({payments.filter(p => p.paymentGatewayStatus === 'ESCROW_HELD').length})
        </button>
      </div>

      {/* Main Ledger Table */}
      <DataTable
        columns={columns}
        data={filteredPayments}
        keyExtractor={(p) => p.id}
      />
    </div>
  );
};

export default AdminPayments;
