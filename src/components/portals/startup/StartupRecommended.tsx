import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StartupApplicationWizard } from './StartupApplicationWizard';
import { Challenge } from '../../../types';

export const StartupRecommended: React.FC = () => {
  const { challenges } = useApp();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const recommendations = [
    {
      challenge: challenges[0] || {
        id: 'ch-101',
        title: 'AI-Based Real-time Urban Signal Optimization',
        departmentName: 'Department of Transportation & Smart Mobility',
        sector: 'Smart Mobility',
        budgetCap: 350000,
        submissionDeadline: '2026-10-15',
        sandboxDurationMonths: 6,
        eligibleStartupCriteria: ['DPIIT Recognized', 'TRL 6+']
      },
      matchPercentage: 96,
      techMatchScore: 98,
      domainMatchScore: 94,
      patentMatchScore: 97,
      techStack: 'Edge Vision, ROS2, TensorRT, Hardware Root of Trust',
      domain: 'Intelligent Transportation Systems (ITS)',
      eligibilityText: 'Full Statutory Compliance Verified (DPIIT #881920)',
      deadline: '2026-10-15',
      aiSummary: 'High technological symmetry detected between your granted edge vision patent IN-2024-91024 and the Ministry of Transportation requirement for real-time edge processing without cloud dependencies.'
    },
    {
      challenge: challenges[1] || {
        id: 'ch-102',
        title: 'Edge AI Water Quality & Contaminant Detection System',
        departmentName: 'Ministry of Jal Shakti & Urban Water',
        sector: 'Clean Tech',
        budgetCap: 450000,
        submissionDeadline: '2026-11-01',
        sandboxDurationMonths: 9,
        eligibleStartupCriteria: ['DPIIT Recognized', 'TRL 7+']
      },
      matchPercentage: 91,
      techMatchScore: 92,
      domainMatchScore: 89,
      patentMatchScore: 92,
      techStack: 'IoT Sensors, Edge Anomaly Detection, Sub-second Alerting',
      domain: 'Environmental Monitoring & Public Health Security',
      eligibilityText: 'ISO 27001 Certified Entity Prerequisite Satisfied',
      deadline: '2026-11-01',
      aiSummary: 'Your registered hardware root of trust architecture meets the strict cybersecurity tamper-proof data telemetry rules issued by Jal Shakti Ministry.'
    },
    {
      challenge: challenges[2] || {
        id: 'ch-103',
        title: 'Autonomous Drone Fleet for Rural Healthcare Delivery',
        departmentName: 'Department of Health & Family Welfare',
        sector: 'Health Tech',
        budgetCap: 500000,
        submissionDeadline: '2026-10-30',
        sandboxDurationMonths: 12,
        eligibleStartupCriteria: ['DPIIT Recognized', 'DGCA Clearance']
      },
      matchPercentage: 86,
      techMatchScore: 88,
      domainMatchScore: 84,
      patentMatchScore: 85,
      techStack: 'Autonomous Nav, Avionics Telemetry, Cold Chain Sensors',
      domain: 'Medical Emergency Logistics',
      eligibilityText: 'Requires DGCA Beyond-Visual-Line-of-Sight (BVLOS) Waiver',
      deadline: '2026-10-30',
      aiSummary: 'Strong backend cloud telemetry compatibility; requires partner avionics certification.'
    }
  ];

  const handleApply = (c: Challenge) => {
    setSelectedChallenge(c);
    setIsWizardOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <span className="badge badge-primary" style={{ marginBottom: '6px' }}>
          🤖 Deep-Tech AI Opportunity Matcher
        </span>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-900)' }}>
          Recommended Government Outcome Challenges
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Algorithmic alignment of your DPIIT Startup Passport, Patent Portfolio, TRL-7 level, and previous government pilot record.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {recommendations.map((rec, index) => (
          <div key={index} className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="badge badge-success" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                    {rec.matchPercentage}% OVERALL MATCH
                  </span>
                  <span className="badge badge-info">{rec.challenge.sector}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Sandbox Duration: {rec.challenge.sandboxDurationMonths} Months
                  </span>
                </div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                  {rec.challenge.title}
                </h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {rec.challenge.departmentName}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                  ₹{rec.challenge.budgetCap.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Grant Budget Cap</div>
              </div>
            </div>

            {/* AI Breakdown Scores Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              padding: '12px 16px',
              background: 'var(--bg-muted)',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '0.825rem'
            }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Technology Stack Fit</div>
                <strong style={{ fontSize: '1rem', color: 'var(--success-text)' }}>{rec.techMatchScore}%</strong>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Domain Context Fit</div>
                <strong style={{ fontSize: '1rem', color: 'var(--primary-700)' }}>{rec.domainMatchScore}%</strong>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Patent & IP Alignment</div>
                <strong style={{ fontSize: '1rem', color: 'var(--navy-900)' }}>{rec.patentMatchScore}%</strong>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Deadline</div>
                <strong style={{ fontSize: '0.95rem' }}>{rec.deadline}</strong>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
              🤖 <strong>AI Matching Analysis:</strong> {rec.aiSummary}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--success-text)', fontWeight: 600 }}>
                ✓ {rec.eligibilityText}
              </div>
              <button
                className="btn btn-primary"
                onClick={() => handleApply(rec.challenge as Challenge)}
              >
                Launch Multi-Step Application →
              </button>
            </div>
          </div>
        ))}
      </div>

      <StartupApplicationWizard
        challenge={selectedChallenge}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />
    </div>
  );
};
