import React from 'react';
import { useApp } from '../../../context/AppContext';

export const GovAudit: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>
            Cryptographic Immutable Audit Logs
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Tamper-proof blockchain SHA-256 hash log of every official government procurement action and escrow payment.
          </p>
        </div>

        <span className="badge badge-success">✓ Block Hash Verification Active</span>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp (UTC)</th>
                <th>Actor Name & Role</th>
                <th>Action Performed</th>
                <th>Target Entity</th>
                <th>IP Address</th>
                <th>Cryptographic Block Hash</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>{log.timestamp}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{log.actorName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role: {log.actorRole}</div>
                  </td>
                  <td><strong>{log.action}</strong></td>
                  <td style={{ fontSize: '0.825rem' }}>{log.targetEntity}</td>
                  <td style={{ fontSize: '0.78rem', fontFamily: 'monospace' }}>{log.ipAddress}</td>
                  <td style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--primary-700)' }}>
                    {log.blockchainHash}
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
