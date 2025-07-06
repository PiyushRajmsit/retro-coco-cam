import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Plus, Camera, ThumbsUp, ThumbsDown, Upload, Send, Edit, Share, Download } from "lucide-react";

const CameraPage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'bot', content: string, images?: string[]}>>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Photo Filter");

  // Mock result images
  const resultImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?height=400&width=400&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?height=400&width=400&fit=crop", 
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?height=400&width=400&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?height=400&width=400&fit=crop"
  ];

  const followUpPrompts = [
    "Golden Hour Glow",
    "Y2K", 
    "Melancholic",
    "Nostalgic",
    "VHS"
  ];

  const suggestions = [
    "Photo-Filters",
    "Makeup",
    "Fashion Trends", 
    "Background filters"
  ];

  const filterCategories = [
    "Backgrounds", "Photo Filters", "Vibes", "Fashion Outfits", "Makeup"
  ];

  const uploadTypes = [
    "Portrait Photos", "Full Body Shots", "Casual Selfies", "Professional Headshots"
  ];

  // Example images for carousel
  const exampleImages = [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?height=200&width=200&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?height=200&width=200&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?height=200&width=200&fit=crop",
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?height=200&width=200&fit=crop",
    "https://images.unsplash.com/photo-1463453091185-61582044d556?height=200&width=200&fit=crop"
  ];

  // Category-specific content
  const categoryContent = {
    "Backgrounds": {
      title: "Backgrounds Editing",
      instruction: "Upload clear portrait photos with good lighting. The AI works best with photos where you're the main subject against any background.",
      suggestions: ["Nature Background", "City Skyline", "Beach Scene", "Mountain View"]
    },
    "Photo Filters": {
      title: "Photo Filters Editing", 
      instruction: "Upload any photo to apply stunning filters. Works best with well-lit images and clear subjects.",
      suggestions: ["Vintage Filter", "Black & White", "Sepia Tone", "HDR Effect"]
    },
    "Vibes": {
      title: "Vibes Editing",
      instruction: "Upload photos to transform the mood and atmosphere. Works great with lifestyle and portrait photos.",
      suggestions: ["Moody Vibe", "Bright & Airy", "Dark Academia", "Cottagecore"]
    },
    "Fashion Outfits": {
      title: "Fashion Outfits Editing",
      instruction: "Upload full-body photos or upper-body shots for the best outfit transformation results.",
      suggestions: ["Casual Chic", "Formal Wear", "Street Style", "Vintage Fashion"]
    },
    "Makeup": {
      title: "Makeup Editing",
      instruction: "Upload clear face photos with good lighting. Front-facing portraits work best for makeup transformations.",
      suggestions: ["Natural Look", "Glam Makeup", "Smokey Eyes", "Bold Lips"]
    }
  };

  // Get URL parameters to determine selected category
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category && categoryContent[category as keyof typeof categoryContent]) {
      setSelectedCategory(category);
    }
  }, []);

  const handleQuery = () => {
    if (query.trim()) {
      // Add user message
      const newMessages = [...chatMessages, { type: 'user' as const, content: query }];
      
      // Add bot response with images
      const botResponse = {
        type: 'bot' as const,
        content: `Here are some amazing transformations based on "${query}". I've generated these images with the style you requested!`,
        images: resultImages
      };
      
      setChatMessages([...newMessages, botResponse]);
      setShowResults(true);
      setQuery("");
    }
  };

  const openImageView = (index: number) => {
    setSelectedImage(index);
    setCurrentImageIndex(index);
    setIsEditMode(false);
  };

  const closeImageView = () => {
    setSelectedImage(null);
    setEditingImage(null);
    setIsEditMode(false);
  };

  const handleEditImage = () => {
    setIsEditMode(true);
    // Don't close the dialog, just show edit interface
  };

  const handleEditSubmit = () => {
    if (query.trim()) {
      // Add the edit as a new message and close the dialog
      const newMessages = [...chatMessages, 
        { type: 'user' as const, content: query },
        { type: 'bot' as const, content: `Great! I've applied "${query}" to your image. Here are the new results!`, images: resultImages }
      ];
      setChatMessages(newMessages);
      setQuery("");
      setIsEditMode(false);
      setSelectedImage(null);
      setShowResults(true);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % resultImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + resultImages.length) % resultImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">C</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Coco AI</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-secondary">
            <svg className="w-5 h-5 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button 
            onClick={() => window.location.href = '/profile'}
            className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center"
          >
            <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-32">
        {!showResults ? (
          <>
            {/* Section 1: Dynamic Title */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                {categoryContent[selectedCategory as keyof typeof categoryContent]?.title || "Photo Filter Editing"}
              </h2>
              {/* Section 2: Static subtitle */}
              <p className="text-muted-foreground text-lg">
                Transform your photos with AI-powered filters and effects
              </p>
            </div>

            {/* Section 3: Instructions and Example Carousel */}
            <div className="mb-8">
              <p className="text-foreground text-sm mb-6 px-2 leading-relaxed">
                {categoryContent[selectedCategory as keyof typeof categoryContent]?.instruction || "Upload any photo to apply stunning transformations."}
              </p>
              
              {/* Photo Examples Carousel */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 px-2">Example Photos</h3>
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {exampleImages.map((image, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/3">
                        <div className="aspect-square rounded-xl overflow-hidden bg-card border border-border/50">
                          <img 
                            src={image} 
                            alt={`Example ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            </div>

            {/* Section 4: Suggestion Chips */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-4 px-2">Try These</h3>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide px-2">
                {(categoryContent[selectedCategory as keyof typeof categoryContent]?.suggestions || suggestions).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(suggestion)}
                    className="flex-shrink-0 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Chat Messages */}
            <div className="space-y-6">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card'} rounded-2xl p-4`}>
                    <p className="text-sm">{message.content}</p>
                    {message.images && (
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {message.images.map((image, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={() => openImageView(imgIndex)}
                            className="aspect-square rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors"
                          >
                            <img 
                              src={image} 
                              alt={`Result ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Start Button */}
            <div className="text-center mt-8">
              <Button 
                onClick={() => {
                  setShowResults(false);
                  setChatMessages([]);
                }}
                variant="outline"
              >
                Start New Session
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Chat Input Area */}
      <div className="fixed bottom-20 left-0 right-0 px-4">
        <div className="bg-card rounded-2xl border border-border p-4">
          {/* Input with Actions */}
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-accent rounded-md"
            >
              <Plus className="w-5 h-5 text-muted-foreground" />
            </button>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe the filter or effect you want to apply..."
              className="pl-12 pr-12 bg-background border-border text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
            />
            <button
              onClick={handleQuery}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Send className="w-4 h-4 text-primary" />
            </button>
          </div>

          {/* Suggestion Chips Below Input */}
          <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className="flex-shrink-0 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Options Menu */}
          {showOptions && (
            <div className="mt-3 space-y-2">
              <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-background hover:bg-accent transition-colors">
                <Upload className="w-5 h-5 text-primary" />
                <span className="text-foreground">Attach an Image</span>
              </button>
              <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-background hover:bg-accent transition-colors">
                <Camera className="w-5 h-5 text-primary" />
                <span className="text-foreground">Take a Photo</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Image View Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={closeImageView}>
        <DialogContent className="p-0 max-w-full h-full bg-background border-0">
          <div className="relative h-full w-full flex flex-col">
            {/* Close button */}
            <DialogClose className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full">
              ×
            </DialogClose>

            {/* Share and Download buttons */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <button className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
                <Share className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
                <Download className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Image container */}
            <div className="flex-1 flex items-center justify-center p-4">
              <img 
                src={resultImages[currentImageIndex]} 
                alt={`Result ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Edit Mode Chat Interface */}
            {isEditMode && (
              <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-4">
                {/* Follow-up suggestions */}
                <div className="mb-4">
                  <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
                    {followUpPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(prompt)}
                        className="flex-shrink-0 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input for editing */}
                <div className="relative">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Describe how you want to edit this image..."
                    className="pr-12 bg-background border-border text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleEditSubmit()}
                  />
                  <button
                    onClick={handleEditSubmit}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <Send className="w-4 h-4 text-primary" />
                  </button>
                </div>
              </div>
            )}

            {/* Action buttons - only show when not in edit mode */}
            {!isEditMode && (
              <div className="flex items-center justify-center gap-4 p-6 bg-background/80 backdrop-blur-sm">
                <button className="p-3 rounded-full bg-card hover:bg-accent transition-colors">
                  <Share className="w-6 h-6 text-foreground" />
                </button>
                <button className="p-3 rounded-full bg-card hover:bg-accent transition-colors">
                  <Download className="w-6 h-6 text-foreground" />
                </button>
                <button className="p-3 rounded-full bg-card hover:bg-accent transition-colors">
                  <ThumbsUp className="w-6 h-6 text-foreground" />
                </button>
                <button className="p-3 rounded-full bg-card hover:bg-accent transition-colors">
                  <ThumbsDown className="w-6 h-6 text-foreground" />
                </button>
                <button 
                  onClick={handleEditImage}
                  className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Edit className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Image navigation dots - only show when not in edit mode */}
            {!isEditMode && (
              <div className="flex items-center justify-center gap-2 pb-4">
                {resultImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Swipe navigation - only show when not in edit mode */}
            {!isEditMode && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full"
                >
                  ←
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full"
                >
                  →
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around py-3">
          <button 
            onClick={() => window.location.href = '/'}
            className="p-3 text-muted-foreground"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </button>
          <button 
            onClick={() => window.location.href = '/search'}
            className="p-3 text-muted-foreground"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button className="p-3 text-primary bg-primary/20 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            </svg>
          </button>
          <button 
            onClick={() => window.location.href = '/profile'}
            className="p-3 text-muted-foreground"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraPage;