import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Calendar, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@shared/schema";

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const { toast } = useToast();

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects']
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Success",
        description: "Project deleted successfully"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    }
  });

  const filteredProjects = projects?.filter(p => {
    if (filter === "all") return true;
    if (filter === "active") return p.status !== "Completed";
    if (filter === "completed") return p.status === "Completed";
    if (filter === "review") return p.status === "In Review";
    return true;
  }) || [];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Projects</h1>
            <p className="text-muted-foreground">Track milestones, automate reminders, and accelerate approvals</p>
          </div>
          <Button className="gap-2" data-testid="button-new-project" onClick={() => console.log('New project clicked')}>
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filter === "all" ? "outline" : "ghost"} 
            size="sm"
            onClick={() => setFilter("all")}
            data-testid="filter-all"
          >
            All Projects
          </Button>
          <Button 
            variant={filter === "active" ? "outline" : "ghost"} 
            size="sm"
            onClick={() => setFilter("active")}
            data-testid="filter-active"
          >
            Active
          </Button>
          <Button 
            variant={filter === "review" ? "outline" : "ghost"} 
            size="sm"
            onClick={() => setFilter("review")}
            data-testid="filter-review"
          >
            In Review
          </Button>
          <Button 
            variant={filter === "completed" ? "outline" : "ghost"} 
            size="sm"
            onClick={() => setFilter("completed")}
            data-testid="filter-completed"
          >
            Completed
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading projects...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 hover-elevate" data-testid={`project-card-${i}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg ${project.color} flex items-center justify-center`}>
                      <span className="text-2xl">{project.icon}</span>
                    </div>
                    <Button variant="ghost" size="icon" data-testid={`button-project-menu-${i}`} onClick={() => console.log(`Menu for ${project.name}`)}>
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{project.team}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <Badge variant={
                      project.status === 'On Track' ? 'default' :
                      project.status === 'At Risk' ? 'destructive' : 'secondary'
                    }>
                      {project.status}
                    </Badge>
                    <Button variant="ghost" size="sm" data-testid={`button-view-project-${i}`} onClick={() => console.log(`View ${project.name}`)}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
