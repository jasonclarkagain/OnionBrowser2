import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award, Play } from "lucide-react";
import { Link } from "wouter";
import type { Course } from "@shared/schema";

export default function Education() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "var(--matrix-green)";
      case "intermediate":
        return "var(--warning)";
      case "advanced":
        return "var(--error)";
      default:
        return "var(--text-secondary)";
    }
  };

  const getProgressForCourse = (courseId: number) => {
    // Mock progress data - in real app this would come from user progress API
    const mockProgress: Record<number, number> = {
      1: 100,
      2: 67,
      3: 0
    };
    return mockProgress[courseId] || 0;
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
            Privacy <span style={{ color: "var(--matrix-green)" }}>Learning Dashboard</span>
          </h1>
          <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
            Master digital privacy through comprehensive, interactive courses
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card 
              className="cyber-border"
              style={{ backgroundColor: "var(--cyber-gray)" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award style={{ color: "var(--matrix-green)" }} />
                  Your Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {courses?.map((course) => {
                    const progress = getProgressForCourse(course.id);
                    const isCompleted = progress === 100;
                    const isInProgress = progress > 0 && progress < 100;
                    
                    return (
                      <div 
                        key={course.id}
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: "var(--cyber-black)" }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ 
                                backgroundColor: isCompleted 
                                  ? "var(--matrix-green)" 
                                  : isInProgress 
                                    ? "var(--dark-green)" 
                                    : "var(--cyber-border)" 
                              }}
                            >
                              {isCompleted ? (
                                <Award style={{ color: "var(--cyber-black)" }} />
                              ) : (
                                <BookOpen style={{ color: "var(--text-primary)" }} />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold">{course.title}</h4>
                              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                {course.description}
                              </p>
                              <div className="flex items-center gap-4 mt-1">
                                <span 
                                  className="text-xs px-2 py-1 rounded"
                                  style={{ 
                                    backgroundColor: getDifficultyColor(course.difficulty),
                                    color: "var(--cyber-black)"
                                  }}
                                >
                                  {course.difficulty}
                                </span>
                                <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                                  <Clock className="w-3 h-3" />
                                  {course.estimatedTime} min
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold mb-1" style={{ color: "var(--matrix-green)" }}>
                              {progress}%
                            </div>
                            <div className="w-20">
                              <Progress value={progress} className="h-2" />
                            </div>
                          </div>
                        </div>
                        
                        <Link href={course.id === 1 ? "/privacy-fundamentals" : course.id === 2 ? "/tor-network-guide" : "/opsec-best-practices"}>
                          <Button 
                            className="w-full"
                            style={{ 
                              backgroundColor: isCompleted 
                                ? "var(--dark-green)" 
                                : "var(--matrix-green)",
                              color: "var(--cyber-black)"
                            }}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {isCompleted ? "Review Course" : isInProgress ? "Continue Learning" : "Start Course"}
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Privacy Assessment */}
            <Card 
              className="cyber-border"
              style={{ backgroundColor: "var(--cyber-gray)" }}
            >
              <CardHeader>
                <CardTitle className="text-lg">Privacy Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                  Check your current privacy setup and get personalized recommendations.
                </p>
                <Link href="/assessment">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    style={{ 
                      borderColor: "var(--matrix-green)",
                      color: "var(--matrix-green)"
                    }}
                  >
                    Take Assessment
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Setup */}
            <Card 
              className="cyber-border"
              style={{ backgroundColor: "var(--cyber-gray)" }}
            >
              <CardHeader>
                <CardTitle className="text-lg">Tor Browser Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                  Quick installation guide for secure browsing.
                </p>
                <Link href="/tools">
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
                </Link>
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <Card 
              className="cyber-border"
              style={{ backgroundColor: "var(--cyber-gray)" }}
            >
              <CardHeader>
                <CardTitle className="text-lg">Learning Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Courses Completed</span>
                    <span className="font-semibold" style={{ color: "var(--matrix-green)" }}>1/3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Study Time</span>
                    <span className="font-semibold" style={{ color: "var(--matrix-green)" }}>2.5 hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Privacy Score</span>
                    <span className="font-semibold" style={{ color: "var(--matrix-green)" }}>78/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
