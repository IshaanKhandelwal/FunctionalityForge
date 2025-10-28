import { 
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type Asset,
  type InsertAsset,
  type Campaign,
  type InsertCampaign,
  type Message,
  type InsertMessage,
  type FeedbackItem,
  type InsertFeedbackItem,
  type TeamMember,
  type InsertTeamMember,
  type ProjectProfitability,
  type InsertProjectProfitability
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  getAllAssets(): Promise<Asset[]>;
  getAsset(id: string): Promise<Asset | undefined>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  deleteAsset(id: string): Promise<boolean>;
  
  getAllCampaigns(): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: string, campaign: Partial<InsertCampaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: string): Promise<boolean>;
  
  getAllMessages(): Promise<Message[]>;
  getMessage(id: string): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  deleteMessage(id: string): Promise<boolean>;
  
  getAllFeedbackItems(): Promise<FeedbackItem[]>;
  getFeedbackItem(id: string): Promise<FeedbackItem | undefined>;
  createFeedbackItem(item: InsertFeedbackItem): Promise<FeedbackItem>;
  deleteFeedbackItem(id: string): Promise<boolean>;
  
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;
  
  getAllProjectProfitability(): Promise<ProjectProfitability[]>;
  getProjectProfitability(projectId: string): Promise<ProjectProfitability | undefined>;
  createProjectProfitability(profitability: InsertProjectProfitability): Promise<ProjectProfitability>;
  updateProjectProfitability(id: string, profitability: Partial<InsertProjectProfitability>): Promise<ProjectProfitability | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private assets: Map<string, Asset>;
  private campaigns: Map<string, Campaign>;
  private messages: Map<string, Message>;
  private feedbackItems: Map<string, FeedbackItem>;
  private teamMembers: Map<string, TeamMember>;
  private projectProfitability: Map<string, ProjectProfitability>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.assets = new Map();
    this.campaigns = new Map();
    this.messages = new Map();
    this.feedbackItems = new Map();
    this.teamMembers = new Map();
    this.projectProfitability = new Map();
    
    this.seedData();
  }

  private seedData() {
    const sampleProjects: Project[] = [
      {
        id: randomUUID(),
        name: "Brand Redesign",
        client: "TechCorp Inc",
        icon: "🎨",
        color: "bg-gradient-to-br from-primary to-chart-1",
        progress: 75,
        deadline: "Mar 25",
        team: "6",
        status: "On Track",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Product Launch",
        client: "StartupXYZ",
        icon: "🚀",
        color: "bg-gradient-to-br from-accent to-primary",
        progress: 45,
        deadline: "Mar 20",
        team: "8",
        status: "At Risk",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Social Campaign",
        client: "FashionCo",
        icon: "📱",
        color: "bg-gradient-to-br from-chart-3 to-accent",
        progress: 90,
        deadline: "Mar 30",
        team: "4",
        status: "On Track",
        createdAt: new Date()
      }
    ];

    sampleProjects.forEach(p => this.projects.set(p.id, p));

    const sampleTeamMembers: TeamMember[] = [
      {
        id: randomUUID(),
        name: "Sarah Johnson",
        initials: "SJ",
        role: "Senior Designer",
        color: "bg-primary",
        utilization: 92,
        hours: 37,
        projects: ["Brand Redesign", "Product Launch"],
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Mike Chen",
        initials: "MC",
        role: "Creative Director",
        color: "bg-accent",
        utilization: 85,
        hours: 34,
        projects: ["Social Campaign", "Video Production"],
        createdAt: new Date()
      }
    ];

    sampleTeamMembers.forEach(m => this.teamMembers.set(m.id, m));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: new Date(),
      progress: insertProject.progress ?? 0
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updated = { ...project, ...updates };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getAllAssets(): Promise<Asset[]> {
    return Array.from(this.assets.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getAsset(id: string): Promise<Asset | undefined> {
    return this.assets.get(id);
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const id = randomUUID();
    const asset: Asset = { 
      ...insertAsset, 
      id, 
      createdAt: new Date(),
      url: insertAsset.url ?? null
    };
    this.assets.set(id, asset);
    return asset;
  }

  async deleteAsset(id: string): Promise<boolean> {
    return this.assets.delete(id);
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = randomUUID();
    const campaign: Campaign = { ...insertCampaign, id, createdAt: new Date() };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaign(id: string, updates: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;
    
    const updated = { ...campaign, ...updates };
    this.campaigns.set(id, updated);
    return updated;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    return this.campaigns.delete(id);
  }

  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getMessage(id: string): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = { 
      ...insertMessage, 
      id, 
      createdAt: new Date(),
      needsReview: insertMessage.needsReview ?? false
    };
    this.messages.set(id, message);
    return message;
  }

  async deleteMessage(id: string): Promise<boolean> {
    return this.messages.delete(id);
  }

  async getAllFeedbackItems(): Promise<FeedbackItem[]> {
    return Array.from(this.feedbackItems.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getFeedbackItem(id: string): Promise<FeedbackItem | undefined> {
    return this.feedbackItems.get(id);
  }

  async createFeedbackItem(insertItem: InsertFeedbackItem): Promise<FeedbackItem> {
    const id = randomUUID();
    const item: FeedbackItem = { ...insertItem, id, createdAt: new Date() };
    this.feedbackItems.set(id, item);
    return item;
  }

  async deleteFeedbackItem(id: string): Promise<boolean> {
    return this.feedbackItems.delete(id);
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const member: TeamMember = { ...insertMember, id, createdAt: new Date() };
    this.teamMembers.set(id, member);
    return member;
  }

  async updateTeamMember(id: string, updates: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const member = this.teamMembers.get(id);
    if (!member) return undefined;
    
    const updated = { ...member, ...updates };
    this.teamMembers.set(id, updated);
    return updated;
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    return this.teamMembers.delete(id);
  }

  async getAllProjectProfitability(): Promise<ProjectProfitability[]> {
    return Array.from(this.projectProfitability.values());
  }

  async getProjectProfitability(projectId: string): Promise<ProjectProfitability | undefined> {
    return Array.from(this.projectProfitability.values()).find(p => p.projectId === projectId);
  }

  async createProjectProfitability(insertProf: InsertProjectProfitability): Promise<ProjectProfitability> {
    const id = randomUUID();
    const profitability: ProjectProfitability = { ...insertProf, id, createdAt: new Date() };
    this.projectProfitability.set(id, profitability);
    return profitability;
  }

  async updateProjectProfitability(id: string, updates: Partial<InsertProjectProfitability>): Promise<ProjectProfitability | undefined> {
    const prof = this.projectProfitability.get(id);
    if (!prof) return undefined;
    
    const updated = { ...prof, ...updates };
    this.projectProfitability.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
