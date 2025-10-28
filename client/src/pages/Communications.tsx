import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Send, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function Communications() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Client Communications</h1>
          <p className="text-muted-foreground">Automated updates, personalized dashboards, and feedback loops</p>
        </div>

        {/* Communication Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Active Threads</span>
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">18</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Pending Reviews</span>
                <Clock className="w-4 h-4 text-chart-4" />
              </div>
              <div className="text-3xl font-bold text-foreground">5</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Approved</span>
                <CheckCircle2 className="w-4 h-4 text-chart-3" />
              </div>
              <div className="text-3xl font-bold text-foreground">42</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Response Time</span>
                <AlertCircle className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">2.4h</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Messages */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <div key={i} className="p-4 rounded-lg border border-card-border hover:border-primary/50 transition-all hover-elevate" data-testid={`message-${i}`}>
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className={message.color}>
                          {message.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-foreground">{message.client}</div>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">{message.project}</div>
                        <p className="text-sm text-foreground">{message.content}</p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" data-testid={`button-reply-${i}`} onClick={() => console.log(`Reply to ${message.client}`)}>
                            Reply
                          </Button>
                          {message.needsReview && (
                            <Button size="sm" data-testid={`button-review-${i}`} onClick={() => console.log(`Review feedback from ${message.client}`)}>
                              Review Feedback
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feedback Queue */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {feedbackItems.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 border border-card-border hover-elevate" data-testid={`feedback-${i}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={item.priority === 'High' ? 'destructive' : 'secondary'}>
                        {item.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <div className="font-medium text-sm text-foreground mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.client}</div>
                    <Button size="sm" className="w-full mt-3" variant="outline" data-testid={`button-view-feedback-${i}`} onClick={() => console.log(`View ${item.title}`)}>
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Automated Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Client Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduledReports.map((report, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-card-border hover-elevate" data-testid={`report-${i}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${report.color} flex items-center justify-center`}>
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{report.name}</div>
                      <div className="text-sm text-muted-foreground">{report.client}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{report.frequency}</Badge>
                    <div className="text-xs text-muted-foreground mt-1">Next: {report.next}</div>
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

//todo: remove mock functionality
const messages = [
  {
    client: "Sarah Johnson",
    initials: "SJ",
    color: "bg-primary",
    project: "Brand Redesign",
    content: "Love the new color palette! Can we adjust the typography slightly?",
    time: "10 min ago",
    needsReview: true
  },
  {
    client: "Mike Chen",
    initials: "MC",
    color: "bg-accent",
    project: "Product Launch",
    content: "The landing page mockup looks fantastic. Approved to proceed!",
    time: "1 hour ago",
    needsReview: false
  },
  {
    client: "Emily Davis",
    initials: "ED",
    color: "bg-chart-3",
    project: "Social Campaign",
    content: "Could we schedule a quick call to discuss the campaign timeline?",
    time: "2 hours ago",
    needsReview: false
  }
];

const feedbackItems = [
  { title: "Logo Size Adjustment", client: "TechCorp Inc", priority: "High", time: "30 min ago" },
  { title: "Color Scheme Review", client: "StartupXYZ", priority: "Medium", time: "1 hour ago" },
  { title: "Content Approval", client: "FashionCo", priority: "Medium", time: "3 hours ago" },
  { title: "Final Sign-off", client: "MediaGroup", priority: "High", time: "5 hours ago" }
];

const scheduledReports = [
  { name: "Weekly Progress Report", client: "TechCorp Inc", frequency: "Weekly", next: "Friday", color: "bg-primary" },
  { name: "Monthly Analytics", client: "StartupXYZ", frequency: "Monthly", next: "Mar 30", color: "bg-accent" },
  { name: "Campaign Performance", client: "FashionCo", frequency: "Bi-weekly", next: "Mar 25", color: "bg-chart-3" }
];
