import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: number;
  showCount?: boolean;
}

const RatingStars = ({ rating, count = 0, size = 16, showCount = true }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} className="text-accent fill-accent" />
        ))}
        {hasHalf && <StarHalf size={size} className="text-accent fill-accent" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-border" />
        ))}
      </div>
      {showCount && count > 0 && (
        <span className="text-xs text-muted font-medium">({count})</span>
      )}
    </div>
  );
};

export default RatingStars;
