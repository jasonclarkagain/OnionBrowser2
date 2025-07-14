import { Progress } from "@/components/ui/progress";
import { Award, BookOpen } from "lucide-react";
import type { Course } from "@shared/schema";

interface CourseProgressProps {
  course: Course;
  progress: number;
}

export default function CourseProgress({ course, progress }: CourseProgressProps) {
  const isCompleted = progress === 100;
  const isInProgress = progress > 0 && progress < 100;

  return (
    <div 
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
    </div>
  );
}
