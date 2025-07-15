import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';
import LineupCard from './LineupCard';
import LineupForm from './LineupForm';

const Lineups: React.FC = () => {
  const { currentUser, lineups, addLineup, updateLineup, deleteLineup, races } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingLineup, setEditingLineup] = useState<any>(null);
  const [filterClass, setFilterClass] = useState<string>('all');

  const isAdmin = currentUser?.role === 'admin';
  
  // Get unique classes from races
  const raceClasses = [...new Set(races.map(race => race.class))];
  
  // Filter lineups by class
  const filteredLineups = lineups.filter(lineup => 
    filterClass === 'all' || lineup.raceClass === filterClass
  );

  const handleCreateLineup = (lineup: any) => {
    if (editingLineup) {
      updateLineup(lineup);
    } else {
      addLineup(lineup);
    }
    setShowForm(false);
    setEditingLineup(null);
  };

  const handleEditLineup = (lineup: any) => {
    setEditingLineup(lineup);
    setShowForm(true);
  };

  const handleDeleteLineup = (lineupId: string) => {
    if (window.confirm('Are you sure you want to delete this line-up?')) {
      deleteLineup(lineupId);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingLineup(null);
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
        <div className="max-w-4xl mx-auto">
          <LineupForm
            onSubmit={handleCreateLineup}
            onCancel={handleCancelForm}
            editingLineup={editingLineup}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Race Line-ups
            </h1>
            <p className="text-gray-600 mt-1">
              View starting positions for upcoming races
            </p>
          </div>
          {isAdmin && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg"
            >
              Create Line-up
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card className="bg-gradient-to-r from-white to-gray-50 border-2 border-pink-200 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold text-gray-700">Filter by Class:</label>
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {raceClasses.map(raceClass => (
                    <SelectItem key={raceClass} value={raceClass}>
                      {raceClass}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="outline" className="bg-lime-100 text-lime-700 border-lime-300">
                {filteredLineups.length} line-up{filteredLineups.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Lineups Grid */}
        {filteredLineups.length === 0 ? (
          <Card className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-pink-200">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🏁</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No Line-ups Available
              </h3>
              <p className="text-gray-600 mb-4">
                {filterClass === 'all' 
                  ? 'No race line-ups have been created yet.' 
                  : `No line-ups found for ${filterClass} class.`
                }
              </p>
              {isAdmin && (
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                >
                  Create First Line-up
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLineups.map(lineup => (
              <LineupCard
                key={lineup.id}
                lineup={lineup}
                onEdit={isAdmin ? handleEditLineup : undefined}
                onDelete={isAdmin ? handleDeleteLineup : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lineups;