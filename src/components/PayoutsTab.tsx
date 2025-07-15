import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClassData {
  name: string;
  racers: number;
  entryFee: number;
}

const PayoutsTab: React.FC = () => {
  const [classes, setClasses] = useState<ClassData[]>([
    { name: 'Cadet', racers: 0, entryFee: 0 },
    { name: 'Junior', racers: 0, entryFee: 0 },
    { name: 'Senior', racers: 0, entryFee: 0 },
    { name: 'Masters', racers: 0, entryFee: 0 }
  ]);
  const [splitFormula, setSplitFormula] = useState<'60-40' | '50-30-20'>('60-40');

  const updateClass = (index: number, field: keyof ClassData, value: string | number) => {
    const updated = [...classes];
    updated[index] = { ...updated[index], [field]: value };
    setClasses(updated);
  };

  const totalEntryFees = classes.reduce((total, cls) => total + (cls.racers * cls.entryFee), 0);

  const calculateSplit = () => {
    if (splitFormula === '60-40') {
      return {
        first: totalEntryFees * 0.6,
        second: totalEntryFees * 0.4,
        third: 0
      };
    } else {
      return {
        first: totalEntryFees * 0.5,
        second: totalEntryFees * 0.3,
        third: totalEntryFees * 0.2
      };
    }
  };

  const split = calculateSplit();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Race Class Entry Fees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {classes.map((cls, index) => (
            <div key={cls.name} className="grid grid-cols-3 gap-4 items-center">
              <Label className="font-semibold">{cls.name}</Label>
              <div>
                <Label className="text-sm">Racers</Label>
                <Input
                  type="number"
                  value={cls.racers}
                  onChange={(e) => updateClass(index, 'racers', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
              <div>
                <Label className="text-sm">Entry Fee ($)</Label>
                <Input
                  type="number"
                  value={cls.entryFee}
                  onChange={(e) => updateClass(index, 'entryFee', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Entry Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            ${totalEntryFees.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payout Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Split Formula</Label>
            <Select value={splitFormula} onValueChange={(value: '60-40' | '50-30-20') => setSplitFormula(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60-40">60% / 40%</SelectItem>
                <SelectItem value="50-30-20">50% / 30% / 20%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
              <span className="font-semibold">1st Place:</span>
              <span className="text-xl font-bold text-yellow-600">${split.first.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-semibold">2nd Place:</span>
              <span className="text-xl font-bold text-gray-600">${split.second.toFixed(2)}</span>
            </div>
            {splitFormula === '50-30-20' && (
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                <span className="font-semibold">3rd Place:</span>
                <span className="text-xl font-bold text-orange-600">${split.third.toFixed(2)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayoutsTab;