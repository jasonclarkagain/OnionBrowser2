import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, CheckCircle, Clock, Users, Monitor, Smartphone, Settings } from "lucide-react";
import { Link } from "wouter";

export default function InteractiveTutorials() {
  const [completedTutorials, setCompletedTutorials] = useState<number[]>([]);

  const tutorials = [
    {
      id: 1,
      title: "Browser Privacy Setup",
      description: "Interactive guide to configure Firefox and Chrome for maximum privacy",
      duration: "15 min",
      difficulty: "Beginner",
      category: "browser",
      steps: 8,
      icon: Monitor
    },
    {
      id: 2,
      title: "Mobile Privacy Configuration",
      description: "Step-by-step privacy settings for iOS and Android devices",
      duration: "20 min",
      difficulty: "Beginner", 
      category: "mobile",
      steps: 12,
      icon: Smartphone
    },
    {
      id: 3,
      title: "VPN Setup Walkthrough",
      description: "Complete guide to choosing and configuring a VPN service",
      duration: "25 min",
      difficulty: "Intermediate",
      category: "network",
      steps: 10,
      icon: Settings
    },
    {
      id: 4,
      title: "Social Media Privacy Audit",
      description: "Review and optimize privacy settings across major platforms",
      duration: "30 min",
      difficulty: "Beginner",
      category: "social",
      steps: 15,
      icon: Users
    }
  ];

  const categories = [
    { id: "all", name: "All Tutorials", count: tutorials.length },
    { id: "browser", name: "Browser Security", count: tutorials.filter(t => t.category === "browser").length },
    { id: "mobile", name: "Mobile Privacy", count: tutorials.filter(t => t.category === "mobile").length },
    { id: "network", name: "Network Security", count: tutorials.filter(t => t.category === "network").length },
    { id: "social", name: "Social Media", count: tutorials.filter(t => t.category === "social").length }
  ];

  const markCompleted = (tutorialId: number) => {
    if (!completedTutorials.includes(tutorialId)) {
      setCompletedTutorials([...completedTutorials, tutorialId]);
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

  const filteredTutorials = (category: string) => {
    return category === "all" ? tutorials : tutorials.filter(t => t.category === category);
  };

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Interactive <span style={{ color: "var(--matrix-green)" }}>Tutorials</span>
          </h1>
          <p className="text-xl mb-6" style={{ color: "var(--text-secondary)" }}>
            Hands-on, step-by-step guides to implement privacy and security measures
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>{completedTutorials.length} of {tutorials.length} completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
              <span style={{ color: "var(--text-secondary)" }}>Interactive learning</span>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>
                  {completedTutorials.length}
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--warning)" }}>
                  {tutorials.length - completedTutorials.length}
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>
                  {Math.round((completedTutorials.length / tutorials.length) * 100)}%
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Complete</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>
                  {tutorials.reduce((acc, t) => acc + parseInt(t.duration), 0)}
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Total Minutes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tutorial Categories */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5" style={{ backgroundColor: "var(--cyber-gray)" }}>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredTutorials(category.id).map((tutorial) => {
                  const Icon = tutorial.icon;
                  const isCompleted = completedTutorials.includes(tutorial.id);
                  
                  return (
                    <Card 
                      key={tutorial.id} 
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
                              <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                                {tutorial.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 mb-4">
                          <Badge style={{ backgroundColor: getDifficultyColor(tutorial.difficulty), color: "var(--cyber-black)" }}>
                            {tutorial.difficulty}
                          </Badge>
                          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                            {tutorial.duration}
                          </span>
                          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                            {tutorial.steps} steps
                          </span>
                        </div>
                        
                        <Button 
                          className="w-full"
                          style={{ 
                            backgroundColor: isCompleted ? "var(--cyber-black)" : "var(--matrix-green)", 
                            color: isCompleted ? "var(--matrix-green)" : "var(--cyber-black)" 
                          }}
                          onClick={() => markCompleted(tutorial.id)}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle className="mr-2 w-4 h-4" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 w-4 h-4" />
                              Start Tutorial
                            </>
                          )}
                        </Button>
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
          <Link href="/opsec-best-practices">
            <Button variant="outline" style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
              ← OpSec Best Practices
            </Button>
          </Link>
          
          <Link href="/education">
            <Button style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
              Back to Education Hub
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}