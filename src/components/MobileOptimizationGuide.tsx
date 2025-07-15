import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, AlertTriangle } from "lucide-react";

interface BackendTask {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  category: 'database' | 'auth' | 'api' | 'storage' | 'performance' | 'security';
}

const backendTasks: BackendTask[] = [
  {
    id: '1',
    title: 'Database Schema Setup',
    description: 'Create tables for users, races, registrations, results, karts, and lineups',
    priority: 'high',
    status: 'pending',
    category: 'database'
  },
  {
    id: '2',
    title: 'Authentication System',
    description: 'Implement user registration, login, and role-based access control',
    priority: 'high',
    status: 'pending',
    category: 'auth'
  },
  {
    id: '3',
    title: 'Real-time Updates',
    description: 'Setup WebSocket connections for live race updates and leaderboards',
    priority: 'high',
    status: 'pending',
    category: 'api'
  },
  {
    id: '4',
    title: 'File Storage',
    description: 'Configure storage for racer photos, race documents, and results',
    priority: 'medium',
    status: 'pending',
    category: 'storage'
  },
  {
    id: '5',
    title: 'API Rate Limiting',
    description: 'Implement rate limiting to prevent abuse and ensure fair usage',
    priority: 'medium',
    status: 'pending',
    category: 'security'
  },
  {
    id: '6',
    title: 'Data Validation',
    description: 'Add server-side validation for all user inputs and API endpoints',
    priority: 'high',
    status: 'pending',
    category: 'security'
  },
  {
    id: '7',
    title: 'Caching Strategy',
    description: 'Implement caching for frequently accessed data like leaderboards',
    priority: 'medium',
    status: 'pending',
    category: 'performance'
  },
  {
    id: '8',
    title: 'Push Notifications',
    description: 'Setup push notifications for race updates and registration confirmations',
    priority: 'medium',
    status: 'pending',
    category: 'api'
  }
];

const MobileOptimizationGuide = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const groupedTasks = backendTasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, BackendTask[]>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Backend Completion Guide for Mobile Distribution</CardTitle>
          <CardDescription>
            Essential backend tasks to complete before mobile app distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {Object.entries(groupedTasks).map(([category, tasks]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-lg font-semibold capitalize">{category}</h3>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      {getStatusIcon(task.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileOptimizationGuide;