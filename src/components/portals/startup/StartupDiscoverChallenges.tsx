import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';
import { StartupApplicationWizard } from './StartupApplicationWizard';
import { Challenge } from '../../../types';

export const StartupDiscoverChallenges: React.FC = () => {
  const { challenges } = useApp();

  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedTech, setSelectedTech] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [selectedBudget, setSelectedBudget] = useState('ALL');
  const [selectedDeadline, setSelectedDeadline] = useState('ALL');
  const [selectedEligibility, setSelectedEligibility] = useState('ALL');
  const [selectedDuration, setSelectedDuration] = useState('ALL');

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(['ch-2026-01']);

  const toggleShortlist = (id: string) => {
    setShortlistedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleApply = (c: Challenge) => {
    setSelectedChallenge(c);
    setIsWizardOpen(true);
  };

  const filtered = challenges.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.problemStatement.toLowerCase().includes(search.toLowerCase()) ||
      c.departmentName.toLowerCase().includes(search.toLowerCase());

    const matchesSector = selectedSector === 'ALL' || c.sector === selectedSector;
    const matchesDuration =
      selectedDuration === 'ALL' || String(c.sandboxDurationMonths) === selectedDuration;

    return matchesSearch && matchesSector && matchesDuration;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <span className="badge badge-info" style={{ marginBottom: '6px' }}>B2G Outcome Procurement Marketplace</span>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-900)' }}>
          Discover Government Outcome Challenges
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Apply your deep-tech IP & solutions to verified municipal, state, and central government operational problems.
        </p>
      </div>

      {/* Comprehensive Filter Bar Matrix */}
      <div className="card" style={{ padding: '18px', background: 'var(--bg-surface)' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '12px', color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🔍 B2G Search & Filter Controls
        </div>

        {/* Search Bar */}
        <div className="form-group" style={{ marginBottom: '14px' }}>
          <input
            className="form-input"
            placeholder="Search challenges by keyword, department, problem statement, or technology stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontSize: '0.9rem', padding: '10px 14px' }}
          />
        </div>

        {/* 7 Filters Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Sector</label>
            <select className="form-select" value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
              <option value="ALL">All Sectors</option>
              <option value="Smart Mobility">Smart Mobility</option>
              <option value="Health Tech">Health Tech</option>
              <option value="Clean Tech">Clean Tech</option>
              <option value="Environmental Tech">Environmental Tech</option>
              <option value="CyberSecurity">CyberSecurity</option>
              <option value="Public Safety">Public Safety</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Technology</label>
            <select className="form-select" value={selectedTech} onChange={(e) => setSelectedTech(e.target.value)}>
              <option value="ALL">All Technologies</option>
              <option value="AI/ML">Artificial Intelligence / ML</option>
              <option value="IoT">IoT Sensors & Telemetry</option>
              <option value="Computer Vision">Computer Vision & Robotics</option>
              <option value="Edge AI">Edge AI Computing</option>
              <option value="Blockchain">Blockchain & Smart Contracts</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Location / Region</label>
            <select className="form-select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="ALL">All Locations</option>
              <option value="Lucknow">Lucknow, Uttar Pradesh</option>
              <option value="Bengaluru">Bengaluru, Karnataka</option>
              <option value="Hyderabad">Hyderabad, Telangana</option>
              <option value="Jaipur">Jaipur, Rajasthan</option>
              <option value="Delhi NCR">New Delhi NCR</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Grant Budget Cap</label>
            <select className="form-select" value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
              <option value="ALL">All Budget Caps</option>
              <option value="25lakh">Under ₹25 Lakh</option>
              <option value="50lakh">₹25 Lakh - ₹50 Lakh</option>
              <option value="1crore">Above ₹50 Lakh</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Submission Deadline</label>
            <select className="form-select" value={selectedDeadline} onChange={(e) => setSelectedDeadline(e.target.value)}>
              <option value="ALL">Any Timeframe</option>
              <option value="7days">Closing in 7 Days</option>
              <option value="30days">Closing in 30 Days</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Eligibility Criteria</label>
            <select className="form-select" value={selectedEligibility} onChange={(e) => setSelectedEligibility(e.target.value)}>
              <option value="ALL">All Eligibility Tiers</option>
              <option value="DPIIT">DPIIT Recognized Only</option>
              <option value="TRL6">TRL 6+ Qualified</option>
              <option value="Cleared">Security Clearance Verified</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Pilot Duration</label>
            <select className="form-select" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
              <option value="ALL">All Durations</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="9">9 Months</option>
              <option value="12">12 Months</option>
            </select>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              className="btn btn-outline"
              style={{ width: '100%', fontSize: '0.78rem' }}
              onClick={() => {
                setSearch('');
                setSelectedSector('ALL');
                setSelectedTech('ALL');
                setSelectedLocation('ALL');
                setSelectedBudget('ALL');
                setSelectedDeadline('ALL');
                setSelectedEligibility('ALL');
                setSelectedDuration('ALL');
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid-cols-2">
        {filtered.map(c => {
          const isShortlisted = shortlistedIds.includes(c.id);

          return (
            <div key={c.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="card-header">
                  <div>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                      <span className="badge badge-info">{c.sector}</span>
                      <span className="badge badge-success">TRL 6+ Eligible</span>
                    </div>
                    <h3 className="card-title" style={{ marginTop: '4px' }}>{c.title}</h3>
                    <div className="card-subtitle">{c.departmentName}</div>
                  </div>
                  <button
                    onClick={() => toggleShortlist(c.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.3rem',
                      color: isShortlisted ? '#f59e0b' : '#cbd5e1'
                    }}
                    title={isShortlisted ? 'Remove from Shortlist' : 'Save to Shortlist'}
                  >
                    ★
                  </button>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
                  {c.problemStatement}
                </p>

                <div style={{
                  background: 'var(--bg-muted)',
                  padding: '12px',
                  borderRadius: '6px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  fontSize: '0.78rem',
                  marginBottom: '16px'
                }}>
                  <div>Sandbox Cap: <strong>₹{c.budgetCap.toLocaleString('en-IN')}</strong></div>
                  <div>Trial Duration: <strong>{c.sandboxDurationMonths} Months</strong></div>
                  <div>Deadline: <strong>{c.submissionDeadline}</strong></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  👥 {c.applicationsCount} Startups Applied
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => toggleShortlist(c.id)}
                  >
                    {isShortlisted ? '★ Saved' : '⭐ Bookmark'}
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleApply(c)}
                  >
                    Apply Now →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
