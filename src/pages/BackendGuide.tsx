import BackendStatus from "@/components/BackendStatus";
import MobileOptimizationGuide from "@/components/MobileOptimizationGuide";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BackendGuide = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Backend Completion Guide</h1>
        <p className="text-muted-foreground">
          Your karting app backend status and mobile distribution readiness
        </p>
      </div>
      
      <Tabs defaultValue="status" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="status">Current Status</TabsTrigger>
          <TabsTrigger value="guide">Optimization Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="mt-6">
          <BackendStatus />
        </TabsContent>
        
        <TabsContent value="guide" className="mt-6">
          <MobileOptimizationGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackendGuide;