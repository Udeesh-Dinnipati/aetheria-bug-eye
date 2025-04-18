
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  externalLink?: string;
  onClick?: () => void;
}

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return <div className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs">Beginner</div>;
    case "intermediate":
      return <div className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs">Intermediate</div>;
    case "advanced":
      return <div className="px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-xs">Advanced</div>;
    default:
      return <div className="px-2 py-1 rounded-full bg-matrix/10 text-matrix text-xs">All Levels</div>;
  }
};

const ResourceCard = ({ 
  title, 
  description, 
  icon, 
  className, 
  difficulty, 
  externalLink, 
  onClick 
}: ResourceCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-lg border p-6 hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-matrix bg-matrix/10 p-2 rounded-full">
            {icon}
          </div>
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        {getDifficultyBadge(difficulty)}
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex gap-2">
        <Button 
          variant="default" 
          onClick={onClick}
          className="flex-1"
        >
          Read More
        </Button>
        {externalLink && (
          <Button variant="outline" asChild className="flex items-center gap-1">
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} />
              <span className="sr-only">External Link</span>
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
