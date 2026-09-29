import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatCard } from '../../common/StatCard';
import { StatusBadge } from '../../common/StatusBadge';
import { DataTable, Column } from '../../common/DataTable';
import { Challenge, Pilot, Application } from '../../../types';
import { formatINR, formatLakhCrore } from '../../../utils/format';

export const GovDashboard: React.FC = () => {
  const {
    challenges,
    applications,
    pilots,
    evaluations,
    payments,
    scaleUpDecisions,
    auditLogs,
    departments,
    setCurrentView,
    openModal,
    verifyMilestone
  } = useApp();

  // Calculate 7 KPI Card Metrics
  const activeChallengesCount = challenges.filter(c => c.status === 'SANDBOX_ACTIVE' || c.status === 'OPEN' || c.status === 'EVALUATION').length;
  const applicationsReceivedCount = applications.length + 54; // Total received including historical screening
  const activePilotsCount = pilots.filter(p => p.status === 'ACTIVE' || p.status === 'SETUP' || p.status === 'MILESTONE_REVIEW' || p.status === 'MEASUREMENT_PHASE').length;
  const completedPilotsCount = 4; // Completed sandboxes
  const pendingEvaluationsCount = applications.filter(a => a.status === 'EXPERT_EVALUATION' || a.status === 'SUBMITTED').length;
  const pendingPaymentsCount = 2; // Pending escrow disbursements
  const solutionsScaledCount = scaleUpDecisions.length;

  // Pipeline stage counts
  const pipelineStages = [
    { label: 'Challenges', count: challenges.length, icon: '🎯', stage: 'challenges' },
    { label: 'Applications', count: 68, icon: '📥', stage: 'applications' },
    { label: 'Shortlisted', count: 14, icon: '⭐', stage: 'applications' },
    { label: 'Pilots', count: pilots.length, icon: '🔬', stage: 'pilots' },
    { label: 'Validated', count: 4, icon: '✅', stage: 'pilots' },
    { label: 'Procurement', count: 3, icon: '📜', stage: 'contracts' },
    { label: 'Scaled', count: scaleUpDecisions.length, icon: '🚀', stage: 'scale-up' }
  ];

  // Table columns for quick challenges view
  const challengeColumns: Column<Challenge>[] = [
    { key: 'code', header: 'Code', width: '110px', render: (c) => <strong>{c.code}</strong> },
    {
      key: 'title',
      header: 'Outcome Challenge',
      render: (c) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{c.title}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.departmentName}</div>
        </div>
      )
    },
    { key: 'sector', header: 'Sector', width: '130px' },
    { key: 'budgetCap', header: 'Budget', width: '120px', render: (c) => formatINR(c.budgetCap) },
    { key: 'status', header: 'Status', width: '140px', render: (c) => <StatusBadge status={c.status} /> },
    {
      key: 'actions',
      header: 'Action',
      width: '110px',
      render: (c) => (
        <button
          className="btn btn-outline btn-sm"
          onClick={(e) => { e.stopPropagation(); openModal('CHALLENGE_DETAILS', c); }}
        >
          View
        </button>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', color: 'var(--navy-900)' }}>
            Government Executive Dashboard
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Outcome-based public procurement, sandbox pilot monitoring, and cross-department scale-up center.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => setCurrentView('create-challenge')}>
            + Post Problem Statement
          </button>
          <button className="btn btn-primary" onClick={() => openModal('REPORTS_EXPORT')}>
            📊 Generate Audit Report
          </button>
        </div>
      </div>

      {/* 7 KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <StatCard
          title="Active Challenges"
          value={activeChallengesCount}
          subtitle="across 4 ministries"
          trend={{ value: "+2 this month", isPositive: true }}
          accentColor="#2563EB"
        />
        <StatCard
          title="Applications Received"
          value={applicationsReceivedCount}
          subtitle="14 shortlisted for review"
          trend={{ value: "+18% vs Q1", isPositive: true }}
          accentColor="#0284C7"
        />
        <StatCard
          title="Active Pilots"
          value={activePilotsCount}
          subtitle="live in testbed sandboxes"
          trend={{ value: "100% telemetry live" }}
          accentColor="#D97706"
        />
        <StatCard
          title="Completed Pilots"
          value={completedPilotsCount}
          subtitle="100% KPI target achieved"
          trend={{ value: "Ready for procurement", isPositive: true }}
          accentColor="#059669"
        />
        <StatCard
          title="Pending Evaluations"
          value={pendingEvaluationsCount}
          subtitle="expert panel scoring"
          trend={{ value: "3 due this week" }}
          accentColor="#7C3AED"
        />
        <StatCard
          title="Pending Payments"
          value={pendingPaymentsCount}
          subtitle="₹12,50,000 escrow sign-off"
          trend={{ value: "PFMS Gateway ready" }}
          accentColor="#EA580C"
        />
        <StatCard
          title="Solutions Scaled"
          value={solutionsScaledCount}
          subtitle="cross-dept deployments"
          trend={{ value: "₹16.7 Crore savings", isPositive: true }}
          accentColor="#16A34A"
        />
      </div>

      {/* 1. Innovation Pipeline */}
      <div className="card" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">1. Innovation Pipeline & Lifecycle Velocity</h3>
            <div className="card-subtitle">Real-time throughput from problem definition to cross-department deployment</div>
          </div>
          <span className="badge badge-primary">9-Stage Workflow Active</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          marginTop: '16px',
          position: 'relative'
        }}>
          {pipelineStages.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentView(item.stage)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '14px 12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-600)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{item.icon}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-900)' }}>{item.count}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '2px' }}>{item.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--primary-700)', marginTop: '6px', fontWeight: 600 }}>
                Step {idx + 1} →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Pending Actions + Active Pilots & Milestones */}
      <div className="responsive-grid-2-1" style={{ gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* 3. Active Pilots Overview */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">3. Active Sandbox Pilots</h3>
                <div className="card-subtitle">Live operational trials with real-time KPI telemetry monitoring</div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setCurrentView('pilots')}>
                Manage All Pilots ({pilots.length})
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
              {pilots.map(p => (
                <div
                  key={p.id}
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '16px',
                    background: 'var(--bg-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-700)' }}>
                        PILOT REF: {p.code} • {p.departmentName}
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)', marginTop: '2px' }}>
                        {p.challengeTitle}
                      </div>
                      <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                        Startup Partner: <strong>{p.startupName}</strong> • Testbed: <strong>{p.testbedLocation || 'Designated Sandbox Testbed'}</strong>
                      </div>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>

                  {/* Progress Bar & KPI Quick Pill */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600 }}>Trial Execution Progress</span>
                      <span style={{ fontWeight: 700, color: 'var(--primary-700)' }}>{p.progressPercentage ?? 50}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${p.progressPercentage ?? 50}%` }} />
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '8px',
                    background: 'var(--bg-muted)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '0.8rem'
                  }}>
                    <div>
                      KPI Status: <strong style={{ color: (p.kpiStatus || 'ON_TRACK') === 'ON_TRACK' ? 'var(--success-text)' : 'var(--warning-text)' }}>
                        {(p.kpiStatus || 'ON_TRACK') === 'ON_TRACK' ? '✓ Baseline Outperformed' : '⚠ Action Required'}
                      </strong>
                    </div>
                    <div>
                      Budget Disbursed: <strong>{formatINR(p.spentBudget ?? p.disbursedAmount ?? 0)} / {formatINR(p.totalBudget ?? p.allocatedBudget ?? 0)}</strong>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => setCurrentView('pilots')}>
                      View Live Telemetry →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Upcoming Milestones */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">4. Upcoming Sandbox Milestones</h3>
                <div className="card-subtitle">Milestone deliverables due for independent audit and escrow payout</div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setCurrentView('milestones')}>
                View Milestone Hub
              </button>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Milestone Title</th>
                    <th>Startup</th>
                    <th>Target Date</th>
                    <th>Escrow Amount</th>
                    <th>Verification Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pilots.flatMap(p => p.milestones.map(m => ({ ...m, startupName: p.startupName, pilotId: p.id }))).slice(0, 4).map(ms => (
                    <tr key={ms.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{ms.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: {ms.deliverables?.join(', ') || ms.description}</div>
                      </td>
                      <td>{ms.startupName}</td>
                      <td style={{ fontSize: '0.825rem' }}>{ms.dueDate}</td>
                      <td><strong>{formatINR(ms.payoutAmount || 0)}</strong></td>
                      <td><StatusBadge status={ms.status} /></td>
                      <td>
                        {ms.status === 'PENDING' || ms.status === 'SUBMITTED' ? (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => verifyMilestone(ms.pilotId, ms.id)}
                          >
                            Verify & Disburse
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.78rem', color: 'var(--success-text)', fontWeight: 600 }}>✓ Disbursed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. Performance Overview */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">6. Performance Overview & Procurement Acceleration</h3>
                <div className="card-subtitle">Key efficiency metrics vs traditional public procurement baselines</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '8px' }}>
              <div style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-100)', padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-800)' }}>AVG TIME TO DEPLOY PILOT</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-900)', margin: '4px 0' }}>42 Days</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary-700)' }}>vs 180 Days traditional RFP cycle (76% faster)</div>
              </div>

              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#166534' }}>AVG COST SAVINGS DELIVERED</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#14532D', margin: '4px 0' }}>₹1.8 Crore / project</div>
                <div style={{ fontSize: '0.75rem', color: '#15803D' }}>Derived from baseline efficiency telemetry</div>
              </div>

              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#92400E' }}>SANDBOX VALIDATION SUCCESS RATE</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#78350F', margin: '4px 0' }}>92.5%</div>
                <div style={{ fontSize: '0.75rem', color: '#B45309' }}>Independent auditor sign-off rate</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* 5. Pending Actions */}
          <div className="card" style={{ borderLeft: '4px solid var(--warning-text)' }}>
            <div className="card-header">
              <h3 className="card-title">5. Pending Officer Actions</h3>
              <span className="badge badge-warning">4 Required</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => setCurrentView('applications')}
              >
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--navy-900)' }}>
                  📥 3 Applications Pending Screening
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Verify DPIIT registration & TRL-7 compliance.
                </div>
              </div>

              <div
                style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => setCurrentView('evaluation')}
              >
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--navy-900)' }}>
                  🔬 2 Expert Evaluator Assignments
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Assign IIT / AIIMS faculty panelists.
                </div>
              </div>

              <div
                style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => setCurrentView('milestones')}
              >
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--navy-900)' }}>
                  💸 1 Escrow Sign-Off Pending (₹7,50,000)
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  AeroTraffic AI Milestone 2 field verification.
                </div>
              </div>

              <div
                style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => setCurrentView('create-challenge')}
              >
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--navy-900)' }}>
                  📝 Draft Outcome Spec Approval
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Urban Water Arsenic Removal specification.
                </div>
              </div>
            </div>
          </div>

          {/* 2. Recent Activity Feed */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">2. Recent System Activity</h3>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cryptographic Log</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {auditLogs.slice(0, 5).map(log => (
                <div key={log.id} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{log.action}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Target: {log.targetEntity}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <span>{log.actorName}</span>
                    <span>{log.timestamp.split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Regional / Department Statistics */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">7. Ministry & Department Statistics</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {departments.map(dept => (
                <div
                  key={dept.id}
                  style={{
                    background: 'var(--bg-muted)',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    fontSize: '0.8rem'
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{dept.code} - {dept.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <span>Allocated: <strong>{formatLakhCrore(dept.budgetAllocated)}</strong></span>
                    <span>Active Pilots: <strong>{dept.activePilotsCount}</strong></span>
                    <span>Scaled: <strong>{dept.scaledSolutionsCount}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
