import React from 'react';
import { useApp } from '../../context/AppContext';
import { ExpertDashboard } from './expert/ExpertDashboard';
import { ExpertEvaluations } from './expert/ExpertEvaluations';
import { ExpertEvaluationHistory } from './expert/ExpertEvaluationHistory';
import { ExpertPilotReviews } from './expert/ExpertPilotReviews';
import { ExpertKpiValidation } from './expert/ExpertKpiValidation';
import { ExpertReports } from './expert/ExpertReports';

export const ExpertPortal: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <ExpertDashboard />;
      case 'assigned-evaluations':
        return <ExpertEvaluations />;
      case 'evaluation-history':
        return <ExpertEvaluationHistory />;
      case 'pilot-reviews':
        return <ExpertPilotReviews />;
      case 'kpi-validation':
        return <ExpertKpiValidation />;
      case 'reports':
        return <ExpertReports />;
      default:
        return <ExpertDashboard />;
    }
  };

  return (
    <div className="portal-container" style={{ animation: 'fadeIn 0.25s ease-in-out' }}>
      {renderView()}
    </div>
  );
};

export default ExpertPortal;
