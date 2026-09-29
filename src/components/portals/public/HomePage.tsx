import React from 'react';
import { useApp } from '../../../context/AppContext';

export const HomePage: React.FC = () => {
  const { setCurrentView, openModal, isAuthenticated, currentRole, notifyInfo } = useApp();

  const pipelineSteps = [
    { step: '1', title: 'Problem', icon: '⚡', desc: 'Gov Dept defines operational bottleneck' },
    { step: '2', title: 'Challenge', icon: '🎯', desc: 'Outcome-based open specification' },
    { step: '3', title: 'Startup', icon: '🚀', desc: 'DPIIT deep-tech discovery & matching' },
    { step: '4', title: 'Evaluation', icon: '🔬', desc: 'Independent expert panel technical review' },
    { step: '5', title: 'Pilot', icon: '⚡', desc: 'Controlled live sandbox trial' },
    { step: '6', title: 'KPI', icon: '📊', desc: 'Automated telemetry performance tracking' },
    { step: '7', title: 'Validation', icon: '🛡️', desc: 'Third-party auditor & steering committee sign-off' },
    { step: '8', title: 'Procurement', icon: '📜', desc: 'Direct fast-track contract award' },
    { step: '9', title: 'Scale', icon: '🌐', desc: 'Cross-department nationwide deployment' }
  ];

  const stats = [
    { label: 'Active Challenges', value: '42', trend: '+8 this month', icon: '🎯' },
    { label: 'Applications Received', value: '386', trend: 'DPIIT Verified', icon: '📥' },
    { label: 'Startups Registered', value: '1,248', trend: 'Deep-Tech & MSME', icon: '🚀' },
    { label: 'Active Pilots', value: '27', trend: 'Live Sandboxes', icon: '🔬' },
    { label: 'Completed Pilots', value: '64', trend: '96.4% Success Rate', icon: '✅' },
    { label: 'Solutions Validated', value: '41', trend: 'Third-Party Audited', icon: '🛡️' },
    { label: 'Solutions Scaled', value: '18', trend: 'Multi-State Deployment', icon: '🏆' },
    { label: 'Total Pilot Funding', value: '₹18.6 Crore', trend: 'PFMS Escrow', icon: '💳' }
  ];

  const problemVsSolution = [
    {
      problem: 'Traditional Procurement Bottlenecks',
      points: [
        '12-18 month lengthy L1 tender cycles delaying critical technology adoption',
        'Strict 3-year turnover and legacy financial criteria excluding top innovative startups',
        'Rigid feature specifications that lock in outdated vendor technologies',
        'High upfront capital expenditure with no guarantee of real-world outcome'
      ]
    },
    {
      solution: 'InnoSetu Sandbox & Procurement Pathway',
      points: [
        'Rapid 30-day challenge-to-sandbox deployment timeline under GFR Rule 194',
        'Outcome-based qualification focusing on Solution TRL maturity rather than turnover',
        'Controlled live sandbox pilots funded via PFMS milestone escrow disbursements',
        'Independent validation by IIT/NIC panel enabling direct procurement scaling'
      ]
    }
  ];

  const govBenefits = [
    { title: 'Risk-Free Validation', desc: 'Test deep-tech solutions in real operational conditions before committing full procurement capital.', icon: '🛡️' },
    { title: 'Independent Audits', desc: 'Performance metrics verified by IIT, AIIMS, and NEERI independent experts with zero bias.', icon: '🔬' },
    { title: 'GFR Rule 194 Compliant', desc: 'Fully aligned with General Financial Rules allowing legally sound sandbox exemptions.', icon: '⚖️' },
    { title: 'Rapid Deployment', desc: 'Reduce technology deployment cycles from 18 months down to 45 days.', icon: '⚡' }
  ];

  const startupBenefits = [
    { title: 'Direct Public Access', desc: 'Bypass legacy turnover hurdles and compete directly for government contracts.', icon: '🔑' },
    { title: '100% IP Protection', desc: 'Retain full ownership of your intellectual property and algorithms under sandbox law.', icon: '🔒' },
    { title: 'Escrow Payout Security', desc: 'Milestone funds held in PFMS escrow and automatically disbursed upon KPI signoff.', icon: '💳' },
    { title: 'Nationwide Replicability', desc: 'One successful pilot opens direct procurement doors across all 31 partner departments.', icon: '🚀' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

      {/* 1. Hero Section */}
      <section className="public-hero-section" style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 60%, #1D4ED8 100%)',
        borderRadius: '20px',
        color: 'white',
        boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, rgba(15,23,42,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '880px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(249, 115, 22, 0.2)',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              color: '#FFEDD5',
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              🇮🇳 INNOSETU — GOVERNMENT INNOVATION PROCUREMENT PLATFORM
            </span>
            <span style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              color: '#6EE7B7',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>
              GFR Rule 194 Compliant
            </span>
          </div>

          <h1 className="public-hero-title" style={{
            color: '#FFFFFF',
            fontWeight: 800,
            marginBottom: '20px',
            fontFamily: 'var(--font-heading)'
          }}>
            Connecting Government Challenges with India's Innovation Ecosystem
          </h1>

          <p className="public-hero-desc" style={{
            color: '#CBD5E1',
            lineHeight: 1.6,
            marginBottom: '36px',
            maxWidth: '820px'
          }}>
            An end-to-end digital platform for identifying public-sector challenges, discovering innovative solutions, conducting pilots, measuring outcomes and enabling evidence-based procurement and scale-up.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: '#2563EB',
                padding: '14px 28px',
                fontSize: '1.05rem',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
              }}
              onClick={() => setCurrentView('public-challenges')}
            >
              🔍 Explore Challenges
            </button>

            <button
              className="btn btn-secondary btn-lg"
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                color: '#0F172A',
                padding: '14px 28px',
                fontSize: '1.05rem',
                borderRadius: '8px',
                fontWeight: 700
              }}
              onClick={() => {
                if (isAuthenticated && currentRole === 'GOVERNMENT') {
                  openModal('CREATE_CHALLENGE');
                } else {
                  notifyInfo('Government Sign-In Required', 'Please log in with official department credentials to publish procurement challenges.');
                  setCurrentView('public-login');
                }
              }}
            >
              🏛️ Post a Challenge
            </button>

            <button
              className="btn btn-outline btn-lg"
              style={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.4)',
                padding: '14px 22px',
                fontSize: '0.95rem'
              }}
              onClick={() => {
                setCurrentView('public-register');
              }}
            >
              🚀 Register as Startup
            </button>
          </div>
        </div>
      </section>

      {/* 2. Visual Representation of Pipeline */}
      <section style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '32px 28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            THE CENTRAL 9-STAGE INNOVATION LIFECYCLE
          </span>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--navy-900)', marginTop: '4px', wordBreak: 'break-word', lineHeight: 1.3 }}>
            Problem → Challenge → Startup → Evaluation → Pilot → KPI → Validation → Procurement → Scale
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))',
          gap: '10px',
          position: 'relative'
        }}>
          {pipelineSteps.map((s, idx) => (
            <div
              key={s.step}
              style={{
                background: idx === 4 ? 'var(--primary-50)' : 'var(--bg-muted)',
                border: idx === 4 ? '2px solid var(--primary-600)' : '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '16px 10px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentView('public-how-it-works')}
              title={`Click to view details about ${s.title}`}
            >
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: idx === 4 ? 'var(--primary-600)' : 'var(--navy-800)',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                {s.step}
              </div>

              <div style={{ fontSize: '1.3rem', marginBottom: '4px' }}>{s.icon}</div>

              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>
                {s.title}
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.25 }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Platform Statistics (Demo Values) */}
      <section style={{
        background: 'var(--navy-900)',
        borderRadius: '16px',
        padding: '36px 32px',
        color: 'white'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: '16px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#60A5FA', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              NATIONAL ECOSYSTEM IMPACT
            </span>
            <h2 style={{ fontSize: '1.6rem', color: 'white', marginTop: '2px' }}>
              Live Platform Statistics & Scale Metrics
            </h2>
          </div>
          <span style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(248, 113, 113, 0.4)',
            color: '#FCA5A5',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            Prototype data for demonstration
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {stats.map((st, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '18px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.3rem' }}>{st.icon}</span>
                <span style={{ fontSize: '0.7rem', color: '#34D399', background: 'rgba(16,185,129,0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                  {st.trend}
                </span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-heading)' }}>
                {st.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 500 }}>
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The Procurement Problem vs How InnoSetu Solves It */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TRANSFORMING PUBLIC PROCUREMENT IN INDIA
          </span>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--navy-900)', marginTop: '4px' }}>
            The Procurement Bottleneck & How InnoSetu Solves It
          </h2>
        </div>

        <div className="grid-cols-2">
          {/* Problem Card */}
          <div className="card" style={{ borderLeft: '4px solid var(--error-text)', background: '#FFF5F5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>❌</span>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--error-text)' }}>Traditional Public Procurement Limitations</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Legacy GFR tenders built for standardized off-the-shelf commodities</div>
              </div>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              {problemVsSolution[0].points.map((pt, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--navy-900)' }}>
                  <span style={{ color: 'var(--error-text)', fontWeight: 800 }}>•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div className="card" style={{ borderLeft: '4px solid var(--success-text)', background: '#F0FDF4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--success-text)' }}>How InnoSetu Solves It</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Outcome-based innovation sandbox pathway</div>
              </div>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              {problemVsSolution[1].points.map((pt, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--navy-900)' }}>
                  <span style={{ color: 'var(--success-text)', fontWeight: 800 }}>✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Government & Startup Benefits */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            DUAL-STAKEHOLDER ADVANTAGES
          </span>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--navy-900)', marginTop: '4px' }}>
            Built for Indian Government Departments & Deep-Tech Startups
          </h2>
        </div>

        <div className="grid-cols-2" style={{ gap: '24px' }}>
          {/* Gov Benefits Block */}
          <div className="card" style={{ background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <span style={{ fontSize: '1.6rem' }}>🏛️</span>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-900)' }}>Government Department Benefits</h3>
                <span className="badge badge-info">For IAS & Nodal Officers</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {govBenefits.map((b, idx) => (
                <div key={idx} style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{b.icon}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>{b.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Startup Benefits Block */}
          <div className="card" style={{ background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <span style={{ fontSize: '1.6rem' }}>🚀</span>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-900)' }}>Startup Innovator Benefits</h3>
                <span className="badge badge-success">For DPIIT Recognized Startups</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {startupBenefits.map((b, idx) => (
                <div key={idx} style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{b.icon}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>{b.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Success Stories Spotlight */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              PROVEN DEPLOYMENT IMPACT
            </span>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--navy-900)', marginTop: '2px' }}>
              Illustrative Prototype Case Studies
            </h2>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => setCurrentView('public-success-stories')}>
            View All Scaled Stories →
          </button>
        </div>

        <div className="grid-cols-3">
          <div className="card" style={{ position: 'relative' }}>
            <span className="badge badge-success" style={{ marginBottom: '10px' }}>SCALED NATIONALLY</span>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>RoadSense Analytics Pvt. Ltd.</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Public Works Department, Karnataka (Bengaluru Corridor)
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              AI vision sensors mounted on inspection vehicles, achieving 54.2% faster pothole defect identification.
            </p>
            <div style={{ background: 'var(--bg-muted)', padding: '10px 12px', borderRadius: '6px', fontSize: '0.8rem' }}>
              CRRI Score: <strong>98/100</strong> • Budget: <strong>₹30,00,000</strong>
            </div>
          </div>

          <div className="card">
            <span className="badge badge-success" style={{ marginBottom: '10px' }}>MULTI-STATE EXPANSION</span>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>BharatVision Labs</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Urban Development Department, Uttar Pradesh (Lucknow Wards)
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Bin fill sensor swarms and AI route optimization reduced collection truck mileage and improved vehicle capacity utilization.
            </p>
            <div style={{ background: 'var(--bg-muted)', padding: '10px 12px', borderRadius: '6px', fontSize: '0.8rem' }}>
              NIUA Score: <strong>94/100</strong> • Budget: <strong>₹25,00,000</strong>
            </div>
          </div>

          <div className="card">
            <span className="badge badge-info" style={{ marginBottom: '10px' }}>MEASUREMENT PHASE</span>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>NexGen CivicTech Pvt. Ltd.</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Ministry of Jal Shakti (Jaipur Zone-4)
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Acoustic hydrophone telemetry reduced non-revenue water loss from 36.0% down to 12.8% in urban mains.
            </p>
            <div style={{ background: 'var(--bg-muted)', padding: '10px 12px', borderRadius: '6px', fontSize: '0.8rem' }}>
              NEERI Score: <strong>96/100</strong> • Budget: <strong>₹40,00,000</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
