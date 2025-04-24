import { useGetAllMoviesQuery } from "@/api/movies/movie.mutations";
import HeroSection from "@/components/Herosection";
import MovieList from "@/pages/movie/MovieList";
import { TMovie } from "@/types/movies.types";

const Index = () => {
  const { data, isLoading, isError } = useGetAllMoviesQuery();
  if (isLoading) return <div className="text-white p-10">Loading…</div>;
  if (isError || !data)
    return <div className="text-red-500 p-10">Failed to load movies</div>;

  const allMovies: TMovie[] = data.data;

  const categories = [
    {
      categoryKey: "featured",
      title: "Featured Movies",
      wrapperClass: "",
    },
    {
      categoryKey: "trending-now",
      title: "Trending Now Movies",
      wrapperClass: "bg-muted/50 py-12",
    },
    {
      categoryKey: "recent",
      title: "Recent Movies",
      wrapperClass: "",
    },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-grow pt-16">
        <HeroSection
          title="Discover & Share Your Thoughts on Films"
          subtitle="Join our community of movie enthusiasts to discover new films, share your opinions, and explore what others are saying."
        />

        {categories.map(({ categoryKey, title, wrapperClass }) => {
          const movies = allMovies.filter((m) => m.category === categoryKey);
          if (!movies.length) return null;
          return (
            <div key={categoryKey} className={wrapperClass}>
              <MovieList
                title={title}
                movies={movies}
                className="animate-fade-in"
              />
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Index;
