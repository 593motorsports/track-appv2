import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

const BackendStatus = () => {
  const completedTasks = [
    { name: "Database Schema", description: "Users, races, karts, registrations, results, lineups tables created" },
    { name: "Row Level Security", description: "RLS policies implemented for data protection" },
    { name: "Supabase Integration", description: "Client configured for frontend integration" }
  ];

  const pendingTasks = [
    { name: "Authentication", description: "User login/signup system" },
    { name: "Real-time Updates", description: "WebSocket connections for live data" },
    { name: "Push Notifications", description: "Mobile notification system" },
    { name: "File Storage", description: "Image and document storage" },
    { name: "API Rate Limiting", description: "Prevent abuse and ensure performance" },
    { name: "Data Validation", description: "Server-side input validation" },
    { name: "Caching Strategy", description: "Performance optimization" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Backend Status - Ready for Mobile Distribution
          </CardTitle>
          <CardDescription>
            Core backend infrastructure is complete. Additional features can be added incrementally.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed (Ready for Mobile)
            </h3>
            <div className="space-y-2">
              {completedTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">{task.name}</h4>
                    <p className="text-sm text-green-700">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-amber-600 mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Future Enhancements
            </h3>
            <div className="space-y-2">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <Clock className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">{task.name}</h4>
                    <p className="text-sm text-amber-700">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Mobile Distribution Readiness</h4>
            <p className="text-sm text-blue-700 mb-3">
              Your app has the essential backend infrastructure for mobile distribution:
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Database schema with proper relationships</li>
              <li>• Security policies for data protection</li>
              <li>• Supabase integration for real-time capabilities</li>
              <li>• Scalable architecture for future enhancements</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackendStatus;