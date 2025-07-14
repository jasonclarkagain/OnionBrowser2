import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, ExternalLink, Globe, Shield, Key, MessageCircle, Puzzle, Monitor } from "lucide-react";
import type { PrivacyTool } from "@shared/schema";

const categoryIcons = {
  browser: Globe,
  vpn: Shield,
  password: Key,
  messaging: MessageCircle,
  extension: Puzzle,
  os: Monitor,
  encryption: Shield,
  "file-sharing": Globe,
};

export default function Tools() {
  const { data: tools, isLoading } = useQuery<PrivacyTool[]>({
    queryKey: ["/api/privacy-tools"],
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className="w-4 h-4"
        style={{
          color: i < rating ? "var(--matrix-green)" : "var(--cyber-border)",
          fill: i < rating ? "var(--matrix-green)" : "transparent"
        }}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--cyber-black)" }}>
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-32 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Essential <span style={{ color: "var(--matrix-green)" }}>Privacy Tools</span>
          </h1>
          <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
            Curated collection of privacy-focused applications and security utilities
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools?.map((tool) => {
            const IconComponent = categoryIcons[tool.category as keyof typeof categoryIcons] || Shield;
            
            return (
              <Card 
                key={tool.id}
                className="cyber-border hover:shadow-glow transition-all duration-300"
                style={{ backgroundColor: "var(--cyber-gray)" }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: tool.isEssential 
                          ? "var(--matrix-green)" 
                          : "var(--dark-green)" 
                      }}
                    >
                      <IconComponent 
                        className="text-xl" 
                        style={{ 
                          color: tool.isEssential 
                            ? "var(--cyber-black)" 
                            : "var(--text-primary)" 
                        }} 
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          style={{ 
                            backgroundColor: tool.isEssential 
                              ? "var(--matrix-green)" 
                              : "var(--dark-green)",
                            color: tool.isEssential 
                              ? "var(--cyber-black)" 
                              : "var(--text-primary)"
                          }}
                        >
                          {tool.isEssential ? "Essential" : "Recommended"}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {renderStars(tool.rating)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                    {tool.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {(tool.features as string[]).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check 
                          className="w-4 h-4" 
                          style={{ color: "var(--matrix-green)" }} 
                        />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <div className="space-y-2">
                    {tool.downloadUrl && (
                      <Button 
                        className="w-full"
                        style={{ 
                          backgroundColor: "var(--matrix-green)",
                          color: "var(--cyber-black)"
                        }}
                        onClick={() => window.open(tool.downloadUrl!, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                    
                    {tool.setupGuide && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        style={{ 
                          borderColor: "var(--matrix-green)",
                          color: "var(--matrix-green)"
                        }}
                      >
                        Setup Guide
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Categories Filter - Future Enhancement */}
        <div className="mt-16 text-center">
          <Card 
            className="cyber-border max-w-2xl mx-auto"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardHeader>
              <CardTitle>Need a Specific Tool?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                Looking for tools in a specific category? Browse our comprehensive collection organized by use case.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  style={{ 
                    borderColor: "var(--matrix-green)",
                    color: "var(--matrix-green)"
                  }}
                >
                  <Globe className="w-4 h-4" />
                  Browsers
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  style={{ 
                    borderColor: "var(--matrix-green)",
                    color: "var(--matrix-green)"
                  }}
                >
                  <Shield className="w-4 h-4" />
                  VPNs
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  style={{ 
                    borderColor: "var(--matrix-green)",
                    color: "var(--matrix-green)"
                  }}
                >
                  <Key className="w-4 h-4" />
                  Password Managers
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  style={{ 
                    borderColor: "var(--matrix-green)",
                    color: "var(--matrix-green)"
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Messaging
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  style={{ 
                    borderColor: "var(--matrix-green)",
                    color: "var(--matrix-green)"
                  }}
                >
                  <Puzzle className="w-4 h-4" />
                  Extensions
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  style={{ 
                    borderColor: "var(--matrix-green)",
                    color: "var(--matrix-green)"
                  }}
                >
                  <Monitor className="w-4 h-4" />
                  Operating Systems
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
