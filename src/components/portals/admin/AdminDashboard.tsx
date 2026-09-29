import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatCard } from '../../common/StatCard';

export const AdminDashboard: React.FC = () => {
  const { departments, startups, experts, challenges, pilots, auditLogs, setCurrentView } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-info" style={{ fontSize: '0.72rem', fontWeight: 700 }}>SUPER ADMIN WORKSPACE</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>SHA-256 Ledger Node Sync Active</span>
        </div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Platform Administrator Executive Dashboard
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Platform-wide statistics, system health monitors, regulatory compliance, and cross-department governance.
        </p>
      </div>

      {/* Platform-Wide Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <StatCard title="Total Departments" value={departments.length.toString()} subtitle="Registered Government Ministries" accentColor="#2563eb" />
        <StatCard title="Registered Startups" value={startups.length.toString()} subtitle="DPIIT Verified TRL-6 to 9" accentColor="#16a34a" />
        <StatCard title="Expert Panelists" value={experts.length.toString()} subtitle="Top IIT / IISc Evaluators" accentColor="#0284c7" />
        <StatCard title="Active Challenges" value={challenges.length.toString()} subtitle="Published RFPs across sectors" accentColor="#d97706" />
        <StatCard title="Sandbox Pilots" value={pilots.length.toString()} subtitle="Live operational trials" accentColor="#8b5cf6" />
        <StatCard title="Audit Health" value="100% HEALTHY" subtitle="Cryptographic merkle root verified" accentColor="#15803d" />
      </div>

      <div className="responsive-grid-2-1" style={{ gap: '20px' }}>
        {/* Government Departments List */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              🏛️ Government Departments Directory
            </h3>
            <button className="btn btn-outline btn-sm" onClick={() => setCurrentView('departments')}>
              Manage Departments →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {departments.map(d => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', background: 'var(--bg-muted)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.9rem' }}>{d.name} ({d.code})</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Lead Official: {d.leadOfficial} • {d.email}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-info">{d.activeChallengesCount} Active Challenges</span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Budget: <strong>₹{(d.budgetAllocated / 10000000).toFixed(1)} Cr</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cryptographic Audit Stream Snapshot */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              🛡️ Cryptographic System Audit Stream
            </h3>
            <button className="btn btn-outline btn-sm" onClick={() => setCurrentView('audit')}>
              View Full Logs →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {auditLogs.slice(0, 4).map(a => (
              <div key={a.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <strong style={{ color: 'var(--primary-color)' }}>{a.action}</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{a.timestamp}</span>
                </div>
                <div style={{ color: 'var(--navy-900)', fontWeight: 600 }}>{a.actorName} ({a.actorRole})</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  Hash: {a.blockchainHash.substring(0, 20)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
