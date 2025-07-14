import { Link } from "wouter";
import { GraduationCap, Bolt, Globe, Download, Settings, Users, AlertTriangle, BookOpen, ClipboardCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cyber-black)" }}>
      {/* Hero Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 glow-text">
              Master Your <span style={{ color: "var(--matrix-green)" }}>Digital Privacy</span>
            </h1>
            <p 
              className="text-xl lg:text-2xl mb-8 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Learn advanced privacy techniques, understand Tor networking, and access secure browsing tools - all in one comprehensive platform.
            </p>
            
            {/* Terminal-style welcome message */}
            <div 
              className="cyber-border rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto font-mono"
              style={{ backgroundColor: "var(--cyber-gray)" }}
            >
              <div className="flex items-center mb-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--error)" }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--warning)" }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--matrix-green)" }}></div>
                </div>
                <span className="ml-3 text-sm" style={{ color: "var(--text-secondary)" }}>privacy@guard:~$</span>
              </div>
              <div className="text-sm" style={{ color: "var(--matrix-green)" }}>
                <span className="terminal-cursor">Welcome to PrivacyGuard</span><br />
                <span style={{ color: "var(--text-secondary)" }}>Status: </span>
                <span style={{ color: "var(--matrix-green)" }}>Secure Connection Established</span><br />
                <span style={{ color: "var(--text-secondary)" }}>Ready to enhance your privacy knowledge...</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/education">
                <Button 
                  size="lg"
                  className="shadow-glow transition-all duration-300"
                  style={{ 
                    backgroundColor: "var(--matrix-green)", 
                    color: "var(--cyber-black)" 
                  }}
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Start Learning
                </Button>
              </Link>
              <Link href="/tools">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 transition-all duration-300 hover:shadow-glow"
                  style={{ 
                    borderColor: "var(--matrix-green)", 
                    color: "var(--matrix-green)",
                    backgroundColor: "transparent"
                  }}
                >
                  <Bolt className="mr-2 h-5 w-5" />
                  Privacy Bolt
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section 
        className="py-16 px-4 lg:px-8"
        style={{ backgroundColor: "var(--cyber-gray)" }}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Comprehensive <span style={{ color: "var(--matrix-green)" }}>Privacy Education</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Education */}
            <Card 
              className="cyber-border hover:shadow-glow transition-all duration-300"
              style={{ backgroundColor: "var(--cyber-black)" }}
            >
              <CardHeader>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--matrix-green)" }}
                >
                  <BookOpen className="text-xl" style={{ color: "var(--cyber-black)" }} />
                </div>
                <CardTitle>Interactive Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  Step-by-step guides covering everything from basic privacy concepts to advanced Tor network understanding.
                </p>
                <Link href="/education">
                  <div className="flex items-center text-sm cursor-pointer hover:text-primary transition-colors" style={{ color: "var(--matrix-green)" }}>
                    <span>3 Courses Available →</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
            
            {/* Feature 2: Assessment */}
            <Card 
              className="cyber-border hover:shadow-glow transition-all duration-300"
              style={{ backgroundColor: "var(--cyber-black)" }}
            >
              <CardHeader>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--matrix-green)" }}
                >
                  <ClipboardCheck className="text-xl" style={{ color: "var(--cyber-black)" }} />
                </div>
                <CardTitle>Privacy Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  Evaluate your current privacy setup and get personalized recommendations for improvement.
                </p>
                <Link href="/assessment">
                  <div className="flex items-center text-sm cursor-pointer hover:text-primary transition-colors" style={{ color: "var(--matrix-green)" }}>
                    <span>Take Assessment →</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
            
            {/* Feature 3: Secure Proxy */}
            <Card 
              className="cyber-border hover:shadow-glow transition-all duration-300"
              style={{ backgroundColor: "var(--cyber-black)" }}
            >
              <CardHeader>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--matrix-green)" }}
                >
                  <Globe className="text-xl" style={{ color: "var(--cyber-black)" }} />
                </div>
                <CardTitle>Secure Web Proxy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  Access regular websites through our encrypted proxy service for enhanced privacy protection.
                </p>
                <Link href="/proxy">
                  <div className="flex items-center text-sm cursor-pointer hover:text-primary transition-colors" style={{ color: "var(--matrix-green)" }}>
                    <span>Access Proxy →</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
            
            {/* Feature 4: Tor Setup */}
            <Card 
              className="cyber-border hover:shadow-glow transition-all duration-300"
              style={{ backgroundColor: "var(--cyber-black)" }}
            >
              <CardHeader>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--matrix-green)" }}
                >
                  <Download className="text-xl" style={{ color: "var(--cyber-black)" }} />
                </div>
                <CardTitle>Tor Browser Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  Complete guide to downloading, installing, and configuring Tor Browser for maximum privacy.
                </p>
                <Link href="/tools">
                  <div className="flex items-center text-sm cursor-pointer hover:text-primary transition-colors" style={{ color: "var(--matrix-green)" }}>
                    <span>Setup Guide →</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
            
            {/* Feature 5: Bolt */}
            <Card 
              className="cyber-border hover:shadow-glow transition-all duration-300"
              style={{ backgroundColor: "var(--cyber-black)" }}
            >
              <CardHeader>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--matrix-green)" }}
                >
                  <Settings className="text-xl" style={{ color: "var(--cyber-black)" }} />
                </div>
                <CardTitle>Privacy Bolt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  Curated collection of privacy-focused applications, browser extensions, and security utilities.
                </p>
                <Link href="/tools">
                  <div className="flex items-center text-sm cursor-pointer hover:text-primary transition-colors" style={{ color: "var(--matrix-green)" }}>
                    <span>Browse Tools →</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
            
            {/* Feature 6: Community */}
            <Card 
              className="cyber-border hover:shadow-glow transition-all duration-300"
              style={{ backgroundColor: "var(--cyber-black)" }}
            >
              <CardHeader>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--matrix-green)" }}
                >
                  <Users className="text-xl" style={{ color: "var(--cyber-black)" }} />
                </div>
                <CardTitle>Community Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  Connect with privacy experts and fellow learners in our secure community forums.
                </p>
                <Link href="/contact">
                  <div className="flex items-center text-sm cursor-pointer hover:text-primary transition-colors" style={{ color: "var(--matrix-green)" }}>
                    <span>Join Community →</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section 
        className="py-16 px-4 lg:px-8"
        style={{ backgroundColor: "var(--cyber-black)" }}
      >
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div 
              className="rounded-lg p-8 border-l-4"
              style={{ 
                backgroundColor: "var(--cyber-gray)", 
                borderLeftColor: "var(--warning)" 
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AlertTriangle 
                    className="text-2xl" 
                    style={{ color: "var(--warning)" }} 
                  />
                </div>
                <div>
                  <h3 
                    className="text-xl font-semibold mb-3"
                    style={{ color: "var(--warning)" }}
                  >
                    Important Information About .onion Sites
                  </h3>
                  <div className="space-y-3" style={{ color: "var(--text-secondary)" }}>
                    <p>
                      <strong style={{ color: "var(--text-primary)" }}>Technical Reality:</strong> .onion sites are only accessible through the Tor network. No web service can provide direct access to .onion sites without using Tor infrastructure.
                    </p>
                    <p>
                      <strong style={{ color: "var(--text-primary)" }}>Our Approach:</strong> This platform focuses on education and providing secure proxy services for regular websites. We provide comprehensive guides on properly setting up and using Tor Browser for .onion access.
                    </p>
                    <p>
                      <strong style={{ color: "var(--text-primary)" }}>Privacy First:</strong> True privacy requires understanding and using proper tools. We educate users on these tools rather than promising impossible shortcuts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Status */}
      <section 
        className="py-16 px-4 lg:px-8"
        style={{ backgroundColor: "var(--cyber-gray)" }}
      >
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <Card 
              className="cyber-border"
              style={{ backgroundColor: "var(--cyber-black)" }}
            >
              <CardHeader>
                <CardTitle className="text-center">Security Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">HTTPS Connection</span>
                    <Check style={{ color: "var(--matrix-green)" }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Encrypted Communication</span>
                    <Check style={{ color: "var(--matrix-green)" }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Secure Headers</span>
                    <Check style={{ color: "var(--matrix-green)" }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Privacy Protection Active</span>
                    <Check style={{ color: "var(--matrix-green)" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
