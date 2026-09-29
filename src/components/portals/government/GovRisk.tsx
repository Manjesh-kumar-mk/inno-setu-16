import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';
import { AIRiskAssistantModal } from '../../common/AIAssistantComponents';

export const GovRisk: React.FC = () => {
  const { risks } = useApp();
  const [isAiRiskModalOpen, setIsAiRiskModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>
            Risk Management & Compliance Matrix
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Cybersecurity, operational, data, and legal risk tracking across active sandbox trials.
          </p>
        </div>

        <button
          className="btn btn-outline"
          style={{ borderColor: '#ef4444', color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)' }}
          onClick={() => setIsAiRiskModalOpen(true)}
        >
          ✨ Run AI Multi-Domain Risk Scan
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Target Sandbox Entity</th>
                <th>Severity</th>
                <th>Identified Risk Description</th>
                <th>Mitigation Strategy</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {risks.map(r => (
                <tr key={r.id}>
                  <td><strong>{r.category}</strong></td>
                  <td>{r.entityName}</td>
                  <td><StatusBadge status={r.severity} /></td>
                  <td>{r.description}</td>
                  <td style={{ fontSize: '0.825rem' }}>{r.mitigationPlan}</td>
                  <td><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AIRiskAssistantModal
        isOpen={isAiRiskModalOpen}
        onClose={() => setIsAiRiskModalOpen(false)}
      />
    </div>
  );
};
