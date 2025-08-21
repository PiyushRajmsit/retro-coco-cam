import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sharedImage from "@/assets/summer-cocktail.jpg";

const Share = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    navigate("/styles");
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = sharedImage;
    link.download = 'shared-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* HeadBar */}
      <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3d85f9" />
                    <stop offset="100%" stopColor="#5b9cff" />
                  </linearGradient>
                </defs>
                <circle 
                  cx="50" 
                  cy="50" 
                  r="35" 
                  fill="none" 
                  stroke="url(#headerLogoGradient)" 
                  strokeWidth="8"
                  strokeDasharray="175 85"
                  transform="rotate(-90 50 50)"
                />
                <rect x="45" y="15" width="10" height="25" fill="url(#headerLogoGradient)" rx="2" />
                <polygon points="70,35 85,25 85,45" fill="url(#headerLogoGradient)" />
              </svg>
            </div>
            <span className="font-semibold text-foreground">Share</span>
          </div>

          <div className="w-9" /> {/* Spacer for center alignment */}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full space-y-8 text-center">
          
          {/* Shared Image with Download */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={sharedImage}
                alt="AI Generated Style"
                className="w-full h-auto max-h-[70vh] object-cover"
              />
              
              {/* Download Button Overlay */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={handleDownload}
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/80 hover:bg-background/90 text-foreground shadow-lg backdrop-blur-sm"
                  variant="secondary"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Image Caption */}
            <p className="mt-4 text-lg text-muted-foreground">
              AI-generated style created with visual intelligence
            </p>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Create Your Own Styles
              </h1>
              <p className="text-lg text-muted-foreground">
                Join thousands using AI to transform their visual content
              </p>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              size="lg"
              className="w-full max-w-sm h-12 text-base font-medium bg-white text-black hover:bg-gray-50 border-gray-300"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Get Started with Google
            </Button>

            {/* Terms */}
            <p className="text-sm text-muted-foreground">
              By signing up, you agree to our{' '}
              <a href="#" className="underline hover:text-foreground">
                Terms of Service
              </a>{' '}
              &{' '}
              <a href="#" className="underline hover:text-foreground">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;