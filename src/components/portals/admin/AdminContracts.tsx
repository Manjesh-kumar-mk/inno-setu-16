import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';

export const AdminContracts: React.FC = () => {
  const { contracts } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Master Procurement & Contract Registry
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          GFR Rule 194 direct contracts, pilot agreements, and digital signatures.
        </p>
      </div>

      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {contracts.map(cnt => (
            <div key={cnt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', padding: '14px 16px', background: 'var(--bg-muted)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.925rem' }}>
                  {cnt.contractNumber} — {cnt.startupName}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Value: <strong>₹{cnt.totalContractValue?.toLocaleString('en-IN') || '25,00,000'}</strong> • Executed Date: {cnt.effectiveDate} • Ministry: {cnt.departmentName}
                </div>
              </div>
              <StatusBadge status={cnt.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
