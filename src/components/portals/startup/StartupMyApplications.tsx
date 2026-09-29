import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';
import { Timeline } from '../../common/Timeline';

export type StartupApplicationStatus = 
  | 'DRAFT' 
  | 'SUBMITTED' 
  | 'UNDER_SCREENING' 
  | 'UNDER_EVALUATION' 
  | 'SHORTLISTED' 
  | 'PILOT_SELECTED' 
  | 'REJECTED' 
  | 'WITHDRAWN';

export const StartupMyApplications: React.FC = () => {
  const { applications } = useApp();
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Rich mock list covering all required statuses
  const allApplications = [
    {
      id: 'app-901',
      challengeTitle: 'AI-Based Real-time Urban Signal Optimization',
      departmentName: 'Department of Transportation & Smart Mobility',
      submissionDate: '2026-09-24',
      proposedBudget: 350000,
      status: 'PILOT_SELECTED' as StartupApplicationStatus,
      expertScore: 92,
      timelineSteps: [
        { label: 'Draft Created', date: '2026-09-20', status: 'APPROVED' },
        { label: 'Submitted & Signed', date: '2026-09-24', status: 'APPROVED' },
        { label: 'Statutory Screening', date: '2026-09-25', status: 'APPROVED' },
        { label: 'Independent Expert Panel Review', date: '2026-09-26', status: 'APPROVED' },
        { label: 'Shortlisted for Interview', date: '2026-09-26', status: 'APPROVED' },
        { label: 'Awarded Sandbox Pilot', date: '2026-09-27', status: 'APPROVED' }
      ]
    },
    {
      id: 'app-902',
      challengeTitle: 'Edge AI Water Quality & Contaminant Detection System',
      departmentName: 'Ministry of Jal Shakti & Urban Water',
      submissionDate: '2026-09-18',
      proposedBudget: 420000,
      status: 'SHORTLISTED' as StartupApplicationStatus,
      expertScore: 88,
      timelineSteps: [
        { label: 'Draft Created', date: '2026-09-15', status: 'APPROVED' },
        { label: 'Submitted & Signed', date: '2026-09-18', status: 'APPROVED' },
        { label: 'Statutory Screening', date: '2026-09-20', status: 'APPROVED' },
        { label: 'Independent Expert Panel Review', date: '2026-09-22', status: 'APPROVED' },
        { label: 'Shortlisted', date: '2026-09-25', status: 'APPROVED' }
      ]
    },
    {
      id: 'app-903',
      challengeTitle: 'Smart Grid Autonomous Load Balancing AI',
      departmentName: 'Ministry of Power & Renewable Energy',
      submissionDate: '2026-09-12',
      proposedBudget: 300000,
      status: 'UNDER_EVALUATION' as StartupApplicationStatus,
      expertScore: 84,
      timelineSteps: [
        { label: 'Draft Created', date: '2026-09-10', status: 'APPROVED' },
        { label: 'Submitted & Signed', date: '2026-09-12', status: 'APPROVED' },
        { label: 'Statutory Screening', date: '2026-09-15', status: 'APPROVED' },
        { label: 'Under Technical Evaluation', date: 'In Progress', status: 'SUBMITTED' }
      ]
    },
    {
      id: 'app-904',
      challengeTitle: 'Sub-Surface Pipe Leakage Thermal Sensing AI',
      departmentName: 'Municipal Corporation Infrastructure Division',
      submissionDate: '2026-09-05',
      proposedBudget: 280000,
      status: 'UNDER_SCREENING' as StartupApplicationStatus,
      expertScore: undefined,
      timelineSteps: [
        { label: 'Draft Created', date: '2026-09-03', status: 'APPROVED' },
        { label: 'Submitted & Signed', date: '2026-09-05', status: 'APPROVED' },
        { label: 'DPIIT & Statutory Screening', date: 'In Progress', status: 'SUBMITTED' }
      ]
    },
    {
      id: 'app-905',
      challengeTitle: 'Port Container Yard Autonomous AGV Dispatcher',
      departmentName: 'Ministry of Ports, Shipping & Waterways',
      submissionDate: 'N/A (Draft Saved)',
      proposedBudget: 490000,
      status: 'DRAFT' as StartupApplicationStatus,
      expertScore: undefined,
      timelineSteps: [
        { label: 'Draft Created', date: '2026-09-26', status: 'PENDING' }
      ]
    },
    {
      id: 'app-906',
      challengeTitle: 'High-Altitude Cold Weather UAV Telemetry',
      departmentName: 'Ministry of Defence Procurement Cell',
      submissionDate: '2026-08-10',
      proposedBudget: 600000,
      status: 'REJECTED' as StartupApplicationStatus,
      expertScore: 64,
      timelineSteps: [
        { label: 'Submitted', date: '2026-08-10', status: 'APPROVED' },
        { label: 'Screened', date: '2026-08-14', status: 'APPROVED' },
        { label: 'Evaluated', date: '2026-08-20', status: 'APPROVED' },
        { label: 'Not Selected (TRL Requirement Unmet)', date: '2026-08-22', status: 'DELAYED' }
      ]
    },
    {
      id: 'app-907',
      challengeTitle: 'Municipal Solid Waste Sorting Robotics',
      departmentName: 'Urban Sanitation Authority',
      submissionDate: '2026-07-15',
      proposedBudget: 220000,
      status: 'WITHDRAWN' as StartupApplicationStatus,
      expertScore: undefined,
      timelineSteps: [
        { label: 'Submitted', date: '2026-07-15', status: 'APPROVED' },
        { label: 'Withdrawn by Startup', date: '2026-07-18', status: 'DELAYED' }
      ]
    }
  ];

  const filteredApps = allApplications.filter(a => {
    if (filterStatus === 'ALL') return true;
    return a.status === filterStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <span className="badge badge-info" style={{ marginBottom: '6px' }}>Proposal Pipeline Tracking</span>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-900)' }}>
          My Government Challenge Applications
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Track evaluation progress, expert reviewer comments, and sandbox award selections.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {[
          { id: 'ALL', label: 'All Applications' },
          { id: 'DRAFT', label: 'Drafts' },
          { id: 'SUBMITTED', label: 'Submitted' },
          { id: 'UNDER_SCREENING', label: 'Screening' },
          { id: 'UNDER_EVALUATION', label: 'Under Evaluation' },
          { id: 'SHORTLISTED', label: 'Shortlisted' },
          { id: 'PILOT_SELECTED', label: 'Pilot Selected' },
          { id: 'REJECTED', label: 'Rejected' },
          { id: 'WITHDRAWN', label: 'Withdrawn' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`btn btn-sm ${filterStatus === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus(tab.id)}
            style={{ fontSize: '0.78rem' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Applications Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Proposal Ref & Challenge</th>
                <th>Department</th>
                <th>Submitted Date</th>
                <th>Proposed Budget (₹)</th>
                <th>Status</th>
                <th>Action / Timeline</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map(app => (
                <tr key={app.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{app.challengeTitle}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>REF: {app.id}</div>
                  </td>
                  <td style={{ fontSize: '0.825rem' }}>{app.departmentName}</td>
                  <td style={{ fontSize: '0.825rem' }}>{app.submissionDate}</td>
                  <td><strong>₹{app.proposedBudget.toLocaleString('en-IN')}</strong></td>
                  <td><StatusBadge status={app.status as any} /></td>
                  <td>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedApp(app)}
                    >
                      Track Timeline →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Status Timeline Modal */}
      {selectedApp && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '650px', background: '#fff', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <StatusBadge status={selectedApp.status} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '6px', color: 'var(--navy-900)' }}>
                  {selectedApp.challengeTitle}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedApp.departmentName}</div>
              </div>
              <button onClick={() => setSelectedApp(null)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Proposed Budget: <strong>₹{selectedApp.proposedBudget.toLocaleString('en-IN')}</strong></span>
                <span>Expert Score: <strong>{selectedApp.expertScore ? `${selectedApp.expertScore}/100` : 'Pending'}</strong></span>
              </div>
              <div>Submission Date: <strong>{selectedApp.submissionDate}</strong></div>
            </div>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>
              📍 Application Status Timeline Progress
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '10px', borderLeft: '2px solid var(--primary-500)', margin: '10px 0 20px 10px' }}>
              {selectedApp.timelineSteps.map((step: any, idx: number) => (
                <div key={idx} style={{ position: 'relative', paddingLeft: '16px' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-21px',
                    top: '2px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'var(--primary-600)'
                  }} />
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{step.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{step.date}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {selectedApp.status !== 'WITHDRAWN' && selectedApp.status !== 'PILOT_SELECTED' && (
                <button
                  className="btn btn-outline btn-sm"
                  style={{ color: 'var(--danger-text)', borderColor: 'var(--danger-border)' }}
                  onClick={() => {
                    alert('Application withdrawal request submitted.');
                    setSelectedApp(null);
                  }}
                >
                  Withdraw Proposal
                </button>
              )}
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedApp(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
