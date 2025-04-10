import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import {
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Flag,
  Edit,
  Trash,
} from "lucide-react";

import { ReviewForm } from "./review-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  isOwner: boolean;
}

interface ReviewListProps {
  movieId: string;
}

export function ReviewList({ movieId }: ReviewListProps) {
  // In a real app, this would be fetched from your API
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      userId: "user1",
      userName: "Alice Johnson",
      userAvatar: "/placeholder.svg",
      rating: 5,
      content:
        "One of the best movies I've ever seen! The plot is intricate and keeps you guessing until the end. The visual effects are stunning and the acting is superb. Christopher Nolan has outdone himself with this masterpiece.",
      createdAt: "2023-05-15T10:30:00Z",
      likes: 42,
      isLiked: false,
      isOwner: false,
    },
    {
      id: "2",
      userId: "user2",
      userName: "Bob Smith",
      rating: 4,
      content:
        "Great movie with an interesting concept. The dream-within-a-dream sequences were mind-bending. The only reason I'm not giving it 5 stars is because some parts were a bit confusing on first watch.",
      createdAt: "2023-06-20T14:15:00Z",
      likes: 18,
      isLiked: true,
      isOwner: true,
    },
    {
      id: "3",
      userId: "user3",
      userName: "Carol Davis",
      userAvatar: "/placeholder.svg",
      rating: 3,
      content:
        "It was okay. The concept is interesting but the execution was a bit too complicated for my taste. I found myself getting lost in the multiple dream levels.",
      createdAt: "2023-07-05T09:45:00Z",
      likes: 7,
      isLiked: false,
      isOwner: false,
    },
  ]);

  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleLike = (reviewId: string) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          const isLiked = !review.isLiked;
          return {
            ...review,
            isLiked,
            likes: isLiked ? review.likes + 1 : review.likes - 1,
          };
        }
        return review;
      })
    );
  };

  const handleDelete = (reviewId: string) => {
    // In a real app, this would call your API
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  const handleEditSuccess = () => {
    setEditingReviewId(null);
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No reviews yet. Be the first to review!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id}>
          {editingReviewId === review.id ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={review.userAvatar}
                      alt={review.userName}
                    />
                    <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{review.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ReviewForm
                  movieId={movieId}
                  initialData={{
                    rating: review.rating,
                    content: review.content,
                  }}
                  onSuccess={handleEditSuccess}
                  isEdit
                />
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingReviewId(null)}
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={review.userAvatar}
                        alt={review.userName}
                      />
                      <AvatarFallback>
                        {review.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{review.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating
                      value={review.rating}
                      readOnly
                      size="sm"
                      onChange={() => {}}
                    />
                    {review.isOwner && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setEditingReviewId(review.id)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Review
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(review.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{review.content}</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={review.isLiked ? "text-primary" : ""}
                    onClick={() => handleLike(review.id)}
                  >
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {review.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="mr-1 h-4 w-4" />
                    Report
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
}
