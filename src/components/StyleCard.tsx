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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Title with dedicated background strip */}
        <div className="absolute bottom-14 left-0 right-0 bg-black/70 backdrop-blur-sm py-2 px-4">
          <h3 className="text-white font-semibold text-sm capitalize text-center">
            {title}
          </h3>
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