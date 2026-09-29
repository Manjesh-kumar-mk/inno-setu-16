import React from 'react';
import { StatCard } from '../../common/StatCard';

export const StartupPerformance: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <span className="badge badge-info" style={{ marginBottom: '6px' }}>Self-Measurement & Operational KPI Telemetry</span>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-900)' }}>
          Performance Analytics & Telemetry
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Real-time measurement of trial deployment uptime, algorithm accuracy, and independent validator scorecards.
        </p>
      </div>

      <div className="grid-cols-4">
        <StatCard
          title="Sandbox Node Uptime"
          value="99.8%"
          subtitle="Target: 99.0%"
          icon="⚡"
          trend="+0.8% Above Target"
        />
        <StatCard
          title="Congestion Reduction"
          value="24.6%"
          subtitle="Target KPI: 20.0%"
          icon="🚗"
          trend="Target Exceeded"
        />
        <StatCard
          title="Edge Latency"
          value="8.2 ms"
          subtitle="Target Cap: 15.0 ms"
          icon="⏱️"
        />
        <StatCard
          title="Auditor Validation Score"
          value="94/100"
          subtitle="Evaluator: IISc Panel"
          icon="🎯"
        />
      </div>

      <div className="grid-cols-2">
        {/* Live Telemetry Stream */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '14px' }}>Live Sandbox Telemetry Stream</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { sensor: 'Node #01 (Corridor North)', metric: 'Vehicle Flow Rate: 1,420 / hr', status: 'Optimal (8ms latency)', time: '0.2s ago' },
              { sensor: 'Node #02 (Signal Intersection B)', metric: 'Signal Cycle Adjustment: +14s', status: 'Optimal (7ms latency)', time: '0.5s ago' },
              { sensor: 'Node #03 (Corridor South)', metric: 'Pedestrian Density: Low', status: 'Optimal (9ms latency)', time: '1.1s ago' }
            ].map((node, i) => (
              <div key={i} style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', fontSize: '0.825rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '4px' }}>
                  <span>{node.sensor}</span>
                  <span style={{ color: 'var(--success-text)', fontSize: '0.75rem' }}>{node.time}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>{node.metric}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Status: {node.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Auditor Scorecard */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '14px' }}>Independent Validator Verification Scorecard</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'Technical Architecture & Root of Trust', score: 96, max: 100 },
              { title: 'Field Operational Reliability', score: 94, max: 100 },
              { title: 'Public Safety & Cyber Resiliency', score: 92, max: 100 },
              { title: 'Commercial Scalability & Unit Economics', score: 94, max: 100 }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-muted)', padding: '12px', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  <span>{item.title}</span>
                  <strong style={{ color: 'var(--primary-700)' }}>{item.score} / {item.max}</strong>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#cbd5e1', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.score}%`, height: '100%', background: 'var(--primary-600)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
