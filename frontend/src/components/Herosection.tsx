import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { featuredMovies } from "@/data/mockData";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  className,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Updated popular movie backdrop URLs
  const backgroundImages = [
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000", // Main backdrop
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000", // Popular cinema
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2000", // Movie theater
    "https://images.unsplash.com/photo-1512070679279-8988d32161be?q=80&w=2000", // Film reel
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000", // Cinema hall
  ];

  useEffect(() => {
    // Change image every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section
      className={cn(
        "relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {backgroundImages.map((imageUrl, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 z-0 transition-opacity duration-1000",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={imageUrl}
            alt={`Hero background ${index}`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        </div>
      ))}

      <div className="container relative z-10 px-4 sm:px-6 mx-auto text-center animate-fade-in">
        <div className="inline-block mb-3 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium backdrop-blur-sm">
          The ultimate movie review experience
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance max-w-3xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            {subtitle}
          </p>
        )}

        <div className="flex items-center justify-center space-x-2 mt-6">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage
              src={featuredMovies[0].posterUrl}
              alt="Featured movie poster"
            />
            <AvatarFallback>FM</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12 border-2 border-primary -ml-4">
            <AvatarImage
              src={featuredMovies[1].posterUrl}
              alt="Featured movie poster"
            />
            <AvatarFallback>FM</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium ml-2">
            Join 2,500+ movie enthusiasts
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
