import React from 'react';
import { useApp } from '../../context/AppContext';
import { LIFECYCLE_STAGES } from '../../mockData';
import { LifecycleStage } from '../../types';

export const LifecycleTracker: React.FC = () => {
  const { selectedStage, setSelectedStage, challenges, pilots } = useApp();

  const getStageCount = (stageId: LifecycleStage) => {
    switch (stageId) {
      case 'PROBLEM': return 4;
      case 'CHALLENGE': return challenges.filter(c => c.currentStage === 'CHALLENGE' || c.status === 'OPEN').length;
      case 'STARTUP': return 6;
      case 'EVALUATION': return challenges.filter(c => c.currentStage === 'EVALUATION').length;
      case 'PILOT': return pilots.filter(p => p.status === 'ACTIVE').length;
      case 'MEASUREMENT': return pilots.filter(p => p.status === 'MEASUREMENT_PHASE').length;
      case 'VALIDATION': return pilots.filter(p => p.status === 'VALIDATED').length;
      case 'PROCUREMENT': return 2;
      case 'SCALE': return 2;
      default: return 0;
    }
  };

  return (
    <div className="lifecycle-tracker-bar" aria-label="Government Innovation Procurement Lifecycle Pipeline">
      <div className="lifecycle-steps-container">
        {/* Title Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '6px' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            ⚡ LIFECYCLE PIPELINE:
          </span>
          <button
            onClick={() => setSelectedStage('ALL')}
            style={{
              background: selectedStage === 'ALL' ? '#2563EB' : 'rgba(255,255,255,0.06)',
              color: selectedStage === 'ALL' ? 'white' : '#94A3B8',
              border: '1px solid ' + (selectedStage === 'ALL' ? '#3B82F6' : 'rgba(255,255,255,0.15)'),
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            ALL STAGES ({challenges.length})
          </button>
        </div>

        {LIFECYCLE_STAGES.map((stage, idx) => {
          const isSelected = selectedStage === stage.id;
          const count = getStageCount(stage.id);

          return (
            <React.Fragment key={stage.id}>
              <button
                className={`lifecycle-step-node ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedStage(stage.id)}
                title={`${stage.stepNumber}. ${stage.label}: ${stage.description}`}
                aria-pressed={isSelected}
              >
                <div className="step-number-badge">
                  {stage.stepNumber}
                </div>
                <span>{stage.label}</span>
                <span style={{
                  background: isSelected ? '#1D4ED8' : 'rgba(255,255,255,0.12)',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontSize: '0.68rem',
                  fontWeight: 700
                }}>
                  {count}
                </span>
              </button>

              {idx < LIFECYCLE_STAGES.length - 1 && (
                <span className="step-connector-arrow" aria-hidden="true">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
