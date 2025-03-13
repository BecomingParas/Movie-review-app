import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating?: number;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating = 0,
  editable = false,
  onRatingChange,
  size = "md",
  className,
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  const handleMouseEnter = (star: number) => {
    if (!editable) return;
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    if (!editable) return;
    setHoverRating(0);
  };

  const handleClick = (star: number) => {
    if (!editable) return;
    setCurrentRating(star);
    onRatingChange?.(star);
  };

  const starSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-1",
        editable && "cursor-pointer",
        className
      )}
    >
      {stars.map((star) => {
        const isActive = star <= (hoverRating || currentRating);

        return (
          <Star
            key={star}
            className={cn(
              starSizes[size],
              "transition-all duration-150 transform",
              isActive ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
              editable &&
                hoverRating &&
                star <= hoverRating &&
                "animate-pulse-subtle scale-110"
            )}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;
