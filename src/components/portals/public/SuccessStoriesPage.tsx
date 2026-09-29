import React from 'react';
import { useApp } from '../../../context/AppContext';

export const SuccessStoriesPage: React.FC = () => {
  const { setCurrentView } = useApp();

  const successStories = [
    {
      startupName: 'BioClean Nanotech Solutions',
      category: 'Clean Water & Sanitation',
      originDept: 'Department of Jal Shakti',
      challengeTitle: 'Modular High-Throughput Removal of Arsenic & Heavy Metals from Rural Borewells',
      auditorScore: 98,
      auditorName: 'NEERI (National Environmental Engineering Research Institute)',
      annualSavings: '₹35,00,000 / year',
      impactText: 'Deploys graphene catalytic membrane filters across 4,200 rural borewells. Reduced dissolved arsenic concentration from 68 ppb down to 1.8 ppb, providing safe drinking water to 4.2 million citizens.',
      scaleDepts: ['State Water Board Bihar', 'State Water Board West Bengal', 'Ministry of Jal Shakti'],
      before: '68 ppb Arsenic (Toxic hazard to 4.2M villagers)',
      after: '1.8 ppb Arsenic (Exceeds BIS 10500 safety standards)',
      founderQuote: '"The InnoSetu sandbox allowed us to prove our graphene filters in live rural borewells with zero financial risk due to PFMS milestone escrow payouts."',
      founderName: 'Dr. Meera Kulkarni, Founder & CTO'
    },
    {
      startupName: 'RoadSense Analytics',
      category: 'Smart Infrastructure & Roads',
      originDept: 'Public Works Department, Karnataka',
      challengeTitle: 'Self-Healing Smart Road Material with Integrated Structural Health Sensing',
      auditorScore: 96,
      auditorName: 'CSIR-CRRI (Central Road Research Institute)',
      annualSavings: '₹1.2 Crore / year',
      impactText: 'Self-healing polymer asphalt with embedded micro-sensors deployed over 140km highway corridor in Lucknow. Pothole recurrence reduced by 72% and road surface lifespan extended by 4 years.',
      scaleDepts: ['National Highways Authority of India (NHAI)', 'PWD Maharashtra', 'Border Roads Organisation (BRO)'],
      before: '₹1 Crore annual reactive monsoon pothole patching costs',
      after: '72% pothole reduction & ₹1.2 Crore multi-year maintenance savings',
      founderQuote: '"Fast-tracked direct procurement scaling under GFR Rule 194 expanded our footprint across 3 major highway authorities in under 6 months."',
      founderName: 'Sanjay Raman, CEO'
    },
    {
      startupName: 'Aarohan AI Technologies Pvt. Ltd.',
      category: 'Smart Mobility & Traffic AI',
      originDept: 'Urban Development Department, Uttar Pradesh',
      challengeTitle: 'Adaptive AI-Based Traffic Flow Optimization for High-Density Corridors',
      auditorScore: 94,
      auditorName: 'NIUA (National Institute of Urban Affairs)',
      annualSavings: '₹30,00,000 / year',
      impactText: 'Edge computer vision nodes optimized traffic signal timing dynamically across 6 major arterial intersections in Lucknow. Reduced peak corridor wait times by 28.4% and accelerated emergency response by 5.2 minutes.',
      scaleDepts: ['Bengaluru Traffic Police', 'Delhi Urban Shelter Board', 'Pune Smart City'],
      before: '45 mins daily artificial rush-hour corridor congestion',
      after: '28.4% congestion reduction & 5.2 mins faster emergency transit',
      founderQuote: '"The independent IIT Delhi evaluation gave municipal officers total confidence to deploy edge AI across critical signal corridors."',
      founderName: 'Ananya Sharma, Co-founder'
    },
    {
      startupName: 'MediSetu Technologies',
      category: 'Health Tech & Telemedicine',
      originDept: 'Ministry of Health and Family Welfare',
      challengeTitle: 'Autonomous Offline AI Triage for Primary Health Centers in Remote Regions',
      auditorScore: 96,
      auditorName: 'ICMR (Indian Council of Medical Research)',
      annualSavings: '₹25,00,000 / year',
      impactText: 'Handheld offline diagnostic tablets enabled ASHA workers in 30 remote primary health centers to triage 6,420 rural patients with 95.8% clinical sensitivity.',
      scaleDepts: ['Uttarakhand State Health Society', 'Himachal Telemedicine Mission', 'NEIGRIHMS Shillong'],
      before: '62% rural diagnostic sensitivity due to doctor shortages',
      after: '95.8% diagnostic accuracy with zero internet latency',
      founderQuote: '"Offline AI execution proved essential for hill districts. The pilot signoff led directly to state-wide primary healthcare adoption."',
      founderName: 'Rohan Deshmukh, Founder'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

      {/* Header */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
        color: 'white',
        padding: '44px 40px',
        borderRadius: '16px'
      }}>
        <span className="badge badge-success" style={{ marginBottom: '12px' }}>PROVEN NATIONAL IMPACT</span>
        <h1 style={{ fontSize: '2.4rem', color: 'white', lineHeight: 1.2 }}>
          Scaled Government Procurement Success Stories
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginTop: '14px', maxWidth: '820px', lineHeight: 1.6 }}>
          Explore real-world case studies of deep-tech solutions successfully piloted in controlled sandboxes, verified by independent auditors, and scaled across public administration.
        </p>
      </div>

      {/* Aggregate Metrics Bar */}
      <div style={{
        background: 'var(--navy-900)',
        borderRadius: '12px',
        padding: '24px 32px',
        color: 'white',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#60A5FA', fontWeight: 700 }}>TOTAL ANNUAL SAVINGS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginTop: '2px' }}>₹18.6 Crore</div>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Generated across 4 scale pilots</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#60A5FA', fontWeight: 700 }}>AVERAGE AUDITOR SCORE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34D399', marginTop: '2px' }}>96.0 / 100</div>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Verified by IIT, ICMR & NEERI</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#60A5FA', fontWeight: 700 }}>REPLICATING DEPTS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginTop: '2px' }}>12+ Entities</div>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Cross-state adoption</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#60A5FA', fontWeight: 700 }}>PROCUREMENT TIME SAVED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#60A5FA', marginTop: '2px' }}>14 Months</div>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Faster than traditional RFP</div>
        </div>
      </div>

      {/* Case Studies List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {successStories.map((story, idx) => (
          <div key={idx} className="card" style={{ padding: '28px', borderLeft: '4px solid var(--success-text)' }}>

            {/* Header Meta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span className="badge badge-success">PROVEN & SCALED</span>
                  <span className="badge badge-info">{story.category}</span>
                </div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)' }}>{story.startupName}</h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary-700)', fontWeight: 600, marginTop: '2px' }}>
                  Target Challenge: {story.challengeTitle}
                </div>
              </div>

              <div style={{ background: 'var(--bg-muted)', padding: '12px 18px', borderRadius: '8px', textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Independent Score:</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success-text)' }}>
                  {story.auditorScore} / 100
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--navy-900)' }}>{story.auditorName}</div>
              </div>
            </div>

            {/* Impact Text */}
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {story.impactText}
            </p>

            {/* Before vs After Impact Box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '14px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--error-text)', fontWeight: 700 }}>BEFORE PILOT (LEGACY)</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--navy-900)', fontWeight: 600, marginTop: '4px' }}>
                  ❌ {story.before}
                </div>
              </div>

              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '14px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--success-text)', fontWeight: 700 }}>AFTER PILOT (VERIFIED IMPACT)</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--navy-900)', fontWeight: 600, marginTop: '4px' }}>
                  ✅ {story.after}
                </div>
              </div>
            </div>

            {/* Founder Quote */}
            <div style={{ background: 'var(--bg-muted)', padding: '16px 20px', borderRadius: '8px', borderLeft: '3px solid var(--primary-600)', marginBottom: '16px' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--navy-900)', fontStyle: 'italic' }}>
                {story.founderQuote}
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 600 }}>
                — {story.founderName}
              </div>
            </div>

            {/* Replicating Departments Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.825rem', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontWeight: 700, color: 'var(--navy-900)' }}>Replicated Across:</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {story.scaleDepts.map((d, i) => (
                  <span key={i} className="badge badge-neutral">🏛️ {d}</span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="card" style={{ background: 'var(--primary-50)', textAlign: 'center', padding: '36px' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--navy-900)' }}>Have a proven deep-tech solution ready for pilot testing?</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '8px 0 20px 0' }}>
          Explore open government challenges and apply for a funded sandbox trial.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => setCurrentView('public-challenges')}>
          Explore Open Challenges →
        </button>
      </div>

    </div>
  );
};
