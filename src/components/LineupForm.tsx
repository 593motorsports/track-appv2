import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';

interface LineupFormProps {
  onSubmit: (lineup: any) => void;
  onCancel: () => void;
  editingLineup?: any;
}

const LineupForm: React.FC<LineupFormProps> = ({ onSubmit, onCancel, editingLineup }) => {
  const { races, registrations } = useAppContext();
  const [selectedRaceId, setSelectedRaceId] = useState(editingLineup?.raceId || '');
  const [format, setFormat] = useState<'single' | 'double'>(editingLineup?.format || 'single');
  const [positions, setPositions] = useState<Array<{position: number; racerId: string; racerName: string; kartNumber: number}>>(
    editingLineup?.positions || []
  );

  const availableRaces = races.filter(race => race.status === 'upcoming');
  const selectedRace = races.find(race => race.id === selectedRaceId);
  const raceRegistrations = registrations.filter(reg => reg.raceId === selectedRaceId && reg.status === 'approved');

  useEffect(() => {
    if (selectedRaceId && !editingLineup) {
      // Auto-populate positions from registrations
      const newPositions = raceRegistrations.map((reg, index) => ({
        position: index + 1,
        racerId: reg.racerId,
        racerName: reg.racerName,
        kartNumber: reg.kartNumber
      }));
      setPositions(newPositions);
    }
  }, [selectedRaceId, raceRegistrations, editingLineup]);

  const handleSubmit = () => {
    if (!selectedRaceId || positions.length === 0) return;

    const lineup = {
      id: editingLineup?.id || `lineup-${Date.now()}`,
      raceId: selectedRaceId,
      raceName: selectedRace?.name || '',
      raceClass: selectedRace?.class || '',
      format,
      positions: positions.sort((a, b) => a.position - b.position),
      createdAt: editingLineup?.createdAt || new Date().toISOString()
    };

    onSubmit(lineup);
  };

  const movePosition = (index: number, direction: 'up' | 'down') => {
    const newPositions = [...positions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newPositions.length) {
      [newPositions[index], newPositions[targetIndex]] = [newPositions[targetIndex], newPositions[index]];
      // Update position numbers
      newPositions.forEach((pos, idx) => {
        pos.position = idx + 1;
      });
      setPositions(newPositions);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-pink-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          {editingLineup ? 'Edit Line-up' : 'Create New Line-up'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="race-select">Select Race</Label>
            <Select value={selectedRaceId} onValueChange={setSelectedRaceId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a race" />
              </SelectTrigger>
              <SelectContent>
                {availableRaces.map(race => (
                  <SelectItem key={race.id} value={race.id}>
                    {race.name} - {race.class}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="format-select">Line-up Format</Label>
            <Select value={format} onValueChange={(value: 'single' | 'double') => setFormat(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single File</SelectItem>
                <SelectItem value="double">Double File</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedRaceId && positions.length > 0 && (
          <div>
            <Label>Starting Positions ({positions.length} racers)</Label>
            <div className="mt-2 max-h-64 overflow-y-auto space-y-2">
              {positions.map((pos, index) => (
                <div key={pos.racerId} className="flex items-center justify-between p-2 bg-white/70 rounded border">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white min-w-[40px]">
                      P{pos.position}
                    </Badge>
                    <span className="font-medium">{pos.racerName}</span>
                    <Badge variant="outline" className="bg-lime-100 text-lime-700 border-lime-300">
                      #{pos.kartNumber}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => movePosition(index, 'up')}
                      disabled={index === 0}
                      className="h-6 w-6 p-0 text-blue-600"
                    >
                      ↑
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => movePosition(index, 'down')}
                      disabled={index === positions.length - 1}
                      className="h-6 w-6 p-0 text-blue-600"
                    >
                      ↓
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedRaceId || positions.length === 0}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white"
          >
            {editingLineup ? 'Update Line-up' : 'Create Line-up'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineupForm;