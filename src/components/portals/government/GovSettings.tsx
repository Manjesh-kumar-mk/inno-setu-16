import React from 'react';
import { useApp } from '../../../context/AppContext';

export const GovSettings: React.FC = () => {
  const { departments } = useApp();
  const currentDept = departments[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>
          Department Configuration & Procurement Settings
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Manage ministry official authorizations, escrow approval thresholds, and notification parameters.
        </p>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '16px' }}>Department Identity & Nodal Officer</h3>

        <div className="form-group">
          <label className="form-label">Department Name</label>
          <input className="form-input" defaultValue={currentDept.name} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Lead Nodal Officer</label>
            <input className="form-input" defaultValue={currentDept.leadOfficial} />
          </div>

          <div className="form-group">
            <label className="form-label">Official Email Address</label>
            <input className="form-input" defaultValue={currentDept.email} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Annual Innovation Budget Cap (₹)</label>
            <input className="form-input" defaultValue={currentDept.budgetAllocated} />
          </div>

          <div className="form-group">
            <label className="form-label">Escrow Single-Sign Signoff Limit (₹)</label>
            <input className="form-input" defaultValue="2500000" />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button className="btn btn-primary" onClick={() => alert('Department Configuration Saved!')}>
            Save Configuration Changes
          </button>
        </div>
      </div>
    </div>
  );
};
