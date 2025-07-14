import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, ExternalLink, Globe, Shield, Key, MessageCircle, Puzzle, Monitor } from "lucide-react";
import type { PrivacyTool } from "@shared/schema";

const categoryIcons = {
  browser: Globe,
  vpn: Shield,
  password: Key,
  messaging: MessageCircle,
  extension: Puzzle,
  os: Monitor,
  encryption: Shield,
  "file-sharing": Globe,
};

interface ToolCardProps {
  tool: PrivacyTool;
  onSetupGuide?: () => void;
  onDownload?: () => void;
}

export default function ToolCard({ tool, onSetupGuide, onDownload }: ToolCardProps) {
  const IconComponent = categoryIcons[tool.category as keyof typeof categoryIcons] || Shield;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className="w-4 h-4"
        style={{
          color: i < rating ? "var(--matrix-green)" : "var(--cyber-border)",
          fill: i < rating ? "var(--matrix-green)" : "transparent"
        }}
      />
    ));
  };

  const handleDownload = () => {
    if (tool.downloadUrl) {
      window.open(tool.downloadUrl, '_blank');
    }
    onDownload?.();
  };

  const handleSetupGuide = () => {
    onSetupGuide?.();
  };

  return (
    <Card 
      className="cyber-border hover:shadow-glow transition-all duration-300"
      style={{ backgroundColor: "var(--cyber-gray)" }}
    >
      <CardHeader>
        <div className="flex items-center space-x-4 mb-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: tool.isEssential 
                ? "var(--matrix-green)" 
                : "var(--dark-green)" 
            }}
          >
            <IconComponent 
              className="text-xl" 
              style={{ 
                color: tool.isEssential 
                  ? "var(--cyber-black)" 
                  : "var(--text-primary)" 
              }} 
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{tool.name}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Badge 
                style={{ 
                  backgroundColor: tool.isEssential 
                    ? "var(--matrix-green)" 
                    : "var(--dark-green)",
                  color: tool.isEssential 
                    ? "var(--cyber-black)" 
                    : "var(--text-primary)"
                }}
              >
                {tool.isEssential ? "Essential" : "Recommended"}
              </Badge>
              <div className="flex items-center space-x-1">
                {renderStars(tool.rating)}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          {tool.description}
        </p>
        
        {/* Features */}
        <div className="space-y-2 mb-6">
          {(tool.features as string[]).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Check 
                className="w-4 h-4" 
                style={{ color: "var(--matrix-green)" }} 
              />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Actions */}
        <div className="space-y-2">
          {tool.downloadUrl && (
            <Button 
              className="w-full"
              style={{ 
                backgroundColor: "var(--matrix-green)",
                color: "var(--cyber-black)"
              }}
              onClick={handleDownload}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
          
          {tool.setupGuide && (
            <Button 
              variant="outline" 
              className="w-full"
              style={{ 
                borderColor: "var(--matrix-green)",
                color: "var(--matrix-green)"
              }}
              onClick={handleSetupGuide}
            >
              Setup Guide
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
