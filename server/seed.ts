import { db } from "./db";
import { courses, privacyTools } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingCourses = await db.select().from(courses);
    const existingTools = await db.select().from(privacyTools);

    if (existingCourses.length === 0) {
      // Seed courses
      const defaultCourses = [
        {
          title: "Privacy Fundamentals",
          description: "Essential concepts for protecting your digital privacy and understanding online tracking",
          difficulty: "beginner",
          category: "foundations",
          content: {
            modules: [
              {
                title: "Digital Footprints",
                lessons: ["What is a digital footprint?", "Types of data collection", "Tracking methods"]
              },
              {
                title: "Privacy Settings",
                lessons: ["Browser privacy settings", "Social media privacy", "App permissions"]
              }
            ]
          },
          estimatedTime: 45
        },
        {
          title: "Tor Network Deep Dive",
          description: "Complete guide to understanding and using the Tor network for anonymous communication",
          difficulty: "intermediate",
          category: "anonymity",
          content: {
            modules: [
              {
                title: "How Tor Works",
                lessons: ["Onion routing explained", "Entry, middle, and exit nodes", "Traffic encryption"]
              },
              {
                title: "Using Tor Safely",
                lessons: ["Tor Browser setup", "Best practices", "Common mistakes to avoid"]
              }
            ]
          },
          estimatedTime: 90
        },
        {
          title: "Advanced OpSec",
          description: "Operational security practices for high-risk individuals and organizations",
          difficulty: "advanced",
          category: "security",
          content: {
            modules: [
              {
                title: "Threat Modeling",
                lessons: ["Identifying threats", "Risk assessment", "Security planning"]
              },
              {
                title: "Communication Security",
                lessons: ["Secure messaging", "Email encryption", "Voice security"]
              }
            ]
          },
          estimatedTime: 120
        }
      ];

      await db.insert(courses).values(defaultCourses);
      console.log("Courses seeded successfully");
    }

    if (existingTools.length === 0) {
      // Seed privacy tools
      const defaultTools = [
        {
          name: "PGP Encryption Tool",
          description: "End-to-end encryption for secure communication and file protection using OpenPGP standards",
          category: "encryption",
          rating: 5,
          features: ["End-to-end encryption", "Digital signatures", "Cross-platform compatibility", "Open source"],
          setupGuide: "Generate key pairs, configure email client, and learn encryption best practices",
          downloadUrl: "https://gnupg.org/download/",
          isEssential: true
        },
        {
          name: "AnonFiles",
          description: "Anonymous file sharing service for secure document distribution without registration",
          category: "file-sharing",
          rating: 4,
          features: ["No registration required", "Anonymous uploads", "Temporary links", "Multiple file formats"],
          setupGuide: "Upload files anonymously and share secure links with recipients",
          downloadUrl: "https://anonfiles.com",
          isEssential: false
        },
        {
          name: "Tor Browser",
          description: "The official browser for accessing .onion sites and browsing with maximum anonymity",
          category: "browser",
          rating: 5,
          features: ["Anonymous browsing", "Access .onion sites", "Built-in security features"],
          setupGuide: "Download from official Tor Project website and follow installation wizard",
          downloadUrl: "https://www.torproject.org/download/",
          isEssential: true
        },
        {
          name: "VPN Services",
          description: "Virtual private networks for encrypted internet connections and IP address masking",
          category: "vpn",
          rating: 4,
          features: ["Encrypted connections", "IP address masking", "Bypass geo-restrictions"],
          setupGuide: "Choose a reputable VPN provider and follow their setup instructions",
          downloadUrl: "",
          isEssential: false
        },
        {
          name: "Password Managers",
          description: "Secure storage and generation of unique passwords for all your online accounts",
          category: "password",
          rating: 5,
          features: ["Strong password generation", "Encrypted storage", "Auto-fill capabilities"],
          setupGuide: "Install a trusted password manager and create a strong master password",
          downloadUrl: "",
          isEssential: true
        }
      ];

      await db.insert(privacyTools).values(defaultTools);
      console.log("Privacy tools seeded successfully");
    }

    console.log("Database seeding completed");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}