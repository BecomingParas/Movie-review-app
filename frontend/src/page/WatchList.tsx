import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for the watchlist
const watchlistMovies = [
  {
    id: 101,
    title: "Inception",
    posterUrl:
      "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluY2VwdGlvbiUyMG1vdmllfGVufDB8fDB8fHww",
    rating: 8.8,
    year: 2010,
  },
  {
    id: 102,
    title: "The Shawshank Redemption",
    posterUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJpc29ufGVufDB8fDB8fHww",
    rating: 9.3,
    year: 1994,
  },
  {
    id: 103,
    title: "Interstellar",
    posterUrl:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BhY2UlMjBzdGFyc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 8.6,
    year: 2014,
  },
];

const Watchlist = () => {
  const { toast } = useToast();

  const handleRemoveFromWatchlist = (_movieId: number, movieTitle: string) => {
    // In a real app, this would remove the movie from the watchlist
    // For now, just show a toast message
    toast({
      title: "Removed from watchlist",
      description: `${movieTitle} has been removed from your watchlist.`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-foreground">
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">My Watchlist</h1>

          {watchlistMovies.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {watchlistMovies.map((movie) => (
                  <Card key={movie.id} className="overflow-hidden bg-gray-800">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-1/3 h-48 sm:h-auto">
                        <img
                          src={movie.posterUrl}
                          alt={`${movie.title} poster`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full sm:w-2/3 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {movie.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {movie.year}
                          </p>
                          <div className="flex items-center mb-4">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span>{movie.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Button variant="outline" asChild>
                            <a href={`/movie/${movie.id}`}>View Details</a>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() =>
                              handleRemoveFromWatchlist(movie.id, movie.title)
                            }
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button asChild>
                  <a href="/movies">Discover More Movies</a>
                </Button>
              </div>
            </>
          ) : (
            <Card className="text-center p-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Your watchlist is empty
                </CardTitle>
                <CardDescription>
                  Start adding movies to your watchlist to keep track of what
                  you want to watch.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href="/movies">Browse Movies</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Watchlist;
