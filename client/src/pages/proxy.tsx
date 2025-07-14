import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Globe, Info, Lock, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NetworkVisualization from "@/components/three/NetworkVisualization";

export default function Proxy() {
  const [targetUrl, setTargetUrl] = useState("");
  const [enableJavaScript, setEnableJavaScript] = useState(true);
  const [acceptCookies, setAcceptCookies] = useState(false);
  const [loadImages, setLoadImages] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { data: stats } = useQuery({
    queryKey: ["/api/proxy/stats"],
  });

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      if (!["http:", "https:"].includes(urlObj.protocol)) {
        return false;
      }
      if (urlObj.hostname.endsWith(".onion")) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleProxyRequest = async () => {
    if (!targetUrl) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(targetUrl)) {
      toast({
        title: "Invalid URL",
        description: ".onion sites are not supported. Please use Tor Browser for accessing .onion sites.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real implementation, this would open the proxied site in a new window/iframe
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
      window.open(proxyUrl, '_blank');
      
      toast({
        title: "Proxy request initiated",
        description: "Opening website through secure proxy",
      });
    } catch (error) {
      toast({
        title: "Proxy Error",
        description: "Failed to proxy the requested website",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Secure <span style={{ color: "var(--matrix-green)" }}>Web Proxy</span>
          </h1>
          <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
            Browse regular websites through our encrypted proxy for enhanced privacy protection
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Proxy Interface */}
          <Card 
            className="cyber-border mb-8"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe style={{ color: "var(--matrix-green)" }} />
                Proxy Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* URL Input */}
              <div>
                <Label htmlFor="url" className="block text-sm font-semibold mb-2">
                  Enter Website URL
                </Label>
                <div className="flex space-x-3">
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="flex-1"
                    style={{ 
                      backgroundColor: "var(--cyber-black)",
                      borderColor: "var(--cyber-border)"
                    }}
                  />
                  <Button 
                    onClick={handleProxyRequest}
                    disabled={isLoading}
                    className="px-8"
                    style={{ 
                      backgroundColor: "var(--matrix-green)",
                      color: "var(--cyber-black)"
                    }}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    {isLoading ? "Loading..." : "Browse"}
                  </Button>
                </div>
              </div>

              {/* Proxy Settings */}
              <div>
                <Label className="block text-sm font-semibold mb-4">Proxy Settings</Label>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="javascript"
                      checked={enableJavaScript}
                      onCheckedChange={setEnableJavaScript}
                    />
                    <Label htmlFor="javascript" className="text-sm">Enable JavaScript</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="cookies"
                      checked={acceptCookies}
                      onCheckedChange={setAcceptCookies}
                    />
                    <Label htmlFor="cookies" className="text-sm">Accept Cookies</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="images"
                      checked={loadImages}
                      onCheckedChange={setLoadImages}
                    />
                    <Label htmlFor="images" className="text-sm">Load Images</Label>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div 
                className="rounded-lg p-4 border-l-4"
                style={{ 
                  backgroundColor: "var(--cyber-black)",
                  borderLeftColor: "var(--matrix-green)"
                }}
              >
                <div className="flex items-start space-x-3">
                  <Info style={{ color: "var(--matrix-green)" }} className="mt-1" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Security Notice</p>
                    <p style={{ color: "var(--text-secondary)" }}>
                      This proxy encrypts your connection but does not provide anonymity equivalent to Tor. 
                      For accessing .onion sites, please use the Tor Browser setup guide.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* .onion Warning */}
          <Card 
            className="cyber-border mb-8"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardContent className="pt-6">
              <div 
                className="rounded-lg p-4 border-l-4"
                style={{ 
                  backgroundColor: "var(--cyber-black)",
                  borderLeftColor: "var(--warning)"
                }}
              >
                <div className="flex items-start space-x-3">
                  <AlertTriangle style={{ color: "var(--warning)" }} className="mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--warning)" }}>
                      .onion Sites Not Supported
                    </h3>
                    <div className="text-sm space-y-2" style={{ color: "var(--text-secondary)" }}>
                      <p>
                        This proxy cannot access .onion sites as they require the Tor network infrastructure. 
                        .onion sites are only accessible through the Tor Browser.
                      </p>
                      <p>
                        <strong style={{ color: "var(--text-primary)" }}>For .onion access:</strong> 
                        Download and use the official Tor Browser from the Tor Project website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network Topology Visualization */}
          <Card 
            className="cyber-border mb-8"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield style={{ color: "var(--matrix-green)" }} />
                Network Routing Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                See how your traffic is routed through our secure proxy network to protect your privacy.
              </p>
              <NetworkVisualization className="border border-matrix-green/20 rounded-lg" />
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          {stats && (
            <div className="grid md:grid-cols-3 gap-6">
              <Card 
                className="cyber-border text-center"
                style={{ backgroundColor: "var(--cyber-gray)" }}
              >
                <CardContent className="pt-6">
                  <Shield className="mx-auto mb-2" style={{ color: "var(--matrix-green)" }} />
                  <div className="text-2xl font-bold" style={{ color: "var(--matrix-green)" }}>
                    256-bit
                  </div>
                  <div style={{ color: "var(--text-secondary)" }}>Encryption</div>
                </CardContent>
              </Card>

              <Card 
                className="cyber-border text-center"
                style={{ backgroundColor: "var(--cyber-gray)" }}
              >
                <CardContent className="pt-6">
                  <Zap className="mx-auto mb-2" style={{ color: "var(--matrix-green)" }} />
                  <div className="text-2xl font-bold" style={{ color: "var(--matrix-green)" }}>
                    {stats.successRate}%
                  </div>
                  <div style={{ color: "var(--text-secondary)" }}>Success Rate</div>
                </CardContent>
              </Card>

              <Card 
                className="cyber-border text-center"
                style={{ backgroundColor: "var(--cyber-gray)" }}
              >
                <CardContent className="pt-6">
                  <Lock className="mx-auto mb-2" style={{ color: "var(--matrix-green)" }} />
                  <div className="text-2xl font-bold" style={{ color: "var(--matrix-green)" }}>
                    {stats.averageResponseTime}ms
                  </div>
                  <div style={{ color: "var(--text-secondary)" }}>Avg Latency</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
