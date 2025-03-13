import { MovieCardProps } from "../../api/movie/types";

export function MovieCard({ movie, variant = "default" }: MovieCardProps) {
  if (!movie) {
    return null;
  }

  const baseClasses =
    "relative overflow-hidden rounded-xl bg-gray-800 transition-all duration-300";
  const variantClasses = {
    default: "w-full",
    compact: "w-64",
    featured: "w-full aspect-[2/1]",
  };

  // ... existing code ...
}
