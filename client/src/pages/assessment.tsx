import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck, ChevronRight, ChevronLeft, Award, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import DataVisualization from "@/components/three/DataVisualization";

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; score: number }[];
  category: string;
}

const assessmentQuestions: Question[] = [
  {
    id: "password-manager",
    question: "Do you use a password manager for your online accounts?",
    options: [
      { value: "yes-unique", label: "Yes, with unique passwords for each account", score: 10 },
      { value: "yes-some", label: "Yes, but I reuse some passwords", score: 6 },
      { value: "no-unique", label: "No, but I use unique passwords", score: 4 },
      { value: "no-reuse", label: "No, and I reuse passwords", score: 0 }
    ],
    category: "passwords"
  },
  {
    id: "two-factor",
    question: "Do you have two-factor authentication (2FA) enabled on your important accounts?",
    options: [
      { value: "most", label: "Yes, on most important accounts", score: 10 },
      { value: "some", label: "Yes, on some accounts", score: 6 },
      { value: "few", label: "Yes, on a few accounts", score: 3 },
      { value: "none", label: "No, I don't use 2FA", score: 0 }
    ],
    category: "authentication"
  },
  {
    id: "browser-privacy",
    question: "What privacy measures do you use while browsing?",
    options: [
      { value: "private-browser", label: "I use a privacy-focused browser with extensions", score: 10 },
      { value: "extensions", label: "I use privacy extensions on my regular browser", score: 7 },
      { value: "incognito", label: "I use incognito/private mode", score: 4 },
      { value: "none", label: "I don't use any special privacy measures", score: 0 }
    ],
    category: "browsing"
  },
  {
    id: "vpn-usage",
    question: "Do you use a VPN for internet browsing?",
    options: [
      { value: "always", label: "Yes, always", score: 10 },
      { value: "public-wifi", label: "Yes, on public WiFi", score: 6 },
      { value: "sometimes", label: "Yes, sometimes", score: 3 },
      { value: "never", label: "No, never", score: 0 }
    ],
    category: "network"
  },
  {
    id: "social-media",
    question: "How do you manage your social media privacy settings?",
    options: [
      { value: "strict", label: "Very strict privacy settings, minimal sharing", score: 10 },
      { value: "moderate", label: "Moderate privacy settings", score: 6 },
      { value: "default", label: "I use default settings", score: 2 },
      { value: "public", label: "Most of my information is public", score: 0 }
    ],
    category: "social"
  },
  {
    id: "email-privacy",
    question: "What type of email service do you use?",
    options: [
      { value: "encrypted", label: "Privacy-focused encrypted email service", score: 10 },
      { value: "secure", label: "Security-conscious provider (like Apple)", score: 7 },
      { value: "mainstream", label: "Mainstream provider (Gmail, Yahoo, etc.)", score: 3 },
      { value: "unsure", label: "I'm not sure about my email provider's privacy", score: 0 }
    ],
    category: "communication"
  },
  {
    id: "device-security",
    question: "How do you secure your devices?",
    options: [
      { value: "encrypted", label: "Full disk encryption and strong passwords/biometrics", score: 10 },
      { value: "password", label: "Strong passwords or biometric locks", score: 7 },
      { value: "basic", label: "Basic PIN or pattern locks", score: 4 },
      { value: "none", label: "No security measures", score: 0 }
    ],
    category: "device"
  },
  {
    id: "software-updates",
    question: "How do you handle software updates?",
    options: [
      { value: "automatic", label: "Automatic updates enabled for security patches", score: 10 },
      { value: "regular", label: "I update regularly when prompted", score: 7 },
      { value: "sometimes", label: "I update sometimes", score: 4 },
      { value: "rarely", label: "I rarely update software", score: 0 }
    ],
    category: "maintenance"
  }
];

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const submitAssessment = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/privacy-assessment", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResults(data);
      setIsCompleted(true);
      toast({
        title: "Assessment Complete",
        description: "Your privacy assessment has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save assessment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [assessmentQuestions[currentQuestion].id]: value
    }));
  };

  const goToNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const recommendations = generateRecommendations(score, answers);
    
    submitAssessment.mutate({
      responses: answers,
      score,
      recommendations,
      userId: null // No user system implemented yet
    });
  };

  const calculateScore = () => {
    let totalScore = 0;
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = assessmentQuestions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.value === answerValue);
      totalScore += option?.score || 0;
    });
    return Math.round((totalScore / (assessmentQuestions.length * 10)) * 100);
  };

  const generateRecommendations = (score: number, answers: Record<string, string>) => {
    const recommendations = [];
    
    if (score < 40) {
      recommendations.push("Your privacy setup needs significant improvement. Start with the basics: use a password manager and enable 2FA.");
    } else if (score < 70) {
      recommendations.push("You have a moderate privacy setup. Focus on improving browser privacy and using a VPN.");
    } else {
      recommendations.push("Great job! You have a strong privacy setup. Consider exploring advanced tools like Tor browser.");
    }

    // Specific recommendations based on answers
    if (answers["password-manager"]?.includes("no")) {
      recommendations.push("Implement a password manager immediately - this is your highest priority.");
    }
    if (answers["two-factor"] === "none") {
      recommendations.push("Enable two-factor authentication on all important accounts.");
    }
    if (answers["vpn-usage"] === "never") {
      recommendations.push("Consider using a VPN, especially on public networks.");
    }

    return recommendations;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "var(--matrix-green)";
    if (score >= 60) return "var(--warning)";
    return "var(--error)";
  };

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const currentAnswer = answers[assessmentQuestions[currentQuestion]?.id];

  if (isCompleted && results) {
    return (
      <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
        <div className="container mx-auto max-w-2xl">
          <Card 
            className="cyber-border"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Award 
                  className="w-16 h-16" 
                  style={{ color: getScoreColor(results.score) }} 
                />
              </div>
              <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: getScoreColor(results.score) }}
                >
                  {results.score}/100
                </div>
                <p style={{ color: "var(--text-secondary)" }}>Privacy Score</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle style={{ color: "var(--matrix-green)" }} />
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li 
                      key={index} 
                      className="text-sm p-3 rounded"
                      style={{ backgroundColor: "var(--cyber-black)" }}
                    >
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers({});
                    setIsCompleted(false);
                    setResults(null);
                  }}
                  variant="outline"
                  className="flex-1"
                  style={{ 
                    borderColor: "var(--matrix-green)",
                    color: "var(--matrix-green)"
                  }}
                >
                  Retake Assessment
                </Button>
                <Link href="/tools">
                  <Button 
                    className="flex-1"
                    style={{ 
                      backgroundColor: "var(--matrix-green)",
                      color: "var(--cyber-black)"
                    }}
                  >
                    View Privacy Tools
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Privacy <span style={{ color: "var(--matrix-green)" }}>Assessment</span>
          </h1>
          <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
            Evaluate your current privacy setup and get personalized recommendations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Question {currentQuestion + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm" style={{ color: "var(--matrix-green)" }}>
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card 
          className="cyber-border"
          style={{ backgroundColor: "var(--cyber-gray)" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck style={{ color: "var(--matrix-green)" }} />
              {assessmentQuestions[currentQuestion]?.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={currentAnswer || ""} 
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {assessmentQuestions[currentQuestion]?.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer p-3 rounded"
                    style={{ backgroundColor: "var(--cyber-black)" }}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
                style={{ 
                  borderColor: "var(--matrix-green)",
                  color: "var(--matrix-green)"
                }}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={goToNext}
                disabled={!currentAnswer}
                style={{ 
                  backgroundColor: "var(--matrix-green)",
                  color: "var(--cyber-black)"
                }}
              >
                {currentQuestion === assessmentQuestions.length - 1 ? "Complete" : "Next"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
