import React from "react";
import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  outOf?: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, outOf = 5, className = "" }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={`Rating: ${rating} out of ${outOf}`}>
      {Array.from({ length: outOf }).map((_, i) => (
        <Star
          key={i}
          className={i < rating ? "w-5 h-5 text-green-500 fill-green-500" : "w-5 h-5 text-gray-300"}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

export default Rating;
