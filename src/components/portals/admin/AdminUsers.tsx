import React, { useState } from 'react';

export const AdminUsers: React.FC = () => {
  const [userRoleFilter, setUserRoleFilter] = useState<string>('ALL');

  const mockUsersList = [
    { id: 'usr-101', name: 'Dr. Rajesh Vardhan, IAS', email: 'r.vardhan@dtsm.gov.in', role: 'GOVERNMENT', department: 'Transportation', status: 'ACTIVE' },
    { id: 'usr-102', name: 'Vikramaditya Nair', email: 'contact@aerotraffic.ai', role: 'STARTUP', company: 'AeroTraffic AI', status: 'ACTIVE' },
    { id: 'usr-103', name: 'Prof. Anand R. Swaminathan', email: 'a.swaminathan@iitd.ac.in', role: 'EXPERT', institution: 'IIT Delhi', status: 'ACTIVE' },
    { id: 'usr-104', name: 'Sanjay Krishnan', email: 's.krishnan@admin.gov.in', role: 'ADMINISTRATOR', department: 'Central Admin', status: 'ACTIVE' },
    { id: 'usr-105', name: 'Dr. Ananya Sen', email: 'a.sen@health.gov.in', role: 'GOVERNMENT', department: 'Public Health', status: 'ACTIVE' },
    { id: 'usr-106', name: 'Dr. Meera Kulkarni', email: 'info@biocleannano.com', role: 'STARTUP', company: 'BioClean Nanotech', status: 'ACTIVE' }
  ];

  const filteredUsers = mockUsersList.filter(u => userRoleFilter === 'ALL' || u.role === userRoleFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
            User & Role Management
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Platform access controls for Government officials, Startups, Experts, and Administrators.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => alert('Opening Add User Dialog...')}>
          + Add New Platform User
        </button>
      </div>

      <div className="card" style={{ padding: '20px' }}>
        {/* Role Filter Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          {['ALL', 'GOVERNMENT', 'STARTUP', 'EXPERT', 'ADMINISTRATOR'].map(r => (
            <button
              key={r}
              onClick={() => setUserRoleFilter(r)}
              className={`btn ${userRoleFilter === r ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            >
              {r}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredUsers.map(u => (
            <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--bg-muted)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.9rem' }}>{u.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {u.email} • Role: <strong>{u.role}</strong> • Organization: <strong>{u.department || u.company || u.institution}</strong>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="badge badge-success">{u.status}</span>
                <button className="btn btn-outline btn-sm" onClick={() => alert(`Editing permissions for ${u.name}...`)}>
                  Edit Permissions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
