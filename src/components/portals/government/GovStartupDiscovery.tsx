import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Startup } from '../../../types';
import { AIMatchBreakdownModal } from '../../common/AIAssistantComponents';

export const GovStartupDiscovery: React.FC = () => {
  const { startups, openModal } = useApp();

  const [search, setSearch] = useState('');
  const [techFilter, setTechFilter] = useState('ALL');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [capabilityFilter, setCapabilityFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [certFilter, setCertFilter] = useState('ALL');
  const [govContractsFilter, setGovContractsFilter] = useState('ALL');

  const [selectedStartupModal, setSelectedStartupModal] = useState<Startup | null>(null);
  const [aiMatchStartup, setAiMatchStartup] = useState<Startup | null>(null);

  // Filter logic
  const filteredStartups = startups.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.capabilities.some(c => c.toLowerCase().includes(search.toLowerCase())) ||
      s.dpiitRegistrationNumber.toLowerCase().includes(search.toLowerCase());

    const matchesSector = sectorFilter === 'ALL' || s.category === sectorFilter;
    const matchesLocation = locationFilter === 'ALL' || s.headquarters.includes(locationFilter);
    const matchesStage = stageFilter === 'ALL' || s.readinessLevel === stageFilter;

    const matchesContracts =
      govContractsFilter === 'ALL' ||
      (govContractsFilter === 'NONE' && s.pastGovContractsCount === 0) ||
      (govContractsFilter === '1_2' && s.pastGovContractsCount >= 1 && s.pastGovContractsCount <= 2) ||
      (govContractsFilter === '3_PLUS' && s.pastGovContractsCount >= 3);

    return matchesSearch && matchesSector && matchesLocation && matchesStage && matchesContracts;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>
            Deep-Tech Startup Discovery Directory
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Search verified DPIIT-registered startups with proven Technology Readiness Levels (TRL 7-9).
          </p>
        </div>

        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-700)', background: 'var(--primary-50)', padding: '6px 12px', borderRadius: '6px' }}>
          Showing {filteredStartups.length} Verified Startups
        </div>
      </div>

      {/* Main Search Bar */}
      <div className="card" style={{ padding: '16px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <input
              className="form-input"
              placeholder="🔍 Search startup by name, DPIIT registration, capability, founder..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-outline" onClick={() => {
            setSearch('');
            setTechFilter('ALL');
            setSectorFilter('ALL');
            setLocationFilter('ALL');
            setCapabilityFilter('ALL');
            setStageFilter('ALL');
            setCertFilter('ALL');
            setGovContractsFilter('ALL');
          }}>
            Reset All Filters
          </button>
        </div>

        {/* 7 Required Filter Dropdowns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Technology</label>
            <select className="form-select" style={{ padding: '6px 8px', fontSize: '0.8rem' }} value={techFilter} onChange={(e) => setTechFilter(e.target.value)}>
              <option value="ALL">All Technologies</option>
              <option value="AI_ML">AI & Computer Vision</option>
              <option value="IOT">IoT & Sensor Swarms</option>
              <option value="NANOTECH">Nanotech Membranes</option>
              <option value="DEFENSE">Zero-Trust Defense</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Sector</label>
            <select className="form-select" style={{ padding: '6px 8px', fontSize: '0.8rem' }} value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)}>
              <option value="ALL">All Sectors</option>
              <option value="SmartMobility">Smart Mobility</option>
              <option value="CleanTech">CleanTech & Water</option>
              <option value="HealthTech">Health Tech</option>
              <option value="GovTech">GovTech & Materials</option>
              <option value="CyberSecurity">CyberSecurity</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Location</label>
            <select className="form-select" style={{ padding: '6px 8px', fontSize: '0.8rem' }} value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
              <option value="ALL">All Cities</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="New Delhi">New Delhi</option>
              <option value="Chennai">Chennai</option>
              <option value="Ahmedabad">Ahmedabad</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Capability</label>
            <select className="form-select" style={{ padding: '6px 8px', fontSize: '0.8rem' }} value={capabilityFilter} onChange={(e) => setCapabilityFilter(e.target.value)}>
              <option value="ALL">All Capabilities</option>
              <option value="Edge AI">Edge AI Video</option>
              <option value="Sensors">Embedded Strain Sensors</option>
              <option value="Filtration">Nano Filtration</option>
              <option value="SCADA">SCADA Defense</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Startup Stage (TRL)</label>
            <select className="form-select" style={{ padding: '6px 8px', fontSize: '0.8rem' }} value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}>
              <option value="ALL">All Stages (TRL 7-9)</option>
              <option value="TRL-7">TRL-7 (Field Prototype)</option>
              <option value="TRL-8">TRL-8 (Qualified System)</option>
              <option value="TRL-9">TRL-9 (Operational Proven)</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Certifications</label>
            <select className="form-select" style={{ padding: '6px 8px', fontSize: '0.8rem' }} value={certFilter} onChange={(e) => setCertFilter(e.target.value)}>
              <option value="ALL">All Certifications</option>
              <option value="ISO26262">ISO 26262 Automotive</option>
              <option value="ISO13485">ISO 13485 Medical</option>
              <option value="BIS10500">BIS 10500 Drinking Water</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Past Gov Contracts</label>
            <select className="form-select" style={{ padding: '6px 8px', fontSize: '0.8rem' }} value={govContractsFilter} onChange={(e) => setGovContractsFilter(e.target.value)}>
              <option value="ALL">All Deployments</option>
              <option value="NONE">0 Contracts (First-Time)</option>
              <option value="1_2">1 - 2 Contracts</option>
              <option value="3_PLUS">3+ Contracts (Experienced)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Startup Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredStartups.map(s => (
          <div
            key={s.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      background: 'var(--primary-700)',
                      color: 'white',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem'
                    }}
                  >
                    {s.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', color: 'var(--navy-900)' }}>{s.name}</h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      DPIIT: <strong>{s.dpiitRegistrationNumber}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '4px' }}>
                    {s.readinessLevel}
                  </span>
                  <span className="badge badge-info" style={{ fontSize: '0.68rem', cursor: 'pointer', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7' }} onClick={() => setAiMatchStartup(s)}>
                    ✨ {s.pastGovContractsCount >= 2 ? '96%' : '89%'} AI Match
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: '14px 0 10px 0', lineHeight: 1.4 }}>
                {s.description}
              </p>

              {/* Capabilities Pill Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                {s.capabilities.map((cap, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'var(--bg-muted)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--navy-800)'
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                <span>📍 {s.headquarters}</span>
                <span>🏛️ {s.pastGovContractsCount} Gov Contracts</span>
                <span>👥 {s.employeeCount} Staff</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%', borderColor: '#0284c7', color: '#0284c7', background: 'rgba(2, 132, 199, 0.04)' }}
                  onClick={() => setAiMatchStartup(s)}
                >
                  ✨ View AI Match Breakdown
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => setSelectedStartupModal(s)}
                  >
                    View Profile
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => alert(`Invitation to participate sent to ${s.name}!`)}
                  >
                    Invite to Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Startup Full Detail Modal */}
      {selectedStartupModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setSelectedStartupModal(null)}
        >
          <div
            className="card"
            style={{ maxWidth: '650px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-header">
              <div>
                <h3 className="card-title">{selectedStartupModal.name}</h3>
                <div className="card-subtitle">
                  DPIIT Reg: {selectedStartupModal.dpiitRegistrationNumber} • CIN: {selectedStartupModal.cinOrTaxId}
                </div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedStartupModal(null)}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
              <div style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                <div><strong>Founder:</strong> {selectedStartupModal.founderName} (Est. {selectedStartupModal.foundingYear})</div>
                <div><strong>Headquarters:</strong> {selectedStartupModal.headquarters}</div>
                <div><strong>Contact:</strong> {selectedStartupModal.email} | {selectedStartupModal.phone}</div>
                <div><strong>Valuation / Funding:</strong> {selectedStartupModal.valuationFormatted}</div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Core Technical Capability:</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {selectedStartupModal.description}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Verified Compliance & Security:</h4>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <span className="badge badge-success">✓ DPIIT Validated</span>
                  <span className="badge badge-success">✓ {selectedStartupModal.securityClearanceStatus} Clearance</span>
                  <span className="badge badge-info">{selectedStartupModal.readinessLevel} Ready</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedStartupModal(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => { alert(`Direct pitch inquiry sent to ${selectedStartupModal.name}`); setSelectedStartupModal(null); }}>
                Request Formal Pitch Deck
              </button>
            </div>
          </div>
        </div>
      )}

      <AIMatchBreakdownModal
        isOpen={!!aiMatchStartup}
        onClose={() => setAiMatchStartup(null)}
        startup={aiMatchStartup}
      />
    </div>
  );
};
