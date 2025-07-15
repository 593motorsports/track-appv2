import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

interface LineupCardProps {
  lineup: {
    id: string;
    raceId: string;
    raceName: string;
    raceClass: string;
    format: 'single' | 'double';
    positions: Array<{
      position: number;
      racerId: string;
      racerName: string;
      kartNumber: number;
    }>;
    createdAt: string;
  };
  onEdit?: (lineup: any) => void;
  onDelete?: (lineupId: string) => void;
}

const LineupCard: React.FC<LineupCardProps> = ({ lineup, onEdit, onDelete }) => {
  const { currentUser } = useAppContext();
  const isAdmin = currentUser?.role === 'admin';

  const formatPositions = () => {
    if (lineup.format === 'single') {
      return lineup.positions.map(pos => (
        <div key={pos.position} className="flex justify-between items-center py-1 px-2 bg-white/50 rounded">
          <span className="font-semibold text-pink-600">P{pos.position}</span>
          <span className="font-medium">{pos.racerName}</span>
          <Badge variant="outline" className="bg-lime-100 text-lime-700 border-lime-300">
            #{pos.kartNumber}
          </Badge>
        </div>
      ));
    } else {
      const rows = Math.ceil(lineup.positions.length / 2);
      const leftColumn = lineup.positions.slice(0, rows);
      const rightColumn = lineup.positions.slice(rows);
      
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            {leftColumn.map(pos => (
              <div key={pos.position} className="flex justify-between items-center py-1 px-2 bg-white/50 rounded text-sm">
                <span className="font-semibold text-pink-600">P{pos.position}</span>
                <span className="font-medium">{pos.racerName}</span>
                <Badge variant="outline" className="bg-lime-100 text-lime-700 border-lime-300 text-xs">
                  #{pos.kartNumber}
                </Badge>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            {rightColumn.map(pos => (
              <div key={pos.position} className="flex justify-between items-center py-1 px-2 bg-white/50 rounded text-sm">
                <span className="font-semibold text-pink-600">P{pos.position}</span>
                <span className="font-medium">{pos.racerName}</span>
                <Badge variant="outline" className="bg-lime-100 text-lime-700 border-lime-300 text-xs">
                  #{pos.kartNumber}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-pink-200 hover:border-pink-400 transition-all duration-200 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-gray-800">{lineup.raceName}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {lineup.raceClass}
              </Badge>
              <Badge variant="outline" className={`
                ${lineup.format === 'single' 
                  ? 'bg-blue-100 text-blue-700 border-blue-300' 
                  : 'bg-orange-100 text-orange-700 border-orange-300'
                }
              `}>
                {lineup.format === 'single' ? 'Single File' : 'Double File'}
              </Badge>
            </div>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit?.(lineup)}
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete?.(lineup.id)}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {formatPositions()}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Created: {new Date(lineup.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default LineupCard;