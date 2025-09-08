import { useState, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Upload, Plus, Image } from "lucide-react";

interface UploadModalProps {
  children: React.ReactNode;
  onImageSelect?: (image: string) => void;
}

export const UploadModal = ({ children, onImageSelect }: UploadModalProps) => {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock existing images - in real app this would come from user's uploaded images
  const existingImages = [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?height=150&width=150&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?height=150&width=150&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?height=150&width=150&fit=crop",
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?height=150&width=150&fit=crop",
    "https://images.unsplash.com/photo-1463453091185-61582044d556?height=150&width=150&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?height=150&width=150&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?height=150&width=150&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?height=150&width=150&fit=crop"
  ];

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In real app, would upload file and get URL
      const imageUrl = URL.createObjectURL(file);
      onImageSelect?.(imageUrl);
      setOpen(false);
    }
  };

  const handleExistingImageSelect = (imageUrl: string) => {
    onImageSelect?.(imageUrl);
    setOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {children}
        </PopoverTrigger>
        <PopoverContent 
          className="w-80 p-0 bg-card border border-border shadow-lg ml-4" 
          side="top" 
          sideOffset={8}
          align="start"
        >
          <Tabs defaultValue="upload" className="w-full">
            <div className="px-4 pt-4 pb-2">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger value="upload" className="text-sm">Upload New</TabsTrigger>
                <TabsTrigger value="existing" className="text-sm">Existing Images</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upload" className="px-4 pb-4 mt-0">
              <div className="space-y-4">
                <div className="text-center py-6">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a photo from your device
                  </p>
                  <Button 
                    onClick={handleFileSelect}
                    className="w-full"
                    size="sm"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="existing" className="px-4 pb-4 mt-0">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Select from your recent uploads
                </p>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {existingImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleExistingImageSelect(image)}
                      className="aspect-square rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors group"
                    >
                      <img 
                        src={image} 
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </button>
                  ))}
                </div>
                {existingImages.length === 0 && (
                  <div className="text-center py-6">
                    <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                      <Image className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No images uploaded yet
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};