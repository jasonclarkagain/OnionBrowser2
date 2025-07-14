import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Star, Send, ThumbsUp, MessageSquare, Lightbulb, Bug } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Feedback() {
  const [feedbackType, setFeedbackType] = useState("general");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [allowContact, setAllowContact] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const feedbackTypes = [
    { id: "general", label: "General Feedback", icon: MessageSquare },
    { id: "feature", label: "Feature Request", icon: Lightbulb },
    { id: "bug", label: "Bug Report", icon: Bug },
    { id: "content", label: "Content Feedback", icon: ThumbsUp }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would submit to the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Feedback submitted!",
        description: "Thank you for helping us improve PrivacyGuard.",
      });

      // Reset form
      setRating(0);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setAllowContact(false);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (currentRating: number, onRate: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 cursor-pointer transition-colors ${i < currentRating ? 'fill-current' : ''}`}
        style={{ color: "var(--matrix-green)" }}
        onClick={() => onRate(i + 1)}
      />
    ));
  };

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Your <span style={{ color: "var(--matrix-green)" }}>Feedback</span>
          </h1>
          <p className="text-xl mb-6" style={{ color: "var(--text-secondary)" }}>
            Help us improve PrivacyGuard with your suggestions, bug reports, and feature requests
          </p>
        </div>

        {/* Feedback Stats */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle>Community Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>347</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Feedback Received</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>89</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Features Implemented</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>156</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Bugs Fixed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>4.8</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Average Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Form */}
        <Card className="cyber-border" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare style={{ color: "var(--matrix-green)" }} />
              Share Your Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Feedback Type */}
              <div>
                <Label className="text-base font-semibold mb-4 block">Feedback Type</Label>
                <RadioGroup value={feedbackType} onValueChange={setFeedbackType}>
                  <div className="grid md:grid-cols-2 gap-4">
                    {feedbackTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div key={type.id} className="flex items-center space-x-3 p-3 rounded-lg border" 
                             style={{ borderColor: feedbackType === type.id ? "var(--matrix-green)" : "var(--cyber-border)" }}>
                          <RadioGroupItem value={type.id} id={type.id} />
                          <Icon className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
                          <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                            {type.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>

              {/* Rating */}
              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Overall Rating
                  {rating > 0 && (
                    <Badge className="ml-2" style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
                      {rating}/5 stars
                    </Badge>
                  )}
                </Label>
                <div className="flex items-center gap-1">
                  {renderStars(rating, setRating)}
                  <span className="ml-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {rating === 0 && "Click to rate"}
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name (Optional)</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    style={{ 
                      backgroundColor: "var(--cyber-black)",
                      borderColor: "var(--cyber-border)"
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{ 
                      backgroundColor: "var(--cyber-black)",
                      borderColor: "var(--cyber-border)"
                    }}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of your feedback"
                  required
                  style={{ 
                    backgroundColor: "var(--cyber-black)",
                    borderColor: "var(--cyber-border)"
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">
                  Detailed Feedback
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please provide detailed feedback, suggestions, or describe any issues you've encountered..."
                  rows={6}
                  required
                  style={{ 
                    backgroundColor: "var(--cyber-black)",
                    borderColor: "var(--cyber-border)"
                  }}
                />
                <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  {message.length}/1000 characters
                </div>
              </div>

              {/* Follow-up permission */}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="contact"
                  checked={allowContact}
                  onCheckedChange={setAllowContact}
                />
                <Label htmlFor="contact" className="text-sm">
                  Allow us to contact you for follow-up questions about this feedback
                </Label>
              </div>

              {/* Privacy Notice */}
              <div 
                className="rounded-lg p-4 border-l-4"
                style={{ 
                  backgroundColor: "var(--cyber-black)",
                  borderLeftColor: "var(--matrix-green)"
                }}
              >
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>Privacy Notice:</strong> Your feedback helps us improve PrivacyGuard. 
                  We'll only use your contact information to follow up on your specific feedback if you've given permission. 
                  All feedback is reviewed by our team and may be used to improve our services.
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isSubmitting || !message.trim() || !subject.trim()}
                className="w-full md:w-auto"
                style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="mr-2 w-4 h-4" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t" style={{ borderColor: "var(--cyber-border)" }}>
          <Link href="/support-center">
            <Button variant="outline" style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
              ← Support Center
            </Button>
          </Link>
          
          <Link href="/contact">
            <Button style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
              Contact Us →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}