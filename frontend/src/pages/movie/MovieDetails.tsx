// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { ArrowLeft, Clock, ThumbsUp } from "lucide-react";

// import RatingStars from "@/components/RatingStars";
// import { getMovieById, Movie } from "@/data/mockData";
// import { cn } from "@/lib/utils";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { ReviewForm } from "../review/review-form";
// import { ReviewList } from "../review/review-list";

// const MovieDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const [movie, setMovie] = useState<Movie | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     // Simulate loading
//     setLoading(true);

//     setTimeout(() => {
//       if (id) {
//         const foundMovie = getMovieById(Number(id));
//         setMovie(foundMovie || null);
//       }
//       setLoading(false);
//     }, 500);
//   }, [id]);

//   const handleRatingChange = (rating: number) => {
//     toast({
//       title: "Rating submitted",
//       description: `You rated this movie ${rating} stars.`,
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col bg-background text-foreground">
//         <div className="flex-grow flex items-center justify-center">
//           <div className="animate-pulse space-y-8 w-full max-w-4xl px-4">
//             <div className="h-96 bg-muted rounded-lg w-full"></div>
//             <div className="h-8 bg-muted rounded w-3/4"></div>
//             <div className="h-4 bg-muted rounded w-1/2"></div>
//             <div className="h-4 bg-muted rounded w-full"></div>
//             <div className="h-4 bg-muted rounded w-full"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!movie) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <div className="flex-grow flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
//             <Link to="/" className="text-accent hover:underline">
//               Return to home
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-900">
//       <main className="flex-grow pt-16 animate-fade-in">
//         <div className="container mx-auto px-4 sm:px-6 py-8">
//           <div className="max-w-6xl mx-auto">
//             <Link
//               to="/movies"
//               className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 hover-lift"
//             >
//               <ArrowLeft className="h-4 w-4 mr-1" />
//               Back to movies
//             </Link>

//             <div className="flex flex-col md:flex-row gap-8">
//               <div className="w-full md:w-1/4 shrink-0">
//                 <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg border border-border/50 relative">
//                   <img
//                     src={movie.posterUrl}
//                     alt={`${movie.title} poster`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <div className="mt-6 space-y-4">
//                   <InfoBlock label="Director" value={movie.director} />
//                   <InfoBlock
//                     label="Cast"
//                     value={
//                       <ul className="space-y-1">
//                         {movie.cast.map((actor, index) => (
//                           <li key={`${index}`}>{actor}</li>
//                         ))}
//                       </ul>
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="w-full md:w-3/4">
//                 <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                   {movie.title}{" "}
//                   <span className="text-muted-foreground">({movie.year})</span>
//                 </h1>

//                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
//                   <div className="flex items-center">
//                     <RatingStars rating={movie.rating / 2} size="sm" />
//                     <span className="ml-2 text-sm font-medium">
//                       {movie.rating.toFixed(1)}/10
//                     </span>
//                   </div>

//                   <div className="flex items-center text-sm text-muted-foreground">
//                     <Clock className="h-4 w-4 mr-1" />
//                     <span>{movie.runtime} min</span>
//                   </div>

//                   <div className="flex flex-wrap gap-2">
//                     {movie.genres.map((genre, index) => (
//                       <span
//                         key={index}
//                         className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
//                       >
//                         {genre}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <h2 className="text-xl font-medium mb-4">Synopsis</h2>
//                 <p className="text-muted-foreground mb-8">{movie.plot}</p>

//                 <Separator className="my-8" />

//                 <div className="space-y-6">
//                   <h2 className="text-xl font-medium">Your Review</h2>

//                   <div className="glass p-6 rounded-lg">
//                     <h3 className="font-medium mb-4">Rate this movie:</h3>
//                     <div className="flex items-center gap-4 mb-6">
//                       <RatingStars
//                         editable
//                         size="lg"
//                         onRatingChange={handleRatingChange}
//                       />
//                       <span className="text-sm text-muted-foreground">
//                         Click to rate
//                       </span>
//                     </div>

//                     <div className="space-y-4">
//                       <textarea
//                         placeholder="Write your review here..."
//                         className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-1 focus:ring-ring"
//                       />
//                       <div className="flex justify-end">
//                         <Button>
//                           <ThumbsUp className="h-4 w-4 mr-2" />
//                           Submit Review
//                         </Button>
//                       </div>
//                       <ReviewForm movieId={String(movie.id)} />
//                       <ReviewList movieId={String(movie.id)} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// interface InfoBlockProps {
//   label: string;
//   value: React.ReactNode;
//   className?: string;
// }

// const InfoBlock: React.FC<InfoBlockProps> = ({ label, value, className }) => {
//   return (
//     <div className={cn("", className)}>
//       <h3 className="text-sm font-medium text-muted-foreground mb-1">
//         {label}
//       </h3>
//       <div className="text-sm">{value}</div>
//     </div>
//   );
// };

// export default MovieDetails;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

import RatingStars from "@/components/RatingStars";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ReviewForm } from "../review/review-form";
import { ReviewList } from "../review/review-list";
import { useGetAllMoviesQuery } from "@/api/movies/movie.mutations";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: allMovies, isLoading } = useGetAllMoviesQuery();
  const [movie, setMovie] = useState<
    NonNullable<typeof allMovies>["data"][0] | null
  >(null);
  const { toast } = useToast();

  // Once we have allMovies, pick the one we need:
  useEffect(() => {
    if (allMovies?.data && id) {
      const found = allMovies.data.find((m) => String(m._id) === id);
      setMovie(found ?? null);
    }
  }, [allMovies, id]);

  if (isLoading) {
    return <div>Loading…</div>;
  }
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Movie not found</h1>
          <Link to="/movies" className="text-accent underline">
            Back to list
          </Link>
        </div>
      </div>
    );
  }

  const handleRatingChange = (rating: number) =>
    toast({
      title: "Rating submitted",
      description: `You rated this movie ${rating} stars.`,
    });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto p-8">
        <Link
          to="/movies"
          className="flex items-center mb-6 text-sm text-muted-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to movies
        </Link>

        {/* ── VIDEO ── */}
        <div className="w-full mb-8">
          <video
            src={movie.video_url}
            controls
            className="w-full rounded-lg shadow-lg aspect-video object-cover bg-black"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster + Info */}
          <div className="md:w-1/4">
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg object-cover"
            />
            <div className="mt-6 space-y-4">
              <InfoBlock label="Director" value={movie.director} />
              <InfoBlock
                label="Cast"
                value={
                  <ul className="list-disc list-inside">
                    {movie.cast.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                }
              />
            </div>
          </div>

          {/* Details + Reviews */}
          <div className="md:w-3/4">
            <h1 className="text-4xl font-bold mb-2">
              {movie.title}{" "}
              <span className="text-muted-foreground">
                ({movie.release_year})
              </span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div className="flex items-center">
                <RatingStars rating={movie.average_rating / 2} size="sm" />
                <span className="ml-2 font-medium">
                  {movie.average_rating.toFixed(1)}/10
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />{" "}
                {/* <span>{movie?.runtime || 34} min</span> */}
              </div>
              <div className="flex gap-2 flex-wrap">
                {movie.genre.map((g) => (
                  <span
                    key={g}
                    className="px-2 py-1 bg-muted rounded-full text-xs"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-xl font-medium mb-2">Synopsis</h2>
            <p className="text-muted-foreground mb-8">{movie.description}</p>

            <Separator />

            {/* Review Section */}
            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-medium">Your Review</h2>
              <div className="glass p-6 rounded-lg">
                <h3 className="mb-4 font-medium">Rate this movie:</h3>
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
                <ReviewForm movieId={String(movie._id)} />
                <ReviewList movieId={String(movie._id)} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface InfoBlockProps {
  label: string;
  value: React.ReactNode;
}
const InfoBlock: React.FC<InfoBlockProps> = ({ label, value }) => (
  <div>
    <h3 className="text-sm font-medium text-muted-foreground mb-1">{label}</h3>
    <div className="text-sm">{value}</div>
  </div>
);

export default MovieDetails;
