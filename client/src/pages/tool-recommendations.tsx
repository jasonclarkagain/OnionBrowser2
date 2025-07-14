import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Download, ExternalLink, Search, Filter, Shield, Globe, Lock, Key, Smartphone, MessageSquare } from "lucide-react";
import { Link } from "wouter";

interface PrivacyTool {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  features: string[];
  setupGuide: string;
  downloadUrl: string;
  isEssential: boolean;
}

export default function ToolRecommendations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: tools = [], isLoading } = useQuery<PrivacyTool[]>({
    queryKey: ["/api/privacy-tools"],
  });

  const categories = [
    { id: "all", name: "All Tools", icon: Shield },
    { id: "browser", name: "Browsers", icon: Globe },
    { id: "vpn", name: "VPN Services", icon: Lock },
    { id: "password", name: "Password Managers", icon: Key },
    { id: "messaging", name: "Secure Messaging", icon: MessageSquare },
    { id: "encryption", name: "Encryption", icon: Lock },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone },
    { id: "file-sharing", name: "File Sharing", icon: Download }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const essentialTools = tools.filter(tool => tool.isEssential);

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : Shield;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-current' : ''}`}
        style={{ color: "var(--matrix-green)" }}
      />
    ));
  };

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Tool <span style={{ color: "var(--matrix-green)" }}>Recommendations</span>
          </h1>
          <p className="text-xl mb-6" style={{ color: "var(--text-secondary)" }}>
            Curated collection of privacy and security tools with setup guides and ratings
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                <Input
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  style={{ 
                    backgroundColor: "var(--cyber-black)",
                    borderColor: "var(--cyber-border)"
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {filteredTools.length} tools found
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Essential Tools Section */}
        {essentialTools.length > 0 && (
          <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star style={{ color: "var(--matrix-green)" }} />
                Essential Privacy Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {essentialTools.map((tool) => {
                  const Icon = getCategoryIcon(tool.category);
                  return (
                    <Card key={tool.id} className="cyber-border" style={{ backgroundColor: "var(--cyber-black)" }}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: "var(--matrix-green)" }}
                          >
                            <Icon className="w-4 h-4" style={{ color: "var(--cyber-black)" }} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{tool.name}</h3>
                            <div className="flex items-center gap-1">
                              {renderStars(tool.rating)}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Badge className="mb-2" style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
                          Essential
                        </Badge>
                        <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                          {tool.description}
                        </p>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => window.open(tool.downloadUrl, '_blank')}
                          style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}
                        >
                          <ExternalLink className="mr-2 w-3 h-3" />
                          Get Tool
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <Icon className="w-3 h-3 mr-1" />
                  {category.name}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="text-lg" style={{ color: "var(--text-secondary)" }}>Loading tools...</div>
                </div>
              ) : filteredTools.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-lg" style={{ color: "var(--text-secondary)" }}>No tools found matching your criteria.</div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => {
                    const Icon = getCategoryIcon(tool.category);
                    return (
                      <Card 
                        key={tool.id} 
                        className="cyber-border transition-all duration-300 hover:shadow-glow"
                        style={{ backgroundColor: "var(--cyber-gray)" }}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: "var(--matrix-green)" }}
                            >
                              <Icon className="w-5 h-5" style={{ color: "var(--cyber-black)" }} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{tool.name}</CardTitle>
                              <div className="flex items-center gap-1">
                                {renderStars(tool.rating)}
                                <span className="text-sm ml-1" style={{ color: "var(--text-secondary)" }}>
                                  ({tool.rating}/5)
                                </span>
                              </div>
                            </div>
                          </div>
                          {tool.isEssential && (
                            <Badge style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
                              Essential
                            </Badge>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                            {tool.description}
                          </p>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-2" style={{ color: "var(--matrix-green)" }}>Key Features:</h4>
                              <ul className="text-xs space-y-1">
                                {tool.features.slice(0, 3).map((feature, index) => (
                                  <li key={index} className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--matrix-green)" }}></div>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => window.open(tool.downloadUrl, '_blank')}
                                style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}
                              >
                                <Download className="mr-2 w-3 h-3" />
                                Download
                              </Button>
                              <Link href="/setup-guides">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}
                                >
                                  Setup Guide
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t" style={{ borderColor: "var(--cyber-border)" }}>
          <Link href="/tools">
            <Button variant="outline" style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
              ← Back to Tools
            </Button>
          </Link>
          
          <Link href="/setup-guides">
            <Button style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
              Setup Guides →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}