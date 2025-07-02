import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Plus, Image, Link, ThumbsUp, ThumbsDown, Upload, Send, Edit } from "lucide-react";

const Camera = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Mock result images
  const resultImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?height=400&width=400&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?height=400&width=400&fit=crop", 
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?height=400&width=400&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?height=400&width=400&fit=crop"
  ];

  const followUpPrompts = [
    "urban graffiti wall",
    "soft natural light", 
    "casual cafe setting",
    "wooden table texture",
    "park with greenery",
    "vintage filter effect"
  ];

  const handleQuery = () => {
    if (query.trim()) {
      setShowResults(true);
    }
  };

  const openImageView = (index: number) => {
    setSelectedImage(index);
    setCurrentImageIndex(index);
  };

  const closeImageView = () => {
    setSelectedImage(null);
    setEditingImage(null);
  };

  const handleEditImage = () => {
    setEditingImage(resultImages[currentImageIndex]);
    setSelectedImage(null);
    // Scroll down to show follow-up suggestions above chat input
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight - window.innerHeight + 100, behavior: 'smooth' });
    }, 100);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % resultImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + resultImages.length) % resultImages.length);
  };

  const suggestions = [
    "Photo-Filters",
    "Makeup",
    "Fashion Trends", 
    "Background filters"
  ];

  const quickActions = [
    "Transform my style",
    "Apply vintage filter",
    "Change background",
    "Add makeup effects"
  ];

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
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        {!showResults ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Photo Filter Editing
              </h2>
              <p className="text-muted-foreground text-base mb-6">
                Upload your image and apply stunning filters
              </p>
            </div>

            {/* Image Upload Options */}
            <div className="w-full max-w-md mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Upload Your Image</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:bg-accent transition-colors">
                  <Upload className="w-8 h-8 text-primary" />
                  <span className="text-sm text-foreground font-medium">Upload from Device</span>
                </button>
                <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:bg-accent transition-colors">
                  <Link className="w-8 h-8 text-primary" />
                  <span className="text-sm text-foreground font-medium">Paste Image URL</span>
                </button>
              </div>
            </div>

            {/* Filter Categories */}
            <div className="w-full max-w-md mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Filter Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(action);
                      handleQuery();
                    }}
                    className="p-4 rounded-xl bg-card border border-border text-left hover:bg-accent transition-colors"
                  >
                    <span className="text-sm text-foreground font-medium">{action}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Type Suggestions */}
            <div className="w-full max-w-md">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Best Results With</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-xs text-primary font-medium">Portraits</span>
                </div>
                <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-xs text-primary font-medium">Landscapes</span>
                </div>
                <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-xs text-primary font-medium">Objects</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Your Results</h2>
              <p className="text-muted-foreground">Generated images for: "{query}"</p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
              {resultImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openImageView(index)}
                  className="aspect-square rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <img 
                    src={image} 
                    alt={`Result ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Back to Chat Button */}
            <Button 
              onClick={() => setShowResults(false)}
              variant="outline"
              className="mb-4"
            >
              Generate New Images
            </Button>
          </>
        )}
      </div>

      {/* Chat Input Area */}
      <div className="fixed bottom-20 left-0 right-0 px-4">
        <div className="bg-card rounded-2xl border border-border p-4">
          {/* Follow-up Prompts for Editing */}
          {editingImage && (
            <div className="mb-4">
              <p className="text-sm font-medium text-foreground mb-3">Suggested</p>
              <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
                {followUpPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(prompt)}
                    className="flex-shrink-0 px-3 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Editing Image Preview */}
          {editingImage && (
            <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3">
                <img 
                  src={editingImage} 
                  alt="Editing" 
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium">Editing image</p>
                  <p className="text-xs text-muted-foreground">Make changes to this image</p>
                </div>
                <button 
                  onClick={() => setEditingImage(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
            </div>
          )}

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
              placeholder="Upload an Image and Select one of categories below"
              className="pl-12 pr-12 bg-background border-border text-sm placeholder:text-xs"
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
                <Link className="w-5 h-5 text-primary" />
                <span className="text-foreground">Share Image Url</span>
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

            {/* Image container */}
            <div className="flex-1 flex items-center justify-center p-4">
              <img 
                src={resultImages[currentImageIndex]} 
                alt={`Result ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4 p-6 bg-background/80 backdrop-blur-sm">
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

            {/* Image navigation dots */}
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

            {/* Swipe navigation */}
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

export default Camera;