import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, Filter, MoreVertical, FileVideo, FileImage, Box, FileText } from "lucide-react";

export default function Assets() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Asset Management</h1>
            <p className="text-muted-foreground">Organize and manage all your creative assets in one place</p>
          </div>
          <Button className="gap-2 w-full lg:w-auto">
            <Upload className="w-4 h-4" />
            Upload Assets
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search assets..." className="pl-9" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Asset Type Tabs */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">All Assets</Button>
          <Button variant="ghost" size="sm">Images</Button>
          <Button variant="ghost" size="sm">Videos</Button>
          <Button variant="ghost" size="sm">3D Models</Button>
          <Button variant="ghost" size="sm">Documents</Button>
        </div>

        {/* Assets Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {assets.map((asset, i) => (
            <Card key={i} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 overflow-hidden">
              <div className={`h-48 ${asset.thumbnail} flex items-center justify-center relative`}>
                <asset.icon className="w-16 h-16 text-white/80" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium text-foreground truncate">{asset.name}</h3>
                  <p className="text-sm text-muted-foreground">{asset.size}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{asset.type}</Badge>
                  <span className="text-xs text-muted-foreground">{asset.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Storage Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Storage Usage</h3>
                <p className="text-sm text-muted-foreground">847 GB of 1 TB used</p>
              </div>
              <Button variant="outline" size="sm">Upgrade</Button>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

const assets = [
  { name: "hero-banner.mp4", size: "245 MB", type: "Video", date: "Mar 15", icon: FileVideo, thumbnail: "bg-gradient-to-br from-primary to-accent" },
  { name: "product-mockup.png", size: "12 MB", type: "Image", date: "Mar 14", icon: FileImage, thumbnail: "bg-gradient-to-br from-accent to-warning" },
  { name: "character-model.blend", size: "89 MB", type: "3D Model", date: "Mar 13", icon: Box, thumbnail: "bg-gradient-to-br from-success to-primary" },
  { name: "brand-guidelines.pdf", size: "5 MB", type: "Document", date: "Mar 12", icon: FileText, thumbnail: "bg-gradient-to-br from-warning to-accent" },
  { name: "animation-loop.mp4", size: "178 MB", type: "Video", date: "Mar 11", icon: FileVideo, thumbnail: "bg-gradient-to-br from-primary to-success" },
  { name: "logo-variations.png", size: "8 MB", type: "Image", date: "Mar 10", icon: FileImage, thumbnail: "bg-gradient-to-br from-accent to-primary" },
  { name: "building-render.fbx", size: "134 MB", type: "3D Model", date: "Mar 9", icon: Box, thumbnail: "bg-gradient-to-br from-warning to-success" },
  { name: "case-study.pdf", size: "15 MB", type: "Document", date: "Mar 8", icon: FileText, thumbnail: "bg-gradient-to-br from-primary to-accent" }
];
