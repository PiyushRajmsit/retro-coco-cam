import { StyleCard } from "@/components/StyleCard";
import image1950s from "@/assets/1950s-style.jpg";
import imageBrunch from "@/assets/brunch-dressing.jpg";
import imageSummer from "@/assets/summer-cocktail.jpg";
import imageRetro from "@/assets/retro-disco.jpg";
import imageEuropean from "@/assets/european-cafe.jpg";
import imageTokyo from "@/assets/tokyo-street.jpg";
import imageWinter from "@/assets/winter-chalet.jpg";
import imageSunset from "@/assets/sunset-beach.jpg";

const Styles = () => {
  const styles = [
    { title: "Background Filters", image: imageSunset },
    { title: "Photo Filters", image: imageRetro },
    { title: "Fashion Outfits", image: image1950s },
    { title: "Makeup Trends", image: imageBrunch },
    { title: "Vibes", image: imageTokyo },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-8 bg-gradient-primary/5 border-b border-border/30">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-bold font-playfair text-lg">C</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold font-playfair text-foreground tracking-tight">Coco AI</h1>
            <p className="text-sm font-poppins text-muted-foreground font-medium">Style & Creative Studio</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-3 rounded-xl bg-secondary/80 hover:bg-secondary transition-colors shadow-sm">
            <svg className="w-5 h-5 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button 
            onClick={() => window.location.href = '/profile'}
            className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow hover:scale-105 transition-transform"
          >
            <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Style Grid */}
      <div className="px-4 pb-20">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          {/* Featured card */}
          <StyleCard
            title={styles[0].title}
            image={styles[0].image}
            className="w-full"
          />
          
          {/* Grid for remaining 4 cards */}
          <div className="grid grid-cols-2 gap-4">
            {styles.slice(1).map((style, index) => (
              <StyleCard
                key={index + 1}
                title={style.title}
                image={style.image}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block space-y-4">
          {/* First row - 2 cards */}
          <div className="grid grid-cols-2 gap-4">
            <StyleCard
              title={styles[0].title}
              image={styles[0].image}
            />
            <StyleCard
              title={styles[1].title}
              image={styles[1].image}
            />
          </div>
          
          {/* Second row - 3 cards */}
          <div className="grid grid-cols-3 gap-4">
            <StyleCard
              title={styles[2].title}
              image={styles[2].image}
            />
            <StyleCard
              title={styles[3].title}
              image={styles[3].image}
            />
            <StyleCard
              title={styles[4].title}
              image={styles[4].image}
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around py-3">
          <button className="p-3 text-primary bg-primary/20 rounded-full">
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
          <button className="p-3 text-muted-foreground">
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

export default Styles;