import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe, Info } from "lucide-react";

export default function ProxyInterface() {
  const [targetUrl, setTargetUrl] = useState("");
  const [enableJavaScript, setEnableJavaScript] = useState(true);
  const [acceptCookies, setAcceptCookies] = useState(false);
  const [loadImages, setLoadImages] = useState(true);

  const handleProxyRequest = () => {
    if (!targetUrl) return;
    
    // In a real implementation, this would handle the proxy request
    console.log("Proxy request:", { targetUrl, enableJavaScript, acceptCookies, loadImages });
  };

  return (
    <Card 
      className="cyber-border"
      style={{ backgroundColor: "var(--cyber-gray)" }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe style={{ color: "var(--matrix-green)" }} />
          Secure Web Proxy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="url">Enter Website URL</Label>
          <div className="flex space-x-3 mt-2">
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
              style={{ 
                backgroundColor: "var(--matrix-green)",
                color: "var(--cyber-black)"
              }}
            >
              <Globe className="mr-2 h-4 w-4" />
              Browse
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="javascript"
              checked={enableJavaScript}
              onCheckedChange={setEnableJavaScript}
            />
            <Label htmlFor="javascript">Enable JavaScript</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="cookies"
              checked={acceptCookies}
              onCheckedChange={setAcceptCookies}
            />
            <Label htmlFor="cookies">Accept Cookies</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="images"
              checked={loadImages}
              onCheckedChange={setLoadImages}
            />
            <Label htmlFor="images">Load Images</Label>
          </div>
        </div>

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
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
