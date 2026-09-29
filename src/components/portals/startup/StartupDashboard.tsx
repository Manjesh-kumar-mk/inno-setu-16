import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatCard } from '../../common/StatCard';
import { StatusBadge } from '../../common/StatusBadge';
import { StartupApplicationWizard } from './StartupApplicationWizard';
import { Challenge } from '../../../types';

export const StartupDashboard: React.FC = () => {
  const { challenges, applications, pilots, setCurrentView } = useApp();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Mock AI recommended challenges with match scores
  const aiRecommended = [
    {
      challenge: challenges[0] || {
        id: 'ch-101',
        title: 'AI-Based Real-time Urban Signal Optimization',
        departmentName: 'Department of Transportation & Smart Mobility',
        sector: 'Smart Mobility',
        budgetCap: 350000,
        submissionDeadline: '2026-10-15',
        sandboxDurationMonths: 6,
        eligibleStartupCriteria: ['DPIIT Recognized', 'TRL 6+']
      },
      matchPercentage: 96,
      techMatch: 'Edge Computer Vision & TensorRT',
      domainMatch: 'Intelligent Traffic Management',
      eligibilityStatus: 'Eligible (DPIIT Tier-1 Verified)',
      reasoning: 'Matches 4 patented IP filings in edge traffic vision analytics.'
    },
    {
      challenge: challenges[1] || {
        id: 'ch-102',
        title: 'Edge AI Water Quality & Contaminant Detection System',
        departmentName: 'Ministry of Jal Shakti & Urban Water',
        sector: 'Clean Tech',
        budgetCap: 450000,
        submissionDeadline: '2026-11-01',
        sandboxDurationMonths: 9,
        eligibleStartupCriteria: ['DPIIT Recognized', 'TRL 7+']
      },
      matchPercentage: 91,
      techMatch: 'IoT Edge Sensing & Anomaly Detection',
      domainMatch: 'Environmental Monitoring',
      eligibilityStatus: 'Eligible (ISO 27001 Certified)',
      reasoning: 'Hardware root of trust aligns with sensor security requirement.'
    },
    {
      challenge: challenges[2] || {
        id: 'ch-103',
        title: 'Autonomous Drone Fleet for Rural Healthcare Delivery',
        departmentName: 'Department of Health & Family Welfare',
        sector: 'Health Tech',
        budgetCap: 500000,
        submissionDeadline: '2026-10-30',
        sandboxDurationMonths: 12,
        eligibleStartupCriteria: ['DPIIT Recognized', 'DGCA Clearance']
      },
      matchPercentage: 86,
      techMatch: 'Autonomous Navigation & Avionics',
      domainMatch: 'Emergency Logistics',
      eligibilityStatus: 'Conditionally Eligible (Requires DGCA Permit)',
      reasoning: 'Strong telemetry backend fit for emergency transport logs.'
    }
  ];

  const handleApply = (ch: Challenge) => {
    setSelectedChallenge(ch);
    setIsWizardOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)',
        color: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span className="badge badge-info" style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '8px' }}>
            AeroTraffic AI Systems • DPIIT-ST-881920
          </span>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '4px 0' }}>Startup Command Center</h1>
          <p style={{ fontSize: '0.875rem', opacity: 0.9, maxWidth: '600px' }}>
            AI-powered B2G outcome challenge matching, sandbox pilot tracking, and escrow disbursement management.
          </p>
        </div>
        <button
          className="btn btn-primary"
          style={{ background: '#ffffff', color: 'var(--navy-900)', fontWeight: 700 }}
          onClick={() => setCurrentView('discover-challenges')}
        >
          Explore Market Challenges →
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid-cols-4">
        <StatCard
          title="AI Recommended"
          value="3"
          subtitle="90%+ Tech Match"
          icon="🤖"
          trend="+1 New This Week"
        />
        <StatCard
          title="Applications Submitted"
          value={applications.length ? String(applications.length) : "4"}
          subtitle="2 Under Evaluation"
          icon="📋"
        />
        <StatCard
          title="Shortlisted & Selected"
          value="2"
          subtitle="1 Trial Active"
          icon="⭐"
        />
        <StatCard
          title="Pending Payments"
          value="₹7,50,000"
          subtitle="Escrow Released: ₹12,50,000"
          icon="💰"
          trend="Next: 15 Jul 2026"
        />
      </div>

      {/* AI Matched Recommended Challenges Section */}
      <div className="card">
        <div className="card-header" style={{ marginBottom: '16px' }}>
          <div>
            <span className="badge badge-primary" style={{ fontSize: '0.72rem', textTransform: 'uppercase' }}>
              ✨ AI Neural Matching Engine
            </span>
            <h2 className="card-title" style={{ marginTop: '4px' }}>Recommended Outcome Challenges</h2>
            <div className="card-subtitle">Matched against your DPIIT Tech Passport, TRL-7 level, and registered IP patents.</div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => setCurrentView('recommended')}>
            View All AI Matches
          </button>
        </div>

        <div className="grid-cols-3">
          {aiRecommended.map((item, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '18px',
                background: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="badge badge-success" style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                    {item.matchPercentage}% AI Match Score
                  </span>
                  <span className="badge badge-info" style={{ fontSize: '0.72rem' }}>{item.challenge.sector}</span>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', lineHeight: 1.35, color: 'var(--navy-900)' }}>
                  {item.challenge.title}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  {item.challenge.departmentName}
                </div>

                <div style={{ background: 'var(--bg-muted)', padding: '10px', borderRadius: '6px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  <div><strong>Tech Match:</strong> {item.techMatch}</div>
                  <div><strong>Domain Match:</strong> {item.domainMatch}</div>
                  <div><strong>Eligibility:</strong> <span style={{ color: 'var(--success-text)', fontWeight: 600 }}>{item.eligibilityStatus}</span></div>
                  <div><strong>Deadline:</strong> {item.challenge.submissionDeadline}</div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '14px' }}>
                  💡 "{item.reasoning}"
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-700)' }}>
                  Cap: ₹{item.challenge.budgetCap.toLocaleString('en-IN')}
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleApply(item.challenge as Challenge)}
                >
                  Apply for Challenge →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column layout for Active Pilot Widget & Applications Track */}
      <div className="grid-cols-2">
        {/* Active Sandbox Trial Widget */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Active Sandbox Trial</h3>
              <div className="card-subtitle">Trial Ref: PLT-UP-UDD-2026-01 • Lucknow Municipal Wards</div>
            </div>
            <StatusBadge status="ACTIVE" />
          </div>

          <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px', margin: '14px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>Milestone Progress (2 / 4 Completed)</span>
              <strong>50% Complete</strong>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#cbd5e1', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '50%', height: '100%', background: 'var(--primary-600)', borderRadius: '4px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', marginBottom: '16px' }}>
            <div>Disbursed: <strong>₹12,50,000 / ₹25,00,000</strong></div>
            <div>Auditor: <strong>Er. R. K. Sharma (NIUA)</strong></div>
          </div>

          <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setCurrentView('active-pilots')}>
            Open Pilot Workspace & Deliverables →
          </button>
        </div>

        {/* My Applications Recent Status */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Recent Submissions Status</h3>
              <div className="card-subtitle">Track your proposal evaluation pipeline</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => setCurrentView('my-applications')}>
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            {[
              { title: 'AI-Based Urban Signal Optimization', dept: 'Dept. of Transportation', status: 'SHORTLISTED', date: 'Sep 24, 2026' },
              { title: 'Edge AI Water Quality Detection', dept: 'Ministry of Jal Shakti', status: 'EXPERT_EVALUATION', date: 'Sep 18, 2026' },
              { title: 'Smart Grid Load Balancing AI', dept: 'Ministry of Power', status: 'SUBMITTED', date: 'Sep 12, 2026' }
            ].map((app, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg-muted)', borderRadius: '6px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{app.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.dept} • {app.date}</div>
                </div>
                <StatusBadge status={app.status as any} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Wizard */}
      <StartupApplicationWizard
        challenge={selectedChallenge}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />
    </div>
  );
};
