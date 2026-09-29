import React from 'react';
import { KPI } from '../../types';

interface MetricsChartProps {
  kpis?: KPI[];
  title?: string;
  type?: 'kpi' | 'budget';
  budgetData?: { label: string; allocated: number; utilized: number }[];
}

export const MetricsChart: React.FC<MetricsChartProps> = ({
  kpis,
  title = 'Performance Measurement against Target KPIs',
  type = 'kpi',
  budgetData
}) => {
  if (type === 'budget' && budgetData) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-title">{title}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {budgetData.map((item, idx) => {
            const pct = Math.round((item.utilized / item.allocated) * 100);
            return (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{item.label}</span>
                  <span>₹{(item.utilized / 100000).toFixed(1)} Lakh / ₹{(item.allocated / 100000).toFixed(1)} Lakh ({pct}%)</span>
                </div>
                <div style={{ height: '10px', width: '100%', backgroundColor: 'var(--bg-muted)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div 
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      backgroundColor: pct > 85 ? 'var(--warning-text)' : 'var(--primary-600)',
                      borderRadius: '5px',
                      transition: 'width 0.5s ease'
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!kpis || kpis.length === 0) return null;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{title}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {kpis.map(kpi => {
          const targetPct = 100;
          const achievedPct = Math.min(Math.round((kpi.achievedValue / kpi.targetValue) * 100), 130);
          const isExceeding = kpi.status === 'EXCEEDS_TARGET' || kpi.status === 'MEETS_TARGET';

          return (
            <div key={kpi.id} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{kpi.metricName}</span>
                <span style={{ fontSize: '0.78rem', color: isExceeding ? 'var(--success-text)' : 'var(--text-muted)' }}>
                  Target: {kpi.targetValue} {kpi.unit} | <strong>Achieved: {kpi.achievedValue} {kpi.unit}</strong>
                </span>
              </div>

              {/* Progress bar stack */}
              <div style={{ position: 'relative', height: '12px', width: '100%', backgroundColor: '#E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
                {/* Target marker */}
                <div 
                  style={{
                    position: 'absolute',
                    left: `${targetPct}%`,
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    backgroundColor: 'var(--navy-900)',
                    zIndex: 2
                  }}
                  title="Target Benchmark"
                />

                {/* Achieved bar */}
                <div
                  style={{
                    height: '100%',
                    width: `${achievedPct}%`,
                    backgroundColor: isExceeding ? '#059669' : '#D97706',
                    borderRadius: '6px',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>Baseline: {kpi.baselineValue} {kpi.unit}</span>
                <span>{kpi.verifiedByValidator ? '✓ Auditor Verified' : 'Self-Reported'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
