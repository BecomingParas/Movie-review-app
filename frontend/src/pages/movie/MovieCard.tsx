import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  year: number;
  className?: string;
}
const MovieCard: React.FC<MovieCardProps> = ({
  id,
  year,
  rating,
  posterUrl,
  title,
  className,
}) => {
  return (
    <Link
      to={`/movie/${id}`}
      className={cn("movie-card group block animate-enter", className)}
      style={{ animationDelay: `${(id % 10) * 50}ms` }}
    >
      <div className="aspect-[2/3] overflow-hidden rounded-lg relative">
        <img
          src={posterUrl}
          alt={`${title} poster`}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="movie-card-overlay"></div>
        <div className="absolute bottom-0 left-0 w-full p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="font-medium text-white/80 text-shadow">{title}</h3>
              <span className="h-3 w-3 text-sm fill-yellow-400 text-yellow-400">
                {year}
              </span>
            </div>
            <div className="flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
