import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeClass = (str: string) => {
    const s = str.toUpperCase();
    if (s.includes('ACTIVE') || s.includes('VERIFIED') || s.includes('PASSED') || s.includes('DISBURSED') || s.includes('COMPLETED') || s.includes('EXECUTED') || s.includes('SUCCESS') || s.includes('SCALED') || s.includes('APPROVE') || s.includes('EXCEEDS')) {
      return 'badge-success';
    }
    if (s.includes('PENDING') || s.includes('REVIEW') || s.includes('EVALUATION') || s.includes('SCREENING') || s.includes('PROGRESS') || s.includes('HELD') || s.includes('MITIGATING') || s.includes('OPEN')) {
      return 'badge-warning';
    }
    if (s.includes('FAILED') || s.includes('REJECTED') || s.includes('TERMINATED') || s.includes('CANCELLED') || s.includes('FLAGGED') || s.includes('HIGH') || s.includes('CRITICAL')) {
      return 'badge-error';
    }
    return 'badge-info';
  };

  const formatText = (str: string) => {
    return str.replace(/_/g, ' ');
  };

  return (
    <span className={`badge ${getBadgeClass(status)}`}>
      <span className="badge-dot"></span>
      <span>{formatText(status)}</span>
    </span>
  );
};
