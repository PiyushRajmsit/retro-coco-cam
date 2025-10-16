import { useState } from "react";
import { ChevronDown, Clock, Star, Share2, Users, MessageCircle, Phone, Trash2, MoreVertical } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Profile = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ type: 'uploaded' | 'generated', index: number } | null>(null);

  // Mock data for uploaded images
  const [uploadedImages, setUploadedImages] = useState([
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400",
  ]);

  const [generatedImages, setGeneratedImages] = useState([
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=400",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400",
    "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400",
  ]);

  const handleDeleteUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setDeleteConfirmation(null);
  };

  const handleDeleteGeneratedImage = (index: number) => {
    setGeneratedImages(prev => prev.filter((_, i) => i !== index));
    setDeleteConfirmation(null);
  };

  const confirmDelete = () => {
    if (deleteConfirmation) {
      if (deleteConfirmation.type === 'uploaded') {
        handleDeleteUploadedImage(deleteConfirmation.index);
      } else {
        handleDeleteGeneratedImage(deleteConfirmation.index);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.location.href = '/'}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <svg className="w-5 h-5 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-foreground">Vyb</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 mb-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          {/* 2-Column Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Left Column - User Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-md">
                  JD
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">John Doe</h2>
                  <p className="text-sm text-muted-foreground">a@b.com</p>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone Number</p>
                    <p className="text-sm font-semibold">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Credits Display */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-xl p-6 border border-primary/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-primary fill-primary animate-pulse" />
                  <span className="text-3xl font-bold text-primary">7</span>
                  <Star className="w-6 h-6 text-primary fill-primary animate-pulse" />
                </div>
                <p className="text-center text-sm text-muted-foreground font-medium">Available Credits</p>
              </div>

              <Collapsible open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
                <CollapsibleTrigger className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-full py-2 rounded-lg hover:bg-muted/50">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">View History</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isHistoryOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
              </Collapsible>
            </div>
          </div>

          {/* Credit History - Full Width */}
          <Collapsible open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
            <CollapsibleContent>
              <div className="bg-muted/50 rounded-xl p-4 space-y-3 border border-border/50">
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                  <span className="text-muted-foreground">Used 2 credits for sending message in chat None</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                  <span className="text-muted-foreground">Used 2 credits for sending message in chat 859047db2d5d42ad83eb43474e207d87</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                  <span className="text-muted-foreground">Used 2 credits for sending message in chat 859047db2d5d42ad83eb43474e207d87</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* Earn Credits Bonuses Section */}
      <div className="px-4 mb-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Earn More Credits</h3>
        <div className="space-y-3">
          <div className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Share on WhatsApp</h4>
                <p className="text-sm text-muted-foreground">Share with friends</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">+5</span>
              <Button size="sm" variant="outline">Share</Button>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                <Share2 className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Share on Instagram</h4>
                <p className="text-sm text-muted-foreground">Post your story</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">+3</span>
              <Button size="sm" variant="outline">Share</Button>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Refer Friends</h4>
                <p className="text-sm text-muted-foreground">Invite new users</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">+10</span>
              <Button size="sm" variant="outline">Invite</Button>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Add a Number</h4>
                <p className="text-sm text-muted-foreground">Share your phone number</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">+2</span>
              <Button size="sm" variant="outline" onClick={() => setIsPhoneModalOpen(true)}>Add</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Your Images Section */}
      <div className="px-4 mb-20">
        <h3 className="text-xl font-bold text-foreground mb-4">Your Images</h3>
        
        <Tabs defaultValue="uploaded" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="uploaded" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Uploaded Images
            </TabsTrigger>
            <TabsTrigger value="generated" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Generated Images
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="uploaded">
            <div className="grid grid-cols-3 gap-3">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-card border border-border group">
                  <img 
                    src={image} 
                    alt={`Uploaded image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 bg-background/90 rounded-full hover:bg-background transition-colors">
                          <MoreVertical className="w-4 h-4 text-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => setDeleteConfirmation({ type: 'uploaded', index })}
                          className="text-destructive focus:text-destructive cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="generated">
            <div className="grid grid-cols-3 gap-3">
              {generatedImages.map((image, index) => (
                <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-card border border-border group">
                  <img 
                    src={image} 
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 bg-background/90 rounded-full hover:bg-background transition-colors">
                          <MoreVertical className="w-4 h-4 text-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => setDeleteConfirmation({ type: 'generated', index })}
                          className="text-destructive focus:text-destructive cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
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
          <button 
            onClick={() => window.location.href = '/camera'}
            className="p-3 text-muted-foreground"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            </svg>
          </button>
          <button className="p-3 text-primary bg-primary/20 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Phone Number Modal */}
      <Dialog open={isPhoneModalOpen} onOpenChange={setIsPhoneModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Phone Number</DialogTitle>
            <DialogDescription>
              Enter your phone number to earn bonus credits
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="country-code">Country Code</Label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger id="country-code">
                  <SelectValue placeholder="Select code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1">+1 (US/Canada)</SelectItem>
                  <SelectItem value="+44">+44 (UK)</SelectItem>
                  <SelectItem value="+91">+91 (India)</SelectItem>
                  <SelectItem value="+86">+86 (China)</SelectItem>
                  <SelectItem value="+81">+81 (Japan)</SelectItem>
                  <SelectItem value="+49">+49 (Germany)</SelectItem>
                  <SelectItem value="+33">+33 (France)</SelectItem>
                  <SelectItem value="+61">+61 (Australia)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={() => setIsPhoneModalOpen(false)}>
              Submit & Earn +2 Credits
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmation !== null} onOpenChange={(open) => !open && setDeleteConfirmation(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Profile;