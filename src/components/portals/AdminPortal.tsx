import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminUsers } from './admin/AdminUsers';
import { AdminDepartments } from './admin/AdminDepartments';
import { AdminStartups } from './admin/AdminStartups';
import { AdminExperts } from './admin/AdminExperts';
import { AdminChallenges } from './admin/AdminChallenges';
import { AdminTemplates } from './admin/AdminTemplates';
import { AdminContracts } from './admin/AdminContracts';
import { AdminPayments } from './admin/AdminPayments';
import { AdminAnalytics } from './admin/AdminAnalytics';
import { AdminAuditLogs } from './admin/AdminAuditLogs';
import { AdminSettings } from './admin/AdminSettings';

export const AdminPortal: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <AdminUsers />;
      case 'departments':
        return <AdminDepartments />;
      case 'startups':
        return <AdminStartups />;
      case 'experts':
        return <AdminExperts />;
      case 'challenges':
        return <AdminChallenges />;
      case 'templates':
        return <AdminTemplates />;
      case 'contracts':
        return <AdminContracts />;
      case 'payments':
        return <AdminPayments />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'audit':
        return <AdminAuditLogs />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="portal-container" style={{ animation: 'fadeIn 0.25s ease-in-out' }}>
      {renderView()}
    </div>
  );
};
export default AdminPortal;