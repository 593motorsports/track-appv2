import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';

const Registration: React.FC = () => {
  const { races, currentUser, addRegistration, registrations } = useAppContext();
  const [selectedRaceId, setSelectedRaceId] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    kartNumber: 1
  });

  const availableClasses = ['Junior', 'Senior', 'Masters'];
  const availableRaces = races.filter(race => race.status === 'upcoming');

  const handleClassToggle = (raceClass: string) => {
    setSelectedClasses(prev => 
      prev.includes(raceClass) 
        ? prev.filter(c => c !== raceClass)
        : [...prev, raceClass]
    );
  };

  const handleSubmit = () => {
    if (!selectedRaceId || !formData.name || !formData.email || !formData.phone || selectedClasses.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select at least one class.",
        variant: "destructive"
      });
      return;
    }

    if (!currentUser) {
      toast({
        title: "Authentication Error",
        description: "Please log in to register for races.",
        variant: "destructive"
      });
      return;
    }

    // Create a registration for each selected class
    selectedClasses.forEach(raceClass => {
      addRegistration({
        raceId: selectedRaceId,
        userId: currentUser.id,
        racerId: currentUser.id,
        racerName: formData.name,
        kartNumber: formData.kartNumber,
        status: 'pending',
        raceClass
      });
    });

    toast({
      title: "Registration Submitted! 🎉",
      description: `You've registered for ${selectedClasses.length} class(es). Each will get a unique racer number (1-50).`,
    });

    // Reset form
    setSelectedRaceId('');
    setSelectedClasses([]);
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: '',
      kartNumber: 1
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Race Registration
          </h2>
          <p className="text-gray-600">Register for upcoming races across multiple classes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/90 backdrop-blur border-2 border-gray-200 hover:border-pink-300 transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-600">
                <span>📝</span>
                Registration Form
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="race-select" className="text-gray-700 font-semibold">Select Race *</Label>
                <Select value={selectedRaceId} onValueChange={setSelectedRaceId}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-pink-400">
                    <SelectValue placeholder="Choose a race to register for" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRaces.map(race => (
                      <SelectItem key={race.id} value={race.id}>
                        {race.name} - {new Date(race.date).toLocaleDateString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">Select Classes *</Label>
                <div className="grid grid-cols-1 gap-2">
                  {availableClasses.map(raceClass => (
                    <div key={raceClass} className="flex items-center space-x-2">
                      <Checkbox 
                        id={raceClass}
                        checked={selectedClasses.includes(raceClass)}
                        onCheckedChange={() => handleClassToggle(raceClass)}
                      />
                      <Label htmlFor={raceClass} className="text-sm font-medium">
                        {raceClass} Class
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-semibold">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="border-2 border-gray-200 focus:border-pink-400"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-semibold">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="border-2 border-gray-200 focus:border-pink-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="border-2 border-gray-200 focus:border-pink-400"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="kart" className="text-gray-700 font-semibold">Kart Number</Label>
                  <Input
                    id="kart"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.kartNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, kartNumber: parseInt(e.target.value) || 1 }))}
                    className="border-2 border-gray-200 focus:border-pink-400"
                    placeholder="Preferred kart number"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 font-semibold py-3 transition-all duration-200 transform hover:scale-105"
                disabled={availableRaces.length === 0}
              >
                {availableRaces.length === 0 ? 'No Races Available' : 'Submit Registration 🏁'}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <span>🎯</span>
                  Multi-Class Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 mb-4">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    Multiple Classes
                  </div>
                  <p className="text-sm text-gray-600">You can register for multiple classes in the same race! Each class registration gets its own unique racer number (1-50).</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <span>ℹ️</span>
                  Registration Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-1">Multi-Class Benefits</h4>
                  <p className="text-sm text-blue-700">• Compete in multiple skill levels</p>
                  <p className="text-sm text-blue-700">• Separate racer numbers per class</p>
                  <p className="text-sm text-blue-700">• Individual class standings</p>
                  <p className="text-sm text-blue-700">• More racing opportunities</p>
                </div>
                
                <div className="p-3 bg-gradient-to-r from-green-50 to-lime-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-1">Number Assignment</h4>
                  <p className="text-sm text-green-700">• Unique numbers 1-50 per class</p>
                  <p className="text-sm text-green-700">• No duplicates within same class</p>
                  <p className="text-sm text-green-700">• Organized by class, then by number</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;