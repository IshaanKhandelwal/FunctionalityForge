import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema, type InsertProject } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

const projectIcons = ["🎨", "🚀", "📱", "🎬", "💻", "📲", "🎯", "✨"];
const projectColors = [
  "bg-gradient-to-br from-primary to-chart-1",
  "bg-gradient-to-br from-accent to-primary",
  "bg-gradient-to-br from-chart-3 to-accent",
  "bg-gradient-to-br from-chart-4 to-chart-3",
  "bg-gradient-to-br from-primary to-accent"
];

export function NewProjectDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      icon: "🎨",
      color: projectColors[0],
      progress: 0,
      status: "On Track"
    }
  });

  const createProject = useMutation({
    mutationFn: async (data: InsertProject) => {
      return apiRequest('POST', '/api/projects', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      toast({
        title: "Success",
        description: "Project created successfully"
      });
      reset();
      setOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: InsertProject) => {
    createProject.mutate(data);
  };

  const selectedIcon = watch("icon");
  const selectedColor = watch("color");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" data-testid="button-new-project">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" {...register("name")} data-testid="input-project-name" />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="client">Client Name</Label>
            <Input id="client" {...register("client")} data-testid="input-client-name" />
            {errors.client && <p className="text-sm text-destructive">{errors.client.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" {...register("deadline")} placeholder="Mar 25" data-testid="input-deadline" />
              {errors.deadline && <p className="text-sm text-destructive">{errors.deadline.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="team">Team Size</Label>
              <Input id="team" {...register("team")} placeholder="5" data-testid="input-team-size" />
              {errors.team && <p className="text-sm text-destructive">{errors.team.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => setValue("status", value)} defaultValue="On Track">
              <SelectTrigger data-testid="select-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="On Track">On Track</SelectItem>
                <SelectItem value="At Risk">At Risk</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="flex gap-2 flex-wrap">
              {projectIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setValue("icon", icon)}
                  className={`w-12 h-12 rounded-lg border-2 text-2xl hover-elevate ${
                    selectedIcon === icon ? 'border-primary' : 'border-border'
                  }`}
                  data-testid={`icon-${icon}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color Theme</Label>
            <div className="flex gap-2 flex-wrap">
              {projectColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setValue("color", color)}
                  className={`w-12 h-12 rounded-lg border-2 ${color} ${
                    selectedColor === color ? 'border-primary border-4' : 'border-border'
                  }`}
                  data-testid={`color-${color}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button type="submit" disabled={createProject.isPending} data-testid="button-create-project">
              {createProject.isPending ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
