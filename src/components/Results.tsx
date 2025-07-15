import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';

const Results: React.FC = () => {
  const { races, results, users, registrations, currentUser, addResult } = useAppContext();
  const [selectedRaceId, setSelectedRaceId] = useState('');
  const [newResult, setNewResult] = useState({
    userId: '',
    position: 1,
    lapTime: ''
  });

  const selectedRace = races.find(race => race.id === selectedRaceId);
  const raceResults = results.filter(result => result.raceId === selectedRaceId);
  const raceRegistrations = registrations.filter(reg => 
    reg.raceId === selectedRaceId && reg.status === 'approved'
  );

  const calculatePoints = (position: number, isFeatureRace: boolean = false) => {
    const basePoints = Math.max(0, 52 - (position * 2)); // 50 for 1st, 48 for 2nd, etc.
    const featureBonus = isFeatureRace ? 10 : 0;
    return basePoints + featureBonus;
  };

  const handleAddResult = () => {
    if (!selectedRaceId || !newResult.userId || !newResult.position) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const points = calculatePoints(newResult.position, true); // Assuming feature race for demo
    
    addResult({
      raceId: selectedRaceId,
      userId: newResult.userId,
      position: newResult.position,
      lapTime: newResult.lapTime,
      points
    });

    toast({
      title: "Result Added! 🏆",
      description: `Result recorded with ${points} points awarded.`,
    });

    setNewResult({ userId: '', position: 1, lapTime: '' });
  };

  const getPositionBadge = (position: number) => {
    const colors = {
      1: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
      2: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white',
      3: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
    };
    return colors[position as keyof typeof colors] || 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Race Results
          </h2>
          <p className="text-gray-600">View and manage race results and lap times</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {currentUser?.role === 'admin' && (
            <Card className="bg-white/90 backdrop-blur border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <span>➕</span>
                  Add Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Select value={selectedRaceId} onValueChange={setSelectedRaceId}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-pink-400">
                      <SelectValue placeholder="Select Race" />
                    </SelectTrigger>
                    <SelectContent>
                      {races.map(race => (
                        <SelectItem key={race.id} value={race.id}>
                          {race.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRaceId && (
                  <>
                    <div className="space-y-2">
                      <Select value={newResult.userId} onValueChange={(value) => setNewResult(prev => ({ ...prev, userId: value }))}>
                        <SelectTrigger className="border-2 border-gray-200 focus:border-pink-400">
                          <SelectValue placeholder="Select Racer" />
                        </SelectTrigger>
                        <SelectContent>
                          {raceRegistrations.map(reg => {
                            const user = users.find(u => u.id === reg.userId);
                            return (
                              <SelectItem key={reg.id} value={reg.userId}>
                                {user?.name} (#{reg.racerNumber})
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Position"
                        value={newResult.position}
                        onChange={(e) => setNewResult(prev => ({ ...prev, position: parseInt(e.target.value) || 1 }))}
                        className="border-2 border-gray-200 focus:border-pink-400"
                        min="1"
                      />
                      <Input
                        placeholder="Lap Time"
                        value={newResult.lapTime}
                        onChange={(e) => setNewResult(prev => ({ ...prev, lapTime: e.target.value }))}
                        className="border-2 border-gray-200 focus:border-pink-400"
                      />
                    </div>

                    <Button 
                      onClick={handleAddResult}
                      className="w-full bg-gradient-to-r from-green-500 to-lime-600 hover:from-green-600 hover:to-lime-700 text-white border-0 font-semibold"
                    >
                      Add Result
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          <Card className={`bg-white/90 backdrop-blur border-2 border-gray-200 ${currentUser?.role === 'admin' ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <span>🏁</span>
                Race Results
                {selectedRace && (
                  <Badge className="ml-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white">
                    {selectedRace.name}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedRaceId ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🏆</div>
                  <p className="text-gray-500">Select a race to view results</p>
                </div>
              ) : raceResults.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">⏱️</div>
                  <p className="text-gray-500">No results recorded yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-gray-700">Position</TableHead>
                        <TableHead className="font-bold text-gray-700">Racer</TableHead>
                        <TableHead className="font-bold text-gray-700">Lap Time</TableHead>
                        <TableHead className="font-bold text-gray-700">Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {raceResults
                        .sort((a, b) => a.position - b.position)
                        .map(result => {
                          const user = users.find(u => u.id === result.userId);
                          const registration = registrations.find(reg => 
                            reg.raceId === result.raceId && reg.userId === result.userId
                          );
                          
                          return (
                            <TableRow key={result.id} className="hover:bg-pink-50">
                              <TableCell>
                                <Badge className={`${getPositionBadge(result.position)} font-bold`}>
                                  {result.position === 1 ? '🥇' : result.position === 2 ? '🥈' : result.position === 3 ? '🥉' : `#${result.position}`}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">
                                {user?.name}
                                {registration && (
                                  <span className="ml-2 text-sm text-gray-500">
                                    (#{registration.racerNumber})
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="font-mono">
                                {result.lapTime || 'N/A'}
                              </TableCell>
                              <TableCell>
                                <span className="font-bold text-green-600">
                                  {result.points} pts
                                </span>
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

export default Results;