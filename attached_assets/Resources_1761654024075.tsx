import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, DollarSign, Users } from "lucide-react";

export default function Resources() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Resource Management</h1>
          <p className="text-muted-foreground">Monitor allocation and optimize workload distribution</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Team Utilization</span>
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">87%</div>
              <div className="flex items-center gap-1 text-sm text-success mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+5% optimal</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Billable Hours</span>
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">1,847</div>
              <div className="text-sm text-muted-foreground mt-1">This month</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Project ROI</span>
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">3.2x</div>
              <div className="flex items-center gap-1 text-sm text-success mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+0.4x</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Avg. Project Cost</span>
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">$24K</div>
              <div className="text-sm text-muted-foreground mt-1">Per project</div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle>Team Workload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {teamMembers.map((member, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className={member.color}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        member.utilization >= 90 ? 'destructive' :
                        member.utilization >= 75 ? 'default' : 'secondary'
                      }>
                        {member.utilization}% Utilized
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {member.hours}h this week
                      </div>
                    </div>
                  </div>
                  <Progress value={member.utilization} className="h-2" />
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {member.projects.map((project, j) => (
                      <Badge key={j} variant="outline" className="text-xs">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Profitability */}
        <Card>
          <CardHeader>
            <CardTitle>Project Profitability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectProfitability.map((project, i) => (
                <div key={i} className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-foreground">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.client}</div>
                    </div>
                    <Badge variant={
                      project.roi >= 3 ? 'default' :
                      project.roi >= 2 ? 'secondary' : 'outline'
                    }>
                      {project.roi}x ROI
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Budget</div>
                      <div className="font-medium text-foreground">{project.budget}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Spent</div>
                      <div className="font-medium text-foreground">{project.spent}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Hours</div>
                      <div className="font-medium text-foreground">{project.hours}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                      <div className="font-medium text-success">{project.revenue}</div>
                    </div>
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

const teamMembers = [
  {
    name: "Sarah Johnson",
    initials: "SJ",
    role: "Senior Designer",
    color: "bg-primary",
    utilization: 92,
    hours: 37,
    projects: ["Brand Redesign", "Product Launch"]
  },
  {
    name: "Mike Chen",
    initials: "MC",
    role: "Creative Director",
    color: "bg-accent",
    utilization: 85,
    hours: 34,
    projects: ["Social Campaign", "Video Production"]
  },
  {
    name: "Emily Davis",
    initials: "ED",
    role: "3D Artist",
    color: "bg-success",
    utilization: 78,
    hours: 31,
    projects: ["Product Launch", "App Development"]
  },
  {
    name: "Alex Kumar",
    initials: "AK",
    role: "Motion Designer",
    color: "bg-warning",
    utilization: 88,
    hours: 35,
    projects: ["Video Production", "Brand Redesign"]
  },
  {
    name: "Lisa Wang",
    initials: "LW",
    role: "UI/UX Designer",
    color: "bg-primary",
    utilization: 81,
    hours: 32,
    projects: ["App Development", "Website Redesign"]
  }
];

const projectProfitability = [
  { name: "Brand Redesign", client: "TechCorp Inc", budget: "$45K", spent: "$38K", hours: "342", revenue: "$135K", roi: 3.6 },
  { name: "Product Launch", client: "StartupXYZ", budget: "$62K", spent: "$58K", hours: "487", revenue: "$186K", roi: 3.2 },
  { name: "Social Campaign", client: "FashionCo", budget: "$28K", spent: "$24K", hours: "218", revenue: "$72K", roi: 3.0 },
  { name: "Video Production", client: "MediaGroup", budget: "$38K", spent: "$35K", hours: "298", revenue: "$95K", roi: 2.7 }
];
