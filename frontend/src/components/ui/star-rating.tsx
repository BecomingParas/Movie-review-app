import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
}

export function StarRating({
  value,
  onChange,
  max = 5,
  size = "md",
  readOnly = false,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const sizeClass = sizes[size];

  return (
    <div className="flex">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = readOnly
          ? starValue <= value
          : starValue <= (hoverValue || value);

        return (
          <button
            key={index}
            type="button"
            className={`${
              readOnly ? "cursor-default" : "cursor-pointer"
            } p-0.5 focus:outline-none`}
            onClick={() => !readOnly && onChange(starValue)}
            onMouseEnter={() => !readOnly && setHoverValue(starValue)}
            onMouseLeave={() => !readOnly && setHoverValue(0)}
            disabled={readOnly}
          >
            <Star
              className={`${sizeClass} ${
                isFilled ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
