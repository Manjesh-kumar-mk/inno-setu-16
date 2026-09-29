import React from 'react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentRole, currentView, setCurrentView, isSidebarOpen, setIsSidebarOpen } = useApp();

  // Public website does not use the internal dashboard sidebar
  if (currentRole === 'PUBLIC') {
    return null;
  }

  const getItemIcon = (id: string) => {
    switch (id) {
      case 'dashboard':
        return '📊';
      case 'challenges':
      case 'discover-challenges':
        return '🎯';
      case 'discovery':
      case 'recommended':
        return '🚀';
      case 'applications':
      case 'my-applications':
      case 'shortlisted':
        return '📄';
      case 'evaluation':
      case 'assigned-evaluations':
      case 'evaluation-history':
        return '🔬';
      case 'pilots':
      case 'active-pilots':
      case 'pilot-reviews':
        return '⚡';
      case 'milestones':
        return '🚩';
      case 'contracts':
        return '📜';
      case 'procurement-pathway':
        return '🏛️';
      case 'payments':
        return '💳';
      case 'performance':
      case 'kpi-validation':
        return '📈';
      case 'scale-up':
        return '🌐';
      case 'reports':
      case 'analytics':
        return '📑';
      case 'templates':
        return '📑';
      case 'risk':
        return '🛡️';
      case 'audit':
        return '🔗';
      case 'settings':
        return '⚙️';
      case 'users':
        return '👥';
      case 'departments':
        return '🏢';
      case 'startups':
        return '🏢';
      case 'experts':
        return '🎓';
      case 'documents':
        return '📁';
      case 'company-profile':
        return '🏢';
      default:
        return '📌';
    }
  };

  const getGovNavItems = () => [
    { id: 'dashboard', label: 'Dashboard', badge: null },
    { id: 'challenges', label: 'Outcome Challenges', badge: '5' },
    { id: 'discovery', label: 'Startup Discovery', badge: '12' },
    { id: 'applications', label: 'Applications', badge: '8' },
    { id: 'evaluation', label: 'Expert Evaluation', badge: '4' },
    { id: 'pilots', label: 'Sandbox / Pilots', badge: '3' },
    { id: 'milestones', label: 'Milestones & KPI', badge: '2' },
    { id: 'contracts', label: 'Contracts & IP', badge: '3' },
    { id: 'procurement-pathway', label: 'Procurement Pathway', badge: 'NEW' },
    { id: 'payments', label: 'Payments & Escrow', badge: null },
    { id: 'performance', label: 'Performance Analytics', badge: null },
    { id: 'scale-up', label: 'Cross-Dept Scale-Up', badge: '2' },
    { id: 'reports', label: 'Reports & Audits', badge: null },
    { id: 'templates', label: 'RFP Templates', badge: null },
    { id: 'risk', label: 'Risk & Compliance', badge: '1' },
    { id: 'audit', label: 'Audit Logs', badge: null },
    { id: 'settings', label: 'System Settings', badge: null }
  ];

  const getStartupNavItems = () => [
    { id: 'dashboard', label: 'Dashboard', badge: null },
    { id: 'discover-challenges', label: 'Discover Challenges', badge: '5' },
    { id: 'recommended', label: 'AI Matched Challenges', badge: '3' },
    { id: 'my-applications', label: 'My Applications', badge: '4' },
    { id: 'shortlisted', label: 'Shortlisted Challenges', badge: '3' },
    { id: 'active-pilots', label: 'Active Pilots', badge: '1' },
    { id: 'milestones', label: 'Milestone Submissions', badge: '2' },
    { id: 'payments', label: 'Payments & Escrow', badge: null },
    { id: 'documents', label: 'Vault & IP Specs', badge: null },
    { id: 'performance', label: 'Performance Metrics', badge: null },
    { id: 'contracts', label: 'Contracts', badge: '1' },
    { id: 'company-profile', label: 'DPIIT Company Profile', badge: null }
  ];

  const getExpertNavItems = () => [
    { id: 'dashboard', label: 'Dashboard', badge: null },
    { id: 'assigned-evaluations', label: 'Assigned Proposals', badge: '3' },
    { id: 'evaluation-history', label: 'Evaluation History', badge: '18' },
    { id: 'pilot-reviews', label: 'Sandbox / Pilot Reviews', badge: '2' },
    { id: 'kpi-validation', label: 'KPI Verification', badge: '1' },
    { id: 'reports', label: 'Evaluation Reports', badge: null }
  ];

  const getAdminNavItems = () => [
    { id: 'dashboard', label: 'Platform Overview', badge: null },
    { id: 'users', label: 'User Directory', badge: null },
    { id: 'departments', label: 'Government Depts', badge: '4' },
    { id: 'startups', label: 'Verified Startups', badge: '6' },
    { id: 'experts', label: 'Expert Panel', badge: '4' },
    { id: 'challenges', label: 'Outcome Challenges', badge: '5' },
    { id: 'templates', label: 'Procurement Specs', badge: null },
    { id: 'contracts', label: 'Legal Contracts', badge: '3' },
    { id: 'payments', label: 'Escrow Payouts', badge: null },
    { id: 'analytics', label: 'System Analytics', badge: null },
    { id: 'audit', label: 'Immutable Audit Trail', badge: null },
    { id: 'settings', label: 'Global Governance', badge: null }
  ];

  const getNavItems = () => {
    switch (currentRole) {
      case 'GOVERNMENT': return getGovNavItems();
      case 'STARTUP': return getStartupNavItems();
      case 'EXPERT': return getExpertNavItems();
      case 'ADMIN': return getAdminNavItems();
      default: return [];
    }
  };

  const navItems = getNavItems();

  const handleItemClick = (id: string) => {
    setCurrentView(id);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isSidebarOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close Sidebar Menu"
        />
      )}

      <aside className={`app-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ overflowY: 'auto' }}>
        {/* Mobile Header with Close Button */}
        <div className="sidebar-mobile-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem' }}>🏛️</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>
              {currentRole} WORKSPACE
            </span>
          </div>
          <button 
            className="sidebar-mobile-close" 
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close Navigation"
          >
            ✕
          </button>
        </div>

        <div className="sidebar-nav">
          <div className="nav-section-title">
            {currentRole} WORKSPACE
          </div>
          
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <div
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleItemClick(item.id);
                  }
                }}
              >
                <div className="nav-item-icon">
                  <span style={{ fontSize: '0.95rem', width: '20px', display: 'inline-block', textAlign: 'center' }}>
                    {getItemIcon(item.id)}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
