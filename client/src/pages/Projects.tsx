import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Calendar, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");

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

        {/* Filters */}
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Card key={i} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 hover-elevate" data-testid={`project-card-${i}`}>
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
      </div>
    </Layout>
  );
}

//todo: remove mock functionality
const projects = [
  {
    name: "Brand Redesign",
    client: "TechCorp Inc",
    icon: "🎨",
    color: "bg-gradient-to-br from-primary to-chart-1",
    progress: 75,
    deadline: "Mar 25",
    team: "6",
    status: "On Track"
  },
  {
    name: "Product Launch",
    client: "StartupXYZ",
    icon: "🚀",
    color: "bg-gradient-to-br from-accent to-primary",
    progress: 45,
    deadline: "Mar 20",
    team: "8",
    status: "At Risk"
  },
  {
    name: "Social Campaign",
    client: "FashionCo",
    icon: "📱",
    color: "bg-gradient-to-br from-chart-3 to-accent",
    progress: 90,
    deadline: "Mar 30",
    team: "4",
    status: "On Track"
  },
  {
    name: "Video Production",
    client: "MediaGroup",
    icon: "🎬",
    color: "bg-gradient-to-br from-chart-4 to-chart-3",
    progress: 60,
    deadline: "Apr 5",
    team: "5",
    status: "On Track"
  },
  {
    name: "Website Redesign",
    client: "RetailHub",
    icon: "💻",
    color: "bg-gradient-to-br from-primary to-accent",
    progress: 30,
    deadline: "Apr 10",
    team: "7",
    status: "On Track"
  },
  {
    name: "App Development",
    client: "FinTech Solutions",
    icon: "📲",
    color: "bg-gradient-to-br from-accent to-chart-4",
    progress: 85,
    deadline: "Mar 28",
    team: "9",
    status: "On Track"
  }
];
