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

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your agency today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Projects"
            value="24"
            change="+12%"
            trend="up"
            icon={FolderKanban}
          />
          <StatCard
            title="Team Utilization"
            value="87%"
            change="+5%"
            trend="up"
            icon={Users}
          />
          <StatCard
            title="Campaign Performance"
            value="94%"
            change="+8%"
            trend="up"
            icon={BarChart3}
          />
          <StatCard
            title="Client Satisfaction"
            value="4.8/5"
            change="+0.3"
            trend="up"
            icon={CheckCircle2}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Projects</span>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProjects.map((project, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center`}>
                      <FolderKanban className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.client}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      project.status === 'On Track' ? 'text-success' :
                      project.status === 'At Risk' ? 'text-warning' : 'text-muted-foreground'
                    }`}>
                      {project.status}
                    </div>
                    <div className="text-xs text-muted-foreground">{project.deadline}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pending Approvals</span>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingTasks.map((task, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg ${task.urgency === 'high' ? 'bg-destructive' : 'bg-warning'} flex items-center justify-center flex-shrink-0`}>
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground">{task.title}</div>
                    <div className="text-sm text-muted-foreground">{task.project}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{task.time}</span>
                    </div>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, i) => (
                <div key={i} className="flex gap-4">
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
    <Card>
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
            trend === 'up' ? 'text-success' : 'text-destructive'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const recentProjects = [
  { name: "Brand Redesign", client: "TechCorp Inc", status: "On Track", deadline: "Due in 5 days", color: "bg-primary" },
  { name: "Product Launch", client: "StartupXYZ", status: "At Risk", deadline: "Due in 2 days", color: "bg-accent" },
  { name: "Social Campaign", client: "FashionCo", status: "On Track", deadline: "Due in 8 days", color: "bg-success" },
  { name: "Video Production", client: "MediaGroup", status: "On Track", deadline: "Due in 12 days", color: "bg-warning" }
];

const pendingTasks = [
  { title: "Client Feedback Review", project: "Brand Redesign", time: "2 hours ago", urgency: "high" },
  { title: "Asset Approval Needed", project: "Product Launch", time: "4 hours ago", urgency: "high" },
  { title: "Campaign Copy Review", project: "Social Campaign", time: "Yesterday", urgency: "medium" }
];

const activities = [
  { icon: CheckCircle2, title: "Project Completed", description: "Website Redesign for TechStartup finished", time: "2 hours ago", color: "bg-success" },
  { icon: Users, title: "New Team Member", description: "Sarah Johnson joined the design team", time: "5 hours ago", color: "bg-primary" },
  { icon: FolderKanban, title: "Project Started", description: "Mobile App Development kicked off", time: "Yesterday", color: "bg-accent" },
  { icon: BarChart3, title: "Campaign Launched", description: "Q4 Marketing Campaign went live", time: "2 days ago", color: "bg-warning" }
];
