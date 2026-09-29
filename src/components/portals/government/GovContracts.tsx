import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';
import { Contract } from '../../../types';

export const GovContracts: React.FC = () => {
  const { contracts, pilots, payments, setCurrentView } = useApp();
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'agreement' | 'milestones' | 'ip-data' | 'security' | 'payments' | 'amendments' | 'audit'
  >('overview');

  const selectedContract = contracts.find(c => c.id === selectedContractId) || null;
  const selectedPilot = pilots.find(p => p.challengeId === selectedContract?.challengeId || p.startupId === selectedContract?.startupId) || pilots[0];

  const getMilestoneProgressText = (contractId: string) => {
    if (contractId === 'cnt-1001') return '2 / 3 Milestones Cleared (65%)';
    if (contractId === 'cnt-1002') return '2 / 3 Milestones Cleared (80%)';
    return '4 / 4 Milestones Cleared (100%)';
  };

  const getPaymentStatusText = (contractId: string) => {
    if (contractId === 'cnt-1001') return '50% Disbursed ($192,500)';
    if (contractId === 'cnt-1002') return '70% Disbursed ($329,000)';
    return '100% Disbursed ($3.2M)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', color: 'var(--navy-900)' }}>
            Procurement Contracts & IP Registry
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Master fast-track procurement contracts, executed sandbox terms, IP rights, and digital cryptographic signatures.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => alert('Contract Schema Spec Generator Opened')}>
            + Generate Contract Spec
          </button>
          <button className="btn btn-primary" onClick={() => setCurrentView('procurement-pathway')}>
            ⚡ Procurement Pathway Engine
          </button>
        </div>
      </div>

      {/* IF NO CONTRACT IS SELECTED: SHOW CONTRACTS LIST TABLE */}
      {!selectedContract ? (
        <div className="card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--navy-900)' }}>
              Master Procurement Contract Registry ({contracts.length})
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Click any contract to open detailed contract tabs & IP specifications.
            </span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Contract ID</th>
                  <th>Challenge / Project</th>
                  <th>Startup Contractor</th>
                  <th>Value</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Milestone Progress</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map(c => (
                  <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedContractId(c.id)}>
                    <td>
                      <strong style={{ color: 'var(--primary-color)', fontFamily: 'monospace' }}>
                        {c.contractNumber}
                      </strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{c.title || 'Adaptive AI-Based Traffic Flow Optimization'}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.departmentName}</div>
                    </td>
                    <td><strong>{c.startupName}</strong></td>
                    <td><strong style={{ color: 'var(--navy-900)' }}>${c.totalContractValue.toLocaleString()}</strong></td>
                    <td style={{ fontSize: '0.825rem' }}>{c.effectiveDate}</td>
                    <td style={{ fontSize: '0.825rem' }}>{c.expiryDate}</td>
                    <td><StatusBadge status={c.status} /></td>
                    <td>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>
                        {getMilestoneProgressText(c.id)}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--success-text)', background: 'var(--success-bg)', padding: '2px 8px', borderRadius: '4px' }}>
                        {getPaymentStatusText(c.id)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedContractId(c.id);
                        }}
                      >
                        Inspect Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CONTRACT DETAIL VIEW WITH 8 TABS */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Back button & Contract Header */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedContractId(null)}
                  style={{ marginBottom: '10px' }}
                >
                  ← Back to Contracts List
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--navy-900)' }}>
                    Contract #{selectedContract.contractNumber}
                  </h3>
                  <StatusBadge status={selectedContract.status} />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Contractor: <strong>{selectedContract.startupName}</strong> | Department: <strong>{selectedContract.departmentName}</strong> | Value: <strong>${selectedContract.totalContractValue.toLocaleString()}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-outline btn-sm" onClick={() => alert(`Downloading signed PDF document for ${selectedContract.contractNumber}`)}>
                  📥 Executed PDF
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setCurrentView('procurement-pathway')}>
                  ⚡ Route Assessment
                </button>
              </div>
            </div>

            {/* 8 TAB NAVIGATION BAR */}
            <div className="tabs" style={{
              borderBottom: '2px solid var(--border-color)',
              marginTop: '20px',
              paddingBottom: '2px'
            }}>
              {[
                { id: 'overview', label: '1. Overview' },
                { id: 'agreement', label: '2. Agreement' },
                { id: 'milestones', label: '3. Milestones' },
                { id: 'ip-data', label: '4. IP & Data' },
                { id: 'security', label: '5. Security' },
                { id: 'payments', label: '6. Payments' },
                { id: 'amendments', label: '7. Amendments' },
                { id: 'audit', label: '8. Audit Trail' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '10px 16px',
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    fontSize: '0.875rem',
                    color: activeTab === tab.id ? 'var(--primary-color)' : 'var(--text-secondary)',
                    borderBottom: activeTab === tab.id ? '3px solid var(--primary-color)' : '3px solid transparent',
                    background: 'transparent',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid-cols-2">
              <div className="card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
                  📋 Contract Specifications & Metadata
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', fontSize: '0.85rem' }}>
                  <div><span style={{ color: 'var(--text-muted)' }}>Contract Reference:</span> <br /><strong>{selectedContract.contractNumber}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Contract Type:</span> <br /><strong>{selectedContract.contractType}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Effective Date:</span> <br /><strong>{selectedContract.effectiveDate}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Expiry Date:</span> <br /><strong>{selectedContract.expiryDate}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Total Financial Value:</span> <br /><strong style={{ color: 'var(--success-text)' }}>${selectedContract.totalContractValue.toLocaleString()}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Legal Framework:</span> <br /><strong>GFR 2017 Rule 194</strong></div>
                </div>
              </div>

              <div className="card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
                  ✍️ Counterparty Signatories & Hashes
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                  <div style={{ background: 'var(--bg-muted)', padding: '10px', borderRadius: '6px' }}>
                    <strong>Government Signatory:</strong> Dr. Rajesh Vardhan, IAS (Head of Department)
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Digital Cert: SHA256:4a9c8b...109e</div>
                  </div>
                  <div style={{ background: 'var(--bg-muted)', padding: '10px', borderRadius: '6px' }}>
                    <strong>Startup Signatory:</strong> Founder & CEO, {selectedContract.startupName}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Digital Cert: SHA256:e8f12a...77b4</div>
                  </div>
                  <div style={{ background: 'var(--bg-muted)', padding: '10px', borderRadius: '6px' }}>
                    <strong>Independent Auditor Witness:</strong> Lead Audit Officer (NIUA / ICMR)
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verification Status: VERIFIED</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AGREEMENT */}
          {activeTab === 'agreement' && (
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
                📜 Executed Legal Clauses & Sandbox Terms
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedContract.clauses.map((clause, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
                      Clause {idx + 1}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {clause}
                    </div>
                  </div>
                ))}
                <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px', borderLeft: '4px solid var(--success-text)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
                    Fast-Track Procurement Conversion Addendum
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Upon achieving independent verification of pilot KPIs with &gt;90% success score, the procuring entity holds statutory right under GFR Rule 194 to transition this agreement directly into a multi-year commercial deployment contract.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MILESTONES */}
          {activeTab === 'milestones' && (
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '14px' }}>
                🎯 Contract Milestones & Deliverables Schedule
              </h4>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Milestone Ref</th>
                      <th>Deliverable Description</th>
                      <th>Due Date</th>
                      <th>Payout %</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPilot.milestones.map((m) => (
                      <tr key={m.id}>
                        <td><strong>{m.title}</strong></td>
                        <td style={{ fontSize: '0.825rem' }}>
                          {m.description}
                          <div style={{ marginTop: '4px', color: 'var(--primary-color)', fontSize: '0.78rem' }}>
                            Deliverables: {m.deliverables.join(', ')}
                          </div>
                        </td>
                        <td style={{ fontSize: '0.825rem' }}>{m.dueDate}</td>
                        <td><strong>{m.payoutPercentage}%</strong></td>
                        <td><strong style={{ color: 'var(--success-text)' }}>${m.payoutAmount.toLocaleString()}</strong></td>
                        <td><StatusBadge status={m.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: IP & DATA (STRUCTURED SECTIONS REQUIREMENT) */}
          {activeTab === 'ip-data' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ padding: '20px', borderTop: '4px solid var(--primary-color)' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--navy-900)', marginBottom: '6px' }}>
                  🔐 Intellectual Property & Data Governance Framework
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Clear contractual separation of background IP, pilot innovation co-creation, government data sovereignty, and permitted sandbox operational uses.
                </p>
              </div>

              <div className="grid-cols-2">
                {/* 1. Pre-existing IP */}
                <div className="card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🏛️</span>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-900)' }}>1. Pre-existing IP (Background IP)</h4>
                  </div>
                  <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', paddingLeft: '18px', margin: 0, lineHeight: 1.5 }}>
                    <li><strong>Startup Ownership:</strong> {selectedContract.startupName} retains 100% full legal ownership of core proprietary algorithms, pre-existing patents, ML neural network weights, and software architectures created prior to pilot contract execution.</li>
                    <li><strong>Government Background Assets:</strong> Government retains exclusive ownership of existing municipal GIS maps, traffic historical databases, and departmental legacy APIs provided to the sandbox environment.</li>
                  </ul>
                </div>

                {/* 2. Pilot-developed IP */}
                <div className="card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>💡</span>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-900)' }}>2. Pilot-developed IP (Foreground IP)</h4>
                  </div>
                  <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', paddingLeft: '18px', margin: 0, lineHeight: 1.5 }}>
                    <li><strong>Commercial Rights:</strong> Startup owns all derivative software updates and hardware improvements developed during the sandbox trial.</li>
                    <li><strong>Government Operational License:</strong> Procuring department receives a perpetual, non-exclusive, royalty-free license to utilize the solution within municipal operational boundaries without ongoing software patent claims.</li>
                  </ul>
                </div>

                {/* 3. Government Data */}
                <div className="card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🇮🇳</span>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-900)' }}>3. Government Data & Sovereignty</h4>
                  </div>
                  <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', paddingLeft: '18px', margin: 0, lineHeight: 1.5 }}>
                    <li><strong>Ownership:</strong> All citizen telemetry, sensor video feeds, health records, and municipal log data remain 100% exclusive property of the Government of India.</li>
                    <li><strong>Data Sovereignty:</strong> Strictly no data host or cloud server located outside national sovereign borders. Compliant with Digital Personal Data Protection (DPDP) Act 2023.</li>
                  </ul>
                </div>

                {/* 4. Data Access */}
                <div className="card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🔑</span>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-900)' }}>4. Data Access Protocols</h4>
                  </div>
                  <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', paddingLeft: '18px', margin: 0, lineHeight: 1.5 }}>
                    <li><strong>API Authorization:</strong> Access restricted to secure OAuth2 / mTLS token-authenticated REST & gRPC streams.</li>
                    <li><strong>Role-Based Access Control (RBAC):</strong> Anonymized telemetry access granted strictly for sandbox training and metric computation; direct access to PII (Personally Identifiable Information) strictly blocked.</li>
                  </ul>
                </div>

                {/* 5. Data Retention */}
                <div className="card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>⏳</span>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-900)' }}>5. Data Retention & Purge Protocol</h4>
                  </div>
                  <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', paddingLeft: '18px', margin: 0, lineHeight: 1.5 }}>
                    <li><strong>Post-Trial Sandbox Purge:</strong> Upon pilot completion or termination, startup must execute a certified 7-pass cryptographic data purge of all temporary sandbox caches within 30 days.</li>
                    <li><strong>Audit Retention:</strong> Metric calculation logs retained in immutable state storage for 7 years for C&AG public audit compliance.</li>
                  </ul>
                </div>

                {/* 6. Permitted Use */}
                <div className="card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>⚖️</span>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-900)' }}>6. Permitted Use Boundaries</h4>
                  </div>
                  <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', paddingLeft: '18px', margin: 0, lineHeight: 1.5 }}>
                    <li><strong>Trial Scope:</strong> Data provided to startup may solely be utilized to execute testbed parameters specified in Contract #{selectedContract.contractNumber}.</li>
                    <li><strong>Prohibited Use:</strong> Strictly forbidden to use government sandbox datasets for training third-party commercial AI models outside this contract without explicit Steering Committee written authorization.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY */}
          {activeTab === 'security' && (
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
                🛡️ Cybersecurity Clearance & Infrastructure Audit
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px' }}>
                  <strong style={{ fontSize: '0.85rem' }}>VAPT Penetration Test:</strong>
                  <div style={{ color: 'var(--success-text)', fontWeight: 700, marginTop: '4px' }}>PASSED (Zero Critical Vulns)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Audited by CERT-In Impaneled Lab</div>
                </div>
                <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px' }}>
                  <strong style={{ fontSize: '0.85rem' }}>Encryption Standard:</strong>
                  <div style={{ color: 'var(--navy-900)', fontWeight: 700, marginTop: '4px' }}>AES-256 & TLS 1.3</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>At-rest & in-transit telemetry</div>
                </div>
                <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px' }}>
                  <strong style={{ fontSize: '0.85rem' }}>Data Sovereignty:</strong>
                  <div style={{ color: 'var(--success-text)', fontWeight: 700, marginTop: '4px' }}>VERIFIED (India Region Cloud)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Meets MeitY Cloud Mandate</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
                💳 Contract Payout & Escrow Allocation
              </h4>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', fontSize: '0.85rem' }}>
                <div>Total Contract Value: <strong>${selectedContract.totalContractValue.toLocaleString()}</strong></div>
                <div>Released to Date: <strong style={{ color: 'var(--success-text)' }}>$192,500</strong></div>
                <div>Held in Escrow: <strong style={{ color: 'var(--warning-text)' }}>$134,750</strong></div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setCurrentView('payments')}>
                👉 Open Full PFMS Treasury Gateway & Payout Ledger
              </button>
            </div>
          )}

          {/* TAB 7: AMENDMENTS */}
          {activeTab === 'amendments' && (
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
                📝 Contract Amendment Log
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                No formal budget or scope amendments recorded for contract #{selectedContract.contractNumber}. Original terms active.
              </p>
            </div>
          )}

          {/* TAB 8: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
                ⛓️ Immutable Cryptographic Audit Log
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.825rem' }}>
                <div style={{ background: 'var(--bg-muted)', padding: '10px', borderRadius: '6px' }}>
                  <strong>2026-03-01 09:30 AM:</strong> Contract Generated & Signed by {selectedContract.startupName}. Hash: <code>SHA256:7a9c...101a</code>
                </div>
                <div style={{ background: 'var(--bg-muted)', padding: '10px', borderRadius: '6px' }}>
                  <strong>2026-04-02 10:15 AM:</strong> Milestone M1 Verified by NIUA Auditor. Hash: <code>SHA256:88e1...440c</code>
                </div>
                <div style={{ background: 'var(--bg-muted)', padding: '10px', borderRadius: '6px' }}>
                  <strong>2026-04-03 09:10 AM:</strong> Milestone M1 Escrow Payout Disbursed via PFMS. Hash: <code>SHA256:11a4...902d</code>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
