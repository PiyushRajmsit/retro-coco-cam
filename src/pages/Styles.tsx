import { Home, Search, Camera, User, Menu, Lock, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import summerCocktail from "@/assets/summer-cocktail.jpg";
import tokyoStreet from "@/assets/tokyo-street.jpg";
import winterChalet from "@/assets/winter-chalet.jpg";
import retroDisco from "@/assets/retro-disco.jpg";

const Styles = () => {
  const [activeCategory, setActiveCategory] = useState("Cinematic");
  const [previewModal, setPreviewModal] = useState<{
    open: boolean;
    image: string;
    title: string;
    user: { name: string; initials: string; avatar: string };
    date: string;
  } | null>(null);
  
  const categories = [
    { name: "Cinematic", locked: false },
    { name: "Makeup", locked: true },
    { name: "Fashion", locked: true },
  ];

  const posts = [
    {
      id: 1,
      category: "Cinematic",
      user: { name: "Piyush Raj", initials: "PR", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" },
      date: "October 15, 2025",
      image: tokyoStreet,
      title: "Cyberpunk Neon Noodle Market Vyb",
      remixCount: 3,
      remixThumbs: [winterChalet, retroDisco, summerCocktail],
    },
    {
      id: 2,
      category: "Cinematic",
      user: { name: "Sarah Johnson", initials: "SJ", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" },
      date: "October 15, 2025",
      image: summerCocktail,
      title: "Clean girl aesthetic achieved! 🌟",
      remixCount: 4,
      remixThumbs: [winterChalet, retroDisco, summerCocktail, tokyoStreet],
    },
    {
      id: 3,
      category: "Cinematic",
      user: { name: "Emma Chen", initials: "EC", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" },
      date: "October 15, 2025",
      image: winterChalet,
      title: "Winter Wonderland Vibes ❄️",
      remixCount: 5,
      remixThumbs: [summerCocktail, tokyoStreet, retroDisco],
    },
    {
      id: 4,
      category: "Cinematic",
      user: { name: "Maya Patel", initials: "MP", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop" },
      date: "October 15, 2025",
      image: retroDisco,
      title: "Retro Groove Energy 🎵",
      remixCount: 2,
      remixThumbs: [winterChalet, summerCocktail],
    },
  ];

  const filteredPosts = posts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
          </Button>
          
          <div className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            vyb
          </div>
          
          <div className="w-10" />
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Vyb - <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-primary bg-clip-text text-transparent">A Self Expression Playground</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Play with your look, story & style.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => !category.locked && setActiveCategory(category.name)}
              className={`relative px-8 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeCategory === category.name
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-card text-card-foreground hover:bg-card/80"
              } ${category.locked ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center gap-2">
                {category.locked && <Lock className="w-4 h-4" />}
                {category.name}
                {category.locked && (
                  <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                    Coming Soon
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed - 2x2 Grid */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-card rounded-xl overflow-hidden border border-border">
            {/* Post Header */}
            <div className="p-4 flex items-center gap-3">
              <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {post.user.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{post.user.name}</p>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </div>
            </div>

            {/* Post Image */}
            <div className="relative aspect-[16/10] bg-muted">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
              
              {/* Remix Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span>{post.remixCount} remixes done</span>
              </div>

              {/* Remix Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {post.remixThumbs.map((thumb, idx) => (
                  <div 
                    key={idx} 
                    className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-border cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setPreviewModal({
                      open: true,
                      image: thumb,
                      title: post.title,
                      user: post.user,
                      date: post.date
                    })}
                  >
                    <img 
                      src={thumb} 
                      alt={`Remix ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Remix Button */}
              <Button 
                className="w-full bg-gradient-to-r from-primary via-accent to-purple-500 hover:opacity-90 text-white font-semibold"
                onClick={() => window.location.href = `/camera?category=${encodeURIComponent(post.title)}`}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Remix
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      <Dialog open={previewModal?.open || false} onOpenChange={(open) => !open && setPreviewModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-card border-border">
          {previewModal && (
            <>
              {/* Close Button */}
              <button
                onClick={() => setPreviewModal(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* User Info Header */}
              <div className="p-4 flex items-center gap-3 border-b border-border">
                <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                  <AvatarImage src={previewModal.user.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {previewModal.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{previewModal.user.name}</p>
                  <p className="text-sm text-muted-foreground">{previewModal.date}</p>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full bg-muted">
                <img 
                  src={previewModal.image} 
                  alt={previewModal.title}
                  className="w-full h-auto object-contain max-h-[60vh]"
                />
              </div>

              {/* Title and Profile Button */}
              <div className="p-4 border-t border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">{previewModal.title}</h3>
                
                {/* Profile Button */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/profile'}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="max-w-md mx-auto px-6 py-4 flex justify-around items-center">
          <button className="flex flex-col items-center gap-1 text-primary">
            <Home className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => window.location.href = '/search'}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => window.location.href = '/camera'}
            className="flex flex-col items-center gap-1 -mt-8"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <Camera className="w-7 h-7 text-primary-foreground" />
            </div>
          </button>
          
          <button 
            onClick={() => window.location.href = '/profile'}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Styles;
