import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  client: text("client").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  progress: integer("progress").notNull().default(0),
  deadline: text("deadline").notNull(),
  team: text("team").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export const assets = pgTable("assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  size: text("size").notNull(),
  type: text("type").notNull(),
  url: text("url"),
  thumbnail: text("thumbnail").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAssetSchema = createInsertSchema(assets).omit({ id: true, createdAt: true });
export type InsertAsset = z.infer<typeof insertAssetSchema>;
export type Asset = typeof assets.$inferSelect;

export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  platform: text("platform").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  status: text("status").notNull(),
  impressions: text("impressions").notNull(),
  clicks: text("clicks").notNull(),
  ctr: text("ctr").notNull(),
  spend: text("spend").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({ id: true, createdAt: true });
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  client: text("client").notNull(),
  initials: text("initials").notNull(),
  color: text("color").notNull(),
  project: text("project").notNull(),
  content: text("content").notNull(),
  time: text("time").notNull(),
  needsReview: boolean("needs_review").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export const feedbackItems = pgTable("feedback_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  client: text("client").notNull(),
  priority: text("priority").notNull(),
  time: text("time").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFeedbackItemSchema = createInsertSchema(feedbackItems).omit({ id: true, createdAt: true });
export type InsertFeedbackItem = z.infer<typeof insertFeedbackItemSchema>;
export type FeedbackItem = typeof feedbackItems.$inferSelect;

export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  initials: text("initials").notNull(),
  role: text("role").notNull(),
  color: text("color").notNull(),
  utilization: integer("utilization").notNull(),
  hours: integer("hours").notNull(),
  projects: text("projects").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true, createdAt: true });
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

export const projectProfitability = pgTable("project_profitability", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  budget: text("budget").notNull(),
  spent: text("spent").notNull(),
  hours: text("hours").notNull(),
  revenue: text("revenue").notNull(),
  roi: decimal("roi", { precision: 4, scale: 1 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectProfitabilitySchema = createInsertSchema(projectProfitability).omit({ id: true, createdAt: true });
export type InsertProjectProfitability = z.infer<typeof insertProjectProfitabilitySchema>;
export type ProjectProfitability = typeof projectProfitability.$inferSelect;
