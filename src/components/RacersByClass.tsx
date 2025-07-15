import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';

const RacersByClass: React.FC = () => {
  const { getRegistrationsByClass } = useAppContext();
  const registrationsByClass = getRegistrationsByClass();

  return (
    <Card className="bg-white/80 backdrop-blur border-2 border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <span>🏆</span>
          Racers by Class
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(registrationsByClass).map(([raceClass, registrations]) => {
            // Sort by racer number within each class
            const sortedRegistrations = [...registrations]
              .filter(reg => reg.status === 'approved')
              .sort((a, b) => a.racerNumber - b.racerNumber);

            if (sortedRegistrations.length === 0) return null;

            return (
              <div key={raceClass} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-lg text-blue-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">🏁</span>
                  {raceClass} Class ({sortedRegistrations.length} racers)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {sortedRegistrations.map(registration => (
                    <div key={registration.id} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="font-medium text-gray-800">
                        #{registration.racerNumber} {registration.racerName}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Kart {registration.kartNumber}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {Object.keys(registrationsByClass).length === 0 && (
            <p className="text-gray-500 italic text-center py-4">No approved registrations yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RacersByClass;