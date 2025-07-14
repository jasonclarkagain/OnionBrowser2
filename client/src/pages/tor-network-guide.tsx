import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, ArrowRight, Shield, Globe, Lock, Eye } from "lucide-react";
import { Link } from "wouter";

export default function TorNetworkGuide() {
  const modules = [
    {
      title: "How Tor Works",
      lessons: [
        "Onion routing explained",
        "Entry, middle, and exit nodes",
        "Traffic encryption layers",
        "Anonymous communication principles"
      ],
      completed: false,
      duration: "30 min"
    },
    {
      title: "Using Tor Safely",
      lessons: [
        "Tor Browser installation and setup",
        "Security best practices",
        "Common mistakes to avoid",
        "Tor bridges and censorship circumvention"
      ],
      completed: false,
      duration: "25 min"
    },
    {
      title: "Advanced Tor Usage",
      lessons: [
        "Hidden services and .onion sites",
        "Tor over VPN configurations",
        "TAILS operating system",
        "Operational security considerations"
      ],
      completed: false,
      duration: "35 min"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4" style={{ backgroundColor: "var(--warning)", color: "var(--cyber-black)" }}>
            Intermediate Course
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Tor Network <span style={{ color: "var(--matrix-green)" }}>Deep Dive</span>
          </h1>
          <p className="text-xl mb-6" style={{ color: "var(--text-secondary)" }}>
            Complete guide to understanding and using the Tor network for anonymous communication
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>90 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>3 modules</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>Intermediate level</span>
            </div>
          </div>

          <Progress value={0} className="max-w-md mx-auto mb-6" />
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>0% Complete</p>
        </div>

        {/* Course Overview */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe style={{ color: "var(--matrix-green)" }} />
              What You'll Master
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3" style={{ color: "var(--matrix-green)" }}>Technical Understanding</h3>
                <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <li>• How onion routing provides anonymity</li>
                  <li>• Node types and their functions</li>
                  <li>• Traffic analysis resistance</li>
                  <li>• Hidden service architecture</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3" style={{ color: "var(--matrix-green)" }}>Practical Applications</h3>
                <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <li>• Safe Tor Browser usage</li>
                  <li>• Accessing .onion websites</li>
                  <li>• Combining Tor with VPNs</li>
                  <li>• Using TAILS for maximum security</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardContent className="pt-6">
            <div 
              className="rounded-lg p-4 border-l-4"
              style={{ 
                backgroundColor: "var(--cyber-black)",
                borderLeftColor: "var(--warning)"
              }}
            >
              <div className="flex items-start space-x-3">
                <Shield style={{ color: "var(--warning)" }} className="mt-1" />
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--warning)" }}>
                    Security Notice
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    While Tor provides strong anonymity protection, it requires careful usage to maintain security. 
                    Always follow best practices and be aware of your threat model when using Tor.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Modules */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Course Modules</h2>
          
          {modules.map((module, index) => (
            <Card key={index} className="cyber-border" style={{ backgroundColor: "var(--cyber-gray)" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}
                    >
                      {index + 1}
                    </div>
                    {module.title}
                  </CardTitle>
                  <Badge variant="outline" style={{ color: "var(--text-secondary)" }}>
                    {module.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium" style={{ color: "var(--matrix-green)" }}>Lessons:</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--matrix-green)" }}></div>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4">
                    <Button 
                      className="w-full md:w-auto"
                      style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}
                    >
                      Start Module {index + 1}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t" style={{ borderColor: "var(--cyber-border)" }}>
          <Link href="/privacy-fundamentals">
            <Button variant="outline" style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
              ← Privacy Fundamentals
            </Button>
          </Link>
          
          <Link href="/opsec-best-practices">
            <Button style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
              Next: OpSec Best Practices →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}