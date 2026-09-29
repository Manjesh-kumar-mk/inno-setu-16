import React from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const { isNotificationOpen, setIsNotificationOpen } = useApp();

  if (!isNotificationOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'Milestone Verification Required',
      time: '10 mins ago',
      desc: 'AeroTraffic AI submitted deliverables for M2 Live Traffic Optimization Trial. Independent auditor NIUA review ready.',
      type: 'URGENT'
    },
    {
      id: 'n2',
      title: 'Expert Evaluation Submitted',
      time: '1 hour ago',
      desc: 'Prof. Anand R. Swaminathan completed scoring for Challenge CH-DTSM-08. Score: 93/100.',
      type: 'INFO'
    },
    {
      id: 'n3',
      title: 'Escrow Payment Disbursed',
      time: 'Yesterday',
      desc: '₹7,50,000 disbursed to Aarohan AI Technologies Pvt. Ltd. (Transaction Ref: PFMS-TRX-20260402).',
      type: 'SUCCESS'
    },
    {
      id: 'n4',
      title: 'Scale-Up Recommendation',
      time: '2 days ago',
      desc: 'BioClean Nanotech Solutions approved for cross-department expansion across Bihar and West Bengal.',
      type: 'SUCCESS'
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: '64px',
        right: '16px',
        width: 'min(380px, calc(100vw - 32px))',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-overlay)',
        zIndex: 90,
        overflow: 'hidden'
      }}
    >
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-muted)'
      }}>
        <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.95rem' }}>
          Official Notifications
        </div>
        <button
          onClick={() => setIsNotificationOpen(false)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
        >
          ✕
        </button>
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {notifications.map(n => (
          <div
            key={n.id}
            style={{
              padding: '14px 18px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-900)' }}>{n.title}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{n.time}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {n.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
