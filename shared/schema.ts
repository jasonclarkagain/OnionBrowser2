import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // "beginner", "intermediate", "advanced"
  category: text("category").notNull(),
  content: jsonb("content").notNull(), // course modules and lessons
  estimatedTime: integer("estimated_time").notNull(), // in minutes
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  courseId: integer("course_id").references(() => courses.id),
  progress: integer("progress").notNull().default(0), // percentage 0-100
  completed: boolean("completed").notNull().default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const privacyAssessments = pgTable("privacy_assessments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  responses: jsonb("responses").notNull(),
  score: integer("score").notNull(),
  recommendations: jsonb("recommendations").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const privacyTools = pgTable("privacy_tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  features: jsonb("features").notNull(),
  setupGuide: text("setup_guide"),
  downloadUrl: text("download_url"),
  isEssential: boolean("is_essential").notNull().default(false),
});

export const proxyLogs = pgTable("proxy_logs", {
  id: serial("id").primaryKey(),
  targetUrl: text("target_url").notNull(),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").defaultNow(),
  success: boolean("success").notNull(),
  responseTime: integer("response_time"), // in milliseconds
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  updatedAt: true,
});

export const insertPrivacyAssessmentSchema = createInsertSchema(privacyAssessments).omit({
  id: true,
  createdAt: true,
});

export const insertPrivacyToolSchema = createInsertSchema(privacyTools).omit({
  id: true,
});

export const insertProxyLogSchema = createInsertSchema(proxyLogs).omit({
  id: true,
  timestamp: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type PrivacyAssessment = typeof privacyAssessments.$inferSelect;
export type InsertPrivacyAssessment = z.infer<typeof insertPrivacyAssessmentSchema>;
export type PrivacyTool = typeof privacyTools.$inferSelect;
export type InsertPrivacyTool = z.infer<typeof insertPrivacyToolSchema>;
export type ProxyLog = typeof proxyLogs.$inferSelect;
export type InsertProxyLog = z.infer<typeof insertProxyLogSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
