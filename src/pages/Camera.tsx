import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Image, Link } from "lucide-react";

const Camera = () => {
  const [showOptions, setShowOptions] = useState(false);

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
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Hello, Piyush
          </h2>
          <p className="text-muted-foreground text-lg">
            What would you like to transform today?
          </p>
        </div>

        {/* Quick Action Suggestions */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="p-4 rounded-xl bg-card border border-border text-left hover:bg-accent transition-colors"
            >
              <span className="text-sm text-foreground">{action}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="fixed bottom-20 left-0 right-0 px-4">
        <div className="bg-card rounded-2xl border border-border p-4">
          {/* Suggestion Chips */}
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="flex-shrink-0 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input with Actions */}
          <div className="relative">
            <Input
              placeholder="Ask Coco AI"
              className="pr-12 bg-background border-border"
            />
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-accent rounded-md"
            >
              <Plus className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Options Menu */}
          {showOptions && (
            <div className="mt-3 space-y-2">
              <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-background hover:bg-accent transition-colors">
                <Image className="w-5 h-5 text-primary" />
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