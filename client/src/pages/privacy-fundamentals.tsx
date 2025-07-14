import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, ArrowRight, Shield, Eye, Lock, Globe } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyFundamentals() {
  const modules = [
    {
      title: "Digital Footprints",
      lessons: [
        "What is a digital footprint?",
        "Types of data collection",
        "Tracking methods and techniques",
        "Social media data mining"
      ],
      completed: false,
      duration: "15 min"
    },
    {
      title: "Privacy Settings",
      lessons: [
        "Browser privacy settings",
        "Social media privacy controls",
        "App permissions management",
        "Location tracking controls"
      ],
      completed: false,
      duration: "20 min"
    },
    {
      title: "Data Protection",
      lessons: [
        "Understanding data brokers",
        "GDPR and privacy rights",
        "Data deletion requests",
        "Privacy-focused alternatives"
      ],
      completed: false,
      duration: "10 min"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4" style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
            Beginner Course
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Privacy <span style={{ color: "var(--matrix-green)" }}>Fundamentals</span>
          </h1>
          <p className="text-xl mb-6" style={{ color: "var(--text-secondary)" }}>
            Essential concepts for protecting your digital privacy and understanding online tracking
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>45 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>3 modules</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>Beginner friendly</span>
            </div>
          </div>

          <Progress value={0} className="max-w-md mx-auto mb-6" />
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>0% Complete</p>
        </div>

        {/* Course Overview */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield style={{ color: "var(--matrix-green)" }} />
              What You'll Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3" style={{ color: "var(--matrix-green)" }}>Core Concepts</h3>
                <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <li>• How companies track your online activity</li>
                  <li>• Different types of digital footprints</li>
                  <li>• Common privacy vulnerabilities</li>
                  <li>• Legal privacy rights and protections</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3" style={{ color: "var(--matrix-green)" }}>Practical Skills</h3>
                <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <li>• Configure browser privacy settings</li>
                  <li>• Manage social media privacy controls</li>
                  <li>• Review and limit app permissions</li>
                  <li>• Make data deletion requests</li>
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
          <Link href="/education">
            <Button variant="outline" style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
              ← Back to Education
            </Button>
          </Link>
          
          <Link href="/tor-network-guide">
            <Button style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
              Next: Tor Network Guide →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}