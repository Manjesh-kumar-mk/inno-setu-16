import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import { StatusBadge } from './StatusBadge';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    challenges,
    startups,
    pilots,
    departments,
    setCurrentView,
    setSelectedStage
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isGlobalSearchOpen) return null;

  const filteredChallenges = query ? challenges.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.code.toLowerCase().includes(query.toLowerCase())
  ) : challenges.slice(0, 3);

  const filteredStartups = query ? startups.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.category.toLowerCase().includes(query.toLowerCase())
  ) : startups.slice(0, 3);

  const filteredPilots = query ? pilots.filter(p => 
    p.code.toLowerCase().includes(query.toLowerCase()) || 
    p.challengeTitle.toLowerCase().includes(query.toLowerCase())
  ) : pilots.slice(0, 2);

  const handleSelectChallenge = (c: any) => {
    setIsGlobalSearchOpen(false);
    setSelectedStage(c.currentStage);
    setCurrentView('challenges');
  };

  const handleSelectPilot = () => {
    setIsGlobalSearchOpen(false);
    setCurrentView('pilots');
  };

  return (
    <Modal
      isOpen={isGlobalSearchOpen}
      onClose={() => setIsGlobalSearchOpen(false)}
      title="Global Entity & Pathway Search"
      maxWidth="720px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Search by Challenge Name, Code (e.g. CH-DTSM-08), Startup, Pilot, or Dept..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          style={{ fontSize: '1rem', padding: '12px 16px' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '420px', overflowY: 'auto' }}>
          {/* Challenges Section */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Outcome Challenges ({filteredChallenges.length})
            </div>
            {filteredChallenges.map(c => (
              <div
                key={c.id}
                onClick={() => handleSelectChallenge(c)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--bg-surface)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem' }}>
                    {c.code} - {c.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {c.departmentName} • Stage: <strong>{c.currentStage}</strong>
                  </div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>

          {/* Startups Section */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Discovered Startups ({filteredStartups.length})
            </div>
            {filteredStartups.map(s => (
              <div
                key={s.id}
                onClick={() => { setIsGlobalSearchOpen(false); setCurrentView('discovery'); }}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem' }}>
                    {s.name} ({s.category})
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    DPIIT: {s.dpiitRegistrationNumber} • Readiness: <strong>{s.readinessLevel}</strong>
                  </div>
                </div>
                <StatusBadge status={s.securityClearanceStatus} />
              </div>
            ))}
          </div>

          {/* Sandbox Pilots Section */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Sandbox Pilots ({filteredPilots.length})
            </div>
            {filteredPilots.map(p => (
              <div
                key={p.id}
                onClick={handleSelectPilot}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem' }}>
                    {p.code} - {p.startupName}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Validator: {p.independentValidatorName}
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
