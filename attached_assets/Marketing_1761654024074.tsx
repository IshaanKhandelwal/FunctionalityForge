import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, Eye, MousePointer, DollarSign, BarChart3 } from "lucide-react";

export default function Marketing() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Marketing Campaigns</h1>
            <p className="text-muted-foreground">Automate launches, schedule content, and optimize with AI insights</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Reach</span>
                <Eye className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">2.4M</div>
              <div className="flex items-center gap-1 text-sm text-success mt-1">
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
              <div className="flex items-center gap-1 text-sm text-success mt-1">
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
              <div className="flex items-center gap-1 text-sm text-success mt-1">
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
              <div className="flex items-center gap-1 text-sm text-success mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+24%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign, i) => (
                <div key={i} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
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
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="ghost">Edit</Button>
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

const campaigns = [
  {
    name: "Spring Sale 2024",
    platform: "Google Ads & Meta",
    icon: "🎯",
    color: "bg-gradient-to-br from-primary to-accent",
    status: "Active",
    impressions: "456K",
    clicks: "12.3K",
    ctr: "2.7%",
    spend: "$8,500"
  },
  {
    name: "Brand Awareness",
    platform: "Social Media",
    icon: "📱",
    color: "bg-gradient-to-br from-accent to-warning",
    status: "Active",
    impressions: "892K",
    clicks: "24.1K",
    ctr: "2.7%",
    spend: "$12,200"
  },
  {
    name: "Product Launch",
    platform: "Multi-Channel",
    icon: "🚀",
    color: "bg-gradient-to-br from-success to-primary",
    status: "Active",
    impressions: "1.1M",
    clicks: "38.4K",
    ctr: "3.5%",
    spend: "$15,800"
  }
];
