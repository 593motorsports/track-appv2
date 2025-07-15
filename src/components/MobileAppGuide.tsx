import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone, Download, Store, Code, TestTube, CheckCircle } from "lucide-react";

const MobileAppGuide = () => {
  const capacitorSteps = [
    {
      title: "Install Capacitor Dependencies",
      command: "npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android",
      description: "All Capacitor dependencies installed",
      status: "completed"
    },
    {
      title: "Initialize Capacitor",
      command: "npx cap init",
      description: "Capacitor configuration set up",
      status: "completed"
    },
    {
      title: "Build React App",
      command: "npm run build",
      description: "Production build created",
      status: "completed"
    },
    {
      title: "Add iOS Platform",
      command: "npm run cap:add:ios",
      description: "Create native iOS project (requires macOS + Xcode)",
      status: "ready"
    },
    {
      title: "Add Android Platform",
      command: "npm run cap:add:android",
      description: "Create native Android project (requires Android Studio)",
      status: "ready"
    },
    {
      title: "Sync Projects",
      command: "npm run cap:sync",
      description: "Copy web assets to native projects",
      status: "pending"
    },
    {
      title: "Open in IDEs",
      command: "npm run cap:open:ios && npm run cap:open:android",
      description: "Open Xcode and Android Studio",
      status: "pending"
    }
  ];

  const appStoreSteps = [
    { step: "Apple Developer Account", cost: "$99/year", required: true },
    { step: "App Store Connect Setup", cost: "Free", required: true },
    { step: "App Review Process", cost: "Free", required: true },
    { step: "Google Play Console", cost: "$25 one-time", required: true },
    { step: "App Signing Setup", cost: "Free", required: true }
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'ready') return <Download className="h-4 w-4 text-blue-500" />;
    return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Smartphone className="h-6 w-6" />
          Mobile App Development
        </h2>
        <p className="text-muted-foreground">iOS and Android platforms ready to be added</p>
      </div>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Your app is built and ready! Run the platform commands below to create native iOS and Android apps.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Capacitor Mobile Setup
          </CardTitle>
          <CardDescription>Transform your React app into native mobile apps</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {capacitorSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 border-l-4 border-blue-500 pl-4">
              {getStatusIcon(step.status)}
              <div className="flex-1">
                <h4 className="font-semibold">{i + 1}. {step.title}</h4>
                <code className="block bg-gray-100 p-2 rounded mt-2 text-sm">{step.command}</code>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Testing Your App
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">iOS Testing</h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Use iOS Simulator in Xcode</li>
                <li>• Test on physical device via TestFlight</li>
                <li>• Requires Apple Developer Account</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Android Testing</h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Use Android Emulator in Android Studio</li>
                <li>• Test on physical device via USB debugging</li>
                <li>• Internal testing via Google Play Console</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              App Store Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {appStoreSteps.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm">{item.step}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={item.required ? "default" : "secondary"}>
                    {item.cost}
                  </Badge>
                  {item.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Run <code className="bg-green-100 px-1 rounded">npm run cap:add:ios</code> to add iOS platform</p>
          <p>• Run <code className="bg-green-100 px-1 rounded">npm run cap:add:android</code> to add Android platform</p>
          <p>• Use <code className="bg-green-100 px-1 rounded">npm run cap:sync</code> to sync your built app</p>
          <p>• Open native IDEs with <code className="bg-green-100 px-1 rounded">npm run cap:open:ios</code> or <code className="bg-green-100 px-1 rounded">npm run cap:open:android</code></p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileAppGuide;