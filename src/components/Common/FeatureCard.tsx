
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
}

const FeatureCard = ({ title, description, icon, className, onClick }: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-lg border bg-card p-6 hover:shadow-md transition-all duration-200 cursor-pointer matrix-border",
        onClick ? "hover:scale-[1.02]" : "",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="text-matrix h-10 w-10 flex items-center justify-center rounded-full bg-matrix/10">
          {icon}
        </div>
        <h3 className="font-bold text-xl">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
