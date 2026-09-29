import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';

export const StartupCompanyProfile: React.FC = () => {
  const { startups } = useApp();
  const startup = startups[0] || {};
  const [activeTab, setActiveTab] = useState<
    'info' | 'team' | 'technology' | 'capabilities' | 'projects' | 'govexp' | 'certs' | 'docs'
  >('info');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Profile Header */}
      <div className="card" style={{ background: 'var(--navy-900)', color: '#fff', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-info" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                DPIIT Reg: {startup.dpiitRegistrationNumber || 'DPIIT-ST-881920'}
              </span>
              <StatusBadge status={startup.securityClearanceStatus || 'VERIFIED'} />
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '4px 0', color: '#fff' }}>
              {startup.name || 'AeroTraffic AI Systems Ltd.'}
            </h1>
            <div style={{ fontSize: '0.875rem', opacity: 0.85 }}>
              HQ: {startup.headquarters || 'Bengaluru, Karnataka'} • TRL Level: {startup.readinessLevel || 'TRL-7'} • Category: {startup.category || 'SmartMobility'}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>
              {startup.pastGovContractsCount || 3} Executed Contracts
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Past B2G Record</div>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs (8 required sections) */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '2px solid var(--border-color)', overflowX: 'auto' }}>
        {[
          { id: 'info', label: '🏢 Company Information' },
          { id: 'team', label: '👥 Team & Leadership' },
          { id: 'technology', label: '⚡ Technology & Stack' },
          { id: 'capabilities', label: '🛠️ Core Capabilities' },
          { id: 'projects', label: '🚀 Past Projects' },
          { id: 'govexp', label: '🏛️ Government Experience' },
          { id: 'certs', label: '📜 Certifications' },
          { id: 'docs', label: '📁 Verified Documents' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === tab.id ? '3px solid var(--primary-600)' : '3px solid transparent',
              color: activeTab === tab.id ? 'var(--primary-700)' : 'var(--text-muted)',
              fontWeight: activeTab === tab.id ? 700 : 500,
              cursor: 'pointer',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: COMPANY INFORMATION */}
      {activeTab === 'info' && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '16px' }}>Company Overview & Statutory Details</h3>
          <div className="grid-cols-2">
            <div className="form-group">
              <label className="form-label">DPIIT Registration Number</label>
              <input className="form-input" value={startup.dpiitRegistrationNumber || 'DPIIT-ST-881920'} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Corporate Identification Number (CIN)</label>
              <input className="form-input" value={startup.cinOrTaxId || 'U72900KA2021PTC148920'} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Founding Year</label>
              <input className="form-input" value={startup.foundingYear || 2021} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Founder & CEO</label>
              <input className="form-input" value={startup.founderName || 'Dr. Vikramaditya Rao'} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Primary Email</label>
              <input className="form-input" value={startup.email || 'contact@aerotraffic.ai'} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Official Phone</label>
              <input className="form-input" value={startup.phone || '+91 80 4912 8800'} readOnly />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '12px' }}>
            <label className="form-label">Entity Mission Statement</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={startup.description || 'AeroTraffic AI Systems builds edge-computing computer vision frameworks for real-time urban signal synchronization and autonomous drone telemetry.'}
              readOnly
            />
          </div>
        </div>
      )}

      {/* SECTION 2: TEAM */}
      {activeTab === 'team' && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '16px' }}>Key Technical & Leadership Personnel</h3>
          <div className="grid-cols-2">
            {[
              { name: 'Dr. Vikramaditya Rao', title: 'Founder & CEO', bio: 'Ex-IISc AI Researcher, 12 years experience in edge vision algorithms and urban transport engineering.' },
              { name: 'Priya Sundaram', title: 'Chief Technology Officer', bio: 'Specialist in hardware root of trust encryption, TensorRT compilation, and ROS2 autonomous systems.' },
              { name: 'Rajesh Kulkarni', title: 'VP of Government Relations', bio: 'Former Smart Cities Mission consultant with 15 years experience in B2G procurement governance.' },
              { name: 'Ananya Deshmukh', title: 'Lead Field Systems Engineer', bio: 'Deployed 40+ municipal traffic edge nodes across Karnataka and Maharashtra.' }
            ].map((member, i) => (
              <div key={i} style={{ border: '1px solid var(--border-color)', padding: '16px', borderRadius: '8px', background: 'var(--bg-muted)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{member.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-700)', fontWeight: 600, marginBottom: '6px' }}>{member.title}</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>{member.bio}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: TECHNOLOGY */}
      {activeTab === 'technology' && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '16px' }}>Technology Readiness & Stack</h3>
          <div className="grid-cols-2" style={{ marginBottom: '16px' }}>
            <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Validated Readiness Level</div>
              <strong style={{ fontSize: '1.2rem', color: 'var(--primary-700)' }}>{startup.readinessLevel || 'TRL-7'}</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>System Demonstrated in Operational Environment</div>
            </div>
            <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Patents & IP Filings</div>
              <strong style={{ fontSize: '1.2rem', color: 'var(--success-text)' }}>4 Granted / Filings</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% Proprietary Indian IP</div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Core Tech Stack</label>
            <input className="form-input" value="PyTorch, TensorRT, ROS2, C++20, Edge Kubernetes, Hardware Root of Trust" readOnly />
          </div>
        </div>
      )}

      {/* SECTION 4: CAPABILITIES */}
      {activeTab === 'capabilities' && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '16px' }}>Core Engineering Capabilities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              'Sub-10ms Real-time Edge Traffic Signal Tuning',
              'Hardware Root of Trust Cryptographic Data Tamper-Proofing',
              'Multi-Camera Vehicle Recognition & License Plate Detection',
              'Autonomous UAV Flight Path & Cold-Chain Telemetry Sensing',
              'B2G API Integration with Municipal Command Centers',
              'Independent Auditor Real-time Verification Streaming'
            ].map((cap, i) => (
              <div key={i} style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                ⚡ {cap}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: PAST PROJECTS */}
      {activeTab === 'projects' && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '16px' }}>Completed Commercial & Sandbox Projects</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'Bengaluru ORR Smart Signal Optimization Trial', client: 'BBMP Smart City Cell', outcome: '22% reduction in corridor congestion', budget: '₹18,00,000' },
              { title: 'Pune Metro Line 2 Drone Surveying Telemetry', client: 'Pune Metro Rail Corp', outcome: 'Automated 3D site progression logs', budget: '₹12,00,000' }
            ].map((p, i) => (
              <div key={i} style={{ border: '1px solid var(--border-color)', padding: '14px', borderRadius: '8px', background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem' }}>
                  <span>{p.title}</span>
                  <span style={{ color: 'var(--primary-700)' }}>{p.budget}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Client: {p.client}</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--success-text)', fontWeight: 600, marginTop: '4px' }}>Outcome: {p.outcome}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: GOVERNMENT EXPERIENCE */}
      {activeTab === 'govexp' && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '16px' }}>Government Procurement & Execution Record</h3>
          <div style={{ background: 'var(--bg-muted)', padding: '16px', borderRadius: '8px', fontSize: '0.875rem' }}>
            <div><strong>Past Contracts Executed:</strong> 3 Central/State Ministry Sandbox Trials</div>
            <div><strong>PFMS Direct Benefit Disbursement Clearance:</strong> Clean Record</div>
            <div><strong>Blacklisting Status:</strong> Nil (Clean Legal Affidavit on Record)</div>
          </div>
        </div>
      )}

      {/* SECTION 7: CERTIFICATIONS */}
      {activeTab === 'certs' && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '16px' }}>ISO & Statutory Certifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { cert: 'ISO 27001:2022 Information Security Management', valid: 'Valid thru 2027' },
              { cert: 'ISO 9001:2015 Quality Management System', valid: 'Valid thru 2026' },
              { cert: 'DPIIT Recognized Deep-Tech Entity Status', valid: 'Permanent Status' }
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>📜 {c.cert}</span>
                <span style={{ color: 'var(--success-text)', fontWeight: 600, fontSize: '0.8rem' }}>{c.valid}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 8: DOCUMENTS */}
      {activeTab === 'docs' && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '16px' }}>Uploaded Verification Passport Documents</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { doc: 'DPIIT Recognition Certificate (DPIIT-ST-881920.pdf)', date: 'Verified Mar 2024' },
              { doc: 'Audited Financial Statements (AUDITED_FY25.pdf)', date: 'Verified Sep 2025' },
              { doc: 'ISO 27001 Security Audit Certificate (ISO27001_CERT.pdf)', date: 'Verified Nov 2025' }
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>📄 {d.doc}</span>
                <span className="badge badge-success">{d.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
