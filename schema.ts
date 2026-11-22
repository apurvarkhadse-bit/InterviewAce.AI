import { pgTable, serial, text, integer, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  password: varchar("password", { length: 180 }).notNull(),
  branch: varchar("branch", { length: 80 }).default("Computer Science"),
  targetRole: varchar("target_role", { length: 120 }).default("Web Development Intern"),
  college: varchar("college", { length: 180 }).default(""),
  year: varchar("year", { length: 40 }).default("3rd Year"),
  targetCompany: varchar("target_company", { length: 80 }).default("TCS"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assessmentAttempts = pgTable("assessment_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  userName: varchar("user_name", { length: 120 }).default("Guest"),
  testId: varchar("test_id", { length: 80 }).notNull(),
  testTitle: varchar("test_title", { length: 200 }).notNull(),
  domain: varchar("domain", { length: 100 }).notNull(),
  score: integer("score").notNull(),
  total: integer("total").notNull(),
  accuracy: integer("accuracy").notNull(),
  timeTakenSec: integer("time_taken_sec").default(0),
  details: jsonb("details").default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const interviewSessions = pgTable("interview_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  userName: varchar("user_name", { length: 120 }).default("Guest"),
  domain: varchar("domain", { length: 120 }).notNull(),
  company: varchar("company", { length: 120 }).default("General"),
  mode: varchar("mode", { length: 40 }).default("voice"),
  overallScore: integer("overall_score").notNull(),
  keywordScore: integer("keyword_score").notNull(),
  fluencyScore: integer("fluency_score").notNull(),
  confidenceScore: integer("confidence_score").notNull(),
  fillerCount: integer("filler_count").default(0),
  wpm: integer("wpm").default(0),
  transcript: jsonb("transcript").default([]),
  swoc: jsonb("swoc").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  question: text("question").notNull(),
  domain: varchar("domain", { length: 120 }).default(""),
  company: varchar("company", { length: 120 }).default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  title: varchar("title", { length: 160 }).default("My Internship Resume"),
  content: jsonb("content").notNull().default({}),
  atsScore: integer("ats_score").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const agentMessages = pgTable("agent_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  role: varchar("role", { length: 20 }).notNull(),
  content: text("content").notNull(),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});
