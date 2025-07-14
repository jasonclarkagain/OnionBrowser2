import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Users, Shield, Github, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const sendMessage = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Contact & <span style={{ color: "var(--matrix-green)" }}>Support</span>
          </h1>
          <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
            Get help, share feedback, or connect with our privacy community
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card 
            className="cyber-border"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail style={{ color: "var(--matrix-green)" }} />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      style={{ 
                        backgroundColor: "var(--cyber-black)",
                        borderColor: "var(--cyber-border)"
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      style={{ 
                        backgroundColor: "var(--cyber-black)",
                        borderColor: "var(--cyber-border)"
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                    style={{ 
                      backgroundColor: "var(--cyber-black)",
                      borderColor: "var(--cyber-border)"
                    }}
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    style={{ 
                      backgroundColor: "var(--cyber-black)",
                      borderColor: "var(--cyber-border)"
                    }}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={sendMessage.isPending}
                  style={{ 
                    backgroundColor: "var(--matrix-green)",
                    color: "var(--cyber-black)"
                  }}
                >
                  {sendMessage.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & Resources */}
          <div className="space-y-6">
            {/* Community */}
            <Card 
              className="cyber-border"
              style={{ backgroundColor: "var(--cyber-gray)" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users style={{ color: "var(--matrix-green)" }} />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  Join our community of privacy enthusiasts and security experts.
                </p>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    style={{ 
                      borderColor: "var(--matrix-green)",
                      color: "var(--matrix-green)"
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Community Forum
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    style={{ 
                      borderColor: "var(--matrix-green)",
                      color: "var(--matrix-green)"
                    }}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Security Discussions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support Resources */}
            <Card 
              className="cyber-border"
              style={{ backgroundColor: "var(--cyber-gray)" }}
            >
              <CardHeader>
                <CardTitle>Support Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Documentation</h4>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Comprehensive guides and tutorials for all privacy tools and techniques.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">FAQ</h4>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Common questions about privacy, security, and using our platform.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Emergency Support</h4>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Critical security issues and urgent privacy concerns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Follow Us */}
            <Card 
              className="cyber-border"
              style={{ backgroundColor: "var(--cyber-gray)" }}
            >
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  Stay updated with the latest privacy news and platform updates.
                </p>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    style={{ 
                      borderColor: "var(--matrix-green)",
                      color: "var(--matrix-green)"
                    }}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    style={{ 
                      borderColor: "var(--matrix-green)",
                      color: "var(--matrix-green)"
                    }}
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    style={{ 
                      borderColor: "var(--matrix-green)",
                      color: "var(--matrix-green)"
                    }}
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card 
              className="cyber-border"
              style={{ backgroundColor: "var(--cyber-gray)" }}
            >
              <CardContent className="pt-6">
                <div 
                  className="rounded-lg p-4 border-l-4"
                  style={{ 
                    backgroundColor: "var(--cyber-black)",
                    borderLeftColor: "var(--matrix-green)"
                  }}
                >
                  <h4 className="font-semibold mb-2" style={{ color: "var(--matrix-green)" }}>
                    Secure Communication
                  </h4>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    All communications through this platform are encrypted. For highly sensitive matters, 
                    consider using additional security measures like PGP encryption.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
