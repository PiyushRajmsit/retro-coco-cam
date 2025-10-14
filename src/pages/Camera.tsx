import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Plus, Camera, ThumbsUp, ThumbsDown, Upload, Send, Edit, Share, Download, Copy, Twitter, Facebook, Instagram, Mail, Link, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { UploadModal } from "@/components/UploadModal";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CameraPage = () => {
  const [showResults, setShowResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDislikeModal, setShowDislikeModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'bot', content: string, images?: string[], editedImage?: string}>>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Photo Filter");
  const [selectedDislikeReasons, setSelectedDislikeReasons] = useState<string[]>([]);
  const [customDislikeFeedback, setCustomDislikeFeedback] = useState("");
  const [chatImageDislikeIndex, setChatImageDislikeIndex] = useState<{msgIndex: number, imgIndex: number} | null>(null);
  const [credits, setCredits] = useState(20);
  const [creditChange, setCreditChange] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("current");
  const [chatHistory, setChatHistory] = useState<Array<{id: string, messages: Array<{type: 'user' | 'bot', content: string, images?: string[], editedImage?: string}>, timestamp: Date}>>([]);

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
      // Random credit change (+2 or -2)
      const change = Math.random() > 0.5 ? 2 : -2;
      setCredits(prev => prev + change);
      setCreditChange(change);
      
      // Clear credit change animation after 3 seconds
      setTimeout(() => setCreditChange(null), 3000);
      
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
      const editedImageUrl = resultImages[currentImageIndex];
      const newMessages = [...chatMessages, 
        { type: 'user' as const, content: query, editedImage: editedImageUrl },
        { type: 'bot' as const, content: `Great! I've applied "${query}" to your image. Here are the new results!`, images: resultImages }
      ];
      setChatMessages(newMessages);
      setQuery("");
      setIsEditMode(false);
      setSelectedImage(null);
      setShowResults(true);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    // Handle the selected image - could add to chat or process it
    const newMessages = [...chatMessages, 
      { type: 'user' as const, content: "I've uploaded an image", editedImage: imageUrl },
      { type: 'bot' as const, content: "Great! I can see your image. What would you like me to do with it?", images: [] }
    ];
    setChatMessages(newMessages);
    setShowResults(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % resultImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + resultImages.length) % resultImages.length);
  };

  const dislikeReasons = [
    "Doesn't look like my face",
    "Doesn't look like my body",
    "Don't like the background",
    "Don't like the outfit",
    "Don't like the pose",
    "Don't like the face expression"
  ];

  const handleDislikeReasonToggle = (reason: string) => {
    setSelectedDislikeReasons(prev => 
      prev.includes(reason) 
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const handleDislikeSubmit = () => {
    const feedback = selectedDislikeReasons.length > 0 
      ? selectedDislikeReasons.join(", ") 
      : customDislikeFeedback;
    
    if (feedback) {
      toast({ 
        title: "Feedback received", 
        description: "Thank you for helping us improve!" 
      });
      setShowDislikeModal(false);
      setSelectedDislikeReasons([]);
      setCustomDislikeFeedback("");
      setChatImageDislikeIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">V</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">vyb</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
            <MessageCircle className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 pb-4">
          <TabsList className="w-full grid grid-cols-2 bg-secondary/50">
            <TabsTrigger value="current" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Current Chat
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Chat History
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Current Chat Tab */}
        <TabsContent value="current" className="mt-0">
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
              <div className="flex flex-wrap gap-2 px-2">
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
                    {message.editedImage && (
                      <div className="mb-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-border/50">
                          <img 
                            src={message.editedImage} 
                            alt="Edited image"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    {message.images && (
                      <>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          {message.images.map((image, imgIndex) => (
                            <div key={imgIndex} className="space-y-2">
                              <button
                                onClick={() => openImageView(imgIndex)}
                                className="w-full aspect-square rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors"
                              >
                                <img 
                                  src={image} 
                                  alt={`Result ${imgIndex + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                              <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => {
                                    toast({ title: "Thanks for the feedback!" });
                                  }}
                                  className="p-2 rounded-lg bg-card/50 hover:bg-accent transition-colors"
                                >
                                  <ThumbsUp className="w-4 h-4 text-foreground" />
                                </button>
                                <button 
                                  onClick={() => {
                                    setChatImageDislikeIndex({ msgIndex: index, imgIndex });
                                    setShowDislikeModal(true);
                                  }}
                                  className="p-2 rounded-lg bg-card/50 hover:bg-accent transition-colors"
                                >
                                  <ThumbsDown className="w-4 h-4 text-foreground" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Each image showcases a unique interpretation of your request.
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                            Tap any image to view it in full screen, edit, or share your favorite!
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Start Button */}
            <div className="text-center mt-8">
              <Button 
                onClick={() => {
                  // Save current chat to history
                  if (chatMessages.length > 0) {
                    const newHistoryItem = {
                      id: Date.now().toString(),
                      messages: chatMessages,
                      timestamp: new Date()
                    };
                    setChatHistory(prev => [newHistoryItem, ...prev]);
                  }
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
        </TabsContent>

        {/* Chat History Tab */}
        <TabsContent value="history" className="mt-0">
          <div className="px-4 pb-32">
            {chatHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No chat history yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setChatMessages(chat.messages);
                      setShowResults(true);
                      setActiveTab("current");
                    }}
                    className="w-full bg-card/50 border border-border rounded-xl p-4 hover:bg-card transition-colors text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {chat.messages.find(m => m.type === 'user')?.content || 'Untitled chat'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(chat.timestamp).toLocaleString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      {chat.messages.find(m => m.images && m.images.length > 0) && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={chat.messages.find(m => m.images && m.images.length > 0)?.images?.[0]} 
                            alt="Chat preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
                <p className="text-center text-xs text-muted-foreground py-4">
                  All {chatHistory.length} conversation{chatHistory.length !== 1 ? 's' : ''} loaded
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Chat Input Area */}
      <div className="fixed bottom-20 left-0 right-0 px-4">
        {/* Credits Display */}
        <div className="mb-2 flex justify-center">
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-1.5 flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">Credits:</span>
            <span className="text-sm font-bold text-primary">{credits}</span>
            {creditChange !== null && (
              <span className={`text-xs font-semibold animate-in slide-in-from-bottom-2 fade-in duration-300 ${
                creditChange > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {creditChange > 0 ? '+' : ''}{creditChange}
              </span>
            )}
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4">
          {/* Input with Actions */}
          <div className="relative">
            <UploadModal onImageSelect={handleImageSelect}>
              <button className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-accent rounded-md">
                <Plus className="w-5 h-5 text-muted-foreground" />
              </button>
            </UploadModal>
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
              <button 
                onClick={() => setShowShareModal(true)}
                className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              >
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
                <button 
                  onClick={() => setShowDislikeModal(true)}
                  className="p-3 rounded-full bg-card hover:bg-accent transition-colors"
                >
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

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="max-w-md p-0 bg-background border border-border/50 shadow-elegant">
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">Share Your Creation</h3>
              <p className="text-sm text-muted-foreground">Choose how you'd like to share this image</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({ title: "Link copied to clipboard!" });
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-primary/10 hover:bg-gradient-primary/20 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Copy className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xs font-poppins font-medium text-foreground">Copy Link</span>
              </button>

              <button 
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=Check out my AI creation!&url=${encodeURIComponent(window.location.href)}`, '_blank');
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Twitter className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-poppins font-medium text-foreground">Twitter</span>
              </button>

              <button 
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-poppins font-medium text-foreground">Facebook</span>
              </button>

              <button 
                onClick={() => {
                  window.open(`mailto:?subject=Check out my AI creation!&body=I created this using Coco AI: ${window.location.href}`, '_blank');
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-poppins font-medium text-foreground">Email</span>
              </button>

              <button 
                onClick={() => {
                  window.open(`https://wa.me/?text=Check out my AI creation! ${encodeURIComponent(window.location.href)}`, '_blank');
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-600/10 hover:bg-green-600/20 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-poppins font-medium text-foreground">WhatsApp</span>
              </button>

              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = resultImages[currentImageIndex];
                  link.download = 'coco-ai-creation.jpg';
                  link.click();
                  toast({ title: "Image downloaded!" });
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-poppins font-medium text-foreground">Download</span>
              </button>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setShowShareModal(false)}
                className="px-6 py-2 text-sm font-poppins text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dislike Feedback Modal */}
      <Dialog open={showDislikeModal} onOpenChange={setShowDislikeModal}>
        <DialogContent className="max-w-[85vw] sm:max-w-md p-4 sm:p-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-lg sm:text-xl">Help Us Improve</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              What didn't you like about this image? Select all that apply or write your own feedback.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dislikeReasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => handleDislikeReasonToggle(reason)}
                  className={`text-left px-2.5 py-2 rounded-lg border transition-colors ${
                    selectedDislikeReasons.includes(reason)
                      ? 'bg-primary/10 border-primary text-foreground'
                      : 'bg-card border-border hover:bg-accent text-foreground'
                  }`}
                >
                  <div className="flex items-start gap-1.5">
                    <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border flex-shrink-0 flex items-center justify-center mt-0.5 ${
                      selectedDislikeReasons.includes(reason)
                        ? 'bg-primary border-primary'
                        : 'border-border'
                    }`}>
                      {selectedDislikeReasons.includes(reason) && (
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[11px] sm:text-xs leading-snug">{reason}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-foreground">Or write your own feedback</label>
              <Textarea
                placeholder="Tell us what you didn't like..."
                value={customDislikeFeedback}
                onChange={(e) => setCustomDislikeFeedback(e.target.value)}
                className="min-h-[70px] sm:min-h-[80px] resize-none text-xs sm:text-sm"
              />
            </div>

            <Button 
              className="w-full text-sm sm:text-base" 
              onClick={handleDislikeSubmit}
              disabled={selectedDislikeReasons.length === 0 && !customDislikeFeedback.trim()}
            >
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CameraPage;