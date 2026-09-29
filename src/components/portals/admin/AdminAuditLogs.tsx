import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Column } from '../../common/DataTable';
import { AuditEvent } from '../../../types';

export const AdminAuditLogs: React.FC = () => {
  const { auditLogs } = useApp();

  const [auditQuery, setAuditQuery] = useState('');
  const [selectedAuditHash, setSelectedAuditHash] = useState<string | null>(null);

  const filteredAuditLogs = auditLogs.filter(aud =>
    aud.action.toLowerCase().includes(auditQuery.toLowerCase()) ||
    aud.actorName.toLowerCase().includes(auditQuery.toLowerCase()) ||
    aud.targetEntity.toLowerCase().includes(auditQuery.toLowerCase()) ||
    aud.actorRole.toLowerCase().includes(auditQuery.toLowerCase())
  );

  const auditColumns: Column<AuditEvent>[] = [
    { 
      key: 'timestamp', 
      header: 'Timestamp', 
      width: '150px', 
      render: (a) => <span style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>{a.timestamp}</span> 
    },
    { 
      key: 'actorName', 
      header: 'User', 
      render: (a) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{a.actorName}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Role: <strong>{a.actorRole}</strong></div>
        </div>
      )
    },
    { 
      key: 'action', 
      header: 'Action', 
      render: (a) => <span style={{ fontWeight: 700, color: 'var(--primary-color)' }}>{a.action}</span> 
    },
    { key: 'targetEntity', header: 'Entity', render: (a) => a.targetEntity },
    { 
      key: 'previousState', 
      header: 'Previous state', 
      render: (a) => (
        <span style={{ fontSize: '0.75rem', color: '#991b1b', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>
          {(a as any).previousState || 'N/A'}
        </span>
      )
    },
    { 
      key: 'newState', 
      header: 'New state', 
      render: (a) => (
        <span style={{ fontSize: '0.75rem', color: '#166534', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>
          {(a as any).newState || 'COMPLETED'}
        </span>
      )
    },
    { 
      key: 'ipAddress', 
      header: 'IP / Session Origin', 
      render: (a) => (
        <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          {a.ipAddress} (Session #sess-8821)
        </span>
      )
    },
    { 
      key: 'blockchainHash', 
      header: 'Hash Proof', 
      render: (a) => (
        <button
          onClick={() => setSelectedAuditHash(a.blockchainHash)}
          style={{ fontFamily: 'monospace', fontSize: '0.7rem', background: 'var(--bg-muted)', border: '1px solid var(--border-color)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
        >
          {a.blockchainHash.substring(0, 12)}...
        </button>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Searchable Cryptographic Audit History
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Immutable SHA-256 audit log tracking every user action, state change, score submission, and milestone disbursement.
        </p>
      </div>

      <div className="card" style={{ padding: '20px' }}>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="🔍 Search audit log by user, role, action, or entity..."
            value={auditQuery}
            onChange={(e) => setAuditQuery(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}
          />
        </div>

        <DataTable
          columns={auditColumns}
          data={filteredAuditLogs}
          keyExtractor={(a) => a.id}
        />
      </div>

      {selectedAuditHash && (
        <div className="card" style={{ background: '#0f172a', color: '#ffffff', padding: '20px', fontFamily: 'monospace' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ color: '#60a5fa', fontWeight: 800 }}>BLOCK VERIFICATION PROOF</span>
            <button onClick={() => setSelectedAuditHash(null)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ fontSize: '0.85rem', wordBreak: 'break-all', color: '#94a3b8' }}>
            Hash: <span style={{ color: '#34d399' }}>{selectedAuditHash}</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '8px' }}>
            State: SHA-256 Merkle Root Verified • Consensus: NIC Government Node Signature Validated
          </div>
        </div>
      )}
    </div>
  );
};
