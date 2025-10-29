import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Send, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Message, FeedbackItem } from "@shared/schema";
import { dummyMessages, dummyFeedbackItems } from "@/lib/dummyData";

export default function Communications() {
  const { data: messages, isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ['/api/messages']
  });

  const { data: feedbackItems, isLoading: feedbackLoading } = useQuery<FeedbackItem[]>({
    queryKey: ['/api/feedback']
  });

  // Use dummy data as fallback
  const messagesData = messages || dummyMessages;
  const feedbackData = feedbackItems || dummyFeedbackItems;

  const pendingReviews = messagesData.filter(m => m.needsReview).length;

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Client Communications</h1>
          <p className="text-muted-foreground">Automated updates, personalized dashboards, and feedback loops</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Active Threads</span>
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{messagesData.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Pending Reviews</span>
                <Clock className="w-4 h-4 text-chart-4" />
              </div>
              <div className="text-3xl font-bold text-foreground">{pendingReviews}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Feedback Items</span>
                <CheckCircle2 className="w-4 h-4 text-chart-3" />
              </div>
              <div className="text-3xl font-bold text-foreground">{feedbackData.length}</div>
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
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {messagesLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading messages...</div>
              ) : messagesData.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No messages yet</div>
              ) : (
                <div className="space-y-4">
                  {messagesData.slice(0, 5).map((message, i) => (
                    <div key={message.id} className="p-4 rounded-lg border border-card-border hover:border-primary/50 transition-all hover-elevate" data-testid={`message-${i}`}>
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
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Queue</CardTitle>
            </CardHeader>
            <CardContent>
              {feedbackLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : feedbackData.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No feedback items</div>
              ) : (
                <div className="space-y-3">
                  {feedbackData.map((item, i) => (
                    <div key={item.id} className="p-3 rounded-lg bg-muted/50 border border-card-border hover-elevate" data-testid={`feedback-${i}`}>
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
              )}
            </CardContent>
          </Card>
        </div>

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

const scheduledReports = [
  { name: "Weekly Progress Report", client: "TechCorp Inc", frequency: "Weekly", next: "Friday", color: "bg-primary" },
  { name: "Monthly Analytics", client: "StartupXYZ", frequency: "Monthly", next: "Mar 30", color: "bg-accent" },
  { name: "Campaign Performance", client: "FashionCo", frequency: "Bi-weekly", next: "Mar 25", color: "bg-chart-3" }
];
