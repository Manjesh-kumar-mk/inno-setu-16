import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    currentRole,
    currentView,
    setCurrentView,
    selectedDepartmentId,
    setSelectedDepartmentId,
    departments,
    setIsGlobalSearchOpen,
    isNotificationOpen,
    setIsNotificationOpen,
    openModal,
    isAuthenticated,
    userEmail,
    logout,
    isSidebarOpen,
    setIsSidebarOpen,
    switchDemoRole
  } = useApp();

  const [isPublicMenuOpen, setIsPublicMenuOpen] = useState(false);

  const isPublicMode = !isAuthenticated || currentRole === 'PUBLIC';

  const getUserInitials = () => {
    switch (currentRole) {
      case 'GOVERNMENT': return 'RV';
      case 'STARTUP': return 'VN';
      case 'EXPERT': return 'AS';
      case 'ADMIN': return 'SA';
      default: return 'G';
    }
  };

  const getUserDisplayName = () => {
    switch (currentRole) {
      case 'GOVERNMENT': return 'Dr. R. Vardhan';
      case 'STARTUP': return 'Vikramaditya N.';
      case 'EXPERT': return 'Prof. Anand S.';
      case 'ADMIN': return 'Sys Admin';
      default: return 'Guest';
    }
  };

  const getRoleBadge = () => {
    switch (currentRole) {
      case 'GOVERNMENT': return '🏛️ Govt Gateway';
      case 'STARTUP': return '🚀 Startup Portal';
      case 'EXPERT': return '🔬 Expert Panel';
      case 'ADMIN': return '🛡️ Administration';
      default: return '🌐 National Gateway';
    }
  };

  const handlePublicNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setIsPublicMenuOpen(false);
  };

  return (
    <>
      <header className="app-header">
        <div className="brand-section">
          {/* Mobile Hamburger Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => {
              if (isPublicMode) {
                setIsPublicMenuOpen(!isPublicMenuOpen);
              } else {
                setIsSidebarOpen(!isSidebarOpen);
              }
            }}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '6px',
              marginRight: '2px'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          {/* Brand Logo */}
          <div
            className="brand-logo"
            onClick={() => {
              if (isPublicMode) {
                setCurrentView('public-home');
              } else {
                setCurrentView('dashboard');
              }
            }}
            title="InnoSetu Home"
          >
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#1E3A8A"/>
              <path d="M6 22C10 14 22 14 26 22" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round"/>
              <path d="M10 16C13 11 19 11 22 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="16" cy="9" r="2.5" fill="#10B981"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF', lineHeight: 1 }}>InnoSetu</span>
              <span style={{ fontSize: '0.6rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.04em' }}>GOVT PROCUREMENT</span>
            </div>
          </div>

          {/* Gateway Status Badge */}
          <span className="gov-badge" style={{ background: 'rgba(37, 99, 235, 0.2)', borderColor: 'rgba(59, 130, 246, 0.4)', color: '#93C5FD' }}>
            {getRoleBadge()}
          </span>
        </div>

        {/* ================= CENTER: PUBLIC NAVBAR (VISIBLE IN PUBLIC MODE) ================= */}
        {isPublicMode && (
          <nav className="public-nav-links">
            <button
              className={`public-nav-link ${currentView === 'public-home' ? 'active' : ''}`}
              onClick={() => handlePublicNavClick('public-home')}
            >
              Overview
            </button>
            <button
              className={`public-nav-link ${currentView === 'public-challenges' ? 'active' : ''}`}
              onClick={() => handlePublicNavClick('public-challenges')}
            >
              Challenges
            </button>
            <button
              className={`public-nav-link ${currentView === 'public-how-it-works' ? 'active' : ''}`}
              onClick={() => handlePublicNavClick('public-how-it-works')}
            >
              9-Stage Lifecycle
            </button>
            <button
              className={`public-nav-link ${currentView === 'public-about' ? 'active' : ''}`}
              onClick={() => handlePublicNavClick('public-about')}
            >
              Section 16
            </button>
            <button
              className={`public-nav-link ${currentView === 'public-resources' ? 'active' : ''}`}
              onClick={() => handlePublicNavClick('public-resources')}
            >
              Circulars
            </button>
          </nav>
        )}

        {/* ================= RIGHT CONTROLS ================= */}
        <div className="header-controls">
          {/* Global Search Bar Trigger */}
          <button 
            className="search-trigger" 
            onClick={() => setIsGlobalSearchOpen(true)}
            title="Search challenges, startups, pilots, contracts... (Ctrl+K)"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span>Search (Ctrl+K)</span>
          </button>

          {/* Department Selector (For Government & Admin when logged in) */}
          {!isPublicMode && (currentRole === 'GOVERNMENT' || currentRole === 'ADMIN') && (
            <select
              className="dept-selector"
              value={selectedDepartmentId}
              onChange={(e) => setSelectedDepartmentId(e.target.value)}
              title="Filter view by Government Institution"
            >
              <option value="ALL">🏛️ All Ministries & Depts</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>
                  {d.code} - {d.name}
                </option>
              ))}
            </select>
          )}

          {/* Quick Demo Persona Switcher (Essential for Hackathon Reviewers & Judges) */}
          <div className="header-demo-switcher" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.04em' }}>DEMO:</span>
            <select 
              className="role-switcher-dropdown"
              value={isPublicMode ? 'PUBLIC' : currentRole}
              onChange={(e) => switchDemoRole(e.target.value as UserRole)}
              title="Hackathon Fast-Switch: Test all 4 user perspectives with 1-click verified authentication"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#F8FAFC',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <option value="PUBLIC" style={{ background: '#0F172A', color: 'white' }}>🌐 Public Website</option>
              <option value="GOVERNMENT" style={{ background: '#0F172A', color: 'white' }}>🏛️ Govt Officer (Dr. Vardhan)</option>
              <option value="STARTUP" style={{ background: '#0F172A', color: 'white' }}>🚀 Startup (BharatVision)</option>
              <option value="EXPERT" style={{ background: '#0F172A', color: 'white' }}>🔬 Evaluator (Prof. Anand)</option>
              <option value="ADMIN" style={{ background: '#0F172A', color: 'white' }}>🛡️ System Administrator</option>
            </select>
          </div>

          {/* Notification Bell (Visible in Authenticated Workspace) */}
          {!isPublicMode && (
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#F8FAFC',
                width: '34px',
                height: '34px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
              title="Official Notifications"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '7px',
                height: '7px',
                backgroundColor: '#EF4444',
                borderRadius: '50%'
              }} />
            </button>
          )}

          {/* User Profile / Sign In Area */}
          {isAuthenticated ? (
            <>
              {/* Authenticated User Pill */}
              <div 
                onClick={() => openModal('USER_PROFILE')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                title="View Verified Profile & GovNet Credentials"
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#2563EB',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}>
                  {getUserInitials()}
                </div>
                <div className="header-user-text" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'white', lineHeight: 1.1 }}>
                    {getUserDisplayName()}
                  </span>
                  <span style={{ fontSize: '0.66rem', color: '#10B981', fontWeight: 600 }}>
                    ● Authenticated
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#FCA5A5',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer'
                }}
                title="Sign Out & Lock Dashboard"
              >
                <span>🚪</span>
                <span className="logout-text">Logout</span>
              </button>
            </>
          ) : (
            /* Unauthenticated Public Actions */
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setCurrentView('public-login')}
                style={{
                  color: '#FFFFFF',
                  borderColor: 'rgba(255,255,255,0.3)',
                  fontSize: '0.8rem',
                  padding: '6px 12px'
                }}
              >
                🔐 Sign In
              </button>
              <button
                className="btn btn-primary btn-sm header-register-btn"
                onClick={() => setCurrentView('public-register')}
                style={{
                  fontSize: '0.8rem',
                  padding: '6px 12px'
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ================= MOBILE PUBLIC NAVIGATION DRAWER ================= */}
      {isPublicMode && isPublicMenuOpen && (
        <div className="public-mobile-menu">
          <button
            className={`public-mobile-menu-item ${currentView === 'public-home' ? 'active' : ''}`}
            onClick={() => handlePublicNavClick('public-home')}
          >
            <span>🏛️</span>
            <span>National Overview</span>
          </button>
          <button
            className={`public-mobile-menu-item ${currentView === 'public-challenges' ? 'active' : ''}`}
            onClick={() => handlePublicNavClick('public-challenges')}
          >
            <span>🎯</span>
            <span>Open Challenges Marketplace</span>
          </button>
          <button
            className={`public-mobile-menu-item ${currentView === 'public-how-it-works' ? 'active' : ''}`}
            onClick={() => handlePublicNavClick('public-how-it-works')}
          >
            <span>🗺️</span>
            <span>9-Stage Innovation Lifecycle</span>
          </button>
          <button
            className={`public-mobile-menu-item ${currentView === 'public-about' ? 'active' : ''}`}
            onClick={() => handlePublicNavClick('public-about')}
          >
            <span>📜</span>
            <span>Section 16 Procurement Pathway</span>
          </button>
          <button
            className={`public-mobile-menu-item ${currentView === 'public-resources' ? 'active' : ''}`}
            onClick={() => handlePublicNavClick('public-resources')}
          >
            <span>📑</span>
            <span>Government Circulars & Specs</span>
          </button>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px', display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-outline btn-sm"
              style={{ flex: 1, color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
              onClick={() => handlePublicNavClick('public-login')}
            >
              Sign In
            </button>
            <button
              className="btn btn-primary btn-sm"
              style={{ flex: 1 }}
              onClick={() => handlePublicNavClick('public-register')}
            >
              Register
            </button>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '6px' }}>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, marginBottom: '6px', letterSpacing: '0.04em' }}>⚡ SWITCH DEMO ROLE:</div>
            <select
              className="role-switcher-dropdown"
              value={isPublicMode ? 'PUBLIC' : currentRole}
              onChange={(e) => {
                switchDemoRole(e.target.value as UserRole);
                setIsPublicMenuOpen(false);
              }}
              style={{ width: '100%', background: '#0F172A', color: 'white', border: '1px solid #334155', padding: '8px', borderRadius: '6px', fontSize: '0.825rem' }}
            >
              <option value="PUBLIC">🌐 Public Website</option>
              <option value="GOVERNMENT">🏛️ Govt Officer (Dr. Vardhan)</option>
              <option value="STARTUP">🚀 Startup (BharatVision)</option>
              <option value="EXPERT">🔬 Evaluator (Prof. Anand)</option>
              <option value="ADMIN">🛡️ System Administrator</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
