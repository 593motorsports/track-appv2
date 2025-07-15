import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/contexts/AppContext';
import NumberWheel from '@/components/NumberWheel';
import RacersByClass from '@/components/RacersByClass';

const Dashboard: React.FC = () => {
  const { races, registrations, results, users, currentUser } = useAppContext();

  const upcomingRaces = races.filter(race => race.status === 'upcoming');
  const ongoingRaces = races.filter(race => race.status === 'ongoing');
  const completedRaces = races.filter(race => race.status === 'completed');
  
  const userRegistrations = registrations.filter(reg => reg.userId === currentUser?.id);
  const userResults = results.filter(result => result.userId === currentUser?.id);
  const totalPoints = userResults.reduce((sum, result) => sum + result.points, 0);

  const stats = [
    {
      title: 'Upcoming Races',
      value: upcomingRaces.length,
      color: 'from-cyan-400 to-blue-500',
      icon: '🏁'
    },
    {
      title: 'Ongoing Races',
      value: ongoingRaces.length,
      color: 'from-lime-400 to-green-500',
      icon: '🏎️'
    },
    {
      title: currentUser?.role === 'admin' ? 'Total Racers' : 'My Registrations',
      value: currentUser?.role === 'admin' ? users.filter(u => u.role === 'racer').length : userRegistrations.length,
      color: 'from-pink-400 to-purple-500',
      icon: '👥'
    },
    {
      title: currentUser?.role === 'admin' ? 'Total Results' : 'My Points',
      value: currentUser?.role === 'admin' ? results.length : totalPoints,
      color: 'from-yellow-400 to-orange-500',
      icon: currentUser?.role === 'admin' ? '📊' : '🏆'
    }
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h2>
          <p className="text-gray-600">Welcome to your race track management center</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur border-2 border-gray-200 hover:border-pink-300 transition-all duration-200 hover:shadow-lg transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <span className="text-lg">{stat.icon}</span>
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <NumberWheel />
          <RacersByClass />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-600">
                <span>🏁</span>
                Upcoming Races
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingRaces.length === 0 ? (
                <p className="text-gray-500 italic">No upcoming races</p>
              ) : (
                <div className="space-y-3">
                  {upcomingRaces.slice(0, 3).map(race => (
                    <div key={race.id} className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
                      <h4 className="font-semibold text-gray-800">{race.name}</h4>
                      <p className="text-sm text-gray-600">{new Date(race.date).toLocaleDateString()}</p>
                      <p className="text-xs text-purple-600">{race.class} Class - Max: {race.maxParticipants} participants</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <span>📈</span>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentUser?.role === 'admin' ? (
                  <>
                    <div className="p-3 bg-gradient-to-r from-green-50 to-lime-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-700">Total registrations: {registrations.length}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700">Pending approvals: {registrations.filter(r => r.status === 'pending').length}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-gray-700">Approved racers: {registrations.filter(r => r.status === 'approved').length}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-gradient-to-r from-green-50 to-lime-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-700">Your total points: {totalPoints}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700">Races participated: {userResults.length}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;