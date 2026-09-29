import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatCard } from '../../common/StatCard';
import { StatusBadge } from '../../common/StatusBadge';

export const ExpertDashboard: React.FC = () => {
  const { applications, evaluations, experts, setCurrentView } = useApp();

  const currentExpert = experts[0] || {
    name: 'Prof. Anand R. Swaminathan',
    designation: 'Chair, Intelligent Transportation Systems',
    institution: 'IIT Delhi',
    department: 'Smart Mobility',
    evaluationsCompletedCount: 18
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-info" style={{ fontSize: '0.72rem', fontWeight: 700 }}>INDEPENDENT JURY PANEL</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Security Level 3 Verified</span>
        </div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Expert Evaluator Dashboard
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Welcome back, <strong>{currentExpert.name}</strong> ({currentExpert.designation}, {currentExpert.institution}).
        </p>
      </div>

      {/* Top Stat Cards: Pending Evaluations, Completed Evaluations, Pilot Reviews, Pending Validations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <StatCard
          title="Pending Evaluations"
          value="3"
          subtitle="Proposals awaiting scoring"
          accentColor="#2563eb"
        />
        <StatCard
          title="Completed Evaluations"
          value={currentExpert.evaluationsCompletedCount?.toString() || '18'}
          subtitle="Historical rubrics submitted"
          accentColor="#16a34a"
        />
        <StatCard
          title="Pilot Reviews"
          value="2"
          subtitle="Sandbox trial progress audits"
          accentColor="#0284c7"
        />
        <StatCard
          title="Pending Validations"
          value="1"
          subtitle="KPI verification sign-offs"
          accentColor="#d97706"
        />
      </div>

      <div className="responsive-grid-2-1" style={{ gap: '20px' }}>
        {/* Pending Evaluations Quick Access */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              📋 Assigned Applications Pending Review
            </h3>
            <button className="btn btn-primary btn-sm" onClick={() => setCurrentView('assigned-evaluations')}>
              Evaluate Now →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {applications.slice(0, 3).map(app => (
              <div
                key={app.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  background: 'var(--bg-muted)',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.9rem' }}>{app.startupName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{app.challengeTitle}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <StatusBadge status={app.status} />
                  <div style={{ fontSize: '0.72rem', color: 'var(--primary-color)', marginTop: '4px', fontWeight: 600 }}>Review Due Soon</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expert Sign-Offs */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              📜 Recent Evaluation Rubric Sign-offs
            </h3>
            <button className="btn btn-outline btn-sm" onClick={() => setCurrentView('evaluation-history')}>
              View History →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {evaluations.slice(0, 3).map(ev => (
              <div
                key={ev.id}
                style={{
                  padding: '12px',
                  background: 'var(--bg-muted)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.825rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--navy-900)' }}>Score: {ev.totalScore}/100</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ev.evaluationDate}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{ev.overallComments}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
