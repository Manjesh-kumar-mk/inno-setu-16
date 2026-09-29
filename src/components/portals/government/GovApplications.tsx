import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Column } from '../../common/DataTable';
import { StatusBadge } from '../../common/StatusBadge';
import { Application } from '../../../types';
import { AIProposalSummaryModal, AIRiskAssistantModal } from '../../common/AIAssistantComponents';

export const GovApplications: React.FC = () => {
  const { applications, openModal } = useApp();
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');

  const [summaryApp, setSummaryApp] = useState<Application | null>(null);
  const [riskApp, setRiskApp] = useState<Application | null>(null);

  const filteredApplications = applications.filter(a => {
    const matchesSearch =
      a.startupName.toLowerCase().includes(search.toLowerCase()) ||
      a.challengeTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());

    const matchesStage = stageFilter === 'ALL' || a.status === stageFilter;
    return matchesSearch && matchesStage;
  });

  const applicationColumns: Column<Application>[] = [
    {
      key: 'startupName',
      header: 'Startup Applicant',
      render: (a) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{a.startupName}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>App Ref: {a.id}</div>
        </div>
      )
    },
    {
      key: 'challengeTitle',
      header: 'Target Challenge',
      render: (a) => (
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {a.challengeTitle}
        </span>
      )
    },
    {
      key: 'submissionDate',
      header: 'Submission Date',
      width: '130px',
      render: (a) => <span style={{ fontSize: '0.825rem' }}>{a.submissionDate}</span>
    },
    {
      key: 'eligibilityScore',
      header: 'Eligibility Screening',
      width: '160px',
      render: (a) => (
        <div>
          <span className="badge badge-success">✓ DPIIT Verified</span>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Score: {a.eligibilityScore}/100
          </div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Evaluation Status',
      width: '150px',
      render: (a) => <StatusBadge status={a.status} />
    },
    {
      key: 'expertAverageScore',
      header: 'Expert Score',
      width: '120px',
      render: (a) => (
        <strong style={{ fontSize: '0.95rem', color: a.expertAverageScore ? 'var(--navy-900)' : 'var(--text-muted)' }}>
          {a.expertAverageScore ? `${a.expertAverageScore} / 100` : 'Pending'}
        </strong>
      )
    },
    {
      key: 'actions',
      header: 'AI & Review Actions',
      width: '260px',
      render: (a) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.72rem', flex: 1, borderColor: '#0284c7', color: '#0284c7', padding: '2px 6px' }}
              onClick={() => setSummaryApp(a)}
            >
              ✨ AI Summary
            </button>
            <button
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.72rem', flex: 1, borderColor: '#ef4444', color: '#ef4444', padding: '2px 6px' }}
              onClick={() => setRiskApp(a)}
            >
              ✨ AI Risk Check
            </button>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, fontSize: '0.75rem', padding: '2px 6px' }}
              onClick={() => openModal('APPLICATION_DETAILS', a)}
            >
              Review App
            </button>
            <button
              className="btn btn-outline btn-sm"
              style={{ flex: 1, fontSize: '0.75rem', padding: '2px 6px' }}
              onClick={() => openModal('SCORE_APPLICATION', a)}
            >
              Scorecard
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>
            Applications & Bid Screening Matrix
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Review submitted startup solutions, AI executive summaries, multi-domain risk scans, and expert panel scorecards.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', width: 'auto', flexWrap: 'wrap' }}>
          <input
            className="form-input"
            style={{ width: '100%', minWidth: '220px', maxWidth: '300px' }}
            placeholder="🔍 Search application..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Main Table */}
      <DataTable
        columns={applicationColumns}
        data={filteredApplications}
        keyExtractor={(a) => a.id}
      />

      <AIProposalSummaryModal
        isOpen={!!summaryApp}
        onClose={() => setSummaryApp(null)}
        application={summaryApp}
      />

      <AIRiskAssistantModal
        isOpen={!!riskApp}
        onClose={() => setRiskApp(null)}
        entityName={riskApp?.startupName}
      />
    </div>
  );
};
