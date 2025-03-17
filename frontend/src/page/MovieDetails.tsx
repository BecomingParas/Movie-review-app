import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, ThumbsUp } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import RatingStars from "@/components/RatingStars";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  getMovieById,
  createReview,
  movieKeys,
  reviewKeys,
  TMovie,
} from "@/api/movie/fetch";
import ReviewList from "@/components/ReviewList";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: movieData, isLoading } = useQuery({
    queryKey: movieKeys.detail(id || ""),
    queryFn: () => getMovieById(id || ""),
    enabled: !!id,
  });

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.list(id || ""),
      });
      toast({
        title: "Review submitted",
        description: "Your review has been submitted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
    },
  });

  const handleRatingChange = (rating: number) => {
    if (!id) return;
    createReviewMutation.mutate({
      movieId: id,
      rating: rating * 2, // Convert 5-star rating to 10-point scale
      comment: "", // You might want to add a comment field to the UI
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse space-y-8 w-full max-w-4xl px-4">
            <div className="h-96 bg-muted rounded-lg w-full"></div>
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  const movie = movieData?.data;
  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
            <Link to="/" className="text-accent hover:underline">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-grow pt-16 animate-fade-in">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/movies"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 hover-lift"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to movies
            </Link>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/4 shrink-0">
                <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg border border-border/50 relative">
                  <img
                    src={movie.imageUrl}
                    alt={`${movie.title} poster`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-6 space-y-4">
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

              <div className="w-full md:w-3/4">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {movie.title}{" "}
                  <span className="text-muted-foreground">
                    ({new Date(movie.releaseDate).getFullYear()})
                  </span>
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                  <div className="flex items-center">
                    <RatingStars rating={movie.rating / 2} size="sm" />
                    <span className="ml-2 text-sm font-medium">
                      {movie.rating.toFixed(1)}/10
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {movie.genre.map((genre) => (
                      <span
                        key={genre}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-xl font-medium mb-4">Synopsis</h2>
                <p className="text-muted-foreground mb-8">
                  {movie.description}
                </p>

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
