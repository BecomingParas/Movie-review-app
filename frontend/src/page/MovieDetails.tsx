import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Film, ThumbsUp } from "lucide-react";
// import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RatingStars from "@/components/RatingStars";
import { getMovieById, Movie } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    setLoading(true);

    setTimeout(() => {
      if (id) {
        const foundMovie = getMovieById(Number(id));
        setMovie(foundMovie || null);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleRatingChange = (rating: number) => {
    toast({
      title: "Rating submitted",
      description: `You rated this movie ${rating} stars.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse space-y-8 w-full max-w-4xl px-4">
            <div className="h-96 bg-muted rounded-lg w-full"></div>
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
            <Link to="/" className="text-accent hover:underline">
              Return to home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16 animate-fade-in">
        <div className="relative h-[60vh] min-h-[400px]">
          <img
            src={movie.backdropUrl}
            alt={`${movie.title} backdrop`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>

          <div className="container mx-auto px-4 sm:px-6">
            <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 sm:px-6">
              <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                <div className="w-full md:w-1/4 shrink-0">
                  <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg border border-border/50 relative">
                    <img
                      src={movie.posterUrl}
                      alt={`${movie.title} poster`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="w-full md:w-3/4 pt-20 md:pt-16">
                  <Link
                    to="/"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 hover-lift"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to movies
                  </Link>

                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {movie.title}{" "}
                    <span className="text-muted-foreground">
                      ({movie.year})
                    </span>
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                    <div className="flex items-center">
                      <RatingStars rating={movie.rating / 2} size="sm" />
                      <span className="ml-2 text-sm font-medium">
                        {movie.rating.toFixed(1)}/10
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{movie.runtime} min</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 pt-48 md:pt-32 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <div className="space-y-4">
                  <InfoBlock label="Director" value={movie.director} />
                  <InfoBlock
                    label="Cast"
                    value={
                      <ul className="space-y-1">
                        {movie.cast.map((actor) => (
                          <li key={actor}>{actor}</li>
                        ))}
                      </ul>
                    }
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <h2 className="text-xl font-medium mb-4">Synopsis</h2>
                <p className="text-muted-foreground mb-8">{movie.plot}</p>

                <Separator className="my-8" />

                <div className="space-y-6">
                  <h2 className="text-xl font-medium">Your Review</h2>

                  <div className="glass p-6 rounded-lg">
                    <h3 className="font-medium mb-4">Rate this movie:</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <RatingStars
                        editable
                        size="lg"
                        onRatingChange={handleRatingChange}
                      />
                      <span className="text-sm text-muted-foreground">
                        Click to rate
                      </span>
                    </div>

                    <div className="space-y-4">
                      <textarea
                        placeholder="Write your review here..."
                        className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-1 focus:ring-ring"
                      />

                      <div className="flex justify-end">
                        <Button>
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Submit Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface InfoBlockProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ label, value, className }) => {
  return (
    <div className={cn("", className)}>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">
        {label}
      </h3>
      <div className="text-sm">{value}</div>
    </div>
  );
};

export default MovieDetails;
