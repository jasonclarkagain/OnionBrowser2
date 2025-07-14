import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck } from "lucide-react";

interface AssessmentFormProps {
  onComplete: (answers: Record<string, string>) => void;
}

export default function AssessmentForm({ onComplete }: AssessmentFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // This would be imported from a separate file in a real implementation
  const questions = [
    {
      id: "password-manager",
      question: "Do you use a password manager?",
      options: [
        { value: "yes", label: "Yes, with unique passwords" },
        { value: "no", label: "No, I reuse passwords" }
      ]
    }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="cyber-border" style={{ backgroundColor: "var(--cyber-gray)" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck style={{ color: "var(--matrix-green)" }} />
          Privacy Assessment
        </CardTitle>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">
            {questions[currentQuestion]?.question}
          </h3>
          
          <RadioGroup onValueChange={handleAnswerChange}>
            {questions[currentQuestion]?.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          
          <Button 
            onClick={goToNext}
            className="w-full"
            style={{ 
              backgroundColor: "var(--matrix-green)",
              color: "var(--cyber-black)"
            }}
          >
            {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
