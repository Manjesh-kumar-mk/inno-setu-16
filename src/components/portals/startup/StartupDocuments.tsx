import React from 'react';

export const StartupDocuments: React.FC = () => {
  const documentCategories = [
    {
      category: 'DPIIT & Statutory Governance',
      docs: [
        { name: 'DPIIT Recognition Certificate', date: '2024-03-15', status: 'VERIFIED ✓', ref: 'DPIIT-ST-881920.pdf' },
        { name: 'Certificate of Incorporation (CIN)', date: '2021-06-10', status: 'VERIFIED ✓', ref: 'U72900KA2021PTC148920.pdf' },
        { name: 'GST & PAN Registration Card', date: '2021-07-01', status: 'VERIFIED ✓', ref: 'GSTIN29AAACA9012F.pdf' }
      ]
    },
    {
      category: 'Financial & Audit Clearances',
      docs: [
        { name: 'Audited Financial Statements FY 2024-25', date: '2025-09-30', status: 'VERIFIED ✓', ref: 'AUDITED_FY25.pdf' },
        { name: 'Audited Financial Statements FY 2023-24', date: '2024-09-28', status: 'VERIFIED ✓', ref: 'AUDITED_FY24.pdf' },
        { name: 'Chartered Accountant Net Worth Certificate', date: '2026-04-12', status: 'VERIFIED ✓', ref: 'CA_NETWORTH_CERT.pdf' }
      ]
    },
    {
      category: 'Cyber Security & ISO Certifications',
      docs: [
        { name: 'ISO 27001 Security Audit Certificate', date: '2025-11-20', status: 'VERIFIED ✓', ref: 'ISO27001_CERT.pdf' },
        { name: 'CERT-In Vulnerability Assessment Report', date: '2026-02-14', status: 'VERIFIED ✓', ref: 'CERTIN_REPORT.pdf' }
      ]
    },
    {
      category: 'Intellectual Property & Patents',
      docs: [
        { name: 'Patent Grant: Edge Vision Optimization (IN-2024-91024)', date: '2024-10-05', status: 'GRANTED ✓', ref: 'PATENT_GRANT_91024.pdf' },
        { name: 'Patent Application: Cryptographic Telemetry Seal', date: '2025-05-18', status: 'PENDING EXAMINATION', ref: 'PATENT_APP_2025.pdf' }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span className="badge badge-info" style={{ marginBottom: '6px' }}>Enterprise Document Vault</span>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-900)' }}>
            Compliance & Document Vault
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            DPIIT startup passport credentials, security clearance certificates, and financial audit files.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => alert('Upload document modal launched.')}>
          + Upload Document
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {documentCategories.map((cat, idx) => (
          <div key={idx} className="card">
            <h3 className="card-title" style={{ marginBottom: '14px', fontSize: '1.05rem', color: 'var(--navy-900)' }}>
              📁 {cat.category}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cat.docs.map((doc, dIdx) => (
                <div key={dIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'var(--bg-muted)', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{doc.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>File: {doc.ref} • Verified: {doc.date}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>{doc.status}</span>
                    <button className="btn btn-outline btn-sm" onClick={() => alert(`Downloading ${doc.ref}`)}>Download</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
