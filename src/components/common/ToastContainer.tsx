import React from 'react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '74px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: '100%',
        pointerEvents: 'none'
      }}
    >
      {toasts.map(toast => {
        const getStyles = () => {
          switch (toast.type) {
            case 'success':
              return { bg: '#ECFDF5', border: '#10B981', color: '#065F46', icon: '✅' };
            case 'error':
              return { bg: '#FEF2F2', border: '#EF4444', color: '#991B1B', icon: '⚠️' };
            case 'warning':
              return { bg: '#FFFBEB', border: '#F59E0B', color: '#92400E', icon: '🔔' };
            case 'info':
            default:
              return { bg: '#EFF6FF', border: '#3B82F6', color: '#1E40AF', icon: 'ℹ️' };
          }
        };

        const style = getStyles();

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              backgroundColor: style.bg,
              borderLeft: `4px solid ${style.border}`,
              borderTop: '1px solid var(--border-subtle)',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '12px 16px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
              animation: 'toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              color: style.color
            }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>{style.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.2 }}>{toast.title}</div>
                {toast.message && (
                  <div style={{ fontSize: '0.78rem', marginTop: '3px', opacity: 0.9 }}>{toast.message}</div>
                )}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '0.9rem',
                opacity: 0.7,
                padding: '0 2px'
              }}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};
