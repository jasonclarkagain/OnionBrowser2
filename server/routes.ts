import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import { storage } from "./storage";
import { 
  insertPrivacyAssessmentSchema, 
  insertContactMessageSchema, 
  insertProxyLogSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Privacy education routes
  app.get("/api/courses", async (req: Request, res: Response) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const course = await storage.getCourseById(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // Privacy tools routes
  app.get("/api/privacy-tools", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      const tools = category 
        ? await storage.getToolsByCategory(category)
        : await storage.getAllPrivacyTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch privacy tools" });
    }
  });

  // Privacy assessment routes
  app.post("/api/privacy-assessment", async (req: Request, res: Response) => {
    try {
      const validatedData = insertPrivacyAssessmentSchema.parse(req.body);
      const assessment = await storage.createPrivacyAssessment(validatedData);
      res.json(assessment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save assessment" });
    }
  });

  app.get("/api/privacy-assessment", async (req: Request, res: Response) => {
    try {
      const assessments = await storage.getUserAssessments();
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Proxy routes and middleware
  app.get("/api/proxy/stats", async (req: Request, res: Response) => {
    try {
      const stats = await storage.getProxyStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch proxy stats" });
    }
  });

  // Secure web proxy
  app.use("/api/proxy", createProxyMiddleware({
    target: '',
    changeOrigin: true,
    secure: true,
    followRedirects: true,
    router: (req) => {
      const targetUrl = req.query.url as string;
      if (!targetUrl) {
        throw new Error('No target URL provided');
      }
      
      // Validate URL
      try {
        const url = new URL(targetUrl);
        if (!['http:', 'https:'].includes(url.protocol)) {
          throw new Error('Invalid protocol');
        }
        if (url.hostname.endsWith('.onion')) {
          throw new Error('.onion sites not supported via proxy');
        }
        return targetUrl;
      } catch (error) {
        throw new Error('Invalid URL format');
      }
    },
    pathRewrite: {
      '^/api/proxy': ''
    },
    onProxyReq: async (proxyReq, req, res) => {
      const startTime = Date.now();
      req['startTime'] = startTime;
      
      // Log the request
      const targetUrl = req.query.url as string;
      const userAgent = req.headers['user-agent'] || '';
      
      try {
        await storage.logProxyRequest({
          targetUrl,
          userAgent,
          success: true,
          responseTime: null
        });
      } catch (error) {
        console.error('Failed to log proxy request:', error);
      }
    },
    onProxyRes: async (proxyRes, req, res) => {
      const endTime = Date.now();
      const responseTime = endTime - (req['startTime'] || endTime);
      
      // Update the log with response time
      const targetUrl = req.query.url as string;
      const userAgent = req.headers['user-agent'] || '';
      
      try {
        await storage.logProxyRequest({
          targetUrl,
          userAgent,
          success: proxyRes.statusCode < 400,
          responseTime
        });
      } catch (error) {
        console.error('Failed to update proxy log:', error);
      }
    },
    onError: async (err, req, res) => {
      const targetUrl = req.query.url as string;
      const userAgent = req.headers['user-agent'] || '';
      
      try {
        await storage.logProxyRequest({
          targetUrl,
          userAgent,
          success: false,
          responseTime: null
        });
      } catch (error) {
        console.error('Failed to log proxy error:', error);
      }
      
      res.status(500).json({ 
        message: 'Proxy request failed',
        error: err.message 
      });
    }
  }));

  const httpServer = createServer(app);
  return httpServer;
}
