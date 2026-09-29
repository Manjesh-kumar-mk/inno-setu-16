import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string | {
    value: string;
    isPositive?: boolean;
  };
  trendType?: 'positive' | 'negative' | 'neutral';
  accentColor?: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendType,
  accentColor = '#2563EB',
  icon
}) => {
  const trendObj = typeof trend === 'string'
    ? {
        value: trend,
        isPositive: trendType === 'positive' ? true : trendType === 'negative' ? false : undefined
      }
    : trend;

  return (
    <div className="stat-card" style={{ borderTop: `3px solid ${accentColor}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="stat-card-title">{title}</div>
        {icon && <div style={{ color: accentColor, opacity: 0.85 }}>{icon}</div>}
      </div>
      
      <div className="stat-card-value">{value}</div>

      {(subtitle || trendObj) && (
        <div className="stat-card-footer">
          {trendObj && (
            <span className={trendObj.isPositive === true ? 'stat-trend-up' : 'stat-trend-neutral'}>
              {trendObj.value}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
