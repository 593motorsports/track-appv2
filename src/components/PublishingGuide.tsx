import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, AlertCircle, Globe, Smartphone } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GuideStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  category: 'web' | 'mobile';
}

const PublishingGuide: React.FC = () => {
  const steps: GuideStep[] = [
    // Web Publishing Steps
    { id: 'web-1', title: 'Build Application', description: 'Create production build with npm run build', status: 'completed', category: 'web' },
    { id: 'web-2', title: 'Choose Hosting Provider', description: 'Select from Netlify, Vercel, or other platforms', status: 'completed', category: 'web' },
    { id: 'web-3', title: 'Configure Domain', description: 'Set up custom domain and SSL certificate', status: 'completed', category: 'web' },
    { id: 'web-4', title: 'Deploy to Production', description: 'Upload and deploy your application', status: 'current', category: 'web' },
    { id: 'web-5', title: 'Test Live Application', description: 'Verify all features work in production', status: 'pending', category: 'web' },
    
    // Mobile Publishing Steps
    { id: 'mobile-1', title: 'Install Capacitor', description: 'Set up Capacitor for mobile development', status: 'completed', category: 'mobile' },
    { id: 'mobile-2', title: 'Initialize Project', description: 'Configure Capacitor with app details', status: 'completed', category: 'mobile' },
    { id: 'mobile-3', title: 'Build Web App', description: 'Create production build for mobile', status: 'completed', category: 'mobile' },
    { id: 'mobile-4', title: 'Add iOS Platform', description: 'Run npm run cap:add:ios', status: 'current', category: 'mobile' },
    { id: 'mobile-5', title: 'Add Android Platform', description: 'Run npm run cap:add:android', status: 'current', category: 'mobile' },
    { id: 'mobile-6', title: 'Sync Projects', description: 'Sync assets with npm run cap:sync', status: 'pending', category: 'mobile' },
    { id: 'mobile-7', title: 'Open Native IDEs', description: 'Open Xcode and Android Studio', status: 'pending', category: 'mobile' },
    { id: 'mobile-8', title: 'Test Mobile Apps', description: 'Test on devices and simulators', status: 'pending', category: 'mobile' },
    { id: 'mobile-9', title: 'Publish to Stores', description: 'Submit to App Store and Google Play', status: 'pending', category: 'mobile' }
  ];

  const getStatusIcon = (status: GuideStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'current':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const webSteps = steps.filter(s => s.category === 'web');
  const mobileSteps = steps.filter(s => s.category === 'mobile');
  const webCompleted = webSteps.filter(s => s.status === 'completed').length;
  const mobileCompleted = mobileSteps.filter(s => s.status === 'completed').length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Web Publishing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Web Publishing</span>
          </CardTitle>
          <CardDescription>
            Deploy your web application to hosting platforms
          </CardDescription>
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Progress: {webCompleted}/{webSteps.length} steps completed • Ready for deployment
            </AlertDescription>
          </Alert>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {webSteps.map((step) => (
              <div key={step.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                {getStatusIcon(step.status)}
                <div className="flex-grow">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                  {step.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mobile Publishing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>Mobile Publishing</span>
          </CardTitle>
          <CardDescription>
            iOS and Android platforms ready to be added
          </CardDescription>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Progress: {mobileCompleted}/{mobileSteps.length} steps completed • Ready to add platforms
            </AlertDescription>
          </Alert>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mobileSteps.map((step) => (
              <div key={step.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                {getStatusIcon(step.status)}
                <div className="flex-grow">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                  {step.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublishingGuide;