import React, { useState } from 'react';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import RaceList from './RaceList';
import Registration from './Registration';
import RegistrationTab from './RegistrationTab';
import Results from './Results';
import Leaderboard from './Leaderboard';
import AdminPanel from './AdminPanel';
import Lineups from './Lineups';
import PayoutsTab from './PayoutsTab';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'races':
        return <RaceList />;
      case 'register':
        return <Registration />;
      case 'registrations':
        return <RegistrationTab />;
      case 'results':
        return <Results />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'lineups':
        return <Lineups />;
      case 'payouts':
        return <PayoutsTab />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
};

export default AppLayout;
export { AppLayout };