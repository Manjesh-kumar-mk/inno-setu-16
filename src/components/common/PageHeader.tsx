import React from 'react';
import { useApp } from '../../context/AppContext';

interface BreadcrumbItem {
  label: string;
  viewId?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  stageTag?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  stageTag,
  actions
}) => {
  const { currentRole, setCurrentView } = useApp();

  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: currentRole + ' Portal', viewId: 'dashboard' },
    { label: title }
  ];

  const items = breadcrumbs || defaultBreadcrumbs;

  return (
    <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        {items.map((b, idx) => (
          <React.Fragment key={idx}>
            {b.viewId ? (
              <button
                onClick={() => setCurrentView(b.viewId!)}
                style={{ background: 'none', border: 'none', padding: 0, color: 'var(--primary-600)', cursor: 'pointer', fontSize: 'inherit', fontWeight: 500 }}
              >
                {b.label}
              </button>
            ) : (
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{b.label}</span>
            )}
            {idx < items.length - 1 && <span style={{ color: 'var(--border-strong)' }}>/</span>}
          </React.Fragment>
        ))}
      </nav>

      {/* Main Title Row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-900)', letterSpacing: '-0.02em', margin: 0 }}>
              {title}
            </h1>
            {stageTag && (
              <span style={{
                background: '#DBEAFE',
                color: '#1E40AF',
                border: '1px solid #93C5FD',
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}>
                STAGE: {stageTag}
              </span>
            )}
          </div>
          {subtitle && (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '900px' }}>
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
