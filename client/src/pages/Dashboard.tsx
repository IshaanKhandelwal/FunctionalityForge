import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Users,
  FolderKanban,
  BarChart3
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project, Message, FeedbackItem } from "@shared/schema";

interface DashboardStats {
  activeProjects: number;
  teamUtilization: number;
  campaignPerformance: number;
  clientSatisfaction: number;
}

export default function Dashboard() {
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats']
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects']
  });

  const { data: messages } = useQuery<Message[]>({
    queryKey: ['/api/messages']
  });

  const { data: feedbackItems } = useQuery<FeedbackItem[]>({
    queryKey: ['/api/feedback']
  });

  const recentProjects = projects?.slice(0, 4) || [];
  const pendingTasks = feedbackItems?.slice(0, 3) || [];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your agency today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Projects"
            value={stats?.activeProjects.toString() || "0"}
            change="+12%"
            trend="up"
            icon={FolderKanban}
          />
          <StatCard
            title="Team Utilization"
            value={`${stats?.teamUtilization || 0}%`}
            change="+5%"
            trend="up"
            icon={Users}
          />
          <StatCard
            title="Campaign Performance"
            value={`${stats?.campaignPerformance || 0}%`}
            change="+8%"
            trend="up"
            icon={BarChart3}
          />
          <StatCard
            title="Client Satisfaction"
            value={`${stats?.clientSatisfaction || 0}/5`}
            change="+0.3"
            trend="up"
            icon={CheckCircle2}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Projects</span>
                <Button variant="ghost" size="sm" data-testid="button-view-all-projects">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProjects.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No projects yet</div>
              ) : (
                recentProjects.map((project, i) => (
                  <div key={project.id} className="flex items-center justify-between p-3 rounded-lg hover-elevate transition-colors" data-testid={`project-${i}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center`}>
                        <span className="text-lg">{project.icon}</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{project.name}</div>
                        <div className="text-sm text-muted-foreground">{project.client}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        project.status === 'On Track' ? 'text-chart-3' :
                        project.status === 'At Risk' ? 'text-chart-4' : 'text-muted-foreground'
                      }`}>
                        {project.status}
                      </div>
                      <div className="text-xs text-muted-foreground">{project.deadline}</div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pending Approvals</span>
                <Button variant="ghost" size="sm" data-testid="button-view-all-tasks">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No pending approvals</div>
              ) : (
                pendingTasks.map((task, i) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg hover-elevate transition-colors" data-testid={`task-${i}`}>
                    <div className={`w-8 h-8 rounded-lg ${task.priority === 'High' ? 'bg-destructive' : 'bg-chart-4'} flex items-center justify-center flex-shrink-0`}>
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">{task.title}</div>
                      <div className="text-sm text-muted-foreground">{task.client}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{task.time}</span>
                      </div>
                    </div>
                    <Button size="sm" data-testid={`button-review-${i}`}>Review</Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, i) => (
                <div key={i} className="flex gap-4" data-testid={`activity-${i}`}>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center`}>
                      <activity.icon className="w-4 h-4 text-white" />
                    </div>
                    {i < activities.length - 1 && (
                      <div className="w-px h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="font-medium text-foreground">{activity.title}</div>
                    <div className="text-sm text-muted-foreground">{activity.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

function StatCard({ title, value, change, trend, icon: Icon }: any) {
  return (
    <Card data-testid={`stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-muted-foreground">{title}</div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold text-foreground">{value}</div>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend === 'up' ? 'text-chart-3' : 'text-destructive'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const activities = [
  { icon: CheckCircle2, title: "Project Completed", description: "Website Redesign for TechStartup finished", time: "2 hours ago", color: "bg-chart-3" },
  { icon: Users, title: "New Team Member", description: "Sarah Johnson joined the design team", time: "5 hours ago", color: "bg-primary" },
  { icon: FolderKanban, title: "Project Started", description: "Mobile App Development kicked off", time: "Yesterday", color: "bg-accent" },
  { icon: BarChart3, title: "Campaign Launched", description: "Q4 Marketing Campaign went live", time: "2 days ago", color: "bg-chart-4" }
];
