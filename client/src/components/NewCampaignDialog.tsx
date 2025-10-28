import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCampaignSchema, type InsertCampaign } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

const campaignIcons = ["🎯", "📱", "🚀", "💡", "📊", "🎬"];
const campaignColors = [
  "bg-gradient-to-br from-primary to-accent",
  "bg-gradient-to-br from-accent to-chart-4",
  "bg-gradient-to-br from-chart-3 to-primary",
  "bg-gradient-to-br from-chart-4 to-chart-3"
];

export function NewCampaignDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<InsertCampaign>({
    resolver: zodResolver(insertCampaignSchema),
    defaultValues: {
      icon: "🎯",
      color: campaignColors[0],
      status: "Active",
      impressions: "0",
      clicks: "0",
      ctr: "0%",
      spend: "$0"
    }
  });

  const createCampaign = useMutation({
    mutationFn: async (data: InsertCampaign) => {
      return apiRequest('POST', '/api/campaigns', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      toast({
        title: "Success",
        description: "Campaign created successfully"
      });
      reset();
      setOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: InsertCampaign) => {
    createCampaign.mutate(data);
  };

  const selectedIcon = watch("icon");
  const selectedColor = watch("color");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" data-testid="button-new-campaign">
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input id="name" {...register("name")} data-testid="input-campaign-name" />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Input id="platform" {...register("platform")} placeholder="Google Ads & Meta" data-testid="input-platform" />
            {errors.platform && <p className="text-sm text-destructive">{errors.platform.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="impressions">Impressions</Label>
              <Input id="impressions" {...register("impressions")} placeholder="0" data-testid="input-impressions" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clicks">Clicks</Label>
              <Input id="clicks" {...register("clicks")} placeholder="0" data-testid="input-clicks" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ctr">CTR</Label>
              <Input id="ctr" {...register("ctr")} placeholder="0%" data-testid="input-ctr" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spend">Spend</Label>
              <Input id="spend" {...register("spend")} placeholder="$0" data-testid="input-spend" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => setValue("status", value)} defaultValue="Active">
              <SelectTrigger data-testid="select-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="flex gap-2 flex-wrap">
              {campaignIcons.map((icon) => (
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
              {campaignColors.map((color) => (
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
            <Button type="submit" disabled={createCampaign.isPending} data-testid="button-create-campaign">
              {createCampaign.isPending ? "Creating..." : "Create Campaign"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
