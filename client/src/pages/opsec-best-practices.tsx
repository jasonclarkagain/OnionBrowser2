import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, ArrowRight, Shield, Lock, Eye, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function OpSecBestPractices() {
  const modules = [
    {
      title: "Threat Modeling",
      lessons: [
        "Identifying potential threats",
        "Risk assessment methodologies",
        "Security planning frameworks",
        "Personal threat modeling exercise"
      ],
      completed: false,
      duration: "40 min"
    },
    {
      title: "Communication Security",
      lessons: [
        "Secure messaging protocols",
        "Email encryption (PGP/GPG)",
        "Voice communication security",
        "Metadata protection strategies"
      ],
      completed: false,
      duration: "45 min"
    },
    {
      title: "Digital Hygiene",
      lessons: [
        "Device security practices",
        "Account isolation techniques",
        "Data compartmentalization",
        "Emergency procedures and protocols"
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
          <Badge className="mb-4" style={{ backgroundColor: "var(--error)", color: "white" }}>
            Advanced Course
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            OpSec <span style={{ color: "var(--matrix-green)" }}>Best Practices</span>
          </h1>
          <p className="text-xl mb-6" style={{ color: "var(--text-secondary)" }}>
            Operational security practices for high-risk individuals and organizations
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>120 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>3 modules</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>Advanced level</span>
            </div>
          </div>

          <Progress value={0} className="max-w-md mx-auto mb-6" />
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>0% Complete</p>
        </div>

        {/* Prerequisites Warning */}
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
                <AlertTriangle style={{ color: "var(--warning)" }} className="mt-1" />
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--warning)" }}>
                    Prerequisites Required
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                    This advanced course requires completion of Privacy Fundamentals and Tor Network Guide. 
                    Strong understanding of basic privacy concepts is essential.
                  </p>
                  <div className="flex gap-2">
                    <Link href="/privacy-fundamentals">
                      <Button size="sm" variant="outline" style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
                        Privacy Fundamentals
                      </Button>
                    </Link>
                    <Link href="/tor-network-guide">
                      <Button size="sm" variant="outline" style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
                        Tor Network Guide
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Overview */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield style={{ color: "var(--matrix-green)" }} />
              Advanced Security Concepts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3" style={{ color: "var(--matrix-green)" }}>Strategic Planning</h3>
                <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <li>• Personal threat assessment</li>
                  <li>• Risk mitigation strategies</li>
                  <li>• Security architecture design</li>
                  <li>• Incident response planning</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3" style={{ color: "var(--matrix-green)" }}>Operational Techniques</h3>
                <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <li>• Secure communication protocols</li>
                  <li>• Identity compartmentalization</li>
                  <li>• Digital forensics countermeasures</li>
                  <li>• Physical security integration</li>
                </ul>
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
          <Link href="/tor-network-guide">
            <Button variant="outline" style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
              ← Tor Network Guide
            </Button>
          </Link>
          
          <Link href="/interactive-tutorials">
            <Button style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
              Next: Interactive Tutorials →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}