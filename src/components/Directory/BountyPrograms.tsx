
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, DollarSign, Target, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for bug bounty programs
const mockPrograms = [
  {
    id: 1,
    name: "TechCorp",
    logo: "TC",
    description: "Enterprise software solutions",
    scope: ["Web Applications", "Android App", "iOS App"],
    rewards: "$500 - $10,000",
    platform: "HackerOne",
    url: "https://hackerone.com/techcorp",
    recommended: true,
    beginner_friendly: true,
  },
  {
    id: 2,
    name: "SecureBank",
    logo: "SB",
    description: "Financial services and online banking",
    scope: ["Web Applications", "APIs"],
    rewards: "$750 - $15,000",
    platform: "Bugcrowd",
    url: "https://bugcrowd.com/securebank",
    recommended: false,
    beginner_friendly: false,
  },
  {
    id: 3,
    name: "SocialNet",
    logo: "SN",
    description: "Social media platform",
    scope: ["Web Applications", "Android App", "iOS App", "APIs"],
    rewards: "$300 - $5,000",
    platform: "HackerOne",
    url: "https://hackerone.com/socialnet",
    recommended: true,
    beginner_friendly: true,
  },
  {
    id: 4,
    name: "CloudProvider",
    logo: "CP",
    description: "Cloud infrastructure services",
    scope: ["Web Applications", "APIs", "Infrastructure"],
    rewards: "$1,000 - $30,000",
    platform: "Self-hosted",
    url: "https://security.cloudprovider.com",
    recommended: false,
    beginner_friendly: false,
  },
  {
    id: 5,
    name: "E-commerce Store",
    logo: "ES",
    description: "Online shopping platform",
    scope: ["Web Applications", "Android App", "iOS App"],
    rewards: "$250 - $7,500",
    platform: "Bugcrowd",
    url: "https://bugcrowd.com/ecommercestore",
    recommended: true,
    beginner_friendly: true,
  },
];

const BountyPrograms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredPrograms = mockPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "beginner") return matchesSearch && program.beginner_friendly;
    if (filter === "recommended") return matchesSearch && program.recommended;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Card className="border-2 border-matrix/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-matrix" />
            Bug Bounty Programs Directory
          </CardTitle>
          <CardDescription>
            Find bug bounty programs that match your skills and interests.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="beginner">Beginner Friendly</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map(program => (
            <Card key={program.id} className="overflow-hidden hover:shadow-md transition-all">
              <div className="border-b bg-muted/20 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-card h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg border">
                    {program.logo}
                  </div>
                  <div>
                    <h3 className="font-bold">{program.name}</h3>
                    <p className="text-xs text-muted-foreground">{program.platform}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {program.beginner_friendly && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Beginner Friendly
                    </Badge>
                  )}
                  {program.recommended && (
                    <Badge variant="outline" className="bg-matrix/10 text-matrix border-matrix/20">
                      Recommended
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm mb-3">{program.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Scope</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {program.scope.map(item => (
                          <Badge key={item} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Rewards</p>
                      <p className="text-sm font-medium">{program.rewards}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full" size="sm">
                    <a href={program.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      View Program
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 p-8 text-center border rounded-lg">
            <p className="text-muted-foreground">No matching programs found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BountyPrograms;
