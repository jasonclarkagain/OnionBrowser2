import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Privacy <span style={{ color: "var(--matrix-green)" }}>Policy</span>
          </h1>
          <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
            How we protect your privacy and data
          </p>
          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
            Last updated: December 2024
          </p>
        </div>

        <div className="space-y-8">
          {/* Data Collection */}
          <Card 
            className="cyber-border"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database style={{ color: "var(--matrix-green)" }} />
                Data Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Information We Collect</h3>
                <ul className="space-y-2" style={{ color: "var(--text-secondary)" }}>
                  <li>• Contact form submissions (name, email, message)</li>
                  <li>• Privacy assessment responses (anonymous unless specified)</li>
                  <li>• Basic usage analytics (page views, session duration)</li>
                  <li>• Technical information (browser type, IP address for security)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Information We Don't Collect</h3>
                <ul className="space-y-2" style={{ color: "var(--text-secondary)" }}>
                  <li>• Personal browsing history outside our platform</li>
                  <li>• Social media profiles or external account information</li>
                  <li>• Location data beyond general geographic region</li>
                  <li>• Device fingerprinting or tracking across sites</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card 
            className="cyber-border"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye style={{ color: "var(--matrix-green)" }} />
                How We Use Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Educational Purposes</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Privacy assessment data helps us improve our educational content and provide 
                  personalized recommendations. All responses are processed to generate insights 
                  about common privacy gaps and effective education strategies.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Communication</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Contact information is used solely to respond to your inquiries and provide 
                  support. We never sell, rent, or share your contact details with third parties.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Platform Improvement</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Anonymous usage data helps us understand which features are most valuable 
                  and identify areas for improvement in our privacy education platform.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card 
            className="cyber-border"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock style={{ color: "var(--matrix-green)" }} />
                Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Encryption</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  All data transmission is protected using industry-standard TLS encryption. 
                  Stored data is encrypted at rest using AES-256 encryption standards.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Access Controls</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Access to user data is strictly limited to authorized personnel who require 
                  it for platform operation and improvement. All access is logged and monitored.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Data Retention</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Contact messages are retained for 2 years for support purposes. Assessment 
                  data is anonymized after 1 year. You can request data deletion at any time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card 
            className="cyber-border"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield style={{ color: "var(--matrix-green)" }} />
                Your Privacy Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Access & Portability</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  You have the right to access all data we have collected about you and 
                  receive it in a machine-readable format for portability to other services.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Correction & Deletion</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  You can request correction of inaccurate data or complete deletion of your 
                  information from our systems at any time through our contact form.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Opt-Out Options</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  You can opt out of analytics tracking using browser settings or privacy 
                  extensions. All educational content remains fully accessible regardless.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third Parties */}
          <Card 
            className="cyber-border"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service Providers</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  We use minimal third-party services, all carefully vetted for privacy practices:
                </p>
                <ul className="mt-2 space-y-1" style={{ color: "var(--text-secondary)" }}>
                  <li>• Hosting infrastructure for platform availability</li>
                  <li>• Email service for responding to contact forms</li>
                  <li>• Analytics service (privacy-focused, no personal data)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">External Links</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Our platform includes links to privacy tools and resources. We are not 
                  responsible for the privacy practices of external sites and recommend 
                  reviewing their privacy policies before sharing personal information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card 
            className="cyber-border"
            style={{ backgroundColor: "var(--cyber-gray)" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail style={{ color: "var(--matrix-green)" }} />
                Contact & Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Privacy Questions</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  For any privacy-related questions, data requests, or concerns, please contact 
                  us through our secure contact form. We respond to all privacy inquiries within 
                  48 hours.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Policy Updates</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  We will notify users of any material changes to this privacy policy through 
                  platform announcements. Continued use after notification constitutes acceptance 
                  of updated terms.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Notice */}
        <div className="mt-12 text-center">
          <div 
            className="rounded-lg p-6 border-l-4"
            style={{ 
              backgroundColor: "var(--cyber-gray)",
              borderLeftColor: "var(--matrix-green)"
            }}
          >
            <h3 className="font-semibold mb-2" style={{ color: "var(--matrix-green)" }}>
              Commitment to Privacy
            </h3>
            <p style={{ color: "var(--text-secondary)" }}>
              As a privacy education platform, we hold ourselves to the highest standards of 
              data protection. We practice what we teach and continuously improve our privacy 
              practices based on the latest security research and user feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}