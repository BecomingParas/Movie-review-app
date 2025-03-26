import { featuredMovies } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RatingStars from "@/components/RatingStars";

const Reviews = () => {
  // Simplified mock reviews
  const mockReviews = featuredMovies.map((movie) => ({
    id: movie.id,
    movie: movie.title,
    user: `User${movie.id}`,
    rating: movie.rating / 2,
    content: `${movie.plot.substring(0, 120)}...`,
    date: `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`,
    userAvatar: movie.posterUrl, // Using movie poster as avatar for demo
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Latest Reviews
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReviews.map((review) => (
              <Card key={review.id} className="animate-fade-in">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={review.userAvatar}
                          alt={review.user}
                        />
                        <AvatarFallback>
                          {review.user.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">
                          {review.user}
                        </CardTitle>
                        <CardDescription>{review.date}</CardDescription>
                      </div>
                    </div>
                    <RatingStars rating={review.rating} size="sm" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">{review.movie}</h3>
                  <p className="text-muted-foreground text-sm">
                    {review.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reviews;
