import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export const ResourcesPage: React.FC = () => {
  const { setCurrentView } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const resources = [
    {
      id: 'res-1',
      category: 'LEGAL',
      title: 'GFR Rule 194 Special Innovation Sandbox Provisions',
      desc: 'Official Gazette circular empowering central and state bodies to execute outcome-based trial contracts with verified startups.',
      fileType: 'PDF Document',
      fileSize: '2.4 MB',
      date: '2026-01-10'
    },
    {
      id: 'res-2',
      category: 'GOVERNMENT',
      title: 'Outcome-Based Challenge Creation Toolkit for Department Nodal Officers',
      desc: 'Standard operating procedure for converting internal operational pain points into quantifiable outcome specifications.',
      fileType: 'PDF Manual',
      fileSize: '5.1 MB',
      date: '2026-02-01'
    },
    {
      id: 'res-3',
      category: 'STARTUP',
      title: 'Startup Sandbox Eligibility & DPIIT Verification Guide',
      desc: 'Step-by-step checklist covering TRL self-declaration, IP clearance, security audits, and financial milestone disclosures.',
      fileType: 'PDF Guide',
      fileSize: '1.8 MB',
      date: '2026-01-25'
    },
    {
      id: 'res-4',
      category: 'TECHNICAL',
      title: 'PFMS Milestone Escrow & Payment API Integration Schema',
      desc: 'Open API documentation for integrating milestone verification triggers with national treasury disbursement pipelines.',
      fileType: 'JSON Schema',
      fileSize: '450 KB',
      date: '2026-03-05'
    },
    {
      id: 'res-5',
      category: 'LEGAL',
      title: 'Standard Tripartite Sandbox Trial Contract Template',
      desc: 'Legal contract template binding Department Host, Startup, and Independent Auditor under GFR Rule 194 IP protection clauses.',
      fileType: 'DOCX Document',
      fileSize: '890 KB',
      date: '2026-02-14'
    },
    {
      id: 'res-6',
      category: 'EVALUATION',
      title: 'Independent Evaluator Ethics & Scoring Rubric Standards',
      desc: 'Guideline manual for IIT and NIC expert panelists reviewing application technical feasibility, security, and cost realism.',
      fileType: 'PDF Manual',
      fileSize: '3.2 MB',
      date: '2026-01-18'
    }
  ];

  const faqs = [
    {
      q: 'What is General Financial Rules (GFR) Rule 194 and how does it protect sandbox procurement?',
      a: 'Rule 194 provides an explicit legal exemption allowing government procurement authorities to engage deep-tech startups without requiring traditional 3-year financial turnover or prior tender experience, provided the engagement is conducted as a controlled outcome-based sandbox trial.'
    },
    {
      q: 'Who retains Intellectual Property (IP) created during the sandbox trial?',
      a: 'The startup retains 100% ownership of all pre-existing IP, source code, hardware patents, and algorithms developed before or during the sandbox trial. The sponsoring department receives a perpetual, non-exclusive, royalty-free operational usage license for municipal administration.'
    },
    {
      q: 'How are milestone escrow payments verified and disbursed?',
      a: 'Grant funding is deposited in a PFMS-linked escrow account prior to trial commencement. Upon completion of each milestone, an independent auditor (such as NIUA or NEERI) conducts an on-site/telemetry inspection. Upon digital signature approval, funds disburse to the startup within 48 hours.'
    },
    {
      q: 'How can other state or central departments replicate a validated pilot?',
      a: 'Once a pilot achieves a verified independent audit score exceeding 80/100, its National Scale Certificate is registered in the Cross-Department Scale Registry. Sponsoring departments can directly execute multi-year procurement contracts without issuing a fresh RFP.'
    }
  ];

  const filteredResources = resources.filter(r => {
    if (activeCategory !== 'ALL' && r.category !== activeCategory) return false;
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase()) && !r.desc.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

      {/* Header */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
        color: 'white',
        padding: '44px 40px',
        borderRadius: '16px'
      }}>
        <span className="badge badge-info" style={{ marginBottom: '12px' }}>KNOWLEDGE CENTER</span>
        <h1 style={{ fontSize: '2.4rem', color: 'white', lineHeight: 1.2 }}>
          Guidelines, Legal Frameworks & Resources
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginTop: '14px', maxWidth: '820px', lineHeight: 1.6 }}>
          Access official GFR 194 circulars, challenge creation toolkits, API technical specifications, and legal contract templates.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <input
            type="text"
            className="form-input"
            placeholder="🔍 Search guidelines, legal circulars, API specs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, height: '44px' }}
          />

          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'LEGAL', 'GOVERNMENT', 'STARTUP', 'TECHNICAL'].map(cat => (
              <button
                key={cat}
                className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid-cols-3">
        {filteredResources.map(r => (
          <div key={r.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="badge badge-info">{r.category}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.date}</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '8px' }}>{r.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {r.desc}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.fileType} • {r.fileSize}</span>
              <button className="btn btn-outline btn-sm" onClick={() => alert(`Downloading ${r.title}`)}>
                Download ⬇️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Accordion Section */}
      <div className="card">
        <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)', marginBottom: '20px' }}>
          Frequently Asked Legal & Operational Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'var(--bg-surface-hover)',
                  border: 'none',
                  textAlign: 'left',
                  fontWeight: 700,
                  color: 'var(--navy-900)',
                  fontSize: '0.95rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <span>❓ {faq.q}</span>
                <span>{openFaq === i ? '▲' : '▼'}</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '16px 20px', fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'var(--bg-surface)', lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
