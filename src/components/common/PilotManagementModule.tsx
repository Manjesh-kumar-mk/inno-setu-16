import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Pilot, Milestone, KPI, Risk } from '../../types';
import { StatusBadge } from './StatusBadge';
import { StatCard } from './StatCard';
import { MetricsChart } from './MetricsChart';
import { AIKpiInsightsCard } from './AIAssistantComponents';

export const PilotManagementModule: React.FC = () => {
  const { pilots, verifyMilestone, addAuditEvent } = useApp();
  
  // Active pilot selection state
  const [selectedPilotId, setSelectedPilotId] = useState<string>(pilots[0]?.id || 'pilot-301');
  const pilot = pilots.find(p => p.id === selectedPilotId) || pilots[0];

  // Tab State
  const [activeTab, setActiveTab] = useState<
    'overview' | 'milestones' | 'kpis' | 'risks' | 'validation' | 'documents' | 'activity' | 'reports'
  >('overview');

  // Interactive Evidence Upload / Modal State
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // New Risk Form Modal State
  const [isAddRiskOpen, setIsAddRiskOpen] = useState(false);
  const [newRiskCategory, setNewRiskCategory] = useState<'Technical' | 'Financial' | 'Legal' | 'Cybersecurity' | 'Data' | 'Operational'>('Technical');
  const [newRiskDesc, setNewRiskDesc] = useState('');
  const [newRiskMitigation, setNewRiskMitigation] = useState('');
  const [newRiskOwner, setNewRiskOwner] = useState('Startup Technical Lead');
  const [newRiskProb, setNewRiskProb] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [newRiskImpact, setNewRiskImpact] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');

  // Custom local state for KPI verification status in Validation Workspace
  const [kpiVerificationMap, setKpiVerificationMap] = useState<Record<string, 'Verified' | 'Partially Verified' | 'Not Verified' | 'Pending'>>({
    'kpi-1': 'Verified',
    'kpi-2': 'Verified',
    'kpi-3': 'Verified',
    'kpi-4': 'Verified',
    'kpi-5': 'Partially Verified',
    'kpi-6': 'Verified'
  });

  const [validationCertified, setValidationCertified] = useState(false);

  // Default initial KPI dataset with the prompt's explicit examples + pilot KPIs
  const promptKpiExamples = [
    {
      id: 'kpi-p1',
      metricName: 'Processing Time',
      unit: 'min',
      baselineValue: 10,
      targetValue: 6,
      achievedValue: 5.4,
      status: 'Achieved',
      verifiedByValidator: true
    },
    {
      id: 'kpi-p2',
      metricName: 'Cost Reduction',
      unit: '₹',
      baselineValue: 100,
      targetValue: 75,
      achievedValue: 72,
      status: 'Achieved',
      verifiedByValidator: true
    },
    {
      id: 'kpi-p3',
      metricName: 'User Satisfaction',
      unit: '%',
      baselineValue: 55,
      targetValue: 80,
      achievedValue: 87,
      status: 'Achieved',
      verifiedByValidator: true
    }
  ];

  // Merge pilot KPIs with prompt examples
  const allKpis = [
    ...promptKpiExamples,
    ...(pilot?.kpis || []).map(k => ({
      id: k.id,
      metricName: k.metricName,
      unit: k.unit,
      baselineValue: k.baselineValue,
      targetValue: k.targetValue,
      achievedValue: k.achievedValue,
      status: k.status === 'EXCEEDS_TARGET' || k.status === 'MEETS_TARGET' ? 'Achieved' : 'In Progress',
      verifiedByValidator: k.verifiedByValidator
    }))
  ];

  // Local state for custom risk items added by user
  const [localRisks, setLocalRisks] = useState<Array<{
    id: string;
    riskTitle: string;
    category: 'Technical' | 'Financial' | 'Legal' | 'Cybersecurity' | 'Data' | 'Operational';
    probability: 'Low' | 'Medium' | 'High';
    impact: 'Low' | 'Medium' | 'High' | 'Critical';
    mitigation: string;
    owner: string;
    status: 'IDENTIFIED' | 'MITIGATING' | 'RESOLVED';
  }>>([
    {
      id: 'rsk-101',
      riskTitle: 'Corridor Optical Sensor Weather Degradation',
      category: 'Technical',
      probability: 'Medium',
      impact: 'Medium',
      mitigation: 'Dual-thermal IR redundancy & hydrophobic lens coating deployed.',
      owner: 'Startup Technical Lead',
      status: 'MITIGATING'
    },
    {
      id: 'rsk-102',
      riskTitle: 'Edge Node Encrypted Telemetry Latency Spikes',
      category: 'Cybersecurity',
      probability: 'Low',
      impact: 'High',
      mitigation: 'Quantum-resistant AES-256 local buffer queue with zero packet loss fallback.',
      owner: 'Cybersecurity Auditor',
      status: 'RESOLVED'
    },
    {
      id: 'rsk-103',
      riskTitle: 'PFMS Escrow Disbursement Gateway Timeout',
      category: 'Financial',
      probability: 'Low',
      impact: 'Medium',
      mitigation: 'Automated Treasury API webhook retry handler with dual sign-off key.',
      owner: 'Gov Finance Officer',
      status: 'RESOLVED'
    },
    {
      id: 'rsk-104',
      riskTitle: 'Inter-Agency Data Protection Compliance Audit',
      category: 'Data',
      probability: 'Low',
      impact: 'High',
      mitigation: 'Anonymized feature extraction at edge; zero raw PII transmitted to cloud.',
      owner: 'Legal & Compliance Counsel',
      status: 'RESOLVED'
    },
    {
      id: 'rsk-105',
      riskTitle: 'Municipal Corridor Site Power Outage Resilience',
      category: 'Operational',
      probability: 'Medium',
      impact: 'Medium',
      mitigation: 'Solar UPS capacitor back-up providing 8-hour continuous node operations.',
      owner: 'Field Operations Specialist',
      status: 'MITIGATING'
    }
  ]);

  if (!pilot) {
    return <div className="card">No active pilot sandbox loaded.</div>;
  }

  // Handle milestone evidence submission
  const handleEvidenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addAuditEvent(`Submitted Milestone Evidence for ${selectedMilestone?.title}`, pilot.code);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedMilestone(null);
      setEvidenceNotes('');
    }, 1200);
  };

  // Handle adding new risk to register
  const handleAddRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRiskDesc.trim()) return;
    const newRiskObj = {
      id: `rsk-${Date.now().toString().slice(-4)}`,
      riskTitle: newRiskDesc,
      category: newRiskCategory,
      probability: newRiskProb,
      impact: newRiskImpact,
      mitigation: newRiskMitigation || 'Mitigation strategy under review.',
      owner: newRiskOwner,
      status: 'IDENTIFIED' as const
    };
    setLocalRisks(prev => [newRiskObj, ...prev]);
    addAuditEvent(`Registered new sandbox risk: ${newRiskDesc}`, pilot.code);
    setNewRiskDesc('');
    setNewRiskMitigation('');
    setIsAddRiskOpen(false);
  };

  // Milestone 6-Phase Pipeline Workflow definition
  const milestonePipelinePhases = [
    { key: 'CONTRACT', name: 'Contract Signed', stepNum: 1, status: 'COMPLETED', date: '2026-03-01' },
    { key: 'PROTOTYPE', name: 'Prototype', stepNum: 2, status: 'COMPLETED', date: '2026-03-25' },
    { key: 'DEPLOYMENT', name: 'Deployment', stepNum: 3, status: 'COMPLETED', date: '2026-04-15' },
    { key: 'FIELD_TESTING', name: 'Field Testing', stepNum: 4, status: 'IN_PROGRESS', date: '2026-06-30' },
    { key: 'PERFORMANCE_VALIDATION', name: 'Performance Validation', stepNum: 5, status: 'PENDING', date: '2026-07-31' },
    { key: 'FINAL_REPORT', name: 'Final Report', stepNum: 6, status: 'PENDING', date: '2026-08-31' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. HEADER SECTION (Pilot Detail Header) */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, var(--navy-950) 0%, var(--navy-900) 60%, var(--primary-900) 100%)',
        color: '#FFFFFF',
        padding: '24px',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.25)', color: '#93c5fd', border: '1px solid rgba(147, 197, 253, 0.3)', fontWeight: 700 }}>
                PILOT REF: {pilot.code}
              </span>
              <StatusBadge status={pilot.status} />
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.3)' }}>
                📍 {pilot.testbedLocation || 'Delhi Traffic Corridor 4'}
              </span>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '6px 0 10px 0', color: '#FFFFFF', lineHeight: 1.3 }}>
              {pilot.challengeTitle}
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
              <div>🏢 <strong>Department:</strong> {pilot.departmentName}</div>
              <div>🚀 <strong>Startup:</strong> {pilot.startupName}</div>
              <div>🛡️ <strong>Independent Auditor:</strong> {pilot.independentValidatorName}</div>
            </div>
          </div>

          {/* Pilot Switcher & Progress Gauge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', flexShrink: 0 }}>
            <div>
              <label style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                Select Active Pilot Sandbox
              </label>
              <select
                value={selectedPilotId}
                onChange={(e) => setSelectedPilotId(e.target.value)}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  outline: 'none',
                  maxWidth: '100%'
                }}
              >
                {pilots.map(p => (
                  <option key={p.id} value={p.id} style={{ background: '#0F172A', color: '#FFF' }}>
                    {p.code} - {p.startupName} ({p.departmentName.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(4px)', width: '220px', maxWidth: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                <span>Overall Trial Progress</span>
                <span style={{ color: '#38bdf8' }}>{pilot.progressPercentage || 65}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${pilot.progressPercentage || 65}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #10b981)', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TABS BAR */}
      <div className="tabs" style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '2px' }}>
        {[
          { id: 'overview', label: '📊 Overview', icon: '📊' },
          { id: 'milestones', label: '🚩 Milestones', icon: '🚩' },
          { id: 'kpis', label: '📈 KPI Performance', icon: '📈' },
          { id: 'risks', label: '⚠️ Risk Register', icon: '⚠️' },
          { id: 'validation', label: '🔍 Independent Validation', icon: '🔍' },
          { id: 'documents', label: '📁 Documents Vault', icon: '📁' },
          { id: 'activity', label: '📜 Activity Log', icon: '📜' },
          { id: 'reports', label: '📄 Reports & Analytics', icon: '📄' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === tab.id ? '3px solid var(--primary-600)' : '3px solid transparent',
              color: activeTab === tab.id ? 'var(--primary-700)' : 'var(--text-muted)',
              fontWeight: activeTab === tab.id ? 700 : 500,
              cursor: 'pointer',
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
              transition: 'var(--transition-fast)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Overview Stat Cards */}
          <div className="grid-cols-4">
            <StatCard
              title="Trial Timeline"
              value={`${pilot.startDate} to ${pilot.endDate}`}
              subtitle="Phase 2 of 3: Field Testing"
              accentColor="#2563EB"
            />
            <StatCard
              title="Escrow Budget Utilized"
              value={`₹${(pilot.disbursedAmount || 1250000).toLocaleString('en-IN')}`}
              subtitle={`Out of ₹${(pilot.allocatedBudget || 2500000).toLocaleString('en-IN')} total`}
              accentColor="#059669"
            />
            <StatCard
              title="KPI Achievement Rate"
              value="100%"
              subtitle="3/3 Metrics Meeting/Exceeding Target"
              accentColor="#10B981"
            />
            <StatCard
              title="Systemic Risk Level"
              value={`${pilot.riskStatus || 'LOW'} Risk`}
              subtitle="5 Active Mitigations Tracked"
              accentColor="#D97706"
            />
          </div>

          {/* Overview Deep-Dive Grid */}
          <div className="responsive-grid-2-1" style={{ gap: '20px' }}>
            
            {/* Left Column: Timeline & Progress Breakdown */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Sandbox Trial Operational Status</div>
                <span className="badge badge-success">● Telemetry Live</span>
              </div>

              <div style={{ margin: '16px 0', background: 'var(--bg-muted)', padding: '16px', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--navy-900)' }}>Current Phase: Operational Field Testing & Telemetry Audit</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary-700)' }}>{pilot.progressPercentage || 65}% Complete</span>
                </div>
                <div className="progress-bar" style={{ height: '12px' }}>
                  <div className="progress-bar-fill" style={{ width: `${pilot.progressPercentage || 65}%` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  <span>Start Date: {pilot.startDate}</span>
                  <span>Mid-Trial Milestone 2: 15 May 2026</span>
                  <span>End Date: {pilot.endDate}</span>
                </div>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '20px 0 12px 0', color: 'var(--navy-900)' }}>
                Escrow Budget & Funding Utilization
              </h4>
              <div className="grid-cols-3" style={{ gap: '12px' }}>
                <div style={{ background: 'var(--bg-app)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Allocated Escrow</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '2px' }}>
                    ₹{(pilot.allocatedBudget || 2500000).toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-app)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Disbursed Payouts</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success-text)', marginTop: '2px' }}>
                    ₹{(pilot.disbursedAmount || 1250000).toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-app)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Remaining Escrow Hold</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '2px' }}>
                    ₹{((pilot.allocatedBudget || 2500000) - (pilot.disbursedAmount || 1250000)).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Pilot Metadata & Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card">
                <div className="card-title" style={{ marginBottom: '14px' }}>Pilot Governance Attributes</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Independent Auditor:</span>
                    <strong style={{ color: 'var(--navy-900)' }}>{pilot.independentValidatorName}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Validation Status:</span>
                    <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                      {pilot.independentValidationStatus}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>KPI Status:</span>
                    <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>✓ ON TRACK</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Testbed Corridor:</span>
                    <strong style={{ color: 'var(--navy-900)' }}>{pilot.testbedLocation || 'Delhi Corridor 4'}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Overall Success Score:</span>
                    <strong style={{ color: 'var(--primary-700)', fontSize: '1rem' }}>{pilot.overallSuccessRate || 94}%</strong>
                  </div>
                </div>
              </div>

              <div className="card" style={{ background: 'var(--bg-muted)' }}>
                <div className="card-title" style={{ marginBottom: '12px' }}>Quick Sandbox Actions</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button className="btn btn-primary" onClick={() => setActiveTab('validation')}>
                    🔍 Access Independent Validation Workspace
                  </button>
                  <button className="btn btn-outline" onClick={() => setActiveTab('milestones')}>
                    🚩 View Milestone Deliverables & Disburse
                  </button>
                  <button className="btn btn-secondary" onClick={() => setActiveTab('reports')}>
                    📄 Export Performance Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MILESTONES */}
      {/* ========================================================================= */}
      {activeTab === 'milestones' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Milestone Visual Pipeline Diagram */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">6-Stage Milestone Lifecycle Pipeline</div>
                <div className="card-subtitle">Sequential deliverable progression and escrow funds release chain</div>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setSelectedMilestone(pilot.milestones[1] || pilot.milestones[0])}
              >
                + Submit Milestone Evidence
              </button>
            </div>

            {/* Visual Pipeline Flow */}
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '6px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                minWidth: '580px',
                gap: '8px',
                margin: '20px 0 10px 0',
                padding: '16px',
                background: 'var(--bg-muted)',
                borderRadius: 'var(--radius-lg)'
              }}>
              {milestonePipelinePhases.map((phase, idx) => {
                const isCompleted = phase.status === 'COMPLETED';
                const isInProgress = phase.status === 'IN_PROGRESS';
                return (
                  <div key={phase.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
                    {/* Connecting arrow */}
                    {idx < 5 && (
                      <div style={{
                        position: 'absolute',
                        top: '18px',
                        right: '-20px',
                        fontSize: '1rem',
                        color: isCompleted ? 'var(--success-text)' : 'var(--border-strong)',
                        zIndex: 2
                      }}>
                        ➔
                      </div>
                    )}

                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isCompleted ? 'var(--success-text)' : isInProgress ? 'var(--primary-600)' : 'var(--bg-surface)',
                      color: isCompleted || isInProgress ? '#FFF' : 'var(--text-muted)',
                      border: isCompleted ? 'none' : isInProgress ? '3px solid var(--primary-100)' : '2px solid var(--border-strong)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      marginBottom: '8px',
                      boxShadow: isInProgress ? '0 0 0 4px rgba(37, 99, 235, 0.2)' : 'none'
                    }}>
                      {isCompleted ? '✓' : phase.stepNum}
                    </div>

                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                      {phase.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {phase.date}
                    </div>
                    <span className={`badge ${isCompleted ? 'badge-success' : isInProgress ? 'badge-info' : 'badge-warning'}`} style={{ fontSize: '0.65rem', marginTop: '6px' }}>
                      {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

          {/* Detailed Milestone List */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: '16px' }}>
              Milestone Deliverables, Escrow & Independent Validation Details
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {pilot.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px',
                    background: 'var(--bg-surface)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                        <span className="badge badge-info">Milestone {idx + 1}</span>
                        <StatusBadge status={m.status} />
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                        {m.title}
                      </h3>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {m.description}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', background: 'var(--bg-muted)', padding: '10px 16px', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                        Escrow Payout Share
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                        ₹{m.payoutAmount.toLocaleString('en-IN')} ({m.payoutPercentage}%)
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Due Date: <strong>{m.dueDate}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Deliverables & Validation Info Grid */}
                  <div className="responsive-grid-2-1" style={{ gap: '16px', background: 'var(--bg-muted)', padding: '14px', borderRadius: 'var(--radius-md)', fontSize: '0.825rem' }}>
                    <div>
                      <strong style={{ color: 'var(--navy-900)', display: 'block', marginBottom: '6px' }}>
                        📦 Key Deliverables Checklist:
                      </strong>
                      <ul style={{ paddingLeft: '18px', margin: 0, color: 'var(--text-main)' }}>
                        {m.deliverables?.map((del: string, dIdx: number) => (
                          <li key={dIdx} style={{ marginBottom: '4px' }}>{del}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '14px' }}>
                      <div>
                        <strong style={{ color: 'var(--navy-900)', display: 'block' }}>🔍 Validation Status:</strong>
                        <span style={{
                          color: m.status === 'DISBURSED' || m.status === 'APPROVED' ? 'var(--success-text)' : 'var(--warning-text)',
                          fontWeight: 600
                        }}>
                          {m.verifiedBy ? `✓ Verified by ${m.verifiedBy}` : (m.validationStatus || 'Pending Independent Auditor Audit')}
                        </span>
                      </div>

                      <div>
                        <strong style={{ color: 'var(--navy-900)', display: 'block' }}>📄 Attached Evidence:</strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--primary-700)', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => alert(`Downloading deliverables evidence archive for ${m.title}`)}>
                          {m.title.split(':')[0]}_Evidence_Package.pdf
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Milestone Action Handler */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px', gap: '10px' }}>
                    {m.status === 'UNDER_VERIFICATION' ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          verifyMilestone(pilot.id, m.id);
                          addAuditEvent(`Approved & Disbursed Milestone ${m.id}`, pilot.code);
                        }}
                      >
                        ✓ Verify & Release Escrow (₹{m.payoutAmount.toLocaleString('en-IN')})
                      </button>
                    ) : m.status === 'PENDING' || m.status === 'SUBMITTED' ? (
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedMilestone(m)}
                      >
                        + Submit Deliverables Evidence
                      </button>
                    ) : (
                      <span className="badge badge-success" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        ✓ Escrow Disbursed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: KPIS & PERFORMANCE */}
      {/* ========================================================================= */}
      {activeTab === 'kpis' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* AI Feature 5: AI KPI Performance Insights */}
          <AIKpiInsightsCard />

          <div className="card-header" style={{ marginBottom: '-6px' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', fontWeight: 700 }}>
                Automated KPI Performance Measurement Cards
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Real-time telemetry metric baseline vs target vs achieved performance benchmarking
              </p>
            </div>
            <span className="badge badge-success" style={{ fontSize: '0.85rem' }}>
              ● Synchronized with Corridor Telemetry Stream
            </span>
          </div>

          {/* Prompt Specific KPI Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {allKpis.map((kpi, idx) => {
              const isAchieved = kpi.status === 'Achieved';
              const progressPct = Math.min(Math.round((kpi.achievedValue / kpi.targetValue) * 100), 140);
              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    borderTop: `4px solid ${isAchieved ? 'var(--success-text)' : 'var(--primary-600)'}`,
                    background: 'var(--bg-surface)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                      {kpi.metricName}
                    </h4>
                    <span className={`badge ${isAchieved ? 'badge-success' : 'badge-info'}`} style={{ fontSize: '0.75rem' }}>
                      {isAchieved ? '✓ Achieved' : 'In Progress'}
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    background: 'var(--bg-muted)',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    marginBottom: '14px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>BASELINE</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                        {kpi.baselineValue} {kpi.unit}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>TARGET</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                        {kpi.targetValue} {kpi.unit}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTUAL</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isAchieved ? 'var(--success-text)' : 'var(--primary-700)' }}>
                        {kpi.achievedValue} {kpi.unit}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar visual for each card */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Target Benchmark</span>
                      <strong style={{ color: isAchieved ? 'var(--success-text)' : 'var(--primary-700)' }}>
                        {progressPct}% of Goal
                      </strong>
                    </div>
                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${Math.min(progressPct, 100)}%`,
                          height: '100%',
                          background: isAchieved ? 'var(--success-text)' : 'var(--primary-600)',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual KPI Performance Chart Component */}
          <div style={{ marginTop: '10px' }}>
            <MetricsChart kpis={pilot.kpis} title="Real-Time Telemetry Performance Analytics vs Baseline Targets" />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: RISKS */}
      {/* ========================================================================= */}
      {activeTab === 'risks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', fontWeight: 700 }}>
                Sandbox Trial Risk Register & Governance Matrix
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Comprehensive tracking of Technical, Financial, Legal, Cybersecurity, Data, and Operational risks
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => setIsAddRiskOpen(true)}>
              + Log New Risk Item
            </button>
          </div>

          {/* Risk Register Table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Risk Title & Description</th>
                    <th>Category</th>
                    <th>Probability</th>
                    <th>Impact</th>
                    <th>Mitigation Strategy</th>
                    <th>Risk Owner</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {localRisks.map((r) => {
                    const isCritical = r.impact === 'Critical' || r.impact === 'High';
                    return (
                      <tr key={r.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.875rem' }}>
                            {r.riskTitle}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>REF: {r.id}</div>
                        </td>
                        <td>
                          <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>
                            {r.category}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.825rem' }}>{r.probability}</td>
                        <td>
                          <span className={`badge ${isCritical ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>
                            {r.impact}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.825rem', maxWidth: '280px' }}>
                          {r.mitigation}
                        </td>
                        <td style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                          {r.owner}
                        </td>
                        <td>
                          <StatusBadge status={r.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: INDEPENDENT VALIDATION WORKSPACE */}
      {/* ========================================================================= */}
      {activeTab === 'validation' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="card" style={{ background: 'var(--navy-900)', color: '#FFF', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-info" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFF' }}>
                  INDEPENDENT AUDITOR SUITE
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '4px', color: '#FFF' }}>
                  Third-Party Independent Validation Workspace
                </h2>
                <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>
                  Lead Auditor: <strong>{pilot.independentValidatorName}</strong> • Verification Hash: <code>0x9f8b7a...3c21</code>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4ade80' }}>
                  96.8%
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Compliance & Validation Pass Rate</div>
              </div>
            </div>
          </div>

          {/* 6 Required Evidence Sources Grid */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '14px' }}>
              📂 6 Core Evidence Sources & System Artifacts
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {[
                { title: '1. Baseline Evidence', file: 'Baseline_Traffic_Sensor_Corridor_Audit.pdf', size: '14.2 MB', status: 'VERIFIED ✓', type: 'Sensor Audit' },
                { title: '2. Pilot Evidence', file: 'Edge_Camera_Feeds_60Day_Telemetry.json', size: '128.5 MB', status: 'VERIFIED ✓', type: 'Telemetry Stream' },
                { title: '3. KPI Evidence', file: 'Corridor_Delay_Reduction_Audit_v2.xlsx', size: '4.8 MB', status: 'VERIFIED ✓', type: 'Performance Audit' },
                { title: '4. System Logs', file: 'Blockchain_Hash_Ledger_Log.txt', size: '1.2 MB', status: 'VERIFIED ✓', type: 'Audit Trail' },
                { title: '5. User Feedback', file: 'Delhi_Commuter_Survey_NPS_Report.pdf', size: '8.4 MB', status: 'VERIFIED ✓', type: 'Public Survey' },
                { title: '6. Financial Evidence', file: 'PFMS_Escrow_Disbursement_Receipt.pdf', size: '2.1 MB', status: 'VERIFIED ✓', type: 'Treasury Receipt' }
              ].map((ev, idx) => (
                <div key={idx} style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>
                    <span>{ev.title}</span>
                    <span style={{ color: 'var(--success-text)' }}>{ev.status}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-700)', wordBreak: 'break-all' }}>
                    {ev.file}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <span>Type: {ev.type}</span>
                    <span>Size: {ev.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Per-KPI Independent Verification Status Matrix */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '14px' }}>
              📊 Per-KPI Verification Status Matrix
            </h3>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>KPI Metric Name</th>
                    <th>Baseline</th>
                    <th>Target</th>
                    <th>Achieved Value</th>
                    <th>Verification Status</th>
                    <th>Auditor Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allKpis.map(kpi => {
                    const currentStatus = kpiVerificationMap[kpi.id] || 'Verified';
                    return (
                      <tr key={kpi.id}>
                        <td><strong>{kpi.metricName}</strong></td>
                        <td>{kpi.baselineValue} {kpi.unit}</td>
                        <td>{kpi.targetValue} {kpi.unit}</td>
                        <td style={{ fontWeight: 700, color: 'var(--success-text)' }}>
                          {kpi.achievedValue} {kpi.unit}
                        </td>
                        <td>
                          <span className={`badge ${
                            currentStatus === 'Verified' ? 'badge-success' :
                            currentStatus === 'Partially Verified' ? 'badge-warning' :
                            currentStatus === 'Not Verified' ? 'badge-danger' : 'badge-info'
                          }`}>
                            {currentStatus}
                          </span>
                        </td>
                        <td>
                          <select
                            value={currentStatus}
                            onChange={(e) => setKpiVerificationMap(prev => ({ ...prev, [kpi.id]: e.target.value as any }))}
                            style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', border: '1px solid var(--border-strong)' }}
                          >
                            <option value="Verified">Verified ✓</option>
                            <option value="Partially Verified">Partially Verified ⚠️</option>
                            <option value="Not Verified">Not Verified ❌</option>
                            <option value="Pending">Pending ⏳</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Final Validation Summary & Certificate Sign-Off */}
          <div className="card" style={{ border: '2px solid var(--success-border)', background: 'var(--success-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="badge badge-success" style={{ marginBottom: '6px' }}>FINAL INDEPENDENT VALIDATION SUMMARY</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                  Official Sandbox Certificate of Performance Validation
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '700px' }}>
                  The independent sandbox evaluation team certifies that the solution meets all primary outcome criteria with 0 critical defects. Eligible for direct government procurement scale-up.
                </p>
              </div>

              <div>
                {validationCertified ? (
                  <div style={{ background: '#FFF', padding: '10px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--success-border)', color: 'var(--success-text)', fontWeight: 700, fontSize: '0.9rem' }}>
                    ✓ Independent Validation Certificate Issued & Cryptographically Sealed!
                  </div>
                ) : (
                  <button
                    className="btn btn-primary"
                    style={{ background: 'var(--success-text)', borderColor: 'var(--success-text)' }}
                    onClick={() => {
                      setValidationCertified(true);
                      addAuditEvent('Issued Official Independent Validation Certificate', pilot.code);
                    }}
                  >
                    📜 Issue Independent Validation Certificate
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: DOCUMENTS VAULT */}
      {/* ========================================================================= */}
      {activeTab === 'documents' && (
        <div className="card">
          <div className="card-header" style={{ marginBottom: '16px' }}>
            <h3 className="card-title">Pilot Legal & Technical Vault</h3>
            <button className="btn btn-primary btn-sm" onClick={() => alert('Upload Document Modal')}>
              + Upload Document
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Tri-Partite Sandbox MOU (Gov + Startup + Auditor)', ref: 'MOU_DELHI_CORRIDOR_4.pdf', status: 'EXECUTED ✓', date: '2026-03-01' },
              { name: 'Testbed Site Access Permit & Safety Isolation Clearance', ref: 'PERMIT_SITE_ACC_004.pdf', status: 'APPROVED ✓', date: '2026-03-05' },
              { name: 'Hardware Telemetry Security Audit Certificate', ref: 'SEC_AUDIT_VERIFIED.pdf', status: 'VERIFIED ✓', date: '2026-03-20' },
              { name: 'PFMS Escrow Account Authorization Letter', ref: 'ESCROW_PFMS_AUTH.pdf', status: 'LOCKED & READY ✓', date: '2026-03-22' },
              { name: '60-Day Telemetry Log Data Package (Raw CSV/JSON)', ref: 'CORRIDOR_TELEMETRY_DATA_V2.zip', status: 'AUDITED ✓', date: '2026-06-15' }
            ].map((doc, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', padding: '14px 16px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-lg)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy-900)' }}>{doc.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>REF: {doc.ref} • Uploaded: {doc.date}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>{doc.status}</span>
                  <button className="btn btn-outline btn-sm" onClick={() => alert(`Downloading ${doc.ref}`)}>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: ACTIVITY LOG */}
      {/* ========================================================================= */}
      {activeTab === 'activity' && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '16px' }}>
            Cryptographic Audit & Activity Trail
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { action: 'Milestone 1 Payout Escrow Release Completed', actor: 'Gov Finance Officer', time: '2026-04-02 14:22:10', hash: '0x8f7a...90e1' },
              { action: 'Hardware Root of Trust Audit Verification Passed', actor: 'Er. R. K. Sharma (NIUA Auditor)', time: '2026-03-31 11:05:40', hash: '0x3c1b...4a22' },
              { action: '12 Edge Vision Nodes Connected to Telemetry Relay', actor: 'Dr. Vikramaditya Rao (Startup)', time: '2026-03-15 09:30:00', hash: '0x7e8d...11c4' },
              { action: 'Tri-Partite Sandbox MOU Signed & Deposited', actor: 'Department Director', time: '2026-03-01 16:45:00', hash: '0x1a2b...3c4d' }
            ].map((evt, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', padding: '12px 14px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-600)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy-900)' }}>{evt.action}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Actor: {evt.actor} • Time: {evt.time}</div>
                </div>
                <code style={{ fontSize: '0.75rem', background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>
                  HASH: {evt.hash}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: REPORTS & EXPORT */}
      {/* ========================================================================= */}
      {activeTab === 'reports' && (
        <div className="card">
          <div className="card-header" style={{ marginBottom: '16px' }}>
            <div>
              <h3 className="card-title">Sandbox Trial Executive Reports</h3>
              <div className="card-subtitle">Automated monthly audit and performance PDF summary generation</div>
            </div>
            <button className="btn btn-primary" onClick={() => alert('Generating full sandbox PDF report...')}>
              📊 Download Full Pilot Dossier
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'Month 1 Operational & Setup Audit Report', date: '2026-03-31', author: 'NIUA Evaluation Panel', status: 'APPROVED ✓' },
              { title: 'Month 2 Performance & Telemetry Validation Summary', date: '2026-04-30', author: 'Independent Validator', status: 'APPROVED ✓' },
              { title: 'Mid-Trial Escrow & Milestone 2 Audit Certificate', date: '2026-06-15', author: 'Gov Treasury & NIUA', status: 'UNDER REVIEW' }
            ].map((rep, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', padding: '14px 16px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-lg)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy-900)' }}>{rep.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date: {rep.date} • Prepared by: {rep.author}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>{rep.status}</span>
                  <button className="btn btn-outline btn-sm" onClick={() => alert(`Downloading ${rep.title}`)}>
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SUBMIT MILESTONE EVIDENCE */}
      {/* ========================================================================= */}
      {selectedMilestone && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', background: '#FFF', borderRadius: 'var(--radius-xl)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-info">Evidence Claim Submission</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px', color: 'var(--navy-900)' }}>
                  {selectedMilestone.title}
                </h3>
              </div>
              <button onClick={() => setSelectedMilestone(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--success-text)', marginBottom: '10px' }}>✓</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Milestone Evidence Submitted!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Ref Hash: <code>0x8a91c0e...</code> recorded. Independent auditor notified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEvidenceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--navy-900)', display: 'block', marginBottom: '6px' }}>
                    Deliverable Audit Notes & Telemetry Links
                  </label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder="Enter technical details, telemetry log references, or independent test links..."
                    value={evidenceNotes}
                    onChange={(e) => setEvidenceNotes(e.target.value)}
                    required
                  />
                </div>

                <div style={{ border: '2px dashed var(--border-strong)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center', background: 'var(--bg-muted)' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>📄</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Click to attach testbed log CSV/PDF</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Maximum file size: 50MB</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setSelectedMilestone(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Submit to Auditor</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: LOG NEW RISK ITEM */}
      {/* ========================================================================= */}
      {isAddRiskOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '560px', background: '#FFF', borderRadius: 'var(--radius-xl)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                Log New Risk to Register
              </h3>
              <button onClick={() => setIsAddRiskOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>

            <form onSubmit={handleAddRisk} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Risk Category</label>
                <select
                  className="form-input"
                  value={newRiskCategory}
                  onChange={(e) => setNewRiskCategory(e.target.value as any)}
                >
                  <option value="Technical">Technical</option>
                  <option value="Financial">Financial</option>
                  <option value="Legal">Legal</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Data">Data</option>
                  <option value="Operational">Operational</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Risk Title & Description</label>
                <input
                  className="form-input"
                  placeholder="e.g. Corridor Optical Sensor Weather Degradation"
                  value={newRiskDesc}
                  onChange={(e) => setNewRiskDesc(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Probability</label>
                  <select
                    className="form-input"
                    value={newRiskProb}
                    onChange={(e) => setNewRiskProb(e.target.value as any)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Impact Level</label>
                  <select
                    className="form-input"
                    value={newRiskImpact}
                    onChange={(e) => setNewRiskImpact(e.target.value as any)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Mitigation Strategy</label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Describe preventive or corrective measures..."
                  value={newRiskMitigation}
                  onChange={(e) => setNewRiskMitigation(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Risk Owner</label>
                <input
                  className="form-input"
                  value={newRiskOwner}
                  onChange={(e) => setNewRiskOwner(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsAddRiskOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save to Risk Register</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
