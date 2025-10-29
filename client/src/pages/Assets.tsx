import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, Filter, MoreVertical, FileVideo, FileImage, Box, FileText } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Asset } from "@shared/schema";
import { dummyAssets } from "@/lib/dummyData";

const getIconForType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video': return FileVideo;
    case 'image': return FileImage;
    case '3d model': return Box;
    case 'document': return FileText;
    default: return FileText;
  }
};

export default function Assets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const { data: assets, isLoading } = useQuery<Asset[]>({
    queryKey: ['/api/assets']
  });

  // Use dummy data as fallback
  const assetsData = assets || dummyAssets;

  const filteredAssets = assetsData.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || 
      (filterType === "images" && asset.type === "Image") ||
      (filterType === "videos" && asset.type === "Video") ||
      (filterType === "3d" && asset.type === "3D Model") ||
      (filterType === "docs" && asset.type === "Document");
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Asset Management</h1>
            <p className="text-muted-foreground">Organize and manage all your creative assets in one place</p>
          </div>
          <Button 
            className="gap-2 w-full lg:w-auto" 
            data-testid="button-upload-assets"
            onClick={() => console.log('Upload assets clicked')}
          >
            <Upload className="w-4 h-4" />
            Upload Assets
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search assets..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-assets"
            />
          </div>
          <Button variant="outline" className="gap-2" data-testid="button-filters" onClick={() => console.log('Filters clicked')}>
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filterType === "all" ? "outline" : "ghost"} 
            size="sm"
            onClick={() => setFilterType("all")}
            data-testid="filter-all-assets"
          >
            All Assets
          </Button>
          <Button 
            variant={filterType === "images" ? "outline" : "ghost"} 
            size="sm"
            onClick={() => setFilterType("images")}
            data-testid="filter-images"
          >
            Images
          </Button>
          <Button 
            variant={filterType === "videos" ? "outline" : "ghost"} 
            size="sm"
            onClick={() => setFilterType("videos")}
            data-testid="filter-videos"
          >
            Videos
          </Button>
          <Button 
            variant={filterType === "3d" ? "outline" : "ghost"} 
            size="sm"
            onClick={() => setFilterType("3d")}
            data-testid="filter-3d"
          >
            3D Models
          </Button>
          <Button 
            variant={filterType === "docs" ? "outline" : "ghost"} 
            size="sm"
            onClick={() => setFilterType("docs")}
            data-testid="filter-documents"
          >
            Documents
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading assets...</div>
        ) : filteredAssets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No assets found</p>
            <Button className="mt-4 gap-2" onClick={() => console.log('Upload first asset')}>
              <Upload className="w-4 h-4" />
              Upload Your First Asset
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAssets.map((asset, i) => {
              const Icon = getIconForType(asset.type);
              return (
                <Card key={asset.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 overflow-hidden hover-elevate" data-testid={`asset-card-${i}`}>
                  <div className={`h-48 ${asset.thumbnail} flex items-center justify-center relative`}>
                    <Icon className="w-16 h-16 text-white/80" />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid={`button-asset-menu-${i}`}
                      onClick={() => console.log(`Menu for ${asset.name}`)}
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
                      <span className="text-xs text-muted-foreground">
                        {new Date(asset.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Storage Usage</h3>
                <p className="text-sm text-muted-foreground">{assets?.length || 0} assets stored</p>
              </div>
              <Button variant="outline" size="sm" data-testid="button-upgrade-storage" onClick={() => console.log('Upgrade clicked')}>
                Upgrade
              </Button>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-[15%] bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
