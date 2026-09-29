import React from 'react';
import { useApp } from '../../context/AppContext';
import { StartupDashboard } from './startup/StartupDashboard';
import { StartupDiscoverChallenges } from './startup/StartupDiscoverChallenges';
import { StartupRecommended } from './startup/StartupRecommended';
import { StartupMyApplications } from './startup/StartupMyApplications';
import { StartupShortlisted } from './startup/StartupShortlisted';
import { StartupActivePilots } from './startup/StartupActivePilots';
import { StartupMilestones } from './startup/StartupMilestones';
import { StartupPayments } from './startup/StartupPayments';
import { StartupDocuments } from './startup/StartupDocuments';
import { StartupPerformance } from './startup/StartupPerformance';
import { StartupContracts } from './startup/StartupContracts';
import { StartupCompanyProfile } from './startup/StartupCompanyProfile';

export const StartupPortal: React.FC = () => {
  const { currentView } = useApp();

  switch (currentView) {
    case 'discover-challenges':
      return <StartupDiscoverChallenges />;
    case 'recommended':
      return <StartupRecommended />;
    case 'my-applications':
      return <StartupMyApplications />;
    case 'shortlisted':
      return <StartupShortlisted />;
    case 'active-pilots':
      return <StartupActivePilots />;
    case 'milestones':
      return <StartupMilestones />;
    case 'payments':
      return <StartupPayments />;
    case 'documents':
      return <StartupDocuments />;
    case 'performance':
      return <StartupPerformance />;
    case 'contracts':
      return <StartupContracts />;
    case 'company-profile':
      return <StartupCompanyProfile />;
    case 'dashboard':
    default:
      return <StartupDashboard />;
  }
};
