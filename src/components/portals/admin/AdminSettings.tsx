import React, { useState } from 'react';

export const AdminSettings: React.FC = () => {
  const [activeSettingsTab, setActiveSettingsTab] = useState<'CONFIG' | 'NOTIFICATIONS' | 'ROLES' | 'SECURITY' | 'PREFERENCES'>('CONFIG');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Platform Settings & Configuration
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Manage platform parameters, notification triggers, security controls, and role matrices.
        </p>
      </div>

      <div className="card" style={{ padding: '20px' }}>
        {/* Settings Navigation Tabs for 5 Required Categories */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {[
            { id: 'CONFIG', label: '1. Platform Config' },
            { id: 'NOTIFICATIONS', label: '2. Notifications' },
            { id: 'ROLES', label: '3. Roles & Permissions' },
            { id: 'SECURITY', label: '4. Security' },
            { id: 'PREFERENCES', label: '5. System Preferences' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSettingsTab(tab.id as any)}
              className={`btn ${activeSettingsTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category 1: Platform Configuration */}
        {activeSettingsTab === 'CONFIG' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '4px', color: 'var(--navy-900)' }}>Platform Name</label>
              <input type="text" defaultValue="InnoSetu Government Innovation Procurement Platform" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '4px', color: 'var(--navy-900)' }}>General Financial Rules (GFR) Default Standard</label>
              <input type="text" defaultValue="GFR 2017 Rule 194 (Fast-Track Innovation Procurement)" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '4px', color: 'var(--navy-900)' }}>Max Default Sandbox Funding Cap (₹)</label>
              <input type="number" defaultValue={5000000} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
            </div>
            <button className="btn btn-primary" onClick={() => alert('Platform Configuration Saved!')}>Save Config</button>
          </div>
        )}

        {/* Category 2: Notifications */}
        {activeSettingsTab === 'NOTIFICATIONS' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
              <input type="checkbox" defaultChecked /> Send instant email alert on new RFP challenge publication
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
              <input type="checkbox" defaultChecked /> SMS notification to founders on milestone escrow approval
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
              <input type="checkbox" defaultChecked /> Audit log anomaly alerts to System Administrators
            </label>
            <button className="btn btn-primary" onClick={() => alert('Notification preferences saved!')} style={{ marginTop: '10px' }}>Save Notifications</button>
          </div>
        )}

        {/* Category 3: Roles & Permissions */}
        {activeSettingsTab === 'ROLES' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-900)' }}>Access Matrix Overview:</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-muted)', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '8px 12px' }}>Role</th>
                  <th style={{ padding: '8px 12px' }}>Create Challenge</th>
                  <th style={{ padding: '8px 12px' }}>Submit Score</th>
                  <th style={{ padding: '8px 12px' }}>Approve Milestone</th>
                  <th style={{ padding: '8px 12px' }}>Admin Config</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px', fontWeight: 600 }}>Government Official</td><td style={{ padding: '8px 12px' }}>✓</td><td style={{ padding: '8px 12px' }}>—</td><td style={{ padding: '8px 12px' }}>✓</td><td style={{ padding: '8px 12px' }}>—</td></tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px', fontWeight: 600 }}>Expert Panelist</td><td style={{ padding: '8px 12px' }}>—</td><td style={{ padding: '8px 12px' }}>✓</td><td style={{ padding: '8px 12px' }}>✓</td><td style={{ padding: '8px 12px' }}>—</td></tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px', fontWeight: 600 }}>Startup Founder</td><td style={{ padding: '8px 12px' }}>—</td><td style={{ padding: '8px 12px' }}>—</td><td style={{ padding: '8px 12px' }}>—</td><td style={{ padding: '8px 12px' }}>—</td></tr>
                <tr><td style={{ padding: '8px 12px', fontWeight: 600 }}>Administrator</td><td style={{ padding: '8px 12px' }}>✓</td><td style={{ padding: '8px 12px' }}>✓</td><td style={{ padding: '8px 12px' }}>✓</td><td style={{ padding: '8px 12px' }}>✓</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Category 4: Security */}
        {activeSettingsTab === 'SECURITY' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '600px' }}>
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '4px', color: 'var(--navy-900)' }}>Session Timeout (Minutes)</label>
              <input type="number" defaultValue={30} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '4px', color: 'var(--navy-900)' }}>IP Whitelisting CIDR (GovNet Subnet)</label>
              <input type="text" defaultValue="10.240.0.0/16, 192.168.1.0/24" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
              <input type="checkbox" defaultChecked /> Require Hardware TOTP 2-Factor Authentication for Admin & Government roles
            </label>
            <button className="btn btn-primary" onClick={() => alert('Security settings saved!')}>Save Security Controls</button>
          </div>
        )}

        {/* Category 5: System Preferences */}
        {activeSettingsTab === 'PREFERENCES' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '600px' }}>
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '4px', color: 'var(--navy-900)' }}>Default Currency Display</label>
              <select style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} defaultValue="INR">
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '4px', color: 'var(--navy-900)' }}>Date Format</label>
              <select style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <option value="YYYY-MM-DD">YYYY-MM-DD (ISO 8601)</option>
                <option value="DD-MM-YYYY">DD/MM/YYYY</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={() => alert('System preferences saved!')}>Save Preferences</button>
          </div>
        )}
      </div>
    </div>
  );
};
