import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HomePage } from './public/HomePage';
import { AboutPage } from './public/AboutPage';
import { HowItWorksPage } from './public/HowItWorksPage';
import { MarketplacePage, ExtendedChallenge } from './public/MarketplacePage';
import { ChallengeDetailPage } from './public/ChallengeDetailPage';
import { SuccessStoriesPage } from './public/SuccessStoriesPage';
import { ResourcesPage } from './public/ResourcesPage';
import { LoginPage } from './public/LoginPage';
import { RegisterPage } from './public/RegisterPage';

export const PublicPortal: React.FC = () => {
  const { currentView, setCurrentView } = useApp();
  const [selectedChallenge, setSelectedChallenge] = useState<ExtendedChallenge | null>(null);

  const handleSelectChallenge = (c: ExtendedChallenge) => {
    setSelectedChallenge(c);
  };

  switch (currentView) {
    case 'public-about':
      return <AboutPage />;

    case 'public-how-it-works':
      return <HowItWorksPage />;

    case 'public-challenges':
      return (
        <MarketplacePage
          onSelectChallenge={(c) => {
            handleSelectChallenge(c);
            setCurrentView('public-challenge-detail');
          }}
        />
      );

    case 'public-challenge-detail':
      return (
        <ChallengeDetailPage
          challenge={selectedChallenge}
          onBackToMarketplace={() => setCurrentView('public-challenges')}
        />
      );

    case 'public-success-stories':
      return <SuccessStoriesPage />;

    case 'public-resources':
      return <ResourcesPage />;

    case 'public-login':
      return <LoginPage />;

    case 'public-register':
      return <RegisterPage />;

    case 'public-home':
    default:
      return <HomePage />;
  }
};

export default PublicPortal;
