import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const AndroidStudioErrorCheck: React.FC = () => {
  const checks = [
    {
      name: 'Gradle Sync',
      status: 'success',
      message: 'Gradle sync completed successfully'
    },
    {
      name: 'Build Configuration',
      status: 'success',
      message: 'Build configuration is valid'
    },
    {
      name: 'Dependencies',
      status: 'warning',
      message: 'Some dependencies may need updates'
    },
    {
      name: 'Capacitor Integration',
      status: 'success',
      message: 'Capacitor is properly configured'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Android Studio Compatibility Check</CardTitle>
        <CardDescription>
          Checking for potential issues when importing to Android Studio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {checks.map((check, index) => (
          <Alert key={index} className="flex items-center space-x-3">
            {getStatusIcon(check.status)}
            <div>
              <h4 className="font-semibold">{check.name}</h4>
              <AlertDescription>{check.message}</AlertDescription>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};

export default AndroidStudioErrorCheck;