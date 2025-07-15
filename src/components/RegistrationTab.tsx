import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';

const RegistrationTab: React.FC = () => {
  const { races, registrations, currentUser, updateRegistration, addRegistration } = useAppContext();
  const [selectedRaceId, setSelectedRaceId] = useState('');
  const [editingReg, setEditingReg] = useState<any>(null);
  const [newRegForm, setNewRegForm] = useState({
    name: '',
    kartNumber: 1,
    raceClass: ''
  });

  const currentRace = races.find(r => r.id === selectedRaceId) || races[0];
  const raceRegistrations = registrations.filter(r => r.raceId === (selectedRaceId || races[0]?.id));
  
  const registrationsByClass = raceRegistrations.reduce((acc, reg) => {
    if (!acc[reg.raceClass]) acc[reg.raceClass] = [];
    acc[reg.raceClass].push(reg);
    return acc;
  }, {} as Record<string, any[]>);

  const handleEditSave = () => {
    if (editingReg) {
      updateRegistration(editingReg.id, {
        racerName: editingReg.racerName,
        kartNumber: editingReg.kartNumber
      });
      setEditingReg(null);
      toast({ title: "Registration updated successfully" });
    }
  };

  const handleNewRegistration = () => {
    if (!newRegForm.name || !newRegForm.raceClass) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    
    addRegistration({
      raceId: currentRace.id,
      userId: `user_${Date.now()}`,
      racerId: `racer_${Date.now()}`,
      racerName: newRegForm.name,
      kartNumber: newRegForm.kartNumber,
      status: 'approved',
      raceClass: newRegForm.raceClass
    });
    
    setNewRegForm({ name: '', kartNumber: 1, raceClass: '' });
    toast({ title: "Registration added successfully" });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-pink-600">Race Registrations</h2>
        <div className="flex gap-4">
          <Select value={selectedRaceId} onValueChange={setSelectedRaceId}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select Race" />
            </SelectTrigger>
            <SelectContent>
              {races.map(race => (
                <SelectItem key={race.id} value={race.id}>
                  {race.name} - {race.class}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {currentUser?.role === 'admin' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-pink-500 hover:bg-pink-600">Add Registration</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Registration</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Driver Name</Label>
                    <Input 
                      value={newRegForm.name}
                      onChange={(e) => setNewRegForm(prev => ({...prev, name: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label>Kart Number</Label>
                    <Input 
                      type="number" 
                      value={newRegForm.kartNumber}
                      onChange={(e) => setNewRegForm(prev => ({...prev, kartNumber: parseInt(e.target.value) || 1}))}
                    />
                  </div>
                  <div>
                    <Label>Race Class</Label>
                    <Select value={newRegForm.raceClass} onValueChange={(value) => setNewRegForm(prev => ({...prev, raceClass: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Masters">Masters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleNewRegistration} className="w-full">Add Registration</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {Object.entries(registrationsByClass).map(([raceClass, classRegs]) => (
        <Card key={raceClass}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-purple-600">{raceClass} Class</span>
              <Badge variant="outline">{classRegs.length} drivers</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Draw #</TableHead>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Kart #</TableHead>
                  <TableHead>Status</TableHead>
                  {currentUser?.role === 'admin' && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {classRegs.sort((a, b) => a.racerNumber - b.racerNumber).map(reg => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-bold text-pink-600">#{reg.racerNumber}</TableCell>
                    <TableCell>{reg.racerName}</TableCell>
                    <TableCell>#{reg.kartNumber}</TableCell>
                    <TableCell>
                      <Badge variant={reg.status === 'approved' ? 'default' : 'secondary'}>
                        {reg.status}
                      </Badge>
                    </TableCell>
                    {currentUser?.role === 'admin' && (
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setEditingReg({...reg})}>
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Registration</DialogTitle>
                            </DialogHeader>
                            {editingReg && (
                              <div className="space-y-4">
                                <div>
                                  <Label>Driver Name</Label>
                                  <Input 
                                    value={editingReg.racerName}
                                    onChange={(e) => setEditingReg(prev => ({...prev, racerName: e.target.value}))}
                                  />
                                </div>
                                <div>
                                  <Label>Kart Number</Label>
                                  <Input 
                                    type="number" 
                                    value={editingReg.kartNumber}
                                    onChange={(e) => setEditingReg(prev => ({...prev, kartNumber: parseInt(e.target.value) || 1}))}
                                  />
                                </div>
                                <Button onClick={handleEditSave} className="w-full">Save Changes</Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RegistrationTab;