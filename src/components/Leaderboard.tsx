import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAppContext } from '@/contexts/AppContext';

const Leaderboard: React.FC = () => {
  const { getLeaderboard, results, races } = useAppContext();
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [sortBy, setSortBy] = useState('points');

  const leaderboard = getLeaderboard();

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${position}`;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3: return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Position', 'Racer Name', 'Total Points', 'Races Participated'],
      ...leaderboard.map((entry, index) => {
        const racesCount = results.filter(r => r.userId === entry.userId).length;
        return [index + 1, entry.name, entry.totalPoints, racesCount];
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaderboard.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalRaces = races.filter(race => race.status === 'completed').length;
  const totalParticipants = leaderboard.length;
  const averagePoints = totalParticipants > 0 
    ? Math.round(leaderboard.reduce((sum, entry) => sum + entry.totalPoints, 0) / totalParticipants)
    : 0;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Points Leaderboard
          </h2>
          <p className="text-gray-600">Championship standings and racer rankings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur border-2 border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{totalRaces}</div>
              <div className="text-sm text-gray-600">Completed Races</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-2 border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{totalParticipants}</div>
              <div className="text-sm text-gray-600">Active Racers</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-2 border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{averagePoints}</div>
              <div className="text-sm text-gray-600">Avg Points</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-2 border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {leaderboard[0]?.totalPoints || 0}
              </div>
              <div className="text-sm text-gray-600">Leader Points</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Top 3 Podium */}
          <Card className="bg-white/90 backdrop-blur border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-600">
                <span>🏆</span>
                Championship Podium
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaderboard.slice(0, 3).map((entry, index) => {
                const position = index + 1;
                const racesCount = results.filter(r => r.userId === entry.userId).length;
                
                return (
                  <div key={entry.userId} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                    <div className="text-2xl">
                      {position === 1 ? '👑' : position === 2 ? '🥈' : '🥉'}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{entry.name}</div>
                      <div className="text-sm text-gray-600">{racesCount} races</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        {entry.totalPoints}
                      </div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Full Leaderboard */}
          <Card className="lg:col-span-3 bg-white/90 backdrop-blur border-2 border-gray-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <span>📊</span>
                  Full Standings
                </CardTitle>
                <div className="flex gap-2">
                  <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="season">This Season</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={exportToCSV}
                    variant="outline"
                    className="border-2 border-green-300 text-green-600 hover:bg-green-50"
                  >
                    📥 Export CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {leaderboard.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏁</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No standings yet</h3>
                  <p className="text-gray-500">Complete some races to see the leaderboard!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-gray-700">Position</TableHead>
                        <TableHead className="font-bold text-gray-700">Racer</TableHead>
                        <TableHead className="font-bold text-gray-700">Points</TableHead>
                        <TableHead className="font-bold text-gray-700">Races</TableHead>
                        <TableHead className="font-bold text-gray-700">Avg Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaderboard.map((entry, index) => {
                        const position = index + 1;
                        const racesCount = results.filter(r => r.userId === entry.userId).length;
                        const avgPoints = racesCount > 0 ? Math.round(entry.totalPoints / racesCount) : 0;
                        
                        return (
                          <TableRow key={entry.userId} className="hover:bg-pink-50">
                            <TableCell>
                              <Badge className={`${getPositionColor(position)} font-bold`}>
                                {getPositionIcon(position)}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              {entry.name}
                              {position <= 3 && (
                                <span className="ml-2 text-xs px-2 py-1 bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-800 rounded-full">
                                  PODIUM
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <span className="font-bold text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                {entry.totalPoints}
                              </span>
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {racesCount}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {avgPoints}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;