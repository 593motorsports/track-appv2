import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';

const RaceList: React.FC = () => {
  const { races, registrations, currentUser } = useAppContext();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-gradient-to-r from-blue-400 to-cyan-500';
      case 'ongoing':
        return 'bg-gradient-to-r from-lime-400 to-green-500';
      case 'completed':
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getRegistrationCount = (raceId: string) => {
    return registrations.filter(reg => reg.raceId === raceId && reg.status === 'approved').length;
  };

  const isUserRegistered = (raceId: string) => {
    return registrations.some(reg => reg.raceId === raceId && reg.userId === currentUser?.id);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Race Schedule
          </h2>
          <p className="text-gray-600">View all races and their current status</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map(race => {
            const registrationCount = getRegistrationCount(race.id);
            const userRegistered = isUserRegistered(race.id);
            
            return (
              <Card key={race.id} className="bg-white/90 backdrop-blur border-2 border-gray-200 hover:border-pink-300 transition-all duration-200 hover:shadow-xl transform hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {race.name}
                    </CardTitle>
                    <Badge className={`${getStatusColor(race.status)} text-white border-0 font-semibold`}>
                      {race.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📅</span>
                      <span className="text-gray-700 font-medium">
                        {new Date(race.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-lg">👥</span>
                      <span className="text-gray-700">
                        {registrationCount} / {race.maxParticipants} registered
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(registrationCount / race.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {currentUser?.role === 'racer' && (
                    <div className="pt-2">
                      {userRegistered ? (
                        <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-green-50 to-lime-50 rounded-lg border border-green-200">
                          <span className="text-green-600">✅</span>
                          <span className="text-green-700 font-medium">You're registered!</span>
                        </div>
                      ) : race.status === 'upcoming' && registrationCount < race.maxParticipants ? (
                        <Button 
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 font-semibold transition-all duration-200 transform hover:scale-105"
                          onClick={() => {
                            // This would trigger registration - handled in parent component
                            console.log('Register for race:', race.id);
                          }}
                        >
                          Register Now
                        </Button>
                      ) : (
                        <Button 
                          disabled 
                          className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                        >
                          {race.status !== 'upcoming' ? 'Registration Closed' : 'Race Full'}
                        </Button>
                      )}
                    </div>
                  )}

                  {race.status === 'ongoing' && (
                    <div className="p-3 bg-gradient-to-r from-lime-50 to-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-700 font-medium">Race in Progress</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {races.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏁</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No races scheduled</h3>
            <p className="text-gray-500">Check back later for upcoming races!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaceList;