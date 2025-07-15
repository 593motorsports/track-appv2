import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, AlertCircle, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'critical';
  category: 'build' | 'capacitor' | 'deployment' | 'testing';
}

const DeploymentChecklist: React.FC = () => {
  const tasks: Task[] = [
    // Build tasks
    { id: '1', title: 'Build Application', description: 'Run npm run build successfully', status: 'completed', category: 'build' },
    { id: '2', title: 'Optimize Assets', description: 'Minify and compress static assets', status: 'completed', category: 'build' },
    { id: '3', title: 'Environment Variables', description: 'Configure production environment variables', status: 'completed', category: 'build' },
    
    // Capacitor tasks
    { id: '4', title: 'Install Capacitor Dependencies', description: 'Install @capacitor/core and @capacitor/cli', status: 'completed', category: 'capacitor' },
    { id: '5', title: 'Initialize Capacitor', description: 'Run npx cap init', status: 'completed', category: 'capacitor' },
    { id: '6', title: 'Add Mobile Platforms', description: 'Add iOS and Android platforms', status: 'critical', category: 'capacitor' },
    { id: '7', title: 'Sync Project', description: 'Sync web assets to native projects', status: 'critical', category: 'capacitor' },
    
    // Deployment tasks
    { id: '8', title: 'Choose Hosting Provider', description: 'Select web hosting service', status: 'completed', category: 'deployment' },
    { id: '9', title: 'Configure Domain', description: 'Set up custom domain and SSL', status: 'completed', category: 'deployment' },
    { id: '10', title: 'Deploy to Production', description: 'Upload and deploy application', status: 'pending', category: 'deployment' },
    { id: '11', title: 'Configure CI/CD', description: 'Set up automated deployment pipeline', status: 'pending', category: 'deployment' },
    
    // Testing tasks
    { id: '12', title: 'Test Web Application', description: 'Verify web app functionality', status: 'completed', category: 'testing' },
    { id: '13', title: 'Test Mobile Apps', description: 'Test iOS and Android versions', status: 'critical', category: 'testing' },
    { id: '14', title: 'Performance Testing', description: 'Check load times and responsiveness', status: 'completed', category: 'testing' },
    { id: '15', title: 'Cross-browser Testing', description: 'Test across different browsers', status: 'completed', category: 'testing' },
    { id: '16', title: 'User Acceptance Testing', description: 'Final user testing before launch', status: 'critical', category: 'testing' }
  ];

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: Task['status']) => {
    const variants = {
      completed: 'bg-green-100 text-green-800',
      critical: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const criticalTasks = tasks.filter(t => t.status === 'critical').length;
  const totalTasks = tasks.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Checklist</CardTitle>
        <CardDescription>
          Track your progress through the deployment process
        </CardDescription>
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Progress: {completedTasks}/{totalTasks} tasks completed • {criticalTasks} critical tasks remaining
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {['build', 'capacitor', 'deployment', 'testing'].map(category => {
            const categoryTasks = tasks.filter(t => t.category === category);
            const categoryCompleted = categoryTasks.filter(t => t.status === 'completed').length;
            
            return (
              <div key={category} className="space-y-2">
                <h3 className="font-semibold text-lg capitalize flex items-center justify-between">
                  {category}
                  <Badge variant="outline">
                    {categoryCompleted}/{categoryTasks.length}
                  </Badge>
                </h3>
                <div className="space-y-2">
                  {categoryTasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(task.status)}
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                      </div>
                      {getStatusBadge(task.status)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentChecklist;