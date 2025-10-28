import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Sparkles, BarChart3, Users, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
        <div className="container mx-auto px-4 py-24 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Transform Your Creative Agency</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              Automate Everything.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Create Faster.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The all-in-one platform that automates project workflows, manages creative assets, 
              executes marketing campaigns, and tracks resources—so your team can focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 shadow-lg" data-testid="button-get-started">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" data-testid="button-watch-demo">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Five powerful modules designed to eliminate bottlenecks and accelerate your agency's success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover-elevate"
                data-testid={`card-feature-${index}`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Link href={feature.href}>
                  <span className="text-primary font-medium inline-flex items-center gap-1 hover-elevate">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold text-foreground">
              Ready to Transform Your Agency?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join hundreds of creative agencies already accelerating their workflows
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 shadow-lg" data-testid="button-start-trial">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: Zap,
    title: "Project & Workflow Automation",
    description: "Track milestones, automate reminders, and centralize feedback to accelerate approvals and eliminate bottlenecks.",
    href: "/projects"
  },
  {
    icon: Shield,
    title: "Creative Asset Management",
    description: "Organize 3D models, videos, and graphics with powerful DAM tools for easy reuse and version control.",
    href: "/assets"
  },
  {
    icon: BarChart3,
    title: "Marketing Execution",
    description: "Automate campaigns, schedule social media, and optimize ads with AI-driven insights for better targeting.",
    href: "/marketing"
  },
  {
    icon: Users,
    title: "Client Communications",
    description: "Deploy automated updates, personalized dashboards, and feedback loops that improve satisfaction.",
    href: "/communications"
  },
  {
    icon: Clock,
    title: "Resource & Time Tracking",
    description: "Monitor allocation, optimize workload distribution, and improve profitability across all projects.",
    href: "/resources"
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get intelligent recommendations and predictive analytics to make data-driven decisions faster.",
    href: "/dashboard"
  }
];

const stats = [
  { value: "85%", label: "Faster Approvals" },
  { value: "60%", label: "Time Saved" },
  { value: "3x", label: "ROI Increase" },
  { value: "99%", label: "Client Satisfaction" }
];
