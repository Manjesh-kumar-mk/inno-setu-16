import React from 'react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusValue?: string;
  onStatusChange?: (value: string) => void;
  statusOptions?: FilterOption[];
  primaryActionText?: string;
  onPrimaryAction?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchPlaceholder = 'Search records by name, code or keyword...',
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
  statusOptions,
  primaryActionText,
  onPrimaryAction
}) => {
  return (
    <div className="card" style={{ padding: '14px 18px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 220px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: '400px', width: '100%' }}>
            <input
              type="text"
              className="form-input"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            >
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>

          {statusOptions && onStatusChange && (
            <select
              className="form-select"
              value={statusValue}
              onChange={(e) => onStatusChange(e.target.value)}
              style={{ width: 'auto', flex: '1 1 150px' }}
            >
              <option value="ALL">All Statuses</option>
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
        </div>

        {primaryActionText && onPrimaryAction && (
          <button className="btn btn-primary" onClick={onPrimaryAction} style={{ flexShrink: 0 }}>
            + {primaryActionText}
          </button>
        )}
      </div>
    </div>
  );
};
