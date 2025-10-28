import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProjectSchema,
  insertAssetSchema,
  insertCampaignSchema,
  insertMessageSchema,
  insertFeedbackItemSchema,
  insertTeamMemberSchema,
  insertProjectProfitabilitySchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const data = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, data);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const success = await storage.deleteProject(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  app.get("/api/assets", async (req, res) => {
    try {
      const assets = await storage.getAllAssets();
      res.json(assets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assets" });
    }
  });

  app.post("/api/assets", async (req, res) => {
    try {
      const data = insertAssetSchema.parse(req.body);
      const asset = await storage.createAsset(data);
      res.status(201).json(asset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create asset" });
    }
  });

  app.delete("/api/assets/:id", async (req, res) => {
    try {
      const success = await storage.deleteAsset(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Asset not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete asset" });
    }
  });

  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getAllCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const data = insertCampaignSchema.parse(req.body);
      const campaign = await storage.createCampaign(data);
      res.status(201).json(campaign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create campaign" });
    }
  });

  app.patch("/api/campaigns/:id", async (req, res) => {
    try {
      const data = insertCampaignSchema.partial().parse(req.body);
      const campaign = await storage.updateCampaign(req.params.id, data);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update campaign" });
    }
  });

  app.delete("/api/campaigns/:id", async (req, res) => {
    try {
      const success = await storage.deleteCampaign(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete campaign" });
    }
  });

  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const data = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(data);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  app.delete("/api/messages/:id", async (req, res) => {
    try {
      const success = await storage.deleteMessage(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  app.get("/api/feedback", async (req, res) => {
    try {
      const items = await storage.getAllFeedbackItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch feedback items" });
    }
  });

  app.post("/api/feedback", async (req, res) => {
    try {
      const data = insertFeedbackItemSchema.parse(req.body);
      const item = await storage.createFeedbackItem(data);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create feedback item" });
    }
  });

  app.delete("/api/feedback/:id", async (req, res) => {
    try {
      const success = await storage.deleteFeedbackItem(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Feedback item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete feedback item" });
    }
  });

  app.get("/api/team-members", async (req, res) => {
    try {
      const members = await storage.getAllTeamMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.post("/api/team-members", async (req, res) => {
    try {
      const data = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(data);
      res.status(201).json(member);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create team member" });
    }
  });

  app.patch("/api/team-members/:id", async (req, res) => {
    try {
      const data = insertTeamMemberSchema.partial().parse(req.body);
      const member = await storage.updateTeamMember(req.params.id, data);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update team member" });
    }
  });

  app.delete("/api/team-members/:id", async (req, res) => {
    try {
      const success = await storage.deleteTeamMember(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete team member" });
    }
  });

  app.get("/api/project-profitability", async (req, res) => {
    try {
      const profitability = await storage.getAllProjectProfitability();
      res.json(profitability);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project profitability" });
    }
  });

  app.post("/api/project-profitability", async (req, res) => {
    try {
      const data = insertProjectProfitabilitySchema.parse(req.body);
      const profitability = await storage.createProjectProfitability(data);
      res.status(201).json(profitability);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create project profitability" });
    }
  });

  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      const teamMembers = await storage.getAllTeamMembers();
      const campaigns = await storage.getAllCampaigns();
      
      const activeProjects = projects.filter(p => p.status !== 'Completed').length;
      const avgUtilization = teamMembers.length > 0
        ? Math.round(teamMembers.reduce((sum, m) => sum + m.utilization, 0) / teamMembers.length)
        : 0;
      
      const activeCampaigns = campaigns.filter(c => c.status === 'Active');
      const avgCampaignPerf = activeCampaigns.length > 0 
        ? Math.round(activeCampaigns.reduce((sum, c) => {
            const ctr = parseFloat(c.ctr.replace('%', ''));
            return sum + ctr;
          }, 0) / activeCampaigns.length)
        : 0;

      res.json({
        activeProjects,
        teamUtilization: avgUtilization,
        campaignPerformance: avgCampaignPerf,
        clientSatisfaction: 4.8
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
