import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, Globe, Shield, DollarSign } from "lucide-react";

const HostingOptions = () => {
  const platforms = [
    {
      name: "Vercel",
      description: "Optimal for React apps with automatic deployments",
      pricing: "Free tier available",
      features: ["Auto-deploy from Git", "Global CDN", "Serverless functions", "Custom domains"],
      pros: ["Zero config", "Excellent performance", "Built-in analytics"],
      recommended: true,
      url: "https://vercel.com"
    },
    {
      name: "Netlify",
      description: "Popular JAMstack platform with great developer experience",
      pricing: "Free tier available",
      features: ["Continuous deployment", "Form handling", "Split testing", "Edge functions"],
      pros: ["Easy setup", "Great free tier", "Built-in forms"],
      recommended: true,
      url: "https://netlify.com"
    },
    {
      name: "AWS Amplify",
      description: "Full-stack platform with backend integration",
      pricing: "Pay per use",
      features: ["CI/CD pipeline", "Backend services", "Authentication", "Storage"],
      pros: ["Full AWS integration", "Scalable", "Backend included"],
      recommended: false,
      url: "https://aws.amazon.com/amplify"
    },
    {
      name: "Firebase Hosting",
      description: "Google's web hosting with real-time database",
      pricing: "Free tier available",
      features: ["Fast CDN", "SSL certificates", "Custom domains", "Analytics"],
      pros: ["Google integration", "Real-time features", "Mobile SDKs"],
      recommended: false,
      url: "https://firebase.google.com"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Hosting Platforms</h2>
        <p className="text-muted-foreground">Choose the best platform for your karting app</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {platforms.map((platform, i) => (
          <Card key={i} className={platform.recommended ? 'border-green-200 bg-green-50/50' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {platform.name}
                  {platform.recommended && <Badge className="bg-green-500">Recommended</Badge>}
                </CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <a href={platform.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <CardDescription>{platform.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">{platform.pricing}</span>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Key Features
                </h4>
                <ul className="text-sm space-y-1">
                  {platform.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Advantages
                </h4>
                <ul className="text-sm space-y-1">
                  {platform.pros.map((pro, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HostingOptions;