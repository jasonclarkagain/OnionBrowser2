import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Search, HelpCircle, Book, MessageSquare, Mail, ExternalLink, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function SupportCenter() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqItems = [
    {
      id: "getting-started",
      question: "How do I get started with privacy protection?",
      answer: "Begin with our Privacy Fundamentals course to understand basic concepts. Then take our Privacy Assessment to identify areas for improvement. Start with essential tools like a VPN, password manager, and secure browser.",
      category: "getting-started"
    },
    {
      id: "tor-safety",
      question: "Is Tor Browser safe to use?",
      answer: "Yes, when used correctly. Tor Browser provides strong anonymity protection, but requires following best practices: keep it updated, use highest security settings, avoid downloading files, and don't log into personal accounts.",
      category: "tor"
    },
    {
      id: "vpn-choice",
      question: "How do I choose a reliable VPN service?",
      answer: "Look for: no-logs policy, strong encryption (AES-256), kill switch feature, reputable company jurisdiction, good speeds, and transparent security audits. Avoid free VPNs as they often compromise privacy.",
      category: "vpn"
    },
    {
      id: "password-security",
      question: "What makes a password secure?",
      answer: "Use unique, complex passwords for each account: 12+ characters, mix of letters/numbers/symbols. Use a password manager to generate and store them. Enable two-factor authentication wherever possible.",
      category: "passwords"
    },
    {
      id: "mobile-privacy",
      question: "How can I improve my smartphone privacy?",
      answer: "Disable location tracking, review app permissions, use encrypted messaging apps, avoid public WiFi for sensitive activities, keep OS updated, and consider privacy-focused alternatives to default apps.",
      category: "mobile"
    },
    {
      id: "social-media",
      question: "What privacy settings should I use on social media?",
      answer: "Set profiles to private, limit data collection, disable location sharing, review third-party app access, use minimal personal information, and regularly audit privacy settings as they change frequently.",
      category: "social"
    },
    {
      id: "email-encryption",
      question: "Do I need encrypted email?",
      answer: "For sensitive communications, yes. Consider ProtonMail, Tutanota, or learning PGP encryption. For most users, enabling two-factor authentication and using strong passwords is a good start.",
      category: "email"
    },
    {
      id: "threat-assessment",
      question: "How do I assess my personal threat model?",
      answer: "Consider: who might target you, what data needs protection, how much convenience you'll sacrifice, and what consequences you face if compromised. Tailor your security measures accordingly.",
      category: "advanced"
    }
  ];

  const quickLinks = [
    {
      title: "Privacy Assessment",
      description: "Evaluate your current privacy posture",
      href: "/assessment",
      icon: CheckCircle
    },
    {
      title: "Tool Recommendations", 
      description: "Find the right privacy tools for you",
      href: "/tool-recommendations",
      icon: HelpCircle
    },
    {
      title: "Setup Guides",
      description: "Step-by-step installation guides",
      href: "/setup-guides", 
      icon: Book
    },
    {
      title: "Community Forum",
      description: "Get help from the community",
      href: "/community-forum",
      icon: MessageSquare
    }
  ];

  const filteredFaq = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Support <span style={{ color: "var(--matrix-green)" }}>Center</span>
          </h1>
          <p className="text-xl mb-6" style={{ color: "var(--text-secondary)" }}>
            Find answers to common questions and get help with privacy tools and techniques
          </p>
        </div>

        {/* Search */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              <Input
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                style={{ 
                  backgroundColor: "var(--cyber-black)",
                  borderColor: "var(--cyber-border)"
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle>Quick Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href}>
                    <Card 
                      className="cyber-border transition-all duration-300 hover:shadow-glow cursor-pointer"
                      style={{ backgroundColor: "var(--cyber-black)" }}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: "var(--matrix-green)" }}
                          >
                            <Icon className="w-4 h-4" style={{ color: "var(--cyber-black)" }} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{link.title}</h3>
                            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle style={{ color: "var(--matrix-green)" }} />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFaq.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-lg" style={{ color: "var(--text-secondary)" }}>
                  No questions found matching your search.
                </div>
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFaq.map((item) => (
                  <AccordionItem 
                    key={item.id} 
                    value={item.id}
                    className="border rounded-lg px-4"
                    style={{ borderColor: "var(--cyber-border)" }}
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}
                        >
                          {item.category}
                        </Badge>
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4" style={{ color: "var(--text-secondary)" }}>
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail style={{ color: "var(--matrix-green)" }} />
              Still Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
              Can't find what you're looking for? Our community and support team are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/community-forum">
                <Button 
                  className="w-full sm:w-auto"
                  style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}
                >
                  <MessageSquare className="mr-2 w-4 h-4" />
                  Ask the Community
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}
                >
                  <Mail className="mr-2 w-4 h-4" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* External Resources */}
        <Card className="cyber-border" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://www.eff.org/wp/digital-security" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-cyber-black"
                style={{ color: "var(--text-secondary)" }}
              >
                <ExternalLink className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
                EFF Digital Security Guide
              </a>
              <a 
                href="https://privacyguides.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-cyber-black"
                style={{ color: "var(--text-secondary)" }}
              >
                <ExternalLink className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
                Privacy Guides
              </a>
              <a 
                href="https://www.torproject.org/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-cyber-black"
                style={{ color: "var(--text-secondary)" }}
              >
                <ExternalLink className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
                Official Tor Project
              </a>
              <a 
                href="https://security.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-cyber-black"
                style={{ color: "var(--text-secondary)" }}
              >
                <ExternalLink className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
                Security.org Resources
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t" style={{ borderColor: "var(--cyber-border)" }}>
          <Link href="/community-forum">
            <Button variant="outline" style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
              ← Community Forum
            </Button>
          </Link>
          
          <Link href="/contact">
            <Button style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
              Contact Support →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}