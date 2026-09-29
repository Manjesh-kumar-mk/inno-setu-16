import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Column } from '../../common/DataTable';
import { StatusBadge } from '../../common/StatusBadge';
import { FilterBar } from '../../common/FilterBar';
import { Challenge } from '../../../types';
import { formatINR } from '../../../utils/format';

export const GovChallenges: React.FC = () => {
  const { challenges, selectedDepartmentId, openModal, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('ALL');

  const tabs = [
    { id: 'ALL', label: 'All Challenges' },
    { id: 'DRAFT', label: 'Draft' },
    { id: 'PENDING_APPROVAL', label: 'Pending Approval' },
    { id: 'PUBLISHED', label: 'Published' },
    { id: 'EVALUATION', label: 'Evaluation' },
    { id: 'PILOT', label: 'Pilot' },
    { id: 'COMPLETED', label: 'Completed' },
    { id: 'CLOSED', label: 'Closed' }
  ];

  // Filter challenges based on tab, department, search, sector
  const filteredChallenges = challenges.filter(c => {
    // Tab filter
    if (activeTab === 'DRAFT' && c.status !== 'DRAFT') return false;
    if (activeTab === 'PENDING_APPROVAL' && c.status !== 'UNDER_REVIEW') return false;
    if (activeTab === 'PUBLISHED' && c.status !== 'OPEN') return false;
    if (activeTab === 'EVALUATION' && c.status !== 'EVALUATION') return false;
    if (activeTab === 'PILOT' && c.status !== 'SANDBOX_ACTIVE') return false;
    if (activeTab === 'COMPLETED' && c.status !== 'SCALED') return false;
    if (activeTab === 'CLOSED' && c.status !== 'CLOSED') return false;

    // Dept filter
    const matchesDept = selectedDepartmentId === 'ALL' || c.departmentId === selectedDepartmentId;

    // Sector filter
    const matchesSector = sectorFilter === 'ALL' || c.sector === sectorFilter;

    // Search filter
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.departmentName.toLowerCase().includes(search.toLowerCase());

    return matchesDept && matchesSector && matchesSearch;
  });

  const challengeColumns: Column<Challenge>[] = [
    {
      key: 'title',
      header: 'Challenge Title & Code',
      render: (c) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{c.title}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Code: <strong>{c.code}</strong> • Stage: {c.currentStage}
          </div>
        </div>
      )
    },
    {
      key: 'departmentName',
      header: 'Department',
      render: (c) => (
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {c.departmentName}
        </span>
      )
    },
    { key: 'sector', header: 'Sector', width: '130px' },
    {
      key: 'applicationsCount',
      header: 'Applications',
      width: '110px',
      render: (c) => (
        <span className="badge badge-info" style={{ fontWeight: 700 }}>
          {c.applicationsCount} Bids
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      width: '140px',
      render: (c) => <StatusBadge status={c.status} />
    },
    {
      key: 'submissionDeadline',
      header: 'Deadline',
      width: '120px',
      render: (c) => <span style={{ fontSize: '0.85rem' }}>{c.submissionDeadline}</span>
    },
    {
      key: 'budgetCap',
      header: 'Pilot Budget',
      width: '130px',
      render: (c) => <strong>{formatINR(c.budgetCap)}</strong>
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '140px',
      render: (c) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              openModal('CHALLENGE_DETAILS', c);
            }}
          >
            View
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentView('applications');
            }}
          >
            Manage
          </button>
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>
            Outcome-Based Procurement Challenges
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Convert government operational bottlenecks into structured outcome challenges for startup sandbox competition.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setCurrentView('create-challenge')}>
          + Post New Outcome Challenge
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Sector Filters */}
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        statusValue={sectorFilter}
        onStatusChange={setSectorFilter}
        statusOptions={[
          { label: 'Smart Mobility', value: 'Smart Mobility' },
          { label: 'Health Tech', value: 'Health Tech' },
          { label: 'Clean Water', value: 'Clean Water' },
          { label: 'Environmental Tech', value: 'Environmental Tech' },
          { label: 'Smart Infrastructure', value: 'Smart Infrastructure' }
        ]}
      />

      {/* Main Data Table */}
      <DataTable
        columns={challengeColumns}
        data={filteredChallenges}
        keyExtractor={(c) => c.id}
        onRowClick={(c) => openModal('CHALLENGE_DETAILS', c)}
      />
    </div>
  );
};
