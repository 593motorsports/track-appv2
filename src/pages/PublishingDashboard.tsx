import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, CheckCircle, AlertCircle, Clock, Rocket, Globe, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublishingGuide from '@/components/PublishingGuide';
import CapacitorInstallGuide from '@/components/CapacitorInstallGuide';
import DeploymentChecklist from '@/components/DeploymentChecklist';
import HostingOptions from '@/components/HostingOptions';
import MobileAppGuide from '@/components/MobileAppGuide';
import BackendStatus from '@/components/BackendStatus';

const PublishingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const quickStats = {
    readyTasks: 11,
    pendingTasks: 7,
    criticalTasks: 2,
    buildStatus: 'completed'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to App
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Publishing Dashboard</h1>
                <p className="text-gray-600">Deploy your Pinewood Derby Manager app</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Build Ready
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Smartphone className="h-3 w-3 mr-1" />
                Platforms Ready
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ready Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold text-green-600">{quickStats.readyTasks}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-2xl font-bold text-yellow-600">{quickStats.pendingTasks}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Critical Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-2xl font-bold text-red-600">{quickStats.criticalTasks}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Build Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Rocket className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-bold text-blue-600 capitalize">{quickStats.buildStatus}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Alert */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Smartphone className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>iOS and Android Platforms Ready!</strong> Your build is complete and mobile platforms are configured. 
            Run <code className="bg-blue-100 px-1 rounded">npm run cap:add:ios</code> and <code className="bg-blue-100 px-1 rounded">npm run cap:add:android</code> to add platforms.
          </AlertDescription>
        </Alert>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
            <TabsTrigger value="capacitor">Capacitor</TabsTrigger>
            <TabsTrigger value="hosting">Hosting</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <PublishingGuide />
          </TabsContent>

          <TabsContent value="checklist" className="space-y-6">
            <DeploymentChecklist />
          </TabsContent>

          <TabsContent value="capacitor" className="space-y-6">
            <CapacitorInstallGuide />
          </TabsContent>

          <TabsContent value="hosting" className="space-y-6">
            <HostingOptions />
          </TabsContent>

          <TabsContent value="mobile" className="space-y-6">
            <MobileAppGuide />
          </TabsContent>

          <TabsContent value="backend" className="space-y-6">
            <BackendStatus />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PublishingDashboard;