import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { Challenge } from '../../../types';
import { StatusBadge } from '../../common/StatusBadge';

export interface ExtendedChallenge extends Challenge {
  location?: string;
  technology?: string;
  state?: string;
}

export const MarketplacePage: React.FC<{
  onSelectChallenge: (challenge: ExtendedChallenge) => void;
}> = ({ onSelectChallenge }) => {
  const { challenges, openModal, setCurrentView, isAuthenticated, currentRole, notifyInfo, notifyError } = useApp();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedTech, setSelectedTech] = useState('ALL');
  const [selectedBudget, setSelectedBudget] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState<'DEADLINE' | 'BUDGET_HIGH' | 'APPLICATIONS'>('DEADLINE');

  // Comprehensive Marketplace Challenge List (including prompt example)
  const extendedChallenges: ExtendedChallenge[] = useMemo(() => {
    const baseExample: ExtendedChallenge = {
      id: 'ch-waste-01',
      code: 'CH-DUSWM-09',
      title: 'AI-Based Municipal Waste Optimization',
      departmentId: 'dept-105',
      departmentName: 'Department of Urban Sanitation & Waste Management',
      problemStatement: 'Municipal waste collection vehicles run on fixed static schedules resulting in 35% empty runs while high-density commercial markets face 45 tons/day of unmanaged bin overflow.',
      desiredOutcome: 'Deploy AI edge fill-level sensors on 450 municipal bins and dynamic vehicle routing algorithms to cut fuel costs by 30% and achieve zero unmanaged bin overflow.',
      sector: 'CleanTech',
      budgetCap: 350000,
      sandboxDurationMonths: 6,
      currentStage: 'CHALLENGE',
      status: 'OPEN',
      publishDate: '2026-03-01',
      submissionDeadline: '2026-10-30',
      eligibleStartupCriteria: [
        'DPIIT Registered Startup',
        'Minimum TRL-7 validated IoT hardware and AI route optimizer',
        'IP67 weatherproof sensor certification',
        'Capability to integrate with municipal GIS fleet mapping'
      ],
      applicationsCount: 18,
      evaluationsCount: 0,
      location: 'Pune, Maharashtra',
      technology: 'Edge AI & IoT Sensors',
      state: 'Maharashtra'
    };

    const extraChallenge2: ExtendedChallenge = {
      id: 'ch-sewer-02',
      code: 'CH-MW-14',
      title: 'Autonomous Robotic Inspection of Underground Sewer Networks',
      departmentId: 'dept-106',
      departmentName: 'Department of Municipal Public Works & Engineering',
      problemStatement: 'Manual hazardous entry into underground storm drains and sewer networks creates critical safety risks and delayed detection of structural cracks.',
      desiredOutcome: 'Deploy amphibious crawler robots with LIDAR and computer vision defect classification to map 50km of sewer lines without human entry.',
      sector: 'Robotics',
      budgetCap: 280000,
      sandboxDurationMonths: 5,
      currentStage: 'CHALLENGE',
      status: 'OPEN',
      publishDate: '2026-02-15',
      submissionDeadline: '2026-11-15',
      eligibleStartupCriteria: [
        'DPIIT Registered Robotics Startup',
        'Explosion-proof ATEX rated hardware enclosure',
        'Real-time 3D point cloud generation'
      ],
      applicationsCount: 12,
      evaluationsCount: 0,
      location: 'Ahmedabad, Gujarat',
      technology: 'Robotics & LIDAR',
      state: 'Gujarat'
    };

    const list: ExtendedChallenge[] = [
      baseExample,
      extraChallenge2,
      ...challenges.map(c => ({
        ...c,
        location: c.id === 'ch-2026-01' ? 'Bengaluru, Karnataka' :
          c.id === 'ch-2026-02' ? 'Dehradun, Uttarakhand' :
            c.id === 'ch-2026-03' ? 'Patna, Bihar' :
              c.id === 'ch-2026-04' ? 'New Delhi, NCR' : 'Chennai, Tamil Nadu',
        technology: c.sector === 'Smart Mobility' ? 'Edge AI Video' :
          c.sector === 'Health Tech' ? 'Offline Medical AI' :
            c.sector === 'Clean Water' ? 'Graphene Nanotech' :
              c.sector === 'Environmental Tech' ? 'Micro-Sensor Swarm' : 'Smart Polymer Material',
        state: c.id === 'ch-2026-01' ? 'Karnataka' :
          c.id === 'ch-2026-02' ? 'Uttarakhand' :
            c.id === 'ch-2026-03' ? 'Bihar' :
              c.id === 'ch-2026-04' ? 'Delhi NCR' : 'Tamil Nadu'
      }))
    ];

    return list;
  }, [challenges]);

  // Filter Logic
  const filteredChallenges = useMemo(() => {
    return extendedChallenges.filter(c => {
      // Search
      const textMatch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.problemStatement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.sector.toLowerCase().includes(searchTerm.toLowerCase());

      if (!textMatch) return false;

      // Department
      if (selectedDept !== 'ALL' && c.departmentId !== selectedDept && !c.departmentName.includes(selectedDept)) {
        return false;
      }

      // Sector
      if (selectedSector !== 'ALL' && c.sector !== selectedSector) return false;

      // State
      if (selectedState !== 'ALL' && c.state !== selectedState) return false;

      // Technology
      if (selectedTech !== 'ALL' && !c.technology?.includes(selectedTech)) return false;

      // Status
      if (selectedStatus !== 'ALL' && c.status !== selectedStatus) return false;

      // Budget
      if (selectedBudget === 'UNDER_300K' && c.budgetCap > 300000) return false;
      if (selectedBudget === '300K_500K' && (c.budgetCap < 300000 || c.budgetCap > 500000)) return false;
      if (selectedBudget === 'ABOVE_500K' && c.budgetCap < 500000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'DEADLINE') {
        return new Date(a.submissionDeadline).getTime() - new Date(b.submissionDeadline).getTime();
      }
      if (sortBy === 'BUDGET_HIGH') {
        return b.budgetCap - a.budgetCap;
      }
      if (sortBy === 'APPLICATIONS') {
        return b.applicationsCount - a.applicationsCount;
      }
      return 0;
    });
  }, [extendedChallenges, searchTerm, selectedDept, selectedSector, selectedState, selectedTech, selectedBudget, selectedStatus, sortBy]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* Header */}
      <div>
        <span className="badge badge-info" style={{ marginBottom: '6px' }}>OPEN INNOVATION MARKETPLACE</span>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--navy-900)' }}>Government Outcome Challenges</h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          Discover outcome-based challenges published by central ministries and state municipal bodies. Apply with your deep-tech solution.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="card" style={{ background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Top Row: Search Input & Sort */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              placeholder="🔍 Search challenges by keyword, problem statement, department, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '16px', height: '44px', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>Sort By:</span>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{ height: '44px', width: '180px' }}
            >
              <option value="DEADLINE">📅 Nearest Deadline</option>
              <option value="BUDGET_HIGH">💰 Highest Sandbox Budget</option>
              <option value="APPLICATIONS">🔥 Most Applications</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Multi-Filter Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>

          {/* Department Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Department</label>
            <select className="form-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
              <option value="ALL">All Departments</option>
              <option value="DTSM">Transportation & Mobility</option>
              <option value="MPH">Health & Telemedicine</option>
              <option value="DUWSM">Water & Sanitation</option>
              <option value="EPA-UCA">Environment & Air</option>
              <option value="Urban Sanitation">Urban Sanitation & Waste</option>
            </select>
          </div>

          {/* Sector Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Sector</label>
            <select className="form-select" value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
              <option value="ALL">All Sectors</option>
              <option value="CleanTech">CleanTech</option>
              <option value="Smart Mobility">Smart Mobility</option>
              <option value="Health Tech">Health Tech</option>
              <option value="Clean Water">Clean Water</option>
              <option value="Environmental Tech">Environmental Tech</option>
              <option value="Robotics">Robotics</option>
            </select>
          </div>

          {/* State Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>State / Location</label>
            <select className="form-select" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
              <option value="ALL">All Locations</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Bihar">Bihar</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>

          {/* Technology Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Technology</label>
            <select className="form-select" value={selectedTech} onChange={(e) => setSelectedTech(e.target.value)}>
              <option value="ALL">All Tech Stacks</option>
              <option value="Edge AI">Edge AI & Computer Vision</option>
              <option value="IoT">IoT Sensors & Mesh</option>
              <option value="Nanotech">Graphene & Nanotech</option>
              <option value="Medical AI">Offline Medical AI</option>
              <option value="Robotics">Robotics & LIDAR</option>
            </select>
          </div>

          {/* Budget Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Sandbox Budget</label>
            <select className="form-select" value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
              <option value="ALL">All Budget Caps</option>
              <option value="UNDER_300K">Under ₹25 Lakh</option>
              <option value="300K_500K">₹25 Lakh - ₹50 Lakh</option>
              <option value="ABOVE_500K">Above ₹50 Lakh</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Status</label>
            <select className="form-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open for Applications</option>
              <option value="EVALUATION">Under Evaluation</option>
              <option value="SANDBOX_ACTIVE">Sandbox Active</option>
              <option value="SCALED">Scaled & Deployed</option>
            </select>
          </div>

        </div>

        {/* Clear Filters Indicator */}
        {(searchTerm || selectedDept !== 'ALL' || selectedSector !== 'ALL' || selectedState !== 'ALL' || selectedTech !== 'ALL' || selectedBudget !== 'ALL' || selectedStatus !== 'ALL') && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Showing <strong>{filteredChallenges.length}</strong> matching challenges
            </span>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedDept('ALL');
                setSelectedSector('ALL');
                setSelectedState('ALL');
                setSelectedTech('ALL');
                setSelectedBudget('ALL');
                setSelectedStatus('ALL');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid-cols-2" style={{ gap: '24px' }}>
        {filteredChallenges.map(c => (
          <div
            key={c.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
              borderLeft: c.id === 'ch-waste-01' ? '4px solid var(--primary-600)' : undefined,
              boxShadow: c.id === 'ch-waste-01' ? '0 4px 12px rgba(37,99,235,0.12)' : undefined
            }}
          >
            <div>
              {/* Top Meta Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-info">{c.sector}</span>
                  <span className="badge badge-neutral">📍 {c.location || 'India'}</span>
                  {c.id === 'ch-waste-01' && <span className="badge badge-warning">⭐ FEATURED SPEC</span>}
                </div>
                <StatusBadge status={c.status} />
              </div>

              {/* Title & Department */}
              <h3
                style={{
                  fontSize: '1.2rem',
                  color: 'var(--navy-900)',
                  cursor: 'pointer',
                  margin: '4px 0 6px 0',
                  lineHeight: 1.3
                }}
                onClick={() => {
                  onSelectChallenge(c);
                  setCurrentView('public-challenge-detail');
                }}
              >
                {c.title}
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--primary-700)', fontWeight: 600, marginBottom: '12px' }}>
                🏛️ {c.departmentName}
              </div>

              {/* Problem Statement Snippet */}
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                {c.problemStatement}
              </p>

              {/* Grid Metadata Spec Box */}
              <div style={{
                background: 'var(--bg-muted)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '14px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                fontSize: '0.825rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Estimated Sandbox Budget:</span>
                  <div style={{ fontWeight: 800, color: 'var(--navy-900)', fontSize: '1rem', marginTop: '2px' }}>
                    ₹{c.budgetCap.toLocaleString('en-IN')}
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Pilot Duration:</span>
                  <div style={{ fontWeight: 700, color: 'var(--navy-900)', marginTop: '2px' }}>
                    {c.sandboxDurationMonths} Months
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Application Deadline:</span>
                  <div style={{ fontWeight: 700, color: 'var(--error-text)', marginTop: '2px' }}>
                    📅 {c.submissionDeadline}
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Applications Received:</span>
                  <div style={{ fontWeight: 700, color: 'var(--primary-700)', marginTop: '2px' }}>
                    👥 {c.applicationsCount} Proposals Submitted
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                CODE: {c.code}
              </span>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    onSelectChallenge(c);
                    setCurrentView('public-challenge-detail');
                  }}
                >
                  View Full Details →
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    if (isAuthenticated && currentRole === 'STARTUP') {
                      openModal('APPLY_CHALLENGE', c);
                    } else if (!isAuthenticated) {
                      notifyInfo('Startup Sign-In Required', 'Please sign in with verified startup credentials to apply for outcome challenges.');
                      setCurrentView('public-login');
                    } else {
                      notifyError('Role Restriction', 'Only verified startups can submit challenge proposals.');
                    }
                  }}
                >
                  Apply for Challenge 🚀
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
