import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export const AdminDepartments: React.FC = () => {
  const { departments, addAuditEvent } = useApp();

  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  const [newDeptForm, setNewDeptForm] = useState({
    name: 'Ministry of Renewable Energy & Microgrids',
    code: 'MREM',
    ministry: 'Ministry of New & Renewable Energy',
    leadOfficial: 'Shri Vikram Sharma, IAS',
    email: 'v.sharma@mrem.gov.in',
    budgetAllocated: 18000000
  });

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    departments.push({
      id: `dept-${Date.now()}`,
      name: newDeptForm.name,
      code: newDeptForm.code,
      ministry: newDeptForm.ministry,
      leadOfficial: newDeptForm.leadOfficial,
      email: newDeptForm.email,
      budgetAllocated: Number(newDeptForm.budgetAllocated),
      budgetUtilized: 0,
      activeChallengesCount: 0,
      activePilotsCount: 0,
      scaledSolutionsCount: 0
    });
    addAuditEvent('CREATED_DEPARTMENT', newDeptForm.name);
    setIsAddDeptModalOpen(false);
    alert(`Department '${newDeptForm.name}' (${newDeptForm.code}) successfully created!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
            Government Departments Governance
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Configure participating ministries, allocated escrow budgets, and lead officials.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddDeptModalOpen(true)}>
          + Create New Department
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {departments.map(d => (
          <div key={d.id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-info" style={{ fontWeight: 800 }}>{d.code}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {d.id}</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-900)' }}>{d.name}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{d.ministry}</div>

            <div style={{ background: 'var(--bg-muted)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', border: '1px solid var(--border-color)' }}>
              <div>👤 Lead Official: <strong>{d.leadOfficial}</strong></div>
              <div>✉️ Contact: <strong>{d.email}</strong></div>
              <div>💰 Allocated Budget: <strong>₹{(d.budgetAllocated / 100000).toFixed(1)} Lakh</strong></div>
              <div>📊 Active Challenges: <strong>{d.activeChallengesCount}</strong></div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => alert(`Configuring budget for ${d.code}...`)}>
                Budget Allocation
              </button>
              <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => alert(`Editing department details for ${d.code}...`)}>
                Edit Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Department Modal */}
      {isAddDeptModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '520px', padding: '24px', background: '#fff', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy-900)' }}>🏛️ Create New Government Department</h3>
              <button onClick={() => setIsAddDeptModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleAddDepartment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Department Name</label>
                <input type="text" value={newDeptForm.name} onChange={(e) => setNewDeptForm({ ...newDeptForm, name: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Short Code</label>
                  <input type="text" value={newDeptForm.code} onChange={(e) => setNewDeptForm({ ...newDeptForm, code: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Allocated Budget (₹)</label>
                  <input type="number" value={newDeptForm.budgetAllocated} onChange={(e) => setNewDeptForm({ ...newDeptForm, budgetAllocated: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Ministry Name</label>
                <input type="text" value={newDeptForm.ministry} onChange={(e) => setNewDeptForm({ ...newDeptForm, ministry: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Lead Official Name & Title</label>
                <input type="text" value={newDeptForm.leadOfficial} onChange={(e) => setNewDeptForm({ ...newDeptForm, leadOfficial: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Official Govt Email</label>
                <input type="email" value={newDeptForm.email} onChange={(e) => setNewDeptForm({ ...newDeptForm, email: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsAddDeptModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Department</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
