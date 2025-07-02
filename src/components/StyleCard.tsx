import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StyleCardProps {
  title: string;
  image: string;
  className?: string;
}

export const StyleCard = ({ title, image, className = "" }: StyleCardProps) => {
  return (
    <div className={`relative rounded-xl overflow-hidden bg-gradient-card shadow-card ${className}`}>
      <div className="aspect-[4/5] relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Title with better visibility */}
        <div className="absolute top-4 left-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
            <h3 className="text-white font-semibold text-sm capitalize drop-shadow-lg">
              {title}
            </h3>
          </div>
        </div>
        
        {/* Try it on button */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="mobile" size="sm" className="w-full">
            <Camera className="w-4 h-4" />
            Try it on
          </Button>
        </div>
      </div>
    </div>
  );
};