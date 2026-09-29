import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { LifecycleTracker } from './components/common/LifecycleTracker';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { GlobalModals } from './components/modals/GlobalModals';
import { ToastContainer } from './components/common/ToastContainer';

import { GovernmentPortal } from './components/portals/GovernmentPortal';
import { StartupPortal } from './components/portals/StartupPortal';
import { ExpertPortal } from './components/portals/ExpertPortal';
import { AdminPortal } from './components/portals/AdminPortal';
import { PublicPortal } from './components/portals/PublicPortal';

const AppContent: React.FC = () => {
  const { currentRole, isAuthenticated, setCurrentRole, setCurrentView, notifyError } = useApp();

  // Route Guard: strictly prevent any internal portal state without authentication
  useEffect(() => {
    if (!isAuthenticated && currentRole !== 'PUBLIC') {
      notifyError('Access Denied', 'Please log in with verified credentials to access workspace portals.');
      setCurrentRole('PUBLIC');
      setCurrentView('public-login');
    }
  }, [isAuthenticated, currentRole, setCurrentRole, setCurrentView, notifyError]);

  const renderActivePortal = () => {
    if (!isAuthenticated || currentRole === 'PUBLIC') {
      return <PublicPortal />;
    }

    switch (currentRole) {
      case 'GOVERNMENT':
        return <GovernmentPortal />;
      case 'STARTUP':
        return <StartupPortal />;
      case 'EXPERT':
        return <ExpertPortal />;
      case 'ADMIN':
        return <AdminPortal />;
      default:
        return <PublicPortal />;
    }
  };

  const isPublicMode = !isAuthenticated || currentRole === 'PUBLIC';

  return (
    <div className={isPublicMode ? 'public-shell' : 'app-shell'}>
      {/* Universal Responsive Header */}
      <Header />

      {isPublicMode ? (
        /* ================= PUBLIC EXPERIENCE (Full Width, No Admin Sidebar) ================= */
        <>
          <main className="public-content">
            <PublicPortal />
          </main>
          <Footer />
        </>
      ) : (
        /* ================= AUTHENTICATED PORTAL WORKSPACE ================= */
        <>
          {/* 9-Stage Innovation Pathway Bar */}
          <LifecycleTracker />

          {/* Main Layout Container */}
          <div className="main-layout">
            {/* Dynamic Role-specific Sidebar (With Mobile Drawer support) */}
            <Sidebar />

            {/* Content Container */}
            <div className="content-container">
              <main className="main-content">
                {renderActivePortal()}
              </main>
            </div>
          </div>
        </>
      )}

      {/* Global Modals, Drawers, Search & Toasts */}
      <GlobalSearchModal />
      <NotificationDrawer />
      <GlobalModals />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
