import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';

const AdminPanel: React.FC = () => {
  const { races, registrations, karts, users, addRace, updateRegistration } = useAppContext();
  const [activeTab, setActiveTab] = useState('races');
  const [newRace, setNewRace] = useState({
    name: '',
    date: '',
    maxParticipants: 20
  });

  const handleCreateRace = () => {
    if (!newRace.name || !newRace.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in race name and date.",
        variant: "destructive"
      });
      return;
    }

    addRace({
      name: newRace.name,
      date: newRace.date,
      status: 'upcoming',
      maxParticipants: newRace.maxParticipants
    });

    toast({
      title: "Race Created! 🏁",
      description: `${newRace.name} has been scheduled successfully.`,
    });

    setNewRace({ name: '', date: '', maxParticipants: 20 });
  };

  const handleRegistrationAction = (registrationId: string, action: 'approve' | 'deny', kartId?: string) => {
    updateRegistration(registrationId, {
      status: action === 'approve' ? 'approved' : 'denied',
      kartId: action === 'approve' ? kartId : undefined
    });

    toast({
      title: action === 'approve' ? "Registration Approved! ✅" : "Registration Denied ❌",
      description: `Registration has been ${action}d.`,
    });
  };

  const pendingRegistrations = registrations.filter(reg => reg.status === 'pending');
  const adminTabs = [
    { id: 'races', label: 'Race Management', icon: '🏁' },
    { id: 'registrations', label: 'Registrations', icon: '📝' },
    { id: 'karts', label: 'Kart Management', icon: '🏎️' },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Admin Control Panel
          </h2>
          <p className="text-gray-600">Manage races, registrations, and karts</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {adminTabs.map(tab => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`
                ${activeTab === tab.id 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0' 
                  : 'bg-white/80 text-gray-700 border-2 border-pink-300 hover:bg-pink-50'
                }
                font-semibold transition-all duration-200
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === 'races' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <span>➕</span>
                  Create New Race
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="race-name">Race Name</Label>
                  <Input
                    id="race-name"
                    value={newRace.name}
                    onChange={(e) => setNewRace(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter race name"
                    className="border-2 border-gray-200 focus:border-pink-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="race-date">Race Date</Label>
                  <Input
                    id="race-date"
                    type="date"
                    value={newRace.date}
                    onChange={(e) => setNewRace(prev => ({ ...prev, date: e.target.value }))}
                    className="border-2 border-gray-200 focus:border-pink-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-participants">Max Participants</Label>
                  <Input
                    id="max-participants"
                    type="number"
                    value={newRace.maxParticipants}
                    onChange={(e) => setNewRace(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 20 }))}
                    className="border-2 border-gray-200 focus:border-pink-400"
                    min="1"
                    max="50"
                  />
                </div>
                <Button 
                  onClick={handleCreateRace}
                  className="w-full bg-gradient-to-r from-green-500 to-lime-600 hover:from-green-600 hover:to-lime-700 text-white border-0 font-semibold"
                >
                  Create Race
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-white/90 backdrop-blur border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <span>🏁</span>
                  All Races
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Race Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Participants</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {races.map(race => {
                        const regCount = registrations.filter(reg => reg.raceId === race.id && reg.status === 'approved').length;
                        return (
                          <TableRow key={race.id}>
                            <TableCell className="font-medium">{race.name}</TableCell>
                            <TableCell>{new Date(race.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge className={`
                                ${race.status === 'upcoming' ? 'bg-blue-500' : 
                                  race.status === 'ongoing' ? 'bg-green-500' : 'bg-gray-500'}
                                text-white
                              `}>
                                {race.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>{regCount}/{race.maxParticipants}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'registrations' && (
          <Card className="bg-white/90 backdrop-blur border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <span>⏳</span>
                Pending Registrations ({pendingRegistrations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingRegistrations.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No pending registrations</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Racer</TableHead>
                        <TableHead>Race</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRegistrations.map(registration => {
                        const user = users.find(u => u.id === registration.userId);
                        const race = races.find(r => r.id === registration.raceId);
                        const availableKarts = karts.filter(k => k.available);
                        
                        return (
                          <TableRow key={registration.id}>
                            <TableCell className="font-medium">{user?.name}</TableCell>
                            <TableCell>{race?.name}</TableCell>
                            <TableCell>#{registration.racerNumber}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  onClick={() => handleRegistrationAction(registration.id, 'approve', availableKarts[0]?.id)}
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600"
                                >
                                  Approve
                                </Button>
                                <Button 
                                  onClick={() => handleRegistrationAction(registration.id, 'deny')}
                                  variant="destructive"
                                  size="sm"
                                >
                                  Deny
                                </Button>
                              </div>
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
        )}

        {activeTab === 'karts' && (
          <Card className="bg-white/90 backdrop-blur border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <span>🏎️</span>
                Kart Fleet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {karts.map(kart => (
                  <div key={kart.id} className="p-4 border-2 border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-white">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{kart.number}</h4>
                      <Badge className={kart.available ? 'bg-green-500' : 'bg-red-500'}>
                        {kart.available ? 'Available' : 'In Use'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Class: {kart.class}</p>
                    <p className="text-sm text-gray-600">Engine: {kart.engineSize}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;