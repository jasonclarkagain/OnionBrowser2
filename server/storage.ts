import { 
  users, courses, userProgress, privacyAssessments, privacyTools, proxyLogs, contactMessages,
  type User, type InsertUser, type Course, type InsertCourse, type UserProgress, type InsertUserProgress,
  type PrivacyAssessment, type InsertPrivacyAssessment, type PrivacyTool, type InsertPrivacyTool,
  type ProxyLog, type InsertProxyLog, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Course methods
  getAllCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;

  // User progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;

  // Privacy assessment methods
  createPrivacyAssessment(assessment: InsertPrivacyAssessment): Promise<PrivacyAssessment>;
  getUserAssessments(userId?: number): Promise<PrivacyAssessment[]>;

  // Privacy tools methods
  getAllPrivacyTools(): Promise<PrivacyTool[]>;
  getToolsByCategory(category: string): Promise<PrivacyTool[]>;
  createPrivacyTool(tool: InsertPrivacyTool): Promise<PrivacyTool>;

  // Proxy methods
  logProxyRequest(log: InsertProxyLog): Promise<ProxyLog>;
  getProxyStats(): Promise<{ totalRequests: number; averageResponseTime: number; successRate: number }>;

  // Contact methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private courses: Map<number, Course> = new Map();
  private userProgress: Map<number, UserProgress> = new Map();
  private privacyAssessments: Map<number, PrivacyAssessment> = new Map();
  private privacyTools: Map<number, PrivacyTool> = new Map();
  private proxyLogs: Map<number, ProxyLog> = new Map();
  private contactMessages: Map<number, ContactMessage> = new Map();
  private currentUserId = 1;
  private currentCourseId = 1;
  private currentProgressId = 1;
  private currentAssessmentId = 1;
  private currentToolId = 1;
  private currentProxyLogId = 1;
  private currentContactId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize default courses
    const defaultCourses: Course[] = [
      {
        id: 1,
        title: "Privacy Fundamentals",
        description: "Learn the basic concepts and terminology of digital privacy",
        difficulty: "beginner",
        category: "privacy",
        content: {
          modules: [
            { title: "What is Digital Privacy?", duration: 15 },
            { title: "Common Privacy Threats", duration: 20 },
            { title: "Basic Protection Strategies", duration: 25 }
          ]
        },
        estimatedTime: 60
      },
      {
        id: 2,
        title: "Tor Network Basics",
        description: "Understanding onion routing and the Tor network",
        difficulty: "intermediate",
        category: "tor",
        content: {
          modules: [
            { title: "How Onion Routing Works", duration: 30 },
            { title: "Tor Browser Features", duration: 25 },
            { title: "Best Practices for Tor Usage", duration: 20 }
          ]
        },
        estimatedTime: 75
      },
      {
        id: 3,
        title: "Advanced OpSec",
        description: "Operational security practices for maximum privacy",
        difficulty: "advanced",
        category: "opsec",
        content: {
          modules: [
            { title: "Threat Modeling", duration: 40 },
            { title: "Digital Identity Separation", duration: 35 },
            { title: "Advanced Anonymity Techniques", duration: 45 }
          ]
        },
        estimatedTime: 120
      }
    ];

    defaultCourses.forEach(course => {
      this.courses.set(course.id, course);
      this.currentCourseId = Math.max(this.currentCourseId, course.id + 1);
    });

    // Initialize default privacy tools
    const defaultTools: PrivacyTool[] = [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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

    defaultTools.forEach(tool => {
      this.privacyTools.set(tool.id, tool);
      this.currentToolId = Math.max(this.currentToolId, tool.id + 1);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourseById(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => progress.userId === userId);
  }

  async updateUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const existing = Array.from(this.userProgress.values()).find(
      p => p.userId === insertProgress.userId && p.courseId === insertProgress.courseId
    );

    if (existing) {
      const updated = { ...existing, ...insertProgress, updatedAt: new Date() };
      this.userProgress.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentProgressId++;
      const progress: UserProgress = { 
        ...insertProgress, 
        id, 
        updatedAt: new Date() 
      };
      this.userProgress.set(id, progress);
      return progress;
    }
  }

  async createPrivacyAssessment(insertAssessment: InsertPrivacyAssessment): Promise<PrivacyAssessment> {
    const id = this.currentAssessmentId++;
    const assessment: PrivacyAssessment = { 
      ...insertAssessment, 
      id, 
      createdAt: new Date() 
    };
    this.privacyAssessments.set(id, assessment);
    return assessment;
  }

  async getUserAssessments(userId?: number): Promise<PrivacyAssessment[]> {
    const assessments = Array.from(this.privacyAssessments.values());
    return userId ? assessments.filter(a => a.userId === userId) : assessments;
  }

  async getAllPrivacyTools(): Promise<PrivacyTool[]> {
    return Array.from(this.privacyTools.values());
  }

  async getToolsByCategory(category: string): Promise<PrivacyTool[]> {
    return Array.from(this.privacyTools.values()).filter(tool => tool.category === category);
  }

  async createPrivacyTool(insertTool: InsertPrivacyTool): Promise<PrivacyTool> {
    const id = this.currentToolId++;
    const tool: PrivacyTool = { ...insertTool, id };
    this.privacyTools.set(id, tool);
    return tool;
  }

  async logProxyRequest(insertLog: InsertProxyLog): Promise<ProxyLog> {
    const id = this.currentProxyLogId++;
    const log: ProxyLog = { 
      ...insertLog, 
      id, 
      timestamp: new Date() 
    };
    this.proxyLogs.set(id, log);
    return log;
  }

  async getProxyStats(): Promise<{ totalRequests: number; averageResponseTime: number; successRate: number }> {
    const logs = Array.from(this.proxyLogs.values());
    const totalRequests = logs.length;
    const successfulRequests = logs.filter(log => log.success).length;
    const averageResponseTime = logs.reduce((sum, log) => sum + (log.responseTime || 0), 0) / totalRequests || 0;
    const successRate = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0;

    return {
      totalRequests,
      averageResponseTime: Math.round(averageResponseTime),
      successRate: Math.round(successRate * 10) / 10
    };
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
