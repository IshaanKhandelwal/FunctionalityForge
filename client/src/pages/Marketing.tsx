import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, Eye, MousePointer, DollarSign, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Campaign } from "@shared/schema";

export default function Marketing() {
  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ['/api/campaigns']
  });

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Marketing Campaigns</h1>
            <p className="text-muted-foreground">Automate launches, schedule content, and optimize with AI insights</p>
          </div>
          <Button className="gap-2" data-testid="button-new-campaign" onClick={() => console.log('New campaign clicked')}>
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Reach</span>
                <Eye className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">2.4M</div>
              <div className="flex items-center gap-1 text-sm text-chart-3 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+18%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Engagement</span>
                <MousePointer className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">8.7%</div>
              <div className="flex items-center gap-1 text-sm text-chart-3 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+2.3%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Conversions</span>
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">1,247</div>
              <div className="flex items-center gap-1 text-sm text-chart-3 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+12%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Revenue</span>
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">$48.2K</div>
              <div className="flex items-center gap-1 text-sm text-chart-3 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+24%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading campaigns...</div>
            ) : !campaigns || campaigns.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No campaigns yet</p>
                <Button onClick={() => console.log('Create first campaign')}>
                  Create Your First Campaign
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign, i) => (
                  <div key={campaign.id} className="p-4 rounded-lg border border-card-border hover:border-primary/50 transition-all hover-elevate" data-testid={`campaign-${i}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg ${campaign.color} flex items-center justify-center text-2xl`}>
                          {campaign.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">{campaign.platform}</p>
                        </div>
                      </div>
                      <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Impressions</div>
                        <div className="text-lg font-semibold text-foreground">{campaign.impressions}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Clicks</div>
                        <div className="text-lg font-semibold text-foreground">{campaign.clicks}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">CTR</div>
                        <div className="text-lg font-semibold text-foreground">{campaign.ctr}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Spend</div>
                        <div className="text-lg font-semibold text-foreground">{campaign.spend}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" data-testid={`button-view-campaign-${i}`} onClick={() => console.log(`View ${campaign.name}`)}>
                        View Details
                      </Button>
                      <Button size="sm" variant="ghost" data-testid={`button-edit-campaign-${i}`} onClick={() => console.log(`Edit ${campaign.name}`)}>
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
