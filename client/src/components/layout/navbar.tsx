import { Link, useLocation } from "wouter";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FloatingLogo from "@/components/three/FloatingLogo";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Education", href: "/education" },
    { name: "Tools", href: "/tools" },
    { name: "Secure Proxy", href: "/proxy" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-cyber-gray border-b" style={{ borderColor: "var(--cyber-border)" }}>
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <FloatingLogo className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-xl font-bold glow-text">
                  Privacy<span style={{ color: "var(--matrix-green)" }}>Guard</span>
                </h1>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Advanced Privacy Protection
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className={`cursor-pointer transition-colors ${
                    isActive(item.href)
                      ? "text-primary glow-text"
                      : "text-gray-400 hover:text-primary"
                  }`}
                  style={{
                    color: isActive(item.href) 
                      ? "var(--matrix-green)" 
                      : "var(--text-secondary)"
                  }}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: "var(--cyber-border)" }}>
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors ${
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-400 hover:text-primary hover:bg-gray-800"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      color: isActive(item.href) 
                        ? "var(--cyber-black)" 
                        : "var(--text-secondary)",
                      backgroundColor: isActive(item.href) 
                        ? "var(--matrix-green)" 
                        : "transparent"
                    }}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
