import { Link } from "wouter";
import { Shield, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="border-t py-12 px-4 lg:px-8"
      style={{ 
        backgroundColor: "var(--cyber-gray)", 
        borderColor: "var(--cyber-border)" 
      }}
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--matrix-green)" }}
              >
                <Shield className="text-black" />
              </div>
              <h3 className="text-lg font-bold glow-text">PrivacyGuard</h3>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Empowering users with comprehensive privacy education and secure browsing tools.
            </p>
          </div>

          {/* Education */}
          <div>
            <h4 className="font-semibold mb-4">Education</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li>
                <Link href="/privacy-fundamentals">
                  <span className="cursor-pointer hover:text-primary transition-colors">Privacy Fundamentals</span>
                </Link>
              </li>
              <li>
                <Link href="/tor-network-guide">
                  <span className="cursor-pointer hover:text-primary transition-colors">Tor Network Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/opsec-best-practices">
                  <span className="cursor-pointer hover:text-primary transition-colors">OpSec Best Practices</span>
                </Link>
              </li>
              <li>
                <Link href="/interactive-tutorials">
                  <span className="cursor-pointer hover:text-primary transition-colors">Interactive Tutorials</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4">Tools & Resources</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li>
                <Link href="/proxy">
                  <span className="cursor-pointer hover:text-primary transition-colors">Secure Web Proxy</span>
                </Link>
              </li>
              <li>
                <Link href="/assessment">
                  <span className="cursor-pointer hover:text-primary transition-colors">Privacy Assessment</span>
                </Link>
              </li>
              <li>
                <Link href="/tool-recommendations">
                  <span className="cursor-pointer hover:text-primary transition-colors">Tool Recommendations</span>
                </Link>
              </li>
              <li>
                <Link href="/setup-guides">
                  <span className="cursor-pointer hover:text-primary transition-colors">Setup Guides</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact & Support</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li>
                <Link href="/community-forum">
                  <span className="cursor-pointer hover:text-primary transition-colors">Community Forum</span>
                </Link>
              </li>
              <li>
                <Link href="/support-center">
                  <span className="cursor-pointer hover:text-primary transition-colors">Support Center</span>
                </Link>
              </li>
              <li>
                <Link href="/feedback">
                  <span className="cursor-pointer hover:text-primary transition-colors">Feedback</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <span className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div 
          className="border-t mt-8 pt-8"
          style={{ borderColor: "var(--cyber-border)" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <p>© 2024 PrivacyGuard. All rights reserved. Built for privacy education.</p>
              <p className="mt-2">
                Made with <span style={{ color: "var(--matrix-green)" }}>&lt;3</span> by{" "}
                <a 
                  href="https://jason-clark.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors duration-200"
                  style={{ color: "var(--matrix-green)" }}
                >
                  Jason Clark
                </a>
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a 
                href="#" 
                className="hover:text-primary transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="hover:text-primary transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="hover:text-primary transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
