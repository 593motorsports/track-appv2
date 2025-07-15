import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'racer' | 'spectator';
}

interface Race {
  id: string;
  name: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  maxParticipants: number;
  class: string;
}

interface Registration {
  id: string;
  raceId: string;
  userId: string;
  racerId: string;
  racerName: string;
  racerNumber: number;
  kartNumber: number;
  status: 'pending' | 'approved' | 'denied';
  kartId?: string;
  raceClass: string;
  classes: string[];
}

interface Result {
  id: string;
  raceId: string;
  userId: string;
  position: number;
  lapTime?: string;
  points: number;
}

interface Kart {
  id: string;
  number: string;
  class: string;
  engineSize: string;
  available: boolean;
}

interface Lineup {
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
}

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  races: Race[];
  registrations: Registration[];
  results: Result[];
  karts: Kart[];
  lineups: Lineup[];
  addRace: (race: Omit<Race, 'id'>) => void;
  addRegistration: (registration: Omit<Registration, 'id' | 'racerNumber' | 'classes'>) => void;
  updateRegistration: (id: string, updates: Partial<Registration>) => void;
  addResult: (result: Omit<Result, 'id'>) => void;
  addLineup: (lineup: Lineup) => void;
  updateLineup: (lineup: Lineup) => void;
  deleteLineup: (lineupId: string) => void;
  getLeaderboard: () => { userId: string; name: string; totalPoints: number; }[];
  getAvailableRacerNumber: (raceClass: string) => number;
  getRegistrationsByClass: () => Record<string, Registration[]>;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  users: [],
  races: [],
  registrations: [],
  results: [],
  karts: [],
  lineups: [],
  addRace: () => {},
  addRegistration: () => {},
  updateRegistration: () => {},
  addResult: () => {},
  addLineup: () => {},
  updateLineup: () => {},
  deleteLineup: () => {},
  getLeaderboard: () => [],
  getAvailableRacerNumber: () => 1,
  getRegistrationsByClass: () => ({}),
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: '1',
    name: 'Admin User',
    email: 'admin@kartrack.com',
    role: 'admin'
  });
  
  const [users] = useState<User[]>([
    { id: '1', name: 'Admin User', email: 'admin@kartrack.com', role: 'admin' },
    { id: '2', name: 'John Racer', email: 'john@example.com', role: 'racer' },
    { id: '3', name: 'Jane Speed', email: 'jane@example.com', role: 'racer' },
  ]);
  
  const [races, setRaces] = useState<Race[]>([
    { id: '1', name: 'Sprint Championship', date: '2024-01-15', status: 'upcoming', maxParticipants: 20, class: 'Senior' },
    { id: '2', name: 'Endurance Challenge', date: '2024-01-22', status: 'upcoming', maxParticipants: 15, class: 'Junior' },
    { id: '3', name: 'Masters Cup', date: '2024-01-29', status: 'upcoming', maxParticipants: 12, class: 'Masters' },
  ]);
  
  const [registrations, setRegistrations] = useState<Registration[]>([
    { id: '1', raceId: '1', userId: '2', racerId: '2', racerName: 'John Racer', racerNumber: 23, kartNumber: 5, status: 'approved', raceClass: 'Senior', classes: ['Senior'] },
    { id: '2', raceId: '1', userId: '3', racerId: '3', racerName: 'Jane Speed', racerNumber: 17, kartNumber: 8, status: 'approved', raceClass: 'Senior', classes: ['Senior', 'Masters'] },
    { id: '3', raceId: '2', userId: '2', racerId: '2', racerName: 'John Racer', racerNumber: 12, kartNumber: 3, status: 'approved', raceClass: 'Junior', classes: ['Junior'] },
  ]);
  
  const [results, setResults] = useState<Result[]>([]);
  const [lineups, setLineups] = useState<Lineup[]>([]);
  
  const [karts] = useState<Kart[]>([
    { id: '1', number: 'K001', class: 'Junior', engineSize: '125cc', available: true },
    { id: '2', number: 'K002', class: 'Senior', engineSize: '250cc', available: true },
    { id: '3', number: 'K003', class: 'Masters', engineSize: '250cc', available: true },
  ]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const addRace = (race: Omit<Race, 'id'>) => {
    const newRace = { ...race, id: Date.now().toString() };
    setRaces(prev => [...prev, newRace]);
  };

  const getAvailableRacerNumber = (raceClass: string): number => {
    const usedNumbers = registrations
      .filter(reg => reg.raceClass === raceClass)
      .map(reg => reg.racerNumber);
    
    for (let i = 1; i <= 50; i++) {
      if (!usedNumbers.includes(i)) {
        return i;
      }
    }
    return Math.floor(Math.random() * 50) + 1;
  };

  const addRegistration = (registration: Omit<Registration, 'id' | 'racerNumber' | 'classes'>) => {
    const race = races.find(r => r.id === registration.raceId);
    const raceClass = registration.raceClass || race?.class || 'Unknown';
    const racerNumber = getAvailableRacerNumber(raceClass);
    
    const newRegistration = {
      ...registration,
      id: Date.now().toString(),
      racerNumber,
      raceClass,
      classes: [raceClass],
      status: 'approved' as const
    };
    setRegistrations(prev => [...prev, newRegistration]);
  };

  const updateRegistration = (id: string, updates: Partial<Registration>) => {
    setRegistrations(prev => prev.map(reg => reg.id === id ? { ...reg, ...updates } : reg));
  };

  const addResult = (result: Omit<Result, 'id'>) => {
    const newResult = { ...result, id: Date.now().toString() };
    setResults(prev => [...prev, newResult]);
  };

  const addLineup = (lineup: Lineup) => {
    setLineups(prev => [...prev, lineup]);
  };

  const updateLineup = (lineup: Lineup) => {
    setLineups(prev => prev.map(l => l.id === lineup.id ? lineup : l));
  };

  const deleteLineup = (lineupId: string) => {
    setLineups(prev => prev.filter(l => l.id !== lineupId));
  };

  const getLeaderboard = () => {
    const pointsByUser = results.reduce((acc, result) => {
      acc[result.userId] = (acc[result.userId] || 0) + result.points;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(pointsByUser)
      .map(([userId, totalPoints]) => {
        const user = users.find(u => u.id === userId);
        return {
          userId,
          name: user?.name || 'Unknown',
          totalPoints
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints);
  };

  const getRegistrationsByClass = () => {
    return registrations.reduce((acc, reg) => {
      if (!acc[reg.raceClass]) {
        acc[reg.raceClass] = [];
      }
      acc[reg.raceClass].push(reg);
      return acc;
    }, {} as Record<string, Registration[]>);
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        currentUser,
        setCurrentUser,
        users,
        races,
        registrations,
        results,
        karts,
        lineups,
        addRace,
        addRegistration,
        updateRegistration,
        addResult,
        addLineup,
        updateLineup,
        deleteLineup,
        getLeaderboard,
        getAvailableRacerNumber,
        getRegistrationsByClass,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};