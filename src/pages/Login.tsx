import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    navigate("/styles");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="mb-12">
          <div className="w-24 h-24 mx-auto mb-8 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3d85f9" />
                  <stop offset="100%" stopColor="#5b9cff" />
                </linearGradient>
              </defs>
              {/* Circular base */}
              <circle 
                cx="50" 
                cy="50" 
                r="35" 
                fill="none" 
                stroke="url(#logoGradient)" 
                strokeWidth="8"
                strokeDasharray="175 85"
                transform="rotate(-90 50 50)"
              />
              {/* Geometric shapes */}
              <rect x="45" y="15" width="10" height="25" fill="url(#logoGradient)" rx="2" />
              <polygon points="70,35 85,25 85,45" fill="url(#logoGradient)" />
              <rect x="70" y="55" width="15" height="8" fill="url(#logoGradient)" rx="2" />
              <polygon points="70,75 85,85 70,85" fill="url(#logoGradient)" />
            </svg>
          </div>
        </div>

        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Pioneering the next era of visual intelligence
          </h1>
        </div>

        {/* Login section */}
        <div className="space-y-6 pt-8">
          <h2 className="text-2xl font-semibold text-foreground">
            Login or sign up
          </h2>

          {/* Google login button */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            size="lg"
            className="w-full h-12 text-base font-medium bg-white text-black hover:bg-gray-50 border-gray-300"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          {/* Terms and Privacy */}
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
  );
};

export default Login;