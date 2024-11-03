import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { MAX_REVIEW_LENGTH } from "../utils/constants";

interface ReviewSectionProps {
  review: string;
  rating: number;
  onReviewChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRatingChange: (rating: number) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  review,
  rating,
  onReviewChange,
  onRatingChange,
}) => (
  <div className="space-y-6">
    <div>
      <Label htmlFor="review" className="text-gray-300 mb-2 block">
        DevExchange Review
      </Label>
      <Textarea
        id="review"
        placeholder="Write your review here..."
        value={review}
        onChange={onReviewChange}
        className="bg-gray-700 text-gray-300 border-gray-600 focus:ring-0 focus:border-white focus:border-[0.5px] transition-colors h-32 resize-none"
      />
      <p className="text-sm text-gray-400 mt-1">
        {review.length}/{MAX_REVIEW_LENGTH} characters
      </p>
    </div>
    <div>
      <Label className="text-gray-300 mb-2 block">DevExchange Rating</Label>
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
              star <= rating
                ? "text-yellow-500 fill-yellow-200"
                : "text-gray-600 hover:text-gray-400"
            }`}
            strokeWidth={1.5}
            onClick={() => onRatingChange(star)}
          />
        ))}
      </div>
    </div>
  </div>
);
