import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, DollarSign, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { TeamMember, ProjectProfitability, Project } from "@shared/schema";
import { dummyTeamMembers, dummyProjectProfitability, dummyProjects } from "@/lib/dummyData";

export default function Resources() {
  const { data: teamMembers, isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ['/api/team-members']
  });

  const { data: profitability, isLoading: profLoading } = useQuery<ProjectProfitability[]>({
    queryKey: ['/api/project-profitability']
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects']
  });

  // Use dummy data as fallback
  const teamData = teamMembers || dummyTeamMembers;
  const profitabilityData = profitability || dummyProjectProfitability;
  const projectsData = projects || dummyProjects;

  const avgUtilization = teamData.length > 0
    ? Math.round(teamData.reduce((sum, m) => sum + m.utilization, 0) / teamData.length)
    : 0;

  const totalHours = teamData.reduce((sum, m) => sum + m.hours, 0);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Resource Management</h1>
          <p className="text-muted-foreground">Monitor allocation and optimize workload distribution</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Team Utilization</span>
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{avgUtilization}%</div>
              <div className="flex items-center gap-1 text-sm text-chart-3 mt-1">
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
              <div className="text-3xl font-bold text-foreground">{totalHours}</div>
              <div className="text-sm text-muted-foreground mt-1">This week</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Project ROI</span>
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">3.2x</div>
              <div className="flex items-center gap-1 text-sm text-chart-3 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+0.4x</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Team Members</span>
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{teamData.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Active</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Workload</CardTitle>
          </CardHeader>
          <CardContent>
            {teamLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading team members...</div>
            ) : teamData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No team members yet</div>
            ) : (
              <div className="space-y-6">
                {teamData.map((member, i) => (
                  <div key={member.id} data-testid={`team-member-${i}`}>
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
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Profitability</CardTitle>
          </CardHeader>
          <CardContent>
            {profLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading profitability data...</div>
            ) : profitabilityData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No profitability data yet</div>
            ) : (
              <div className="space-y-4">
                {profitabilityData.map((prof, i) => {
                  const project = projectsData.find(p => p.id === prof.projectId);
                  const roi = parseFloat(prof.roi.toString());
                  
                  return (
                    <div key={prof.id} className="p-4 rounded-lg border border-card-border hover-elevate" data-testid={`profitability-${i}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-foreground">
                            {project?.name || 'Unknown Project'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {project?.client || 'Unknown Client'}
                          </div>
                        </div>
                        <Badge variant={
                          roi >= 3 ? 'default' :
                          roi >= 2 ? 'secondary' : 'outline'
                        }>
                          {roi}x ROI
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Budget</div>
                          <div className="font-medium text-foreground">{prof.budget}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Spent</div>
                          <div className="font-medium text-foreground">{prof.spent}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Hours</div>
                          <div className="font-medium text-foreground">{prof.hours}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                          <div className="font-medium text-chart-3">{prof.revenue}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
