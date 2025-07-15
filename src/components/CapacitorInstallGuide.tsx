import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Step {
  id: number;
  title: string;
  description: string;
  command?: string;
  status: 'completed' | 'current' | 'pending';
  details?: string;
}

const CapacitorInstallGuide: React.FC = () => {
  const steps: Step[] = [
    {
      id: 1,
      title: 'Install Capacitor Dependencies',
      description: 'Add Capacitor core and CLI to your project',
      command: 'npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android',
      status: 'completed',
      details: 'All Capacitor dependencies installed successfully'
    },
    {
      id: 2,
      title: 'Initialize Capacitor',
      description: 'Set up Capacitor configuration',
      command: 'npx cap init',
      status: 'completed',
      details: 'Capacitor initialized with app configuration'
    },
    {
      id: 3,
      title: 'Build Your App',
      description: 'Create production build of your React app',
      command: 'npm run build',
      status: 'completed',
      details: 'Production build created successfully'
    },
    {
      id: 4,
      title: 'Add iOS Platform',
      description: 'Add iOS platform to your project',
      command: 'npm run cap:add:ios',
      status: 'current',
      details: 'Ready to add iOS platform - requires Xcode on macOS'
    },
    {
      id: 5,
      title: 'Add Android Platform',
      description: 'Add Android platform to your project',
      command: 'npm run cap:add:android',
      status: 'current',
      details: 'Ready to add Android platform - requires Android Studio'
    },
    {
      id: 6,
      title: 'Sync Project',
      description: 'Copy web assets to native projects',
      command: 'npm run cap:sync',
      status: 'pending',
      details: 'Sync after adding both platforms'
    },
    {
      id: 7,
      title: 'Open in IDEs',
      description: 'Open native projects in Xcode/Android Studio',
      command: 'npm run cap:open:ios && npm run cap:open:android',
      status: 'pending',
      details: 'Build and test your mobile apps'
    }
  ];

  const getStatusIcon = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: Step['status']) => {
    const variants = {
      completed: 'bg-green-100 text-green-800',
      current: 'bg-blue-100 text-blue-800',
      pending: 'bg-gray-100 text-gray-600'
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const totalSteps = steps.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Capacitor Mobile Setup</CardTitle>
        <CardDescription>
          iOS and Android platforms ready to be added to your project
        </CardDescription>
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Progress: {completedSteps}/{totalSteps} steps completed • Ready to add mobile platforms
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{step.title}</h3>
                  {getStatusBadge(step.status)}
                </div>
                <p className="text-gray-600 mb-2">{step.description}</p>
                {step.command && (
                  <code className="block bg-gray-100 p-2 rounded text-sm font-mono mb-2">
                    {step.command}
                  </code>
                )}
                {step.details && (
                  <p className="text-sm text-gray-500 italic">{step.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CapacitorInstallGuide;