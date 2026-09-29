import React from 'react';
import { useApp } from '../../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useApp();

  const pillars = [
    {
      title: 'Lawful Sandbox Procurement',
      icon: '⚖️',
      subtitle: 'GFR Rule 194 Framework',
      desc: 'Enables government departments to execute outcome-based trial contracts with deep-tech startups under legally codified sandbox exemptions without traditional 3-year turnover barriers.'
    },
    {
      title: 'Metric-Driven Verification',
      icon: '🔬',
      subtitle: 'Independent Auditor Sign-off',
      desc: 'Eliminates subjective approvals. Technical performance, safety, and operational KPIs are verified against baseline data by independent panelists from IIT, AIIMS, and NEERI.'
    },
    {
      title: 'Escrow Milestone Protection',
      icon: '💳',
      subtitle: 'Automated PFMS Disbursement',
      desc: 'Sandbox grant funding is locked in PFMS-linked escrow accounts and automatically released to startups upon verified milestone achievement, guaranteeing cash flow security.'
    },
    {
      title: 'Cross-Departmental Scale',
      icon: '🌐',
      subtitle: 'National Replication Pathway',
      desc: 'Once a solution achieves verified performance in one sandbox trial, its validation certificate is registered for fast-track direct procurement across all 31 sister government bodies.'
    }
  ];

  const comparisonRows = [
    { feature: 'Cycle Time to Trial', traditional: '12 to 18 Months', sandbox: '30 to 45 Days', status: '80% Faster' },
    { feature: 'Startup Eligibility Criteria', traditional: '3-Year Financial Turnover & Past Contracts', sandbox: 'DPIIT Registered + TRL-6+ Solution Capability', status: 'Inclusive' },
    { feature: 'Procurement Specification', traditional: 'Rigid Pre-defined Feature Inputs', sandbox: 'Outcome-Based Problem Statement & Target KPIs', status: 'Innovation-Focused' },
    { feature: 'Financial Risk Management', traditional: '100% Upfront Capital Expenditure', sandbox: 'Milestone Escrow Payouts Tied to Verified KPIs', status: 'Zero Waste' },
    { feature: 'IP Rights & Ownership', traditional: 'Government Retains Full Asset Rights', sandbox: 'Startup Retains 100% IP; Gov Gets License', status: 'Startup-Friendly' },
    { feature: 'Multi-Department Scale', traditional: 'Re-Tender Separately in Every Dept/State', sandbox: 'Single Audit Validated for Direct Scaling Across Depts', status: 'Scale-Ready' }
  ];

  const partners = [
    { name: 'Ministry of Finance', role: 'GFR Rule 194 Sandbox Governance', icon: '🏛️' },
    { name: 'DPIIT Startup India', role: 'Automated Entity & CIN Verification', icon: '🇮🇳' },
    { name: 'NITI Aayog Policy Cell', role: 'National Scale-Up Policy Council', icon: '📊' },
    { name: 'National Informatics Centre', role: 'Sovereign Security & Cryptographic Audits', icon: '🔒' },
    { name: 'IIT & AIIMS Panels', role: 'Independent Technical & Clinical Verification', icon: '🎓' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Header Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
        color: 'white',
        padding: '44px 40px',
        borderRadius: '16px'
      }}>
        <span className="badge badge-info" style={{ marginBottom: '12px' }}>INSTITUTIONAL ARCHITECTURE</span>
        <h1 style={{ fontSize: '2.4rem', color: 'white', lineHeight: 1.2 }}>
          Transforming Public Sector Procurement Through Outcome-Based Innovation Sandboxes
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginTop: '16px', maxWidth: '850px', lineHeight: 1.6 }}>
          GovProcure was established under national policy guidelines to eliminate the structural disconnect between government operational bottlenecks and deep-tech startup innovations.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid-cols-2">
        <div className="card" style={{ borderTop: '4px solid var(--primary-600)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>🎯</span>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)' }}>Our Mission</h2>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            To create a transparent, outcome-driven, and legally secure digital gateway where government departments can rapidly post real-world problems, test verified deep-tech solutions in controlled sandboxes, and scale proven innovations across public administration.
          </p>
        </div>

        <div className="card" style={{ borderTop: '4px solid #10B981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>🔭</span>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)' }}>Our Vision</h2>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            To position India’s public sector as a proactive lead adopter of homegrown deep-tech innovation, reducing public service delivery costs by 35% while providing verified startups with an accelerated path to sovereign procurement contracts.
          </p>
        </div>
      </div>

      {/* 4 Core Pillars */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            THE PLATFORM ARCHITECTURE
          </span>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--navy-900)', marginTop: '4px' }}>
            Four Pillars of the GovProcure Sandbox System
          </h2>
        </div>

        <div className="grid-cols-4">
          {pillars.map((p, i) => (
            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '2rem' }}>{p.icon}</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>{p.title}</h3>
                <span className="badge badge-neutral" style={{ marginTop: '4px' }}>{p.subtitle}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Institutional Partners */}
      <div className="card">
        <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)', marginBottom: '16px' }}>
          Institutional Ecosystem & Governance Partners
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {partners.map((pt, idx) => (
            <div key={idx} style={{ background: 'var(--bg-muted)', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{pt.icon}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>{pt.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pt.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)' }}>
            Traditional GFR Tenders vs. GovProcure Innovation Sandbox
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Comparative analysis of regulatory compliance, speed, and risk allocation.
          </p>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Evaluation Metric</th>
                <th>Traditional Commodity Tender</th>
                <th>GovProcure Sandbox Pathway</th>
                <th>Platform Advantage</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{row.feature}</td>
                  <td style={{ color: 'var(--error-text)' }}>{row.traditional}</td>
                  <td style={{ color: 'var(--success-text)', fontWeight: 600 }}>{row.sandbox}</td>
                  <td>
                    <span className="badge badge-success">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card" style={{ background: 'var(--primary-50)', borderColor: 'var(--primary-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)' }}>Want to inspect the Sandbox Framework Guidelines?</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Read the official circulars, GFR 194 legal clauses, and standard contract templates.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setCurrentView('public-resources')}>
          Explore Resources & Circulars →
        </button>
      </div>

    </div>
  );
};
