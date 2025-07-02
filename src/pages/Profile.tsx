const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.location.href = '/'}
            className="p-2 rounded-full bg-secondary"
          >
            <svg className="w-5 h-5 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-4">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Piyush</h2>
          <p className="text-muted-foreground">AI Style Enthusiast</p>
        </div>

        {/* Profile Options */}
        <div className="space-y-3">
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Recent Styles</h3>
            <p className="text-muted-foreground text-sm">View your transformation history</p>
          </div>
          
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Saved Looks</h3>
            <p className="text-muted-foreground text-sm">Your favorite style combinations</p>
          </div>
          
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Settings</h3>
            <p className="text-muted-foreground text-sm">Preferences and account options</p>
          </div>
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
    </div>
  );
};

export default Profile;