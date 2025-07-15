import React from 'react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { Link, useLocation } from 'react-router-dom';
import { Rocket } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { currentUser } = useAppContext();
  const location = useLocation();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', roles: ['admin', 'racer', 'spectator'] },
    { id: 'races', label: 'Races', roles: ['admin', 'racer', 'spectator'] },
    { id: 'register', label: 'Register', roles: ['racer'] },
    { id: 'registrations', label: 'Registrations', roles: ['admin', 'racer', 'spectator'] },
    { id: 'results', label: 'Results', roles: ['admin', 'racer', 'spectator'] },
    { id: 'leaderboard', label: 'Leaderboard', roles: ['admin', 'racer', 'spectator'] },
    { id: 'lineups', label: 'Line-ups', roles: ['admin', 'racer', 'spectator'] },
    { id: 'payouts', label: 'Payouts', roles: ['admin'] },
    { id: 'admin', label: 'Admin', roles: ['admin'] },
  ];

  const visibleTabs = tabs.filter(tab => 
    currentUser && tab.roles.includes(currentUser.role)
  );

  return (
    <nav className="bg-gradient-to-r from-gray-200 to-gray-300 border-b-2 border-pink-500 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🏎️</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              KartTrack Pro
            </h1>
          </div>
          
          <div className="flex space-x-2">
            {visibleTabs.map(tab => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`
                  ${activeTab === tab.id 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-lg' 
                    : 'bg-white/80 text-gray-700 border-2 border-pink-300 hover:bg-pink-50 hover:border-pink-500'
                  }
                  font-semibold transition-all duration-200 transform hover:scale-105
                `}
              >
                {tab.label}
              </Button>
            ))}
            
            {currentUser?.role === 'admin' && (
              <Button
                variant="outline"
                className="bg-blue-50 text-blue-700 border-2 border-blue-300 hover:bg-blue-100 hover:border-blue-500 font-semibold transition-all duration-200"
                asChild
              >
                <Link to="/publish">
                  <Rocket className="h-4 w-4 mr-2" />
                  Publish App
                </Link>
              </Button>
            )}
          </div>
          
          <div className="text-sm">
            <span className="text-gray-600">Welcome, </span>
            <span className="font-semibold text-pink-600">{currentUser?.name}</span>
            <span className="ml-2 px-2 py-1 bg-gradient-to-r from-lime-400 to-green-500 text-white text-xs rounded-full">
              {currentUser?.role.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;