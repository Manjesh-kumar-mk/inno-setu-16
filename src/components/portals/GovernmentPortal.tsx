import React from 'react';
import { useApp } from '../../context/AppContext';
import { GovDashboard } from './government/GovDashboard';
import { GovChallenges } from './government/GovChallenges';
import { GovCreateChallengeWizard } from './government/GovCreateChallengeWizard';
import { GovStartupDiscovery } from './government/GovStartupDiscovery';
import { GovApplications } from './government/GovApplications';
import { GovEvaluation } from './government/GovEvaluation';
import { GovPilots } from './government/GovPilots';
import { GovMilestones } from './government/GovMilestones';
import { GovContracts } from './government/GovContracts';
import { GovProcurementPathway } from './government/GovProcurementPathway';
import { GovPayments } from './government/GovPayments';
import { GovPerformance } from './government/GovPerformance';
import { GovScaleUp } from './government/GovScaleUp';
import { GovReports } from './government/GovReports';
import { GovTemplates } from './government/GovTemplates';
import { GovRisk } from './government/GovRisk';
import { GovAudit } from './government/GovAudit';
import { GovSettings } from './government/GovSettings';

export const GovernmentPortal: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <GovDashboard />;
      case 'challenges':
        return <GovChallenges />;
      case 'create-challenge':
        return <GovCreateChallengeWizard />;
      case 'discovery':
        return <GovStartupDiscovery />;
      case 'applications':
        return <GovApplications />;
      case 'evaluation':
        return <GovEvaluation />;
      case 'pilots':
        return <GovPilots />;
      case 'milestones':
        return <GovMilestones />;
      case 'contracts':
        return <GovContracts />;
      case 'procurement-pathway':
        return <GovProcurementPathway />;
      case 'payments':
        return <GovPayments />;
      case 'performance':
        return <GovPerformance />;
      case 'scale-up':
        return <GovScaleUp />;
      case 'reports':
        return <GovReports />;
      case 'templates':
        return <GovTemplates />;
      case 'risk':
        return <GovRisk />;
      case 'audit':
        return <GovAudit />;
      case 'settings':
        return <GovSettings />;
      default:
        return <GovDashboard />;
    }
  };

  return (
    <div className="portal-container" style={{ animation: 'fadeIn 0.25s ease-in-out' }}>
      {renderView()}
    </div>
  );
};

export default GovernmentPortal;
