// ReviewForm.tsx
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ThumbsUp } from "lucide-react";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!review.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Review cannot be empty.",
      });
      return;
    }

    toast({
      title: "Review submitted",
      description: "Thanks for your feedback!",
    });
    setReview("");
    setRating(0);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Rate this movie:</h3>
        <div className="flex items-center gap-4">
          <Rating
            onClick={setRating}
            initialValue={rating}
            size={30}
            allowFraction
            className="flex"
          />
          <span className="text-sm text-muted-foreground">Click to rate</span>
        </div>
      </div>

      <Textarea
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="h-32"
      />

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>
          <ThumbsUp className="h-4 w-4 mr-2" />
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
