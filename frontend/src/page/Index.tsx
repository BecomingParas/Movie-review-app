import HeroSection from "@/components/Herosection";
import MovieList from "@/components/MovieList";
import { featuredMovies, topRatedMovies, recentMovies } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-grow pt-16">
        <HeroSection
          title="Discover & Share Your Thoughts on Films"
          subtitle="Join our community of movie enthusiasts to discover new films, share your opinions, and explore what others are saying."
        />

        <MovieList
          title="Featured Movies"
          movies={featuredMovies}
          className="animate-fade-in"
        />

        <div className="bg-muted/50 py-12">
          <MovieList
            title="Top Rated Movies"
            movies={topRatedMovies}
            className="animate-fade-in"
          />
        </div>

        <MovieList
          title="Recent Movies"
          movies={recentMovies}
          className="animate-fade-in"
        />
      </main>
    </div>
  );
};

export default Index;
