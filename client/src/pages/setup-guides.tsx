import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Download, ExternalLink, Play, BookOpen, Monitor, Smartphone, Settings } from "lucide-react";
import { Link } from "wouter";

export default function SetupGuides() {
  const [completedGuides, setCompletedGuides] = useState<number[]>([]);

  const guides = [
    {
      id: 1,
      title: "Tor Browser Setup",
      description: "Complete installation and configuration guide for the Tor Browser",
      category: "browser",
      difficulty: "Beginner",
      duration: "10 min",
      steps: [
        "Download Tor Browser from official torproject.org",
        "Verify the download signature for security",
        "Install Tor Browser on your operating system",
        "Configure security settings (Security Level: Standard)",
        "Test connection and verify .onion access",
        "Learn about safe browsing practices"
      ],
      downloadUrl: "https://www.torproject.org/download/",
      icon: Monitor
    },
    {
      id: 2,
      title: "VPN Configuration",
      description: "Step-by-step guide to choosing and setting up a VPN service",
      category: "network",
      difficulty: "Beginner",
      duration: "15 min",
      steps: [
        "Research and choose a no-logs VPN provider",
        "Create account with privacy-focused payment method",
        "Download official VPN client application",
        "Configure VPN settings (protocol, encryption)",
        "Set up kill switch and DNS leak protection",
        "Test for IP and DNS leaks after connection"
      ],
      downloadUrl: "",
      icon: Settings
    },
    {
      id: 3,
      title: "PGP Encryption Setup",
      description: "Learn to use PGP for email encryption and digital signatures",
      category: "encryption",
      difficulty: "Intermediate",
      duration: "25 min",
      steps: [
        "Download and install GPG (GNU Privacy Guard)",
        "Generate your PGP key pair (public/private keys)",
        "Upload public key to keyserver network",
        "Configure email client for PGP integration",
        "Practice encrypting and decrypting messages",
        "Learn key management and verification"
      ],
      downloadUrl: "https://gnupg.org/download/",
      icon: Settings
    },
    {
      id: 4,
      title: "Mobile Privacy Configuration",
      description: "Comprehensive privacy setup for iOS and Android devices",
      category: "mobile",
      difficulty: "Beginner",
      duration: "20 min",
      steps: [
        "Review and disable location tracking services",
        "Configure app permissions and access controls",
        "Set up secure messaging apps (Signal, etc.)",
        "Enable full device encryption and secure lock",
        "Configure privacy-focused DNS servers",
        "Install privacy-focused browsers and keyboards"
      ],
      downloadUrl: "",
      icon: Smartphone
    },
    {
      id: 5,
      title: "Password Manager Setup",
      description: "Install and configure a password manager for secure authentication",
      category: "password",
      difficulty: "Beginner",
      duration: "15 min",
      steps: [
        "Choose a reputable password manager service",
        "Create account with strong master password",
        "Install browser extensions and mobile apps",
        "Import existing passwords from browsers",
        "Generate strong passwords for existing accounts",
        "Set up two-factor authentication backup codes"
      ],
      downloadUrl: "",
      icon: Settings
    },
    {
      id: 6,
      title: "Signal Messenger Setup",
      description: "Configure Signal for secure, private messaging",
      category: "messaging",
      difficulty: "Beginner",
      duration: "10 min",
      steps: [
        "Download Signal from official app stores",
        "Verify phone number for account creation",
        "Configure disappearing messages settings",
        "Enable registration lock for account security",
        "Set up backup and restore functionality",
        "Learn about Signal's privacy features"
      ],
      downloadUrl: "https://signal.org/download/",
      icon: Smartphone
    }
  ];

  const categories = [
    { id: "all", name: "All Guides" },
    { id: "browser", name: "Browser Security" },
    { id: "network", name: "Network Security" },
    { id: "encryption", name: "Encryption Tools" },
    { id: "mobile", name: "Mobile Privacy" },
    { id: "password", name: "Password Security" },
    { id: "messaging", name: "Secure Messaging" }
  ];

  const markCompleted = (guideId: number) => {
    if (!completedGuides.includes(guideId)) {
      setCompletedGuides([...completedGuides, guideId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "var(--matrix-green)";
      case "Intermediate": return "var(--warning)";
      case "Advanced": return "var(--error)";
      default: return "var(--matrix-green)";
    }
  };

  const filteredGuides = (category: string) => {
    return category === "all" ? guides : guides.filter(g => g.category === category);
  };

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Setup <span style={{ color: "var(--matrix-green)" }}>Guides</span>
          </h1>
          <p className="text-xl mb-6" style={{ color: "var(--text-secondary)" }}>
            Step-by-step installation and configuration guides for privacy and security tools
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>{completedGuides.length} of {guides.length} completed</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>Detailed instructions</span>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle>Setup Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>
                  {Math.round((completedGuides.length / guides.length) * 100)}%
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>
                  {guides.reduce((acc, g) => acc + parseInt(g.duration), 0)}
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Total Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>
                  {guides.reduce((acc, g) => acc + g.steps.length, 0)}
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Total Steps</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guide Categories */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7" style={{ backgroundColor: "var(--cyber-gray)" }}>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredGuides(category.id).map((guide) => {
                  const Icon = guide.icon;
                  const isCompleted = completedGuides.includes(guide.id);
                  
                  return (
                    <Card 
                      key={guide.id} 
                      className="cyber-border transition-all duration-300 hover:shadow-glow"
                      style={{ backgroundColor: "var(--cyber-gray)" }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: isCompleted ? "var(--matrix-green)" : "var(--cyber-black)" }}
                            >
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5" style={{ color: "var(--cyber-black)" }} />
                              ) : (
                                <Icon className="w-5 h-5" style={{ color: "var(--matrix-green)" }} />
                              )}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{guide.title}</CardTitle>
                              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                                {guide.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 mb-4">
                          <Badge style={{ backgroundColor: getDifficultyColor(guide.difficulty), color: "var(--cyber-black)" }}>
                            {guide.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" style={{ color: "var(--text-secondary)" }} />
                            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                              {guide.duration}
                            </span>
                          </div>
                          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                            {guide.steps.length} steps
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          <h4 className="font-medium" style={{ color: "var(--matrix-green)" }}>Setup Steps:</h4>
                          <ul className="space-y-1">
                            {guide.steps.slice(0, 3).map((step, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                                <div className="w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 text-xs" 
                                     style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
                                  {index + 1}
                                </div>
                                {step}
                              </li>
                            ))}
                            {guide.steps.length > 3 && (
                              <li className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                ... and {guide.steps.length - 3} more steps
                              </li>
                            )}
                          </ul>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1"
                            style={{ 
                              backgroundColor: isCompleted ? "var(--cyber-black)" : "var(--matrix-green)", 
                              color: isCompleted ? "var(--matrix-green)" : "var(--cyber-black)" 
                            }}
                            onClick={() => markCompleted(guide.id)}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="mr-2 w-4 h-4" />
                                Completed
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 w-4 h-4" />
                                Start Guide
                              </>
                            )}
                          </Button>
                          
                          {guide.downloadUrl && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(guide.downloadUrl, '_blank')}
                              style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t" style={{ borderColor: "var(--cyber-border)" }}>
          <Link href="/tool-recommendations">
            <Button variant="outline" style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
              ← Tool Recommendations
            </Button>
          </Link>
          
          <Link href="/tools">
            <Button style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
              Back to Tools Hub
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}